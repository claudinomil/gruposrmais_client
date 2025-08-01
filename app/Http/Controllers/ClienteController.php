<?php

namespace App\Http\Controllers;

use App\Facades\Permissoes;
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
    public $edificacao_classificacoes;
    public $incendio_riscos;
    public $seguranca_medidas;
    public $documentos;

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
                    ->editColumn('perfil', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<a href='#' onclick='clienteModalInfoControle(2, " . $row['id'] . ");'><span class='bg-warning badge'><i class='bx bx-photo-album font-size-16 align-middle me-1'></i>Info</span></a>";
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->editColumn('cnpj', function ($row) {
                        if ($row['tipo'] == 1) {
                            $retorno = SuporteFacade::formatarCNPJ($row['cnpj']);
                        } else if ($row['tipo'] == 2) {
                            $retorno = SuporteFacade::formatarCPF($row['cpf']);
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
                'edificacao_classificacoes' => $this->edificacao_classificacoes,
                'incendio_riscos' => $this->incendio_riscos,
                'seguranca_medidas' => $this->seguranca_medidas,
                'documentos' => $this->documentos
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
                    ->editColumn('perfil', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<a href='#' onclick='clienteModalInfoControle(2, " . $row['id'] . ");'><span class='bg-warning badge'><i class='bx bx-photo-album font-size-16 align-middle me-1'></i>Info</span></a>";
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->editColumn('cnpj', function ($row) {
                        if ($row['tipo'] == 1) {
                            $retorno = SuporteFacade::formatarCNPJ($row['cnpj']);
                        } else if ($row['tipo'] == 2) {
                            $retorno = SuporteFacade::formatarCPF($row['cpf']);
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

    public function upload_documento(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Variavel controle
            $error = false;

            //Verificando e fazendo Upload do PDF
            if ($request->hasFile('cli_documentos_file')) {
                //cliente_id
                $id = $request['upload_documentos_cliente_id'];

                //buscar dados formulario
                $arquivo_tmp = $_FILES["cli_documentos_file"]["tmp_name"];
                $arquivo_real = $_FILES["cli_documentos_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["cli_documentos_file"]["type"];
                $arquivo_size = $_FILES['cli_documentos_file']['size'];

                if ($arquivo_type == 'application/pdf') {
                    if (copy($arquivo_tmp, "build/assets/pdfs/clientes/$arquivo_real")) {
                        if (file_exists("build/assets/pdfs/clientes/" . $arquivo_real)) {
                            //renomear para nome id_$id_documento_YmdHis
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
            } else {
                return response()->json(['error' => 'Escolha um arquivo pdf válido.']);
            }

            if (!$error) {
                //Salvar Dados na tabela clientes_documentos
                $data = array();
                $data['cliente_id'] = $request['upload_documentos_cliente_id'];
                $data['acao'] = $request['upload_documentos_cli_acao'];
                $data['name'] = $name;
                $data['documento_id'] = $request['cli_documentos_documento_id'];
                $data['caminho'] = $pdf;
                $data['data_documento'] = $request['cli_documentos_data_documento'];
                $data['aviso'] = $request['cli_documentos_aviso'];

                //Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'clientes/uploadDocumento/upload_documento', '', '', $data);

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

    public function servicos($cliente_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes/modalInfo/servicos/' . $cliente_id, '', '', '');

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

    public function clientes($cliente_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes/modalInfo/clientes/' . $cliente_id, '', '', '');

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

    public function visita_tecnica(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes/visita_tecnica/'.$id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Client');
            }
        }
    }
}
