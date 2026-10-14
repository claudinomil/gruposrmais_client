// Formulário Padrão - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Formulário Padrão - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function validar_frm_funcionarios() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: contratacao_tipo_id (requerido)
    if (validacao({ op: 1, value: document.getElementById('contratacao_tipo_id').value }) === false) {
        validacao_ok = false;
        mensagem += 'Contratação Tipo requerido.' + '<br>';
    }

    //Campo: contratacao_tipo_id (select)
    if (validacao({ op: 4, value: document.getElementById('contratacao_tipo_id').value }) === false) {
        validacao_ok = false;
        mensagem += 'Contratação Tipo deve ser escolhido.' + '<br>';
    }

    //Campo: cpf (requerido)
    if (validacao({ op: 1, value: document.getElementById('cpf').value }) === false) {
        validacao_ok = false;
        mensagem += 'CPF requerido.' + '<br>';
    }

    //Campo: cpf (CPF Válido)
    if (validacao({ op: 7, value: document.getElementById('cpf').value }) === false) {
        validacao_ok = false;
        mensagem += 'CPF Inválido.' + '<br>';
    }

    //Campo: name (requerido)
    if (validacao({ op: 1, value: document.getElementById('name').value }) === false) {
        validacao_ok = false;
        mensagem += 'Nome requerido.' + '<br>';
    }

    //Campo: name (mínimo de 3 caracteres)
    if (validacao({ op: 2, value: document.getElementById('name').value, minCaracteres: 3 }) === false) {
        validacao_ok = false;
        mensagem += 'Nome precisa ter no mínimo 3 caracteres.' + '<br>';
    }

    //Campo: nome_profissional (requerido)
    if (validacao({ op: 1, value: document.getElementById('nome_profissional').value }) === false) {
        validacao_ok = false;
        mensagem += 'Nome Profissional requerido.' + '<br>';
    }

    //Campo: nome_profissional (mínimo de 3 caracteres)
    if (validacao({ op: 2, value: document.getElementById('nome_profissional').value, minCaracteres: 3 }) === false) {
        validacao_ok = false;
        mensagem += 'Nome Profissional precisa ter no mínimo 3 caracteres.' + '<br>';
    }

    //Campo: data_nascimento (requerido)
    if (validacao({ op: 1, value: document.getElementById('data_nascimento').value }) === false) {
        validacao_ok = false;
        mensagem += 'Data Nascimento requerido.' + '<br>';
    }

    //Campo: data_nascimento (Data Válida)
    if (validacao({ op: 8, value: document.getElementById('data_nascimento').value }) === false) {
        validacao_ok = false;
        mensagem += 'Data Nascimento Inválida.' + '<br>';
    }

    //Campo: genero_id (requerido)
    if (validacao({ op: 1, value: document.getElementById('genero_id').value }) === false) {
        validacao_ok = false;
        mensagem += 'Gênero requerido.' + '<br>';
    }

    //Campo: telefone_1 (não requerido / Telefone Válido)
    if (validacao({ op: 1, value: document.getElementById('telefone_1').value }) === true) {
        //Campo: telefone_1 (Telefone Válido)
        if (validacao({ op: 11, value: document.getElementById('telefone_1').value }) === false) {
            validacao_ok = false;
            mensagem += 'Telefone 1 Inválido.' + '<br>';
        }
    }

    //Campo: telefone_2 (não requerido / Telefone Válido)
    if (validacao({ op: 1, value: document.getElementById('telefone_2').value }) === true) {
        //Campo: telefone_2 (Telefone Válido)
        if (validacao({ op: 11, value: document.getElementById('telefone_2').value }) === false) {
            validacao_ok = false;
            mensagem += 'Telefone 2 Inválido.' + '<br>';
        }
    }

    //Campo: celular_1 (não requerido / Celular Válido)
    if (validacao({ op: 1, value: document.getElementById('celular_1').value }) === true) {
        //Campo: celular_1 (Celular Válido)
        if (validacao({ op: 12, value: document.getElementById('celular_1').value }) === false) {
            validacao_ok = false;
            mensagem += 'Celular 1 Inválido.' + '<br>';
        }
    }

    //Campo: celular_2 (não requerido / Celular Válido)
    if (validacao({ op: 1, value: document.getElementById('celular_2').value }) === true) {
        //Campo: celular_2 (Celular Válido)
        if (validacao({ op: 12, value: document.getElementById('celular_2').value }) === false) {
            validacao_ok = false;
            mensagem += 'Celular 2 Inválido.' + '<br>';
        }
    }

    //Campo: email (não requerido / E-mail Válido)
    if (validacao({ op: 1, value: document.getElementById('email').value }) === true) {
        //Campo: email (E-mail Válido)
        if (validacao({ op: 5, value: document.getElementById('email').value }) === false) {
            validacao_ok = false;
            mensagem += 'E-mail Inválido.' + '<br>';
        }
    }

    //Campo: data_admissao (não requerido / Data Válida)
    if (validacao({ op: 1, value: document.getElementById('data_admissao').value }) === true) {
        //Campo: data_admissao (Data Válida)
        if (validacao({ op: 8, value: document.getElementById('data_admissao').value }) === false) {
            validacao_ok = false;
            mensagem += 'Data Admissão Inválida.' + '<br>';
        }
    }

    //Campo: data_demissao (não requerido / Data Válida)
    if (validacao({ op: 1, value: document.getElementById('data_demissao').value }) === true) {
        //Campo: data_demissao (Data Válida)
        if (validacao({ op: 8, value: document.getElementById('data_demissao').value }) === false) {
            validacao_ok = false;
            mensagem += 'Data Demissão Inválida.' + '<br>';
        } else {
            //Campo: data_admissao (requerido)
            if (validacao({ op: 1, value: document.getElementById('data_admissao').value }) === false) {
                validacao_ok = false;
                mensagem += 'Data Admissão Requerida.' + '<br>';
            }

            //Campo: motivo_demissao_id (select)
            if (validacao({ op: 4, value: document.getElementById('motivo_demissao_id').value }) === false) {
                validacao_ok = false;
                mensagem += 'Motivo Demissão deve ser escolhido.' + '<br>';
            }
        }
    }

    //Campo: data_cadastro (não requerido / Data Válida)
    if (validacao({ op: 1, value: document.getElementById('data_cadastro').value }) === true) {
        //Campo: data_cadastro (Data Válida)
        if (validacao({ op: 8, value: document.getElementById('data_cadastro').value }) === false) {
            validacao_ok = false;
            mensagem += 'Data Cadastro Inválida.' + '<br>';
        }
    }

    //Campo: data_afastamento (não requerido / Data Válida)
    if (validacao({ op: 1, value: document.getElementById('data_afastamento').value }) === true) {
        //Campo: data_afastamento (Data Válida)
        if (validacao({ op: 8, value: document.getElementById('data_afastamento').value }) === false) {
            validacao_ok = false;
            mensagem += 'Data Afastamento Inválida.' + '<br>';
        } else {
            //Campo: data_cadastro (requerido)
            if (validacao({ op: 1, value: document.getElementById('data_cadastro').value }) === false) {
                validacao_ok = false;
                mensagem += 'Data Cadastro Requerida.' + '<br>';
            }

            //Campo: motivo_afastamento_id (select)
            if (validacao({ op: 4, value: document.getElementById('motivo_afastamento_id').value }) === false) {
                validacao_ok = false;
                mensagem += 'Motivo Afastamento deve ser escolhido.' + '<br>';
            }
        }
    }

    //Campo: carteira_nacional_numero (não requerido / somente números)
    if (validacao({ op: 1, value: document.getElementById('carteira_nacional_numero').value }) === true) {
        //Campo: carteira_nacional_numero (somente números)
        if (validacao({ op: 4, value: document.getElementById('carteira_nacional_numero').value }) === false) {
            validacao_ok = false;
            mensagem += 'Carteira Nacional Número só pode conter dígitos de 0 a 9.' + '<br>';
        }
    }

    //Campo: carteira_nacional_data_emissao (não requerido / Data Válida)
    if (validacao({ op: 1, value: document.getElementById('carteira_nacional_data_emissao').value }) === true) {
        //Campo: carteira_nacional_data_emissao (Data Válida)
        if (validacao({ op: 8, value: document.getElementById('carteira_nacional_data_emissao').value }) === false) {
            validacao_ok = false;
            mensagem += 'Carteira Nacional Data Emissão Inválida.' + '<br>';
        }
    }

    //Campo: personal_identidade_numero (não requerido / somente números)
    if (validacao({ op: 1, value: document.getElementById('personal_identidade_numero').value }) === true) {
        //Campo: personal_identidade_numero (somente números)
        if (validacao({ op: 4, value: document.getElementById('personal_identidade_numero').value }) === false) {
            validacao_ok = false;
            mensagem += 'Identidade Pessoal Número só pode conter dígitos de 0 a 9.' + '<br>';
        }
    }

    //Campo: personal_identidade_data_emissao (não requerido / Data Válida)
    if (validacao({ op: 1, value: document.getElementById('personal_identidade_data_emissao').value }) === true) {
        //Campo: personal_identidade_data_emissao (Data Válida)
        if (validacao({ op: 8, value: document.getElementById('personal_identidade_data_emissao').value }) === false) {
            validacao_ok = false;
            mensagem += 'Identidade Pessoal Data Emissão Inválida.' + '<br>';
        }
    }

    //Campo: professional_identidade_numero (não requerido / somente números)
    if (validacao({ op: 1, value: document.getElementById('professional_identidade_numero').value }) === true) {
        //Campo: professional_identidade_numero (somente números)
        if (validacao({ op: 4, value: document.getElementById('professional_identidade_numero').value }) === false) {
            validacao_ok = false;
            mensagem += 'Identidade Profissional Número só pode conter dígitos de 0 a 9.' + '<br>';
        }
    }

    //Campo: professional_identidade_data_emissao (não requerido / Data Válida)
    if (validacao({ op: 1, value: document.getElementById('professional_identidade_data_emissao').value }) === true) {
        //Campo: professional_identidade_data_emissao (Data Válida)
        if (validacao({ op: 8, value: document.getElementById('professional_identidade_data_emissao').value }) === false) {
            validacao_ok = false;
            mensagem += 'Identidade Profissional Data Emissão Inválida.' + '<br>';
        }
    }

    //Campo: pis (não requerido / PIS Válido)
    if (validacao({ op: 1, value: document.getElementById('pis').value }) === true) {
        //Campo: pis (PIS Válido)
        if (validacao({ op: 13, value: document.getElementById('pis').value }) === false) {
            validacao_ok = false;
            mensagem += 'PIS Inválido.' + '<br>';
        }
    }

    //Campo: pasep (não requerido / PASEP Válido)
    if (validacao({ op: 1, value: document.getElementById('pasep').value }) === true) {
        //Campo: pasep (PASEP Válido)
        if (validacao({ op: 14, value: document.getElementById('pasep').value }) === false) {
            validacao_ok = false;
            mensagem += 'PASEP Inválido.' + '<br>';
        }
    }

    //Campo: carteira_trabalho (não requerido / Carteira Trabalho Válido)
    if (validacao({ op: 1, value: document.getElementById('carteira_trabalho').value }) === true) {
        //Campo: carteira_trabalho (Carteira Trabalho Válido)
        if (validacao({ op: 15, value: document.getElementById('carteira_trabalho').value }) === false) {
            validacao_ok = false;
            mensagem += 'Carteira Trabalho Inválido.' + '<br>';
        }
    }

    //Campo: cep (não requerido / CEP Válido)
    if (validacao({ op: 1, value: document.getElementById('cep').value }) === true) {
        //Campo: cep (CEP Válido)
        if (validacao({ op: 9, value: document.getElementById('cep').value }) === false) {
            validacao_ok = false;
            mensagem += 'CEP Inválido.' + '<br>';
        }
    }

    //Campo: numero (não requerido / somente números)
    if (validacao({ op: 1, value: document.getElementById('numero').value }) === true) {
        //Campo: numero (somente números)
        if (validacao({ op: 4, value: document.getElementById('numero').value }) === false) {
            validacao_ok = false;
            mensagem += 'Número só pode conter dígitos de 0 a 9.' + '<br>';
        }
    }

    //Mensagem
    if (validacao_ok === false) {
        var texto = '<div class="pt-3">';
        texto += '<div class="col-12 text-start font-size-12">' + mensagem + '</div>';
        texto += '</div>';

        alertSwal('warning', 'Validação', texto, 'true', 5000);
    }

    //Retorno
    return validacao_ok;
}
// Formulário Padrão - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Formulário Padrão - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Funções - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Funções - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function funcionarioModalInfoControle(op, id = '') {
    if (id == '') { id = document.getElementById('mi_fun_funcionario_id').value; }

    // Elementos
    var div_fotografias = document.getElementById('md_fun_div_fotografias');
    var div_dados = document.getElementById('md_fun_div_dados');
    var div_documentos = document.getElementById('md_fun_div_documentos');
    var div_editar_documentos = document.getElementById('md_fun_div_editar_documentos');
    var div_editar_documentos_mensais = document.getElementById('md_fun_div_editar_documentos_mensais');
    var div_documentos_mensais = document.getElementById('md_fun_div_documentos_mensais');
    var div_editar_documentos_exigidos = document.getElementById('md_fun_div_editar_documentos_exigidos');
    var div_documentos_exigidos = document.getElementById('md_fun_div_documentos_exigidos');
    var div_entregas_uniformes = document.getElementById('md_fun_div_entregas_uniformes');
    var div_cartao_emergencial = document.getElementById('md_fun_div_cartao_emergencial');

    // Divs ClassList
    if (div_fotografias) {
        div_fotografias.classList.remove('d-lg-flex');
        div_fotografias.classList.add('d-none');
    }

    div_dados.classList.remove('d-lg-flex');
    div_dados.classList.add('d-none');

    div_documentos.classList.remove('d-lg-flex');
    div_documentos.classList.add('d-none');

    div_documentos_mensais.classList.remove('d-lg-flex');
    div_documentos_mensais.classList.add('d-none');

    if (div_editar_documentos) {
        div_editar_documentos.classList.remove('d-lg-flex');
        div_editar_documentos.classList.add('d-none');
    }

    if (div_editar_documentos_mensais) {
        div_editar_documentos_mensais.classList.remove('d-lg-flex');
        div_editar_documentos_mensais.classList.add('d-none');
    }

    if (div_editar_documentos_exigidos) {
        div_editar_documentos_exigidos.classList.remove('d-lg-flex');
        div_editar_documentos_exigidos.classList.add('d-none');
    }

    div_documentos_exigidos.classList.remove('d-lg-flex');
    div_documentos_exigidos.classList.add('d-none');

    div_entregas_uniformes.classList.remove('d-lg-flex');
    div_entregas_uniformes.classList.add('d-none');

    div_cartao_emergencial.classList.remove('d-lg-flex');
    div_cartao_emergencial.classList.add('d-none');

    // Estatisticas
    await funcionarioModalInfoEstatisticas(id);

    // Fotografias
    if (op == 1) {
        div_fotografias.classList.remove('d-none');
        div_fotografias.classList.add('d-lg-flex');
    }

    // Dados
    if (op == 2) {
        div_dados.classList.remove('d-none');
        div_dados.classList.add('d-lg-flex');

        await funcionarioModalInfoDados(id);
    }

    // Documentos
    if (op == 3) {
        div_documentos.classList.remove('d-none');
        div_documentos.classList.add('d-lg-flex');

        await funcionarioModalInfoDocumentos(id);
    }

    // Editar Documentos
    if (op == 6) {
        div_editar_documentos.classList.remove('d-none');
        div_editar_documentos.classList.add('d-lg-flex');
    }

    // Documentos Mensais
    if (op == 7) {
        div_documentos_mensais.classList.remove('d-none');
        div_documentos_mensais.classList.add('d-lg-flex');

        funcionarioModalInfoDocumentosMensais(id);
    }

    // Editar Documentos Mensais
    if (op == 8) {
        div_editar_documentos_mensais.classList.remove('d-none');
        div_editar_documentos_mensais.classList.add('d-lg-flex');

        // Limpando Campos
        document.getElementById('div_documentos_mensais_files').innerHTML = '';
    }

    // Editar Documentos Exigidos
    if (op == 13) {
        div_editar_documentos_exigidos.classList.remove('d-none');
        div_editar_documentos_exigidos.classList.add('d-lg-flex');

        await funcionarioModalInfoEditarDocumentosExigidos(id);
    }

    // Documentos Exigidos
    if (op == 14) {
        div_documentos_exigidos.classList.remove('d-none');
        div_documentos_exigidos.classList.add('d-lg-flex');

        await funcionarioModalInfoDocumentosExigidos(id);
    }

    // Entregas de Uniformes
    if (op == 16) {
        div_entregas_uniformes.classList.remove('d-none');
        div_entregas_uniformes.classList.add('d-lg-flex');

        await funcionarioModalInfoEntregasUniformes(id);
    }

    // Cartão Emergencial
    if (op == 15) {
        div_cartao_emergencial.classList.remove('d-none');
        div_cartao_emergencial.classList.add('d-lg-flex');

        //Colocar imagem do Cartão emergencial
        if (id == '') {id = document.getElementById('mi_fun_funcionario_id').value;}
        cartaoEmergencialGerarPDF(2, id, 1, 'pt', 'fun_cartao_emergencial_1');
        cartaoEmergencialGerarPDF(2, id, 1, 'en', 'fun_cartao_emergencial_2');
    }
}

