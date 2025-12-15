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
                                <x-button-crud op="2" onclick="crudEdit(0)" id="btnCrudAlterarRegistro2" />
                        @endif

                        @if(\App\Facades\Permissoes::permissao(['destroy']))
                            <!-- Botão Excluir Registro -->
                                <x-button-crud op="3" onclick="crudDelete(0);" id="btnCrudExcluirRegistro2" />
                        @endif

                        <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>

                    <!-- Formulário - Form -->
                    <form id="{{$se_nameFormSubmodulo}}" name="{{$se_nameFormSubmodulo}}">
                        <fieldset>
                            <input type="hidden" id="frm_operacao" name="frm_operacao">
                            <input type="hidden" id="registro_id" name="registro_id">

                            <div class="row pt-4">
                                <h5 class="pb-4 text-primary"><i class="fas fa-house-user"></i>{{ __(' Informações Gerais') }}</h5>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">{{ __('Estoque') }}</label>
                                    <select class="form-control" name="estoque_id" id="estoque_id">
                                        <option value="">{{ __('Selecione...') }}</option>

                                        @foreach ($estoques as $estoque)
                                            <option value="{{ $estoque['id'] }}">{{ $estoque['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3" id="divEmpresaId" style="display: none;">
                                    <label class="form-label">{{ __('Empresa') }}</label>
                                    <select class="form-control" name="empresa_id" id="empresa_id">
                                        <option value="">{{ __('Selecione...') }}</option>

                                        @foreach ($empresas as $empresa)
                                            <option value="{{ $empresa['id'] }}">{{ $empresa['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3" id="divClienteId" style="display: none;">
                                    <label class="form-label">{{ __('Cliente') }}</label>
                                    <select class="form-control" name="cliente_id" id="cliente_id">
                                        <option value="">{{ __('Selecione...') }}</option>

                                        @foreach ($clientes as $cliente)
                                            <option value="{{ $cliente['id'] }}">{{ $cliente['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">{{ __('Nome') }}</label>
                                    <input type="text" class="form-control text-uppercase" id="name" name="name">
                                </div>
                                <div class="form-group col-12 col-md-12 pb-3">
                                    <label class="form-label">{{ __('Descrição') }}</label>
                                    <input type="text" class="form-control text-uppercase" id="descricao" name="descricao">
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
