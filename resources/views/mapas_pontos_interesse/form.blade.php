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
                    <div class="modal-loading" id="crudFormAjaxLoading" style="display: none;">
                        <div class="spinner-chase">
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                        </div>
                    </div>

                    <!-- Formulário - Form -->
                    <form id="{{$se_nameFormSubmodulo}}" name="{{$se_nameFormSubmodulo}}">
                        <fieldset>
                            <input type="hidden" id="frm_operacao" name="frm_operacao">
                            <input type="hidden" id="registro_id" name="registro_id">

                            <div class="row mt-4">
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Ponto Tipo</label>
                                    <select class="form-control" name="mapa_ponto_tipo_id" id="mapa_ponto_tipo_id">
                                        <option value="">Selecione...</option>

                                        @foreach ($mapas_pontos_tipos as $mapa_ponto_tipo)
                                            <option value="{{ $mapa_ponto_tipo['id'] }}">{{ $mapa_ponto_tipo['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Nome</label>
                                    <input type="text" class="form-control" id="name" name="name" required="required">
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Descrição</label>
                                    <input type="text" class="form-control" id="descricao" name="descricao">
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Latitude</label>
                                    <input type="text" class="form-control" id="latitude" name="latitude" required="required">
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Longitude</label>
                                    <input type="text" class="form-control" id="longitude" name="longitude" required="required">
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">
                                        Ícone&nbsp;&nbsp;
                                        <a href="#" class="texto-primary" data-bs-toggle="modal" data-bs-target="#modalIcons" id="buscarIcones"><i class="mdi mdi-search-web"></i> Buscar</a>
                                    </label>
                                    <div class="row">
                                        <div class="col-10">
                                            <input type="text" class="form-control" id="icone" name="icone" required="required" readonly>
                                        </div>
                                        <div class="col-2"><img id="iconView"></div>
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
                    <div class="modal-buttons" id="crudFormButtons2_inferior">
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
                <h5 class="modal-title">Ícones</h5>
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
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
