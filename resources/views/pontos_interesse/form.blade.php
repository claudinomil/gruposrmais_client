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
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-user"></i> {{ __('Informações Gerais') }}</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Tipo') }}</label>
                                        <select class="form-control" name="ponto_tipo_id" id="ponto_tipo_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($pontos_tipos as $ponto_tipo)
                                                <option value="{{ $ponto_tipo['id'] }}">{{ $ponto_tipo['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3" id="divPontoNaturezaId">
                                        <label class="form-label">{{ __('Natureza') }}</label>
                                        <select class="form-control" name="ponto_natureza_id" id="ponto_natureza_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($pontos_naturezas as $ponto_natureza)
                                                <option value="{{ $ponto_natureza['id'] }}">{{ $ponto_natureza['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3" id="divEspecialidade">
                                        <label class="form-label">&nbsp;</label>
                                        <div class="col-12 btn-group w-100">
                                            <button type="button" class="btn btn-light dropdown-toggle w-100" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {{ __('Especialidades') }} <i class="mdi mdi-chevron-down"></i>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-md p-4 w-100">
                                                @foreach ($especialidades as $especialidade)
                                                    <div class="form-check custom-checkbox small class_div_especialidade_tipo class_div_especialidade_tipo_id_{{ $especialidade['especialidade_tipo_id'] }}" id="divEspecialidade_{{ $especialidade['id'] }}">
                                                        <input type="checkbox" class="form-check-input class_input_especialidade" id="especialidade_{{ $especialidade['id'] }}" name="especialidade_{{ $especialidade['id'] }}" value="{{ $especialidade['id'] }}">
                                                        <label class="form-check-label" for="especialidade_{{ $especialidade['id'] }}">{{ __($especialidade['especialidadeTipoName']).' - '.__($especialidade['name']) }}</label>
                                                    </div>
                                                @endforeach
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Nome') }}</label>
                                        <input type="text" class="form-control" id="name" name="name" required="required">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Descrição') }}</label>
                                        <input type="text" class="form-control" id="descricao" name="descricao">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">
                                            {{ __('Ícone') }}&nbsp;&nbsp;
                                            <a href="#" class="texto-primary" data-bs-toggle="modal" data-bs-target="#modalIcons" id="buscarIcones"><i class="mdi mdi-search-web"></i> Buscar</a>
                                        </label>
                                        <div class="row">
                                            <div class="col-10">
                                                <input type="text" class="form-control" id="icone" name="icone" required="required" readonly>
                                            </div>
                                            <div class="col-2 text-end"><img id="iconView"></div>
                                        </div>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Telefone') }} 1</label>
                                        <input type="text" class="form-control mask_phone_with_ddd" id="telefone_1" name="telefone_1">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Telefone') }} 2</label>
                                        <input type="text" class="form-control mask_phone_with_ddd" id="telefone_2" name="telefone_2">
                                    </div>
                                </div>
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-map-marked"></i> {{ __('Localização') }}</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Latitude') }}</label>
                                        <input type="text" class="form-control" id="latitude" name="latitude" required="required">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Longitude') }}</label>
                                        <input type="text" class="form-control" id="longitude" name="longitude" required="required">
                                    </div>
                                </div>
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-house-user"></i> {{ __('Endereço') }}</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('CEP') }}</label>
                                        <input type="text" class="form-control mask_cep" id="cep" name="cep" onblur="pesquisacep(this.value);">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Número') }}</label>
                                        <input type="text" class="form-control" id="numero" name="numero">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Complemento') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="complemento" name="complemento">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Logradouro') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="logradouro" name="logradouro" readonly="readonly">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Bairro') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="bairro" name="bairro" readonly="readonly">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Localidade') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="localidade" name="localidade" readonly="readonly">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('UF') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="uf" name="uf" readonly="readonly">
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>

                    <div class="modal-buttons" id="crudFormButtons1_inferior">
                        <!-- store or update -->
                        @if(\App\Facades\Permissoes::permissao(['create', 'edit']))
                            <!-- Botão Confirnar Operação -->
                            <x-button-crud op="5" onclick="crudConfirmOperation();" />
                        @endif

                        <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>
                    <div class="modal-buttons mt-5" id="crudFormButtons2_inferior">
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
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Icons modal -->
<div class="modal fade modal-dialog-scrollable" id="modalIcons" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ __('Ícones') }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    @php
                        $dados = array_filter(scandir('build/assets/images/icones/mapas'), function($arquivo) {
                            return pathinfo($arquivo, PATHINFO_EXTENSION) === 'png';
                        });

                        foreach ($dados as $nome) {
                            echo "<div class='col-md-4 text-center pb-5'>
                                    <a href='#' class='text-black' onClick=\"$('#icone').val('".$nome."'); $('#iconView').removeClass(); $('#iconView').attr('src', 'build/assets/images/icones/mapas/".$nome."'); $('#modalIcons').modal('hide');\">
                                        <img src='build/assets/images/icones/mapas/$nome'>
                                        <div class='text-center'>".$nome."</div>
                                    </a>
                                  </div>";
                        }
                    @endphp

                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ __('Fechar') }}</button>
            </div>
        </div>
    </div>
</div>