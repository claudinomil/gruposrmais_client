function validar_frm_clientes() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: status (requerido)
    if (validacao({op:1, value:document.getElementById('status').value}) === false) {
        validacao_ok = false;
        mensagem += 'Status requerido.'+'<br>';
    }

    //Campo: tipo (requerido)
    if (validacao({op:1, value:document.getElementById('tipo').value}) === false) {
        validacao_ok = false;
        mensagem += 'Tipo requerido.'+'<br>';
    }

    //PESSOA JURÍDICA
    if (document.getElementById('tipo').value == 1) {
        //Campo: cnpj (não requerido / CNPJ Válido)
        if (validacao({op:1, value:document.getElementById('cnpj').value}) === true) {
            //Campo: cnpj (CNPJ Válido)
            if (validacao({op:6, value:document.getElementById('cnpj').value}) === false) {
                validacao_ok = false;
                mensagem += 'CNPJ Inválido.'+'<br>';
            }
        } else {
            validacao_ok = false;
            mensagem += 'CNPJ requerido.'+'<br>';
        }

        //Campo: nome_fantasia (não requerido / mínimo de 3 caracteres)
        if (validacao({op:1, value:document.getElementById('nome_fantasia').value}) === true) {
            //Campo: nome_fantasia (mínimo de 3 caracteres)
            if (validacao({op:2, value:document.getElementById('nome_fantasia').value, minCaracteres:3}) === false) {
                validacao_ok = false;
                mensagem += 'Nome Fantasia precisa ter no mínimo 3 caracteres.' + '<br>';
            }
        }

        //Campo: inscricao_estadual (não requerido / somente números)
        if (validacao({op:1, value:document.getElementById('inscricao_estadual').value}) === true) {
            //Campo: inscricao_estadual (somente números)
            if (validacao({op:4, value:document.getElementById('inscricao_estadual').value}) === false) {
                validacao_ok = false;
                mensagem += 'Inscrição Estadual só pode conter dígitos de 0 a 9.'+'<br>';
            }
        }

        //Campo: inscricao_municipal (não requerido / somente números)
        if (validacao({op:1, value:document.getElementById('inscricao_municipal').value}) === true) {
            //Campo: inscricao_municipal (somente números)
            if (validacao({op:4, value:document.getElementById('inscricao_municipal').value}) === false) {
                validacao_ok = false;
                mensagem += 'Inscrição Municipal só pode conter dígitos de 0 a 9.'+'<br>';
            }
        }
    }

    //PESSOA FÍSICA
    if (document.getElementById('tipo').value == 2) {
        //Campo: cpf (não requerido / CPF Válido)
        if (validacao({op:1, value:document.getElementById('cpf').value}) === true) {
            //Campo: cpf (CPF Válido)
            if (validacao({op:7, value:document.getElementById('cpf').value}) === false) {
                validacao_ok = false;
                mensagem += 'CPF Inválido.'+'<br>';
            }
        } else {
            validacao_ok = false;
            mensagem += 'CPF requerido.'+'<br>';
        }

        //Campo: identidade_numero (não requerido / somente números)
        if (validacao({op:1, value:document.getElementById('identidade_numero').value}) === true) {
            //Campo: identidade_numero (somente números)
            if (validacao({op:4, value:document.getElementById('identidade_numero').value}) === false) {
                validacao_ok = false;
                mensagem += 'Identidade Número só pode conter dígitos de 0 a 9.'+'<br>';
            }
        }

        //Campo: identidade_data_emissao (não requerido / Data Válida)
        if (validacao({op:1, value:document.getElementById('identidade_data_emissao').value}) === true) {
            //Campo: identidade_data_emissao (Data Válida)
            if (validacao({op:8, value:document.getElementById('identidade_data_emissao').value}) === false) {
                validacao_ok = false;
                mensagem += 'Identidade Data Emissão Inválida.'+'<br>';
            }
        }
    }

    //Campo: name (requerido)
    if (validacao({op:1, value:document.getElementById('name').value}) === false) {
        validacao_ok = false;
        mensagem += 'Nome requerido.'+'<br>';
    } else {
        //Campo: name (mínimo de 3 caracteres)
        if (validacao({op: 2, value: document.getElementById('name').value, minCaracteres: 3}) === false) {
            validacao_ok = false;
            mensagem += 'Nome precisa ter no mínimo 3 caracteres.' + '<br>';
        }
    }

    //Campo: data_nascimento (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('data_nascimento').value}) === true) {
        //Campo: data_nascimento (Data Válida)
        if (validacao({op:8, value:document.getElementById('data_nascimento').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data Nascimento Inválida.'+'<br>';
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

    //Campo: cep_cobranca (não requerido / CEP Válido)
    if (validacao({op:1, value:document.getElementById('cep_cobranca').value}) === true) {
        //Campo: cep_cobranca (CEP Válido)
        if (validacao({op:9, value:document.getElementById('cep_cobranca').value}) === false) {
            validacao_ok = false;
            mensagem += 'CEP Cobrança Inválido.'+'<br>';
        }
    }

    //Campo: numero_cobranca (não requerido / somente números)
    if (validacao({op:1, value:document.getElementById('numero_cobranca').value}) === true) {
        //Campo: numero_cobranca (somente números)
        if (validacao({op:4, value:document.getElementById('numero_cobranca').value}) === false) {
            validacao_ok = false;
            mensagem += 'Número Cobrança só pode conter dígitos de 0 a 9.'+'<br>';
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

    //Campo: email_avisos (não requerido / E-mail Válido)
    if (validacao({op:1, value:document.getElementById('email_avisos').value}) === true) {
        //Campo: email_avisos (E-mail Válido)
        if (validacao({op:5, value:document.getElementById('email_avisos').value}) === false) {
            validacao_ok = false;
            mensagem += 'E-mail Avisos Inválido.'+'<br>';
        }
    }

    //Campo: site (não requerido / URL Válida)
    if (validacao({op:1, value:document.getElementById('site').value}) === true) {
        //Campo: site (URL Válida)
        if (validacao({op:10, value:document.getElementById('site').value}) === false) {
            validacao_ok = false;
            mensagem += 'Site Inválido.'+'<br>';
        }
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

    //Campo: upload_documentos_cliente_id (requerido)
    if (validacao({op:1, value:document.getElementById('upload_documentos_cliente_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.'+'<br>';
    }

    //Campo: cli_documentos_documento_id (requerido)
    if (validacao({op:1, value:document.getElementById('cli_documentos_documento_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Documento requerido.'+'<br>';
    }

    //Campo: cli_documentos_data_emissao (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('cli_documentos_data_emissao').value}) === true) {
        //Campo: cli_documentos_data_emissao (Data Válida)
        if (validacao({op:8, value:document.getElementById('cli_documentos_data_emissao').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data emissão Inválida.'+'<br>';
        }
    }

    //Campo: cli_documentos_data_vencimento (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('cli_documentos_data_vencimento').value}) === true) {
        //Campo: cli_documentos_data_vencimento (Data Válida)
        if (validacao({op:8, value:document.getElementById('cli_documentos_data_vencimento').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data vencimento Inválida.'+'<br>';
        }
    }

    //Campo: cli_documentos_file (arquivo PDF requerido)
    if (validacao({op:16, id:'cli_documentos_file'}) === false) {
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

function validar_frm_upload_logotipo_principal() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: cli_logotipo_principal_file (arquivo requerido)
    if (validacao({op:18, id:'cli_logotipo_principal_file'}) === false) {
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

function validar_frm_upload_logotipo_relatorios() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: cli_logotipo_relatorios_file (arquivo requerido)
    if (validacao({op:18, id:'cli_logotipo_relatorios_file'}) === false) {
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

function validar_frm_upload_logotipo_cartao_emergencial() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: cli_logotipo_cartao_emergencial_file (arquivo requerido)
    if (validacao({op:18, id:'cli_logotipo_cartao_emergencial_file'}) === false) {
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

function validar_frm_upload_logotipo_menu() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: cli_logotipo_menu_file (arquivo requerido)
    if (validacao({op:18, id:'cli_logotipo_menu_file'}) === false) {
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

async function clienteModalInfoControle(op, id = '') {
    if (id == '') { id = document.getElementById('mi_cli_cliente_id').value; }

    // Elementos
    var div_logotipos = document.getElementById('md_cli_div_logotipos');
    var div_dados = document.getElementById('md_cli_div_dados');
    var div_documentos = document.getElementById('md_cli_div_documentos');
    var div_incluir_documentos = document.getElementById('md_cli_div_incluir_documentos');
    var div_propostas = document.getElementById('md_cli_div_propostas');
    var div_ordens_servicos = document.getElementById('md_cli_div_ordens_servicos');
    var div_visitas_tecnicas = document.getElementById('md_cli_div_visitas_tecnicas');
    var div_brigadas_incendios = document.getElementById('md_cli_div_brigadas_incendios');
    var div_clientes_rede = document.getElementById('md_cli_div_clientes_rede');
    var div_clientes_principal = document.getElementById('md_cli_div_clientes_principal');
    var div_documentos_exigidos = document.getElementById('md_cli_div_documentos_exigidos');

    // Divs ClassList
    if (div_logotipos) {
        div_logotipos.classList.remove('d-lg-flex');
        div_logotipos.classList.add('d-none');
    }

    div_dados.classList.remove('d-lg-flex');
    div_dados.classList.add('d-none');

    div_documentos.classList.remove('d-lg-flex');
    div_documentos.classList.add('d-none');

    if (div_incluir_documentos) {
        div_incluir_documentos.classList.remove('d-lg-flex');
        div_incluir_documentos.classList.add('d-none');
    }

    div_propostas.classList.remove('d-lg-flex');
    div_propostas.classList.add('d-none');

    div_ordens_servicos.classList.remove('d-lg-flex');
    div_ordens_servicos.classList.add('d-none');

    div_visitas_tecnicas.classList.remove('d-lg-flex');
    div_visitas_tecnicas.classList.add('d-none');

    div_brigadas_incendios.classList.remove('d-lg-flex');
    div_brigadas_incendios.classList.add('d-none');

    div_clientes_rede.classList.remove('d-lg-flex');
    div_clientes_rede.classList.add('d-none');

    div_clientes_principal.classList.remove('d-lg-flex');
    div_clientes_principal.classList.add('d-none');

    if (div_documentos_exigidos) {
        div_documentos_exigidos.classList.remove('d-lg-flex');
        div_documentos_exigidos.classList.add('d-none');
    }
    // Logotipos
    if (op == 1) {
        div_logotipos.classList.remove('d-none');
        div_logotipos.classList.add('d-lg-flex');
    }

    // Dados
    if (op == 2) {
        div_dados.classList.remove('d-none');
        div_dados.classList.add('d-lg-flex');

        clienteModalInfoDados(id);
    }

    // Documentos
    if (op == 3) {
        div_documentos.classList.remove('d-none');
        div_documentos.classList.add('d-lg-flex');

        clienteModalInfoDocumentos(id);
    }

    // Incluir Documentos
    if (op == 6) {
        div_incluir_documentos.classList.remove('d-none');
        div_incluir_documentos.classList.add('d-lg-flex');
    }

    // Propostas
    if (op == 7) {
        div_propostas.classList.remove('d-none');
        div_propostas.classList.add('d-lg-flex');

        clienteModalInfoPropostas(id);
    }

    // Ordens Serviços
    if (op == 8) {
        div_ordens_servicos.classList.remove('d-none');
        div_ordens_servicos.classList.add('d-lg-flex');

        clienteModalInfoOrdensServicos(id);
    }

    // Visitas Técnicas
    if (op == 9) {
        div_visitas_tecnicas.classList.remove('d-none');
        div_visitas_tecnicas.classList.add('d-lg-flex');

        clienteModalInfoVisitasTecnicas(id);
    }

    // Brigadas Incêndios
    if (op == 10) {
        div_brigadas_incendios.classList.remove('d-none');
        div_brigadas_incendios.classList.add('d-lg-flex');

        clienteModalInfoBrigadasIncendios(id);
    }

    // Rede
    if (op == 11) {
        div_clientes_rede.classList.remove('d-none');
        div_clientes_rede.classList.add('d-lg-flex');

        clienteModalInfoClientesRede(id);
    }

    // Principal
    if (op == 12) {
        div_clientes_principal.classList.remove('d-none');
        div_clientes_principal.classList.add('d-lg-flex');

        clienteModalInfoClientesPrincipal(id);
    }

    // Documentos Exigidos
    if (op == 13) {
        div_documentos_exigidos.classList.remove('d-none');
        div_documentos_exigidos.classList.add('d-lg-flex');

        clienteModalInfoDocumentosExigidos(id);
    }

    clienteModalInfoEstatisticas(id);
}

// Modal Clientes
// Estatisticas
function clienteModalInfoEstatisticas(id='') {
    if (id == '') {id = document.getElementById('mi_cli_cliente_id').value;}

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'clientes/modalInfo/estatisticas/'+id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let json = data;

        //Lendo dados cliente
        let estatisticas = json;

        //Header
        document.getElementById('md_cli_estatisticas_documentos').innerHTML = estatisticas.documentos;
        document.getElementById('md_cli_estatisticas_visitas_tecnicas').innerHTML = estatisticas.visitas_tecnicas;
        document.getElementById('md_cli_estatisticas_ordens_servicos').innerHTML = estatisticas.ordens_servicos;
        document.getElementById('md_cli_estatisticas_brigadas_incendios').innerHTML = estatisticas.brigadas_incendios;
        document.getElementById('md_cli_estatisticas_propostas').innerHTML = estatisticas.propostas;
        document.getElementById('md_cli_estatisticas_clientes_rede').innerHTML = estatisticas.clientes_rede;
        document.getElementById('md_cli_estatisticas_clientes_principal').innerHTML = estatisticas.clientes_principal;
        document.getElementById('md_cli_estatisticas_documentos_exigidos').innerHTML = estatisticas.documentos_exigidos;
    }).catch(error => {
        alert('Erro clienteModalInfoEstatisticas: '+error);
    });
}

// Modal Clientes
// Dados
async function clienteModalInfoDados(id='') {
    if (id == '') {id = document.getElementById('mi_cli_cliente_id').value;}

    //Abrir Modal
    var modalEl = document.getElementById('cliente_modal_info');
    if (!modalEl.classList.contains('show')) {
        new bootstrap.Modal(document.getElementById('cliente_modal_info')).show();
        ajustarMargensModalsInfo({ modalId:'cliente_modal_info', top:20, right:20, bottom:20, left:20 });
    }

    //Limpando dados
    let elementos = document.querySelectorAll('.clearClass');
    elementos.forEach(elemento => {elemento.src = ''; elemento.innerHTML = '';});

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'clientes/modalInfo/modal_info/'+id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let json = data;

        //Lendo dados cliente
        let cliente = json.cliente;

        //Acertos
        if (cliente.status == 1) {var status = 'ATIVO';}
        if (cliente.status == 2) {var status = 'INATIVO';}

        if (cliente.tipo == 1) {
            var tipo = 'PESSOA JURÍDICA';
            var cpf_cnpj = cliente.cnpj;

            //Campo data_nascimento
            document.getElementById('div_cli_dados_data').innerHTML = 'Data Abertura';
        }
        if (cliente.tipo == 2) {
            var tipo = 'PESSOA FÍSICA';
            var cpf_cnpj = cliente.cpf;

            //Campo data_nascimento
            document.getElementById('div_cli_dados_data').innerHTML = 'Data Nascimento';
        }

        //Campo cli_documentos_documento_id''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        const selectDocumento = document.getElementById('cli_documentos_documento_id');
        if (selectDocumento) {
            const options = selectDocumento.querySelectorAll('option');

            options.forEach(option => {
                //Sempre mostrar a primeira opção (placeholder)
                if (option.value === '') {
                    option.style.display = 'block';
                    return;
                }

                if (cliente.tipo == 1 && option.classList.contains('pessoa_juridica')) {
                    option.style.display = 'block';
                } else if (cliente.tipo == 2 && option.classList.contains('pessoa_fisica')) {
                    option.style.display = 'block';
                } else {
                    option.style.display = 'none';
                }
            });

            //Resetar o valor selecionado sempre que mudar o tipo
            selectDocumento.value = '';
        }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Passando dados cliente''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Header
        document.getElementById('mi_cli_header_nome').innerHTML = cliente.name;

        //Logotipo Principal
        var logotipo_principal = url_atual+'build/assets/images/clientes/logotipo_principal-0.png';
        if (cliente.logotipo_principal) {logotipo_principal = cliente.logotipo_principal;}
        document.getElementById('mi_cli_logotipo').src = logotipo_principal;
        if (document.getElementById('mi_cli_logotipo_principal')) { document.getElementById('mi_cli_logotipo_principal').src = logotipo_principal; }

        //Logotipo Relatórios
        var logotipo_relatorios = url_atual+'build/assets/images/clientes/cliente-0.png';
        if (cliente.logotipo_relatorios) {logotipo_relatorios = cliente.logotipo_relatorios;}
        if (document.getElementById('mi_cli_logotipo_relatorios')) { document.getElementById('mi_cli_logotipo_relatorios').src = logotipo_relatorios; }

        //Logotipo Cartão Emergencial
        var logotipo_cartao_emergencial = url_atual+'build/assets/images/clientes/cliente-0.png';
        if (cliente.logotipo_cartao_emergencial) {logotipo_cartao_emergencial = cliente.logotipo_cartao_emergencial;}
        if (document.getElementById('mi_cli_logotipo_cartao_emergencial')) { document.getElementById('mi_cli_logotipo_cartao_emergencial').src = logotipo_cartao_emergencial; }

        // Logotipo Menu
        var logotipo_menu = url_atual+'build/assets/images/clientes/logotipo_menu-0.png';
        if (cliente.logotipo_menu) { logotipo_menu = cliente.logotipo_menu; }
        if (document.getElementById('mi_cli_logotipo_menu')) { document.getElementById('mi_cli_logotipo_menu').src = logotipo_menu; }

        // Cliente id
        document.getElementById('mi_cli_cliente_id').value = cliente.id;

        // Dados
        document.getElementById('mi_cli_status').value = status;
        document.getElementById('mi_cli_tipo').value = tipo;
        document.getElementById('mi_cli_cpf_cnpj').value = cpf_cnpj;
        document.getElementById('mi_cli_nome').value = cliente.name;
        document.getElementById('mi_cli_telefones').value = formatarTelCel(1, cliente.telefone_1)+'  '+formatarTelCel(1, cliente.telefone_2);
        document.getElementById('mi_cli_celulares').value = formatarTelCel(2, cliente.celular_1)+'  '+formatarTelCel(2, cliente.celular_2);
        document.getElementById('mi_cli_data_nascimento').value = formatarData(2, cliente.data_nascimento);

        // Documentos
        if (document.getElementById('upload_documentos_cliente_id')) { document.getElementById('upload_documentos_cliente_id').value = cliente.id; }

        // Logotipo Principal
        if (document.getElementById('upload_logotipo_principal_cliente_id')) { document.getElementById('upload_logotipo_principal_cliente_id').value = cliente.id; }

        // Logotipo Relatórios
        if (document.getElementById('upload_logotipo_relatorios_cliente_id')) { document.getElementById('upload_logotipo_relatorios_cliente_id').value = cliente.id; }

        // Logotipo Cartão Emergencial
        if (document.getElementById('upload_logotipo_cartao_emergencial_cliente_id')) { document.getElementById('upload_logotipo_cartao_emergencial_cliente_id').value = cliente.id; }

        // Logotipo Menu
        if (document.getElementById('upload_logotipo_menu_cliente_id')) { document.getElementById('upload_logotipo_menu_cliente_id').value = cliente.id; }

        // Documentos Exigidos
        if (document.getElementById('documentos_exigidos_cliente_id')) { document.getElementById('documentos_exigidos_cliente_id').value = cliente.id; }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }).catch(error => {
        alert('Erro clienteModalInfoDados: '+error);
    });
}

// Modal Clientes
// Documentos
function clienteModalInfoDocumentos(cliente_id = '') {
    if (cliente_id == '') { cliente_id = document.getElementById('mi_cli_cliente_id').value; }

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'clientes/modalInfo/documentos/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let clientes_documentos = data.clientes_documentos;

        // Permissões
        let permissoes = data.permissoes;
        const permissao_list = permissoes.some(p => p.permissao === 'clientes_list');
        const permissao_destroy = permissoes.some(p => p.permissao === 'clientes_destroy');

        //Grade
        let grade = '';

        //Montar Grade
        if (clientes_documentos.length > 0) {
            grade += '<table class="table align-middle table-nowrap table-check table-sm">'; //NÃO COLOCAR DATATABLE POIS O FILTRO NÃO FUNCIONA
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Documento</th>';
            grade += '          <th scope="col">Descrição</th>';
            grade += '          <th scope="col">Emissão</th>';
            grade += '          <th scope="col">Vencimento</th>';
            grade += '          <th scope="col">Aviso</th>';
            grade += '          <th scope="col">Ações</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            //Varrer
            clientes_documentos.forEach(dado => {
                //Documento
                let documentoName = dado.documentoName;

                //Aviso
                let aviso_texto = '';

                if (dado.aviso == 0) {aviso_texto = '';}
                if (dado.aviso == 1) {aviso_texto = 'Avisar a cada 1 mês';}
                if (dado.aviso == 2) {aviso_texto = 'Avisar a cada 3 meses';}
                if (dado.aviso == 3) {aviso_texto = 'Avisar a cada 6 meses';}
                if (dado.aviso == 4) {aviso_texto = 'Avisar a cada 1 ano';}
                if (dado.aviso == 5) {aviso_texto = 'Avisar a cada 3 anos';}
                if (dado.aviso == 6) { aviso_texto = 'Avisar a cada 6 anos'; }

                // Ações
                let acoes = '';

                acoes += '<div class="row">';

                if (permissao_list) {
                    acoes += '  <div class="col-6">';
                    acoes += '      <button type="button" class="btn btn-outline-info text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Documento" onclick="window.open(\'' + dado.caminho + '\', \'_blank\');"><i class="fa fa-file-pdf font-size-18"></i></button>';
                    acoes += '  </div>';
                }

                if (permissao_destroy) {
                    acoes += '  <div class="col-6">';
                    acoes += '      <button type="button" class="btn btn-outline-danger text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Documento" onclick="clienteModalInfoDocumentosDeletar(' + dado.id + ');"><i class="fa fa-trash-alt font-size-18"></i></button>';
                    acoes += '  </div>';
                }

                acoes += '</div>';

                // TR
                grade += '<tr class="documento_fonte_'+dado.documento_fonte_id+'">';
                grade += '  <td>'+documentoName+'</td>';
                grade += '  <td>'+dado.descricao+'</td>';
                grade += '  <td>' + formatarData(2, dado.data_emissao) + '</td>';
                grade += '  <td>'+formatarData(2, dado.data_vencimento)+'</td>';
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
        document.getElementById('cli_documentos_grade').innerHTML = grade;

        //Colocar Botões para filtro dos documentos quanto a Fonte
        var documentoFonteFiltro = '';
        var idPrimeiroFiltro = 0; // Guardar um id para depois que a grade for mostrada executar o primeiro Filtro)
        if (grade != 'Nenhum documento encontrado.') {
            //Lendo json
            let documento_fontes = data.documento_fontes;

            documentoFonteFiltro += '<div class="row g-3">';

            //Varrer
            documento_fontes.forEach(dado => {
                let documento_fonte_id = dado.id;
                let documento_fonte_name = dado.name;
                let qtd_registros = clientes_documentos.filter(reg => reg.documento_fonte_id === documento_fonte_id);

                if (qtd_registros.length > 0) {
                    if (idPrimeiroFiltro == 0) { idPrimeiroFiltro = documento_fonte_id; }

                    documentoFonteFiltro += `
                        <div class="col-12 col-lg-6">
                            <button type="button"
                                class="btn btn-warning text-center btn-sm w-100"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Filtrar Documentos"
                                onclick="clienteModalInfoDocumentosFiltrar(${documento_fonte_id});">
                                ${documento_fonte_name} (${qtd_registros.length})
                            </button>
                        </div>
                    `;
                }
            });

            documentoFonteFiltro += '</div>';
        }

        //Retornar Documento Filtro (Botões)
        document.getElementById('cli_documentos_grade_botoes').innerHTML = documentoFonteFiltro;

        //Primeiro Filtro
        clienteModalInfoDocumentosFiltrar(idPrimeiroFiltro);
    }).catch(error => {
        alert('Erro clienteModalInfoDocumentos: '+error);
    }).finally(() => {
        configurarDataTable(3);
    });
}

function clienteModalInfoDocumentosFiltrar(documento_fonte_id) {
    const todasLinhas = document.querySelectorAll("#cli_documentos_grade table tbody tr");

    // Primeiro: mostra todas as linhas
    todasLinhas.forEach(linha => linha.style.display = '');

    // Depois: aplica o filtro
    todasLinhas.forEach(linha => {
        if (!linha.classList.contains(`documento_fonte_${documento_fonte_id}`)) {
            linha.style.display = 'none';
        }
    });
}

//Função para deletar documento da grade
async function clienteModalInfoDocumentosDeletar(cliente_documento_id) {
    //Confirmação de Delete
    const confirmed = await alertSwalConfirmacao();
    if (confirmed) {
        var url_atual = window.location.protocol+'//'+window.location.host+'/';

        //Acessar rota
        fetch(url_atual+'clientes/modalInfo/deletar_documento/'+cliente_documento_id, {
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
                alertSwal('success', 'Clientes', data.success, 'true', 2000);

                //Dados
                let cliente_id = document.getElementById('mi_cli_cliente_id').value;

                //Montar Grade
                clienteModalInfoDocumentos(cliente_id);
            } else if (data.error) {
                alertSwal('error', 'Clientes', data.error, 'true', 2000);
            } else if (data.error_permissao) {
                alertSwal('warning', "Permissão Negada", '', 'true', 2000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro clienteModalInfoDocumentosDeletar:'+error);
        });
    }
}

// Modal Clientes
// Propostas
function clienteModalInfoPropostas(cliente_id = '') {
    if (cliente_id == '') { cliente_id = document.getElementById('mi_cli_cliente_id').value; }

    var url_atual = window.location.protocol + '//' + window.location.host + '/';

    // Acessar rota
    fetch(url_atual+'clientes/modalInfo/propostas/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let propostas = data;

        //Grade
        let grade = '';

        //Montar Grade
        if (propostas.length > 0) {
            grade += '<table class="table align-middle table-nowrap table-check table-sm">';
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Proposta</th>';
            grade += '          <th scope="col">Data</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            //Varrer
            propostas.forEach(dado => {
                let numProposta = `<a href="#" title="Visualizar Proposta nº. ${dado.numero_proposta}\\${dado.ano_proposta}" onclick="gerarProposta(${dado.id});"><i class="fa fa-file-pdf fa-2x text-danger"></i></a>`;
                numProposta += `&nbsp;&nbsp;Proposta nº.&nbsp;${dado.numero_proposta}\\${dado.ano_proposta}`;

                grade += '<tr>';
                grade += '  <td>'+numProposta+'</td>';
                grade += '  <td>' + formatarData(2, dado.data_proposta) + '</td>';
                grade += '</tr>';
            });

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum registro encontrado.';
        }

        // Retornar Grade
        document.getElementById('cli_propostas_grade').innerHTML = grade;
    }).catch(error => {
        alert('Erro clienteModalInfoPropostas: '+error);
    }).finally(() => {});
}

// Modal Clientes
// Ordens Serviços
function clienteModalInfoOrdensServicos(cliente_id = '') {
    if (cliente_id == '') { cliente_id = document.getElementById('mi_cli_cliente_id').value; }

    var url_atual = window.location.protocol + '//' + window.location.host + '/';

    // Acessar rota
    fetch(url_atual+'clientes/modalInfo/ordens_servicos/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let ordens_servicos = data;

        //Grade
        let grade = '';

        //Montar Grade
        if (ordens_servicos.length > 0) {
            grade += '<table class="table align-middle table-nowrap table-check table-sm">';
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Órdem Serviço</th>';
            grade += '          <th scope="col">Data</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            //Varrer
            ordens_servicos.forEach(dado => {
                // Cores
                let cor = '';
                if (dado.ordem_servico_tipo_id == 1) {cor = 'text-success'; }
                if (dado.ordem_servico_tipo_id == 2) {cor = 'text-primary'; }
                if (dado.ordem_servico_tipo_id == 3) { cor = 'text-info'; }

                let numOrdemServico = `<a href="#" title="Ordem Serviço em PDF" onclick="gerar_ordem_servico(${dado.id}, ${dado.ordem_servico_tipo_id});"><i class="fa fa-file-pdf fa-2x text-danger"></i></a>`;
                numOrdemServico += `&nbsp;&nbsp;`;
                numOrdemServico += `<a href="#" title="Ordem Serviço em PDF (Inglês)" onclick="gerar_ordem_servico(${dado.id}, ${dado.ordem_servico_tipo_id}, 'en');"><i class="fa fa-file-pdf fa-2x text-primary"></i></a>`;
                numOrdemServico += `&nbsp;&nbsp;&nbsp;`;
                numOrdemServico += `Ordem Serviço nº.&nbsp;${dado.numero_ordem_servico}/${dado.ano_ordem_servico}`;
                numOrdemServico += `&nbsp;&nbsp;&nbsp;`;
                numOrdemServico += `(<span class="${cor}">${dado.ordemServicoTipoName}</span>)`;

                grade += '<tr>';
                grade += '  <td>'+numOrdemServico+'</td>';
                grade += '  <td>' + formatarData(2, dado.data_abertura) + '</td>';
                grade += '</tr>';
            });

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum registro encontrado.';
        }

        // Retornar Grade
        document.getElementById('cli_ordens_servicos_grade').innerHTML = grade;
    }).catch(error => {
        alert('Erro clienteModalInfoOrdensServicos: '+error);
    }).finally(() => {});
}

// Modal Clientes
// Visitas Técnicas
function clienteModalInfoVisitasTecnicas(cliente_id = '') {
    if (cliente_id == '') { cliente_id = document.getElementById('mi_cli_cliente_id').value; }

    var url_atual = window.location.protocol + '//' + window.location.host + '/';

    // Acessar rota
    fetch(url_atual+'clientes/modalInfo/visitas_tecnicas/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let visitas_tecnicas = data;

        //Grade
        let grade = '';

        //Montar Grade
        if (visitas_tecnicas.length > 0) {
            grade += '<table class="table align-middle table-nowrap table-check table-sm">';
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Visita Técnica</th>';
            grade += '          <th scope="col">Data</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            //Varrer
            visitas_tecnicas.forEach(dado => {
                // Cores
                let cor = '';
                if (dado.visita_tecnica_tipo_id == 1) {cor = 'text-success'; }
                if (dado.visita_tecnica_tipo_id == 2) { cor = 'text-primary'; }

                let numVisitaTecnica = ``;

                if (dado.vt_cs == 1) {
                    numVisitaTecnica += `<a href="#" title="Visita Técnica Completa em PDF" onclick="gerar_visita_tecnica(${dado.id}, ${dado.visita_tecnica_tipo_id}, 'pt', 1);"><i class="fa fa-file-pdf fa-2x text-danger"></i></a>`;
                    numVisitaTecnica += `&nbsp;&nbsp;`;
                    numVisitaTecnica += `<a href="#" title="Visita Técnica Completa em PDF (Inglês)" onclick="gerar_visita_tecnica(${dado.id}, ${dado.visita_tecnica_tipo_id}, 'en', 1);"><i class="fa fa-file-pdf fa-2x text-primary"></i></a>`;
                }

                if (dado.vt_cs == 2) {
                    numVisitaTecnica += `<a href="#" title="Visita Técnica Sintética em PDF" onclick="gerar_visita_tecnica(${dado.id}, ${dado.visita_tecnica_tipo_id}, 'pt', 2);"><i class="fa fa-file-pdf fa-2x text-danger"></i></a>`;
                    numVisitaTecnica += `&nbsp;&nbsp;`;
                    numVisitaTecnica += `<a href="#" title="Visita Técnica Sintética em PDF (Inglês)" onclick="gerar_visita_tecnica(${dado.id}, ${dado.visita_tecnica_tipo_id}, 'en', 2);"><i class="fa fa-file-pdf fa-2x text-primary"></i></a>`;
                }

                numVisitaTecnica += `&nbsp;&nbsp;&nbsp;`;
                numVisitaTecnica += `Visita Técnica nº.&nbsp;${dado.numero_visita_tecnica}/${dado.ano_visita_tecnica}`;
                numVisitaTecnica += `&nbsp;&nbsp;&nbsp;`;
                numVisitaTecnica += `<span class="${cor}">${dado.visitaTecnicaTipoName}</span>`;

                if (dado.vt_cs == 1) {
                    numVisitaTecnica += `&nbsp;&nbsp;&nbsp;<span class="badge bg-info" style="font-size: 100% !important">Completa</span>`;
                }

                if (dado.vt_cs == 2) {
                    numVisitaTecnica += `&nbsp;&nbsp;&nbsp;<span class="badge bg-warning" style="font-size: 100% !important">Sintética</span>`;
                }

                grade += '<tr>';
                grade += '  <td>'+numVisitaTecnica+'</td>';
                grade += '  <td>' + formatarData(2, dado.data_abertura) + '</td>';
                grade += '</tr>';
            });

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum registro encontrado.';
        }

        // Retornar Grade
        document.getElementById('cli_visitas_tecnicas_grade').innerHTML = grade;
    }).catch(error => {
        alert('Erro clienteModalInfoVisitasTecnicas: '+error);
    }).finally(() => {});
}

// Modal Clientes
// Brigadas Incêndios
function clienteModalInfoBrigadasIncendios(cliente_id = '') {
    if (cliente_id == '') { cliente_id = document.getElementById('mi_cli_cliente_id').value; }

    var url_atual = window.location.protocol + '//' + window.location.host + '/';

    // Acessar rota
    fetch(url_atual+'clientes/modalInfo/brigadas_incendios/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let brigadas_incendios = data;

        //Grade
        let grade = '';

        //Montar Grade
        if (brigadas_incendios.length > 0) {
            grade += '<table class="table align-middle table-nowrap table-check table-sm">';
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Brigada Incêndio</th>';
            grade += '          <th scope="col">Data</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            //Varrer
            brigadas_incendios.forEach(dado => {
                let numBrigadaIncendio = `Brigada Incêndio nº.&nbsp;${dado.numero_brigada_incendio}/${dado.ano_brigada_incendio}`;

                grade += '<tr>';
                grade += '  <td>'+numBrigadaIncendio+'</td>';
                grade += '  <td>' + formatarData(2, dado.data_abertura) + '</td>';
                grade += '</tr>';
            });

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum registro encontrado.';
        }

        // Retornar Grade
        document.getElementById('cli_brigadas_incendios_grade').innerHTML = grade;
    }).catch(error => {
        alert('Erro clienteModalInfoBrigadasIncendios: '+error);
    }).finally(() => {});
}

// Modal Clientes
// Clientes Rede
function clienteModalInfoClientesRede(cliente_id = '') {
    if (cliente_id == '') { cliente_id = document.getElementById('mi_cli_cliente_id').value; }

    var url_atual = window.location.protocol + '//' + window.location.host + '/';

    // Acessar rota
    fetch(url_atual+'clientes/modalInfo/clientes_rede/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let clientes_rede = data;

        //Grade
        let grade = '';

        //Montar Grade
        if (clientes_rede.length > 0) {
            grade += '<table class="table align-middle table-nowrap table-check table-sm">';
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Cliente</th>';
            grade += '          <th scope="col">CNPJ</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            //Varrer
            clientes_rede.forEach(dado => {
                grade += '<tr>';
                grade += '  <td>'+dado.name+'</td>';
                grade += '  <td>'+aplicarMascaraJs(dado.cnpj, '##.###.###/####-##')+'</td>';
                grade += '</tr>';
            });

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum registro encontrado.';
        }

        // Retornar Grade
        document.getElementById('cli_clientes_rede_grade').innerHTML = grade;
    }).catch(error => {
        alert('Erro clienteModalInfoClientesRede: '+error);
    }).finally(() => {});
}

// Modal Clientes
// Clientes Principal
function clienteModalInfoClientesPrincipal(cliente_id = '') {
    if (cliente_id == '') { cliente_id = document.getElementById('mi_cli_cliente_id').value; }

    var url_atual = window.location.protocol + '//' + window.location.host + '/';

    // Acessar rota
    fetch(url_atual+'clientes/modalInfo/clientes_principal/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let clientes_principal = data;

        //Grade
        let grade = '';

        //Montar Grade
        if (clientes_principal.length > 0) {
            grade += '<table class="table align-middle table-nowrap table-check table-sm">';
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Cliente</th>';
            grade += '          <th scope="col">CNPJ</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            //Varrer
            clientes_principal.forEach(dado => {
                grade += '<tr>';
                grade += '  <td>'+dado.name+'</td>';
                grade += '  <td>'+aplicarMascaraJs(dado.cnpj, '##.###.###/####-##')+'</td>';
                grade += '</tr>';
            });

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum registro encontrado.';
        }

        // Retornar Grade
        document.getElementById('cli_clientes_principal_grade').innerHTML = grade;
    }).catch(error => {
        alert('Erro clienteModalInfoClientesPrincipal: '+error);
    }).finally(() => {});
}

// Modal Clientes
// Documentos Exigidos
function clienteModalInfoDocumentosExigidos(cliente_id = '') {
    if (cliente_id == '') { cliente_id = document.getElementById('mi_cli_cliente_id').value; }

    var url_atual = window.location.protocol + '//' + window.location.host + '/';

    // Acessar rota
    fetch(url_atual+'clientes/modalInfo/documentos_exigidos_dados/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        // Lendo json
        let documentos_exigidos_dados = data;

        // Estatisticas
        clienteModalInfoEstatisticas(cliente_id);

        // Marcar checkboxs
        documentos_exigidos_dados.forEach(function (item) {
            document.getElementById(`documento_exigido_id_${item.documento_id}`).checked = true;
        });
    }).catch(error => {
        alert('Erro clienteModalInfoDocumentosExigidos: '+error);
    }).finally(() => {});
}

//Acertar formulário para entrada de dados de pessoa Jurídica e Física
async function acertarFormulario() {
    if ($('#tipo').val() == 1) {
        $('.pessoa_juridica').show();
        $('.pessoa_fisica').hide();

        var texto = await traduzirViaLocale('Data Abertura');

        $('#label_data_nascimento').html(texto);
    }

    if ($('#tipo').val() == 2) {
        $('.pessoa_juridica').hide();
        $('.pessoa_fisica').show();

        var texto = await traduzirViaLocale('Data Nascimento');

        $('#label_data_nascimento').html(texto);
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    //Acertar formulário
    acertarFormulario();

    // Botão: frm_upload_documentos_cli_executar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    const frm_upload_documentos_cli_executar = document.getElementById('frm_upload_documentos_cli_executar');

    if (frm_upload_documentos_cli_executar) {
        frm_upload_documentos_cli_executar.addEventListener('click', function () {
            // FormData
            var formulario = document.getElementById('frm_upload_documentos_cli');
            var formData = new FormData(formulario);
            var url_atual = window.location.protocol + '//' + window.location.host + '/';
            var upload_documentos_cliente_id = document.getElementById('upload_documentos_cliente_id').value;

            // Tratar Botões
            frm_upload_documentos_cli_executar.style.display = 'block';

            // Criticando campos
            if (validar_frm_upload_documentos() === false) { return false; }

            // Acessar rota
            fetch(url_atual + 'clientes/uploadDocumento/upload_documento', {
                method: 'POST',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: formData
            }).then(response => {
                return response.json();
            }).then(data => {
                // Lendo dados
                if (data.success) {
                    // Montando Grade de Documentos PDF
                    clienteModalInfoDocumentos(upload_documentos_cliente_id);

                    formulario.reset();

                    alertSwal('success', 'Clientes', data.success, 'true', 20000);

                    // Estatisticas
                    clienteModalInfoEstatisticas(upload_documentos_cliente_id);
                } else if (data.error) {
                    alertSwal('warning', 'Clientes', data.error, 'true', 20000);
                } else {
                    alert('Erro interno');
                }
            }).catch(error => {
                alert('Erro Clientes Upload Documento PDF: ' + error);
            });
        });
    }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_logotipo_principal_cli_executar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    const frm_upload_logotipo_principal_cli_executar = document.getElementById('frm_upload_logotipo_principal_cli_executar');

    if (frm_upload_logotipo_principal_cli_executar) {
        frm_upload_logotipo_principal_cli_executar.addEventListener('click', function () {
            //FormData
            var formulario = document.getElementById('frm_upload_logotipo_principal_cli');
            var formData = new FormData(formulario);
            var url_atual = window.location.protocol + '//' + window.location.host + '/';

            //Tratar Botões
            frm_upload_logotipo_principal_cli_executar.style.display = 'block';

            //Criticando campos
            if (validar_frm_upload_logotipo_principal() === false) { return false; }

            //Acessar rota
            fetch(url_atual + 'clientes/uploadLogotipo/upload_logotipo_principal', {
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
                    //Atualizando Logotipos principal
                    const fileInput = document.getElementById('cli_logotipo_principal_file');
                    if (fileInput) {
                        const file = fileInput.files[0];
                        if (file) {
                            var reader = new FileReader();
                            reader.onload = function () {
                                document.getElementById('mi_cli_logotipo').src = reader.result;
                                document.getElementById('mi_cli_logotipo_principal').src = reader.result;
                            };
                            reader.readAsDataURL(file);
                        }
                    }

                    //Reset Form
                    formulario.reset();
                } else if (data.error) {
                    alertSwal('warning', 'Clientes', data.error, 'true', 20000);
                } else {
                    alert('Erro interno');
                }
            }).catch(error => {
                alert('Erro Clientes Upload Logotipo Principal: ' + error);
            });
        });
    }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_logotipo_relatorios_cli_executar''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    const frm_upload_logotipo_relatorios_cli_executar = document.getElementById('frm_upload_logotipo_relatorios_cli_executar');

    if (frm_upload_logotipo_relatorios_cli_executar) {
        frm_upload_logotipo_relatorios_cli_executar.addEventListener('click', function () {
            //FormData
            var formulario = document.getElementById('frm_upload_logotipo_relatorios_cli');
            var formData = new FormData(formulario);
            var url_atual = window.location.protocol + '//' + window.location.host + '/';

            //Tratar Botões
            frm_upload_logotipo_relatorios_cli_executar.style.display = 'block';

            //Criticando campos
            if (validar_frm_upload_logotipo_relatorios() === false) { return false; }

            //Acessar rota
            fetch(url_atual + 'clientes/uploadLogotipo/upload_logotipo_relatorios', {
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
                    //Atualizando Logotipos relatorios
                    const fileInput = document.getElementById('cli_logotipo_relatorios_file');
                    if (fileInput) {
                        const file = fileInput.files[0];
                        if (file) {
                            var reader = new FileReader();
                            reader.onload = function () {
                                document.getElementById('mi_cli_logotipo_relatorios').src = reader.result;
                            };
                            reader.readAsDataURL(file);
                        }
                    }

                    //Reset Form
                    formulario.reset();
                } else if (data.error) {
                    alertSwal('warning', 'Clientes', data.error, 'true', 20000);
                } else {
                    alert('Erro interno');
                }
            }).catch(error => {
                alert('Erro Clientes Upload Logotipo Relatório: ' + error);
            });
        });
    }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_logotipo_cartao_emergencial_cli_executar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    const frm_upload_logotipo_cartao_emergencial_cli_executar = document.getElementById('frm_upload_logotipo_cartao_emergencial_cli_executar');

    if (frm_upload_logotipo_cartao_emergencial_cli_executar) {
        frm_upload_logotipo_cartao_emergencial_cli_executar.addEventListener('click', function () {
            //FormData
            var formulario = document.getElementById('frm_upload_logotipo_cartao_emergencial_cli');
            var formData = new FormData(formulario);
            var url_atual = window.location.protocol + '//' + window.location.host + '/';

            //Tratar Botões
            frm_upload_logotipo_cartao_emergencial_cli_executar.style.display = 'block';

            //Criticando campos
            if (validar_frm_upload_logotipo_cartao_emergencial() === false) { return false; }

            //Acessar rota
            fetch(url_atual + 'clientes/uploadLogotipo/upload_logotipo_cartao_emergencial', {
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
                    //Atualizando Logotipos cartao_emergencial
                    const fileInput = document.getElementById('cli_logotipo_cartao_emergencial_file');
                    if (fileInput) {
                        const file = fileInput.files[0];
                        if (file) {
                            var reader = new FileReader();
                            reader.onload = function () {
                                document.getElementById('mi_cli_logotipo').src = reader.result;
                                document.getElementById('mi_cli_logotipo_cartao_emergencial').src = reader.result;
                            };
                            reader.readAsDataURL(file);
                        }
                    }

                    //Reset Form
                    formulario.reset();
                } else if (data.error) {
                    alertSwal('warning', 'Clientes', data.error, 'true', 20000);
                } else {
                    alert('Erro interno');
                }
            }).catch(error => {
                alert('Erro Clientes Upload Logotipo Cartão Emergencial: ' + error);
            });
        });
    }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_logotipo_menu_cli_executar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    const frm_upload_logotipo_menu_cli_executar = document.getElementById('frm_upload_logotipo_menu_cli_executar');

    if (frm_upload_logotipo_menu_cli_executar) {
        frm_upload_logotipo_menu_cli_executar.addEventListener('click', function () {
            //FormData
            var formulario = document.getElementById('frm_upload_logotipo_menu_cli');
            var formData = new FormData(formulario);
            var url_atual = window.location.protocol + '//' + window.location.host + '/';

            //Tratar Botões
            frm_upload_logotipo_menu_cli_executar.style.display = 'block';

            //Criticando campos
            if (validar_frm_upload_logotipo_menu() === false) { return false; }

            //Acessar rota
            fetch(url_atual + 'clientes/uploadLogotipo/upload_logotipo_menu', {
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
                    //Atualizando Logotipos menu
                    const fileInput = document.getElementById('cli_logotipo_menu_file');
                    if (fileInput) {
                        const file = fileInput.files[0];
                        if (file) {
                            var reader = new FileReader();
                            reader.onload = function () {
                                document.getElementById('mi_cli_logotipo_menu').src = reader.result;
                            };
                            reader.readAsDataURL(file);
                        }
                    }

                    //Reset Form
                    formulario.reset();
                } else if (data.error) {
                    alertSwal('warning', 'Clientes', data.error, 'true', 20000);
                } else {
                    alert('Erro interno');
                }
            }).catch(error => {
                alert('Erro Clientes Upload Logotipo Menu: ' + error);
            });
        });
    }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Botão: frm_documentos_exigidos_cli_executar''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    const frm_documentos_exigidos_cli_executar = document.getElementById('frm_documentos_exigidos_cli_executar');

    if (frm_documentos_exigidos_cli_executar) {
        frm_documentos_exigidos_cli_executar.addEventListener('click', function () {
            // FormData
            var formulario = document.getElementById('frm_documentos_exigidos_cli');
            var formData = new FormData(formulario);
            var url_atual = window.location.protocol + '//' + window.location.host + '/';
            var documentos_exigidos_cliente_id = document.getElementById('documentos_exigidos_cliente_id').value;

            // Tratar Botões
            frm_documentos_exigidos_cli_executar.style.display = 'block';

            // Acessar rota
            fetch(url_atual + 'clientes/modalInfo/documentos_exigidos_save', {
                method: 'POST',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: formData
            }).then(response => {
                return response.json();
            }).then(data => {
                // Lendo dados
                if (data.success) {
                    formulario.reset();

                    // Montando Grade de Documentos PDF
                    clienteModalInfoDocumentosExigidos(documentos_exigidos_cliente_id);

                    alertSwal('success', 'Clientes', data.success, 'true', 20000);
                } else if (data.error) {
                    alertSwal('warning', 'Clientes', data.error, 'true', 20000);
                } else {
                    alert('Erro interno');
                }
            }).catch(error => {
                alert('Erro Clientes Documentos Exigidos: ' + error);
            });
        });
    }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Link: link_copiar_endereco''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('link_copiar_endereco').addEventListener('click', function(event) {
        event.preventDefault();

        //Endereço
        document.getElementById('cep_cobranca').value = document.getElementById('cep').value;
        document.getElementById('numero_cobranca').value = document.getElementById('numero').value;
        document.getElementById('complemento_cobranca').value = document.getElementById('complemento').value;
        document.getElementById('logradouro_cobranca').value = document.getElementById('logradouro').value;
        document.getElementById('bairro_cobranca').value = document.getElementById('bairro').value;
        document.getElementById('localidade_cobranca').value = document.getElementById('localidade').value;
        document.getElementById('uf_cobranca').value = document.getElementById('uf').value;
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    $('#tipo').change(function(e) {
        //Acertar formulário
        acertarFormulario();
    });

    $(function () {
        //Header
        $.ajaxSetup({
            headers:{
                'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
            }
        });

        //API CNPJ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        $('#link_api_buscar').click(function () {
            //Buscando valor
            var cnpj = $('#cnpj').val();

            //Validando
            if ($('#cnpj').hasClass('is-invalid')) {
                alert($('#cnpj-error').html());
                return;
            } else if (cnpj == '') {
                alert('Informe um CNPJ.');
                return;
            }

            //Limpando mascara
            cnpj = cnpj.replace(/[^\d]+/g,"");

            // Indo buscar dados
            getReceitaWSCNPJ(cnpj).then(dados_cnpj => {
                if (dados_cnpj.status == 'OK') {
                    $('#td_api_situacao').html(dados_cnpj.situacao);
                    $('#hidden_api_situacao').val(dados_cnpj.situacao);
                    $('#td_api_tipo').html(dados_cnpj.tipo);
                    $('#hidden_api_tipo').val(dados_cnpj.tipo);
                    $('#td_api_natureza_juridica').html(dados_cnpj.natureza_juridica);
                    $('#hidden_api_natureza_juridica').val(dados_cnpj.natureza_juridica);
                    $('#td_api_nome').html(dados_cnpj.nome);
                    $('#hidden_api_nome').val(dados_cnpj.nome);
                    $('#td_api_fantasia').html(dados_cnpj.fantasia);
                    $('#hidden_api_fantasia').val(dados_cnpj.fantasia);
                    $('#td_api_cnpj').html(dados_cnpj.cnpj);
                    $('#hidden_api_cnpj').val(dados_cnpj.cnpj);
                    $('#td_api_abertura').html(dados_cnpj.abertura);
                    $('#hidden_api_abertura').val(dados_cnpj.abertura);
                    $('#td_api_cep').html(dados_cnpj.cep.replace(/[^\d]+/g,""));
                    $('#hidden_api_cep').val(dados_cnpj.cep.replace(/[^\d]+/g,""));
                    $('#td_api_telefone').html(dados_cnpj.telefone);
                    $('#hidden_api_telefone').val(dados_cnpj.telefone);
                    $('#td_api_email').html(dados_cnpj.email);
                    $('#hidden_api_email').val(dados_cnpj.email);
                    $('#td_api_logradouro').html(dados_cnpj.logradouro);
                    $('#hidden_api_logradouro').val(dados_cnpj.logradouro);
                    $('#td_api_numero').html(dados_cnpj.numero);
                    $('#hidden_api_numero').val(dados_cnpj.numero);
                    $('#td_api_complemento').html(dados_cnpj.complemento);
                    $('#hidden_api_complemento').val(dados_cnpj.complemento);
                    $('#td_api_bairro').html(dados_cnpj.bairro);
                    $('#hidden_api_bairro').val(dados_cnpj.bairro);
                    $('#td_api_municipio').html(dados_cnpj.municipio);
                    $('#hidden_api_municipio').val(dados_cnpj.municipio);
                    $('#td_api_uf').html(dados_cnpj.uf);
                    $('#hidden_api_uf').val(dados_cnpj.uf);

                    //abrir modal
                    $('#modal_api').modal('show');
                }
            });
        });

        $('.button_api_copiar').click(function () {
            $('#name').val($('#hidden_api_nome').val());
            $('#nome_fantasia').val($('#hidden_api_fantasia').val());
            $('#data_nascimento').val($('#hidden_api_abertura').val());
            $('#cep').val($('#hidden_api_cep').val());
            $('#telefone_1').val($('#hidden_api_telefone').val());
            $('#email').val($('#hidden_api_email').val());
            $('#logradouro').val($('#hidden_api_logradouro').val());
            $('#numero').val($('#hidden_api_numero').val());
            $('#complemento').val($('#hidden_api_complemento').val());
            $('#bairro').val($('#hidden_api_bairro').val());
            $('#localidade').val($('#hidden_api_municipio').val());
            $('#uf').val($('#hidden_api_uf').val());

            //fechar modal
            $('#modal_api').modal('hide');
        });
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    });
});
