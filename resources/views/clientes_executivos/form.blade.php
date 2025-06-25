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
                            <input type="hidden" id="foto" name="foto" value="build/assets/images/clientes_executivos/cliente_executivo-0.png">

                            <div class="row pt-4">
                                <h5 class="pb-4 text-primary"><i class="fas fa-house-user"></i> Informações Gerais</h5>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Cliente</label>
                                    <select class="form-control" name="cliente_id" id="cliente_id" required="required">
                                        <option value="">Selecione...</option>

                                        @foreach ($clientes as $cliente)
                                            <option value="{{ $cliente['id'] }}">{{ $cliente['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Executivo Nome</label>
                                    <input type="text" class="form-control text-uppercase" id="executivo_nome" name="executivo_nome">
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Executivo Função</label>
                                    <input type="text" class="form-control text-uppercase" id="executivo_funcao" name="executivo_funcao">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Nascimento</label>
                                    <input type="text" class="form-control mask_date" id="data_nascimento" name="data_nascimento" required="required">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Gênero</label>
                                    <select class="select2 form-control" name="genero_id" id="genero_id">
                                        <option value="">Selecione...</option>
                                        @foreach ($generos as $key => $genero)
                                            <option value="{{ $genero['id'] }}">{{ $genero['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Nacionalidade</label>
                                    <select class="select2 form-control" name="nacionalidade_id" id="nacionalidade_id">
                                        <option value="">Selecione...</option>
                                        @foreach ($nacionalidades as $nacionalidade)
                                            <option value="{{ $nacionalidade['id'] }}">{{ $nacionalidade['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">CPF</label>
                                    <input type="text" class="form-control mask_cpf" id="cpf" name="cpf">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Identidade (Órgão)</label>
                                    <select class="form-control select2" name="personal_identidade_orgao_id" id="personal_identidade_orgao_id">
                                        <option value="">Selecione...</option>

                                        @foreach ($identidade_orgaos as $key => $identidade_orgao)
                                            <option value="{{ $identidade_orgao['id'] }}">{{ $identidade_orgao['name'] }}</option>
                                        @endforeach

                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Identidade (Estado)</label>
                                    <select class="form-control select2" name="personal_identidade_estado_id" id="personal_identidade_estado_id">
                                        <option value="">Selecione...</option>

                                        @foreach ($identidade_estados as $key => $identidade_estado)
                                            <option value="{{ $identidade_estado['id'] }}">{{ $identidade_estado['name'] }}</option>
                                        @endforeach

                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Identidade (Número)</label>
                                    <input type="text" class="form-control" id="personal_identidade_numero" name="personal_identidade_numero">
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
                                <div class="form-group col-12 col-md-6 pb-3">
                                    <label class="form-label">E-mail</label>
                                    <input type="email" class="form-control mask_email" id="email" name="email">
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

                            <div class="row pt-4">
                                <h5 class="pb-4 text-primary"><i class="fas fa-address-card"></i> Cartão Emergencial</h5>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Tipo Sanguíneo</label>
                                    <select class="form-control" name="tipo_sanguineo" id="tipo_sanguineo">
                                        <option value="">Selecione...</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="AB">AB</option>
                                        <option value="O">O</option>
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Fator RH</label>
                                    <select class="form-control" name="fator_rh" id="fator_rh">
                                        <option value="">Selecione...</option>
                                        <option value="Positivo">Positivo</option>
                                        <option value="Negativo">Negativo</option>
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Altura</label>
                                    <input type="number" class="form-control mask_money" name="altura" id="altura">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Peso</label>
                                    <input type="number" class="form-control mask_money" name="peso" id="peso">
                                </div>
                                <div class="form-group col-12 col-md-6 pb-3">
                                    <div class="mt-4 bg-light p-2">
                                        <h5 class="font-size-14 mb-4"><i class="mdi mdi-arrow-right text-primary me-1"></i> Doenças</h5>
                                        <div class="row p-3">
                                            <div class="col-12 col-md-4 form-check mb-3">
                                                <input class="form-check-input" type="checkbox" name="doenca_diabetes" id="doenca_diabetes">
                                                <label class="form-check-label" for="doenca_diabetes">Diabetes</label>
                                            </div>
                                            <div class="col-12 col-md-4 form-check mb-3">
                                                <input class="form-check-input" type="checkbox" name="doenca_hipertensao" id="doenca_hipertensao">
                                                <label class="form-check-label" for="doenca_hipertensao">Hipertensão</label>
                                            </div>
                                            <div class="col-12 col-md-4 form-check mb-3">
                                                <input class="form-check-input" type="checkbox" name="doenca_asma" id="doenca_asma">
                                                <label class="form-check-label" for="doenca_asma">Asma</label>
                                            </div>
                                            <div class="col-12 col-md-4 form-check mb-3">
                                                <input class="form-check-input" type="checkbox" name="doenca_renal" id="doenca_renal">
                                                <label class="form-check-label" for="doenca_renal">Renal</label>
                                            </div>
                                            <div class="col-12 col-md-4 form-check mb-3">
                                                <input class="form-check-input" type="checkbox" name="doenca_cardiaca" id="doenca_cardiaca">
                                                <label class="form-check-label" for="doenca_cardiaca">Cardiáca</label>
                                            </div>
                                        </div>
                                        <div class="col-12 form-group col-12 pb-3 p-2">
                                            <label class="form-label">Outras</label>
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
                                                <label class="form-check-label" for="doenca_familia_diabetes">Diabetes</label>
                                            </div>
                                            <div class="col-12 col-md-4 form-check mb-3">
                                                <input class="form-check-input" type="checkbox" name="doenca_familia_hipertensao" id="doenca_familia_hipertensao">
                                                <label class="form-check-label" for="doenca_familia_hipertensao">Hipertensão</label>
                                            </div>
                                            <div class="col-12 col-md-4 form-check mb-3">
                                                <input class="form-check-input" type="checkbox" name="doenca_familia_epilepsia" id="doenca_familia_epilepsia">
                                                <label class="form-check-label" for="doenca_familia_epilepsia">Epilepsia</label>
                                            </div>
                                            <div class="col-12 col-md-4 form-check mb-3">
                                                <input class="form-check-input" type="checkbox" name="doenca_familia_cardiaca" id="doenca_familia_cardiaca">
                                                <label class="form-check-label" for="doenca_familia_cardiaca">Cardiáca</label>
                                            </div>
                                            <div class="col-12 col-md-4 form-check mb-3">
                                                <input class="form-check-input" type="checkbox" name="doenca_familia_cancer" id="doenca_familia_cancer">
                                                <label class="form-check-label" for="doenca_familia_cancer">Câncer</label>
                                            </div>
                                        </div>
                                        <div class="form-group col-12 pb-3 p-2">
                                            <label class="form-label">Outras</label>
                                            <input type="text" class="form-control" name="doenca_familia_outras" id="doenca_familia_outras" value="">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-12 col-md-6 pb-3">
                                    <div class="mt-4 bg-light p-2">
                                        <h5 class="font-size-14 mb-4"><i class="mdi mdi-arrow-right text-primary me-1"></i> Contato Emergencial 1</h5>
                                        <div class="row">
                                            <div class="form-group col-12 col-md-6 pb-3">
                                                <label class="form-label">Nome</label>
                                                <input type="text" class="form-control" name="contato_1_nome" id="contato_1_nome" value="">
                                            </div>
                                            <div class="form-group col-12 col-md-6 pb-3">
                                                <label class="form-label">Parentesco</label>
                                                <input type="text" class="form-control" name="contato_1_parentesco" id="contato_1_parentesco" value="">
                                            </div>
                                            <div class="form-group col-12 col-md-6 pb-3">
                                                <label class="form-label">Telefone</label>
                                                <input type="text" class="form-control mask_phone_with_ddd" name="contato_1_telefone" id="contato_1_telefone" value="">
                                            </div>
                                            <div class="form-group col-12 col-md-6 pb-3">
                                                <label class="form-label">Celular</label>
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
                                                <label class="form-label">Nome</label>
                                                <input type="text" class="form-control" name="contato_2_nome" id="contato_2_nome" value="">
                                            </div>
                                            <div class="form-group col-12 col-md-6 pb-3">
                                                <label class="form-label">Parentesco</label>
                                                <input type="text" class="form-control" name="contato_2_parentesco" id="contato_2_parentesco" value="">
                                            </div>
                                            <div class="form-group col-12 col-md-6 pb-3">
                                                <label class="form-label">Telefone</label>
                                                <input type="text" class="form-control mask_phone_with_ddd" name="contato_2_telefone" id="contato_2_telefone" value="">
                                            </div>
                                            <div class="form-group col-12 col-md-6 pb-3">
                                                <label class="form-label">Celular</label>
                                                <input type="text" class="form-control mask_cell_with_ddd" name="contato_2_celular" id="contato_2_celular" value="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-12 col-md-6 pb-3">
                                    <label class="form-label">Deficiência? Qual?</label>
                                    <input type="text" class="form-control" id="deficiencia_qual" name="deficiencia_qual">
                                </div>
                                <div class="form-group col-12 col-md-6 pb-3">
                                    <label class="form-label">Cirutgia? Qual?</label>
                                    <input type="text" class="form-control" id="cirurgia_quais_quando" name="cirurgia_quais_quando">
                                </div>
                                <div class="form-group col-12 col-md-6 pb-3">
                                    <label class="form-label">Hospitalizado? Quando? Por que?</label>
                                    <input type="text" class="form-control" id="hospitalizado_quando_porque" name="hospitalizado_quando_porque">
                                </div>
                                <div class="form-group col-12 col-md-6 pb-3">
                                    <label class="form-label">Convulsões ou Epilepsia? Último episódio?</label>
                                    <input type="text" class="form-control" id="convulsoes_epilepsia_ultimo_episodio" name="convulsoes_epilepsia_ultimo_episodio">
                                </div>
                                <div class="form-group col-12 col-md-6 pb-3">
                                    <label class="form-label">Alergia? Medicamentos, alimentos ou substâncias?</label>
                                    <input type="text" class="form-control" id="alergia_medicamentos_alimentos_substancias" name="alergia_medicamentos_alimentos_substancias">
                                </div>
                                <div class="form-group col-12 col-md-6 pb-3">
                                    <label class="form-label">Medicação contínua? Qual(is), dosagem e horários?</label>
                                    <input type="text" class="form-control" id="medicacao_continua_quais_dosagem_horarios" name="medicacao_continua_quais_dosagem_horarios">
                                </div>
                                <div class="form-group col-12 col-md-6 pb-3">
                                    <label class="form-label">Plano de saúde?</label>
                                    <input type="text" class="form-control" id="plano_saude_qual" name="plano_saude_qual">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Fumante</label>
                                    <select class="form-control" name="fumante" id="fumante">
                                        <option value="">Selecione...</option>
                                        <option value="1">SIM</option>
                                        <option value="2">NÃO</option>
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Bebida alcóolica</label>
                                    <select class="form-control" name="bebida_alcoolica" id="bebida_alcoolica">
                                        <option value="">Selecione...</option>
                                        <option value="SIM">SIM</option>
                                        <option value="NÃO">NÃO</option>
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Atividade física</label>
                                    <select class="form-control" name="atividade_fisica" id="atividade_fisica">
                                        <option value="">Selecione...</option>
                                        <option value="SIM">SIM</option>
                                        <option value="NÃO">NÃO</option>
                                    </select>
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
                </div>
            </div>
        </div>
    </div>
</div>
