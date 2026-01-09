<!-- Formulario -->
<div id="crudForm" style="display: none;">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="modal-buttons" id="crudFormButtons1">
                        <!-- store or update -->
                        @if(\App\Facades\Permissoes::permissao(['create', 'edit']))
                            <!-- Botão Confirnar Operação -->
                            <x-button-crud op="5" onclick="crudConfirmOperation();" id="btnCrudConfirmOperation1" />
                        @endif

                        <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>
                    <div class="modal-buttons" id="crudFormButtons2">
                        <!-- edit or delete -->
                        @if(\App\Facades\Permissoes::permissao(['edit']))
                            <!-- Botão Alterar Registro -->
                            <x-button-crud op="2" onclick="crudEdit(0)" id="btnCrudButtonEdit" />
                        @endif

                        @if(\App\Facades\Permissoes::permissao(['destroy']))
                            <!-- Botão Excluir Registro -->
                            <x-button-crud op="3" onclick="crudDelete(0);" id="btnCrudButtonDelete" />
                        @endif

                        <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>

                    <!-- Formulário - Form -->
                    <form id="{{$se_nameFormSubmodulo}}" name="{{$se_nameFormSubmodulo}}">
                        <fieldset>
                            <input type="hidden" id="frm_operacao" name="frm_operacao">
                            <input type="hidden" id="registro_id" name="registro_id">

                            <div class="row mt-4">
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> {{ __('Fornecedor') }}</h5>
                                    <div class="form-group col-12 col-md-5 pb-3">
                                        <label class="form-label">{{ __('Fornecedor') }}</label>
                                        <select class="form-control" name="fornecedor_id" id="fornecedor_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($fornecedores as $fornecedor)
                                                <option value="{{ $fornecedor['id'] }}">{{ $fornecedor['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3" style="display: none;">
                                        <label class="form-label">{{ __('Nome') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="fornecedor_nome" name="fornecedor_nome" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('CNPJ') }}</label>
                                        <input type="text" class="form-control mask_cnpj" id="fornecedor_cnpj" name="fornecedor_cnpj" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('E-mail') }}</label>
                                        <input type="email" class="form-control text-lowercase" id="fornecedor_email" name="fornecedor_email" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3" style="display: none;">
                                        <label class="form-label">{{ __('Telefone') }}</label>
                                        <input type="text" class="form-control mask_phone_with_ddd" id="fornecedor_telefone" name="fornecedor_telefone" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3" style="display: none;">
                                        <label class="form-label">{{ __('Celular') }}</label>
                                        <input type="text" class="form-control mask_cell_with_ddd" id="fornecedor_celular" name="fornecedor_celular" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3" style="display: none;">
                                        <label class="form-label">{{ __('Logradouro') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="fornecedor_logradouro" name="fornecedor_logradouro" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3" style="display: none;">
                                        <label class="form-label">{{ __('Bairro') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="fornecedor_bairro" name="fornecedor_bairro" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3" style="display: none;">
                                        <label class="form-label">{{ __('Número') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="fornecedor_logradouro_numero" name="fornecedor_logradouro_numero" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3" style="display: none;">
                                        <label class="form-label">{{ __('Complemento') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="fornecedor_logradouro_complemento" name="fornecedor_logradouro_complemento" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3" style="display: none;">
                                        <label class="form-label">{{ __('Cidade') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="fornecedor_cidade" name="fornecedor_cidade" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3" style="display: none;">
                                        <label class="form-label">{{ __('UF') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="fornecedor_uf" name="fornecedor_uf" readonly>
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-list"></i> {{ __('Informações Gerais') }}</h5>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('NF Número') }}</label>
                                        <input type="text" class="form-control" id="nf_numero" name="nf_numero">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('NF Série') }}</label>
                                        <input type="text" class="form-control" id="nf_serie" name="nf_serie">
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">{{ __('NF Chave Acesso') }}</label>
                                        <input type="text" class="form-control" id="nf_chave_acesso" name="nf_chave_acesso">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Data emissão') }}</label>
                                        <input type="text" class="form-control mask_date" id="data_emissao" name="data_emissao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Valor Desconto') }}</label>
                                        <input type="text" class="form-control mask_money2" id="valor_desconto" name="valor_desconto">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Valor Total da Nota') }}</label>
                                        <input type="text" class="form-control mask_money2" id="valor_total" name="valor_total">
                                        <input type="hidden" id="valor_total_grade" name="valor_total_grade">
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> {{ __('Local inicial dos Produtos') }}</h5>
                                    <div class="form-group col-12 col-md-5 pb-3">
                                        <label class="form-label">{{ __('Local') }}</label>
                                        <select class="form-control" name="estoque_local_id" id="estoque_local_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($estoques_locais as $estoque_local)
                                                <option value="{{ $estoque_local['id'] }}">{{ $estoque_local['name'].' - '.$estoque_local['empresaName'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="row">
                                    <!-- Produtos -->
                                    <div class="col-12 col-md-12" id="pro_divProdutos">
                                        <div class="row pt-4">
                                            <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> {{ __('Produtos') }}</h5>
                                            <div class="row col-12" id="pro_divEscolherProduto">
                                                <div class="form-group col-12 col-md-5 pb-3">
                                                    <label class="form-label small">{{ __('Produto') }}</label>
                                                    <select class="form-select form-select-sm" name="pro_escolherProdutoId" id="pro_escolherProdutoId">
                                                        <option value="">{{ __('Selecione...') }}</option>

                                                        @foreach ($produtos as $produto)
                                                            <option value="{{ $produto['id'] }}" data-produto_id="{{ $produto['id'] }}" data-produto_name="{{ $produto['name'] }}" data-produto_categoria_name="{{ $produto['produtoCategoriaName'] }}">{{ $produto['produtoCategoriaName'].' - '.$produto['name'] }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                <div class="form-group col-12 col-md-2 pb-3">
                                                    <label class="form-label small">{{ __('Tipo') }}</label>
                                                    <select class="form-select form-select-sm" name="pro_escolherProdutoTipoId" id="pro_escolherProdutoTipoId">
                                                        <option value="">{{ __('Selecione...') }}</option>

                                                        @foreach ($produto_tipos as $produto_tipo)
                                                            <option value="{{ $produto_tipo['id'] }}" data-produto_tipo_id="{{ $produto_tipo['id'] }}" data-produto_tipo_name="{{ $produto_tipo['name'] }}">{{ $produto_tipo['name'] }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                <div class="form-group col-12 col-md-2 pb-3">
                                                    <label class="form-label small">{{ __('Valor Unitário') }}</label>
                                                    <input type="text" class="form-control form-control-sm text-center mask_money2" name="pro_escolherProdutoValorUnitario" id="pro_escolherProdutoValorUnitario">
                                                </div>
                                                <div class="form-group col-12 col-md-2 pb-3">
                                                    <label class="form-label small">{{ __('Número Patrimônio') }}</label>
                                                    <input type="text" class="form-control form-control-sm text-center" name="pro_escolherProdutoNumeroPatrimonio" id="pro_escolherProdutoNumeroPatrimonio">
                                                </div>
                                                <div class="form-group col-12 col-md-1 pb-3">
                                                    <label class="form-label">&nbsp;</label>
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <x-button-crud op="99" class="btn-sm" model="1" bgColor="success" textColor="write" id="pro_btnAdicionar" name="pro_btnAdicionar" title="Adicionar Produto na Grade" image="fas fa-check" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="table-responsive">
                                                <table class="table table-striped mb-0 small">
                                                    <thead class="table-primary">
                                                        <tr>
                                                            <th class="p-3">{{ __('PRODUTO') }}</th>
                                                            <th class="p-3 text-center">{{ __('TIPO') }}</th>
                                                            <th class="p-3 text-center">{{ __('NÚMERO PATRIMÔNIO') }}</th>
                                                            <th class="p-3 text-center">{{ __('VALOR UNITÁRIO') }}</th>
                                                            <th class="p-3 text-center" id="pro_thOpcoes"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="pro_gradeTbody"></tbody>
                                                    <tfoot class="table-light">
                                                        <tr>
                                                            <th colspan="3" class="text-end font-size-14">TOTAL GERAL:</th>
                                                            <th class="text-center font-size-16" id="pro_gradeTotalGeral"></th>
                                                            <th id="pro_tfOpcoes"></th>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>

                                            <!-- Campos hiddens para salvar na tabela produtos_entradas_produtos -->
                                            <div id="pro_camposHiddens"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
