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
                            <!-- Botão OrdemServicoPDF -->
                            <x-button-crud op="99" model="3" bgColor="danger" textColor="write" title="Ordem Serviço em PDF" image="fas fa-file-pdf" label="PDF" onclick="gerar_ordem_servico()" />
                            <x-button-crud op="99" model="3" bgColor="primary" textColor="write" title="Ordem Serviço em PDF (Inglês)" image="fas fa-file-pdf" label="PDF" onclick="gerar_ordem_servico(0, 0, 'en')" />
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

                            <div class="row pt-4">
                                <h5 class="pb-4 text-primary"><i class="fas fa-list"></i> Tipo da Ordem de Serviço</h5>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Tipo</label>
                                    <select class="form-select" name="ordem_servico_tipo_id" id="ordem_servico_tipo_id">
                                        <option value="">Selecione...</option>
                                        @foreach ($ordem_servico_tipos as $registro)
                                            <option value="{{ $registro['id'] }}">{{ $registro['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <!-- ORDEM DE SERVIÇO TIPO 1 - INÍCIO------------------------------------------------------>
                            <!-- ORDEM DE SERVIÇO TIPO 1 - INÍCIO------------------------------------------------------>
                            <div class="row mt-4" id="divOST1"></div>
                            <!-- ORDEM DE SERVIÇO TIPO 1 - FIM--------------------------------------------------------->
                            <!-- ORDEM DE SERVIÇO TIPO 1 - FIM--------------------------------------------------------->

                            <!-- ORDEM DE SERVIÇO TIPO 2 - INÍCIO------------------------------------------------------>
                            <!-- ORDEM DE SERVIÇO TIPO 2 - INÍCIO------------------------------------------------------>
                            <div class="row mt-4" id="divOST2">
                                <div class="row pt-4" id="ost2_divOrdemServicoInformacoesGerais">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-list"></i> Informações Gerais</h5>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Status</label>
                                        <select class="form-select" name="ost2_ordem_servico_status_id" id="ost2_ordem_servico_status_id">
                                            @foreach ($ordem_servico_status as $registro)
                                                <option value="{{ $registro['id'] }}">{{ $registro['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-1 pb-3">
                                        <label class="form-label">Número</label>
                                        <input type="text" class="form-control" id="ost2_numero_ordem_servico" name="ost2_numero_ordem_servico" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-1 pb-3">
                                        <label class="form-label">Ano</label>
                                        <input type="text" class="form-control" id="ost2_ano_ordem_servico" name="ost2_ano_ordem_servico" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data abertura</label>
                                        <input type="text" class="form-control mask_date" id="ost2_data_abertura" name="ost2_data_abertura" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora abertura</label>
                                        <input type="text" class="form-control mask_time" id="ost2_hora_abertura" name="ost2_hora_abertura" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data prevista</label>
                                        <input type="text" class="form-control mask_date" id="ost2_data_prevista" name="ost2_data_prevista">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora prevista</label>
                                        <input type="text" class="form-control mask_time" id="ost2_hora_prevista" name="ost2_hora_prevista">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data conclusão</label>
                                        <input type="text" class="form-control mask_date" id="ost2_data_conclusao" name="ost2_data_conclusao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora conclusão</label>
                                        <input type="text" class="form-control mask_time" id="ost2_hora_conclusao" name="ost2_hora_conclusao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data finalização</label>
                                        <input type="text" class="form-control mask_date" id="ost2_data_finalizacao" name="ost2_data_finalizacao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora finalização</label>
                                        <input type="text" class="form-control mask_time" id="ost2_hora_finalizacao" name="ost2_hora_finalizacao">
                                    </div>
                                </div>
                                <div class="row pt-4" id="ost2_divClientes">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> Cliente</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Cliente</label>
                                        <select class="form-select" name="ost2_cliente_id" id="ost2_cliente_id" required="required">
                                            <option value="">Selecione...</option>

                                            @foreach ($clientes as $key => $cliente)
                                                <option value="{{ $cliente['id'] }}">{{ $cliente['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Nome</label>
                                        <input type="text" class="form-control text-uppercase" id="ost2_cliente_nome" name="ost2_cliente_nome" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Telefone</label>
                                        <input type="text" class="form-control mask_phone_with_ddd" id="ost2_cliente_telefone" name="ost2_cliente_telefone" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Celular</label>
                                        <input type="text" class="form-control mask_cell_with_ddd" id="ost2_cliente_celular" name="ost2_cliente_celular" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">E-mail</label>
                                        <input type="email" class="form-control text-lowercase" id="ost2_cliente_email" name="ost2_cliente_email" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Logradouro</label>
                                        <input type="text" class="form-control text-uppercase" id="ost2_cliente_logradouro" name="ost2_cliente_logradouro" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Bairro</label>
                                        <input type="text" class="form-control text-uppercase" id="ost2_cliente_bairro" name="ost2_cliente_bairro" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Cidade</label>
                                        <input type="text" class="form-control text-uppercase" id="ost2_cliente_cidade" name="ost2_cliente_cidade" readonly>
                                    </div>
                                </div>
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> Serviços</h5>
                                    <div class="row col-12" id="ost2_ts_divServicoEscolher">
                                        <div class="form-group col-12 col-md-4 pb-3">
                                            <label class="form-label">Serviço</label>
                                            <select class="form-select" name="ost2_ts_servico_id" id="ost2_ts_servico_id">
                                                <option value="">Selecione...</option>

                                                @foreach ($servicos as $key => $servico)
                                                    <option value="{{ $servico['id'] }}">{{ $servico['name'] }}</option>
                                                @endforeach
                                            </select>
                                            <input type="hidden" id="ost2_ts_servico_nome" name="ost2_ts_servico_nome">
                                        </div>
                                        <div class="form-group col-12 col-md-4 pb-3">
                                            <label class="form-label">Responsável</label>
                                            <select class="form-select" name="ost2_ts_responsavel_funcionario_id" id="ost2_ts_responsavel_funcionario_id">
                                                <option value="">Selecione...</option>

                                                @foreach ($funcionarios as $funcionario)
                                                    <option value="{{ $funcionario['id'] }}">{{ $funcionario['name'] }}</option>
                                                @endforeach
                                            </select>
                                            <input type="hidden" id="ost2_ts_responsavel_funcionario_nome" name="ost2_ts_responsavel_funcionario_nome">
                                        </div>
                                        <div class="form-group col-12 col-md-2 pb-3">
                                            <label class="form-label text-end">Valor</label>
                                            <input type="text" class="form-control text-end mask_money" id="ost2_ts_servico_valor" name="ost2_ts_servico_valor">
                                        </div>
                                        <div class="form-group col-12 col-md-1 pb-3">
                                            <label class="form-label">Qtd</label>
                                            <input type="number" class="form-control" id="ost2_ts_servico_quantidade" name="ost2_ts_servico_quantidade" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');">
                                        </div>
                                        <div class="form-group col-12 col-md-1 pb-3">
                                            <label class="form-label">Opções</label>
                                            <div class="row">
                                                <div class="col-6" id="ost2_ts_divServicoAdicionar" style="display: none;">
                                                    <x-button-crud op="99" model="1" bgColor="success" textColor="write" id="ost2_ts_servico_adicionar" name="ost2_ts_servico_adicionar" title="Adicionar Serviço na Grade" image="fas fa-check" />
                                                </div>
                                                <div class="col-6" id="ost2_ts_divServicoRetirar" style="display: none;">
                                                    <x-button-crud op="99" model="1" bgColor="danger" textColor="write" id="ost2_ts_servico_retirar" name="ost2_ts_servico_retirar" title="Retirar Serviço da Grade" image="fas fa-trash-alt" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table mb-0">
                                            <thead class="table-light">
                                            <tr>
                                                <th class="text-center">ITEM</th>
                                                <th>SERVIÇO</th>
                                                <th>RESPONSÁVEL</th>
                                                <th class="text-end">VALOR</th>
                                                <th class="text-center">QTD</th>
                                                <th class="text-end">TOTAL</th>
                                            </tr>
                                            </thead>
                                            <tbody id="ost2_ts_servico_grade"></tbody>
                                            <tfoot class="table-light">
                                            <tr>
                                                <th>&nbsp;</th>
                                                <th>&nbsp;</th>
                                                <th>&nbsp;</th>
                                                <th class="text-end">VALOR GLOBAL</th>
                                                <th class="text-center">R$</th>
                                                <th class="text-end" id="ost2_ts_servico_valor_global">R$ 0,00</th>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>

                                    <!-- Campos hiddens para salvar na tabela ordens_servicos_servicos -->
                                    <div id="ost2_ts_servico_hiddens"></div>

                                    <div class="form-group col-12 col-md-12 pt-3 pb-3">
                                        <label class="form-label">Descrição serviço</label>
                                        <textarea class="form-control" id="ost2_descricao_servico" name="ost2_descricao_servico" rows="3"></textarea>
                                    </div>
                                    <div class="form-group col-12 col-md-12 pb-3">
                                        <label class="form-label">Observação</label>
                                        <textarea class="form-control" id="ost2_observacao" name="ost2_observacao" rows="3"></textarea>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Prioridade</label>
                                        <select class="form-select" name="ost2_ordem_servico_prioridade_id" id="ost2_ordem_servico_prioridade_id" required="required">
                                            @foreach ($ordem_servico_prioridades as $ordem_servico_prioridade)
                                                <option value="{{ $ordem_servico_prioridade['id'] }}">{{ $ordem_servico_prioridade['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-dollar-sign"></i> Desconto</h5>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Porcentagem (%)</label>
                                        <input type="number" step=".01" class="form-control mask_numero_ponto" id="ost2_porcentagem_desconto" name="ost2_porcentagem_desconto" onchange="ost2_atualizarServicoGrade(0)" onblur="ost2_atualizarServicoGrade(0)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Valor</label>
                                        <input type="text" class="form-control mask_money text-end" id="ost2_valor_desconto" name="ost2_valor_desconto" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-8 pb-3">
                                        <label class="form-label">Extenso</label>
                                        <input type="text" class="form-control" id="ost2_valor_desconto_extenso" name="ost2_valor_desconto_extenso" readonly>
                                    </div>
                                </div>
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-dollar-sign"></i> Valor Total</h5>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Valor</label>
                                        <input type="text" class="form-control mask_money text-end" id="ost2_valor_total" name="ost2_valor_total" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-10 pb-3">
                                        <label class="form-label">Extenso</label>
                                        <input type="text" class="form-control" id="ost2_valor_total_extenso" name="ost2_valor_total_extenso" readonly>
                                    </div>
                                </div>
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-money-check-alt"></i> Forma de Pagamento</h5>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">Forma pagamento</label>
                                        <select class="form-select" name="ost2_forma_pagamento_id" id="ost2_forma_pagamento_id" required="required">
                                            @foreach ($formas_pagamentos as $forma_pagamento)
                                                <option value="{{ $forma_pagamento['id'] }}">{{ $forma_pagamento['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">Status</label>
                                        <select class="form-select" name="ost2_forma_pagamento_status_id" id="ost2_forma_pagamento_status_id" required="required">
                                            @foreach ($formas_pagamentos_status as $forma_pagamento_status)
                                                <option value="{{ $forma_pagamento_status['id'] }}">{{ $forma_pagamento_status['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-12 pb-3">
                                        <label class="form-label">Observação</label>
                                        <textarea class="form-control" id="ost2_forma_pagamento_observacao" name="ost2_forma_pagamento_observacao" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                            <!-- ORDEM DE SERVIÇO TIPO 2 - FIM--------------------------------------------------------->
                            <!-- ORDEM DE SERVIÇO TIPO 2 - FIM--------------------------------------------------------->

                            <!-- ORDEM DE SERVIÇO TIPO 3 - INÍCIO------------------------------------------------------>
                            <!-- ORDEM DE SERVIÇO TIPO 3 - INÍCIO------------------------------------------------------>
                            <div class="row mt-4" id="divOST3">
                                <div class="row pt-4" id="ost3_divOrdemServicoInformacoesGerais">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-list"></i> Informações Gerais</h5>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Status</label>
                                        <select class="form-select" name="ost3_ordem_servico_status_id" id="ost3_ordem_servico_status_id">
                                            @foreach ($ordem_servico_status as $registro)
                                                <option value="{{ $registro['id'] }}">{{ $registro['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-1 pb-3">
                                        <label class="form-label">Número</label>
                                        <input type="text" class="form-control" id="ost3_numero_ordem_servico" name="ost3_numero_ordem_servico" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-1 pb-3">
                                        <label class="form-label">Ano</label>
                                        <input type="text" class="form-control" id="ost3_ano_ordem_servico" name="ost3_ano_ordem_servico" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data abertura</label>
                                        <input type="text" class="form-control mask_date" id="ost3_data_abertura" name="ost3_data_abertura" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora abertura</label>
                                        <input type="text" class="form-control mask_time" id="ost3_hora_abertura" name="ost3_hora_abertura" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data prevista</label>
                                        <input type="text" class="form-control mask_date" id="ost3_data_prevista" name="ost3_data_prevista">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora prevista</label>
                                        <input type="text" class="form-control mask_time" id="ost3_hora_prevista" name="ost3_hora_prevista">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data conclusão</label>
                                        <input type="text" class="form-control mask_date" id="ost3_data_conclusao" name="ost3_data_conclusao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora conclusão</label>
                                        <input type="text" class="form-control mask_time" id="ost3_hora_conclusao" name="ost3_hora_conclusao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Data finalização</label>
                                        <input type="text" class="form-control mask_date" id="ost3_data_finalizacao" name="ost3_data_finalizacao">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Hora finalização</label>
                                        <input type="text" class="form-control mask_time" id="ost3_hora_finalizacao" name="ost3_hora_finalizacao">
                                    </div>
                                </div>

                                <!-- Cliente -->
                                <!-- Cliente -->
                                <div class="row pt-4" id="ost3_divClientes">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> Cliente</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Cliente</label>
                                        <select class="form-select" name="ost3_cliente_id" id="ost3_cliente_id" required="required">
                                            <option value="">Selecione...</option>

                                            @foreach ($clientes as $key => $cliente)
                                                <option value="{{ $cliente['id'] }}">{{ $cliente['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Nome</label>
                                        <input type="text" class="form-control text-uppercase" id="ost3_cliente_nome" name="ost3_cliente_nome" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Telefone</label>
                                        <input type="text" class="form-control mask_phone_with_ddd" id="ost3_cliente_telefone" name="ost3_cliente_telefone" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Celular</label>
                                        <input type="text" class="form-control mask_cell_with_ddd" id="ost3_cliente_celular" name="ost3_cliente_celular" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">E-mail</label>
                                        <input type="email" class="form-control text-lowercase" id="ost3_cliente_email" name="ost3_cliente_email" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Logradouro</label>
                                        <input type="text" class="form-control text-uppercase" id="ost3_cliente_logradouro" name="ost3_cliente_logradouro" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Bairro</label>
                                        <input type="text" class="form-control text-uppercase" id="ost3_cliente_bairro" name="ost3_cliente_bairro" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Cidade</label>
                                        <input type="text" class="form-control text-uppercase" id="ost3_cliente_cidade" name="ost3_cliente_cidade" readonly>
                                    </div>
                                </div>

                                <!-- Serviço -->
                                <!-- Serviço -->
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> Serviço</h5>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">Serviço</label>
                                        <input type="text" class="form-control text-uppercase" id="ost3_ts_servico_nome" name="ost3_ts_servico_nome" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">Responsável</label>
                                        <select class="form-select" name="ost3_ts_responsavel_funcionario_id" id="ost3_ts_responsavel_funcionario_id">
                                            <option value="">Selecione...</option>

                                            @foreach ($funcionarios as $funcionario)
                                                <option value="{{ $funcionario['id'] }}">{{ $funcionario['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>

                                    <!-- Campos hiddens para salvar na tabela ordens_servicos_servicos -->
                                    <div id="ost3_ts_servico_hiddens"></div>

                                    <div class="form-group col-12 col-md-12 pt-3 pb-3">
                                        <label class="form-label">Descrição serviço</label>
                                        <textarea class="form-control" id="ost3_descricao_servico" name="ost3_descricao_servico" rows="3"></textarea>
                                    </div>
                                    <div class="form-group col-12 col-md-12 pb-3">
                                        <label class="form-label">Observação</label>
                                        <textarea class="form-control" id="ost3_observacao" name="ost3_observacao" rows="3"></textarea>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Prioridade</label>
                                        <select class="form-select" name="ost3_ordem_servico_prioridade_id" id="ost3_ordem_servico_prioridade_id" required="required">
                                            @foreach ($ordem_servico_prioridades as $ordem_servico_prioridade)
                                                <option value="{{ $ordem_servico_prioridade['id'] }}">{{ $ordem_servico_prioridade['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <!-- Destinos -->
                                <!-- Destinos -->
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> Destinos</h5>
                                    <div class="row col-12" id="ost3_te_divDestinoEscolher">
                                        <div class="form-group col-12 col-md-2 pb-3">
                                            <label class="form-label">Destino (Ordem)</label>
                                            <select class="form-select" name="ost3_te_destino_ordem" id="ost3_te_destino_ordem">
                                                <option value="">Selecione...</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>

                                            <input type="hidden" id="ost3_te_destino_logradouro" name="ost3_te_destino_logradouro">
                                            <input type="hidden" id="ost3_te_destino_bairro" name="ost3_te_destino_bairro">
                                            <input type="hidden" id="ost3_te_destino_localidade" name="ost3_te_destino_localidade">
                                            <input type="hidden" id="ost3_te_destino_uf" name="ost3_te_destino_uf">
                                        </div>
                                        <div class="form-group col-12 col-md-3 pb-3">
                                            <label class="form-label">Destino (CEP)</label>
                                            <input type="text" class="form-control mask_cep" id="ost3_te_destino_cep" name="ost3_te_destino_cep">
                                        </div>
                                        <div class="form-group col-12 col-md-2 pb-3">
                                            <label class="form-label">Destino (Número)</label>
                                            <input type="text" class="form-control" id="ost3_te_destino_numero" name="ost3_te_destino_numero">
                                        </div>
                                        <div class="form-group col-12 col-md-3 pb-3">
                                            <label class="form-label">Destino (Complemento)</label>
                                            <input type="text" class="form-control" id="ost3_te_destino_complemento" name="ost3_te_destino_complemento">
                                        </div>
                                        <div class="form-group col-12 col-md-2 pb-3">
                                            <label class="form-label">Opções</label>
                                            <div class="row">
                                                <div class="col-6" id="ost3_te_divDestinoAdicionar" style="display: none;">
                                                    <x-button-crud op="99" model="1" bgColor="success" textColor="write" id="ost3_te_destino_adicionar" name="ost3_te_destino_adicionar" title="Adicionar Destino na Grade" image="fas fa-check" />
                                                </div>
                                                <div class="col-6" id="ost3_te_divDestinoRetirar" style="display: none;">
                                                    <x-button-crud op="99" model="1" bgColor="danger" textColor="write" id="ost3_te_destino_retirar" name="ost3_te_destino_retirar" title="Retirar Destino da Grade" image="fas fa-trash-alt" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table mb-0">
                                            <thead class="table-light">
                                            <tr>
                                                <th class="text-center">ORDEM</th>
                                                <th>CEP</th>
                                                <th>LOGRADOURO</th>
                                                <th>BAIRRO</th>
                                                <th>LOCALIDADE</th>
                                                <th>UF</th>
                                                <th>NÚMERO</th>
                                                <th>COMPLEMENTO</th>
                                            </tr>
                                            </thead>
                                            <tbody id="ost3_te_destino_grade"></tbody>
                                        </table>
                                    </div>

                                    <!-- Campos hiddens para salvar na tabela ordens_servicos_destinos -->
                                    <div id="ost3_te_destino_hiddens"></div>
                                </div>

                                <!-- Veículos -->
                                <!-- Veículos -->
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> Veículos</h5>
                                    <div class="row col-12" id="ost3_te_divVeiculoEscolher">
                                        <div class="form-group col-12 col-md-10 pb-3">
                                            <label class="form-label">Veículo</label>
                                            <select class="form-select" name="ost3_te_veiculo_id" id="ost3_te_veiculo_id">
                                                <option value="">Selecione...</option>

                                                @foreach ($veiculos as $veiculo)
                                                    <option value="{{ $veiculo['id'] }}">{{ $veiculo['veiculoMarcaName'].' || '.$veiculo['veiculoModeloName'].' || '.$veiculo['veiculoCombustivelName'].' || '.$veiculo['veiculoCategoriaName'].' || '.$veiculo['placa'] }}</option>
                                                @endforeach
                                            </select>

                                            <input type="hidden" id="ost3_te_veiculo_marca" name="ost3_te_veiculo_marca">
                                            <input type="hidden" id="ost3_te_veiculo_modelo" name="ost3_te_veiculo_modelo">
                                            <input type="hidden" id="ost3_te_veiculo_placa" name="ost3_te_veiculo_placa">
                                            <input type="hidden" id="ost3_te_veiculo_combustivel" name="ost3_te_veiculo_combustivel">
                                        </div>
                                        <div class="form-group col-12 col-md-2 pb-3">
                                            <label class="form-label">Opções</label>
                                            <div class="row">
                                                <div class="col-6" id="ost3_te_divVeiculoAdicionar" style="display: none;">
                                                    <x-button-crud op="99" model="1" bgColor="success" textColor="write" id="ost3_te_veiculo_adicionar" name="ost3_te_veiculo_adicionar" title="Adicionar Veículo na Grade" image="fas fa-check" />
                                                </div>
                                                <div class="col-6" id="ost3_te_divVeiculoRetirar" style="display: none;">
                                                    <x-button-crud op="99" model="1" bgColor="danger" textColor="write" id="ost3_te_veiculo_retirar" name="ost3_te_veiculo_retirar" title="Retirar Veículo da Grade" image="fas fa-trash-alt" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table mb-0">
                                            <thead class="table-light">
                                            <tr>
                                                <th class="text-center">ITEM</th>
                                                <th>MARCA</th>
                                                <th>MODELO</th>
                                                <th>PLACA</th>
                                                <th>COMBUSTÍVEL</th>
                                            </tr>
                                            </thead>
                                            <tbody id="ost3_te_veiculo_grade"></tbody>
                                        </table>
                                    </div>

                                    <!-- Campos hiddens para salvar na tabela ordens_servicos_veiculos -->
                                    <div id="ost3_te_veiculo_hiddens"></div>
                                </div>

                                <!-- Executivos -->
                                <!-- Executivos -->
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> Executivos</h5>
                                    <div class="row col-12" id="ost3_te_divClienteExecutivoEscolher">
                                        <div class="form-group col-12 col-md-6 pb-3">
                                            <label class="form-label">Executivo</label>
                                            <select class="form-select" name="ost3_te_cliente_executivo_id" id="ost3_te_cliente_executivo_id">
                                                <option value="">Selecione...</option>

                                                @foreach ($clientes_executivos as $cliente_executivo)
                                                    <option value="{{ $cliente_executivo['id'] }}">{{ $cliente_executivo['executivo_nome'].' || '.$cliente_executivo['executivo_funcao'] }}</option>
                                                @endforeach
                                            </select>

                                            <input type="hidden" id="ost3_te_cliente_executivo_nome" name="ost3_te_cliente_executivo_nome">
                                            <input type="hidden" id="ost3_te_cliente_executivo_funcao" name="ost3_te_cliente_executivo_funcao">
                                        </div>
                                        <div class="form-group col-12 col-md-4 pb-3">
                                            <label class="form-label">Veículo</label>
                                            <select class="form-select" name="ost3_te_cliente_executivo_veiculo_id" id="ost3_te_cliente_executivo_veiculo_id">
                                                <option value="">Selecione...</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-12 col-md-2 pb-3">
                                            <label class="form-label">Opções</label>
                                            <div class="row">
                                                <div class="col-6" id="ost3_te_divClienteExecutivoAdicionar" style="display: none;">
                                                    <x-button-crud op="99" model="1" bgColor="success" textColor="write" id="ost3_te_cliente_executivo_adicionar" name="ost3_te_cliente_executivo_adicionar" title="Adicionar Executivo na Grade" image="fas fa-check" />
                                                </div>
                                                <div class="col-6" id="ost3_te_divClienteExecutivoRetirar" style="display: none;">
                                                    <x-button-crud op="99" model="1" bgColor="danger" textColor="write" id="ost3_te_cliente_executivo_retirar" name="ost3_te_cliente_executivo_retirar" title="Retirar Executivo da Grade" image="fas fa-trash-alt" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table mb-0">
                                            <thead class="table-light">
                                            <tr>
                                                <th class="text-center">ITEM</th>
                                                <th>NOME</th>
                                                <th>FUNÇÃO</th>
                                                <th>VEÍCULO</th>
                                            </tr>
                                            </thead>
                                            <tbody id="ost3_te_cliente_executivo_grade"></tbody>
                                        </table>
                                    </div>

                                    <!-- Campos hiddens para salvar na tabela ordens_servicos_executivos -->
                                    <div id="ost3_te_cliente_executivo_hiddens"></div>
                                </div>

                                <!-- Equipes -->
                                <!-- Equipes -->
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> Equipes</h5>
                                    <div class="row col-12" id="ost3_te_divEquipeEscolher">
                                        <div class="form-group col-12 col-md-6 pb-3">
                                            <label class="form-label">Funcionário</label>
                                            <select class="form-select" name="ost3_te_equipe_funcionario_id" id="ost3_te_equipe_funcionario_id">
                                                <option value="">Selecione...</option>

                                                @foreach ($funcionarios as $funcionario)
                                                    <option value="{{ $funcionario['id'] }}">{{ $funcionario['name'].' || '.$funcionario['funcaoName'] }}</option>
                                                @endforeach
                                            </select>

                                            <input type="hidden" id="ost3_te_equipe_funcionario_nome" name="ost3_te_equipe_funcionario_nome">
                                            <input type="hidden" id="ost3_te_equipe_funcionario_funcao" name="ost3_te_equipe_funcionario_funcao">
                                        </div>
                                        <div class="form-group col-12 col-md-4 pb-3">
                                            <label class="form-label">Veículo</label>
                                            <select class="form-select" name="ost3_te_equipe_funcionario_veiculo_id" id="ost3_te_equipe_funcionario_veiculo_id">
                                                <option value="">Selecione...</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-12 col-md-2 pb-3">
                                            <label class="form-label">Opções</label>
                                            <div class="row">
                                                <div class="col-6" id="ost3_te_divEquipeAdicionar" style="display: none;">
                                                    <x-button-crud op="99" model="1" bgColor="success" textColor="write" id="ost3_te_equipe_funcionario_adicionar" name="ost3_te_equipe_funcionario_adicionar" title="Adicionar Funcionário na Grade" image="fas fa-check" />
                                                </div>
                                                <div class="col-6" id="ost3_te_divEquipeRetirar" style="display: none;">
                                                    <x-button-crud op="99" model="1" bgColor="danger" textColor="write" id="ost3_te_equipe_funcionario_retirar" name="ost3_te_equipe_funcionario_retirar" title="Retirar Funcionário da Grade" image="fas fa-trash-alt" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table mb-0">
                                            <thead class="table-light">
                                            <tr>
                                                <th class="text-center">ITEM</th>
                                                <th>NOME</th>
                                                <th>FUNÇÃO</th>
                                                <th>VEÍCULO</th>
                                            </tr>
                                            </thead>
                                            <tbody id="ost3_te_equipe_funcionario_grade"></tbody>
                                        </table>
                                    </div>

                                    <!-- Campos hiddens para salvar na tabela ordens_servicos_equipes -->
                                    <div id="ost3_te_equipe_funcionario_hiddens"></div>
                                </div>
                            </div>
                            <!-- ORDEM DE SERVIÇO TIPO 3 - FIM--------------------------------------------------------->
                            <!-- ORDEM DE SERVIÇO TIPO 3 - FIM--------------------------------------------------------->
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
                        <!-- Botão OrdemServicoPDF -->
                        <x-button-crud op="99" model="3" bgColor="danger" textColor="write" title="Ordem Serviço em PDF" image="fas fa-file-pdf" label="PDF" onclick="gerar_ordem_servico()" />
                        <x-button-crud op="99" model="3" bgColor="primary" textColor="write" title="Ordem Serviço em PDF (Inglês)" image="fas fa-file-pdf" label="PDF" onclick="gerar_ordem_servico(0, 0, 'en')" />
                    @endif

                    <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
