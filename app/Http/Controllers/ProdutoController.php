<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Yajra\DataTables\Facades\DataTables;

class ProdutoController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $produto_categorias;
    public $cores;

    public function __construct()
    {
        $this->middleware('check-permissao:produtos_list', ['only' => ['index', 'filter', 'modal_info']]);
        $this->middleware('check-permissao:produtos_create', ['only' => ['create', 'store']]);
        $this->middleware('check-permissao:produtos_show', ['only' => ['show']]);
        $this->middleware('check-permissao:produtos_edit', ['only' => ['edit', 'update', 'upload_fotografia']]);
        $this->middleware('check-permissao:produtos_destroy', ['only' => ['destroy']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'produtos', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('fotografia', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<img src='" . asset($row['fotografia']) . "' alt='' class='img-thumbnail avatar-sm' id='datatable_fotografia_produto_id_" . $row['id'] . "'>";
                        $retorno .= "<br>";
                        $retorno .= "<a href='#' onclick='produtoModalInfoControle(2, " . $row['id'] . ");'><span class='bg-warning badge'><i class='bx bx-photo-album font-size-16 align-middle me-1'></i>Info</span></a>";
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
                abort(500, 'Erro Interno Produtos');
            }
        } else {
            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'produtos/auxiliary/tables', '', '', '');

            return view('produtos.index', [
                'produto_categorias' => $this->produto_categorias,
                'cores' => $this->cores
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
            $this->responseApi(1, 4, 'produtos', '', '', $request->all());

            //Registro criado com sucesso
            if ($this->code == 2010) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else {
                abort(500, 'Erro Interno Produtos');
            }
        }
    }

    public function show(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'produtos', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Produtos');
            }
        }
    }

    public function edit(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'produtos', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Produtos');
            }
        }
    }

    public function update(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 5, 'produtos', $id, '', $request->all());

            //Registro alterado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Produtos');
            }
        }
    }

    public function destroy(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Deletar Registro
            $this->responseApi(1, 6, 'produtos', $id, '', '');

            //Registro deletado com sucesso
            if ($this->code == 2000) {
                // Apagar arquivo
                $caminhoArquivo = 'build/assets/images/produtos/fotografia_'.$id.'.png';

                if (file_exists($caminhoArquivo)) {unlink($caminhoArquivo);}

                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2040) { //Registro não excluído - pertence a relacionamento com outra(s) tabela(s)
                return response()->json(['error' => $this->message]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error' => $this->message]);
            } else {
                abort(500, 'Erro Interno Produtos');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'produtos', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('fotografia', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<img src='" . asset($row['fotografia']) . "' alt='' class='img-thumbnail avatar-sm' id='datatable_fotografia_produto_id_" . $row['id'] . "'>";
                        $retorno .= "<br>";
                        $retorno .= "<a href='#' onclick='produtoModalInfoControle(2, " . $row['id'] . ");'><span class='bg-warning badge'><i class='bx bx-photo-album font-size-16 align-middle me-1'></i>Info</span></a>";
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
                abort(500, 'Erro Interno Produtos');
            }
        } else {
            return view('produtos.index');
        }
    }

    public function modal_info($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'produtos/modalInfo/modal_info/' . $id, '', '', '');

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

    public function upload_fotografia(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Variavel controle
            $error = false;

            //Verificando e fazendo Upload do Arquivo
            if ($request->hasFile('pro_fotografia_file')) {
                //produto_id
                $id = $request['upload_fotografia_produto_id'];

                //buscar dados formulario
                $arquivo_tmp = $_FILES["pro_fotografia_file"]["tmp_name"];
                $arquivo_real = $_FILES["pro_fotografia_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["pro_fotografia_file"]["type"];
                $arquivo_size = $_FILES['pro_fotografia_file']['size'];

                if ($arquivo_type == 'image/png' or $arquivo_type == 'image/jpeg' or $arquivo_type == 'image/gif') {
                    if (copy($arquivo_tmp, "build/assets/images/produtos/$arquivo_real")) {
                        if (file_exists("build/assets/images/produtos/" . $arquivo_real)) {
                            //renomear para fotografia_ID
                            $name = 'fotografia_' . $id;
                            $img = "build/assets/images/produtos/" . $name . '.' . pathinfo($arquivo_real, PATHINFO_EXTENSION);
                            $de = "build/assets/images/produtos/$arquivo_real";
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
                //Salvar Dados na tabela produtos
                $data = array();
                $data['produto_id'] = $request['upload_fotografia_produto_id'];
                $data['fotografia'] = $img;

                //Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'produtos/uploadFotografia/upload_fotografia', '', '', $data);

                //Registro recebido com sucesso
                if ($this->code == 2000) {
                    return response()->json(['success' => $this->message]);
                } else {
                    return response()->json(['error' => 'Erro Interno Upload Fotografia.']);
                }
            } else {
                return response()->json(['error' => 'IMG (Nome, Tamanho ou Tipo) inválida.']);
            }
        } else {
            return response()->json(['error' => 'Erro na requisição Upload Fotografia']);
        }
    }
}
