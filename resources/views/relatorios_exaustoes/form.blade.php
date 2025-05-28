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
                            <!-- Botão RelatorioExaustaoPDF -->
                            <x-button-crud op="99" model="3" bgColor="danger" textColor="write" title="Relatório em PDF" image="fas fa-file-pdf" label="PDF" onclick="gerar_relatorio_exaustao()" />
                            <x-button-crud op="99" model="3" bgColor="primary" textColor="write" title="Relatório em PDF (Inglês)" image="fas fa-file-pdf" label="PDF" onclick="gerar_relatorio_exaustao(0, 0, 'en')" />
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

                            <div class="row pt-4" id="divRelatorioExaustaoInformacoesGerais">
                                <h5 class="pb-4 text-primary"><i class="fas fa-list"></i> Informações Gerais</h5>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Status</label>
                                    <select class="form-select" name="relatorio_exaustao_status_id" id="relatorio_exaustao_status_id">
                                        @foreach ($relatorio_exaustao_status as $registro)
                                            <option value="{{ $registro['id'] }}">{{ $registro['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-1 pb-3">
                                    <label class="form-label">Número</label>
                                    <input type="text" class="form-control" id="numero_relatorio_exaustao" name="numero_relatorio_exaustao" readonly>
                                </div>
                                <div class="form-group col-12 col-md-1 pb-3">
                                    <label class="form-label">Ano</label>
                                    <input type="text" class="form-control" id="ano_relatorio_exaustao" name="ano_relatorio_exaustao" readonly>
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

                            <!-- Cliente -->
                            <!-- Cliente -->
                            <div class="row pt-4" id="divClientes">
                                <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> Cliente</h5>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Cliente</label>
                                    <select class="form-select" name="cliente_id" id="cliente_id" required="required">
                                        <option value="">Selecione...</option>

                                        @foreach ($clientes as $key => $cliente)
                                            <option value="{{ $cliente['id'] }}">{{ $cliente['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Nome</label>
                                    <input type="text" class="form-control text-uppercase" id="cliente_nome" name="cliente_nome" readonly>
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Telefone</label>
                                    <input type="text" class="form-control mask_phone_with_ddd" id="cliente_telefone" name="cliente_telefone" readonly>
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Celular</label>
                                    <input type="text" class="form-control mask_cell_with_ddd" id="cliente_celular" name="cliente_celular" readonly>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">E-mail</label>
                                    <input type="email" class="form-control text-lowercase" id="cliente_email" name="cliente_email" readonly>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Logradouro</label>
                                    <input type="text" class="form-control text-uppercase" id="cliente_logradouro" name="cliente_logradouro" readonly>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Bairro</label>
                                    <input type="text" class="form-control text-uppercase" id="cliente_bairro" name="cliente_bairro" readonly>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Cidade</label>
                                    <input type="text" class="form-control text-uppercase" id="cliente_cidade" name="cliente_cidade" readonly>
                                </div>
                            </div>





                            3.	DA DOCUMENTAÇÃO JUNTO AO CORPO DE BOMBEIROS MILITAR DO ESTADO DO RIO DE JANEIRO
                            3.1	PROJETO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO APROVADO
                            (   ) sim	(   ) não	( X ) não avaliado

                            3.2	LAUDO DE EXIGÊNCIAS
                            (   ) sim	(   ) não	( X ) não avaliado

                            3.3	CERTIFICADO DE APROVAÇÃO
                            (   ) sim	(   ) não	( X ) não avaliado





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
                        <!-- Botão RelatorioExaustaoPDF -->
                        <x-button-crud op="99" model="3" bgColor="danger" textColor="write" title="Relatório em PDF" image="fas fa-file-pdf" label="PDF" onclick="gerar_relatorio_exaustao()" />
                        <x-button-crud op="99" model="3" bgColor="primary" textColor="write" title="Relatório em PDF (Inglês)" image="fas fa-file-pdf" label="PDF" onclick="gerar_relatorio_exaustao(0, 0, 'en')" />
                    @endif

                    <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
