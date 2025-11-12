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
            $pontos_tipos = $this->content['pontos_tipos'];
            $pontos_naturezas = $this->content['pontos_naturezas'];
        } else {
            $grupos = [];
            $situacoes = [];
            $users = [];
            $submodulos = [];
            $operacoes = [];
            $clientes_executivos = [];
            $funcionarios = [];
            $pontos_tipos = [];
            $pontos_naturezas = [];
        }

        return view('relatorios.index', [
            'grupos' => $grupos,
            'situacoes' => $situacoes,
            'users' => $users,
            'submodulos' => $submodulos,
            'operacoes' => $operacoes,
            'clientes_executivos' => $clientes_executivos,
            'funcionarios' => $funcionarios,
            'pontos_tipos' => $pontos_tipos,
            'pontos_naturezas' => $pontos_naturezas
        ]);
    }

    public function relatorios()
    {
        //Buscando dados Api_Data()
        $this->responseApi(1, 10, 'relatorios/relatorios', '', '', '');

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
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio1/' . $grupo_id . '/' . $idioma, '', '', '');

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
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio2/' . $grupo_id . '/' . $situacao_id . '/' . $idioma, '', '', '');

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
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio3/' . $data . '/' . $user_id . '/' . $submodulo_id . '/' . $operacao_id . '/' . $dado . '/' . $idioma, '', '', '');

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
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio6/' . $data_inicio . '/' . $data_fim . '/' . $cidade_id . '/' . $cidade . '/' . $idioma, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function relatorio8(Request $request, $ponto_tipo_id, $ponto_natureza_id, $idioma)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio8/' . $ponto_tipo_id . '/' . $ponto_natureza_id . '/' . $idioma, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }
}