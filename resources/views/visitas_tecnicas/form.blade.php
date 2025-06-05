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

                                <div class="row pt-4" id="vtt1_divPerguntas">



{{--                                    <h5 class="text-primary"><i class="fas fa-question"></i> Responda as Perguntas</h5>--}}


{{--                                    @php--}}
{{--                                        $contadorTitulo = 0;--}}
{{--                                        $contadorSubtitulo = 0;--}}
{{--                                        $contadorPergunta = 0;--}}
{{--                                        $tituloAtual = null;--}}
{{--                                        $subtituloAtual = null;--}}
{{--                                    @endphp--}}

{{--                                    @foreach($visitas_tecnicas_dados as $dado)--}}
{{--                                        <div class="row pb-3">--}}

{{--                                        @if($dado['titulo'] !== $tituloAtual)--}}
{{--                                            @php--}}
{{--                                                $contadorTitulo++;--}}
{{--                                                $contadorSubtitulo = 0;--}}
{{--                                                $contadorPergunta = 0;--}}
{{--                                                $tituloAtual = $dado['titulo'];--}}
{{--                                                $subtituloAtual = null;--}}
{{--                                            @endphp--}}

{{--                                                <div class="col-12 py-4"><strong>{{ $contadorTitulo }}. {{ $dado['titulo'] }}</strong></div>--}}
{{--                                        @endif--}}

{{--                                        @if(!empty($dado['subtitulo']))--}}
{{--                                            @if($dado['subtitulo'] !== $subtituloAtual)--}}
{{--                                                @php--}}
{{--                                                    $contadorSubtitulo++;--}}
{{--                                                    $contadorPergunta = 1;--}}
{{--                                                    $subtituloAtual = $dado['subtitulo'];--}}
{{--                                                @endphp--}}

{{--                                                <div class="col-12 ps-3 py-4"><strong>{{ chr(64 + $contadorSubtitulo) }}. {{ $dado['subtitulo'] }}</strong></div>--}}
{{--                                            @else--}}
{{--                                                @php--}}
{{--                                                    $contadorPergunta++;--}}
{{--                                                @endphp--}}
{{--                                            @endif--}}

{{--                                            <div class="row col-12 bg-light ms-3 py-2">--}}
{{--                                                <div class="col-12 col-md-7">{{ $contadorTitulo }}.{{ chr(64 + $contadorSubtitulo) }}.{{ $contadorPergunta }}. {{ $dado['pergunta'] }}</div>--}}
{{--                                        @else--}}
{{--                                            @php--}}
{{--                                                $contadorPergunta++;--}}
{{--                                            @endphp--}}

{{--                                            <div class="row col-12 bg-light ms-3 py-2">--}}
{{--                                                <div class="col-12 col-md-7">{{ $contadorTitulo }}.{{ $contadorPergunta }}. {{ $dado['pergunta'] }}</div>--}}
{{--                                        @endif--}}

{{--                                                <div class="row col-12 col-md-5">--}}
{{--                                                    <div class="form-check-success col-3">--}}
{{--                                                        <input class="form-check-input" type="radio" name="vtt1_resposta_{{ $dado['id'] }}_1" id="vtt1_resposta_{{ $dado['id'] }}_1">--}}
{{--                                                        <label class="form-check-label" for="vtt1_resposta_{{ $dado['id'] }}_1">Sim</label>--}}
{{--                                                    </div>--}}
{{--                                                    <div class="form-check-danger col-3">--}}
{{--                                                        <input class="form-check-input" type="radio" name="vtt1_resposta_{{ $dado['id'] }}_2" id="vtt1_resposta_{{ $dado['id'] }}_2">--}}
{{--                                                        <label class="form-check-label" for="vtt1_resposta_{{ $dado['id'] }}_2">Não</label>--}}
{{--                                                    </div>--}}
{{--                                                    <div class="form-check-warning col-3">--}}
{{--                                                        <input class="form-check-input" type="radio" name="vtt1_resposta_{{ $dado['id'] }}_3" id="vtt1_resposta_{{ $dado['id'] }}_3">--}}
{{--                                                        <label class="form-check-label" for="vtt1_resposta_{{ $dado['id'] }}_3">NI</label>--}}
{{--                                                    </div>--}}
{{--                                                    <div class="d-flex col-3 px-0 justify-content-end">--}}
{{--                                                        <a href="#" title="Observação" onclick="vtt1_abrirModalObservacao({{ $dado['id'] }})" id="vtt1_linkModalObservacao_{{ $dado['id'] }}"><i class="bx bx-detail text-success font-size-18 me-3"></i></a>--}}
{{--                                                        <a href="#" title="Fotografia" onclick="vtt1_abrirModalFotografia({{ $dado['id'] }})" id="vtt1_linkModalFotografia_{{ $dado['id'] }}"><i class="bx bxs-photo-album text-primary font-size-18"></i></a>--}}
{{--                                                    </div>--}}
{{--                                                </div>--}}

