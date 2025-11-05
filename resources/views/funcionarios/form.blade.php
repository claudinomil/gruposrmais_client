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
                            <input type="hidden" id="fotografia_documento" name="fotografia_documento" value="build/assets/images/funcionarios/funcionario-0.png">

                            <div class="row mt-4">
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-user"></i> {{ __('Informações Gerais') }}</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Nome') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="name" name="name" required="required">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('CPF') }}</label>
                                        <input type="text" class="form-control mask_cpf" id="cpf" name="cpf" required="required">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Empresa') }}</label>
                                        <select class="form-select" name="empresa_id" id="empresa_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($empresas as $empresa)
                                                <option value="{{ $empresa['id'] }}">{{ $empresa['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Tomador de Serviço') }}</label>
                                        <select class="select2 form-control" name="tomador_servico_cliente_id" id="tomador_servico_cliente_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($clientes as $cliente)
                                                <option value="{{ $cliente['id'] }}">{{ $cliente['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Tipo Contratação') }}</label>
                                        <select class="form-control select2" name="contratacao_tipo_id" id="contratacao_tipo_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($contratacao_tipos as $key => $contratacao_tipo)
                                                <option value="{{ $contratacao_tipo['id'] }}">{{ $contratacao_tipo['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Função') }}</label>
                                        <select class="form-control select2" name="funcao_id" id="funcao_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($funcoes as $key => $funcao)
                                                <option value="{{ $funcao['id'] }}">{{ $funcao['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Departamento') }}</label>
                                        <select class="form-control select2" name="departamento_id" id="departamento_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($departamentos as $key => $departamento)
                                                <option value="{{ $departamento['id'] }}">{{ $departamento['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Nome Profissional') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="nome_profissional" name="nome_profissional" required="required">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Nascimento') }}</label>
                                        <input type="text" class="form-control mask_date" id="data_nascimento" name="data_nascimento" required="required">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Gênero') }}</label>
                                        <select class="select2 form-control" name="genero_id" id="genero_id" required="required">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($generos as $key => $genero)
                                                <option value="{{ $genero['id'] }}">{{ $genero['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Celular 1') }}</label>
                                        <input type="text" class="form-control mask_cell_with_ddd" id="celular_1" name="celular_1">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Celular 2') }}</label>
                                        <input type="text" class="form-control mask_cell_with_ddd" id="celular_2" name="celular_2">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Telefone 1') }}</label>
                                        <input type="text" class="form-control mask_phone_with_ddd" id="telefone_1" name="telefone_1">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Telefone 2') }}</label>
                                        <input type="text" class="form-control mask_phone_with_ddd" id="telefone_2" name="telefone_2">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('E-mail') }}</label>
                                        <input type="email" class="form-control mask_email" id="email" name="email">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Estado Civil') }}</label>
                                        <select class="form-control select2" name="estado_civil_id" id="estado_civil_id" required="required">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($estados_civis as $key => $estado_civil)
                                                <option value="{{ $estado_civil['id'] }}">{{ $estado_civil['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Escolaridade') }}</label>
                                        <select class="form-control select2" name="escolaridade_id" id="escolaridade_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($escolaridades as $key => $escolaridade)
                                                <option value="{{ $escolaridade['id'] }}">{{ $escolaridade['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Nacionalidade') }}</label>
                                        <select class="form-control select2" name="nacionalidade_id" id="nacionalidade_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($nacionalidades as $key => $nacionalidade)
                                                <option value="{{ $nacionalidade['id'] }}">{{ $nacionalidade['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Naturalidade') }}</label>
                                        <select class="form-control select2" name="naturalidade_id" id="naturalidade_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($naturalidades as $key => $naturalidade)
                                                <option value="{{ $naturalidade['id'] }}">{{ $naturalidade['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Mãe') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="mae" name="mae">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Pai') }}</label>
                                        <input type="text" class="form-control text-uppercase" id="pai" name="pai">
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-landmark"></i> {{ __('Dados Bancários') }}</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Banco') }}</label>
                                        <select class="form-control select2" name="banco_id" id="banco_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($bancos as $key => $banco)
                                                <option value="{{ $banco['id'] }}">{{ $banco['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Agência') }}</label>
                                        <input type="text" class="form-control" id="agencia" name="agencia">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('Conta') }}</label>
                                        <input type="text" class="form-control" id="conta" name="conta">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('PIX Tipo') }}</label>
                                        <select class="form-select" name="pix_tipo_id" id="pix_tipo_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($pix_tipos as $pix_tipo)
                                                <option value="{{ $pix_tipo['id'] }}">{{ $pix_tipo['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">{{ __('PIX Chave') }}</label>
                                        <input type="text" class="form-control" id="pix_chave" name="pix_chave">
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-user-tie"></i> {{ __('Dados Contratuais') }}</h5>
                                    <div class="form-group col-12 col-md-4 pb-3 contratacao_tipo_1">
                                        <label class="form-label">{{ __('Data Admissão') }}</label>
                                        <input type="text" class="form-control mask_date" id="data_admissao" name="data_admissao">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3 contratacao_tipo_1">
                                        <label class="form-label">{{ __('Data Demissão') }}</label>
                                        <input type="text" class="form-control mask_date" id="data_demissao" name="data_demissao">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3 contratacao_tipo_1">
                                        <label class="form-label">{{ __('Motivo Demissão') }}</label>
                                        <select class="form-control" name="motivo_demissao_id" id="motivo_demissao_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($motivos_demissoes as $motivo_demissao)
                                                <option value="{{ $motivo_demissao['id'] }}">{{ $motivo_demissao['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3 contratacao_tipo_2">
                                        <label class="form-label">{{ __('Data Cadastro') }}</label>
                                        <input type="text" class="form-control mask_date" id="data_cadastro" name="data_cadastro">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3 contratacao_tipo_2">
                                        <label class="form-label">{{ __('Data Afastamento') }}</label>
                                        <input type="text" class="form-control mask_date" id="data_afastamento" name="data_afastamento">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3 contratacao_tipo_2">
                                        <label class="form-label">{{ __('Motivo Afastamento') }}</label>
                                        <select class="form-control" name="motivo_afastamento_id" id="motivo_afastamento_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($motivos_afastamentos as $motivo_afastamento)
                                                <option value="{{ $motivo_afastamento['id'] }}">{{ $motivo_afastamento['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-paste"></i> {{ __('Documentos') }}</h5>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Carteira Nacional (Órgão)') }}</label>
                                        <select class="form-control select2" name="carteira_nacional_orgao_id" id="carteira_nacional_orgao_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($identidade_orgaos as $key => $identidade_orgao)
                                                <option value="{{ $identidade_orgao['id'] }}">{{ $identidade_orgao['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Carteira Nacional (Estado)') }}</label>
                                        <select class="form-control select2" name="carteira_nacional_estado_id" id="carteira_nacional_estado_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($identidade_estados as $key => $identidade_estado)
                                                <option value="{{ $identidade_estado['id'] }}">{{ $identidade_estado['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Carteira Nacional (Número)') }}</label>
                                        <input type="text" class="form-control" id="carteira_nacional_numero" name="carteira_nacional_numero">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Carteira Nacional (Emissão)') }}</label>
                                        <input type="text" class="form-control mask_date" id="carteira_nacional_data_emissao" name="carteira_nacional_data_emissao">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Identidade Pessoal (Órgão)') }}</label>
                                        <select class="form-control select2" name="personal_identidade_orgao_id" id="personal_identidade_orgao_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($identidade_orgaos as $key => $identidade_orgao)
                                                <option value="{{ $identidade_orgao['id'] }}">{{ $identidade_orgao['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Identidade Pessoal (Estado)') }}</label>
                                        <select class="form-control select2" name="personal_identidade_estado_id" id="personal_identidade_estado_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($identidade_estados as $key => $identidade_estado)
                                                <option value="{{ $identidade_estado['id'] }}">{{ $identidade_estado['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Identidade Pessoal (Número)') }}</label>
                                        <input type="text" class="form-control" id="personal_identidade_numero" name="personal_identidade_numero">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Identidade Pessoal (Emissão)') }}</label>
                                        <input type="text" class="form-control mask_date" id="personal_identidade_data_emissao" name="personal_identidade_data_emissao">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Identidade Profissional (Órgão)') }}</label>
                                        <select class="form-control select2" name="professional_identidade_orgao_id" id="professional_identidade_orgao_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($identidade_orgaos as $key => $identidade_orgao)
                                                <option value="{{ $identidade_orgao['id'] }}">{{ $identidade_orgao['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Identidade Profissional (Estado)') }}</label>
                                        <select class="form-control select2" name="professional_identidade_estado_id" id="professional_identidade_estado_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($identidade_estados as $key => $identidade_estado)
                                                <option value="{{ $identidade_estado['id'] }}">{{ $identidade_estado['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Identidade Profissional (Número)') }}</label>
                                        <input type="text" class="form-control" id="professional_identidade_numero" name="professional_identidade_numero">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Identidade Profissional (Emissão)') }}</label>
                                        <input type="text" class="form-control mask_date" id="professional_identidade_data_emissao" name="professional_identidade_data_emissao">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Título Eleitor (Número)') }}</label>
                                        <input type="text" class="form-control" id="titulo_eleitor_numero" name="titulo_eleitor_numero">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Título Eleitor (Zona)') }}</label>
                                        <input type="text" class="form-control" id="titulo_eleitor_zona" name="titulo_eleitor_zona">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Título Eleitor (Seção)') }}</label>
                                        <input type="text" class="form-control" id="titulo_eleitor_secao" name="titulo_eleitor_secao">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('PIS') }}</label>
                                        <input type="text" class="form-control mask_pis" id="pis" name="pis">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('PASEP') }}</label>
                                        <input type="text" class="form-control mask_pasep" id="pasep" name="pasep">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Carteira Trabalho') }}</label>
                                        <input type="text" class="form-control" id="carteira_trabalho" name="carteira_trabalho">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Atestado Saúde Ocupacional (Tipo)') }}</label>
                                        <select class="form-select" name="atestado_saude_ocupacional_tipo_id" id="atestado_saude_ocupacional_tipo_id">
                                            <option value="">{{ __('Selecione...') }}</option>

                                            @foreach ($atestado_saude_ocupacional_tipos as $atestado_saude_ocupacional_tipo)
                                                <option value="{{ $atestado_saude_ocupacional_tipo['id'] }}">{{ $atestado_saude_ocupacional_tipo['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Atestado Saúde Ocupacional (Emissão)') }}</label>
                                        <input type="text" class="form-control mask_date" id="atestado_saude_ocupacional_data_emissao" name="atestado_saude_ocupacional_data_emissao">
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-house-user"></i> {{ __('Endereço') }}</h5>
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
                                    <h5 class="pb-4 text-primary"><i class="fas fa-address-card"></i> {{ __('Cartão Emergencial') }}</h5>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Tipo Sanguíneo') }}</label>
                                        <select class="form-control" name="tipo_sanguineo" id="tipo_sanguineo">
                                            <option value="">{{ __('Selecione...') }}</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="AB">AB</option>
                                            <option value="O">O</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Fator RH') }}</label>
                                        <select class="form-control" name="fator_rh" id="fator_rh">
                                            <option value="">{{ __('Selecione...') }}</option>
                                            <option value="Positivo">Positivo</option>
                                            <option value="Negativo">Negativo</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Altura (m)') }}</label>
                                        <input type="text" class="form-control mask_altura" name="altura" id="altura">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Peso (kg)') }}</label>
                                        <input type="text" class="form-control mask_peso" name="peso" id="peso">
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <div class="mt-4 bg-light p-2">
                                            <h5 class="font-size-14 mb-4"><i class="mdi mdi-arrow-right text-primary me-1"></i> Doenças</h5>
                                            <div class="row p-3">
                                                <div class="col-12 col-md-4 form-check mb-3">
                                                    <input class="form-check-input" type="checkbox" name="doenca_diabetes" id="doenca_diabetes">
                                                    <label class="form-check-label" for="doenca_diabetes">{{ __('Diabetes') }}</label>
                                                </div>
                                                <div class="col-12 col-md-4 form-check mb-3">
                                                    <input class="form-check-input" type="checkbox" name="doenca_hipertensao" id="doenca_hipertensao">
                                                    <label class="form-check-label" for="doenca_hipertensao">{{ __('Hipertensão') }}</label>
                                                </div>
                                                <div class="col-12 col-md-4 form-check mb-3">
                                                    <input class="form-check-input" type="checkbox" name="doenca_asma" id="doenca_asma">
                                                    <label class="form-check-label" for="doenca_asma">{{ __('Asma') }}</label>
                                                </div>
                                                <div class="col-12 col-md-4 form-check mb-3">
                                                    <input class="form-check-input" type="checkbox" name="doenca_renal" id="doenca_renal">
                                                    <label class="form-check-label" for="doenca_renal">{{ __('Renal') }}</label>
                                                </div>
                                                <div class="col-12 col-md-4 form-check mb-3">
                                                    <input class="form-check-input" type="checkbox" name="doenca_cardiaca" id="doenca_cardiaca">
                                                    <label class="form-check-label" for="doenca_cardiaca">{{ __('Cardiáca') }}</label>
                                                </div>
                                            </div>
                                            <div class="col-12 form-group col-12 pb-3 p-2">
                                                <label class="form-label">{{ __('Outras') }}</label>
                                                <input type="text" class="form-control" name="doenca_outras" id="doenca_outras" value="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <div class="mt-4 bg-light p-2">
                                            <h5 class="font-size-14 mb-4"><i class="mdi mdi-arrow-right text-primary me-1"></i> Doenças na Família</h5>
                                            <div class="row p-3">
                                                <div class="col-12 col-md-4 form-check mb-3">
                                                    <input class="form-check-input" type="checkbox" name="doenca_familia_diabetes" id="doenca_familia_diabetes">
                                                    <label class="form-check-label" for="doenca_familia_diabetes">{{ __('Diabetes') }}</label>
                                                </div>
                                                <div class="col-12 col-md-4 form-check mb-3">
                                                    <input class="form-check-input" type="checkbox" name="doenca_familia_hipertensao" id="doenca_familia_hipertensao">
                                                    <label class="form-check-label" for="doenca_familia_hipertensao">{{ __('Hipertensão') }}</label>
                                                </div>
                                                <div class="col-12 col-md-4 form-check mb-3">
                                                    <input class="form-check-input" type="checkbox" name="doenca_familia_epilepsia" id="doenca_familia_epilepsia">
                                                    <label class="form-check-label" for="doenca_familia_epilepsia">{{ __('Epilepsia') }}</label>
                                                </div>
                                                <div class="col-12 col-md-4 form-check mb-3">
                                                    <input class="form-check-input" type="checkbox" name="doenca_familia_cardiaca" id="doenca_familia_cardiaca">
                                                    <label class="form-check-label" for="doenca_familia_cardiaca">{{ __('Cardiáca') }}</label>
                                                </div>
                                                <div class="col-12 col-md-4 form-check mb-3">
                                                    <input class="form-check-input" type="checkbox" name="doenca_familia_cancer" id="doenca_familia_cancer">
                                                    <label class="form-check-label" for="doenca_familia_cancer">{{ __('Câncer') }}</label>
                                                </div>
                                            </div>
                                            <div class="form-group col-12 pb-3 p-2">
                                                <label class="form-label">{{ __('Outras') }}</label>
                                                <input type="text" class="form-control" name="doenca_familia_outras" id="doenca_familia_outras" value="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <div class="mt-4 bg-light p-2">
                                            <h5 class="font-size-14 mb-4"><i class="mdi mdi-arrow-right text-primary me-1"></i> Contato Emergencial 1</h5>
                                            <div class="row">
                                                <div class="form-group col-12 col-md-6 pb-3">
                                                    <label class="form-label">{{ __('Nome') }}</label>
                                                    <input type="text" class="form-control" name="contato_1_nome" id="contato_1_nome" value="">
                                                </div>
                                                <div class="form-group col-12 col-md-6 pb-3">
                                                    <label class="form-label">{{ __('Parentesco') }}</label>
                                                    <input type="text" class="form-control" name="contato_1_parentesco" id="contato_1_parentesco" value="">
                                                </div>
                                                <div class="form-group col-12 col-md-6 pb-3">
                                                    <label class="form-label">{{ __('Telefone') }}</label>
                                                    <input type="text" class="form-control mask_phone_with_ddd" name="contato_1_telefone" id="contato_1_telefone" value="">
                                                </div>
                                                <div class="form-group col-12 col-md-6 pb-3">
                                                    <label class="form-label">{{ __('Celular') }}</label>
                                                    <input type="text" class="form-control mask_cell_with_ddd" name="contato_1_celular" id="contato_1_celular" value="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <div class="mt-4 bg-light p-2">
                                            <h5 class="font-size-14 mb-4"><i class="mdi mdi-arrow-right text-primary me-1"></i> Contato Emergencial 2</h5>
                                            <div class="row">
                                                <div class="form-group col-12 col-md-6 pb-3">
                                                    <label class="form-label">{{ __('Nome') }}</label>
                                                    <input type="text" class="form-control" name="contato_2_nome" id="contato_2_nome" value="">
                                                </div>
                                                <div class="form-group col-12 col-md-6 pb-3">
                                                    <label class="form-label">{{ __('Parentesco') }}</label>
                                                    <input type="text" class="form-control" name="contato_2_parentesco" id="contato_2_parentesco" value="">
                                                </div>
                                                <div class="form-group col-12 col-md-6 pb-3">
                                                    <label class="form-label">{{ __('Telefone') }}</label>
                                                    <input type="text" class="form-control mask_phone_with_ddd" name="contato_2_telefone" id="contato_2_telefone" value="">
                                                </div>
                                                <div class="form-group col-12 col-md-6 pb-3">
                                                    <label class="form-label">{{ __('Celular') }}</label>
                                                    <input type="text" class="form-control mask_cell_with_ddd" name="contato_2_celular" id="contato_2_celular" value="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">{{ __('Deficiência? Qual?') }}</label>
                                        <input type="text" class="form-control" id="deficiencia_qual" name="deficiencia_qual">
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">{{ __('Cirutgia? Qual?') }}</label>
                                        <input type="text" class="form-control" id="cirurgia_quais_quando" name="cirurgia_quais_quando">
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">{{ __('Hospitalizado? Quando? Por que?') }}</label>
                                        <input type="text" class="form-control" id="hospitalizado_quando_porque" name="hospitalizado_quando_porque">
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">{{ __('Convulsões ou Epilepsia? Último episódio?') }}</label>
                                        <input type="text" class="form-control" id="convulsoes_epilepsia_ultimo_episodio" name="convulsoes_epilepsia_ultimo_episodio">
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">{{ __('Alergia? Medicamentos, alimentos ou substâncias?') }}</label>
                                        <input type="text" class="form-control" id="alergia_medicamentos_alimentos_substancias" name="alergia_medicamentos_alimentos_substancias">
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">{{ __('Medicação contínua? Qual(is), dosagem e horários?') }}</label>
                                        <input type="text" class="form-control" id="medicacao_continua_quais_dosagem_horarios" name="medicacao_continua_quais_dosagem_horarios">
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">{{ __('Plano de saúde?') }}</label>
                                        <input type="text" class="form-control" id="plano_saude_qual" name="plano_saude_qual">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Fumante') }}</label>
                                        <select class="form-control" name="fumante" id="fumante">
                                            <option value="">{{ __('Selecione...') }}</option>
                                            <option value="1">{{ __('SIM') }}</option>
                                            <option value="2">{{ __('NÃO') }}</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Bebida alcóolica') }}</label>
                                        <select class="form-control" name="bebida_alcoolica" id="bebida_alcoolica">
                                            <option value="">{{ __('Selecione...') }}</option>
                                            <option value="SIM">{{ __('SIM') }}</option>
                                            <option value="NÃO">{{ __('NÃO') }}</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">{{ __('Atividade física') }}</label>
                                        <select class="form-control" name="atividade_fisica" id="atividade_fisica">
                                            <option value="">{{ __('Selecione...') }}</option>
                                            <option value="SIM">{{ __('SIM') }}</option>
                                            <option value="NÃO">{{ __('NÃO') }}</option>
                                        </select>
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

<!-- Funcionário Ação 1 -->
<div id="funcionario_acao_1" style="display: none;">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="modal-buttons" id="funcionario_acao_1_botoes">
                        @if(\App\Facades\Permissoes::permissao(['edit']))
                            <!-- Botão Gerar PDF's -->
                            <button type="button" class="btn btn-success text-white waves-effect btn-label waves-light " data-bs-toggle="tooltip" data-bs-placement="top" data-bs-target="" data-id="0" title="" data-bs-original-title="Confirmar Operação" id="funcionario_acao_1_gerar_pdfs"><i class="fa fa-save label-icon"></i>Gerar PDF's</button>
                        @endif

                        <button type="button" class="btn btn-secondary text-white waves-effect btn-label waves-light " data-bs-toggle="tooltip" data-bs-placement="top" data-bs-target="" data-id="0" title="" data-bs-original-title="Cancelar Operação" id="funcionario_acao_1_cancelar"><i class="fa fa-arrow-left label-icon"></i>{{ __('Cancelar') }}</button>
                    </div>

                    <!-- Formulário - Form -->
                    <form id="funcionario_acao_1_formulario" name="funcionario_acao_1_formulario">
                        <div class="row mt-4">
                            <div class="row pt-4">
                                <h5 class="pb-4 text-primary"><i class="fas fa-user"></i> {{ __('Informações Gerais') }}</h5>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Local</label>
                                    <select class="form-control select2" name="funcionario_acao_1_local" id="funcionario_acao_1_local">
                                        <option value="">{{ __('Selecione...') }}</option>
                                        <option value="SAMBÓDROMO">SAMBÓDROMO</option>
                                        <option value="INTENDENTE MAGALHÃES">INTENDENTE MAGALHÃES</option>
                                        <option value="AVENIDA CHILE">AVENIDA CHILE</option>
                                        <option value="CINELÂNDIA">CINELÂNDIA</option>
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Dias e Horários</label>
                                    <input type="text" class="form-control" name="funcionario_acao_1_dias_horarios" id="funcionario_acao_1_dias_horarios">
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Valor</label>
                                    <input type="text" class="form-control mask_money" name="funcionario_acao_1_valor" id="funcionario_acao_1_valor" value="150.00">
                                </div>
                                <div class="form-group col-12 col-md-12 pb-3" id="funcionario_acao_1_grade_funcionarios"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
