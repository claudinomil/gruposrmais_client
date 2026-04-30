<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    // Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    // Dados Auxiliares
    public $clientes;
    public $edificacoes;
    public $edificacoes_niveis;

    public function __construct()
    {
        $this->middleware('check-permissao:dashboards_list', ['only' => ['index']]);
    }

    public function index(Request $request)
    {
        //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
        $this->responseApi(2, 10, 'dashboards/auxiliary/tables', '', '', '');

        return view('dashboards.index', [
            'clientes' => $this->clientes,
            'edificacoes' => $this->edificacoes,
            'edificacoes_niveis' => $this->edificacoes_niveis
        ]);
    }

    public function graficos($grafico_grupo_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/graficos/'.$grafico_grupo_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grupo_informacoes($grafico_grupo_id, $cliente_id, $edificacao_id, $edificacao_nivel_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/grupo/informacoes/'.$grafico_grupo_id.'/'.$cliente_id.'/'.$edificacao_id.'/'.$edificacao_nivel_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grafico_1_dados()
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/grafico/dados/grafico_1', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grafico_2_dados()
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/grafico/dados/grafico_2', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grafico_3_dados()
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/grafico/dados/grafico_3', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grafico_4_dados()
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/grafico/dados/grafico_4', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grafico_5_dados()
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/grafico/dados/grafico_5', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grafico_6_dados()
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/grafico/dados/grafico_6', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grafico_7_dados()
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/grafico/dados/grafico_7', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grafico_8_dados()
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/grafico/dados/grafico_8', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grafico_9_dados()
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/grafico/dados/grafico_9', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grafico_10_dados()
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/grafico/dados/grafico_10', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grafico_11_dados($cliente_id, $edificacao_id, $edificacao_nivel_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/grafico/dados/grafico_11/'.$cliente_id.'/'.$edificacao_id.'/'.$edificacao_nivel_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grafico_12_dados($cliente_id, $edificacao_id, $edificacao_nivel_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/grafico/dados/grafico_12/'.$cliente_id.'/'.$edificacao_id.'/'.$edificacao_nivel_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grafico_13_dados($cliente_id, $edificacao_id, $edificacao_nivel_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/grafico/dados/grafico_13/'.$cliente_id.'/'.$edificacao_id.'/'.$edificacao_nivel_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grafico_14_dados()
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/grafico/dados/grafico_14', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }

    public function grafico_15_dados()
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/grafico/dados/grafico_15', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                return response()->json([]);
            }
        }
    }
}
