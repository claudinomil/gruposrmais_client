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

                            <div class="row mt-4">
                                <div class="form-group col-12 col-md-6 pb-3">
                                    <label class="form-label">Categoria</label>
                                    <select class="form-control" name="produto_categoria_id" id="produto_categoria_id">
                                        <option value="">{{ __('Selecione...') }}</option>

                                        @foreach ($produto_categorias as $produto_categoria)
                                            <option value="{{ $produto_categoria['id'] }}">{{ $produto_categoria['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-6 pb-3">
                                    <label class="form-label">{{ __('Nome') }}</label>
                                    <input type="text" class="form-control text-uppercase" id="name" name="name" required="required">
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Cor</label>
                                    <select class="form-control" name="cor_id" id="cor_id">
                                        <option value="">{{ __('Selecione...') }}</option>

                                        @foreach ($cores as $cor)
                                            <option value="{{ $cor['id'] }}">{{ $cor['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">{{ __('CA') }}</label>
                                    <input type="text" class="form-control" id="ca" name="ca">
                                </div>
                                <div class="form-group col-12 col-md-12 pb-3">
                                    <label class="form-label">{{ __('Descrição') }}</label>
                                    <input type="text" class="form-control" id="descricao" name="descricao">
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
