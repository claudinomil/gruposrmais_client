<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class RelatorioExaustaoController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $clientes;
    public $relatorio_exaustao_status;

    public function __construct()
    {
        $this->middleware('check-permissao:relatorios_exaustoes_list', ['only' => ['index', 'filter']]);
        $this->middleware('check-permissao:relatorios_exaustoes_create', ['only' => ['create', 'store']]);
        $this->middleware('check-permissao:relatorios_exaustoes_show', ['only' => ['show']]);
        $this->middleware('check-permissao:relatorios_exaustoes_edit', ['only' => ['edit', 'update']]);
        $this->middleware('check-permissao:relatorios_exaustoes_destroy', ['only' => ['destroy']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'relatorios_exaustoes', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->editColumn('relatorio_exaustao', function ($row) {
                        $retorno = "<div class='row'>";
                        $retorno .= "    <div class='col-2'>";
                        $retorno .= "       <a href='#' title='Relatório em PDF' onclick='gerar_relatorio_exaustao(".$row['id'].");'><i class='fa fa-file-pdf fa-2x text-danger'></i></a>";
                        $retorno .= "       <a href='#' title='Relatório em PDF (Inglês)' onclick='gerar_relatorio_exaustao(".$row['id'].", \"en\");'><i class='fa fa-file-pdf fa-2x text-primary'></i></a>";
                        $retorno .= "    </div>";
                        $retorno .= "    <div class='col-10'>";
                        $retorno .= "       Relatório nº.&nbsp;".$row['numero_relatorio_exaustao']."/".$row['ano_relatorio_exaustao'];
                        $retorno .= "        <br>";
                        $retorno .=         "<span class='text-black'>".$row['relatorioExaustaoStatusName']."</span>";
                        $retorno .= "    </div>";
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Client');
            }
        } else {
            //pegando o empresa_id
            $empresa_id = session('userLogged_empresa_id');

            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'relatorios_exaustoes/auxiliary/tables/'.$empresa_id, '', '', '');

            return view('relatorios_exaustoes.index', [
                'clientes' => $this->clientes,
                'relatorio_exaustao_status' => $this->relatorio_exaustao_status
            ]);
        }
    }

    public function create()
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
            $this->responseApi(1, 4, 'relatorios_exaustoes', '', '', $request->all());

            //Registro criado com sucesso
            if ($this->code == 2010) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else {
                abort(500, 'Erro Interno Client');
            }
        }
    }

    public function show($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'relatorios_exaustoes', $id, '', '');

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

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Client');
            }
        }
    }

    public function edit($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'relatorios_exaustoes', $id, '', '');

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

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Client');
            }
        }
    }

    public function update(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 5, 'relatorios_exaustoes', $id, '', $request->all());

            //Registro alterado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Client');
            }
        }
    }

    public function destroy($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Deletar Registro
            $this->responseApi(1, 6, 'relatorios_exaustoes', $id, '', '');

            //Registro deletado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2040) { //Registro não excluído - pertence a relacionamento com outra(s) tabela(s)
                return response()->json(['error' => $this->message]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error' => $this->message]);
            } else {
                abort(500, 'Erro Interno Client');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'relatorios_exaustoes', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->editColumn('numero_relatorio_exaustao', function ($row) {
                        $retorno = "<div class='row'>";
                        $retorno .= "    <div class='col-2'>";
                        $retorno .= "       <a href='#' title='Relatório em PDF' onclick='gerar_relatorio_exaustao(".$row['id'].");'><i class='fa fa-file-pdf fa-2x text-danger'></i></a>";
                        $retorno .= "       <a href='#' title='Relatório em PDF (Inglês)' onclick='gerar_relatorio_exaustao(".$row['id'].", \"en\");'><i class='fa fa-file-pdf fa-2x text-primary'></i></a>";
                        $retorno .= "    </div>";
                        $retorno .= "    <div class='col-10'>";
                        $retorno .= "       Relatório nº.&nbsp;".$row['numero_relatorio_exaustao']."/".$row['ano_relatorio_exaustao'];
                        $retorno .= "        <br>";
                        $retorno .=         "<span class='text-black'>".$row['relatorioExaustaoStatusName']."</span>";
                        $retorno .= "    </div>";
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Client');
            }
        } else {
            return view('relatorios_exaustoes.index');
        }
    }
}
