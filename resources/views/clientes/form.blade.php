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

                            <div class="row mt-4">
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-user"></i> Informa&ccedil;&otilde;es Gerais</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label col-12">{{ __('Status') }}</label>
                                        <select class="select2 form-control col-12" name="status" id="status" required="required">
                                            <option value="1">ATIVO</option>
                                            <option value="2">INATIVO</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Tipo') }}</label>
                                        <select class="select2 form-control" name="tipo" id="tipo" required="required">
                                            <option value="1">PESSOA JURÍDICA</option>
                                            <option value="2">PESSOA FÍSICA</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3 pessoa_fisica">
                                        <label class="form-label">{{ __('CPF') }}</label>
                                        <input type="text" class="form-control mask_cpf" id="cpf" name="cpf">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3 pessoa_juridica">
                                        <label class="form-label">{{ __('CNPJ') }}
                                            <a href="#" class="texto-primary" id="link_api_buscar">&nbsp;&nbsp;&nbsp;<i class="mdi mdi-search-web"></i> Buscar na API</a>
                                        </label>
                                        <input type="text" class="form-control mask_cnpj" id="cnpj" name="cnpj">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Nome') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="name" name="name" required="required">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3 pessoa_juridica">
                                        <label class="form-label">{{ __('Nome Fantasia') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="nome_fantasia" name="nome_fantasia">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3 pessoa_fisica">
                                        <label class="form-label">{{ __('Gênero') }}</label>
                                        <select class="select2 form-control" name="genero_id" id="genero_id" required="required">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($generos as $key => $genero)
                                                <option value="{{ $genero['id'] }}">{{ $genero['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label" id="label_data_nascimento">{{ __('Nascimento') }}</label>
                                        <input type="text" class="form-control mask_date" id="data_nascimento" name="data_nascimento">
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">{{ __('Cliente Principal') }}</label>
                                        <select class="select2 form-control" name="principal_cliente_id" id="principal_cliente_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($clientes as $key => $cliente)
                                                <option value="{{ $cliente['id'] }}">{{ $cliente['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">{{ __('Cliente Rede') }}</label>
                                        <select class="select2 form-control" name="rede_cliente_id" id="rede_cliente_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($clientes as $key => $cliente)
                                                <option value="{{ $cliente['id'] }}">{{ $cliente['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-user"></i> Contato</h5>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">{{ __('E-mail Cliente') }}</label>
                                        <input type="email" class="form-control text-lowercase mask_email" id="email" name="email">
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">{{ __('Site Cliente') }}</label>
                                        <input type="text" class="form-control text-lowercase" id="site" name="site">
                                    </div>
                                    <div class="row">
                                        <div class="col-12 col-md-6">
                                            <h6 class="pb-2 text-success">Contato 1</h6>
                                            <div class="form-group col-12 col-md-11 pb-3">
                                                <label class="form-label">{{ __('Nome') }}</label>
                                                <input type="text" class="form-control" id="contato_1_nome" name="contato_1_nome">
                                            </div>
                                            <div class="form-group col-12 col-md-11 pb-3">
                                                <label class="form-label">{{ __('Setor') }}</label>
                                                <input type="text" class="form-control" id="contato_1_setor" name="contato_1_setor">
                                            </div>
                                            <div class="form-group col-12 col-md-11 pb-3">
                                                <label class="form-label">{{ __('Cargo') }}</label>
                                                <input type="text" class="form-control" id="contato_1_cargo" name="contato_1_cargo">
                                            </div>
                                            <div class="form-group col-12 col-md-11 pb-3">
                                                <label class="form-label">{{ __('E-mail') }}</label>
                                                <input type="email" class="form-control" id="contato_1_email" name="contato_1_email">
                                            </div>
                                            <div class="form-group col-12 col-md-11 pb-3">
                                                <label class="form-label">{{ __('Telefone') }}</label>
                                                <input type="text" class="form-control mask_phone_with_ddd" id="telefone_1" name="telefone_1">
                                            </div>
                                            <div class="form-group col-12 col-md-11 pb-3">
                                                <label class="form-label">{{ __('Celular') }}</label>
                                                <input type="text" class="form-control mask_cell_with_ddd" id="celular_1" name="celular_1">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <h6 class="pb-2 text-success">Contato 2</h6>
                                            <div class="form-group col-12 col-md-11 pb-3">
                                                <label class="form-label">{{ __('Nome') }}</label>
                                                <input type="text" class="form-control" id="contato_2_nome" name="contato_2_nome">
                                            </div>
                                            <div class="form-group col-12 col-md-11 pb-3">
                                                <label class="form-label">{{ __('Setor') }}</label>
                                                <input type="text" class="form-control" id="contato_2_setor" name="contato_2_setor">
                                            </div>
                                            <div class="form-group col-12 col-md-11 pb-3">
                                                <label class="form-label">{{ __('Cargo') }}</label>
                                                <input type="text" class="form-control" id="contato_2_cargo" name="contato_2_cargo">
                                            </div>
                                            <div class="form-group col-12 col-md-11 pb-3">
                                                <label class="form-label">{{ __('E-mail') }}</label>
                                                <input type="email" class="form-control" id="contato_2_email" name="contato_2_email">
                                            </div>
                                            <div class="form-group col-12 col-md-11 pb-3">
                                                <label class="form-label">{{ __('Telefone') }}</label>
                                                <input type="text" class="form-control mask_phone_with_ddd" id="telefone_2" name="telefone_2">
                                            </div>
                                            <div class="form-group col-12 col-md-11 pb-3">
                                                <label class="form-label">{{ __('Celular') }}</label>
                                                <input type="text" class="form-control mask_cell_with_ddd" id="celular_2" name="celular_2">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-paste"></i> Documentos</h5>
                                    <div class="form-group col-12 col-md-3 pb-3 pessoa_fisica">
                                        <label class="form-label">{{ __('Identidade (Órgão)') }}</label>
                                        <select class="form-control select2" name="identidade_orgao_id" id="identidade_orgao_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($identidade_orgaos as $key => $identidade_orgao)
                                                <option value="{{ $identidade_orgao['id'] }}">{{ $identidade_orgao['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3 pessoa_fisica">
                                        <label class="form-label">{{ __('Identidade (Estado)') }}</label>
                                        <select class="form-control select2" name="identidade_estado_id" id="identidade_estado_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($identidade_estados as $key => $identidade_estado)
                                                <option value="{{ $identidade_estado['id'] }}">{{ $identidade_estado['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3 pessoa_fisica">
                                        <label class="form-label">{{ __('Identidade (Número)') }}</label>
                                        <input type="text" class="form-control" id="identidade_numero" name="identidade_numero">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3 pessoa_fisica">
                                        <label class="form-label">{{ __('Identidade (Emissão)') }}</label>
                                        <input type="text" class="form-control mask_date" id="identidade_data_emissao" name="identidade_data_emissao">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3 pessoa_juridica">
                                        <label class="form-label">{{ __('Inscrição Estadual') }}</label>
                                        <input type="text" class="form-control" id="inscricao_estadual" name="inscricao_estadual">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3 pessoa_juridica">
                                        <label class="form-label">{{ __('Inscrição Municipal') }}</label>
                                        <input type="text" class="form-control" id="inscricao_municipal" name="inscricao_municipal">
                                    </div>
                                </div>
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-house-user"></i> Endereço</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('CEP') }}</label>
                                        <input type="text" class="form-control mask_cep" id="cep" name="cep" onblur="pesquisacep(this.value);">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Número') }}</label>
                                        <input type="text" class="form-control" id="numero" name="numero">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Complemento') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="complemento" name="complemento">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Logradouro') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="logradouro" name="logradouro" readonly="readonly">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Bairro') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="bairro" name="bairro" readonly="readonly">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Localidade') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="localidade" name="localidade" readonly="readonly">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('UF') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="uf" name="uf" readonly="readonly">
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-house-user"></i> Endereço Cobrança&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" class="text-success font-size-10" id="link_copiar_endereco">:: Copiar do Endereço</a></h5>

                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('CEP') }}</label>
                                        <input type="text" class="form-control mask_cep" id="cep_cobranca" name="cep_cobranca" onblur="pesquisacep_cobranca(this.value);">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Número') }}</label>
                                        <input type="text" class="form-control" id="numero_cobranca" name="numero_cobranca">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Complemento') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="complemento_cobranca" name="complemento_cobranca">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Logradouro') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="logradouro_cobranca" name="logradouro_cobranca" readonly="readonly">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Bairro') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="bairro_cobranca" name="bairro_cobranca" readonly="readonly">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Localidade') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="localidade_cobranca" name="localidade_cobranca" readonly="readonly">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('UF') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="uf_cobranca" name="uf_cobranca" readonly="readonly">
                                    </div>
                                </div>
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-envelope-open-text"></i> {{ __('Outros Dados') }}</h5>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">{{ __('E-mail para avisos do Sistema') }}</label>
                                        <input type="email" class="form-control text-lowercase mask_email" id="email_avisos" name="email_avisos">
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">{{ __('Domínio para acesso ao Sistema') }}</label>
                                        <input type="text" class="form-control" id="dominio" name="dominio">
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>

                    <div class="modal-buttons" id="crudFormButtons1_inferior">
                        <!-- store or update -->
                    @if(\App\Facades\Permissoes::permissao(['create', 'edit']))
                        <!-- Botão Confirnar Operação -->
                            <x-button-crud op="5" onclick="crudConfirmOperation();" />
                    @endif

                    <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>
                    <div class="modal-buttons" id="crudFormButtons2_inferior">
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
</div>

<!-- API modal -->
<div class="modal fade modal-dialog-scrollable" id="modal_api" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Dados</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="card">
                        <div class="card-body">
                            <div class="pb-2">
                                <x-button-crud op="99" model="3" bgColor="success" textColor="write" class="button_api_copiar" image="far fa-copy" label="Copiar Informações" />
                            </div>
                            <div class="table-responsive">
                                <!-- Campos hidden para copiar -->
                                <input type="hidden" name="hidden_api_situacao" id="hidden_api_situacao">
                                <input type="hidden" name="hidden_api_tipo" id="hidden_api_tipo">
                                <input type="hidden" name="hidden_api_natureza_juridica" id="hidden_api_natureza_juridica">
                                <input type="hidden" name="hidden_api_nome" id="hidden_api_nome">
                                <input type="hidden" name="hidden_api_fantasia" id="hidden_api_fantasia">
                                <input type="hidden" name="hidden_api_cnpj" id="hidden_api_cnpj">
                                <input type="hidden" name="hidden_api_abertura" id="hidden_api_abertura">
                                <input type="hidden" name="hidden_api_cep" id="hidden_api_cep">
                                <input type="hidden" name="hidden_api_telefone" id="hidden_api_telefone">
                                <input type="hidden" name="hidden_api_email" id="hidden_api_email">
                                <input type="hidden" name="hidden_api_logradouro" id="hidden_api_logradouro">
                                <input type="hidden" name="hidden_api_numero" id="hidden_api_numero">
                                <input type="hidden" name="hidden_api_complemento" id="hidden_api_complemento">
                                <input type="hidden" name="hidden_api_bairro" id="hidden_api_bairro">
                                <input type="hidden" name="hidden_api_municipio" id="hidden_api_municipio">
                                <input type="hidden" name="hidden_api_uf" id="hidden_api_uf">

                                <table class="table table-nowrap mb-0">
                                    <tbody>
                                        <tr>
                                            <th scope="row">{{ __('Situação') }}</th>
                                            <td name="td_api_situacao" id="td_api_situacao"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Tipo</th>
                                            <td name="td_api_tipo" id="td_api_tipo"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Natureza Jurídica</th>
                                            <td name="td_api_natureza_juridica" id="td_api_natureza_juridica"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{ __('Nome') }}</th>
                                            <td name="td_api_nome" id="td_api_nome"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Nome Fantasia</th>
                                            <td name="td_api_fantasia" id="td_api_fantasia"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">CNPJ</th>
                                            <td name="td_api_cnpj" id="td_api_cnpj"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Abertura</th>
                                            <td name="td_api_abertura" id="td_api_abertura"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{ __('CEP') }}</th>
                                            <td name="td_api_cep" id="td_api_cep"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{ __('Telefone') }}</th>
                                            <td name="td_api_telefone" id="td_api_telefone"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{ __('E-mail') }}</th>
                                            <td name="td_api_email" id="td_api_email"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{ __('Logradouro') }}</th>
                                            <td name="td_api_logradouro" id="td_api_logradouro"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{ __('Número') }}</th>
                                            <td name="td_api_numero" id="td_api_numero"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{ __('Complemento') }}</th>
                                            <td name="td_api_complemento" id="td_api_complemento"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{ __('Bairro') }}</th>
                                            <td name="td_api_bairro" id="td_api_bairro"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Município</th>
                                            <td name="td_api_municipio" id="td_api_municipio"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{ __('UF') }}</th>
                                            <td name="td_api_uf" id="td_api_uf"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <x-button-crud op="99" model="3" bgColor="secondary" textColor="write" data-bs-dismiss="modal" image="far fa-window-close" label="Fechar" />
                <x-button-crud op="99" model="3" bgColor="success" textColor="write" class="button_api_copiar" image="far fa-copy" label="Copiar Informações" />
            </div>
        </div>
    </div>
</div>
