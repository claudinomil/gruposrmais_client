<?php

namespace App\Http\Controllers;

use App\Facades\SuporteFacade;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class RelatorioController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    public function __construct()
    {
        $this->middleware('check-permissao:relatorios_list', ['only' => ['index', 'relatorios', 'relatorio1']]);
    }

    public function index()
    {
        //Gerar QRCode Cartões Emergenciais
        SuporteFacade::setGerarQRCodesCartoesEmergenciais();

        //Buscando dados Api_Data()
        $this->responseApi(1, 1, 'relatorios', '', '', '');

        if ($this->code == 2000) {
            $grupos = $this->content['grupos'];
            $situacoes = $this->content['situacoes'];
            $users = $this->content['users'];
            $submodulos = $this->content['submodulos'];
            $operacoes = $this->content['operacoes'];
            $clientes_executivos = $this->content['clientes_executivos'];
            $funcionarios = $this->content['funcionarios'];
        } else {
            $grupos = [];
            $situacoes = [];
            $users = [];
            $submodulos = [];
            $operacoes = [];
            $clientes_executivos = [];
            $funcionarios = [];
        }

        return view('relatorios.index', [
            'grupos' => $grupos,
            'situacoes' => $situacoes,
            'users' => $users,
            'submodulos' => $submodulos,
            'operacoes' => $operacoes,
            'clientes_executivos' => $clientes_executivos,
            'funcionarios' => $funcionarios
        ]);
    }

    public function relatorios()
    {
        //pegando o empresa_id
        $empresa_id = session('userLogged_empresa_id');

        //Buscando dados Api_Data()
        $this->responseApi(1, 10, 'relatorios/relatorios/'.$empresa_id, '', '', '');

        if ($this->code == 2000) {
            return response()->json(['success' => $this->content]);
        } else {
            return response()->json(['success' => []]);
        }
    }

    public function relatorio1(Request $request, $grupo_id, $idioma)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //pegando o empresa_id
            $empresa_id = session('userLogged_empresa_id');

            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio1/' . $empresa_id . '/' . $grupo_id . '/' . $idioma, '', '', '');

            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function relatorio2(Request $request, $grupo_id, $situacao_id, $idioma)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //pegando o empresa_id
            $empresa_id = session('userLogged_empresa_id');

            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio2/' . $empresa_id . '/' . $grupo_id . '/' . $situacao_id . '/' . $idioma, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function relatorio3(Request $request, $data, $user_id, $submodulo_id, $operacao_id, $dado, $idioma)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //pegando o empresa_id
            $empresa_id = session('userLogged_empresa_id');

            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio3/' . $empresa_id . '/' . $data . '/' . $user_id . '/' . $submodulo_id . '/' . $operacao_id . '/' . $dado . '/' . $idioma, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function relatorio4(Request $request, $data, $title, $notificacao, $user_id, $idioma)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //pegando o empresa_id
            $empresa_id = session('userLogged_empresa_id');

            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio4/' . $empresa_id . '/' . $data . '/' . $title . '/' . $notificacao . '/' . $user_id . '/' . $idioma, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function relatorio5(Request $request, $name, $descricao, $url, $user_id, $idioma)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //pegando o empresa_id
            $empresa_id = session('userLogged_empresa_id');

            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio5/' . $empresa_id . '/' . $name . '/' . $descricao . '/' . $url . '/' . $user_id . '/' . $idioma, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function relatorio6(Request $request, $data_inicio, $data_fim, $cidade_id, $cidade, $idioma)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //pegando o empresa_id
            $empresa_id = session('userLogged_empresa_id');

            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio6/' . $empresa_id . '/' . $data_inicio . '/' . $data_fim . '/' . $cidade_id . '/' . $cidade . '/' . $idioma, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }
}
