//Configuração
function crudConfiguracao({p_frm_operacao=null, p_fieldsDisabled=null, p_crudFormButtons1=null, p_crudFormButtons2=null, p_crudTable=null, p_crudForm=null, p_crudFormAjaxLoading=null, p_removeMask=null, p_putMask=null}) {
    //Campo hidden frm_operacao
    if (p_frm_operacao !== null) {
        document.getElementById('frm_operacao').value = p_frm_operacao;
    }

    //Campos do Formulário - disabled true/false
    if (p_fieldsDisabled !== null) {
        //Seleciona todos os inputs
        var elementos = document.querySelectorAll('input');
        elementos.forEach(function(elemento) {
            elemento.disabled = p_fieldsDisabled;
        });

        //Seleciona todos os textareas
        var elementos = document.querySelectorAll('textarea');
        elementos.forEach(function(elemento) {
            elemento.disabled = p_fieldsDisabled;
        });

        //Seleciona todos os selects
        var elementos = document.querySelectorAll('select');
        elementos.forEach(function(elemento) {
            elemento.disabled = p_fieldsDisabled;
        });

        //Seleciona todos os select2s
        var elementos = document.querySelectorAll('.select2');
        elementos.forEach(function(elemento) {
            elemento.disabled = p_fieldsDisabled;
        });

        //Campos do Formulário - disabled true/false (Campos Padrões)
        if (p_fieldsDisabled === true) {
            //Seleciona fildFilterTable
            var elementos = document.querySelectorAll('.fildFilterTable');
            elementos.forEach(function(elemento) {
                elemento.disabled = false;
            });

            //Seleciona fildLengthTable
            var elementos = document.querySelectorAll('.fildLengthTable');
            elementos.forEach(function(elemento) {
                elemento.disabled = false;
            });
        }
    }

    //Botões do Modal
    if (p_crudFormButtons1 == 'show') {
        document.getElementById('crudFormButtons1').style.display = 'block';

        //Verificando botões inferiores no formulário (só alguns submódulos tem esses botões inferiores)'''
        let divBotInf = document.getElementById('crudFormButtons1_inferior');
        if (divBotInf) {document.getElementById('crudFormButtons1_inferior').style.display = 'block';}
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }

    if (p_crudFormButtons1 == 'hide') {
        document.getElementById('crudFormButtons1').style.display = 'none';

        //Verificando botões inferiores no formulário (só alguns submódulos tem esses botões inferiores)'''
        let divBotInf = document.getElementById('crudFormButtons1_inferior');
        if (divBotInf) {document.getElementById('crudFormButtons1_inferior').style.display = 'none';}
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }

    if (p_crudFormButtons2 == 'show') {
        document.getElementById('crudFormButtons2').style.display = 'block';

        //Verificando botões inferiores no formulário (só alguns submódulos tem esses botões inferiores)'''
        let divBotInf = document.getElementById('crudFormButtons2_inferior');
        if (divBotInf) {document.getElementById('crudFormButtons2_inferior').style.display = 'block';}
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }

    if (p_crudFormButtons2 == 'hide') {
        document.getElementById('crudFormButtons2').style.display = 'none';

        //Verificando botões inferiores no formulário (só alguns submódulos tem esses botões inferiores)'''
        let divBotInf = document.getElementById('crudFormButtons2_inferior');
        if (divBotInf) {document.getElementById('crudFormButtons2_inferior').style.display = 'none';}
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }

    //Table Show/Hide
    if (p_crudTable == 'show') {
        //Seleciona crudTable
        document.getElementById('crudTable').style.display = 'block';
    }

    if (p_crudTable == 'hide') {
        //Seleciona crudTable
        document.getElementById('crudTable').style.display = 'none';
    }

    //Form Show/Hide
    if (p_crudForm == 'show') {
        //Seleciona crudForm
        document.getElementById('crudForm').style.display = 'block';
    }

    if (p_crudForm == 'hide') {
        //Seleciona crudForm
        document.getElementById('crudForm').style.display = 'none';
    }

    //DIV Loading Show/Hide
    if (p_crudFormAjaxLoading == 'show') {
        //Seleciona crudFormAjaxLoading
        document.getElementById('crudFormAjaxLoading').style.display = 'block';
    }

    if (p_crudFormAjaxLoading == 'hide') {
        //Seleciona crudFormAjaxLoading
        document.getElementById('crudFormAjaxLoading').style.display = 'none';
    }

    //Removendo Máscaras
    if (p_removeMask === true) {removeMask();}

    //Restaurando Máscaras
    if (p_putMask === true) {putMask();}
}

//Preencher Formulario
async function crudPreencherFormulario(campo, dados) {
    var campo_formulario = campo;
    var campo_tabela = campo;

    if (campo_tabela == 'id') {
        document.getElementById('registro_id').value = dados['id'];
    } else {
        //Ajustes'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        if (document.getElementById('crudPrefixPermissaoSubmodulo').value == 'ordens_servicos') {
            var ost = '';

            if (dados['ordem_servico_tipo_id'] == 1) {ost = 'ost1_';}
            if (dados['ordem_servico_tipo_id'] == 2) {ost = 'ost2_';}
            if (dados['ordem_servico_tipo_id'] == 3) {ost = 'ost3_';}

            if (campo_formulario == 'numero_ordem_servico') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'ano_ordem_servico') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'data_abertura') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'hora_abertura') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'data_prevista') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'hora_prevista') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'data_conclusao') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'hora_conclusao') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'data_finalizacao') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'hora_finalizacao') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'ordem_servico_status_id') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'cliente_id') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'cliente_nome') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'cliente_telefone') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'cliente_celular') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'cliente_email') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'cliente_logradouro') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'cliente_bairro') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'cliente_cidade') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'descricao_servico') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'ordem_servico_prioridade_id') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'observacao') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'valor_total') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'valor_total_extenso') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'porcentagem_desconto') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'valor_desconto') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'valor_desconto_extenso') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'forma_pagamento_id') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'forma_pagamento_status_id') {campo_formulario = ost+campo_formulario;}
            if (campo_formulario == 'forma_pagamento_observacao') {campo_formulario = ost+campo_formulario;}
        }

        if (document.getElementById('crudPrefixPermissaoSubmodulo').value == 'visitas_tecnicas') {
            var vtt = '';

            if (dados['visita_tecnica_tipo_id'] == 1) {vtt = 'vtt1_';}
            if (dados['visita_tecnica_tipo_id'] == 2) {vtt = 'vtt2_';}

            //if (campo_formulario == 'empresa_id') {campo_formulario = vtt+campo_formulario;}
            //if (campo_formulario == 'visita_tecnica_tipo_id') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'numero_visita_tecnica') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'ano_visita_tecnica') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'data_abertura') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'hora_abertura') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'data_prevista') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'hora_prevista') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'data_conclusao') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'hora_conclusao') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'data_finalizacao') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'hora_finalizacao') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'visita_tecnica_status_id') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'cliente_id') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'cliente_nome') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'cliente_cnpj') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'cliente_telefone') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'cliente_celular') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'cliente_email') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'cliente_logradouro') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'cliente_logradouro_numero') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'cliente_logradouro_complemento') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'cliente_bairro') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'cliente_cidade') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'cliente_uf') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'responsavel_funcionario_id') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'responsavel_funcionario_nome') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'responsavel_funcionario_email') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'nivel') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'classificacao') {campo_formulario = vtt+campo_formulario;}
            if (campo_formulario == 'comentarios') {campo_formulario = vtt+campo_formulario;}
        }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        var elemento = document.getElementById(campo_formulario);
        if (elemento) {
            if (elemento.classList.contains('select2')) {
                //Incluindo valor no Select e alterando no Select2
                var select2 = document.getElementById(campo_formulario);
                select2.value = dados[campo_tabela];
                var event = new Event('change', { bubbles: true });
                select2.dispatchEvent(event);
            } else {
                document.getElementById(campo_formulario).value = dados[campo_tabela];
            }
        }
    }
}

//Limpar Formulario
function crudLimparFormulario(nomeFormulario) {
    //Seleciona todos os elementos que possuem a classe 'is-invalid'
    var elementos = document.querySelectorAll('.is-invalid');
    elementos.forEach(function(elemento) {
        elemento.classList.remove('is-invalid');
    });

    //Limpando Select2
    var elementos = document.querySelectorAll('.select2');
    elementos.forEach(function(elemento) {
        elemento.value = '';
        var event = new Event('change', { bubbles: true });
        elemento.dispatchEvent(event);
    });

    // Limpar Formulário
    var formulario = document.getElementById(nomeFormulario);
    var elementos = formulario.elements;

    for (var i = 0; i < elementos.length; i++) {
        var elemento = elementos[i];

        switch (elemento.type) {
            case "text":
            case "textarea":
            case "select-one":
                elemento.value = '';
                break;
            case "checkbox":
            case "radio":
                elemento.checked = false;
                break;
        }
    }
}

