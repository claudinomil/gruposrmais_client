function validar_frm_propostas() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: cliente_id (requerido)
    if (validacao({op:1, value:document.getElementById('cliente_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.'+'<br>';
    } else {
        //Campo: cliente_id (deve ser um número)
        if (validacao({op: 4, value: document.getElementById('cliente_id').value}) === false) {
            validacao_ok = false;
            mensagem += 'Cliente deve ser escolhido.' + '<br>';
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

//Atualiza/Limpa os dados do Serviço escolhido para grade
//operacao = 0 : Limpar
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
//operacao = 3 : Retirar
function atualizarServicoEscolher(operacao, servico_id='', servico_nome='', servico_valor='', servico_qtd='') {
    if (operacao == 0) {
        //campos
        document.getElementById('ts_servico_id').value = servico_id;
        //document.getElementById('select2-ts_servico_id-container').innerHTML = servico_nome;
        document.getElementById('ts_servico_nome').value = servico_nome;
        document.getElementById('ts_servico_valor').value = servico_valor;
        document.getElementById('ts_servico_qtd').value = servico_qtd;

        //botoes
        document.getElementById('ts_servico_adicionar_div').style.display = 'none';
        document.getElementById('ts_servico_retirar_div').style.display = 'none';
    }

    if (operacao == 1) {
        //campos
        document.getElementById('ts_servico_nome').value = servico_nome;
        document.getElementById('ts_servico_valor').value = servico_valor;
        document.getElementById('ts_servico_qtd').value = servico_qtd;

        //botoes
        document.getElementById('ts_servico_adicionar_div').style.display = 'block';
        document.getElementById('ts_servico_retirar_div').style.display = 'none';
    }

    if (operacao == 2) {
        //campos
        document.getElementById('ts_servico_id').value = servico_id;
        //document.getElementById('select2-ts_servico_id-container').innerHTML = servico_nome;
        document.getElementById('ts_servico_nome').value = servico_nome;
        document.getElementById('ts_servico_valor').value = servico_valor;
        document.getElementById('ts_servico_qtd').value = servico_qtd;

        //botoes
        document.getElementById('ts_servico_adicionar_div').style.display = 'none';
        document.getElementById('ts_servico_retirar_div').style.display = 'block';
    }
}

//Atualizar a Grade de Serviço
//operacao = 0 : Somente atualiza os valores
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
//operacao = 3 : Retirar
function atualizarServicoGrade(operacao) {
    if (operacao == 1) {
        //Dados para preenchera linha da grade
        servico_id = document.getElementById('ts_servico_id').value;
        servico_nome = document.getElementById('ts_servico_nome').value;
        servico_valor = document.getElementById('ts_servico_valor').value;
        servico_qtd = document.getElementById('ts_servico_qtd').value;
        servico_valor_total = servico_qtd * moeda2float(servico_valor);
        servico_valor_total = float2moeda(servico_valor_total);

        //Montar Linha
        var linha;

        linha = "<tr class='ts_servico_linha' id='ts_servico_linha_" + servico_id + "' data-id='" + servico_id + "' style='cursor: pointer' onclick='selecionarServicoExclusão("+servico_id+");'>";
        linha += "  <td class='text-center ts_servico_item' data-id='" + servico_id + "'></td>";
        linha += "  <td id='ts_servico_nome_td_" + servico_id + "'>" + servico_nome + "</td>";
        linha += "  <td id='ts_servico_valor_td_" + servico_id + "' class='text-end'>R$ " + servico_valor + "</td>";
        linha += "  <td id='ts_servico_qtd_td_" + servico_id + "' class='text-center'>" + servico_qtd + "</td>";
        linha += "  <td class='text-end ts_servico_valor_total'>R$ " + servico_valor_total + "</td>";
        linha += "</tr>";

        //Adicionar linha na grade
        document.getElementById('ts_servico_grade').insertAdjacentHTML('beforeend', linha);

        //Montar campos hidden
        var hiddens;

        hiddens = "<div id='ts_servico_hiddens_" + servico_id + "'>";
        hiddens += "<input class='servico_item_hiddens' type='hidden' name='servico_item[]' id='servico_item' value=''>";
        hiddens += "<input type='hidden' name='servico_id[]' id='servico_id' value='"+servico_id+"'>";
        hiddens += "<input type='hidden' name='servico_nome[]' id='servico_nome' value='"+servico_nome+"'>";
        hiddens += "<input type='hidden' name='servico_valor[]' id='servico_valor' value='"+moeda2float(servico_valor)+"'>";
        hiddens += "<input type='hidden' name='servico_quantidade[]' id='servico_quantidade' value='"+servico_qtd+"'>";
        hiddens += "<input type='hidden' name='servico_valor_total[]' id='servico_valor_total' value='"+moeda2float(servico_valor_total)+"'>";
        hiddens += "</div>";

        //Adicionar hiddens na div
        document.getElementById('ts_servico_hiddens').insertAdjacentHTML('beforeend', hiddens);
    }

    if (operacao == 3) {
        //Dados
        servico_id = document.getElementById('ts_servico_id').value;

        //Remover linha da grade
        let linha = document.getElementById('ts_servico_linha_' + servico_id);
        if (linha) linha.remove();

        //Remover campos hiddens
        let hiddenFields = document.getElementById('ts_servico_hiddens_' + servico_id);
        if (hiddenFields) hiddenFields.remove();
    }

    //Atualizando numeração das linhas da coluna Item
    var ln = 0;
    document.querySelectorAll('.ts_servico_item').forEach((element) => {
        ln++;
        element.innerHTML = ln;
    });

    //Atualizando numeração das divs da coluna Item dos campos hiddens
    var ln = 0;
    document.querySelectorAll('.servico_item_hiddens').forEach((element) => {
        ln++;
        element.value = ln;
    });

    //Atualizando Valor Global
    var valor_global = 0;
    var valor_total = 0;
    document.querySelectorAll('.ts_servico_valor_total').forEach((element) => {
        valor_total = element.innerHTML;
        valor_total = valor_total.substring(3);
        valor_total = moeda2float(valor_total);

        valor_global += valor_total;
    });

    document.getElementById('ts_servico_valor_global').innerHTML = 'R$ ' + float2moeda(valor_global);

    //Atualizar Valor Total da Proposta
    atualizarValorTotalProposta(valor_global);
}

//Limpar a Grade de Serviço
function limparServicosGrade() {
    //Limpando Serviços da grade
    document.getElementById('ts_servico_grade').innerHTML = '';

    //Limpando campos hiddens
    document.getElementById('ts_servico_hiddens').innerHTML = '';

    //Atualizar Valor Total da Proposta
    atualizarValorTotalProposta(0);
}

//Atualizar o Valor Total da Proposta
function atualizarValorTotalProposta(valor_global) {
    let porcentagem_desconto = document.getElementById('porcentagem_desconto').value;

    if (porcentagem_desconto === '') {
        porcentagem_desconto = 0;
        document.getElementById('porcentagem_desconto').value = porcentagem_desconto;
    }

    let valor_desconto = (valor_global * porcentagem_desconto) / 100;

    document.getElementById('valor_desconto').value = float2moeda(valor_desconto);
    document.getElementById('valor_desconto_extenso').value = valorExtenso(valor_desconto);

    document.getElementById('valor_total').value = float2moeda(valor_global - valor_desconto);
    document.getElementById('valor_total_extenso').value = valorExtenso(valor_global - valor_desconto);
}

//Gerar Proposta
function gerarProposta(proposta_id=0) {
    if (proposta_id == 0) {proposta_id = document.getElementById('registro_id').value;}

    proposta_gerar_pdf(proposta_id);
}

//Pegar dados da linha que clicou e jogar para o Serviço Escolher
function selecionarServicoExclusão(servico_id) {
    let servico_nome = document.getElementById('ts_servico_nome_td_' + servico_id).innerHTML;
    let servico_valor = document.getElementById('ts_servico_valor_td_' + servico_id).innerHTML;
    servico_valor = servico_valor.substring(3);
    let servico_qtd = document.getElementById('ts_servico_qtd_td_' + servico_id).innerHTML;

    atualizarServicoEscolher(2, servico_id, servico_nome, servico_valor, servico_qtd);
}

function proposta_gerar_pdf(proposta_id=0) {
    //Configurações
    if (!window.jsPDF) window.jsPDF = window.jspdf.jsPDF;

    //Iniciando jsPDF
    var doc = new jsPDF({orientation: 'p'});

    //Variáveis (Geral)
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    function adicionarCabecalhoRodape() {
        doc.addImage('build/assets/images/proposta_topo.png', 'PNG', 15, 10, pageWidth - 30, 30);
        doc.addImage('build/assets/images/proposta_rodape.png', 'PNG', 15, pageHeight - 30, pageWidth - 20, 20);
    }

    //Função para implementar texto no pdf
    //@PARAM x_align : 'left' // Pode ser 'left', 'right', 'center' ou 'justify'
    //@PARAM x_fontStyle : 'normal', 'bold', 'italic' ou 'bolditalic'
    //@PARAM x_subtitulo : Se for um Título ou Subtítulo que precisa ficar junto do texto posterior então envia algo para não ficar vazio (irá fazer o cálculo diferente de fim de página)
    function gerarTexto({x_texto = '', x_spacingBetweenTexts = spacingBetweenTexts3, x_marginLeft = marginLeft, x_marginTop = novaMarginTop, x_font = 1, x_fontStyle = 'normal', x_fontSize = 12, x_align = 'left', x_subtitulo = ''}) {
        let linhasTexto = doc.splitTextToSize(x_texto, textWidth);
        let alturaTexto = linhasTexto.length * x_spacingBetweenTexts;

        //Verifica se o texto cabe na página, senão cria uma nova
        let espacoFimPagina = 40;
        if (x_subtitulo != '') {espacoFimPagina = 60;}
        if ((x_marginTop + alturaTexto) > (pageHeight - espacoFimPagina)) {
            novaPagina();
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

        if (x_align === 'justify') {
            doc.text(x_texto, posX, x_marginTop, {maxWidth: textWidth, align: 'justify'});
        } else {
            doc.text(x_texto, posX, x_marginTop);
        }

        x_marginTop += x_spacingBetweenTexts; // Ajusta a posição para a próxima linha

        // Atualiza a margem superior para o próximo bloco de texto
        novaMarginTop = x_marginTop + alturaTexto + x_spacingBetweenTexts;
    }

    function novaPagina() {
        doc.addPage();
        novaMarginTop = marginTop;

        adicionarCabecalhoRodape();
    }

    adicionarCabecalhoRodape();

    //Configurações iniciais
    const marginLeft = 15; //Margem esquerda padrão
    const marginRight = 190; //Margem direita padrão
    const marginTop = 50; //Margem topo inicial
    const textWidth = 170; //Tamanho máximo da linha
    const spacingBetweenTexts3 = 3; //Espaçamento entre dois textos
    const spacingBetweenTexts4 = 4; //Espaçamento entre dois textos
    const spacingBetweenTexts5 = 5; //Espaçamento entre dois textos
    const spacingBetweenTexts6 = 6; //Espaçamento entre dois textos
    const spacingBetweenTexts8 = 8; //Espaçamento entre dois textos
    const spacingBetweenTexts10 = 10; //Espaçamento entre dois textos

    var novaMarginTop = 0; //Nova margem topo
    var linhasTexto = 0; //Quantidade de linhas do texto
    var alturaTexto = 0; //Altura do texto

    var texto = '';

    //Acessar rota
    fetch('propostas/'+proposta_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo dados
        if (data.success) {
            //Texto
            texto = data.success.data_proposta_extenso;
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts5, x_marginLeft:marginLeft, x_marginTop:marginTop, x_fontSize:12});

            //Texto
            texto = 'Proposta nº. '+data.success.numero_proposta+'/'+data.success.ano_proposta+'.';
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts5, x_marginLeft:marginLeft, x_marginTop:marginTop, x_fontSize:12, x_align:'right'});

            //Texto
            texto = data.success.cliente_nome;
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts3, x_fontStyle:'bold', x_fontSize:11});

            //Texto
            texto = data.success.cliente_logradouro;
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts3, x_fontSize:11});

            //Texto
            texto = data.success.cliente_bairro+' - '+data.success.cliente_cidade;
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts3, x_fontSize:11});

            //Texto
            texto = 'A/C: '+data.success.aos_cuidados;
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts3, x_fontSize:11});

            if (data.success.texto_acima_tabela_servico !== null) {
                //Texto
                texto = '';
                gerarTexto({x_texto: texto, x_spacingBetweenTexts: spacingBetweenTexts4});

                //Texto
                texto = data.success.texto_acima_tabela_servico;
                gerarTexto({x_texto: texto, x_spacingBetweenTexts: spacingBetweenTexts3, x_fontSize: 12});
            }

            //Tabela de serviços
            let tabelaHTML = `<table>
                                <thead>
                                    <tr>
                                        <th>&nbsp;<b>ITEM</b>&nbsp;</th>
                                        <th>&nbsp;<b>DESCRIÇÃO DOS EQUIPAMENTOS PREVENTIVOS</b>&nbsp;</th>
                                        <th>&nbsp;<b>VALOR UNITÁRIO</b>&nbsp;</th>
                                        <th>&nbsp;<b>QUANTIDADE</b>&nbsp;</th>
                                        <th>&nbsp;<b>VALOR TOTAL</b>&nbsp;</th>
                                    </tr>
                                </thead>
                            <tbody>`;

            let qtdLinhasTabela = 1;
            let valorGlobal = 0;

            proposta_servicos = data.success.proposta_servicos;

            proposta_servicos.forEach(function (dado) {
                //Dados para preencher na linha da grade
                servico_item = dado.servico_item;
                servico_nome = dado.servico_nome;
                servico_valor = dado.servico_valor;
                servico_quantidade = dado.servico_quantidade;
                servico_valor_total = dado.servico_valor_total;

                valorGlobal += parseFloat(servico_valor_total);

                tabelaHTML += `<tr>
                                <td>${servico_item}</td>
                                <td>${servico_nome}</td>
                                <td>${'R$ '+float2moeda(servico_valor)}</td>
                                <td>${servico_quantidade}</td>
                                <td>${'R$ '+float2moeda(servico_valor_total)}</td>
                            </tr>`;

                qtdLinhasTabela++;
            });

            tabelaHTML += `<tr>
                            <th>VALOR GLOBAL</th>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <th>${'R$ '+float2moeda(valorGlobal)}</th>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <th>${'DESCONTO '+data.success.porcentagem_desconto+' %'}</th>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <th>${'R$ '+data.success.valor_desconto}</th>
                            <td>&nbsp;</td>
                        </tr>
                    </tbody>
                </table>`;

            qtdLinhasTabela++;
            qtdLinhasTabela++;

            //Criando um elemento temporário para converter a string em HTML real
            let div = document.createElement('div');
            div.innerHTML = tabelaHTML;
            let tabela = div.querySelector('table');

            //Converte a tabela para PDF usando autoTable
            doc.autoTable({
                html: tabela, // Usa a tabela do HTML
                startY: novaMarginTop, // Define onde começa a tabela no PDF
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
                    fillColor: [0, 254, 255], // Cor do cabeçalho #00FEFF (Ciano)
                    textColor: [0, 0, 0], // Texto preto
                },
                alternateRowStyles: {
                    fillColor: [255, 255, 255], // Cor de fundo alternada para as linhas
                },
                columnStyles: {
                    0: { halign: "center" }, // Coluna ITEM centralizada
                    1: { halign: "left" }, // Coluna DESCRIÇÃO alinhada à esquerda
                    2: { halign: "right" }, // Coluna VALOR UNITÁRIO alinhada à direita
                    3: { halign: "center" }, // Coluna QUANTIDADE centralizada
                    4: { halign: "right" }, // Coluna VALOR TOTAL alinhada à direita
                },
                didParseCell: function (data) {
                    //Força padding em cada célula
                    data.cell.styles.cellPadding = 2;

                    //Mudar estilos para a última linha
                    if ((data.row.index === data.table.body.length - 1) || (data.row.index === data.table.body.length - 2)) {
                        data.cell.styles.fillColor = [0, 254, 255]; // Fundo ciano
                        data.cell.styles.textColor = [0, 0, 0]; // Texto preto
                        data.cell.styles.fontStyle = "bold"; // Negrito

                        //Mesclar colunas
                        if (data.column.index === 0) {
                            data.cell.colSpan = 3; // Faz a célula ocupar 3 colunas
                            data.cell.styles.halign = "right"; // Alinha o texto ao centro
                        }

                        if (data.column.index === 3) {
                            data.cell.colSpan = 2; // Faz a célula ocupar 3 colunas
                            data.cell.styles.halign = "right"; // Alinha o texto ao centro
                        }
                    }
                },
                margin: { top: 50 },
            });

            //Nova margem topo para depois da tabela
            novaMarginTop = novaMarginTop + (qtdLinhasTabela*8.5) + 15;

            //Texto
            texto = '1. DO VALOR DA PROPOSTA';
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts3, x_fontStyle:'bold', x_fontSize:11, x_subtitulo:'subtitulo'});

            //Texto
            texto = '     '+'R$ '+data.success.valor_total+' ('+data.success.valor_total_extenso+')';
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts6, x_fontSize:11});

            //Texto
            texto = '2. DA FORMA E CONDIÇÕES DE PAGAMENTO';
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts3, x_fontStyle:'bold', x_fontSize:11, x_subtitulo:'subtitulo'});

            //Texto
            texto = '     '+data.success.forma_pagamento;
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts6, x_fontSize:11});

            //DAS GENERALIDADES
            if (data.success.paragrafo_1 != '' || data.success.paragrafo_2 != '' || data.success.paragrafo_3 != '' || data.success.paragrafo_4 != '' || data.success.paragrafo_5 != '' || data.success.paragrafo_6 != '' || data.success.paragrafo_7 != '' || data.success.paragrafo_8 != '' || data.success.paragrafo_9 != '' || data.success.paragrafo_10 != '') {
                //Texto
                texto = '3. DAS GENERALIDADES';
                gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts3, x_fontStyle:'bold', x_fontSize:11, x_subtitulo:'subtitulo'});

                var generalidadeItem = 0;

                if (data.success.paragrafo_1 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_1;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify', x_fontStyle:'normal'});
                }

                if (data.success.paragrafo_2 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_2;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }

                if (data.success.paragrafo_3 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_3;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }

                if (data.success.paragrafo_4 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_4;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }

                if (data.success.paragrafo_5 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_5;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }

                if (data.success.paragrafo_6 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_6;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }

                if (data.success.paragrafo_7 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_7;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }

                if (data.success.paragrafo_8 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_8;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }

                if (data.success.paragrafo_9 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_9;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }

                if (data.success.paragrafo_10 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_10;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }
            }



            //Gerar o pdf, abrir em uma outra aba e colocar link para download''''''''''''''''''''''''''''''''''''''
            const pdfBlob = doc.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);

            //Tentar abrir em uma nova aba
            const newTab = window.open(pdfUrl);

            //Adiciona um link abaixo do botão
            let frm_propostas = document.getElementById('frm_propostas');

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
            frm_propostas.parentNode.insertBefore(link, frm_propostas.nextSibling);
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        }
    }).catch(error => {
        alert('Erro proposta_gerar_pdf:'+error);
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    //Criar Data da Proposta por extenso
    document.getElementById('data_proposta').addEventListener('change', function() {
        if (document.getElementById('data_proposta').value != '') {
            var data_extenso = dataExtenso(2, document.getElementById('data_proposta').value);
            document.getElementById('data_proposta_extenso').value = data_extenso;
        }
    });


    //Buscar dados do Cliente escolhido
    document.getElementById('cliente_id').addEventListener('change', function() {
        if (document.getElementById('cliente_id').value != '') {
            var cliente_id = document.getElementById('cliente_id').value;

            //Route: clientes/id
            fetch('clientes/'+cliente_id, {
                method: 'GET',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                var cliente = data.success;

                document.getElementById('cliente_nome').value = cliente.name;
                document.getElementById('cliente_logradouro').value = cliente.logradouro;
                document.getElementById('cliente_bairro').value = cliente.bairro;
                document.getElementById('cliente_cidade').value = cliente.localidade;
            }).catch(error => {
                alert('Erro Propostas:'+error);
            });


        }
    });

    //Buscar dados do Serviço escolhido
    document.getElementById('ts_servico_id').addEventListener('change', function() {
        if (document.getElementById('ts_servico_id').value != '') {
            var ts_servico_id = document.getElementById('ts_servico_id').value;

            //Route: servicos/id
            fetch('servicos/'+ts_servico_id, {
                method: 'GET',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                var servico = data.success;

                //copiar os dados para os campos
                atualizarServicoEscolher(1, servico.id, servico.name, servico.valor, '1');
            }).catch(error => {
                alert('Erro Propostas:'+error);
            });
        }
    });

    //Adicionar serviço na grade
    document.getElementById('ts_servico_adicionar').addEventListener('click', function() {
        if (document.getElementById('ts_servico_id').value == '') {
            alert('Escolha um Serviço.');
            return;
        }

        if (document.getElementById('ts_servico_valor').value == '') {
            alert('Valor vazio.');
            return;
        }

        if (document.getElementById('ts_servico_qtd').value == '' || document.getElementById('ts_servico_qtd').value == '0' || document.getElementById('ts_servico_qtd').value == 0) {
            alert('Digite uma quantidade.');
            return;
        }

        //Adicionar linha na grade
        atualizarServicoGrade(1);

        //Atualizar dados do Serviço escolhido
        atualizarServicoEscolher(0);
    });

    //Retirar serviço na grade
    document.getElementById('ts_servico_retirar').addEventListener('click', function() {
        //Adicionar linha na grade
        atualizarServicoGrade(3);

        //Atualizar dados do Serviço escolhido
        atualizarServicoEscolher(0);
    });
});
