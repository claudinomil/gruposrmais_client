<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PatrimonioController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    public function __construct()
    {
        //$this->middleware('check-permissao:xxxxx_list', ['only' => ['informacao']]);
    }

    public function informacao($material_numero_patrimonio)
    {
        // Buscando dados Api_Data()
        $this->responseApi(1, 10, 'patrimonio/informacao/'.$material_numero_patrimonio, '', '', '');

        // Dados
        $dados = [];

        // Dados recebidos com sucesso
        if ($this->code == 2000) {
            $dados = $this->content;
        }

        //dd($dados);

        return view('patrimonio.informacao', compact('material_numero_patrimonio', 'dados'));
    }

    public function listagem_geral()
    {
        // Buscando dados Api_Data()
        $this->responseApi(1, 10, 'patrimonio/listagem_geral', '', '', '');

        // Dados
        $dados = [];

        // Dados recebidos com sucesso
        if ($this->code == 2000) {
            $dados = $this->content;
        }

        return view('patrimonio.listagem_geral', compact('dados'));
    }

    public function patrimonio_situacoes($material_entrada_item_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'patrimonio/patrimonio_situacoes/'.$material_entrada_item_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }
}
