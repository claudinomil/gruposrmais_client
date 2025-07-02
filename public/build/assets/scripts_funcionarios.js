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
        }
    }

    //Campo: data_afastamento (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('data_afastamento').value}) === true) {
        //Campo: data_afastamento (Data Válida)
        if (validacao({op:8, value:document.getElementById('data_afastamento').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data Afastamento Inválida.'+'<br>';
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

function validar_frm_upload_documentos_pdfs() {
    var validacao_ok = true;
    var mensagem = '';


    //Campo: upload_documentos_pdfs_funcionario_id (requerido)
    if (validacao({op:1, value:document.getElementById('upload_documentos_pdfs_funcionario_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Funcionário requerido.'+'<br>';
    }

    //Campo: upload_documentos_pdfs_fun_acao (requerido)
    if (validacao({op:1, value:document.getElementById('upload_documentos_pdfs_fun_acao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Ação do Formulário requerido.'+'<br>';
    }

    //Campo: fun_documentos_pdfs_documento_id (requerido)
    if (validacao({op:1, value:document.getElementById('fun_documentos_pdfs_documento_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Documento requerido.'+'<br>';
    }

    // //Campo: fun_documentos_pdfs_descricao (requerido)
    // if (validacao({op:1, value:document.getElementById('fun_documentos_pdfs_descricao').value}) === false) {
    //     validacao_ok = false;
    //     mensagem += 'Descrição documento requerido.'+'<br>';
    // }

    //Campo: fun_documentos_pdfs_data_documento (não requerido / Data Válida)
    if (validacao({op:1, value:document.getElementById('fun_documentos_pdfs_data_documento').value}) === true) {
        //Campo: fun_documentos_pdfs_data_documento (Data Válida)
        if (validacao({op:8, value:document.getElementById('fun_documentos_pdfs_data_documento').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data documento Inválida.'+'<br>';
        }
    }

    //Campo: fun_documentos_pdfs_file (arquivo PDF requerido)
    if (validacao({op:16, id:'fun_documentos_pdfs_file'}) === false) {
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

//Busca dados e monta o modal para o submódulo funcionarios
function funcionarioModalInfo(id='') {
    if (id == '') {id = document.getElementById('registro_id').value;}

    //Colocar imagem do Cartão emergencial
    cartaoEmergencialGerarPDF(2, id, 1, 'pt', 'fun_cartao_emergencial_1');
    cartaoEmergencialGerarPDF(2, id, 1, 'en', 'fun_cartao_emergencial_2');

    //Abrir Modal
    new bootstrap.Modal(document.getElementById('funcionario_modal_info')).show();

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

        //Passando dados funcionario'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Header
        const header_mi_fun_foto = document.querySelector('#funcionario_modal_info #header #mi_fun_foto');
        const header_mi_fun_nome = document.querySelector('#funcionario_modal_info #header #mi_fun_nome');
        const header_mi_fun_funcao = document.querySelector('#funcionario_modal_info #header #mi_fun_funcao');
        const header_mi_fun_email = document.querySelector('#funcionario_modal_info #header #mi_fun_email');
        const header_mi_fun_departamento = document.querySelector('#funcionario_modal_info #header #mi_fun_departamento');

        header_mi_fun_foto.src = url_atual+funcionario.foto;
        header_mi_fun_nome.innerHTML = funcionario.name;
        header_mi_fun_funcao.innerHTML = funcionario.funcaoName;
        header_mi_fun_email.innerHTML = funcionario.email;
        header_mi_fun_departamento.innerHTML = funcionario.departamentoName;

        //Tab Dados
        const tab_fun_dados_mi_fun_cpf = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_cpf');
        const tab_fun_dados_mi_fun_departamento = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_departamento');
        const tab_fun_dados_mi_fun_funcao = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_funcao');
        const tab_fun_dados_mi_fun_nome = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_nome');
        const tab_fun_dados_mi_fun_telefones = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_telefones');
        const tab_fun_dados_mi_fun_celulares = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_celulares');
        const tab_fun_dados_mi_fun_data_admissao = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_data_admissao');
        const tab_fun_dados_mi_fun_data_demissao = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_data_demissao');
        const tab_fun_dados_mi_fun_pis = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_pis');
        const tab_fun_dados_mi_fun_pasep = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_pasep');
        const tab_fun_dados_mi_fun_carteira_trabalho = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_carteira_trabalho');

        tab_fun_dados_mi_fun_cpf.innerHTML = funcionario.cpf;
        tab_fun_dados_mi_fun_departamento.innerHTML = funcionario.departamentoName;
        tab_fun_dados_mi_fun_funcao.innerHTML = funcionario.funcaoName;
        tab_fun_dados_mi_fun_nome.innerHTML = funcionario.name;
        tab_fun_dados_mi_fun_telefones.innerHTML = formatarTelCel(1, funcionario.telefone_1)+'  '+formatarTelCel(1, funcionario.telefone_2);
        tab_fun_dados_mi_fun_celulares.innerHTML = formatarTelCel(2, funcionario.celular_1)+'  '+formatarTelCel(2, funcionario.celular_2);
        tab_fun_dados_mi_fun_data_admissao.innerHTML = formatarData(2, funcionario.data_admissao);
        tab_fun_dados_mi_fun_data_demissao.innerHTML = formatarData(2, funcionario.data_demissao);
        tab_fun_dados_mi_fun_pis.innerHTML = funcionario.pis;
        tab_fun_dados_mi_fun_pasep.innerHTML = funcionario.pasep;
        tab_fun_dados_mi_fun_carteira_trabalho.innerHTML = funcionario.carteira_trabalho;

        //Upload Foto
        const tab_fun_foto_upload_foto_funcionario_id = document.querySelector('#funcionario_modal_info #tab_fun_foto #upload_foto_funcionario_id');
        const tab_fun_foto_upload_foto_funcionario_name = document.querySelector('#funcionario_modal_info #tab_fun_foto #upload_foto_funcionario_name');

        tab_fun_foto_upload_foto_funcionario_id.value = funcionario.id;
        tab_fun_foto_upload_foto_funcionario_name.value = funcionario.name;

        //Upload Documento PDF
        const tab_documento_pdf_upload_documentos_pdfs_funcionario_id = document.querySelector('#funcionario_modal_info #tab_fun_documentos_upload #upload_documentos_pdfs_funcionario_id');

        tab_documento_pdf_upload_documentos_pdfs_funcionario_id.value = funcionario.id;
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Montando Grade de Documentos PDF
        funcionarioModalInfoGradeDocumentosPdf({funcionario_id:funcionario.id, id_elemento_visualisacao:'fun_documentos_grade', btn_visualizar:true, btn_deletar:true});
    }).catch(error => {
        alert('Erro funcionarioModalInfo: '+error);
    });
}

//Busca dados e monta grade de documentos pdfs do submódulo funcionarios
function funcionarioModalInfoGradeDocumentosPdf({funcionario_id='', id_elemento_visualisacao='', btn_visualizar=true, btn_deletar=true}) {
    if (id_elemento_visualisacao == '') {return false;}
    if (funcionario_id == '') {funcionario_id = document.getElementById('registro_id').value;}

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'funcionarios/modalInfo/documentos_pdf/'+funcionario_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let funcionarios_documentos = data.funcionarios_documentos;

        //Grade
        let grade = '';

        //Montar Grade
        if (funcionarios_documentos.length > 0) {
            grade += '<table class="table table-striped table-bordered overflow-hidden">';
            grade += '  <thead>';
            grade += '      <tr>';
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

                if (btn_visualizar === true || btn_deletar === true) {
                    if (btn_visualizar === true) {
                        acoes += '  <div class="col-6">';
                        acoes += '      <button type="button" class="btn btn-outline-info text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Documento" onclick="window.open(\'' + dado.caminho + '\', \'_blank\');"><i class="fa fa-file-pdf font-size-18"></i></button>';
                        acoes += '  </div>';
                    }

                    if (btn_deletar === true) {
                        acoes += '  <div class="col-6">';
                        acoes += '      <button type="button" class="btn btn-outline-danger text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Documento" onclick="funcionarioModalInfoDeletarDocumentoPdf(' + dado.id + ');"><i class="fa fa-trash-alt font-size-18"></i></button>';
                        acoes += '  </div>';
                    }
                }

                acoes += '</div>';

                //TR
                grade += '<tr class="documento_fonte_'+dado.documento_fonte_id+'">';
                grade += '  <td>'+documentoName+'</td>';
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

                    documentoFonteFiltro += `   <div class="col-4 flex-fill text-center">`;
                    documentoFonteFiltro += `       <button type="button" class="btn btn-outline-success text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Filtar Documentos" onclick="funcionarioModalInfoGradeDocumentosPdfFiltrar(${documento_fonte_id});">${documento_fonte_name} (${qtd_registros.length})</button>`;
                    documentoFonteFiltro += `   </div>`;
                }
            });

            documentoFonteFiltro += '</div>';
        }

        //Retornar Documento Filtro (Botões)
        document.getElementById(id_elemento_visualisacao).insertAdjacentHTML('afterbegin', documentoFonteFiltro);

        //Primeiro Filtro
        funcionarioModalInfoGradeDocumentosPdfFiltrar(idPrimeiroFiltro);
    }).catch(error => {
        alert('Erro funcionarioModalInfoGradeDocumentosPdf: '+error);
    });
}

function funcionarioModalInfoGradeDocumentosPdfFiltrar(documento_fonte_id) {
    const todasLinhas = document.querySelectorAll("#fun_documentos_grade table tbody tr");

    todasLinhas.forEach(linha => {
        if (linha.classList.contains(`documento_fonte_${documento_fonte_id}`)) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    });
}

// //Busca dados e monta grade de documentos pdfs do submódulo funcionários
// function funcionarioModalInfoGradeDocumentosPdf({funcionario_id='', id_elemento_visualisacao='', btn_visualizar=true, btn_deletar=true}) {
//     if (id_elemento_visualisacao == '') {return false;}
//     if (funcionario_id == '') {funcionario_id = document.getElementById('registro_id').value;}
//
//     var url_atual = window.location.protocol+'//'+window.location.host+'/';
//
//     //Acessar rota
//     fetch(url_atual+'funcionarios/modalInfo/documentos_pdf/'+funcionario_id, {
//         method: 'GET',
//         headers: {'REQUEST-ORIGIN': 'fetch'}
//     }).then(response => {
//         return response.json();
//     }).then(data => {
//         //Lendo json
//         let documentos = data;
//
//         //Grade
//         let grade = '';
//
//         //Montar Grade
//         if (documentos.length > 0) {
//             grade += '<table class="table">';
//             grade += '  <thead>';
//             grade += '      <tr>';
//             grade += '          <th scope="col">#</th>';
//             grade += '          <th scope="col">Descrição</th>';
//             grade += '          <th scope="col">Data</th>';
//             grade += '          <th scope="col">Aviso</th>';
//
//             if (btn_visualizar === true || btn_deletar === true) {
//                 grade += '          <th scope="col">Ações</th>';
//             }
//
//             grade += '      </tr>';
//             grade += '  </thead>';
//             grade += '  <tbody>';
//
//             //Varrer
//             let ln = 0;
//             documentos.forEach(dado => {
//                 ln++;
//
//                 //Aviso
//                 let aviso_texto = '';
//
//                 if (dado.aviso == 0) {aviso_texto = 'Nenhum Aviso';}
//                 if (dado.aviso == 1) {aviso_texto = 'Avisar a cada 1 mês';}
//                 if (dado.aviso == 2) {aviso_texto = 'Avisar a cada 3 meses';}
//                 if (dado.aviso == 3) {aviso_texto = 'Avisar a cada 6 meses';}
//                 if (dado.aviso == 4) {aviso_texto = 'Avisar a cada 1 ano';}
//                 if (dado.aviso == 5) {aviso_texto = 'Avisar a cada 3 anos';}
//                 if (dado.aviso == 6) {aviso_texto = 'Avisar a cada 6 anos';}
//
//                 //Ações
//                 let acoes = '';
//
//                 acoes += '<div class="row">';
//
//                 if (btn_visualizar === true || btn_deletar === true) {
//                     if (btn_visualizar === true) {
//                         acoes += '  <div class="col-6">';
//                         acoes += '      <button type="button" class="btn btn-outline-info text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Documento" onclick="window.open(\'' + dado.caminho + '\', \'_blank\');"><i class="fa fa-file-pdf font-size-18"></i></button>';
//                         acoes += '  </div>';
//                     }
//
//                     if (btn_deletar === true) {
//                         acoes += '  <div class="col-6">';
//                         acoes += '      <button type="button" class="btn btn-outline-danger text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Documento" onclick="funcionarioModalInfoDeletarDocumentoPdf(' + dado.id + ');"><i class="fa fa-trash-alt font-size-18"></i></button>';
//                         acoes += '  </div>';
//                     }
//                 }
//
//                 acoes += '</div>';
//
//                 //TR
//                 grade += '<tr>';
//                 grade += '  <th scope="row">'+ln+'</th>';
//                 grade += '  <td>'+dado.descricao+'</td>';
//                 grade += '  <td>'+formatarData(2, dado.data_documento)+'</td>';
//                 grade += '  <td>'+aviso_texto+'</td>';
//
//                 if (btn_visualizar === true || btn_deletar === true) {
//                     grade += '  <td>'+acoes+'</td>';
//                 }
//
//                 grade += '</tr>';
//             });
//
//             grade += '  </tbody>';
//             grade += '</table>';
//         } else {
//             grade = 'Nenhum documento encontrado.';
//         }
//
//         //Retornar Grade
//         document.getElementById(id_elemento_visualisacao).innerHTML = grade;
//     }).catch(error => {
//         alert('Erro funcionarioModalInfoGradeDocumentosPdf: '+error);
//     });
// }

//Função para deletar documento da grade
function funcionarioModalInfoDeletarDocumentoPdf(funcionario_documento_id) {
    //Confirmação de Delete
    alertSwalConfirmacao(function (confirmed) {
        if (confirmed) {
            var url_atual = window.location.protocol+'//'+window.location.host+'/';

            //Acessar rota
            fetch(url_atual+'funcionarios/modalInfo/deletar_documento_pdf/'+funcionario_documento_id, {
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
                    let funcionario_id = document.getElementById('upload_documentos_pdfs_funcionario_id').value;

                    //Montar Grade
                    funcionarioModalInfoGradeDocumentosPdf({funcionario_id:funcionario_id, id_elemento_visualisacao:'fun_documentos_grade'});
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
    });
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

    //Botão: frm_upload_fun_foto_executar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_fun_foto_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_fun_foto');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';

        //Acessar rota
        fetch(url_atual+'funcionarios/uploadFoto/upload_foto', {
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
                const fileInput = document.getElementById('fun_foto_file');
                const file = fileInput.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        document.querySelector('#funcionario_modal_info #header #mi_fun_foto').src = reader.result;
                        document.getElementById('datatable_foto_funcionario_id_'+document.getElementById('upload_foto_funcionario_id').value).src = reader.result;
                    };
                    reader.readAsDataURL(file);
                }

                alertSwal('success', 'Funcionários', data.success, 'true', 20000);
            } else if (data.error) {
                alertSwal('warning', 'Funcionários', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Funcionários Upload Foto: '+error);
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_documentos_pdfs_fun_executar''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_documentos_pdfs_fun_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_documentos_pdfs_fun');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';
        var upload_documentos_pdfs_funcionario_id = document.getElementById('upload_documentos_pdfs_funcionario_id').value;

        //Tratar Botões
        document.getElementById('frm_upload_documentos_pdfs_fun_executar').style.display = 'block';

        //Criticando campos
        if (validar_frm_upload_documentos_pdfs() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'funcionarios/uploadDocumentoPdf/upload_documento_pdf', {
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
                funcionarioModalInfoGradeDocumentosPdf({funcionario_id:upload_documentos_pdfs_funcionario_id, id_elemento_visualisacao:'fun_documentos_grade', btn_visualizar:true, btn_deletar:true});

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

    //Botão: funcionario_acao_1_dropdown''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    if (document.getElementById('funcionario_acao_1_dropdown')) {
        document.getElementById('funcionario_acao_1_dropdown').addEventListener('click', function () {
            //Hide no crudTable usando a função do CRUD principal
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

        //Chamar função usada para cancelar operação no CRUD principal
        crudCancelOperation();
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
