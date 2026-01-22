<?php

namespace App\Http\Controllers\Auth;

use App\Facades\SuporteFacade;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LoginController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    public function login()
    {
        // Verificar sessão gsrm_cliente_id
        if (!session()->has('gsrm_cliente_id')) {
            // Grava na sessão para domínio de Clientes (RESETAR)
            session(['gsrm_cliente_id' => 0, 'gsrm_cliente_name' => '', 'gsrm_cliente_logotipo_principal' => '', 'gsrm_cliente_logotipo_menu' => '']);
        }

        // Empresas
        $empresas = Http::get(env('API_URL') . 'empresas_grupo_srmais')->json();

        return view('auth.login', compact('empresas'));
    }

    public function loginApi(Request $request)
    {
        //Validando dados
        $request->validate(
            [
                'empresa_id' => 'required',
                'email' => 'required|email',
                'password' => 'required',
            ],
            [
                'empresa_id.required' => 'Escolha a Empresa.',
                'email.required' => 'Digite seu E-mail.',
                'email.email' => 'E-mail inválido',
                'password.required' => 'Digite sua Senha.'
            ]
        );

        // Verificar se email pertence a um usuário do Cliente
        if (session()->has('gsrm_cliente_id')) {
            if (session('gsrm_cliente_id') != 0) {
                // Buscando dados Api_Data() - Verificar se email pertence a um usuário do Cliente
                $this->responseApi(1, 10, 'users/email/pertence/'.$request->email.'/'.session('gsrm_cliente_id'), '', '', '');

                if ($this->code != 2000) {
                    $error = 'E-mail não pertence a um Usuário do Cliente.';

                    // Retorno para a view
                    $empresas = Http::get(env('API_URL') . 'empresas_grupo_srmais')->json();

                    return view('auth.login', compact('error', 'empresas'));
                }
            }
        }

        // Buscando dados Api_Data() - Verificar se email já foi confirmado
        $this->responseApi(1, 10, 'users/confirm/' . $request->email, '', '', '');

        if ($this->code == 2000) {
            $response = Http::post(env('API_URL') . 'api/auth/login', [
                'email' => $request['email'],
                'password' => $request['password']
            ]);

            // Se o retorno for um Error
            if ($response['success'] === false) {
                $error = $response['message'];
                $empresas = Http::get(env('API_URL') . 'empresas_grupo_srmais')->json();

                return view('auth.login', compact('error', 'empresas'));
            }

            // Gravar access_token em ums session
            session(['access_token' => $response['data']['access_token']]);

            // Gravar Empresa logada (gsrm_empresa_id e gsrm_empresa)
            session(['gsrm_empresa_id' => $request['empresa_id']]);
            session(['gsrm_empresa' => $request['empresa_name']]);

            // Gravar Idioma para o Usuário logado
            session(['se_userLogged_idioma' => $request['idioma']]);

            // Gravar API GOOGLE KEY
            session_start();
            $_SESSION['api_google_key'] = 'AIzaSyCySX2x8e-TEfua6M1gZG1vNGIYng1av4g';

            // Ver de onde está acessando 'access_device' (mobile, tablet, desktop)
            SuporteFacade::setUserAcessDevice();

            // Trocar Idioma da Sessao
            SuporteFacade::setUserSessionIdioma();

            // Redirecionar
            if (session()->has('gsrm_cliente_id')) {
                if (session('gsrm_cliente_id') != 0) {
                    return redirect('clientes_dashboards');
                }
            }

            return redirect('dashboards');
        }

        // E-mail não confirmado
        if ($this->code == 2004) {
            $email = $request->email;

            // Ir para a view de confirmação
            return redirect('/confirm-email')->with('email', $email);
        }

        // E-mail não encontrado
        if ($this->code == 2005) {
            $error = 'E-mail não encontrado!';

            // Retorno para a view
            $empresas = Http::get(env('API_URL') . 'empresas_grupo_srmais')->json();

            return view('auth.login', compact('error', 'empresas'));
        }
    }

    public function logout()
    {
        //Buscando dados Api_Data() - Fazer Logout
        $this->responseApi(1, 7, '', '', '', '');

        return redirect('/');
    }
}
