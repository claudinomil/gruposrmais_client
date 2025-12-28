<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class MaterialListagemGeralController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    public function __construct()
    {
        $this->middleware('check-permissao:materiais_listagem_geral_list', ['only' => ['index', 'filter']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'materiais_listagem_geral', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('fotografia', function ($row) {
                        $retorno = '<div class="text-center">'.'<img src="'.asset($row['material_fotografia']).'" alt="product-img" title="product-img" class="rounded avatar-sm"></div>';

                        return $retorno;
                    })
                    ->editColumn('patrimonio', function ($row) {
                        $retorno = '<div class="text-center">'.'<b>'.$row['material_numero_patrimonio'].'</b>'.'</div>';

                        return $retorno;
                    })
                    ->editColumn('material', function ($row) {
                        $retorno = '<b>'.$row['material_nome'].'</b><br>'.'<span class="small">'.$row['material_categoria'].'</span>';

                        return $retorno;
                    })
                    ->editColumn('aquisicao', function ($row) {
                        $retorno = \App\Services\SuporteService::getDataFormatada(1, $row['material_data_aquisicao']);

                        return $retorno;
                    })
                    ->editColumn('valor', function ($row) {
                        $retorno = number_format($row['material_valor_unitario'], 2, ",", ".");

                        return $retorno;
                    })
                    ->editColumn('local', function ($row) {
                        if ($row['material_estoque_id'] == 1) {
                            $retorno = '<b>'.$row['material_local'].'</b><br>'.'<span class="small">'.$row['material_estoque_nome'].': '.$row['material_local_empresa'].'</span>';
                        } else {
                            $retorno = '<b>'.$row['material_local'].'</b><br>'.'<span class="small">'.$row['material_estoque_nome'].': '.$row['material_local_cliente'].'</span>';
                        }

                        return $retorno;
                    })
                    ->editColumn('situacao', function ($row) {
                        if ($row['material_situacao_id'] == 1 or $row['material_situacao_id'] == 2 or $row['material_situacao_id'] == 5) {
                            $retorno = '<div class="text-center text-success">'.'<b>'.$row['material_situacao'].'</b>'.'</div>'.'<div class="text-center small">Movimentação Permitida</div>';
                        } else {
                            $retorno = '<div class="text-center text-danger">'.'<b>'.$row['material_situacao'].'</b>'.'</div>';
                        }

                        return $retorno;
                    })
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Listagem Geral');
            }
        } else {
            return view('materiais_listagem_geral.index');
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'materiais_listagem_geral', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('fotografia', function ($row) {
                        $retorno = '<div class="text-center">'.'<img src="'.asset($row['material_fotografia']).'" alt="product-img" title="product-img" class="rounded avatar-sm"></div>';

                        return $retorno;
                    })
                    ->editColumn('patrimonio', function ($row) {
                        $retorno = '<div class="text-center">'.'<b>'.$row['material_numero_patrimonio'].'</b>'.'</div>';

                        return $retorno;
                    })
                    ->editColumn('material', function ($row) {
                        $retorno = '<b>'.$row['material_nome'].'</b><br>'.$row['material_categoria'];

                        return $retorno;
                    })
                    ->editColumn('aquisicao', function ($row) {
                        $retorno = \App\Services\SuporteService::getDataFormatada(1, $row['material_data_aquisicao']);

                        return $retorno;
                    })
                    ->editColumn('valor', function ($row) {
                        $retorno = number_format($row['material_valor_unitario'], 2, ",", ".");

                        return $retorno;
                    })
                    ->editColumn('local', function ($row) {
                        if ($row['material_estoque_id'] == 1) {
                            $retorno = '<b>'.$row['material_local'].'</b><br>'.$row['material_estoque_nome'].': '.$row['material_local_empresa'];
                        } else {
                            $retorno = '<b>'.$row['material_local'].'</b><br>'.$row['material_estoque_nome'].': '.$row['material_local_cliente'];
                        }

                        return $retorno;
                    })
                    ->editColumn('situacao', function ($row) {
                        if ($row['material_situacao_id'] == 1 or $row['material_situacao_id'] == 2 or $row['material_situacao_id'] == 5) {
                            $retorno = '<div class="text-center text-success">'.'<b>'.$row['material_situacao'].'</b>'.'</div>'.'<div>Movimentação Permitida</div>';
                        } else {
                            $retorno = '<div class="text-center text-danger">'.'<b>'.$row['material_situacao'].'</b>'.'</div>';
                        }

                        return $retorno;
                    })
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Materiais Listagem Geral');
            }
        } else {
            return view('materiais_listagem_geral.index');
        }
    }
}
