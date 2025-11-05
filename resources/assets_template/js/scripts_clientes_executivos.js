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

    //Campo: cex_documentos_documento_id (requerido)
    if (validacao({op:1, value:document.getElementById('cex_documentos_documento_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Documento requerido.'+'<br>';
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

function validar_frm_upload_fotografia_documento() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: cex_fotografia_documento_file (arquivo requerido)
    if (validacao({op:18, id:'cex_fotografia_documento_file'}) === false) {
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

    //Campo: cex_fotografia_cartao_emergencial_file (arquivo requerido)
    if (validacao({op:18, id:'cex_fotografia_cartao_emergencial_file'}) === false) {
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

function clienteExecutivoModalInfoControle(op, id='') {
    var div_fotografias = document.getElementById('md_cex_div_fotografias');
    var div_dados = document.getElementById('md_cex_div_dados');
    var div_documentos = document.getElementById('md_cex_div_documentos');
    var div_incluir_documentos = document.getElementById('md_cex_div_incluir_documentos');
    var div_cartao_emergencial = document.getElementById('md_cex_div_cartao_emergencial');

    //Fotografias
    if (op == 1) {
        div_fotografias.classList.remove('d-none');
        div_fotografias.classList.add('d-lg-flex');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_incluir_documentos.classList.remove('d-lg-flex');
        div_incluir_documentos.classList.add('d-none');

        div_cartao_emergencial.classList.remove('d-lg-flex');
        div_cartao_emergencial.classList.add('d-none');

        clienteExecutivoModalInfoEstatisticas(id);
    }

    //Dados
    if (op == 2) {
        div_fotografias.classList.remove('d-lg-flex');
        div_fotografias.classList.add('d-none');

        div_dados.classList.remove('d-none');
        div_dados.classList.add('d-lg-flex');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_incluir_documentos.classList.remove('d-lg-flex');
        div_incluir_documentos.classList.add('d-none');

        div_cartao_emergencial.classList.remove('d-lg-flex');
        div_cartao_emergencial.classList.add('d-none');

        clienteExecutivoModalInfoDados(id);
        clienteExecutivoModalInfoEstatisticas(id);
    }

    //Documentos
    if (op == 3) {
        div_fotografias.classList.remove('d-lg-flex');
        div_fotografias.classList.add('d-none');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-none');
        div_documentos.classList.add('d-lg-flex');

        div_incluir_documentos.classList.remove('d-lg-flex');
        div_incluir_documentos.classList.add('d-none');

        div_cartao_emergencial.classList.remove('d-lg-flex');
        div_cartao_emergencial.classList.add('d-none');

        clienteExecutivoModalInfoDocumentos(id);
        clienteExecutivoModalInfoEstatisticas(id);
    }
    
    //Incluir Documentos
    if (op == 5) {
        div_fotografias.classList.remove('d-lg-flex');
        div_fotografias.classList.add('d-none');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_incluir_documentos.classList.remove('d-none');
        div_incluir_documentos.classList.add('d-lg-flex');

        div_cartao_emergencial.classList.remove('d-lg-flex');
        div_cartao_emergencial.classList.add('d-none');

        clienteExecutivoModalInfoEstatisticas(id);
    }

    //Cartão Emergencial
    if (op == 6) {
        div_fotografias.classList.remove('d-lg-flex');
        div_fotografias.classList.add('d-none');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_incluir_documentos.classList.remove('d-lg-flex');
        div_incluir_documentos.classList.add('d-none');

        div_cartao_emergencial.classList.remove('d-none');
        div_cartao_emergencial.classList.add('d-lg-flex');

        //Colocar imagem do Cartão emergencial
        if (id == '') {id = document.getElementById('mi_cex_cliente_executivo_id').value;}
        cartaoEmergencialGerarPDF(1, id, 1, 'pt', 'cex_cartao_emergencial_1');
        cartaoEmergencialGerarPDF(1, id, 1, 'en', 'cex_cartao_emergencial_2');
    }
}

// Modal Clientes Executivos
// Estatisticas
function clienteExecutivoModalInfoEstatisticas(id='') {
    if (id == '') {id = document.getElementById('mi_cex_cliente_executivo_id').value;}

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'clientes_executivos/modalInfo/estatisticas/'+id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let json = data;

        //Lendo dados cliente_executivo
        let estatisticas = json;

        //Header
        document.getElementById('md_cex_estatisticas_documentos').innerHTML = estatisticas.documentos;
    }).catch(error => {
        alert('Erro clienteExecutivoModalInfoEstatisticas: '+error);
    });
}

// Modal Clientes Executivos
// Dados
async function clienteExecutivoModalInfoDados(id='') {
    if (id == '') {id = document.getElementById('mi_cex_cliente_executivo_id').value;}

    //Abrir Modal
    var modalEl = document.getElementById('cliente_executivo_modal_info');
    if (!modalEl.classList.contains('show')) {
        new bootstrap.Modal(document.getElementById('cliente_executivo_modal_info')).show();
        ajustarMargensModalsInfo({ modalId:'cliente_executivo_modal_info', top:20, right:20, bottom:20, left:20 });
    }

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

        //Passando dados cliente_executivo''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Header
        document.getElementById('mi_cex_header_nome').innerHTML = cliente_executivo.executivo_nome;

        //Fotografia Documento
        var fotografia_documento = url_atual+'build/assets/images/clientes_executivos/cliente_executivo-0.png';
        if (cliente_executivo.fotografia_documento) {fotografia_documento = cliente_executivo.fotografia_documento;}
        document.getElementById('mi_cex_fotografia').src = fotografia_documento;
        document.getElementById('mi_cex_fotografia_documento').src = fotografia_documento;

        //Fotografia Cartão Emergencial
        var fotografia_cartao_emergencial = url_atual+'build/assets/images/clientes_executivos/cliente_executivo-0.png';
        if (cliente_executivo.fotografia_cartao_emergencial) {fotografia_cartao_emergencial = cliente_executivo.fotografia_cartao_emergencial;}
        document.getElementById('mi_cex_fotografia_cartao_emergencial').src = fotografia_cartao_emergencial;

        //Cliente Executivo id
        document.getElementById('mi_cex_cliente_executivo_id').value = cliente_executivo.id;

        // Dados
        document.getElementById('mi_cex_nome').value = cliente_executivo.executivo_nome ?? "";
        document.getElementById('mi_cex_cpf').value = cliente_executivo.cpf ?? "";
        document.getElementById('mi_cex_cliente').value = cliente_executivo.clienteName ?? "";
        document.getElementById('mi_cex_funcao').value = cliente_executivo.executivo_funcao ?? "";
        document.getElementById('mi_cex_nome_profissional').value = cliente_executivo.nome_profissional ?? "";
        document.getElementById('mi_cex_data_nascimento').value = formatarData(2, cliente_executivo.data_nascimento ?? "") ?? "";
        document.getElementById('mi_cex_genero').value = cliente_executivo.generoName ?? "";
        document.getElementById('mi_cex_celular_1').value = formatarTelCel(2, cliente_executivo.celular_1 ?? "") ?? "";
        document.getElementById('mi_cex_celular_2').value = formatarTelCel(2, cliente_executivo.celular_2 ?? "") ?? "";
        document.getElementById('mi_cex_telefone_1').value = formatarTelCel(1, cliente_executivo.telefone_1 ?? "") ?? "";
        document.getElementById('mi_cex_telefone_2').value = formatarTelCel(1, cliente_executivo.telefone_2 ?? "") ?? "";
        document.getElementById('mi_cex_email').value = cliente_executivo.email ?? "";
        
        //Documentos
        let upload_documentos_cliente_executivo_id = document.getElementById('upload_documentos_cliente_executivo_id');
        if (upload_documentos_cliente_executivo_id) {upload_documentos_cliente_executivo_id.value = cliente_executivo.id ?? "";}

        //Fotografia Documento
        let upload_fotografia_documento_cliente_executivo_id = document.getElementById('upload_fotografia_documento_cliente_executivo_id');
        if (upload_fotografia_documento_cliente_executivo_id) {upload_fotografia_documento_cliente_executivo_id.value = cliente_executivo.id ?? "";}

        //Fotografia Cartão Emergencial
        let upload_fotografia_cartao_emergencial_cliente_executivo_id = document.getElementById('upload_fotografia_cartao_emergencial_cliente_executivo_id');
        if (upload_fotografia_cartao_emergencial_cliente_executivo_id) {upload_fotografia_cartao_emergencial_cliente_executivo_id.value = cliente_executivo.id ?? "";}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }).catch(error => {
        alert('Erro clienteExecutivoModalInfo: '+error);
    });
}

// Modal Clientes Executivos
// Documentos
function clienteExecutivoModalInfoDocumentos(cliente_executivo_id='') {
    if (cliente_executivo_id == '') {cliente_executivo_id = document.getElementById('upload_documentos_cliente_executivo_id').value;}

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'clientes_executivos/modalInfo/documentos/'+cliente_executivo_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let clientes_executivos_documentos = data.clientes_executivos_documentos;

        // Permissões
        let permissoes = data.permissoes;
        const permissao_list = permissoes.some(p => p.permissao === 'clientes_executivos_list');
        const permissao_destroy = permissoes.some(p => p.permissao === 'clientes_executivos_destroy');

        //Grade
        let grade = '';

        //Montar Grade
        if (clientes_executivos_documentos.length > 0) {
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
            clientes_executivos_documentos.forEach(dado => {
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
                    acoes += '      <button type="button" class="btn btn-outline-danger text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Documento" onclick="clienteExecutivoModalInfoDocumentosDeletar(' + dado.id + ');"><i class="fa fa-trash-alt font-size-18"></i></button>';
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
        document.getElementById('cex_documentos_grade').innerHTML = grade;

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
                let qtd_registros = clientes_executivos_documentos.filter(reg => reg.documento_fonte_id === documento_fonte_id);

                if (qtd_registros.length > 0) {
                    if (idPrimeiroFiltro == 0) {idPrimeiroFiltro = documento_fonte_id;}

                    documentoFonteFiltro += `   <div class="col-4 col-lg-3">`;
                    documentoFonteFiltro += `       <button type="button" class="btn btn-warning text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Filtar Documentos" onclick="clienteExecutivoModalInfoDocumentosFiltrar(${documento_fonte_id});">${documento_fonte_name} (${qtd_registros.length})</button>`;
                    documentoFonteFiltro += `   </div>`;
                }
            });

            documentoFonteFiltro += '</div>';
        }

        //Retornar Documento Filtro (Botões)
        document.getElementById('cex_documentos_grade_botoes').innerHTML = documentoFonteFiltro;

        //Primeiro Filtro
        clienteExecutivoModalInfoDocumentosFiltrar(idPrimeiroFiltro);
    }).catch(error => {
        alert('Erro clienteExecutivoModalInfoGradeDocumentosPdf: '+error);
    }).finally(() => {
        configurarDataTable(3);
    });
}

