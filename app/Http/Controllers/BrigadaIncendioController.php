<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Yajra\DataTables\Facades\DataTables;
use Illuminate\Support\Carbon;

class BrigadaIncendioController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $clientes;
    public $produtos;
    public $escala_tipos;

    public function __construct()
    {
        $this->middleware('check-permissao:brigadas_incendios_list', ['only' => ['index', 'filter', 'dados']]);
        $this->middleware('check-permissao:brigadas_incendios_create', ['only' => ['create', 'store']]);
        $this->middleware('check-permissao:brigadas_incendios_show', ['only' => ['show']]);
        $this->middleware('check-permissao:brigadas_incendios_edit', ['only' => ['edit', 'update']]);
        $this->middleware('check-permissao:brigadas_incendios_destroy', ['only' => ['destroy']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'brigadas_incendios', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->editColumn('brigada_incendio', function ($row) {
                        $retorno = "Brigada Incêndio nº.&nbsp;".$row['numero_brigada_incendio']."/".$row['ano_brigada_incendio'];

                        return $retorno;
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Brigadas Incêndios');
            }
        } else {
            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'brigadas_incendios/auxiliary/tables', '', '', '');

            return view('brigadas_incendios.index', [
                'clientes' => $this->clientes,
                'produtos' => $this->produtos,
                'escala_tipos' => $this->escala_tipos
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
            $this->responseApi(1, 4, 'brigadas_incendios', '', '', $request->all());

            //Registro criado com sucesso
            if ($this->code == 2010) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else {
                abort(500, 'Erro Interno Brigadas Incêndios');
            }
        }
    }

    public function show(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'brigadas_incendios', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                //Preparando Dados para a View''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //data_abertura
                if ($this->content['data_abertura'] != '') {
                    $this->content['data_abertura'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_abertura'], 0, 10))->format('d/m/Y');
                }

                //data_prevista
                if ($this->content['data_prevista'] != '') {
                    $this->content['data_prevista'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_prevista'], 0, 10))->format('d/m/Y');
                }

                //data_conclusao
                if ($this->content['data_conclusao'] != '') {
                    $this->content['data_conclusao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_conclusao'], 0, 10))->format('d/m/Y');
                }

                //data_finalizacao
                if ($this->content['data_finalizacao'] != '') {
                    $this->content['data_finalizacao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_finalizacao'], 0, 10))->format('d/m/Y');
                }
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Brigadas Incêndios');
            }
        }
    }

    public function edit(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'brigadas_incendios', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                //Preparando Dados para a View''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //data_abertura
                if ($this->content['data_abertura'] != '') {
                    $this->content['data_abertura'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_abertura'], 0, 10))->format('d/m/Y');
                }

                //data_prevista
                if ($this->content['data_prevista'] != '') {
                    $this->content['data_prevista'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_prevista'], 0, 10))->format('d/m/Y');
                }

                //data_conclusao
                if ($this->content['data_conclusao'] != '') {
                    $this->content['data_conclusao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_conclusao'], 0, 10))->format('d/m/Y');
                }

                //data_finalizacao
                if ($this->content['data_finalizacao'] != '') {
                    $this->content['data_finalizacao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_finalizacao'], 0, 10))->format('d/m/Y');
                }
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Brigadas Incêndios');
            }
        }
    }

    public function update(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 5, 'brigadas_incendios', $id, '', $request->all());

            //Registro alterado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Brigadas Incêndios');
            }
        }
    }

    public function destroy(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Deletar Registro
            $this->responseApi(1, 6, 'brigadas_incendios', $id, '', '');

            //Registro deletado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2040) { //Registro não excluído - pertence a relacionamento com outra(s) tabela(s)
                return response()->json(['error' => $this->message]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error' => $this->message]);
            } else {
                abort(500, 'Erro Interno Brigadas Incêndios');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'brigadas_incendios', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->editColumn('brigada_incendio', function ($row) {
                        $retorno = "Brigada Incêndio nº.&nbsp;".$row['numero_brigada_incendio']."/".$row['ano_brigada_incendio'];

                        return $retorno;
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Brigadas Incêndios');
            }
        } else {
            return view('brigadas_incendios.index');
        }
    }

    public function dados($op)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 10, 'brigadas_incendios/dados/tables/'.$op, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json($this->content);
            } else {
                abort(500, 'Erro Interno Brigadas Incêndios');
            }
        }
    }
}
