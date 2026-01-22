<?php

namespace App\Http\Controllers;

use App\Facades\SuporteFacade;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class ClientesFuncionarioController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $contratacao_tipos;
    public $generos;
    public $estados_civis;
    public $escolaridades;
    public $nacionalidades;
    public $naturalidades;
    public $identidade_orgaos;
    public $identidade_estados;
    public $departamentos;
    public $funcoes;
    public $bancos;
    public $documentos;
    public $clientes;
    public $motivos_demissoes;
    public $motivos_afastamentos;
    public $pix_tipos;
    public $atestado_saude_ocupacional_tipos;
    public $empresas;

    public function __construct()
    {
        $this->middleware('check-permissao:list', ['only' => ['index', 'filter', 'modal_info', 'estatisticas', 'documentos', 'documentos_mensais', 'verificar_documentos_mensais', 'cartoes_emergenciais_dados', 'tomadores_servicos']]);
        $this->middleware('check-permissao:show', ['only' => ['show']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'clientes_funcionarios', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('fotografia_documento', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<img src='" . asset($row['fotografia_documento']) . "' alt='' class='img-thumbnail avatar-sm' id='datatable_fotografia_documento_funcionario_id_" . $row['id'] . "'>";
                        $retorno .= "<br>";
                        $retorno .= "<a href='#' onclick='funcionarioModalInfoControle(2, " . $row['id'] . ");'><span class='bg-warning badge'><i class='bx bx-photo-album font-size-16 align-middle me-1'></i>Info</span></a>";
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->editColumn('data_nascimento', function ($row) {
                        if ($row['data_nascimento'] !== null) {
                            $retorno = date('d/m/Y', strtotime($row['data_nascimento']));
                        } else {
                            $retorno = '';
                        }

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
                abort(500, 'Erro Interno Clientes Funcionário');
            }
        } else {
            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'clientes_funcionarios/auxiliary/tables', '', '', '');

            return view('clientes_funcionarios.index', [
                'contratacao_tipos' => $this->contratacao_tipos,
                'generos' => $this->generos,
                'estados_civis' => $this->estados_civis,
                'escolaridades' => $this->escolaridades,
                'nacionalidades' => $this->nacionalidades,
                'naturalidades' => $this->naturalidades,
                'identidade_orgaos' => $this->identidade_orgaos,
                'identidade_estados' => $this->identidade_estados,
                'departamentos' => $this->departamentos,
                'funcoes' => $this->funcoes,
                'bancos' => $this->bancos,
                'documentos' => $this->documentos,
                'clientes' => $this->clientes,
                'motivos_demissoes' => $this->motivos_demissoes,
                'motivos_afastamentos' => $this->motivos_afastamentos,
                'pix_tipos' => $this->pix_tipos,
                'atestado_saude_ocupacional_tipos' => $this->atestado_saude_ocupacional_tipos,
                'empresas' => $this->empresas
            ]);
        }
    }

    public function show($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'clientes_funcionarios', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                //Preparando Dados para a View
                if ($this->content['data_nascimento'] != '') {
                    $this->content['data_nascimento'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_nascimento'], 0, 10))->format('d/m/Y');
                }
                if ($this->content['data_admissao'] != '') {
                    $this->content['data_admissao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_admissao'], 0, 10))->format('d/m/Y');
                }
                if ($this->content['data_demissao'] != '') {
                    $this->content['data_demissao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_demissao'], 0, 10))->format('d/m/Y');
                }
                if ($this->content['data_cadastro'] != '') {
                    $this->content['data_cadastro'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_cadastro'], 0, 10))->format('d/m/Y');
                }
                if ($this->content['data_afastamento'] != '') {
                    $this->content['data_afastamento'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_afastamento'], 0, 10))->format('d/m/Y');
                }
                if ($this->content['carteira_nacional_data_emissao'] != '') {
                    $this->content['carteira_nacional_data_emissao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['carteira_nacional_data_emissao'], 0, 10))->format('d/m/Y');
                }
                if ($this->content['personal_identidade_data_emissao'] != '') {
                    $this->content['personal_identidade_data_emissao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['personal_identidade_data_emissao'], 0, 10))->format('d/m/Y');
                }
                if ($this->content['professional_identidade_data_emissao'] != '') {
                    $this->content['professional_identidade_data_emissao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['professional_identidade_data_emissao'], 0, 10))->format('d/m/Y');
                }
                if ($this->content['atestado_saude_ocupacional_data_emissao'] != '') {
                    $this->content['atestado_saude_ocupacional_data_emissao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['atestado_saude_ocupacional_data_emissao'], 0, 10))->format('d/m/Y');
                }

                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Clientes Funcionário');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'clientes_funcionarios', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('fotografia_documento', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<img src='" . asset($row['fotografia_documento']) . "' alt='' class='img-thumbnail avatar-sm' id='datatable_fotografia_documento_funcionario_id_" . $row['id'] . "'>";
                        $retorno .= "<br>";
                        $retorno .= "<a href='#' onclick='funcionarioModalInfoControle(2, " . $row['id'] . ");'><span class='bg-warning badge'><i class='bx bx-photo-album font-size-16 align-middle me-1'></i>Info</span></a>";
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->editColumn('data_nascimento', function ($row) {
                        if ($row['data_nascimento'] !== null) {
                            $retorno = date('d/m/Y', strtotime($row['data_nascimento']));
                        } else {
                            $retorno = '';
                        }

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
                abort(500, 'Erro Interno Clientes Funcionário');
            }
        } else {
            return view('clientes_funcionarios.index');
        }
    }

    public function modal_info($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes_funcionarios/modalInfo/modal_info/' . $id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else if ($this->code == 4040) { //Registro não encontrado
                echo 'Registro não encontrado.';
            } else {
                echo 'Erro Interno Modal Info.';
            }
        }
    }

    public function estatisticas($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes_funcionarios/modalInfo/estatisticas/' . $id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else if ($this->code == 4040) { //Registro não encontrado
                echo 'Registro não encontrado.';
            } else {
                echo 'Erro Interno Modal Info.';
            }
        }
    }

    public function upload_fotografia_documento(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Variavel controle
            $error = false;

            //Verificando e fazendo Upload do Arquivo
            if ($request->hasFile('fun_fotografia_documento_file')) {
                //funcionario_id
                $id = $request['upload_fotografia_documento_funcionario_id'];

                //buscar dados formulario
                $arquivo_tmp = $_FILES["fun_fotografia_documento_file"]["tmp_name"];
                $arquivo_real = $_FILES["fun_fotografia_documento_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["fun_fotografia_documento_file"]["type"];
                $arquivo_size = $_FILES['fun_fotografia_documento_file']['size'];

                if ($arquivo_type == 'image/png' or $arquivo_type == 'image/jpeg' or $arquivo_type == 'image/gif') {
                    if (copy($arquivo_tmp, "build/assets/images/funcionarios/$arquivo_real")) {
                        if (file_exists("build/assets/images/funcionarios/" . $arquivo_real)) {
                            //renomear para fotografia_documento_ID
                            $name = 'fotografia_documento_' . $id;
                            $img = "build/assets/images/funcionarios/" . $name . '.' . pathinfo($arquivo_real, PATHINFO_EXTENSION);
                            $de = "build/assets/images/funcionarios/$arquivo_real";
                            $pa = $img;

                            try {
                                rename($de, $pa);
                            } catch (\Exception $e) {
                                $error = true;
                            }
                        }
                    }
                } else {
                    return response()->json(['error' => 'Escolha um arquivo válido.']);
                }
            } else {
                return response()->json(['error' => 'Escolha um arquivo válido.']);
            }

            if (!$error) {
                //Salvar Dados na tabela funcionarios
                $data = array();
                $data['funcionario_id'] = $request['upload_fotografia_documento_funcionario_id'];
                $data['fotografia_documento'] = $img;

                //Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'clientes_funcionarios/uploadFotografia/upload_fotografia_documento', '', '', $data);

                //Registro recebido com sucesso
                if ($this->code == 2000) {
                    return response()->json(['success' => $this->message]);
                } else {
                    return response()->json(['error' => 'Erro Interno Upload Fotografia Documento.']);
                }
            } else {
                return response()->json(['error' => 'IMG (Nome, Tamanho ou Tipo) inválida.']);
            }
        } else {
            return response()->json(['error' => 'Erro na requisição Upload Fotografia Documento']);
        }
    }

    public function upload_fotografia_cartao_emergencial(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Variavel controle
            $error = false;

            //Verificando e fazendo Upload do Arquivo
            if ($request->hasFile('fun_fotografia_cartao_emergencial_file')) {
                //funcionario_id
                $id = $request['upload_fotografia_cartao_emergencial_funcionario_id'];

                //buscar dados formulario
                $arquivo_tmp = $_FILES["fun_fotografia_cartao_emergencial_file"]["tmp_name"];
                $arquivo_real = $_FILES["fun_fotografia_cartao_emergencial_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["fun_fotografia_cartao_emergencial_file"]["type"];
                $arquivo_size = $_FILES['fun_fotografia_cartao_emergencial_file']['size'];

                if ($arquivo_type == 'image/png' or $arquivo_type == 'image/jpeg' or $arquivo_type == 'image/gif') {
                    if (copy($arquivo_tmp, "build/assets/images/funcionarios/$arquivo_real")) {
                        if (file_exists("build/assets/images/funcionarios/" . $arquivo_real)) {
                            //renomear para fotografia_cartao_emergencial_ID
                            $name = 'fotografia_cartao_emergencial_' . $id;
                            $img = "build/assets/images/funcionarios/" . $name . '.' . pathinfo($arquivo_real, PATHINFO_EXTENSION);
                            $de = "build/assets/images/funcionarios/$arquivo_real";
                            $pa = $img;

                            try {
                                rename($de, $pa);
                            } catch (\Exception $e) {
                                $error = true;
                            }
                        }
                    }
                } else {
                    return response()->json(['error' => 'Escolha um arquivo válido.']);
                }
            } else {
                return response()->json(['error' => 'Escolha um arquivo válido.']);
            }

            if (!$error) {
                //Salvar Dados na tabela funcionarios
                $data = array();
                $data['funcionario_id'] = $request['upload_fotografia_cartao_emergencial_funcionario_id'];
                $data['fotografia_cartao_emergencial'] = $img;

                //Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'clientes_funcionarios/uploadFotografia/upload_fotografia_cartao_emergencial', '', '', $data);

                //Registro recebido com sucesso
                if ($this->code == 2000) {
                    return response()->json(['success' => $this->message]);
                } else {
                    return response()->json(['error' => 'Erro Interno Upload Fotografia Cartão Emergencial.']);
                }
            } else {
                return response()->json(['error' => 'IMG (Nome, Tamanho ou Tipo) inválida.']);
            }
        } else {
            return response()->json(['error' => 'Erro na requisição Upload Fotografia Cartão Emergencial']);
        }
    }

    public function upload_documento(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Variavel controle
            $error = false;

            //Verificando e fazendo Upload do PDF
            if ($request->hasFile('fun_documentos_file')) {
                //funcionario_id
                $id = $request['upload_documentos_funcionario_id'];

                //buscar dados formulario
                $arquivo_tmp = $_FILES["fun_documentos_file"]["tmp_name"];
                $arquivo_real = $_FILES["fun_documentos_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["fun_documentos_file"]["type"];
                $arquivo_size = $_FILES['fun_documentos_file']['size'];

                if ($arquivo_type == 'application/pdf') {
                    if (copy($arquivo_tmp, "build/assets/pdfs/funcionarios/$arquivo_real")) {
                        if (file_exists("build/assets/pdfs/funcionarios/" . $arquivo_real)) {
                            //renomear para nome id_$id_documento_YmdHis
                            $name = 'id_' . $id . '_documento_' . date('YmdHis');
                            $pdf = "build/assets/pdfs/funcionarios/" . $name . '.' . pathinfo($arquivo_real, PATHINFO_EXTENSION);
                            $de = "build/assets/pdfs/funcionarios/$arquivo_real";
                            $pa = $pdf;

                            try {
                                rename($de, $pa);
                            } catch (\Exception $e) {
                                $error = true;
                            }
                        }
                    }
                } else {
                    return response()->json(['error' => 'Escolha um arquivo pdf válido.']);
                }
            } else {
                return response()->json(['error' => 'Escolha um arquivo pdf válido.']);
            }

            if (!$error) {
                //Salvar Dados na tabela funcionarios_documentos
                $data = array();
                $data['funcionario_id'] = $request['upload_documentos_funcionario_id'];
                $data['acao'] = $request['upload_documentos_fun_acao'];
                $data['name'] = $name;
                $data['documento_id'] = $request['fun_documentos_documento_id'];
                $data['caminho'] = $pdf;
                $data['data_documento'] = $request['fun_documentos_data_documento'];
                $data['aviso'] = $request['fun_documentos_aviso'];

                //Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'clientes_funcionarios/uploadDocumento/upload_documento', '', '', $data);

                //Registro recebido com sucesso
                if ($this->code == 2000) {
                    return response()->json(['success' => $this->message]);
                } else {
                    return response()->json(['error' => 'Erro Interno Upload Documento PDF.']);
                }
            } else {
                return response()->json(['error' => 'PDF (Nome, Tamanho ou Tipo) inválida.']);
            }
        } else {
            return response()->json(['error' => 'Erro na requisição Upload Documento PDF']);
        }
    }

    public function documentos($funcionario_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes_funcionarios/modalInfo/documentos/' . $funcionario_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else if ($this->code == 4040) { //Registro não encontrado
                echo 'Registro não encontrado.';
            } else {
                echo 'Erro Interno Documentos Pdf.';
            }
        }
    }

    public function deletar_documento($funcionario_documento_id)
    {
        //Buscando dados Api_Data() - Deletar Registro
        $this->responseApi(1, 6, 'clientes_funcionarios/modalInfo/deletar_documento', $funcionario_documento_id, '', '');

        //Registro deletado com sucesso
        if ($this->code == 2000) {
            //Apagar arquivo
            $caminhoArquivo = $this->content;

            if (file_exists($caminhoArquivo)) {
                unlink($caminhoArquivo);
            }

            return response()->json(['success' => $this->message]);
        } else {
            return response()->json(['error' => $this->message]);
        }
    }

    public function tomadores_servicos($funcionario_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes_funcionarios/modalInfo/tomadores_servicos/' . $funcionario_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else if ($this->code == 4040) { //Registro não encontrado
                echo 'Registro não encontrado.';
            } else {
                echo 'Erro Interno Serviços Pdf.';
            }
        }
    }

    public function upload_documento_mensal(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            $erros = [];
            $sucessos = [];

            // Percorre todos os campos de arquivo enviados
            foreach ($_FILES as $key => $file) {
                // Só processa os campos que começam com "fun_documentos_mensais_file_"
                if (strpos($key, 'fun_documentos_mensais_file_') === 0) {

                    // Verifica se há arquivo enviado
                    if ($request->hasFile($key)) {

                        // Extrai o sufixo (ex: 3 em fun_documentos_mensais_file_3)
                        $indice = str_replace('fun_documentos_mensais_file_', '', $key);

                        // Dados do formulário
                        $idFuncionario = $request['upload_documentos_mensais_funcionario_id'];
                        $arquivoTmp = $_FILES[$key]["tmp_name"];
                        $arquivoReal = $_FILES[$key]["name"];
                        $arquivoReal = utf8_decode('tmp_' . $arquivoReal);
                        $arquivoType = $_FILES[$key]["type"];

                        // Verifica tipo do arquivo
                        if ($arquivoType != 'application/pdf') {
                            $erros[] = "Arquivo '$arquivoReal' não é um PDF válido.";
                            continue;
                        }

                        // Faz upload para pasta temporária
                        if (!copy($arquivoTmp, "build/assets/pdfs/funcionarios/$arquivoReal")) {
                            $erros[] = "Falha ao copiar o arquivo '$arquivoReal'.";
                            continue;
                        }

                        // Verifica se o arquivo foi realmente salvo
                        if (!file_exists("build/assets/pdfs/funcionarios/$arquivoReal")) {
                            $erros[] = "Arquivo '$arquivoReal' não encontrado após upload.";
                            continue;
                        }

                        // Renomeia o arquivo
                        $novoNome = 'id_' . $idFuncionario . '_documento_mensal_' . date('YmdHis') . "_{$indice}";
                        $novoCaminho = "build/assets/pdfs/funcionarios/" . $novoNome . '.' . pathinfo($arquivoReal, PATHINFO_EXTENSION);
                        $origem = "build/assets/pdfs/funcionarios/$arquivoReal";

                        try {
                            rename($origem, $novoCaminho);
                        } catch (\Exception $e) {
                            $erros[] = "Falha ao renomear '$arquivoReal'.";
                            continue;
                        }

                        // Monta os dados para API
                        $data = [
                            'funcionario_id' => $idFuncionario,
                            'acao' => $request['upload_documentos_mensais_fun_acao'],
                            'documento_mensal_funcionario_id' => $indice,
                            'mes' => $request['fun_documentos_mensais_mes'],
                            'ano' => $request['fun_documentos_mensais_ano'],
                            'caminho' => $novoCaminho,
                        ];

                        // Chama a API
                        $this->responseApi(1, 12, 'clientes_funcionarios/uploadDocumentoMensal/upload_documento_mensal', '', '', $data);

                        if ($this->code == 2000) {
                            $sucessos[] = "Arquivo '{$arquivoReal}' enviado e salvo com sucesso.";
                        } else {
                            $erros[] = "Falha ao registrar '{$arquivoReal}' na API.";
                        }
                    } else {
                        $erros[] = "Nenhum arquivo recebido para o campo '$key'.";
                    }
                }
            }

            // Retorna resultado consolidado
            if (count($erros) > 0) {
                return response()->json([
                    'error' => 'Alguns arquivos não foram processados corretamente.',
                    'sucessos' => $sucessos,
                    'erros' => $erros,
                ]);
            } else {
                return response()->json([
                    'success' => 'Todos os arquivos foram enviados e gravados com sucesso!',
                    'sucessos' => $sucessos,
                ]);
            }
        } else {
            return response()->json(['error' => 'Erro na requisição Upload Documento Mensal PDF']);
        }
    }

    public function verificar_documentos_mensais($funcionario_id, $mes, $ano)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes_funcionarios/modalInfo/verificar_documentos_mensais/' . $funcionario_id . '/' . $mes . '/' . $ano, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else if ($this->code == 4040) { //Registro não encontrado
                echo 'Registro não encontrado.';
            } else {
                echo 'Erro Interno Verificar Documentos Mensais Pdf.';
            }
        }
    }

    public function documentos_mensais($funcionario_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes_funcionarios/modalInfo/documentos_mensais/' . $funcionario_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else if ($this->code == 4040) { //Registro não encontrado
                echo 'Registro não encontrado.';
            } else {
                echo 'Erro Interno Documentos Mensais Pdf.';
            }
        }
    }

    public function deletar_documento_mensal($funcionario_documento_mensal_id)
    {
        //Buscando dados Api_Data() - Deletar Registro
        $this->responseApi(1, 6, 'clientes_funcionarios/modalInfo/deletar_documento_mensal', $funcionario_documento_mensal_id, '', '');

        //Registro deletado com sucesso
        if ($this->code == 2000) {
            //Apagar arquivo
            $caminhoArquivo = $this->content;

            if (file_exists($caminhoArquivo)) {
                unlink($caminhoArquivo);
            }

            return response()->json(['success' => $this->message]);
        } else {
            return response()->json(['error' => $this->message]);
        }
    }

    public function cartoes_emergenciais_dados($ids)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 10, 'clientes_funcionarios/cartoes_emergenciais/dados/'.$ids, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 2040) {
                return response()->json(['error' => $this->message]);
            } else {
                abort(500, 'Erro Interno Client');
            }
        }
    }
}
