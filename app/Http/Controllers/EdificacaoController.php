<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class EdificacaoController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $clientes;
    public $edificacao_classificacoes;
    public $incendio_riscos;

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
            $this->responseApi(1, 1, 'edificacoes', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('clienteName', function ($row) {
                        $retorno = "<div class='text-nowrap'>";
                        $retorno .= $row['clienteName'];
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->editColumn('name', function ($row) {
                        $retorno = "<div class='text-nowrap'>";
                        $retorno .= $row['name'];
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->editColumn('edificacao', function ($row) {
                        $retorno = "<div class='row'>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-success'>Pavimentos:</div>";
                        $retorno .= "       <div class='col text-success text-end'>".$row['pavimentos']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-primary'>Mezaninos:</div>";
                        $retorno .= "       <div class='col text-primary text-end'>".$row['mezaninos']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-warning'>Coberturas:</div>";
                        $retorno .= "       <div class='col text-warning text-end'>".$row['coberturas']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-danger'>Áreas Técnicas:</div>";
                        $retorno .= "       <div class='col text-danger text-end'>".$row['areas_tecnicas']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-success'>Altura:</div>";
                        $retorno .= "       <div class='col text-success text-end'>".number_format($row['altura'], 2, ',', '.')."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-primary'>ATC (m²):</div>";
                        $retorno .= "       <div class='col text-primary text-end'>".number_format($row['area_total_construida'], 2, ',', '.')."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-warning'>Lotação:</div>";
                        $retorno .= "       <div class='col text-warning text-end'>".$row['lotacao']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-danger'>Carga Incêndio:</div>";
                        $retorno .= "       <div class='col text-danger text-end'>".$row['carga_incendio']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-info'>Risco Incêndio:</div>";
                        $retorno .= "       <div class='col text-info text-end'>".$row['incendioRiscoName']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-primary'>Grupo:</div>";
                        $retorno .= "       <div class='col text-primary text-end'>".$row['grupo']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-warning'>Divisão:</div>";
                        $retorno .= "       <div class='col text-warning text-end'>".$row['divisao']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-danger'>Ocupação:</div>";
                        $retorno .= "       <div class='col text-danger text-end'>".$row['ocupacao_uso']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-info'>Descrição:</div>";
                        $retorno .= "       <div class='col text-info text-end'>".$row['descricao']."</div>";
                        $retorno .= "   </div>";
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
                abort(500, 'Erro Interno Edificação');
            }
        } else {
            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'edificacoes/auxiliary/tables', '', '', '');

            return view('edificacoes.index', [
                'clientes' => $this->clientes,
                'edificacao_classificacoes' => $this->edificacao_classificacoes,
                'incendio_riscos' => $this->incendio_riscos
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
            $this->responseApi(1, 4, 'edificacoes', '', '', $request->all());

            //Registro criado com sucesso
            if ($this->code == 2010) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else {
                abort(500, 'Erro Interno Edificação');
            }
        }
    }

    public function show($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'edificacoes', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                // Preparando Dados para a View'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // altura
                $this->content['altura'] = number_format($this->content['altura'], 2, ',', '.');
                $this->content['area_total_construida'] = number_format($this->content['area_total_construida'], 2, ',', '.');
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Edificação');
            }
        }
    }

    public function edit($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'edificacoes', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                // Preparando Dados para a View'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // altura
                $this->content['altura'] = number_format($this->content['altura'], 2, ',', '.');
                $this->content['area_total_construida'] = number_format($this->content['area_total_construida'], 2, ',', '.');
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else if ($this->code == 4423) { // Bloqueio Tabela ou Registro
                return response()->json(['error_lock' => $this->message]);
            } else {
                abort(500, 'Erro Interno Edificação');
            }
        }
    }

    public function update(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 5, 'edificacoes', $id, '', $request->all());

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
                abort(500, 'Erro Interno Edificação');
            }
        }
    }

    public function destroy($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Deletar Registro
            $this->responseApi(1, 6, 'edificacoes', $id, '', '');

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
                abort(500, 'Erro Interno Edificação');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'edificacoes', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('clienteName', function ($row) {
                        $retorno = "<div class='text-nowrap'>";
                        $retorno .= $row['clienteName'];
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->editColumn('name', function ($row) {
                        $retorno = "<div class='text-nowrap'>";
                        $retorno .= $row['name'];
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->editColumn('edificacao', function ($row) {
                        $retorno = "<div class='row'>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-success'>Pavimentos:</div>";
                        $retorno .= "       <div class='col text-success text-end'>".$row['pavimentos']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-primary'>Mezaninos:</div>";
                        $retorno .= "       <div class='col text-primary text-end'>".$row['mezaninos']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-warning'>Coberturas:</div>";
                        $retorno .= "       <div class='col text-warning text-end'>".$row['coberturas']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-danger'>Áreas Técnicas:</div>";
                        $retorno .= "       <div class='col text-danger text-end'>".$row['areas_tecnicas']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-success'>Altura:</div>";
                        $retorno .= "       <div class='col text-success text-end'>".number_format($row['altura'], 2, ',', '.')."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-primary'>ATC (m²):</div>";
                        $retorno .= "       <div class='col text-primary text-end'>".number_format($row['area_total_construida'], 2, ',', '.')."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-warning'>Lotação:</div>";
                        $retorno .= "       <div class='col text-warning text-end'>".$row['lotacao']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-danger'>Carga Incêndio:</div>";
                        $retorno .= "       <div class='col text-danger text-end'>".$row['carga_incendio']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-info'>Risco Incêndio:</div>";
                        $retorno .= "       <div class='col text-info text-end'>".$row['incendioRiscoName']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-primary'>Grupo:</div>";
                        $retorno .= "       <div class='col text-primary text-end'>".$row['grupo']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-warning'>Divisão:</div>";
                        $retorno .= "       <div class='col text-warning text-end'>".$row['divisao']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-danger'>Ocupação:</div>";
                        $retorno .= "       <div class='col text-danger text-end'>".$row['ocupacao_uso']."</div>";
                        $retorno .= "   </div>";
                        $retorno .= "   <div class='row'>";
                        $retorno .= "       <div class='col-auto text-info'>Descrição:</div>";
                        $retorno .= "       <div class='col text-info text-end'>".$row['descricao']."</div>";
                        $retorno .= "   </div>";
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
                abort(500, 'Erro Interno Edificação');
            }
        } else {
            return view('edificacoes.index');
        }
    }

    public function edificacao_niveis($edificacao_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'edificacoes/dados/edificacao_niveis/'.$edificacao_id, '', '', '');

            //Registros recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }
}
