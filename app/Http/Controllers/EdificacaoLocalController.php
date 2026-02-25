<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class EdificacaoLocalController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $edificacoes_niveis;

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
            $this->responseApi(1, 1, 'edificacoes_locais', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('edificacao_nivel', function ($row) {
                        $retorno = "<div class='row'>";
                        $retorno .= "   <div class='col-12'><b>Nível&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b> "."<span class='text-warning'>".$row['edificacaoNivelName']."</span>"."</div>";
                        $retorno .= "   <div class='col-12'><b>Edificação&nbsp;&nbsp;:</b> "."<span class='text-success'>".$row['edificacaoName']."</span>"."</div>";
                        $retorno .= "   <div class='col-12'><b>Cliente&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b> "."<span class='text-primary'>".$row['clienteName']."</span>"."</div>";
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
                abort(500, 'Erro Interno Edificação Local');
            }
        } else {
            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'edificacoes_locais/auxiliary/tables', '', '', '');

            return view('edificacoes_locais.index', [
                'edificacoes_niveis' => $this->edificacoes_niveis
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
            $this->responseApi(1, 4, 'edificacoes_locais', '', '', $request->all());

            //Registro criado com sucesso
            if ($this->code == 2010) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else {
                abort(500, 'Erro Interno Edificação Local');
            }
        }
    }

    public function show($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'edificacoes_locais', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Edificação Local');
            }
        }
    }

    public function edit($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'edificacoes_locais', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else if ($this->code == 4423) { // Bloqueio Tabela ou Registro
                return response()->json(['error_lock' => $this->message]);
            } else {
                abort(500, 'Erro Interno Edificação Local');
            }
        }
    }

    public function update(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 5, 'edificacoes_locais', $id, '', $request->all());

            // Registro alterado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else if ($this->code == 4423) { // Bloqueio Tabela ou Registro
                return response()->json(['error_lock' => $this->message]);
            } else {
                abort(500, 'Erro Interno Edificação Local');
            }
        }
    }

    public function destroy($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Deletar Registro
            $this->responseApi(1, 6, 'edificacoes_locais', $id, '', '');

            //Registro deletado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2040) { //Registro não excluído - pertence a relacionamento com outra(s) tabela(s)
                return response()->json(['error' => $this->message]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error' => $this->message]);
            } else if ($this->code == 4423) { // Bloqueio Tabela ou Registro
                return response()->json(['error_lock' => $this->message]);
            } else {
                abort(500, 'Erro Interno Edificação Local');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'edificacoes_locais', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('edificacao_nivel', function ($row) {
                        $retorno = "<div class='row'>";
                        $retorno .= "   <div class='col-12'><b>Nível&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b> "."<span class='text-warning'>".$row['edificacaoNivelName']."</span>"."</div>";
                        $retorno .= "   <div class='col-12'><b>Edificação&nbsp;&nbsp;:</b> "."<span class='text-success'>".$row['edificacaoName']."</span>"."</div>";
                        $retorno .= "   <div class='col-12'><b>Cliente&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b> "."<span class='text-primary'>".$row['clienteName']."</span>"."</div>";
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
                abort(500, 'Erro Interno Edificação Local');
            }
        } else {
            return view('edificacoes_locais.index');
        }
    }
}
