function validar_frm_funcionarios() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: contratacao_tipo_id (requerido)
    if (validacao({op:1, value:document.getElementById('contratacao_tipo_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Contratação Tipo requerido.'+'<br>';
    }

    //Campo: contratacao_tipo_id (select)
    if (validacao({op:4, value:document.getElementById('contratacao_tipo_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Contratação Tipo deve ser escolhido.'+'<br>';
    }

    //Campo: cpf (requerido)
    if (validacao({op:1, value:document.getElementById('cpf').value}) === false) {
        validacao_ok = false;
        mensagem += 'CPF requerido.'+'<br>';
    }

    //Campo: cpf (CPF Válido)
    if (validacao({op:7, value:document.getElementById('cpf').value}) === false) {
        validacao_ok = false;
        mensagem += 'CPF Inválido.'+'<br>';
    }

    //Campo: name (requerido)
    if (validacao({op:1, value:document.getElementById('name').value}) === false) {
        validacao_ok = false;
        mensagem += 'Nome requerido.'+'<br>';
    }

    //Campo: name (mínimo de 3 caracteres)
    if (validacao({op:2, value:document.getElementById('name').value, minCaracteres:3}) === false) {
        validacao_ok = false;
        mensagem += 'Nome precisa ter no mínimo 3 caracteres.'+'<br>';
    }

    //Campo: nome_profissional (requerido)
    if (validacao({op:1, value:document.getElementById('nome_profissional').value}) === false) {
        validacao_ok = false;
        mensagem += 'Nome Profissional requerido.'+'<br>';
    }

    //Campo: nome_profissional (mínimo de 3 caracteres)
    if (validacao({op:2, value:document.getElementById('nome_profissional').value, minCaracteres:3}) === false) {
        validacao_ok = false;
        mensagem += 'Nome Profissional precisa ter no mínimo 3 caracteres.'+'<br>';
    }

    //Campo: data_nascimento (requerido)
    if (validacao({op:1, value:document.getElementById('data_nascimento').value}) === false) {
        validacao_ok = false;
        mensagem += 'Data Nascimento requerido.'+'<br>';
    }

    //Campo: data_nascimento (Data Válida)
    if (validacao({op:8, value:document.getElementById('data_nascimento').value}) === false) {
        validacao_ok = false;
        mensagem += 'Data Nascimento Inválida.'+'<br>';
    }

    //Campo: genero_id (requerido)
    if (validacao({op:1, value:document.getElementById('genero_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Gênero requerido.'+'<br>';
    }

    //Campo: telefone_1 (não requerido / Telefone Válido)
    if (validacao({op:1, value:document.getElementById('telefone_1').value}) === true) {
        //Campo: telefone_1 (Telefone Válido)
        if (validacao({op:11, value:document.getElementById('telefone_1').value}) === false) {
            validacao_ok = false;
            mensagem += 'Telefone 1 Inválido.'+'<br>';
        }
    }

    //Campo: telefone_2 (não requerido / Telefone Válido)
    if (validacao({op:1, value:document.getElementById('telefone_2').value}) === true) {
        //Campo: telefone_2 (Telefone Válido)
        if (validacao({op:11, value:document.getElementById('telefone_2').value}) === false) {
            validacao_ok = false;
            mensagem += 'Telefone 2 Inválido.'+'<br>';
        }
    }

    //Campo: celular_1 (não requerido / Celular Válido)
    if (validacao({op:1, value:document.getElementById('celular_1').value}) === true) {
        //Campo: celular_1 (Celular Válido)
        if (validacao({op:12, value:document.getElementById('celular_1').value}) === false) {
            validacao_ok = false;
            mensagem += 'Celular 1 Inválido.'+'<br>';
        }
    }

    //Campo: celular_2 (não requerido / Celular Válido)
    if (validacao({op:1, value:document.getElementById('celular_2').value}) === true) {
        //Campo: celular_2 (Celular Válido)
        if (validacao({op:12, value:document.getElementById('celular_2').value}) === false) {
            validacao_ok = false;
            mensagem += 'Celular 2 Inválido.'+'<br>';
        }
    }

    //Campo: email (não requerido / E-mail Válido)
    if (validacao({op:1, value:document.getElementById('email').value}) === true) {
        //Campo: email (E-mail Válido)
        if (validacao({op:5, value:document.getElementById('email').value}) === false) {
            validacao_ok = false;
            mensagem += 'E-mail Inválido.'+'<br>';
        }
    }

    //Campo: data_admissao (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('data_admissao').value}) === true) {
        //Campo: data_admissao (Data Válida)
        if (validacao({op:8, value:document.getElementById('data_admissao').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data Admissão Inválida.'+'<br>';
        }
    }

    //Campo: data_demissao (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('data_demissao').value}) === true) {
        //Campo: data_demissao (Data Válida)
        if (validacao({op:8, value:document.getElementById('data_demissao').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data Demissão Inválida.'+'<br>';
        } else {
            //Campo: data_admissao (requerido)
            if (validacao({op:1, value:document.getElementById('data_admissao').value}) === false) {
                validacao_ok = false;
                mensagem += 'Data Admissão Requerida.'+'<br>';
            }

            //Campo: motivo_demissao_id (select)
            if (validacao({op:4, value:document.getElementById('motivo_demissao_id').value}) === false) {
                validacao_ok = false;
                mensagem += 'Motivo Demissão deve ser escolhido.'+'<br>';
            }
        }
    }

    //Campo: data_cadastro (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('data_cadastro').value}) === true) {
        //Campo: data_cadastro (Data Válida)
        if (validacao({op:8, value:document.getElementById('data_cadastro').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data Cadastro Inválida.'+'<br>';
        }
    }

    //Campo: data_afastamento (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('data_afastamento').value}) === true) {
        //Campo: data_afastamento (Data Válida)
        if (validacao({op:8, value:document.getElementById('data_afastamento').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data Afastamento Inválida.'+'<br>';
        } else {
            //Campo: data_cadastro (requerido)
            if (validacao({op:1, value:document.getElementById('data_cadastro').value}) === false) {
                validacao_ok = false;
                mensagem += 'Data Cadastro Requerida.'+'<br>';
            }

            //Campo: motivo_afastamento_id (select)
            if (validacao({op:4, value:document.getElementById('motivo_afastamento_id').value}) === false) {
                validacao_ok = false;
                mensagem += 'Motivo Afastamento deve ser escolhido.'+'<br>';
            }
        }
    }

    //Campo: carteira_nacional_numero (não requerido / somente números)
    if (validacao({op:1, value:document.getElementById('carteira_nacional_numero').value}) === true) {
        //Campo: carteira_nacional_numero (somente números)
        if (validacao({op:4, value:document.getElementById('carteira_nacional_numero').value}) === false) {
            validacao_ok = false;
            mensagem += 'Carteira Nacional Número só pode conter dígitos de 0 a 9.'+'<br>';
        }
    }

    //Campo: carteira_nacional_data_emissao (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('carteira_nacional_data_emissao').value}) === true) {
        //Campo: carteira_nacional_data_emissao (Data Válida)
        if (validacao({op:8, value:document.getElementById('carteira_nacional_data_emissao').value}) === false) {
            validacao_ok = false;
            mensagem += 'Carteira Nacional Data Emissão Inválida.'+'<br>';
        }
    }

    //Campo: personal_identidade_numero (não requerido / somente números)
    if (validacao({op:1, value:document.getElementById('personal_identidade_numero').value}) === true) {
        //Campo: personal_identidade_numero (somente números)
        if (validacao({op:4, value:document.getElementById('personal_identidade_numero').value}) === false) {
            validacao_ok = false;
            mensagem += 'Identidade Pessoal Número só pode conter dígitos de 0 a 9.'+'<br>';
        }
    }

    //Campo: personal_identidade_data_emissao (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('personal_identidade_data_emissao').value}) === true) {
        //Campo: personal_identidade_data_emissao (Data Válida)
        if (validacao({op:8, value:document.getElementById('personal_identidade_data_emissao').value}) === false) {
            validacao_ok = false;
            mensagem += 'Identidade Pessoal Data Emissão Inválida.'+'<br>';
        }
    }

    //Campo: professional_identidade_numero (não requerido / somente números)
    if (validacao({op:1, value:document.getElementById('professional_identidade_numero').value}) === true) {
        //Campo: professional_identidade_numero (somente números)
        if (validacao({op:4, value:document.getElementById('professional_identidade_numero').value}) === false) {
            validacao_ok = false;
            mensagem += 'Identidade Profissional Número só pode conter dígitos de 0 a 9.'+'<br>';
        }
    }

    //Campo: professional_identidade_data_emissao (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('professional_identidade_data_emissao').value}) === true) {
        //Campo: professional_identidade_data_emissao (Data Válida)
        if (validacao({op:8, value:document.getElementById('professional_identidade_data_emissao').value}) === false) {
            validacao_ok = false;
            mensagem += 'Identidade Profissional Data Emissão Inválida.'+'<br>';
        }
    }

    //Campo: pis (não requerido / PIS Válido)
    if (validacao({op:1, value:document.getElementById('pis').value}) === true) {
        //Campo: pis (PIS Válido)
        if (validacao({op:13, value:document.getElementById('pis').value}) === false) {
            validacao_ok = false;
            mensagem += 'PIS Inválido.'+'<br>';
        }
    }

    //Campo: pasep (não requerido / PASEP Válido)
    if (validacao({op:1, value:document.getElementById('pasep').value}) === true) {
        //Campo: pasep (PASEP Válido)
        if (validacao({op:14, value:document.getElementById('pasep').value}) === false) {
            validacao_ok = false;
            mensagem += 'PASEP Inválido.'+'<br>';
        }
    }

    //Campo: carteira_trabalho (não requerido / Carteira Trabalho Válido)
    if (validacao({op:1, value:document.getElementById('carteira_trabalho').value}) === true) {
        //Campo: carteira_trabalho (Carteira Trabalho Válido)
        if (validacao({op:15, value:document.getElementById('carteira_trabalho').value}) === false) {
            validacao_ok = false;
            mensagem += 'Carteira Trabalho Inválido.'+'<br>';
        }
    }

    //Campo: cep (não requerido / CEP Válido)
    if (validacao({op:1, value:document.getElementById('cep').value}) === true) {
        //Campo: cep (CEP Válido)
        if (validacao({op:9, value:document.getElementById('cep').value}) === false) {
            validacao_ok = false;
            mensagem += 'CEP Inválido.'+'<br>';
        }
    }

    //Campo: numero (não requerido / somente números)
    if (validacao({op:1, value:document.getElementById('numero').value}) === true) {
        //Campo: numero (somente números)
        if (validacao({op:4, value:document.getElementById('numero').value}) === false) {
            validacao_ok = false;
            mensagem += 'Número só pode conter dígitos de 0 a 9.'+'<br>';
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

function validar_frm_upload_documentos() {
    var validacao_ok = true;
    var mensagem = '';


    //Campo: upload_documentos_funcionario_id (requerido)
    if (validacao({op:1, value:document.getElementById('upload_documentos_funcionario_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Funcionário requerido.'+'<br>';
    }

    //Campo: upload_documentos_fun_acao (requerido)
    if (validacao({op:1, value:document.getElementById('upload_documentos_fun_acao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Ação do Formulário requerido.'+'<br>';
    }

    //Campo: fun_documentos_documento_id (requerido)
    if (validacao({op:1, value:document.getElementById('fun_documentos_documento_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Documento requerido.'+'<br>';
    }

    //Campo: fun_documentos_data_documento (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('fun_documentos_data_documento').value}) === true) {
        //Campo: fun_documentos_data_documento (Data Válida)
        if (validacao({op:8, value:document.getElementById('fun_documentos_data_documento').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data documento Inválida.'+'<br>';
        }
    }

    //Campo: fun_documentos_file (arquivo PDF requerido)
    if (validacao({op:16, id:'fun_documentos_file'}) === false) {
        validacao_ok = false;
        mensagem += 'Arquivo PDF requerido.'+'<br>';
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

function funcionarioModalInfoControle(op, id='') {
    var div_fotografias = document.getElementById('md_fun_div_fotografias');
    var div_dados = document.getElementById('md_fun_div_dados');
    var div_documentos = document.getElementById('md_fun_div_documentos');
    var div_tomadores_servicos = document.getElementById('md_fun_div_tomadores_servicos');
    var div_incluir_documentos = document.getElementById('md_fun_div_incluir_documentos');
    var div_cartao_emergencial = document.getElementById('md_fun_div_cartao_emergencial');

    //Fotografias
    if (op == 1) {
        div_fotografias.classList.remove('d-none');
        div_fotografias.classList.add('d-lg-flex');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_tomadores_servicos.classList.remove('d-lg-flex');
        div_tomadores_servicos.classList.add('d-none');

        div_incluir_documentos.classList.remove('d-lg-flex');
        div_incluir_documentos.classList.add('d-none');

        div_cartao_emergencial.classList.remove('d-lg-flex');
        div_cartao_emergencial.classList.add('d-none');

        funcionarioModalInfoEstatisticas(id);
    }

    //Dados
    if (op == 2) {
        div_fotografias.classList.remove('d-lg-flex');
        div_fotografias.classList.add('d-none');

        div_dados.classList.remove('d-none');
        div_dados.classList.add('d-lg-flex');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_tomadores_servicos.classList.remove('d-lg-flex');
        div_tomadores_servicos.classList.add('d-none');

        div_incluir_documentos.classList.remove('d-lg-flex');
        div_incluir_documentos.classList.add('d-none');

        div_cartao_emergencial.classList.remove('d-lg-flex');
        div_cartao_emergencial.classList.add('d-none');

        funcionarioModalInfoDados(id);
        funcionarioModalInfoEstatisticas(id);
    }

    //Documentos
    if (op == 3) {
        div_fotografias.classList.remove('d-lg-flex');
        div_fotografias.classList.add('d-none');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-none');
        div_documentos.classList.add('d-lg-flex');

        div_tomadores_servicos.classList.remove('d-lg-flex');
        div_tomadores_servicos.classList.add('d-none');

        div_incluir_documentos.classList.remove('d-lg-flex');
        div_incluir_documentos.classList.add('d-none');

        div_cartao_emergencial.classList.remove('d-lg-flex');
        div_cartao_emergencial.classList.add('d-none');

        funcionarioModalInfoDocumentos(id);
        funcionarioModalInfoEstatisticas(id);
    }

    //Tomadores de Serviços
    if (op == 4) {
        div_fotografias.classList.remove('d-lg-flex');
        div_fotografias.classList.add('d-none');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_tomadores_servicos.classList.remove('d-none');
        div_tomadores_servicos.classList.add('d-lg-flex');

        div_incluir_documentos.classList.remove('d-lg-flex');
        div_incluir_documentos.classList.add('d-none');

        div_cartao_emergencial.classList.remove('d-lg-flex');
        div_cartao_emergencial.classList.add('d-none');

        funcionarioModalInfoTomadoresServicos(id);
        funcionarioModalInfoEstatisticas(id);
    }

    //Incluir Documentos
    if (op == 5) {
        div_fotografias.classList.remove('d-lg-flex');
        div_fotografias.classList.add('d-none');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_tomadores_servicos.classList.remove('d-lg-flex');
        div_tomadores_servicos.classList.add('d-none');

        div_incluir_documentos.classList.remove('d-none');
        div_incluir_documentos.classList.add('d-lg-flex');

        div_cartao_emergencial.classList.remove('d-lg-flex');
        div_cartao_emergencial.classList.add('d-none');

        funcionarioModalInfoEstatisticas(id);
    }

    //Cartão Emergencial
    if (op == 6) {
        div_fotografias.classList.remove('d-lg-flex');
        div_fotografias.classList.add('d-none');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_tomadores_servicos.classList.remove('d-lg-flex');
        div_tomadores_servicos.classList.add('d-none');

        div_incluir_documentos.classList.remove('d-lg-flex');
        div_incluir_documentos.classList.add('d-none');

        div_cartao_emergencial.classList.remove('d-none');
        div_cartao_emergencial.classList.add('d-lg-flex');

        //Colocar imagem do Cartão emergencial
        if (id == '') {id = document.getElementById('mi_fun_funcionario_id').value;}
        cartaoEmergencialGerarPDF(2, id, 1, 'pt', 'fun_cartao_emergencial_1');
        cartaoEmergencialGerarPDF(2, id, 1, 'en', 'fun_cartao_emergencial_2');
    }
}

// Modal Funcionários
// Estatisticas
function funcionarioModalInfoEstatisticas(id='') {
    if (id == '') {id = document.getElementById('mi_fun_funcionario_id').value;}

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'funcionarios/modalInfo/estatisticas/'+id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let json = data;

        //Lendo dados funcionario
        let estatisticas = json;

        //Header
        document.getElementById('md_fun_estatisticas_documentos').innerHTML = estatisticas.documentos;
        document.getElementById('md_fun_estatisticas_tomadores_servicos').innerHTML = estatisticas.tomadores_servicos;
    }).catch(error => {
        alert('Erro funcionarioModalInfoEstatisticas: '+error);
    });
}

// Modal Funcionários
// Dados
async function funcionarioModalInfoDados(id='') {
    if (id == '') {id = document.getElementById('mi_fun_funcionario_id').value;}

    //Abrir Modal
    var modalEl = document.getElementById('funcionario_modal_info');
    if (!modalEl.classList.contains('show')) {
        new bootstrap.Modal(document.getElementById('funcionario_modal_info')).show();
        ajustarMargensModalsInfo({ modalId:'funcionario_modal_info', top:20, right:20, bottom:20, left:20 });
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

        //Passando dados funcionario''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Header
        document.getElementById('mi_fun_header_nome').innerHTML = funcionario.name;

        //Fotografia Documento
        var fotografia_documento = url_atual+'build/assets/images/funcionarios/funcionario-0.png';
        if (funcionario.fotografia_documento) {fotografia_documento = funcionario.fotografia_documento;}
        document.getElementById('mi_fun_fotografia').src = fotografia_documento;
        document.getElementById('mi_fun_fotografia_documento').src = fotografia_documento;

        //Fotografia Cartão Emergencial
        var fotografia_cartao_emergencial = url_atual+'build/assets/images/funcionarios/funcionario-0.png';
        if (funcionario.fotografia_cartao_emergencial) {fotografia_cartao_emergencial = funcionario.fotografia_cartao_emergencial;}
        document.getElementById('mi_fun_fotografia_cartao_emergencial').src = fotografia_cartao_emergencial;

        //Funcionário id
        document.getElementById('mi_fun_funcionario_id').value = funcionario.id;

        //Dados
        document.getElementById('mi_fun_nome').value = funcionario.name;
        document.getElementById('mi_fun_cpf').value = funcionario.cpf;
        document.getElementById('mi_fun_empresa').value = funcionario.empresaName;
        document.getElementById('mi_fun_tomador_servico').value = funcionario.tomadorServicoName;
        document.getElementById('mi_fun_contratacao_tipo').value = funcionario.contratacaoTipoName;
        document.getElementById('mi_fun_funcao').value = funcionario.funcaoName;
        document.getElementById('mi_fun_departamento').value = funcionario.departamentoName;
        document.getElementById('mi_fun_nome_profissional').value = funcionario.nome_profissional;
        document.getElementById('mi_fun_data_nascimento').value = formatarData(2, funcionario.data_nascimento);
        document.getElementById('mi_fun_genero').value = funcionario.generoName;
        document.getElementById('mi_fun_celular_1').value = formatarTelCel(2, funcionario.celular_1);
        document.getElementById('mi_fun_celular_2').value = formatarTelCel(2, funcionario.celular_2);
        document.getElementById('mi_fun_telefone_1').value = formatarTelCel(1, funcionario.telefone_1);
        document.getElementById('mi_fun_telefone_2').value = formatarTelCel(1, funcionario.telefone_2);
        document.getElementById('mi_fun_email').value = funcionario.email;

        //Documentos
        document.getElementById('upload_documentos_funcionario_id').value = funcionario.id;

        //Fotografia Documento
        document.getElementById('upload_fotografia_documento_funcionario_id').value = funcionario.id;

        //Fotografia Cartão Emergencial
        document.getElementById('upload_fotografia_cartao_emergencial_funcionario_id').value = funcionario.id;
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }).catch(error => {
        alert('Erro funcionarioModalInfo: '+error);
    });
}

// Modal Funcionários
// Documentos
function funcionarioModalInfoDocumentos(funcionario_id='') {
    if (funcionario_id == '') {funcionario_id = document.getElementById('upload_documentos_funcionario_id').value;}

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'funcionarios/modalInfo/documentos/'+funcionario_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let funcionarios_documentos = data.funcionarios_documentos;

        // Permissões
        let permissoes = data.permissoes;
        const permissao_list = permissoes.some(p => p.permissao === 'funcionarios_list');
        const permissao_destroy = permissoes.some(p => p.permissao === 'funcionarios_destroy');

        //Grade
        let grade = '';

        //Montar Grade
        if (funcionarios_documentos.length > 0) {
            grade += '<table class="table align-middle table-nowrap table-check table-sm class-datatable-3">';
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Documento</th>';
            grade += '          <th scope="col">Data</th>';
            grade += '          <th scope="col">Aviso</th>';
            grade += '          <th scope="col">Ações</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            //Varrer
            funcionarios_documentos.forEach(dado => {
                //Documento
                let documentoName = dado.documentoName;

                //Aviso
                let aviso_texto = '';

                if (dado.aviso == 0) {aviso_texto = 'Nenhum Aviso';}
                if (dado.aviso == 1) {aviso_texto = 'Avisar a cada 1 mês';}
                if (dado.aviso == 2) {aviso_texto = 'Avisar a cada 3 meses';}
                if (dado.aviso == 3) {aviso_texto = 'Avisar a cada 6 meses';}
                if (dado.aviso == 4) {aviso_texto = 'Avisar a cada 1 ano';}
                if (dado.aviso == 5) {aviso_texto = 'Avisar a cada 3 anos';}
                if (dado.aviso == 6) {aviso_texto = 'Avisar a cada 6 anos';}

                //Ações
                let acoes = '';

                acoes += '<div class="row">';

                if (permissao_list) {
                    acoes += '  <div class="col-6">';
                    acoes += '      <button type="button" class="btn btn-outline-info text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Documento" onclick="window.open(\'' + dado.caminho + '\', \'_blank\');"><i class="fa fa-file-pdf font-size-18"></i></button>';
                    acoes += '  </div>';
                }

                if (permissao_destroy) {
                    acoes += '  <div class="col-6">';
                    acoes += '      <button type="button" class="btn btn-outline-danger text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Documento" onclick="funcionarioModalInfoDocumentosDeletar(' + dado.id + ');"><i class="fa fa-trash-alt font-size-18"></i></button>';
                    acoes += '  </div>';
                }

                acoes += '</div>';

                //TR
                grade += '<tr class="documento_fonte_'+dado.documento_fonte_id+'">';
                grade += '  <td>'+documentoName+'</td>';
                grade += '  <td>'+formatarData(2, dado.data_documento)+'</td>';
                grade += '  <td>'+aviso_texto+'</td>';
                grade += '  <td>'+acoes+'</td>';
                grade += '</tr>';
            });

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum documento encontrado.';
        }

        //Retornar Grade
        document.getElementById('fun_documentos_grade').innerHTML = grade;

        //Colocar Botões para filtro dos documentos quanto a Fonte
        var documentoFonteFiltro = '';
        var idPrimeiroFiltro = 0; // Guardar um id para depois que a grade for mostrada executar o primeiro Filtro)
        if (grade != 'Nenhum documento encontrado.') {
            //Lendo json
            let documento_fontes = data.documento_fontes;

            documentoFonteFiltro += '<div class="row my-2 d-flex">';

            //Varrer
            documento_fontes.forEach(dado => {
                let documento_fonte_id = dado.id;
                let documento_fonte_name = dado.name;
                let qtd_registros = funcionarios_documentos.filter(reg => reg.documento_fonte_id === documento_fonte_id);

                if (qtd_registros.length > 0) {
                    if (idPrimeiroFiltro == 0) {idPrimeiroFiltro = documento_fonte_id;}

                    documentoFonteFiltro += `   <div class="col-4 col-lg-3">`;
                    documentoFonteFiltro += `       <button type="button" class="btn btn-warning text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Filtar Documentos" onclick="funcionarioModalInfoDocumentosFiltrar(${documento_fonte_id});">${documento_fonte_name} (${qtd_registros.length})</button>`;
                    documentoFonteFiltro += `   </div>`;
                }
            });

            documentoFonteFiltro += '</div>';
        }

        //Retornar Documento Filtro (Botões)
        document.getElementById('fun_documentos_grade_botoes').innerHTML = documentoFonteFiltro;

        //Primeiro Filtro
        funcionarioModalInfoDocumentosFiltrar(idPrimeiroFiltro);
    }).catch(error => {
        alert('Erro funcionarioModalInfoGradeDocumentosPdf: '+error);
    }).finally(() => {
        configurarDataTable(3);
    });
}

function funcionarioModalInfoDocumentosFiltrar(documento_fonte_id) {
    const todasLinhas = document.querySelectorAll("#fun_documentos_grade table tbody tr");

    todasLinhas.forEach(linha => {
        if (linha.classList.contains(`documento_fonte_${documento_fonte_id}`)) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    });
}

//Função para deletar documento da grade
async function funcionarioModalInfoDocumentosDeletar(funcionario_documento_id) {
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
        }).then(data => {
            //Lendo dados
            if (data.success) {
                alertSwal('success', 'Funcionários', data.success, 'true', 2000);

                //Dados
                let funcionario_id = document.getElementById('upload_documentos_funcionario_id').value;

                //Montar Grade
                funcionarioModalInfoDocumentos(funcionario_id);
            } else if (data.error) {
                alertSwal('error', 'Funcionários', data.error, 'true', 2000);
            } else if (data.error_permissao) {
                alertSwal('warning', "Permissão Negada", '', 'true', 2000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro funcionarioModalInfoDeletarDocumentoPdf:'+error);
        });
    }
}

// Modal Funcionários
// Tomadores Servicos
function funcionarioModalInfoTomadoresServicos(funcionario_id='') {
    if (funcionario_id == '') {funcionario_id = document.getElementById('mi_fun_funcionario_id').value;}

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'funcionarios/modalInfo/tomadores_servicos/'+funcionario_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let tomadores_servicos = data.tomadores_servicos;

        //Array
        let funcionarios_tomadores_servicos = [];

        //Grade
        let grade = '';

        //Montar Grade
        if (tomadores_servicos.length > 0) {
            //Varrer Tomadores Serviços
            tomadores_servicos.forEach(dado => {
                funcionarios_tomadores_servicos.push({'tomador_servico_fonte_id': 2, 'nome': 'ORDEM DE SERVIÇO', 'data': formatarData(2, dado.data_abertura)});
            });

            grade += '<table class="table align-middle table-nowrap table-check table-sm class-datatable-3" id="tabela_funcionarios_tomadores_servicos">';
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Tomador Serviço</th>';
            grade += '          <th scope="col">Data</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            //Varrer funcionarios_tomadores_servicos
            funcionarios_tomadores_servicos.forEach(dado => {
                grade += '<tr class="tomador_servico_fonte_'+dado.tomador_servico_fonte_id+'">';
                grade += '  <td>'+dado.nome+'</td>';
                grade += '  <td>'+dado.data+'</td>';
                grade += '</tr>';
            });

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum tomador serviço encontrado.';
        }

        //Retornar Grade
        document.getElementById('fun_tomadores_servicos_grade').innerHTML = grade;

        //Colocar Botões para filtro dos tomadores_servicos quanto ao tipo
        var tomadorServicoFonteFiltro = '';
        var idPrimeiroFiltro = 1;
        if (grade != 'Nenhum tomador serviço encontrado.') {
            tomadorServicoFonteFiltro += '<div class="row my-2 d-flex">';

            //TOMADOR DE SERVIÇO
            var qtd_registros = funcionarios_tomadores_servicos.filter(reg => reg.tomador_servico_fonte_id === 2);

            tomadorServicoFonteFiltro += `   <div class="col-4">`;
            tomadorServicoFonteFiltro += `       <button type="button" class="btn btn-warning text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Filtar Serviços" onclick="funcionarioModalInfoTomadoresServicosFiltrar('TOMADOR DE SERVIÇO');">Tomadores de Serviços (${qtd_registros.length})</button>`;
            tomadorServicoFonteFiltro += `   </div>`;
        }

        //Retornar Tomador Servico Filtro (Botões)
        document.getElementById('fun_tomadores_servicos_grade_botoes').innerHTML = tomadorServicoFonteFiltro;

        //Primeiro Filtro
        funcionarioModalInfoTomadoresServicosFiltrar('TOMADOR SERVICO');
    }).catch(error => {
        alert('Erro funcionarioModalInfoGradeTomadoresServicosPdf: '+error);
    }).finally(() => {
        configurarDataTable(3);
    });
}

function funcionarioModalInfoTomadoresServicosFiltrar(fonte) {
    let tabela = $('#tabela_funcionarios_tomadores_servicos').DataTable();
    tabela.search(fonte).draw();
}

document.addEventListener("DOMContentLoaded", function(event) {
    //Acertar formulário para entrada de dados de contratacao_tipo''''''''''''''''''''''''''''''''''''''''''''''''''''''
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
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_documentos_fun_executar''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_documentos_fun_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_documentos_fun');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';
        var upload_documentos_funcionario_id = document.getElementById('upload_documentos_funcionario_id').value;

        //Tratar Botões
        document.getElementById('frm_upload_documentos_fun_executar').style.display = 'block';

        //Criticando campos
        if (validar_frm_upload_documentos() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'funcionarios/uploadDocumento/upload_documento', {
            method: 'POST',
            headers: {
                'REQUEST-ORIGIN': 'fetch',
                'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: formData
        }).then(response => {
            return response.json();
        }).then(data => {
            //Lendo dados
            if (data.success) {
                //Montando Grade de Documentos PDF
                funcionarioModalInfoDocumentos(upload_documentos_funcionario_id);

                formulario.reset();

                alertSwal('success', 'Funcionários', data.success, 'true', 20000);
            } else if (data.error) {
                alertSwal('warning', 'Funcionários', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Funcionários Upload Documento PDF: '+error);
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_fotografia_documento_fun_executar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_fotografia_documento_fun_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_fotografia_documento_fun');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';
        var upload_documentos_funcionario_id = document.getElementById('upload_fotografia_documento_funcionario_id').value;

        //Tratar Botões
        document.getElementById('frm_upload_fotografia_documento_fun_executar').style.display = 'block';

        //Criticando campos
        if (validar_frm_upload_fotografia_documento() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'funcionarios/uploadFotografia/upload_fotografia_documento', {
            method: 'POST',
            headers: {
                'REQUEST-ORIGIN': 'fetch',
                'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: formData
        }).then(response => {
            return response.json();
        }).then(data => {
            //Lendo dados
            if (data.success) {
                //Atualizando Fotografias documento
                const fileInput = document.getElementById('fun_fotografia_documento_file');
                const file = fileInput.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        document.getElementById('mi_fun_fotografia').src = reader.result;
                        document.getElementById('mi_fun_fotografia_documento').src = reader.result;
                    };
                    reader.readAsDataURL(file);
                }

                //Reset Form
                formulario.reset();
            } else if (data.error) {
                alertSwal('warning', 'Funcionários', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Funcionários Upload Fotografia Documento: '+error);
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_fotografia_cartao_emergencial_fun_executar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_fotografia_cartao_emergencial_fun_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_fotografia_cartao_emergencial_fun');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';
        var upload_documentos_funcionario_id = document.getElementById('upload_fotografia_cartao_emergencial_funcionario_id').value;

        //Tratar Botões
        document.getElementById('frm_upload_fotografia_cartao_emergencial_fun_executar').style.display = 'block';

        //Criticando campos
        if (validar_frm_upload_fotografia_cartao_emergencial() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'funcionarios/uploadFotografia/upload_fotografia_cartao_emergencial', {
            method: 'POST',
            headers: {
                'REQUEST-ORIGIN': 'fetch',
                'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: formData
        }).then(response => {
            return response.json();
        }).then(data => {
            //Lendo dados
            if (data.success) {
                //Atualizando Fotografias cartao_emergencial
                const fileInput = document.getElementById('fun_fotografia_cartao_emergencial_file');
                const file = fileInput.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        document.getElementById('mi_fun_fotografia_cartao_emergencial').src = reader.result;
                    };
                    reader.readAsDataURL(file);
                }

                //Reset Form
                formulario.reset();
            } else if (data.error) {
                alertSwal('warning', 'Funcionários', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Funcionários Upload Fotografia Cartão Emergencial: '+error);
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: funcionario_acao_1_dropdown''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    if (document.getElementById('funcionario_acao_1_dropdown')) {
        document.getElementById('funcionario_acao_1_dropdown').addEventListener('click', function () {
            //Hide no crudTable usando a função do CRUD documentos
            crudConfiguracao({p_crudTable: 'hide'});

            //Show no funcionario_acao_1
            document.getElementById('funcionario_acao_1').style.display = 'block';

            //URL
            var url_atual = window.location.protocol + '//' + window.location.host + '/';

            //Acessar rota
            fetch(url_atual + 'funcionarios/funcionarioAcao1/funcionario_acao_1_grade_funcionarios', {
                method: 'GET',
                headers: {'REQUEST-ORIGIN': 'fetch'}
            }).then(response => {
                return response.json();
            }).then(data => {
                //Lendo json
                let dados = data;

                //Dados
                if (dados.length <= 0) {
                    grade = 'Nenhum dado encontrado para grade.';
                } else {
                    var grade = '<label class="form-label">Funcionário(s)</label>';
                    grade += '<table class="table table-bordered dt-responsive  nowrap w-100">';
                    grade += '  <thead>';
                    grade += '      <tr>';
                    grade += '          <th>#</th>';
                    grade += '          <th>Funcionário</th>';
                    grade += '          <th>Contratação</th>';
                    grade += '          <th>Função</th>';
                    grade += '      </tr>';
                    grade += '  </thead>';
                    grade += '  <tbody>';

                    //Varrer
                    dados.forEach((dado, index) => {
                        grade += `<tr>`;
                        grade += `  <td>`;
                        grade += `    <div class="form-check">`;
                        grade += `        <input class="form-check-input" type="checkbox" id="funcionario_acao_1_funcionario_id_${dado.id}" name="funcionario_acao_1_funcionario_id" value="${dado.id}">`;
                        grade += `    </div>`;
                        grade += `  </td>`;
                        grade += `  <td>${dado.name}</td>`;
                        grade += `  <td>${dado.contratacaoTipoName}</td>`;
                        grade += `  <td>${dado.funcaoName}</td>`;
                        grade += `</tr>`;
                    });

                    grade += '  </tbody>';
                    grade += '</table>';
                }

                //Retornar Grade
                document.getElementById('funcionario_acao_1_grade_funcionarios').innerHTML = grade;
            }).catch(error => {
                alert('Erro funcionario_acao_1_gerar_pdf: ' + error);
            });
        });
    }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: funcionario_acao_1_gerar_pdfs''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('funcionario_acao_1_gerar_pdfs').addEventListener('click', function() {
        funcionario_acao_1_gerar_pdf();
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: funcionario_acao_1_cancelar''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('funcionario_acao_1_cancelar').addEventListener('click', function() {
        //Hide no funcionario_acao_1
        document.getElementById('funcionario_acao_1').style.display = 'none';

        //Chamar função usada para cancelar operação no CRUD documentos
        crudCancelOperation();
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
