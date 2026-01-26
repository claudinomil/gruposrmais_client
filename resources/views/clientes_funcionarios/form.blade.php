<!-- Formulario -->
<div id="crudForm" style="display: none;">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="modal-buttons" id="crudFormButtons1">
                        <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>
                    <div class="modal-buttons" id="crudFormButtons2">
                        <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>

                    <!-- Formulário - Form -->
                    <form id="{{$se_nameFormSubmodulo}}" name="{{$se_nameFormSubmodulo}}">
                        <input type="hidden" id="frm_operacao" name="frm_operacao">
                        <input type="hidden" id="registro_id" name="registro_id">

                        <div class="row mt-4">
                            <div class="row pt-4">
                                <h5 class="pb-4 text-primary"><i class="fas fa-user"></i> {{ __('Informações Gerais') }}</h5>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">{{ __('Nome') }}</label>
                                    <input type="text" class="form-control text-uppercase" id="name" name="name" readonly>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">{{ __('CPF') }}</label>
                                    <input type="text" class="form-control mask_cpf" id="cpf" name="cpf" readonly>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">{{ __('Empresa') }}</label>
                                    <input type="text" class="form-control" id="empresa" name="empresa" readonly>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">{{ __('Tomador de Serviço') }}</label>
                                    <input type="text" class="form-control" id="tomador_servico_cliente" name="tomador_servico_cliente" readonly>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">{{ __('Tipo Contratação') }}</label>
                                    <input type="text" class="form-control" id="contratacao_tipo" name="contratacao_tipo" readonly>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">{{ __('Função') }}</label>
                                    <input type="text" class="form-control" id="funcao" name="funcao" readonly>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">{{ __('Departamento') }}</label>
                                    <input type="text" class="form-control" id="departamento" name="departamento" readonly>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">{{ __('Nome Profissional') }}</label>
                                    <input type="text" class="form-control" id="nome_profissional" name="nome_profissional" readonly>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">{{ __('Nascimento') }}</label>
                                    <input type="text" class="form-control" id="data_nascimento" name="data_nascimento" readonly>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">{{ __('Gênero') }}</label>
                                    <input type="text" class="form-control" id="genero" name="genero" readonly>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
