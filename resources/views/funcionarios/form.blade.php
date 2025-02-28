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

                        <!-- Botão Info -->
                        <x-button-crud op="7" onclick="funcionarioModalInfo();" />

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
                            <input type="hidden" id="foto" name="foto" value="build/assets/images/funcionarios/funcionario-0.png">

                            <div class="row mt-4">
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-user"></i> Informa&ccedil;&otilde;es Gerais</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">CPF</label>
                                        <input type="text" class="form-control mask_cpf" id="cpf" name="cpf" required="required">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Tipo Contratação</label>
                                        <select class="form-control select2" name="contratacao_tipo_id" id="contratacao_tipo_id">
                                            <option value="">Selecione...</option>

                                            @foreach ($contratacao_tipos as $key => $contratacao_tipo)
                                                <option value="{{ $contratacao_tipo['id'] }}">{{ $contratacao_tipo['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Departamento</label>
                                        <select class="form-control select2" name="departamento_id" id="departamento_id">
                                            <option value="">Selecione...</option>

                                            @foreach ($departamentos as $key => $departamento)
                                                <option value="{{ $departamento['id'] }}">{{ $departamento['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Função</label>
                                        <select class="form-control select2" name="funcao_id" id="funcao_id">
                                            <option value="">Selecione...</option>

                                            @foreach ($funcoes as $key => $funcao)
                                                <option value="{{ $funcao['id'] }}">{{ $funcao['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Nome</label>
                                        <input type="text" class="form-control text-uppercase" id="name" name="name" required="required">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Nascimento</label>
                                        <input type="text" class="form-control mask_date" id="data_nascimento" name="data_nascimento" required="required">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Gênero</label>
                                        <select class="select2 form-control" name="genero_id" id="genero_id" required="required">
                                            <option value="">Selecione...</option>

                                            @foreach ($generos as $key => $genero)
                                                <option value="{{ $genero['id'] }}">{{ $genero['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Telefone 1</label>
                                        <input type="text" class="form-control mask_phone_with_ddd" id="telefone_1" name="telefone_1">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Telefone 2</label>
                                        <input type="text" class="form-control mask_phone_with_ddd" id="telefone_2" name="telefone_2">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Celular 1</label>
                                        <input type="text" class="form-control mask_cell_with_ddd" id="celular_1" name="celular_1">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Celular 2</label>
                                        <input type="text" class="form-control mask_cell_with_ddd" id="celular_2" name="celular_2">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">E-mail</label>
                                        <input type="email" class="form-control mask_email" id="email" name="email">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Estado Civil</label>
                                        <select class="form-control select2" name="estado_civil_id" id="estado_civil_id" required="required">
                                            <option value="">Selecione...</option>

                                            @foreach ($estados_civis as $key => $estado_civil)
                                                <option value="{{ $estado_civil['id'] }}">{{ $estado_civil['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Escolaridade</label>
                                        <select class="form-control select2" name="escolaridade_id" id="escolaridade_id">
                                            <option value="">Selecione...</option>

                                            @foreach ($escolaridades as $key => $escolaridade)
                                                <option value="{{ $escolaridade['id'] }}">{{ $escolaridade['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Nacionalidade</label>
                                        <select class="form-control select2" name="nacionalidade_id" id="nacionalidade_id">
                                            <option value="">Selecione...</option>

                                            @foreach ($nacionalidades as $key => $nacionalidade)
                                                <option value="{{ $nacionalidade['id'] }}">{{ $nacionalidade['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Naturalidade</label>
                                        <select class="form-control select2" name="naturalidade_id" id="naturalidade_id">
                                            <option value="">Selecione...</option>

                                            @foreach ($naturalidades as $key => $naturalidade)
                                                <option value="{{ $naturalidade['id'] }}">{{ $naturalidade['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Mãe</label>
                                        <input type="text" class="form-control text-uppercase" id="mae" name="mae">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Pai</label>
                                        <input type="text" class="form-control text-uppercase" id="pai" name="pai">
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-landmark"></i> Dados Bancários</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Banco</label>
                                        <select class="form-control select2" name="banco_id" id="banco_id">
                                            <option value="">Selecione...</option>

                                            @foreach ($bancos as $key => $banco)
                                                <option value="{{ $banco['id'] }}">{{ $banco['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Agência</label>
                                        <input type="text" class="form-control" id="agencia" name="agencia">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Conta</label>
                                        <input type="text" class="form-control" id="conta" name="conta">
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-user-tie"></i> Dados Profissionais</h5>
                                    <div class="form-group col-12 col-md-4 pb-3 contratacao_tipo_1">
                                        <label class="form-label">Data Admissão</label>
                                        <input type="text" class="form-control mask_date" id="data_admissao" name="data_admissao">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3 contratacao_tipo_1">
                                        <label class="form-label">Data Demissão</label>
                                        <input type="text" class="form-control mask_date" id="data_demissao" name="data_demissao">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3 contratacao_tipo_2">
                                        <label class="form-label">Data Cadastro</label>
                                        <input type="text" class="form-control mask_date" id="data_cadastro" name="data_cadastro">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3 contratacao_tipo_2">
                                        <label class="form-label">Data Afastamento</label>
                                        <input type="text" class="form-control mask_date" id="data_afastamento" name="data_afastamento">
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-paste"></i> Documentos</h5>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Identidade Pessoal (Órgão)</label>
                                        <select class="form-control select2" name="personal_identidade_orgao_id" id="personal_identidade_orgao_id">
                                            <option value="">Selecione...</option>

                                            @foreach ($identidade_orgaos as $key => $identidade_orgao)
                                                <option value="{{ $identidade_orgao['id'] }}">{{ $identidade_orgao['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Identidade Pessoal (Estado)</label>
                                        <select class="form-control select2" name="personal_identidade_estado_id" id="personal_identidade_estado_id">
                                            <option value="">Selecione...</option>

                                            @foreach ($identidade_estados as $key => $identidade_estado)
                                                <option value="{{ $identidade_estado['id'] }}">{{ $identidade_estado['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Identidade Pessoal (Número)</label>
                                        <input type="text" class="form-control" id="personal_identidade_numero" name="personal_identidade_numero">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Identidade Pessoal (Emissão)</label>
                                        <input type="text" class="form-control mask_date" id="personal_identidade_data_emissao" name="personal_identidade_data_emissao">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Identidade Profissional (Órgão)</label>
                                        <select class="form-control select2" name="professional_identidade_orgao_id" id="professional_identidade_orgao_id">
                                            <option value="">Selecione...</option>

                                            @foreach ($identidade_orgaos as $key => $identidade_orgao)
                                                <option value="{{ $identidade_orgao['id'] }}">{{ $identidade_orgao['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Identidade Profissional (Estado)</label>
                                        <select class="form-control select2" name="professional_identidade_estado_id" id="professional_identidade_estado_id">
                                            <option value="">Selecione...</option>

                                            @foreach ($identidade_estados as $key => $identidade_estado)
                                                <option value="{{ $identidade_estado['id'] }}">{{ $identidade_estado['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Identidade Profissional (Número)</label>
                                        <input type="text" class="form-control" id="professional_identidade_numero" name="professional_identidade_numero">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Identidade Profissional (Emissão)</label>
                                        <input type="text" class="form-control mask_date" id="professional_identidade_data_emissao" name="professional_identidade_data_emissao">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">PIS</label>
                                        <input type="text" class="form-control mask_pis" id="pis" name="pis">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">PASEP</label>
                                        <input type="text" class="form-control mask_pasep" id="pasep" name="pasep">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Carteira Trabalho</label>
                                        <input type="text" class="form-control" id="carteira_trabalho" name="carteira_trabalho">
                                    </div>
                                </div>
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-house-user"></i> Endereço</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">CEP</label>
                                        <input type="text" class="form-control mask_cep" id="cep" name="cep" onblur="pesquisacep(this.value);">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Número</label>
                                        <input type="text" class="form-control" id="numero" name="numero">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Complemento</label>
                                        <input type="text" class="form-control text-uppercase" id="complemento" name="complemento">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Logradouro</label>
                                        <input type="text" class="form-control text-uppercase" id="logradouro" name="logradouro" readonly="readonly">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Bairro</label>
                                        <input type="text" class="form-control text-uppercase" id="bairro" name="bairro" readonly="readonly">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Localidade</label>
                                        <input type="text" class="form-control text-uppercase" id="localidade" name="localidade" readonly="readonly">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">UF</label>
                                        <input type="text" class="form-control text-uppercase" id="uf" name="uf" readonly="readonly">
                                    </div>
                                </div>
                                <div class="row pt-4" id="divArquivosPdf" style="display: none;">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-file-pdf"></i> Arquivos PDF</h5>
                                    <div class="form-group col-12 col-md-12 pb-3">
                                        <h4 class="text-center font-size-12">## Grade de Documentos PDF ##</h4>
                                        <div class="table-responsive" id="divArquivosPdfGrade">Nenhum documento encontrado.</div>
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

                        <!-- Botão Info -->
                        <x-button-crud op="7" onclick="funcionarioModalInfo();" />

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
                    <div class="modal-buttons">
                        @if(\App\Facades\Permissoes::permissao(['edit']))
                            <!-- Botão Gerar PDF's -->
                            <button type="button" class="btn btn-success text-white waves-effect btn-label waves-light " data-bs-toggle="tooltip" data-bs-placement="top" data-bs-target="" data-id="0" title="" data-bs-original-title="Confirmar Operação" id="funcionario_acao_1_gerar_pdfs"><i class="fa fa-save label-icon"></i>Gerar PDF's</button>
                        @endif

                        <button type="button" class="btn btn-secondary text-white waves-effect btn-label waves-light " data-bs-toggle="tooltip" data-bs-placement="top" data-bs-target="" data-id="0" title="" data-bs-original-title="Cancelar Operação" id="funcionario_acao_1_cancelar"><i class="fa fa-arrow-left label-icon"></i>Cancelar</button>
                    </div>

                    <!-- Formulário - Form -->
                    <form id="funcionario_acao_1_formulario" name="funcionario_acao_1_formulario">
                        <div class="row mt-4">
                            <div class="row pt-4">
                                <h5 class="pb-4 text-primary"><i class="fas fa-user"></i> Informa&ccedil;&otilde;es Gerais</h5>


{{--                                <div class="form-group col-12 col-md-4 pb-3">--}}
{{--                                    <label class="form-label">Local</label>--}}
{{--                                    <select class="form-control select2" name="funcionario_acao_1_local" id="funcionario_acao_1_local">--}}
{{--                                        <option value="">Selecione...</option>--}}
{{--                                        <option value="Sambódromo">Sambódromo</option>--}}
{{--                                        <option value="Intendente Magalhães">Intendente Magalhães</option>--}}
{{--                                        <option value="Avenida Chile">Avenida Chile</option>--}}
{{--                                        <option value="Cinelândia">Cinelândia</option>--}}
{{--                                    </select>--}}
{{--                                </div>--}}
{{--                                <div class="form-group col-12 col-md-4 pb-3">--}}
{{--                                    <label class="form-label">Dia e Horário</label>--}}
{{--                                    <select class="form-control select2" name="funcionario_acao_1_dia_horario" id="funcionario_acao_1_dia_horario">--}}
{{--                                        <option value="">Selecione...</option>--}}
{{--                                        <option value="Sábado a partir das 7 horas">Sábado a partir das 7 horas</option>--}}
{{--                                        <option value="Domingo a partir das 7 horas">Domingo a partir das 7 horas</option>--}}
{{--                                        <option value="Segunda a partir das 7 horas">Segunda a partir das 7 horas</option>--}}
{{--                                        <option value="Terça a partir das 7 horas">Terça a partir das 7 horas</option>--}}
{{--                                        <option value="Quarta a partir das 7 horas">Quarta a partir das 7 horas</option>--}}
{{--                                    </select>--}}
{{--                                </div>--}}


                                <div class="form-group col-12 col-md-8 pb-3">
                                    <label class="form-label">Local, Data e Horário</label>
                                    <select class="form-control select2" name="funcionario_acao_1_local_data_horario" id="funcionario_acao_1_local_data_horario">
                                        <option value="">Selecione...</option>
                                        <option value="AVENIDA CHILE: 01/03/2025 das 16:00hs às 04:00hs">AVENIDA CHILE: 01/03/2025 das 16:00hs às 04:00hs</option>
                                        <option value="AVENIDA CHILE: 02/03/2025 das 15:00hs às 03:00hs">AVENIDA CHILE: 02/03/2025 das 15:00hs às 03:00hs</option>
                                        <option value="AVENIDA CHILE: 03/03/2025 das 15:00hs às 03:00hs">AVENIDA CHILE: 03/03/2025 das 15:00hs às 03:00hs</option>
                                        <option value="AVENIDA CHILE: 04/03/2025 das 13:00hs as 01:00hs">AVENIDA CHILE: 04/03/2025 das 13:00hs as 01:00hs</option>

                                        <option value="CINELÂNDIA: 01/03/2025 das 15:00hs às 03:00hs">CINELÂNDIA: 01/03/2025 das 15:00hs às 03:00hs</option>
                                        <option value="CINELÂNDIA: 02/03/2025 das 14:00hs às 02:00hs">CINELÂNDIA: 02/03/2025 das 14:00hs às 02:00hs</option>
                                        <option value="CINELÂNDIA: 03/03/2025 das 14:00hs às 02:00hs">CINELÂNDIA: 03/03/2025 das 14:00hs às 02:00hs</option>
                                        <option value="CINELÂNDIA: 04/03/2025 das 14:00hs as 02:00hs">CINELÂNDIA: 04/03/2025 das 14:00hs as 02:00hs</option>

                                        <option value="INTENDENTE MAGALHÃES: 01/03/2025 das 18:00hs às 06:00hs">INTENDENTE MAGALHÃES: 01/03/2025 das 18:00hs às 06:00hs</option>
                                    </select>
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
