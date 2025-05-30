<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class VisitaTecnicaController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $clientes;
    public $funcionarios;
    public $visita_tecnica_tipos;
    public $visita_tecnica_status;

    public function __construct()
    {
        $this->middleware('check-permissao:visitas_tecnicas_list', ['only' => ['index', 'filter']]);
        $this->middleware('check-permissao:visitas_tecnicas_create', ['only' => ['create', 'store']]);
        $this->middleware('check-permissao:visitas_tecnicas_show', ['only' => ['show']]);
        $this->middleware('check-permissao:visitas_tecnicas_edit', ['only' => ['edit', 'update']]);
        $this->middleware('check-permissao:visitas_tecnicas_destroy', ['only' => ['destroy']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'visitas_tecnicas', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->editColumn('visita_tecnica', function ($row) {
                        if ($row['visita_tecnica_tipo_id'] == 1) {$cor = 'text-success';}
                        if ($row['visita_tecnica_tipo_id'] == 2) {$cor = 'text-primary';}
                        if ($row['visita_tecnica_tipo_id'] == 3) {$cor = 'text-info';}

                        $retorno = "<div class='row'>";
                        $retorno .= "    <div class='col-2'>";
                        $retorno .= "       <a href='#' title='Visita Técnica em PDF' onclick='gerar_visita_tecnica(".$row['id'].", ".$row['visita_tecnica_tipo_id'].");'><i class='fa fa-file-pdf fa-2x text-danger'></i></a>";
                        $retorno .= "       <a href='#' title='Visita Técnica em PDF (Inglês)' onclick='gerar_visita_tecnica(".$row['id'].", ".$row['visita_tecnica_tipo_id'].", \"en\");'><i class='fa fa-file-pdf fa-2x text-primary'></i></a>";
                        $retorno .= "    </div>";
                        $retorno .= "    <div class='col-10'>";
                        $retorno .= "       Visita Técnica nº.&nbsp;".$row['numero_visita_tecnica']."/".$row['ano_visita_tecnica'];
                        $retorno .= "        <br>";
                        $retorno .=         "<span class='".$cor."'>".$row['visitaTecnicaTipoName']."</span>";
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
            $this->responseApi(2, 10, 'visitas_tecnicas/auxiliary/tables/'.$empresa_id, '', '', '');

            return view('visitas_tecnicas.index', [
                'clientes' => $this->clientes,
                'funcionarios' => $this->funcionarios,
                'visita_tecnica_tipos' => $this->visita_tecnica_tipos,
                'visita_tecnica_status' => $this->visita_tecnica_status
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

    public function store(Request $request, $visita_tecnica_tipo_id, $cliente_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Colocando dados no request''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            $request['visita_tecnica_tipo_id'] = $visita_tecnica_tipo_id;
            $request['cliente_id'] = $cliente_id;
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Ajustando Request (retirando o prefixo de acordo com o visita_tecnica_tipo_id'''''''''''''''''''''''''''''
            $data = $request->all();
            $processedData = [];
            $prefixo = '';

            if ($request['visita_tecnica_tipo_id'] == 1) {$prefixo = 'vtt1_';}
            if ($request['visita_tecnica_tipo_id'] == 2) {$prefixo = 'vtt2_';}

            if ($prefixo != '') {
                foreach ($data as $key => $value) {
                    if (str_starts_with($key, $prefixo)) {
                        $newKey = substr($key, 5);
                    } else {
                        // Senão, mantém a chave como está
                        $newKey = $key;
                    }

                    $processedData[$newKey] = $value;
                }
            }
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Buscando dados Api_Data() - Incluir Registro
            $this->responseApi(1, 4, 'visitas_tecnicas', '', '', $processedData);

            //Registro criado com sucesso
            if ($this->code == 2010) {
                return response()->json(['success' => $this->message, 'cliente_id' => $this->content['id']]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 2040) {
                return response()->json(['error' => $this->message]);
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
            $this->responseApi(1, 2, 'visitas_tecnicas', $id, '', '');

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
                abort(500, 'Erro Interno Client');
            }
        }
    }

    public function edit($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'visitas_tecnicas', $id, '', '');

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
                abort(500, 'Erro Interno Client');
            }
        }
    }

    public function update(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Ajustando Request (retirando o prefixo de acordo com o visita_tecnica_tipo_id''''''''''''''''''''''''''''''
            $data = $request->all();
            $processedData = [];
            $prefixo = '';

            if ($request['visita_tecnica_tipo_id'] == 1) {$prefixo = 'vtt1_';}
            if ($request['visita_tecnica_tipo_id'] == 2) {$prefixo = 'vtt2_';}

            if ($prefixo != '') {
                foreach ($data as $key => $value) {
                    if (str_starts_with($key, $prefixo)) {
                        $newKey = substr($key, 5);
                    } else {
                        // Senão, mantém a chave como está
                        $newKey = $key;
                    }

                    $processedData[$newKey] = $value;
                }
            }
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 5, 'visitas_tecnicas', $id, '', $processedData);

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
            $this->responseApi(1, 6, 'visitas_tecnicas', $id, '', '');

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
            $this->responseApi(1, 3, 'visitas_tecnicas', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->editColumn('numero_visita_tecnica', function ($row) {
                        if ($row['visita_tecnica_tipo_id'] == 1) {$cor = 'text-success';}
                        if ($row['visita_tecnica_tipo_id'] == 2) {$cor = 'text-primary';}
                        if ($row['visita_tecnica_tipo_id'] == 3) {$cor = 'text-info';}

                        $retorno = "<div class='row'>";
                        $retorno .= "    <div class='col-2'>";
                        $retorno .= "       <a href='#' title='Visita Técnica em PDF' onclick='gerar_visita_tecnica(".$row['id'].", ".$row['visita_tecnica_tipo_id'].");'><i class='fa fa-file-pdf fa-2x text-danger'></i></a>";
                        $retorno .= "       <a href='#' title='Visita Técnica em PDF (Inglês)' onclick='gerar_visita_tecnica(".$row['id'].", ".$row['visita_tecnica_tipo_id'].", \"en\");'><i class='fa fa-file-pdf fa-2x text-primary'></i></a>";
                        $retorno .= "    </div>";
                        $retorno .= "    <div class='col-10'>";
                        $retorno .= "       Visita Técnica nº.&nbsp;".$row['numero_visita_tecnica']."/".$row['ano_visita_tecnica'];
                        $retorno .= "        <br>";
                        $retorno .=         "<span class='".$cor."'>".$row['visitaTecnicaTipoName']."</span>";
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
            return view('visitas_tecnicas.index');
        }
    }
}