{{--                                                <div class="row" id="vtt1_divObservacaoFotografia_{{ $dado['id'] }}" style="display: none;">--}}
{{--                                                    <hr />--}}
{{--                                                    <div class="col-12 col-md-6 text-success" id="vtt1_divObservacao_{{ $dado['id'] }}">--}}
{{--                                                        <b>Observação</b>--}}
{{--                                                        <br>--}}
{{--                                                        <div class="col-12 text-black justify-content-start" id="vtt1_divObservacaoTexto_{{ $dado['id'] }}"></div>--}}
{{--                                                        <input type="hidden" id="vtt1_observacao_texto_{{ $dado['id'] }}" name="vtt1_observacao_texto_{{ $dado['id'] }}">--}}
{{--                                                    </div>--}}
{{--                                                    <div class="col-12 col-md-6 text-primary" id="vtt1_divFotografia_{{ $dado['id'] }}">--}}
{{--                                                        <b>Fotografia</b>--}}
{{--                                                        <br>--}}
{{--                                                        <div class="col-12 d-flex flex-wrap text-black" id="vtt1_divFotografiaFotos_{{ $dado['id'] }}">--}}
{{--                                                            <div class="m-2 d-inline-block text-center position-relative">--}}
{{--                                                                <button type="button" class="btn btn-sm btn-success position-absolute top-0 start-0 visualizar-foto" style="display: none;">👁</button>--}}
{{--                                                                <img src="" class="img-thumbnail" style="width: 100px; height: 100px; object-fit: cover; display: none;">--}}
{{--                                                                <input type="hidden" name="vtt1_fotografia_{{ $dado['id'] }}_1" id="vtt1_fotografia_{{ $dado['id'] }}_1" value="">--}}
{{--                                                                <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 remover-foto" style="display: none;">&times;</button>--}}
{{--                                                            </div>--}}
{{--                                                            <div class="m-2 d-inline-block text-center position-relative">--}}
{{--                                                                <button type="button" class="btn btn-sm btn-success position-absolute top-0 start-0 visualizar-foto" style="display: none;">👁</button>--}}
{{--                                                                <img src="" class="img-thumbnail" style="width: 100px; height: 100px; object-fit: cover; display: none;">--}}
{{--                                                                <input type="hidden" name="vtt1_fotografia_{{ $dado['id'] }}_2" id="vtt1_fotografia_{{ $dado['id'] }}_2" value="">--}}
{{--                                                                <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 remover-foto" style="display: none;">&times;</button>--}}
{{--                                                            </div>--}}
{{--                                                            <div class="m-2 d-inline-block text-center position-relative">--}}
{{--                                                                <button type="button" class="btn btn-sm btn-success position-absolute top-0 start-0 visualizar-foto" style="display: none;">👁</button>--}}
{{--                                                                <img src="" class="img-thumbnail" style="width: 100px; height: 100px; object-fit: cover; display: none;">--}}
{{--                                                                <input type="hidden" name="vtt1_fotografia_{{ $dado['id'] }}_3" id="vtt1_fotografia_{{ $dado['id'] }}_3" value="">--}}
{{--                                                                <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 remover-foto" style="display: none;">&times;</button>--}}
{{--                                                            </div>--}}
{{--                                                        </div>--}}
{{--                                                    </div>--}}
{{--                                                </div>--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                    @endforeach--}}




                                </div>
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
                    <button type="button" class="btn btn-primary" onclick="vtt1_observacaoAnexar();">Anexar <i class="fab fa-telegram-plane ms-1"></i></button>
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
                    <input type="file" id="modalFotografiaFile" accept="image/*" style="display: none;"
                           @if (session('access_device') == 'mobile' || session('access_device') == 'tablet') capture="environment" @endif>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>

                    @if (session('access_device') == 'mobile' || session('access_device') == 'tablet')
                        <button type="button" id="modalFotografiaAnexar" class="btn btn-primary mt-2">Tirar Foto <i class="bx bxs-photo-album ms-1"></i></button>
                    @elseif (session('access_device') == 'desktop')
                        <button type="button" id="modalFotografiaAnexar" class="btn btn-primary mt-2">Anexar Foto <i class="bx bxs-photo-album ms-1"></i></button>
                    @endif
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
