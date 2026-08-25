<?php

namespace App\Http\Controllers\Auth;

use App\Facades\ApiData;
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
            // Grava na sessão para domínio de Clientes
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

        // Verificar se usuário pertence ao Sistema pretendido (Sistema Padrão / Sistema Clientes)'''''''''''''
        $cliente_id =session('gsrm_cliente_id');

        if ($cliente_id == 0) {$sistema = 1;} else {$sistema = 2;}

        // Buscando dados Api_Data()
        $this->responseApi(1, 10, 'users/email/pertence/sistema/'.$request->email.'/'.$cliente_id.'/'.$sistema, '', '', '');

        if ($this->code != 2000) {
            $error = $this->message;

            // Retorno para a view
            $empresas = Http::get(env('API_URL') . 'empresas_grupo_srmais')->json();

            return view('auth.login', compact('error', 'empresas'));
        }
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        // Buscando dados Api_Data() - Verificar se email já foi confirmado''''''''''''''''''''''''''''''''''''
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

            // Verificar Aviso para o Usuário''''''''''''''''''''''''''''''''''''''''''
            $aviso = false;
            $aviso_titulo = 'Aviso de Documento(s) Vencido(s) para a(s) Unidade(s):';
            $aviso_mensagem = '';

            // Aviso de Documento(s) Vencido(s)
            $response = ApiData::getData(10, 'clientes/modalInfo/documentos_vencidos', 0, [], []);
            $documentos = $response['content'];

            $ln = 0;

            foreach($documentos as $documento) {
                if (getDiferencaDiasHoje($documento['data_vencimento']) < 0) {
                    $aviso = true;
                    $ln++;

                    $aviso_mensagem .= '<div>
                                            <span class="text-truncate font-size-12">'.$ln.') '.$documento['clienteName'].'</span>
                                            <br>
                                            <span class="text-success font-size-11 mb-0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$documento['clienteNomeFantasia'].'</span>
                                        </div>';
                }
            }
            //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            // Redirecionar para Dashboards
            if ($aviso) {
                return redirect('dashboards')
                    ->with('modalAviso', true)
                    ->with('aviso_titulo', $aviso_titulo)
                    ->with('aviso_mensagem', $aviso_mensagem);
            } else {
                return redirect('dashboards');
            }
        }
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

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

    public function logout(Request $request)
    {
        // Fazer logout na API
        $this->responseApi(1, 7, '', '', '', '');

        // Expirou se_userLastActivityTime
        session()->forget('se_userLastActivityTime');

        // Verifica origem
        if ($request->motivo === 'timeout') {
            // error_timeout
            session(['error_timeout' => 'Sua sessão expirou por inatividade.']);

            // Redirecionar
            return redirect('/');
        }

        // Expirou error_timeout
        session()->forget('error_timeout');

        // Redirecionar
        return redirect('/');
    }
}