function clienteExecutivoModalInfoDocumentosFiltrar(documento_fonte_id) {
    const todasLinhas = document.querySelectorAll("#cex_documentos_grade table tbody tr");

    todasLinhas.forEach(linha => {
        if (linha.classList.contains(`documento_fonte_${documento_fonte_id}`)) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    });
}

//Função para deletar documento da grade
async function clienteExecutivoModalInfoDocumentosDeletar(cliente_executivo_documento_id) {
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
                clienteExecutivoModalInfoDocumentos(cliente_executivo_id);
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

// function validar_frm_upload_documentos() {
//     var validacao_ok = true;
//     var mensagem = '';


//     //Campo: upload_documentos_cliente_executivo_id (requerido)
//     if (validacao({op:1, value:document.getElementById('upload_documentos_cliente_executivo_id').value}) === false) {
//         validacao_ok = false;
//         mensagem += 'Cliente Executivo requerido.'+'<br>';
//     }

//     //Campo: upload_documentos_cex_acao (requerido)
//     if (validacao({op:1, value:document.getElementById('upload_documentos_cex_acao').value}) === false) {
//         validacao_ok = false;
//         mensagem += 'Ação do Formulário requerido.'+'<br>';
//     }

//     //Campo: cex_documentos_descricao (requerido)
//     if (validacao({op:1, value:document.getElementById('cex_documentos_descricao').value}) === false) {
//         validacao_ok = false;
//         mensagem += 'Descrição documento requerido.'+'<br>';
//     }

//     //Campo: cex_documentos_data_documento (não requerido / Data Válida)
//     if (validacao({op:1, value:document.getElementById('cex_documentos_data_documento').value}) === true) {
//         //Campo: cex_documentos_data_documento (Data Válida)
//         if (validacao({op:8, value:document.getElementById('cex_documentos_data_documento').value}) === false) {
//             validacao_ok = false;
//             mensagem += 'Data documento Inválida.'+'<br>';
//         }
//     }

//     //Campo: cex_documentos_file (arquivo PDF requerido)
//     if (validacao({op:16, id:'cex_documentos_file'}) === false) {
//         validacao_ok = false;
//         mensagem += 'Arquivo PDF requerido.'+'<br>';
//     }

//     //Mensagem
//     if (validacao_ok === false) {
//         var texto = '<div class="pt-3">';
//         texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
//         texto += '</div>';

//         alertSwal('warning', 'Validação', texto, 'true', 5000);
//     }

//     //Retorno
//     return validacao_ok;
// }

// //Busca dados e monta o modal para o submódulo clientes_executivos
// function clienteExecutivoModalInfo(id='') {
//     if (id == '') {id = document.getElementById('registro_id').value;}

//     //Colocar imagem do Cartão emergencial
//     cartaoEmergencialGerarPDF(1, id, 1, 'pt', 'cex_cartao_emergencial_1');
//     cartaoEmergencialGerarPDF(1, id, 1, 'en', 'cex_cartao_emergencial_2');

//     //Abrir Modal
//     new bootstrap.Modal(document.getElementById('cliente_executivo_modal_info')).show();

//     //Limpando dados
//     let elementos = document.querySelectorAll('.clearClass');
//     elementos.forEach(elemento => {elemento.src = ''; elemento.innerHTML = '';});

//     var url_atual = window.location.protocol+'//'+window.location.host+'/';

//     //Acessar rota
//     fetch(url_atual+'clientes_executivos/modalInfo/modal_info/'+id, {
//         method: 'GET',
//         headers: {'REQUEST-ORIGIN': 'fetch'}
//     }).then(response => {
//         return response.json();
//     }).then(data => {
//         //Lendo json
//         let json = data;

//         //Lendo dados cliente_executivo
//         let cliente_executivo = json.cliente_executivo;

//         //Passando dados cliente_executivo'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//         //Header
//         const header_mi_cex_foto = document.querySelector('#cliente_executivo_modal_info #header #mi_cex_foto');
//         const header_mi_cex_nome = document.querySelector('#cliente_executivo_modal_info #header #mi_cex_nome');
//         const header_mi_cex_funcao = document.querySelector('#cliente_executivo_modal_info #header #mi_cex_funcao');
//         const header_mi_cex_email = document.querySelector('#cliente_executivo_modal_info #header #mi_cex_email');

//         header_mi_cex_foto.src = url_atual+cliente_executivo.foto;
//         header_mi_cex_nome.innerHTML = cliente_executivo.executivo_nome;
//         header_mi_cex_funcao.innerHTML = cliente_executivo.executivo_funcao;
//         header_mi_cex_email.innerHTML = cliente_executivo.email;

//         //Tab Dados
//         const tab_cex_dados_mi_cex_funcao = document.querySelector('#cliente_executivo_modal_info #tab_cex_dados #mi_cex_funcao');
//         const tab_cex_dados_mi_cex_nome = document.querySelector('#cliente_executivo_modal_info #tab_cex_dados #mi_cex_nome');
//         const tab_cex_dados_mi_cex_telefones = document.querySelector('#cliente_executivo_modal_info #tab_cex_dados #mi_cex_telefones');
//         const tab_cex_dados_mi_cex_celulares = document.querySelector('#cliente_executivo_modal_info #tab_cex_dados #mi_cex_celulares');

//         tab_cex_dados_mi_cex_funcao.innerHTML = cliente_executivo.executivo_funcao;
//         tab_cex_dados_mi_cex_nome.innerHTML = cliente_executivo.executivo_nome;
//         tab_cex_dados_mi_cex_telefones.innerHTML = formatarTelCel(1, cliente_executivo.telefone_1)+'  '+formatarTelCel(1, cliente_executivo.telefone_2);
//         tab_cex_dados_mi_cex_celulares.innerHTML = formatarTelCel(2, cliente_executivo.celular_1)+'  '+formatarTelCel(2, cliente_executivo.celular_2);

//         //Upload Foto
//         const tab_cex_foto_upload_foto_cliente_executivo_id = document.querySelector('#cliente_executivo_modal_info #tab_cex_foto #upload_foto_cliente_executivo_id');
//         const tab_cex_foto_upload_foto_cliente_executivo_name = document.querySelector('#cliente_executivo_modal_info #tab_cex_foto #upload_foto_cliente_executivo_name');

//         tab_cex_foto_upload_foto_cliente_executivo_id.value = cliente_executivo.id;
//         tab_cex_foto_upload_foto_cliente_executivo_name.value = cliente_executivo.executivo_nome;

//         //Upload Documento PDF
//         const tab_documento_upload_documentos_cliente_executivo_id = document.querySelector('#cliente_executivo_modal_info #tab_cex_documentos_upload #upload_documentos_cliente_executivo_id');

//         tab_documento_upload_documentos_cliente_executivo_id.value = cliente_executivo.id;
//         //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//         //Montando Grade de Documentos PDF
//         clienteExecutivoModalInfoGradeDocumentosPdf({cliente_executivo_id:cliente_executivo.id, btn_visualizar:true, btn_deletar:true});
//     }).catch(error => {
//         alert('Erro clienteExecutivoModalInfo: '+error);
//     });
// }

// //Busca dados e monta grade de documentos pdfs do submódulo Clientes Executivos
// function clienteExecutivoModalInfoGradeDocumentosPdf({cliente_executivo_id='', btn_visualizar=true, btn_deletar=true}) {
//     if (cliente_executivo_id == '') {cliente_executivo_id = document.getElementById('registro_id').value;}

//     var url_atual = window.location.protocol+'//'+window.location.host+'/';

//     //Acessar rota
//     fetch(url_atual+'clientes_executivos/modalInfo/documentos/'+cliente_executivo_id, {
//         method: 'GET',
//         headers: {'REQUEST-ORIGIN': 'fetch'}
//     }).then(response => {
//         return response.json();
//     }).then(data => {
//         //Lendo json
//         let documentos = data;

//         //Grade
//         let grade = '';

//         //Montar Grade
//         if (documentos.length > 0) {
//             grade += '<table class="table">';
//             grade += '  <thead>';
//             grade += '      <tr>';
//             grade += '          <th scope="col">#</th>';
//             grade += '          <th scope="col">Descrição</th>';
//             grade += '          <th scope="col">Data</th>';
//             grade += '          <th scope="col">Aviso</th>';

//             if (btn_visualizar === true || btn_deletar === true) {
//                 grade += '          <th scope="col">Ações</th>';
//             }

//             grade += '      </tr>';
//             grade += '  </thead>';
//             grade += '  <tbody>';

//             //Varrer
//             let ln = 0;
//             documentos.forEach(dado => {
//                 ln++;

//                 //Aviso
//                 let aviso_texto = '';

//                 if (dado.aviso == 0) {aviso_texto = 'Nenhum Aviso';}
//                 if (dado.aviso == 1) {aviso_texto = 'Avisar a cada 1 mês';}
//                 if (dado.aviso == 2) {aviso_texto = 'Avisar a cada 3 meses';}
//                 if (dado.aviso == 3) {aviso_texto = 'Avisar a cada 6 meses';}
//                 if (dado.aviso == 4) {aviso_texto = 'Avisar a cada 1 ano';}
//                 if (dado.aviso == 5) {aviso_texto = 'Avisar a cada 3 anos';}
//                 if (dado.aviso == 6) {aviso_texto = 'Avisar a cada 6 anos';}

//                 //Ações
//                 let acoes = '';

//                 acoes += '<div class="row">';

//                 if (btn_visualizar === true || btn_deletar === true) {
//                     if (btn_visualizar === true) {
//                         acoes += '  <div class="col-6">';
//                         acoes += '      <button type="button" class="btn btn-outline-info text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Documento" onclick="window.open(\'' + dado.caminho + '\', \'_blank\');"><i class="fa fa-file-pdf font-size-18"></i></button>';
//                         acoes += '  </div>';
//                     }

//                     if (btn_deletar === true) {
//                         acoes += '  <div class="col-6">';
//                         acoes += '      <button type="button" class="btn btn-outline-danger text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Documento" onclick="clienteExecutivoModalInfoDeletarDocumentoPdf(' + dado.id + ');"><i class="fa fa-trash-alt font-size-18"></i></button>';
//                         acoes += '  </div>';
//                     }
//                 }

//                 acoes += '</div>';

//                 //TR
//                 grade += '<tr>';
//                 grade += '  <th scope="row">'+ln+'</th>';
//                 grade += '  <td>'+dado.descricao+'</td>';
//                 grade += '  <td>'+formatarData(2, dado.data_documento)+'</td>';
//                 grade += '  <td>'+aviso_texto+'</td>';

//                 if (btn_visualizar === true || btn_deletar === true) {
//                     grade += '  <td>'+acoes+'</td>';
//                 }

//                 grade += '</tr>';
//             });

//             grade += '  </tbody>';
//             grade += '</table>';
//         } else {
//             grade = 'Nenhum documento encontrado.';
//         }

//         //Retornar Grade
//         document.getElementById('cex_documentos_grade').innerHTML = grade;
//     }).catch(error => {
//         alert('Erro clienteExecutivoModalInfoGradeDocumentosPdf: '+error);
//     });
// }

// //Função para deletar documento da grade
// async function clienteExecutivoModalInfoDeletarDocumentoPdf(cliente_executivo_documento_id) {
//     //Confirmação de Delete
//     const confirmed = await alertSwalConfirmacao();
//     if (confirmed) {
//         var url_atual = window.location.protocol+'//'+window.location.host+'/';

//         //Acessar rota
//         fetch(url_atual+'clientes_executivos/modalInfo/deletar_documento/'+cliente_executivo_documento_id, {
//             method: 'DELETE',
//             headers: {
//                 'REQUEST-ORIGIN': 'fetch',
//                 'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//             }
//         }).then(response => {
//             return response.json();
//         }).then(data => {
//             //Lendo dados
//             if (data.success) {
//                 alertSwal('success', 'Clientes Executivos', data.success, 'true', 2000);

//                 //Dados
//                 let cliente_executivo_id = document.getElementById('upload_documentos_cliente_executivo_id').value;

//                 //Montar Grade
//                 clienteExecutivoModalInfoGradeDocumentosPdf({cliente_executivo_id:cliente_executivo_id});
//             } else if (data.error) {
//                 alertSwal('error', 'Clientes Executivos', data.error, 'true', 2000);
//             } else if (data.error_permissao) {
//                 alertSwal('warning', "Permissão Negada", '', 'true', 2000);
//             } else {
//                 alert('Erro interno');
//             }
//         }).catch(error => {
//             alert('Erro clienteExecutivoModalInfoDeletarDocumentoPdf:'+error);
//         });
//     }
// }

document.addEventListener("DOMContentLoaded", function(event) {

    // //Botão: frm_upload_cex_foto_executar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // document.getElementById('frm_upload_cex_foto_executar').addEventListener('click', function() {
    //     //FormData
    //     var formulario = document.getElementById('frm_upload_cex_foto');
    //     var formData = new FormData(formulario);
    //     var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //     //Acessar rota
    //     fetch(url_atual+'clientes_executivos/uploadFoto/upload_foto', {
    //         method: 'POST',
    //         headers: {
    //             'REQUEST-ORIGIN': 'fetch',
    //             'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    //         },
    //         body: formData
    //     }).then(response => {
    //         return response.json();
    //     }).then(data => {
    //         //Lendo dados
    //         if (data.success) {
    //             //colocando a imagem na view
    //             const fileInput = document.getElementById('cex_foto_file');
    //             const file = fileInput.files[0];
    //             if (file) {
    //                 var reader = new FileReader();
    //                 reader.onload = function() {
    //                     document.querySelector('#cliente_executivo_modal_info #header #mi_cex_foto').src = reader.result;
    //                     document.getElementById('datatable_foto_cliente_executivo_id_'+document.getElementById('upload_foto_cliente_executivo_id').value).src = reader.result;
    //                 };
    //                 reader.readAsDataURL(file);
    //             }

    //             alertSwal('success', 'Clientes Executivos', data.success, 'true', 20000);
    //         } else if (data.error) {
    //             alertSwal('warning', 'Clientes Executivos', data.error, 'true', 20000);
    //         } else {
    //             alert('Erro interno');
    //         }
    //     }).catch(error => {
    //         alert('Erro Clientes Executivos Upload Foto: '+error);
    //     });
    // });
    // //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // //Botão: frm_upload_documentos_cex_executar''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // document.getElementById('frm_upload_documentos_cex_executar').addEventListener('click', function() {
    //     //FormData
    //     var formulario = document.getElementById('frm_upload_documentos_cex');
    //     var formData = new FormData(formulario);
    //     var url_atual = window.location.protocol+'//'+window.location.host+'/';
    //     var upload_documentos_cliente_executivo_id = document.getElementById('upload_documentos_cliente_executivo_id').value;

    //     //Tratar Botões
    //     document.getElementById('frm_upload_documentos_cex_executar').style.display = 'block';

    //     //Criticando campos
    //     if (validar_frm_upload_documentos() === false) {return false;}

    //     //Acessar rota
    //     fetch(url_atual+'clientes_executivos/uploadDocumento/upload_documento', {
    //         method: 'POST',
    //         headers: {
    //             'REQUEST-ORIGIN': 'fetch',
    //             'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    //         },
    //         body: formData
    //     }).then(response => {
    //         return response.json();
    //     }).then(data => {
    //         //Lendo dados
    //         if (data.success) {
    //             //Montando Grade de Documentos PDF
    //             clienteExecutivoModalInfoGradeDocumentosPdf({cliente_executivo_id:upload_documentos_cliente_executivo_id, btn_visualizar:true, btn_deletar:true});

    //             formulario.reset();

    //             alertSwal('success', 'Clientes Executivos', data.success, 'true', 20000);
    //         } else if (data.error) {
    //             alertSwal('warning', 'Clientes Executivos', data.error, 'true', 20000);
    //         } else {
    //             alert('Erro interno');
    //         }
    //     }).catch(error => {
    //         alert('Erro Clientes Executivos Upload Documento PDF: '+error);
    //     });
    // });
    // //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_documentos_cex_executar''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
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
                clienteExecutivoModalInfoDocumentos(upload_documentos_cliente_executivo_id);

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

    //Botão: frm_upload_fotografia_documento_cex_executar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_fotografia_documento_cex_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_fotografia_documento_cex');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';
        var upload_documentos_cliente_executivo_id = document.getElementById('upload_fotografia_documento_cliente_executivo_id').value;

        //Tratar Botões
        document.getElementById('frm_upload_fotografia_documento_cex_executar').style.display = 'block';

        //Criticando campos
        if (validar_frm_upload_fotografia_documento() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'clientes_executivos/uploadFotografia/upload_fotografia_documento', {
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
                const fileInput = document.getElementById('cex_fotografia_documento_file');
                const file = fileInput.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        document.getElementById('mi_cex_fotografia').src = reader.result;
                        document.getElementById('mi_cex_fotografia_documento').src = reader.result;
                    };
                    reader.readAsDataURL(file);
                }

                //Reset Form
                formulario.reset();
            } else if (data.error) {
                alertSwal('warning', 'Clientes Executivos', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Clientes Executivos Upload Fotografia Documento: '+error);
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_fotografia_cartao_emergencial_cex_executar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_fotografia_cartao_emergencial_cex_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_fotografia_cartao_emergencial_cex');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';
        var upload_documentos_cliente_executivo_id = document.getElementById('upload_fotografia_cartao_emergencial_cliente_executivo_id').value;

        //Tratar Botões
        document.getElementById('frm_upload_fotografia_cartao_emergencial_cex_executar').style.display = 'block';

        //Criticando campos
        if (validar_frm_upload_fotografia_cartao_emergencial() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'clientes_executivos/uploadFotografia/upload_fotografia_cartao_emergencial', {
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
                const fileInput = document.getElementById('cex_fotografia_cartao_emergencial_file');
                const file = fileInput.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        document.getElementById('mi_cex_fotografia_cartao_emergencial').src = reader.result;
                    };
                    reader.readAsDataURL(file);
                }

                //Reset Form
                formulario.reset();
            } else if (data.error) {
                alertSwal('warning', 'Clientes Executivos', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Clientes Executivos Upload Fotografia Cartão Emergencial: '+error);
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});