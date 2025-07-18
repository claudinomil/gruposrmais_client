//Montar Divs com opções de Relatórios
function relatorios() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';

    $.get(url+'relatorios/relatorios', function (data) {
        //relatorios
        var relatorios = '';

        if (data.success) {
            //Dados
            var agrupamentos = data.success.agrupamentos;
            var grupo_relatorios = data.success.grupo_relatorios;

            agrupamentos.forEach(function (agrupamento) {
                relatorios += '<div class="col-12 col-md-4">';
                relatorios += ' <div class="card">';
                relatorios += '     <div class="card-body">';
                relatorios += '         <div class="text-center">';
                relatorios += '             <div class="mb-3">';
                relatorios += '                 <i class="bx bx-printer text-primary display-6"></i>';
                relatorios += '             </div>';
                relatorios += '             <h5>'+agrupamento['name']+'</h5>';
                relatorios += '         </div>';
                relatorios += '         <div class="table-responsive mt-4">';
                relatorios += '             <table class="table align-middle">';
                relatorios += '                 <tbody>';

                var num = 0;

                grupo_relatorios.forEach(function (grupo_relatorio) {
                    if (agrupamento['id'] == grupo_relatorio['agrupamento_id']) {
                        num++;

                        relatorios += '             <tr>';
                        relatorios += '                 <th>';
                        relatorios += '                     <div class="d-flex align-items-center">'+num+'</div>';
                        relatorios += '                 </th>';
                        relatorios += '                 <td>';
                        relatorios += '                     <div class="d-flex align-items-center">' + grupo_relatorio['relatorio_name'] + '</div>';
                        relatorios += '                 </td>';
                        relatorios += '                 <td style="text-align: right">';
                        relatorios += '                     <button type="button" class="btn btn-light btn-sm w-xs" onclick="relatorio' + grupo_relatorio['relatorio_id'] + '(1, \''+grupo_relatorio['relatorio_name']+'\');">Filtro</button>';
                        relatorios += '                 </td>';
                        relatorios += '             </tr>';
                    }
                });

                relatorios += '                 </tbody>';
                relatorios += '             </table>';
                relatorios += '         </div>';
                relatorios += '     </div>';
                relatorios += ' </div>';
                relatorios += '</div>';
            });

            document.getElementById('divRelatorios').innerHTML = relatorios;
        } else {
            alert('Relatórios não encontrado.');
        }
    });
}

function relatorio1(op=1, relatorio_name='') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio1_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio1')).show();
    } else {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';

        return new Promise(function(resolve, reject) {
            //Dados
            $.get(url+'relatorios/relatorio1/'+$('#modal_relatorio1_grupo_id').val()+'/'+$('#modal_relatorio1_idioma').val(), function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Gerar PDF
            gerarPDFRelatorio({x_relatorio:1, x_dados:data, x_idioma:$('#modal_relatorio1_idioma').val()});

            //Fechar Modal
            document.getElementById('modal_relatorio1_cancelar').click();
        });
    }
}

function relatorio2(op=1, relatorio_name='') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio2_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio2')).show();
    } else {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';

        return new Promise(function(resolve, reject) {
            //Dados
            $.get(url+'relatorios/relatorio2/'+$('#modal_relatorio2_grupo_id').val()+'/'+$('#modal_relatorio2_situacao_id').val()+'/'+$('#modal_relatorio2_idioma').val(), function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Gerar PDF
            gerarPDFRelatorio({x_relatorio:2, x_dados:data, x_idioma:$('#modal_relatorio2_idioma').val()});

            //Fechar Modal
            document.getElementById('modal_relatorio2_cancelar').click();
        });
    }
}

function relatorio3(op=1, relatorio_name='') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio3_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio3')).show();
    } else {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';

        return new Promise(function(resolve, reject) {
            //Acertos nos inputs
            var modal_relatorio3_data = 'xxxyyyzzz';
            if ($('#modal_relatorio3_data').val() != '') {modal_relatorio3_data = formatarData(1, $('#modal_relatorio3_data').val());}

            var modal_relatorio3_dado = 'xxxyyyzzz';
            if ($('#modal_relatorio3_dado').val() != '') {modal_relatorio3_dado = $('#modal_relatorio3_dado').val();}

            //Dados
            $.get(url+'relatorios/relatorio3/'+modal_relatorio3_data+'/'+$('#modal_relatorio3_user_id').val()+'/'+$('#modal_relatorio3_submodulo_id').val()+'/'+$('#modal_relatorio3_operacao_id').val()+'/'+modal_relatorio3_dado+'/'+$('#modal_relatorio3_idioma').val(), function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Gerar PDF
            gerarPDFRelatorio({x_relatorio:3, x_dados:data, x_idioma:$('#modal_relatorio3_idioma').val()});

            //Fechar Modal
            document.getElementById('modal_relatorio3_cancelar').click();
        });
    }
}

