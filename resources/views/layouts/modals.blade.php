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

                                            <form method="post" enctype="multipart/form-data" id="frm_upload_avatar">
                                                @csrf
                                                @method('POST')

                                                <input type="hidden" class="jsonUserId" id="upload_avatar_user_id" name="upload_avatar_user_id" value="">

                                                <div class="row mt-4">
                                                    <div class="input-group">
                                                        <input type="file" class="form-control" name="avatar_file" accept=".png, .jpg, .jpeg" id="avatar_file">
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
                                        <img src="build/assets/images/funcionarios/funcionario-0.png" alt="" class="avatar-lg rounded-circle img-thumbnail clearClass" id="mi_fun_fotografia">
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
                                                    <div class="dropdown-menu dropdown-menu-end">
                                                        <a class="dropdown-item" href="#" onclick="funcionarioModalInfoControle(1);">Fotografias</a>
                                                        <a class="dropdown-item" href="#" onclick="funcionarioModalInfoControle(2);">Dados</a>
                                                        <a class="dropdown-item" href="#" onclick="funcionarioModalInfoControle(5);">Incluir Documentos</a>
                                                        <a class="dropdown-item" href="#" onclick="funcionarioModalInfoControle(3);">Documentos</a>
                                                        <a class="dropdown-item" href="#" onclick="funcionarioModalInfoControle(8);">Incluir Documentos Mensais</a>
                                                        <a class="dropdown-item" href="#" onclick="funcionarioModalInfoControle(7);">Documentos Mensais</a>
                                                        <a class="dropdown-item" href="#" onclick="funcionarioModalInfoControle(4);">Tomadores de Serviços</a>
                                                        <a class="dropdown-item" href="#" onclick="funcionarioModalInfoControle(6);">Cartão Emergencial</a>
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
                                    <div class="row text-center font-size-12">
                                        <div class="col-4 col-lg-3">
                                            <div>
                                                <p class="text-truncate mb-2" style="color: #ffac31;">Documentos</p>
                                                <h5 class="mb-0" style="color: #ffffff;" id="md_fun_estatisticas_documentos">0</h5>
                                            </div>
                                        </div>
                                        <div class="col-4 col-lg-3">
                                            <div>
                                                <p class="text-truncate mb-2" style="color: #ffac31;">Tomadores de Serviços</p>
                                                <h5 class="mb-0" style="color: #ffffff;" id="md_fun_estatisticas_tomadores_servicos">0</h5>
                                            </div>
                                        </div>
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
                                            <label class="form-label small">{{ __('Tomador de Serviço') }}</label>
                                            <input type="text" class="form-control form-control-sm clearClass" id="mi_fun_tomador_servico" readonly>
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
                        <div class="row d-lg-flex flex-lg-grow-1" id="md_fun_div_incluir_documentos">
                            <div class="card mb-0">
                                <div class="card-body">
                                    <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Incluir Documentos</h5>

                                    <div class="row">
                                        @if(\App\Facades\Permissoes::permissao(['funcionarios_edit']))
                                            <div class="col-12 col-lg-12 pe-5">
                                                <div class="row">
                                                    <div class="col-12 col-md-12 col-lg-12">
                                                        <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;INCLUSÃO DE DOCUMENTO</h6>
                                                        <form enctype="multipart/form-data" id="frm_upload_documentos_fun">
                                                            <input type="hidden" id="upload_documentos_funcionario_id" name="upload_documentos_funcionario_id" value="">

                                                            <!-- Ação do Formulário: 1(create) 2(edit) 3(update) 4(delete) -->
                                                            <input type="hidden" id="upload_documentos_fun_acao" name="upload_documentos_fun_acao" value="1">

                                                            <div class="col-12 mb-5">
                                                                <button type="button" class="btn btn-success btn-sm" id="frm_upload_documentos_fun_executar" name="frm_upload_documentos_fun_executar">Incluir Documento</button>
                                                            </div>
                                                            <div class="row" id="div_frm_upload_documentos_fun_executar">
                                                                <div class="col-12 mb-3">
                                                                    <label class="form-label">Documento (Nome)</label>
                                                                    <select class="form-select form-select-sm" name="fun_documentos_documento_id" id="fun_documentos_documento_id">
                                                                        <option value="">{{ __('Selecione...') }}</option>

                                                                        @foreach ($documentos as $documento)
                                                                            @php
                                                                                $class = '';
                                                                                if ($documento['documento_fonte_id'] == 1) {$class = 'pessoa_juridica';}
                                                                                if ($documento['documento_fonte_id'] == 2) {$class = 'pessoa_fisica';}
                                                                                if ($documento['documento_fonte_id'] == 3) {$class = 'pessoa_juridica';}
                                                                            @endphp

                                                                            <option class="{{ $class }}" value="{{ $documento['id'] }}">{{ $documento['name'] }}</option>
                                                                        @endforeach
                                                                    </select>
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <label class="form-label">Data Documento</label>
                                                                    <input type="text" class="form-control form-control-sm mask_date" name="fun_documentos_data_documento" id="fun_documentos_data_documento" placeholder="Data do Documento PDF">
                                                                </div>
                                                                <div class="col-12 mb-3">
                                                                    <label class="form-label">Aviso</label>
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
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        <div class="row d-lg-flex flex-lg-grow-1" id="md_fun_div_incluir_documentos_mensais">
                            <div class="card mb-0">
                                <div class="card-body">
                                    <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Incluir Documentos Mensais</h5>

                                    <div class="row">
                                        @if(\App\Facades\Permissoes::permissao(['funcionarios_edit']))
                                            <div class="col-12 col-lg-12 pe-5">
                                                <div class="row">
                                                    <div class="col-12 col-md-12 col-lg-12 mt-5 mt-lg-0 ps-lg-5">
                                                        <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;INCLUSÃO DE DOCUMENTO MENSAIS</h6>
                                                        <form enctype="multipart/form-data" id="frm_upload_documentos_mensais_fun">
                                                            <input type="hidden" id="upload_documentos_mensais_funcionario_id" name="upload_documentos_mensais_funcionario_id" value="">

                                                            <!-- Ação do Formulário: 1(create) 2(edit) 3(update) 4(delete) -->
                                                            <input type="hidden" id="upload_documentos_mensais_fun_acao" name="upload_documentos_mensais_fun_acao" value="1">

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
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
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

                        <!-- Tomadores de Serviços -->
                        <div class="row d-lg-flex flex-lg-grow-1" id="md_fun_div_tomadores_servicos">
                            <div class="card mb-0">
                                <div class="card-body">
                                    <h5 class="card-title mb-4"><i class="fa fa-toolbox"></i>&nbsp;&nbsp;Tomadores de Serviços</h5>

                                    <div class="row">
                                        <div class="col-12 col-lg-12">
                                            <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;GRADE DE TOMADORES DE SERVIÇOS</h6>

                                            <div class="col-12 mb-5" id="fun_tomadores_servicos_grade_botoes"></div>

                                            <div id="fun_tomadores_servicos_grade">Nenhum documento encontrado.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Tomadores de Serviços END -->

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
                                        <img src="build/assets/images/clientes/cliente-0.png" alt="" class="avatar-lg rounded-circle img-thumbnail clearClass" id="mi_cli_logotipo">
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
                                                    <div class="dropdown-menu dropdown-menu-end">
                                                        <a class="dropdown-item" href="#" onclick="clienteModalInfoControle(1);">Logotipos</a>
                                                        <a class="dropdown-item" href="#" onclick="clienteModalInfoControle(2);">Dados</a>
                                                        <a class="dropdown-item" href="#" onclick="clienteModalInfoControle(6);">Incluir Documentos</a>
                                                        <a class="dropdown-item" href="#" onclick="clienteModalInfoControle(3);">Documentos</a>
                                                        <a class="dropdown-item" href="#" onclick="clienteModalInfoControle(4);">Serviços</a>
                                                        <a class="dropdown-item" href="#" onclick="clienteModalInfoControle(5);">Clientes</a>
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
                                    <div class="row text-center font-size-12">
                                        <div class="col-4 col-lg-3">
                                            <div>
                                                <p class="text-truncate mb-2" style="color: #ffac31;">Documentos</p>
                                                <h5 class="mb-0" style="color: #ffffff;" id="md_cli_estatisticas_documentos">0</h5>
                                            </div>
                                        </div>
                                        <div class="col-4 col-lg-3">
                                            <div>
                                                <p class="text-truncate mb-2" style="color: #ffac31;">Propostas</p>
                                                <h5 class="mb-0" style="color: #ffffff;" id="md_cli_estatisticas_propostas">0</h5>
                                            </div>
                                        </div>
                                        <div class="col-4 col-lg-3">
                                            <div>
                                                <p class="text-truncate mb-2" style="color: #ffac31;">Órdens de Serviços</p>
                                                <h5 class="mb-0" style="color: #ffffff;" id="md_cli_estatisticas_ordens_servicos">0</h5>
                                            </div>
                                        </div>
                                        <div class="col-4 col-lg-3">
                                            <div>
                                                <p class="text-truncate mb-2" style="color: #ffac31;">Visitas Técnicas</p>
                                                <h5 class="mb-0" style="color: #ffffff;" id="md_cli_estatisticas_visitas_tecnicas">0</h5>
                                            </div>
                                        </div>
                                        <div class="col-4 col-lg-3">
                                            <div>
                                                <p class="text-truncate mb-2" style="color: #ffac31;">Da Rede</p>
                                                <h5 class="mb-0" style="color: #ffffff;" id="md_cli_estatisticas_clientes_rede">0</h5>
                                            </div>
                                        </div>
                                        <div class="col-4 col-lg-3">
                                            <div>
                                                <p class="text-truncate mb-2" style="color: #ffac31;">Do Principal</p>
                                                <h5 class="mb-0" style="color: #ffffff;" id="md_cli_estatisticas_clientes_principal">0</h5>
                                            </div>
                                        </div>
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
                                        <div class="col-12 col-lg-4 pe-5">
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
                                        <div class="col-12 col-lg-4 pe-5">
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
                                        <div class="col-12 col-lg-4 pe-5">
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

                        <!-- Incluir Documentos -->
                        <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_incluir_documentos">
                            <div class="card mb-0">
                                <div class="card-body">
                                    <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Incluir Documentos</h5>

                                    <div class="row">
                                        @if(\App\Facades\Permissoes::permissao(['clientes_edit']))
                                            <div class="col-12 col-lg-12 pe-5">
                                                <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;INCLUSÃO DE DOCUMENTO</h6>
                                                <form enctype="multipart/form-data" id="frm_upload_documentos_cli">
                                                    <input type="hidden" id="upload_documentos_cliente_id" name="upload_documentos_cliente_id" value="">

                                                    <!-- Ação do Formulário: 1(create) 2(edit) 3(update) 4(delete) -->
                                                    <input type="hidden" id="upload_documentos_cli_acao" name="upload_documentos_cli_acao" value="1">

                                                    <div class="col-12 mb-5">
                                                        <button type="button" class="btn btn-success btn-sm" id="frm_upload_documentos_cli_executar" name="frm_upload_documentos_cli_executar">Incluir Documento</button>
                                                    </div>

                                                    <div class="row" id="div_frm_upload_documentos_cli_executar">
                                                        <div class="col-12 col-lg-3 mb-3">
                                                            <label class="form-label">Documento (Nome)</label>
                                                            <select class="form-select form-select-sm" name="cli_documentos_documento_id" id="cli_documentos_documento_id">
                                                                <option value="">{{ __('Selecione...') }}</option>

                                                                @foreach ($documentos as $documento)
                                                                    @php
                                                                        $class = '';
                                                                        if ($documento['documento_fonte_id'] == 1) {$class = 'pessoa_juridica';}
                                                                        if ($documento['documento_fonte_id'] == 2) {$class = 'pessoa_fisica';}
                                                                        if ($documento['documento_fonte_id'] == 3) {$class = 'pessoa_juridica';}
                                                                    @endphp

                                                                    <option class="{{ $class }}" value="{{ $documento['id'] }}">{{ $documento['name'] }}</option>
                                                                @endforeach
                                                            </select>
                                                        </div>
                                                        <div class="col-12 col-lg-3 mb-3">
                                                            <label class="form-label">Data Documento</label>
                                                            <input type="text" class="form-control form-control-sm mask_date" name="cli_documentos_data_documento" id="cli_documentos_data_documento" placeholder="Data do Documento PDF">
                                                        </div>
                                                        <div class="col-12 col-lg-3 mb-3">
                                                            <label class="form-label">Aviso</label>
                                                            <select class="form-select form-select-sm" name="cli_documentos_aviso" id="cli_documentos_aviso">
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
                                                            <input type="file" class="form-control form-control-sm" name="cli_documentos_file" id="cli_documentos_file" accept=".pdf">
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Incluir Documentos END -->

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

                        <!-- Serviços -->
                        <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_servicos">
                            <div class="card mb-0">
                                <div class="card-body">
                                    <h5 class="card-title mb-4"><i class="fa fa-toolbox"></i>&nbsp;&nbsp;Serviços</h5>

                                    <div class="row">
                                        <div class="col-12 col-lg-12">
                                            <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;GRADE DE SERVIÇOS</h6>

                                            <div class="col-12 mb-5" id="cli_servicos_grade_botoes"></div>

                                            <div id="cli_servicos_grade">Nenhum documento encontrado.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Serviços END -->

                        <!-- Clientes -->
                        <div class="row d-lg-flex flex-lg-grow-1" id="md_cli_div_clientes">
                            <div class="card mb-0">
                                <div class="card-body">
                                    <h5 class="card-title mb-4"><i class="fa fa-toolbox"></i>&nbsp;&nbsp;Clientes</h5>

                                    <div class="row">
                                        <div class="col-12 col-lg-12 d-none" id="cli_clientes_rede">
                                            <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;CLIENTES DA REDE</h6>
                                            <div id="cli_clientes_grade_rede">Nenhum documento encontrado.</div>
                                        </div>
                                        <div class="col-12 col-lg-12 d-none" id="cli_clientes_principal">
                                            <h6 class="col-12 mb-4"><i class="bx bx-table font-size-16"></i>&nbsp;&nbsp;CLIENTES DO PRINCIPAL</h6>
                                            <div id="cli_clientes_grade_principal">Nenhum documento encontrado.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Clientes END -->

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



    @if($se_prefixPermissaoSubmodulo == 'clientes_executivos_APAGAR')

    <!-- Cliente Executivo Modal Info -->
    <div id="cliente_executivo_modal_infoxxxxxxxxxxxxxxxxxxxxx" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="min-height: 500px;">
                <div class="modal-body">
                    <!-- Header -->
                    <div class="row" id="header">
                        <div class="col-md-4 text-center">
                            <img class="img-thumbnail avatar-xl clearClass" src="" data-holder-rendered="true" id="mi_cex_foto">
                        </div>
                        <div class="col-md-8">
                            <div class="col-12 font-size-14 text-primary p-1 clearClass" id="mi_cex_nome"></div>
                            <div class="col-12 font-size-12 text-secondary p-1 clearClass" style="margin-top: -10px;" id="mi_cex_funcao"></div>
                            <div class="col-12 font-size-10 text-secondary p-1 clearClass" style="margin-top: -10px;" id="mi_cex_email"></div>
                        </div>
                        <hr>
                    </div>

                    <!-- Navegação tabs -->
                    <div class="row" style="margin-top: -12px;">
                        <ul class="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-bs-toggle="tab" href="#tab_cex_dados" role="tab">
                                    <span class="d-block d-sm-none"><i class="fas fa-book"></i></span>
                                    <span class="d-none d-sm-block">Dados</span>
                                </a>
                            </li>

                            @if(\App\Facades\Permissoes::permissao(['clientes_executivos_edit']))
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#tab_cex_foto" role="tab">
                                        <span class="d-block d-sm-none"><i class="fas fa-address-card"></i></span>
                                        <span class="d-none d-sm-block">Foto</span>
                                    </a>
                                </li>
                            @endif

                            @if(\App\Facades\Permissoes::permissao(['clientes_executivos_edit']))
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#tab_cex_documentos_upload" role="tab">
                                        <span class="d-block d-sm-none"><i class="fas fa-docker"></i></span>
                                        <span class="d-none d-sm-block">Incluir Documento</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#tab_cex_documentos" role="tab">
                                        <span class="d-block d-sm-none"><i class="fas fa-docker"></i></span>
                                        <span class="d-none d-sm-block">Documentos</span>
                                    </a>
                                </li>
                            @endif

                            <li class="nav-item">
                                <a class="nav-link" data-bs-toggle="tab" href="#tab_cex_cartao_emergencial" role="tab">
                                    <span class="d-block d-sm-none"><i class="fas fa-address-card"></i></span>
                                    <span class="d-none d-sm-block">Cartão Emergencial</span>
                                </a>
                            </li>
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content p-3 text-muted">
                            <div class="tab-pane active" id="tab_cex_dados" role="tabpanel">
                                <div class="row">
                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">{{ __('Função') }}</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_cex_funcao"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">{{ __('Nome') }}</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_cex_nome"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">Telefone(s)</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_cex_telefones"></div>

                                    <div class="col-12 col-md-4 font-size-14 pb-3 text-secondary">Celular(s)</div>
                                    <div class="col-12 col-md-8 font-size-12 pb-3 text-dark clearClass" id="mi_cex_celulares"></div>
                                </div>
                            </div>

                            @if(\App\Facades\Permissoes::permissao(['clientes_executivos_edit']))
                                <div class="tab-pane" id="tab_cex_foto" role="tabpanel">
                                    <form enctype="multipart/form-data" id="frm_upload_cex_foto">
                                        <input type="hidden" id="upload_foto_cliente_executivo_id" name="upload_foto_cliente_executivo_id" value="">
                                        <input type="hidden" id="upload_foto_cliente_executivo_name" name="upload_foto_cliente_executivo_name" value="">

                                        <div class="form-group col-12 py-2">
                                            <button type="button" class="btn btn-sm btn-success" id="frm_upload_cex_foto_executar">Confirmar Upload</button>
                                        </div>
                                        <div class="form-group col-12 pt-2">
                                            <label class="form-label mb-0 ps-1 small">Foto</label>
                                            <input type="file" class="form-control form-control-sm" name="cex_foto_file" accept=".png, .jpg, .jpeg" id="cex_foto_file">
                                        </div>
                                    </form>
                                </div>
                            @endif

                            @if(\App\Facades\Permissoes::permissao(['clientes_executivos_edit']))
                                <div class="tab-pane" id="tab_cex_documentos_upload" role="tabpanel">
                                    <form enctype="multipart/form-data" id="frm_upload_documentos_cex">
                                        <input type="hidden" id="upload_documentos_cliente_executivo_id" name="upload_documentos_cliente_executivo_id" value="">

                                        <!-- Ação do Formulário: 1(create) 2(edit) 3(update) 4(delete) -->
                                        <input type="hidden" id="upload_documentos_cex_acao" name="upload_documentos_cex_acao" value="1">

                                        <div class="form-group col-12 d-flex gap-3 py-2">
                                            <button type="button" class="btn btn-sm btn-success" id="frm_upload_documentos_cex_executar" name="frm_upload_documentos_cex_executar">Executar Ação</button>
                                        </div>
                                        <div class="row" id="div_frm_upload_documentos_cex_executar">
                                            <div class="form-group col-12 pt-2">
                                                <label class="form-label mb-0 ps-1 small">Descrição</label>
                                                <input type="text" class="form-control form-control-sm" name="cex_documentos_descricao" id="cex_documentos_descricao" placeholder="Descrição do Documento PDF">
                                            </div>
                                            <div class="form-group col-12 col-md-6 pt-2">
                                                <label class="form-label mb-0 ps-1 small">Data Documento</label>
                                                <input type="text" class="form-control form-control-sm mask_date" name="cex_documentos_data_documento" id="cex_documentos_data_documento" placeholder="Data do Documento PDF">
                                            </div>
                                            <div class="form-group col-12 col-md-6 pt-2">
                                                <label class="form-label mb-0 ps-1 small">Aviso</label>
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
                                            <div class="form-group col-12 pt-2">
                                                <label class="form-label mb-0 ps-1 small">Documento</label>
                                                <input type="file" class="form-control form-control-sm" name="cex_documentos_file" id="cex_documentos_file" accept=".pdf">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            @endif

                            <div class="tab-pane" id="tab_cex_documentos" role="tabpanel">
                                <div class="table-responsive" id="cex_documentos_grade">Nenhum documento encontrado.</div>
                            </div>

                            <style>
                                .cartao_emergencial {
                                    width: 86.60mm;
                                    height: 54.98mm;
                                    overflow: hidden;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                }
                            </style>

                            <div class="tab-pane" id="tab_cex_cartao_emergencial" role="tabpanel">
                                <div class="row justify-content-center pt-2">
                                    <div class="col-auto">
                                        <div class="cartao_emergencial" id="cex_cartao_emergencial_1">Cartão 1</div>
                                    </div>
                                    <div class="col-auto">
                                        <div class="cartao_emergencial" id="cex_cartao_emergencial_2">Cartão 2</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @endif

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
                                        <img src="build/assets/images/clientes_executivos/cliente_executivo-0.png" alt="" class="avatar-lg rounded-circle img-thumbnail clearClass" id="mi_cex_fotografia">
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
                                                    <div class="dropdown-menu dropdown-menu-end">
                                                        <a class="dropdown-item" href="#" onclick="clienteExecutivoModalInfoControle(1);">Fotografias</a>
                                                        <a class="dropdown-item" href="#" onclick="clienteExecutivoModalInfoControle(2);">Dados</a>
                                                        <a class="dropdown-item" href="#" onclick="clienteExecutivoModalInfoControle(5);">Incluir Documentos</a>
                                                        <a class="dropdown-item" href="#" onclick="clienteExecutivoModalInfoControle(3);">Documentos</a>
                                                        <a class="dropdown-item" href="#" onclick="clienteExecutivoModalInfoControle(6);">Cartão Emergencial</a>
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
                                    <div class="row text-center font-size-12">
                                        <div class="col-4 col-lg-3">
                                            <div>
                                                <p class="text-truncate mb-2" style="color: #ffac31;">Documentos</p>
                                                <h5 class="mb-0" style="color: #ffffff;" id="md_cex_estatisticas_documentos">0</h5>
                                            </div>
                                        </div>
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
                        <div class="row d-lg-flex flex-lg-grow-1" id="md_cex_div_incluir_documentos">
                            <div class="card mb-0">
                                <div class="card-body">
                                    <h5 class="card-title mb-4"><i class="fa fa-file"></i>&nbsp;&nbsp;Incluir Documentos</h5>

                                    <div class="row">
                                        @if(\App\Facades\Permissoes::permissao(['clientes_executivos_edit']))
                                            <div class="col-12 col-lg-12 pe-5">
                                                <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;INCLUSÃO DE DOCUMENTO</h6>
                                                <form enctype="multipart/form-data" id="frm_upload_documentos_cex">
                                                    <input type="hidden" id="upload_documentos_cliente_executivo_id" name="upload_documentos_cliente_executivo_id" value="">

                                                    <!-- Ação do Formulário: 1(create) 2(edit) 3(update) 4(delete) -->
                                                    <input type="hidden" id="upload_documentos_cex_acao" name="upload_documentos_cex_acao" value="1">

                                                    <div class="col-12 mb-5">
                                                        <button type="button" class="btn btn-success btn-sm" id="frm_upload_documentos_cex_executar" name="frm_upload_documentos_cex_executar">Incluir Documento</button>
                                                    </div>
                                                    <div class="row" id="div_frm_upload_documentos_cex_executar">
                                                        <div class="col-12 col-lg-3 mb-3">
                                                            <label class="form-label">Documento (Nome)</label>
                                                            <select class="form-select form-select-sm" name="cex_documentos_documento_id" id="cex_documentos_documento_id">
                                                                <option value="">{{ __('Selecione...') }}</option>

                                                                @foreach ($documentos as $documento)
                                                                    @php
                                                                        $class = '';
                                                                        if ($documento['documento_fonte_id'] == 1) {$class = 'pessoa_juridica';}
                                                                        if ($documento['documento_fonte_id'] == 2) {$class = 'pessoa_fisica';}
                                                                        if ($documento['documento_fonte_id'] == 3) {$class = 'pessoa_juridica';}
                                                                    @endphp

                                                                    <option class="{{ $class }}" value="{{ $documento['id'] }}">{{ $documento['name'] }}</option>
                                                                @endforeach
                                                            </select>
                                                        </div>
                                                        <div class="col-12 col-lg-3 mb-3">
                                                            <label class="form-label">Data Documento</label>
                                                            <input type="text" class="form-control form-control-sm mask_date" name="cex_documentos_data_documento" id="cex_documentos_data_documento" placeholder="Data do Documento PDF">
                                                        </div>
                                                        <div class="col-12 col-lg-3 mb-3">
                                                            <label class="form-label">Aviso</label>
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
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
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

    @if($se_prefixPermissaoSubmodulo == 'materiais')
        <!-- Material Modal Info -->
        <div class="modal fade" id="material_modal_info" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content bg-light">
                    <div class="modal-header" style="background-color: #2a3042;">
                        <!-- Header -->
                        <div class="row col-12">
                            <div class="col-8 order-1 order-lg-1 col-lg-4">
                                <div class="d-flex">
                                    <div class="flex-shrink-0 me-3">
                                        <img src="build/assets/images/materiais/material-0.png" alt="" class="avatar-lg rounded-circle img-thumbnail clearClass" id="mi_mat_fotografia_header">
                                    </div>
                                    <div class="flex-grow-1 align-self-center">
                                        <div>
                                            <h5 class="mb-2" style="color: #ffac31 !important;">INFORMAÇÕES MATERIAIS</h5>
                                            <h6 class="mb-1" style="color: #ffffff !important;" id="mi_mat_header_nome"></h6>
                                            <div class="clearfix mt-2">
                                                <div class="dropdown">
                                                    <button class="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i class="bx bxs-cog align-middle me-1"></i> Opções
                                                    </button>
                                                    <div class="dropdown-menu dropdown-menu-end">
                                                        <a class="dropdown-item" href="#" onclick="materialModalInfoControle(1);">Fotografias</a>
                                                        <a class="dropdown-item" href="#" onclick="materialModalInfoControle(2);">Dados</a>
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
                        <!-- Material ID -->
                        <input type="hidden" id="mi_mat_material_id" name="mi_mat_material_id" value="0">

                        <!-- Fotografias -->
                        <div class="row d-lg-flex flex-lg-grow-1" id="md_mat_div_fotografias">
                            <div class="card mb-0">
                                <div class="card-body">
                                    <h5 class="card-title mb-4"><i class="bx bxs-file-plus"></i>&nbsp;&nbsp;Fotografias</h5>

                                    <div class="row">
                                        <div class="col-12 col-lg-6 pe-5">
                                            <h6 class="col-12 mb-4"><i class="bx bxs-file-plus font-size-16"></i>&nbsp;&nbsp;FOTOGRAFIA</h6>
                                            <div class="col-12" style="height: 270px;">
                                                <img src="" alt="" class="img-fluid clearClass" style="max-height: 250px !important;" id="mi_mat_fotografia">
                                            </div>

                                            @if(\App\Facades\Permissoes::permissao(['materiais_edit']))
                                                <form enctype="multipart/form-data" id="frm_upload_fotografia_mat">
                                                    <input type="hidden" id="upload_fotografia_material_id" name="upload_fotografia_material_id" value="">

                                                    <div class="col-12 mb-2">
                                                        <button type="button" class="btn btn-success btn-sm" id="frm_upload_fotografia_mat_executar" name="frm_upload_fotografia_mat_executar">Enviar Fotografia</button>
                                                    </div>

                                                    <div class="col-12 mb-3">
                                                        <input type="file" class="form-control form-control-sm" name="mat_fotografia_file" accept=".png, .jpg, .jpeg" id="mat_fotografia_file">
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
                        <div class="row d-lg-flex flex-lg-grow-1" id="md_mat_div_dados">
                            <div class="card mb-0">
                                <div class="card-body">
                                    <h5 class="card-title mb-4"><i class="fa fa-database"></i>&nbsp;&nbsp;Dados</h5>
                                    <div class="row">
                                        <div class="col-lg-3 mb-3">
                                            <label class="form-label small">{{ __('Categoria') }}</label>
                                            <input type="text" class="form-control form-control-sm clearClass" id="mi_mat_categoria" readonly>
                                        </div>
                                        <div class="col-lg-3 mb-3">
                                            <label class="form-label small">{{ __('Nome') }}</label>
                                            <input type="text" class="form-control form-control-sm clearClass" id="mi_mat_nome" readonly>
                                        </div>
                                        <div class="col-lg-3 mb-3">
                                            <label class="form-label small">{{ __('COR') }}</label>
                                            <input type="text" class="form-control form-control-sm clearClass" id="mi_mat_cor" readonly>
                                        </div>
                                        <div class="col-lg-3 mb-3">
                                            <label class="form-label small">{{ __('CA') }}</label>
                                            <input type="text" class="form-control form-control-sm clearClass" id="mi_mat_ca" readonly>
                                        </div>
                                        <div class="col-lg-3 mb-3">
                                            <label class="form-label small">{{ __('DESCRIÇÃO') }}</label>
                                            <input type="text" class="form-control form-control-sm clearClass" id="mi_mat_descricao" readonly>
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
</div>
