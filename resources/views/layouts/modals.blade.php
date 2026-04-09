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
                                                        <h5 class="font-size-15">{{ __('Grupo') }}</h5>
                                                        <p class="text-muted mb-0 text-truncate jsonUser jsonUserGrupo"></p>
                                                    </div>
                                                    <div class="col-6">
                                                        <h5 class="font-size-15">{{ __('Situação') }}</h5>
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

                                            <form enctype="multipart/form-data" id="frm_upload_avatar">
                                                @csrf

                                                <input type="hidden" class="jsonUserId" id="upload_avatar_user_id" name="upload_avatar_user_id" value="">

                                                <div class="row mt-4">
                                                    <div class="input-group">
                                                        <input type="file" class="form-control" name="avatar_file" accept=".png, .jpg, .jpeg" id="avatar_file">
                                                        <button type="button" class="input-group-text" id="btn_upload_avatar">Upload</button>
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

    @if($se_prefixPermissaoSubmodulo == 'funcionarios')
    <!-- Funcionario Modal Info -->
    <div class="modal fade" id="funcionario_modal_info" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-light">
                <div class="modal-header" style="background-color: #2a3042;">
                    <!-- Header -->
                    <div class="row col-12">
                        <div class="col-8 order-1 order-lg-1 col-lg-4">
                            <div class="d-flex">
                                <div class="flex-shrink-0 me-3">
                                    <img src="build/assets/images/funcionarios/funcionario-0.png" class="avatar-lg rounded-circle img-thumbnail clearClass" style="width: 100px; height: 100px; object-fit: contain; object-position: center; background-color: #f8f9fa;" id="mi_fun_fotografia">
                                </div>
                                <div class="flex-grow-1 align-self-center">
                                    <div>
                                        <h5 class="mb-2" style="color: #ffac31 !important;">INFORMAÇÕES FUNCIONÁRIOS</h5>
                                        <h6 class="mb-1" style="color: #ffffff !important;" id="mi_fun_header_nome"></h6>
                                        <div class="clearfix mt-2">
                                            <div class="dropdown">
                                                <button class="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i class="bx bxs-cog align-middle me-1"></i> Opções
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-start">
                                                    <a class="dropdown-item" href="#" onclick="funcionarioModalInfoControle(1);">Fotografias</a>
                                                    <a class="dropdown-item" href="#" onclick="funcionarioModalInfoControle(2);">Dados</a>

                                                    @if(\App\Facades\Permissoes::permissao(['funcionarios_edit']))
                                                    <a class="dropdown-item" href="#" onclick="funcionarioModalInfoControle(5);">Incluir Documentos</a>
                                                    @endif

                                                    @if(\App\Facades\Permissoes::permissao(['funcionarios_edit']))
                                                    <a class="dropdown-item" href="#" onclick="funcionarioModalInfoControle(8);">Incluir Documentos Mensais</a>
                                                    @endif

                                                    <div class="dropdown-divider"></div>
                                                    <a class="dropdown-item" href="#" data-bs-dismiss="modal">Fechar</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 order-3 order-lg-2 col-lg-8 align-self-center">
                            <div class="text-lg-center mt-4 mt-lg-0">
                                <div class="d-flex flex-wrap justify-content-start gap-2">
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="funcionarioModalInfoControle(1);">
                                        <h5 class="mb-0 small text-white">&nbsp;</h5>
                                        <span class="small text-white">Fotografias</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="funcionarioModalInfoControle(2);">
                                        <h5 class="mb-0 small text-white">&nbsp;</h5>
                                        <span class="small text-white">Dados</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="funcionarioModalInfoControle(3);">
                                        <h5 class="mb-0 small text-white" id="md_fun_estatisticas_documentos">0</h5>
                                        <span class="small text-white">Documentos</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="funcionarioModalInfoControle(7);">
                                        <h5 class="mb-0 small text-white" id="md_fun_estatisticas_documentos_mensais">0</h5>
                                        <span class="small text-white">Documentos Mensais</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="funcionarioModalInfoControle(6);">
                                        <h5 class="mb-0 small text-white">2</h5>
                                        <span class="small text-white">Cartão Emergencial</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Header END -->
                </div>
                <div class="modal-body d-lg-flex flex-lg-column flex-grow-1 px-4">
                    <!-- Funcionário ID -->
                    <input type="hidden" id="mi_fun_funcionario_id" name="mi_fun_funcionario_id" value="0">

                    <!-- Fotografias -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_fun_div_fotografias">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="bx bxs-file-plus"></i>&nbsp;&nbsp;Fotografias</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-6 pe-5">
                                        <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;FOTOGRAFIA DOCUMENTO</h6>
                                        <div class="col-12" style="height: 150px;">
                                            <img src="" alt="" class="img-fluid clearClass" style="max-height: 140px !important;" id="mi_fun_fotografia_documento">
                                        </div>

                                        @if(\App\Facades\Permissoes::permissao(['funcionarios_edit']))
                                        <form enctype="multipart/form-data" id="frm_upload_fotografia_documento_fun">
                                            <input type="hidden" id="upload_fotografia_documento_funcionario_id" name="upload_fotografia_documento_funcionario_id" value="">

                                            <div class="col-12 mb-2">
                                                <button type="button" class="btn btn-success btn-sm" id="frm_upload_fotografia_documento_fun_executar" name="frm_upload_fotografia_documento_fun_executar">Enviar Fotografia</button>
                                            </div>

                                            <div class="col-12 mb-3">
                                                <input type="file" class="form-control form-control-sm" name="fun_fotografia_documento_file" accept=".png, .jpg, .jpeg" id="fun_fotografia_documento_file">
                                            </div>
                                        </form>
                                        @endif
                                    </div>
                                    <div class="col-12 col-lg-6 pe-5">
                                        <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;FOTOGRAFIA CARTÃO EMERGENCIAL</h6>
                                        <div class="col-12" style="height: 150px;">
                                            <img src="" alt="" class="img-fluid clearClass" style="max-height: 140px !important;" id="mi_fun_fotografia_cartao_emergencial">
                                        </div>

                                        @if(\App\Facades\Permissoes::permissao(['funcionarios_edit']))
                                        <form enctype="multipart/form-data" id="frm_upload_fotografia_cartao_emergencial_fun">
                                            <input type="hidden" id="upload_fotografia_cartao_emergencial_funcionario_id" name="upload_fotografia_cartao_emergencial_funcionario_id" value="">

                                            <div class="col-12 mb-2">
                                                <button type="button" class="btn btn-success btn-sm" id="frm_upload_fotografia_cartao_emergencial_fun_executar" name="frm_upload_fotografia_cartao_emergencial_fun_executar">Enviar Fotografia</button>
                                            </div>

                                            <div class="col-12 mb-3">
                                                <input type="file" class="form-control form-control-sm" name="fun_fotografia_cartao_emergencial_file" accept=".png, .jpg, .jpeg" id="fun_fotografia_cartao_emergencial_file">
                                            </div>
                                        </form>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Fotografias END -->

                    <!-- Dados -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_fun_div_dados">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-database"></i>&nbsp;&nbsp;Dados</h5>
                                <div class="row">
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Nome') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_fun_nome" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('CPF') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_fun_cpf" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Empresa') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_fun_empresa" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">Contratação Tipo</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_fun_contratacao_tipo" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Função') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_fun_funcao" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Departamento') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_fun_departamento" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Nome Profissional') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_fun_nome_profissional" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small" id="div_fun_dados_data">{{ __('Nascimento') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_fun_data_nascimento" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Gênero') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_fun_genero" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Celular 1') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_fun_celular_1" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Celular 2') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_fun_celular_2" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Telefone 1') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_fun_telefone_1" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Telefone 2') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_fun_telefone_2" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('E-mail') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_fun_email" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Dados END -->

                    <!-- Incluir Documentos -->
                    @if(\App\Facades\Permissoes::permissao(['funcionarios_edit']))
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_fun_div_incluir_documentos">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Incluir Documentos</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12 pe-5">
                                        <div class="row">
                                            <div class="col-12 col-md-12 col-lg-12">
                                                <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;INCLUSÃO DE DOCUMENTO</h6>
                                                <form enctype="multipart/form-data" id="frm_upload_documentos_fun">
                                                    <input type="hidden" id="upload_documentos_funcionario_id" name="upload_documentos_funcionario_id" value="">

                                                    <div class="col-12 mb-5">
                                                        <button type="button" class="btn btn-success btn-sm" id="frm_upload_documentos_fun_executar" name="frm_upload_documentos_fun_executar">Incluir Documento</button>
                                                    </div>
                                                    <div class="row" id="div_frm_upload_documentos_fun_executar">
                                                        <div class="col-12 mb-3">
                                                            <label class="form-label">Documento (Nome)</label>
                                                            <select class="form-select form-select-sm" name="fun_documentos_documento_id" id="fun_documentos_documento_id">
                                                                <option value="">{{ __('Selecione...') }}</option>
                                                                @php
                                                                $currentFonte = null;
                                                                @endphp

                                                                @foreach ($documentos as $documento)
                                                                @php
                                                                $class = '';
                                                                if ($documento['documento_fonte_id'] == 1) {$class = 'pessoa_juridica';}
                                                                if ($documento['documento_fonte_id'] == 2) {$class = 'pessoa_fisica';}
                                                                if ($documento['documento_fonte_id'] == 3) {$class = 'pessoa_juridica';}
                                                                @endphp

                                                                {{-- Abre um novo grupo quando mudar de fonte --}}
                                                                @if ($currentFonte !== $documento['documento_fonte_id'])
                                                                @if ($currentFonte !== null)
                                                                </optgroup>
                                                                @endif
                                                                <optgroup label="{{ $documento['documentoFonteName'] }}">
                                                                    @php
                                                                    $currentFonte = $documento['documento_fonte_id'];
                                                                    @endphp
                                                                    @endif

                                                                    <option class="{{ $class }}" value="{{ $documento['id'] }}">{{ $documento['name'] }}</option>
                                                                    @endforeach

                                                                    @if ($currentFonte !== null)
                                                                </optgroup>
                                                                @endif
                                                            </select>
                                                        </div>
                                                        <div class="col-12 mb-3">
                                                            <label class="form-label">Emissão</label>
                                                            <input type="text" class="form-control form-control-sm mask_date" name="fun_documentos_data_emissao" id="fun_documentos_data_emissao" placeholder="Data de Emissão do Documento PDF">
                                                        </div>
                                                        <div class="col-12 mb-3">
                                                            <label class="form-label">Vencimento</label>
                                                            <input type="text" class="form-control form-control-sm mask_date" name="fun_documentos_data_vencimento" id="fun_documentos_data_vencimento" placeholder="Data de Vencimento do Documento PDF">
                                                        </div>
                                                        <div class="col-12 mb-3">
                                                            <label class="form-label">
                                                                Aviso
                                                                <i class="fa fa-info-circle text-primary ms-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Avisar Funcionário por E-mail depois da Data de Emissão."></i>
                                                            </label>
                                                            <select class="form-select form-select-sm" name="fun_documentos_aviso" id="fun_documentos_aviso">
                                                                <option value="0">Nenhum Aviso</option>
                                                                <option value="1">Avisar a cada 1 mês</option>
                                                                <option value="2">Avisar a cada 3 meses</option>
                                                                <option value="3">Avisar a cada 6 meses</option>
                                                                <option value="4">Avisar a cada 1 ano</option>
                                                                <option value="5">Avisar a cada 3 anos</option>
                                                                <option value="6">Avisar a cada 6 anos</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-12 mb-3">
                                                            <label class="form-label">Documento (Arquivo)</label>
                                                            <input type="file" class="form-control form-control-sm" name="fun_documentos_file" id="fun_documentos_file" accept=".pdf">
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    @endif
                    <!-- Incluir Documentos END -->

                    <!-- Documentos -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_fun_div_documentos">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Documentos</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12">
                                        <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;GRADE DE DOCUMENTOS</h6>

                                        <div class="col-12 mb-5" id="fun_documentos_grade_botoes"></div>

                                        <div id="fun_documentos_grade">Nenhum documento encontrado.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Documentos END -->

                    <!-- Incluir Documentos Mensais -->
                    @if(\App\Facades\Permissoes::permissao(['funcionarios_edit']))
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_fun_div_incluir_documentos_mensais">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Incluir Documentos Mensais</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12 pe-5">
                                        <div class="row">
                                            <div class="col-12 col-md-12 col-lg-12 mt-5 mt-lg-0 ps-lg-5">
                                                <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;INCLUSÃO DE DOCUMENTO MENSAIS</h6>
                                                <form enctype="multipart/form-data" id="frm_upload_documentos_mensais_fun">
                                                    <input type="hidden" id="upload_documentos_mensais_funcionario_id" name="upload_documentos_mensais_funcionario_id" value="">

                                                    <div class="col-12 mb-5">
                                                        <button type="button" class="btn btn-success btn-sm d-none" id="frm_upload_documentos_mensais_fun_executar" name="frm_upload_documentos_mensais_fun_executar">Incluir Documentos</button>
                                                    </div>
                                                    <div class="row" id="div_frm_upload_documentos_mensais_fun_executar">
                                                        <div class="col-12 col-md-4 col-lg-2 mb-3">
                                                            <label class="form-label">Mês</label>
                                                            <select class="form-select form-select-sm" name="fun_documentos_mensais_mes" id="fun_documentos_mensais_mes">
                                                                <option value="01">Janeiro</option>
                                                                <option value="02">Fevereiro</option>
                                                                <option value="03">Março</option>
                                                                <option value="04">Abril</option>
                                                                <option value="05">Maio</option>
                                                                <option value="06">Junho</option>
                                                                <option value="07">Julho</option>
                                                                <option value="08">Agosto</option>
                                                                <option value="09">Setembro</option>
                                                                <option value="10">Outubro</option>
                                                                <option value="11">Novembro</option>
                                                                <option value="12">Dezembro</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-12 col-md-4 col-lg-2 mb-3">
                                                            <label class="form-label">Ano</label>
                                                            <select class="form-select form-select-sm" name="fun_documentos_mensais_ano" id="fun_documentos_mensais_ano">
                                                                <option value="2025">2025</option>
                                                                <option value="2026">2026</option>
                                                                <option value="2027">2027</option>
                                                                <option value="2028">2028</option>
                                                                <option value="2029">2029</option>
                                                                <option value="2030">2030</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-12 col-md-4 col-lg-2 mb-3">
                                                            <label class="form-label">&nbsp;</label>
                                                            <div class="col-12">
                                                                <button type="button" class="btn btn-primary btn-sm" id="fun_documentos_mensais_botao_verificar" name="fun_documentos_mensais_botao_verificar" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-target="" data-bs-original-title="Verificar na Base de Dados se existe Documentos para essa referência.">Verificar</button>
                                                            </div>
                                                        </div>

                                                        <div class="row mt-3" id="div_documentos_mensais_files"></div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    @endif
                    <!-- Incluir Documentos Mensais END -->

                    <!-- Documentos Mensais -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_fun_div_documentos_mensais">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Documentos Mensais</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12">
                                        <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;GRADE DE DOCUMENTOS MENSAIS</h6>

                                        <div class="col-12 mb-5" id="fun_documentos_mensais_grade_botoes"></div>

                                        <div id="fun_documentos_mensais_grade">Nenhum documento mensal encontrado.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Documentos Mensais END -->

                    <!-- Cartão Emergencial -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_fun_div_cartao_emergencial">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-address-card"></i>&nbsp;&nbsp;Cartão Emergencial</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-4">
                                        <h6 class="col-12 mb-4"><i class="bx bx-card font-size-16"></i>&nbsp;&nbsp;PORTUGUÊS</h6>

                                        <div id="fun_cartao_emergencial_1">Cartão 1</div>
                                    </div>
                                    <div class="col-12 col-lg-2">&nbsp;</div>
                                    <div class="col-12 col-lg-4">
                                        <h6 class="col-12 mb-4"><i class="bx bx-card font-size-16"></i>&nbsp;&nbsp;INGLÊS</h6>

                                        <div id="fun_cartao_emergencial_2">Cartão 2</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Cartão Emergencial END -->

                </div>
            </div>
        </div>
    </div>
    @endif

    @if($se_prefixPermissaoSubmodulo == 'clientes')
    <!-- Cliente Modal Info -->
    <div class="modal fade" id="cliente_modal_info" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-light">
                <div class="modal-header" style="background-color: #2a3042;">
                    <!-- Header -->
                    <div class="row col-12">
                        <div class="col-8 order-1 order-lg-1 col-lg-4">
                            <div class="d-flex">
                                <div class="flex-shrink-0 me-3">
                                    <img src="build/assets/images/clientes/cliente-0.png" class="avatar-lg rounded-circle img-thumbnail clearClass" style="width: 100px; height: 100px; object-fit: contain; object-position: center; background-color: #f8f9fa;" id="mi_cli_logotipo">
                                </div>
                                <div class="flex-grow-1 align-self-center">
                                    <div>
                                        <h5 class="mb-2" style="color: #ffac31 !important;">INFORMAÇÕES CLIENTES</h5>
                                        <h6 class="mb-1" style="color: #ffffff !important;" id="mi_cli_header_nome"></h6>
                                        <div class="clearfix mt-2">
                                            <div class="dropdown">
                                                <button class="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i class="bx bxs-cog align-middle me-1"></i> Opções
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-start">
                                                    <a class="dropdown-item" href="#" onclick="clienteModalInfoControle(1);">Logotipos</a>
                                                    <a class="dropdown-item" href="#" onclick="clienteModalInfoControle(2);">Dados</a>

                                                    @if(\App\Facades\Permissoes::permissao(['clientes_edit']))
                                                    <a class="dropdown-item" href="#" onclick="clienteModalInfoEditarDocumentosCreate();">Editar Documentos</a>
                                                    @endif

                                                    @if(\App\Facades\Permissoes::permissao(['clientes_edit']))
                                                    <a class="dropdown-item" href="#" onclick="clienteModalInfoControle(13);">Editar Documentos Exigidos</a>
                                                    @endif

                                                    @if(\App\Facades\Permissoes::permissao(['clientes_edit']))
                                                    <a class="dropdown-item" href="#" onclick="clienteModalInfoEditarLojasCreate();">Editar Lojas</a>
                                                    @endif

                                                    @if(\App\Facades\Permissoes::permissao(['clientes_edit']))
                                                    <a class="dropdown-item" href="#" onclick="clienteModalInfoEditarSistemasPreventivosCreate();">Editar Sistemas Preventivos</a>
                                                    @endif

                                                    <div class="dropdown-divider"></div>
                                                    <a class="dropdown-item" href="#" data-bs-dismiss="modal">Fechar</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 order-3 order-lg-2 col-lg-8 align-self-center">
                            <div class="text-lg-center mt-4 mt-lg-0">
                                <div class="d-flex flex-wrap justify-content-start gap-2">
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="clienteModalInfoControle(1);">
                                        <h5 class="mb-0 small text-white">&nbsp;</h5>
                                        <span class="small text-white">Logotipos</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="clienteModalInfoControle(2);">
                                        <h5 class="mb-0 small text-white">&nbsp;</h5>
                                        <span class="small text-white">Dados</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="clienteModalInfoControle(3);">
                                        <h5 class="mb-0 small text-white" id="md_cli_estatisticas_documentos">0</h5>
                                        <span class="small text-white">Documentos</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="clienteModalInfoControle(14);">
                                        <h5 class="mb-0 small text-white" id="md_cli_estatisticas_documentos_exigidos">0</h5>
                                        <span class="small text-white">Documentos Exigidos</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="clienteModalInfoControle(16);">
                                        <h5 class="mb-0 small text-white">&nbsp;</h5>
                                        <span class="small text-white">Lojas</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="clienteModalInfoControle(18);">
                                        <h5 class="mb-0 small text-white" id="md_cli_estatisticas_sistemas_preventivos">0</h5>
                                        <span class="small text-white">Sistemas Preventivos</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="clienteModalInfoControle(7);">
                                        <h5 class="mb-0 small text-white" id="md_cli_estatisticas_propostas">0</h5>
                                        <span class="small text-white">Propostas</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="clienteModalInfoControle(8);">
                                        <h5 class="mb-0 small text-white" id="md_cli_estatisticas_ordens_servicos">0</h5>
                                        <span class="small text-white">Órdens Serviços</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="clienteModalInfoControle(9);">
                                        <h5 class="mb-0 small text-white" id="md_cli_estatisticas_visitas_tecnicas">0</h5>
                                        <span class="small text-white">Visitas Técnicas</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="clienteModalInfoControle(10);">
                                        <h5 class="mb-0 small text-white" id="md_cli_estatisticas_brigadas_incendios">0</h5>
                                        <span class="small text-white">Brigadas Incêndios</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="clienteModalInfoControle(11);">
                                        <h5 class="mb-0 small text-white" id="md_cli_estatisticas_clientes_rede">0</h5>
                                        <span class="small text-white">Da Rede</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="clienteModalInfoControle(12);">
                                        <h5 class="mb-0 small text-white" id="md_cli_estatisticas_clientes_principal">0</h5>
                                        <span class="small text-white">Do Principal</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Header END -->
                </div>
                <div class="modal-body d-lg-flex flex-lg-column flex-grow-1 px-4">
                    <!-- Cliente ID -->
                    <input type="hidden" id="mi_cli_cliente_id" name="mi_cli_cliente_id" value="0">

                    <!-- Logotipos -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_logotipos">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="bx bxs-file-plus"></i>&nbsp;&nbsp;Logotipos</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-3 pe-5">
                                        <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;LOGOTIPO PRINCIPAL</h6>
                                        <div class="col-12" style="height: 150px;">
                                            <img src="" alt="" class="img-fluid clearClass" style="max-height: 140px !important;" id="mi_cli_logotipo_principal">
                                        </div>
                                        @if(\App\Facades\Permissoes::permissao(['clientes_edit']))
                                        <form enctype="multipart/form-data" id="frm_upload_logotipo_principal_cli">
                                            <input type="hidden" id="upload_logotipo_principal_cliente_id" name="upload_logotipo_principal_cliente_id" value="">

                                            <div class="col-12 mb-2">
                                                <button type="button" class="btn btn-success btn-sm" id="frm_upload_logotipo_principal_cli_executar" name="frm_upload_logotipo_principal_cli_executar">Enviar Logotipo</button>
                                            </div>

                                            <div class="col-12 mb-3">
                                                <input type="file" class="form-control form-control-sm" name="cli_logotipo_principal_file" accept=".png, .jpg, .jpeg" id="cli_logotipo_principal_file">
                                            </div>
                                        </form>
                                        @endif
                                    </div>
                                    <div class="col-12 col-lg-3 pe-5">
                                        <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;LOGOTIPO RELATÓRIOS</h6>
                                        <div class="col-12" style="height: 150px;">
                                            <img src="" alt="" class="img-fluid clearClass" style="max-height: 140px !important;" id="mi_cli_logotipo_relatorios">
                                        </div>
                                        @if(\App\Facades\Permissoes::permissao(['clientes_edit']))
                                        <form enctype="multipart/form-data" id="frm_upload_logotipo_relatorios_cli">
                                            <input type="hidden" id="upload_logotipo_relatorios_cliente_id" name="upload_logotipo_relatorios_cliente_id" value="">

                                            <div class="col-12 mb-2">
                                                <button type="button" class="btn btn-success btn-sm" id="frm_upload_logotipo_relatorios_cli_executar" name="frm_upload_logotipo_relatorios_cli_executar">Enviar Logotipo</button>
                                            </div>

                                            <div class="col-12 mb-3">
                                                <input type="file" class="form-control form-control-sm" name="cli_logotipo_relatorios_file" accept=".png, .jpg, .jpeg" id="cli_logotipo_relatorios_file">
                                            </div>
                                        </form>
                                        @endif
                                    </div>
                                    <div class="col-12 col-lg-3 pe-5">
                                        <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;LOGOTIPO CARTÃO EMERGENCIAL</h6>
                                        <div class="col-12" style="height: 150px;">
                                            <img src="" alt="" class="img-fluid clearClass" style="max-height: 140px !important;" id="mi_cli_logotipo_cartao_emergencial">
                                        </div>
                                        @if(\App\Facades\Permissoes::permissao(['clientes_edit']))
                                        <form enctype="multipart/form-data" id="frm_upload_logotipo_cartao_emergencial_cli">
                                            <input type="hidden" id="upload_logotipo_cartao_emergencial_cliente_id" name="upload_logotipo_cartao_emergencial_cliente_id" value="">

                                            <div class="col-12 mb-2">
                                                <button type="button" class="btn btn-success btn-sm" id="frm_upload_logotipo_cartao_emergencial_cli_executar" name="frm_upload_logotipo_cartao_emergencial_cli_executar">Enviar Logotipo</button>
                                            </div>

                                            <div class="col-12 mb-3">
                                                <input type="file" class="form-control form-control-sm" name="cli_logotipo_cartao_emergencial_file" accept=".png, .jpg, .jpeg" id="cli_logotipo_cartao_emergencial_file">
                                            </div>
                                        </form>
                                        @endif
                                    </div>
                                    <div class="col-12 col-lg-3 pe-5">
                                        <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;LOGOTIPO MENU</h6>
                                        <div class="col-12" style="height: 150px;">
                                            <img src="" alt="" class="img-fluid clearClass" style="max-height: 140px !important;" id="mi_cli_logotipo_menu">
                                        </div>
                                        @if(\App\Facades\Permissoes::permissao(['clientes_edit']))
                                        <form enctype="multipart/form-data" id="frm_upload_logotipo_menu_cli">
                                            <input type="hidden" id="upload_logotipo_menu_cliente_id" name="upload_logotipo_menu_cliente_id" value="">

                                            <div class="col-12 mb-2">
                                                <button type="button" class="btn btn-success btn-sm" id="frm_upload_logotipo_menu_cli_executar" name="frm_upload_logotipo_menu_cli_executar">Enviar Logotipo</button>
                                            </div>

                                            <div class="col-12 mb-3">
                                                <input type="file" class="form-control form-control-sm" name="cli_logotipo_menu_file" accept=".png, .jpg, .jpeg" id="cli_logotipo_menu_file">
                                            </div>
                                        </form>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Logotipos END -->

                    <!-- Dados -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_dados">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-database"></i>&nbsp;&nbsp;Dados</h5>
                                <div class="row">
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">Status</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cli_status" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">Tipo</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cli_tipo" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">CPF/CNPJ</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cli_cpf_cnpj" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Nome') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cli_nome" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small" id="div_cli_dados_data">Data Nascimento</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cli_data_nascimento" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">Celular(s)</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cli_celulares" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">Telefone(s)</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cli_telefones" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Dados END -->

                    <!-- Editar Documentos -->
                    @if(\App\Facades\Permissoes::permissao(['clientes_edit']))
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_editar_documentos">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Editar Documentos</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12 pe-5">
                                        <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;EDIÇÃO DE DOCUMENTO</h6>
                                        <form enctype="multipart/form-data" id="frm_editar_documentos_cli">
                                            <input type="hidden" id="editar_documentos_cliente_id" name="editar_documentos_cliente_id" value="">
                                            <input type="hidden" id="cli_editar_documentos_cliente_documento_id" name="cli_editar_documentos_cliente_documento_id" value="0">
                                            <input type="hidden" id="cli_editar_documentos_operacao" name="cli_editar_documentos_operacao" value="create">

                                            <div class="col-12 mb-5">
                                                <button type="button" class="btn btn-success btn-sm" id="frm_editar_documentos_cli_botao_salvar_operacao" name="frm_editar_documentos_cli_botao_salvar_operacao">Salvar Operação</button>
                                            </div>

                                            <div class="row">
                                                <div class="col-12 col-lg-4 mb-3">
                                                    <label class="form-label">Edificação</label>
                                                    <select class="form-select form-select-sm" name="cli_editar_documentos_edificacao_id" id="cli_editar_documentos_edificacao_id">
                                                        <option value="">{{ __('Selecione...') }}</option>

                                                        @foreach ($edificacoes as $edificacao)
                                                        <option data-cliente_id="{{ $edificacao['cliente_id'] }}" value="{{ $edificacao['id'] }}">{{ $edificacao['name'] }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                <div class="col-12 col-lg-4 mb-3">
                                                    <label class="form-label">Documento (Nome)</label>
                                                    <select class="form-select form-select-sm" name="cli_editar_documentos_documento_id" id="cli_editar_documentos_documento_id">
                                                        <option value="">{{ __('Selecione...') }}</option>

                                                        @php
                                                        $currentFonte = null;
                                                        @endphp

                                                        @foreach ($documentos as $documento)
                                                        @php
                                                        $class = '';
                                                        if ($documento['documento_fonte_id'] == 1) {$class = 'pessoa_juridica';}
                                                        if ($documento['documento_fonte_id'] == 2) {$class = 'pessoa_fisica';}
                                                        if ($documento['documento_fonte_id'] == 3) {$class = 'pessoa_juridica';}
                                                        if ($documento['documento_fonte_id'] == 6) {$class = 'pessoa_juridica';}
                                                        if ($documento['documento_fonte_id'] == 7) {$class = 'pessoa_juridica';}
                                                        if ($documento['documento_fonte_id'] == 8) {$class = 'pessoa_juridica';}
                                                        if ($documento['documento_fonte_id'] == 9) {$class = 'pessoa_juridica';}
                                                        @endphp

                                                        {{-- Abre um novo grupo quando mudar de fonte --}}
                                                        @if ($currentFonte !== $documento['documento_fonte_id'])
                                                        @if ($currentFonte !== null)
                                                        </optgroup>
                                                        @endif
                                                        <optgroup label="{{ $documento['documentoFonteName'] }}">
                                                            @php
                                                            $currentFonte = $documento['documento_fonte_id'];
                                                            @endphp
                                                            @endif

                                                            <option class="{{ $class }}" value="{{ $documento['id'] }}">{{ $documento['name'] }}</option>
                                                            @endforeach

                                                            @if ($currentFonte !== null)
                                                        </optgroup>
                                                        @endif
                                                    </select>
                                                </div>
                                                <div class="col-12 col-lg-4 mb-3">
                                                    <label class="form-label">Documento (Descrição)</label>
                                                    <input type="text" class="form-control form-control-sm" name="cli_editar_documentos_descricao" id="cli_editar_documentos_descricao" placeholder="Descrição do Documento">
                                                </div>
                                                <div class="col-12 col-lg-4 mb-3">
                                                    <label class="form-label">
                                                        Aviso
                                                        <i class="fa fa-info-circle text-primary ms-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Avisar Cliente por E-mail depois da Data de Emissão."></i>
                                                    </label>
                                                    <select class="form-select form-select-sm" name="cli_editar_documentos_aviso" id="cli_editar_documentos_aviso">
                                                        <option value="0">Nenhum Aviso</option>
                                                        <option value="1">Avisar a cada 1 mês</option>
                                                        <option value="2">Avisar a cada 3 meses</option>
                                                        <option value="3">Avisar a cada 6 meses</option>
                                                        <option value="4">Avisar a cada 1 ano</option>
                                                        <option value="5">Avisar a cada 3 anos</option>
                                                        <option value="6">Avisar a cada 6 anos</option>
                                                    </select>
                                                </div>
                                                <div class="col-12 col-lg-4 mb-3">
                                                    <label class="form-label">Documento (Emissão)</label>
                                                    <input type="text" class="form-control form-control-sm mask_date" name="cli_editar_documentos_data_emissao" id="cli_editar_documentos_data_emissao" placeholder="Data de Emissão do Documento PDF">
                                                </div>
                                                <div class="col-12 col-lg-4 mb-3">
                                                    <label class="form-label">Documento (Vencimento)</label>
                                                    <input type="text" class="form-control form-control-sm mask_date" name="cli_editar_documentos_data_vencimento" id="cli_editar_documentos_data_vencimento" placeholder="Data de Vencimento do Documento PDF">
                                                </div>
                                                <div class="col-12 col-lg-4 mb-3">
                                                    <label class="form-label">Documento (Arquivo)</label>
                                                    <input type="file" class="form-control form-control-sm" name="cli_editar_documentos_file" id="cli_editar_documentos_file" accept=".pdf">
                                                    <div id="div_editar_documentos_pdf_atual">
                                                        <a href="" class="text-primary small" target="_blank" id="a_editar_documentos_pdf_atual">atual.pdf</a>
                                                        <small class="text-success">&nbsp;&nbsp;&nbsp;Envie um novo arquivo se quiser substituir o atual.</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    @endif
                    <!-- Editar Documentos END -->

                    <!-- Editar Documentos Exigidos -->
                    @if(\App\Facades\Permissoes::permissao(['clientes_edit']))
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_editar_documentos_exigidos">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Editar Documentos Exigidos</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12 pe-5">
                                        <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;EDITAR DOCUMENTOS EXIGIDOS</h6>

                                        <form id="frm_editar_documentos_exigidos_cli">
                                            <input type="hidden" id="editar_documentos_exigidos_cliente_id" name="editar_documentos_exigidos_cliente_id" value="">

                                            <div class="col-12 mb-5">
                                                <button type="button" class="btn btn-success btn-sm" id="frm_editar_documentos_exigidos_cli_executar" name="frm_editar_documentos_exigidos_cli_executar">Salvar Documentos Exigidos</button>
                                            </div>

                                            <div class="row" id="div_frm_editar_documentos_exigidos_cli_executar">
                                                @php
                                                // Agrupa os documentos por documentoFonteName
                                                $documentosExigidosAgrupados = collect($documentos)->groupBy('documentoFonteName');
                                                @endphp

                                                @foreach ($documentosExigidosAgrupados as $fonteName => $documentosExigidos)
                                                <div class="col-12 mb-3">
                                                    <h5 class="text-primary fw-bold small">{{ $fonteName }}</h5>

                                                    <div class="row">
                                                        @foreach ($documentosExigidos as $documentoExigido)
                                                        <div class="col-12 col-lg-3 mb-2">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" name="editar_documentos_exigidos_documentos_exigidos[]" id="editar_documentos_exigidos_documento_exigido_id_{{ $documentoExigido['id'] }}" value="{{ $documentoExigido['id'] }}">
                                                                <label class="form-check-label small" for="editar_documentos_exigidos_documento_exigido_id_{{ $documentoExigido['id'] }}">{{ strtoupper($documentoExigido['name']) }}</label>
                                                            </div>
                                                        </div>
                                                        @endforeach
                                                    </div>
                                                </div>
                                                @endforeach
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    @endif
                    <!-- Editar Documentos Exigidos END -->

                    <!-- Editar Lojas -->
                    @if(\App\Facades\Permissoes::permissao(['clientes_edit']))
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_editar_lojas">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Editar Lojas</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12 pe-5">
                                        <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;EDIÇÃO DE LOJA</h6>
                                        <form enctype="multipart/form-data" id="frm_editar_lojas_cli">
                                            <input type="hidden" id="editar_lojas_cliente_id" name="editar_lojas_cliente_id" value="">
                                            <input type="hidden" id="cli_editar_lojas_cliente_loja_id" name="cli_editar_lojas_cliente_loja_id" value="0">
                                            <input type="hidden" id="cli_editar_lojas_operacao" name="cli_editar_lojas_operacao" value="create">

                                            <div class="col-12 mb-5">
                                                <button type="button" class="btn btn-success btn-sm" id="frm_editar_lojas_cli_botao_salvar_operacao" name="frm_editar_lojas_cli_botao_salvar_operacao">Salvar Operação</button>
                                            </div>

                                            <div class="row">
                                                <div class="col-12 col-lg-4 mb-3">
                                                    <label class="form-label">Edificação Nível</label>
                                                    <select class="form-select form-select-sm" name="cli_editar_lojas_edificacao_nivel_id" id="cli_editar_lojas_edificacao_nivel_id">
                                                        <option value="">{{ __('Selecione...') }}</option>

                                                        @foreach ($edificacoes_niveis as $edificacao_nivel)
                                                        <option data-cliente_id="{{ $edificacao_nivel['clienteId'] }}" value="{{ $edificacao_nivel['id'] }}">{{ $edificacao_nivel['edificacaoName'] . ' - ' . $edificacao_nivel['name'] }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                <div class="col-12 col-lg-3 mb-3">
                                                    <label class="form-label">LUC (Loja de Unidade Comercial)</label>
                                                    <input type="text" class="form-control form-control-sm" name="cli_editar_lojas_luc" id="cli_editar_lojas_luc" placeholder="Nome da Loja">
                                                </div>
                                                <div class="col-12 col-lg-4 mb-3">
                                                    <label class="form-label">Cliente ocupando a LUC</label>
                                                    <select class="form-select form-select-sm" name="cli_editar_lojas_subordinado_cliente_id" id="cli_editar_lojas_subordinado_cliente_id">
                                                        <option value="">{{ __('Selecione...') }}</option>

                                                        @foreach ($clientes as $cliente)
                                                        <option data-principal_cliente_id="{{ $cliente['principal_cliente_id'] }}"     value="{{ $cliente['id'] }}">{{ $cliente['name'] }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                <div class="col-12 col-lg-1 mb-3">
                                                    <label class="form-label">Ordem</label>
                                                    <select class="form-select form-select-sm" name="cli_editar_lojas_ordem" id="cli_editar_lojas_ordem">
                                                        @for($i=0; $i<=300; $i++)
                                                        <option value="{{$i}}">{{$i}}</option>
                                                        @endfor
                                                    </select>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    @endif
                    <!-- Editar Lojas END -->

                    <!-- Editar Sistemas Preventivos -->
                    @if(\App\Facades\Permissoes::permissao(['clientes_edit']))
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_editar_sistemas_preventivos">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Editar Sistemas Preventivos</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12 pe-5">
                                        <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;EDIÇÃO DE SISTEMAS PREVENTIVOS</h6>
                                        <form enctype="multipart/form-data" id="frm_editar_sistemas_preventivos_cli">
                                            <input type="hidden" id="editar_sistemas_preventivos_cliente_id" name="editar_sistemas_preventivos_cliente_id" value="">
                                            <input type="hidden" id="cli_editar_sistemas_preventivos_cliente_sistema_preventivo_id" name="cli_editar_sistemas_preventivos_cliente_sistema_preventivo_id" value="0">
                                            <input type="hidden" id="cli_editar_sistemas_preventivos_operacao" name="cli_editar_sistemas_preventivos_operacao" value="create">

                                            <div class="col-12 mb-5">
                                                <button type="button" class="btn btn-success btn-sm" id="frm_editar_sistemas_preventivos_cli_botao_salvar_operacao" name="frm_editar_sistemas_preventivos_cli_botao_salvar_operacao">Salvar Operação</button>
                                            </div>

                                            <div class="row">
                                                <div class="col-12 col-lg-4 mb-3">
                                                    <label class="form-label">Edificação Local</label>
                                                    <select class="form-select form-select-sm" name="cli_editar_sistemas_preventivos_edificacao_local_id" id="cli_editar_sistemas_preventivos_edificacao_local_id">
                                                        <option value="">{{ __('Selecione...') }}</option>

                                                        @foreach ($edificacoes_locais as $edificacao_local)
                                                        <option data-cliente_id="{{ $edificacao_local['clienteId'] }}" value="{{ $edificacao_local['id'] }}">{{ $edificacao_local['edificacaoName'] . ' - ' . $edificacao_local['edificacaoNivelName'] . ' - ' . $edificacao_local['name'] }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                <div class="col-12 col-lg-4 mb-3">
                                                    <label class="form-label">Sistema Preventivo</label>
                                                    <select class="form-select form-select-sm" name="cli_editar_sistemas_preventivos_sistema_preventivo_id" id="cli_editar_sistemas_preventivos_sistema_preventivo_id">
                                                        <option value="">{{ __('Selecione...') }}</option>

                                                        @foreach ($sistemas_preventivos as $sistema_preventivo)
                                                        <option value="{{ $sistema_preventivo['id'] }}">{{ $sistema_preventivo['name'] }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                <div class="col-12 col-lg-4 mb-3">
                                                    <label class="form-label">Sistema Preventivo (Descrição)</label>
                                                    <input type="text" class="form-control form-control-sm" name="cli_editar_sistemas_preventivos_descricao" id="cli_editar_sistemas_preventivos_descricao" placeholder="Descrição do Sistema Preventivo">
                                                </div>
                                                <div class="col-12 col-lg-4 mb-3">
                                                    <label class="form-label">Sistema Preventivo (Número)</label>
                                                    <input type="text" class="form-control form-control-sm" name="cli_editar_sistemas_preventivos_sistema_preventivo_numero" id="cli_editar_sistemas_preventivos_sistema_preventivo_numero" placeholder="Número do Sistema Preventivo">
                                                </div>
                                                <div class="col-12 col-lg-4 mb-3">
                                                    <label class="form-label">Sistema Preventivo (Fotografia)</label>
                                                    <input type="file" class="form-control form-control-sm" name="cli_editar_sistemas_preventivos_fotografia" id="cli_editar_sistemas_preventivos_fotografia" accept=".png, .jpg, .jpeg">
                                                    <div id="div_editar_sistemas_preventivos_fotografia_atual">
                                                        <a href="" class="text-primary small" target="_blank" id="a_editar_sistemas_preventivos_fotografia_atual">atual.pdf</a>
                                                        <small class="text-success">&nbsp;&nbsp;&nbsp;Envie uma nova fotografia se quiser substituir a atual.</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    @endif
                    <!-- Editar Sistemas Preventivos END -->

                    <!-- Documentos -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_documentos">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Documentos</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12">
                                        <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;GRADE DE DOCUMENTOS</h6>

                                        <div class="col-12 mb-5" id="cli_documentos_grade_botoes"></div>

                                        <div id="cli_documentos_grade">Nenhum documento encontrado.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Documentos END -->

                    <!-- Documentos Exigidos -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_documentos_exigidos">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Documentos Exigidos</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12">
                                        <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;GRADE DE DOCUMENTOS EXIGIDOS</h6>

                                        <div class="col-12 mb-5" id="cli_documentos_exigidos_grade_botoes"></div>

                                        <div id="cli_documentos_exigidos_grade">Nenhum documento exigido encontrado.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Documentos Exigidos END -->

                    <!-- Lojas -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_lojas">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Lojas</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12">
                                        <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;GRADE DE LOJAS</h6>

                                        <div class="col-12 mb-5" id="cli_lojas_grade_botoes"></div>

                                        <div id="cli_lojas_grade">Nenhuma loja encontrada.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Lojas END -->

                    <!-- Sistemas Preventivos -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_sistemas_preventivos">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Sistemas Preventivos</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12">
                                        <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;GRADE DE SISTEMAS PREVENTIVOS</h6>

                                        <div class="col-12 mb-5" id="cli_sistemas_preventivos_grade_botoes"></div>

                                        <div id="cli_sistemas_preventivos_grade">Nenhum sistema prevetivo encontrado.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Sistemas Preventivos END -->

                    <!-- Propostas -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_propostas">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-toolbox"></i>&nbsp;&nbsp;Propostas</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12">
                                        <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;GRADE DE PROPOSTAS</h6>
                                        <div id="cli_propostas_grade">Nenhum registro encontrado.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Propostas END -->

                    <!-- Órdens Serviços -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_ordens_servicos">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-toolbox"></i>&nbsp;&nbsp;Órdens Serviços</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12">
                                        <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;GRADE DE ORDENS SERVIÇOS</h6>
                                        <div id="cli_ordens_servicos_grade">Nenhum registro encontrado.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Órdens Serviços END -->

                    <!-- Visitas Técnicas -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_visitas_tecnicas">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-toolbox"></i>&nbsp;&nbsp;Visitas Técnicas</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12">
                                        <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;GRADE DE VISITAS TÉCNICAS</h6>
                                        <div id="cli_visitas_tecnicas_grade">Nenhum registro encontrado.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Visitas Técnicas END -->

                    <!-- Brigadas Incêndios -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_brigadas_incendios">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-toolbox"></i>&nbsp;&nbsp;Brigadas Incêndios</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12">
                                        <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;GRADE DE BRIGADAS INCÊNDIOS</h6>
                                        <div id="cli_brigadas_incendios_grade">Nenhum registro encontrado.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Brigadas Incêndios END -->

                    <!-- Clientes Rede -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_clientes_rede">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-toolbox"></i>&nbsp;&nbsp;Clientes Rede</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12">
                                        <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;GRADE DE CLIENTES REDE</h6>
                                        <div id="cli_clientes_rede_grade">Nenhum registro encontrado.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Clientes Rede END -->

                    <!-- Clientes Principal -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_clientes_principal">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-toolbox"></i>&nbsp;&nbsp;Clientes Principal</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12">
                                        <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;GRADE DE CLIENTES PRINCIPAL</h6>
                                        <div id="cli_clientes_principal_grade">Nenhum registro encontrado.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Clientes Principal END -->
                </div>
            </div>
        </div>
    </div>
    @endif

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

    @if($se_prefixPermissaoSubmodulo == 'clientes_executivos')
    <!-- Cliente Executivo Modal Info -->
    <div class="modal fade" id="cliente_executivo_modal_info" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-light">
                <div class="modal-header" style="background-color: #2a3042;">
                    <!-- Header -->
                    <div class="row col-12">
                        <div class="col-8 order-1 order-lg-1 col-lg-4">
                            <div class="d-flex">
                                <div class="flex-shrink-0 me-3">
                                    <img src="build/assets/images/clientes_executivos/cliente_executivo-0.png" class="avatar-lg rounded-circle img-thumbnail clearClass" style="width: 100px; height: 100px; object-fit: contain; object-position: center; background-color: #f8f9fa;" id="mi_cex_fotografia">
                                </div>
                                <div class="flex-grow-1 align-self-center">
                                    <div>
                                        <h5 class="mb-2" style="color: #ffac31 !important;">INFORMAÇÕES CLIENTES EXECUTIVOS</h5>
                                        <h6 class="mb-1" style="color: #ffffff !important;" id="mi_cex_header_nome"></h6>
                                        <div class="clearfix mt-2">
                                            <div class="dropdown">
                                                <button class="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i class="bx bxs-cog align-middle me-1"></i> Opções
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-start">
                                                    <a class="dropdown-item" href="#" onclick="clienteExecutivoModalInfoControle(1);">Fotografias</a>
                                                    <a class="dropdown-item" href="#" onclick="clienteExecutivoModalInfoControle(2);">Dados</a>

                                                    @if(\App\Facades\Permissoes::permissao(['clientes_executivos_edit']))
                                                    <a class="dropdown-item" href="#" onclick="clienteExecutivoModalInfoControle(5);">Incluir Documentos</a>
                                                    @endif

                                                    <div class="dropdown-divider"></div>
                                                    <a class="dropdown-item" href="#" data-bs-dismiss="modal">Fechar</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 order-3 order-lg-2 col-lg-8 align-self-center">
                            <div class="text-lg-center mt-4 mt-lg-0">
                                <div class="d-flex flex-wrap justify-content-start gap-2">
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="clienteExecutivoModalInfoControle(1);">
                                        <h5 class="mb-0 small text-white">&nbsp;</h5>
                                        <span class="small text-white">Fotografias</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="clienteExecutivoModalInfoControle(2);">
                                        <h5 class="mb-0 small text-white">&nbsp;</h5>
                                        <span class="small text-white">Dados</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="clienteExecutivoModalInfoControle(3);">
                                        <h5 class="mb-0 small text-white" id="md_cex_estatisticas_documentos">0</h5>
                                        <span class="small text-white">Documentos</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning flex-fill text-center py-2" onclick="clienteExecutivoModalInfoControle(6);">
                                        <h5 class="mb-0 small text-white">0</h5>
                                        <span class="small text-white">Cartão Emergencial</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Header END -->
                </div>
                <div class="modal-body d-lg-flex flex-lg-column flex-grow-1 px-4">
                    <!-- Cliente Executivo ID -->
                    <input type="hidden" id="mi_cex_cliente_executivo_id" name="mi_cex_cliente_executivo_id" value="0">

                    <!-- Fotografias -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cex_div_fotografias">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="bx bxs-file-plus"></i>&nbsp;&nbsp;Fotografias</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-6 pe-5">
                                        <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;FOTOGRAFIA DOCUMENTO</h6>
                                        <div class="col-12" style="height: 150px;">
                                            <img src="" alt="" class="img-fluid clearClass" style="max-height: 140px !important;" id="mi_cex_fotografia_documento">
                                        </div>

                                        @if(\App\Facades\Permissoes::permissao(['clientes_executivos_edit']))
                                        <form enctype="multipart/form-data" id="frm_upload_fotografia_documento_cex">
                                            <input type="hidden" id="upload_fotografia_documento_cliente_executivo_id" name="upload_fotografia_documento_cliente_executivo_id" value="">

                                            <div class="col-12 mb-2">
                                                <button type="button" class="btn btn-success btn-sm" id="frm_upload_fotografia_documento_cex_executar" name="frm_upload_fotografia_documento_cex_executar">Enviar Fotografia</button>
                                            </div>

                                            <div class="col-12 mb-3">
                                                <input type="file" class="form-control form-control-sm" name="cex_fotografia_documento_file" accept=".png, .jpg, .jpeg" id="cex_fotografia_documento_file">
                                            </div>
                                        </form>
                                        @endif
                                    </div>
                                    <div class="col-12 col-lg-6 pe-5">
                                        <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;FOTOGRAFIA CARTÃO EMERGENCIAL</h6>
                                        <div class="col-12" style="height: 150px;">
                                            <img src="" alt="" class="img-fluid clearClass" style="max-height: 140px !important;" id="mi_cex_fotografia_cartao_emergencial">
                                        </div>

                                        @if(\App\Facades\Permissoes::permissao(['clientes_executivos_edit']))
                                        <form enctype="multipart/form-data" id="frm_upload_fotografia_cartao_emergencial_cex">
                                            <input type="hidden" id="upload_fotografia_cartao_emergencial_cliente_executivo_id" name="upload_fotografia_cartao_emergencial_cliente_executivo_id" value="">

                                            <div class="col-12 mb-2">
                                                <button type="button" class="btn btn-success btn-sm" id="frm_upload_fotografia_cartao_emergencial_cex_executar" name="frm_upload_fotografia_cartao_emergencial_cex_executar">Enviar Fotografia</button>
                                            </div>

                                            <div class="col-12 mb-3">
                                                <input type="file" class="form-control form-control-sm" name="cex_fotografia_cartao_emergencial_file" accept=".png, .jpg, .jpeg" id="cex_fotografia_cartao_emergencial_file">
                                            </div>
                                        </form>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Fotografias END -->

                    <!-- Dados -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cex_div_dados">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-database"></i>&nbsp;&nbsp;Dados</h5>
                                <div class="row">
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Nome') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cex_nome" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('CPF') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cex_cpf" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">Cliente</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cex_cliente" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Função') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cex_funcao" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Nome Profissional') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cex_nome_profissional" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small" id="div_cex_dados_data">{{ __('Nascimento') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cex_data_nascimento" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Gênero') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cex_genero" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Celular 1') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cex_celular_1" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Celular 2') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cex_celular_2" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Telefone 1') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cex_telefone_1" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Telefone 2') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cex_telefone_2" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('E-mail') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_cex_email" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Dados END -->

                    <!-- Incluir Documentos -->
                    @if(\App\Facades\Permissoes::permissao(['clientes_executivos_edit']))
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cex_div_incluir_documentos">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Incluir Documentos</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12 pe-5">
                                        <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;INCLUSÃO DE DOCUMENTO</h6>
                                        <form enctype="multipart/form-data" id="frm_upload_documentos_cex">
                                            <input type="hidden" id="upload_documentos_cliente_executivo_id" name="upload_documentos_cliente_executivo_id" value="">

                                            <div class="col-12 mb-5">
                                                <button type="button" class="btn btn-success btn-sm" id="frm_upload_documentos_cex_executar" name="frm_upload_documentos_cex_executar">Incluir Documento</button>
                                            </div>
                                            <div class="row" id="div_frm_upload_documentos_cex_executar">
                                                <div class="col-12 col-lg-3 mb-3">
                                                    <label class="form-label">Documento (Nome)</label>
                                                    <select class="form-select form-select-sm" name="cex_documentos_documento_id" id="cex_documentos_documento_id">
                                                        <option value="">{{ __('Selecione...') }}</option>
                                                        @php
                                                        $currentFonte = null;
                                                        @endphp

                                                        @foreach ($documentos as $documento)
                                                        @php
                                                        $class = '';
                                                        if ($documento['documento_fonte_id'] == 1) {$class = 'pessoa_juridica';}
                                                        if ($documento['documento_fonte_id'] == 2) {$class = 'pessoa_fisica';}
                                                        if ($documento['documento_fonte_id'] == 3) {$class = 'pessoa_juridica';}
                                                        @endphp

                                                        {{-- Abre um novo grupo quando mudar de fonte --}}
                                                        @if ($currentFonte !== $documento['documento_fonte_id'])
                                                        @if ($currentFonte !== null)
                                                        </optgroup>
                                                        @endif
                                                        <optgroup label="{{ $documento['documentoFonteName'] }}">
                                                            @php
                                                            $currentFonte = $documento['documento_fonte_id'];
                                                            @endphp
                                                            @endif

                                                            <option class="{{ $class }}" value="{{ $documento['id'] }}">{{ $documento['name'] }}</option>
                                                            @endforeach

                                                            @if ($currentFonte !== null)
                                                        </optgroup>
                                                        @endif
                                                    </select>
                                                </div>
                                                <div class="col-12 col-lg-3 mb-3">
                                                    <label class="form-label">Documento (Emissão)</label>
                                                    <input type="text" class="form-control form-control-sm mask_date" name="cex_documentos_data_emissao" id="cex_documentos_data_emissao" placeholder="Data de Emissão do Documento PDF">
                                                </div>
                                                <div class="col-12 col-lg-3 mb-3">
                                                    <label class="form-label">Documento (Vencimento)</label>
                                                    <input type="text" class="form-control form-control-sm mask_date" name="cex_documentos_data_vencimento" id="cex_documentos_data_vencimento" placeholder="Data de Vencimento do Documento PDF">
                                                </div>
                                                <div class="col-12 col-lg-3 mb-3">
                                                    <label class="form-label">
                                                        Aviso
                                                        <i class="fa fa-info-circle text-primary ms-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Avisar Cliente Executivo por E-mail depois da Data de Emissão."></i>
                                                    </label>
                                                    <select class="form-select form-select-sm" name="cex_documentos_aviso" id="cex_documentos_aviso">
                                                        <option value="0">Nenhum Aviso</option>
                                                        <option value="1">Avisar a cada 1 mês</option>
                                                        <option value="2">Avisar a cada 3 meses</option>
                                                        <option value="3">Avisar a cada 6 meses</option>
                                                        <option value="4">Avisar a cada 1 ano</option>
                                                        <option value="5">Avisar a cada 3 anos</option>
                                                        <option value="6">Avisar a cada 6 anos</option>
                                                    </select>
                                                </div>
                                                <div class="col-12 col-lg-3 mb-3">
                                                    <label class="form-label">Documento (Arquivo)</label>
                                                    <input type="file" class="form-control form-control-sm" name="cex_documentos_file" id="cex_documentos_file" accept=".pdf">
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    @endif
                    <!-- Incluir Documentos END -->

                    <!-- Documentos -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cex_div_documentos">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Documentos</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-12">
                                        <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;GRADE DE DOCUMENTOS</h6>

                                        <div class="col-12 mb-5" id="cex_documentos_grade_botoes"></div>

                                        <div id="cex_documentos_grade">Nenhum documento encontrado.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Documentos END -->

                    <!-- Cartão Emergencial -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_cex_div_cartao_emergencial">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-address-card"></i>&nbsp;&nbsp;Cartão Emergencial</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-4">
                                        <h6 class="col-12 mb-4"><i class="bx bx-card font-size-16"></i>&nbsp;&nbsp;PORTUGUÊS</h6>

                                        <div id="cex_cartao_emergencial_1">Cartão 1</div>
                                    </div>
                                    <div class="col-12 col-lg-2">&nbsp;</div>
                                    <div class="col-12 col-lg-4">
                                        <h6 class="col-12 mb-4"><i class="bx bx-card font-size-16"></i>&nbsp;&nbsp;INGLÊS</h6>

                                        <div id="cex_cartao_emergencial_2">Cartão 2</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Cartão Emergencial END -->

                </div>
            </div>
        </div>
    </div>
    @endif

    @if($se_prefixPermissaoSubmodulo == 'produtos')
    <!-- Produto Modal Info -->
    <div class="modal fade" id="produto_modal_info" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-light">
                <div class="modal-header" style="background-color: #2a3042;">
                    <!-- Header -->
                    <div class="row col-12">
                        <div class="col-8 order-1 order-lg-1 col-lg-4">
                            <div class="d-flex">
                                <div class="flex-shrink-0 me-3">
                                    <img src="build/assets/images/produtos/produto-0.png" class="avatar-lg rounded-circle img-thumbnail clearClass" style="width: 100px; height: 100px; object-fit: contain; object-position: center; background-color: #f8f9fa;" id="mi_pro_fotografia_header">
                                </div>
                                <div class="flex-grow-1 align-self-center">
                                    <div>
                                        <h5 class="mb-2" style="color: #ffac31 !important;">INFORMAÇÕES PRODUTOS</h5>
                                        <h6 class="mb-1" style="color: #ffffff !important;" id="mi_pro_header_nome"></h6>
                                        <div class="clearfix mt-2">
                                            <div class="dropdown">
                                                <button class="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i class="bx bxs-cog align-middle me-1"></i> Opções
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-start">
                                                    <a class="dropdown-item" href="#" onclick="produtoModalInfoControle(1);">Fotografias</a>
                                                    <a class="dropdown-item" href="#" onclick="produtoModalInfoControle(2);">Dados</a>
                                                    <div class="dropdown-divider"></div>
                                                    <a class="dropdown-item" href="#" data-bs-dismiss="modal">Fechar</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 order-3 order-lg-2 col-lg-8 align-self-center">
                            <div class="text-lg-center mt-4 mt-lg-0">
                                <div class="row text-center font-size-12"></div>
                            </div>
                        </div>
                    </div>
                    <!-- Header END -->
                </div>
                <div class="modal-body d-lg-flex flex-lg-column flex-grow-1 px-4">
                    <!-- Produto ID -->
                    <input type="hidden" id="mi_pro_produto_id" name="mi_pro_produto_id" value="0">

                    <!-- Fotografias -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_pro_div_fotografias">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="bx bxs-file-plus"></i>&nbsp;&nbsp;Fotografias</h5>

                                <div class="row">
                                    <div class="col-12 col-lg-6 pe-5">
                                        <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;FOTOGRAFIA</h6>
                                        <div class="col-12" style="height: 270px;">
                                            <img src="" alt="" class="img-fluid clearClass" style="max-height: 250px !important;" id="mi_pro_fotografia">
                                        </div>

                                        @if(\App\Facades\Permissoes::permissao(['produtos_edit']))
                                        <form enctype="multipart/form-data" id="frm_upload_fotografia_pro">
                                            <input type="hidden" id="upload_fotografia_produto_id" name="upload_fotografia_produto_id" value="">

                                            <div class="col-12 mb-2">
                                                <button type="button" class="btn btn-success btn-sm" id="frm_upload_fotografia_pro_executar" name="frm_upload_fotografia_pro_executar">Enviar Fotografia</button>
                                            </div>

                                            <div class="col-12 mb-3">
                                                <input type="file" class="form-control form-control-sm" name="pro_fotografia_file" accept=".png, .jpg, .jpeg" id="pro_fotografia_file">
                                            </div>
                                        </form>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Fotografias END -->

                    <!-- Dados -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_pro_div_dados">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-database"></i>&nbsp;&nbsp;Dados</h5>
                                <div class="row">
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Categoria') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_pro_categoria" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Nome') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_pro_nome" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('COR') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_pro_cor" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('CA') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_pro_ca" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('DESCRIÇÃO') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_pro_descricao" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Dados END -->

                </div>
            </div>
        </div>
    </div>
    @endif

    @if($se_prefixPermissaoSubmodulo == 'produtos_entradas')
    <!-- Produto Entrada Modal Info -->
    <div class="modal fade" id="produto_entrada_modal_info" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-light">
                <div class="modal-header" style="background-color: #2a3042;">
                    <!-- Header -->
                    <div class="row col-12">
                        <div class="col-12 order-1 order-lg-1 col-lg-3">
                            <div class="d-flex">
                                <div class="flex-grow-1 align-self-center">
                                    <div>
                                        <h5 class="mb-2" style="color: #ffac31 !important;">INFORMAÇÕES PRODUTOS ENTRADAS</h5>
                                        <h6 class="mb-1" style="color: #ffffff !important;" id="mi_men_header_nome"></h6>
                                        <div class="clearfix mt-2">
                                            <div class="dropdown">
                                                <button class="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i class="bx bxs-cog align-middle me-1"></i> Opções
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-start">
                                                    <a class="dropdown-item" href="#" onclick="produtoEntradaModalInfoControle(1);">Dados</a>
                                                    <a class="dropdown-item" href="#" onclick="produtoEntradaModalInfoControle(2);">Nota Fiscal</a>
                                                    <div class="dropdown-divider"></div>
                                                    <a class="dropdown-item" href="#" data-bs-dismiss="modal">Fechar</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 order-3 order-lg-2 col-lg-9 align-self-center">
                            <div class="text-lg-center mt-4 mt-lg-0">
                                <div class="row text-center font-size-12">&nbsp;</div>
                            </div>
                        </div>
                    </div>
                    <!-- Header END -->
                </div>
                <div class="modal-body d-lg-flex flex-lg-column flex-grow-1 px-4">
                    <!-- Produto Entrada ID -->
                    <input type="hidden" id="mi_men_produto_entrada_id" name="mi_men_produto_entrada_id" value="0">

                    <!-- Dados -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_men_div_dados">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-database"></i>&nbsp;&nbsp;Dados</h5>
                                <div class="row">
                                    <div class="col-lg-9 mb-3">
                                        <label class="form-label small">{{ __('Empresa') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_men_empresa_nome" readonly>
                                    </div>
                                    <div class="col-lg-9 mb-3">
                                        <label class="form-label small">{{ __('Fornecedor') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_men_fornecedor_nome" readonly>
                                    </div>
                                    <div class="col-lg-3 mb-3">
                                        <label class="form-label small">{{ __('Fornecedor CNPJ') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_men_fornecedor_cnpj" readonly>
                                    </div>
                                    <div class="col-lg-2 mb-3">
                                        <label class="form-label small">{{ __('NF Número') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_men_nf_numero" readonly>
                                    </div>
                                    <div class="col-lg-2 mb-3">
                                        <label class="form-label small">{{ __('NF Série') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_men_nf_serie" readonly>
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label small">{{ __('NF Chave Acesso') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_men_nf_chave_acesso" readonly>
                                    </div>
                                    <div class="col-lg-2 mb-3">
                                        <label class="form-label small">{{ __('Data emissão') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_men_data_emissao" readonly>
                                    </div>
                                    <div class="col-lg-2 mb-3">
                                        <label class="form-label small">{{ __('Valor Desconto') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_men_valor_desconto" readonly>
                                    </div>
                                    <div class="col-lg-2 mb-3">
                                        <label class="form-label small">{{ __('Valor Total da Nota') }}</label>
                                        <input type="text" class="form-control form-control-sm clearClass" id="mi_men_valor_total" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Dados END -->

                    <!-- Nota Fiscal -->
                    <div class="row d-lg-flex flex-lg-grow-1" id="md_men_div_nota_fiscal">
                        <div class="card mb-0">
                            <div class="card-body">
                                <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Nota Fiscal</h5>

                                <div class="row">
                                    @if(\App\Facades\Permissoes::permissao(['produtos_entradas_edit']))
                                    <div class="col-12 col-lg-12 pe-5">
                                        <div class="row">
                                            <div class="col-12 col-md-4 col-lg-4">
                                                <form enctype="multipart/form-data" id="frm_upload_nota_fiscal_men">
                                                    <input type="hidden" id="upload_nota_fiscal_produto_entrada_id" name="upload_nota_fiscal_produto_entrada_id" value="">

                                                    <div class="col-12 mb-5">
                                                        <button type="button" class="btn btn-success btn-sm" id="frm_upload_nota_fiscal_men_executar" name="frm_upload_nota_fiscal_men_executar">Incluir Nota Fiscal</button>
                                                    </div>
                                                    <div class="row" id="div_frm_upload_nota_fiscal_men_executar">
                                                        <div class="col-12 mb-3">
                                                            <label class="form-label">Nota Fiscal (Arquivo)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-danger" id="label_mem_nota_fiscal_arquivo"></span></label>
                                                            <input type="file" class="form-control form-control-sm" name="men_nota_fiscal_file" id="men_nota_fiscal_file" accept=".pdf">
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="col-12 col-md-8 col-lg-8 d-flex justify-content-center align-items-center">
                                                <div class="col-8" id="div_mem_mostrar_pdf" style="height: 400px;"></div>
                                            </div>
                                        </div>
                                    </div>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Nota Fiscal END -->

                </div>
            </div>
        </div>
    </div>
    @endif
</div>
