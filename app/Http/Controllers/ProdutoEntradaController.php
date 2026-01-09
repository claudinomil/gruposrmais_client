<?php

namespace App\Http\Controllers;

use App\Facades\Permissoes;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;
use Illuminate\Support\Carbon;

class ProdutoEntradaController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $fornecedores;
    public $produtos;
    public $produto_tipos;
    public $estoques_locais;

    public function __construct()
    {
        $this->middleware('check-permissao:produtos_entradas_list', ['only' => ['index', 'filter', 'modal_info']]);
        $this->middleware('check-permissao:produtos_entradas_create', ['only' => ['create', 'store']]);
        $this->middleware('check-permissao:produtos_entradas_show', ['only' => ['show']]);
        $this->middleware('check-permissao:produtos_entradas_edit', ['only' => ['edit', 'update', 'upload_nota_fiscal']]);
        $this->middleware('check-permissao:produtos_entradas_destroy', ['only' => ['destroy']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'produtos_entradas', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('info', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<a href='#' onclick='produtoEntradaModalInfoControle(1, " . $row['id'] . ");'><span class='bg-warning badge'><i class='bx bx-photo-album font-size-16 align-middle me-1'></i>Info</span></a>";
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->editColumn('fornecedor_patrimonio', function ($row) {
                        $retorno = $row['fornecedorName'];

                        $produtos_entradas_itens = '<div class="row">';

                        foreach($row['produtos_entradas_itens'] as $item) {
                            $produtos_entradas_itens .= '<div class="col-12 col-md-4">
                                                            <div class="row alert alert-success p-1 m-1">
                                                                <div class="col-2 px-0">
                                                                    <img src="'.$item['produto_fotografia'].'" alt="" class="img-thumbnail avatar-sm">
                                                                </div>
                                                                <div class="col-10">
                                                                    <h6 class="text-truncate small">Patrimônio: '.$item['produto_numero_patrimonio'].'</h6>
                                                                    <p class="text-truncate text-muted small mb-0">'.$item['produto_name'].'</p>
                                                                </div>
                                                            </div>
                                                        </div>';
                        }

                        $produtos_entradas_itens .= '</div>';

                        $retorno .= $produtos_entradas_itens;

                        return $retorno;
                    })
                    ->editColumn('nota_fiscal', function ($row) {
                        $retorno = 'Número: '.$row['nf_numero']."<br>".'Série: '.$row['nf_serie'];

                        return $retorno;
                    })
                    ->addColumn('action', function ($row, Request $request) {
                        // Botões CRUD
                        if ($row['executada'] == 1) {
                            $btnsCrud = $this->columnAction($row['id'], 1);
                        } else {
                            $btnsCrud = $this->columnAction($row['id']);
                        }

                        // Botão Executar Entrada
                        $btnExecutarEntrada = '';
                        if ($row['executada'] == 0) {
                            if (Permissoes::permissao(['edit'])) {
                                $btnExecutarEntrada .= '<div class="col-12 py-2 text-center"><button type="button" class="btn btn-warning btn-sm text-white" title="Executar Entrada" onclick="div_executarEntrada('.$row['id'].')">Executar Entrada</button></div>';
                            }
                        }

                        return $btnsCrud.$btnExecutarEntrada;
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Produtos Entradas');
            }
        } else {
            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'produtos_entradas/auxiliary/tables', '', '', '');

            return view('produtos_entradas.index', [
                'fornecedores' => $this->fornecedores,
                'produtos' => $this->produtos,
                'produto_tipos' => $this->produto_tipos,
                'estoques_locais' => $this->estoques_locais
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
            $this->responseApi(1, 4, 'produtos_entradas', '', '', $request->all());

            //Registro criado com sucesso
            if ($this->code == 2010) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else {
                abort(500, 'Erro Interno Produtos Entradas');
            }
        }
    }

    public function show(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'produtos_entradas', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                //Preparando Dados para a View''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //data_emissao
                if ($this->content['data_emissao'] != '') {
                    $this->content['data_emissao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_emissao'], 0, 10))->format('d/m/Y');
                }

                //valor_desconto
                if ($this->content['valor_desconto'] != '') {
                    $this->content['valor_desconto'] = number_format($this->content['valor_desconto'], 2, ",", ".");
                } else {
                    $this->content['valor_desconto'] = 0;
                }

                //valor_total
                if ($this->content['valor_total'] != '') {
                    $this->content['valor_total'] = number_format($this->content['valor_total'], 2, ",", ".");
                } else {
                    $this->content['valor_total'] = 0;
                }
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Produtos Entradas');
            }
        }
    }

    public function edit(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'produtos_entradas', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                //Preparando Dados para a View''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //data_emissao
                if ($this->content['data_emissao'] != '') {
                    $this->content['data_emissao'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_emissao'], 0, 10))->format('d/m/Y');
                }

                //valor_desconto
                if ($this->content['valor_desconto'] != '') {
                    $this->content['valor_desconto'] = number_format($this->content['valor_desconto'], 2, ",", ".");
                } else {
                    $this->content['valor_desconto'] = 0;
                }

                //valor_total
                if ($this->content['valor_total'] != '') {
                    $this->content['valor_total'] = number_format($this->content['valor_total'], 2, ",", ".");
                } else {
                    $this->content['valor_total'] = 0;
                }
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Produtos Entradas');
            }
        }
    }

    public function update(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 5, 'produtos_entradas', $id, '', $request->all());

            //Registro alterado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Produtos Entradas');
            }
        }
    }

    public function destroy(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Deletar Registro
            $this->responseApi(1, 6, 'produtos_entradas', $id, '', '');

            //Registro deletado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2040) { //Registro não excluído - pertence a relacionamento com outra(s) tabela(s)
                return response()->json(['error' => $this->message]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error' => $this->message]);
            } else {
                abort(500, 'Erro Interno Produtos Entradas');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'produtos_entradas', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('info', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<a href='#' onclick='produtoEntradaModalInfoControle(1, " . $row['id'] . ");'><span class='bg-warning badge'><i class='bx bx-photo-album font-size-16 align-middle me-1'></i>Info</span></a>";
                        $retorno .= "</div>";

                        return $retorno;
                    })
                    ->addColumn('action', function ($row, Request $request) {
                        // Botões CRUD
                        if ($row['executada'] == 1) {
                            $btnsCrud = $this->columnAction($row['id'], 1);
                        } else {
                            $btnsCrud = $this->columnAction($row['id']);
                        }

                        // Botão Executar Entrada
                        $btnExecutarEntrada = '';
                        if ($row['executada'] == 0) {
                            if (Permissoes::permissao(['edit'])) {
                                $btnExecutarEntrada .= '<div class="col-12 py-2 text-center"><button type="button" class="btn btn-warning btn-sm text-white" title="Executar Entrada" onclick="div_executarEntrada('.$row['id'].')">Executar Entrada</button></div>';
                            }
                        }

                        return $btnsCrud.$btnExecutarEntrada;
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Produtos Entradas');
            }
        } else {
            return view('produtos_entradas.index');
        }
    }

    public function modal_info($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'produtos_entradas/modalInfo/modal_info/' . $id, '', '', '');

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

    public function upload_nota_fiscal(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Variavel controle
            $error = false;

            //Verificando e fazendo Upload do PDF
            if ($request->hasFile('men_nota_fiscal_file')) {
                //produto_entrada_id
                $id = $request['upload_nota_fiscal_produto_entrada_id'];

                //buscar dados formulario
                $arquivo_tmp = $_FILES["men_nota_fiscal_file"]["tmp_name"];
                $arquivo_real = $_FILES["men_nota_fiscal_file"]["name"];
                $arquivo_real = utf8_decode('tmp_' . $arquivo_real);
                $arquivo_type = $_FILES["men_nota_fiscal_file"]["type"];
                $arquivo_size = $_FILES['men_nota_fiscal_file']['size'];

                if ($arquivo_type == 'application/pdf') {
                    if (copy($arquivo_tmp, "build/assets/pdfs/produtos_entradas/$arquivo_real")) {
                        if (file_exists("build/assets/pdfs/produtos_entradas/" . $arquivo_real)) {
                            //renomear para nome id_$id_nota_fiscal
                            $name = 'id_' . $id . '_nota_fiscal';
                            $pdf = "build/assets/pdfs/produtos_entradas/" . $name . '.' . pathinfo($arquivo_real, PATHINFO_EXTENSION);
                            $de = "build/assets/pdfs/produtos_entradas/$arquivo_real";
                            $pa = $pdf;

                            try {
                                rename($de, $pa);
                            } catch (\Exception $e) {
                                $error = true;
                            }
                        }
                    }
                } else {
                    return response()->json(['error' => 'Escolha um arquivo pdf válido x.']);
                }
            } else {
                return response()->json(['error' => 'Escolha um arquivo pdf válido y.']);
            }

            if (!$error) {
                //Salvar Dados na tabela produtos_entradas_nota_fiscal
                $data = array();
                $data['produto_entrada_id'] = $request['upload_nota_fiscal_produto_entrada_id'];
                $data['nf_pdf_caminho'] = $pdf;

                //Buscando dados Api_Data() - Atualizar Registro
                $this->responseApi(1, 12, 'produtos_entradas/uploadNotaFiscal/upload_nota_fiscal', '', '', $data);

                //Registro recebido com sucesso
                if ($this->code == 2000) {
                    return response()->json(['success' => $this->message, 'nf_pdf_caminho' => $pdf]);
                } else {
                    return response()->json(['error' => 'Erro Interno Upload Nota Fiscal PDF.']);
                }
            } else {
                return response()->json(['error' => 'PDF (Nome, Tamanho ou Tipo) inválida.']);
            }
        } else {
            return response()->json(['error' => 'Erro na requisição Upload Nota Fiscal PDF']);
        }
    }

    public function executar_entrada($id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Incluir Registro
            $this->responseApi(1, 10, 'produtos_entradas/executar_entrada/'.$id, '', '', '');

            //Registro criado com sucesso
            if ($this->code) {
                return response()->json(['message' => $this->message]);
            }

            return response()->json(['message' => 'Erro interno (Executar Entrada)']);
        }
    }
}
