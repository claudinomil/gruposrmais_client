<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Yajra\DataTables\Facades\DataTables;
use Illuminate\Support\Carbon;

class ProdutoMovimentacaoController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $estoques_locais;

    public function __construct()
    {
        $this->middleware('check-permissao:produtos_movimentacoes_list', ['only' => ['index', 'filter', 'produtos_entradas_itens']]);
        $this->middleware('check-permissao:produtos_movimentacoes_create', ['only' => ['create', 'store']]);
        $this->middleware('check-permissao:produtos_movimentacoes_show', ['only' => ['show']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'produtos_movimentacoes', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('data_movimentacao', function ($row) {
                        $retorno = date('d/m/Y', strtotime($row['data_movimentacao']));

                        return $retorno;
                    })
                    ->editColumn('origem', function ($row) {
                        $origemEstoqueLocalName = $row['origemEstoqueLocalName'];
                        $origemEstoqueName = $row['origemEstoqueName'];
                        $origemEmpresaName = $row['origemEmpresaName'];
                        $origemClienteName = $row['origemClienteName'];

                        $retorno = "Local: ".$origemEstoqueLocalName."<br>";
                        $retorno .= "Estoque: ".$origemEstoqueName."<br>";

                        if ($row['origemEstoqueId'] == 1) {
                            $retorno .= "Empresa: ".$origemEmpresaName;
                        } else {
                            $retorno .= "Cliente: ".$origemClienteName;
                        }

                        return $retorno;
                    })
                    ->editColumn('destino', function ($row) {
                        $destinoEstoqueLocalName = $row['destinoEstoqueLocalName'];
                        $destinoEstoqueName = $row['destinoEstoqueName'];
                        $destinoEmpresaName = $row['destinoEmpresaName'];
                        $destinoClienteName = $row['destinoClienteName'];

                        $retorno = "Local: ".$destinoEstoqueLocalName."<br>";
                        $retorno .= "Estoque: ".$destinoEstoqueName."<br>";

                        if ($row['destinoEstoqueId'] == 1) {
                            $retorno .= "Empresa: ".$destinoEmpresaName;
                        } else {
                            $retorno .= "Cliente: ".$destinoClienteName;
                        }

                        return $retorno;
                    })
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id'], 1);
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Produtos Movimentacoes');
            }
        } else {
            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'produtos_movimentacoes/auxiliary/tables', '', '', '');

            return view('produtos_movimentacoes.index', [
                'estoques_locais' => $this->estoques_locais
            ]);
        }
    }

    public function create(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            return response()->json(['success' => true]);
        }
    }

    public function store(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Incluir Registro
            $this->responseApi(1, 4, 'produtos_movimentacoes', '', '', $request->all());

            //Registro criado com sucesso
            if ($this->code == 2010) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 4423) { // Bloqueio Tabela ou Registro
                return response()->json(['error_lock' => $this->message]);
            } else {
                abort(500, 'Erro Interno Produtos Movimentacoes');
            }
        }
    }

    public function show(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'produtos_movimentacoes', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                //Preparando Dados para a View''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //data_movimentacao
                if ($this->content['data_movimentacao'] != '') {
                    $this->content['data_movimentacao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_movimentacao'], 0, 10))->format('d/m/Y');
                }
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Produtos Movimentacoes');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'produtos_movimentacoes', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('data_movimentacao', function ($row) {
                        $retorno = date('d/m/Y', strtotime($row['data_movimentacao']));

                        return $retorno;
                    })
                    ->editColumn('origem', function ($row) {
                        $origemEstoqueLocalName = $row['origemEstoqueLocalName'];
                        $origemEstoqueName = $row['origemEstoqueName'];
                        $origemEmpresaName = $row['origemEmpresaName'];
                        $origemClienteName = $row['origemClienteName'];

                        $retorno = "Local: ".$origemEstoqueLocalName."<br>";
                        $retorno .= "Estoque: ".$origemEstoqueName."<br>";

                        if ($row['origemEstoqueId'] == 1) {
                            $retorno .= "Empresa: ".$origemEmpresaName;
                        } else {
                            $retorno .= "Cliente: ".$origemClienteName;
                        }

                        return $retorno;
                    })
                    ->editColumn('destino', function ($row) {
                        $destinoEstoqueLocalName = $row['destinoEstoqueLocalName'];
                        $destinoEstoqueName = $row['destinoEstoqueName'];
                        $destinoEmpresaName = $row['destinoEmpresaName'];
                        $destinoClienteName = $row['destinoClienteName'];

                        $retorno = "Local: ".$destinoEstoqueLocalName."<br>";
                        $retorno .= "Estoque: ".$destinoEstoqueName."<br>";

                        if ($row['destinoEstoqueId'] == 1) {
                            $retorno .= "Empresa: ".$destinoEmpresaName;
                        } else {
                            $retorno .= "Cliente: ".$destinoClienteName;
                        }

                        return $retorno;
                    })
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Produtos Movimentacoes');
            }
        } else {
            return view('produtos_movimentacoes.index');
        }
    }

    public function produtos_entradas_itens(Request $request, $operacao, $estoque_local_id, $produto_movimentacao_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 10, 'produtos_movimentacoes/produtos_entradas_itens/'.$operacao.'/'.$estoque_local_id.'/'.$produto_movimentacao_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            }

            return response()->json([]);
        }
    }
}
