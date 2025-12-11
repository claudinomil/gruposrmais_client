<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Yajra\DataTables\Facades\DataTables;
use Illuminate\Support\Carbon;

class MaterialMovimentacaoController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $fornecedores;
    public $materiais;

    public function __construct()
    {
        $this->middleware('check-permissao:materiais_movimentacoes_list', ['only' => ['index', 'filter']]);
        $this->middleware('check-permissao:materiais_movimentacoes_create', ['only' => ['create', 'store']]);
        $this->middleware('check-permissao:materiais_movimentacoes_show', ['only' => ['show']]);
        $this->middleware('check-permissao:materiais_movimentacoes_edit', ['only' => ['edit', 'update']]);
        $this->middleware('check-permissao:materiais_movimentacoes_destroy', ['only' => ['destroy']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'materiais_movimentacoes', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Materiais Movimentacoes');
            }
        } else {
            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'materiais_movimentacoes/auxiliary/tables', '', '', '');

            return view('materiais_movimentacoes.index', [
                'fornecedores' => $this->fornecedores,
                'materiais' => $this->materiais
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
            $this->responseApi(1, 4, 'materiais_movimentacoes', '', '', $request->all());

            //Registro criado com sucesso
            if ($this->code == 2010) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else {
                abort(500, 'Erro Interno Materiais Movimentacoes');
            }
        }
    }

    public function show(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'materiais_movimentacoes', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                //Preparando Dados para a View''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //data_emissao
                if ($this->content['data_emissao'] != '') {
                    $this->content['data_emissao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_emissao'], 0, 10))->format('d/m/Y');
                }

                //valor_desconto
                if ($this->content['valor_desconto'] != '') {
                    $this->content['valor_desconto'] = number_format($this->content['valor_desconto'], 2, ",", ".");
                } else {
                    $this->content['valor_desconto'] = 0;
                }

                //valor_total
                if ($this->content['valor_total'] != '') {
                    $this->content['valor_total'] = number_format($this->content['valor_total'], 2, ",", ".");
                } else {
                    $this->content['valor_total'] = 0;
                }
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Materiais Movimentacoes');
            }
        }
    }

    public function edit(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'materiais_movimentacoes', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                //Preparando Dados para a View''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //data_emissao
                if ($this->content['data_emissao'] != '') {
                    $this->content['data_emissao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_emissao'], 0, 10))->format('d/m/Y');
                }

                //valor_desconto
                if ($this->content['valor_desconto'] != '') {
                    $this->content['valor_desconto'] = number_format($this->content['valor_desconto'], 2, ",", ".");
                } else {
                    $this->content['valor_desconto'] = 0;
                }

                //valor_total
                if ($this->content['valor_total'] != '') {
                    $this->content['valor_total'] = number_format($this->content['valor_total'], 2, ",", ".");
                } else {
                    $this->content['valor_total'] = 0;
                }
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Materiais Movimentacoes');
            }
        }
    }

    public function update(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 5, 'materiais_movimentacoes', $id, '', $request->all());

            //Registro alterado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Materiais Movimentacoes');
            }
        }
    }

    public function destroy(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Deletar Registro
            $this->responseApi(1, 6, 'materiais_movimentacoes', $id, '', '');

            //Registro deletado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2040) { //Registro não excluído - pertence a relacionamento com outra(s) tabela(s)
                return response()->json(['error' => $this->message]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error' => $this->message]);
            } else {
                abort(500, 'Erro Interno Materiais Movimentacoes');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'materiais_movimentacoes', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Materiais Movimentacoes');
            }
        } else {
            return view('materiais_movimentacoes.index');
        }
    }
}
