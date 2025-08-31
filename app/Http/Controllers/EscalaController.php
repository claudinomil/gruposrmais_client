<?php

namespace App\Http\Controllers;

use App\Facades\SuporteFacade;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class EscalaController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $clientes;
    public $escala_tipos;
    public $escala_jornadas;

    public function __construct()
    {
        $this->middleware('check-permissao:list', ['only' => ['index', 'filter']]);
        $this->middleware('check-permissao:create', ['only' => ['create', 'store']]);
        $this->middleware('check-permissao:show', ['only' => ['show']]);
        $this->middleware('check-permissao:edit', ['only' => ['edit', 'update']]);
        $this->middleware('check-permissao:destroy', ['only' => ['destroy']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'escalas', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('escala', function ($row) {
                        if ($row['escala_tipo_id'] == 1) {$cor = 'text-success';}
                        if ($row['escala_tipo_id'] == 2) {$cor = 'text-primary';}
                        if ($row['escala_tipo_id'] == 3) {$cor = 'text-info';}

                        $retorno = "<div class='row'>";
                        $retorno .= "    <div class='col-2'>";
                        $retorno .= "       <a href='#' title='Escala em PDF' onclick='gerar_escala(".$row['id'].", \"pt\");'><i class='fa fa-file-pdf fa-2x text-danger'></i></a>";
                        $retorno .= "       <a href='#' title='Escala em PDF (Inglês)' onclick='gerar_escala(".$row['id'].", \"en\");'><i class='fa fa-file-pdf fa-2x text-primary'></i></a>";
                        $retorno .= "    </div>";
                        $retorno .= "    <div class='col-10'>";
                        $retorno .= "       Escala nº.&nbsp;".$row['id']."/".$row['id'];
                        $retorno .= "        <br>";
                        $retorno .=         "<span class='".$cor."'>".$row['escalaTipoName']."</span>";
                        $retorno .= "    </div>";
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->addColumn('action', function ($row) {
                        return $this->columnAction($row['id']);
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Escala');
            }
        } else {
            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'escalas/auxiliary/tables', '', '', '');

            return view('escalas.index', [
                'clientes' => $this->clientes,
                'escala_tipos' => $this->escala_tipos,
                'escala_jornadas' => $this->escala_jornadas
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
            $this->responseApi(1, 4, 'escalas', '', '', $request->all());

            //Registro criado com sucesso
            if ($this->code == 2010) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else {
                abort(500, 'Erro Interno Escala');
            }
        }
    }

    public function show($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'escalas', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Escala');
            }
        }
    }

    public function edit($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'escalas', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Escala');
            }
        }
    }

    public function update(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 5, 'escalas', $id, '', $request->all());

            //Registro alterado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Escala');
            }
        }
    }

    public function destroy($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Deletar Registro
            $this->responseApi(1, 6, 'escalas', $id, '', '');

            //Registro deletado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2040) { //Registro não excluído - pertence a relacionamento com outra(s) tabela(s)
                return response()->json(['error' => $this->message]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error' => $this->message]);
            } else {
                abort(500, 'Erro Interno Escala');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'escalas', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('escala', function ($row) {
                        if ($row['escala_tipo_id'] == 1) {$cor = 'text-success';}
                        if ($row['escala_tipo_id'] == 2) {$cor = 'text-primary';}
                        if ($row['escala_tipo_id'] == 3) {$cor = 'text-info';}

                        $retorno = "<div class='row'>";
                        $retorno .= "    <div class='col-2'>";
                        $retorno .= "       <a href='#' title='Escala em PDF' onclick='gerar_escala(".$row['id'].", \"pt\");'><i class='fa fa-file-pdf fa-2x text-danger'></i></a>";
                        $retorno .= "       <a href='#' title='Escala em PDF (Inglês)' onclick='gerar_escala(".$row['id'].", \"en\");'><i class='fa fa-file-pdf fa-2x text-primary'></i></a>";
                        $retorno .= "    </div>";
                        $retorno .= "    <div class='col-10'>";
                        $retorno .= "       Escala nº.&nbsp;".$row['id']."/".$row['id'];
                        $retorno .= "        <br>";
                        $retorno .=         "<span class='".$cor."'>".$row['escalaTipoName']."</span>";
                        $retorno .= "    </div>";
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->addColumn('action', function ($row) {
                        return $this->columnAction($row['id']);
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Escala');
            }
        } else {
            return view('escalas.index');
        }
    }
}
