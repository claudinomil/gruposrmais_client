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
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> {{ __('Origem') }}</h5>
                                    <div class="form-group col-12 col-md-5 pb-3">
                                        <label class="form-label">{{ __('Estoque Local') }}</label>
                                        <select class="form-control" name="origem_estoque_local_id" id="origem_estoque_local_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($estoques_locais as $estoque_local)
                                                @php

                                                $origem_estoque_local_texto = '';

                                                // Empresa
                                                if ($estoque_local['estoque_id'] == 1) {
                                                    $origem_estoque_local_texto = $estoque_local['name'].' - '.$estoque_local['estoqueName'].': '.$estoque_local['empresaName'];
                                                }

                                                // Cliente
                                                if ($estoque_local['estoque_id'] == 2) {
                                                    $origem_estoque_local_texto = $estoque_local['name'].' - '.$estoque_local['estoqueName'].': '.$estoque_local['clienteName'];
                                                }

                                                @endphp

                                                <option value="{{ $estoque_local['id'] }}">{{ $origem_estoque_local_texto }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Estoque') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="origem_estoque_nome" name="origem_estoque_nome" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Empresa') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="origem_empresa_nome" name="origem_empresa_nome" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Cliente') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="origem_cliente_nome" name="origem_cliente_nome" readonly>
                                    </div>
                                </div>
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> {{ __('Destino') }}</h5>
                                    <div class="form-group col-12 col-md-5 pb-3">
                                        <label class="form-label">{{ __('Estoque Local') }}</label>
                                        <select class="form-control" name="destino_estoque_local_id" id="destino_estoque_local_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($estoques_locais as $estoque_local)
                                                @php

                                                $destino_estoque_local_texto = '';

                                                // Empresa
                                                if ($estoque_local['estoque_id'] == 1) {
                                                    $destino_estoque_local_texto = $estoque_local['name'].' - '.$estoque_local['estoqueName'].': '.$estoque_local['empresaName'];
                                                }

                                                // Cliente
                                                if ($estoque_local['estoque_id'] == 2) {
                                                    $destino_estoque_local_texto = $estoque_local['name'].' - '.$estoque_local['estoqueName'].': '.$estoque_local['clienteName'];
                                                }

                                                @endphp

                                                <option value="{{ $estoque_local['id'] }}">{{ $destino_estoque_local_texto }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Estoque') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="destino_estoque_nome" name="destino_estoque_nome" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Empresa') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="destino_empresa_nome" name="destino_empresa_nome" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Cliente') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="destino_cliente_nome" name="destino_cliente_nome" readonly>
                                    </div>
                                </div>
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-list"></i> {{ __('Informações Gerais') }}</h5>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Quantidade') }}</label>
                                        <input type="text" class="form-control" id="quantidade" name="quantidade">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Data movimentação') }}</label>
                                        <input type="text" class="form-control mask_date" id="data_movimentacao" name="data_movimentacao">
                                    </div>
                                    <div class="form-group col-12 col-md-8 pb-3">
                                        <label class="form-label">{{ __('Observações') }}</label>
                                        <textarea class="form-control" id="observacoes" name="observacoes" rows="5"></textarea>
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