function relatorio6(op=1, relatorio_name='') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio6_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio6')).show();
    } else {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';

        return new Promise(function(resolve, reject) {
            //Validar campos do modal'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            var validacao_ok = true;
            var mensagem = '';

            //Campo: modal_relatorio6_data_inicio (requerido)
            if (validacao({op:1, value:document.getElementById('modal_relatorio6_data_inicio').value}) === false) {
                validacao_ok = false;
                mensagem += 'Data início requerido.'+'<br>';
            } else {
                //Campo: modal_relatorio6_data_inicio (Data Válida)
                if (validacao({op:8, value:document.getElementById('modal_relatorio6_data_inicio').value}) === false) {
                    validacao_ok = false;
                    mensagem += 'Data início Inválida.'+'<br>';
                }
            }

            //Campo: modal_relatorio6_data_fim (requerido)
            if (validacao({op:1, value:document.getElementById('modal_relatorio6_data_fim').value}) === false) {
                validacao_ok = false;
                mensagem += 'Data fim requerido.'+'<br>';
            } else {
                //Campo: modal_relatorio6_data_fim (Data Válida)
                if (validacao({op:8, value:document.getElementById('modal_relatorio6_data_fim').value}) === false) {
                    validacao_ok = false;
                    mensagem += 'Data fim Inválida.'+'<br>';
                }
            }

            //Campo: modal_relatorio6_cidade_id (requerido)
            if (validacao({op:1, value:document.getElementById('modal_relatorio6_cidade_id').value}) === false) {
                validacao_ok = false;
                mensagem += 'Cidade requerido.'+'<br>';
            }

            //Mensagem
            if (validacao_ok === false) {
                var texto = '<div class="pt-3">';
                texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
                texto += '</div>';

                alertSwal('warning', 'Validação', texto, 'true', 5000);

                return;
            }
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Formatando dados para envio
            var data_inicio = formatarData(1, $('#modal_relatorio6_data_inicio').val());
            var data_fim = formatarData(1, $('#modal_relatorio6_data_fim').val());
            var cidade_id = document.getElementById('modal_relatorio6_cidade_id').value;
            var cidade = document.getElementById('modal_relatorio6_cidade_id').options[document.getElementById('modal_relatorio6_cidade_id').selectedIndex].text;
            var idioma = $('#modal_relatorio6_idioma').val();

            //Dados
            $.get(url+'relatorios/relatorio6/'+data_inicio+'/'+data_fim+'/'+cidade_id+'/'+cidade+'/'+idioma, function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Gerar PDF
            gerarPDFRelatorio({x_relatorio:6, x_dados:data, x_idioma:$('#modal_relatorio6_idioma').val()});

            //Fechar Modal
            document.getElementById('modal_relatorio6_cancelar').click();
        });
    }
}

function relatorio7(op=1, relatorio_name='') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio7_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio7')).show();
    } else {
        //Validar campos do modal'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        var validacao_ok = true;
        var mensagem = '';

        //Campo: modal_relatorio7_clientes_executivos_ids && modal_relatorio7_funcionarios_ids (requerido)
        if (validacao({op:1, value:document.getElementById('modal_relatorio7_clientes_executivos_ids').value}) === false && validacao({op:1, value:document.getElementById('modal_relatorio7_funcionarios_ids').value}) === false) {
            validacao_ok = false;
            mensagem += 'Escolha Clientes Executivos ou Funcionários.'+'<br>';
        }

        //Mensagem
        if (validacao_ok === false) {
            var texto = '<div class="pt-3">';
            texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
            texto += '</div>';

            alertSwal('warning', 'Validação', texto, 'true', 5000);
            return;
        }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Clientes Executivos escolhidos
        var select = document.getElementById('modal_relatorio7_clientes_executivos_ids');
        var clientes_executivos = Array.from(select.selectedOptions).map(option => option.value);
        if (clientes_executivos != '') {cartaoEmergencialGerarPDF(1, clientes_executivos, 2);}

        //Funcionários escolhidos
        var select = document.getElementById('modal_relatorio7_funcionarios_ids');
        var funcionarios = Array.from(select.selectedOptions).map(option => option.value);
        if (funcionarios != '') {cartaoEmergencialGerarPDF(2, funcionarios, 2);}

        //Fechar Modal
        document.getElementById('modal_relatorio7_cancelar').click();
    }
}

