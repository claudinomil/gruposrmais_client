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

    //Campo: upload_documentos_cli_acao (requerido)
    if (validacao({op:1, value:document.getElementById('upload_documentos_cli_acao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Ação do Formulário requerido.'+'<br>';
    }

    //Campo: cli_documentos_documento_id (requerido)
    if (validacao({op:1, value:document.getElementById('cli_documentos_documento_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Documento requerido.'+'<br>';
    }

    //Campo: cli_documentos_data_documento (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('cli_documentos_data_documento').value}) === true) {
        //Campo: cli_documentos_data_documento (Data Válida)
        if (validacao({op:8, value:document.getElementById('cli_documentos_data_documento').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data documento Inválida.'+'<br>';
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

function clienteModalInfoControle(op, id = '') {
    var div_logotipos = document.getElementById('md_cli_div_logotipos');
    var div_dados = document.getElementById('md_cli_div_dados');
    var div_documentos = document.getElementById('md_cli_div_documentos');
    var div_servicos = document.getElementById('md_cli_div_servicos');
    var div_clientes = document.getElementById('md_cli_div_clientes');
    var div_incluir_documentos = document.getElementById('md_cli_div_incluir_documentos');

    //Logotipos
    if (op == 1) {
        div_logotipos.classList.remove('d-none');
        div_logotipos.classList.add('d-lg-flex');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_servicos.classList.remove('d-lg-flex');
        div_servicos.classList.add('d-none');

        div_clientes.classList.remove('d-lg-flex');
        div_clientes.classList.add('d-none');

        div_incluir_documentos.classList.remove('d-lg-flex');
        div_incluir_documentos.classList.add('d-none');

        clienteModalInfoEstatisticas(id);
    }

    //Dados
    if (op == 2) {
        div_logotipos.classList.remove('d-lg-flex');
        div_logotipos.classList.add('d-none');

        div_dados.classList.remove('d-none');
        div_dados.classList.add('d-lg-flex');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_servicos.classList.remove('d-lg-flex');
        div_servicos.classList.add('d-none');

        div_clientes.classList.remove('d-lg-flex');
        div_clientes.classList.add('d-none');

        div_incluir_documentos.classList.remove('d-lg-flex');
        div_incluir_documentos.classList.add('d-none');

        clienteModalInfoDados(id);
        clienteModalInfoEstatisticas(id);
    }

    //Documentos
    if (op == 3) {
        div_logotipos.classList.remove('d-lg-flex');
        div_logotipos.classList.add('d-none');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-none');
        div_documentos.classList.add('d-lg-flex');

        div_servicos.classList.remove('d-lg-flex');
        div_servicos.classList.add('d-none');

        div_clientes.classList.remove('d-lg-flex');
        div_clientes.classList.add('d-none');

        div_incluir_documentos.classList.remove('d-lg-flex');
        div_incluir_documentos.classList.add('d-none');

        clienteModalInfoDocumentos(id);
        clienteModalInfoEstatisticas(id);
    }

    //Serviços
    if (op == 4) {
        div_logotipos.classList.remove('d-lg-flex');
        div_logotipos.classList.add('d-none');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_servicos.classList.remove('d-none');
        div_servicos.classList.add('d-lg-flex');

        div_clientes.classList.remove('d-lg-flex');
        div_clientes.classList.add('d-none');

        div_incluir_documentos.classList.remove('d-lg-flex');
        div_incluir_documentos.classList.add('d-none');

        clienteModalInfoServicos(id);
        clienteModalInfoEstatisticas(id);
    }

    //Clientes
    if (op == 5) {
        div_logotipos.classList.remove('d-lg-flex');
        div_logotipos.classList.add('d-none');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_servicos.classList.remove('d-lg-flex');
        div_servicos.classList.add('d-none');

        div_clientes.classList.remove('d-none');
        div_clientes.classList.add('d-lg-flex');

        div_incluir_documentos.classList.remove('d-lg-flex');
        div_incluir_documentos.classList.add('d-none');

        clienteModalInfoClientes(id);
        clienteModalInfoEstatisticas(id);
    }

    //Incluir Documentos
    if (op == 6) {
        div_logotipos.classList.remove('d-lg-flex');
        div_logotipos.classList.add('d-none');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_servicos.classList.remove('d-lg-flex');
        div_servicos.classList.add('d-none');

        div_clientes.classList.remove('d-lg-flex');
        div_clientes.classList.add('d-none');

        div_incluir_documentos.classList.remove('d-none');
        div_incluir_documentos.classList.add('d-lg-flex');

        clienteModalInfoEstatisticas(id);
    }
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
        document.getElementById('md_cli_estatisticas_propostas').innerHTML = estatisticas.propostas;
        document.getElementById('md_cli_estatisticas_clientes_rede').innerHTML = estatisticas.clientes_rede;
        document.getElementById('md_cli_estatisticas_clientes_principal').innerHTML = estatisticas.clientes_principal;
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
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Passando dados cliente''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Header
        document.getElementById('mi_cli_header_nome').innerHTML = cliente.name;

        //Logotipo Principal
        var logotipo_principal = url_atual+'build/assets/images/clientes/logotipo_principal-0.png';
        if (cliente.logotipo_principal) {logotipo_principal = cliente.logotipo_principal;}
        document.getElementById('mi_cli_logotipo').src = logotipo_principal;
        document.getElementById('mi_cli_logotipo_principal').src = logotipo_principal;

        //Logotipo Relatórios
        var logotipo_relatorios = url_atual+'build/assets/images/clientes/cliente-0.png';
        if (cliente.logotipo_relatorios) {logotipo_relatorios = cliente.logotipo_relatorios;}
        document.getElementById('mi_cli_logotipo_relatorios').src = logotipo_relatorios;

        //Logotipo Cartão Emergencial
        var logotipo_cartao_emergencial = url_atual+'build/assets/images/clientes/cliente-0.png';
        if (cliente.logotipo_cartao_emergencial) {logotipo_cartao_emergencial = cliente.logotipo_cartao_emergencial;}
        document.getElementById('mi_cli_logotipo_cartao_emergencial').src = logotipo_cartao_emergencial;

        //Logotipo Menu
        var logotipo_menu = url_atual+'build/assets/images/clientes/logotipo_menu-0.png';
        if (cliente.logotipo_menu) { logotipo_menu = cliente.logotipo_menu; }
        document.getElementById('mi_cli_logotipo_menu').src = logotipo_menu;

        //Cliente id
        document.getElementById('mi_cli_cliente_id').value = cliente.id;

        //Dados
        document.getElementById('mi_cli_status').value = status;
        document.getElementById('mi_cli_tipo').value = tipo;
        document.getElementById('mi_cli_cpf_cnpj').value = cpf_cnpj;
        document.getElementById('mi_cli_nome').value = cliente.name;
        document.getElementById('mi_cli_telefones').value = formatarTelCel(1, cliente.telefone_1)+'  '+formatarTelCel(1, cliente.telefone_2);
        document.getElementById('mi_cli_celulares').value = formatarTelCel(2, cliente.celular_1)+'  '+formatarTelCel(2, cliente.celular_2);
        document.getElementById('mi_cli_data_nascimento').value = formatarData(2, cliente.data_nascimento);

        //Documentos
        document.getElementById('upload_documentos_cliente_id').value = cliente.id;

        //Logotipo Principal
        document.getElementById('upload_logotipo_principal_cliente_id').value = cliente.id;

        //Logotipo Relatórios
        document.getElementById('upload_logotipo_relatorios_cliente_id').value = cliente.id;

        //Logotipo Cartão Emergencial
        document.getElementById('upload_logotipo_cartao_emergencial_cliente_id').value = cliente.id;

        //Logotipo Menu
        document.getElementById('upload_logotipo_menu_cliente_id').value = cliente.id;
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }).catch(error => {
        alert('Erro clienteModalInfo: '+error);
    });
}

// Modal Clientes
// Documentos
function clienteModalInfoDocumentos(cliente_id='') {
    if (cliente_id == '') {cliente_id = document.getElementById('upload_documentos_cliente_id').value;}

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

        //Grade
        let grade = '';

        //Montar Grade
        if (clientes_documentos.length > 0) {
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
            clientes_documentos.forEach(dado => {
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
                acoes += '  <div class="col-6">';
                acoes += '      <button type="button" class="btn btn-outline-info text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Documento" onclick="window.open(\'' + dado.caminho + '\', \'_blank\');"><i class="fa fa-file-pdf font-size-18"></i></button>';
                acoes += '  </div>';
                acoes += '  <div class="col-6">';
                acoes += '      <button type="button" class="btn btn-outline-danger text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Documento" onclick="clienteModalInfoDocumentosDeletar(' + dado.id + ');"><i class="fa fa-trash-alt font-size-18"></i></button>';
                acoes += '  </div>';
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
        document.getElementById('cli_documentos_grade').innerHTML = grade;

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
                let qtd_registros = clientes_documentos.filter(reg => reg.documento_fonte_id === documento_fonte_id);

                if (qtd_registros.length > 0) {
                    if (idPrimeiroFiltro == 0) {idPrimeiroFiltro = documento_fonte_id;}

                    documentoFonteFiltro += `   <div class="col-4 col-lg-3">`;
                    documentoFonteFiltro += `       <button type="button" class="btn btn-warning text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Filtar Documentos" onclick="clienteModalInfoDocumentosFiltrar(${documento_fonte_id});">${documento_fonte_name} (${qtd_registros.length})</button>`;
                    documentoFonteFiltro += `   </div>`;
                }
            });

            documentoFonteFiltro += '</div>';
        }

        //Retornar Documento Filtro (Botões)
        document.getElementById('cli_documentos_grade_botoes').innerHTML = documentoFonteFiltro;

        //Primeiro Filtro
        clienteModalInfoDocumentosFiltrar(idPrimeiroFiltro);
    }).catch(error => {
        alert('Erro clienteModalInfoGradeDocumentosPdf: '+error);
    }).finally(() => {
        configurarDataTable(3);
    });
}

function clienteModalInfoDocumentosFiltrar(documento_fonte_id) {
    const todasLinhas = document.querySelectorAll("#cli_documentos_grade table tbody tr");

    todasLinhas.forEach(linha => {
        if (linha.classList.contains(`documento_fonte_${documento_fonte_id}`)) {
            linha.style.display = '';
        } else {
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
                let cliente_id = document.getElementById('upload_documentos_cliente_id').value;

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
            alert('Erro clienteModalInfoDeletarDocumentoPdf:'+error);
        });
    }
}

// Modal Clientes
// Servicos
function clienteModalInfoServicos(cliente_id='') {
    if (cliente_id == '') {cliente_id = document.getElementById('mi_cli_cliente_id').value;}

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'clientes/modalInfo/servicos/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let ordens_servicos = data.ordens_servicos;
        let visitas_tecnicas = data.visitas_tecnicas;
        let propostas = data.propostas;

        //Array
        let clientes_servicos = [];

        //Grade
        let grade = '';

        //Montar Grade
        if (ordens_servicos.length > 0 || visitas_tecnicas.length > 0 || propostas.length > 0) {
            //Varrer Propostas
            propostas.forEach(dado => {
                clientes_servicos.push({'servico_fonte_id': 1, 'nome': 'PROPOSTA', 'data': formatarData(2, dado.data_proposta)});
            });

            //Varrer Ordens Serviços
            ordens_servicos.forEach(dado => {
                clientes_servicos.push({'servico_fonte_id': 2, 'nome': 'ORDEM DE SERVIÇO', 'data': formatarData(2, dado.data_abertura)});
            });

            //Varrer Visitas Técnicas
            visitas_tecnicas.forEach(dado => {
                clientes_servicos.push({'servico_fonte_id': 3, 'nome': 'VISITA TÉCNICA', 'data': formatarData(2, dado.data_abertura)});
            });

            grade += '<table class="table align-middle table-nowrap table-check table-sm class-datatable-3" id="tabela_clientes_servicos">';
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Serviço</th>';
            grade += '          <th scope="col">Data</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            //Varrer clientes_servicos
            clientes_servicos.forEach(dado => {
                grade += '<tr class="servico_fonte_'+dado.servico_fonte_id+'">';
                grade += '  <td>'+dado.nome+'</td>';
                grade += '  <td>'+dado.data+'</td>';
                grade += '</tr>';
            });

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum serviço encontrado.';
        }

        //Retornar Grade
        document.getElementById('cli_servicos_grade').innerHTML = grade;

        //Colocar Botões para filtro dos servicos quanto ao tipo
        var servicoFonteFiltro = '';
        var idPrimeiroFiltro = 1;
        if (grade != 'Nenhum serviço encontrado.') {
            servicoFonteFiltro += '<div class="row my-2 d-flex">';

            //PROPOSTA
            var qtd_registros = clientes_servicos.filter(reg => reg.servico_fonte_id === 1);

            servicoFonteFiltro += `   <div class="col-4">`;
            servicoFonteFiltro += `       <button type="button" class="btn btn-warning text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Filtar Serviços" onclick="clienteModalInfoServicosFiltrar('PROPOSTA');">Propostas (${qtd_registros.length})</button>`;
            servicoFonteFiltro += `   </div>`;

            //ORDEM DE SERVIÇO
            var qtd_registros = clientes_servicos.filter(reg => reg.servico_fonte_id === 2);

            servicoFonteFiltro += `   <div class="col-4">`;
            servicoFonteFiltro += `       <button type="button" class="btn btn-warning text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Filtar Serviços" onclick="clienteModalInfoServicosFiltrar('ORDEM DE SERVIÇO');">Órdens de Serviços (${qtd_registros.length})</button>`;
            servicoFonteFiltro += `   </div>`;

            //VISITA TÉCNICA
            var qtd_registros = clientes_servicos.filter(reg => reg.servico_fonte_id === 3);

            servicoFonteFiltro += `   <div class="col-4">`;
            servicoFonteFiltro += `       <button type="button" class="btn btn-warning text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Filtar Serviços" onclick="clienteModalInfoServicosFiltrar('VISITA TÉCNICA');">Visitas Técnicas (${qtd_registros.length})</button>`;
            servicoFonteFiltro += `   </div>`;

            servicoFonteFiltro += '</div>';
        }

        //Retornar Servico Filtro (Botões)
        document.getElementById('cli_servicos_grade_botoes').innerHTML = servicoFonteFiltro;

        //Primeiro Filtro
        clienteModalInfoServicosFiltrar('PROPOSTA');
    }).catch(error => {
        alert('Erro clienteModalInfoGradeServicosPdf: '+error);
    }).finally(() => {
        configurarDataTable(3);
    });
}

function clienteModalInfoServicosFiltrar(fonte) {
    let tabela = $('#tabela_clientes_servicos').DataTable();
    tabela.search(fonte).draw();
}

// Modal Clientes
// Clientes
function clienteModalInfoClientes(cliente_id='') {
    if (cliente_id == '') {cliente_id = document.getElementById('mi_cli_cliente_id').value;}

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'clientes/modalInfo/clientes/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let clientes_rede = data.clientes_rede;
        let clientes_principal = data.clientes_principal;

        //Grade Clientes Rede'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        let grade_clientes_rede = '';

        //Montar Grade
        if (clientes_rede.length > 0) {
            grade_clientes_rede += '<table class="table align-middle table-nowrap table-check table-sm class-datatable-3" id="tabela_clientes_rede">';
            grade_clientes_rede += '  <thead class="table-light">';
            grade_clientes_rede += '      <tr>';
            grade_clientes_rede += '          <th scope="col">Cliente</th>';
            grade_clientes_rede += '          <th scope="col">CNPJ</th>';
            grade_clientes_rede += '      </tr>';
            grade_clientes_rede += '  </thead>';
            grade_clientes_rede += '  <tbody>';

            clientes_rede.forEach(dado => {
                grade_clientes_rede += '<tr>';
                grade_clientes_rede += '  <td>'+dado.name+'</td>';
                grade_clientes_rede += '  <td>'+dado.cnpj+'</td>';
                grade_clientes_rede += '</tr>';
            });

            grade_clientes_rede += '  </tbody>';
            grade_clientes_rede += '</table>';
        } else {
            grade_clientes_rede = 'Nenhum cliente encontrado.';
        }

        //Retornar Grade
        document.getElementById('cli_clientes_grade_rede').innerHTML = grade_clientes_rede;

        if (grade_clientes_rede == 'Nenhum cliente encontrado.') {
            document.getElementById('cli_clientes_rede').classList.add('d-none');
        } else {
            document.getElementById('cli_clientes_rede').classList.remove('d-none');
        }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Grade Clientes Principal''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        let grade_clientes_principal = '';

        //Montar Grade
        if (clientes_principal.length > 0) {
            grade_clientes_principal += '<table class="table align-middle table-nowrap table-check table-sm class-datatable-3" id="tabela_clientes_principal">';
            grade_clientes_principal += '  <thead class="table-light">';
            grade_clientes_principal += '      <tr>';
            grade_clientes_principal += '          <th scope="col">Cliente</th>';
            grade_clientes_principal += '          <th scope="col">CNPJ</th>';
            grade_clientes_principal += '      </tr>';
            grade_clientes_principal += '  </thead>';
            grade_clientes_principal += '  <tbody>';

            clientes_principal.forEach(dado => {
                grade_clientes_principal += '<tr>';
                grade_clientes_principal += '  <td>'+dado.name+'</td>';
                grade_clientes_principal += '  <td>'+dado.cnpj+'</td>';
                grade_clientes_principal += '</tr>';
            });

            grade_clientes_principal += '  </tbody>';
            grade_clientes_principal += '</table>';
        } else {
            grade_clientes_principal = 'Nenhum cliente encontrado.';
        }

        //Retornar Grade
        document.getElementById('cli_clientes_grade_principal').innerHTML = grade_clientes_principal;

        if (grade_clientes_principal == 'Nenhum cliente encontrado.') {
            document.getElementById('cli_clientes_principal').classList.add('d-none');
        } else {
            document.getElementById('cli_clientes_principal').classList.remove('d-none');
        }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }).catch(error => {
        alert('Erro clienteModalInfoGradeServicosPdf: '+error);
    }).finally(() => {
        configurarDataTable(3);
    });
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

document.addEventListener("DOMContentLoaded", function(event) {
    //Acertar formulário
    acertarFormulario();

    //Botão: frm_upload_documentos_cli_executar''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_documentos_cli_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_documentos_cli');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';
        var upload_documentos_cliente_id = document.getElementById('upload_documentos_cliente_id').value;

        //Tratar Botões
        document.getElementById('frm_upload_documentos_cli_executar').style.display = 'block';

        //Criticando campos
        if (validar_frm_upload_documentos() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'clientes/uploadDocumento/upload_documento', {
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
                clienteModalInfoDocumentos(upload_documentos_cliente_id);

                formulario.reset();

                alertSwal('success', 'Clientes', data.success, 'true', 20000);
            } else if (data.error) {
                alertSwal('warning', 'Clientes', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Clientes Upload Documento PDF: '+error);
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_logotipo_principal_cli_executar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_logotipo_principal_cli_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_logotipo_principal_cli');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';
        var upload_documentos_cliente_id = document.getElementById('upload_logotipo_principal_cliente_id').value;

        //Tratar Botões
        document.getElementById('frm_upload_logotipo_principal_cli_executar').style.display = 'block';

        //Criticando campos
        if (validar_frm_upload_logotipo_principal() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'clientes/uploadLogotipo/upload_logotipo_principal', {
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
                //Atualizando Logotipos principal
                const fileInput = document.getElementById('cli_logotipo_principal_file');
                const file = fileInput.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        document.getElementById('mi_cli_logotipo').src = reader.result;
                        document.getElementById('mi_cli_logotipo_principal').src = reader.result;
                    };
                    reader.readAsDataURL(file);
                }

                //Reset Form
                formulario.reset();
            } else if (data.error) {
                alertSwal('warning', 'Clientes', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Clientes Upload Logotipo Principal: '+error);
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_logotipo_relatorios_cli_executar''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_logotipo_relatorios_cli_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_logotipo_relatorios_cli');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';
        var upload_documentos_cliente_id = document.getElementById('upload_logotipo_relatorios_cliente_id').value;

        //Tratar Botões
        document.getElementById('frm_upload_logotipo_relatorios_cli_executar').style.display = 'block';

        //Criticando campos
        if (validar_frm_upload_logotipo_relatorios() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'clientes/uploadLogotipo/upload_logotipo_relatorios', {
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
                //Atualizando Logotipos relatorios
                const fileInput = document.getElementById('cli_logotipo_relatorios_file');
                const file = fileInput.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        document.getElementById('mi_cli_logotipo_relatorios').src = reader.result;
                    };
                    reader.readAsDataURL(file);
                }

                //Reset Form
                formulario.reset();
            } else if (data.error) {
                alertSwal('warning', 'Clientes', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Clientes Upload Logotipo Relatório: '+error);
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_logotipo_cartao_emergencial_cli_executar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_logotipo_cartao_emergencial_cli_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_logotipo_cartao_emergencial_cli');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';
        var upload_documentos_cliente_id = document.getElementById('upload_logotipo_cartao_emergencial_cliente_id').value;

        //Tratar Botões
        document.getElementById('frm_upload_logotipo_cartao_emergencial_cli_executar').style.display = 'block';

        //Criticando campos
        if (validar_frm_upload_logotipo_cartao_emergencial() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'clientes/uploadLogotipo/upload_logotipo_cartao_emergencial', {
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
                //Atualizando Logotipos cartao_emergencial
                const fileInput = document.getElementById('cli_logotipo_cartao_emergencial_file');
                const file = fileInput.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        document.getElementById('mi_cli_logotipo').src = reader.result;
                        document.getElementById('mi_cli_logotipo_cartao_emergencial').src = reader.result;
                    };
                    reader.readAsDataURL(file);
                }

                //Reset Form
                formulario.reset();
            } else if (data.error) {
                alertSwal('warning', 'Clientes', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Clientes Upload Logotipo Cartão Emergencial: '+error);
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_logotipo_menu_cli_executar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_logotipo_menu_cli_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_logotipo_menu_cli');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';
        var upload_documentos_cliente_id = document.getElementById('upload_logotipo_menu_cliente_id').value;

        //Tratar Botões
        document.getElementById('frm_upload_logotipo_menu_cli_executar').style.display = 'block';

        //Criticando campos
        if (validar_frm_upload_logotipo_menu() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'clientes/uploadLogotipo/upload_logotipo_menu', {
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
                //Atualizando Logotipos menu
                const fileInput = document.getElementById('cli_logotipo_menu_file');
                const file = fileInput.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        document.getElementById('mi_cli_logotipo_menu').src = reader.result;
                    };
                    reader.readAsDataURL(file);
                }

                //Reset Form
                formulario.reset();
            } else if (data.error) {
                alertSwal('warning', 'Clientes', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Clientes Upload Logotipo Menu: '+error);
        });
    });
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

    //Numero Pavimentos
    $('#numero_pavimentos').on('keyup change click', function() {
        pavimentosShowHide();
    });

    //Edificação Classificação
    $('#edificacao_classificacao_id').on('change', function() {
        //Preenchendo dados da Classificação da Edificação
        grupo = $(this).find("option:selected").attr('data-grupo');
        ocupacao_uso = $(this).find("option:selected").attr('data-ocupacao-uso');
        divisao = $(this).find("option:selected").attr('data-divisao');
        descricao = $(this).find("option:selected").attr('data-descricao');

        $('#grupo').val(grupo);
        $('#ocupacao_uso').val(ocupacao_uso);
        $('#divisao').val(divisao);
        $('#descricao').val(descricao);
    });

    //Montar Classificação
    pavimentosShowHide();
});
