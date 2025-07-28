<?php

namespace App\Http\Controllers;

use App\Facades\SuporteFacade;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class FuncionarioController extends Controller
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

    public function __construct()
    {
        $this->middleware('check-permissao:list', ['only' => ['index', 'filter', 'modal_info', 'documentos']]);
        $this->middleware('check-permissao:create', ['only' => ['create', 'store']]);
        $this->middleware('check-permissao:show', ['only' => ['show']]);
        $this->middleware('check-permissao:edit', ['only' => ['edit', 'update', 'upload_foto', 'upload_documento']]);
        $this->middleware('check-permissao:destroy', ['only' => ['destroy']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'funcionarios', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('foto', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<img src='" . asset($row['foto']) . "' alt='' class='img-thumbnail avatar-sm' id='datatable_foto_funcionario_id_" . $row['id'] . "'>";
                        $retorno .= "<br>";
                        $retorno .= "<a href='#' onclick='funcionarioModalInfo(" . $row['id'] . ");'><span class='bg-warning badge'><i class='bx bx-photo-album font-size-16 align-middle me-1'></i>Info</span></a>";
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
                abort(500, 'Erro Interno Funcionário');
            }
        } else {
            //Gerar QRCode Cartões Emergenciais
            SuporteFacade::setGerarQRCodesCartoesEmergenciais();

            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'funcionarios/auxiliary/tables', '', '', '');

            return view('funcionarios.index', [
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
                'clientes' => $this->clientes
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
            //Acerto Request
            if (isset($request['doenca_diabetes'])) {$request['doenca_diabetes'] = 1;} else {$request['doenca_diabetes'] = 0;}
            if (isset($request['doenca_hipertensao'])) {$request['doenca_hipertensao'] = 1;} else {$request['doenca_hipertensao'] = 0;}
            if (isset($request['doenca_asma'])) {$request['doenca_asma'] = 1;} else {$request['doenca_asma'] = 0;}
            if (isset($request['doenca_renal'])) {$request['doenca_renal'] = 1;} else {$request['doenca_renal'] = 0;}
            if (isset($request['doenca_cardiaca'])) {$request['doenca_cardiaca'] = 1;} else {$request['doenca_cardiaca'] = 0;}
            if (isset($request['doenca_familia_diabetes'])) {$request['doenca_familia_diabetes'] = 1;} else {$request['doenca_familia_diabetes'] = 0;}
            if (isset($request['doenca_familia_hipertensao'])) {$request['doenca_familia_hipertensao'] = 1;} else {$request['doenca_familia_hipertensao'] = 0;}
            if (isset($request['doenca_familia_epilepsia'])) {$request['doenca_familia_epilepsia'] = 1;} else {$request['doenca_familia_epilepsia'] = 0;}
            if (isset($request['doenca_familia_cardiaca'])) {$request['doenca_familia_cardiaca'] = 1;} else {$request['doenca_familia_cardiaca'] = 0;}
            if (isset($request['doenca_familia_cancer'])) {$request['doenca_familia_cancer'] = 1;} else {$request['doenca_familia_cancer'] = 0;}

            //Buscando dados Api_Data() - Incluir Registro
            $this->responseApi(1, 4, 'funcionarios', '', '', $request->all());

            //Registro criado com sucesso
            if ($this->code == 2010) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else {
                abort(500, 'Erro Interno Funcionário');
            }
        }
    }

    public function show($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'funcionarios', $id, '', '');

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
                if ($this->content['personal_identidade_data_emissao'] != '') {
                    $this->content['personal_identidade_data_emissao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['personal_identidade_data_emissao'], 0, 10))->format('d/m/Y');
                }
                if ($this->content['professional_identidade_data_emissao'] != '') {
                    $this->content['professional_identidade_data_emissao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['professional_identidade_data_emissao'], 0, 10))->format('d/m/Y');
                }

                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Funcionário');
            }
        }
    }

    public function edit($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'funcionarios', $id, '', '');

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
                if ($this->content['personal_identidade_data_emissao'] != '') {
                    $this->content['personal_identidade_data_emissao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['personal_identidade_data_emissao'], 0, 10))->format('d/m/Y');
                }
                if ($this->content['professional_identidade_data_emissao'] != '') {
                    $this->content['professional_identidade_data_emissao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['professional_identidade_data_emissao'], 0, 10))->format('d/m/Y');
                }

                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Funcionário');
            }
        }
    }

    public function update(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Acerto Request
            if (isset($request['doenca_diabetes'])) {$request['doenca_diabetes'] = 1;} else {$request['doenca_diabetes'] = 0;}
            if (isset($request['doenca_hipertensao'])) {$request['doenca_hipertensao'] = 1;} else {$request['doenca_hipertensao'] = 0;}
            if (isset($request['doenca_asma'])) {$request['doenca_asma'] = 1;} else {$request['doenca_asma'] = 0;}
            if (isset($request['doenca_renal'])) {$request['doenca_renal'] = 1;} else {$request['doenca_renal'] = 0;}
            if (isset($request['doenca_cardiaca'])) {$request['doenca_cardiaca'] = 1;} else {$request['doenca_cardiaca'] = 0;}
            if (isset($request['doenca_familia_diabetes'])) {$request['doenca_familia_diabetes'] = 1;} else {$request['doenca_familia_diabetes'] = 0;}
            if (isset($request['doenca_familia_hipertensao'])) {$request['doenca_familia_hipertensao'] = 1;} else {$request['doenca_familia_hipertensao'] = 0;}
            if (isset($request['doenca_familia_epilepsia'])) {$request['doenca_familia_epilepsia'] = 1;} else {$request['doenca_familia_epilepsia'] = 0;}
            if (isset($request['doenca_familia_cardiaca'])) {$request['doenca_familia_cardiaca'] = 1;} else {$request['doenca_familia_cardiaca'] = 0;}
            if (isset($request['doenca_familia_cancer'])) {$request['doenca_familia_cancer'] = 1;} else {$request['doenca_familia_cancer'] = 0;}

            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 5, 'funcionarios', $id, '', $request->all());

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

    public function destroy($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Deletar Registro
            $this->responseApi(1, 6, 'funcionarios', $id, '', '');

            //Registro deletado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2040) { //Registro não excluído - pertence a relacionamento com outra(s) tabela(s)
                return response()->json(['error' => $this->message]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error' => $this->message]);
            } else {
                abort(500, 'Erro Interno Funcionário');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'funcionarios', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('foto', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<img src='" . asset($row['foto']) . "' alt='' class='img-thumbnail avatar-sm' id='datatable_foto_funcionario_id_" . $row['id'] . "'>";
                        $retorno .= "<br>";
                        $retorno .= "<a href='#' onclick='funcionarioModalInfo(" . $row['id'] . ");'><span class='bg-warning badge'><i class='bx bx-photo-album font-size-16 align-middle me-1'></i>Info</span></a>";
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
                abort(500, 'Erro Interno Funcionário');
            }
        } else {
            return view('funcionarios.index');
        }
    }

    public function modal_info($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'funcionarios/modalInfo/modal_info/' . $id, '', '', '');

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

    public function upload_foto(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Variavel controle
            $error = false;

            //Foto padrão do Sistema
            $foto = "build/assets/images/funcionarios/funcionario-0.png";

            //Verificando e fazendo Upload da Foto novo
            if ($request->hasFile('fun_foto_file')) {
                //funcionario_id
                $id = $request['upload_foto_funcionario_id'];

                //buscar dados formulario
                $arquivo_tmp = $_FILES["fun_foto_file"]["tmp_name"];
                $arquivo_real = $_FILES["fun_foto_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["fun_foto_file"]["type"];
                $arquivo_size = $_FILES['fun_foto_file']['size'];

                if ($arquivo_type == 'image/jpg' or $arquivo_type == 'image/jpeg' or $arquivo_type == 'image/png') {
                    if (copy($arquivo_tmp, "build/assets/images/funcionarios/$arquivo_real")) {
                        if (file_exists("build/assets/images/funcionarios/" . $arquivo_real)) {
                            //apagar foto no diretorio
                            if (file_exists('build/assets/images/funcionarios/funcionario-' . $id . '.png')) {
                                unlink('build/assets/images/funcionarios/funcionario-' . $id . '.png');
                            }
                            if (file_exists('build/assets/images/funcionarios/funcionario-' . $id . '.jpg')) {
                                unlink('build/assets/images/funcionarios/funcionario-' . $id . '.jpg');
                            }
                            if (file_exists('build/assets/images/funcionarios/funcionario-' . $id . '.jpeg')) {
                                unlink('build/assets/images/funcionarios/funcionario-' . $id . '.jpeg');
                            }

                            //Gravar novo
                            $foto = "build/assets/images/funcionarios/funcionario-" . $id . '.' . pathinfo($arquivo_real, PATHINFO_EXTENSION);
                            $de = "build/assets/images/funcionarios/$arquivo_real";
                            $pa = $foto;

                            try {
                                rename($de, $pa);
                            } catch (\Exception $e) {
                                $error = true;
                            }
                        }
                    }
                } else {
                    return response()->json(['error' => 'Escolha um arquivo de imagem válido.']);
                }
            } else {
                return response()->json(['error' => 'Escolha um arquivo de imagem válido.']);
            }

            if (!$error) {
                //Buscando dados Api_Data() - Alterar Registro
                $data = array();
                $data['name'] = $request['upload_foto_funcionario_name'];
                $data['foto'] = $foto;
                $this->responseApi(1, 11, 'funcionarios/uploadFoto/upload_foto/' . $id, '', '', $data);

                //Registro recebido com sucesso
                if ($this->code == 2000) {
                    return response()->json(['success' => $this->message]);
                } else if ($this->code == 4040) {
                    return response()->json(['error' => $this->message]);
                } else {
                    return response()->json(['error' => 'Erro Interno Upload Avatar.']);
                }
            } else {
                return response()->json(['error' => 'Imagem (Nome, Tamanho ou Tipo) inválida.']);
            }
        } else {
            return response()->json(['error' => 'Erro na requisição Upload Avatar']);
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
                $data['caminho'] = $pdf;
                $data['documento_id'] = $request['fun_documentos_documento_id'];
                $data['data_documento'] = $request['fun_documentos_data_documento'];
                $data['aviso'] = $request['fun_documentos_aviso'];

                //Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'funcionarios/uploadDocumento/upload_documento', '', '', $data);

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
            $this->responseApi(1, 10, 'funcionarios/modalInfo/documentos/' . $funcionario_id, '', '', '');

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
        $this->responseApi(1, 6, 'funcionarios/modalInfo/deletar_documento', $funcionario_documento_id, '', '');

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

    public function funcionario_acao_1_gerar_pdf_dados($funcionarios_ids)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registros
            $this->responseApi(1, 10, 'funcionarios/funcionarioAcao1/funcionario_acao_1_gerar_pdf_dados/' . $funcionarios_ids, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else if ($this->code == 4040) { //Registros não encontrados
                echo 'Registros não encontrados.';
            } else {
                echo 'Erro Interno Documentos Pdf.';
            }
        }
    }

    public function funcionario_acao_1_grade_funcionarios()
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registros
            $this->responseApi(1, 10, 'funcionarios/funcionarioAcao1/funcionario_acao_1_grade_funcionarios', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else if ($this->code == 4040) { //Registros não encontrados
                echo 'Registros não encontrados.';
            } else {
                echo 'Erro Interno Documentos Pdf.';
            }
        }
    }

    public function cartoes_emergenciais_dados($ids)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 10, 'funcionarios/cartoes_emergenciais/dados/'.$ids, '', '', '');

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
