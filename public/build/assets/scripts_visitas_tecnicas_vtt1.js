function vtt1_validar_frm_visitas_tecnicas() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: visita_tecnica_tipo_id (requerido)
    if (validacao({op:1, value:document.getElementById('visita_tecnica_tipo_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Tipo requerido.'+'<br>';
    } else {
        //Campo: visita_tecnica_tipo_id (deve ser um número)
        if (validacao({op:4, value: document.getElementById('visita_tecnica_tipo_id').value}) === false) {
            validacao_ok = false;
            mensagem += 'Tipo deve ser escolhido.' + '<br>';
        }
    }

    //Se diferente de inclusão validar campos vtt1_visita_tecnica_status_id, datas e horas''''''''''''''''''''''''''''''''''''
    if (document.getElementById('frm_operacao').value != 'create') {
        //Campo: vtt1_visita_tecnica_status_id
        if (validacao({op: 1, value: document.getElementById('vtt1_visita_tecnica_status_id').value}) === false) {
            validacao_ok = false;
            mensagem += 'Status requerido.' + '<br>';
        } else {
            //Campo: vtt1_visita_tecnica_status_id (deve ser um número)
            if (validacao({op: 4, value: document.getElementById('vtt1_visita_tecnica_status_id').value}) === false) {
                validacao_ok = false;
                mensagem += 'Status deve ser escolhido.' + '<br>';
            } else {
                var status_id = document.getElementById('vtt1_visita_tecnica_status_id').value;

                if (status_id == 1) {  //ABERTA
                    //Campo: vtt1_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt1_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt1_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_data_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_data_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt1_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_hora_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_hora_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt1_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }
                } else if (status_id == 2) {  //EM ANDAMENTO
                    //Campo: vtt1_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt1_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt1_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_data_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_data_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt1_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_hora_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_hora_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt1_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }
                } else if (status_id == 3) {  //CONCLUÍDA
                    //Campo: vtt1_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt1_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt1_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_data_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_data_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt1_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_hora_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_hora_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt1_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_data_conclusao (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_data_conclusao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data conclusão requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt1_data_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_hora_conclusao (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_hora_conclusao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora conclusão requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt1_hora_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora conclusão inválida.' + '<br>';
                        }
                    }
                } else if (status_id == 4) {  //FINALIZADA
                    //Campo: vtt1_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt1_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt1_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_data_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_data_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt1_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_hora_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_hora_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt1_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_data_conclusao (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_data_conclusao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data conclusão requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt1_data_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_hora_conclusao (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_hora_conclusao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora conclusão requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt1_hora_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_data_finalizacao (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_data_finalizacao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data finalização requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt1_data_finalizacao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data finalização inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_hora_finalizacao (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_hora_finalizacao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora finalização requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt1_hora_finalizacao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora finalização inválida.' + '<br>';
                        }
                    }
                } else if (status_id == 4) {  //CANCELADA
                    //Campo: vtt1_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt1_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt1_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_data_prevista (não requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_data_prevista').value}) === true) {
                        if (validacao({op: 8, value: document.getElementById('vtt1_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_hora_prevista (não requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_hora_prevista').value}) === true) {
                        if (validacao({op: 17, value: document.getElementById('vtt1_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_data_conclusao (não requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_data_conclusao').value}) === true) {
                        if (validacao({op: 8, value: document.getElementById('vtt1_data_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_hora_conclusao (não requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_hora_conclusao').value}) === true) {
                        if (validacao({op: 17, value: document.getElementById('vtt1_hora_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_data_finalizacao (não requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_data_finalizacao').value}) === true) {
                        if (validacao({op: 8, value: document.getElementById('vtt1_data_finalizacao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data finalização inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt1_hora_finalizacao (não requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt1_hora_finalizacao').value}) === true) {
                        if (validacao({op: 17, value: document.getElementById('vtt1_hora_finalizacao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora finalização inválida.' + '<br>';
                        }
                    }
                }
            }
        }
    }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Campo: vtt1_cliente_id (requerido)
    if (validacao({op:1, value:document.getElementById('vtt1_cliente_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.' + '<br>';
    } else {
        //Campo: vtt1_cliente_id (deve ser um número)
        if (validacao({op:4, value: document.getElementById('vtt1_cliente_id').value}) === false) {
            validacao_ok = false;
            mensagem += 'Cliente deve ser escolhido.' + '<br>';
        }
    }

    //Grade de Equipes
    var qtd_linhas_grade_equipe_funcionarios = 0;
    document.querySelectorAll("input[name='vtt1_equipe_funcionario_id[]']").forEach((element) => {
        qtd_linhas_grade_equipe_funcionarios++;
    });

    if (qtd_linhas_grade_equipe_funcionarios == 0) {
        validacao_ok = false;
        mensagem += 'Escolha pelo menos um funcionário.' + '<br>';
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

async function vtt1_visita_tecnica_gerar_pdf(visita_tecnica_id=0, traducao='pt') {
    try {
        document.getElementById('loadingAviso').style.display = 'block';
        await vtt1_gerarPDF(visita_tecnica_id, traducao);
    } catch (e) {
        alert("Erro ao gerar PDF: " + e.message);
    } finally {
        document.getElementById('loadingAviso').style.display = 'none';
    }
}

async function vtt1_gerarPDF(visita_tecnica_id=0, traducao='pt') {
    //Acessar rota visitas_tecnicas
    let response = await fetch('visitas_tecnicas/' + visita_tecnica_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    let data = await response.json();

    //Lendo dados
    if (data.success) {
        //Configurações - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Configurações - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
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
        const spacingBetweenTexts1 = 1; //Espaçamento entre dois textos
        const spacingBetweenTexts2 = 2; //Espaçamento entre dois textos
        const spacingBetweenTexts3 = 3; //Espaçamento entre dois textos
        const spacingBetweenTexts4 = 4; //Espaçamento entre dois textos
        const spacingBetweenTexts5 = 5; //Espaçamento entre dois textos
        const spacingBetweenTexts6 = 6; //Espaçamento entre dois textos
        const spacingBetweenTexts8 = 8; //Espaçamento entre dois textos
        const spacingBetweenTexts10 = 10; //Espaçamento entre dois textos
        const cliente_id = data.success.cliente_id; //cliente_id para ser usado nas funções internas
        var pageTopo = 'build/assets/images/visita_tecnica_topo.png';
        var pageRodape = 'build/assets/images/visita_tecnica_rodape.png';

        //Verificar se existe topo e rodapé para cliente''''''''''''''''''''''''''''''''''''''''''''''''''''''
        var url_atual = window.location.protocol + '//' + window.location.host + '/';

        await arquivoExiste(url_atual+'/build/assets/images/visita_tecnica_topo_cliente_'+cliente_id+'.png').then(existe => {
            if (existe) {pageTopo = 'build/assets/images/visita_tecnica_topo_cliente_'+cliente_id+'.png';}
        });

        await arquivoExiste(url_atual+'/build/assets/images/visita_tecnica_rodape_cliente_'+cliente_id+'.png').then(existe => {
            if (existe) {pageRodape = 'build/assets/images/visita_tecnica_rodape_cliente_'+cliente_id+'.png';}
        });
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Variáveis
        var novaMarginTop = 0; //Nova margem topo
        var linhasTexto = 0; //Qtd de linhas do texto
        var alturaTexto = 0; //Altura do texto

        var texto = '';
        var numeroTitulo = 0; //Número dos Títulos do PDF
        //Configurações - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Configurações - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Funções internas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Funções internas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        async function adicionarCabecalhoRodape(topo, rodape) {
            doc.addImage(topo, 'PNG', 15, 10, pageWidth - 30, 30);
            doc.addImage(rodape, 'PNG', 15, pageHeight - 30, pageWidth - 20, 20);
        }

        //Função para implementar texto no pdf
        //@PARAM x_align : 'left' // Pode ser 'left', 'right', 'center' ou 'justify'
        //@PARAM x_fontStyle : 'normal', 'bold', 'italic' ou 'bolditalic'
        //@PARAM x_subtitulo : Se for um Título ou Subtítulo que precisa ficar junto do texto posterior então envia algo para não ficar vazio (irá fazer o cálculo diferente de fim de página)
        async function inserirTexto({x_texto = '', x_spacingBetweenTexts = spacingBetweenTexts3, x_marginLeft = marginLeft, x_marginTop = novaMarginTop, x_font = 1, x_fontStyle = 'normal', x_fontSize = 12, x_align = 'left', x_subtitulo = '', x_atualizarNovaMarginTop = true, x_fundo = false, x_fundo_cor = 1}) {
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

        async function inserirLinha({x_spacingBetweenTexts = spacingBetweenTexts3, x_marginLeft = marginLeft, x_marginTop = novaMarginTop, x_tamanho = 195, x_espessura = 0.5}) {
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

        //Inserir Mapa
        async function inserirMapa(doc, imagemBase64, largura, altura) {
            //Verifica se cabe na página, senão cria uma nova
            let espacoFimPagina = 50;
            if ((novaMarginTop + altura) > (pageHeight - espacoFimPagina)) {
                await novaPagina();
            }

            //Texto
            texto = numeroTitulo+'.4 Mapa da Rota';
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            await inserirTexto({ x_texto: texto, x_spacingBetweenTexts: spacingBetweenTexts3, x_fontSize: 11, x_align: 'justify', x_fontStyle: 'bold' });

            doc.addImage(imagemBase64, 'JPEG', 15, novaMarginTop, largura, altura);

            // Atualiza a margem superior para o próximo bloco de texto
            novaMarginTop += altura;
        }

        async function novaPagina() {
            doc.addPage();
            novaMarginTop = marginTop;

            await adicionarCabecalhoRodape(pageTopo, pageRodape);
        }
        //Funções internas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Funções internas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Gravando pdf - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Gravando pdf - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Cabeçalho e rodapé
        await adicionarCabecalhoRodape(pageTopo, pageRodape);

        //Texto
        texto = ' SISTEMA SEGOA';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_marginTop:marginTop, x_fontSize:12, x_fontStyle:'bold', x_align:'left', x_fundo:true, x_fundo_cor:2});

        //Texto
        texto = 'SEGURANÇA E PREVENÇÃO ';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_marginTop:marginTop, x_fontSize:12, x_fontStyle:'bold', x_align:'right'});

        //Texto
        texto = ' Visita Técnica nº. '+data.success.numero_visita_tecnica+'/'+data.success.ano_visita_tecnica+'.';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:12, x_align:'lef', x_fundo:true});

        //Linha
        await inserirLinha({x_spacingBetweenTexts:spacingBetweenTexts3, x_marginLeft:15, x_marginTop:novaMarginTop-5, x_tamanho:195, x_espessura:0.7});

        //Texto
        texto = 'DATA: '+data.success.data_prevista;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_fontSize:11});

        //Texto
        texto = 'CLIENTE: '+data.success.cliente_nome;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts3, x_fontSize:11});

        if (data.success.observacao !== null && data.success.observacao !== undefined && data.success.observacao !== '') {
            //Texto
            texto = 'Observação: '+data.success.observacao;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts3, x_fontSize:11, x_align:'justify', x_fontStyle:'normal'});
        }

        //Gerar o pdf, abrir em uma outra aba e colocar link para download''''''''''''''''''''''''''
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        //Tentar abrir em uma nova aba
        const newTab = window.open(pdfUrl);

        //Adiciona um link abaixo do botão
        let frm_visitas_tecnicas = document.getElementById('frm_visitas_tecnicas');

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
        frm_visitas_tecnicas.parentNode.insertBefore(link, frm_visitas_tecnicas.nextSibling);
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Gravando pdf - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Gravando pdf - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }
}

