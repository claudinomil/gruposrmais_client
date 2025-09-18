<!-- Formulario -->
<div id="crudConfigurarPerguntas" style="display: none;">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="modal-buttons">
                    @if(\App\Facades\Permissoes::permissao(['create']))
                    @endif

                    @if(\App\Facades\Permissoes::permissao(['edit']))
                    @endif

                        <button type="button" class="btn btn-primary text-white mb-2 waves-effect btn-label waves-light" onclick="previewPerguntas(1);"><i class="fa fa-eye label-icon"></i>&nbsp;Completa</button>
                        <button type="button" class="btn btn-success text-white mb-2 waves-effect btn-label waves-light" onclick="previewPerguntas(2);"><i class="fa fa-eye label-icon"></i>&nbsp;Sintética</button>

                        <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation(); configurar_perguntas_controle(2);" />
                    </div>

                    @php
                        $visita_tecnica_perguntas = array_filter($visita_tecnica_perguntas, function ($p) {
                            return $p['completa'] === 1;
                        });

                        usort($visita_tecnica_perguntas, function ($a, $b) {
                            return $a['completa_ordem'] <=> $b['completa_ordem'];
                        });
					@endphp

                    @foreach ($visita_tecnica_perguntas as $registro)
                        <form class="mt-2" id="frm_configurar_perguntas_{{ $registro['id'] }}" name="frm_configurar_perguntas_{{ $registro['id'] }}">
                            <div id="msg_processamento_{{ $registro['id'] }}" class="alert d-none mt-2"></div>

                            <div class="row alert alert-primary mx-1 p-1">
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Título</label>
                                    <textarea class="form-control form-control-sm small" id="titulo_{{ $registro['id'] }}" name="titulo_{{ $registro['id'] }}" rows="3">{{ $registro['titulo'] }}</textarea>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Subtítulo</label>
                                    <textarea class="form-control form-control-sm small" id="subtitulo_{{ $registro['id'] }}" name="subtitulo_{{ $registro['id'] }}" rows="3">{{ $registro['subtitulo'] }}</textarea>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Pergunta</label>
                                    <textarea class="form-control form-control-sm small" id="pergunta_{{ $registro['id'] }}" name="pergunta_{{ $registro['id'] }}" rows="3">{{ $registro['pergunta'] }}</textarea>
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Tipo</label>
                                    <select class="form-select form-select-sm small" name="visita_tecnica_tipo_id_{{ $registro['id'] }}" id="visita_tecnica_tipo_id_{{ $registro['id'] }}" required="required">
                                        @foreach ($visita_tecnica_tipos as $visita_tecnica_tipo)
                                            @php
                                                $selected = ($registro['visita_tecnica_tipo_id'] == $visita_tecnica_tipo['id']) ? 'selected' : '';
                                            @endphp

                                            <option class="small" value="{{ $visita_tecnica_tipo['id'] }}">{{ $visita_tecnica_tipo['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-1 pb-3">
                                    <label class="form-label">Completa</label>
                                    <select class="form-select form-select-sm small" name="completa_{{ $registro['id'] }}" id="completa_{{ $registro['id'] }}">
                                        @php
                                            $selected_0 = ($registro['completa'] == 0) ? 'selected' : '';
                                            $selected_1 = ($registro['completa'] == 1) ? 'selected' : '';
                                        @endphp

                                        <option value="0" {{ $selected_0 }}>Não</option>
                                        <option value="1" {{ $selected_1 }}>Sim</option>
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Completa (ordem)</label>
                                    <input type="text" class="form-control form-control-sm small" id="completa_ordem_{{ $registro['id'] }}" name="completa_ordem_{{ $registro['id'] }}" value="{{ $registro['completa_ordem'] }}">
                                </div>
                                <div class="form-group col-12 col-md-1 pb-3">
                                    <label class="form-label">Sintética</label>
                                    <select class="form-select form-select-sm small" name="sintetica_{{ $registro['id'] }}" id="sintetica_{{ $registro['id'] }}">
                                        @php
                                            $selected_0 = ($registro['sintetica'] == 0) ? 'selected' : '';
                                            $selected_1 = ($registro['sintetica'] == 1) ? 'selected' : '';
                                        @endphp

                                        <option value="0" {{ $selected_0 }}>Não</option>
                                        <option value="1" {{ $selected_1 }}>Sim</option>
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Sintética (ordem)</label>
                                    <input type="text" class="form-control form-control-sm small" id="sintetica_ordem_{{ $registro['id'] }}" name="sintetica_ordem_{{ $registro['id'] }}" value="{{ $registro['sintetica_ordem'] }}">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Opções</label>
                                    <select class="form-select form-select-sm small" name="opcoes_{{ $registro['id'] }}" id="opcoes_{{ $registro['id'] }}">
                                        @php
                                            $selected_0 = ($registro['opcoes'] == 0) ? 'selected' : '';
                                            $selected_1 = ($registro['opcoes'] == 1) ? 'selected' : '';
                                            $selected_2 = ($registro['opcoes'] == 2) ? 'selected' : '';
                                            $selected_3 = ($registro['opcoes'] == 3) ? 'selected' : '';
                                            $selected_4 = ($registro['opcoes'] == 4) ? 'selected' : '';
                                            $selected_5 = ($registro['opcoes'] == 5) ? 'selected' : '';
                                            $selected_6 = ($registro['opcoes'] == 6) ? 'selected' : '';
                                            $selected_7 = ($registro['opcoes'] == 7) ? 'selected' : '';
                                            $selected_8 = ($registro['opcoes'] == 8) ? 'selected' : '';
                                            $selected_9 = ($registro['opcoes'] == 9) ? 'selected' : '';
                                            $selected_10 = ($registro['opcoes'] == 10) ? 'selected' : '';
                                            $selected_11 = ($registro['opcoes'] == 11) ? 'selected' : '';
                                            $selected_12 = ($registro['opcoes'] == 12) ? 'selected' : '';
                                            $selected_13 = ($registro['opcoes'] == 13) ? 'selected' : '';
                                            $selected_14 = ($registro['opcoes'] == 14) ? 'selected' : '';
                                            $selected_15 = ($registro['opcoes'] == 15) ? 'selected' : '';
                                            $selected_16 = ($registro['opcoes'] == 16) ? 'selected' : '';
                                            $selected_17 = ($registro['opcoes'] == 17) ? 'selected' : '';
                                            $selected_18 = ($registro['opcoes'] == 18) ? 'selected' : '';
                                            $selected_19 = ($registro['opcoes'] == 19) ? 'selected' : '';
                                            $selected_20 = ($registro['opcoes'] == 20) ? 'selected' : '';
                                            $selected_21 = ($registro['opcoes'] == 21) ? 'selected' : '';
                                            $selected_22 = ($registro['opcoes'] == 22) ? 'selected' : '';
                                            $selected_23 = ($registro['opcoes'] == 23) ? 'selected' : '';
                                            $selected_24 = ($registro['opcoes'] == 24) ? 'selected' : '';
                                            $selected_25 = ($registro['opcoes'] == 25) ? 'selected' : '';
                                            $selected_26 = ($registro['opcoes'] == 26) ? 'selected' : '';
                                            $selected_27 = ($registro['opcoes'] == 27) ? 'selected' : '';
                                            $selected_28 = ($registro['opcoes'] == 28) ? 'selected' : '';
                                            $selected_29 = ($registro['opcoes'] == 29) ? 'selected' : '';
                                            $selected_30 = ($registro['opcoes'] == 30) ? 'selected' : '';
                                            $selected_31 = ($registro['opcoes'] == 31) ? 'selected' : '';
                                        @endphp

                                        <option value="0" {{ $selected_0 }}>Nenhuma...</option>
                                        <option value="1" {{ $selected_1 }}>Observação</option>
                                        <option value="2" {{ $selected_2 }}>Pdf</option>
                                        <option value="3" {{ $selected_3 }}>Imagens</option>
                                        <option value="4" {{ $selected_4 }}>Respostas</option>
                                        <option value="5" {{ $selected_5 }}>Quantidade</option>
                                        <option value="6" {{ $selected_6 }}>Observação, Pdf</option>
                                        <option value="7" {{ $selected_7 }}>Observação, Imagens</option>
                                        <option value="8" {{ $selected_8 }}>Observação, Respostas</option>
                                        <option value="9" {{ $selected_9 }}>Observação, Quantidade</option>
                                        <option value="10" {{ $selected_10 }}>Pdf, Imagens</option>
                                        <option value="11" {{ $selected_11 }}>Pdf, Respostas</option>
                                        <option value="12" {{ $selected_12 }}>Pdf, Quantidade</option>
                                        <option value="13" {{ $selected_13 }}>Imagens, Respostas</option>
                                        <option value="14" {{ $selected_14 }}>Imagens, Quantidade</option>
                                        <option value="15" {{ $selected_15 }}>Respostas, Quantidade</option>
                                        <option value="16" {{ $selected_16 }}>Observação, Pdf, Imagens</option>
                                        <option value="17" {{ $selected_17 }}>Observação, Pdf, Respostas</option>
                                        <option value="18" {{ $selected_18 }}>Observação, Pdf, Quantidade</option>
                                        <option value="19" {{ $selected_19 }}>Observação, Imagens, Respostas</option>
                                        <option value="20" {{ $selected_20 }}>Observação, Imagens, Quantidade</option>
                                        <option value="21" {{ $selected_21 }}>Observação, Respostas, Quantidade</option>
                                        <option value="22" {{ $selected_22 }}>Pdf, Imagens, Respostas</option>
                                        <option value="23" {{ $selected_23 }}>Pdf, Imagens, Quantidade</option>
                                        <option value="24" {{ $selected_24 }}>Pdf, Respostas, Quantidade</option>
                                        <option value="25" {{ $selected_25 }}>Imagens, Respostas, Quantidade</option>
                                        <option value="26" {{ $selected_26 }}>Observação, Pdf, Imagens, Respostas</option>
                                        <option value="27" {{ $selected_27 }}>Observação, Pdf, Imagens, Quantidade</option>
                                        <option value="28" {{ $selected_28 }}>Observação, Pdf, Respostas, Quantidade</option>
                                        <option value="29" {{ $selected_29 }}>Observação, Imagens, Respostas, Quantidade</option>
                                        <option value="30" {{ $selected_30 }}>Pdf, Imagens, Respostas, Quantidade</option>
                                        <option value="31" {{ $selected_31 }}>Observação, Pdf, Imagens, Respostas, Quantidade</option>
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-1 pb-3">
                                    <label class="form-label">&nbsp;</label>
                                    <div class="col-12">
                                        <button type="button" class="btn btn-sm btn-success" onclick="atualizar_pergunta({{ $registro['id'] }});" id="btn_atualizar_{{ $registro['id'] }}">Atualizar</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    @endforeach


                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal preview_perguntas -->
<div class="modal fade" id="vtt1_modalPreviewPerguntas" tabindex="-1" role="dialog" aria-labelledby="vtt1_modalPreviewPerguntasTitle" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Preview</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row" id="vtt1_divPreviewPerguntas"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>
