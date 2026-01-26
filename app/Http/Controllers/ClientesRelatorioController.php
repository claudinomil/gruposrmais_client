<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClientesRelatorioController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    public function __construct()
    {
        $this->middleware('check-permissao:clientes_relatorios_list', ['only' => ['index', 'relatorios', 'relatorio11', 'relatorio12']]);
    }

    public function index()
    {
        //Gerar QRCode Cartões Emergenciais
        //SuporteFacade::setGerarQRCodesCartoesEmergenciais();

        //Buscando dados Api_Data()
        $this->responseApi(1, 1, 'clientes_relatorios', '', '', '');

        if ($this->code == 2000) {
            $pontos_tipos = $this->content['pontos_tipos'];
            $pontos_naturezas = $this->content['pontos_naturezas'];
        } else {
            $pontos_tipos = [];
            $pontos_naturezas = [];
        }

        return view('clientes_relatorios.index', [
            'pontos_tipos' => $pontos_tipos,
            'pontos_naturezas' => $pontos_naturezas
        ]);
    }

    public function relatorios()
    {
        //Buscando dados Api_Data()
        $this->responseApi(1, 10, 'clientes_relatorios/relatorios', '', '', '');

        if ($this->code == 2000) {
            return response()->json(['success' => $this->content]);
        } else {
            return response()->json(['success' => []]);
        }
    }

    public function relatorio11(Request $request, $data_inicio, $data_fim, $cidade_id, $cidade, $idioma)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'clientes_relatorios/relatorio11/' . $data_inicio . '/' . $data_fim . '/' . $cidade_id . '/' . $cidade . '/' . $idioma, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function relatorio12(Request $request, $ponto_tipo_id, $ponto_natureza_id, $modelo, $idioma)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'clientes_relatorios/relatorio12/' . $ponto_tipo_id . '/' . $ponto_natureza_id . '/' . $modelo . '/' . $idioma, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }
}