// function relatorio7(op=1, relatorio_name='') {
//     if (op == 1) {
//         //Título Modal
//         document.getElementById('modal_relatorio7_titulo').innerHTML = relatorio_name;
//
//         //Abrir Modal
//         new bootstrap.Modal(document.getElementById('modal_relatorio7')).show();
//     } else {
//         //URL
//         var url = window.location.protocol+'//'+window.location.host+'/';
//
//         return new Promise(function(resolve, reject) {
//             //Validar campos do modal'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//             var validacao_ok = true;
//             var mensagem = '';
//
//             //Campo: modal_relatorio7_clientes_executivos_ids && modal_relatorio7_funcionarios_ids (requerido)
//             if (validacao({op:1, value:document.getElementById('modal_relatorio7_clientes_executivos_ids').value}) === false && validacao({op:1, value:document.getElementById('modal_relatorio7_funcionarios_ids').value}) === false) {
//                 validacao_ok = false;
//                 mensagem += 'Escolha Clientes Executivos ou Funcionários.'+'<br>';
//             }
//
//             //Mensagem
//             if (validacao_ok === false) {
//                 var texto = '<div class="pt-3">';
//                 texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
//                 texto += '</div>';
//
//                 alertSwal('warning', 'Validação', texto, 'true', 5000);
//
//                 return;
//             }
//             //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//
//             //Clientes Executivos escolhidos
//             var select = document.getElementById('modal_relatorio7_clientes_executivos_ids');
//             var clientes_executivos = Array.from(select.selectedOptions).map(option => option.value);
//             if (clientes_executivos == '') {clientes_executivos = 'xxx';}
//
//             //Funcionários escolhidos
//             var select = document.getElementById('modal_relatorio7_funcionarios_ids');
//             var funcionarios = Array.from(select.selectedOptions).map(option => option.value);
//             if (funcionarios == '') {funcionarios = 'xxx';}
//
//             //Dados
//             $.get(url+'relatorios/relatorio7/'+clientes_executivos+'/'+funcionarios, function (data) {
//                 if (data.success) {
//                     resolve(data.success);
//                 } else {
//                     alert(data.error);
//                     resolve([]);
//                 }
//             });
//         }).then(function (data) {
//             //Gerar PDF
//             gerarPDFRelatorio({x_relatorio:6, x_dados:data});
//
//             //Fechar Modal
//             document.getElementById('modal_relatorio7_cancelar').click();
//         });
//     }
// }

