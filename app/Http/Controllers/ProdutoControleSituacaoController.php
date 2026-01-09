<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Yajra\DataTables\Facades\DataTables;

class ProdutoControleSituacaoController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $produto_situacoes;
    public $estoques_locais;

    public function __construct()
    {
        $this->middleware('check-permissao:produtos_controle_situacoes_list', ['only' => ['index', 'filter']]);
        $this->middleware('check-permissao:produtos_controle_situacoes_show', ['only' => ['show']]);
        $this->middleware('check-permissao:produtos_controle_situacoes_edit', ['only' => ['edit', 'update']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'produtos_controle_situacoes', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('fotografia', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<img src='" . asset($row['fotografia']) . "' alt='' class='img-thumbnail avatar-sm'>";
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->editColumn('numero_patrimonio', function ($row) {
                        $retorno = '<b>'.$row['numero_patrimonio'].'</b>';

                        return $retorno;
                    })
                    ->editColumn('produto', function ($row) {
                        $retorno = '<b>'.$row['produto_nome'].'</b><br>'.'<span class="small">'.$row['produto_categoria'].'</span>';

                        return $retorno;
                    })
                    ->editColumn('local', function ($row) {
                        if ($row['produto_estoque_id'] == 1) {
                            $retorno = '<b>'.$row['produto_local'].'</b><br>'.'<span class="small">'.$row['produto_estoque_nome'].': '.$row['produto_local_empresa'].'</span>';
                        } else {
                            $retorno = '<b>'.$row['produto_local'].'</b><br>'.'<span class="small">'.$row['produto_estoque_nome'].': '.$row['produto_local_cliente'].'</span>';
                        }

                        return $retorno;
                    })
                    ->editColumn('situacao', function ($row) {
                        if ($row['produto_situacao_id'] == 1 or $row['produto_situacao_id'] == 2 or $row['produto_situacao_id'] == 5) {
                            $retorno = '<div class="text-center text-success">'.'<b>'.$row['produto_situacao'].'</b>'.'</div>'.'<div class="text-center text-success small">Movimentação Permitida</div>';
                        } else {
                            $retorno = '<div class="text-center text-danger">'.'<b>'.$row['produto_situacao'].'</b>'.'</div>'.'<div class="text-center text-danger small">Movimentação não Permitida</div>';
                        }

                        return $retorno;
                    })
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id'], 4);
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Produtos Controle Situacoes');
            }
        } else {
            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'produtos_controle_situacoes/auxiliary/tables', '', '', '');

            return view('produtos_controle_situacoes.index', [
                'produto_situacoes' => $this->produto_situacoes,
                'estoques_locais' => $this->estoques_locais
            ]);
        }
    }

    public function show(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'produtos_controle_situacoes', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Produtos Controle Situacoes');
            }
        }
    }

    public function edit($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'produtos_controle_situacoes', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Produtos Controle Situacoes');
            }
        }
    }

    public function update(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 5, 'produtos_controle_situacoes', $id, '', $request->all());

            //Registro alterado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Produtos Controle Situacoes');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'produtos_controle_situacoes', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('fotografia', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<img src='" . asset($row['fotografia']) . "' alt='' class='img-thumbnail avatar-sm'>";
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->editColumn('numero_patrimonio', function ($row) {
                        $retorno = '<b>'.$row['numero_patrimonio'].'</b>';

                        return $retorno;
                    })
                    ->editColumn('produto', function ($row) {
                        $retorno = '<b>'.$row['produto_nome'].'</b><br>'.'<span class="small">'.$row['produto_categoria'].'</span>';

                        return $retorno;
                    })
                    ->editColumn('local', function ($row) {
                        if ($row['produto_estoque_id'] == 1) {
                            $retorno = '<b>'.$row['produto_local'].'</b><br>'.'<span class="small">'.$row['produto_estoque_nome'].': '.$row['produto_local_empresa'].'</span>';
                        } else {
                            $retorno = '<b>'.$row['produto_local'].'</b><br>'.'<span class="small">'.$row['produto_estoque_nome'].': '.$row['produto_local_cliente'].'</span>';
                        }

                        return $retorno;
                    })
                    ->editColumn('situacao', function ($row) {
                        if ($row['produto_situacao_id'] == 1 or $row['produto_situacao_id'] == 2 or $row['produto_situacao_id'] == 5) {
                            $retorno = '<div class="text-center text-success">'.'<b>'.$row['produto_situacao'].'</b>'.'</div>'.'<div class="text-center text-success small">Movimentação Permitida</div>';
                        } else {
                            $retorno = '<div class="text-center text-danger">'.'<b>'.$row['produto_situacao'].'</b>'.'</div>'.'<div class="text-center text-danger small">Movimentação não Permitida</div>';
                        }

                        return $retorno;
                    })
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id'], 4);
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Produtos Controle Situacoes');
            }
        } else {
            return view('produtos_controle_situacoes.index');
        }
    }
}
