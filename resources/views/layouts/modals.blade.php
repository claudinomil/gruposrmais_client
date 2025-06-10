<div>
    <!-- Modal para mostrar Perfil de Usuário -->
    <div class="modal fade modal-profile" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content" style="background-color: var(--bs-body-bg);">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xl-5">

                            <!-- Card -->
                            <div class="card" style="min-height: 200px;">
                                <div class="bg-primary bg-soft">
                                    <div class="row">
                                        <div class="col-7">
                                            <div class="text-primary p-3">
                                                <h5 class="text-primary">Usuário</h5>
                                                <p class="font-size-15 jsonUser jsonUserName"></p>
                                            </div>
                                        </div>
                                        <div class="col-5 align-self-end">
                                            <x-button-crud op="99" model="1" class="btn-close float-end px-1 py-1" data-bs-dismiss="modal" aria-label="Close" />
                                            <img src="{{ asset('build/assets/images/profile-img.png') }}" alt="" class="img-fluid">
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body pt-0">
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="avatar-md profile-user-wid mb-4">
                                                <img src="" alt="" class="img-thumbnail rounded-circle jsonUserAvatar" id="imgImageAvatar">
                                            </div>
                                        </div>

                                        <div class="col-sm-8">
                                            <div class="pt-4">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <h5 class="font-size-15">Grupo</h5>
                                                        <p class="text-muted mb-0 text-truncate jsonUser jsonUserGrupo"></p>
                                                    </div>
                                                    <div class="col-6">
                                                        <h5 class="font-size-15">Situação</h5>
                                                        <p class="text-muted mb-0 text-truncate jsonUser jsonUserSituacao"></p>
                                                    </div>
                                                </div>
                                                <div class="row" id="modal-profile-botoes">
                                                    <div class="col-4 mt-4 px-0">
                                                        @if(\App\Facades\Permissoes::permissao(['users_perfil_edit']))
                                                            <x-button-crud op="99" model="3" bgColor="success" textColor="write" class="btn-sm float-end" image="fas fa-address-card" label="Avatar" id="buttonUploadAvatar" />
                                                            <x-button-crud op="99" model="3" bgColor="warning" textColor="write" class="btn-sm float-end" image="fas fa-address-card" label="Fechar" style="display: none;" id="buttonUploadAvatarClose" />
                                                        @endif
                                                    </div>
                                                    <div class="col-4 mt-4 px-0">
                                                        @if(\App\Facades\Permissoes::permissao(['users_perfil_edit']))
                                                            <x-button-crud op="99" model="3" bgColor="primary" textColor="write" class="btn-sm float-end" image="fas fa-envelope" label="E-mail" id="buttonEditEmail" />
                                                            <x-button-crud op="99" model="3" bgColor="warning" textColor="write" class="btn-sm float-end" image="fas fa-envelope" label="Fechar" style="display: none;" id="buttonEditEmailClose" />
                                                        @endif
                                                    </div>
                                                    <div class="col-4 mt-4 px-0">
                                                        @if(\App\Facades\Permissoes::permissao(['users_perfil_edit']))
                                                            <x-button-crud op="99" model="3" bgColor="danger" textColor="write" class="btn-sm float-end" image="fas fa-key" label="Senha" id="buttonEditPassword" />
                                                            <x-button-crud op="99" model="3" bgColor="warning" textColor="write" class="btn-sm float-end" image="fas fa-key" label="Fechar" style="display: none;" id="buttonEditPasswordClose" />
                                                        @endif
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-12 pt-4" id="divUploadAvatar" style="display: none;">
                                            <h4 class="text-success"><b>:: </b>Alterar Avatar</h4>

                                            <form method="post" enctype="multipart/form-data" id="frm_upload_avatar">
                                                @csrf
                                                @method('POST')

                                                <input type="hidden" class="jsonUserId" id="upload_avatar_user_id" name="upload_avatar_user_id" value="">

                                                <div class="row mt-4">
                                                    <div class="input-group">
                                                        <input type="file" class="form-control" name="avatar_file" id="avatar_file">
                                                        <button type="submit" class="input-group-text">Upload</button>
                                                    </div>
                                                </div>

                                                <span class="col-12 text-danger text-center" id="frm-upload-avatar-error"></span>
                                            </form>
                                        </div>

                                        <div class="col-sm-12 pt-4" id="divEditEmail" style="display: none;">
                                            <h4 class="text-primary"><b>:: </b>Alterar E-mail</h4>

                                            <form method="post" enctype="multipart/form-data" id="frm_edit_email">
                                                @csrf
                                                @method('POST')

                                                <input type="hidden" class="jsonUserId" id="edit_email_user_id" name="edit_email_user_id" value="">

                                                <div class="row mt-4">
                                                    <div class="form-group col-12 pb-3">
                                                        <label class="form-label">E-mail Atual</label>
                                                        <input type="email" class="form-control jsonUserCurrentEmail" id="current_email" name="current_email" readonly>
                                                        <span class="col-12 text-danger font-size-11" id="current-email-error"></span>
                                                    </div>
                                                    <div class="form-group col-12 pb-3">
                                                        <label class="form-label">E-mail Novo</label>
                                                        <input type="email" class="form-control" id="new_email" name="new_email">
                                                        <span class="col-12 text-danger font-size-11" id="new-email-error"></span>
                                                    </div>
                                                    <div class="form-group col-12 pb-3">
                                                        <x-button-crud op="99" model="3" type="submit" bgColor="success" textColor="write" image="fa fa-save" label="Confirmar" />
                                                    </div>
                                                </div>

                                                <span class="col-12 text-danger text-center" id="frm-edit-email-error"></span>
                                            </form>
                                        </div>

                                        <div class="col-sm-12 pt-4" id="divEditPassword" style="display: none;">
                                            <h4 class="text-danger"><b>:: </b>Alterar Senha</h4>

                                            <form method="post" id="frm_edit_password" name="frm_edit_password">
                                                @csrf
                                                @method('POST')

                                                <input type="hidden" class="jsonUserId" id="edit_password_user_id" name="edit_password_user_id" value="">

                                                <div class="row mt-4">
                                                    <div class="form-group col-12 pb-3">
                                                        <label class="form-label">Senha Atual</label>
                                                        <input type="password" class="form-control" id="current_password" name="current_password">
                                                        <span class="col-12 text-danger font-size-11" id="current-password-error"></span>
                                                    </div>
                                                    <div class="form-group col-12 pb-3">
                                                        <label class="form-label">Senha Nova</label>
                                                        <input type="password" class="form-control" id="new_password" name="new_password">
                                                        <span class="col-12 text-danger font-size-11" id="new-password-error"></span>
                                                    </div>
                                                    <div class="form-group col-12 pb-3">
                                                        <label class="form-label">Confirmar Senha Nova</label>
                                                        <input type="password" class="form-control" id="confirm_new_password" name="confirm_new_password">
                                                        <span class="col-12 text-danger font-size-11" id="confirm-new-password-error"></span>
                                                    </div>
                                                    <div class="form-group col-12 pb-3">
                                                        <x-button-crud op="99" model="3" type="submit" bgColor="success" textColor="write" image="fa fa-save" label="Confirmar" />
                                                    </div>
                                                </div>

                                                <span class="col-12 text-danger text-center" id="frm-edit-password-error"></span>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Informações Pessoais -->
                            <div class="card font-size-11" style="min-height: 270px;">
                                <div class="card-body">
                                    <h4 class="card-title mb-4">Informações Pessoais</h4>
                                    <div class="table-responsive">
                                        <table class="table table-nowrap mb-0">
                                            <tbody>
                                            <tr>
                                                <th scope="row">Name :</th>
                                                <td class="jsonUser jsonUserName"></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">E-mail :</th>
                                                <td class="jsonUser jsonUserEmail"></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Localização :</th>
                                                <td class="jsonUser jsonUserLocalizacao"></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-xl-7">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="card mini-stats-wid">
                                        <div class="card-body">
                                            <div class="d-flex">
                                                <div class="flex-grow-1">
                                                    <p class="text-muted fw-medium mb-2">Inclusões</p>
                                                    <h4 class="mb-0 jsonTransacoesInclusions">0</h4>
                                                </div>
                                                <div class="flex-shrink-0 align-self-center">
                                                    <div class="mini-stat-icon avatar-sm rounded-circle bg-success">
                                                        <span class="avatar-title bg-success"><i class="bx bx-plus font-size-24"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card mini-stats-wid">
                                        <div class="card-body">
                                            <div class="d-flex">
                                                <div class="flex-grow-1">
                                                    <p class="text-muted fw-medium mb-2">Alterações</p>
                                                    <h4 class="mb-0 jsonTransacoesAlterations">0</h4>
                                                </div>
                                                <div class="flex-shrink-0 align-self-center">
                                                    <div class="avatar-sm mini-stat-icon rounded-circle bg-primary">
                                                        <span class="avatar-title bg-primary"><i class="bx bx-edit font-size-24"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card mini-stats-wid">
                                        <div class="card-body">
                                            <div class="d-flex">
                                                <div class="flex-grow-1">
                                                    <p class="text-muted fw-medium mb-2">Exclusões</p>
                                                    <h4 class="mb-0 jsonTransacoesExclusions">0</h4>
                                                </div>
                                                <div class="flex-shrink-0 align-self-center">
                                                    <div class="avatar-sm mini-stat-icon rounded-circle bg-danger">
                                                        <span class="avatar-title bg-danger"><i class="bx bx-trash font-size-24"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card" style="min-height: 400px;">
                                <div class="card-body">
                                    <h4 class="card-title mb-4">Log de Transações</h4>
                                    <div class="table-responsive">
                                        <table class="table table-nowrap table-hover mb-0 class-datatable-2 font-size-11">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Operação</th>
                                                    <th scope="col">Submódulos</th>
                                                    <th scope="col">Data</th>
                                                </tr>
                                            </thead>
                                            <tbody class="jsonTransacoesTable"></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Funcionario Modal Info -->
    <div id="funcionario_modal_info" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body">
                    <!-- Header -->
                    <div class="row" id="header">
                        <div class="col-md-4 text-center">
                            <img class="img-thumbnail avatar-xl clearClass" src="" data-holder-rendered="true" id="mi_fun_foto">
                        </div>
                        <div class="col-md-8">
                            <div class="col-12 font-size-14 text-primary p-1 clearClass" id="mi_fun_nome"></div>
                            <div class="col-12 font-size-12 text-secondary p-1 clearClass" style="margin-top: -10px;" id="mi_fun_funcao"></div>
                            <div class="col-12 font-size-10 text-secondary p-1 clearClass" style="margin-top: -10px;" id="mi_fun_email"></div>
                            <div class="col-12 font-size-14 text-success p-1 clearClass" id="mi_fun_departamento"></div>
                        </div>
                        <hr>
                    </div>

                    <!-- Navegação tabs -->
                    <div class="row" style="margin-top: -12px;">
                        <ul class="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-bs-toggle="tab" href="#tab_fun_dados" role="tab">
                                    <span class="d-block d-sm-none"><i class="fas fa-book"></i></span>
                                    <span class="d-none d-sm-block">Dados</span>
                                </a>
                            </li>

                            @if(\App\Facades\Permissoes::permissao(['funcionarios_edit']))
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#tab_fun_foto" role="tab">
                                        <span class="d-block d-sm-none"><i class="fas fa-address-card"></i></span>
                                        <span class="d-none d-sm-block">Foto</span>
                                    </a>
                                </li>
                            @endif

                            @if(\App\Facades\Permissoes::permissao(['funcionarios_edit']))
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#tab_fun_documentos_pdfs" role="tab">
                                        <span class="d-block d-sm-none"><i class="fas fa-docker"></i></span>
                                        <span class="d-none d-sm-block">Documentos PDF's</span>
                                    </a>
                                </li>
                            @endif
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content p-3 text-muted">
                            <div class="tab-pane active" id="tab_fun_dados" role="tabpanel">
                                <div class="row">
                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">CPF</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_fun_cpf"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">Departamento</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_fun_departamento"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">Função</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_fun_funcao"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">Nome</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_fun_nome"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">Telefone(s)</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_fun_telefones"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">Celular(s)</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_fun_celulares"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">Data Admissão</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_fun_data_admissao"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">Data Demissão</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_fun_data_demissao"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">PIS</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_fun_pis"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">PASEP</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_fun_pasep"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">Carteira Trabalho</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_fun_carteira_trabalho"></div>
                                </div>
                            </div>

                            @if(\App\Facades\Permissoes::permissao(['funcionarios_edit']))
                                <div class="tab-pane" id="tab_fun_foto" role="tabpanel">
                                    <form enctype="multipart/form-data" id="frm_upload_fun_foto">
                                        <input type="hidden" id="upload_foto_funcionario_id" name="upload_foto_funcionario_id" value="">
                                        <input type="hidden" id="upload_foto_funcionario_name" name="upload_foto_funcionario_name" value="">

                                        <div class="form-group col-12 py-2">
                                            <button type="button" class="btn btn-sm btn-success" id="frm_upload_fun_foto_executar">Confirmar Upload</button>
                                        </div>
                                        <div class="form-group col-12 pt-2">
                                            <label class="form-label mb-0 ps-1 small">Foto</label>
                                            <input type="file" class="form-control form-control-sm" name="fun_foto_file" id="fun_foto_file">
                                        </div>
                                    </form>
                                </div>
                            @endif

                            @if(\App\Facades\Permissoes::permissao(['funcionarios_edit']))
                                <div class="tab-pane" id="tab_fun_documentos_pdfs" role="tabpanel">
                                    <form enctype="multipart/form-data" id="frm_upload_documentos_pdfs_fun">
                                        <input type="hidden" id="upload_documentos_pdfs_funcionario_id" name="upload_documentos_pdfs_funcionario_id" value="">

                                        <!-- Ação do Formulário: 1(create) 2(edit) 3(update) 4(delete) -->
                                        <input type="hidden" id="upload_documentos_pdfs_fun_acao" name="upload_documentos_pdfs_fun_acao" value="1">

                                        <div class="form-group col-12 d-flex gap-3 py-2">
                                            <button type="button" class="btn btn-sm btn-success" id="frm_upload_documentos_pdfs_fun_executar" name="frm_upload_documentos_pdfs_fun_executar">Executar Ação</button>
                                            <button type="button" class="btn btn-sm btn-warning" id="frm_upload_documentos_pdfs_fun_incluir" name="frm_upload_documentos_pdfs_fun_incluir" style="display: none;">Incluir Documento</button>
                                            <button type="button" class="btn btn-sm btn-warning" id="frm_upload_documentos_pdfs_fun_listar" name="frm_upload_documentos_pdfs_fun_listar">Listar Documento(s)</button>
                                        </div>
                                        <div class="row" id="div_frm_upload_documentos_pdfs_fun_executar">
                                            <div class="form-group col-12 pt-2">
                                                <label class="form-label mb-0 ps-1 small">Descrição</label>
                                                <input type="text" class="form-control" name="fun_documentos_pdfs_descricao" id="fun_documentos_pdfs_descricao" placeholder="Descrição do Documento PDF">
                                            </div>
                                            <div class="form-group col-12 col-md-6 pt-2">
                                                <label class="form-label mb-0 ps-1 small">Data Documento</label>
                                                <input type="text" class="form-control mask_date" name="fun_documentos_pdfs_data_documento" id="fun_documentos_pdfs_data_documento" placeholder="Data do Documento PDF">
                                            </div>
                                            <div class="form-group col-12 col-md-6 pt-2">
                                                <label class="form-label mb-0 ps-1 small">Aviso</label>
                                                <select class="form-select" name="fun_documentos_pdfs_aviso" id="fun_documentos_pdfs_aviso">
                                                    <option value="0">Nenhum Aviso</option>
                                                    <option value="1">Avisar a cada 1 mês</option>
                                                    <option value="2">Avisar a cada 3 meses</option>
                                                    <option value="3">Avisar a cada 6 meses</option>
                                                    <option value="4">Avisar a cada 1 ano</option>
                                                    <option value="5">Avisar a cada 3 anos</option>
                                                    <option value="6">Avisar a cada 6 anos</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-12 pt-2">
                                                <label class="form-label mb-0 ps-1 small">Documento</label>
                                                <input type="file" class="form-control form-control-sm" name="fun_documentos_pdfs_file" id="fun_documentos_pdfs_file">
                                            </div>
                                        </div>
                                        <div class="row" id="div_frm_upload_documentos_pdfs_fun_listar" style="display: none;"></div>
                                        <div class="row" id="div_frm_upload_documentos_pdfs_fun_visualisar" style="display: none;">VISUALISAR</div>
                                    </form>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Cliente Modal Info -->
    <div id="cliente_modal_info" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body">
                    <!-- Header -->
                    <div class="row" id="header">
                        <div class="col-md-12">
                            <div class="col-12 font-size-14 text-primary p-1 clearClass" id="mi_cli_nome"></div>
                            <div class="col-12 font-size-10 text-secondary p-1 clearClass" style="margin-top: -10px;" id="mi_cli_email"></div>
                        </div>
                        <hr>
                    </div>

                    <!-- Navegação tabs -->
                    <div class="row" style="margin-top: -12px;">
                        <ul class="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-bs-toggle="tab" href="#tab_cli_dados" role="tab">
                                    <span class="d-block d-sm-none"><i class="fas fa-book"></i></span>
                                    <span class="d-none d-sm-block">Dados</span>
                                </a>
                            </li>

                            @if(\App\Facades\Permissoes::permissao(['clientes_edit']))
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#tab_cli_documentos_upload" role="tab">
                                        <span class="d-block d-sm-none"><i class="fas fa-docker"></i></span>
                                        <span class="d-none d-sm-block">Incluir Documento</span>
                                    </a>
                                </li>
                            @endif

                            <li class="nav-item">
                                <a class="nav-link" data-bs-toggle="tab" href="#tab_cli_documentos_pdfs" role="tab">
                                    <span class="d-block d-sm-none"><i class="fas fa-docker"></i></span>
                                    <span class="d-none d-sm-block">Documentos</span>
                                </a>
                            </li>
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content p-3 text-muted">
                            <div class="tab-pane active" id="tab_cli_dados" role="tabpanel">
                                <div class="row">
                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">Status</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_cli_status"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">Tipo</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_cli_tipo"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">CPF/CNPJ</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_cli_cpf_cnpj"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">Nome</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_cli_nome"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">Telefone(s)</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_cli_telefones"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">Celular(s)</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_cli_celulares"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary" id="div_cli_dados_data">Data Nascimento</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_cli_data_nascimento"></div>
                                </div>
                            </div>

                            @if(\App\Facades\Permissoes::permissao(['clientes_edit']))
                                <div class="tab-pane" id="tab_cli_documentos_upload" role="tabpanel">
                                    <form enctype="multipart/form-data" id="frm_upload_documentos_pdfs_cli">
                                        <input type="hidden" id="upload_documentos_pdfs_cliente_id" name="upload_documentos_pdfs_cliente_id" value="">

                                        <!-- Ação do Formulário: 1(create) 2(edit) 3(update) 4(delete) -->
                                        <input type="hidden" id="upload_documentos_pdfs_cli_acao" name="upload_documentos_pdfs_cli_acao" value="1">

                                        <div class="form-group col-12 d-flex gap-3 py-2">
                                            <button type="button" class="btn btn-sm btn-success" id="frm_upload_documentos_pdfs_cli_executar" name="frm_upload_documentos_pdfs_cli_executar">Executar Ação</button>
                                        </div>
                                        <div class="row" id="div_frm_upload_documentos_pdfs_cli_executar">
                                            <div class="form-group col-12 col-md-6 pt-2">
                                                <label class="form-label mb-0 ps-1 small">Documento</label>
                                                <select class="form-select form-select-sm" name="cli_documentos_pdfs_documento" id="cli_documentos_pdfs_documento">
                                                    <option value="">Selecione...</option>
                                                    <option class="pessoa_juridica" value="1">Projeto SCIP</option>
                                                    <option class="pessoa_juridica" value="2">Laudo Exigências</option>
                                                    <option class="pessoa_juridica" value="3">Certificado Aprovação</option>
                                                    <option class="pessoa_juridica" value="4">Certificado Aprovação Simplificado</option>
                                                    <option class="pessoa_juridica" value="5">Certificado Aprovação Assistido</option>
                                                    <option class="pessoa_juridica" value="6">CNPJ</option>
                                                    <option class="pessoa_juridica" value="7">Representante Legal</option>
                                                    <option class="pessoa_juridica" value="8">Contrato Social</option>
                                                    <option class="pessoa_juridica" value="9">RGI</option>
                                                    <option class="pessoa_juridica" value="10">Contrato Locação</option>
                                                    <option class="pessoa_fisica" value="11">CPF</option>
                                                    <option class="pessoa_fisica" value="12">Representante Legal</option>
                                                    <option class="pessoa_fisica" value="13">Contrato Social</option>
                                                    <option class="pessoa_fisica" value="14">RGI</option>
                                                    <option class="pessoa_fisica" value="15">Contrato Locação</option>
                                                    <option class="pessoa_juridica" value="16">Memória Descritiva</option>
                                                    <option class="pessoa_juridica" value="17">Certificado Funcionamento</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-12 col-md-6 pt-2">
                                                <label class="form-label mb-0 ps-1 small">Data Documento</label>
                                                <input type="text" class="form-control form-control-sm mask_date" name="cli_documentos_pdfs_data_documento" id="cli_documentos_pdfs_data_documento" placeholder="Data do Documento PDF">
                                            </div>
                                            <div class="form-group col-12 col-md-6 pt-2">
                                                <label class="form-label mb-0 ps-1 small">Aviso</label>
                                                <select class="form-select form-select-sm" name="cli_documentos_pdfs_aviso" id="cli_documentos_pdfs_aviso">
                                                    <option value="0">Nenhum Aviso</option>
                                                    <option value="1">Avisar a cada 1 mês</option>
                                                    <option value="2">Avisar a cada 3 meses</option>
                                                    <option value="3">Avisar a cada 6 meses</option>
                                                    <option value="4">Avisar a cada 1 ano</option>
                                                    <option value="5">Avisar a cada 3 anos</option>
                                                    <option value="6">Avisar a cada 6 anos</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-12 col-md-6 pt-2">
                                                <label class="form-label mb-0 ps-1 small">Documento</label>
                                                <input type="file" class="form-control form-control-sm" name="cli_documentos_pdfs_file" id="cli_documentos_pdfs_file">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            @endif

                            <div class="tab-pane" id="tab_cli_documentos_pdfs" role="tabpanel">
                                <div class="table-responsive" id="cli_documentos_grade">Nenhum documento encontrado.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para mostrar Foto e Transações do Fornecedor -->
    <div class="modal fade modal-fornecedor" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content" style="background-color: var(--bs-body-bg);">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xl-5">

                            <!-- Principal -->
                            <div class="card" style="min-height: 200px;">
                                <div class="bg-primary">
                                    <div class="row">
                                        <div class="col-8">
                                            <div class="text-white p-3">
                                                <h5 class="text-white">Fornecedor</h5>
                                                <p class="jsonFornecedor jsonFornecedorName"></p>
                                            </div>
                                        </div>
                                        <div class="col-4 align-self-end">
                                            <x-button-crud op="99" model="1" class="btn-close float-end px-1 py-1" data-bs-dismiss="modal" aria-label="Close" />
                                            <img src="{{ asset('build/assets/images/fornecedor-img.png') }}" alt="" class="img-fluid">
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body pt-0">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="pt-4">
                                                <div class="row">
                                                    <div class="col-3">
                                                        <h5 class="font-size-15">Status</h5>
                                                        <p class="text-muted mb-0 text-truncate jsonFornecedor jsonFornecedorStatus"></p>
                                                    </div>
                                                    <div class="col-4">
                                                        <h5 class="font-size-15">Tipo</h5>
                                                        <p class="text-muted mb-0 text-truncate jsonFornecedor jsonFornecedorTipo"></p>
                                                    </div>
                                                    <div class="col-5">
                                                        <h5 class="font-size-15 labelFornecedorCnpjCpf">CNPJ/CPF</h5>
                                                        <p class="text-muted mb-0 text-truncate jsonFornecedor jsonFornecedorCnpj"></p>
                                                        <p class="text-muted mb-0 text-truncate jsonFornecedor jsonFornecedorCpf"></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Informações Pessoais -->
                            <div class="card font-size-11" style="min-height: 250px;">
                                <div class="card-body">
                                    <h4 class="card-title mb-4">Informações Gerais</h4>
                                    <div class="table-responsive">
                                        <table class="table table-nowrap mb-0">
                                            <tbody>
                                            <tr>
                                                <th scope="row">Site :</th>
                                                <td class="jsonFornecedor jsonFornecedorSite"></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Email :</th>
                                                <td class="jsonFornecedor jsonFornecedorEmail"></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Contato :</th>
                                                <td>
                                                    <span class="jsonFornecedor jsonFornecedorContatoTelefone1"></span>
                                                    <span class="jsonFornecedor jsonFornecedorContatoTelefone2"></span>
                                                    <span class="jsonFornecedor jsonFornecedorContatoCelular1"></span>
                                                    <span class="jsonFornecedor jsonFornecedorContatoCelular2"></span>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-7">
                            <!-- Tabela -->
                            <div class="card" style="min-height: 475px;">
                                <div class="card-body">
                                    <h5 class="card-title text-primary mb-4">Compras</h5>
                                    <div class="/*table-responsive*/">
                                        <table class="table /*table-nowrap*/ table-hover mb-0 class-datatable-2 font-size-11">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Compra</th>
                                            </tr>
                                            </thead>
                                            <tbody class="jsonFornecedor jsonFornecedorComprasTable"></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para mostrar Notificação que o usuário logado clicou para ler (Topbar) -->
    <div class="modal fade modal-notificacao-ler" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="background-color: var(--bs-body-bg);">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card overflow-hidden">
                                <div class="bg-secondary">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="text-white p-3">
                                                <h5 class="text-white">Notificação</h5>
                                                <p class="jsonNotificacaoLerTitulo"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body pt-0">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <p class="text-muted pt-4 mb-0 jsonNotificacaoLerNotificacao" style="text-align: justify"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para mostrar Informações Visita Técnica -->
{{--    <div class="modal fade modal-visita-tecnica" tabindex="-1" role="dialog" aria-hidden="true">--}}
{{--        <div class="modal-dialog modal-xl">--}}
{{--            <div class="modal-content" style="background-color: var(--bs-body-bg);">--}}
{{--                <div class="modal-body">--}}
{{--                    <div class="row">--}}
{{--                        <div class="col-xl-5">--}}

