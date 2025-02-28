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
                                <!-- View/Edit -->
                                <div class="form-group col-12 col-md-3 pb-3 fieldsViewEdit" style="display: none;">
                                    <label class="form-label">Data</label>
                                    <input type="text" class="form-control" id="fieldDate" readonly="readonly">
                                    <input type="hidden" id="date" name="date">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3 fieldsViewEdit" style="display: none;">
                                    <label class="form-label">Hora</label>
                                    <input type="text" class="form-control" id="fieldTime" readonly="readonly">
                                    <input type="hidden" id="time" name="time">
                                </div>
                                <div class="form-group col-12 col-md-6 pb-3 fieldsViewEdit" style="display: none;">
                                    <label class="form-label">Usuário</label>
                                    <input type="text" class="form-control" id="fieldUserName" readonly="readonly">
                                    <input type="hidden" id="user_id" name="user_id">
                                </div>

                                <!-- Create -->
                                <div class="form-group col-12 col-md-3 pb-3 fieldsCreate" style="display: none;">
                                    <input type="hidden" id="date" name="date" value="{{ date('Y-m-d') }}">
                                    <input type="hidden" id="time" name="time" value="{{ date('H:i:s') }}">
                                    <input type="hidden" id="user_id" name="user_id" value="{{session('se_userLoggedData.id')}}">
                                </div>

                                <div class="form-group col-12 col-md-12 pb-3">
                                    <label class="form-label">Título</label>
                                    <input type="text" class="form-control text-uppercase" id="title" name="title" required="required">
                                </div>
                                <div class="form-group col-12 col-md-12 pb-3">
                                    <label class="form-label">Notificação</label>
                                    <textarea class="form-control" rows="3" id="notificacao" name="notificacao" required="required"></textarea>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
