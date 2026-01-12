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
                                    <a class="dropdown-item" href="#" onclick="vtt1_formControle(1)" id="vtt1_formVisualizar1">Formulário Completo</a>
                                    <a class="dropdown-item" href="#" onclick="vtt1_formControle(2)" id="vtt1_formVisualizar2">Informações principais</a>
                                    <a class="dropdown-item" href="#" onclick="vtt1_formControle(3)" id="vtt1_formVisualizar3">Perguntas</a>
                                    <a class="dropdown-item" href="#" onclick="vtt1_formControle(4)" id="vtt1_formVisualizar4">Finalização</a>

                                    <a class="dropdown-item" href="#" onclick="vtt2_formControle(1)" id="vtt2_formVisualizar1">Formulário Completo</a>
                                    <a class="dropdown-item" href="#" onclick="vtt2_formControle(2)" id="vtt2_formVisualizar2">Informações principais</a>
                                    <a class="dropdown-item" href="#" onclick="vtt2_formControle(3)" id="vtt2_formVisualizar3">Perguntas</a>
                                    <a class="dropdown-item" href="#" onclick="vtt2_formControle(4)" id="vtt2_formVisualizar4">Finalização</a>
                                </div>
                            </div>
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
                                        <option value="">{{ __('Selecione...') }}</option>
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
                                    <h5 class="pb-4 text-primary"><i class="fas fa-list"></i>{{ __(' Informações Gerais') }}</h5>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Status</label>
                                        <select class="form-select" name="vtt1_visita_tecnica_status_id" id="vtt1_visita_tecnica_status_id">
                                            @foreach ($visita_tecnica_status as $registro)
                                            <option value="{{ $registro['id'] }}">{{ $registro['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-1 pb-3">
                                        <label class="form-label">{{ __('Número') }}</label>
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
                                    <div class="form-group col-12 col-md-4 pb-3" id="vtt1_divClienteId">
                                        <label class="form-label">Cliente</label>
                                        <select class="form-select" name="vtt1_cliente_id" id="vtt1_cliente_id" required="required">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($clientes as $key => $cliente)
                                            <option value="{{ $cliente['id'] }}">{{ $cliente['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Nome') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt1_cliente_nome" name="vtt1_cliente_nome" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">CNPJ</label>
                                        <input type="text" class="form-control mask_cnpj" id="vtt1_cliente_cnpj" name="vtt1_cliente_cnpj" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Telefone') }}</label>
                                        <input type="text" class="form-control mask_phone_with_ddd" id="vtt1_cliente_telefone" name="vtt1_cliente_telefone" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Celular') }}</label>
                                        <input type="text" class="form-control mask_cell_with_ddd" id="vtt1_cliente_celular" name="vtt1_cliente_celular" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('E-mail') }}</label>
                                        <input type="email" class="form-control text-lowercase" id="vtt1_cliente_email" name="vtt1_cliente_email" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Logradouro') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt1_cliente_logradouro" name="vtt1_cliente_logradouro" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Bairro') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt1_cliente_bairro" name="vtt1_cliente_bairro" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Número') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt1_cliente_logradouro_numero" name="vtt1_cliente_logradouro_numero" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Complemento') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt1_cliente_logradouro_complemento" name="vtt1_cliente_logradouro_complemento" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Cidade</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt1_cliente_cidade" name="vtt1_cliente_cidade" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('UF') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt1_cliente_uf" name="vtt1_cliente_uf" readonly>
                                    </div>
                                </div>

                                <div class="row pt-4" id="vtt1_divResponsavel">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-user-check"></i> Responsável</h5>
                                    <div class="form-group col-12 col-md-4 pb-3" id="vtt1_divResponsavelFuncionarioId">
                                        <label class="form-label">Responsável</label>
                                        <select class="form-select" name="vtt1_responsavel_funcionario_id" id="vtt1_responsavel_funcionario_id" required="required">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($funcionarios as $key => $funcionario)
                                            <option value="{{ $funcionario['id'] }}">{{ $funcionario['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Nome') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt1_responsavel_funcionario_nome" name="vtt1_responsavel_funcionario_nome" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('E-mail') }}</label>
                                        <input type="email" class="form-control text-lowercase" id="vtt1_responsavel_funcionario_email" name="vtt1_responsavel_funcionario_email" readonly>
                                    </div>
                                </div>

                                <div class="row pt-4" id="vtt1_divFinalizar">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-hourglass-end"></i> Finalizar</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Nível</label>
                                        <select class="form-select" name="vtt1_nivel" id="vtt1_nivel">
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
                                        <textarea class="form-control" rows="4" id="vtt1_classificacao" name="vtt1_classificacao"></textarea>
                                    </div>
                                    <div class="form-group col-12 col-md-12 pb-3">
                                        <label class="form-label">Comentários</label>
                                        <textarea class="form-control" rows="8" id="vtt1_comentarios" name="vtt1_comentarios"></textarea>
                                    </div>
                                </div>

                                <div class="row pt-4" id="vtt1_divPerguntas"></div>

                                <div id="vtt1_divBloqueio" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); color: white; font-size: 20px; text-align: center; padding-top: 20%; z-index: 9999;">Salvando dados...</div>
                            </div>
                            <!-- VISITA TECNICA TIPO 1 - FIM----------------------------------------------------------->
                            <!-- VISITA TECNICA TIPO 1 - FIM----------------------------------------------------------->

                            <!-- VISITA TECNICA TIPO 2 - INÍCIO-------------------------------------------------------->
                            <!-- VISITA TECNICA TIPO 2 - INÍCIO-------------------------------------------------------->
                            <div class="row mt-4" id="divVTT2">
                                <div class="row pt-4" id="vtt2_divInformacoesGerais">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-list"></i>{{ __(' Informações Gerais') }}</h5>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Status</label>
                                        <select class="form-select" name="vtt2_visita_tecnica_status_id" id="vtt2_visita_tecnica_status_id">
                                            @foreach ($visita_tecnica_status as $registro)
                                            <option value="{{ $registro['id'] }}">{{ $registro['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-1 pb-3">
                                        <label class="form-label">{{ __('Número') }}</label>
                                        <input type="text" class="form-control" id="vtt2_numero_visita_tecnica" name="vtt2_numero_visita_tecnica" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-1 pb-3">
                                        <label class="form-label">Ano</label>
                                        <input type="text" class="form-control" id="vtt2_ano_visita_tecnica" name="vtt2_ano_visita_tecnica" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data abertura</label>
                                        <input type="text" class="form-control mask_date" id="vtt2_data_abertura" name="vtt2_data_abertura" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora abertura</label>
                                        <input type="text" class="form-control mask_time" id="vtt2_hora_abertura" name="vtt2_hora_abertura" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data prevista</label>
                                        <input type="text" class="form-control mask_date" id="vtt2_data_prevista" name="vtt2_data_prevista">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora prevista</label>
                                        <input type="text" class="form-control mask_time" id="vtt2_hora_prevista" name="vtt2_hora_prevista">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data conclusão</label>
                                        <input type="text" class="form-control mask_date" id="vtt2_data_conclusao" name="vtt2_data_conclusao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora conclusão</label>
                                        <input type="text" class="form-control mask_time" id="vtt2_hora_conclusao" name="vtt2_hora_conclusao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data finalização</label>
                                        <input type="text" class="form-control mask_date" id="vtt2_data_finalizacao" name="vtt2_data_finalizacao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora finalização</label>
                                        <input type="text" class="form-control mask_time" id="vtt2_hora_finalizacao" name="vtt2_hora_finalizacao">
                                    </div>
                                </div>

                                <div class="row pt-4" id="vtt2_divClientes">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> Cliente</h5>
                                    <div class="form-group col-12 col-md-4 pb-3" id="vtt2_divClienteId">
                                        <label class="form-label">Cliente</label>
                                        <select class="form-select" name="vtt2_cliente_id" id="vtt2_cliente_id" required="required">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($clientes as $key => $cliente)
                                            <option value="{{ $cliente['id'] }}">{{ $cliente['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Nome') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt2_cliente_nome" name="vtt2_cliente_nome" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">CNPJ</label>
                                        <input type="text" class="form-control mask_cnpj" id="vtt2_cliente_cnpj" name="vtt2_cliente_cnpj" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Telefone') }}</label>
                                        <input type="text" class="form-control mask_phone_with_ddd" id="vtt2_cliente_telefone" name="vtt2_cliente_telefone" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">{{ __('Celular') }}</label>
                                        <input type="text" class="form-control mask_cell_with_ddd" id="vtt2_cliente_celular" name="vtt2_cliente_celular" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('E-mail') }}</label>
                                        <input type="email" class="form-control text-lowercase" id="vtt2_cliente_email" name="vtt2_cliente_email" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Logradouro') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt2_cliente_logradouro" name="vtt2_cliente_logradouro" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Bairro') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt2_cliente_bairro" name="vtt2_cliente_bairro" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Número') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt2_cliente_logradouro_numero" name="vtt2_cliente_logradouro_numero" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Complemento') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt2_cliente_logradouro_complemento" name="vtt2_cliente_logradouro_complemento" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Cidade</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt2_cliente_cidade" name="vtt2_cliente_cidade" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('UF') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt2_cliente_uf" name="vtt2_cliente_uf" readonly>
                                    </div>
                                </div>

                                <div class="row pt-4" id="vtt2_divResponsavel">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-user-check"></i> Responsável</h5>
                                    <div class="form-group col-12 col-md-4 pb-3" id="vtt2_divResponsavelFuncionarioId">
                                        <label class="form-label">Responsável</label>
                                        <select class="form-select" name="vtt2_responsavel_funcionario_id" id="vtt2_responsavel_funcionario_id" required="required">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($funcionarios as $key => $funcionario)
                                            <option value="{{ $funcionario['id'] }}">{{ $funcionario['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Nome') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="vtt2_responsavel_funcionario_nome" name="vtt2_responsavel_funcionario_nome" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('E-mail') }}</label>
                                        <input type="email" class="form-control text-lowercase" id="vtt2_responsavel_funcionario_email" name="vtt2_responsavel_funcionario_email" readonly>
                                    </div>
                                </div>

                                <div class="row pt-4" id="vtt2_divFinalizar">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-hourglass-end"></i> Finalizar</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Nível</label>
                                        <select class="form-select" name="vtt2_nivel" id="vtt2_nivel">
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
                                        <textarea class="form-control" rows="4" id="vtt2_classificacao" name="vtt2_classificacao"></textarea>
                                    </div>
                                    <div class="form-group col-12 col-md-12 pb-3">
                                        <label class="form-label">Comentários</label>
                                        <textarea class="form-control" rows="8" id="vtt2_comentarios" name="vtt2_comentarios"></textarea>
                                    </div>
                                </div>

                                <div class="row pt-4" id="vtt2_divPerguntas"></div>

                                <div id="vtt2_divBloqueio" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); color: white; font-size: 20px; text-align: center; padding-top: 20%; z-index: 9999;">Salvando dados...</div>
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
                        <textarea class="col-12" rows="5" id="vtt1_modal_observacao_texto" name="vtt1_modal_observacao_texto"></textarea>
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
                            <input type="file" id="vtt1_modalCameraFile" accept="image/*" capture="environment" style="display:none;" onchange="vtt1_fotografiaEnviar(this)">
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
    <div class="modal fade" id="vtt1_modalPdf" tabindex="-1" role="dialog" aria-labelledby="vtt1_modalPdfTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="vtt1_modalPdfTitle">PDF</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <!-- Opção buscar arquivo -->
                        <div class="col-12 d-flex justify-content-center">
                            <button type="button" class="btn btn-outline-success" onclick="document.getElementById('vtt1_modalPdfFile').click();">Buscar Arquivo <i class="fas fa-file-pdf ms-1"></i></button>
                            <input type="file" id="vtt1_modalPdfFile" accept=".pdf,application/pdf" style="display:none;" onchange="vtt1_pdfEnviar(this)">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal observação -->
    <div class="modal fade" id="vtt2_modalObservacao" tabindex="-1" role="dialog" aria-labelledby="vtt2_modalObservacaoTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="vtt2_modalObservacaoTitle">Observação</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <textarea class="col-12" rows="5" id="vtt2_modal_observacao_texto" name="vtt2_modal_observacao_texto"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" onclick="vtt2_observacaoEnviar();">Enviar <i class="fab fa-telegram-plane ms-1"></i></button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal fotografia -->
    <div class="modal fade" id="vtt2_modalFotografia" tabindex="-1" role="dialog" aria-labelledby="vtt2_modalFotografiaTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="vtt2_modalFotografiaTitle">Fotografia</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <!-- Opção buscar imagem -->
                        <div class="col-6 d-flex justify-content-start">
                            <button type="button" class="btn btn-outline-success" onclick="document.getElementById('vtt2_modalFotografiaFile').click();">Buscar Imagem <i class="fas fa-image ms-1"></i></button>
                            <input type="file" id="vtt2_modalFotografiaFile" accept="image/*" style="display:none;" onchange="vtt2_fotografiaEnviar(this)">
                        </div>

                        <!-- Opção tirar foto -->
                        <div class="col-6 d-flex justify-content-end">
                            <button type="button" class="btn btn-outline-primary" onclick="document.getElementById('vtt2_modalCameraFile').click();">Tirar Foto <i class="fas fa-camera ms-1"></i></button>
                            <input type="file" id="vtt2_modalCameraFile" accept="image/*" capture="environment" style="display:none;" onchange="vtt2_fotografiaEnviar(this)">
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
    <div class="modal fade" id="vtt2_modalPdf" tabindex="-1" role="dialog" aria-labelledby="vtt2_modalPdfTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="vtt2_modalPdfTitle">PDF</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <!-- Opção buscar arquivo -->
                        <div class="col-12 d-flex justify-content-center">
                            <button type="button" class="btn btn-outline-success" onclick="document.getElementById('vtt2_modalPdfFile').click();">Buscar Arquivo <i class="fas fa-file-pdf ms-1"></i></button>
                            <input type="file" id="vtt2_modalPdfFile" accept=".pdf,application/pdf" style="display:none;" onchange="vtt2_pdfEnviar(this)">
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
