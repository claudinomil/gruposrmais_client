<!-- Formulario -->
<div id="crudForm" style="display: none;">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 col-md-8 modal-buttons" id="crudFormButtons1">
                            <!-- store or update -->
                            @if(\App\Facades\Permissoes::permissao(['create', 'edit']))
                            <!-- Botão Confirnar Operação -->
                            <x-button-crud op="5" onclick="crudConfirmOperation();" />
                            @endif

                            <!-- Botão Cancelar Operação -->
                            <x-button-crud op="4" onclick="crudCancelOperation();" />
                        </div>
                        <div class="col-12 col-md-8 modal-buttons" id="crudFormButtons2">
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
                        <div class="col-12 col-md-4 text-end">
                            <div class="btn-group">
                                <button type="button" class="btn btn-info">Visualização</button>
                                <button type="button" class="btn btn-info dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="mdi mdi-chevron-down"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#" onclick="formControle(1)" id="formVisualizar1">Formulário Completo</a>
                                    <a class="dropdown-item" href="#" onclick="formControle(2)" id="formVisualizar2">Informações principais</a>
                                    <a class="dropdown-item" href="#" onclick="formControle(3)" id="formVisualizar3">Mapa Preventivo</a>
                                    <a class="dropdown-item" href="#" onclick="formControle(4)" id="formVisualizar4">Finalização</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Formulário - Form -->
                    <form id="{{$se_nameFormSubmodulo}}" name="{{$se_nameFormSubmodulo}}">
                        <fieldset>
                            <input type="hidden" id="frm_operacao" name="frm_operacao">
                            <input type="hidden" id="registro_id" name="registro_id">
                            <div class="row mt-4" id="divVistoriaSistema">
                                <div class="row pt-4" id="divInformacoesGerais">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-list"></i>{{ __(' Informações Gerais') }}</h5>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Status</label>
                                        <select class="form-select" name="vistoria_sistema_status_id" id="vistoria_sistema_status_id">
                                            @foreach ($vistoria_sistema_status as $registro)
                                            <option value="{{ $registro['id'] }}">{{ $registro['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-1 pb-3">
                                        <label class="form-label">{{ __('Número') }}</label>
                                        <input type="text" class="form-control" id="numero_vistoria_sistema" name="numero_vistoria_sistema" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-1 pb-3">
                                        <label class="form-label">Ano</label>
                                        <input type="text" class="form-control" id="ano_vistoria_sistema" name="ano_vistoria_sistema" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data abertura</label>
                                        <input type="text" class="form-control mask_date" id="data_abertura" name="data_abertura" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora abertura</label>
                                        <input type="text" class="form-control mask_time" id="hora_abertura" name="hora_abertura" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data prevista</label>
                                        <input type="text" class="form-control mask_date" id="data_prevista" name="data_prevista">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora prevista</label>
                                        <input type="text" class="form-control mask_time" id="hora_prevista" name="hora_prevista">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data conclusão</label>
                                        <input type="text" class="form-control mask_date" id="data_conclusao" name="data_conclusao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora conclusão</label>
                                        <input type="text" class="form-control mask_time" id="hora_conclusao" name="hora_conclusao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data finalização</label>
                                        <input type="text" class="form-control mask_date" id="data_finalizacao" name="data_finalizacao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora finalização</label>
                                        <input type="text" class="form-control mask_time" id="hora_finalizacao" name="hora_finalizacao">
                                    </div>
                                </div>

                                <div class="row pt-4" id="divCliente">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> Cliente</h5>
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

                                <div class="row pt-4" id="divEdificacao">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> Edificação</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Nome') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="edificacao_nome" name="edificacao_nome" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Pavimentos') }}</label>
                                        <input type="text" class="form-control" id="edificacao_pavimentos" name="edificacao_pavimentos" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Mezaninos') }}</label>
                                        <input type="text" class="form-control" id="edificacao_mezaninos" name="edificacao_mezaninos" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Coberturas') }}</label>
                                        <input type="text" class="form-control" id="edificacao_coberturas" name="edificacao_coberturas" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Áreas Técnicas') }}</label>
                                        <input type="text" class="form-control" id="edificacao_areas_tecnicas" name="edificacao_areas_tecnicas" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Altura') }}</label>
                                        <input type="text" class="form-control" id="edificacao_altura" name="edificacao_altura" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('ATC') }}</label>
                                        <input type="text" class="form-control" id="edificacao_area_total_construida" name="edificacao_area_total_construida" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Lotação') }}</label>
                                        <input type="text" class="form-control" id="edificacao_lotacao" name="edificacao_lotacao" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Carga Incêndio') }}</label>
                                        <input type="text" class="form-control" id="edificacao_carga_incendio" name="edificacao_carga_incendio" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Incêndio Risco') }}</label>
                                        <input type="text" class="form-control" id="edificacao_incendio_risco" name="edificacao_incendio_risco" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Grupo') }}</label>
                                        <input type="text" class="form-control" id="edificacao_grupo" name="edificacao_grupo" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Ocupação Uso') }}</label>
                                        <input type="text" class="form-control" id="edificacao_ocupacao_uso" name="edificacao_ocupacao_uso" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Divisão') }}</label>
                                        <input type="text" class="form-control" id="edificacao_divisao" name="edificacao_divisao" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Descrição') }}</label>
                                        <input type="text" class="form-control" id="edificacao_descricao" name="edificacao_descricao" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Definição') }}</label>
                                        <input type="text" class="form-control" id="edificacao_definicao" name="edificacao_definicao" readonly>
                                    </div>
                                </div>

                                <div class="row pt-4" id="divResponsavel">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-user-check"></i> Responsável</h5>
                                    <div class="form-group col-12 col-md-4 pb-3" id="divResponsavelFuncionarioId">
                                        <label class="form-label">Responsável</label>
                                        <select class="form-select" name="responsavel_funcionario_id" id="responsavel_funcionario_id" required="required">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($funcionarios as $key => $funcionario)
                                            <option value="{{ $funcionario['id'] }}">{{ $funcionario['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Nome') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="responsavel_funcionario_nome" name="responsavel_funcionario_nome" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('E-mail') }}</label>
                                        <input type="email" class="form-control text-lowercase" id="responsavel_funcionario_email" name="responsavel_funcionario_email" readonly>
                                    </div>
                                </div>

                                <div class="row pt-4" id="divFinalizar">
                                    <!-- <h5 class="pb-4 text-primary"><i class="fas fa-hourglass-end"></i> Finalizar</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Nível</label>
                                        <select class="form-select" name="nivel" id="nivel">
                                            <option value="">{{ __('Selecione...') }}</option>
                                            <option value="1">Risco Muito Baixo</option>
                                            <option value="2">Risco Baixo</option>
                                            <option value="3">Risco Moderado</option>
                                            <option value="4">Risco Alto</option>
                                            <option value="5">Risco Crítico</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-8 pb-3">
                                        <label class="form-label">Classificação</label>
                                        <textarea class="form-control" rows="4" id="classificacao" name="classificacao"></textarea>
                                    </div>
                                    <div class="form-group col-12 col-md-12 pb-3">
                                        <label class="form-label">Comentários</label>
                                        <textarea class="form-control" rows="8" id="comentarios" name="comentarios"></textarea>
                                    </div> -->
                                </div>

                                <div class="row pt-4" id="divMapaPreventivo"></div>

                                <div id="divBloqueio" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); color: white; font-size: 20px; text-align: center; padding-top: 20%; z-index: 9999;">Salvando dados...</div>
                            </div>
                        </fieldset>
                    </form>

                    <div class="modal-buttons pt-5" id="crudFormButtons1_inferior">
                        <!-- store or update -->
                        @if(\App\Facades\Permissoes::permissao(['create', 'edit']))
                        <!-- Botão Confirnar Operação -->
                        <x-button-crud op="5" onclick="crudConfirmOperation();" />
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

                        <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal observação -->
    <div class="modal fade" id="modalObservacao" tabindex="-1" role="dialog" aria-labelledby="modalObservacaoTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalObservacaoTitle">Observação</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <textarea class="col-12" rows="5" id="modal_observacao_texto" name="modal_observacao_texto"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" onclick="observacaoEnviar();">Enviar <i class="fab fa-telegram-plane ms-1"></i></button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal fotografia -->
    <div class="modal fade" id="modalFotografia" tabindex="-1" role="dialog" aria-labelledby="modalFotografiaTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalFotografiaTitle">Fotografia</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <!-- Opção buscar imagem -->
                        <div class="col-6 d-flex justify-content-start">
                            <button type="button" class="btn btn-outline-success" onclick="document.getElementById('modalFotografiaFile').click();">Buscar Imagem <i class="fas fa-image ms-1"></i></button>
                            <input type="file" id="modalFotografiaFile" accept="image/*" style="display:none;" onchange="fotografiaEnviar(this)">
                        </div>

                        <!-- Opção tirar foto -->
                        <div class="col-6 d-flex justify-content-end">
                            <button type="button" class="btn btn-outline-primary" onclick="document.getElementById('modalCameraFile').click();">Tirar Foto <i class="fas fa-camera ms-1"></i></button>
                            <input type="file" id="modalCameraFile" accept="image/*" capture="environment" style="display:none;" onchange="fotografiaEnviar(this)">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal pdf -->
    <div class="modal fade" id="modalPdf" tabindex="-1" role="dialog" aria-labelledby="modalPdfTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalPdfTitle">PDF</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <!-- Opção buscar arquivo -->
                        <div class="col-12 d-flex justify-content-center">
                            <button type="button" class="btn btn-outline-success" onclick="document.getElementById('modalPdfFile').click();">Buscar Arquivo <i class="fas fa-file-pdf ms-1"></i></button>
                            <input type="file" id="modalPdfFile" accept=".pdf,application/pdf" style="display:none;" onchange="pdfEnviar(this)">
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

    <!-- Modal visualizar Pdf -->
    <div class="modal fade" id="modalVisualizarPdf" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body p-0">
                    <iframe id="modalVisualizarPdfSrc" src="" frameborder="0" style="width:100%; height:80vh;"></iframe>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
</div>