async function funcionarioModalInfoFiltrarDadosComboBoxes() { }
// Modal INFO - Funções - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Funções - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Estatísticas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Estatísticas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function funcionarioModalInfoEstatisticas(id = '') {
    if (id === '') {
        id = document.getElementById('mi_fun_funcionario_id').value;
    }

    const url_atual = `${window.location.protocol}//${window.location.host}/`;

    try {
        const response = await fetch(`${url_atual}funcionarios/modalInfo/estatisticas/${id}`, {
            method: 'GET',
            headers: { 'REQUEST-ORIGIN': 'fetch' }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const estatisticas = await response.json();

        // Atualizar elementos da tela
        document.getElementById('md_fun_estatisticas_documentos').innerHTML = estatisticas.documentos;
        document.getElementById('md_fun_estatisticas_documentos_mensais').innerHTML = estatisticas.documentos_mensais;
        document.getElementById('md_fun_estatisticas_documentos_exigidos').innerHTML = estatisticas.documentos_exigidos;
        document.getElementById('md_fun_estatisticas_entregas_uniformes').innerHTML = estatisticas.entregas_uniformes;

        // retornando algo para o await do chamador "esperar"
        return true;
    } catch (error) {
        alert('Erro funcionarioModalInfoEstatisticas: ' + error.message);
        throw error; // repassa o erro para o chamador se quiser tratar lá
    }
}
// Modal INFO - Estatísticas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Estatísticas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Fotografias - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Fotografias - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function validar_frm_upload_fotografia_documento() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: fun_fotografia_documento_file (arquivo requerido)
    if (validacao({op:18, id:'fun_fotografia_documento_file'}) === false) {
        validacao_ok = false;
        mensagem += 'Arquivo requerido.'+'<br>';
    }

    //Mensagem
    if (validacao_ok === false) {
        var texto = '<div class="pt-3">';
        texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
        texto += '</div>';

        alertSwal('warning', 'Validação', texto, 'true', 5000);
    }

    //Retorno
    return validacao_ok;
}

function validar_frm_upload_fotografia_cartao_emergencial() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: fun_fotografia_cartao_emergencial_file (arquivo requerido)
    if (validacao({op:18, id:'fun_fotografia_cartao_emergencial_file'}) === false) {
        validacao_ok = false;
        mensagem += 'Arquivo requerido.'+'<br>';
    }

    //Mensagem
    if (validacao_ok === false) {
        var texto = '<div class="pt-3">';
        texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
        texto += '</div>';

        alertSwal('warning', 'Validação', texto, 'true', 5000);
    }

    //Retorno
    return validacao_ok;
}

function DOMContentLoadedFotografiaDocumento() {
    const frm_upload_fotografia_documento_fun_executar = document.getElementById('frm_upload_fotografia_documento_fun_executar');

    if (frm_upload_fotografia_documento_fun_executar) {
        frm_upload_fotografia_documento_fun_executar.addEventListener('click', function () {
            //FormData
            var formulario = document.getElementById('frm_upload_fotografia_documento_fun');
            var formData = new FormData(formulario);
            var url_atual = window.location.protocol + '//' + window.location.host + '/';

            //Tratar Botões
            frm_upload_fotografia_documento_fun_executar.style.display = 'block';

            //Criticando campos
            if (validar_frm_upload_fotografia_documento() === false) { return false; }

            //Acessar rota
            fetch(url_atual + 'funcionarios/uploadFotografia/upload_fotografia_documento', {
                method: 'POST',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: formData
            }).then(response => {
                return response.json();
            }).then(data => {
                //Lendo dados
                if (data.success) {
                    //Atualizando Fotografias documento
                    const fileInput = document.getElementById('fun_fotografia_documento_file');
                    if (fileInput) {
                        const file = fileInput.files[0];
                        if (file) {
                            var reader = new FileReader();
                            reader.onload = function () {
                                document.getElementById('mi_fun_fotografia').src = reader.result;
                                document.getElementById('mi_fun_fotografia_documento').src = reader.result;
                            };
                            reader.readAsDataURL(file);
                        }
                    }

                    //Reset Form
                    formulario.reset();
                } else if (data.error) {
                    alertSwal('warning', 'Funcionarios', data.error, 'true', 3000);
                } else {
                    alert('Erro interno');
                }
            }).catch(error => {
                alert('Erro Funcionarios Upload Fotografia Documento: ' + error);
            });
        });
    }
}

