<?php

namespace App\Http\Controllers;

use App\Facades\SuporteFacade;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class ClienteExecutivoController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $clientes;
    public $generos;
    public $nacionalidades;
    public $identidade_orgaos;
    public $identidade_estados;

    public function __construct()
    {
        $this->middleware('check-permissao:list', ['only' => ['index', 'filter', 'modal_info', 'documentos_pdf']]);
        $this->middleware('check-permissao:create', ['only' => ['create', 'store']]);
        $this->middleware('check-permissao:show', ['only' => ['show']]);
        $this->middleware('check-permissao:edit', ['only' => ['edit', 'update', 'upload_foto', 'upload_documento_pdf']]);
        $this->middleware('check-permissao:destroy', ['only' => ['destroy']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'clientes_executivos', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('foto', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<img src='" . asset($row['foto']) . "' alt='' class='img-thumbnail avatar-sm' id='datatable_foto_cliente_executivo_id_" . $row['id'] . "'>";
                        $retorno .= "<br>";
                        $retorno .= "<a href='#' onclick='clienteExecutivoModalInfo(" . $row['id'] . ");'><span class='bg-warning badge'><i class='bx bx-photo-album font-size-16 align-middle me-1'></i>Info</span></a>";
                        $retorno .= "</div>";

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
            //Gerar QRCode Cartões Emergenciais
            SuporteFacade::setGerarQRCodesCartoesEmergenciais();

            //pegando o empresa_id
            $empresa_id = session('userLogged_empresa_id');

            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'clientes_executivos/auxiliary/tables/'.$empresa_id, '', '', '');

            //chamar view
            return view('clientes_executivos.index', [
                'evento' => 'index',
                'clientes' => $this->clientes,
                'generos' => $this->generos,
                'nacionalidades' => $this->nacionalidades,
                'identidade_orgaos' => $this->identidade_orgaos,
                'identidade_estados' => $this->identidade_estados
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
            $this->responseApi(1, 4, 'clientes_executivos', '', '', $request->all());

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
            $this->responseApi(1, 2, 'clientes_executivos', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                //Preparando Dados para a View
                if ($this->content['data_nascimento'] != '') {
                    $this->content['data_nascimento'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_nascimento'], 0, 10))->format('d/m/Y');
                }

                if ($this->content['altura'] != '') {
                    $this->content['altura'] = number_format($this->content['altura'], 2, ",", ".");
                } else {
                    $this->content['altura'] = '';
                }

                if ($this->content['peso'] != '') {
                    $this->content['peso'] = number_format($this->content['peso'], 2, ",", ".");
                } else {
                    $this->content['peso'] = '';
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
            $this->responseApi(1, 2, 'clientes_executivos', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                //Preparando Dados para a View
                if ($this->content['data_nascimento'] != '') {
                    $this->content['data_nascimento'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_nascimento'], 0, 10))->format('d/m/Y');
                }

                if ($this->content['altura'] != '') {
                    $this->content['altura'] = number_format($this->content['altura'], 2, ",", ".");
                } else {
                    $this->content['altura'] = '';
                }

                if ($this->content['peso'] != '') {
                    $this->content['peso'] = number_format($this->content['peso'], 2, ",", ".");
                } else {
                    $this->content['peso'] = '';
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
            $this->responseApi(1, 5, 'clientes_executivos', $id, '', $request->all());

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
            $this->responseApi(1, 6, 'clientes_executivos', $id, '', '');

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
            $this->responseApi(1, 3, 'clientes_executivos', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('foto', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<img src='" . asset($row['foto']) . "' alt='' class='img-thumbnail avatar-sm' id='datatable_foto_cliente_executivo_id_" . $row['id'] . "'>";
                        $retorno .= "<br>";
                        $retorno .= "<a href='#' onclick='clienteExecutivoModalInfo(" . $row['id'] . ");'><span class='bg-warning badge'><i class='bx bx-photo-album font-size-16 align-middle me-1'></i>Info</span></a>";
                        $retorno .= "</div>";

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
            return view('clientes_executivos.index');
        }
    }

    public function modal_info($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes_executivos/modalInfo/modal_info/' . $id, '', '', '');

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
            $foto = "build/assets/images/clientes_executivos/cliente_executivo-0.png";

            //Verificando e fazendo Upload da Foto novo
            if ($request->hasFile('cex_foto_file')) {
                //cliente_executivo_id
                $id = $request['upload_foto_cliente_executivo_id'];

                //buscar dados formulario
                $arquivo_tmp = $_FILES["cex_foto_file"]["tmp_name"];
                $arquivo_real = $_FILES["cex_foto_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["cex_foto_file"]["type"];
                $arquivo_size = $_FILES['cex_foto_file']['size'];

                if ($arquivo_type == 'image/jpg' or $arquivo_type == 'image/jpeg' or $arquivo_type == 'image/png') {
                    if (copy($arquivo_tmp, "build/assets/images/clientes_executivos/$arquivo_real")) {
                        if (file_exists("build/assets/images/clientes_executivos/" . $arquivo_real)) {
                            //apagar foto no diretorio
                            if (file_exists('build/assets/images/clientes_executivos/cliente_executivo-' . $id . '.png')) {
                                unlink('build/assets/images/clientes_executivos/cliente_executivo-' . $id . '.png');
                            }
                            if (file_exists('build/assets/images/clientes_executivos/cliente_executivo-' . $id . '.jpg')) {
                                unlink('build/assets/images/clientes_executivos/cliente_executivo-' . $id . '.jpg');
                            }
                            if (file_exists('build/assets/images/clientes_executivos/cliente_executivo-' . $id . '.jpeg')) {
                                unlink('build/assets/images/clientes_executivos/cliente_executivo-' . $id . '.jpeg');
                            }

                            //Gravar novo
                            $foto = "build/assets/images/clientes_executivos/cliente_executivo-" . $id . '.' . pathinfo($arquivo_real, PATHINFO_EXTENSION);
                            $de = "build/assets/images/clientes_executivos/$arquivo_real";
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
                $data['empresa_id'] = session('userLogged_empresa_id');
                $data['name'] = $request['upload_foto_cliente_executivo_name'];
                $data['foto'] = $foto;
                $this->responseApi(1, 11, 'clientes_executivos/uploadFoto/upload_foto/' . $id, '', '', $data);

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

    public function upload_documento_pdf(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Variavel controle
            $error = false;

            //Verificando e fazendo Upload do PDF
            if ($request->hasFile('cex_documentos_pdfs_file')) {
                //cliente_executivo_id
                $id = $request['upload_documentos_pdfs_cliente_executivo_id'];

                //buscar dados formulario
                $arquivo_tmp = $_FILES["cex_documentos_pdfs_file"]["tmp_name"];
                $arquivo_real = $_FILES["cex_documentos_pdfs_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["cex_documentos_pdfs_file"]["type"];
                $arquivo_size = $_FILES['cex_documentos_pdfs_file']['size'];

                if ($arquivo_type == 'application/pdf') {
                    if (copy($arquivo_tmp, "build/assets/pdfs/clientes_executivos/$arquivo_real")) {
                        if (file_exists("build/assets/pdfs/clientes_executivos/" . $arquivo_real)) {
                            //renomear para nome id_$id_documento_YmdHis
                            $name = 'id_' . $id . '_documento_' . date('YmdHis');
                            $pdf = "build/assets/pdfs/clientes_executivos/" . $name . '.' . pathinfo($arquivo_real, PATHINFO_EXTENSION);
                            $de = "build/assets/pdfs/clientes_executivos/$arquivo_real";
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
                return response()->json(['error' => 'Escolha um arquivo pdf.']);
            }

            if (!$error) {
                //Salvar Dados na tabela clientes_executivos_documentos
                $data = array();
                $data['empresa_id'] = session('userLogged_empresa_id');
                $data['cliente_executivo_id'] = $request['upload_documentos_pdfs_cliente_executivo_id'];
                $data['acao'] = $request['upload_documentos_pdfs_cex_acao'];
                $data['name'] = $name;
                $data['descricao'] = $request['cex_documentos_pdfs_descricao'];
                $data['caminho'] = $pdf;
                $data['data_documento'] = $request['cex_documentos_pdfs_data_documento'];
                $data['aviso'] = $request['cex_documentos_pdfs_aviso'];

                //Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'clientes_executivos/uploadDocumentoPdf/upload_documento_pdf', '', '', $data);

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

    public function documentos_pdf($cliente_executivo_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'clientes_executivos/modalInfo/documentos_pdf/' . $cliente_executivo_id, '', '', '');

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

    public function deletar_documento_pdf($cliente_executivo_documento_id)
    {
        //Buscando dados Api_Data() - Deletar Registro
        $this->responseApi(1, 6, 'clientes_executivos/modalInfo/deletar_documento_pdf', $cliente_executivo_documento_id, '', '');

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
            //pegando o empresa_id
            $empresa_id = session('userLogged_empresa_id');

            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 10, 'clientes_executivos/cartoes_emergenciais/dados/'.$empresa_id.'/'.$ids, '', '', '');

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
