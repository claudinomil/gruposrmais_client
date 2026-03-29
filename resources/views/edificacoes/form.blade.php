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
                        <x-button-crud op="5" onclick="crudConfirmOperation();" />
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

                            <input type="hidden" id="area_total_construida_niveis" name="area_total_construida_niveis" value="0,00">

                            <div class="row pt-4">
                                <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> {{ __('Cliente') }}</h5>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">{{ __('Cliente') }}</label>
                                    <select class="form-select" name="cliente_id" id="cliente_id">
                                        <option value="">{{ __('Selecione...') }}</option>

                                        @foreach ($clientes as $key => $cliente)
                                        <option value="{{ $cliente['id'] }}">{{ $cliente['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">{{ __('Nome') }}</label>
                                    <input type="text" class="form-control text-uppercase" id="cliente_nome" name="cliente_nome" readonly>
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
                                    <label class="form-label">{{ __('E-mail') }}</label>
                                    <input type="email" class="form-control text-lowercase" id="cliente_email" name="cliente_email" readonly>
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
                                    <label class="form-label">Cidade</label>
                                    <input type="text" class="form-control text-uppercase" id="cliente_cidade" name="cliente_cidade" readonly>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> {{ __('Edificação') }}</h5>
                                <div class="form-group col-12 col-md-12 pb-3">
                                    <label class="form-label">{{ __('Nome') }}</label>
                                    <input type="text" class="form-control text-uppercase" id="name" name="name">
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">{{ __('Pavimentos') }}</label>
                                    <select class="form-select" name="pavimentos" id="pavimentos" onchange="montarEdificacaoNiveis({ v_div_edificacao_niveis: 'divEdificacaoNiveis' });">
                                        @for ($i=0; $i<=30; $i++)
                                            <option value="{{ $i }}">{{ $i }}</option>
                                            @endfor
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">{{ __('Mezaninos') }}</label>
                                    <select class="form-select" name="mezaninos" id="mezaninos" onchange="montarEdificacaoNiveis({ v_div_edificacao_niveis: 'divEdificacaoNiveis' });">
                                        @for ($i=0; $i<=30; $i++)
                                            <option value="{{ $i }}">{{ $i }}</option>
                                            @endfor
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">{{ __('Coberturas') }}</label>
                                    <select class="form-select" name="coberturas" id="coberturas" onchange="montarEdificacaoNiveis({ v_div_edificacao_niveis: 'divEdificacaoNiveis' });">
                                        @for ($i=0; $i<=30; $i++)
                                            <option value="{{ $i }}">{{ $i }}</option>
                                            @endfor
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">{{ __('Áreas Técnicas') }}</label>
                                    <select class="form-select" name="areas_tecnicas" id="areas_tecnicas" onchange="montarEdificacaoNiveis({ v_div_edificacao_niveis: 'divEdificacaoNiveis' });">
                                        @for ($i=0; $i<=30; $i++)
                                            <option value="{{ $i }}">{{ $i }}</option>
                                            @endfor
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">{{ __('Altura') }}</label>
                                    <input type="text" class="form-control mask_money" id="altura" name="altura" required="required">
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">{{ __('ATC (m²)') }}</label>
                                    <input type="text" class="form-control mask_money" id="area_total_construida" name="area_total_construida" required>
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">{{ __('Lotação') }}</label>
                                    <input type="text" class="form-control mask_numero_inteiro" id="lotacao" name="lotacao" required>
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">{{ __('Carga Incêndio') }}</label>
                                    <input type="text" class="form-control mask_numero_inteiro" id="carga_incendio" name="carga_incendio" required>
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">{{ __('Risco Incêndio') }}</label>
                                    <select class="form-select" name="incendio_risco_id" id="incendio_risco_id">
                                        <option value="">{{ __('Selecione...') }}</option>

                                        @foreach ($incendio_riscos as $key => $incendio_risco)
                                        <option value="{{ $incendio_risco['id'] }}">{{ \App\Services\SuporteService::getPrimeiraMaiuscula($incendio_risco['name']) }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">{{ __('Classificação Edificação') }}</label>
                                    <select class="form-select" name="edificacao_classificacao_id" id="edificacao_classificacao_id" onchange="edificacaoClassificacaoCampos()">
                                        <option value="">{{ __('Selecione...') }}</option>

                                        @foreach ($edificacao_classificacoes as $key => $edificacao_classificacao)
                                        <option value="{{ $edificacao_classificacao['id'] }}"
                                            data-definicao="{{ $edificacao_classificacao['definicao'] }}"
                                            data-grupo="{{ $edificacao_classificacao['grupo'] }}"
                                            data-ocupacao_uso="{{ $edificacao_classificacao['ocupacao_uso'] }}"
                                            data-divisao="{{ $edificacao_classificacao['divisao'] }}"
                                            data-descricao="{{ $edificacao_classificacao['descricao'] }}">{{ $edificacao_classificacao['divisao']. ' | '.$edificacao_classificacao['ocupacao_uso']. ' | '.$edificacao_classificacao['descricao'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-12 pb-3">
                                    <label class="form-label">{{ __('Definição') }}</label>
                                    <input type="text" class="form-control" id="definicao" name="definicao" readonly>
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">{{ __('Grupo') }}</label>
                                    <input type="text" class="form-control" id="grupo" name="grupo" readonly>
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">{{ __('Divisão') }}</label>
                                    <input type="text" class="form-control" id="divisao" name="divisao" readonly>
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">{{ __('Ocupação') }}</label>
                                    <input type="text" class="form-control" id="ocupacao_uso" name="ocupacao_uso" readonly>
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">{{ __('Descrição') }}</label>
                                    <input type="text" class="form-control" id="descricao" name="descricao" readonly>
                                </div>

                                <div id="divEdificacaoNiveis" class="row mt-3"></div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