function DOMContentLoadedFotografiaCartaoEmergencial() {
    const frm_upload_fotografia_cartao_emergencial_fun_executar = document.getElementById('frm_upload_fotografia_cartao_emergencial_fun_executar');

    if (frm_upload_fotografia_cartao_emergencial_fun_executar) {
        frm_upload_fotografia_cartao_emergencial_fun_executar.addEventListener('click', function () {
            //FormData
            var formulario = document.getElementById('frm_upload_fotografia_cartao_emergencial_fun');
            var formData = new FormData(formulario);
            var url_atual = window.location.protocol + '//' + window.location.host + '/';

            //Tratar Botões
            frm_upload_fotografia_cartao_emergencial_fun_executar.style.display = 'block';

            //Criticando campos
            if (validar_frm_upload_fotografia_cartao_emergencial() === false) { return false; }

            //Acessar rota
            fetch(url_atual + 'funcionarios/uploadFotografia/upload_fotografia_cartao_emergencial', {
                method: 'POST',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: formData
            }).then(response => {
                return response.json();
            }).then(data => {
                //Lendo dados
                if (data.success) {
                    //Atualizando Fotografias cartao_emergencial
                    const fileInput = document.getElementById('fun_fotografia_cartao_emergencial_file');
                    if (fileInput) {
                        const file = fileInput.files[0];
                        if (file) {
                            var reader = new FileReader();
                            reader.onload = function () {
                                // document.getElementById('mi_fun_fotografia').src = reader.result;
                                document.getElementById('mi_fun_fotografia_cartao_emergencial').src = reader.result;
                            };
                            reader.readAsDataURL(file);
                        }
                    }

                    //Reset Form
                    formulario.reset();
                } else if (data.error) {
                    alertSwal('warning', 'Funcionarios', data.error, 'true', 3000);
                } else {
                    alert('Erro interno');
                }
            }).catch(error => {
                alert('Erro Funcionarios Upload Fotografia Cartão Emergencial: ' + error);
            });
        });
    }
}
// Modal INFO - Fotografias - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Fotografias - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Dados - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Dados - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function funcionarioModalInfoDados(id = '', retornoControle = 0) {
    // Estatisticas
    await funcionarioModalInfoEstatisticas(id);

    if (id == '') {id = document.getElementById('mi_fun_funcionario_id').value;}

    //Abrir Modal
    var modalEl = document.getElementById('funcionario_modal_info');
    if (!modalEl.classList.contains('show')) {
        new bootstrap.Modal(document.getElementById('funcionario_modal_info')).show();
        ajustarMargensModalsInfo({ modalId: 'funcionario_modal_info', height: 96, width: 96, top: 2, bottom: 2, left: 2, right: 2 });
    }

    //Limpando dados
    let elementos = document.querySelectorAll('.clearClass');
    elementos.forEach(elemento => {elemento.src = ''; elemento.innerHTML = '';});

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'funcionarios/modalInfo/modal_info/'+id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let json = data;

        //Lendo dados funcionario
        let funcionario = json.funcionario;

        //Campo fun_editar_documentos_documento_id''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        const selectDocumento = document.getElementById('fun_editar_documentos_documento_id');
        if (selectDocumento) {
            const options = selectDocumento.querySelectorAll('option');

            options.forEach(option => {
                //Sempre mostrar a primeira opção (placeholder)
                if (option.value === '') {
                    option.style.display = 'block';
                    return;
                }
            });

            //Resetar o valor selecionado sempre que mudar o tipo
            selectDocumento.value = '';
        }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Passando dados funcionario''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        // Header
        var mi_fun_header_nome = funcionario.name + (funcionario.nome_fantasia ? '<br>' + '<span class="text-success font-size-11">'+funcionario.nome_fantasia+'</span>' : '');
        document.getElementById('mi_fun_header_nome').innerHTML = mi_fun_header_nome;

        //Fotografia Documento
        var fotografia_documento = url_atual+'build/assets/images/funcionarios/fotografia_documento-0.png';
        if (funcionario.fotografia_documento) {fotografia_documento = funcionario.fotografia_documento;}
        document.getElementById('mi_fun_fotografia').src = fotografia_documento;
        if (document.getElementById('mi_fun_fotografia_documento')) { document.getElementById('mi_fun_fotografia_documento').src = fotografia_documento; }

        //Fotografia Cartão Emergencial
        var fotografia_cartao_emergencial = url_atual+'build/assets/images/funcionarios/funcionario-0.png';
        if (funcionario.fotografia_cartao_emergencial) {fotografia_cartao_emergencial = funcionario.fotografia_cartao_emergencial;}
        if (document.getElementById('mi_fun_fotografia_cartao_emergencial')) { document.getElementById('mi_fun_fotografia_cartao_emergencial').src = fotografia_cartao_emergencial; }

        // Funcionario id
        document.getElementById('mi_fun_funcionario_id').value = funcionario.id;

        // Dados
        document.getElementById('mi_fun_nome').value = funcionario.name;
        document.getElementById('mi_fun_cpf').value = aplicarMascaraJs(funcionario.cpf, '###.###.###-##');
        document.getElementById('mi_fun_empresa').value = funcionario.empresaName;
        document.getElementById('mi_fun_contratacao_tipo').value = funcionario.contratacaoTipoName;
        document.getElementById('mi_fun_funcao').value = funcionario.funcaoName;
        document.getElementById('mi_fun_departamento').value = funcionario.departamentoName;
        document.getElementById('mi_fun_nome_profissional').value = funcionario.nome_profissional;
        document.getElementById('mi_fun_data_nascimento').value = formatarData(2, funcionario.data_nascimento);
        document.getElementById('mi_fun_genero').value = funcionario.generoName;
        document.getElementById('mi_fun_celular_1').value = formatarTelCel(2, funcionario.celular_1);
        document.getElementById('mi_fun_celular_2').value = formatarTelCel(2, funcionario.celular_2);
        document.getElementById('mi_fun_telefone_1').value = formatarTelCel(2, funcionario.telefone_1);
        document.getElementById('mi_fun_telefone_2').value = formatarTelCel(2, funcionario.telefone_2);
        document.getElementById('mi_fun_email').value = funcionario.email;

        // Documentos
        if (document.getElementById('editar_documentos_funcionario_id')) { document.getElementById('editar_documentos_funcionario_id').value = funcionario.id; }

        // Documentos Mensais
        let upload_documentos_mensais_funcionario_id = document.getElementById('upload_documentos_mensais_funcionario_id');
        if (upload_documentos_mensais_funcionario_id) {upload_documentos_mensais_funcionario_id.value = funcionario.id ?? "";}

        // Fotografia Documento
        if (document.getElementById('upload_fotografia_documento_funcionario_id')) { document.getElementById('upload_fotografia_documento_funcionario_id').value = funcionario.id; }

        // Fotografia Cartão Emergencial
        if (document.getElementById('upload_fotografia_cartao_emergencial_funcionario_id')) { document.getElementById('upload_fotografia_cartao_emergencial_funcionario_id').value = funcionario.id; }

        // Documentos Exigidos
        if (document.getElementById('editar_documentos_exigidos_funcionario_id')) { document.getElementById('editar_documentos_exigidos_funcionario_id').value = funcionario.id; }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }).catch(error => {
        alert('Erro funcionarioModalInfoDados: ' + error);
    }).finally(async () => {
        // Filtrar Combo Boxes para o Funcionario chamado no INFO
        await funcionarioModalInfoFiltrarDadosComboBoxes();

        // Retornar para outro controle
        if (retornoControle != 0) {
            await funcionarioModalInfoControle(retornoControle);
        }
    });
}
// Modal INFO - Dados - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Dados - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Editar Documentos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Editar Documentos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function validar_frm_editar_documentos() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: editar_documentos_funcionario_id (requerido)
    if (validacao({op:1, value:document.getElementById('editar_documentos_funcionario_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Funcionario requerido.'+'<br>';
    }

    //Campo: fun_editar_documentos_documento_id (requerido)
    if (validacao({op:1, value:document.getElementById('fun_editar_documentos_documento_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Documento requerido.'+'<br>';
    }

    //Campo: fun_editar_documentos_data_emissao (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('fun_editar_documentos_data_emissao').value}) === true) {
        //Campo: fun_editar_documentos_data_emissao (Data Válida)
        if (validacao({op:8, value:document.getElementById('fun_editar_documentos_data_emissao').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data emissão Inválida.'+'<br>';
        }
    }

    //Campo: fun_editar_documentos_data_vencimento (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('fun_editar_documentos_data_vencimento').value}) === true) {
        //Campo: fun_editar_documentos_data_vencimento (Data Válida)
        if (validacao({op:8, value:document.getElementById('fun_editar_documentos_data_vencimento').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data vencimento Inválida.'+'<br>';
        }
    }

    //Mensagem
    if (validacao_ok === false) {
        var texto = '<div class="pt-3">';
        texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
        texto += '</div>';

        alertSwal('warning', 'Validação', texto, 'true', 5000);
    }

    //Retorno
    return validacao_ok;
}

function DOMContentLoadedEditarDocumentos() {
    const frm_editar_documentos_fun_botao_salvar_operacao = document.getElementById('frm_editar_documentos_fun_botao_salvar_operacao');

    if (frm_editar_documentos_fun_botao_salvar_operacao) {
        frm_editar_documentos_fun_botao_salvar_operacao.addEventListener('click', function () {
            // FormData
            var formulario = document.getElementById('frm_editar_documentos_fun');
            var formData = new FormData(formulario);
            var url_atual = window.location.protocol + '//' + window.location.host + '/';
            var editar_documentos_funcionario_id = document.getElementById('editar_documentos_funcionario_id').value;

            // Criticando campos
            if (validar_frm_editar_documentos() === false) { return false; }

            // Acessar rota
            fetch(url_atual + 'funcionarios/editarDocumento/editar_documento', {
                method: 'POST',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: formData
            }).then(response => {
                return response.json();
            }).then(async data => {
                // Lendo dados
                if (data.success) {
                    // Montando Grade de Documentos PDF
                    funcionarioModalInfoDocumentos(editar_documentos_funcionario_id);

                    formulario.reset();

                    alertSwal('success', 'Funcionarios', data.success, 'true', 3000);

                    // Atualizar chamando função Dados e Montar Grade
                    await funcionarioModalInfoDados(editar_documentos_funcionario_id, 3);
                } else if (data.error) {
                    alertSwal('warning', 'Funcionarios', data.error, 'true', 3000);
                } else {
                    alert('Erro interno');
                }
            }).catch(error => {
                alert('Erro Funcionarios Editar Documento PDF: ' + error);
            });
        });
    }
}

async function funcionarioModalInfoEditarDocumentosCreate() {
    const frm_editar_documentos_fun = document.getElementById('frm_editar_documentos_fun');
    const frm_editar_documentos_fun_botao_salvar_operacao = document.getElementById('frm_editar_documentos_fun_botao_salvar_operacao');
    const fun_editar_documentos_funcionario_documento_id = document.getElementById('fun_editar_documentos_funcionario_documento_id');
    const fun_editar_documentos_operacao = document.getElementById('fun_editar_documentos_operacao');
    const div_editar_documentos_pdf_atual = document.getElementById('div_editar_documentos_pdf_atual');

    // Formulário
    frm_editar_documentos_fun.reset();

    // Botão
    frm_editar_documentos_fun_botao_salvar_operacao.classList.remove('btn-primary');
    frm_editar_documentos_fun_botao_salvar_operacao.classList.add('btn-success');
    frm_editar_documentos_fun_botao_salvar_operacao.innerHTML = 'Salvar Operação (Incluir)';

    // Campos
    fun_editar_documentos_funcionario_documento_id.value = 0;
    fun_editar_documentos_operacao.value = 'create';

    // PDF
    div_editar_documentos_pdf_atual.style.display = 'none';

    await funcionarioModalInfoControle(6);
}

async function funcionarioModalInfoEditarDocumentosEdit(funcionario_documento_id, documento_id, descricao, aviso, data_emissao, data_vencimento, caminho) {
    const frm_editar_documentos_fun = document.getElementById('frm_editar_documentos_fun');
    const frm_editar_documentos_fun_botao_salvar_operacao = document.getElementById('frm_editar_documentos_fun_botao_salvar_operacao');
    const fun_editar_documentos_funcionario_documento_id = document.getElementById('fun_editar_documentos_funcionario_documento_id');
    const fun_editar_documentos_operacao = document.getElementById('fun_editar_documentos_operacao');
    const fun_editar_documentos_documento_id = document.getElementById('fun_editar_documentos_documento_id');
    const fun_editar_documentos_descricao = document.getElementById('fun_editar_documentos_descricao');
    const fun_editar_documentos_aviso = document.getElementById('fun_editar_documentos_aviso');
    const fun_editar_documentos_data_emissao = document.getElementById('fun_editar_documentos_data_emissao');
    const fun_editar_documentos_data_vencimento = document.getElementById('fun_editar_documentos_data_vencimento');
    const div_editar_documentos_pdf_atual = document.getElementById('div_editar_documentos_pdf_atual');
    const a_editar_documentos_pdf_atual = document.getElementById('a_editar_documentos_pdf_atual');

    // Formulário
    frm_editar_documentos_fun.reset();

    // Botão
    frm_editar_documentos_fun_botao_salvar_operacao.classList.remove('btn-success');
    frm_editar_documentos_fun_botao_salvar_operacao.classList.add('btn-primary');
    frm_editar_documentos_fun_botao_salvar_operacao.innerHTML = 'Salvar Operação (Alterar)';

    // Campos
    fun_editar_documentos_funcionario_documento_id.value = funcionario_documento_id;
    fun_editar_documentos_operacao.value = 'edit';
    fun_editar_documentos_documento_id.value = documento_id;
    fun_editar_documentos_descricao.value = descricao;
    fun_editar_documentos_aviso.value = aviso;
    fun_editar_documentos_data_emissao.value = formatarData(2, data_emissao);
    fun_editar_documentos_data_vencimento.value = formatarData(2, data_vencimento);

    // PDF
    div_editar_documentos_pdf_atual.style.display = 'none';

    if (typeof caminho === 'string' && caminho.trim() !== '') {
        div_editar_documentos_pdf_atual.style.display = '';
        a_editar_documentos_pdf_atual.href = caminho;
    }

    await funcionarioModalInfoControle(6);
}

async function funcionarioModalInfoEditarDocumentosDeletar(funcionario_documento_id) {
    //Confirmação de Delete
    const confirmed = await alertSwalConfirmacao();
    if (confirmed) {
        var url_atual = window.location.protocol+'//'+window.location.host+'/';

        //Acessar rota
        fetch(url_atual+'funcionarios/modalInfo/deletar_documento/'+funcionario_documento_id, {
            method: 'DELETE',
            headers: {
                'REQUEST-ORIGIN': 'fetch',
                'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        }).then(response => {
            return response.json();
        }).then(async data => {
            //Lendo dados
            if (data.success) {
                alertSwal('success', 'Funcionarios', data.success, 'true', 2000);

                //Dados
                let funcionario_id = document.getElementById('mi_fun_funcionario_id').value;

                // Atualizar chamando função Dados e Montar Grade
                await funcionarioModalInfoDados(funcionario_id, 3);
            } else if (data.error) {
                alertSwal('error', 'Funcionarios', data.error, 'true', 2000);
            } else if (data.error_permissao) {
                alertSwal('warning', "Permissão Negada", '', 'true', 2000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro funcionarioModalInfoEditarDocumentosDeletar:'+error);
        });
    }
}
// Modal INFO - Editar Documentos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Editar Documentos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Documentos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Documentos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function funcionarioModalInfoDocumentos(funcionario_id = '') {
    if (funcionario_id == '') { funcionario_id = document.getElementById('mi_fun_funcionario_id').value; }

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    // Acessar rota
    fetch(url_atual+'funcionarios/modalInfo/documentos/'+funcionario_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(async data => {
        // Lendo json
        let funcionarios_documentos = data.funcionarios_documentos;

        // Permissões
        let permissoes = data.permissoes;
        const permissao_list = permissoes.some(p => p.permissao === 'funcionarios_list');
        const permissao_show = permissoes.some(p => p.permissao === 'funcionarios_show');
        const permissao_edit = permissoes.some(p => p.permissao === 'funcionarios_edit');
        const permissao_destroy = permissoes.some(p => p.permissao === 'funcionarios_destroy');

        // Grade
        let grade = '';

        // Montar Grade
        if (funcionarios_documentos.length > 0) {
            grade += '<table class="table table-check table-sm">'; //NÃO COLOCAR DATATABLE POIS O FILTRO NÃO FUNCIONA
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Documento</th>';
            grade += '          <th scope="col">Descrição</th>';
            grade += '          <th scope="col">Emissão</th>';
            grade += '          <th scope="col">Vencimento</th>';
            grade += '          <th scope="col">Aviso</th>';
            grade += '          <th class="text-center" scope="col">Ações</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            // Varrer
            for (const dado of funcionarios_documentos) {
                // Dados
                let documentoName = dado.documentoName ?? '';
                let descricao = dado.descricao ?? '';
                let data_emissao = dado.data_emissao ?? '';
                let data_vencimento = dado.data_vencimento ?? '';
                let caminho = dado.caminho ?? '';
                let aviso = dado.aviso ?? '';

                // Aviso
                let aviso_texto = '';

                if (aviso == 1) {aviso_texto = 'Avisar a cada 1 mês';}
                if (aviso == 2) {aviso_texto = 'Avisar a cada 3 meses';}
                if (aviso == 3) {aviso_texto = 'Avisar a cada 6 meses';}
                if (aviso == 4) {aviso_texto = 'Avisar a cada 1 ano';}
                if (aviso == 5) {aviso_texto = 'Avisar a cada 3 anos';}
                if (aviso == 6) {aviso_texto = 'Avisar a cada 6 anos';}

                // Ações
                let acoes = ``;

                acoes += `<div class="d-flex justify-content-center gap-2">`;

                if (permissao_show) {
                    if (caminho != '') {
                        acoes += `<button type="button" class="btn btn-outline-warning btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Baixar Documento PDF" onclick="baixarArquivo('${caminho}', 'documento.pdf');">`;
                        acoes += `<i class="fa fa-download font-size-18"></i></button>`;

                        acoes += `<button type="button" class="btn btn-outline-info btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Documento PDF" onclick="window.open('${caminho}', '_blank');">`;
                        acoes += `<i class="fa fa-file-pdf font-size-18"></i></button>`;
                    }
                }

                if (permissao_edit) {
                    acoes += `<button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar Dados" onclick="funcionarioModalInfoEditarDocumentosEdit(${dado.id}, ${dado.documento_id}, '${descricao}', ${aviso}, '${data_emissao}', '${data_vencimento}', '${caminho}');">`;
                    acoes += `<i class="fas fa-pencil-alt"></i></button>`;
                }

                if (permissao_destroy) {
                    acoes += `<button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Dados e Documento PDF" onclick="funcionarioModalInfoEditarDocumentosDeletar('${dado.id}');">`;
                    acoes += `<i class="fa fa-trash-alt font-size-18"></i></button>`;
                }

                acoes += `</div>`;

                // Acertos
                if (data_emissao != '') {
                    var data_vencimento_texto = data_vencimento ? formatarData(2, data_vencimento) : '<span class="text-success">Permanente</span>';
                } else {
                    var data_vencimento_texto = formatarData(2, data_vencimento);
                }

                // Status Data Vencimento
                if (diferencaDiasHoje(data_vencimento) > 0) {
                    data_vencimento_texto = `<span style="text-decoration: underline; text-decoration-color: #34c38f; text-decoration-thickness: 3px; text-underline-offset: 4px;">${data_vencimento_texto}</span>`;
                } else if (diferencaDiasHoje(data_vencimento) == 0) {
                    data_vencimento_texto = `<span style="text-decoration: underline; text-decoration-color: #f1b44c; text-decoration-thickness: 3px; text-underline-offset: 4px;">${data_vencimento_texto}</span>`;
                } else if (diferencaDiasHoje(data_vencimento) < 0) {
                    data_vencimento_texto = `<span style="text-decoration: underline; text-decoration-color: #f46a6a; text-decoration-thickness: 3px; text-underline-offset: 4px;">${data_vencimento_texto}</span>`;
                }

                // TR
                grade += '<tr class="documento_fonte_' + dado.documento_fonte_id + '">';
                grade += '  <td>' + documentoName + '</td>';
                grade += '  <td>' + descricao + '</td>';
                grade += '  <td class="text-nowrap">' + formatarData(2, data_emissao) + '</td>';
                grade += '  <td class="text-nowrap">' + status + data_vencimento_texto + '</td>';
                grade += '  <td class="text-nowrap">' + aviso_texto + '</td>';
                grade += '  <td class="text-nowrap">' + acoes + '</td>';
                grade += '</tr>';
            }

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum documento encontrado.';
        }

        // Retornar Grade
        document.getElementById('fun_documentos_grade').innerHTML = grade;

        // Colocar Botões para filtro dos documentos quanto a Fonte
        var documentoFonteFiltro = '';
        var idPrimeiroFiltro = 0; // Guardar um id para depois que a grade for mostrada executar o primeiro Filtro)
        if (grade != 'Nenhum documento encontrado.') {
            // Lendo json
            let documento_fontes = data.documento_fontes;

            documentoFonteFiltro += '<div class="col-12 order-3 order-lg-2 align-self-center">';
            documentoFonteFiltro += '   <div class="text-lg-center mt-4 mt-lg-0">';
            documentoFonteFiltro += '       <div class="d-flex flex-wrap justify-content-start gap-2">';

            // Varrer
            documento_fontes.forEach(dado => {
                let documento_fonte_id = dado.id;
                let documento_fonte_name = dado.name;
                let qtd_registros = funcionarios_documentos.filter(reg => reg.documento_fonte_id === documento_fonte_id);

                if (qtd_registros.length > 0) {
                    if (idPrimeiroFiltro == 0) { idPrimeiroFiltro = documento_fonte_id; }

                    documentoFonteFiltro += `
                            <button type="button"
                                class="btn btn-warning btn-sm flex-fill text-center py-2 font-size-10"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Filtrar Documentos"
                                onclick="funcionarioModalInfoDocumentosFiltrar(${documento_fonte_id});">
                                ${documento_fonte_name} (${qtd_registros.length})
                            </button>`;
                }
            });

            documentoFonteFiltro += '       </div>';
            documentoFonteFiltro += '   </div>';
            documentoFonteFiltro += '</div>';
        }

        // Retornar Documento Filtro (Botões)
        document.getElementById('fun_documentos_grade_botoes').innerHTML = documentoFonteFiltro;

        // Primeiro Filtro
        funcionarioModalInfoDocumentosFiltrar(idPrimeiroFiltro);
    }).catch(error => {
        alert('Erro funcionarioModalInfoDocumentos: '+error);
    }).finally(() => {
        configurarDataTable(3);
    });
}

async function funcionarioModalInfoDocumentosFiltrar(documento_fonte_id) {
    const todasLinhas = document.querySelectorAll("#fun_documentos_grade table tbody tr");

    // Primeiro: mostra todas as linhas
    todasLinhas.forEach(linha => linha.style.display = '');

    // Depois: aplica o filtro
    todasLinhas.forEach(linha => {
        if (!linha.classList.contains(`documento_fonte_${documento_fonte_id}`)) {
            linha.style.display = 'none';
        }
    });
}
// Modal INFO - Documentos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Documentos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Editar Documentos Mensais - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Editar Documentos Mensais - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function validar_frm_upload_verificar_documentos_mensais() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: upload_documentos_mensais_funcionario_id (requerido)
    if (validacao({op:1, value:document.getElementById('upload_documentos_mensais_funcionario_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Funcionário requerido.'+'<br>';
    }

    //Campo: fun_documentos_mensais_mes (requerido)
    if (validacao({op:1, value:document.getElementById('fun_documentos_mensais_mes').value}) === false) {
        validacao_ok = false;
        mensagem += 'Mês requerido.'+'<br>';
    }

    //Campo: fun_documentos_mensais_ano (requerido)
    if (validacao({op:1, value:document.getElementById('fun_documentos_mensais_ano').value}) === false) {
        validacao_ok = false;
        mensagem += 'Ano requerido.'+'<br>';
    }

    //Mensagem
    if (validacao_ok === false) {
        var texto = '<div class="pt-3">';
        texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
        texto += '</div>';

        alertSwal('warning', 'Validação', texto, 'true', 5000);
    }

    //Retorno
    return validacao_ok;
}

function validar_frm_upload_documentos_mensais() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: upload_documentos_mensais_funcionario_id (requerido)
    if (validacao({op:1, value:document.getElementById('upload_documentos_mensais_funcionario_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Funcionário requerido.'+'<br>';
    }

    //Campo: fun_documentos_mensais_mes (requerido)
    if (validacao({op:1, value:document.getElementById('fun_documentos_mensais_mes').value}) === false) {
        validacao_ok = false;
        mensagem += 'Mês requerido.'+'<br>';
    }

    //Campo: fun_documentos_mensais_ano (requerido)
    if (validacao({op:1, value:document.getElementById('fun_documentos_mensais_ano').value}) === false) {
        validacao_ok = false;
        mensagem += 'Ano requerido.'+'<br>';
    }

    //Mensagem
    if (validacao_ok === false) {
        var texto = '<div class="pt-3">';
        texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
        texto += '</div>';

        alertSwal('warning', 'Validação', texto, 'true', 5000);
    }

    //Retorno
    return validacao_ok;
}

function DOMContentLoadedEditarDocumentosMensais() {
    // Botão: fun_documentos_mensais_botao_verificar (Verificar se tem documentos mensais na data selecionada)''''''''
    const fun_documentos_mensais_botao_verificar = document.getElementById('fun_documentos_mensais_botao_verificar');

    if (fun_documentos_mensais_botao_verificar) {
        fun_documentos_mensais_botao_verificar.addEventListener('click', async function () {
            // Criticando campos
            const validar = await validar_frm_upload_verificar_documentos_mensais();
            if (validar === false) { return false; }

            // Dados
            const frm_upload_documentos_mensais_fun_executar = document.getElementById('frm_upload_documentos_mensais_fun_executar');
            const upload_documentos_mensais_funcionario_id = document.getElementById('upload_documentos_mensais_funcionario_id').value;
            const fun_documentos_mensais_mes = document.getElementById('fun_documentos_mensais_mes').value;
            const fun_documentos_mensais_ano = document.getElementById('fun_documentos_mensais_ano').value;

            // Botão: frm_upload_documentos_mensais_fun_executar
            frm_upload_documentos_mensais_fun_executar.classList.remove('d-block');
            frm_upload_documentos_mensais_fun_executar.classList.add('d-none');

            // URL
            var url_atual = window.location.protocol + '//' + window.location.host + '/';

            //Acessar rota
            fetch(url_atual + 'funcionarios/modalInfo/verificar_documentos_mensais/' + upload_documentos_mensais_funcionario_id + '/' + fun_documentos_mensais_mes + '/' + fun_documentos_mensais_ano, {
                method: 'GET',
                headers: { 'REQUEST-ORIGIN': 'fetch' }
            }).then(response => {
                return response.json();
            }).then(data => {
                // Lendo json
                const documentos_mensais = data.documentos_mensais;
                const verificar_documentos_mensais = data.verificar_documentos_mensais;

                // Campos Files
                let campos_files = '';

                // verifica se existe documento_mensal_funcionario_id
                documentos_mensais.forEach(documento_mensal => {
                    const existe = verificar_documentos_mensais.find(f => f.documento_mensal_funcionario_id === documento_mensal.id);
                    let existe_texto = '';

                    if (existe) {
                        existe_texto = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript: void(0);" class="text-success small" onclick="window.open(\'' + existe.caminho + '\', \'_blank\');" title="Abrir documento existente"><span class="fa fa-file-pdf text-danger font-size-14"></span> Documento já existe na Base de Dados</a>';
                    }

                    const div_class = 'col-12 col-md-6 col-lg-6 mb-3';

                    campos_files += `<div class="${div_class}">
                                    <label class="form-label">${primeiraMaiuscula(documento_mensal.name)} (PDF) ${existe_texto}</label>
                                    <input type="file" class="form-control form-control-sm" name="fun_documentos_mensais_file_${documento_mensal.id}" id="fun_documentos_mensais_file_${documento_mensal.id}" data-documento_name="${primeiraMaiuscula(documento_mensal.name)}" accept=".pdf">
                                    <input type="hidden" name="fun_documentos_mensais_name_${documento_mensal.id}" value="${primeiraMaiuscula(documento_mensal.name)}">
                                </div>`;
                });

                // Retornar Campos
                document.getElementById('div_documentos_mensais_files').innerHTML = campos_files;

                //Tratar Botões
                if (campos_files != '') {
                    frm_upload_documentos_mensais_fun_executar.classList.remove('d-none');
                    frm_upload_documentos_mensais_fun_executar.classList.add('d-block');
                }
            }).catch(error => {
                alert('Erro fun_documentos_mensais_botao_verificar: ' + error);
            }).finally(() => { });
        });
    }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Botão: frm_upload_documentos_mensais_fun_executar (Mandar campos do Formulário para a API)'''''''''''''''''''''
    const frm_upload_documentos_mensais_fun_executar = document.getElementById('frm_upload_documentos_mensais_fun_executar');

    if (frm_upload_documentos_mensais_fun_executar) {
        frm_upload_documentos_mensais_fun_executar.addEventListener('click', function () {
            //FormData
            var formulario = document.getElementById('frm_upload_documentos_mensais_fun');
            var formData = new FormData(formulario);
            var url_atual = window.location.protocol + '//' + window.location.host + '/';
            var upload_documentos_mensais_funcionario_id = document.getElementById('upload_documentos_mensais_funcionario_id').value;

            //Criticando campos
            if (validar_frm_upload_documentos_mensais() === false) { return false; }

            // Acessar rota
            fetch(url_atual + 'funcionarios/uploadDocumentoMensal/upload_documento_mensal', {
                method: 'POST',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: formData
            }).then(response => {
                return response.json();
            }).then(async data => {
                // Caso de sucesso total
                if (data.success) {
                    // Atualiza grade de documentos
                    funcionarioModalInfoDocumentosMensais(upload_documentos_mensais_funcionario_id);

                    // Mostra sucesso Documento
                    alertSwal('success', 'Funcionários', data.success, true, 20000);

                    // Atualizar chamando função Dados e Montar Grade
                    await funcionarioModalInfoDados(upload_documentos_mensais_funcionario_id, 7);
                } else if (data.error) {
                    // Monta uma mensagem de resumo
                    let msg = `<b>${data.error}</b><br>`;

                    if (data.sucessos && data.sucessos.length > 0) {
                        msg += `<br><b class="font-size-12 text-success">Enviados com sucesso:</b><br>`;
                        msg += data.sucessos.map(s => `<span class="font-size-10">✅ ${s}</span>`).join('<br>') + '<br>';
                    }

                    if (data.erros && data.erros.length > 0) {
                        msg += `<br><b class="font-size-12 text-danger">Não enviados:</b><br>`;
                        msg += data.erros.map(e => `<span class="font-size-10">❌ ${e}</span>`).join('<br>');
                    }

                    alertSwal('warning', 'Funcionários', msg, true, 40000);

                    // Atualizar chamando função Dados e Montar Grade
                    await funcionarioModalInfoDados(upload_documentos_mensais_funcionario_id, 7);
                } else {
                    alert('Erro interno desconhecido.');
                }

                formulario.reset();

                // Limpando Campos
                document.getElementById('div_documentos_mensais_files').innerHTML = '';
            }).catch(error => {
                alert('Erro Funcionários Upload Documento Mensal PDF: ' + error);
            });
        });
    }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
}

async function funcionarioModalInfoDocumentosMensaisDeletar(funcionario_documento_mensal_id) {
    //Confirmação de Delete
    const confirmed = await alertSwalConfirmacao();
    if (confirmed) {
        var url_atual = window.location.protocol+'//'+window.location.host+'/';

        //Acessar rota
        fetch(url_atual+'funcionarios/modalInfo/deletar_documento_mensal/'+funcionario_documento_mensal_id, {
            method: 'DELETE',
            headers: {
                'REQUEST-ORIGIN': 'fetch',
                'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            //Lendo dados
            if (data.success) {
                alertSwal('success', 'Funcionários', data.success, 'true', 2000);

                //Dados
                let funcionario_id = document.getElementById('mi_fun_funcionario_id').value;

                //Montar Grade
                funcionarioModalInfoDocumentosMensais(funcionario_id);
            } else if (data.error) {
                alertSwal('error', 'Funcionários', data.error, 'true', 2000);
            } else if (data.error_permissao) {
                alertSwal('warning', "Permissão Negada", '', 'true', 2000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro funcionarioModalInfoDeletarDocumentoMensalPdf:'+error);
        });
    }
}
// Modal INFO - Editar Documentos Mensais - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Editar Documentos Mensais - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Documentos Mensais - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Documentos Mensais - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function funcionarioModalInfoDocumentosMensais(funcionario_id='') {



    // VERIFICAR CODIGO
    // ACERTAR BOTOES
    // VERIFICAR SOBRE FILTRO
    // COLOCAR PARA VISUALIZAR
    // COLOCAR PARA DELETAR


    if (funcionario_id == '') {funcionario_id = document.getElementById('mi_fun_funcionario_id').value;}

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'funcionarios/modalInfo/documentos_mensais/'+funcionario_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        // Lendo JSON
        let funcionarios_documentos_mensais = data.funcionarios_documentos_mensais;

        // Permissões
        let permissoes = data.permissoes;
        const permissao_list = permissoes.some(p => p.permissao === 'funcionarios_list');
        const permissao_show = permissoes.some(p => p.permissao === 'funcionarios_show');
        const permissao_destroy = permissoes.some(p => p.permissao === 'funcionarios_destroy');

        // Grade
        let grade = '';

        if (funcionarios_documentos_mensais.length > 0) {
            grade += '<table class="table table-nowrap table-check table-sm class-datatable-3">';
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Mês</th>';
            grade += '          <th scope="col">Ano</th>';
            grade += '          <th scope="col">Documentos / Ações</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            // Agrupar documentos por mês/ano (pra ficar organizado)
            let agrupados = {};
            funcionarios_documentos_mensais.forEach(dado => {
                let chave = `${dado.mes}-${dado.ano}`;
                if (!agrupados[chave]) agrupados[chave] = [];
                agrupados[chave].push(dado);
            });

            // Montar as linhas agrupadas
            for (let chave in agrupados) {
                let [mes, ano] = chave.split('-');
                let documentos = agrupados[chave];

                grade += '<tr>';
                grade += `  <td>${mes}</td>`;
                grade += `  <td>${ano}</td>`;
                grade += '  <td>';
                grade += '      <div class="row">';

                // Para cada documento do mês/ano
                documentos.forEach(dado => {

                    // Nome do documento
                    let nomeDoc = primeiraMaiuscula(dado.documentoMensalName) ?? 'Documento';

                    // Bloco de ações
                    let acoes = '<div class="btn-group btn-group-sm" role="group">';

                    if (permissao_show) {
                        if (dado.caminho != '') {
                            acoes += `
                                <button type="button" class="btn btn-sm btn-outline-warning"
                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                    title="Baixar Documento PDF"
                                    onclick="baixarArquivo('${dado.caminho}', 'documento.pdf');">
                                    <i class="fa fa-download font-size-10"></i>
                                </button>`;
                        }
                    }

                    if (permissao_list) {
                        acoes += `
                            <button type="button" class="btn btn-sm btn-outline-info"
                                data-bs-toggle="tooltip" data-bs-placement="top"
                                title="Visualizar Documento"
                                onclick="window.open('${dado.caminho}', '_blank');">
                                <i class="fa fa-file-pdf font-size-10"></i>
                            </button>`;
                    }

                    if (permissao_destroy) {
                        acoes += `
                            <button type="button" class="btn btn-sm btn-outline-danger"
                                data-bs-toggle="tooltip" data-bs-placement="top"
                                title="Excluir Documento"
                                onclick="funcionarioModalInfoDocumentosMensaisDeletar(${dado.id});">
                                <i class="fa fa-trash-alt font-size-10"></i>
                            </button>`;
                    }

                    acoes += '</div>';

                    // Monta bloco do documento com nome + botões
                    grade += `
                        <div class="col-12 col-md-4 col-lg-4 d-flex align-items-center mb-2">
                            <div class="row col-12">
                                <div class="col-7">
                                    <span class="me-2">
                                        <i class="fa fa-file-pdf text-danger"></i> <span class="small">${nomeDoc}</span>
                                    </span>
                                </div>
                                <div class="col-5">
                                    ${acoes}
                                </div>
                            </div>
                        </div>
                    `;
                });

                grade += '      </div>';
                grade += '  </td>';
                grade += '</tr>';
            }

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum documento mensal encontrado.';
        }

        //Retornar Grade
        document.getElementById('fun_documentos_mensais_grade').innerHTML = grade;
    }).catch(error => {
        alert('Erro funcionarioModalInfoGradeDocumentosMensaisPdf: '+error);
    }).finally(() => {
        configurarDataTable(3);
    });
}

function funcionarioModalInfoDocumentosMensaisFiltrar(documento_fonte_id) {
    const todasLinhas = document.querySelectorAll("#fun_documentos_mensais_grade table tbody tr");

    todasLinhas.forEach(linha => {
        if (linha.classList.contains(`documento_fonte_${documento_fonte_id}`)) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    });
}
// Modal INFO - Documentos Mensais - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Documentos Mensais - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Editar Documentos Exigidos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Editar Documentos Exigidos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function funcionarioModalInfoEditarDocumentosExigidos(funcionario_id = '') {
    if (funcionario_id == '') { funcionario_id = document.getElementById('mi_fun_funcionario_id').value; }

    var url_atual = window.location.protocol + '//' + window.location.host + '/';

    // Acessar rota
    fetch(url_atual+'funcionarios/modalInfo/documentos_exigidos/'+funcionario_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        // Resetar Formulário
        document.getElementById('frm_editar_documentos_exigidos_fun').reset();

        // Lendo json
        let documentos_exigidos = data.funcionarios_documentos_exigidos;

        // Estatisticas
        funcionarioModalInfoEstatisticas(funcionario_id);

        // Marcar checkboxs
        documentos_exigidos.forEach(function (item) {
            document.getElementById(`editar_documentos_exigidos_documento_exigido_id_${item.documento_id}`).checked = true;
        });
    }).catch(error => {
        alert('Erro funcionarioModalInfoEditarDocumentosExigidos: '+error);
    }).finally(() => {});
}

function DOMContentLoadedEditarDocumentosExigidos() {
    const frm_editar_documentos_exigidos_fun_executar = document.getElementById('frm_editar_documentos_exigidos_fun_executar');

    if (frm_editar_documentos_exigidos_fun_executar) {
        frm_editar_documentos_exigidos_fun_executar.addEventListener('click', function () {
            // FormData
            var formulario = document.getElementById('frm_editar_documentos_exigidos_fun');
            var formData = new FormData(formulario);
            var url_atual = window.location.protocol + '//' + window.location.host + '/';
            var editar_documentos_exigidos_funcionario_id = document.getElementById('editar_documentos_exigidos_funcionario_id').value;

            // Tratar Botões
            frm_editar_documentos_exigidos_fun_executar.style.display = 'block';

            // Acessar rota
            fetch(url_atual + 'funcionarios/modalInfo/documentos_exigidos_save', {
                method: 'POST',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: formData
            }).then(response => {
                return response.json();
            }).then(async data => {
                // Lendo dados
                if (data.success) {

                    formulario.reset();

                    // Atualizar chamando função Dados e Montar Grade
                    await funcionarioModalInfoDados(editar_documentos_exigidos_funcionario_id, 14);

                    alertSwal('success', 'Funcionarios', data.success, 'true', 3000);
                } else if (data.error) {
                    alertSwal('warning', 'Funcionarios', data.error, 'true', 3000);
                } else {
                    alert('Erro interno');
                }
            }).catch(error => {
                alert('Erro Funcionarios Documentos Exigidos: ' + error);
            });
        });
    }
}
// Modal INFO - Editar Documentos Exigidos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Editar Documentos Exigidos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Documentos Exigidos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Documentos Exigidos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function funcionarioModalInfoDocumentosExigidos(funcionario_id = '') {
    if (funcionario_id == '') { funcionario_id = document.getElementById('mi_fun_funcionario_id').value; }

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    // Acessar rota
    fetch(url_atual+'funcionarios/modalInfo/documentos_exigidos/'+funcionario_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(async data => {
        // Lendo json
        let funcionarios_documentos_exigidos = data.funcionarios_documentos_exigidos;

        // Grade
        let grade = '';

        // Montar Grade
        if (funcionarios_documentos_exigidos.length > 0) {
            grade += '<table class="table align-middle table-nowrap table-check table-sm">'; //NÃO COLOCAR DATATABLE POIS O FILTRO NÃO FUNCIONA
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col" class="text-center" style="width: 30px">Status</th>';
            grade += '          <th scope="col">Documento</th>';
            grade += '          <th scope="col">Ações</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            // Varrer
            for (const dado of funcionarios_documentos_exigidos) {
                // Documento
                let documentoName = dado.documentoName;

                // Documento Caminho
                let documento_caminho = dado.funcionarioDocumentoCaminho;

                // Status
                let status = '<span class="badge rounded-pill bg-danger" key="t-new">&nbsp;</span>';
                var arquivo_existe = await arquivoExiste(documento_caminho);
                if (arquivo_existe === true) { status = '<span class="badge rounded-pill bg-success" key="t-new">&nbsp;</span>'; }

                // Ações
                let acoes = '';

                acoes += '<div class="row">';

                if (arquivo_existe === true) {
                    acoes += '  <div class="col-6">';
                    acoes += '      <button type="button" class="btn btn-outline-info text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Documento" onclick="window.open(\'' + documento_caminho + '\', \'_blank\');"><i class="fa fa-file-pdf font-size-18"></i></button>';
                    acoes += '  </div>';
                }

                acoes += '</div>';

                // TR
                grade += '<tr class="documento_fonte_'+dado.documento_fonte_id+'">';
                grade += '  <td class="text-center">' + status + '</td>';
                grade += '  <td>' + documentoName + '</td>';
                grade += '  <td>' + acoes + '</td>';
                grade += '</tr>';
            }

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum documento exigido encontrado.';
        }

        // Retornar Grade
        document.getElementById('fun_documentos_exigidos_grade').innerHTML = grade;

        // Colocar Botões para filtro dos documentos quanto a Fonte
        var documentoFonteFiltro = '';
        var idPrimeiroFiltro = 0; // Guardar um id para depois que a grade for mostrada executar o primeiro Filtro)
        if (grade != 'Nenhum documento exigido encontrado.') {
            // Lendo json
            let documento_fontes = data.documento_fontes;

            documentoFonteFiltro += '<div class="col-12 order-3 order-lg-2 align-self-center">';
            documentoFonteFiltro += '   <div class="text-lg-center mt-4 mt-lg-0">';
            documentoFonteFiltro += '       <div class="d-flex flex-wrap justify-content-start gap-2">';

            // Varrer
            documento_fontes.forEach(dado => {
                let documento_fonte_id = dado.id;
                let documento_fonte_name = dado.name;
                let qtd_registros = funcionarios_documentos_exigidos.filter(reg => reg.documento_fonte_id === documento_fonte_id);

                if (qtd_registros.length > 0) {
                    if (idPrimeiroFiltro == 0) { idPrimeiroFiltro = documento_fonte_id; }

                    documentoFonteFiltro += `
                            <button type="button"
                                class="btn btn-warning btn-sm flex-fill text-center py-2 font-size-10"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Filtrar Documentos"
                                onclick="funcionarioModalInfoDocumentosExigidosFiltrar(${documento_fonte_id});">
                                ${documento_fonte_name} (${qtd_registros.length})
                            </button>`;
                }
            });

            documentoFonteFiltro += '       </div>';
            documentoFonteFiltro += '   </div>';
            documentoFonteFiltro += '</div>';
        }

        // Retornar Documento Filtro (Botões)
        document.getElementById('fun_documentos_exigidos_grade_botoes').innerHTML = documentoFonteFiltro;

        // Primeiro Filtro
        funcionarioModalInfoDocumentosExigidosFiltrar(idPrimeiroFiltro);
    }).catch(error => {
        alert('Erro funcionarioModalInfoDocumentosExigidos: '+error);
    }).finally(() => {
        configurarDataTable(3);
    });
}

async function funcionarioModalInfoDocumentosExigidosFiltrar(documento_fonte_id) {
    const todasLinhas = document.querySelectorAll("#fun_documentos_exigidos_grade table tbody tr");

    // Primeiro: mostra todas as linhas
    todasLinhas.forEach(linha => linha.style.display = '');

    // Depois: aplica o filtro
    todasLinhas.forEach(linha => {
        if (!linha.classList.contains(`documento_fonte_${documento_fonte_id}`)) {
            linha.style.display = 'none';
        }
    });
}
// Modal INFO - Documentos Exigidos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Documentos Exigidos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Entregas Uniformes - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Entregas Uniformes - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function funcionarioModalInfoEntregasUniformes(funcionario_id = '') {
    if (funcionario_id == '') { funcionario_id = document.getElementById('mi_fun_funcionario_id').value; }

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    // Acessar rota
    fetch(url_atual+'funcionarios/modalInfo/entregas_uniformes/'+funcionario_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(async data => {
        // Lendo json
        const entregas = data.entregas;
        const entregas_dados = data.entregas_dados;

        // Grade
        let grade = '';

        // Montar Grade
        if (entregas.length > 0) {
            grade += '<table class="table table-check table-sm">'; //NÃO COLOCAR DATATABLE POIS O FILTRO NÃO FUNCIONA
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Dados da Entrega</th>';
            grade += '          <th scope="col">Uniformes da Entrega</th>';
            grade += '          <th class="text-center" scope="col">Ações</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            // Varrer
            for (const dado of entregas) {
                // Dados
                let entrega_uniforme_id = dado.id ?? '';
                let numero_entrega = dado.numero_entrega ?? '';

                // Uniformes da entrega atual
                const uniformesEntrega = entregas_dados.filter(item =>
                    Number(item.entrega_uniforme_id) === Number(dado.id)
                );

                let uniformes = '';

                if (uniformesEntrega.length > 0) {

                    uniformes += '<table class="table table-sm table-bordered mb-0">';
                    uniformes += '    <thead class="table-light">';
                    uniformes += '        <tr>';
                    uniformes += '            <th>Uniforme</th>';
                    uniformes += '            <th class="text-center">Tamanho</th>';
                    uniformes += '        </tr>';
                    uniformes += '    </thead>';
                    uniformes += '    <tbody>';

                    for (const uniforme of uniformesEntrega) {
                        const funcionario_id = uniforme.funcionario_id;
                        const uniformeName = uniforme.uniformeName ?? '';
                        const tamanho = uniforme.tamanho ?? '';

                        uniformes += '<tr>';
                        uniformes += '    <td>' + uniformeName + '</td>';
                        uniformes += '    <td class="text-center">' + tamanho + '</td>';
                        uniformes += '</tr>';
                    }

                    uniformes += '    </tbody>';
                    uniformes += '</table>';

                } else {

                    uniformes = '<span class="text-muted">Nenhum uniforme</span>';
                }

                // Ações
                let acoes = ``;

                acoes += `<div class="d-flex justify-content-center gap-2">`;
                acoes += `<button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Gerar Recibo" onclick="funcionario_acao_1_GerarReciboPdf(${entrega_uniforme_id}, ${funcionario_id})">`;
                acoes += `<i class="fa fa-file-pdf font-size-18"></i></button>`;
                acoes += `</div>`;

                // TR
                grade += '<tr>';
                grade += '  <td>' + numero_entrega + '</td>';
                grade += '  <td>' + uniformes + '</td>';
                grade += '  <td class="text-nowrap">' + acoes + '</td>';
                grade += '</tr>';
            }

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhuma entrega de uniforme encontrada.';
        }

        // Retornar Grade
        document.getElementById('fun_entregas_uniformes_grade').innerHTML = grade;
    }).catch(error => {
        alert('Erro funcionarioModalInfoEntregasUniformes: '+error);
    }).finally(() => {
        configurarDataTable(3);
    });
}
// Modal INFO - Entregas Uniformes - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Entregas Uniformes - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Ações com Funcionários - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Ações com Funcionários - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function funcionarioAcaoControle(acao = '', operacao = '') {
    // acao = Ação com Funcionários
    if (acao == '') { return; }

    // operacao = Operação a realizar (Inclusão, Alteração, Exclusão e Grade de Registros)
    if (operacao == '') { return; }

    // Elementos Gerais
    const modal_funcionario_acao_1_subtitulo = document.getElementById('modal_funcionario_acao_1_subtitulo');

    // Ação Entregas de Uniformes - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Ação Entregas de Uniformes - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''
    if (acao == 1) {
        // Elementos
        const modal_funcionario_acao_1 = document.getElementById('modal_funcionario_acao_1');
        const funcionario_acao_1_div_visualizar = document.getElementById('funcionario_acao_1_div_visualizar');
        const funcionario_acao_1_div_edicao = document.getElementById('funcionario_acao_1_div_edicao');
        const funcionario_acao_1_div_grade_registros = document.getElementById('funcionario_acao_1_div_grade_registros');
        const funcionario_acao_1_botao_incluir = document.getElementById('funcionario_acao_1_botao_incluir');
        const funcionario_acao_1_botao_alterar = document.getElementById('funcionario_acao_1_botao_alterar');

        // Abrir Modal
        if (!modal_funcionario_acao_1.classList.contains('show')) {
            new bootstrap.Modal(modal_funcionario_acao_1).show();
            ajustarMargensModalsInfo({ modalId: 'modal_funcionario_acao_1', height: 90, width: 70, top: 5, bottom: 5, left: 15, right: 15 });
        }

        // Dados Estatísticas
        funcionario_acao_1_DadosEstatisticas();

        // Hidens
        funcionario_acao_1_div_visualizar.style.display = 'none';
        funcionario_acao_1_div_edicao.style.display = 'none';
        funcionario_acao_1_div_grade_registros.style.display = 'none';
        funcionario_acao_1_botao_incluir.style.display = 'none';
        funcionario_acao_1_botao_alterar.style.display = 'none';

        // Grade de Registros
        if (operacao == 1) {
            // Preencher Grade de Registros
            funcionario_acao_1_GradeRegistrosRenderizar();

            // Cabeçalho Dados
            modal_funcionario_acao_1_subtitulo.innerHTML = 'Grade de Entregas de Uniformes';

            // Show
            funcionario_acao_1_div_grade_registros.style.display = 'block';
        }

        // Nova Entrega
        if (operacao == 2) {
            // Limpar Formulário e Grade
            await funcionario_acao_1_LimparEntrega();

            // Cabeçalho Dados
            modal_funcionario_acao_1_subtitulo.innerHTML = 'Nova Entrega de Uniformes';

            // Show
            funcionario_acao_1_div_edicao.style.display = 'block';
            funcionario_acao_1_botao_incluir.style.display = 'block';

            // Filtro Funcionários
            await funcionario_acao_1_FiltrarFuncionarios();
        }

        // Visualizar Entrega
        if (operacao == 3) {
            // Cabeçalho Dados
            modal_funcionario_acao_1_subtitulo.innerHTML = 'Visualizar Entrega de Uniformes';

            // Show
            funcionario_acao_1_div_visualizar.style.display = 'block';
        }

        // Editar Entrega
        if (operacao == 4) {
            // Cabeçalho Dados
            modal_funcionario_acao_1_subtitulo.innerHTML = 'Editar Entrega de Uniformes';

            // Show
            funcionario_acao_1_div_edicao.style.display = 'block';
            funcionario_acao_1_botao_alterar.style.display = 'block';

            // Filtro Funcionários
            await funcionario_acao_1_FiltrarFuncionarios();
        }
    }
    // Ação Entregas de Uniformes - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Ação Entregas de Uniformes - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
}
// Ações com Funcionários - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Ações com Funcionários - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Ações com Funcionários - Entregas de Uniformes - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Ações com Funcionários - Entregas de Uniformes - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Globais
let dadosGradeUniformes = [];
let dadosGradeUniformesIndiceEdicao = null;

// Evita interpretar nomes e descrições como HTML.
function funcionario_acao_1_Escapar(valor) {
    return String(valor ?? '').replace(/[&<>"']/g, caractere => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[caractere]);
}

// Inicializa os eventos uma única vez
function funcionario_acao_1_InicializarEventos() {
    document.getElementById('modal_funcionario_acao_1_escolher_adicionar_btn').addEventListener('click', funcionario_acao_1_GradeUniformesAdicionar);
    document.getElementById('modal_funcionario_acao_1_escolher_salvar_btn').addEventListener('click', funcionario_acao_1_GradeUniformesSalvarEdicao);
    document.getElementById('modal_funcionario_acao_1_escolher_cancelar_btn').addEventListener('click', funcionario_acao_1_GradeUniformesCancelarEdicao);

    document.getElementById('modal_funcionario_acao_1_escolher_funcionario_id').addEventListener('change', funcionario_acao_1_BuscarTamanho);
    document.getElementById('modal_funcionario_acao_1_escolher_uniforme_id').addEventListener('change', funcionario_acao_1_BuscarTamanho);

    document.getElementById('modal_funcionario_acao_1_tomador_servico_cliente_id').addEventListener('change', async function () { await funcionario_acao_1_FiltrarFuncionarios() });
    document.getElementById('modal_funcionario_acao_1_funcao_id').addEventListener('change', async function () { await funcionario_acao_1_FiltrarFuncionarios() });

    // Delegação de eventos: funciona também após redesenhar a grade.
    document.getElementById('modal_funcionario_acao_1_grade_uniformes').addEventListener('click', function (event) {
            const botao = event.target.closest('button[data-acao]');

            if (!botao) return;

            const indice = Number(botao.dataset.indice);

            if (botao.dataset.acao === 'editar') {
                funcionario_acao_1_GradeUniformesEditar(indice);
            }

            if (botao.dataset.acao === 'excluir') {
                funcionario_acao_1_GradeUniformesExcluir(indice);
            }
        });

    funcionario_acao_1_GradeUniformesRenderizar();
}

// Limpa Formulário e Grade de Uniformes para uma Nova Entrega
async function funcionario_acao_1_LimparEntrega() {
    // Elementos do Formulário
    document.getElementById('modal_funcionario_acao_1_tomador_servico_cliente_id').value = '';
    document.getElementById('modal_funcionario_acao_1_funcao_id').value = '';

    // Limpara Grade
    funcionario_acao_1_GradeUniformesLimpar();
}

// Limpa somente os campos da seleção.
function funcionario_acao_1_GradeUniformesFormularioLimpar() {
    document.getElementById('modal_funcionario_acao_1_escolher_funcionario_id').value = '';
    document.getElementById('modal_funcionario_acao_1_escolher_uniforme_id').value = '';
    document.getElementById('modal_funcionario_acao_1_escolher_quantidade').value = '';
    document.getElementById('modal_funcionario_acao_1_escolher_tamanho').value = '';
}

// Lê os campos do formulário.
function funcionario_acao_1_GradeUniformesFormularioLer() {
    const funcionario = document.getElementById('modal_funcionario_acao_1_escolher_funcionario_id');
    const uniforme = document.getElementById('modal_funcionario_acao_1_escolher_uniforme_id');
    const quantidade = document.getElementById('modal_funcionario_acao_1_escolher_quantidade');
    const tamanho = document.getElementById('modal_funcionario_acao_1_escolher_tamanho');

    return {
        funcionario_id: funcionario.value,
        funcionario_nome: funcionario.selectedOptions[0]?.textContent.trim(),
        uniforme_id: uniforme.value,
        uniforme_nome: uniforme.selectedOptions[0]?.textContent.trim(),
        quantidade: quantidade.value.trim(),
        tamanho: tamanho.value.trim()
    };
}

// Valida os campos antes de adicionar ou alterar.
function funcionario_acao_1_GradeUniformesFormularioValidar(dados) {
    if (!dados.funcionario_id) {
        alert('Selecione um funcionário.');
        document.getElementById('modal_funcionario_acao_1_escolher_funcionario_id').focus();
        return false;
    }

    if (!dados.uniforme_id) {
        alert('Selecione um uniforme.');
        document.getElementById('modal_funcionario_acao_1_escolher_uniforme_id').focus();
        return false;
    }

    if (
        !/^\d+$/.test(dados.quantidade) ||
        Number(dados.quantidade) < 1 ||
        !Number.isSafeInteger(Number(dados.quantidade))
    ) {
        alert('Informe uma quantidade inteira maior que zero.');
        document.getElementById('modal_funcionario_acao_1_escolher_quantidade').focus();
        return false;
    }

    if (!dados.tamanho || dados.tamanho.length > 10) {
        alert('Informe um tamanho de até 10 caracteres.');
        document.getElementById('modal_funcionario_acao_1_escolher_tamanho').focus();
        return false;
    }

    return true;
}

// Adiciona uma nova linha.
function funcionario_acao_1_GradeUniformesAdicionar() {
    const dados = funcionario_acao_1_GradeUniformesFormularioLer();

    if (!funcionario_acao_1_GradeUniformesFormularioValidar(dados)) return;

    if (funcionario_acao_1_GradeUniformesDuplicado(dados)) {
        alert('Este funcionário já possui esse uniforme e tamanho na grade.');
        return;
    }

    dadosGradeUniformes.push({
        id: null,
        funcionario_id: Number(dados.funcionario_id),
        funcionario_nome: dados.funcionario_nome,
        uniforme_id: Number(dados.uniforme_id),
        uniforme_nome: dados.uniforme_nome,
        quantidade: Number(dados.quantidade),
        tamanho: dados.tamanho,
        data_entrega: null
    });

    funcionario_acao_1_GradeUniformesRenderizar();
    funcionario_acao_1_GradeUniformesFormularioLimpar();
}

// Preenche o formulário para edição de uma linha.
function funcionario_acao_1_GradeUniformesEditar(indice) {
    const item = dadosGradeUniformes[indice];

    if (!item) return;

    dadosGradeUniformesIndiceEdicao = indice;

    document.getElementById('modal_funcionario_acao_1_escolher_funcionario_id').value = item.funcionario_id;
    document.getElementById('modal_funcionario_acao_1_escolher_uniforme_id').value = item.uniforme_id;
    document.getElementById('modal_funcionario_acao_1_escolher_quantidade').value = item.quantidade;
    document.getElementById('modal_funcionario_acao_1_escolher_tamanho').value = item.tamanho;

    document.getElementById('modal_funcionario_acao_1_escolher_adicionar_btn').classList.add('d-none');
    document.getElementById('modal_funcionario_acao_1_escolher_salvar_btn').classList.remove('d-none');
    document.getElementById('modal_funcionario_acao_1_escolher_cancelar_btn').classList.remove('d-none');

    document.getElementById('modal_funcionario_acao_1_escolher_funcionario_id').focus();

    funcionario_acao_1_GradeUniformesRenderizar();
}

// Salva as alterações somente no array.
function funcionario_acao_1_GradeUniformesSalvarEdicao() {
    const indice = dadosGradeUniformesIndiceEdicao;

    if (indice === null || !dadosGradeUniformes[indice]) return;

    const dados = funcionario_acao_1_GradeUniformesFormularioLer();

    if (!funcionario_acao_1_GradeUniformesFormularioValidar(dados)) return;

    if (funcionario_acao_1_GradeUniformesDuplicado(dados, indice)) {
        alert('Este funcionário já possui esse uniforme e tamanho na grade.');
        return;
    }

    // Preserva o ID da API e a data de entrega original.
    dadosGradeUniformes[indice] = {
        ...dadosGradeUniformes[indice],
        funcionario_id: Number(dados.funcionario_id),
        funcionario_nome: dados.funcionario_nome,
        uniforme_id: Number(dados.uniforme_id),
        uniforme_nome: dados.uniforme_nome,
        quantidade: Number(dados.quantidade),
        tamanho: dados.tamanho
    };

    funcionario_acao_1_GradeUniformesCancelarEdicao();
    funcionario_acao_1_GradeUniformesRenderizar();
}

// Cancela a edição.
function funcionario_acao_1_GradeUniformesCancelarEdicao() {
    dadosGradeUniformesIndiceEdicao = null;

    funcionario_acao_1_GradeUniformesFormularioLimpar();

    document.getElementById('modal_funcionario_acao_1_escolher_adicionar_btn').classList.remove('d-none');
    document.getElementById('modal_funcionario_acao_1_escolher_salvar_btn').classList.add('d-none');
    document.getElementById('modal_funcionario_acao_1_escolher_cancelar_btn').classList.add('d-none');

    funcionario_acao_1_GradeUniformesRenderizar();
}

// Exclui a linha da grade.
function funcionario_acao_1_GradeUniformesExcluir(indice) {
    const item = dadosGradeUniformes[indice];

    if (!item) return;

    if (!confirm(`Excluir ${item.uniforme_nome} do funcionário ${item.funcionario_nome}?`)) {
        return;
    }

    dadosGradeUniformes.splice(indice, 1);

    // Evita manter um índice de edição inválido.
    funcionario_acao_1_GradeUniformesCancelarEdicao();
    funcionario_acao_1_GradeUniformesRenderizar();
}

// Limpa a grade ao iniciar uma nova entrega.
function funcionario_acao_1_GradeUniformesLimpar() {
    dadosGradeUniformes = [];
    funcionario_acao_1_GradeUniformesCancelarEdicao();
    funcionario_acao_1_GradeUniformesRenderizar();
}

// Carrega os dados retornados pela API no Formulário Principal
function funcionario_acao_1_FormularioPrincipalCarregar(dados) {
    document.getElementById('modal_funcionario_acao_1_tomador_servico_cliente_id').value = dados.tomador_servico_cliente_id;
    document.getElementById('modal_funcionario_acao_1_funcao_id').value = dados.funcao_id;
}

// Carrega os registros retornados pela API na Grade de Uniformes
function funcionario_acao_1_GradeUniformesCarregar(dados) {
    if (!Array.isArray(dados)) {
        throw new Error('Os dados da grade devem ser um array.');
    }

    funcionario_acao_1_GradeUniformesCancelarEdicao();

    dadosGradeUniformes = dados.map(item => ({
        id: item.id ?? null,
        funcionario_id: Number(item.funcionario_id),
        funcionario_nome: item.funcionario_nome
            ?? '',
        uniforme_id: Number(item.uniforme_id),
        uniforme_nome: item.uniforme_nome
            ?? '',
        quantidade: Number(item.quantidade),
        tamanho: String(item.tamanho ?? ''),
        data_entrega: item.data_entrega ?? null
    }));

    funcionario_acao_1_GradeUniformesRenderizar();
}

// Redesenha a grade a partir do array.
function funcionario_acao_1_GradeUniformesRenderizar() {
    const tbody = document.getElementById('modal_funcionario_acao_1_grade_uniformes');

    if (dadosGradeUniformes.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-3">
                    Nenhum uniforme adicionado.
                </td>
            </tr>
        `;

        return;
    }

    tbody.innerHTML = dadosGradeUniformes.map((item, indice) => {
        const editando = dadosGradeUniformesIndiceEdicao === indice;

        return `
            <tr class="${editando ? 'table-warning' : ''}">
                <td class="text-center">${indice + 1}</td>
                <td>${funcionario_acao_1_Escapar(item.funcionario_nome)}</td>
                <td>${funcionario_acao_1_Escapar(item.uniforme_nome)}</td>
                <td class="text-center">${item.quantidade}</td>
                <td class="text-center">${funcionario_acao_1_Escapar(item.tamanho)}</td>
                <td class="text-center">
                    <div class="btn-group btn-group-sm">
                        <button type="button"
                            class="btn btn-outline-primary"
                            title="Editar Item"
                            data-acao="editar"
                            data-indice="${indice}">
                            <i class="fas fa-edit"></i>
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button type="button"
                            class="btn btn-outline-danger"
                            title="Excluir Item"
                            data-acao="excluir"
                            data-indice="${indice}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Verifica se já existe o mesmo funcionário, uniforme e tamanho.
function funcionario_acao_1_GradeUniformesDuplicado(dados, ignorarIndice = null) {
    return dadosGradeUniformes.some((item, indice) => {
        if (indice === ignorarIndice) return false;

        return String(item.funcionario_id) === String(dados.funcionario_id)
            && String(item.uniforme_id) === String(dados.uniforme_id)
            && item.tamanho.toUpperCase() === dados.tamanho.toUpperCase();
    });
}

// Prepara somente os campos necessários para o backend.
function funcionario_acao_1_GradeUniformesObterDados() {
    return dadosGradeUniformes.map(item => ({
        id: item.id,
        funcionario_id: item.funcionario_id,
        funcionario_nome: item.funcionario_nome,
        uniforme_id: item.uniforme_id,
        uniforme_nome: item.uniforme_nome,
        quantidade: item.quantidade,
        tamanho: item.tamanho,
        data_entrega: item.data_entrega
    }));
}

// Buscar Tamanho do Uniforme do Funcionário no onchange de ..._funcionario_id e ..._uniforme_id
async function funcionario_acao_1_BuscarTamanho() {
    // Elementos
    const funcionario_id = document.getElementById('modal_funcionario_acao_1_escolher_funcionario_id');
    const uniforme_id = document.getElementById('modal_funcionario_acao_1_escolher_uniforme_id');
    const quantidade = document.getElementById('modal_funcionario_acao_1_escolher_quantidade');
    const tamanho = document.getElementById('modal_funcionario_acao_1_escolher_tamanho');

    // Validação
    if (funcionario_id.value === null || funcionario_id.value.trim() === '') { return; }
    if (uniforme_id.value === null || uniforme_id.value.trim() === '') { return; }
    if (tamanho.value !== null && tamanho.value.trim() !== '') { return; }

    // Nome do campo na grade funcionarios
    const funcionarios_campo = uniforme_id.options[uniforme_id.selectedIndex]?.getAttribute('data-funcionarios_campo');

    // Desabilitar o campo
    tamanho.disabled = true;

    // Buscar valor do Campo
    const response = await fetch(`funcionarios/${funcionario_id.value}`, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    }).finally(() => {
        // Habilitar o campo
        tamanho.disabled = false;
    });

    if (!response.ok) { return; }

    const data = await response.json();
    const funcionario = data.success;

    // Atualizar o campo tamanho
    tamanho.value = funcionario[funcionarios_campo];

    // Atualizar o campo quantidade
    if (quantidade.value === null || quantidade.value.trim() === '') {
        quantidade.value = 1;
    }

    // Habilitar novamente
    tamanho.disabled = false;
}

async function funcionario_acao_1_DadosEstatisticas() {
    // Elementos
    const modal_funcionario_acao_1_total_entregas_realizadas = document.getElementById('modal_funcionario_acao_1_total_entregas_realizadas');

    // Iniciando Dados
    modal_funcionario_acao_1_total_entregas_realizadas.innerHTML = 0;

    // Buscar Dados
    const response = await fetch(`entregas_uniformes/dados/estatisticas`, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    if (!response.ok) { return; }

    const data = await response.json();
    const dados = data.success;

    // Preenchendo Dados
    modal_funcionario_acao_1_total_entregas_realizadas.innerHTML = dados.total_entregas_realizadas;
}

async function funcionario_acao_1_GradeRegistrosRenderizar() {
    // Buscar Dados
    const response = await fetch(`entregas_uniformes`, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    if (!response.ok) { return; }

    // Dados Recebidos
    const data = await response.json();
    const dados = data.success;

    // Tbody
    const tbody = document.getElementById('modal_funcionario_acao_1_grade_registros');

    if (dados.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-muted py-3">
                    Nenhum registro encontrado.
                </td>
            </tr>
        `;

        return;
    }

    // Preencher Grade de Registros
    tbody.innerHTML = dados.map((item, indice) => {
        return `
            <tr>
                <td class="text-center">${indice + 1}</td>
                <td>${item.numero_entrega}</td>
                <td>${formatarData(2, item.data_entrega)}</td>
                <td class="text-end">
                    <button type="button" class="btn btn-sm btn-outline-info" title="Visualizar Entrega" onclick="funcionario_acao_1_Show(${item.id})"><i class="fas fa-eye"></i></button>&nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-sm btn-outline-primary" title="Editar Entrega" onclick="funcionario_acao_1_Edit(${item.id})"><i class="fas fa-edit"></i></button>&nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-sm btn-outline-danger" title="Excluir Entrega" onclick="funcionario_acao_1_Destroy(${item.id}, ${item.numero_entrega})"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>`;
    }).join('');
}

async function funcionario_acao_1_Show(entrega_uniforme_id) {
    if (!entrega_uniforme_id) { return; }

    // Hidden
    document.getElementById('entrega_uniforme_id').value = entrega_uniforme_id;

    // Buscar Dados
    const response = await fetch(`entregas_uniformes/${entrega_uniforme_id}`, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    if (!response.ok) { return; }

    // Dados Recebidos
    const data = await response.json();
    const entrega = data.success.entrega;
    const entrega_dados = data.success.entrega_dados;

    // Preenchimentos dados Principais
    document.getElementById('modal_funcionario_acao_1_tomador_servico_cliente_nome_visualizar').innerHTML = entrega.tomador_servico_cliente_nome;
    document.getElementById('modal_funcionario_acao_1_funcao_nome_visualizar').innerHTML = entrega.funcao_nome;
    document.getElementById('modal_funcionario_acao_1_numero_entrega_visualizar').innerHTML = entrega.numero_entrega;
    document.getElementById('modal_funcionario_acao_1_data_entrega_visualizar').innerHTML = entrega.data_entrega;


    // Preenchimentos Grade Uniformes
    const tbody = document.getElementById('modal_funcionario_acao_1_grade_uniformes_visualizar');

    tbody.innerHTML = entrega_dados.map((item, indice) => {
        return `
            <tr>
                <td class="text-center">${indice + 1}</td>
                <td>${funcionario_acao_1_Escapar(item.funcionario_nome)}</td>
                <td>${funcionario_acao_1_Escapar(item.uniforme_nome)}</td>
                <td class="text-center">${item.quantidade}</td>
                <td class="text-center">${funcionario_acao_1_Escapar(item.tamanho)}</td>
            </tr>
        `;
    }).join('');

    // Chamar Ação
    funcionarioAcaoControle(1, 3);
}

async function funcionario_acao_1_Store() {
    if (dadosGradeUniformesIndiceEdicao !== null) {
        alertSwal('warning', 'Entrega de Uniformes', 'Salve ou cancele a edição do uniforme antes de continuar.', 'true', 2000);
        return;
    }

    if (dadosGradeUniformes.length === 0) {
        alertSwal('warning', 'Entrega de Uniformes', 'Adicione pelo menos um uniforme.', 'true', 2000);
        return;
    }

    // Elementos
    const tomadorServicoCliente = document.getElementById('modal_funcionario_acao_1_tomador_servico_cliente_id');
    const funcao = document.getElementById('modal_funcionario_acao_1_funcao_id');

    // Acertos
    const tomador_servico_cliente_id = tomadorServicoCliente.value;
    const tomador_servico_cliente_nome = tomadorServicoCliente.selectedIndex > 0 ? tomadorServicoCliente.options[tomadorServicoCliente.selectedIndex].text : null;
    const funcao_id = funcao.value || null;
    const funcao_nome = funcao.selectedIndex > 0 ? funcao.options[funcao.selectedIndex].text : null;

    const dados = {
        tomador_servico_cliente_id: tomador_servico_cliente_id,
        tomador_servico_cliente_nome: tomador_servico_cliente_nome,
        funcao_id: funcao_id,
        funcao_nome: funcao_nome,
        uniformes: funcionario_acao_1_GradeUniformesObterDados()
    };

    try {
        const response = await fetch('entregas_uniformes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'REQUEST-ORIGIN': 'fetch',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(dados)
        });

        const data = await response.json();

        if (response.ok) {
            if (data.success) {
                funcionarioAcaoControle(1, 1);

                alertSwal('success', 'Entrega de Uniformes', data.success, 'true', 2000);
            } else if (data.error_validation) {
                var mensagem = montarMensagemValidacao(data.error_validation);
                alertSwal('warning', 'Entrega de Uniformes', mensagem, 'true', 2000);
            } else {
                alertSwal('warning', 'Entrega de Uniformes', 'Não foi possível realizar a operação.', 'true', 2000);
            }
        } else {
            var mensagem = data.message || 'Houve um erro ao realizar a operação.';

            alertSwal('warning', 'Entrega de Uniformes', mensagem, 'true', 2000);
        }
    } catch (error) {
        alertSwal('warning', 'Entrega de Uniformes', 'Houve um erro de comunicação com o servidor.', 'true', 2000);
    }
}

async function funcionario_acao_1_Edit(entrega_uniforme_id) {
    if (!entrega_uniforme_id) { return; }

    // Hidden
    document.getElementById('entrega_uniforme_id').value = entrega_uniforme_id;

    // Limpar Entrega
    await funcionario_acao_1_LimparEntrega();

    // Buscar Dados
    const response = await fetch(`entregas_uniformes/${entrega_uniforme_id}`, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    if (!response.ok) { return; }

    // Dados Recebidos
    const data = await response.json();
    const entrega = data.success.entrega;
    const entrega_dados = data.success.entrega_dados;

    // Preenchimentos
    funcionario_acao_1_FormularioPrincipalCarregar(entrega);
    funcionario_acao_1_GradeUniformesCarregar(entrega_dados);

    // Chamar Ação
    funcionarioAcaoControle(1, 4);
}

async function funcionario_acao_1_Update() {
    // Verificar id da Entrega''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    const entrega_uniforme_id = document.getElementById('entrega_uniforme_id');

    if (!entrega_uniforme_id) {
        alert('O campo ID da entrega de uniforme não foi encontrado.');
        return;
    }

    const id = entrega_uniforme_id.value.trim();

    if (!/^\d+$/.test(id) || Number(id) <= 0) {
        alert('O ID da entrega de uniforme é inválido.');
        return;
    }

    const funcionarioEntregaUniformeId = Number(id);
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    if (dadosGradeUniformesIndiceEdicao !== null) {
        alertSwal('warning', 'Entrega de Uniformes', 'Salve ou cancele a edição do uniforme antes de continuar.', 'true', 2000);
        return;
    }

    if (dadosGradeUniformes.length === 0) {
        alertSwal('warning', 'Entrega de Uniformes', 'Adicione pelo menos um uniforme.', 'true', 2000);
        return;
    }

    // Elementos
    const tomadorServicoCliente = document.getElementById('modal_funcionario_acao_1_tomador_servico_cliente_id');
    const funcao = document.getElementById('modal_funcionario_acao_1_funcao_id');

    // Acertos
    const tomador_servico_cliente_id = tomadorServicoCliente.value;
    const tomador_servico_cliente_nome = tomadorServicoCliente.selectedIndex > 0 ? tomadorServicoCliente.options[tomadorServicoCliente.selectedIndex].text : null;
    const funcao_id = funcao.value || null;
    const funcao_nome = funcao.selectedIndex > 0 ? funcao.options[funcao.selectedIndex].text : null;

    const dados = {
        tomador_servico_cliente_id: tomador_servico_cliente_id,
        tomador_servico_cliente_nome: tomador_servico_cliente_nome,
        funcao_id: funcao_id,
        funcao_nome: funcao_nome,
        uniformes: funcionario_acao_1_GradeUniformesObterDados()
    };

    try {
        const response = await fetch(`entregas_uniformes/${funcionarioEntregaUniformeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'REQUEST-ORIGIN': 'fetch',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(dados)
        });

        const data = await response.json();

        if (response.ok) {
            if (data.success) {
                funcionarioAcaoControle(1, 1);

                alertSwal('success', 'Entrega de Uniformes', data.success, 'true', 2000);
            } else if (data.error_validation) {
                var mensagem = montarMensagemValidacao(data.error_validation);
                alertSwal('warning', 'Entrega de Uniformes', mensagem, 'true', 2000);
            } else {
                alertSwal('warning', 'Entrega de Uniformes', 'Não foi possível realizar a operação.', 'true', 2000);
            }
        } else {
            var mensagem = data.message || 'Houve um erro ao realizar a operação.';

            alertSwal('warning', 'Entrega de Uniformes', mensagem, 'true', 2000);
        }
    } catch (error) {
        alertSwal('warning', 'Entrega de Uniformes', 'Houve um erro de comunicação com o servidor.', 'true', 2000);
    }
}

async function funcionario_acao_1_Destroy(entrega_uniforme_id, numero_entrega) {
    if (!entrega_uniforme_id) { return; }

    // Confirmação
    const confirmed = await alertSwalConfirmacao({ message: 'Confirma a exclusão?', text: `<div class="text-center font-size-12">NÚMERO ENTREGA</div><div class="text-center text-primary font-size-12">${numero_entrega}</div>` });
    if (!confirmed) { return; }

    // Rota
    try {
        const response = await fetch(`entregas_uniformes/${entrega_uniforme_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'REQUEST-ORIGIN': 'fetch',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        });

        const data = await response.json();

        if (response.ok) {
            if (data.success) {
                funcionarioAcaoControle(1, 1);

                alertSwal('success', 'Entrega de Uniformes', data.success, 'true', 2000);
            } else {
                alertSwal('warning', 'Entrega de Uniformes', 'Não foi possível realizar a operação.', 'true', 2000);
            }
        } else {
            var mensagem = data.message || 'Houve um erro ao realizar a operação.';

            alertSwal('warning', 'Entrega de Uniformes', mensagem, 'true', 2000);
        }
    } catch (error) {
        alertSwal('warning', 'Entrega de Uniformes', 'Houve um erro de comunicação com o servidor.', 'true', 2000);
    }
}

async function funcionario_acao_1_FiltrarFuncionarios() {
    const tomadorServico = document.getElementById('modal_funcionario_acao_1_tomador_servico_cliente_id');
    const funcao = document.getElementById('modal_funcionario_acao_1_funcao_id');
    const funcionario = document.getElementById('modal_funcionario_acao_1_escolher_funcionario_id');

    if (!tomadorServico || !funcao || !funcionario) {return;}

    const tomadorServicoId = tomadorServico.value;
    const funcaoId = funcao.value;
    const valorFuncionarioSelecionado = funcionario.value;

    Array.from(funcionario.options).forEach(option => {
        // Mantém "Selecione..." sempre disponível
        if (option.value === '') {
            option.hidden = false;
            return;
        }

        const funcionarioTomadorServicoId = option.dataset.tomador_servico_id;
        const funcionarioFuncaoId = option.dataset.funcao_id;

        let exibir = true;

        // Filtra pelo Tomador de Serviço somente se preenchido
        if (tomadorServicoId !== '') {
            exibir = exibir && funcionarioTomadorServicoId === tomadorServicoId;
        }

        // Filtra pela Função somente se preenchida
        if (funcaoId !== '') {
            exibir = exibir && funcionarioFuncaoId === funcaoId;
        }

        option.hidden = !exibir;
    });

    // Se o funcionário anteriormente selecionado deixou de ser válido, volta para "Selecione..."
    const optionSelecionada = funcionario.options[funcionario.selectedIndex];

    if (funcionario.value !== '' && optionSelecionada && optionSelecionada.hidden) {
        funcionario.value = '';
    }
}

async function funcionario_acao_1_GerarReciboPdf(entrega_uniforme_id, funcionario_id, idioma = 'pt') {
    // Rota
    let response = await fetch(`entregas_uniformes/recibo/funcionario/${entrega_uniforme_id}/${funcionario_id}`, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    let data = await response.json();

    // Lendo dados
    if (data.success) {
        // Dados da Entrega de Uniformes
        const entrega = data.success[0];
        const entrega_dados = data.success;

        // Configurações - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        // Configurações - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        // Jspdf
        if (!window.jsPDF) window.jsPDF = window.jspdf.jsPDF;

        // Iniciando jsPDF
        var doc = new jsPDF({orientation: 'p'});

        // Variáveis (Geral)
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth();
        const marginLeft = 15; // Margem esquerda padrão
        const marginTop = 50; // Margem topo inicial
        const textWidth = 180; // Tamanho máximo da linha
        const spacingBetweenTexts2 = 2; // Espaçamento entre dois textos
        const spacingBetweenTexts3 = 3; // Espaçamento entre dois textos
        var pageTopo = 'build/assets/images/relatorios_topo_simples.jpg';
        var pageRodape = 'build/assets/images/relatorios_rodape.png';

        // Variáveis
        var novaMarginTop = 0; // Nova margem topo
        var texto = '';
        // Configurações - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        // Configurações - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        // Funções internas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        // Funções internas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        async function adicionarCabecalhoRodape(topo, rodape) {
            doc.addImage(topo, 'PNG', 15, 10, pageWidth - 30, 15);
            doc.addImage(rodape, 'PNG', 15, pageHeight - 30, pageWidth - 20, 20);
        }

        // Função para implementar texto no pdf
        // @PARAM x_align : 'left' // Pode ser 'left', 'right', 'center' ou 'justify'
        // @PARAM x_fontStyle : 'normal', 'bold', 'italic' ou 'bolditalic'
        async function inserirTexto({x_texto = '', x_spacingBetweenTexts = spacingBetweenTexts3, x_marginLeft = marginLeft, x_marginTop = novaMarginTop, x_fontStyle = 'normal', x_fontSize = 12, x_align = 'left', x_atualizarNovaMarginTop = true}) {
            let linhasTexto = doc.splitTextToSize(x_texto, textWidth);
            let alturaTexto = linhasTexto.length * x_spacingBetweenTexts;

            // Verifica se o texto cabe na página, senão cria uma nova
            let espacoFimPagina = 45;
            if ((x_marginTop + alturaTexto) > (pageHeight - espacoFimPagina)) {
                await novaPagina();
                x_marginTop = novaMarginTop; // Reinicia a margem após nova página
            }

            // Define a fonte
            doc.setFont('helvetica', x_fontStyle);

            // Define o tamanho fonte
            doc.setFontSize(x_fontSize);

            // Alinhamento texto
            let posX = x_marginLeft; // Padrão: alinhado à esquerda

            if (x_align === 'right') {
                posX = pageWidth - x_marginLeft - doc.getTextWidth(x_texto);
            } else if (x_align === 'center') {
                posX = (pageWidth - doc.getTextWidth(x_texto)) / 2;
            }

            // Inserir x_texto
            if (x_align === 'justify') {
                doc.text(x_texto, posX, x_marginTop, {maxWidth: textWidth, align: 'justify'});
            } else {
                doc.text(x_texto, posX, x_marginTop);
            }

            x_marginTop += x_spacingBetweenTexts; // Ajusta a posição para a próxima linha

            // Atualiza a margem superior para o próximo bloco de texto
            if (x_atualizarNovaMarginTop === true) {
                novaMarginTop = x_marginTop + alturaTexto + x_spacingBetweenTexts;
            }
        }

        async function novaPagina() {
            doc.addPage();
            novaMarginTop = marginTop;

            await adicionarCabecalhoRodape(pageTopo, pageRodape);
        }
        // Funções internas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        // Funções internas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        // Gravando pdf - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        // Gravando pdf - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        // Cabeçalho e rodapé
        await adicionarCabecalhoRodape(pageTopo, pageRodape);

        // Texto
        texto = 'FICHA INDIVIDUAL DE ENTREGA DE UNIFORME';
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 13, x_marginTop: 35, x_fontStyle: 'bold', x_align: 'center' });

        // Texto
        texto = 'UNIDADE / POSTO:';
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 10, x_marginTop: 50, x_fontStyle: 'bold' });

        // Texto
        texto = entrega.tomadorServicoClienteName;
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 10, x_marginTop: 50, x_marginLeft: 49 });

        // Texto
        texto = 'NOME DO COLABORADOR(A):';
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 10, x_marginTop: 55, x_fontStyle: 'bold' });

        // Texto
        texto = entrega.funcionarioName;
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 10, x_marginTop: 55, x_marginLeft: 68 });

        // Texto
        texto = 'FUNÇÃO: ';
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 10, x_marginTop: 60, x_fontStyle: 'bold' });

        // Texto
        texto = entrega.funcaoName;
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 10, x_marginTop: 60, x_marginLeft: 32 });

        // Texto
        texto = 'Declaro, para os devidos fins, que recebi os uniformes e demais itens abaixo relacionados, nos tamanhos e quantidades indicados, em condições adequadas de uso.';
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 10, x_marginTop: 70, x_align: 'justify' });

        // Texto
        texto = 'Comprometo-me a utilizar os itens recebidos exclusivamente para o desempenho das minhas atividades profissionais, zelando por sua correta utilização, guarda, conservação e higiene, bem como comunicar à empresa qualquer necessidade de substituição decorrente de desgaste, dano ou outra ocorrência.';
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 10, x_align: 'justify' });

        // Texto
        texto = 'Comprometo-me ainda a:';
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 10, x_align: 'justify' });

        // Texto
        texto = '1. Utilizar corretamente os uniformes recebidos, mantendo adequada apresentação durante a jornada de trabalho.';
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 10, x_align: 'justify' });

        // Texto
        texto = '2. Zelar pela guarda, conservação, higiene e bom estado das peças.';
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 10, x_align: 'justify' });

        // Texto
        texto = '3. Comunicar à empresa eventual dano, desgaste ou necessidade de substituição.';
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 10, x_align: 'justify' });

        // Texto
        texto = '4. Não ceder, emprestar ou permitir a utilização dos uniformes por terceiros.';
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 10, x_align: 'justify' });

        // Texto
        texto = '5. Devolver à empresa, quando solicitado ou por ocasião do encerramento do vínculo ou da prestação de serviços, as peças cuja devolução seja aplicável.';
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 10, x_align: 'justify' });

        // Texto
        texto = '6. Informar imediatamente qualquer perda ou extravio dos itens recebidos.';
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 10, x_align: 'justify' });

        // Texto
        texto = '7. Declaro que conferi os itens, quantidades e tamanhos abaixo relacionados e que os recebi nas condições indicadas nesta ficha.';
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 10, x_align: 'justify' });

        // Tabela Uniformes - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        // Tabela Uniformes - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        var tabelaHTML = `<table>
                            <thead>
                                <tr>
                                    <th>&nbsp;<b>ITEM</b>&nbsp;</th>
                                    <th>&nbsp;<b>DESCRIÇÃO DO UNIFORME</b>&nbsp;</th>
                                    <th>&nbsp;<b>TAMANHO</b>&nbsp;</th>
                                    <th>&nbsp;<b>QUANTIDADE</b>&nbsp;</th>
                                </tr>
                            </thead>
                        <tbody>`;

        var qtdLinhasTabela = 1;
        var item_uniforme = 0;

        entrega_dados.forEach(function (dado) {
            // Dados para preencher na linha da grade
            item_uniforme++;

            var descricao_uniforme = dado.uniformeName;
            var tamanho_uniforme = dado.entregaUniformeDadoTamanho;
            var quantidade_uniforme = dado.entregaUniformeDadoQuantidade;

            tabelaHTML += `<tr>
                            <td>${item_uniforme ? item_uniforme : ''}</td>
                            <td>${descricao_uniforme ? descricao_uniforme : ''}</td>
                            <td>${tamanho_uniforme ? tamanho_uniforme : ''}</td>
                            <td>${quantidade_uniforme ? quantidade_uniforme : ''}</td>
                        </tr>`;

            qtdLinhasTabela++;
        });

        tabelaHTML += `</tbody>
                    </table>`;

        qtdLinhasTabela++;
        qtdLinhasTabela++;

        // Criando um elemento temporário para converter a string em HTML real
        var div = document.createElement('div');
        if (idioma == 'en') {tabelaHTML = await traduzirTextoGoogle(tabelaHTML);}
        div.innerHTML = tabelaHTML;
        var tabela = div.querySelector('table');

        // Converte a tabela para PDF usando autoTable
        doc.autoTable({
            html: tabela, // Usa a tabela do HTML
            startY: novaMarginTop, // Define onde começa a tabela no PDF
            useCss: true, // Permite que os estilos CSS sejam considerados
            styles: {
                fontStyle: "normal",
                fontSize: 8,
                textColor: [0, 0, 0], // Cor do texto preto
                lineColor: [121, 130, 156], // Cor da borda cinza escuro (#79829c)
                lineWidth: 0.2, // Espessura da borda
            },
            headStyles: {
                fontStyle: "bold",
                fontSize: 8,
                fillColor: ['#F2CEED'], // Cor do cabeçalho #00FEFF (Ciano)
                textColor: [0, 0, 0], // Texto preto
            },
            alternateRowStyles: {
                fillColor: [255, 255, 255], // Cor de fundo alternada para as linhas
            },
            columnStyles: {
                0: { halign: "center" }, // Coluna centralizada
                1: { halign: "left" }, // Coluna alinhada à esquerda
                2: { halign: "center" }, // Coluna alinhada ao centro
                3: { halign: "center" }, // Coluna alinhada ao centro
            },
            didParseCell: function (data) {
                // Força padding em cada célula
                data.cell.styles.cellPadding = 2;

                // Centralizar Títulos específicos do cabeçalho
                if (data.section === 'head') {
                    if (data.column.index === 0 || data.column.index === 2 || data.column.index === 3) {
                        data.cell.styles.halign = 'center';
                    }
                }
            },
            margin: { top: 50 },
        });

        // Nova margem topo para depois da tabela
        novaMarginTop = novaMarginTop + (qtdLinhasTabela * 6.3) + 5;
        // Tabela Uniformes - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        // Tabela Uniformes - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        // Data atual por extenso'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        var data_servidor = await dataServidor(2);
        var data_extenso = await dataExtenso(2, data_servidor);
        texto = data_extenso + '.';
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 9 });
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        // Assinatura do Funcionário''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        // Texto
        texto = '______________________________________________________________________';
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 9, x_spacingBetweenTexts: spacingBetweenTexts2 });

        // Texto
        cpf = await formatarDocumento(1, entrega.funcionarioCpf);
        if (cpf !== '') { cpf = ` (CPF: ${cpf})`; }
        texto = entrega.funcionarioName+cpf;
        if (idioma == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_fontSize: 9 });
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        // Gerar o pdf, abrir em uma outra aba e colocar link para download'''''''''''''''''''''''''''
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Tentar abrir em uma nova aba
        const newTab = window.open(pdfUrl);
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        // Gravando pdf - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        // Gravando pdf - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }
}
// Ações com Funcionários - Entregas de Uniformes - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Ações com Funcionários - Entregas de Uniformes - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

document.addEventListener("DOMContentLoaded", () => {
    // Acertar formulário para entrada de dados de contratacao_tipo''''''''''''''''''''''''''''''''''''''''''''''''''
    if ($('#contratacao_tipo_id').val() == 1) {
        $('.contratacao_tipo_1').show();
        $('.contratacao_tipo_2').hide();
    } else {
        $('.contratacao_tipo_1').hide();
        $('.contratacao_tipo_2').show();
    }

    $('#contratacao_tipo_id').change(function(e) {
        if ($('#contratacao_tipo_id').val() == 1) {
            $('.contratacao_tipo_1').show();
            $('.contratacao_tipo_2').hide();
        } else {
            $('.contratacao_tipo_1').hide();
            $('.contratacao_tipo_2').show();
        }
    });
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Iniciando INFO''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    DOMContentLoadedEditarDocumentos();
    DOMContentLoadedEditarDocumentosMensais();
    DOMContentLoadedEditarDocumentosExigidos();
    DOMContentLoadedFotografiaDocumento();
    DOMContentLoadedFotografiaCartaoEmergencial();
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Quando a entrada vier do modalAviso'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    const paramsModalAviso = new URLSearchParams(window.location.search);

    if (paramsModalAviso.get('modalAviso') === '1') {
        const funcionarioId = paramsModalAviso.get('modalAvisoFuncionarioId');

        // Limpa os parâmetros da URL sem recarregar a página
        window.history.replaceState({}, '', window.location.pathname);

        // Chamando modal INFO
        funcionarioModalInfoControle(2, funcionarioId);
    }
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Ações com Funcionários - Entregas de Uniformes Iniciar Elementos''''''''''''''''''''''''''''''''''''''''''''''
    funcionario_acao_1_InicializarEventos();
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