document.addEventListener('DOMContentLoaded', function(event) {
    //Buscar dados do Cliente escolhido
    document.getElementById('vtt1_cliente_id').addEventListener('change', function() {
        if (document.getElementById('vtt1_cliente_id').value == '') {
            //Inputs
            document.getElementById('vtt1_cliente_nome').value = '';
            document.getElementById('vtt1_cliente_telefone').value = '';
            document.getElementById('vtt1_cliente_celular').value = '';
            document.getElementById('vtt1_cliente_email').value = '';
            document.getElementById('vtt1_cliente_logradouro').value = '';
            document.getElementById('vtt1_cliente_bairro').value = '';
            document.getElementById('vtt1_cliente_cidade').value = '';
        } else {
            var vtt1_cliente_id = document.getElementById('vtt1_cliente_id').value;

            //Route: clientes/id
            fetch('clientes/'+vtt1_cliente_id, {
                method: 'GET',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                var cliente = data.success;

                //Telefone
                var telefone = '';
                if (cliente.telefone_1 !== '' && cliente.telefone_1 !== null) {
                    telefone = cliente.telefone_1;
                } else {
                    if (cliente.telefone_2 !== '' && cliente.telefone_2 !== null) {
                        telefone = cliente.telefone_2;
                    }
                }

                if (telefone != '') {
                    telefone = telefone.replace(/\D/g, ""); // Remove tudo que não for número
                    telefone = telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
                }

                //Celular
                var celular = '';
                if (cliente.celular_1 !== '' && cliente.celular_1 !== null) {
                    celular = cliente.celular_1;
                } else {
                    if (cliente.celular_2 !== '' && cliente.celular_2 !== null) {
                        celular = cliente.celular_2;
                    }
                }

                if (celular != '') {
                    celular = celular.replace(/\D/g, ""); // Remove tudo que não for número
                    celular = celular.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
                }

                //Inputs
                document.getElementById('vtt1_cliente_nome').value = cliente.name;
                document.getElementById('vtt1_cliente_telefone').value = telefone;
                document.getElementById('vtt1_cliente_celular').value = celular;
                document.getElementById('vtt1_cliente_email').value = cliente.email;
                document.getElementById('vtt1_cliente_logradouro').value = cliente.logradouro;
                document.getElementById('vtt1_cliente_bairro').value = cliente.bairro;
                document.getElementById('vtt1_cliente_cidade').value = cliente.localidade;
            }).catch(error => {
                alert('Erro VisitasTecnicas:'+error);
            });


        }
    });
});
