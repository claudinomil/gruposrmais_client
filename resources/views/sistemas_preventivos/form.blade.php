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

                            <div class="row pt-4">
                                <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> Informações Gerais</h5>
                                <div class="form-group col-12 col-md-6 pb-3">
                                    <label class="form-label">Medida Segurança</label>
                                    <select class="form-control" name="medida_seguranca_id" id="medida_seguranca_id">
                                        <option value="">{{ __('Selecione...') }}</option>

                                        @foreach ($medidas_seguranca as $medida_seguranca)
                                            <option value="{{ $medida_seguranca['id'] }}">{{ $medida_seguranca['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-6 pb-3">
                                    <label class="form-label">Nome</label>
                                    <input type="text" class="form-control text-uppercase" id="name" name="name" required="required">
                                </div>
                            </div>
                            <div class="row pt-4">
                                <h5 class="pb-4 text-primary"><i class="fas fa-table"></i> Equipamentos Preventivos</h5>
                                <div class="row col-12" id="divEscolherEquipamento">
                                    <div class="form-group col-12 col-md-8 pb-3">
                                        <label class="form-label">Equipamento</label>
                                        <select class="form-control" name="ep_equipamento_preventivo_id" id="ep_equipamento_preventivo_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($equipamentos_preventivos as $equipamento_preventivo)
                                                <option value="{{ $equipamento_preventivo['id'] }}">{{ $equipamento_preventivo['name'] }}</option>
                                            @endforeach

                                        </select>
                                        <input type="hidden" id="ep_equipamento_preventivo_nome" name="ep_equipamento_preventivo_nome">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Qtd</label>
                                        <input type="number" class="form-control" id="ep_equipamento_preventivo_qtd" name="ep_equipamento_preventivo_qtd" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');">
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Opções</label>
                                        <div class="row">
                                            <div class="col-6" id="ep_equipamento_preventivo_adicionar_div" style="display: none;">
                                                <x-button-crud op="99" model="1" bgColor="success" textColor="write" id="ep_equipamento_preventivo_adicionar" name="ep_equipamento_preventivo_adicionar" title="Adicionar Equipamento Preventivo na Grade" image="fas fa-check" />
                                            </div>
                                            <div class="col-6" id="ep_equipamento_preventivo_retirar_div" style="display: none;">
                                                <x-button-crud op="99" model="1" bgColor="danger" textColor="write" id="ep_equipamento_preventivo_retirar" name="ep_equipamento_preventivo_retirar" title="Retirar Equipamento Preventivo da Grade" image="fas fa-trash-alt" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table mb-0">
                                        <thead class="table-light">
                                            <tr>
                                                <th class="text-center">ITEM</th>
                                                <th>EQUIPAMENTOS PREVENTIVOS</th>
                                                <th class="text-center">QUANTIDADE</th>
                                            </tr>
                                        </thead>
                                        <tbody id="ep_equipamento_preventivo_grade"></tbody>
                                    </table>
                                </div>

                                <!-- Campos hiddens para salvar na tabela equipamento_preventivo -->
                                <div id="ep_equipamento_preventivo_hiddens"></div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