{{--                            <!-- Card -->--}}
{{--                            <div class="card overflow-hidden">--}}
{{--                                <div class="bg-danger">--}}
{{--                                    <div class="row">--}}
{{--                                        <div class="col-7">--}}
{{--                                            <div class="text-white p-3">--}}
{{--                                                <h5 class="text-white">Extra</h5>--}}
{{--                                                <p>Visita Técnica do Sistema</p>--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                        <div class="col-5 align-self-end">--}}
{{--                                            <x-button-crud op="99" model="1" class="btn-close float-end px-1 py-1" data-bs-dismiss="modal" aria-label="Close" />--}}
{{--                                            <img src="{{ asset('build/assets/images/visita_tecnica-img.png') }}" alt="" class="img-fluid">--}}
{{--                                        </div>--}}
{{--                                    </div>--}}
{{--                                </div>--}}
{{--                                <div class="card-body pt-0">--}}
{{--                                    <div class="row">--}}
{{--                                        <div class="col-sm-4">--}}
{{--                                            <h5 class="font-size-15 text-truncate jsonVisitaTecnicaName"></h5>--}}
{{--                                            <p class="text-muted mb-0 text-truncate jsonVisitaTecnicaFuncao"></p>--}}
{{--                                        </div>--}}

{{--                                        <div class="col-sm-8">--}}
{{--                                            <div class="pt-4">--}}
{{--                                                <div class="row">--}}
{{--                                                    <div class="col-6">--}}
{{--                                                        <h5 class="font-size-15">Escolaridade</h5>--}}
{{--                                                        <p class="text-muted mb-0 text-truncate jsonVisitaTecnicaEscolaridade"></p>--}}
{{--                                                    </div>--}}
{{--                                                    <div class="col-6">--}}
{{--                                                        <h5 class="font-size-15">Gênero</h5>--}}
{{--                                                        <p class="text-muted mb-0 text-truncate jsonVisitaTecnicaGenero"></p>--}}
{{--                                                    </div>--}}
{{--                                                </div>--}}
{{--                                                <div class="row">--}}
{{--                                                    <div class="col-4 mt-4 px-0">&nbsp;</div>--}}
{{--                                                </div>--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                    </div>--}}
{{--                                </div>--}}
{{--                            </div>--}}

