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
    public $funcionarios;
    public $uniformes;
    public $motivos_demissoes;
    public $motivos_afastamentos;
    public $pix_tipos;
    public $atestado_saude_ocupacional_tipos;
    public $empresas;
    public $tomadores_servicos;

    public function __construct()
    {
        $this->middleware('check-permissao:list', ['only' => ['index', 'filter', 'modal_info', 'estatisticas', 'documentos', 'documentos_mensais', 'verificar_documentos_mensais', 'cartoes_emergenciais_dados']]);
        $this->middleware('check-permissao:create', ['only' => ['create', 'store']]);
        $this->middleware('check-permissao:show', ['only' => ['show']]);
        $this->middleware('check-permissao:edit', ['only' => ['edit', 'update', 'upload_fotografia_documento', 'upload_fotografia_cartao_emergencial', 'upload_documento_mensal']]);
        $this->middleware('check-permissao:destroy', ['only' => ['destroy', 'deletar_documento', 'deletar_documento_mensal']]);
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
                    ->editColumn('fotografia_documento', function ($row) {
                        $retorno = "<div class='text-center'>";

                        $fotografia = $row['fotografia_documento'];

                        if (!empty($fotografia) && file_exists(public_path($fotografia))) {
                            $retorno .= "<img src='" . asset($fotografia) . "' alt='' class='img-thumbnail avatar-sm' id='datatable_fotografia_documento_funcionario_id_" . $row['id'] . "'>";
                            $retorno .= "<br>";
                        }

                        $retorno .= "<a href='#' onclick='funcionarioModalInfoControle(2, " . $row['id'] . ");'><span class='bg-warning badge'><i class='bx bx-photo-album font-size-16 align-middle me-1'></i>Info</span></a>";
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->editColumn('funcionario', function ($row) {
                        $retorno = "<div class='text-black'>".$row['name']."</div>";

                        if (!empty($row['tomadorServicoClienteName'])) {
                            $retorno .= "<div class='text-primary small'>:: ".$row['tomadorServicoClienteName']."</div>";
                        }

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
                'clientes' => $this->clientes,
                'funcionarios' => $this->funcionarios,
                'uniformes' => $this->uniformes,
                'motivos_demissoes' => $this->motivos_demissoes,
                'motivos_afastamentos' => $this->motivos_afastamentos,
                'pix_tipos' => $this->pix_tipos,
                'atestado_saude_ocupacional_tipos' => $this->atestado_saude_ocupacional_tipos,
                'empresas' => $this->empresas,
                'tomadores_servicos' => $this->tomadores_servicos
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
                    ->editColumn('fotografia_documento', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<img src='" . asset($row['fotografia_documento']) . "' alt='' class='img-thumbnail avatar-sm' id='datatable_fotografia_documento_funcionario_id_" . $row['id'] . "'>";
                        $retorno .= "<br>";
                        $retorno .= "<a href='#' onclick='funcionarioModalInfoControle(2, " . $row['id'] . ");'><span class='bg-warning badge'><i class='bx bx-photo-album font-size-16 align-middle me-1'></i>Info</span></a>";
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->editColumn('funcionario', function ($row) {
                        $retorno = "<div class='text-black'>".$row['name']."</div>";

                        if (!empty($row['tomadorServicoClienteName'])) {
                            $retorno .= "<div class='text-primary small'>:: ".$row['tomadorServicoClienteName']."</div>";
                        }

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

    public function estatisticas($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'funcionarios/modalInfo/estatisticas/' . $id, '', '', '');

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
        // Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            // Variavel controle
            $error = false;
            $img = null;

            // Verificando e fazendo Upload do Arquivo
            if ($request->hasFile('fun_fotografia_documento_file')) {
                // funcionario_id
                $id = $request['upload_fotografia_documento_funcionario_id'];

                // buscar dados formulario
                $arquivo_tmp = $_FILES["fun_fotografia_documento_file"]["tmp_name"];
                $arquivo_real = $_FILES["fun_fotografia_documento_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["fun_fotografia_documento_file"]["type"];
                $arquivo_size = $_FILES['fun_fotografia_documento_file']['size'];

                if ($arquivo_type == 'image/png' or $arquivo_type == 'image/jpeg' or $arquivo_type == 'image/gif') {
                    if (copy($arquivo_tmp, "build/assets/images/funcionarios/$arquivo_real")) {
                        if (file_exists("build/assets/images/funcionarios/" . $arquivo_real)) {
                            // renomear para fotografia_documento_ID
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
                // Salvar Dados na tabela funcionarios
                $data = array();
                $data['funcionario_id'] = $request['upload_fotografia_documento_funcionario_id'];
                $data['fotografia_documento'] = $img;

                // Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'funcionarios/uploadFotografia/upload_fotografia_documento', '', '', $data);

                // Registro recebido com sucesso
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
        // Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            // Variavel controle
            $error = false;
            $img = null;

            // Verificando e fazendo Upload do Arquivo
            if ($request->hasFile('fun_fotografia_cartao_emergencial_file')) {
                // funcionario_id
                $id = $request['upload_fotografia_cartao_emergencial_funcionario_id'];

                // buscar dados formulario
                $arquivo_tmp = $_FILES["fun_fotografia_cartao_emergencial_file"]["tmp_name"];
                $arquivo_real = $_FILES["fun_fotografia_cartao_emergencial_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["fun_fotografia_cartao_emergencial_file"]["type"];
                $arquivo_size = $_FILES['fun_fotografia_cartao_emergencial_file']['size'];

                if ($arquivo_type == 'image/png' or $arquivo_type == 'image/jpeg' or $arquivo_type == 'image/gif') {
                    if (copy($arquivo_tmp, "build/assets/images/funcionarios/$arquivo_real")) {
                        if (file_exists("build/assets/images/funcionarios/" . $arquivo_real)) {
                            // renomear para fotografia_cartao_emergencial_ID
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
                // Salvar Dados na tabela funcionarios
                $data = array();
                $data['funcionario_id'] = $request['upload_fotografia_cartao_emergencial_funcionario_id'];
                $data['fotografia_cartao_emergencial'] = $img;

                // Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'funcionarios/uploadFotografia/upload_fotografia_cartao_emergencial', '', '', $data);

                // Registro recebido com sucesso
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

    public function editar_documento(Request $request)
    {
        // Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            // Variavel controle
            $error = false;
            $pdf = '';

            // Verificando e fazendo Upload do PDF
            if ($request->hasFile('fun_editar_documentos_file')) {
                // funcionario_id
                $id = $request['editar_documentos_funcionario_id'];

                // buscar dados formulario
                $arquivo_tmp = $_FILES["fun_editar_documentos_file"]["tmp_name"];
                $arquivo_real = $_FILES["fun_editar_documentos_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["fun_editar_documentos_file"]["type"];
                $arquivo_size = $_FILES['fun_editar_documentos_file']['size'];

                if ($arquivo_type == 'application/pdf') {
                    if (copy($arquivo_tmp, "build/assets/pdfs/funcionarios/$arquivo_real")) {
                        if (file_exists("build/assets/pdfs/funcionarios/" . $arquivo_real)) {
                            // renomear para nome id_$id_documento_YmdHis
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
            }

            if (!$error) {
                // Salvar Dados na tabela funcionarios_documentos
                $data = array();
                $data['funcionario_id'] = $request['editar_documentos_funcionario_id'];
                $data['funcionario_documento_id'] = $request['fun_editar_documentos_funcionario_documento_id'];
                $data['operacao'] = $request['fun_editar_documentos_operacao'];
                $data['edificacao_id'] = $request['fun_editar_documentos_edificacao_id'];
                $data['documento_id'] = $request['fun_editar_documentos_documento_id'];
                $data['descricao'] = $request['fun_editar_documentos_descricao'];
                $data['aviso'] = $request['fun_editar_documentos_aviso'];
                $data['data_emissao'] = $request['fun_editar_documentos_data_emissao'];
                $data['data_vencimento'] = $request['fun_editar_documentos_data_vencimento'];

                // se não tem arquivo não manda para não gravar vazio na tabela
                if ($pdf != '') {
                    $data['caminho'] = $pdf;
                }

                // Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'funcionarios/editarDocumento/editar_documento', '', '', $data);

                // Registro recebido com sucesso
                if ($this->code == 2000) {
                    return response()->json(['success' => $this->message]);
                } else {
                    return response()->json(['error' => $this->message]);
                }
            } else {
                return response()->json(['error' => 'PDF (Nome, Tamanho ou Tipo) inválida.']);
            }
        } else {
            return response()->json(['error' => 'Erro na requisição editar Documento PDF']);
        }
    }

    public function documentos(int $funcionario_id)
    {
        // Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            // Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'funcionarios/modalInfo/documentos/' . $funcionario_id, '', '', '');

            // Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else if ($this->code == 4040) { // Registro não encontrado
                echo 'Registro não encontrado.';
            } else {
                echo 'Erro Interno Documentos Pdf.';
            }
        }
    }

    public function entregas_uniformes(int $funcionario_id)
    {
        // Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            // Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'funcionarios/modalInfo/entregas_uniformes/' . $funcionario_id, '', '', '');

            // Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else if ($this->code == 4040) { // Registro não encontrado
                echo 'Registro não encontrado.';
            } else {
                echo 'Erro Interno Entregas Uniformes Pdf.';
            }
        }
    }

    public function deletar_documento(int $funcionario_documento_id)
    {
        // Buscando dados Api_Data() - Deletar Registro
        $this->responseApi(1, 6, 'funcionarios/modalInfo/deletar_documento', $funcionario_documento_id, '', '');

        // Registro deletado com sucesso
        if ($this->code == 2000) {
            // Apagar arquivo
            $caminhoArquivo = $this->content;

            if (file_exists($caminhoArquivo)) {
                unlink($caminhoArquivo);
            }

            return response()->json(['success' => $this->message]);
        } else {
            return response()->json(['error' => $this->message]);
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
                        $arquivoReal = 'tmp_' . $_FILES[$key]["name"];
                        $arquivoType = $_FILES[$key]["type"];

                        // Nome da Label no Formulário
                        $documento_mensal_name = $request['fun_documentos_mensais_name_'.$indice];

                        // Verifica tipo do arquivo
                        if ($arquivoType != 'application/pdf') {
                            $erros[] = "Arquivo '$documento_mensal_name' não é um PDF válido.";
                            continue;
                        }

                        // Faz upload para pasta temporária
                        if (!copy($arquivoTmp, "build/assets/pdfs/funcionarios/$arquivoReal")) {
                            $erros[] = "Falha ao copiar o arquivo '$documento_mensal_name'.";
                            continue;
                        }

                        // Verifica se o arquivo foi realmente salvo
                        if (!file_exists("build/assets/pdfs/funcionarios/$arquivoReal")) {
                            $erros[] = "Arquivo '$documento_mensal_name' não encontrado após upload.";
                            continue;
                        }

                        // Renomeia o arquivo
                        $novoNome = 'id_' . $idFuncionario . '_documento_mensal_' . date('YmdHis') . "_{$indice}";
                        $novoCaminho = "build/assets/pdfs/funcionarios/" . $novoNome . '.' . pathinfo($arquivoReal, PATHINFO_EXTENSION);
                        $origem = "build/assets/pdfs/funcionarios/$arquivoReal";

                        try {
                            rename($origem, $novoCaminho);
                        } catch (\Exception $e) {
                            $erros[] = "Falha ao renomear '$documento_mensal_name'.";
                            continue;
                        }

                        // Monta os dados para API
                        $data = [
                            'funcionario_id' => $idFuncionario,
                            'documento_mensal_funcionario_id' => $indice,
                            'mes' => $request['fun_documentos_mensais_mes'],
                            'ano' => $request['fun_documentos_mensais_ano'],
                            'caminho' => $novoCaminho,
                        ];

                        // Chama a API
                        $this->responseApi(1, 12, 'funcionarios/uploadDocumentoMensal/upload_documento_mensal', '', '', $data);

                        if ($this->code == 2000) {
                            $sucessos[] = "Arquivo '{$documento_mensal_name}' enviado e salvo com sucesso.";
                        } else {
                            $erros[] = "Falha ao registrar '{$documento_mensal_name}' na API.";
                        }
                    } else {
                        // Extrai o sufixo (ex: 3 em fun_documentos_mensais_file_3)
                        $indice = str_replace('fun_documentos_mensais_file_', '', $key);

                        // Nome da Label no Formulário
                        $documento_mensal_name = $request['fun_documentos_mensais_name_'.$indice];

                        $erros[] = "Nenhum arquivo recebido para o campo '$documento_mensal_name'.";
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

    public function verificar_documentos_mensais(int $funcionario_id, string $mes, string $ano)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'funcionarios/modalInfo/verificar_documentos_mensais/' . $funcionario_id . '/' . $mes . '/' . $ano, '', '', '');

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
            $this->responseApi(1, 10, 'funcionarios/modalInfo/documentos_mensais/' . $funcionario_id, '', '', '');

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
        $this->responseApi(1, 6, 'funcionarios/modalInfo/deletar_documento_mensal', $funcionario_documento_mensal_id, '', '');

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

    public function documentos_exigidos(int $funcionario_id)
    {
        // Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            // Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'funcionarios/modalInfo/documentos_exigidos/' . $funcionario_id, '', '', '');

            // Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else {
                return json_encode([]);
            }
        }
    }

    public function documentos_exigidos_save(Request $request)
    {
        // Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            // Buscando dados Api_Data() - Salvar Registros
            $this->responseApi(1, 12, 'funcionarios/modalInfo/documentos_exigidos_save', '', '', $request->all());

            // Registro criado com sucesso
            if ($this->code == 2010) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { // Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else {
                abort(500, 'Erro Interno Client');
            }
        }
    }

    // Ação 1: Entregas de Uniformes - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Ação 1: Entregas de Uniformes - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    public function entregas_uniformes_index()
    {
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            $this->responseApi(1, 10, 'entregas_uniformes/index', '', '', '');

            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 5000) {
                return response()->json(['error' => $this->message]);
            } else {
                abort(500, 'Erro Interno Entrega de Uniforme');
            }
        }
    }

    public function entregas_uniformes_show(int $id)
    {
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            $this->responseApi(1, 2, 'entregas_uniformes', $id, '', '');

            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) {
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Entrega de Uniforme');
            }
        }
    }

    public function entregas_uniformes_store(Request $request)
    {
        // Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            $this->responseApi(1, 12, 'entregas_uniformes/store', '', '', $request->all());

            if ($this->code == 2010) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) {
                return response()->json(['error_validation' => $this->validation]);
            } else {
                abort(500, 'Erro Interno Entrega de Uniforme');
            }
        }
    }

    public function entregas_uniformes_update(Request $request, $id)
    {
        // Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            $this->responseApi(1, 11, 'entregas_uniformes/update/'.$id, '', '', $request->all());

            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) {
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 4040) {
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Entrega de Uniforme');
            }
        }
    }

    public function entregas_uniformes_destroy(int $id)
    {
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            $this->responseApi(1, 13, 'entregas_uniformes/destroy/'.$id, '', '', '');

            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 5000) {
                return response()->json(['error' => $this->message]);
            } else {
                abort(500, 'Erro Interno Entrega de Uniforme');
            }
        }
    }

    public function entregas_uniformes_dados_estatisticas()
    {
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            $this->responseApi(1, 10, 'entregas_uniformes/dados/estatisticas', '', '', '');

            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 5000) {
                return response()->json(['error' => $this->message]);
            } else {
                abort(500, 'Erro Interno Entrega de Uniforme');
            }
        }
    }

    public function recibo_funcionario(int $entrega_uniforme_id, int $funcionario_id)
    {
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            $this->responseApi(1, 10, 'entregas_uniformes/recibo/funcionario/'.$entrega_uniforme_id.'/'.$funcionario_id, '', '', '');

            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 5000) {
                return response()->json(['error' => $this->message]);
            } else {
                abort(500, 'Erro Interno Entrega de Uniforme');
            }
        }
    }
    // Ação 1: Entregas de Uniformes - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Ação 1: Entregas de Uniformes - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
}
