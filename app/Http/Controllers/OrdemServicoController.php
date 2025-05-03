<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class OrdemServicoController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $clientes;
    public $servicos;
    public $funcionarios;
    public $ordem_servico_prioridades;
    public $ordem_servico_tipos;
    public $ordem_servico_status;
    public $formas_pagamentos;
    public $formas_pagamentos_status;
    public $veiculos;
    public $clientes_executivos;

    public function __construct()
    {
        $this->middleware('check-permissao:ordens_servicos_list', ['only' => ['index', 'filter']]);
        $this->middleware('check-permissao:ordens_servicos_create', ['only' => ['create', 'store']]);
        $this->middleware('check-permissao:ordens_servicos_show', ['only' => ['show']]);
        $this->middleware('check-permissao:ordens_servicos_edit', ['only' => ['edit', 'update']]);
        $this->middleware('check-permissao:ordens_servicos_destroy', ['only' => ['destroy']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'ordens_servicos', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->editColumn('ordem_servico', function ($row) {
                        if ($row['ordem_servico_tipo_id'] == 1) {$cor = 'text-success';}
                        if ($row['ordem_servico_tipo_id'] == 2) {$cor = 'text-primary';}
                        if ($row['ordem_servico_tipo_id'] == 3) {$cor = 'text-info';}

                        $retorno = "<div class='row'>";
                        $retorno .= "    <div class='col-2'>";
                        $retorno .= "       <a href='#' title='Ordem Serviço em PDF' onclick='gerar_ordem_servico(".$row['id'].", ".$row['ordem_servico_tipo_id'].");'><i class='fa fa-file-pdf fa-2x text-danger'></i></a>";
                        $retorno .= "       <a href='#' title='Ordem Serviço em PDF (Inglês)' onclick='gerar_ordem_servico(".$row['id'].", ".$row['ordem_servico_tipo_id'].", \"en\");'><i class='fa fa-file-pdf fa-2x text-primary'></i></a>";
                        $retorno .= "    </div>";
                        $retorno .= "    <div class='col-10'>";
                        $retorno .= "       Ordem Serviço nº.&nbsp;".$row['numero_ordem_servico']."/".$row['ano_ordem_servico'];
                        $retorno .= "        <br>";
                        $retorno .=         "<span class='".$cor."'>".$row['ordemServicoTipoName']."</span>";
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
            $this->responseApi(2, 10, 'ordens_servicos/auxiliary/tables/'.$empresa_id, '', '', '');

            return view('ordens_servicos.index', [
                'clientes' => $this->clientes,
                'servicos' => $this->servicos,
                'funcionarios' => $this->funcionarios,
                'ordem_servico_prioridades' => $this->ordem_servico_prioridades,
                'ordem_servico_tipos' => $this->ordem_servico_tipos,
                'ordem_servico_status' => $this->ordem_servico_status,
                'formas_pagamentos' => $this->formas_pagamentos,
                'formas_pagamentos_status' => $this->formas_pagamentos_status,
                'veiculos' => $this->veiculos,
                'clientes_executivos' => $this->clientes_executivos
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
            //Ajustando Request (retirando o prefixo de acordo com o ordem_servico_tipo_id''''''''''''''''''''''''''''''
            $data = $request->all();
            $processedData = [];
            $prefixo = '';

            if ($request['ordem_servico_tipo_id'] == 1) {$prefixo = 'ost1_';}
            if ($request['ordem_servico_tipo_id'] == 2) {$prefixo = 'ost2_';}
            if ($request['ordem_servico_tipo_id'] == 3) {$prefixo = 'ost3_';}

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
            $this->responseApi(1, 4, 'ordens_servicos', '', '', $processedData);

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
            $this->responseApi(1, 2, 'ordens_servicos', $id, '', '');

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

                //porcentagem_desconto
                if ($this->content['porcentagem_desconto'] != '') {
                    $this->content['porcentagem_desconto'] = number_format($this->content['porcentagem_desconto'], 2, ",", ".");
                } else {
                    $this->content['porcentagem_desconto'] = 0;
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
                abort(500, 'Erro Interno Client');
            }
        }
    }

    public function edit($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'ordens_servicos', $id, '', '');

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

                //porcentagem_desconto
                if ($this->content['porcentagem_desconto'] != '') {
                    $this->content['porcentagem_desconto'] = number_format($this->content['porcentagem_desconto'], 2, ",", ".");
                } else {
                    $this->content['porcentagem_desconto'] = 0;
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
                abort(500, 'Erro Interno Client');
            }
        }
    }

    public function update(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Ajustando Request (retirando o prefixo de acordo com o ordem_servico_tipo_id''''''''''''''''''''''''''''''
            $data = $request->all();
            $processedData = [];
            $prefixo = '';

            if ($request['ordem_servico_tipo_id'] == 1) {$prefixo = 'ost1_';}
            if ($request['ordem_servico_tipo_id'] == 2) {$prefixo = 'ost2_';}
            if ($request['ordem_servico_tipo_id'] == 3) {$prefixo = 'ost3_';}

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
            $this->responseApi(1, 5, 'ordens_servicos', $id, '', $processedData);

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
            $this->responseApi(1, 6, 'ordens_servicos', $id, '', '');

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
            $this->responseApi(1, 3, 'ordens_servicos', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->editColumn('numero_ordem_servico', function ($row) {
                        if ($row['ordem_servico_tipo_id'] == 1) {$cor = 'text-success';}
                        if ($row['ordem_servico_tipo_id'] == 2) {$cor = 'text-primary';}
                        if ($row['ordem_servico_tipo_id'] == 3) {$cor = 'text-info';}

                        $retorno = "<div class='row'>";
                        $retorno .= "    <div class='col-2'>";
                        $retorno .= "       <a href='#' title='Ordem Serviço em PDF' onclick='gerar_ordem_servico(".$row['id'].", ".$row['ordem_servico_tipo_id'].");'><i class='fa fa-file-pdf fa-2x text-danger'></i></a>";
                        $retorno .= "       <a href='#' title='Ordem Serviço em PDF (Inglês)' onclick='gerar_ordem_servico(".$row['id'].", ".$row['ordem_servico_tipo_id'].", \"en\");'><i class='fa fa-file-pdf fa-2x text-primary'></i></a>";
                        $retorno .= "    </div>";
                        $retorno .= "    <div class='col-10'>";
                        $retorno .= "       Ordem Serviço nº.&nbsp;".$row['numero_ordem_servico']."/".$row['ano_ordem_servico'];
                        $retorno .= "        <br>";
                        $retorno .=         "<span class='".$cor."'>".$row['ordemServicoTipoName']."</span>";
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
            return view('ordens_servicos.index');
        }
    }
}