//Montartabela
async function crudTable(route, fieldsColumns='', pageLength=25) {
    if (fieldsColumns == '') {
        let crudFieldsColumnsTable = document.getElementById('crudFieldsColumnsTable').value;
        let camposColunasTabelas = crudFieldsColumnsTable.split(',');
        fieldsColumns = [];
        camposColunasTabelas.forEach(function (campo) {
            fieldsColumns.push({data: campo});
        });
    }

    //DataTable configurações
    var tabela = document.getElementById('datatable-crud-ajax');
    var dataTable = new DataTable(tabela, {
        language: {
            pageLength: {
                '-1': 'Mostrar todos os registros',
                '_': 'Mostrar %d registros'
            },
            lengthMenu: 'Exibir _MENU_ resultados por página',
            emptyTable: 'Nenhum registro encontrado',
            info: 'Mostrando de _START_ até _END_ de _TOTAL_ registros',
            infoEmpty: 'Mostrando 0 até 0 de 0 registros',
            infoFiltered: '(Filtrados de _MAX_ registros)',
            infoThousands: '.',
            loadingRecords: 'Carregando...',
            processing: 'Processando...',
            zeroRecords: 'Nenhum registro encontrado',
            search: 'Pesquisar',
            paginate: {
                next: 'Próximo',
                previous: 'Anterior',
                first: 'Primeiro',
                last: 'Último'
            }
        },
        bDestroy: true,
        responsive: false,
        lengthChange: true,
        autoWidth: true,
        order: [],
        processing: true,
        serverSide: false,
        pageLength: pageLength,
        ajax: route,
        columns: fieldsColumns,

        // Após terminar a Grade de Registros
        initComplete: function(settings, json) {
            // Settings Submódulos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            const prefPermSubm = document.getElementById('crudPrefixPermissaoSubmodulo');

            if (prefPermSubm) {
                if (prefPermSubm.value === 'estoques_locais') {
                    // Controle Grade
                    controleGrade();
                }
            }
            //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        }
    });

    // Configuração
    crudConfiguracao({p_fieldsDisabled:false});
}

//Create
function crudCreate() {
    //Variáveis
    let prefixPermissaoSubmodulo = document.getElementById('crudPrefixPermissaoSubmodulo').value;
    let nameSubmodulo = document.getElementById('crudNameSubmodulo').value;
    let nameFormSubmodulo = document.getElementById('crudNameFormSubmodulo').value;

    //Acessar rota
    fetch(prefixPermissaoSubmodulo+'/create', {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo dados
        if (data.success) {
            //Limpar Formulario
            crudLimparFormulario(nameFormSubmodulo);

            //Configuração
            crudConfiguracao({p_frm_operacao:'create', p_fieldsDisabled:false, p_crudFormButtons1:'show', p_crudFormButtons2:'hide', p_crudTable:'hide', p_crudForm:'show', p_removeMask:true, p_putMask:true});

            //Settings Submódulos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            if (prefixPermissaoSubmodulo == 'estoques_locais') {
                // Controle Tela
                controleForm();
            }

            if (prefixPermissaoSubmodulo == 'grupos') {
                elementos = document.getElementsByClassName('markUnmarkAll');
                elementos.forEach(function(elemento) {elemento.style.display = 'block';});


                //Desabilitar/Habilitar opções de Show
                elementos = document.getElementsByClassName('tdShow');
                elementos.forEach(function(elemento) {elemento.style.display = 'none';});

                //Desabilitar/Habilitar opções de Create/Edit
                elementos = document.getElementsByClassName('tdCreateEdit');
                elementos.forEach(function(elemento) {elemento.style.display = 'block';});

                //Relatorios - desmarcar checkbox
                var elementos = document.querySelectorAll('.grupo_relatorios');
                elementos.forEach(function(elemento) {
                    elemento.checked = false;
                });

                //Graficos - desmarcar checkbox
                var elementos = document.querySelectorAll('.grupo_graficos');
                elementos.forEach(function(elemento) {
                    elemento.checked = false;
                });
            }

            if (prefixPermissaoSubmodulo == 'users') {
                //voltar configurações de campos apos passar pelo edit
                document.getElementById('email').readOnly = false;
                document.getElementById('funcionario_id').disabled = false;
            }

            if (prefixPermissaoSubmodulo == 'mapas') {
                //Colocar data infinita
                document.getElementById('data_inicio').value = '01/01/1900';
                document.getElementById('data_fim').value = '31/12/2500';

                //Esconder botão buscar icones
                elementos = document.getElementsByClassName('buscarIcones');
                elementos.forEach(function(elemento) {elemento.style.display = 'block';});

                document.getElementById('iconView').src = '';
            }

            if (prefixPermissaoSubmodulo == 'funcionarios') {
                //Doenças e Doenças Família'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                document.getElementById('doenca_diabetes').checked = false;
                document.getElementById('doenca_hipertensao').checked = false;
                document.getElementById('doenca_asma').checked = false;
                document.getElementById('doenca_renal').checked = false;
                document.getElementById('doenca_cardiaca').checked = false;
                document.getElementById('doenca_familia_diabetes').checked = false;
                document.getElementById('doenca_familia_hipertensao').checked = false;
                document.getElementById('doenca_familia_epilepsia').checked = false;
                document.getElementById('doenca_familia_cardiaca').checked = false;
                document.getElementById('doenca_familia_cancer').checked = false;
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }

            if (prefixPermissaoSubmodulo == 'clientes') {
                document.getElementById('link_copiar_endereco').style.display = '';

                //Deixar todos os checkbox de Medidas de Segurança'''''''''''''''''''
                elementos = document.getElementsByClassName('divSegurancaMedida');
                elementos.forEach(function(elemento) {elemento.style.display = 'block';});
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //desmarcar checkbox'''''''''''''''''''''''''''''''''''''''''''''''''
                elementos = document.getElementsByClassName('cbSegurancaMedida');
                elementos.forEach(function(elemento) {elemento.checked = false;});
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                pavimentosShowHide();
            }

            if (prefixPermissaoSubmodulo == 'clientes_executivos') {
                //Doenças e Doenças Família'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                document.getElementById('doenca_diabetes').checked = false;
                document.getElementById('doenca_hipertensao').checked = false;
                document.getElementById('doenca_asma').checked = false;
                document.getElementById('doenca_renal').checked = false;
                document.getElementById('doenca_cardiaca').checked = false;
                document.getElementById('doenca_familia_diabetes').checked = false;
                document.getElementById('doenca_familia_hipertensao').checked = false;
                document.getElementById('doenca_familia_epilepsia').checked = false;
                document.getElementById('doenca_familia_cardiaca').checked = false;
                document.getElementById('doenca_familia_cancer').checked = false;
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }

            if (prefixPermissaoSubmodulo == 'servicos') {
                //voltar configurações de campos apos passar pelo edit
                document.getElementById('name').readOnly = false;
                document.getElementById('servico_tipo_id').disabled = false;
            }

            if (prefixPermissaoSubmodulo == 'propostas') {
                limparServicosGrade();
            }

            if (prefixPermissaoSubmodulo == 'ordens_servicos') {
                //Create divOST2''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                ost2_limparServicosGrade();

                //hide div campos Escolher
                document.getElementById('ost2_ts_divServicoEscolher').style.display = '';

                //Iniciar alguns campos
                document.getElementById('ost2_ordem_servico_prioridade_id').value = 1;
                document.getElementById('ost2_forma_pagamento_id').value = 1;
                document.getElementById('ost2_forma_pagamento_status_id').value = 1;

                //Hide no Informações Gerais
                document.getElementById('ost2_divOrdemServicoInformacoesGerais').style.display = 'none';
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //Create divOST3''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                ost3_limparDestinosGrade();
                ost3_limparVeiculosGrade();
                ost3_limparClienteExecutivosGrade();
                ost3_limparEquipesGrade();

                //hide div campos Escolher
                document.getElementById('ost3_te_divDestinoEscolher').style.display = '';
                document.getElementById('ost3_te_divVeiculoEscolher').style.display = '';
                document.getElementById('ost3_te_divClienteExecutivoEscolher').style.display = '';
                document.getElementById('ost3_te_divEquipeEscolher').style.display = '';


                //Iniciar alguns campos
                document.getElementById('ost3_ordem_servico_prioridade_id').value = 1;

                //Hide no Informações Gerais
                document.getElementById('ost3_divOrdemServicoInformacoesGerais').style.display = 'none';

                //Grade Serviços (ost3_ts_servico_hiddens e ost3_ts_servico_nome)
                //Route: servicos/id
                fetch('servicos/7', {
                    method: 'GET',
                    headers: {
                        'REQUEST-ORIGIN': 'fetch',
                        'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    }
                }).then(response => {
                    return response.json();
                }).then(data => {
                    var servico = data.success;
                    var servico_id = servico.id;
                    var servico_nome = servico.name;

                    //ost3_ts_servico_nome
                    document.getElementById('ost3_ts_servico_nome').value = servico_nome;

                    //ost3_ts_servico_hiddens
                    hiddens = "<div id='ost3_ts_servico_hiddens_" + servico_id + "'>";
                    hiddens += "<input class='servico_item_hiddens' type='hidden' name='ost3_servico_item[]' id='ost3_servico_item' value='1'>";
                    hiddens += "<input type='hidden' name='ost3_servico_id[]' id='ost3_servico_id' value='"+servico_id+"'>";
                    hiddens += "<input type='hidden' name='ost3_servico_nome[]' id='ost3_servico_nome' value='"+servico_nome+"'>";
                    hiddens += "<input type='hidden' name='ost3_responsavel_funcionario_id[]' id='ost3_responsavel_funcionario_id' value=''>";
                    hiddens += "<input type='hidden' name='ost3_responsavel_funcionario_nome[]' id='ost3_responsavel_funcionario_nome' value=''>";
                    hiddens += "</div>";

                    //Adicionar hiddens na div
                    document.getElementById('ost3_ts_servico_hiddens').innerHTML = hiddens;
                }).catch(error => {
                    alert('Erro OrdemServicoOST3:'+error);
                });
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //Campo: ordem_servico_tipo_id''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //forçar change
                document.getElementById('ordem_servico_tipo_id').dispatchEvent(new Event('change'));

                //options
                const select = document.getElementById('ordem_servico_tipo_id');

                //Ativar todas as opções
                Array.from(select.options).forEach(option => {
                    option.disabled = false;
                });
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }

            if (prefixPermissaoSubmodulo == 'visitas_tecnicas') {}

            if (prefixPermissaoSubmodulo == 'brigadas_incendios') {
                // Preparando Tela
                controleDisplay();
                pro_controleDisplay();
                esc_controleDisplay();
                ger_controleDisplay();
            }

            if (prefixPermissaoSubmodulo == 'produtos_entradas') {
                // Preparando Tela
                pro_controleDisplay();

                // Preparando Botões
                pro_controleBotoes(0);
            }

            if (prefixPermissaoSubmodulo == 'produtos_movimentacoes') {
                // Limpar Grade
                document.getElementById('divProdutosMovimentacao').innerHTML = '';
            }

            if (prefixPermissaoSubmodulo == 'pontos_interesse') {
                // Configurar Tela
                configurarTela();

                // Desmarcar especialidades
                const elementos = document.querySelectorAll('.class_input_especialidade');
                elementos.forEach(function(elemento) {
                    elemento.checked = false;
                });
            }
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        } else if (data.error_permissao) {
            alertSwal('warning', "Permissão Negada", '', 'true', 2000);
        } else {
            alert('Erro interno');
        }
    }).catch(error => {
        alert('ErroFunctions:'+error);
    });
}

//View
function crudView(registro_id) {
    //Campo hidden registro_id
    document.getElementById('registro_id').value = registro_id;

    //Variáveis
    let prefixPermissaoSubmodulo = document.getElementById('crudPrefixPermissaoSubmodulo').value;
    let nameSubmodulo = document.getElementById('crudNameSubmodulo').value;
    let nameFormSubmodulo = document.getElementById('crudNameFormSubmodulo').value;

    //Buscar dados do Registro
    //Acessar rota
    fetch(prefixPermissaoSubmodulo+'/'+registro_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        // Lendo dados
        if (data.success) {
            // Limpar Formulario
            crudLimparFormulario(nameFormSubmodulo);

            // Configuração
            crudConfiguracao({ p_frm_operacao: 'view', p_fieldsDisabled: true, p_crudFormButtons1: 'hide', p_crudFormButtons2: 'show', p_crudTable: 'hide', p_crudForm: 'show', p_removeMask: true, p_putMask: true });

            // preencher formulário
            if (prefixPermissaoSubmodulo != 'clientes_funcionarios') {
                let input = document.getElementById('crudFieldsFormSubmodulo').value;
                let crudFieldsFormSubmodulo = input.split(',');
                crudFieldsFormSubmodulo.forEach(function (field) {
                    crudPreencherFormulario(field, data.success);
                });
            }

            //Settings Submódulos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            if (prefixPermissaoSubmodulo == 'estoques_locais') {
                // Botões Controle
                let btnAlterar = document.getElementById('btnCrudAlterarRegistro2');
                let btnExcluir = document.getElementById('btnCrudExcluirRegistro2');

                btnAlterar.style.display = '';
                btnExcluir.style.display = '';

                if (registro_id == 1 || registro_id == 2) {
                    btnAlterar.style.display = 'none';
                    btnExcluir.style.display = 'none';
                }

                // Controle Tela
                controleForm();
            }

            if (prefixPermissaoSubmodulo == 'grupos') {
                elementos = document.getElementsByClassName('markUnmarkAll');
                elementos.forEach(function(elemento) {elemento.style.display = 'block';});

                //Desabilitar/Habilitar opções de Show
                elementos = document.getElementsByClassName('tdShow');
                elementos.forEach(function(elemento) {elemento.style.display = 'none';});

                //Desabilitar/Habilitar opções de Create/Edit
                elementos = document.getElementsByClassName('tdCreateEdit');
                elementos.forEach(function(elemento) {elemento.style.display = 'block';});

                for (const chave in data.success) {
                    var elementos = document.querySelectorAll('.create_edit_' + chave);
                    elementos.forEach(function(elemento) {
                        elemento.checked = true;
                    });
                }

                //Relatorios
                //desmarcar checkbox
                var elementos = document.querySelectorAll('.grupo_relatorios');
                elementos.forEach(function(elemento) {
                    elemento.checked = false;
                });

                //marcar checkbox
                var relatorios = data.success['relatorios'];
                relatorios.forEach(function(item) {
                    document.getElementById('relatorio_' + item['relatorio_id']).checked = true;
                });

                //Graficos
                //desmarcar checkbox
                var elementos = document.querySelectorAll('.grupo_graficos');
                elementos.forEach(function(elemento) {
                    elemento.checked = false;
                });

                //marcar checkbox
                var graficos = data.success['graficos'];
                graficos.forEach(function(item) {
                    document.getElementById('grafico_' + item['grafico_id']).checked = true;
                });
            }

            if (prefixPermissaoSubmodulo == 'mapas') {
                //Esconder botão buscar icones
                elementos = document.getElementsByClassName('buscarIcones');
                elementos.forEach(function(elemento) {elemento.style.display = 'none';});

                document.getElementById('iconView').src = [];
                document.getElementById('iconView').src = 'build/assets/images/icones/mapas/'+data.success['icone'];
            }

            if (prefixPermissaoSubmodulo == 'funcionarios') {
                //mi_fun_funcionario_id
                document.getElementById('mi_fun_funcionario_id').value = registro_id;

                //Liberar campos frm_upload_documentos_fun
                document.getElementById('upload_documentos_funcionario_id').disabled = false;
                document.getElementById('upload_documentos_fun_acao').disabled = false;
                document.getElementById('fun_documentos_data_documento').disabled = false;
                document.getElementById('fun_documentos_aviso').disabled = false;
                document.getElementById('fun_documentos_file').disabled = false;
                document.getElementById('fun_documentos_documento_id').disabled = false;

                // Liberar campos frm_upload_documentos_mensais_fun
                document.getElementById('upload_documentos_mensais_funcionario_id').disabled = false;
                document.getElementById('upload_documentos_mensais_fun_acao').disabled = false;
                document.getElementById('fun_documentos_mensais_mes').disabled = false;
                document.getElementById('fun_documentos_mensais_ano').disabled = false;

                // Doenças e Doenças Família'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                document.getElementById('doenca_diabetes').checked = false;
                document.getElementById('doenca_hipertensao').checked = false;
                document.getElementById('doenca_asma').checked = false;
                document.getElementById('doenca_renal').checked = false;
                document.getElementById('doenca_cardiaca').checked = false;
                document.getElementById('doenca_familia_diabetes').checked = false;
                document.getElementById('doenca_familia_hipertensao').checked = false;
                document.getElementById('doenca_familia_epilepsia').checked = false;
                document.getElementById('doenca_familia_cardiaca').checked = false;
                document.getElementById('doenca_familia_cancer').checked = false;

                if (data.success['doenca_diabetes'] == 1) {document.getElementById('doenca_diabetes').checked = true;}
                if (data.success['doenca_hipertensao'] == 1) {document.getElementById('doenca_hipertensao').checked = true;}
                if (data.success['doenca_asma'] == 1) {document.getElementById('doenca_asma').checked = true;}
                if (data.success['doenca_renal'] == 1) {document.getElementById('doenca_renal').checked = true;}
                if (data.success['doenca_cardiaca'] == 1) {document.getElementById('doenca_cardiaca').checked = true;}
                if (data.success['doenca_familia_diabetes'] == 1) {document.getElementById('doenca_familia_diabetes').checked = true;}
                if (data.success['doenca_familia_hipertensao'] == 1) {document.getElementById('doenca_familia_hipertensao').checked = true;}
                if (data.success['doenca_familia_epilepsia'] == 1) {document.getElementById('doenca_familia_epilepsia').checked = true;}
                if (data.success['doenca_familia_cardiaca'] == 1) {document.getElementById('doenca_familia_cardiaca').checked = true;}
                if (data.success['doenca_familia_cancer'] == 1) {document.getElementById('doenca_familia_cancer').checked = true;}
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }

            if (prefixPermissaoSubmodulo == 'clientes') {
                document.getElementById('link_copiar_endereco').style.display = 'none';

                //Liberar campos frm_upload_documentos_cli
                document.getElementById('upload_documentos_cliente_id').disabled = false;
                document.getElementById('upload_documentos_cli_acao').disabled = false;
                document.getElementById('cli_documentos_documento_id').disabled = false;
                document.getElementById('cli_documentos_data_documento').disabled = false;
                document.getElementById('cli_documentos_aviso').disabled = false;
                document.getElementById('cli_documentos_file').disabled = false;

                //Hide em todos os checkbox de Medidas de Segurança''''''''''''''''''
                elementos = document.getElementsByClassName('divSegurancaMedida');
                elementos.forEach(function(elemento) {elemento.style.display = 'nome';});
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //desmarcar checkbox'''''''''''''''''''''''''''''''''''''''''''''''''
                elementos = document.getElementsByClassName('cbSegurancaMedida');
                elementos.forEach(function(elemento) {elemento.checked = false;});
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //varrer os checkbox'''''''''''''''''''''''''''''''''''''''''''''''''
                cliente_seguranca_medidas = data.success['cliente_seguranca_medidas'];

                cliente_seguranca_medidas.forEach(function(item) {
                    //marcar como checado
                    document.getElementById('seguranca_medida_'+item.pavimento+'_'+item.seguranca_medida_id).checked = true;

                    //Outros campos
                    document.getElementById('quantidade_'+item.pavimento+'_'+item.seguranca_medida_id).value = item.quantidade;
                    document.getElementById('tipo_'+item.pavimento+'_'+item.seguranca_medida_id).value = item.tipo;
                    document.getElementById('observacao_'+item.pavimento+'_'+item.seguranca_medida_id).value = item.observacao;

                    //dar show
                    elementos = document.getElementsByClassName('divSegurancaMedida'+item.pavimento+item.seguranca_medida_id);
                    elementos.forEach(function(elemento) {elemento.style.display = 'block';});
                });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                pavimentosShowHide();
            }

            if (prefixPermissaoSubmodulo == 'clientes_executivos') {
                //Doenças e Doenças Família'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                document.getElementById('doenca_diabetes').checked = false;
                document.getElementById('doenca_hipertensao').checked = false;
                document.getElementById('doenca_asma').checked = false;
                document.getElementById('doenca_renal').checked = false;
                document.getElementById('doenca_cardiaca').checked = false;
                document.getElementById('doenca_familia_diabetes').checked = false;
                document.getElementById('doenca_familia_hipertensao').checked = false;
                document.getElementById('doenca_familia_epilepsia').checked = false;
                document.getElementById('doenca_familia_cardiaca').checked = false;
                document.getElementById('doenca_familia_cancer').checked = false;

                if (data.success['doenca_diabetes'] == 1) {document.getElementById('doenca_diabetes').checked = true;}
                if (data.success['doenca_hipertensao'] == 1) {document.getElementById('doenca_hipertensao').checked = true;}
                if (data.success['doenca_asma'] == 1) {document.getElementById('doenca_asma').checked = true;}
                if (data.success['doenca_renal'] == 1) {document.getElementById('doenca_renal').checked = true;}
                if (data.success['doenca_cardiaca'] == 1) {document.getElementById('doenca_cardiaca').checked = true;}
                if (data.success['doenca_familia_diabetes'] == 1) {document.getElementById('doenca_familia_diabetes').checked = true;}
                if (data.success['doenca_familia_hipertensao'] == 1) {document.getElementById('doenca_familia_hipertensao').checked = true;}
                if (data.success['doenca_familia_epilepsia'] == 1) {document.getElementById('doenca_familia_epilepsia').checked = true;}
                if (data.success['doenca_familia_cardiaca'] == 1) {document.getElementById('doenca_familia_cardiaca').checked = true;}
                if (data.success['doenca_familia_cancer'] == 1) {document.getElementById('doenca_familia_cancer').checked = true;}
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }

            if (prefixPermissaoSubmodulo == 'users') {}

            if (prefixPermissaoSubmodulo == 'propostas') {
                limparServicosGrade();

                proposta_servicos = data.success['proposta_servicos'];

                proposta_servicos.forEach(function (item) {
                    //Dados para preencher na linha da grade
                    document.getElementById('ts_servico_id').value = item.servico_id;
                    document.getElementById('ts_servico_nome').value = item.servico_nome;
                    document.getElementById('ts_servico_valor').value = float2moeda(item.servico_valor);
                    document.getElementById('ts_servico_qtd').value = item.servico_quantidade;

                    atualizarServicoGrade(1);
                });
            }

            if (prefixPermissaoSubmodulo == 'ordens_servicos') {
                //View divOST2''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //Grade Serviços
                ost2_limparServicosGrade();

                ordem_servico_servicos = data.success['ordem_servico_servicos'];

                ordem_servico_servicos.forEach(function (item) {
                    //Dados para preencher na linha da grade
                    document.getElementById('ost2_ts_servico_id').value = item.servico_id;
                    document.getElementById('ost2_ts_servico_nome').value = item.servico_nome;
                    document.getElementById('ost2_ts_responsavel_funcionario_id').value = item.responsavel_funcionario_id;
                    document.getElementById('ost2_ts_responsavel_funcionario_nome').value = item.responsavel_funcionario_nome;
                    document.getElementById('ost2_ts_servico_valor').value = float2moeda(item.servico_valor);
                    document.getElementById('ost2_ts_servico_quantidade').value = item.servico_quantidade;

                    ost2_atualizarServicoGrade(1);
                });

                ost2_atualizarServicoEscolher(0);
                ost2_atualizarResponsavelFuncionarioEscolher(0);

                document.getElementById('ost2_ts_divServicoEscolher').style.display = 'none';

                //Show no Informações Gerais
                document.getElementById('ost2_divOrdemServicoInformacoesGerais').style.display = '';
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //View divOST3''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //Grade Serviços (ost3_ts_servico_hiddens, ost3_ts_servico_nome e ost3_ts_responsavel_funcionario_id)
                ordem_servico_servicos = data.success['ordem_servico_servicos'];

                ordem_servico_servicos.forEach(function (item) {
                    //Dados para preencher na linha da grade
                    var servico_id = item.servico_id;
                    var servico_nome = item.servico_nome;
                    var responsavel_funcionario_id = item.responsavel_funcionario_id ?? '';
                    var responsavel_funcionario_nome = item.responsavel_funcionario_nome ?? '';

                    //ost3_ts_servico_nome
                    document.getElementById('ost3_ts_servico_nome').value = servico_nome;

                    //ost3_ts_responsavel_funcionario_id
                    document.getElementById('ost3_ts_responsavel_funcionario_id').value = responsavel_funcionario_id;

                    //ost3_ts_servico_hiddens
                    var hiddens = "<div id='ost3_ts_servico_hiddens_" + servico_id + "'>";
                    hiddens += "<input class='servico_item_hiddens' type='hidden' name='ost3_servico_item[]' id='ost3_servico_item' value='1'>";
                    hiddens += "<input type='hidden' name='ost3_servico_id[]' id='ost3_servico_id' value='"+servico_id+"'>";
                    hiddens += "<input type='hidden' name='ost3_servico_nome[]' id='ost3_servico_nome' value='"+servico_nome+"'>";
                    hiddens += "<input type='hidden' name='ost3_responsavel_funcionario_id[]' id='ost3_responsavel_funcionario_id' value='"+responsavel_funcionario_id+"'>";
                    hiddens += "<input type='hidden' name='ost3_responsavel_funcionario_nome[]' id='ost3_responsavel_funcionario_nome' value='"+responsavel_funcionario_nome+"'>";
                    hiddens += "</div>";

                    //Adicionar hiddens na div
                    document.getElementById('ost3_ts_servico_hiddens').innerHTML = hiddens;
                });

                //Grade Destinos
                ost3_limparDestinosGrade();

                ordem_servico_destinos = data.success['ordem_servico_destinos'];

                ordem_servico_destinos.forEach(function (item) {
                    //Dados para preencher na linha da grade
                    document.getElementById('ost3_te_destino_ordem').value = item.destino_ordem;
                    document.getElementById('ost3_te_destino_cep').value = item.destino_cep;
                    document.getElementById('ost3_te_destino_logradouro').value = item.destino_logradouro;
                    document.getElementById('ost3_te_destino_bairro').value = item.destino_bairro;
                    document.getElementById('ost3_te_destino_localidade').value = item.destino_localidade;
                    document.getElementById('ost3_te_destino_uf').value = item.destino_uf;
                    document.getElementById('ost3_te_destino_numero').value = item.destino_numero;
                    document.getElementById('ost3_te_destino_complemento').value = item.destino_complemento;

                    ost3_atualizarDestinoGrade(1, ordem_servico_destinos);
                });

                ost3_atualizarDestinoEscolher(0);

                document.getElementById('ost3_te_divDestinoEscolher').style.display = 'none';

                //Grade Veículos
                ost3_limparVeiculosGrade();

                ordem_servico_veiculos = data.success['ordem_servico_veiculos'];

                ordem_servico_veiculos.forEach(function (item) {
                    //Dados para preencher na linha da grade
                    document.getElementById('ost3_te_veiculo_id').value = item.veiculo_id;
                    document.getElementById('ost3_te_veiculo_marca').value = item.veiculo_marca;
                    document.getElementById('ost3_te_veiculo_modelo').value = item.veiculo_modelo;
                    document.getElementById('ost3_te_veiculo_placa').value = item.veiculo_placa;
                    document.getElementById('ost3_te_veiculo_combustivel').value = item.veiculo_combustivel;

                    ost3_atualizarVeiculoGrade(1);
                });

                ost3_atualizarVeiculoEscolher(0);

                document.getElementById('ost3_te_divVeiculoEscolher').style.display = 'none';

                //Montar combos veiculos
                ost3_atualizarComboVeiculosClienteExecutivo();
                ost3_atualizarComboVeiculosEquipe();

                //Grade Executivos
                ost3_limparClienteExecutivosGrade();

                ordem_servico_executivos = data.success['ordem_servico_executivos'];

                ordem_servico_executivos.forEach(function (item) {
                    //Dados para preencher na linha da grade
                    document.getElementById('ost3_te_cliente_executivo_id').value = item.cliente_executivo_id;
                    document.getElementById('ost3_te_cliente_executivo_nome').value = item.cliente_executivo_nome;
                    document.getElementById('ost3_te_cliente_executivo_funcao').value = item.cliente_executivo_funcao;
                    document.getElementById('ost3_te_cliente_executivo_veiculo_id').value = item.cliente_executivo_veiculo_id;

                    ost3_atualizarClienteExecutivoGrade(1);
                });

                ost3_atualizarClienteExecutivoEscolher(0);

                document.getElementById('ost3_te_divClienteExecutivoEscolher').style.display = 'none';

                //Grade Equipes
                ost3_limparEquipesGrade();

                ordem_servico_equipes = data.success['ordem_servico_equipes'];

                ordem_servico_equipes.forEach(function (item) {
                    //Dados para preencher na linha da grade
                    document.getElementById('ost3_te_equipe_funcionario_id').value = item.equipe_funcionario_id;
                    document.getElementById('ost3_te_equipe_funcionario_nome').value = item.equipe_funcionario_nome;
                    document.getElementById('ost3_te_equipe_funcionario_funcao').value = item.equipe_funcionario_funcao;
                    document.getElementById('ost3_te_equipe_funcionario_veiculo_id').value = item.equipe_funcionario_veiculo_id;

                    ost3_atualizarEquipeGrade(1);
                });

                ost3_atualizarEquipeEscolher(0);

                document.getElementById('ost3_te_divEquipeEscolher').style.display = 'none';

                //Show no Informações Gerais
                document.getElementById('ost3_divOrdemServicoInformacoesGerais').style.display = '';
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //Campo: ordem_servico_tipo_id (forçar change)
                document.getElementById('ordem_servico_tipo_id').dispatchEvent(new Event('change'));
            }

            if (prefixPermissaoSubmodulo == 'visitas_tecnicas') {
                // visita_tecnica_tipo_id
                const visita_tecnica_tipo_id = document.getElementById('visita_tecnica_tipo_id');

                // View divVTT1'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Global Elementos vtt1
                const vtt1_divClienteId = document.getElementById('vtt1_divClienteId');
                const vtt1_divResponsavelFuncionarioId = document.getElementById('vtt1_divResponsavelFuncionarioId');
                const vtt1_formVisualizar1 = document.getElementById('vtt1_formVisualizar1');
                const vtt1_formVisualizar2 = document.getElementById('vtt1_formVisualizar2');
                const vtt1_formVisualizar3 = document.getElementById('vtt1_formVisualizar3');
                const vtt1_formVisualizar4 = document.getElementById('vtt1_formVisualizar4');
                const vtt1_divPerguntas = document.getElementById('vtt1_divPerguntas');

                vtt1_divClienteId.style.display = 'none';
                vtt1_divResponsavelFuncionarioId.style.display = 'none';
                vtt1_formVisualizar1.style.display = 'none';
                vtt1_formVisualizar2.style.display = 'none';
                vtt1_formVisualizar3.style.display = 'none';
                vtt1_formVisualizar4.style.display = 'none';
                vtt1_divPerguntas.innerHTML = '';
                vtt1_divPerguntas.style.display = 'none';

                if (visita_tecnica_tipo_id.value == 1) {
                    // Acertos no Dropdown
                    vtt1_formVisualizar1.style.display = '';
                    vtt1_formVisualizar2.style.display = '';
                    vtt1_formVisualizar3.style.display = '';
                    vtt1_formVisualizar4.style.display = '';

                    // Visita Técnica Dados
                    var visitas_tecnicas_dados = data.success['visitas_tecnicas_dados'];

                    // Montar Perguntas
                    const htmlPerguntas = vtt1_gerarHtmlPerguntas(visitas_tecnicas_dados);

                    vtt1_divPerguntas.style.display = '';
                    vtt1_divPerguntas.innerHTML = htmlPerguntas;
                }
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // View divVTT2'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Global Elementos vtt2
                const vtt2_divClienteId = document.getElementById('vtt2_divClienteId');
                const vtt2_divResponsavelFuncionarioId = document.getElementById('vtt2_divResponsavelFuncionarioId');
                const vtt2_formVisualizar1 = document.getElementById('vtt2_formVisualizar1');
                const vtt2_formVisualizar2 = document.getElementById('vtt2_formVisualizar2');
                const vtt2_formVisualizar3 = document.getElementById('vtt2_formVisualizar3');
                const vtt2_formVisualizar4 = document.getElementById('vtt2_formVisualizar4');
                const vtt2_divPerguntas = document.getElementById('vtt2_divPerguntas');

                vtt2_divClienteId.style.display = 'none';
                vtt2_divResponsavelFuncionarioId.style.display = 'none';
                vtt2_formVisualizar1.style.display = 'none';
                vtt2_formVisualizar2.style.display = 'none';
                vtt2_formVisualizar3.style.display = 'none';
                vtt2_formVisualizar4.style.display = 'none';
                vtt2_divPerguntas.innerHTML = '';
                vtt2_divPerguntas.style.display = 'none';

                if (visita_tecnica_tipo_id.value == 2) {
                    // Acertos no Dropdown
                    vtt2_formVisualizar1.style.display = '';
                    vtt2_formVisualizar2.style.display = '';
                    vtt2_formVisualizar3.style.display = '';
                    vtt2_formVisualizar4.style.display = '';

                    // Visita Técnica Dados
                    var visitas_tecnicas_dados = data.success['visitas_tecnicas_dados'];

                    // Montar Perguntas
                    const htmlPerguntas = vtt2_gerarHtmlPerguntas(visitas_tecnicas_dados);

                    vtt2_divPerguntas.style.display = '';
                    vtt2_divPerguntas.innerHTML = htmlPerguntas;
                }
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //Campo: visita_tecnica_tipo_id (forçar change)
                visita_tecnica_tipo_id.dispatchEvent(new Event('change'));
            }

            if (prefixPermissaoSubmodulo == 'brigadas_incendios') {
                // Preparando Tela
                controleDisplay();
                pro_controleDisplay();
                esc_controleDisplay();
                ger_controleDisplay();

                // Grade de Produtos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // Grade de Produtos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Colocar Produtos da Brigada Incêndio
                const brigada_incendio_produtos = data.success['brigada_incendio_produtos'];

                brigada_incendio_produtos.forEach(function (item) {
                    // Adicionar linha na grade
                    pro_adicionarLinhaGrade({
                        produto_id: item.produto_id,
                        produto_categoria_name: item.produto_categoria_name,
                        produto_name: item.produto_name,
                        produto_quantidade: item.produto_quantidade
                    });
                });
                // Grade de Produtos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // Grade de Produtos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Grade de Escalas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // Grade de Escalas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Colocar Escalas da Brigada Incêndio
                const brigada_incendio_escalas = data.success['brigada_incendio_escalas'];
                const brigada_incendio_escalas_brigadistas = data.success['brigada_incendio_escalas_brigadistas'];

                brigada_incendio_escalas.forEach(function (item) {
                    // Filtra brigadistas desta escala
                    const brigadistasDaEscala = brigada_incendio_escalas_brigadistas.filter(b => b.brigada_incendio_escala_id === item.id);

                    // Adicionar linha na grade
                    esc_adicionarLinhaGrade({
                        escala_tipo_id: item.escala_tipo_id,
                        escala_tipo_name: item.escala_tipo_name,
                        escala_tipo_quantidade_alas: item.escala_tipo_quantidade_alas,
                        escala_tipo_quantidade_horas_trabalhadas: item.escala_tipo_quantidade_horas_trabalhadas,
                        escala_tipo_quantidade_horas_descanso: item.escala_tipo_quantidade_horas_descanso,
                        quantidade_brigadistas_por_ala: item.quantidade_brigadistas_por_ala,
                        quantidade_brigadistas_total: item.quantidade_brigadistas_total,
                        posto: item.posto,
                        hora_inicio_ala_1: item.hora_inicio_ala_1,
                        brigadistas: brigadistasDaEscala
                    });
                });
                // Grade de Escalas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // Grade de Escalas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Grade de Geradas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // Grade de Geradas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Grade de Geradas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // Grade de Geradas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }

            if (prefixPermissaoSubmodulo == 'produtos_entradas') {
                // Preparando Tela
                pro_controleDisplay();

                // Preparando Botões
                pro_controleBotoes(data.success['executada']);

                // Grade de Produtos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // Grade de Produtos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Colocar Produtos Entradas Itens
                const produto_entrada_itens = data.success['produto_entrada_itens'];

                produto_entrada_itens.forEach(function (item) {
                    // Adicionar linha na grade
                    pro_adicionarLinhaGrade({
                        produto_item_id: item.id,
                        produto_id: item.produto_id,
                        produto_categoria_name: item.produto_categoria_name,
                        produto_name: item.produto_name,
                        produto_tipo_id: item.produto_tipo_id,
                        produto_tipo_name: item.produto_tipo_name,
                        produto_numero_patrimonio: item.produto_numero_patrimonio,
                        produto_valor_unitario: item.produto_valor_unitario
                    });
                });

                pro_verificarDuplicadosPatrimonio();

                // Colocar Total Geral
                pro_colocarTotalGeralGrade();
                // Grade de Produtos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // Grade de Produtos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }

            if (prefixPermissaoSubmodulo == 'produtos_movimentacoes') {
                grade_produtos();
            }

            if (prefixPermissaoSubmodulo == 'pontos_interesse') {
                // Configurar Tela
                configurarTela();

                // Marcar especialidades
                const especialidades = data.success['especialidades'];
                especialidades.forEach(function(item) {
                    document.getElementById('especialidade_' + item['especialidade_id']).checked = true;
                });

                // Display nas divs não checadas
                for (let x = 1; x <= 200; x++) {
                    const chk = document.getElementById('especialidade_' + x);
                    const div = document.getElementById('divEspecialidade_' + x);

                    // só continua se ambos existirem na página
                    if (!chk || !div) continue;

                    if (!chk.checked) {
                        div.style.display = 'none';
                    } else {
                        div.style.display = ''; // mostra se estiver marcado
                    }
                }
            }

            if (prefixPermissaoSubmodulo == 'produtos_controle_situacoes') {
                // Formatar Tela
                document.getElementById('divPatrimonioSituacoes').style.display = '';
                document.getElementById('divAlterarSituacaoLocal').style.display = 'none';
                document.getElementById('divInformacoesGerais').style.display = 'none';

                // Campos
                document.getElementById('divFotografia').src = data.success['produto_fotografia'];
                document.getElementById('divNumeroPatrimonio').innerHTML = '<b>'+data.success['produto_numero_patrimonio']+'</b>';
                document.getElementById('divProdutoName').innerHTML = '<b>'+data.success['produto_nome']+'</b><br>'+data.success['produto_categoria'];

                // Local
                let local = '';
                if (data.success['produto_estoque_id'] == 1) {
                    local = '<b>'+data.success['produto_local']+'</b><br>'+'<span class="small">'+data.success['produto_estoque_nome']+': '+data.success['produto_local_empresa']+'</span>';
                } else {
                    local = '<b>'+data.success['produto_local']+'</b><br>'+'<span class="small">'+data.success['produto_estoque_nome']+': '+data.success['produto_local_cliente']+'</span>';
                }

                document.getElementById('divLocal').innerHTML = local;

                // Situação Atual
                let situacao = '';
                if (data.success['produto_situacao_id'] == 1 || data.success['produto_situacao_id'] == 2 || data.success['produto_situacao_id'] == 5) {
                    situacao = '<div class="text-center text-success">'+'<b>'+data.success['produto_situacao']+'</b>'+'</div>'+'<div class="text-center text-success small">Movimentação Permitida</div>';
                } else {
                    situacao = '<div class="text-center text-danger">'+'<b>'+data.success['produto_situacao']+'</b>'+'</div>'+'<div class="text-center text-danger small">Movimentação não Permitida</div>';
                }

                document.getElementById('divSituacaoAtual').innerHTML = situacao;

                // Campos Hiddens
                document.getElementById('registro_id').value = data.success['produto_entrada_item_id'];
                document.getElementById('produto_entrada_item_id').value = data.success['produto_entrada_item_id'];
                document.getElementById('anterior_produto_situacao_id').value = data.success['produto_situacao_id'];
                document.getElementById('anterior_estoque_local_id').value = data.success['estoque_local_id'];

                // Patrimônio Situações Table
                patrimonioSituacoesTable(data.success['produto_entrada_item_id']);
            }

            if (prefixPermissaoSubmodulo == 'clientes_funcionarios') {
                // Preencher Formulario
                const dados = data.success;

                document.getElementById('registro_id').value = dados['id'];
                document.getElementById('name').value = dados['name'];
                document.getElementById('cpf').value = dados['cpf'];
                document.getElementById('empresa').value = dados['empresaName'];
                document.getElementById('tomador_servico_cliente').value = dados['tomadorServicoClienteName'];
                document.getElementById('contratacao_tipo').value = dados['contratacaoTipoName'];
                document.getElementById('funcao').value = dados['funcaoName'];
                document.getElementById('departamento').value = dados['departamentoName'];
                document.getElementById('nome_profissional').value = dados['nome_profissional'];
                document.getElementById('data_nascimento').value = formatarData(2, dados['data_nascimento']);
                document.getElementById('genero').value = dados['generoName'];




                // // mi_fun_funcionario_id
                // document.getElementById('mi_fun_funcionario_id').value = registro_id;

                // // Doenças e Doenças Família'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // document.getElementById('doenca_diabetes').checked = false;
                // document.getElementById('doenca_hipertensao').checked = false;
                // document.getElementById('doenca_asma').checked = false;
                // document.getElementById('doenca_renal').checked = false;
                // document.getElementById('doenca_cardiaca').checked = false;
                // document.getElementById('doenca_familia_diabetes').checked = false;
                // document.getElementById('doenca_familia_hipertensao').checked = false;
                // document.getElementById('doenca_familia_epilepsia').checked = false;
                // document.getElementById('doenca_familia_cardiaca').checked = false;
                // document.getElementById('doenca_familia_cancer').checked = false;

                // if (data.success['doenca_diabetes'] == 1) {document.getElementById('doenca_diabetes').checked = true;}
                // if (data.success['doenca_hipertensao'] == 1) {document.getElementById('doenca_hipertensao').checked = true;}
                // if (data.success['doenca_asma'] == 1) {document.getElementById('doenca_asma').checked = true;}
                // if (data.success['doenca_renal'] == 1) {document.getElementById('doenca_renal').checked = true;}
                // if (data.success['doenca_cardiaca'] == 1) {document.getElementById('doenca_cardiaca').checked = true;}
                // if (data.success['doenca_familia_diabetes'] == 1) {document.getElementById('doenca_familia_diabetes').checked = true;}
                // if (data.success['doenca_familia_hipertensao'] == 1) {document.getElementById('doenca_familia_hipertensao').checked = true;}
                // if (data.success['doenca_familia_epilepsia'] == 1) {document.getElementById('doenca_familia_epilepsia').checked = true;}
                // if (data.success['doenca_familia_cardiaca'] == 1) {document.getElementById('doenca_familia_cardiaca').checked = true;}
                // if (data.success['doenca_familia_cancer'] == 1) {document.getElementById('doenca_familia_cancer').checked = true;}
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            }
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Configuração
            crudConfiguracao({p_removeMask:true, p_putMask:true});
        } else if (data.error_not_found) {
            //Configuração
            crudConfiguracao({p_removeMask:true, p_putMask:true});

            alertSwal('warning', "Registro não encontrado", '', 'true', 2000);
        } else if (data.error_permissao) {
            //Configuração
            crudConfiguracao({p_removeMask:true, p_putMask:true});

            alertSwal('warning', "Permissão Negada", '', 'true', 2000);
        } else {
            //Configuração
            crudConfiguracao({p_removeMask:true, p_putMask:true});

            alert('Erro interno');
        }
    }).catch(error => {
        alert('Erro Crud Functions View:'+error);
    });
}

//Edit
async function crudEdit(registro_id) {
    //Variáveis
    if (registro_id == 0) {registro_id = document.getElementById('registro_id').value;}
    let prefixPermissaoSubmodulo = document.getElementById('crudPrefixPermissaoSubmodulo').value;
    let nameSubmodulo = document.getElementById('crudNameSubmodulo').value;
    let nameFormSubmodulo = document.getElementById('crudNameFormSubmodulo').value;

    //Buscar dados do Registro
    fetch(prefixPermissaoSubmodulo+'/'+registro_id+'/edit', {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo dados
        if (data.success) {
            //Limpar Formulario
            crudLimparFormulario(nameFormSubmodulo);

            //Configuração
            crudConfiguracao({p_frm_operacao:'edit', p_fieldsDisabled:false, p_crudFormButtons1:'show', p_crudFormButtons2:'hide', p_crudTable:'hide', p_crudForm:'show', p_removeMask:true, p_putMask:true});

            //preencher formulário
            let input = document.getElementById('crudFieldsFormSubmodulo').value;
            let crudFieldsFormSubmodulo = input.split(',');
            crudFieldsFormSubmodulo.forEach(function (field) {
                crudPreencherFormulario(field, data.success);
            });

            //Settings Submódulos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            if (prefixPermissaoSubmodulo == 'estoques_locais') {
                // Controle Tela
                controleForm();
            }

            if (prefixPermissaoSubmodulo == 'grupos') {
                elementos = document.getElementsByClassName('markUnmarkAll');
                elementos.forEach(function(elemento) {elemento.style.display = 'block';});

                //Desabilitar/Habilitar opções de Show
                elementos = document.getElementsByClassName('tdShow');
                elementos.forEach(function(elemento) {elemento.style.display = 'none';});

                //Desabilitar/Habilitar opções de Create/Edit
                elementos = document.getElementsByClassName('tdCreateEdit');
                elementos.forEach(function(elemento) {elemento.style.display = 'block';});

                for (const chave in data.success) {
                    var elementos = document.querySelectorAll('.create_edit_' + chave);
                    elementos.forEach(function(elemento) {
                        elemento.checked = true;
                    });
                }

                //Relatorios
                //desmarcar checkbox
                var elementos = document.querySelectorAll('.grupo_relatorios');
                elementos.forEach(function(elemento) {
                    elemento.checked = false;
                });

                //marcar checkbox
                var relatorios = data.success['relatorios'];
                relatorios.forEach(function(item) {
                    document.getElementById('relatorio_' + item['relatorio_id']).checked = true;
                });

                //Graficos
                //desmarcar checkbox
                var elementos = document.querySelectorAll('.grupo_graficos');
                elementos.forEach(function(elemento) {
                    elemento.checked = false;
                });

                //marcar checkbox
                var graficos = data.success['graficos'];
                graficos.forEach(function(item) {
                    document.getElementById('grafico_' + item['grafico_id']).checked = true;
                });
            }

            if (prefixPermissaoSubmodulo == 'users') {
                //Não deixar alterar E-mail pelo submódulo Users
                document.getElementById('email').readOnly = true;

                //Verificar se pode alterar campo funcionario_id
                var user_operacoes_qtd = data.success['user_operacoes_qtd'];
                if (user_operacoes_qtd > 0) {document.getElementById('funcionario_id').disabled = true;}
            }

            if (prefixPermissaoSubmodulo == 'mapas') {
                //Esconder botão buscar icones
                elementos = document.getElementsByClassName('buscarIcones');
                elementos.forEach(function(elemento) {elemento.style.display = 'block';});

                document.getElementById('iconView').src = '';
                document.getElementById('iconView').src = 'build/assets/images/icones/mapas/'+data.success['icone'];
            }

            if (prefixPermissaoSubmodulo == 'funcionarios') {
                //Doenças e Doenças Família'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                document.getElementById('doenca_diabetes').checked = false;
                document.getElementById('doenca_hipertensao').checked = false;
                document.getElementById('doenca_asma').checked = false;
                document.getElementById('doenca_renal').checked = false;
                document.getElementById('doenca_cardiaca').checked = false;
                document.getElementById('doenca_familia_diabetes').checked = false;
                document.getElementById('doenca_familia_hipertensao').checked = false;
                document.getElementById('doenca_familia_epilepsia').checked = false;
                document.getElementById('doenca_familia_cardiaca').checked = false;
                document.getElementById('doenca_familia_cancer').checked = false;

                if (data.success['doenca_diabetes'] == 1) {document.getElementById('doenca_diabetes').checked = true;}
                if (data.success['doenca_hipertensao'] == 1) {document.getElementById('doenca_hipertensao').checked = true;}
                if (data.success['doenca_asma'] == 1) {document.getElementById('doenca_asma').checked = true;}
                if (data.success['doenca_renal'] == 1) {document.getElementById('doenca_renal').checked = true;}
                if (data.success['doenca_cardiaca'] == 1) {document.getElementById('doenca_cardiaca').checked = true;}
                if (data.success['doenca_familia_diabetes'] == 1) {document.getElementById('doenca_familia_diabetes').checked = true;}
                if (data.success['doenca_familia_hipertensao'] == 1) {document.getElementById('doenca_familia_hipertensao').checked = true;}
                if (data.success['doenca_familia_epilepsia'] == 1) {document.getElementById('doenca_familia_epilepsia').checked = true;}
                if (data.success['doenca_familia_cardiaca'] == 1) {document.getElementById('doenca_familia_cardiaca').checked = true;}
                if (data.success['doenca_familia_cancer'] == 1) {document.getElementById('doenca_familia_cancer').checked = true;}
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }

            if (prefixPermissaoSubmodulo == 'clientes') {
                document.getElementById('link_copiar_endereco').style.display = '';

                //Hide em todos os checkbox de Medidas de Segurança''''''''''''''''''
                elementos = document.getElementsByClassName('divSegurancaMedida');
                elementos.forEach(function(elemento) {elemento.style.display = 'block';});
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //desmarcar checkbox'''''''''''''''''''''''''''''''''''''''''''''''''
                elementos = document.getElementsByClassName('cbSegurancaMedida');
                elementos.forEach(function(elemento) {elemento.checked = false;});
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //varrer os checkbox'''''''''''''''''''''''''''''''''''''''''''''''''
                cliente_seguranca_medidas = data.success['cliente_seguranca_medidas'];

                cliente_seguranca_medidas.forEach(function(item) {
                    //marcar como checado
                    document.getElementById('seguranca_medida_'+item.pavimento+'_'+item.seguranca_medida_id).checked = true;

                    //Outros campos
                    document.getElementById('quantidade_'+item.pavimento+'_'+item.seguranca_medida_id).value = item.quantidade;
                    document.getElementById('tipo_'+item.pavimento+'_'+item.seguranca_medida_id).value = item.tipo;
                    document.getElementById('observacao_'+item.pavimento+'_'+item.seguranca_medida_id).value = item.observacao;

                    //dar show
                    elementos = document.getElementsByClassName('divSegurancaMedida'+item.pavimento+item.seguranca_medida_id);
                    elementos.forEach(function(elemento) {elemento.style.display = 'block';});
                });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                pavimentosShowHide();
            }

            if (prefixPermissaoSubmodulo == 'clientes_executivos') {
                //Doenças e Doenças Família'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                document.getElementById('doenca_diabetes').checked = false;
                document.getElementById('doenca_hipertensao').checked = false;
                document.getElementById('doenca_asma').checked = false;
                document.getElementById('doenca_renal').checked = false;
                document.getElementById('doenca_cardiaca').checked = false;
                document.getElementById('doenca_familia_diabetes').checked = false;
                document.getElementById('doenca_familia_hipertensao').checked = false;
                document.getElementById('doenca_familia_epilepsia').checked = false;
                document.getElementById('doenca_familia_cardiaca').checked = false;
                document.getElementById('doenca_familia_cancer').checked = false;

                if (data.success['doenca_diabetes'] == 1) {document.getElementById('doenca_diabetes').checked = true;}
                if (data.success['doenca_hipertensao'] == 1) {document.getElementById('doenca_hipertensao').checked = true;}
                if (data.success['doenca_asma'] == 1) {document.getElementById('doenca_asma').checked = true;}
                if (data.success['doenca_renal'] == 1) {document.getElementById('doenca_renal').checked = true;}
                if (data.success['doenca_cardiaca'] == 1) {document.getElementById('doenca_cardiaca').checked = true;}
                if (data.success['doenca_familia_diabetes'] == 1) {document.getElementById('doenca_familia_diabetes').checked = true;}
                if (data.success['doenca_familia_hipertensao'] == 1) {document.getElementById('doenca_familia_hipertensao').checked = true;}
                if (data.success['doenca_familia_epilepsia'] == 1) {document.getElementById('doenca_familia_epilepsia').checked = true;}
                if (data.success['doenca_familia_cardiaca'] == 1) {document.getElementById('doenca_familia_cardiaca').checked = true;}
                if (data.success['doenca_familia_cancer'] == 1) {document.getElementById('doenca_familia_cancer').checked = true;}
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }

            if (prefixPermissaoSubmodulo == 'servicos') {
                //Verificar se pode alterar os campos name e servico_tipo_id - para não afetar outros submódulos
                var servico_readonly_campos = data.success['servico_readonly_campos'];
                if (servico_readonly_campos === true) {
                    document.getElementById('name').readOnly = true;
                    document.getElementById('servico_tipo_id').disabled = true;
                }
            }

            if (prefixPermissaoSubmodulo == 'propostas') {
                limparServicosGrade();

                proposta_servicos = data.success['proposta_servicos'];

                proposta_servicos.forEach(function (item) {
                    //Dados para preencher na linha da grade
                    document.getElementById('ts_servico_id').value = item.servico_id;
                    document.getElementById('ts_servico_nome').value = item.servico_nome;
                    document.getElementById('ts_servico_valor').value = float2moeda(item.servico_valor);
                    document.getElementById('ts_servico_qtd').value = item.servico_quantidade;

                    atualizarServicoGrade(1);
                });
            }

            if (prefixPermissaoSubmodulo == 'ordens_servicos') {
                //Edit divOST2''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //Grade Serviços
                ost2_limparServicosGrade();

                ordem_servico_servicos = data.success['ordem_servico_servicos'];

                ordem_servico_servicos.forEach(function (item) {
                    //Dados para preencher na linha da grade
                    document.getElementById('ost2_ts_servico_id').value = item.servico_id;
                    document.getElementById('ost2_ts_servico_nome').value = item.servico_nome;
                    document.getElementById('ost2_ts_responsavel_funcionario_id').value = item.responsavel_funcionario_id;
                    document.getElementById('ost2_ts_responsavel_funcionario_nome').value = item.responsavel_funcionario_nome;
                    document.getElementById('ost2_ts_servico_valor').value = float2moeda(item.servico_valor);
                    document.getElementById('ost2_ts_servico_quantidade').value = item.servico_quantidade;

                    ost2_atualizarServicoGrade(1);
                });

                ost2_atualizarServicoEscolher(0);
                ost2_atualizarResponsavelFuncionarioEscolher(0);

                document.getElementById('ost2_ts_divServicoEscolher').style.display = '';

                //Show no Informações Gerais
                document.getElementById('ost2_divOrdemServicoInformacoesGerais').style.display = '';
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //Edit divOST3''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //Grade Serviços (ost3_ts_servico_hiddens, ost3_ts_servico_nome e ost3_ts_responsavel_funcionario_id)
                ordem_servico_servicos = data.success['ordem_servico_servicos'];

                ordem_servico_servicos.forEach(function (item) {
                    //Dados para preencher na linha da grade
                    var servico_id = item.servico_id;
                    var servico_nome = item.servico_nome;
                    var responsavel_funcionario_id = item.responsavel_funcionario_id ?? '';
                    var responsavel_funcionario_nome = item.responsavel_funcionario_nome ?? '';

                    //ost3_ts_servico_nome
                    document.getElementById('ost3_ts_servico_nome').value = servico_nome;

                    //ost3_ts_responsavel_funcionario_id
                    document.getElementById('ost3_ts_responsavel_funcionario_id').value = responsavel_funcionario_id;

                    //ost3_ts_servico_hiddens
                    var hiddens = "<div id='ost3_ts_servico_hiddens_" + servico_id + "'>";
                    hiddens += "<input class='servico_item_hiddens' type='hidden' name='ost3_servico_item[]' id='ost3_servico_item' value='1'>";
                    hiddens += "<input type='hidden' name='ost3_servico_id[]' id='ost3_servico_id' value='"+servico_id+"'>";
                    hiddens += "<input type='hidden' name='ost3_servico_nome[]' id='ost3_servico_nome' value='"+servico_nome+"'>";
                    hiddens += "<input type='hidden' name='ost3_responsavel_funcionario_id[]' id='ost3_responsavel_funcionario_id' value='"+responsavel_funcionario_id+"'>";
                    hiddens += "<input type='hidden' name='ost3_responsavel_funcionario_nome[]' id='ost3_responsavel_funcionario_nome' value='"+responsavel_funcionario_nome+"'>";
                    hiddens += "</div>";

                    //Adicionar hiddens na div
                    document.getElementById('ost3_ts_servico_hiddens').innerHTML = hiddens;
                });

                //Grade Destinos
                ost3_limparDestinosGrade();

                ordem_servico_destinos = data.success['ordem_servico_destinos'];

                ordem_servico_destinos.forEach(function (item) {
                    //Dados para preencher na linha da grade
                    document.getElementById('ost3_te_destino_ordem').value = item.destino_ordem;
                    document.getElementById('ost3_te_destino_cep').value = item.destino_cep;
                    document.getElementById('ost3_te_destino_logradouro').value = item.destino_logradouro;
                    document.getElementById('ost3_te_destino_bairro').value = item.destino_bairro;
                    document.getElementById('ost3_te_destino_localidade').value = item.destino_localidade;
                    document.getElementById('ost3_te_destino_uf').value = item.destino_uf;
                    document.getElementById('ost3_te_destino_numero').value = item.destino_numero;
                    document.getElementById('ost3_te_destino_complemento').value = item.destino_complemento;

                    ost3_atualizarDestinoGrade(1, ordem_servico_destinos);
                });

                ost3_atualizarDestinoEscolher(0);

                document.getElementById('ost3_te_divDestinoEscolher').style.display = '';

                //Grade Veículos
                ost3_limparVeiculosGrade();

                ordem_servico_veiculos = data.success['ordem_servico_veiculos'];

                ordem_servico_veiculos.forEach(function (item) {
                    //Dados para preencher na linha da grade
                    document.getElementById('ost3_te_veiculo_id').value = item.veiculo_id;
                    document.getElementById('ost3_te_veiculo_marca').value = item.veiculo_marca;
                    document.getElementById('ost3_te_veiculo_modelo').value = item.veiculo_modelo;
                    document.getElementById('ost3_te_veiculo_placa').value = item.veiculo_placa;
                    document.getElementById('ost3_te_veiculo_combustivel').value = item.veiculo_combustivel;

                    ost3_atualizarVeiculoGrade(1);
                });

                ost3_atualizarVeiculoEscolher(0);

                document.getElementById('ost3_te_divVeiculoEscolher').style.display = '';

                //Montar combos veiculos
                ost3_atualizarComboVeiculosClienteExecutivo();
                ost3_atualizarComboVeiculosEquipe();

                //Grade Executivos
                ost3_limparClienteExecutivosGrade();

                ordem_servico_executivos = data.success['ordem_servico_executivos'];

                ordem_servico_executivos.forEach(function (item) {
                    //Dados para preencher na linha da grade
                    document.getElementById('ost3_te_cliente_executivo_id').value = item.cliente_executivo_id;
                    document.getElementById('ost3_te_cliente_executivo_nome').value = item.cliente_executivo_nome;
                    document.getElementById('ost3_te_cliente_executivo_funcao').value = item.cliente_executivo_funcao;
                    document.getElementById('ost3_te_cliente_executivo_veiculo_id').value = item.cliente_executivo_veiculo_id;

                    ost3_atualizarClienteExecutivoGrade(1);
                });

                ost3_atualizarClienteExecutivoEscolher(0);

                document.getElementById('ost3_te_divClienteExecutivoEscolher').style.display = '';

                //Grade Equipes
                ost3_limparEquipesGrade();

                ordem_servico_equipes = data.success['ordem_servico_equipes'];

                ordem_servico_equipes.forEach(function (item) {
                    //Dados para preencher na linha da grade
                    document.getElementById('ost3_te_equipe_funcionario_id').value = item.equipe_funcionario_id;
                    document.getElementById('ost3_te_equipe_funcionario_nome').value = item.equipe_funcionario_nome;
                    document.getElementById('ost3_te_equipe_funcionario_funcao').value = item.equipe_funcionario_funcao;
                    document.getElementById('ost3_te_equipe_funcionario_veiculo_id').value = item.equipe_funcionario_veiculo_id;

                    ost3_atualizarEquipeGrade(1);
                });

                ost3_atualizarEquipeEscolher(0);

                document.getElementById('ost3_te_divEquipeEscolher').style.display = '';

                //Show no Informações Gerais
                document.getElementById('ost3_divOrdemServicoInformacoesGerais').style.display = '';
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //Campo: ordem_servico_tipo_id''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //forçar change
                document.getElementById('ordem_servico_tipo_id').dispatchEvent(new Event('change'));

                //options
                const select = document.getElementById('ordem_servico_tipo_id');
                const valorPermitido = data.success.ordem_servico_tipo_id;

                //Desativa todas as opções, exceto a permitida
                Array.from(select.options).forEach(option => {
                    if (parseInt(option.value) !== parseInt(valorPermitido)) {
                        option.disabled = true;
                    } else {
                        option.disabled = false;
                    }
                });
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }

            if (prefixPermissaoSubmodulo == 'visitas_tecnicas') {
                // visita_tecnica_tipo_id
                const visita_tecnica_tipo_id = document.getElementById('visita_tecnica_tipo_id');

                // View divVTT1'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Global Elementos vtt1
                const vtt1_divClienteId = document.getElementById('vtt1_divClienteId');
                const vtt1_divResponsavelFuncionarioId = document.getElementById('vtt1_divResponsavelFuncionarioId');
                const vtt1_formVisualizar1 = document.getElementById('vtt1_formVisualizar1');
                const vtt1_formVisualizar2 = document.getElementById('vtt1_formVisualizar2');
                const vtt1_formVisualizar3 = document.getElementById('vtt1_formVisualizar3');
                const vtt1_formVisualizar4 = document.getElementById('vtt1_formVisualizar4');
                const vtt1_divPerguntas = document.getElementById('vtt1_divPerguntas');

                vtt1_divClienteId.style.display = 'none';
                vtt1_divResponsavelFuncionarioId.style.display = 'none';
                vtt1_formVisualizar1.style.display = 'none';
                vtt1_formVisualizar2.style.display = 'none';
                vtt1_formVisualizar3.style.display = 'none';
                vtt1_formVisualizar4.style.display = 'none';
                vtt1_divPerguntas.innerHTML = '';
                vtt1_divPerguntas.style.display = 'none';

                if (visita_tecnica_tipo_id.value == 1) {
                    // Acertos no Formulário
                    visita_tecnica_tipo_id.disabled = true;
                    vtt1_divResponsavelFuncionarioId.style.display = '';

                    // Acertos no Dropdown
                    vtt1_formVisualizar1.style.display = '';
                    vtt1_formVisualizar2.style.display = '';
                    vtt1_formVisualizar3.style.display = '';
                    vtt1_formVisualizar4.style.display = '';

                    // Visita Técnica Dados
                    var visitas_tecnicas_dados = data.success['visitas_tecnicas_dados'];

                    // Montar Perguntas
                    const htmlPerguntas = vtt1_gerarHtmlPerguntas(visitas_tecnicas_dados, data.success['vt_cs']);

                    vtt1_divPerguntas.style.display = '';
                    vtt1_divPerguntas.innerHTML = htmlPerguntas;
                }
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // View divVTT2'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Global Elementos vtt2
                const vtt2_divClienteId = document.getElementById('vtt2_divClienteId');
                const vtt2_divResponsavelFuncionarioId = document.getElementById('vtt2_divResponsavelFuncionarioId');
                const vtt2_formVisualizar1 = document.getElementById('vtt2_formVisualizar1');
                const vtt2_formVisualizar2 = document.getElementById('vtt2_formVisualizar2');
                const vtt2_formVisualizar3 = document.getElementById('vtt2_formVisualizar3');
                const vtt2_formVisualizar4 = document.getElementById('vtt2_formVisualizar4');
                const vtt2_divPerguntas = document.getElementById('vtt2_divPerguntas');

                vtt2_divClienteId.style.display = 'none';
                vtt2_divResponsavelFuncionarioId.style.display = 'none';
                vtt2_formVisualizar1.style.display = 'none';
                vtt2_formVisualizar2.style.display = 'none';
                vtt2_formVisualizar3.style.display = 'none';
                vtt2_formVisualizar4.style.display = 'none';
                vtt2_divPerguntas.innerHTML = '';
                vtt2_divPerguntas.style.display = 'none';

                if (visita_tecnica_tipo_id.value == 2) {
                    // Acertos no Formulário
                    visita_tecnica_tipo_id.disabled = true;
                    vtt2_divResponsavelFuncionarioId.style.display = '';

                    // Acertos no Dropdown
                    vtt2_formVisualizar1.style.display = '';
                    vtt2_formVisualizar2.style.display = '';
                    vtt2_formVisualizar3.style.display = '';
                    vtt2_formVisualizar4.style.display = '';

                    // Visita Técnica Dados
                    var visitas_tecnicas_dados = data.success['visitas_tecnicas_dados'];

                    // Montar Perguntas
                    const htmlPerguntas = vtt2_gerarHtmlPerguntas(visitas_tecnicas_dados, data.success['vt_cs']);

                    vtt2_divPerguntas.style.display = '';
                    vtt2_divPerguntas.innerHTML = htmlPerguntas;
                }
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //Campo: visita_tecnica_tipo_id (forçar change)
                visita_tecnica_tipo_id.dispatchEvent(new Event('change'));
            }

            if (prefixPermissaoSubmodulo == 'brigadas_incendios') {
                // Preparando Tela
                controleDisplay();
                pro_controleDisplay();
                esc_controleDisplay();
                ger_controleDisplay();

                // Grade de Produtos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // Grade de Produtos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Colocar Produtos da Brigada Incêndio
                const brigada_incendio_produtos = data.success['brigada_incendio_produtos'];

                brigada_incendio_produtos.forEach(function (item) {
                    // Adicionar linha na grade
                    pro_adicionarLinhaGrade({
                        produto_id: item.produto_id,
                        produto_categoria_name: item.produto_categoria_name,
                        produto_name: item.produto_name,
                        produto_quantidade: item.produto_quantidade
                    });
                });
                // Grade de Produtos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // Grade de Produtos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Grade de Escalas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // Grade de Escalas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Colocar Escalas da Brigada Incêndio
                const brigada_incendio_escalas = data.success['brigada_incendio_escalas'];
                const brigada_incendio_escalas_brigadistas = data.success['brigada_incendio_escalas_brigadistas'];

                brigada_incendio_escalas.forEach(function (item) {
                    // Filtra brigadistas desta escala
                    const brigadistasDaEscala = brigada_incendio_escalas_brigadistas.filter(b => b.brigada_incendio_escala_id === item.id);

                    // Adicionar linha na grade
                    esc_adicionarLinhaGrade({
                        escala_tipo_id: item.escala_tipo_id,
                        escala_tipo_name: item.escala_tipo_name,
                        escala_tipo_quantidade_alas: item.escala_tipo_quantidade_alas,
                        escala_tipo_quantidade_horas_trabalhadas: item.escala_tipo_quantidade_horas_trabalhadas,
                        escala_tipo_quantidade_horas_descanso: item.escala_tipo_quantidade_horas_descanso,
                        quantidade_brigadistas_por_ala: item.quantidade_brigadistas_por_ala,
                        quantidade_brigadistas_total: item.quantidade_brigadistas_total,
                        posto: item.posto,
                        hora_inicio_ala_1: item.hora_inicio_ala_1,
                        brigadistas: brigadistasDaEscala
                    });
                });
                // Grade de Escalas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // Grade de Escalas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Grade de Geradas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // Grade de Geradas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Grade de Geradas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // Grade de Geradas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }

            if (prefixPermissaoSubmodulo == 'produtos_entradas') {
                // Preparando Tela
                pro_controleDisplay();

                // Preparando Botões
                pro_controleBotoes(0);

                // Grade de Produtos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // Grade de Produtos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Colocar Produtos Entradas Itens
                const produto_entrada_itens = data.success['produto_entrada_itens'];

                produto_entrada_itens.forEach(function (item) {
                    // Adicionar linha na grade
                    pro_adicionarLinhaGrade({
                        produto_item_id: item.id,
                        produto_id: item.produto_id,
                        produto_categoria_name: item.produto_categoria_name,
                        produto_name: item.produto_name,
                        produto_tipo_id: item.produto_tipo_id,
                        produto_tipo_name: item.produto_tipo_name,
                        produto_numero_patrimonio: item.produto_numero_patrimonio,
                        produto_valor_unitario: item.produto_valor_unitario
                    });
                });

                pro_verificarDuplicadosPatrimonio();

                // Colocar Total Geral
                pro_colocarTotalGeralGrade();
                // Grade de Produtos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                // Grade de Produtos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }

            if (prefixPermissaoSubmodulo == 'pontos_interesse') {
                // Configurar Tela
                configurarTela();

                // Marcar especialidades
                const especialidades = data.success['especialidades'];
                especialidades.forEach(function(item) {
                    document.getElementById('especialidade_' + item['especialidade_id']).checked = true;
                });
            }

            if (prefixPermissaoSubmodulo == 'produtos_controle_situacoes') {
                // Formatar Tela
                document.getElementById('divPatrimonioSituacoes').style.display = 'none';
                document.getElementById('divAlterarSituacaoLocal').style.display = '';
                document.getElementById('divInformacoesGerais').style.display = '';

                // Campos
                document.getElementById('divFotografia').src = data.success['produto_fotografia'];
                document.getElementById('divNumeroPatrimonio').innerHTML = '<b>'+data.success['produto_numero_patrimonio']+'</b>';
                document.getElementById('divProdutoName').innerHTML = '<b>'+data.success['produto_nome']+'</b><br>'+data.success['produto_categoria'];

                // Local
                let local = '';
                if (data.success['produto_estoque_id'] == 1) {
                    local = '<b>'+data.success['produto_local']+'</b><br>'+'<span class="small">'+data.success['produto_estoque_nome']+': '+data.success['produto_local_empresa']+'</span>';
                } else {
                    local = '<b>'+data.success['produto_local']+'</b><br>'+'<span class="small">'+data.success['produto_estoque_nome']+': '+data.success['produto_local_cliente']+'</span>';
                }

                document.getElementById('divLocal').innerHTML = local;

                // Situação Atual
                let situacao = '';
                if (data.success['produto_situacao_id'] == 1 || data.success['produto_situacao_id'] == 2 || data.success['produto_situacao_id'] == 5) {
                    situacao = '<div class="text-center text-success">'+'<b>'+data.success['produto_situacao']+'</b>'+'</div>'+'<div class="text-center text-success small">Movimentação Permitida</div>';
                } else {
                    situacao = '<div class="text-center text-danger">'+'<b>'+data.success['produto_situacao']+'</b>'+'</div>'+'<div class="text-center text-danger small">Movimentação não Permitida</div>';
                }

                document.getElementById('divSituacaoAtual').innerHTML = situacao;

                // Campos Hiddens
                document.getElementById('registro_id').value = data.success['produto_entrada_item_id'];
                document.getElementById('produto_entrada_item_id').value = data.success['produto_entrada_item_id'];
                document.getElementById('anterior_produto_situacao_id').value = data.success['produto_situacao_id'];
                document.getElementById('anterior_estoque_local_id').value = data.success['estoque_local_id'];
            }
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Configuração
            crudConfiguracao({p_removeMask:true, p_putMask:true});
        } else if (data.error_not_found) {
            //Configuração
            crudConfiguracao({p_removeMask:true, p_putMask:true});

            alertSwal('warning', "Registro não encontrado", '', 'true', 2000);
        } else if (data.error) {
            //Configuração
            crudConfiguracao({p_removeMask:true, p_putMask:true});

            alertSwal('warning', data.error, '', 'true', 2000);
        } else if (data.error_permissao) {
            //Configuração
            crudConfiguracao({p_removeMask:true, p_putMask:true});

            alertSwal('warning', "Permissão Negada", '', 'true', 2000);
        } else {
            //Configuração
            crudConfiguracao({p_removeMask:true, p_putMask:true});

            alert('Erro interno');
        }
    }).catch(error => {
        alert('Erro Crud Functions Edit:'+error);
    });
}

//Delete
async function crudDelete(registro_id) {
    //Variáveis
    if (registro_id == 0) {registro_id = document.getElementById('registro_id').value;}
    let prefixPermissaoSubmodulo = document.getElementById('crudPrefixPermissaoSubmodulo').value;
    let nameSubmodulo = document.getElementById('crudNameSubmodulo').value;
    let nameFormSubmodulo = document.getElementById('crudNameFormSubmodulo').value;

    //Confirmação de Delete
    const confirmed = await alertSwalConfirmacao();
    if (confirmed) {
        //Configuração - Retirar DIV Botões e colocar DIV Loading
        crudConfiguracao({p_crudFormButtons1:'hide', p_crudFormAjaxLoading:'show'});

        //Settings Submódulos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Acessar rota
        fetch(prefixPermissaoSubmodulo+'/'+registro_id, {
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
                alertSwal('success', nameSubmodulo, data.success, 'true', 2000);

                //Configuração
                crudConfiguracao({p_crudTable:'show', p_crudForm:'hide'});

                //Table
                crudTable(prefixPermissaoSubmodulo);
            } else if (data.error) {
                alertSwal('error', nameSubmodulo, data.error, 'true', 2000);

                //Configuração
                crudConfiguracao({p_crudTable:'show', p_crudForm:'hide'});

                //Table
                crudTable(prefixPermissaoSubmodulo);
            } else if (data.error_permissao) {
                alertSwal('warning', "Permissão Negada", '', 'true', 2000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            //Configuração
            crudConfiguracao({p_removeMask:true, p_putMask:true});

            alert('Erro Crud Functions Delete:'+error);
        }).finally(() => {
            //Configuração - Retirar DIV Loading e colocar DIV Botões
            crudConfiguracao({p_crudFormButtons1:'show', p_crudFormAjaxLoading:'hide'});
        });
    }
}

//Confirm Operacao
function crudConfirmOperation() {
    //Variáveis
    let registro_id = document.getElementById('registro_id').value;
    let prefixPermissaoSubmodulo = document.getElementById('crudPrefixPermissaoSubmodulo').value;
    let nameSubmodulo = document.getElementById('crudNameSubmodulo').value;
    let nameFormSubmodulo = document.getElementById('crudNameFormSubmodulo').value;

    //Verificar Validação feita com sucesso
    if (window['validar_'+nameFormSubmodulo]() === true) {
        var executar = 1;

        //Settings Submódulos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        if (executar == 1) {
            //Configuração
            crudConfiguracao({p_removeMask:true});

            //Confirm Operacao - Create
            if (document.getElementById('frm_operacao').value == 'create') {
                //FormData
                var formulario = document.getElementById(nameFormSubmodulo);
                var formData = new FormData(formulario);

                //Configuração - Retirar DIV Botões e colocar DIV Loading
                crudConfiguracao({p_crudFormButtons1:'hide', p_crudFormAjaxLoading:'show'});

                //Acessar rota
                fetch(prefixPermissaoSubmodulo, {
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
                        //Enviar E-mail'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                        if (prefixPermissaoSubmodulo == 'users') {
                            var email = document.getElementById('email').value;
                            var senha = data.content;
                            var senha = senha.substring(4, 14);

                            //Acessar rota
                            fetch('enviar_email/users/primeiro_acesso/' + email + '/' + senha, {
                                method: 'GET',
                                headers: {'REQUEST-ORIGIN': 'fetch'}
                            });
                        }
                        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                        alertSwal('success', nameSubmodulo, data.success, 'true', 2000);

                        //Limpar Formulario
                        crudLimparFormulario(nameFormSubmodulo);

                        //Configuração
                        crudConfiguracao({p_crudTable:'show', p_crudForm:'hide'});

                        //Table
                        crudTable(prefixPermissaoSubmodulo);
                    } else if (data.error_validation) {
                        //Configuração
                        crudConfiguracao({p_removeMask:true, p_putMask:true});

                        //Montar mensage de erro de Validação
                        message = '<div class="pt-3">';
                        var validations = data.error_validation;
                        for (const chave in validations) {
                            message += '<div class="col-12 text-start font-size-12"><b>></b> ' + validations[chave] + '</div>';
                        }
                        message += '</div>';

                        alertSwal('warning', "Validação", message, 'true', 20000);
                    } else if (data.error_lock) {
                        //Configuração
                        crudConfiguracao({p_removeMask:true, p_putMask:true});

                        alertSwal('warning', "Bloqueio", data.error_lock, 'true', 20000);
                    } else if (data.error_permissao) {
                        //Configuração
                        crudConfiguracao({p_removeMask:true, p_putMask:true});

                        alertSwal('warning', "Permissão Negada", '', 'true', 2000);
                    } else if (data.error) {
                        alertSwal('warning', nameSubmodulo, data.error, 'true', 20000);
                    } else {
                        //Configuração
                        crudConfiguracao({p_removeMask:true, p_putMask:true});

                        alert('Erro interno');
                    }
                }).catch(error => {
                    //Configuração
                    crudConfiguracao({p_removeMask:true, p_putMask:true});

                    alert('Erro Crud Functions Confirm Operation Create: '+error);
                }).finally(() => {
                    //Configuração - Retirar DIV Loading e colocar DIV Botões
                    crudConfiguracao({p_crudFormButtons1:'show', p_crudFormAjaxLoading:'hide'});
                });
            }

            //Confirm Operacao - Edit
            if (document.getElementById('frm_operacao').value == 'edit') {
                //Settings Submódulos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                if (prefixPermissaoSubmodulo == 'visitas_tecnicas') {
                    //Acertos no Formulário
                    document.getElementById('visita_tecnica_tipo_id').disabled = false;
                }
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //FormData
                var formulario = document.getElementById(nameFormSubmodulo);
                var formData = new FormData(formulario);

                //Configuração - Retirar DIV Botões e colocar DIV Loading
                crudConfiguracao({p_crudFormButtons1:'hide', p_crudFormAjaxLoading:'show'});

                //Acessar rota
                fetch(prefixPermissaoSubmodulo+'/'+registro_id, {
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
                        alertSwal('success', nameSubmodulo, data.success, 'true', 2000);

                        //Limpar Formulario
                        crudLimparFormulario(nameFormSubmodulo);

                        //Configuração
                        crudConfiguracao({p_crudTable:'show', p_crudForm:'hide'});

                        //Table
                        crudTable(prefixPermissaoSubmodulo);
                    } else if (data.error_validation) {
                        //Configuração
                        crudConfiguracao({p_removeMask:true, p_putMask:true});

                        //Montar mensage de erro de Validação
                        message = '<div class="pt-3">';
                        var validations = data.error_validation;
                        for (const chave in validations) {
                            message += '<div class="col-12 text-start font-size-12"><b>></b> ' + validations[chave] + '</div>';
                        }
                        message += '</div>';

                        alertSwal('warning', "Validação", message, 'true', 20000);
                    } else if (data.error_not_found) {
                        //Configuração
                        crudConfiguracao({p_removeMask:true, p_putMask:true});

                        alertSwal('warning', "Registro não encontrado", '', 'true', 2000);
                    } else if (data.error_permissao) {
                        //Configuração
                        crudConfiguracao({p_removeMask:true, p_putMask:true});

                        alertSwal('warning', "Permissão Negada", '', 'true', 2000);
                    } else if (data.error) {
                        alertSwal('warning', nameSubmodulo, data.error, 'true', 20000);
                    } else {
                        //Configuração
                        crudConfiguracao({p_removeMask:true, p_putMask:true});

                        alert('Erro interno');
                    }
                }).catch(error => {
                    //Configuração
                    crudConfiguracao({p_removeMask:true, p_putMask:true});

                    alert('Erro Crud Functions Confirm Operation Edit:'+error);
                }).finally(() => {
                    //Configuração - Retirar DIV Loading e colocar DIV Botões
                    crudConfiguracao({p_crudFormButtons1:'show', p_crudFormAjaxLoading:'hide'});
                });
            }
        }
    }
}