{{--                            <!-- Informações Pessoais -->--}}
{{--                            <div class="card">--}}
{{--                                <div class="card-body">--}}
{{--                                    <h4 class="card-title mb-4">Informações Pessoais</h4>--}}
{{--                                    <div class="table-responsive">--}}
{{--                                        <table class="table table-nowrap mb-0">--}}
{{--                                            <tbody>--}}
{{--                                            <tr>--}}
{{--                                                <th scope="row">Name :</th>--}}
{{--                                                <td class="jsonVisitaTecnicaName"></td>--}}
{{--                                            </tr>--}}
{{--                                            <tr>--}}
{{--                                                <th scope="row">E-mail :</th>--}}
{{--                                                <td class="jsonVisitaTecnicaEmail"></td>--}}
{{--                                            </tr>--}}
{{--                                            </tbody>--}}
{{--                                        </table>--}}
{{--                                    </div>--}}
{{--                                </div>--}}
{{--                            </div>--}}

{{--                        </div>--}}

{{--                        <div class="col-xl-7">--}}
{{--                            <div class="card">--}}
{{--                                <div class="card-body">--}}
{{--                                    <h4 class="card-title mb-4">Transações</h4>--}}
{{--                                    <div class="table-responsive">--}}
{{--                                        <table class="table table-nowrap table-hover mb-0 class-datatable-2 font-size-11">--}}
{{--                                            <thead>--}}
{{--                                            <tr>--}}
{{--                                                <th scope="col">#</th>--}}
{{--                                                <th scope="col">Operação</th>--}}
{{--                                            </tr>--}}
{{--                                            </thead>--}}
{{--                                            <tbody class="jsonVisitaTecnicaTransacoesTable"></tbody>--}}
{{--                                        </table>--}}
{{--                                    </div>--}}
{{--                                </div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}
{{--    </div>--}}


</div>
