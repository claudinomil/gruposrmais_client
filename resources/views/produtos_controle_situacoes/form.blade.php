<!-- Formulario -->
<div id="crudForm" style="display: none;">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="modal-buttons" id="crudFormButtons1">
                        <!-- store or update -->
                        @if(\App\Facades\Permissoes::permissao(['edit']))
                            <!-- Botão Confirnar Operação -->
                            <x-button-crud op="5" onclick="crudConfirmOperation();" />
                        @endif

                        <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>
                    <div class="modal-buttons" id="crudFormButtons2">
                        <!-- edit -->
                        @if(\App\Facades\Permissoes::permissao(['edit']))
                            <!-- Botão Alterar Registro -->
                            <x-button-crud op="2" onclick="crudEdit(0)" />
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
                                    <h5 class="pb-4 text-primary"><i class="bx bxs-box"></i> {{ __('Patrimônio') }}</h5>

                                    <div class="row alert alert-success p-1 m-1">
                                        <div class="form-group col-12 col-md-1 pb-3">
                                            <label class="form-label">{{ __('Fotografia') }}</label>
                                            <img src="" alt="" class="img-thumbnail avatar-sm" id="divFotografia">
                                        </div>
                                        <div class="form-group col-12 col-md-1 pb-3">
                                            <label class="form-label">{{ __('Patrimônio') }}</label>
                                            <div class="" id="divNumeroPatrimonio"></div>
                                        </div>
                                        <div class="form-group col-12 col-md-4 pb-3">
                                            <label class="form-label">{{ __('Produto') }}</label>
                                            <div class="" id="divProdutoName"></div>
                                        </div>
                                        <div class="form-group col-12 col-md-4 pb-3">
                                            <label class="form-label">{{ __('Local Atual') }}</label>
                                            <div class="" id="divLocal"></div>
                                        </div>
                                        <div class="form-group col-12 col-md-2 pb-3">
                                            <label class="form-label col-12 text-center">{{ __('Situação Atual') }}</label>
                                            <div class="" id="divSituacaoAtual"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row pt-4" id="divPatrimonioSituacoes">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> {{ __('Patrimônio Situações') }}</h5>
                                    <div class="col-12" id="divPatrimonioSituacoesTable"></div>
                                </div>

                                <!-- Campos Hiddens -->
                                <input type="hidden" id="produto_entrada_item_id" name="produto_entrada_item_id" value="">
                                <input type="hidden" id="anterior_produto_situacao_id" name="anterior_produto_situacao_id" value="0">
                                <input type="hidden" id="anterior_estoque_local_id" name="anterior_estoque_local_id" value="0">

                                <div class="row pt-4" id="divAlterarSituacaoLocal">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-edit"></i> {{ __('Alterar Situação e/ou Local') }}</h5>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Situação Alterar') }} <i class="fa fa-info-circle text-warning" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Esse campo apenas fará a troca da Situação do Patrimônio."></i></label>
                                        <select class="form-control" name="atual_produto_situacao_id" id="atual_produto_situacao_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($produto_situacoes as $situacao)
                                                <option value="{{ $situacao['id'] }}">{{ $situacao['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-9 pb-3">
                                        <label class="form-label">{{ __('Local Alterar') }} <i class="fa fa-info-circle text-warning" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Se preencher esse campo, será feita uma Movimentação do Patrimônio."></i></label>
                                        <select class="form-control" name="atual_estoque_local_id" id="atual_estoque_local_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($estoques_locais as $estoque_local)
                                                @php
                                                if ($estoque_local['estoque_id'] == 1) {
                                                    $local = $estoque_local['name'].' - '.$estoque_local['estoqueName'].' - '.$estoque_local['empresaName'];
                                                } else {
                                                    $local = $estoque_local['name'].' - '.$estoque_local['estoqueName'].' - '.$estoque_local['clienteName'];
                                                }
                                                @endphp

                                                <option value="{{ $estoque_local['id'] }}">{{ $local }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="row pt-4" id="divInformacoesGerais">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-list"></i> {{ __('Informações Gerais') }}</h5>
                                    <div class="form-group col-12 col-md-1 pb-3">
                                        <label class="form-label">{{ __('Data alteração') }}</label>
                                        <input type="text" class="form-control mask_date" id="data_alteracao" name="data_alteracao" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-1 pb-3">
                                        <label class="form-label">{{ __('Hora alteração') }}</label>
                                        <input type="text" class="form-control" id="hora_alteracao" name="hora_alteracao" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-8 pb-3">
                                        <label class="form-label">{{ __('Observação') }}</label>
                                        <textarea class="form-control" id="observacao" name="observacao" rows="3"></textarea>
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