//Cancel Operacao
function crudCancelOperation() {
    //Configuração
    crudConfiguracao({p_fieldsDisabled:false, p_crudTable:'show', p_crudForm:'hide'});
}

//Filter New
function crudFilterInsertLine() {
    //Seleciona a div original
    var divOriginal = document.getElementsByClassName('filterRepeaterItem')[0];

    //Clona a div sem os valores dos inputs
    var divClonada = divOriginal.cloneNode(true);

    //Limpa os valores dos inputs clonados
    var inputsClonados = divClonada.getElementsByTagName("input");
    for (var i = 0; i < inputsClonados.length; i++) {inputsClonados[i].value = "";}

    //Adiciona a div clonada abaixo da original
    document.getElementById("filterRepeaterList").appendChild(divClonada);

    //Ajustar Itens
    crudFilterAdjustItems();
}

//Remover Item
function crudFilterRemoveLine(dataId='') {
    //Pegando todas as Divs
    var divs = document.querySelectorAll('.filterRepeaterItem');

    //Verificando se só tem um item e não deixar remover
    if (divs.length == 1) {
        alert('Não é possivel remover.');
    } else {
        //Varrendo as Divs para remover a solicitada
        divs.forEach(function (div) {
            if (div.dataset.id === dataId) {
                div.remove();
            }
        });

        //Ajustar Itens
        crudFilterAdjustItems();
    }
}