async function gerarPDFRelatorio({x_relatorio=0, x_dados='', x_idioma=1}) {
    //Return
    if (x_relatorio == 0) {return;}

    //Idioma
    if (x_idioma == 1) {traducao = 'pt';}
    if (x_idioma == 2) {traducao = 'en';}

    //Dados
    if (x_dados == '') {
        return;
    } else {
        dados = x_dados;
    }

    //Configurações - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Configurações - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Jspdf
    if (!window.jsPDF) window.jsPDF = window.jspdf.jsPDF;

    //Iniciando jsPDF
    var doc = new jsPDF({orientation: 'p'});

    //Variáveis (Geral)
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginLeft = 15; //Margem esquerda padrão
    const marginTop = 50; //Margem topo inicial
    const textWidth = 180; //Tamanho máximo da linha

    var pageTopo = 'build/assets/images/relatorios_topo.png';
    var pageRodape = 'build/assets/images/relatorios_rodape.png';

    //Variáveis
    var novaMarginTop = 0; //Nova margem topo
    var linhasTexto = 0; //Qtd de linhas do texto
    var alturaTexto = 0; //Altura do texto

    var texto = '';
    //Configurações - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Configurações - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Funções internas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Funções internas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    async function adicionarCabecalhoRodape(topo, rodape) {
        doc.addImage(topo, 'PNG', 15, 10, pageWidth - 30, 30);
        doc.addImage(rodape, 'PNG', 15, pageHeight - 30, pageWidth - 20, 20);
    }

    //Função para implementar texto no pdf
    //@PARAM x_align : 'left' // Pode ser 'left', 'right', 'center' ou 'justify'
    //@PARAM x_fontStyle : 'normal', 'bold', 'italic' ou 'bolditalic'
    //@PARAM x_subtitulo : Se for um Título ou Subtítulo que precisa ficar junto do texto posterior então envia algo para não ficar vazio (irá fazer o cálculo diferente de fim de página)
    async function inserirTexto({x_texto = '', x_spacingBetweenTexts = 3, x_marginLeft = marginLeft, x_marginTop = novaMarginTop, x_font = 1, x_fontStyle = 'normal', x_fontSize = 12, x_align = 'left', x_subtitulo = '', x_atualizarNovaMarginTop = true, x_fundo = false, x_fundo_cor = 1}) {
        let linhasTexto = doc.splitTextToSize(x_texto, textWidth);
        let alturaTexto = linhasTexto.length * x_spacingBetweenTexts;

        //Verifica se o texto cabe na página, senão cria uma nova
        let espacoFimPagina = 45;
        if (x_subtitulo != '') {espacoFimPagina = 65;}
        if ((x_marginTop + alturaTexto) > (pageHeight - espacoFimPagina)) {
            await novaPagina();
            x_marginTop = novaMarginTop; // Reinicia a margem após nova página
        }

        // Define a fonte conforme o parâmetro recebido
        switch (x_font) {
            case 1:
                doc.setFont('helvetica', x_fontStyle);
                break;
            case 2:
                doc.setFont('times', x_fontStyle);
                break;
            case 3:
                doc.setFont('courier', x_fontStyle);
                break;
            default:
                doc.setFont('helvetica', x_fontStyle);
        }

        doc.setFontSize(x_fontSize);

        //Alinhamento texto
        let posX = x_marginLeft; // Padrão: alinhado à esquerda

        if (x_align === 'right') {
            posX = pageWidth - x_marginLeft - doc.getTextWidth(x_texto);
        } else if (x_align === 'center') {
            posX = (pageWidth - doc.getTextWidth(x_texto)) / 2;
        }

        //Fundo
        if (x_fundo === true) {
            if (x_fundo_cor == 1) {doc.setFillColor('#d2d3d4');}
            if (x_fundo_cor == 2) {doc.setFillColor('#9eeaf7');}
            if (x_fundo_cor == 3) {doc.setFillColor('#F0E68C');}
            if (x_fundo_cor == 4) {doc.setFillColor('#FA8072');}

            doc.rect(marginLeft, x_marginTop - 5, textWidth, alturaTexto + 3, 'F');
        }

        //Inserir x_texto
        if (x_align === 'justify') {
            doc.text(x_texto, posX, x_marginTop, {maxWidth: textWidth, align: 'justify'});
        } else {
            doc.text(x_texto, posX, x_marginTop);
        }

        x_marginTop += x_spacingBetweenTexts; // Ajusta a posição para a próxima linha

        // Atualiza a margem superior para o próximo bloco de texto
        if (x_atualizarNovaMarginTop === true) {
            novaMarginTop = x_marginTop + alturaTexto + x_spacingBetweenTexts;
        }
    }

    async function inserirLinha({x_spacingBetweenTexts = 3, x_marginLeft = marginLeft, x_marginTop = novaMarginTop, x_tamanho = 195, x_espessura = 0.5}) {
        let alturaTexto = x_espessura * x_spacingBetweenTexts;

        //Verifica se o texto cabe na página, senão cria uma nova
        let espacoFimPagina = 65;
        if ((x_marginTop + alturaTexto) > (pageHeight - espacoFimPagina)) {
            await novaPagina();
            x_marginTop = novaMarginTop; // Reinicia a margem após nova página
        }

        doc.setLineWidth(x_espessura);
        doc.line(x_marginLeft, x_marginTop, x_tamanho, x_marginTop);

        x_marginTop += x_spacingBetweenTexts; // Ajusta a posição para a próxima linha

        novaMarginTop = x_marginTop + alturaTexto + x_spacingBetweenTexts;
    }

    async function novaPagina() {
        doc.addPage();
        novaMarginTop = marginTop;

        await adicionarCabecalhoRodape(pageTopo, pageRodape);
    }
    //Funções internas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Funções internas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Gerando PDF - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Gerando PDF - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    try {
        //Aviso Temporário na tela'''''''''''''''''''''''''''''''''''''''''''''''''''''
        var loadingAvisoTmp = document.getElementById('loading-aviso-tmp');
        loadingAvisoTmp.innerHTML = 'Processando, por favor aguarde...';
        loadingAvisoTmp.style.display = 'block';
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Relatório 1 - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 1 - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        if (x_relatorio == 1) {
            //Cabeçalho e rodapé
            await adicionarCabecalhoRodape(pageTopo, pageRodape);

            //Texto
            texto = 'SISTEMA SAC';
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ' '+texto;
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:marginTop, x_fontSize:12, x_fontStyle:'bold', x_align:'left', x_fundo:true, x_fundo_cor:2});

            //Texto
            texto = 'ADMINISTRAÇÃO E CONTROLE';
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = texto+' ';
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:marginTop, x_fontSize:12, x_fontStyle:'bold', x_align:'right'});

            //Texto
            texto = 'Parâmetros: '+dados.relatorio_parametros;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ' '+texto;
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:marginTop+10, x_fontSize:10, x_align:'left', x_fundo:true, x_fundo_cor:1});

            //Texto
            texto = dados.relatorio_data+' às '+dados.relatorio_hora;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = texto+' ';
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:marginTop+10, x_fontSize:10, x_align:'right'});

            //Tabela - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            //Tabela - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            //Texto
            texto = dados.relatorio_nome;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ' '+texto;
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:12, x_fontStyle:'bold', x_fundo:true});

            var tabelaHTML = `<table>
                            <thead>
                                <tr>
                                    <th>&nbsp;<b>NOME</b>&nbsp;</th>
                                </tr>
                            </thead>
                        <tbody>`;

            var qtdLinhasTabela = 1;

            var registros = dados.relatorio_registros;

            registros.forEach(function (dado) {
                //Dados para preencher na linha da grade
                var nome = dado.name;

                tabelaHTML += `<tr>
                            <td>${nome ? nome : ''}</td>
                        </tr>`;

                qtdLinhasTabela++;
            });

            tabelaHTML += `</tbody>
                    </table>`;

            qtdLinhasTabela++;
            qtdLinhasTabela++;

            //Criando um elemento temporário para converter a string em HTML real
            var div = document.createElement('div');
            if (traducao == 'en') {tabelaHTML = await traduzirTextoGoogle(tabelaHTML);}
            div.innerHTML = tabelaHTML;
            var tabela = div.querySelector('table');

            //Converte a tabela para PDF usando autoTable
            doc.autoTable({
                html: tabela, // Usa a tabela do HTML
                startY: novaMarginTop - 5, // Define onde começa a tabela no PDF
                useCss: true, // Permite que os estilos CSS sejam considerados
                styles: {
                    fontStyle: "normal",
                    fontSize: 8,
                    textColor: [0, 0, 0], // Cor do texto preto
                    lineColor: [121, 130, 156], // Cor da borda cinza escuro (#79829c)
                    lineWidth: 0.2, // Espessura da borda
                },
                headStyles: {
                    fontStyle: "bold",
                    fontSize: 8,
                    fillColor: ['#F2CEED'], // Cor do cabeçalho #00FEFF (Ciano)
                    textColor: [0, 0, 0], // Texto preto
                },
                alternateRowStyles: {
                    fillColor: [255, 255, 255], // Cor de fundo alternada para as linhas
                },
                columnStyles: {
                    0: { halign: "left" }, // Coluna NOME centralizada
                },
                didParseCell: function (data) {
                    //Força padding em cada célula
                    data.cell.styles.cellPadding = 2;
                },
                margin: { top: 0 },
            });

            //Nova margem topo para depois da tabela
            novaMarginTop = novaMarginTop + (qtdLinhasTabela*6.3) + 5;
            //Tabela - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            //Tabela - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        }
        //Relatório 1 - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 1 - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Relatório 2 - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 2 - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        if (x_relatorio == 2) {
            //Cabeçalho e rodapé
            await adicionarCabecalhoRodape(pageTopo, pageRodape);

            //Texto
            texto = 'SISTEMA SAC';
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ' '+texto;
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:marginTop, x_fontSize:12, x_fontStyle:'bold', x_align:'left', x_fundo:true, x_fundo_cor:2});

            //Texto
            texto = 'ADMINISTRAÇÃO E CONTROLE';
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = texto+' ';
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:marginTop, x_fontSize:12, x_fontStyle:'bold', x_align:'right'});

            //Texto
            texto = 'Parâmetros: '+dados.relatorio_parametros;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ' '+texto;
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:marginTop+10, x_fontSize:10, x_align:'left', x_fundo:true, x_fundo_cor:1});

            //Texto
            texto = dados.relatorio_data+' às '+dados.relatorio_hora;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = texto+' ';
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:marginTop+10, x_fontSize:10, x_align:'right'});

            //Tabela - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            //Tabela - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            //Texto
            texto = dados.relatorio_nome;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ' '+texto;
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:12, x_fontStyle:'bold', x_fundo:true});

            var tabelaHTML = `<table>
                            <thead>
                                <tr>
                                    <th>&nbsp;<b>USUÀRIO</b>&nbsp;</th>
                                    <th>&nbsp;<b>E-MAIL</b>&nbsp;</th>
                                    <th>&nbsp;<b>GRUPO</b>&nbsp;</th>
                                    <th>&nbsp;<b>SITUAÇÃO</b>&nbsp;</th>
                                </tr>
                            </thead>
                        <tbody>`;

            var qtdLinhasTabela = 1;

            var registros = dados.relatorio_registros;

            registros.forEach(function (dado) {
                //Dados para preencher na linha da grade
                var name = dado.name;
                var email = dado.email;
                var grupo = dado.grupo;
                var situacao = dado.situacao;

                tabelaHTML += `<tr>
                            <td>${name ? name : ''}</td>
                            <td>${email ? email : ''}</td>
                            <td>${grupo ? grupo : ''}</td>
                            <td>${situacao ? situacao : ''}</td>
                        </tr>`;

                qtdLinhasTabela++;
            });

            tabelaHTML += `</tbody>
                    </table>`;

            qtdLinhasTabela++;
            qtdLinhasTabela++;

            //Criando um elemento temporário para converter a string em HTML real
            var div = document.createElement('div');
            if (traducao == 'en') {tabelaHTML = await traduzirTextoGoogle(tabelaHTML);}
            div.innerHTML = tabelaHTML;
            var tabela = div.querySelector('table');

            //Converte a tabela para PDF usando autoTable
            doc.autoTable({
                html: tabela, // Usa a tabela do HTML
                startY: novaMarginTop - 5, // Define onde começa a tabela no PDF
                useCss: true, // Permite que os estilos CSS sejam considerados
                styles: {
                    fontStyle: "normal",
                    fontSize: 8,
                    textColor: [0, 0, 0], // Cor do texto preto
                    lineColor: [121, 130, 156], // Cor da borda cinza escuro (#79829c)
                    lineWidth: 0.2, // Espessura da borda
                },
                headStyles: {
                    fontStyle: "bold",
                    fontSize: 8,
                    fillColor: ['#F2CEED'], // Cor do cabeçalho #00FEFF (Ciano)
                    textColor: [0, 0, 0], // Texto preto
                },
                alternateRowStyles: {
                    fillColor: [255, 255, 255], // Cor de fundo alternada para as linhas
                },
                columnStyles: {
                    0: { halign: "left" }, // Coluna NOME centralizada
                },
                didParseCell: function (data) {
                    //Força padding em cada célula
                    data.cell.styles.cellPadding = 2;
                },
                margin: { top: 0 },
            });

            //Nova margem topo para depois da tabela
            novaMarginTop = novaMarginTop + (qtdLinhasTabela*6.3) + 5;
            //Tabela - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            //Tabela - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        }
        //Relatório 2 - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 2 - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Relatório 3 - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 3 - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        if (x_relatorio == 3) {
            //Cabeçalho e rodapé
            await adicionarCabecalhoRodape(pageTopo, pageRodape);

            //Texto
            texto = 'SISTEMA SAC';
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ' '+texto;
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:marginTop, x_fontSize:12, x_fontStyle:'bold', x_align:'left', x_fundo:true, x_fundo_cor:2});

            //Texto
            texto = 'ADMINISTRAÇÃO E CONTROLE';
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = texto+' ';
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:marginTop, x_fontSize:12, x_fontStyle:'bold', x_align:'right'});

            //Texto
            texto = 'Parâmetros: '+dados.relatorio_parametros;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ' '+texto;
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:marginTop+10, x_fontSize:10, x_align:'left', x_fundo:true, x_fundo_cor:1});

            //Texto
            texto = dados.relatorio_data+' às '+dados.relatorio_hora;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = texto+' ';
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:marginTop+10, x_fontSize:10, x_align:'right'});

            //Tabela - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            //Tabela - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            //Texto
            texto = dados.relatorio_nome;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ' '+texto;
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:12, x_fontStyle:'bold', x_fundo:true});

            var tabelaHTML = `<table>
                            <thead>
                                <tr>
                                    <th>&nbsp;<b>DATA</b>&nbsp;</th>
                                    <th>&nbsp;<b>USUÁRIO</b>&nbsp;</th>
                                    <th>&nbsp;<b>SUBMÓDULO</b>&nbsp;</th>
                                    <th>&nbsp;<b>OPERAÇÃO</b>&nbsp;</th>
                                    <th>&nbsp;<b>DADOS</b>&nbsp;</th>
                                </tr>
                            </thead>
                        <tbody>`;

            var qtdLinhasTabela = 1;

            var registros = dados.relatorio_registros;

            registros.forEach(function (dado) {
                //Dados para preencher na linha da grade
                var v_date = dado.date;
                var v_user = dado.user;
                var v_submodulo = dado.submodulo;
                var v_operacao = dado.operacao;
                var v_dados = dado.dados;

                //Retirar as Tags Html para melhorar a visualização na Table'''''
                v_dados = v_dados.replaceAll('<br>', '\n');
                v_dados = v_dados.replaceAll('<b>', '');
                v_dados = v_dados.replaceAll('</b>', '');
                v_dados = v_dados.replaceAll('<b class="text-success">', '');
                v_dados = v_dados.replaceAll("<b class='text-success'>", '');
                v_dados = v_dados.replaceAll('<b class="text-danger">', '');
                v_dados = v_dados.replaceAll("<b class='text-danger'>", '');
                v_dados = v_dados.replaceAll("<font class='text-success'>", '');
                v_dados = v_dados.replaceAll('<font class="text-success">', '');
                v_dados = v_dados.replaceAll("<font class='text-danger'>", '');
                v_dados = v_dados.replaceAll('<font class="text-danger">', '');
                v_dados = v_dados.replaceAll('</font>', '');
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                tabelaHTML += `<tr>
                            <td>${v_date ? v_date : ''}</td>
                            <td>${v_user ? v_user : ''}</td>
                            <td>${v_submodulo ? v_submodulo : ''}</td>
                            <td>${v_operacao ? v_operacao : ''}</td>
                            <td>${v_dados ? v_dados : ''}</td>
                        </tr>`;

                qtdLinhasTabela++;
            });

            tabelaHTML += `</tbody>
                    </table>`;

            qtdLinhasTabela++;
            qtdLinhasTabela++;

            //Criando um elemento temporário para converter a string em HTML real
            var div = document.createElement('div');
            if (traducao == 'en') {tabelaHTML = await traduzirTextoGoogle(tabelaHTML);}
            div.innerHTML = tabelaHTML;
            var tabela = div.querySelector('table');

            //Converte a tabela para PDF usando autoTable
            doc.autoTable({
                html: tabela, // Usa a tabela do HTML
                startY: novaMarginTop - 5, // Define onde começa a tabela no PDF
                useCss: true, // Permite que os estilos CSS sejam considerados
                styles: {
                    fontStyle: "normal",
                    fontSize: 8,
                    textColor: [0, 0, 0], // Cor do texto preto
                    lineColor: [121, 130, 156], // Cor da borda cinza escuro (#79829c)
                    lineWidth: 0.2, // Espessura da borda
                },
                headStyles: {
                    fontStyle: "bold",
                    fontSize: 8,
                    fillColor: ['#F2CEED'], // Cor do cabeçalho #00FEFF (Ciano)
                    textColor: [0, 0, 0], // Texto preto
                },
                alternateRowStyles: {
                    fillColor: [255, 255, 255], // Cor de fundo alternada para as linhas
                },
                columnStyles: {
                    0: { halign: "left" }, // Coluna NOME centralizada
                },
                didParseCell: function (data) {
                    //Força padding em cada célula
                    data.cell.styles.cellPadding = 2;
                },
                margin: { top: 0 },
            });

            //Nova margem topo para depois da tabela
            novaMarginTop = novaMarginTop + (qtdLinhasTabela*6.3) + 5;
            //Tabela - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            //Tabela - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        }
        //Relatório 3 - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 3 - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Relatório 6 - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 6 - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        if (x_relatorio == 6) {
            //Cabeçalho e rodapé
            await adicionarCabecalhoRodape(pageTopo, pageRodape);

            //Texto
            texto = 'SISTEMA SAC';
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ' '+texto;
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:marginTop, x_fontSize:12, x_fontStyle:'bold', x_align:'left', x_fundo:true, x_fundo_cor:2});

            //Texto
            texto = 'ADMINISTRAÇÃO E CONTROLE';
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = texto+' ';
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:marginTop, x_fontSize:12, x_fontStyle:'bold', x_align:'right'});

            //Texto
            texto = 'Parâmetros: '+dados.relatorio_parametros;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ' '+texto;
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:marginTop+10, x_fontSize:10, x_align:'left', x_fundo:true, x_fundo_cor:1});

            //Texto
            texto = dados.relatorio_data+' às '+dados.relatorio_hora;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = texto+' ';
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:marginTop+10, x_fontSize:10, x_align:'right'});

            //Texto
            texto = dados.relatorio_nome;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ' '+texto;
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:12, x_fontStyle:'bold', x_fundo:true});

            //Dados para API Fogo Cruzado
            const data_inicio = dados.relatorio_registros.data_inicio;
            const data_fim = dados.relatorio_registros.data_fim;
            const cidade_id = dados.relatorio_registros.cidade_id;
            const cidade = dados.relatorio_registros.cidade;

            const dados_api = Object.values(await apiFogoCruzadoMain(data_inicio, data_fim, cidade_id));

            //Ocorrências
            var numOcor = 0;

            for (const item of dados_api) {
                numOcor++;

                //Texto
                texto = 'OCORRÊNCIA N. : '+numOcor;
                if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                texto = ' '+texto;
                await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10, x_fontStyle:'bold', x_fundo:true, x_fundo_cor:3});

                //Texto
                texto = 'Endereço: '+item.address;
                if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                texto = ' '+texto;
                await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10});

                if (item.neighborhood) {
                    //Texto
                    texto = 'Vizinhança: '+item.neighborhood.name;
                    if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                    texto = ' '+texto;
                    await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10});
                }

                if (item.locality) {
                    //Texto
                    texto = 'Localização: '+item.locality.name;
                    if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                    texto = ' '+texto;
                    await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10});
                }

                //Texto
                texto = 'Data: '+item.date;
                if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                texto = ' '+texto;
                await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10});

                //Texto
                texto = 'Ação Policial: '+item.policeAction;
                if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                texto = ' '+texto;
                await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10});

                //Texto
                texto = 'Presença do Agente: '+item.agentPresence;
                if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                texto = ' '+texto;
                await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10});

                //Texto
                texto = 'Razão Principal: '+item.contextInfo.mainReason.name;
                if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                texto = ' '+texto;
                await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10});

                //Texto
                texto = 'Unidade Policial: '+item.contextInfo.policeUnit;
                if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                texto = ' '+texto;
                await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10});

                if (item.clippings) {
                    //Texto
                    texto = 'Recortes: '+item.clippings.name;
                    if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                    texto = ' '+texto;
                    await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10});
                }

                if (item.victims) {
                    let vitimas = item.victims;

                    var numVit = 0;

                    for (const vitima of vitimas) {
                        numVit++;

                        //Texto
                        texto = 'VÍTIMA N. : ' + numVit;
                        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                        texto = '   ::'+texto;
                        await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10, x_fontStyle:'bold', x_fundo:true, x_fundo_cor:4});

                        //Texto
                        texto = 'Tipo: '+vitima.type;
                        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                        texto = '     '+texto;
                        await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10});

                        //Texto
                        texto = 'Situação: '+vitima.situation;
                        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                        texto = '     '+texto;
                        await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10});

                        //Texto
                        texto = 'Idade: '+vitima.age;
                        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                        texto = '     '+texto;
                        await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10});

                        //Texto
                        texto = 'Gênero: '+vitima.genre.name;
                        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                        texto = '     '+texto;
                        await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10});

                        //Texto
                        texto = 'Raça: '+vitima.race;
                        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                        texto = '     '+texto;
                        await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10});
                    }
                }
            }
        }
        //Relatório 6 - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 6 - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Gerar o pdf, abrir em uma outra aba e colocar link para download - Início'''''''''''''''''''''''''''''''''''''
        //Gerar o pdf, abrir em uma outra aba e colocar link para download - Início'''''''''''''''''''''''''''''''''''''
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        //Tentar abrir em uma nova aba
        const newTab = window.open(pdfUrl);

        //Adiciona um link abaixo do botão
        /*
        let elemento = document.getElementById('xxxx');

        //Verifica se já existe um link para evitar duplicação
        let existingLink = document.getElementById('pdf_download_link');
        if (existingLink) {
            existingLink.href = pdfUrl; // Atualiza o link existente
            return;
        }

        //Cria o link dinamicamente
        let link = document.createElement('a');
        link.id = 'pdf_download_link';
        link.href = pdfUrl;
        link.download = 'documento.pdf';
        link.textContent = 'Clique aqui para baixar o PDF';

        //Estiliza o link para ficar vermelho
        link.style.color = 'red';
        link.style.textDecoration = 'underline';
        link.style.display = 'block';
        link.style.marginTop = '10px';

        //Insere o link logo abaixo do botão
        elemento.parentNode.insertBefore(link, elemento.nextSibling);
        */
        //Gerar o pdf, abrir em uma outra aba e colocar link para download - Fim''''''''''''''''''''''''''''''''''''''''
        //Gerar o pdf, abrir em uma outra aba e colocar link para download - Fim''''''''''''''''''''''''''''''''''''''''
    } catch (e) {
        alert("Erro ao gerar PDF: " + e.message);
    } finally {
        //Aviso Temporário na tela'''''''''''''''''''''''''''''''''''''''''''''''''''''
        var loadingAvisoTmp = document.getElementById('loading-aviso-tmp');
        loadingAvisoTmp.innerHTML = '';
        loadingAvisoTmp.style.display = 'none';
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }
    //Gerando PDF - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Gerando PDF - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
}

document.addEventListener("DOMContentLoaded", function(event) {
    relatorios();

    //<select> select2''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    $('#modal_relatorio7_clientes_executivos_ids, #modal_relatorio7_funcionarios_ids').select2({
        dropdownParent: $('#modal_relatorio7'),
        width: '100%'
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
