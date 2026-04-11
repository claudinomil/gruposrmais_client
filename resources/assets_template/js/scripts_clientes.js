// Formulário Padrão - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Formulário Padrão - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
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

// Acertar formulário para entrada de dados de pessoa Jurídica e Física
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

function DOMContentLoadedFormularioPadrao() {
    document.getElementById('link_copiar_endereco').addEventListener('click', function (event) {
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

    $('#tipo').change(function (e) {
        //Acertar formulário
        acertarFormulario();
    });

    $(function () {
        //Header
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
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
            cnpj = cnpj.replace(/[^\d]+/g, "");

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
                    $('#td_api_cep').html(dados_cnpj.cep.replace(/[^\d]+/g, ""));
                    $('#hidden_api_cep').val(dados_cnpj.cep.replace(/[^\d]+/g, ""));
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
}
// Formulário Padrão - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Formulário Padrão - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Funções - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Funções - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function clienteModalInfoControle(op, id = '') {
    if (id == '') { id = document.getElementById('mi_cli_cliente_id').value; }

    // Elementos
    var div_logotipos = document.getElementById('md_cli_div_logotipos');
    var div_dados = document.getElementById('md_cli_div_dados');
    var div_documentos = document.getElementById('md_cli_div_documentos');
    var div_editar_documentos = document.getElementById('md_cli_div_editar_documentos');
    var div_propostas = document.getElementById('md_cli_div_propostas');
    var div_ordens_servicos = document.getElementById('md_cli_div_ordens_servicos');
    var div_visitas_tecnicas = document.getElementById('md_cli_div_visitas_tecnicas');
    var div_brigadas_incendios = document.getElementById('md_cli_div_brigadas_incendios');
    var div_clientes_rede = document.getElementById('md_cli_div_clientes_rede');
    var div_clientes_principal = document.getElementById('md_cli_div_clientes_principal');
    var div_editar_documentos_exigidos = document.getElementById('md_cli_div_editar_documentos_exigidos');
    var div_documentos_exigidos = document.getElementById('md_cli_div_documentos_exigidos');
    var div_lojas = document.getElementById('md_cli_div_lojas');
    var div_editar_lojas = document.getElementById('md_cli_div_editar_lojas');
    var div_editar_sistemas_preventivos = document.getElementById('md_cli_div_editar_sistemas_preventivos');
    var div_sistemas_preventivos = document.getElementById('md_cli_div_sistemas_preventivos');

    // Divs ClassList
    if (div_logotipos) {
        div_logotipos.classList.remove('d-lg-flex');
        div_logotipos.classList.add('d-none');
    }

    div_dados.classList.remove('d-lg-flex');
    div_dados.classList.add('d-none');

    div_documentos.classList.remove('d-lg-flex');
    div_documentos.classList.add('d-none');

    if (div_editar_documentos) {
        div_editar_documentos.classList.remove('d-lg-flex');
        div_editar_documentos.classList.add('d-none');
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

    if (div_editar_documentos_exigidos) {
        div_editar_documentos_exigidos.classList.remove('d-lg-flex');
        div_editar_documentos_exigidos.classList.add('d-none');
    }

    div_documentos_exigidos.classList.remove('d-lg-flex');
    div_documentos_exigidos.classList.add('d-none');

    div_lojas.classList.remove('d-lg-flex');
    div_lojas.classList.add('d-none');

    if (div_editar_lojas) {
        div_editar_lojas.classList.remove('d-lg-flex');
        div_editar_lojas.classList.add('d-none');
    }

    if (div_editar_sistemas_preventivos) {
        div_editar_sistemas_preventivos.classList.remove('d-lg-flex');
        div_editar_sistemas_preventivos.classList.add('d-none');
    }

    div_sistemas_preventivos.classList.remove('d-lg-flex');
    div_sistemas_preventivos.classList.add('d-none');

    // Estatisticas
    await clienteModalInfoEstatisticas(id);

    // Logotipos
    if (op == 1) {
        div_logotipos.classList.remove('d-none');
        div_logotipos.classList.add('d-lg-flex');
    }

    // Dados
    if (op == 2) {
        div_dados.classList.remove('d-none');
        div_dados.classList.add('d-lg-flex');

        await clienteModalInfoDados(id);
    }

    // Documentos
    if (op == 3) {
        div_documentos.classList.remove('d-none');
        div_documentos.classList.add('d-lg-flex');

        await clienteModalInfoDocumentos(id);
    }

    // Editar Documentos
    if (op == 6) {
        div_editar_documentos.classList.remove('d-none');
        div_editar_documentos.classList.add('d-lg-flex');
    }

    // Propostas
    if (op == 7) {
        div_propostas.classList.remove('d-none');
        div_propostas.classList.add('d-lg-flex');

        await clienteModalInfoPropostas(id);
    }

    // Ordens Serviços
    if (op == 8) {
        div_ordens_servicos.classList.remove('d-none');
        div_ordens_servicos.classList.add('d-lg-flex');

        await clienteModalInfoOrdensServicos(id);
    }

    // Visitas Técnicas
    if (op == 9) {
        div_visitas_tecnicas.classList.remove('d-none');
        div_visitas_tecnicas.classList.add('d-lg-flex');

        await clienteModalInfoVisitasTecnicas(id);
    }

    // Brigadas Incêndios
    if (op == 10) {
        div_brigadas_incendios.classList.remove('d-none');
        div_brigadas_incendios.classList.add('d-lg-flex');

        await clienteModalInfoBrigadasIncendios(id);
    }

    // Rede
    if (op == 11) {
        div_clientes_rede.classList.remove('d-none');
        div_clientes_rede.classList.add('d-lg-flex');

        await clienteModalInfoClientesRede(id);
    }

    // Principal
    if (op == 12) {
        div_clientes_principal.classList.remove('d-none');
        div_clientes_principal.classList.add('d-lg-flex');

        await clienteModalInfoClientesPrincipal(id);
    }

    // Editar Documentos Exigidos
    if (op == 13) {
        div_editar_documentos_exigidos.classList.remove('d-none');
        div_editar_documentos_exigidos.classList.add('d-lg-flex');

        await clienteModalInfoEditarDocumentosExigidos(id);
    }

    // Documentos Exigidos
    if (op == 14) {
        div_documentos_exigidos.classList.remove('d-none');
        div_documentos_exigidos.classList.add('d-lg-flex');

        await clienteModalInfoDocumentosExigidos(id);
    }

    // Editar Lojas
    if (op == 15) {
        div_editar_lojas.classList.remove('d-none');
        div_editar_lojas.classList.add('d-lg-flex');
    }

    // Lojas
    if (op == 16) {
        div_lojas.classList.remove('d-none');
        div_lojas.classList.add('d-lg-flex');

        await clienteModalInfoLojas(id);
    }

    // Editar Sistemas Preventivos
    if (op == 17) {
        div_editar_sistemas_preventivos.classList.remove('d-none');
        div_editar_sistemas_preventivos.classList.add('d-lg-flex');
    }

    // Sistemas Preventivos
    if (op == 18) {
        div_sistemas_preventivos.classList.remove('d-none');
        div_sistemas_preventivos.classList.add('d-lg-flex');

        await clienteModalInfoSistemasPreventivos(id);
    }
}

async function clienteModalInfoFiltrarDadosComboBoxes() {
    // Select cli_editar_sistemas_preventivos_edificacao_local_id''''''''''''''''''''''''''''''''''''''''''''
    var cliente_id = document.getElementById('mi_cli_cliente_id').value;
    var select = document.getElementById('cli_editar_sistemas_preventivos_edificacao_local_id');
    var opcoes = select.querySelectorAll('option');

    // Etapa 1: mostrar todas as opções antes de filtrar
    opcoes.forEach(option => option.hidden = false);

    // Etapa 2: se não houver cliente_id, sai sem filtrar (mostra todos)
    if (!cliente_id) {
        select.value = '';
        return;
    }

    // Etapa 3: aplicar o filtro
    opcoes.forEach(option => {
        const dataCliente = option.dataset.cliente_id;

        // Mantém a primeira opção ("Selecione...") sempre visível
        if (option.value === '') return;

        // Oculta se não pertencer ao Cliente informado
        if (dataCliente != cliente_id) {
            option.hidden = true;
        }
    });

    // Etapa 4: resetar a seleção
    select.value = '';
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Select cli_editar_lojas_edificacao_nivel_id'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    var cliente_id = document.getElementById('mi_cli_cliente_id').value;
    var select = document.getElementById('cli_editar_documentos_edificacao_id');
    var opcoes = select.querySelectorAll('option');

    // Etapa 1: mostrar todas as opções antes de filtrar
    opcoes.forEach(option => option.hidden = false);

    // Etapa 2: se não houver cliente_id, sai sem filtrar (mostra todos)
    if (!cliente_id) {
        select.value = '';
        return;
    }

    // Etapa 3: aplicar o filtro
    opcoes.forEach(option => {
        const dataCliente = option.dataset.cliente_id;

        // Mantém a primeira opção ("Selecione...") sempre visível
        if (option.value === '') return;

        // Oculta se não pertencer ao Cliente informado
        if (dataCliente != cliente_id) {
            option.hidden = true;
        }
    });

    // Etapa 4: resetar a seleção
    select.value = '';
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Select cli_editar_lojas_edificacao_nivel_id'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    var cliente_id = document.getElementById('mi_cli_cliente_id').value;
    var select = document.getElementById('cli_editar_lojas_edificacao_nivel_id');
    var opcoes = select.querySelectorAll('option');

    // Etapa 1: mostrar todas as opções antes de filtrar
    opcoes.forEach(option => option.hidden = false);

    // Etapa 2: se não houver clienteId, sai sem filtrar (mostra todos)
    if (!cliente_id) {
        select.value = '';
        return;
    }

    // Etapa 3: aplicar o filtro
    opcoes.forEach(option => {
        const dataCliente = option.dataset.cliente_id;

        // Mantém a primeira opção ("Selecione...") sempre visível
        if (option.value === '') return;

        // Oculta se não pertencer ao Cliente informado
        if (dataCliente != cliente_id) {
            option.hidden = true;
        }
    });

    // Etapa 4: resetar a seleção
    select.value = '';
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Select cli_editar_lojas_subordinado_cliente_id''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    var principalId = document.getElementById('mi_cli_cliente_id').value;
    var select = document.getElementById('cli_editar_lojas_subordinado_cliente_id');
    var opcoes = select.querySelectorAll('option');

    // Etapa 1: mostrar todas as opções antes de filtrar
    opcoes.forEach(option => option.hidden = false);

    // Etapa 2: se não houver principalId, sai sem filtrar (mostra todos)
    if (!principalId) {
        select.value = '';
        return;
    }

    // Etapa 3: aplicar o filtro
    opcoes.forEach(option => {
        const dataPrincipal = option.dataset.principal_cliente_id;

        // Mantém a primeira opção ("Selecione...") sempre visível
        if (option.value === '') return;

        // Oculta se não pertencer ao principal informado
        if (dataPrincipal != principalId) {
            option.hidden = true;
        }
    });

    // Etapa 4: resetar a seleção
    select.value = '';
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
}

function visualizarCliente(cliente_id) {
    // modal
    const modalEl = document.getElementById('cliente_modal_info');

    if (modalEl.classList.contains('show')) {
        var modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();

        crudView(cliente_id);
    }
}
// Modal INFO - Funções - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Funções - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Estatísticas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Estatísticas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function clienteModalInfoEstatisticas(id = '') {
    if (id === '') {
        id = document.getElementById('mi_cli_cliente_id').value;
    }

    const url_atual = `${window.location.protocol}//${window.location.host}/`;

    try {
        const response = await fetch(`${url_atual}clientes/modalInfo/estatisticas/${id}`, {
            method: 'GET',
            headers: { 'REQUEST-ORIGIN': 'fetch' }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const estatisticas = await response.json();

        // Atualizar elementos da tela
        document.getElementById('md_cli_estatisticas_documentos').innerHTML = estatisticas.documentos;
        document.getElementById('md_cli_estatisticas_visitas_tecnicas').innerHTML = estatisticas.visitas_tecnicas;
        document.getElementById('md_cli_estatisticas_ordens_servicos').innerHTML = estatisticas.ordens_servicos;
        document.getElementById('md_cli_estatisticas_brigadas_incendios').innerHTML = estatisticas.brigadas_incendios;
        document.getElementById('md_cli_estatisticas_propostas').innerHTML = estatisticas.propostas;
        document.getElementById('md_cli_estatisticas_clientes_rede').innerHTML = estatisticas.clientes_rede;
        document.getElementById('md_cli_estatisticas_clientes_principal').innerHTML = estatisticas.clientes_principal;
        document.getElementById('md_cli_estatisticas_documentos_exigidos').innerHTML = estatisticas.documentos_exigidos;
        document.getElementById('md_cli_estatisticas_sistemas_preventivos').innerHTML = estatisticas.sistemas_preventivos;

        // retornando algo para o await do chamador "esperar"
        return true;
    } catch (error) {
        alert('Erro clienteModalInfoEstatisticas: ' + error.message);
        throw error; // repassa o erro para o chamador se quiser tratar lá
    }
}
// Modal INFO - Estatísticas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Estatísticas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Logotipos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Logotipos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
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

function DOMContentLoadedLogotipoPrincipal() {
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
}

function DOMContentLoadedLogotipoRelatorios() {
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
}

function DOMContentLoadedLogotipoCartaoEmergencial() {
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
}

function DOMContentLoadedLogotipoMenu() {
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
}
// Modal INFO - Logotipos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Logotipos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Dados - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Dados - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function clienteModalInfoDados(id = '', retornoControle = 0) {
    // Estatisticas
    await clienteModalInfoEstatisticas(id);

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

        //Campo cli_editar_documentos_documento_id''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        const selectDocumento = document.getElementById('cli_editar_documentos_documento_id');
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
        document.getElementById('mi_cli_cpf_cnpj').value = aplicarMascaraJs(cpf_cnpj, '##.###.###/####-##');
        document.getElementById('mi_cli_nome').value = cliente.name;
        document.getElementById('mi_cli_telefones').value = formatarTelCel(1, cliente.telefone_1)+'  '+formatarTelCel(1, cliente.telefone_2);
        document.getElementById('mi_cli_celulares').value = formatarTelCel(2, cliente.celular_1)+'  '+formatarTelCel(2, cliente.celular_2);
        document.getElementById('mi_cli_data_nascimento').value = formatarData(2, cliente.data_nascimento);

        // Documentos
        if (document.getElementById('editar_documentos_cliente_id')) { document.getElementById('editar_documentos_cliente_id').value = cliente.id; }

        // Logotipo Principal
        if (document.getElementById('upload_logotipo_principal_cliente_id')) { document.getElementById('upload_logotipo_principal_cliente_id').value = cliente.id; }

        // Logotipo Relatórios
        if (document.getElementById('upload_logotipo_relatorios_cliente_id')) { document.getElementById('upload_logotipo_relatorios_cliente_id').value = cliente.id; }

        // Logotipo Cartão Emergencial
        if (document.getElementById('upload_logotipo_cartao_emergencial_cliente_id')) { document.getElementById('upload_logotipo_cartao_emergencial_cliente_id').value = cliente.id; }

        // Logotipo Menu
        if (document.getElementById('upload_logotipo_menu_cliente_id')) { document.getElementById('upload_logotipo_menu_cliente_id').value = cliente.id; }

        // Documentos Exigidos
        if (document.getElementById('editar_documentos_exigidos_cliente_id')) { document.getElementById('editar_documentos_exigidos_cliente_id').value = cliente.id; }

        // Lojas
        if (document.getElementById('editar_lojas_cliente_id')) { document.getElementById('editar_lojas_cliente_id').value = cliente.id; }

        // Sistemas Preventivos
        if (document.getElementById('editar_sistemas_preventivos_cliente_id')) { document.getElementById('editar_sistemas_preventivos_cliente_id').value = cliente.id; }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }).catch(error => {
        alert('Erro clienteModalInfoDados: ' + error);
    }).finally(async () => {
        // Filtrar Combo Boxes para o Cliente chamado no INFO
        await clienteModalInfoFiltrarDadosComboBoxes();

        // Retornar para outro controle
        if (retornoControle != 0) {
            await clienteModalInfoControle(retornoControle);
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

    //Campo: editar_documentos_cliente_id (requerido)
    if (validacao({op:1, value:document.getElementById('editar_documentos_cliente_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.'+'<br>';
    }

    //Campo: cli_editar_documentos_documento_id (requerido)
    if (validacao({op:1, value:document.getElementById('cli_editar_documentos_documento_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Documento requerido.'+'<br>';
    }

    //Campo: cli_editar_documentos_data_emissao (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('cli_editar_documentos_data_emissao').value}) === true) {
        //Campo: cli_editar_documentos_data_emissao (Data Válida)
        if (validacao({op:8, value:document.getElementById('cli_editar_documentos_data_emissao').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data emissão Inválida.'+'<br>';
        }
    }

    //Campo: cli_editar_documentos_data_vencimento (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('cli_editar_documentos_data_vencimento').value}) === true) {
        //Campo: cli_editar_documentos_data_vencimento (Data Válida)
        if (validacao({op:8, value:document.getElementById('cli_editar_documentos_data_vencimento').value}) === false) {
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
    const frm_editar_documentos_cli_botao_salvar_operacao = document.getElementById('frm_editar_documentos_cli_botao_salvar_operacao');

    if (frm_editar_documentos_cli_botao_salvar_operacao) {
        frm_editar_documentos_cli_botao_salvar_operacao.addEventListener('click', function () {
            // FormData
            var formulario = document.getElementById('frm_editar_documentos_cli');
            var formData = new FormData(formulario);
            var url_atual = window.location.protocol + '//' + window.location.host + '/';
            var editar_documentos_cliente_id = document.getElementById('editar_documentos_cliente_id').value;

            // Criticando campos
            if (validar_frm_editar_documentos() === false) { return false; }

            // Acessar rota
            fetch(url_atual + 'clientes/editarDocumento/editar_documento', {
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
                    clienteModalInfoDocumentos(editar_documentos_cliente_id);

                    formulario.reset();

                    alertSwal('success', 'Clientes', data.success, 'true', 20000);

                    // Atualizar chamando função Dados e Montar Grade
                    await clienteModalInfoDados(editar_documentos_cliente_id, 3);
                } else if (data.error) {
                    alertSwal('warning', 'Clientes', data.error, 'true', 20000);
                } else {
                    alert('Erro interno');
                }
            }).catch(error => {
                alert('Erro Clientes Editar Documento PDF: ' + error);
            });
        });
    }
}

async function clienteModalInfoEditarDocumentosCreate() {
    const frm_editar_documentos_cli = document.getElementById('frm_editar_documentos_cli');
    const frm_editar_documentos_cli_botao_salvar_operacao = document.getElementById('frm_editar_documentos_cli_botao_salvar_operacao');
    const cli_editar_documentos_cliente_documento_id = document.getElementById('cli_editar_documentos_cliente_documento_id');
    const cli_editar_documentos_operacao = document.getElementById('cli_editar_documentos_operacao');
    const div_editar_documentos_pdf_atual = document.getElementById('div_editar_documentos_pdf_atual');

    // Formulário
    frm_editar_documentos_cli.reset();

    // Botão
    frm_editar_documentos_cli_botao_salvar_operacao.classList.remove('btn-primary');
    frm_editar_documentos_cli_botao_salvar_operacao.classList.add('btn-success');
    frm_editar_documentos_cli_botao_salvar_operacao.innerHTML = 'Salvar Operação (Incluir)';

    // Campos
    cli_editar_documentos_cliente_documento_id.value = 0;
    cli_editar_documentos_operacao.value = 'create';

    // PDF
    div_editar_documentos_pdf_atual.style.display = 'none';

    await clienteModalInfoControle(6);
}

async function clienteModalInfoEditarDocumentosEdit(cliente_documento_id, edificacao_id, documento_id, descricao, aviso, data_emissao, data_vencimento, caminho) {
    const frm_editar_documentos_cli = document.getElementById('frm_editar_documentos_cli');
    const frm_editar_documentos_cli_botao_salvar_operacao = document.getElementById('frm_editar_documentos_cli_botao_salvar_operacao');
    const cli_editar_documentos_cliente_documento_id = document.getElementById('cli_editar_documentos_cliente_documento_id');
    const cli_editar_documentos_operacao = document.getElementById('cli_editar_documentos_operacao');
    const cli_editar_documentos_edificacao_id = document.getElementById('cli_editar_documentos_edificacao_id');
    const cli_editar_documentos_documento_id = document.getElementById('cli_editar_documentos_documento_id');
    const cli_editar_documentos_descricao = document.getElementById('cli_editar_documentos_descricao');
    const cli_editar_documentos_aviso = document.getElementById('cli_editar_documentos_aviso');
    const cli_editar_documentos_data_emissao = document.getElementById('cli_editar_documentos_data_emissao');
    const cli_editar_documentos_data_vencimento = document.getElementById('cli_editar_documentos_data_vencimento');
    const div_editar_documentos_pdf_atual = document.getElementById('div_editar_documentos_pdf_atual');
    const a_editar_documentos_pdf_atual = document.getElementById('a_editar_documentos_pdf_atual');

    // Formulário
    frm_editar_documentos_cli.reset();

    // Botão
    frm_editar_documentos_cli_botao_salvar_operacao.classList.remove('btn-success');
    frm_editar_documentos_cli_botao_salvar_operacao.classList.add('btn-primary');
    frm_editar_documentos_cli_botao_salvar_operacao.innerHTML = 'Salvar Operação (Alterar)';

    // Campos
    cli_editar_documentos_cliente_documento_id.value = cliente_documento_id;
    cli_editar_documentos_operacao.value = 'edit';
    cli_editar_documentos_edificacao_id.value = edificacao_id;
    cli_editar_documentos_documento_id.value = documento_id;
    cli_editar_documentos_descricao.value = descricao;
    cli_editar_documentos_aviso.value = aviso;
    cli_editar_documentos_data_emissao.value = formatarData(2, data_emissao);
    cli_editar_documentos_data_vencimento.value = formatarData(2, data_vencimento);

    // PDF
    div_editar_documentos_pdf_atual.style.display = 'none';

    if (typeof caminho === 'string' && caminho.trim() !== '') {
        div_editar_documentos_pdf_atual.style.display = '';
        a_editar_documentos_pdf_atual.href = caminho;
    }

    await clienteModalInfoControle(6);
}

async function clienteModalInfoEditarDocumentosDeletar(cliente_documento_id) {
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
        }).then(async data => {
            //Lendo dados
            if (data.success) {
                alertSwal('success', 'Clientes', data.success, 'true', 2000);

                //Dados
                let cliente_id = document.getElementById('mi_cli_cliente_id').value;

                // Atualizar chamando função Dados e Montar Grade
                await clienteModalInfoDados(cliente_id, 3);
            } else if (data.error) {
                alertSwal('error', 'Clientes', data.error, 'true', 2000);
            } else if (data.error_permissao) {
                alertSwal('warning', "Permissão Negada", '', 'true', 2000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro clienteModalInfoEditarDocumentosDeletar:'+error);
        });
    }
}
// Modal INFO - Editar Documentos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Editar Documentos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Documentos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Documentos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function clienteModalInfoDocumentos(cliente_id = '') {
    if (cliente_id == '') { cliente_id = document.getElementById('mi_cli_cliente_id').value; }

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    // Acessar rota
    fetch(url_atual+'clientes/modalInfo/documentos/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        // Lendo json
        let clientes_documentos = data.clientes_documentos;

        // Permissões
        let permissoes = data.permissoes;
        const permissao_list = permissoes.some(p => p.permissao === 'clientes_list');
        const permissao_show = permissoes.some(p => p.permissao === 'clientes_show');
        const permissao_edit = permissoes.some(p => p.permissao === 'clientes_edit');
        const permissao_destroy = permissoes.some(p => p.permissao === 'clientes_destroy');

        // Grade
        let grade = '';

        // Montar Grade
        if (clientes_documentos.length > 0) {
            grade += '<table class="table align-middle table-nowrap table-check table-sm">'; //NÃO COLOCAR DATATABLE POIS O FILTRO NÃO FUNCIONA
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Edificação</th>';
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
            clientes_documentos.forEach(dado => {
                // Dados
                let edificacaoName = dado.edificacaoName ?? '';
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
                        acoes += `<button type="button" class="btn btn-outline-info btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Documento PDF" onclick="window.open('${caminho}', '_blank');">`;
                        acoes += `<i class="fa fa-file-pdf font-size-18"></i></button>`;
                    }
                }

                if (permissao_edit) {
                    acoes += `<button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar Dados" onclick="clienteModalInfoEditarDocumentosEdit(${dado.id}, ${dado.edificacao_id}, ${dado.documento_id}, '${descricao}', ${aviso}, '${data_emissao}', '${data_vencimento}', '${caminho}');">`;
                    acoes += `<i class="fas fa-pencil-alt"></i></button>`;
                }

                if (permissao_destroy) {
                    acoes += `<button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Dados e Documento PDF" onclick="clienteModalInfoEditarDocumentosDeletar('${dado.id}');">`;
                    acoes += `<i class="fa fa-trash-alt font-size-18"></i></button>`;
                }

                acoes += `</div>`;

                // TR
                grade += '<tr class="documento_fonte_'+dado.documento_fonte_id+'">';
                grade += '  <td>' + edificacaoName + '</td>';
                grade += '  <td>' + documentoName + '</td>';
                grade += '  <td>' + descricao + '</td>';
                grade += '  <td>' + formatarData(2, data_emissao) + '</td>';
                grade += '  <td>' + formatarData(2, data_vencimento) + '</td>';
                grade += '  <td>' + aviso_texto + '</td>';
                grade += '  <td>' + acoes + '</td>';
                grade += '</tr>';
            });

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum documento encontrado.';
        }

        // Retornar Grade
        document.getElementById('cli_documentos_grade').innerHTML = grade;

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
                let qtd_registros = clientes_documentos.filter(reg => reg.documento_fonte_id === documento_fonte_id);

                if (qtd_registros.length > 0) {
                    if (idPrimeiroFiltro == 0) { idPrimeiroFiltro = documento_fonte_id; }

                    documentoFonteFiltro += `
                            <button type="button"
                                class="btn btn-warning btn-sm flex-fill text-center py-2 font-size-10"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Filtrar Documentos"
                                onclick="clienteModalInfoDocumentosFiltrar(${documento_fonte_id});">
                                ${documento_fonte_name} (${qtd_registros.length})
                            </button>`;
                }
            });

            documentoFonteFiltro += '       </div>';
            documentoFonteFiltro += '   </div>';
            documentoFonteFiltro += '</div>';
        }

        // Retornar Documento Filtro (Botões)
        document.getElementById('cli_documentos_grade_botoes').innerHTML = documentoFonteFiltro;

        // Primeiro Filtro
        clienteModalInfoDocumentosFiltrar(idPrimeiroFiltro);
    }).catch(error => {
        alert('Erro clienteModalInfoDocumentos: '+error);
    }).finally(() => {
        configurarDataTable(3);
    });
}

async function clienteModalInfoDocumentosFiltrar(documento_fonte_id) {
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
// Modal INFO - Documentos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Documentos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Editar Sistemas Preventivos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Editar Sistemas Preventivos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function validar_frm_editar_sistemas_preventivos() {
    var validacao_ok = true;
    var mensagem = '';

    // Campo: editar_sistemas_preventivos_cliente_id (requerido)
    if (validacao({op:1, value:document.getElementById('editar_sistemas_preventivos_cliente_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.'+'<br>';
    }

    // Campo: cli_editar_sistemas_preventivos_sistema_preventivo_id (requerido)
    if (validacao({op:1, value:document.getElementById('cli_editar_sistemas_preventivos_sistema_preventivo_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Sistema Preventivo requerido.'+'<br>';
    }

    // Campo: cli_editar_sistemas_preventivos_sistema_preventivo_numero (requerido)
    if (validacao({op:1, value:document.getElementById('cli_editar_sistemas_preventivos_sistema_preventivo_numero').value}) === false) {
        validacao_ok = false;
        mensagem += 'Sistema Preventivo (Número) requerido.'+'<br>';
    } else {
        // Campo: cli_editar_sistemas_preventivos_sistema_preventivo_numero (mínimo de 7 caracteres)
        if (validacao({ op: 2, value: document.getElementById('cli_editar_sistemas_preventivos_sistema_preventivo_numero').value, minCaracteres: 7 }) === false) {
            validacao_ok = false;
            mensagem += 'Sistema Preventivo (Número) precisa ter 7 números.' + '<br>';
        }

        // Campo: cli_editar_sistemas_preventivos_sistema_preventivo_numero (máximo de 7 caracteres)
        if (validacao({ op: 3, value: document.getElementById('cli_editar_sistemas_preventivos_sistema_preventivo_numero').value, maxCaracteres: 7 }) === false) {
            validacao_ok = false;
            mensagem += 'Sistema Preventivo (Número) precisa ter 7 números.' + '<br>';
        }

        // Campo: cli_editar_sistemas_preventivos_sistema_preventivo_numero (somente números)
        if (validacao({ op: 4, value: document.getElementById('cli_editar_sistemas_preventivos_sistema_preventivo_numero').value }) === false) {
            validacao_ok = false;
            mensagem += 'Sistema Preventivo (Número) só pode conter dígitos de 0 a 9.' + '<br>';
        }
    }

    // Mensagem
    if (validacao_ok === false) {
        var texto = '<div class="pt-3">';
        texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
        texto += '</div>';

        alertSwal('warning', 'Validação', texto, 'true', 5000);
    }

    // Retorno
    return validacao_ok;
}

function DOMContentLoadedEditarSistemasPreventivos() {
    const frm_editar_sistemas_preventivos_cli_botao_salvar_operacao = document.getElementById('frm_editar_sistemas_preventivos_cli_botao_salvar_operacao');

    if (frm_editar_sistemas_preventivos_cli_botao_salvar_operacao) {
        frm_editar_sistemas_preventivos_cli_botao_salvar_operacao.addEventListener('click', function () {
            // FormData
            var formulario = document.getElementById('frm_editar_sistemas_preventivos_cli');
            var formData = new FormData(formulario);
            var url_atual = window.location.protocol + '//' + window.location.host + '/';
            var editar_sistemas_preventivos_cliente_id = document.getElementById('editar_sistemas_preventivos_cliente_id').value;

            // Criticando campos
            if (validar_frm_editar_sistemas_preventivos() === false) { return false; }

            // Acessar rota
            fetch(url_atual + 'clientes/editarSistemaPreventivo/editar_sistema_preventivo', {
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
                    // Montando Grade de Sistemas Preventivos
                    clienteModalInfoSistemasPreventivos(editar_sistemas_preventivos_cliente_id);

                    formulario.reset();

                    alertSwal('success', 'Clientes', data.success, 'true', 20000);

                    // Atualizar chamando função Dados e Montar Grade
                    await clienteModalInfoDados(editar_sistemas_preventivos_cliente_id, 18);
                } else if (data.error) {
                    alertSwal('warning', 'Clientes', data.error, 'true', 20000);
                } else {
                    alert('Erro interno');
                }
            }).catch(error => {
                alert('Erro DOMContentLoadedEditarSistemasPreventivos: ' + error);
            });
        });
    }
}

async function clienteModalInfoEditarSistemasPreventivosCreate() {
    const frm_editar_sistemas_preventivos_cli = document.getElementById('frm_editar_sistemas_preventivos_cli');
    const frm_editar_sistemas_preventivos_cli_botao_salvar_operacao = document.getElementById('frm_editar_sistemas_preventivos_cli_botao_salvar_operacao');
    const cli_editar_sistemas_preventivos_cliente_sistema_preventivo_id = document.getElementById('cli_editar_sistemas_preventivos_cliente_sistema_preventivo_id');
    const cli_editar_sistemas_preventivos_operacao = document.getElementById('cli_editar_sistemas_preventivos_operacao');
    const div_editar_sistemas_preventivos_fotografia_atual = document.getElementById('div_editar_sistemas_preventivos_fotografia_atual');

    // Formulário
    frm_editar_sistemas_preventivos_cli.reset();

    // Botão
    frm_editar_sistemas_preventivos_cli_botao_salvar_operacao.classList.remove('btn-primary');
    frm_editar_sistemas_preventivos_cli_botao_salvar_operacao.classList.add('btn-success');
    frm_editar_sistemas_preventivos_cli_botao_salvar_operacao.innerHTML = 'Salvar Operação (Incluir)';

    // Campos
    cli_editar_sistemas_preventivos_cliente_sistema_preventivo_id.value = 0;
    cli_editar_sistemas_preventivos_operacao.value = 'create';

    // Fotografia
    div_editar_sistemas_preventivos_fotografia_atual.style.display = 'none';

    await clienteModalInfoControle(17);
}

async function clienteModalInfoEditarSistemasPreventivosEdit(cliente_sistema_preventivo_id, edificacao_local_id, sistema_preventivo_id, descricao, sistema_preventivo_numero, fotografia) {
    const frm_editar_sistemas_preventivos_cli = document.getElementById('frm_editar_sistemas_preventivos_cli');
    const frm_editar_sistemas_preventivos_cli_botao_salvar_operacao = document.getElementById('frm_editar_sistemas_preventivos_cli_botao_salvar_operacao');
    const cli_editar_sistemas_preventivos_cliente_sistema_preventivo_id = document.getElementById('cli_editar_sistemas_preventivos_cliente_sistema_preventivo_id');
    const cli_editar_sistemas_preventivos_operacao = document.getElementById('cli_editar_sistemas_preventivos_operacao');
    const cli_editar_sistemas_preventivos_edificacao_local_id = document.getElementById('cli_editar_sistemas_preventivos_edificacao_local_id');
    const cli_editar_sistemas_preventivos_sistema_preventivo_id = document.getElementById('cli_editar_sistemas_preventivos_sistema_preventivo_id');
    const cli_editar_sistemas_preventivos_descricao = document.getElementById('cli_editar_sistemas_preventivos_descricao');
    const cli_editar_sistemas_preventivos_sistema_preventivo_numero = document.getElementById('cli_editar_sistemas_preventivos_sistema_preventivo_numero');
    const cli_editar_sistemas_preventivos_fotografia = document.getElementById('cli_editar_sistemas_preventivos_fotografia');
    const div_editar_sistemas_preventivos_fotografia_atual = document.getElementById('div_editar_sistemas_preventivos_fotografia_atual');
    const a_editar_sistemas_preventivos_fotografia_atual = document.getElementById('a_editar_sistemas_preventivos_fotografia_atual');

    // Formulário
    frm_editar_sistemas_preventivos_cli.reset();

    // Botão
    frm_editar_sistemas_preventivos_cli_botao_salvar_operacao.classList.remove('btn-success');
    frm_editar_sistemas_preventivos_cli_botao_salvar_operacao.classList.add('btn-primary');
    frm_editar_sistemas_preventivos_cli_botao_salvar_operacao.innerHTML = 'Salvar Operação (Alterar)';

    // Campos
    cli_editar_sistemas_preventivos_cliente_sistema_preventivo_id.value = cliente_sistema_preventivo_id;
    cli_editar_sistemas_preventivos_operacao.value = 'edit';
    cli_editar_sistemas_preventivos_edificacao_local_id.value = edificacao_local_id;
    cli_editar_sistemas_preventivos_sistema_preventivo_id.value = sistema_preventivo_id;
    cli_editar_sistemas_preventivos_descricao.value = descricao;
    cli_editar_sistemas_preventivos_sistema_preventivo_numero.value = sistema_preventivo_numero;

    // Fotografia
    div_editar_sistemas_preventivos_fotografia_atual.style.display = 'none';

    if (typeof fotografia === 'string' && fotografia.trim() !== '') {
        div_editar_sistemas_preventivos_fotografia_atual.style.display = '';
        a_editar_sistemas_preventivos_fotografia_atual.href = fotografia;
    }

    await clienteModalInfoControle(17);

    await clienteModalInfoEditarSistemasPreventivosMostrarEquipamentos(sistema_preventivo_id);
}

async function clienteModalInfoEditarSistemasPreventivosDeletar(cliente_sistema_preventivo_id) {
    // Confirmação de Delete
    const confirmed = await alertSwalConfirmacao();
    if (confirmed) {
        var url_atual = window.location.protocol+'//'+window.location.host+'/';

        // Acessar rota
        fetch(url_atual+'clientes/modalInfo/deletar_sistema_preventivo/'+cliente_sistema_preventivo_id, {
            method: 'DELETE',
            headers: {
                'REQUEST-ORIGIN': 'fetch',
                'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        }).then(response => {
            return response.json();
        }).then(async data => {
            // Lendo dados
            if (data.success) {
                alertSwal('success', 'Clientes', data.success, 'true', 2000);

                //Dados
                let cliente_id = document.getElementById('mi_cli_cliente_id').value;

                // Atualizar chamando função Dados e Montar Grade
                await clienteModalInfoDados(cliente_id, 18);
            } else if (data.error) {
                alertSwal('error', 'Clientes', data.error, 'true', 2000);
            } else if (data.error_permissao) {
                alertSwal('warning', "Permissão Negada", '', 'true', 2000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro clienteModalInfoEditarSistemasPreventivosDeletar:'+error);
        });
    }
}

async function clienteModalInfoEditarSistemasPreventivosMostrarEquipamentos(sistema_preventivo_id) {
    var url_atual = window.location.protocol + '//' + window.location.host + '/';

    // Acessar rota
    fetch(url_atual+'sistemas_preventivos/equipamentos/'+sistema_preventivo_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        const cli_editar_sistemas_preventivos_equipamentos_preventivos = document.getElementById('cli_editar_sistemas_preventivos_equipamentos_preventivos');

        cli_editar_sistemas_preventivos_equipamentos_preventivos.innerHTML = '';

        if (data.success) {
            // Lendo dados
            let equipamentos = data.success;

            equipamentos.forEach(function (item) {
                const linha = document.createElement("div");
                linha.classList.add('text-success');
                linha.style.borderBottom = "1px solid #eee";
                linha.style.padding = "4px 0";
                linha.textContent = item.equipamento_preventivo_item+') '+item.equipamentoPreventivoName;
                cli_editar_sistemas_preventivos_equipamentos_preventivos.appendChild(linha);
            });
        }
    }).catch(error => {
        alert('Erro clienteModalInfoEditarSistemasPreventivosMostrarEquipamentos: ' + error);
    }).finally(async () => {});
}
// Modal INFO - Editar Sistemas Preventivos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Editar Sistemas Preventivos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Sistemas Preventivos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Sistemas Preventivos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function clienteModalInfoSistemasPreventivos(cliente_id = '') {
    if (cliente_id == '') { cliente_id = document.getElementById('mi_cli_cliente_id').value; }

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    // Acessar rota
    fetch(url_atual+'clientes/modalInfo/sistemas_preventivos/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        // Lendo json
        let clientes_sistemas_preventivos = data.clientes_sistemas_preventivos;

        // Permissões
        let permissoes = data.permissoes;
        const permissao_list = permissoes.some(p => p.permissao === 'clientes_list');
        const permissao_show = permissoes.some(p => p.permissao === 'clientes_show');
        const permissao_edit = permissoes.some(p => p.permissao === 'clientes_edit');
        const permissao_destroy = permissoes.some(p => p.permissao === 'clientes_destroy');

        // Grade
        let grade = '';

        // Montar Grade
        if (clientes_sistemas_preventivos.length > 0) {
            grade += '<table class="table align-middle table-check table-sm">'; //NÃO COLOCAR DATATABLE POIS O FILTRO NÃO FUNCIONA
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Edificação Local</th>';
            grade += '          <th scope="col">Medida Segurança</th>';
            grade += '          <th scope="col">Sistema Preventivo (Nome)</th>';
            grade += '          <th scope="col">Sistema Preventivo (Descrição)</th>';
            grade += '          <th scope="col">Sistema Preventivo (Número)</th>';
            grade += '          <th class="text-center" scope="col">Ações</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            // Varrer
            clientes_sistemas_preventivos.forEach(dado => {
                // Dados
                let edificacaoLocal = (dado.edificacaoName ?? '') + ' - ' + (dado.edificacaoNivelName ?? '') + ' - ' + (dado.edificacaoLocalName ?? '');
                if (edificacaoLocal == ' -  - ') { edificacaoLocal = ''; }
                let medidaSegurancaName = dado.medidaSegurancaName;
                let sistemaPreventivoName = dado.sistemaPreventivoName;
                let descricao = dado.descricao ?? '';
                let sistema_preventivo_numero = dado.sistema_preventivo_numero ?? '';
                let fotografia = dado.fotografia ?? '';

                // Ações
                let acoes = ``;

                acoes += `<div class="d-flex justify-content-center gap-2">`;

                if (permissao_show) {
                    if (fotografia != '') {
                        acoes += `<button type="button" class="btn btn-outline-info btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Fotografia" onclick="window.open('${fotografia}', '_blank');">`;
                        acoes += `<i class="fa fa-file-pdf font-size-18"></i></button>`;
                    }
                }

                if (permissao_edit) {
                    acoes += `<button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar Dados" onclick="clienteModalInfoEditarSistemasPreventivosEdit(${dado.id}, ${dado.edificacao_local_id}, ${dado.sistema_preventivo_id}, '${descricao}', '${sistema_preventivo_numero}', '${fotografia}');">`;
                    acoes += `<i class="fas fa-pencil-alt"></i></button>`;
                }

                if (permissao_destroy) {
                    acoes += `<button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Dados e Fotografia" onclick="clienteModalInfoEditarSistemasPreventivosDeletar('${dado.id}');">`;
                    acoes += `<i class="fa fa-trash-alt font-size-18"></i></button>`;
                }

                acoes += `</div>`;

                // TR
                grade += '<tr class="sistema_preventivo_fonte_' + dado.sistema_preventivo_fonte_id + '">';
                grade += '  <td>' + edificacaoLocal + '</td>';
                grade += '  <td>' + medidaSegurancaName + '</td>';
                grade += '  <td>' + sistemaPreventivoName + '</td>';
                grade += '  <td>' + descricao + '</td>';
                grade += '  <td>' + sistema_preventivo_numero + '</td>';
                grade += '  <td>' + acoes + '</td>';
                grade += '</tr>';
            });

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum sistema preventivo encontrado.';
        }

        // Retornar Grade
        document.getElementById('cli_sistemas_preventivos_grade').innerHTML = grade;

        // Colocar Botões para filtro dos sistemas_preventivos quanto a Fonte
        var sistemaPreventivoFonteFiltro = '';
        var idPrimeiroFiltro = 0; // Guardar um id para depois que a grade for mostrada executar o primeiro Filtro)
        if (grade != 'Nenhum documento encontrado.') {
            // Lendo json
            let sistema_preventivo_fontes = data.sistema_preventivo_fontes;

            sistemaPreventivoFonteFiltro += '<div class="col-12 order-3 order-lg-2 align-self-center">';
            sistemaPreventivoFonteFiltro += '   <div class="text-lg-center mt-4 mt-lg-0">';
            sistemaPreventivoFonteFiltro += '       <div class="d-flex flex-wrap justify-content-start gap-2">';

            // Varrer
            sistema_preventivo_fontes.forEach(dado => {
                let sistema_preventivo_fonte_id = dado.id;
                let sistema_preventivo_fonte_name = dado.name;
                let qtd_registros = clientes_sistemas_preventivos.filter(reg => reg.sistema_preventivo_fonte_id === sistema_preventivo_fonte_id);

                if (qtd_registros.length > 0) {
                    if (idPrimeiroFiltro == 0) { idPrimeiroFiltro = sistema_preventivo_fonte_id; }

                    sistemaPreventivoFonteFiltro += `
                            <button type="button"
                                class="btn btn-warning btn-sm flex-fill text-center py-2 font-size-10"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Filtrar Sistemas Preventivos"
                                onclick="clienteModalInfoSistemasPreventivosFiltrar(${sistema_preventivo_fonte_id});">
                                ${sistema_preventivo_fonte_name} (${qtd_registros.length})
                            </button>`;
                }
            });

            sistemaPreventivoFonteFiltro += '       </div>';
            sistemaPreventivoFonteFiltro += '   </div>';
            sistemaPreventivoFonteFiltro += '</div>';
        }

        // Retornar Sistema Preventivo Filtro (Botões)
        document.getElementById('cli_sistemas_preventivos_grade_botoes').innerHTML = sistemaPreventivoFonteFiltro;

        // Primeiro Filtro
        clienteModalInfoSistemasPreventivosFiltrar(idPrimeiroFiltro);
    }).catch(error => {
        alert('Erro clienteModalInfoSistemasPreventivos: '+error);
    }).finally(() => {
        configurarDataTable(3);
    });
}

async function clienteModalInfoSistemasPreventivosFiltrar(sistema_preventivo_fonte_id) {
    const todasLinhas = document.querySelectorAll("#cli_sistemas_preventivos_grade table tbody tr");

    // Primeiro: mostra todas as linhas
    todasLinhas.forEach(linha => linha.style.display = '');

    // Depois: aplica o filtro
    todasLinhas.forEach(linha => {
        if (!linha.classList.contains(`sistema_preventivo_fonte_${sistema_preventivo_fonte_id}`)) {
            linha.style.display = 'none';
        }
    });
}
// Modal INFO - Sistemas Preventivos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Sistemas Preventivos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Editar Documentos Exigidos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Editar Documentos Exigidos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function clienteModalInfoEditarDocumentosExigidos(cliente_id = '') {
    if (cliente_id == '') { cliente_id = document.getElementById('mi_cli_cliente_id').value; }

    var url_atual = window.location.protocol + '//' + window.location.host + '/';

    // Acessar rota
    fetch(url_atual+'clientes/modalInfo/documentos_exigidos/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        // Resetar Formulário
        document.getElementById('frm_editar_documentos_exigidos_cli').reset();

        // Lendo json
        let documentos_exigidos = data.clientes_documentos_exigidos;

        // Estatisticas
        clienteModalInfoEstatisticas(cliente_id);

        // Marcar checkboxs
        documentos_exigidos.forEach(function (item) {
            document.getElementById(`editar_documentos_exigidos_documento_exigido_id_${item.documento_id}`).checked = true;
        });
    }).catch(error => {
        alert('Erro clienteModalInfoEditarDocumentosExigidos: '+error);
    }).finally(() => {});
}

function DOMContentLoadedEditarDocumentosExigidos() {
    const frm_editar_documentos_exigidos_cli_executar = document.getElementById('frm_editar_documentos_exigidos_cli_executar');

    if (frm_editar_documentos_exigidos_cli_executar) {
        frm_editar_documentos_exigidos_cli_executar.addEventListener('click', function () {
            // FormData
            var formulario = document.getElementById('frm_editar_documentos_exigidos_cli');
            var formData = new FormData(formulario);
            var url_atual = window.location.protocol + '//' + window.location.host + '/';
            var editar_documentos_exigidos_cliente_id = document.getElementById('editar_documentos_exigidos_cliente_id').value;

            // Tratar Botões
            frm_editar_documentos_exigidos_cli_executar.style.display = 'block';

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
            }).then(async data => {
                // Lendo dados
                if (data.success) {

                    formulario.reset();

                    // Atualizar chamando função Dados e Montar Grade
                    await clienteModalInfoDados(editar_documentos_exigidos_cliente_id, 14);

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
}
// Modal INFO - Editar Documentos Exigidos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Editar Documentos Exigidos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Documentos Exigidos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Documentos Exigidos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function clienteModalInfoDocumentosExigidos(cliente_id = '') {
    if (cliente_id == '') { cliente_id = document.getElementById('mi_cli_cliente_id').value; }

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    // Acessar rota
    fetch(url_atual+'clientes/modalInfo/documentos_exigidos/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(async data => {
        // Lendo json
        let clientes_documentos_exigidos = data.clientes_documentos_exigidos;

        // Grade
        let grade = '';

        // Montar Grade
        if (clientes_documentos_exigidos.length > 0) {
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
            for (const dado of clientes_documentos_exigidos) {
                // Documento
                let documentoName = dado.documentoName;

                // Documento Caminho
                let documento_caminho = dado.clienteDocumentoCaminho;

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
        document.getElementById('cli_documentos_exigidos_grade').innerHTML = grade;

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
                let qtd_registros = clientes_documentos_exigidos.filter(reg => reg.documento_fonte_id === documento_fonte_id);

                if (qtd_registros.length > 0) {
                    if (idPrimeiroFiltro == 0) { idPrimeiroFiltro = documento_fonte_id; }

                    documentoFonteFiltro += `
                            <button type="button"
                                class="btn btn-warning btn-sm flex-fill text-center py-2 font-size-10"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Filtrar Documentos"
                                onclick="clienteModalInfoDocumentosExigidosFiltrar(${documento_fonte_id});">
                                ${documento_fonte_name} (${qtd_registros.length})
                            </button>`;
                }
            });

            documentoFonteFiltro += '       </div>';
            documentoFonteFiltro += '   </div>';
            documentoFonteFiltro += '</div>';
        }

        // Retornar Documento Filtro (Botões)
        document.getElementById('cli_documentos_exigidos_grade_botoes').innerHTML = documentoFonteFiltro;

        // Primeiro Filtro
        clienteModalInfoDocumentosExigidosFiltrar(idPrimeiroFiltro);
    }).catch(error => {
        alert('Erro clienteModalInfoDocumentosExigidos: '+error);
    }).finally(() => {
        configurarDataTable(3);
    });
}

async function clienteModalInfoDocumentosExigidosFiltrar(documento_fonte_id) {
    const todasLinhas = document.querySelectorAll("#cli_documentos_exigidos_grade table tbody tr");

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

// Modal INFO - Editar Lojas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Editar Lojas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function validar_frm_editar_lojas() {
    var validacao_ok = true;
    var mensagem = '';

    // Campo: editar_lojas_cliente_id (requerido)
    if (validacao({op:1, value:document.getElementById('editar_lojas_cliente_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.'+'<br>';
    }

    // Campo: cli_editar_lojas_edificacao_nivel_id (requerido)
    if (validacao({ op: 1, value: document.getElementById('cli_editar_lojas_edificacao_nivel_id').value }) === false) {
        validacao_ok = false;
        mensagem += 'Edificação Nível requerido.' + '<br>';
    }

    // Campo: cli_editar_lojas_luc (requerido)
    if (validacao({ op: 1, value: document.getElementById('cli_editar_lojas_luc').value }) === false) {
        validacao_ok = false;
        mensagem += 'Luc requerido.' + '<br>';
    }

    // Campo: cli_editar_lojas_ordem (requerido)
    if (validacao({ op: 1, value: document.getElementById('cli_editar_lojas_ordem').value }) === false) {
        validacao_ok = false;
        mensagem += 'Ordem requerido.' + '<br>';
    }

    // Mensagem
    if (validacao_ok === false) {
        var texto = '<div class="pt-3">';
        texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
        texto += '</div>';

        alertSwal('warning', 'Validação', texto, 'true', 5000);
    }

    // Retorno
    return validacao_ok;
}

function DOMContentLoadedEditarLojas() {
    const frm_editar_lojas_cli_botao_salvar_operacao = document.getElementById('frm_editar_lojas_cli_botao_salvar_operacao');

    if (frm_editar_lojas_cli_botao_salvar_operacao) {
        frm_editar_lojas_cli_botao_salvar_operacao.addEventListener('click', function () {
            // FormData
            var formulario = document.getElementById('frm_editar_lojas_cli');
            var formData = new FormData(formulario);
            var url_atual = window.location.protocol + '//' + window.location.host + '/';
            var editar_lojas_cliente_id = document.getElementById('editar_lojas_cliente_id').value;

            // Criticando campos
            if (validar_frm_editar_lojas() === false) { return false; }

            // Acessar rota
            fetch(url_atual + 'clientes/editarLoja/editar_loja', {
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
                    // Montando Grade de Lojas
                    clienteModalInfoLojas(editar_lojas_cliente_id);

                    formulario.reset();

                    alertSwal('success', 'Clientes', data.success, 'true', 20000);

                    // Atualizar chamando função Dados e Montar Grade
                    await clienteModalInfoDados(editar_lojas_cliente_id, 16);
                } else if (data.error) {
                    alertSwal('warning', 'Clientes', data.error, 'true', 20000);
                } else {
                    alert('Erro interno');
                }
            }).catch(error => {
                alert('Erro Clientes Editar Loja: ' + error);
            });
        });
    }
}

async function clienteModalInfoEditarLojasCreate() {
    const frm_editar_lojas_cli = document.getElementById('frm_editar_lojas_cli');
    const frm_editar_lojas_cli_botao_salvar_operacao = document.getElementById('frm_editar_lojas_cli_botao_salvar_operacao');
    const cli_editar_lojas_cliente_loja_id = document.getElementById('cli_editar_lojas_cliente_loja_id');
    const cli_editar_lojas_operacao = document.getElementById('cli_editar_lojas_operacao');

    // Formulário
    frm_editar_lojas_cli.reset();

    // Botão
    frm_editar_lojas_cli_botao_salvar_operacao.classList.remove('btn-primary');
    frm_editar_lojas_cli_botao_salvar_operacao.classList.add('btn-success');
    frm_editar_lojas_cli_botao_salvar_operacao.innerHTML = 'Salvar Operação (Incluir)';

    // Campos
    cli_editar_lojas_cliente_loja_id.value = 0;
    cli_editar_lojas_operacao.value = 'create';

    await clienteModalInfoControle(15);
}

async function clienteModalInfoEditarLojasEdit(cliente_loja_id, edificacao_nivel_id, luc, ordem, subordinado_cliente_id) {
    const frm_editar_lojas_cli = document.getElementById('frm_editar_lojas_cli');
    const frm_editar_lojas_cli_botao_salvar_operacao = document.getElementById('frm_editar_lojas_cli_botao_salvar_operacao');
    const cli_editar_lojas_cliente_loja_id = document.getElementById('cli_editar_lojas_cliente_loja_id');
    const cli_editar_lojas_operacao = document.getElementById('cli_editar_lojas_operacao');
    const cli_editar_lojas_edificacao_nivel_id = document.getElementById('cli_editar_lojas_edificacao_nivel_id');
    const cli_editar_lojas_luc = document.getElementById('cli_editar_lojas_luc');
    const cli_editar_lojas_ordem = document.getElementById('cli_editar_lojas_ordem');
    const cli_editar_lojas_subordinado_cliente_id = document.getElementById('cli_editar_lojas_subordinado_cliente_id');

    // Formulário
    frm_editar_lojas_cli.reset();

    // Botão
    frm_editar_lojas_cli_botao_salvar_operacao.classList.remove('btn-success');
    frm_editar_lojas_cli_botao_salvar_operacao.classList.add('btn-primary');
    frm_editar_lojas_cli_botao_salvar_operacao.innerHTML = 'Salvar Operação (Alterar)';

    // Campos
    cli_editar_lojas_cliente_loja_id.value = cliente_loja_id;
    cli_editar_lojas_operacao.value = 'edit';
    cli_editar_lojas_edificacao_nivel_id.value = edificacao_nivel_id;
    cli_editar_lojas_luc.value = luc;
    cli_editar_lojas_ordem.value = ordem;
    cli_editar_lojas_subordinado_cliente_id.value = subordinado_cliente_id;

    await clienteModalInfoControle(15);
}

async function clienteModalInfoEditarLojasDeletar(cliente_loja_id) {
    // Confirmação de Delete
    const confirmed = await alertSwalConfirmacao();
    if (confirmed) {
        var url_atual = window.location.protocol+'//'+window.location.host+'/';

        // Acessar rota
        fetch(url_atual+'clientes/modalInfo/deletar_loja/'+cliente_loja_id, {
            method: 'DELETE',
            headers: {
                'REQUEST-ORIGIN': 'fetch',
                'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        }).then(response => {
            return response.json();
        }).then(async data => {
            // Lendo dados
            if (data.success) {
                alertSwal('success', 'Clientes', data.success, 'true', 2000);

                // Dados
                let cliente_id = document.getElementById('mi_cli_cliente_id').value;

                // Atualizar chamando função Dados e Montar Grade
                await clienteModalInfoDados(cliente_id, 16);
            } else if (data.error) {
                alertSwal('error', 'Clientes', data.error, 'true', 2000);
            } else if (data.error_permissao) {
                alertSwal('warning', "Permissão Negada", '', 'true', 2000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro clienteModalInfoEditarLojasDeletar:'+error);
        });
    }
}
// Modal INFO - Editar Lojas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Editar Lojas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Lojas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Lojas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function clienteModalInfoLojas(cliente_id = '') {
    if (cliente_id == '') { cliente_id = document.getElementById('mi_cli_cliente_id').value; }

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    // Acessar rota
    fetch(url_atual+'clientes/modalInfo/lojas/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        // Lendo json
        let clientes_lojas = data.clientes_lojas;

        // Permissões
        let permissoes = data.permissoes;
        const permissao_list = permissoes.some(p => p.permissao === 'clientes_list');
        const permissao_show = permissoes.some(p => p.permissao === 'clientes_show');
        const permissao_edit = permissoes.some(p => p.permissao === 'clientes_edit');
        const permissao_destroy = permissoes.some(p => p.permissao === 'clientes_destroy');

        // Grade
        let grade = '';

        // Montar Grade
        if (clientes_lojas.length > 0) {
            grade += '<table class="table align-middle table-nowrap table-check table-sm">'; //NÃO COLOCAR DATATABLE POIS O FILTRO NÃO FUNCIONA
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Edificação Nível</th>';
            grade += '          <th scope="col">LUC (Loja de Unidade Comercial)</th>';
            grade += '          <th scope="col">Cliente ocupando a LUC</th>';
            grade += '          <th scope="col">Ordem</th>';
            grade += '          <th class="text-center" scope="col">Ações</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            // Varrer
            clientes_lojas.forEach(dado => {
                // Dados
                let edificacao_nivel_id = dado.edificacao_nivel_id ?? '';
                let luc = dado.luc ?? '';
                let ordem = dado.ordem ?? '';
                let subordinado_cliente_id = dado.subordinado_cliente_id ?? '';
                let edificacaoName = dado.edificacaoName ?? '';
                let edificacaoNivelName = dado.edificacaoNivelName ?? '';
                let subordinadoClienteName = dado.subordinadoClienteName ?? '';

                // Ações
                let acoes = ``;

                acoes += `<div class="d-flex justify-content-center gap-2">`;

                if (permissao_edit) {
                    acoes += `<button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar Dados" onclick="clienteModalInfoEditarLojasEdit(${dado.id}, ${edificacao_nivel_id}, '${luc}', ${ordem}, ${subordinado_cliente_id});">`;
                    acoes += `<i class="fas fa-pencil-alt"></i></button>`;
                }

                if (permissao_destroy) {
                    acoes += `<button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Dados" onclick="clienteModalInfoEditarLojasDeletar('${dado.id}');">`;
                    acoes += `<i class="fa fa-trash-alt font-size-18"></i></button>`;
                }

                acoes += `</div>`;

                // TR
                grade += '<tr class="loja_fonte_' + dado.edificacaoId + '">';
                grade += '  <td>' + edificacaoName + ' - ' + edificacaoNivelName + '</td>';
                grade += '  <td>' + luc + '</td>';
                grade += '  <td>' + subordinadoClienteName + '</td>';
                grade += '  <td>' + ordem + '</td>';
                grade += '  <td>' + acoes + '</td>';

                grade += '</tr>';
            });

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhuma loja encontrada.';
        }

        // Retornar Grade
        document.getElementById('cli_lojas_grade').innerHTML = grade;

        // Colocar Botões para filtro das lojas quanto a Fonte
        var lojaFonteFiltro = '';
        var idPrimeiroFiltro = 0; // Guardar um id para depois que a grade for mostrada executar o primeiro Filtro)
        if (grade != 'Nenhuma loja encontrada.') {
            // Lendo json
            let loja_fontes = data.loja_fontes;

            lojaFonteFiltro += '<div class="col-12 order-3 order-lg-2 align-self-center">';
            lojaFonteFiltro += '   <div class="text-lg-center mt-4 mt-lg-0">';
            lojaFonteFiltro += '       <div class="d-flex flex-wrap justify-content-start gap-2">';

            // Varrer
            loja_fontes.forEach(dado => {
                let loja_fonte_id = dado.id;
                let loja_fonte_name = dado.name;
                let qtd_registros = clientes_lojas.filter(reg => reg.edificacaoId === loja_fonte_id);

                if (qtd_registros.length > 0) {
                    if (idPrimeiroFiltro == 0) { idPrimeiroFiltro = loja_fonte_id; }

                    lojaFonteFiltro += `
                            <button type="button"
                                class="btn btn-warning btn-sm flex-fill text-center py-2 font-size-10"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Filtrar Lojas"
                                onclick="clienteModalInfoLojasFiltrar(${loja_fonte_id});">
                                ${loja_fonte_name} (${qtd_registros.length})
                            </button>`;
                }
            });

            lojaFonteFiltro += '       </div>';
            lojaFonteFiltro += '   </div>';
            lojaFonteFiltro += '</div>';
        }

        // Retornar Loja Filtro (Botões)
        document.getElementById('cli_lojas_grade_botoes').innerHTML = lojaFonteFiltro;

        // Primeiro Filtro
        clienteModalInfoLojasFiltrar(idPrimeiroFiltro);
    }).catch(error => {
        alert('Erro clienteModalInfoLojas: '+error);
    }).finally(() => {
        configurarDataTable(3);
    });
}

async function clienteModalInfoLojasFiltrar(loja_fonte_id) {
    const todasLinhas = document.querySelectorAll("#cli_lojas_grade table tbody tr");

    // Primeiro: mostra todas as linhas
    todasLinhas.forEach(linha => linha.style.display = '');

    // Depois: aplica o filtro
    todasLinhas.forEach(linha => {
        if (!linha.classList.contains(`loja_fonte_${loja_fonte_id}`)) {
            linha.style.display = 'none';
        }
    });
}
// Modal INFO - Lojas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Lojas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Propostas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Propostas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function clienteModalInfoPropostas(cliente_id = '') {
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
// Modal INFO - Propostas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Propostas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Órdens Serviços - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Órdens Serviços - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function clienteModalInfoOrdensServicos(cliente_id = '') {
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
// Modal INFO - Órdens Serviços - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Órdens Serviços - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Visitas Técnicas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Visitas Técnicas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function clienteModalInfoVisitasTecnicas(cliente_id = '') {
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
// Modal INFO - Visitas Técnicas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Visitas Técnicas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Brigadas Incêndios - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Brigadas Incêndios - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function clienteModalInfoBrigadasIncendios(cliente_id = '') {
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
// Modal INFO - Brigadas Incêndios - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Brigadas Incêndios - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Da Rede - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Da Rede - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function clienteModalInfoClientesRede(cliente_id = '') {
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
            grade += '          <th class="text-center" scope="col">Ações</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            //Varrer
            clientes_rede.forEach(dado => {
                let verCliente = `<button type="button" class="btn btn-outline-info btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Registro" onclick="visualizarCliente(${dado.id});"><i class="fa fa-eye"></i></button>`;

                grade += '<tr>';
                grade += '  <td>' + dado.name + '</td>';
                grade += '  <td>' + aplicarMascaraJs(dado.cnpj, '##.###.###/####-##') + '</td>';
                grade += '  <td class="text-center">' + verCliente + '</td>';
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
// Modal INFO - Da Rede - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Da Rede - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal INFO - Do Principal - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Do Principal - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function clienteModalInfoClientesPrincipal(cliente_id = '') {
    if (!cliente_id) { cliente_id = document.getElementById('mi_cli_cliente_id').value; }

    const url = `${window.location.origin}/clientes/modalInfo/clientes_principal/${cliente_id}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'REQUEST-ORIGIN': 'fetch' }
        });

        const clientes_principal = await response.json();

        let grade = '';

        if (clientes_principal.length > 0) {
            grade += `<table class="table align-middle table-nowrap table-check table-sm">
                        <thead class="table-light">
                            <tr>
                                <th class="text-center" style="width:30px">Status</th>
                                <th>Cliente</th>
                                <th>CNPJ</th>
                                <th class="text-center" scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>`;

            // buscar todos os percentuais em paralelo
            const percentuais = await Promise.all(
                clientes_principal.map(cliente =>
                    clienteModalInfoClientesPrincipalDocumentosExigidosStatus(cliente.id)
                )
            );

            for (let i = 0; i < clientes_principal.length; i++) {
                const dado = clientes_principal[i];
                const statusPercentual = percentuais[i];

                let status = `<span class="badge rounded-pill bg-danger" title="Percentual atingido: ${statusPercentual}%">&nbsp;</span>&nbsp;${statusPercentual}%`;

                if (statusPercentual >= 75 && statusPercentual < 100) {
                    status = `<span class="badge rounded-pill bg-warning" title="Percentual atingido: ${statusPercentual}%">&nbsp;</span>&nbsp;${statusPercentual}%`;
                } else if (statusPercentual >= 100) {
                    status = `<span class="badge rounded-pill bg-success" title="Percentual atingido: ${statusPercentual}%">&nbsp;</span>&nbsp;${statusPercentual}%`;
                }

                const verCliente = `<button type="button" class="btn btn-outline-info btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Registro" onclick="visualizarCliente(${dado.id});"><i class="fa fa-eye"></i></button>`;

                grade += `<tr>
                            <td>${status}</td>
                            <td>${dado.name}</td>
                            <td>${aplicarMascaraJs(dado.cnpj, '##.###.###/####-##')}</td>
                            <td class="text-center">${verCliente}</td>
                        </tr>`;
            }

            grade += `</tbody></table>`;
        } else {
            grade = 'Nenhum registro encontrado.';
        }

        document.getElementById('cli_clientes_principal_grade').innerHTML = grade;
    } catch (error) {
        alert('Erro clienteModalInfoClientesPrincipal: ' + error);
    }
}

async function clienteModalInfoClientesPrincipalDocumentosExigidosStatus(cliente_id) {
    if (!cliente_id) return 0;

    const url = `${window.location.origin}/clientes/modalInfo/documentos_exigidos/${cliente_id}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'REQUEST-ORIGIN': 'fetch' }
        });

        const data = await response.json();
        const documentos = data.clientes_documentos_exigidos || [];

        const qtdDocumentosExigidos = documentos.length;

        // Executa todas as verificações em paralelo
        const resultados = await Promise.all(
            documentos.map(dado => arquivoExiste(dado.clienteDocumentoCaminho))
        );

        const qtdDocumentosExigidosExiste = resultados.filter(Boolean).length;

        const percentual = qtdDocumentosExigidos > 0 ? (qtdDocumentosExigidosExiste / qtdDocumentosExigidos) * 100 : 0;

        return percentual;
    } catch (error) {
        alert('Erro clienteModalInfoClientesPrincipalDocumentosExigidosStatus: ' + error);
        return 0;
    }
}// Modal INFO - Do Principal - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal INFO - Do Principal - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

document.addEventListener("DOMContentLoaded", () => {
    acertarFormulario();
    DOMContentLoadedEditarDocumentos();
    DOMContentLoadedEditarDocumentosExigidos();
    DOMContentLoadedEditarLojas();
    DOMContentLoadedEditarSistemasPreventivos();
    DOMContentLoadedLogotipoPrincipal();
    DOMContentLoadedLogotipoRelatorios();
    DOMContentLoadedLogotipoCartaoEmergencial();
    DOMContentLoadedLogotipoMenu();
    DOMContentLoadedFormularioPadrao();
});
