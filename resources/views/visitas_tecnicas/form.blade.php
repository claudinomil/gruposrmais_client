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
{{--                            <x-button-crud op="5" onclick="crudConfirmOperation();" />--}}
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

                        @if(\App\Facades\Permissoes::permissao(['list']))
                            <!-- Botão PDF -->
                            <x-button-crud op="99" model="3" bgColor="danger" textColor="write" title="Visita Técnica em PDF" image="fas fa-file-pdf" label="PDF" onclick="gerar_visita_tecnica()" />
                            <x-button-crud op="99" model="3" bgColor="primary" textColor="write" title="Visita Técnica em PDF (Inglês)" image="fas fa-file-pdf" label="PDF" onclick="gerar_visita_tecnica(0, 0, 'en')" />
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

                            <div class="row pt-4" id="divVisitaTecnicaTipo">
                                <h5 class="pb-4 text-primary"><i class="fas fa-list"></i> Tipo da Visita Técnica</h5>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Tipo</label>
                                    <select class="form-select" name="visita_tecnica_tipo_id" id="visita_tecnica_tipo_id">
                                        <option value="">Selecione...</option>
                                        @foreach ($visita_tecnica_tipos as $registro)
                                            <option value="{{ $registro['id'] }}">{{ $registro['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <!-- VISITA TECNICA TIPO 1 - INÍCIO-------------------------------------------------------->
                            <!-- VISITA TECNICA TIPO 1 - INÍCIO-------------------------------------------------------->
                            <div class="row mt-4" id="divVTT1">
                                <div class="row pt-4" id="vtt1_divInformacoesGerais">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-list"></i> Informações Gerais</h5>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Status</label>
                                        <select class="form-select" name="vtt1_visita_tecnica_status_id" id="vtt1_visita_tecnica_status_id">
                                            @foreach ($visita_tecnica_status as $registro)
                                                <option value="{{ $registro['id'] }}">{{ $registro['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-1 pb-3">
                                        <label class="form-label">Número</label>
                                        <input type="text" class="form-control" id="vtt1_numero_visita_tecnica" name="vtt1_numero_visita_tecnica" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-1 pb-3">
                                        <label class="form-label">Ano</label>
                                        <input type="text" class="form-control" id="vtt1_ano_visita_tecnica" name="vtt1_ano_visita_tecnica" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data abertura</label>
                                        <input type="text" class="form-control mask_date" id="vtt1_data_abertura" name="vtt1_data_abertura" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora abertura</label>
                                        <input type="text" class="form-control mask_time" id="vtt1_hora_abertura" name="vtt1_hora_abertura" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data prevista</label>
                                        <input type="text" class="form-control mask_date" id="vtt1_data_prevista" name="vtt1_data_prevista">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora prevista</label>
                                        <input type="text" class="form-control mask_time" id="vtt1_hora_prevista" name="vtt1_hora_prevista">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data conclusão</label>
                                        <input type="text" class="form-control mask_date" id="vtt1_data_conclusao" name="vtt1_data_conclusao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora conclusão</label>
                                        <input type="text" class="form-control mask_time" id="vtt1_hora_conclusao" name="vtt1_hora_conclusao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data finalização</label>
                                        <input type="text" class="form-control mask_date" id="vtt1_data_finalizacao" name="vtt1_data_finalizacao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora finalização</label>
                                        <input type="text" class="form-control mask_time" id="vtt1_hora_finalizacao" name="vtt1_hora_finalizacao">
                                    </div>
                                </div>

                                <div class="row pt-4" id="vtt1_divClientes">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> Cliente</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Cliente</label>
                                        <select class="form-select" name="vtt1_cliente_id" id="vtt1_cliente_id" required="required">
                                            <option value="">Selecione...</option>

                                            @foreach ($clientes as $key => $cliente)
                                                <option value="{{ $cliente['id'] }}">{{ $cliente['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Nome</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt1_cliente_nome" name="vtt1_cliente_nome" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Telefone</label>
                                        <input type="text" class="form-control mask_phone_with_ddd" id="vtt1_cliente_telefone" name="vtt1_cliente_telefone" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Celular</label>
                                        <input type="text" class="form-control mask_cell_with_ddd" id="vtt1_cliente_celular" name="vtt1_cliente_celular" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">E-mail</label>
                                        <input type="email" class="form-control text-lowercase" id="vtt1_cliente_email" name="vtt1_cliente_email" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Logradouro</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt1_cliente_logradouro" name="vtt1_cliente_logradouro" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Bairro</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt1_cliente_bairro" name="vtt1_cliente_bairro" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Cidade</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt1_cliente_cidade" name="vtt1_cliente_cidade" readonly>
                                    </div>
                                </div>

                                <div class="row pt-3" id="vtt1_divExecutar">
                                    <div class="text-success font-size-18">Visita Técnica de Exaustão <span class="text-dark font-size-14" id="vtt1_divExecutarCliente"></span></div>
                                </div>

                                <div class="row pt-4" id="vtt1_divPerguntas"></div>

                                <div id="vtt1_divBloqueio" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); color: white; font-size: 20px; text-align: center; padding-top: 20%; z-index: 9999;">Salvando dados...</div>
                            </div>
                            <!-- VISITA TECNICA TIPO 1 - FIM----------------------------------------------------------->
                            <!-- VISITA TECNICA TIPO 1 - FIM----------------------------------------------------------->

                            <!-- VISITA TECNICA TIPO 2 - INÍCIO-------------------------------------------------------->
                            <!-- VISITA TECNICA TIPO 2 - INÍCIO-------------------------------------------------------->
                            <div class="row mt-4" id="divVTT2">
                                <div class="row pt-4" id="vtt2_divVisitaTecnicaInformacoesGerais"></div>
                            </div>
                            <!-- VISITA TECNICA TIPO 2 - FIM----------------------------------------------------------->
                            <!-- VISITA TECNICA TIPO 2 - FIM----------------------------------------------------------->
                        </fieldset>
                    </form>

                    <div class="modal-buttons pt-5" id="crudFormButtons1_inferior">
                        <!-- store or update -->
                    @if(\App\Facades\Permissoes::permissao(['create', 'edit']))
                        <!-- Botão Confirnar Operação -->
{{--                            <x-button-crud op="5" onclick="crudConfirmOperation();" />--}}
                    @endif

                    <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>
                    <div class="modal-buttons pt-5" id="crudFormButtons2_inferior">
                        <!-- edit or delete -->
                    @if(\App\Facades\Permissoes::permissao(['edit']))
                        <!-- Botão Alterar Registro -->
                            <x-button-crud op="2" onclick="crudEdit(0)" />
                    @endif

                    @if(\App\Facades\Permissoes::permissao(['destroy']))
                        <!-- Botão Excluir Registro -->
                            <x-button-crud op="3" onclick="crudDelete(0);" />
                    @endif

                    @if(\App\Facades\Permissoes::permissao(['list']))
                        <!-- Botão PDF -->
                        <x-button-crud op="99" model="3" bgColor="danger" textColor="write" title="Visita Técnica em PDF" image="fas fa-file-pdf" label="PDF" onclick="gerar_visita_tecnica()" />
                        <x-button-crud op="99" model="3" bgColor="primary" textColor="write" title="Visita Técnica em PDF (Inglês)" image="fas fa-file-pdf" label="PDF" onclick="gerar_visita_tecnica(0, 0, 'en')" />
                    @endif

                    <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal observação -->
    <div class="modal fade" id="vtt1_modalObservacao" tabindex="-1" role="dialog" aria-labelledby="vtt1_modalObservacaoTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="vtt1_modalObservacaoTitle">Observação</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <textarea id="vtt1_modal_observacao_texto" name="vtt1_modal_observacao_texto"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" onclick="vtt1_observacaoEnviar();">Enviar <i class="fab fa-telegram-plane ms-1"></i></button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal fotografia -->
    <div class="modal fade" id="vtt1_modalFotografia" tabindex="-1" role="dialog" aria-labelledby="vtt1_modalFotografiaTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="vtt1_modalFotografiaTitle">Fotografia</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <!-- Opção buscar imagem -->
                        <div class="col-6 d-flex justify-content-start">
                            <button type="button" class="btn btn-outline-success" onclick="document.getElementById('vtt1_modalFotografiaFile').click();">Buscar Imagem <i class="fas fa-image ms-1"></i></button>
                            <input type="file" id="vtt1_modalFotografiaFile" accept="image/*" style="display:none;" onchange="vtt1_fotografiaEnviar(this)">
                        </div>

                        <!-- Opção tirar foto -->
                        <div class="col-6 d-flex justify-content-end">
                            <button type="button" class="btn btn-outline-primary" onclick="document.getElementById('vtt1_modalCameraFile').click();">Tirar Foto <i class="fas fa-camera ms-1"></i></button>
                            <input type="file" id="vtt1_modalCameraFile" accept="image/*" capture="environment" style="display:none;" onchange="vtt1_fotografiaEnviarDireto(this)">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal visualizar Foto -->
    <div class="modal fade" id="modalVisualizarImagem" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body text-center">
                    <img id="modalVisualizarImagemSrc" src="" class="img-fluid" alt="Imagem">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
</div>