//Filter Ajustar itens
function crudFilterAdjustItems() {
    //Colocar data-id nos itens
    var ind = 0;
    document.querySelectorAll('.filterRepeaterItem').forEach(function(elemento) {
        elemento.dataset.id = ind;
        ind++;
    });

    //Colocar a função para remover linhas nos botões
    var ind = 0;
    document.querySelectorAll('#filter_crud_botao_excluir').forEach(function(elemento) {
        elemento.value = ind;

        //Colocando função no elemento
        elemento.onclick = function () {
            crudFilterRemoveLine(elemento.value);
        };

        ind++;
    });
}

//Executar Filtros
function crudFilterExecutar(submodulo='') {
    //Variáveis
    if (submodulo == '') {submodulo = document.getElementById('crudPrefixPermissaoSubmodulo').value;}

    //Pegar quantidade de Itens/Filtros
    var qtdItens = document.querySelectorAll('.filterRepeaterItem').length;

    //Arrays
    const array_dados = [];

    //Varrer filtros para montar array de dados
    for(i=0; i<qtdItens; i++) {
        var tipo_condicao = document.getElementsByName('filter_crud_tipo_condicao')[i];
        var campo_pesquisar = document.getElementsByName('filter_crud_campo_pesquisar')[i];
        var operacao_realizar = document.getElementsByName('filter_crud_operacao_realizar')[i];
        var dado_pesquisar = document.getElementsByName('filter_crud_dado_pesquisar')[i];

        if (dado_pesquisar.value == '') {
            alert('Digite algo para pesquisar no filtro ' + (i + 1));

            return false;
        }

        //Populando array_dados
        array_dados.push(tipo_condicao.value);
        array_dados.push(campo_pesquisar.value);
        array_dados.push(operacao_realizar.value);
        array_dados.push(dado_pesquisar.value);
    }

    //Table
    crudTable(submodulo+'/filter/'+array_dados);
}
