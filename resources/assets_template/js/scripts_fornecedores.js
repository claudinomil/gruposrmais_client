function validar_frm_fornecedores() {
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

    //Campo: agencia (não requerido / mínimo de 2 caracteres / somente números)
    if (validacao({op:1, value:document.getElementById('agencia').value}) === true) {
        //Campo: agencia (somente números)
        if (validacao({op:4, value:document.getElementById('agencia').value}) === false) {
            validacao_ok = false;
            mensagem += 'Agência só pode conter dígitos de 0 a 9.'+'<br>';
        }

        //Campo: agencia (mínimo de 2 caracteres)
        if (validacao({op:2, value:document.getElementById('agencia').value, minCaracteres:2}) === false) {
            validacao_ok = false;
            mensagem += 'Agência precisa ter no mínimo 2 caracteres.'+'<br>';
        }
    }

    //Campo: conta (não requerido / mínimo de 3 caracteres / somente números)
    if (validacao({op:1, value:document.getElementById('conta').value}) === true) {
        //Campo: conta (somente números)
        if (validacao({op:4, value:document.getElementById('conta').value}) === false) {
            validacao_ok = false;
            mensagem += 'Conta só pode conter dígitos de 0 a 9.'+'<br>';
        }

        //Campo: conta (mínimo de 3 caracteres)
        if (validacao({op:2, value:document.getElementById('conta').value, minCaracteres:3}) === false) {
            validacao_ok = false;
            mensagem += 'Conta precisa ter no mínimo 3 caracteres.'+'<br>';
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

$(document).ready(function () {
    if ($('#frm_fornecedores').length) {
        $('#frm_fornecedores').validate({
            rules: {
                status: {required: true},
                tipo: {required: true},
                name: {
                    required: true,
                    minlength: 3
                },
                nome_fantasia: {
                    required: false,
                    minlength: 3
                },
                inscricao_estadual: {
                    required: false,
                    numberMethod: true
                },
                inscricao_municipal: {
                    required: false,
                    numberMethod: true
                },
                cpf: {
                    required: false,
                    cpfMethod: true
                },
                cnpj: {
                    required: false,
                    cnpjMethod: true
                },
                identidade_orgao_id: {
                    required: false,
                    idMethod: true
                },
                identidade_estado_id: {
                    required: false,
                    idMethod: true
                },
                identidade_numero: {
                    required: false,
                    numberMethod: true
                },
                identidade_data_emissao: {
                    required: false,
                    dateMethod: true
                },
                genero_id: {
                    required: false,
                    idMethod: true
                },
                data_nascimento: {
                    required: false,
                    dateMethod: true
                },
                cep: {
                    required: false,
                    cepMethod: true
                },
                numero: {
                    required: false,
                    numberMethod: true
                },
                complemento: {
                    required: false,
                    minlength: 1
                },
                cep_cobranca: {
                    required: false,
                    cepMethod: true
                },
                numero_cobranca: {
                    required: false,
                    numberMethod: true
                },
                complemento_cobranca: {
                    required: false,
                    minlength: 1
                },
                banco_id: {
                    required: false,
                    idMethod: true
                },
                agencia: {
                    required: false,
                    minlength: 2,
                    numberMethod: true
                },
                conta: {
                    required: false,
                    minlength: 3,
                    numberMethod: true
                },
                email: {
                    required: false,
                    email: true
                },
                site: {
                    required: false,
                    url: true
                },
                telefone_1: {
                    required: false,
                    telefoneMethod: true
                },
                telefone_2: {
                    required: false,
                    telefoneMethod: true
                },
                celular_1: {
                    required: false,
                    celularMethod: true
                },
                celular_2: {
                    required: false,
                    celularMethod: true
                },
            },
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                element.closest('.form-group').append(error);
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('is-invalid');
            }
        });
    }

    //Acertar formulário
    acertarFormulario();

    $('#tipo').change(function (e) {
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
