function funcionarioModalInfoControle(op, id='') {
    var div_fotografias = document.getElementById('md_fun_div_fotografias');
    var div_dados = document.getElementById('md_fun_div_dados');
    var div_documentos = document.getElementById('md_fun_div_documentos');
    var div_documentos_mensais = document.getElementById('md_fun_div_documentos_mensais');
    var div_cartao_emergencial = document.getElementById('md_fun_div_cartao_emergencial');

    //Fotografias
    if (op == 1) {
        div_fotografias.classList.remove('d-none');
        div_fotografias.classList.add('d-lg-flex');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_documentos_mensais.classList.remove('d-lg-flex');
        div_documentos_mensais.classList.add('d-none');

        div_cartao_emergencial.classList.remove('d-lg-flex');
        div_cartao_emergencial.classList.add('d-none');
    }

    //Dados
    if (op == 2) {
        div_fotografias.classList.remove('d-lg-flex');
        div_fotografias.classList.add('d-none');

        div_dados.classList.remove('d-none');
        div_dados.classList.add('d-lg-flex');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_documentos_mensais.classList.remove('d-lg-flex');
        div_documentos_mensais.classList.add('d-none');

        div_cartao_emergencial.classList.remove('d-lg-flex');
        div_cartao_emergencial.classList.add('d-none');

        funcionarioModalInfoDados(id);
    }

    //Documentos
    if (op == 3) {
        div_fotografias.classList.remove('d-lg-flex');
        div_fotografias.classList.add('d-none');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-none');
        div_documentos.classList.add('d-lg-flex');

        div_documentos_mensais.classList.remove('d-lg-flex');
        div_documentos_mensais.classList.add('d-none');

        div_cartao_emergencial.classList.remove('d-lg-flex');
        div_cartao_emergencial.classList.add('d-none');

        funcionarioModalInfoDocumentos(id);
    }

    //Cartão Emergencial
    if (op == 6) {
        div_fotografias.classList.remove('d-lg-flex');
        div_fotografias.classList.add('d-none');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_documentos_mensais.classList.remove('d-lg-flex');
        div_documentos_mensais.classList.add('d-none');

        div_cartao_emergencial.classList.remove('d-none');
        div_cartao_emergencial.classList.add('d-lg-flex');

        //Colocar imagem do Cartão emergencial
        if (id == '') {id = document.getElementById('mi_fun_funcionario_id').value;}
        cartaoEmergencialGerarPDF(2, id, 1, 'pt', 'fun_cartao_emergencial_1');
        cartaoEmergencialGerarPDF(2, id, 1, 'en', 'fun_cartao_emergencial_2');
    }

    //Documentos Mensais
    if (op == 7) {
        div_fotografias.classList.remove('d-lg-flex');
        div_fotografias.classList.add('d-none');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_documentos.classList.remove('d-lg-flex');
        div_documentos.classList.add('d-none');

        div_documentos_mensais.classList.remove('d-none');
        div_documentos_mensais.classList.add('d-lg-flex');

        div_cartao_emergencial.classList.remove('d-lg-flex');
        div_cartao_emergencial.classList.add('d-none');

        funcionarioModalInfoDocumentosMensais(id);
    }
}

// Modal Clientes Funcionários
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
    fetch(url_atual+'clientes_funcionarios/modalInfo/modal_info/'+id, {
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

        //Clientes Funcionário id
        document.getElementById('mi_fun_funcionario_id').value = funcionario.id;

        //Dados
        document.getElementById('mi_fun_nome').value = funcionario.name;
        document.getElementById('mi_fun_cpf').value = funcionario.cpf;
        document.getElementById('mi_fun_empresa').value = funcionario.empresaName;
        document.getElementById('mi_fun_tomador_servico_cliente').value = funcionario.tomadorServicoClienteName;
        document.getElementById('mi_fun_contratacao_tipo').value = funcionario.contratacaoTipoName;
        document.getElementById('mi_fun_funcao').value = funcionario.funcaoName;
        document.getElementById('mi_fun_departamento').value = funcionario.departamentoName;
        document.getElementById('mi_fun_nome_profissional').value = funcionario.nome_profissional;
        document.getElementById('mi_fun_data_nascimento').value = formatarData(2, funcionario.data_nascimento);
        document.getElementById('mi_fun_genero').value = funcionario.generoName;
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }).catch(error => {
        alert('Erro funcionarioModalInfo: '+error);
    });
}

// Modal Clientes Funcionários
// Documentos
function funcionarioModalInfoDocumentos(funcionario_id = '') {
    if (funcionario_id == '') { funcionario_id = document.getElementById('mi_fun_funcionario_id').value; }

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'clientes_funcionarios/modalInfo/documentos/'+funcionario_id, {
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
                acoes += '  <div class="col-12">';
                acoes += '      <button type="button" class="btn btn-outline-info text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Documento" onclick="window.open(\'' + dado.caminho + '\', \'_blank\');"><i class="fa fa-file-pdf font-size-18"></i></button>';
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

    // Primeiro: mostra todas as linhas
    todasLinhas.forEach(linha => linha.style.display = '');

    // Depois: aplica o filtro
    todasLinhas.forEach(linha => {
        if (!linha.classList.contains(`documento_fonte_${documento_fonte_id}`)) {
            linha.style.display = 'none';
        }
    });
}

// Modal Clientes Funcionários
// Documentos Mensais
function funcionarioModalInfoDocumentosMensais(funcionario_id = '') {
    if (funcionario_id == '') { funcionario_id = document.getElementById('mi_fun_funcionario_id').value; }

    var url_atual = window.location.protocol + '//' + window.location.host + '/';

    //Acessar rota
    fetch(url_atual+'clientes_funcionarios/modalInfo/documentos_mensais/'+funcionario_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        // Lendo JSON
        let funcionarios_documentos_mensais = data.funcionarios_documentos_mensais;

        // Grade
        let grade = '';

        if (funcionarios_documentos_mensais.length > 0) {
            grade += '<table class="table align-middle table-nowrap table-check table-sm class-datatable-3">';
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

                    acoes += `
                        <button type="button" class="btn btn-outline-info"
                            data-bs-toggle="tooltip" data-bs-placement="top"
                            title="Visualizar Documento"
                            onclick="window.open('${dado.caminho}', '_blank');">
                            <i class="fa fa-file-pdf font-size-18"></i>
                        </button>`;

                    acoes += '</div>';

                    // Monta bloco do documento com nome + botões
                    grade += `
                        <div class="col-12 col-md-4 col-lg-3 d-flex align-items-center mb-1">
                            <span class="me-2">
                                <i class="fa fa-file-pdf text-danger"></i> <span class="small">${nomeDoc}</span>
                            </span>
                            ${acoes}
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

    // Primeiro: mostra todas as linhas
    todasLinhas.forEach(linha => linha.style.display = '');

    // Depois: aplica o filtro
    todasLinhas.forEach(linha => {
        if (!linha.classList.contains(`documento_fonte_${documento_fonte_id}`)) {
            linha.style.display = 'none';
        }
    });
}

document.addEventListener("DOMContentLoaded", function (event) {});
