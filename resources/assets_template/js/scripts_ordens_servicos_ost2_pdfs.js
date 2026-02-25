async function ost2_ordem_servico_gerar_pdf(ordem_servico_id, traducao='pt') {
    try {
        //Aviso Temporário na tela'''''''''''''''''''''''''''''''''''''''''''''''''''''
        var loadingAvisoTmp = document.getElementById('loading-aviso-tmp');
        loadingAvisoTmp.innerHTML = 'Processando, por favor aguarde...';
        loadingAvisoTmp.style.display = 'block';
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        await ost2_gerarPDF(ordem_servico_id, traducao);
    } catch (e) {
        console.log("Erro ao gerar PDF: ", e.message);
    } finally {
        //Aviso Temporário na tela'''''''''''''''''''''''''''''''''''''''''''''''''''''
        var loadingAvisoTmp = document.getElementById('loading-aviso-tmp');
        loadingAvisoTmp.innerHTML = '';
        loadingAvisoTmp.style.display = 'none';
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }
}

async function ost2_gerarPDF(ordem_servico_id, traducao='pt') {
    //Configurações
    if (!window.jsPDF) window.jsPDF = window.jspdf.jsPDF;

    //Iniciando jsPDF
    var doc = new jsPDF({orientation: 'p'});

    //Variáveis (Geral)
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    function adicionarCabecalhoRodape() {
        doc.addImage('build/assets/images/ordem_servico_topo.png', 'PNG', 15, 10, pageWidth - 30, 30);
        doc.addImage('build/assets/images/ordem_servico_rodape.png', 'PNG', 15, pageHeight - 30, pageWidth - 20, 20);
    }

    //Função para implementar texto no pdf
    //@PARAM x_align : 'left' // Pode ser 'left', 'right', 'center' ou 'justify'
    //@PARAM x_fontStyle : 'normal', 'bold', 'italic' ou 'bolditalic'
    //@PARAM x_subtitulo : Se for um Título ou Subtítulo que precisa ficar junto do texto posterior então envia algo para não ficar vazio (irá fazer o cálculo diferente de fim de página)
    function gerarTexto({x_texto = '', x_spacingBetweenTexts = spacingBetweenTexts3, x_marginLeft = marginLeft, x_marginTop = novaMarginTop, x_font = 1, x_fontStyle = 'normal', x_fontSize = 12, x_align = 'left', x_subtitulo = ''}) {
        let linhasTexto = doc.splitTextToSize(x_texto, textWidth);
        let alturaTexto = linhasTexto.length * x_spacingBetweenTexts;

        //alert(linhasTexto+' ## '+linhasTexto.length+' ## '+alturaTexto);

        //Verifica se o texto cabe na página, senão cria uma nova
        let espacoFimPagina = 65;
        if (x_subtitulo != '') {espacoFimPagina = 85;}
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
    const spacingBetweenTexts1 = 1; //Espaçamento entre dois textos
    const spacingBetweenTexts2 = 2; //Espaçamento entre dois textos
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
    var numeroTitulo = 0; //Número dos Títulos do PDF

    //Acessar rota
    let response = await fetch('ordens_servicos/' + ordem_servico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    let data = await response.json();

    //Lendo dados
    if (data.success) {
        //Texto
        texto = 'Ordem Serviço nº. '+data.success.numero_ordem_servico+'/'+data.success.ano_ordem_servico+'.';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_marginLeft:marginLeft, x_marginTop:marginTop, x_fontSize:12, x_align:'right'});

        //Texto
        texto = data.success.cliente_nome;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_fontStyle:'bold', x_fontSize:11});

        //Texto
        texto = data.success.cliente_logradouro;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_fontSize:11});

        //Texto
        texto = data.success.cliente_bairro+' - '+data.success.cliente_cidade;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_fontSize:11});

        //Tabela de serviços''''''''''''''''''''''''''''''''''''''
        //Texto
        numeroTitulo++;
        texto = numeroTitulo+'. DOS SERVIÇOS';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        gerarTexto({x_texto:'', x_spacingBetweenTexts:spacingBetweenTexts3});
        gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_fontStyle:'bold', x_fontSize:11, x_subtitulo:'subtitulo'});

        var tabelaHTML = `<table>
                            <thead>
                                <tr>
                                    <th>&nbsp;<b>ITEM</b>&nbsp;</th>
                                    <th>&nbsp;<b>SERVIÇO</b>&nbsp;</th>
                                    <th>&nbsp;<b>RESPONSÁVEL</b>&nbsp;</th>
                                    <th>&nbsp;<b>VALOR</b>&nbsp;</th>
                                    <th>&nbsp;<b>QTD</b>&nbsp;</th>
                                    <th>&nbsp;<b>TOTAL</b>&nbsp;</th>
                                </tr>
                            </thead>
                        <tbody>`;

        var qtdLinhasTabela = 1;
        var valorGlobal = 0;

        ordem_servico_servicos = data.success.ordem_servico_servicos;

        ordem_servico_servicos.forEach(function (dado) {
            //Dados para preencher na linha da grade
            servico_item = dado.servico_item;
            servico_nome = dado.servico_nome;
            responsavel_funcionario_nome = dado.responsavel_funcionario_nome;
            servico_valor = dado.servico_valor;
            servico_quantidade = dado.servico_quantidade;
            servico_valor_total = dado.servico_valor_total;

            valorGlobal += parseFloat(servico_valor_total);

            tabelaHTML += `<tr>
                            <td>${servico_item ? servico_item : ''}</td>
                            <td>${servico_nome ? servico_nome : ''}</td>
                            <td>${responsavel_funcionario_nome ? responsavel_funcionario_nome : ''}</td>
                            <td>${'R$ '+float2moeda(servico_valor)}</td>
                            <td>${servico_quantidade ? servico_quantidade : ''}</td>
                            <td>${'R$ '+float2moeda(servico_valor_total)}</td>
                        </tr>`;

            qtdLinhasTabela++;
        });

        tabelaHTML += `<tr>
                        <th colspan="4">VALOR GLOBAL</th>
                        <th colspan="2">${'R$ '+float2moeda(valorGlobal)}</th>
                    </tr>
                </tbody>
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
                2: { halign: "left" }, // Coluna RESPONSAVEL alinhada à esquerda
                3: { halign: "right", cellWidth: 'wrap', overflow: 'hidden' }, // Coluna VALOR UNITÁRIO alinhada à direita
                4: { halign: "center", cellWidth: 'wrap', overflow: 'hidden' }, // Coluna QUANTIDADE centralizada
                5: { halign: "right", cellWidth: 'wrap', overflow: 'hidden' }, // Coluna VALOR TOTAL alinhada à direita
            },
            didParseCell: function (data) {
                //Força padding em cada célula
                data.cell.styles.cellPadding = 2;

                //Mudar estilos para a última linha
                if ((data.row.index === data.table.body.length - 1) || (data.row.index === data.table.body.length - 1)) {
                    data.cell.styles.fillColor = [0, 254, 255]; // Fundo ciano
                    data.cell.styles.textColor = [0, 0, 0]; // Texto preto
                    data.cell.styles.fontStyle = "bold"; // Negrito

                    //Mesclar colunas
                    if (data.column.index === 0) {
                        data.cell.colSpan = 4; // Faz a célula ocupar 3 colunas
                        data.cell.styles.halign = "right"; // Alinha o texto ao centro
                    }

                    if (data.column.index === 4) {
                        data.cell.colSpan = 2; // Faz a célula ocupar 3 colunas
                        data.cell.styles.halign = "right"; // Alinha o texto ao centro
                    }
                }
            },
            margin: { top: 50 },
        });

        //Nova margem topo para depois da tabela
        novaMarginTop = novaMarginTop + (qtdLinhasTabela*7) + 10;
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        if (data.success.ordemServicoPrioridadeName != '') {
            //Texto
            texto = 'Prioridade: '+data.success.ordemServicoPrioridadeName;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify', x_fontStyle:'normal'});
        }

        if (data.success.descricao_servico != '') {
            //Texto
            texto = 'Descrição: '+data.success.descricao_servico;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify', x_fontStyle:'normal'});
        }

        if (data.success.observacao != '') {
            //Texto
            texto = 'Observação: '+data.success.observacao;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify', x_fontStyle:'normal'});
        }

        //Gerar o pdf, abrir em uma outra aba e colocar link para download''''''''''''''''''''''''''''''''''''''
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        //Tentar abrir em uma nova aba
        const newTab = window.open(pdfUrl);

        //Adiciona um link abaixo do botão
        let frm_ordens_servicos = document.getElementById('frm_ordens_servicos');

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
        frm_ordens_servicos.parentNode.insertBefore(link, frm_ordens_servicos.nextSibling);
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }
}
