<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class VistoriaSistemaController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $edificacoes;
    public $funcionarios;
    public $vistoria_sistema_status;
    public $vistorias_sistemas_dados;
    public $vistoria_sistema_perguntas;

    public function __construct()
    {
        $this->middleware('check-permissao:vistorias_sistemas_list', ['only' => ['index', 'filter']]);
        $this->middleware('check-permissao:vistorias_sistemas_create', ['only' => ['create', 'store']]);
        $this->middleware('check-permissao:vistorias_sistemas_show', ['only' => ['show']]);
        $this->middleware('check-permissao:vistorias_sistemas_edit', ['only' => ['edit', 'update']]);
        $this->middleware('check-permissao:vistorias_sistemas_destroy', ['only' => ['destroy']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'vistorias_sistemas', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->editColumn('vistoria_sistema', function ($row) {
                        $retorno = "<div class='row'>";
                        $retorno .= "    <div class='col-2'>";
                        $retorno .= "   <a href='#' title='Vistoria Sistema em PDF' onclick='gerar_vistoria_sistema(" . $row['id'] . ", \"pt\", 1);'><i class='fa fa-file-pdf fa-2x text-danger'></i></a>";
                        $retorno .= "   <a href='#' title='Vistoria Sistema em PDF (Inglês)' onclick='gerar_vistoria_sistema(" . $row['id'] . ", \"en\", 1);'><i class='fa fa-file-pdf fa-2x text-primary'></i></a>";
                        $retorno .= "    </div>";
                        $retorno .= "    <div class='col-10'>";
                        $retorno .= "       Vistoria Sistema nº.&nbsp;" . $row['numero_vistoria_sistema'] . "/" . $row['ano_vistoria_sistema'];
                        $retorno .= "       <br>";
                        $retorno .=         "<span class='text-primary'>".$row['edificacao_nome']."</span>";
                        $retorno .= "       <br>";
                        $retorno .=         "<span class='text-success'>".$row['cliente_nome']."</span>";
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
            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'vistorias_sistemas/auxiliary/tables', '', '', '');

            return view('vistorias_sistemas.index', [
                'edificacoes' => $this->edificacoes,
                'funcionarios' => $this->funcionarios,
                'vistoria_sistema_status' => $this->vistoria_sistema_status,
                'vistorias_sistemas_dados' => $this->vistorias_sistemas_dados,
                'vistoria_sistema_perguntas' => $this->vistoria_sistema_perguntas
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
            // Buscando dados Api_Data() - Incluir Registro
            $this->responseApi(1, 4, 'vistorias_sistemas', '', '', $request->all());

            // Registro criado com sucesso
            if ($this->code == 2010) {
                return response()->json(['success' => $this->message, 'vistoria_sistema_id' => $this->content['id']]);
            } else if ($this->code == 2020) { // Falha na validação dos dados
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
            $this->responseApi(1, 2, 'vistorias_sistemas', $id, '', '');

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
            $this->responseApi(1, 2, 'vistorias_sistemas', $id, '', '');

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
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 5, 'vistorias_sistemas', $id, '', $request->all());

            //Registro alterado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 2040) {
                return response()->json(['error' => $this->message]);
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
            $this->responseApi(1, 6, 'vistorias_sistemas', $id, '', '');

            //Registro deletado com sucesso
            if ($this->code == 2000) {
                //Varrer $this->content que tem Ids para apagar imagens e pdfs relacionados'''''''''''''''''''''''''''''
                $ids = $this->content;

                foreach ($ids as $vtd_id) {
                    //Padrões de busca
                    $patternFotos = "build/assets/images/vistorias_sistemas/vistorias_sistemas_dados_{$vtd_id['id']}_fotografia*";
                    $patternPdfs  = "build/assets/pdfs/vistorias_sistemas/vistorias_sistemas_dados_{$vtd_id['id']}_pdf*";

                    //dd($patternPdfs);

                    //Apaga Fotos
                    foreach (glob($patternFotos) as $file) {
                        if (is_file($file)) {
                            unlink($file);
                        }
                    }

                    //Apaga PDFs
                    foreach (glob($patternPdfs) as $file) {
                        if (is_file($file)) {
                            unlink($file);
                        }
                    }
                }
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

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
            $this->responseApi(1, 3, 'vistorias_sistemas', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->editColumn('vistoria_sistema', function ($row) {
                        $retorno = "<div class='row'>";
                        $retorno .= "    <div class='col-2'>";
                        $retorno .= "   <a href='#' title='Vistoria Sistema em PDF' onclick='gerar_vistoria_sistema(" . $row['id'] . ", \"pt\", 1);'><i class='fa fa-file-pdf fa-2x text-danger'></i></a>";
                        $retorno .= "   <a href='#' title='Vistoria Sistema em PDF (Inglês)' onclick='gerar_vistoria_sistema(" . $row['id'] . ", \"en\", 1);'><i class='fa fa-file-pdf fa-2x text-primary'></i></a>";
                        $retorno .= "    </div>";
                        $retorno .= "    <div class='col-10'>";
                        $retorno .= "       Vistoria Sistema nº.&nbsp;" . $row['numero_vistoria_sistema'] . "/" . $row['ano_vistoria_sistema'];
                        $retorno .= "       <br>";
                        $retorno .=         "<span class='text-primary'>".$row['edificacao_nome']."</span>";
                        $retorno .= "       <br>";
                        $retorno .=         "<span class='text-success'>".$row['cliente_nome']."</span>";
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
            return view('vistorias_sistemas.index');
        }
    }

    public function updatePergunta(Request $request, $vistoria_sistema_dado_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 11, 'vistorias_sistemas/pergunta/updatePergunta/' . $vistoria_sistema_dado_id, '', '', $request->all());

            //Registro alterado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2040) {
                return response()->json(['error' => $this->message]);
            } else {
                abort(500, 'Erro Interno Client');
            }
        }
    }

    public function uploadFotografia(Request $request, $vistoria_sistema_dado_id, $slot)
    {
        $request->validate([
            'foto' => 'required|image|max:5120'
        ]);

        $file = $request->file('foto');
        $nomeArquivo = "vistorias_sistemas_dados_{$vistoria_sistema_dado_id}_fotografia_{$slot}." . $file->getClientOriginalExtension();
        $caminho = "build/assets/images/vistorias_sistemas/$nomeArquivo";

        // Salva o arquivo (use public_path() pois você não está usando Storage)
        $file->move(public_path('build/assets/images/vistorias_sistemas'), $nomeArquivo);

        //Return
        return response()->json(['success' => true, 'path' => asset($caminho)]);
    }

    public function removerFotografia(Request $request, $vistoria_sistema_dado_id, $slot)
    {
        $caminho = 'build/assets/images/vistorias_sistemas/';

        $nomeArquivo1 = "vistorias_sistemas_dados_{$vistoria_sistema_dado_id}_fotografia_{$slot}.jpg";
        $nomeArquivo2 = "vistorias_sistemas_dados_{$vistoria_sistema_dado_id}_fotografia_{$slot}.jpeg";
        $nomeArquivo3 = "vistorias_sistemas_dados_{$vistoria_sistema_dado_id}_fotografia_{$slot}.png";
        $nomeArquivo4 = "vistorias_sistemas_dados_{$vistoria_sistema_dado_id}_fotografia_{$slot}.gif";

        //Remove o arquivo do disco, se existir
        if ($caminho . $nomeArquivo1 && file_exists(public_path($caminho . $nomeArquivo1))) {
            @unlink(public_path($caminho . $nomeArquivo1));
        }
        if ($caminho . $nomeArquivo2 && file_exists(public_path($caminho . $nomeArquivo2))) {
            @unlink(public_path($caminho . $nomeArquivo2));
        }
        if ($caminho . $nomeArquivo3 && file_exists(public_path($caminho . $nomeArquivo3))) {
            @unlink(public_path($caminho . $nomeArquivo3));
        }
        if ($caminho . $nomeArquivo4 && file_exists(public_path($caminho . $nomeArquivo4))) {
            @unlink(public_path($caminho . $nomeArquivo4));
        }

        return response()->json(['success' => true, 'xxxx' => $nomeArquivo1]);
    }

    public function uploadPdf(Request $request, $vistoria_sistema_dado_id, $slot)
    {
        $request->validate([
            'pdf' => 'required|file|mimes:pdf|max:10240' // até 10 MB por exemplo
        ]);

        $file = $request->file('pdf');
        $nomeArquivo = "vistorias_sistemas_dados_{$vistoria_sistema_dado_id}_pdf_{$slot}." . $file->getClientOriginalExtension();
        $caminho = "build/assets/pdfs/vistorias_sistemas/$nomeArquivo";

        // Salva o arquivo
        $file->move(public_path('build/assets/pdfs/vistorias_sistemas'), $nomeArquivo);

        // Retorna caminho completo acessível via URL
        return response()->json(['success' => true, 'path' => asset($caminho)]);
    }

    public function removerPdf(Request $request, $vistoria_sistema_dado_id, $slot)
    {
        $caminho = 'build/assets/pdfs/vistorias_sistemas/';

        $nomeArquivo = "vistorias_sistemas_dados_{$vistoria_sistema_dado_id}_pdf_{$slot}.pdf";

        $fullPath = public_path($caminho . $nomeArquivo);

        if (file_exists($fullPath)) {
            @unlink($fullPath);
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'message' => 'Arquivo não encontrado']);
    }
}
