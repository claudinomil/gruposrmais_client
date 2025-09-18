function validar_frm_clientes_executivos() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: cliente_id (requerido)
    if (validacao({op:1, value:document.getElementById('cliente_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.'+'<br>';
    }

    //Campo: executivo_nome (requerido)
    if (validacao({op:1, value:document.getElementById('executivo_nome').value}) === false) {
        validacao_ok = false;
        mensagem += 'Executivo Nome requerido.'+'<br>';
    }

    //Campo: executivo_funcao (requerido)
    if (validacao({op:1, value:document.getElementById('executivo_funcao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Executivo Função requerido.'+'<br>';
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

    //Campo: data_nascimento (Data Válida)
    if (validacao({op:8, value:document.getElementById('data_nascimento').value}) === false) {
        validacao_ok = false;
        mensagem += 'Data Nascimento Inválida.'+'<br>';
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


    //Campo: upload_documentos_cliente_executivo_id (requerido)
    if (validacao({op:1, value:document.getElementById('upload_documentos_cliente_executivo_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente Executivo requerido.'+'<br>';
    }

    //Campo: upload_documentos_cex_acao (requerido)
    if (validacao({op:1, value:document.getElementById('upload_documentos_cex_acao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Ação do Formulário requerido.'+'<br>';
    }

    //Campo: cex_documentos_descricao (requerido)
    if (validacao({op:1, value:document.getElementById('cex_documentos_descricao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Descrição documento requerido.'+'<br>';
    }

    //Campo: cex_documentos_data_documento (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('cex_documentos_data_documento').value}) === true) {
        //Campo: cex_documentos_data_documento (Data Válida)
        if (validacao({op:8, value:document.getElementById('cex_documentos_data_documento').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data documento Inválida.'+'<br>';
        }
    }

    //Campo: cex_documentos_file (arquivo PDF requerido)
    if (validacao({op:16, id:'cex_documentos_file'}) === false) {
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

//Busca dados e monta o modal para o submódulo clientes_executivos
function clienteExecutivoModalInfo(id='') {
    if (id == '') {id = document.getElementById('registro_id').value;}

    //Colocar imagem do Cartão emergencial
    cartaoEmergencialGerarPDF(1, id, 1, 'pt', 'cex_cartao_emergencial_1');
    cartaoEmergencialGerarPDF(1, id, 1, 'en', 'cex_cartao_emergencial_2');

    //Abrir Modal
    new bootstrap.Modal(document.getElementById('cliente_executivo_modal_info')).show();

    //Limpando dados
    let elementos = document.querySelectorAll('.clearClass');
    elementos.forEach(elemento => {elemento.src = ''; elemento.innerHTML = '';});

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'clientes_executivos/modalInfo/modal_info/'+id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let json = data;

        //Lendo dados cliente_executivo
        let cliente_executivo = json.cliente_executivo;

        //Passando dados cliente_executivo'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Header
        const header_mi_cex_foto = document.querySelector('#cliente_executivo_modal_info #header #mi_cex_foto');
        const header_mi_cex_nome = document.querySelector('#cliente_executivo_modal_info #header #mi_cex_nome');
        const header_mi_cex_funcao = document.querySelector('#cliente_executivo_modal_info #header #mi_cex_funcao');
        const header_mi_cex_email = document.querySelector('#cliente_executivo_modal_info #header #mi_cex_email');

        header_mi_cex_foto.src = url_atual+cliente_executivo.foto;
        header_mi_cex_nome.innerHTML = cliente_executivo.executivo_nome;
        header_mi_cex_funcao.innerHTML = cliente_executivo.executivo_funcao;
        header_mi_cex_email.innerHTML = cliente_executivo.email;

        //Tab Dados
        const tab_cex_dados_mi_cex_funcao = document.querySelector('#cliente_executivo_modal_info #tab_cex_dados #mi_cex_funcao');
        const tab_cex_dados_mi_cex_nome = document.querySelector('#cliente_executivo_modal_info #tab_cex_dados #mi_cex_nome');
        const tab_cex_dados_mi_cex_telefones = document.querySelector('#cliente_executivo_modal_info #tab_cex_dados #mi_cex_telefones');
        const tab_cex_dados_mi_cex_celulares = document.querySelector('#cliente_executivo_modal_info #tab_cex_dados #mi_cex_celulares');

        tab_cex_dados_mi_cex_funcao.innerHTML = cliente_executivo.executivo_funcao;
        tab_cex_dados_mi_cex_nome.innerHTML = cliente_executivo.executivo_nome;
        tab_cex_dados_mi_cex_telefones.innerHTML = formatarTelCel(1, cliente_executivo.telefone_1)+'  '+formatarTelCel(1, cliente_executivo.telefone_2);
        tab_cex_dados_mi_cex_celulares.innerHTML = formatarTelCel(2, cliente_executivo.celular_1)+'  '+formatarTelCel(2, cliente_executivo.celular_2);

        //Upload Foto
        const tab_cex_foto_upload_foto_cliente_executivo_id = document.querySelector('#cliente_executivo_modal_info #tab_cex_foto #upload_foto_cliente_executivo_id');
        const tab_cex_foto_upload_foto_cliente_executivo_name = document.querySelector('#cliente_executivo_modal_info #tab_cex_foto #upload_foto_cliente_executivo_name');

        tab_cex_foto_upload_foto_cliente_executivo_id.value = cliente_executivo.id;
        tab_cex_foto_upload_foto_cliente_executivo_name.value = cliente_executivo.executivo_nome;

        //Upload Documento PDF
        const tab_documento_upload_documentos_cliente_executivo_id = document.querySelector('#cliente_executivo_modal_info #tab_cex_documentos_upload #upload_documentos_cliente_executivo_id');

        tab_documento_upload_documentos_cliente_executivo_id.value = cliente_executivo.id;
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Montando Grade de Documentos PDF
        clienteExecutivoModalInfoGradeDocumentosPdf({cliente_executivo_id:cliente_executivo.id, btn_visualizar:true, btn_deletar:true});
    }).catch(error => {
        alert('Erro clienteExecutivoModalInfo: '+error);
    });
}

//Busca dados e monta grade de documentos pdfs do submódulo Clientes Executivos
function clienteExecutivoModalInfoGradeDocumentosPdf({cliente_executivo_id='', btn_visualizar=true, btn_deletar=true}) {
    if (cliente_executivo_id == '') {cliente_executivo_id = document.getElementById('registro_id').value;}

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'clientes_executivos/modalInfo/documentos/'+cliente_executivo_id, {
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
            grade += '          <th scope="col">Descrição</th>';
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
                        acoes += '      <button type="button" class="btn btn-outline-danger text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Documento" onclick="clienteExecutivoModalInfoDeletarDocumentoPdf(' + dado.id + ');"><i class="fa fa-trash-alt font-size-18"></i></button>';
                        acoes += '  </div>';
                    }
                }

                acoes += '</div>';

                //TR
                grade += '<tr>';
                grade += '  <th scope="row">'+ln+'</th>';
                grade += '  <td>'+dado.descricao+'</td>';
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
        document.getElementById('cex_documentos_grade').innerHTML = grade;
    }).catch(error => {
        alert('Erro clienteExecutivoModalInfoGradeDocumentosPdf: '+error);
    });
}

//Função para deletar documento da grade
async function clienteExecutivoModalInfoDeletarDocumentoPdf(cliente_executivo_documento_id) {
    //Confirmação de Delete
    const confirmed = await alertSwalConfirmacao();
    if (confirmed) {
        var url_atual = window.location.protocol+'//'+window.location.host+'/';

        //Acessar rota
        fetch(url_atual+'clientes_executivos/modalInfo/deletar_documento/'+cliente_executivo_documento_id, {
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
                alertSwal('success', 'Clientes Executivos', data.success, 'true', 2000);

                //Dados
                let cliente_executivo_id = document.getElementById('upload_documentos_cliente_executivo_id').value;

                //Montar Grade
                clienteExecutivoModalInfoGradeDocumentosPdf({cliente_executivo_id:cliente_executivo_id});
            } else if (data.error) {
                alertSwal('error', 'Clientes Executivos', data.error, 'true', 2000);
            } else if (data.error_permissao) {
                alertSwal('warning', "Permissão Negada", '', 'true', 2000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro clienteExecutivoModalInfoDeletarDocumentoPdf:'+error);
        });
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    //Botão: frm_upload_cex_foto_executar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_cex_foto_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_cex_foto');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';

        //Acessar rota
        fetch(url_atual+'clientes_executivos/uploadFoto/upload_foto', {
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
                //colocando a imagem na view
                const fileInput = document.getElementById('cex_foto_file');
                const file = fileInput.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        document.querySelector('#cliente_executivo_modal_info #header #mi_cex_foto').src = reader.result;
                        document.getElementById('datatable_foto_cliente_executivo_id_'+document.getElementById('upload_foto_cliente_executivo_id').value).src = reader.result;
                    };
                    reader.readAsDataURL(file);
                }

                alertSwal('success', 'Clientes Executivos', data.success, 'true', 20000);
            } else if (data.error) {
                alertSwal('warning', 'Clientes Executivos', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Clientes Executivos Upload Foto: '+error);
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_documentos_cex_executar''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_documentos_cex_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_documentos_cex');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';
        var upload_documentos_cliente_executivo_id = document.getElementById('upload_documentos_cliente_executivo_id').value;

        //Tratar Botões
        document.getElementById('frm_upload_documentos_cex_executar').style.display = 'block';

        //Criticando campos
        if (validar_frm_upload_documentos() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'clientes_executivos/uploadDocumento/upload_documento', {
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
                clienteExecutivoModalInfoGradeDocumentosPdf({cliente_executivo_id:upload_documentos_cliente_executivo_id, btn_visualizar:true, btn_deletar:true});

                formulario.reset();

                alertSwal('success', 'Clientes Executivos', data.success, 'true', 20000);
            } else if (data.error) {
                alertSwal('warning', 'Clientes Executivos', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Clientes Executivos Upload Documento PDF: '+error);
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
