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
                                <div class="row pt-4" id="divInformacoesGerais">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-list"></i> {{ __('Informações Gerais') }}</h5>
                                    <div class="form-group col-12 col-md-1 pb-3">
                                        <label class="form-label">{{ __('Número') }}</label>
                                        <input type="text" class="form-control" id="numero_brigada_incendio" name="numero_brigada_incendio" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-1 pb-3">
                                        <label class="form-label">{{ __('Ano') }}</label>
                                        <input type="text" class="form-control" id="ano_brigada_incendio" name="ano_brigada_incendio" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Data abertura') }}</label>
                                        <input type="text" class="form-control mask_date" id="data_abertura" name="data_abertura" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Hora abertura') }}</label>
                                        <input type="text" class="form-control mask_time" id="hora_abertura" name="hora_abertura" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Data prevista') }}</label>
                                        <input type="text" class="form-control mask_date" id="data_prevista" name="data_prevista">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Hora prevista') }}</label>
                                        <input type="text" class="form-control mask_time" id="hora_prevista" name="hora_prevista">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Data conclusão') }}</label>
                                        <input type="text" class="form-control mask_date" id="data_conclusao" name="data_conclusao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Hora conclusão') }}</label>
                                        <input type="text" class="form-control mask_time" id="hora_conclusao" name="hora_conclusao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Data finalização') }}</label>
                                        <input type="text" class="form-control mask_date" id="data_finalizacao" name="data_finalizacao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Hora finalização') }}</label>
                                        <input type="text" class="form-control mask_time" id="hora_finalizacao" name="hora_finalizacao">
                                    </div>
                                </div>
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> {{ __('Cliente') }}</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Cliente') }}</label>
                                        <select class="form-control" name="cliente_id" id="cliente_id">
                                            <option value="">Selecione...</option>
                                            
                                            @foreach ($clientes as $cliente)
                                                <option value="{{ $cliente['id'] }}">{{ $cliente['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Nome') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="cliente_nome" name="cliente_nome" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('CNPJ') }}</label>
                                        <input type="text" class="form-control mask_cnpj" id="cliente_cnpj" name="cliente_cnpj" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('E-mail') }}</label>
                                        <input type="email" class="form-control text-lowercase" id="cliente_email" name="cliente_email" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Telefone') }}</label>
                                        <input type="text" class="form-control mask_phone_with_ddd" id="cliente_telefone" name="cliente_telefone" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Celular') }}</label>
                                        <input type="text" class="form-control mask_cell_with_ddd" id="cliente_celular" name="cliente_celular" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Logradouro') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="cliente_logradouro" name="cliente_logradouro" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Bairro') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="cliente_bairro" name="cliente_bairro" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Número') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="cliente_logradouro_numero" name="cliente_logradouro_numero" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Complemento') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="cliente_logradouro_complemento" name="cliente_logradouro_complemento" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Cidade') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="cliente_cidade" name="cliente_cidade" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('UF') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="cliente_uf" name="cliente_uf" readonly>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <!-- Materiais -->
                                    <div class="col-12 col-md-5" id="mat_divMateriais">
                                        <div class="row pt-4">
                                            <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> {{ __('Materiais') }}</h5>
                                            <div class="row col-12" id="mat_divEscolherMaterial">
                                                <div class="form-group col-7 col-md-9 pb-3">
                                                    <label class="form-label small">{{ __('Material') }}</label>
                                                    <select class="form-select form-select-sm" name="mat_escolherMaterialId" id="mat_escolherMaterialId">
                                                        <option value="">Selecione...</option>
                                                        
                                                        @foreach ($materiais as $material)
                                                            <option value="{{ $material['id'] }}" data-material_id="{{ $material['id'] }}" data-material_name="{{ $material['name'] }}" data-material_categoria_name="{{ $material['materialCategoriaName'] }}">{{ $material['materialCategoriaName'].' - '.$material['name'] }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                <div class="form-group col-3 col-md-2 pb-3">
                                                    <label class="form-label small">{{ __('Qtd') }}</label>
                                                    <input type="text" class="form-control form-control-sm text-center mask_numero_inteiro" name="mat_escolherMaterialQuantidade" id="mat_escolherMaterialQuantidade">
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
                                                            <th class="p-3 text-center">{{ __('QTD') }}</th>
                                                            <th class="p-3 text-center" id="mat_thOpcoes"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="mat_gradeTbody"></tbody>
                                                </table>
                                            </div>
                                            
                                            <!-- Campos hiddens para salvar na tabela brigadas_incendios_materiais -->
                                            <div id="mat_camposHiddens"></div>
                                        </div>
                                    </div>
                                    
                                    <!-- Escalas -->
                                    <div class="col-12 col-md-7" id="esc_divEscalas">
                                        <div class="row pt-4">
                                            <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> {{ __('Escalas x Brigadistas') }}</h5>
                                            <div class="row col-12" id="esc_divEscolherEscala">
                                                <div class="form-group col-6 col-md-2 pb-3">
                                                    <label class="form-label small">{{ __('Tipo') }}</label>
                                                    <select class="form-select form-select-sm" name="esc_escolherEscalaTipoId" id="esc_escolherEscalaTipoId">
                                                        <option value="">Selecione...</option>
                                                        
                                                        @foreach ($escala_tipos as $escala_tipo)
                                                            <option value="{{ $escala_tipo['id'] }}" data-escala_tipo_id="{{ $escala_tipo['id'] }}" data-escala_tipo_name="{{ $escala_tipo['name'] }}" data-escala_tipo_quantidade_alas="{{ $escala_tipo['quantidade_alas'] }}" data-escala_tipo_quantidade_horas_trabalhadas="{{ $escala_tipo['quantidade_horas_trabalhadas'] }}" data-escala_tipo_quantidade_horas_descanso="{{ $escala_tipo['quantidade_horas_descanso'] }}">{{ $escala_tipo['name'] }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                <div class="form-group col-6 col-md-2 pb-3">
                                                    <label class="form-label small">{{ __('Qtd Brig/Ala') }}</label>
                                                    <input type="text" class="form-control form-control-sm text-center mask_numero_inteiro" name="esc_escolherQuantidadeBrigadistasPorAla" id="esc_escolherQuantidadeBrigadistasPorAla">
                                                </div>
                                                <div class="form-group col-6 col-md-3 pb-3">
                                                    <label class="form-label small">{{ __('Posto') }}</label>
                                                    <input type="text" class="form-control form-control-sm text-center" name="esc_escolherPosto" id="esc_escolherPosto">
                                                </div>
                                                <div class="form-group col-6 col-md-2 pb-3">
                                                    <label class="form-label small">{{ __('Hr Iní. Ala 1') }}</label>
                                                    <input type="text" class="form-control form-control-sm text-center mask_time_reduzido" name="esc_escolherHoraInicioAla1" id="esc_escolherHoraInicioAla1">
                                                </div>
                                                <div class="form-group col-8 col-md-2 pb-3">
                                                    <label class="form-label">&nbsp;</label>
                                                    <div class="row">
                                                        <button type="button" class="btn btn-sm btn-light waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#esc_modalBrigadistas" onclick="esc_modalBrigadistasDadosMontar();">Brigadistas <i class="mdi mdi-chevron-down"></i></button>
                                                    </div>
                                                </div>
                                                <div class="form-group col-4 col-md-1 pb-3">
                                                    <label class="form-label">&nbsp;</label>
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <x-button-crud op="99" class="btn-sm" model="1" bgColor="success" textColor="write" id="esc_btnAdicionar" name="esc_btnAdicionar" title="Adicionar Escala na Grade" image="fas fa-check" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="table-responsive">
                                                <table class="table table-striped mb-0 small">
                                                    <thead class="table-primary">
                                                        <tr>
                                                            <th class="p-3">{{ __('ESCALA') }}</th>
                                                            <th class="p-3 text-center">{{ __('QTD') }}</th>
                                                            <th class="p-3 text-center" id="esc_thOpcoes"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="esc_gradeTbody"></tbody>
                                                </table>
                                            </div>
                                            
                                            <!-- Campos hiddens para salvar na tabela brigadas_incendios_escalas -->
                                            <div id="esc_camposHiddens"></div>
                                        </div>

                                        <!-- Modal Brigadistas -->
                                        <div class="modal fade" id="esc_modalBrigadistas" tabindex="-1" role="dialog" aria-labelledby="esc_modalBrigadistasTitle" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-scrollable">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="esc_modalBrigadistasTitle">Brigadistas</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <input type="hidden" id="esc_modalEscalaTipoIdCtrl" value="0">
                                                        <input type="hidden" id="esc_modalQuantidadeBrigadistasPorAlaCtrl" value="0">
                                                        
                                                        <div class="row pb-2">
                                                            <div class="col-10"><strong>BRIGADISTA</strong></div>
                                                            <div class="col-2 text-center"><strong>ALA</strong></div>
                                                        </div>
                                                        <div class="row" id="esc_modalBrigadistasDados"></div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
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