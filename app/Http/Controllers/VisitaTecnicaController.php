<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
    public $visitas_tecnicas_dados;
    public $visita_tecnica_perguntas;

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

                        $retorno = "<div class='row'>";
                        $retorno .= "    <div class='col-2'>";

                        if ($row['vt_cs'] == 1) {
                            $retorno .= "   <a href='#' title='Visita Técnica Completa em PDF' onclick='gerar_visita_tecnica(".$row['id'].", ".$row['visita_tecnica_tipo_id'].", \"pt\", 1);'><i class='fa fa-file-pdf fa-2x text-danger'></i></a>";
                            $retorno .= "   <a href='#' title='Visita Técnica Completa em PDF (Inglês)' onclick='gerar_visita_tecnica(".$row['id'].", ".$row['visita_tecnica_tipo_id'].", \"en\", 1);'><i class='fa fa-file-pdf fa-2x text-primary'></i></a>";
                        }

                        if ($row['vt_cs'] == 2) {
                            $retorno .= "   <a href='#' title='Visita Técnica Sintética em PDF' onclick='gerar_visita_tecnica(".$row['id'].", ".$row['visita_tecnica_tipo_id'].", \"pt\", 2);'><i class='fa fa-file-pdf fa-2x text-danger'></i></a>";
                            $retorno .= "   <a href='#' title='Visita Técnica Sintética em PDF (Inglês)' onclick='gerar_visita_tecnica(".$row['id'].", ".$row['visita_tecnica_tipo_id'].", \"en\", 2);'><i class='fa fa-file-pdf fa-2x text-primary'></i></a>";
                        }

                        $retorno .= "    </div>";
                        $retorno .= "    <div class='col-10'>";
                        $retorno .= "       Visita Técnica nº.&nbsp;".$row['numero_visita_tecnica']."/".$row['ano_visita_tecnica'];
                        $retorno .= "        <br>";
                        $retorno .=         "<span class='".$cor."'>".$row['visitaTecnicaTipoName']."</span>";

                        if ($row['vt_cs'] == 1) {
                            $retorno .= "   &nbsp;&nbsp;&nbsp;<span class='badge bg-info' style='font-size: 100% !important'>Completa</span>";
                        }

                        if ($row['vt_cs'] == 2) {
                            $retorno .= "   &nbsp;&nbsp;&nbsp;<span class='badge bg-warning' style='font-size: 100% !important'>Sintética</span>";
                        }

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
            $this->responseApi(2, 10, 'visitas_tecnicas/auxiliary/tables', '', '', '');

            return view('visitas_tecnicas.index', [
                'clientes' => $this->clientes,
                'funcionarios' => $this->funcionarios,
                'visita_tecnica_tipos' => $this->visita_tecnica_tipos,
                'visita_tecnica_status' => $this->visita_tecnica_status,
                'visitas_tecnicas_dados' => $this->visitas_tecnicas_dados,
                'visita_tecnica_perguntas' => $this->visita_tecnica_perguntas
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

    public function store(Request $request, $cliente_id, $visita_tecnica_tipo_id, $vt_cs)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Colocando dados no request''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            $request['cliente_id'] = $cliente_id;
            $request['visita_tecnica_tipo_id'] = $visita_tecnica_tipo_id;
            $request['vt_cs'] = $vt_cs;
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
                return response()->json(['success' => $this->message, 'visita_tecnica_id' => $this->content['id']]);
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
                //Varrer $this->content que tem Ids para apagar imagens e pdfs relacionados'''''''''''''''''''''''''''''
                $ids = $this->content;

                foreach ($ids as $vtd_id) {
                    //Padrões de busca
                    $patternFotos = "build/assets/images/visitas_tecnicas/visitas_tecnicas_dados_{$vtd_id['id']}_fotografia*";
                    $patternPdfs  = "build/assets/pdfs/visitas_tecnicas/visitas_tecnicas_dados_{$vtd_id['id']}_pdf*";

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
                        $retorno .= "       <a href='#' title='Visita Técnica Completa em PDF' onclick='gerar_visita_tecnica(".$row['id'].", ".$row['visita_tecnica_tipo_id'].", \"pt\", 1);'><i class='fa fa-file-pdf fa-2x text-danger'></i></a>";
                        $retorno .= "       <a href='#' title='Visita Técnica Completa em PDF (Inglês)' onclick='gerar_visita_tecnica(".$row['id'].", ".$row['visita_tecnica_tipo_id'].", \"en\", 1);'><i class='fa fa-file-pdf fa-2x text-primary'></i></a>";
                        $retorno .= "       <br>";
                        $retorno .= "       <a href='#' title='Visita Técnica Sintética em PDF' onclick='gerar_visita_tecnica(".$row['id'].", ".$row['visita_tecnica_tipo_id'].", \"pt\", 2);'><i class='fa fa-file-pdf fa-2x text-warning'></i></a>";
                        $retorno .= "       <a href='#' title='Visita Técnica Sintética em PDF (Inglês)' onclick='gerar_visita_tecnica(".$row['id'].", ".$row['visita_tecnica_tipo_id'].", \"en\", 2);'><i class='fa fa-file-pdf fa-2x text-success'></i></a>";
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

    // Funções VTT1 - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Funções VTT1 - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    public function vtt1_updatePergunta(Request $request, $visita_tecnica_dado_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 11, 'visitas_tecnicas/vtt1/pergunta/updatePergunta/'.$visita_tecnica_dado_id, '', '', $request->all());

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

    public function vtt1_uploadFotografia(Request $request, $visita_tecnica_dado_id, $slot)
    {
        $request->validate([
            'foto' => 'required|image|max:5120'
        ]);

        $file = $request->file('foto');
        $nomeArquivo = "visitas_tecnicas_dados_{$visita_tecnica_dado_id}_fotografia_{$slot}.".$file->getClientOriginalExtension();
        $caminho = "build/assets/images/visitas_tecnicas/$nomeArquivo";

        // Salva o arquivo (use public_path() pois você não está usando Storage)
        $file->move(public_path('build/assets/images/visitas_tecnicas'), $nomeArquivo);

        //Return
        return response()->json(['success' => true, 'path' => asset($caminho)]);
    }

    public function vtt1_removerFotografia(Request $request, $visita_tecnica_dado_id, $slot)
    {
        $caminho = 'build/assets/images/visitas_tecnicas/';

        $nomeArquivo1 = "visitas_tecnicas_dados_{$visita_tecnica_dado_id}_fotografia_{$slot}.jpg";
        $nomeArquivo2 = "visitas_tecnicas_dados_{$visita_tecnica_dado_id}_fotografia_{$slot}.jpeg";
        $nomeArquivo3 = "visitas_tecnicas_dados_{$visita_tecnica_dado_id}_fotografia_{$slot}.png";
        $nomeArquivo4 = "visitas_tecnicas_dados_{$visita_tecnica_dado_id}_fotografia_{$slot}.gif";

        //Remove o arquivo do disco, se existir
        if ($caminho.$nomeArquivo1 && file_exists(public_path($caminho.$nomeArquivo1))) {@unlink(public_path($caminho.$nomeArquivo1));}
        if ($caminho.$nomeArquivo2 && file_exists(public_path($caminho.$nomeArquivo2))) {@unlink(public_path($caminho.$nomeArquivo2));}
        if ($caminho.$nomeArquivo3 && file_exists(public_path($caminho.$nomeArquivo3))) {@unlink(public_path($caminho.$nomeArquivo3));}
        if ($caminho.$nomeArquivo4 && file_exists(public_path($caminho.$nomeArquivo4))) {@unlink(public_path($caminho.$nomeArquivo4));}

        return response()->json(['success' => true, 'xxxx' => $nomeArquivo1]);
    }

    public function vtt1_uploadPdf(Request $request, $visita_tecnica_dado_id, $slot)
    {
        $request->validate([
            'pdf' => 'required|file|mimes:pdf|max:10240' // até 10 MB por exemplo
        ]);

        $file = $request->file('pdf');
        $nomeArquivo = "visitas_tecnicas_dados_{$visita_tecnica_dado_id}_pdf_{$slot}." . $file->getClientOriginalExtension();
        $caminho = "build/assets/pdfs/visitas_tecnicas/$nomeArquivo";

        // Salva o arquivo
        $file->move(public_path('build/assets/pdfs/visitas_tecnicas'), $nomeArquivo);

        // Retorna caminho completo acessível via URL
        return response()->json(['success' => true, 'path' => asset($caminho)]);
    }

    public function vtt1_removerPdf(Request $request, $visita_tecnica_dado_id, $slot)
    {
        $caminho = 'build/assets/pdfs/visitas_tecnicas/';

        $nomeArquivo = "visitas_tecnicas_dados_{$visita_tecnica_dado_id}_pdf_{$slot}.pdf";

        $fullPath = public_path($caminho . $nomeArquivo);

        if (file_exists($fullPath)) {
            @unlink($fullPath);
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'message' => 'Arquivo não encontrado']);
    }

    public function vtt1_atualizar_pergunta(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Acertos nos nomes dos campos
            $request['titulo'] = $request['titulo_'.$id];
            $request['subtitulo'] = $request['subtitulo_'.$id];
            $request['pergunta'] = $request['pergunta_'.$id];
            $request['visita_tecnica_tipo_id'] = $request['visita_tecnica_tipo_id_'.$id];
            $request['completa'] = $request['completa_'.$id];
            $request['completa_ordem'] = $request['completa_ordem_'.$id];
            $request['sintetica'] = $request['sintetica_'.$id];
            $request['sintetica_ordem'] = $request['sintetica_ordem_'.$id];
            $request['opcoes'] = $request['opcoes_'.$id];

            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 11, 'visitas_tecnicas/vtt1/visitas_tecnicas_perguntas/atualizar_pergunta/'.$id, '', '', $request->all());

            //Registro alterado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Funcionário');
            }
        }
    }

    public function vtt1_perguntas_completa_sintetica($vt_cs)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'visitas_tecnicas/vtt1/visitas_tecnicas_perguntas/perguntas_completa_sintetica/'.$vt_cs, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) {
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Client');
            }
        }
    }
    // Funções VTT1 - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Funções VTT1 - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Funções VTT2 - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Funções VTT2 - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    public function vtt2_updatePergunta(Request $request, $visita_tecnica_dado_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 11, 'visitas_tecnicas/vtt2/pergunta/updatePergunta/'.$visita_tecnica_dado_id, '', '', $request->all());

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

    public function vtt2_uploadFotografia(Request $request, $visita_tecnica_dado_id, $slot)
    {
        $request->validate([
            'foto' => 'required|image|max:5120'
        ]);

        $file = $request->file('foto');
        $nomeArquivo = "visitas_tecnicas_dados_{$visita_tecnica_dado_id}_fotografia_{$slot}.".$file->getClientOriginalExtension();
        $caminho = "build/assets/images/visitas_tecnicas/$nomeArquivo";

        // Salva o arquivo (use public_path() pois você não está usando Storage)
        $file->move(public_path('build/assets/images/visitas_tecnicas'), $nomeArquivo);

        //Return
        return response()->json(['success' => true, 'path' => asset($caminho)]);
    }

    public function vtt2_removerFotografia(Request $request, $visita_tecnica_dado_id, $slot)
    {
        $caminho = 'build/assets/images/visitas_tecnicas/';

        $nomeArquivo1 = "visitas_tecnicas_dados_{$visita_tecnica_dado_id}_fotografia_{$slot}.jpg";
        $nomeArquivo2 = "visitas_tecnicas_dados_{$visita_tecnica_dado_id}_fotografia_{$slot}.jpeg";
        $nomeArquivo3 = "visitas_tecnicas_dados_{$visita_tecnica_dado_id}_fotografia_{$slot}.png";
        $nomeArquivo4 = "visitas_tecnicas_dados_{$visita_tecnica_dado_id}_fotografia_{$slot}.gif";

        //Remove o arquivo do disco, se existir
        if ($caminho.$nomeArquivo1 && file_exists(public_path($caminho.$nomeArquivo1))) {@unlink(public_path($caminho.$nomeArquivo1));}
        if ($caminho.$nomeArquivo2 && file_exists(public_path($caminho.$nomeArquivo2))) {@unlink(public_path($caminho.$nomeArquivo2));}
        if ($caminho.$nomeArquivo3 && file_exists(public_path($caminho.$nomeArquivo3))) {@unlink(public_path($caminho.$nomeArquivo3));}
        if ($caminho.$nomeArquivo4 && file_exists(public_path($caminho.$nomeArquivo4))) {@unlink(public_path($caminho.$nomeArquivo4));}

        return response()->json(['success' => true, 'xxxx' => $nomeArquivo1]);
    }

    public function vtt2_uploadPdf(Request $request, $visita_tecnica_dado_id, $slot)
    {
        $request->validate([
            'pdf' => 'required|file|mimes:pdf|max:10240' // até 10 MB por exemplo
        ]);

        $file = $request->file('pdf');
        $nomeArquivo = "visitas_tecnicas_dados_{$visita_tecnica_dado_id}_pdf_{$slot}." . $file->getClientOriginalExtension();
        $caminho = "build/assets/pdfs/visitas_tecnicas/$nomeArquivo";

        // Salva o arquivo
        $file->move(public_path('build/assets/pdfs/visitas_tecnicas'), $nomeArquivo);

        // Retorna caminho completo acessível via URL
        return response()->json(['success' => true, 'path' => asset($caminho)]);
    }

    public function vtt2_removerPdf(Request $request, $visita_tecnica_dado_id, $slot)
    {
        $caminho = 'build/assets/pdfs/visitas_tecnicas/';

        $nomeArquivo = "visitas_tecnicas_dados_{$visita_tecnica_dado_id}_pdf_{$slot}.pdf";

        $fullPath = public_path($caminho . $nomeArquivo);

        if (file_exists($fullPath)) {
            @unlink($fullPath);
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'message' => 'Arquivo não encontrado']);
    }

    public function vtt2_atualizar_pergunta(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Acertos nos nomes dos campos
            $request['titulo'] = $request['titulo_'.$id];
            $request['subtitulo'] = $request['subtitulo_'.$id];
            $request['pergunta'] = $request['pergunta_'.$id];
            $request['visita_tecnica_tipo_id'] = $request['visita_tecnica_tipo_id_'.$id];
            $request['completa'] = $request['completa_'.$id];
            $request['completa_ordem'] = $request['completa_ordem_'.$id];
            $request['sintetica'] = $request['sintetica_'.$id];
            $request['sintetica_ordem'] = $request['sintetica_ordem_'.$id];
            $request['opcoes'] = $request['opcoes_'.$id];

            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 11, 'visitas_tecnicas/vtt2/visitas_tecnicas_perguntas/atualizar_pergunta/'.$id, '', '', $request->all());

            //Registro alterado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Funcionário');
            }
        }
    }

    public function vtt2_perguntas_completa_sintetica($vt_cs)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'visitas_tecnicas/vtt2/visitas_tecnicas_perguntas/perguntas_completa_sintetica/'.$vt_cs, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) {
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Client');
            }
        }
    }
    // Funções VTT2 - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Funções VTT2 - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
}
