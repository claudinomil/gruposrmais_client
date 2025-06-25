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

function validar_frm_upload_documentos_pdfs() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: upload_documentos_pdfs_cliente_id (requerido)
    if (validacao({op:1, value:document.getElementById('upload_documentos_pdfs_cliente_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.'+'<br>';
    }

    //Campo: upload_documentos_pdfs_cli_acao (requerido)
    if (validacao({op:1, value:document.getElementById('upload_documentos_pdfs_cli_acao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Ação do Formulário requerido.'+'<br>';
    }

    //Campo: cli_documentos_pdfs_documento (requerido)
    if (validacao({op:1, value:document.getElementById('cli_documentos_pdfs_documento').value}) === false) {
        validacao_ok = false;
        mensagem += 'Documento requerido.'+'<br>';
    }

    //Campo: cli_documentos_pdfs_data_documento (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('cli_documentos_pdfs_data_documento').value}) === true) {
        //Campo: cli_documentos_pdfs_data_documento (Data Válida)
        if (validacao({op:8, value:document.getElementById('cli_documentos_pdfs_data_documento').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data documento Inválida.'+'<br>';
        }
    }

    //Campo: cli_documentos_pdfs_file (arquivo PDF requerido)
    if (validacao({op:16, id:'cli_documentos_pdfs_file'}) === false) {
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

//Busca dados e monta o modal para o submódulo clientes
function clienteModalInfo(id='') {
    if (id == '') {id = document.getElementById('registro_id').value;}

    //Abrir Modal
    new bootstrap.Modal(document.getElementById('cliente_modal_info')).show();

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

        //Campo cli_documentos_pdfs_documento'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        const selectDocumento = document.getElementById('cli_documentos_pdfs_documento');
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
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Passando dados cliente'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Header
        const header_mi_cli_nome = document.querySelector('#cliente_modal_info #header #mi_cli_nome');
        const header_mi_cli_email = document.querySelector('#cliente_modal_info #header #mi_cli_email');

        header_mi_cli_nome.innerHTML = cliente.name;
        header_mi_cli_email.innerHTML = cliente.email;

        //Tab Dados
        const tab_cli_dados_mi_cli_status = document.querySelector('#cliente_modal_info #tab_cli_dados #mi_cli_status');
        const tab_cli_dados_mi_cli_tipo = document.querySelector('#cliente_modal_info #tab_cli_dados #mi_cli_tipo');
        const tab_cli_dados_mi_cli_cpf_cnpj = document.querySelector('#cliente_modal_info #tab_cli_dados #mi_cli_cpf_cnpj');
        const tab_cli_dados_mi_cli_nome = document.querySelector('#cliente_modal_info #tab_cli_dados #mi_cli_nome');
        const tab_cli_dados_mi_cli_telefones = document.querySelector('#cliente_modal_info #tab_cli_dados #mi_cli_telefones');
        const tab_cli_dados_mi_cli_celulares = document.querySelector('#cliente_modal_info #tab_cli_dados #mi_cli_celulares');
        const tab_cli_dados_mi_cli_data_nascimento = document.querySelector('#cliente_modal_info #tab_cli_dados #mi_cli_data_nascimento');

        tab_cli_dados_mi_cli_status.innerHTML = status;
        tab_cli_dados_mi_cli_tipo.innerHTML = tipo;
        tab_cli_dados_mi_cli_cpf_cnpj.innerHTML = cpf_cnpj;
        tab_cli_dados_mi_cli_nome.innerHTML = cliente.name;
        tab_cli_dados_mi_cli_telefones.innerHTML = formatarTelCel(1, cliente.telefone_1)+'  '+formatarTelCel(1, cliente.telefone_2);
        tab_cli_dados_mi_cli_celulares.innerHTML = formatarTelCel(2, cliente.celular_1)+'  '+formatarTelCel(2, cliente.celular_2);
        tab_cli_dados_mi_cli_data_nascimento.innerHTML = formatarData(2, cliente.data_nascimento);

        //Upload Documento PDF
        const tab_documento_pdf_upload_documentos_pdfs_cliente_id = document.querySelector('#cliente_modal_info #tab_cli_documentos_upload #upload_documentos_pdfs_cliente_id');

        tab_documento_pdf_upload_documentos_pdfs_cliente_id.value = cliente.id;
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Montando Grade de Documentos PDF
        clienteModalInfoGradeDocumentosPdf({cliente_id:cliente.id, id_elemento_visualisacao:'cli_documentos_grade', btn_visualizar:true, btn_deletar:true});
    }).catch(error => {
        alert('Erro clienteModalInfo: ', error);
    });
}

//Busca dados e monta grade de documentos pdfs do submódulo clientes
function clienteModalInfoGradeDocumentosPdf({cliente_id='', id_elemento_visualisacao='', btn_visualizar=true, btn_deletar=true}) {
    if (id_elemento_visualisacao == '') {return false;}
    if (cliente_id == '') {cliente_id = document.getElementById('registro_id').value;}

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'clientes/modalInfo/documentos_pdf/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let documentos = data;

        //Grade
        let grade = '';

        //Montar Grade
        if (documentos.length > 0) {
            grade += '<table class="table">';
            grade += '  <thead>';
            grade += '      <tr>';
            grade += '          <th scope="col">#</th>';
            grade += '          <th scope="col">Documento</th>';
            grade += '          <th scope="col">Data</th>';
            grade += '          <th scope="col">Aviso</th>';

            if (btn_visualizar === true || btn_deletar === true) {
                grade += '          <th scope="col">Ações</th>';
            }

            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            //Varrer
            let ln = 0;
            documentos.forEach(dado => {
                ln++;

                //Documento
                let documento_texto = '';

                if (dado.documento == 1) {documento_texto = 'Projeto SCIP';}
                if (dado.documento == 2) {documento_texto = 'Laudo Exigências';}
                if (dado.documento == 3) {documento_texto = 'Certificado Aprovação';}
                if (dado.documento == 4) {documento_texto = 'Certificado Aprovação Simplificado';}
                if (dado.documento == 5) {documento_texto = 'Certificado Aprovação Assistido';}
                if (dado.documento == 6) {documento_texto = 'CNPJ';}
                if (dado.documento == 7) {documento_texto = 'Representante Legal';}
                if (dado.documento == 8) {documento_texto = 'Contrato Social';}
                if (dado.documento == 9) {documento_texto = 'RGI';}
                if (dado.documento == 10) {documento_texto = 'Contrato Locação';}
                if (dado.documento == 11) {documento_texto = 'CPF';}
                if (dado.documento == 12) {documento_texto = 'Representante Legal';}
                if (dado.documento == 13) {documento_texto = 'Contrato Social';}
                if (dado.documento == 14) {documento_texto = 'RGI';}
                if (dado.documento == 15) {documento_texto = 'Contrato Locação';}
                if (dado.documento == 16) {documento_texto = 'Memória Descritiva';}
                if (dado.documento == 17) {documento_texto = 'Certificado Funcionamento';}

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

                if (btn_visualizar === true || btn_deletar === true) {
                    if (btn_visualizar === true) {
                        acoes += '  <div class="col-6">';
                        acoes += '      <button type="button" class="btn btn-outline-info text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Documento" onclick="window.open(\'' + dado.caminho + '\', \'_blank\');"><i class="fa fa-file-pdf font-size-18"></i></button>';
                        acoes += '  </div>';
                    }

                    if (btn_deletar === true) {
                        acoes += '  <div class="col-6">';
                        acoes += '      <button type="button" class="btn btn-outline-danger text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Documento" onclick="clienteModalInfoDeletarDocumentoPdf(' + dado.id + ');"><i class="fa fa-trash-alt font-size-18"></i></button>';
                        acoes += '  </div>';
                    }
                }

                acoes += '</div>';

                //TR
                grade += '<tr>';
                grade += '  <th scope="row">'+ln+'</th>';
                grade += '  <td>'+documento_texto+'</td>';
                grade += '  <td>'+formatarData(2, dado.data_documento)+'</td>';
                grade += '  <td>'+aviso_texto+'</td>';

                if (btn_visualizar === true || btn_deletar === true) {
                    grade += '  <td>'+acoes+'</td>';
                }

                grade += '</tr>';
            });

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum documento encontrado.';
        }

        //Retornar Grade
        document.getElementById(id_elemento_visualisacao).innerHTML = grade;
    }).catch(error => {
        alert('Erro clienteModalInfoGradeDocumentosPdf: '+error);
    });
}

//Função para deletar documento da grade
function clienteModalInfoDeletarDocumentoPdf(cliente_documento_id) {
    //Confirmação de Delete
    alertSwalConfirmacao(function (confirmed) {
        if (confirmed) {
            var url_atual = window.location.protocol+'//'+window.location.host+'/';

            //Acessar rota
            fetch(url_atual+'clientes/modalInfo/deletar_documento_pdf/'+cliente_documento_id, {
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
                    let cliente_id = document.getElementById('upload_documentos_pdfs_cliente_id').value;

                    //Montar Grade
                    clienteModalInfoGradeDocumentosPdf({cliente_id:cliente_id, id_elemento_visualisacao:'cli_documentos_grade'});
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
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    //Acertar formulário para entrada de dados de pessoa Jurídica e Física
    if ($('#tipo').val() == 1) {
        $('.pessoa_juridica').show();
        $('.pessoa_fisica').hide();

        $('#label_data_nascimento').html('Data Abertura');
    }

    if ($('#tipo').val() == 2) {
        $('.pessoa_juridica').hide();
        $('.pessoa_fisica').show();

        $('#label_data_nascimento').html('Data Nascimento');
    }

    //Botão: frm_upload_documentos_pdfs_cli_executar''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_documentos_pdfs_cli_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_documentos_pdfs_cli');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';
        var upload_documentos_pdfs_cliente_id = document.getElementById('upload_documentos_pdfs_cliente_id').value;

        //Tratar Botões
        document.getElementById('frm_upload_documentos_pdfs_cli_executar').style.display = 'block';

        //Criticando campos
        if (validar_frm_upload_documentos_pdfs() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'clientes/uploadDocumentoPdf/upload_documento_pdf', {
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
                clienteModalInfoGradeDocumentosPdf({cliente_id:upload_documentos_pdfs_cliente_id, id_elemento_visualisacao:'cli_documentos_grade', btn_visualizar:true, btn_deletar:true});

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
        if ($('#tipo').val() == 1) {
            $('.pessoa_juridica').show();
            $('.pessoa_fisica').hide();

            $('#label_data_nascimento').html('Data Abertura');
        }

        if ($('#tipo').val() == 2) {
            $('.pessoa_juridica').hide();
            $('.pessoa_fisica').show();

            $('#label_data_nascimento').html('Data Nascimento');
        }
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

            //Indo no Controller buscar dados na API
            $.ajax({
                type:'GET',
                url: 'https://receitaws.com.br/v1/cnpj/'+cnpj,
                data: '',
                dataType: 'jsonp',
                cache: false,
                contentType: false,
                processData: false,
                success: function (response) {
                    //retorno da API
                    /*
                    abertura	"15/07/2016"
                    situacao	"INAPTA"
                    tipo	"MATRIZ"
                    nome	"CLAUDINO MIL HOMENS DE MORAES 01798241714"
                    fantasia	"CMDS INFORMATICA"
                    porte	"MICRO EMPRESA"
                    natureza_juridica	"213-5 - Empresário (Individual)"
                    logradouro	"RUA LINS DE VASCONCELOS"
                    numero	"579"
                    complemento	"APT 102"
                    municipio	"RIO DE JANEIRO"
                    bairro	"LINS DE VASCONCELOS"
                    uf	"RJ"
                    cep	"20.710-130"
                    email	"claudinomoraes@yahoo.com.br"
                    telefone	"(21) 6421-0128"
                    data_situacao	"12/01/2022"
                    motivo_situacao	"OMISSÃO DE DECLARAÇÕES"
                    cnpj	"25.221.403/0001-91"
                    ultima_atualizacao	"2023-03-11T23:59:59.000Z"
                    status	"OK"
                    efr	""
                    situacao_especial	""
                    data_situacao_especial	""
                    atividade_principal
                    0
                    code	"00.00-0-00"
                    text	"********"
                    atividades_secundarias
                    0
                    code	"00.00-0-00"
                    text	"Não informada"
                    capital_social	"1.00"
                    qsa	[]
                    extra	{}
                    billing
                    free	true
                    database	true
                    */

                    var dados = response;

                    // alert(dados.status);

                    if (dados.status != 'OK') {
                        alert(dados.message);
                    } else {
                        $('#td_api_situacao').html(dados.situacao);
                        $('#hidden_api_situacao').val(dados.situacao);
                        $('#td_api_tipo').html(dados.tipo);
                        $('#hidden_api_tipo').val(dados.tipo);
                        $('#td_api_natureza_juridica').html(dados.natureza_juridica);
                        $('#hidden_api_natureza_juridica').val(dados.natureza_juridica);
                        $('#td_api_nome').html(dados.nome);
                        $('#hidden_api_nome').val(dados.nome);
                        $('#td_api_fantasia').html(dados.fantasia);
                        $('#hidden_api_fantasia').val(dados.fantasia);
                        $('#td_api_cnpj').html(dados.cnpj);
                        $('#hidden_api_cnpj').val(dados.cnpj);
                        $('#td_api_abertura').html(dados.abertura);
                        $('#hidden_api_abertura').val(dados.abertura);
                        $('#td_api_cep').html(dados.cep.replace(/[^\d]+/g,""));
                        $('#hidden_api_cep').val(dados.cep.replace(/[^\d]+/g,""));
                        $('#td_api_telefone').html(dados.telefone);
                        $('#hidden_api_telefone').val(dados.telefone);
                        $('#td_api_email').html(dados.email);
                        $('#hidden_api_email').val(dados.email);
                        $('#td_api_logradouro').html(dados.logradouro);
                        $('#hidden_api_logradouro').val(dados.logradouro);
                        $('#td_api_numero').html(dados.numero);
                        $('#hidden_api_numero').val(dados.numero);
                        $('#td_api_complemento').html(dados.complemento);
                        $('#hidden_api_complemento').val(dados.complemento);
                        $('#td_api_bairro').html(dados.bairro);
                        $('#hidden_api_bairro').val(dados.bairro);
                        $('#td_api_municipio').html(dados.municipio);
                        $('#hidden_api_municipio').val(dados.municipio);
                        $('#td_api_uf').html(dados.uf);
                        $('#hidden_api_uf').val(dados.uf);
                    }

                    //abrir modal
                    $('#modal_api').modal('show');
                },
                error: function(){
                    alert('Erro na API.');
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
