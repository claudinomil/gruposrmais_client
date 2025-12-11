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
                            <x-button-crud op="2" onclick="crudEdit(0)" />
                        @endif

                        @if(\App\Facades\Permissoes::permissao(['destroy']))
                            <!-- Botão Excluir Registro -->
                            <x-button-crud op="3" onclick="crudDelete(0);" />
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
                                        <input type="text" class="form-control mask_money2" id="valor_desconto" name="valor_desconto" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Valor Total da Nota') }}</label>
                                        <input type="text" class="form-control mask_money2" id="valor_total" name="valor_total">
                                        <input type="hidden" id="valor_total_grade" name="valor_total_grade">
                                    </div>
                                </div>

                                <div class="row">
                                    <!-- Materiais -->
                                    <div class="col-12 col-md-12" id="mat_divMateriais">
                                        <div class="row pt-4">
                                            <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> {{ __('Materiais') }}</h5>
                                            <div class="row col-12" id="mat_divEscolherMaterial">
                                                <div class="form-group col-7 col-md-7 pb-3">
                                                    <label class="form-label small">{{ __('Material') }}</label>
                                                    <select class="form-select form-select-sm" name="mat_escolherMaterialId" id="mat_escolherMaterialId">
                                                        <option value="">{{ __('Selecione...') }}</option>

                                                        @foreach ($materiais as $material)
                                                            <option value="{{ $material['id'] }}" data-material_id="{{ $material['id'] }}" data-material_name="{{ $material['name'] }}" data-material_categoria_name="{{ $material['materialCategoriaName'] }}">{{ $material['materialCategoriaName'].' - '.$material['name'] }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                <div class="form-group col-3 col-md-2 pb-3">
                                                    <label class="form-label small">{{ __('Valor Unitário') }}</label>
                                                    <input type="text" class="form-control form-control-sm text-center mask_money2" name="mat_escolherMaterialValorUnitario" id="mat_escolherMaterialValorUnitario">
                                                </div>
                                                <div class="form-group col-3 col-md-2 pb-3">
                                                    <label class="form-label small">{{ __('Número Patrimônio') }}</label>
                                                    <input type="text" class="form-control form-control-sm text-center" name="mat_escolherMaterialNumeroPatrimonio" id="mat_escolherMaterialNumeroPatrimonio">
                                                </div>
                                                <div class="form-group col-2 col-md-1 pb-3">
                                                    <label class="form-label">&nbsp;</label>
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <x-button-crud op="99" class="btn-sm" model="1" bgColor="success" textColor="write" id="mat_btnAdicionar" name="mat_btnAdicionar" title="Adicionar Material na Grade" image="fas fa-check" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="table-responsive">
                                                <table class="table table-striped mb-0 small">
                                                    <thead class="table-primary">
                                                        <tr>
                                                            <th class="p-3">{{ __('MATERIAL') }}</th>
                                                            <th class="p-3 text-center">{{ __('NÚMERO PATRIMÔNIO') }}</th>
                                                            <th class="p-3 text-center">{{ __('VALOR UNITÁRIO') }}</th>
                                                            <th class="p-3 text-center" id="mat_thOpcoes"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="mat_gradeTbody"></tbody>
                                                    <tfoot class="table-light">
                                                        <tr>
                                                            <th colspan="2" class="text-end font-size-14">TOTAL GERAL:</th>
                                                            <th class="text-center font-size-16" id="mat_gradeTotalGeral"></th>
                                                            <th id="mat_tfOpcoes"></th>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>

                                            <!-- Campos hiddens para salvar na tabela materiais_movimentacoes_materiais -->
                                            <div id="mat_camposHiddens"></div>
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
