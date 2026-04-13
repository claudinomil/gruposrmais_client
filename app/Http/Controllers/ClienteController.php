<?php

namespace App\Http\Controllers;

use App\Facades\SuporteFacade;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class ClienteController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $clientes;
    public $generos;
    public $bancos;
    public $identidade_orgaos;
    public $identidade_estados;
    public $documentos;
    public $edificacoes;
    public $edificacoes_niveis;
    public $edificacoes_locais;
    public $sistemas_preventivos;

    public function __construct()
    {
        $this->middleware('check-permissao:clientes_list', ['only' => ['index', 'filter']]);
        $this->middleware('check-permissao:clientes_create', ['only' => ['create', 'store']]);
        $this->middleware('check-permissao:clientes_show', ['only' => ['show']]);
        $this->middleware('check-permissao:clientes_edit', ['only' => ['edit', 'update']]);
        $this->middleware('check-permissao:clientes_destroy', ['only' => ['destroy']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'clientes', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('name', function ($row) {
                        $retorno = "<div class='text-black'>".$row['name']."</div>";

                        if (!empty($row['nome_fantasia'])) {
                            $retorno .= "<div class='text-primary small'>"."<b>".":: Nome Fantasia: "."</b>".$row['nome_fantasia']."</div>";
                        }

                        if (!empty($row['principalClienteName'])) {
                            $retorno .= "<div class='text-success small'>"."<b>".":: Principal: "."</b>".$row['principalClienteName']."</div>";
                        }

                        if (!empty($row['redeClienteName'])) {
                            $retorno .= "<div class='text-danger small'>"."<b>".":: Rede: "."</b>".$row['redeClienteName']."</div>";
                        }

                        return $retorno;
                    })
                    ->editColumn('perfil', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<a href='#' onclick='clienteModalInfoControle(2, " . $row['id'] . ");'><span class='bg-warning badge'><i class='bx bx-photo-album font-size-16 align-middle me-1'></i>Info</span></a>";
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->editColumn('cnpj', function ($row) {
                        if ($row['tipo'] == 1) {
                            $retorno = "<div style='white-space: nowrap;'>".SuporteFacade::formatarCNPJ($row['cnpj'])."</div>";
                        } else if ($row['tipo'] == 2) {
                            $retorno = "<div style='white-space: nowrap;'>".SuporteFacade::formatarCPF($row['cpf'])."</div>";
                        } else {
                            $retorno = '';
                        }

                        return $retorno;
                    })
                    ->editColumn('status', function ($row) {
                        if ($row['status'] == 1) {
                            $retorno = 'ATIVO';
                        } else if ($row['status'] == 2) {
                            $retorno = 'INATIVO';
                        } else {
                            $retorno = '';
                        }

                        return $retorno;
                    })
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
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
            $this->responseApi(2, 10, 'clientes/auxiliary/tables', '', '', '');

            //chamar view
            return view('clientes.index', [
                'evento' => 'index',
                'clientes' => $this->clientes,
                'generos' => $this->generos,
                'bancos' => $this->bancos,
                'identidade_orgaos' => $this->identidade_orgaos,
                'identidade_estados' => $this->identidade_estados,
                'documentos' => $this->documentos,
                'edificacoes' => $this->edificacoes,
                'edificacoes_locais' => $this->edificacoes_locais,
                'edificacoes_niveis' => $this->edificacoes_niveis,
                'sistemas_preventivos' => $this->sistemas_preventivos
            ]);
        }
    }

    public function create(Request $request)
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
            $this->responseApi(1, 4, 'clientes', '', '', $request->all());

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

    public function show(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'clientes', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                //Preparando Dados para a View
                if ($this->content['data_nascimento'] != '') {
                    $this->content['data_nascimento'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_nascimento'], 0, 10))->format('d/m/Y');
                }
                if ($this->content['identidade_data_emissao'] != '') {
                    $this->content['identidade_data_emissao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['identidade_data_emissao'], 0, 10))->format('d/m/Y');
                }

                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Client');
            }
        }
    }

    public function edit(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'clientes', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                //Preparando Dados para a View
                if ($this->content['data_nascimento'] != '') {
                    $this->content['data_nascimento'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_nascimento'], 0, 10))->format('d/m/Y');
                }
                if ($this->content['identidade_data_emissao'] != '') {
                    $this->content['identidade_data_emissao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['identidade_data_emissao'], 0, 10))->format('d/m/Y');
                }

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
            $this->responseApi(1, 5, 'clientes', $id, '', $request->all());

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

    public function destroy(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Deletar Registro
            $this->responseApi(1, 6, 'clientes', $id, '', '');

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
            $this->responseApi(1, 3, 'clientes', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('name', function ($row) {
                        $retorno = "<div class='text-black'>".$row['name']."</div>";

                        if (!empty($row['nome_fantasia'])) {
                            $retorno .= "<div class='text-primary small'>"."<b>".":: Nome Fantasia: "."</b>".$row['nome_fantasia']."</div>";
                        }

                        if (!empty($row['principalClienteName'])) {
                            $retorno .= "<div class='text-success small'>"."<b>".":: Principal: "."</b>".$row['principalClienteName']."</div>";
                        }

                        if (!empty($row['redeClienteName'])) {
                            $retorno .= "<div class='text-danger small'>"."<b>".":: Rede: "."</b>".$row['redeClienteName']."</div>";
                        }

                        return $retorno;
                    })
                    ->editColumn('perfil', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<a href='#' onclick='clienteModalInfoControle(2, " . $row['id'] . ");'><span class='bg-warning badge'><i class='bx bx-photo-album font-size-16 align-middle me-1'></i>Info</span></a>";
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->editColumn('cnpj', function ($row) {
                        if ($row['tipo'] == 1) {
                            $retorno = "<div style='white-space: nowrap;'>".SuporteFacade::formatarCNPJ($row['cnpj'])."</div>";
                        } else if ($row['tipo'] == 2) {
                            $retorno = "<div style='white-space: nowrap;'>".SuporteFacade::formatarCPF($row['cpf'])."</div>";
                        } else {
                            $retorno = '';
                        }

                        return $retorno;
                    })
                    ->editColumn('status', function ($row) {
                        if ($row['status'] == 1) {
                            $retorno = 'ATIVO';
                        } else if ($row['status'] == 2) {
                            $retorno = 'INATIVO';
                        } else {
                            $retorno = '';
                        }

                        return $retorno;
                    })
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Client');
            }
        } else {
            return view('clientes.index');
        }
    }

    public function modal_info($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes/modalInfo/modal_info/' . $id, '', '', '');

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
            $this->responseApi(1, 10, 'clientes/modalInfo/estatisticas/' . $id, '', '', '');

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

    public function upload_logotipo_principal(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Variavel controle
            $error = false;

            //Verificando e fazendo Upload do Arquivo
            if ($request->hasFile('cli_logotipo_principal_file')) {
                //cliente_id
                $id = $request['upload_logotipo_principal_cliente_id'];

                //buscar dados formulario
                $arquivo_tmp = $_FILES["cli_logotipo_principal_file"]["tmp_name"];
                $arquivo_real = $_FILES["cli_logotipo_principal_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["cli_logotipo_principal_file"]["type"];
                $arquivo_size = $_FILES['cli_logotipo_principal_file']['size'];

                if ($arquivo_type == 'image/png' or $arquivo_type == 'image/jpeg' or $arquivo_type == 'image/gif') {
                    if (copy($arquivo_tmp, "build/assets/images/clientes/$arquivo_real")) {
                        if (file_exists("build/assets/images/clientes/" . $arquivo_real)) {
                            //renomear para logotipo_principal_ID
                            $name = 'logotipo_principal_' . $id;
                            $img = "build/assets/images/clientes/" . $name . '.' . pathinfo($arquivo_real, PATHINFO_EXTENSION);
                            $de = "build/assets/images/clientes/$arquivo_real";
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
                //Salvar Dados na tabela clientes
                $data = array();
                $data['cliente_id'] = $request['upload_logotipo_principal_cliente_id'];
                $data['logotipo_principal'] = $img;

                //Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'clientes/uploadLogotipo/upload_logotipo_principal', '', '', $data);

                //Registro recebido com sucesso
                if ($this->code == 2000) {
                    return response()->json(['success' => $this->message]);
                } else {
                    return response()->json(['error' => 'Erro Interno Upload Logotipo Principal.']);
                }
            } else {
                return response()->json(['error' => 'IMG (Nome, Tamanho ou Tipo) inválida.']);
            }
        } else {
            return response()->json(['error' => 'Erro na requisição Upload Logotipo Principal']);
        }
    }

    public function upload_logotipo_relatorios(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Variavel controle
            $error = false;

            //Verificando e fazendo Upload do Arquivo
            if ($request->hasFile('cli_logotipo_relatorios_file')) {
                //cliente_id
                $id = $request['upload_logotipo_relatorios_cliente_id'];

                //buscar dados formulario
                $arquivo_tmp = $_FILES["cli_logotipo_relatorios_file"]["tmp_name"];
                $arquivo_real = $_FILES["cli_logotipo_relatorios_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["cli_logotipo_relatorios_file"]["type"];
                $arquivo_size = $_FILES['cli_logotipo_relatorios_file']['size'];

                if ($arquivo_type == 'image/png' or $arquivo_type == 'image/jpeg' or $arquivo_type == 'image/gif') {
                    if (copy($arquivo_tmp, "build/assets/images/clientes/$arquivo_real")) {
                        if (file_exists("build/assets/images/clientes/" . $arquivo_real)) {
                            //renomear para logotipo_relatorios_ID
                            $name = 'logotipo_relatorios_' . $id;
                            $img = "build/assets/images/clientes/" . $name . '.' . pathinfo($arquivo_real, PATHINFO_EXTENSION);
                            $de = "build/assets/images/clientes/$arquivo_real";
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
                //Salvar Dados na tabela clientes
                $data = array();
                $data['cliente_id'] = $request['upload_logotipo_relatorios_cliente_id'];
                $data['logotipo_relatorios'] = $img;

                //Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'clientes/uploadLogotipo/upload_logotipo_relatorios', '', '', $data);

                //Registro recebido com sucesso
                if ($this->code == 2000) {
                    return response()->json(['success' => $this->message]);
                } else {
                    return response()->json(['error' => 'Erro Interno Upload Logotipo Relatórios.']);
                }
            } else {
                return response()->json(['error' => 'IMG (Nome, Tamanho ou Tipo) inválida.']);
            }
        } else {
            return response()->json(['error' => 'Erro na requisição Upload Logotipo Relatórios']);
        }
    }

    public function upload_logotipo_cartao_emergencial(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Variavel controle
            $error = false;

            //Verificando e fazendo Upload do Arquivo
            if ($request->hasFile('cli_logotipo_cartao_emergencial_file')) {
                //cliente_id
                $id = $request['upload_logotipo_cartao_emergencial_cliente_id'];

                //buscar dados formulario
                $arquivo_tmp = $_FILES["cli_logotipo_cartao_emergencial_file"]["tmp_name"];
                $arquivo_real = $_FILES["cli_logotipo_cartao_emergencial_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["cli_logotipo_cartao_emergencial_file"]["type"];
                $arquivo_size = $_FILES['cli_logotipo_cartao_emergencial_file']['size'];

                if ($arquivo_type == 'image/png' or $arquivo_type == 'image/jpeg' or $arquivo_type == 'image/gif') {
                    if (copy($arquivo_tmp, "build/assets/images/clientes/$arquivo_real")) {
                        if (file_exists("build/assets/images/clientes/" . $arquivo_real)) {
                            //renomear para logotipo_cartao_emergencial_ID
                            $name = 'logotipo_cartao_emergencial_' . $id;
                            $img = "build/assets/images/clientes/" . $name . '.' . pathinfo($arquivo_real, PATHINFO_EXTENSION);
                            $de = "build/assets/images/clientes/$arquivo_real";
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
                //Salvar Dados na tabela clientes
                $data = array();
                $data['cliente_id'] = $request['upload_logotipo_cartao_emergencial_cliente_id'];
                $data['logotipo_cartao_emergencial'] = $img;

                //Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'clientes/uploadLogotipo/upload_logotipo_cartao_emergencial', '', '', $data);

                //Registro recebido com sucesso
                if ($this->code == 2000) {
                    return response()->json(['success' => $this->message]);
                } else {
                    return response()->json(['error' => 'Erro Interno Upload Logotipo Cartão Emergencial.']);
                }
            } else {
                return response()->json(['error' => 'IMG (Nome, Tamanho ou Tipo) inválida.']);
            }
        } else {
            return response()->json(['error' => 'Erro na requisição Upload Logotipo Cartão Emergencial']);
        }
    }

    public function upload_logotipo_menu(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Variavel controle
            $error = false;

            //Verificando e fazendo Upload do Arquivo
            if ($request->hasFile('cli_logotipo_menu_file')) {
                //cliente_id
                $id = $request['upload_logotipo_menu_cliente_id'];

                //buscar dados formulario
                $arquivo_tmp = $_FILES["cli_logotipo_menu_file"]["tmp_name"];
                $arquivo_real = $_FILES["cli_logotipo_menu_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["cli_logotipo_menu_file"]["type"];
                $arquivo_size = $_FILES['cli_logotipo_menu_file']['size'];

                if ($arquivo_type == 'image/png' or $arquivo_type == 'image/jpeg' or $arquivo_type == 'image/gif') {
                    if (copy($arquivo_tmp, "build/assets/images/clientes/$arquivo_real")) {
                        if (file_exists("build/assets/images/clientes/" . $arquivo_real)) {
                            //renomear para logotipo_menu_ID
                            $name = 'logotipo_menu_' . $id;
                            $img = "build/assets/images/clientes/" . $name . '.' . pathinfo($arquivo_real, PATHINFO_EXTENSION);
                            $de = "build/assets/images/clientes/$arquivo_real";
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
                //Salvar Dados na tabela clientes
                $data = array();
                $data['cliente_id'] = $request['upload_logotipo_menu_cliente_id'];
                $data['logotipo_menu'] = $img;

                //Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'clientes/uploadLogotipo/upload_logotipo_menu', '', '', $data);

                //Registro recebido com sucesso
                if ($this->code == 2000) {
                    return response()->json(['success' => $this->message]);
                } else {
                    return response()->json(['error' => 'Erro Interno Upload Logotipo Menu.']);
                }
            } else {
                return response()->json(['error' => 'IMG (Nome, Tamanho ou Tipo) inválida.']);
            }
        } else {
            return response()->json(['error' => 'Erro na requisição Upload Logotipo Menu']);
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
            if ($request->hasFile('cli_editar_documentos_file')) {
                // cliente_id
                $id = $request['editar_documentos_cliente_id'];

                // buscar dados formulario
                $arquivo_tmp = $_FILES["cli_editar_documentos_file"]["tmp_name"];
                $arquivo_real = $_FILES["cli_editar_documentos_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["cli_editar_documentos_file"]["type"];
                $arquivo_size = $_FILES['cli_editar_documentos_file']['size'];

                if ($arquivo_type == 'application/pdf') {
                    if (copy($arquivo_tmp, "build/assets/pdfs/clientes/$arquivo_real")) {
                        if (file_exists("build/assets/pdfs/clientes/" . $arquivo_real)) {
                            // renomear para nome id_$id_documento_YmdHis
                            $name = 'id_' . $id . '_documento_' . date('YmdHis');
                            $pdf = "build/assets/pdfs/clientes/" . $name . '.' . pathinfo($arquivo_real, PATHINFO_EXTENSION);
                            $de = "build/assets/pdfs/clientes/$arquivo_real";
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
                // Salvar Dados na tabela clientes_documentos
                $data = array();
                $data['cliente_id'] = $request['editar_documentos_cliente_id'];
                $data['cliente_documento_id'] = $request['cli_editar_documentos_cliente_documento_id'];
                $data['operacao'] = $request['cli_editar_documentos_operacao'];
                $data['edificacao_id'] = $request['cli_editar_documentos_edificacao_id'];
                $data['documento_id'] = $request['cli_editar_documentos_documento_id'];
                $data['descricao'] = $request['cli_editar_documentos_descricao'];
                $data['aviso'] = $request['cli_editar_documentos_aviso'];
                $data['data_emissao'] = $request['cli_editar_documentos_data_emissao'];
                $data['data_vencimento'] = $request['cli_editar_documentos_data_vencimento'];

                // se não tem arquivo não manda para não gravar vazio na tabela
                if ($pdf != '') {
                    $data['caminho'] = $pdf;
                }

                // Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'clientes/editarDocumento/editar_documento', '', '', $data);

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

    public function documentos($cliente_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes/modalInfo/documentos/' . $cliente_id, '', '', '');

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

    public function deletar_documento($cliente_documento_id)
    {
        //Buscando dados Api_Data() - Deletar Registro
        $this->responseApi(1, 6, 'clientes/modalInfo/deletar_documento', $cliente_documento_id, '', '');

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

    public function documentos_exigidos($cliente_id)
    {
        // Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes/modalInfo/documentos_exigidos/' . $cliente_id, '', '', '');

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
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Salvar Registros
            $this->responseApi(1, 12, 'clientes/modalInfo/documentos_exigidos_save', '', '', $request->all());

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

    public function editar_loja(Request $request)
    {
        // Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            // Salvar Dados na tabela clientes_lojas
            $data = array();
            $data['cliente_id'] = $request['editar_lojas_cliente_id'];
            $data['cliente_loja_id'] = $request['cli_editar_lojas_cliente_loja_id'];
            $data['operacao'] = $request['cli_editar_lojas_operacao'];
            $data['edificacao_nivel_id'] = $request['cli_editar_lojas_edificacao_nivel_id'];
            $data['luc'] = $request['cli_editar_lojas_luc'];
            $data['ordem'] = $request['cli_editar_lojas_ordem'];
            $data['subordinado_cliente_id'] = $request['cli_editar_lojas_subordinado_cliente_id'];

            // Buscando dados Api_Data() - Atualizar Registro
            $this->responseApi(1, 12, 'clientes/editarLoja/editar_loja', '', '', $data);

            // Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else {
                return response()->json(['error' => $this->message]);
            }
        }
    }

    public function lojas($cliente_id)
    {
        // Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            // Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes/modalInfo/lojas/' . $cliente_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else if ($this->code == 4040) { //Registro não encontrado
                echo 'Registro não encontrado.';
            } else {
                echo 'Erro Interno Lojas.';
            }
        }
    }

    public function deletar_loja($cliente_loja_id)
    {
        //Buscando dados Api_Data() - Deletar Registro
        $this->responseApi(1, 6, 'clientes/modalInfo/deletar_loja', $cliente_loja_id, '', '');

        //Registro deletado com sucesso
        if ($this->code == 2000) {
            return response()->json(['success' => $this->message]);
        } else {
            return response()->json(['error' => $this->message]);
        }
    }

    public function editar_sistema_preventivo(Request $request)
    {
        // Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            // Variavel controle
            $error = false;
            $img = '';

            // Verificando e fazendo Upload da Fotografia
            if ($request->hasFile('cli_editar_sistemas_preventivos_fotografia')) {
                // sistema_preventivo_numero
                $sistema_preventivo_numero = $request['cli_editar_sistemas_preventivos_sistema_preventivo_numero'];

                // buscar dados formulario
                $arquivo_tmp = $_FILES["cli_editar_sistemas_preventivos_fotografia"]["tmp_name"];
                $arquivo_real = $_FILES["cli_editar_sistemas_preventivos_fotografia"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["cli_editar_sistemas_preventivos_fotografia"]["type"];
                $arquivo_size = $_FILES['cli_editar_sistemas_preventivos_fotografia']['size'];

                if ($arquivo_type == 'image/png' or $arquivo_type == 'image/jpeg' or $arquivo_type == 'image/gif') {
                    if (copy($arquivo_tmp, "build/assets/images/clientes/$arquivo_real")) {
                        if (file_exists("build/assets/images/clientes/" . $arquivo_real)) {
                            // renomear para sistema_preventivo_ID
                            $name = 'sistema_preventivo_' . $sistema_preventivo_numero;
                            $img = "build/assets/images/clientes/" . $name . '.' . pathinfo($arquivo_real, PATHINFO_EXTENSION);
                            $de = "build/assets/images/clientes/$arquivo_real";
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
            }

            if (!$error) {
                // Salvar Dados na tabela clientes_sistemas_preventivos
                $data = array();
                $data['cliente_id'] = $request['editar_sistemas_preventivos_cliente_id'];
                $data['cliente_sistema_preventivo_id'] = $request['cli_editar_sistemas_preventivos_cliente_sistema_preventivo_id'];
                $data['cliente_documento_id'] = $request['cli_editar_documentos_cliente_documento_id'];
                $data['operacao'] = $request['cli_editar_sistemas_preventivos_operacao'];
                $data['edificacao_local_id'] = $request['cli_editar_sistemas_preventivos_edificacao_local_id'];
                $data['sistema_preventivo_id'] = $request['cli_editar_sistemas_preventivos_sistema_preventivo_id'];
                $data['descricao'] = $request['cli_editar_sistemas_preventivos_descricao'];
                $data['sistema_preventivo_numero'] = $request['cli_editar_sistemas_preventivos_sistema_preventivo_numero'];

                // se não tem arquivo não manda para não gravar vazio na tabela
                if ($img != '') {
                    $data['fotografia'] = $img;
                }

                // Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'clientes/editarSistemaPreventivo/editar_sistema_preventivo', '', '', $data);

                // Registro recebido com sucesso
                if ($this->code == 2000) {
                    return response()->json(['success' => $this->message]);
                } else {
                    return response()->json(['error' => $this->message]);
                }
            } else {
                return response()->json(['error' => 'Fotografia (Nome, Tamanho ou Tipo) inválida.']);
            }
        } else {
            return response()->json(['error' => 'Erro na requisição editar Sistema Preventivo']);
        }
    }

    public function sistemas_preventivos($cliente_id)
    {
        // Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            // Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes/modalInfo/sistemas_preventivos/' . $cliente_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else if ($this->code == 4040) { //Registro não encontrado
                echo 'Registro não encontrado.';
            } else {
                echo 'Erro Interno Sistemas Preventivos Pdf.';
            }
        }
    }

    public function deletar_sistema_preventivo($cliente_sistema_preventivo_id)
    {
        // Buscando dados Api_Data() - Deletar Registro
        $this->responseApi(1, 6, 'clientes/modalInfo/deletar_sistema_preventivo', $cliente_sistema_preventivo_id, '', '');

        // Registro deletado com sucesso
        if ($this->code == 2000) {
            // Apagar arquivo
            $caminhoArquivo = $this->content;

            if (file_exists($caminhoArquivo)) {
                if ($caminhoArquivo != 'build/assets/images/clientes/sistema_preventivo-0.png') {
                    unlink($caminhoArquivo);
                }
            }

            return response()->json(['success' => $this->message]);
        } else {
            return response()->json(['error' => $this->message]);
        }
    }

    public function propostas($cliente_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes/modalInfo/propostas/' . $cliente_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else {
                return json_encode([]);
            }
        }
    }

    public function ordens_servicos($cliente_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes/modalInfo/ordens_servicos/' . $cliente_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else {
                return json_encode([]);
            }
        }
    }

    public function visitas_tecnicas($cliente_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes/modalInfo/visitas_tecnicas/' . $cliente_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else {
                return json_encode([]);
            }
        }
    }

    public function brigadas_incendios($cliente_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes/modalInfo/brigadas_incendios/' . $cliente_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else {
                return json_encode([]);
            }
        }
    }

    public function clientes_rede($cliente_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes/modalInfo/clientes_rede/' . $cliente_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else {
                return json_encode([]);
            }
        }
    }

    public function clientes_principal($cliente_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes/modalInfo/clientes_principal/' . $cliente_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else {
                return json_encode([]);
            }
        }
    }

    public function sistema_preventivo_informacao($sistema_preventivo_numero)
    {
        // Buscando dados Api_Data()
        $this->responseApi(1, 10, 'clientes/sistema_preventivo/informacao/' . $sistema_preventivo_numero, '', '', '');

        // Dados
        $dados = [];

        // Dados recebidos com sucesso
        if ($this->code == 2000) {
            $dados = $this->content;
        }

        return view('clientes.sistema_preventivo_informacao', compact('sistema_preventivo_numero', 'dados'));
    }
}
