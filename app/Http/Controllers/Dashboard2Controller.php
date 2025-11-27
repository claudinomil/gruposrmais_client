<?php

namespace App\Http\Controllers;

use App\Facades\Permissoes;
use Illuminate\Http\Request;

class Dashboard2Controller extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;
    
    public function __construct()
    {
        $this->middleware('check-permissao:dashboards2_list', ['only' => ['index']]);
    }

    public function index(Request $request)
    {
        //chamar view
        return view('dashboards2.index');
    }

    public function graficos()
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards2/graficos', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grafico_dados($grafico_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards2/grafico/dados/'.$grafico_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }
}