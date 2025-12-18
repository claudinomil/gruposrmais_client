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
}
