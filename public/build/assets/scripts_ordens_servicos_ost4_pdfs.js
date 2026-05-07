async function ost4_ordem_servico_gerar_pdf(ordem_servico_id, traducao='pt') {
    try {
        //Aviso Temporário na tela'''''''''''''''''''''''''''''''''''''''''''''''''''''
        var loadingAvisoTmp = document.getElementById('loading-aviso-tmp');
        loadingAvisoTmp.innerHTML = 'Processando, por favor aguarde...';
        loadingAvisoTmp.style.display = 'block';
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        await ost4_gerarPDF(ordem_servico_id, traducao);
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

async function ost4_gerarPDF(ordem_servico_id, traducao='pt') {
    //Acessar rota ordens_servicos
    let response = await fetch('ordens_servicos/' + ordem_servico_id, {
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
        //const marginTop = 50; //Margem topo inicial
        const marginTop = 15; //Margem topo inicial
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
        var pageTopo = 'build/assets/images/ordem_servico_topo.png';
        var pageRodape = 'build/assets/images/ordem_servico_rodape.png';

        //Verificar se existe topo e rodapé para cliente''''''''''''''''''''''''''''''''''''''''''''''''''''''
        var topoClienteExiste = await arquivoExiste('build/assets/images/ordem_servico_topo_cliente_'+cliente_id+'.png');
        if (topoClienteExiste === true) {pageTopo = 'build/assets/images/ordem_servico_topo_cliente_'+cliente_id+'.png';}

        var rodapeClienteExiste = await arquivoExiste('build/assets/images/ordem_servico_rodape_cliente_'+cliente_id+'.png');
        if (rodapeClienteExiste === true) {pageRodape = 'build/assets/images/ordem_servico_rodape_cliente_'+cliente_id+'.png';}
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
            //let espacoFimPagina = 45;
            let espacoFimPagina = 15;
            if (x_subtitulo != '') {
                //espacoFimPagina = 65;
                espacoFimPagina = 35;
            }
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

            //await adicionarCabecalhoRodape(pageTopo, pageRodape);
        }
        //Funções internas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Funções internas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Gravando pdf - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Gravando pdf - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Cabeçalho e rodapé
        //await adicionarCabecalhoRodape(pageTopo, pageRodape);

        // //Texto
        // texto = ' SISTEMA SEGOA';
        // if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        // await inserirTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_marginTop:marginTop, x_fontSize:12, x_fontStyle:'bold', x_align:'left', x_fundo:true, x_fundo_cor:2});

        // //Texto
        // texto = 'SEGURANÇA E PREVENÇÃO ';
        // if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        // await inserirTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_marginTop:marginTop, x_fontSize:12, x_fontStyle:'bold', x_align:'right'});

        //Texto
        texto = ' SISTEMA PREVINIR';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({ x_texto: texto, x_spacingBetweenTexts: spacingBetweenTexts4, x_marginTop: marginTop, x_fontSize: 12, x_fontStyle: 'bold', x_align: 'left', x_fundo: true, x_fundo_cor: 2 });

        //Texto
        texto = ' Ordem Serviço nº. '+data.success.numero_ordem_servico+'/'+data.success.ano_ordem_servico+'.';
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

        //Linha
        await inserirLinha({x_spacingBetweenTexts:spacingBetweenTexts1, x_marginLeft:15, x_marginTop:novaMarginTop-5, x_tamanho:195, x_espessura:0.7});

        //Tabela Serviços - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Tabela Serviços - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Texto
        numeroTitulo++;
        texto = ' '+numeroTitulo+'. DOS SERVIÇOS:';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({x_texto:'', x_spacingBetweenTexts:spacingBetweenTexts3});
        await inserirTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_subtitulo:'subtitulo', x_fundo:true});

        var tabelaHTML = `<table>
                            <thead>
                                <tr>
                                    <th>&nbsp;<b>ITEM</b>&nbsp;</th>
                                    <th>&nbsp;<b>SERVIÇO</b>&nbsp;</th>
                                    <th>&nbsp;<b>RESPONSÁVEL</b>&nbsp;</th>
                                </tr>
                            </thead>
                        <tbody>`;

        var qtdLinhasTabela = 1;

        ordem_servico_servicos = data.success.ordem_servico_servicos;

        ordem_servico_servicos.forEach(function (dado) {
            //Dados para preencher na linha da grade
            servico_item = dado.servico_item;
            servico_nome = dado.servico_nome;
            responsavel_funcionario_nome = dado.responsavel_funcionario_nome;

            tabelaHTML += `<tr>
                            <td>${servico_item ? servico_item : ''}</td>
                            <td>${servico_nome ? servico_nome : ''}</td>
                            <td>${responsavel_funcionario_nome ? responsavel_funcionario_nome : ''}</td>
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
                fillColor: ['#F2CEED'], // Cor do cabeçalho #00FEFF (Ciano)
                textColor: [0, 0, 0], // Texto preto
            },
            alternateRowStyles: {
                fillColor: [255, 255, 255], // Cor de fundo alternada para as linhas
            },
            columnStyles: {
                0: { halign: "center" }, // Coluna ITEM centralizada
                1: { halign: "left" }, // Coluna DESCRIÇÃO alinhada à esquerda
                2: { halign: "left" }, // Coluna RESPONSAVEL alinhada à esquerda
            },
            didParseCell: function (data) {
                //Força padding em cada célula
                data.cell.styles.cellPadding = 2;
            },
            margin: { top: 50 },
        });

        //Nova margem topo para depois da tabela
        novaMarginTop = novaMarginTop + (qtdLinhasTabela*6.3) + 5;
        //Tabela Serviços - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Tabela Serviços - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        if (data.success.ordemServicoPrioridadeName !== null && data.success.ordemServicoPrioridadeName !== undefined && data.success.ordemServicoPrioridadeName !== '') {
            //Texto
            texto = 'Prioridade: '+data.success.ordemServicoPrioridadeName;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts3, x_fontSize:11, x_align:'justify', x_fontStyle:'normal'});
        }

        if (data.success.descricao_servico !== null && data.success.descricao_servico !== undefined && data.success.descricao_servico !== '') {
            //Texto
            texto = 'Descrição: '+data.success.descricao_servico;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts3, x_fontSize:11, x_align:'justify', x_fontStyle:'normal'});
        }

        if (data.success.observacao !== null && data.success.observacao !== undefined && data.success.observacao !== '') {
            //Texto
            texto = 'Observação: '+data.success.observacao;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts3, x_fontSize:11, x_align:'justify', x_fontStyle:'normal'});
        }

        //Tabela Destinos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Tabela Destinos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Texto
        numeroTitulo++;
        texto = ' '+numeroTitulo+'. DOS DESTINOS:';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({x_texto:'', x_spacingBetweenTexts:spacingBetweenTexts3});
        await inserirTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_subtitulo:'subtitulo', x_fundo:true});

        var tabelaHTML = `<table>
                            <thead>
                                <tr>
                                    <th>&nbsp;<b>ORDEM</b>&nbsp;</th>
                                    <th>&nbsp;<b>CEP</b>&nbsp;</th>
                                    <th>&nbsp;<b>LOGRADOURO</b>&nbsp;</th>
                                    <th>&nbsp;<b>BAIRRO</b>&nbsp;</th>
                                    <th>&nbsp;<b>LOCALIDADE</b>&nbsp;</th>
                                    <th>&nbsp;<b>UF</b>&nbsp;</th>
                                    <th>&nbsp;<b>NÚMERO</b>&nbsp;</th>
                                    <th>&nbsp;<b>COMPLEMENTO</b>&nbsp;</th>
                                </tr>
                            </thead>
                        <tbody>`;

        var qtdLinhasTabela = 1;

        ordem_servico_destinos = data.success.ordem_servico_destinos;

        //Ordenar
        ordem_servico_destinos.sort(function(a, b) {return a.destino_ordem - b.destino_ordem;});

        //Varrer
        ordem_servico_destinos.forEach(function (dado) {
            //Dados para preencher na linha da grade
            destino_ordem = dado.destino_ordem;
            destino_cep = dado.destino_cep;
            destino_logradouro = dado.destino_logradouro;
            destino_bairro = dado.destino_bairro;
            destino_localidade = dado.destino_localidade;
            destino_uf = dado.destino_uf;
            destino_numero = dado.destino_numero;
            destino_complemento = dado.destino_complemento;

            tabelaHTML += `<tr>
                            <td>${destino_ordem}</td>
                            <td>${destino_cep}</td>
                            <td>${destino_logradouro}</td>
                            <td>${destino_bairro}</td>
                            <td>${destino_localidade}</td>
                            <td>${destino_uf}</td>
                            <td>${destino_numero}</td>
                            <td>${destino_complemento ? destino_complemento : ''}</td>
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
                fillColor: ['#F2CEED'], // Cor do cabeçalho #00FEFF (Ciano)
                textColor: [0, 0, 0], // Texto preto
            },
            alternateRowStyles: {
                fillColor: [255, 255, 255], // Cor de fundo alternada para as linhas
            },
            columnStyles: {
                0: { halign: "center" }, // Coluna ORDEM centralizada
                1: { halign: "left", cellWidth: 'wrap', overflow: 'hidden' }, // Coluna CEP alinhada à esquerda
                2: { halign: "left" }, // Coluna LOGRADOURO alinhada à esquerda
                3: { halign: "left" }, // Coluna BAIRRO alinhada à esquerda
                4: { halign: "left" }, // Coluna LOCALIDADE centralizada
                5: { halign: "left", cellWidth: 'wrap', overflow: 'hidden' }, // Coluna UF centralizada
                6: { halign: "left", cellWidth: 'wrap', overflow: 'hidden' }, // Coluna NUMERO centralizada
                7: { halign: "left", cellWidth: 'wrap', overflow: 'hidden' }, // Coluna COMPLEMENTO centralizada
            },
            didParseCell: function (data) {
                //Força padding em cada célula
                data.cell.styles.cellPadding = 2;
            },
            margin: { top: 50 },
        });

        //Nova margem topo para depois da tabela
        novaMarginTop = novaMarginTop + (qtdLinhasTabela*6.3) + 5;
        //Tabela Destinos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Tabela Destinos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Tabela Veículos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Tabela Veículos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Texto
        numeroTitulo++;
        texto = ' '+numeroTitulo+'. DOS VEÍCULOS:';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({x_texto:'', x_spacingBetweenTexts:spacingBetweenTexts3});
        await inserirTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_subtitulo:'subtitulo', x_fundo:true});

        var tabelaHTML = `<table>
                            <thead>
                                <tr>
                                    <th>&nbsp;<b>ITEM</b>&nbsp;</th>
                                    <th>&nbsp;<b>MARCA</b>&nbsp;</th>
                                    <th>&nbsp;<b>MODELO</b>&nbsp;</th>
                                    <th>&nbsp;<b>PLACA</b>&nbsp;</th>
                                    <th>&nbsp;<b>COMBUSTÍVEL</b>&nbsp;</th>
                                </tr>
                            </thead>
                        <tbody>`;

        var qtdLinhasTabela = 1;

        ordem_servico_veiculos = data.success.ordem_servico_veiculos;

        ordem_servico_veiculos.forEach(function (dado) {
            //Dados para preencher na linha da grade
            veiculo_item = dado.veiculo_item;
            veiculo_marca = dado.veiculo_marca;
            veiculo_modelo = dado.veiculo_modelo;
            veiculo_placa = dado.veiculo_placa;
            veiculo_combustivel = dado.veiculo_combustivel;

            tabelaHTML += `<tr>
                            <td>${veiculo_item ? veiculo_item : ''}</td>
                            <td>${veiculo_marca ? veiculo_marca : ''}</td>
                            <td>${veiculo_modelo ? veiculo_modelo : ''}</td>
                            <td>${veiculo_placa ? veiculo_placa : ''}</td>
                            <td>${veiculo_combustivel ? veiculo_combustivel : ''}</td>
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
                fillColor: ['#F2CEED'], // Cor do cabeçalho #00FEFF (Ciano)
                textColor: [0, 0, 0], // Texto preto
            },
            alternateRowStyles: {
                fillColor: [255, 255, 255], // Cor de fundo alternada para as linhas
            },
            columnStyles: {
                0: { halign: "center" }, // Coluna ITEM centralizada
                1: { halign: "left" }, // Coluna MARCA alinhada à esquerda
                2: { halign: "left" }, // Coluna MODELO alinhada à esquerda
                3: { halign: "center", cellWidth: 'wrap', overflow: 'hidden' }, // Coluna PLACA alinhada à esquerda
                4: { halign: "left" }, // Coluna COMBUSTIVEL centralizada
            },
            didParseCell: function (data) {
                //Força padding em cada célula
                data.cell.styles.cellPadding = 2;
            },
            margin: { top: 50 },
        });

        //Nova margem topo para depois da tabela
        novaMarginTop = novaMarginTop + (qtdLinhasTabela*6.3) + 5;
        //Tabela Veículos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Tabela Veículos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Tabela Funcionários - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Tabela Funcionários - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Texto
        numeroTitulo++;
        texto = ' '+numeroTitulo+'. DOS FUNCIONÁRIOS:';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({x_texto:'', x_spacingBetweenTexts:spacingBetweenTexts3});
        await inserirTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_subtitulo:'subtitulo', x_fundo:true});

        var tabelaHTML = `<table>
                            <thead>
                                <tr>
                                    <th>&nbsp;<b>ITEM</b>&nbsp;</th>
                                    <th>&nbsp;<b>NOME</b>&nbsp;</th>
                                    <th>&nbsp;<b>VEÍCULO</b>&nbsp;</th>
                                </tr>
                            </thead>
                        <tbody>`;

        var qtdLinhasTabela = 1;

        ordem_servico_funcionarios = data.success.ordem_servico_funcionarios;

        ordem_servico_funcionarios.forEach(function (dado) {
            //Dados para preencher na linha da grade
            funcionario_item = dado.funcionario_item;
            funcionario_nome = dado.funcionario_nome;

            //Buscar veículo'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            var funcionario_veiculo = '';
            const veiculoEncontrado = ordem_servico_veiculos.find(v => v.veiculo_id == dado.funcionario_veiculo_id);

            if (veiculoEncontrado) {
                funcionario_veiculo = veiculoEncontrado.veiculo_marca+' - '+veiculoEncontrado.veiculo_modelo+' - '+veiculoEncontrado.veiculo_placa;
            }
            //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            tabelaHTML += `<tr>
                            <td>${funcionario_item ? funcionario_item : ''}</td>
                            <td>${funcionario_nome ? funcionario_nome : ''}</td>
                            <td>${funcionario_veiculo}</td>
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
                fillColor: ['#F2CEED'], // Cor do cabeçalho #00FEFF (Ciano)
                textColor: [0, 0, 0], // Texto preto
            },
            alternateRowStyles: {
                fillColor: [255, 255, 255], // Cor de fundo alternada para as linhas
            },
            columnStyles: {
                0: { halign: "center" }, // Coluna ITEM centralizada
                1: { halign: "left" }, // Coluna NOME alinhada à esquerda
                2: { halign: "left" }, // Coluna VEICULO alinhada à esquerda
            },
            didParseCell: function (data) {
                //Força padding em cada célula
                data.cell.styles.cellPadding = 2;
            },
            margin: { top: 50 },
        });

        //Nova margem topo para depois da tabela
        novaMarginTop = novaMarginTop + (qtdLinhasTabela*6.3) + 5;
        //Tabela Funcionários - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Tabela Funcionários - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Tabela Equipes - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Tabela Equipes - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        if (data.success.ordem_servico_equipes.length > 0) {
            //Texto
            numeroTitulo++;
            texto = ' ' + numeroTitulo + '. DAS EQUIPES:';
            if (traducao == 'en') { texto = await traduzirTextoGoogle(texto); }
            await inserirTexto({ x_texto: '', x_spacingBetweenTexts: spacingBetweenTexts3 });
            await inserirTexto({ x_texto: texto, x_spacingBetweenTexts: spacingBetweenTexts4, x_fontSize: 11, x_subtitulo: 'subtitulo', x_fundo: true });

            var tabelaHTML = `<table>
                                <thead>
                                    <tr>
                                        <th>&nbsp;<b>ITEM</b>&nbsp;</th>
                                        <th>&nbsp;<b>NOME</b>&nbsp;</th>
                                        <th>&nbsp;<b>FUNÇÃO</b>&nbsp;</th>
                                        <th>&nbsp;<b>VEÍCULO</b>&nbsp;</th>
                                    </tr>
                                </thead>
                            <tbody>`;

            var qtdLinhasTabela = 1;

            ordem_servico_equipes = data.success.ordem_servico_equipes;

            ordem_servico_equipes.forEach(function (dado) {
                //Dados para preencher na linha da grade
                equipe_funcionario_item = dado.equipe_funcionario_item;
                equipe_funcionario_nome = dado.equipe_funcionario_nome;
                equipe_funcionario_funcao = dado.equipe_funcionario_funcao;

                //Buscar veículo'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var equipe_funcionario_veiculo = '';
                const veiculoEncontrado = ordem_servico_veiculos.find(v => v.veiculo_id == dado.equipe_funcionario_veiculo_id);

                if (veiculoEncontrado) {
                    equipe_funcionario_veiculo = veiculoEncontrado.veiculo_marca + ' - ' + veiculoEncontrado.veiculo_modelo + ' - ' + veiculoEncontrado.veiculo_placa;
                }
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                tabelaHTML += `<tr>
                                <td>${equipe_funcionario_item ? equipe_funcionario_item : ''}</td>
                                <td>${equipe_funcionario_nome ? equipe_funcionario_nome : ''}</td>
                                <td>${equipe_funcionario_funcao ? equipe_funcionario_funcao : ''}</td>
                                <td>${equipe_funcionario_veiculo}</td>
                            </tr>`;

                qtdLinhasTabela++;
            });

            tabelaHTML += `</tbody>
                        </table>`;

            qtdLinhasTabela++;
            qtdLinhasTabela++;

            //Criando um elemento temporário para converter a string em HTML real
            var div = document.createElement('div');
            if (traducao == 'en') { tabelaHTML = await traduzirTextoGoogle(tabelaHTML); }
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
                    fillColor: ['#F2CEED'], // Cor do cabeçalho #00FEFF (Ciano)
                    textColor: [0, 0, 0], // Texto preto
                },
                alternateRowStyles: {
                    fillColor: [255, 255, 255], // Cor de fundo alternada para as linhas
                },
                columnStyles: {
                    0: { halign: "center" }, // Coluna ITEM centralizada
                    1: { halign: "left" }, // Coluna NOME alinhada à esquerda
                    2: { halign: "left" }, // Coluna FUNÇÃO alinhada à esquerda
                    2: { halign: "left" }, // Coluna VEICULO alinhada à esquerda
                },
                didParseCell: function (data) {
                    //Força padding em cada célula
                    data.cell.styles.cellPadding = 2;
                },
                margin: { top: 50 },
            });

            //Nova margem topo para depois da tabela
            novaMarginTop = novaMarginTop + (qtdLinhasTabela * 6.3) + 5;
        }
        //Tabela Equipes - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Tabela Equipes - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Destinos - Distância, Duração, Rota e Mapa - Início'''''''''''''''''''''''''''''''''''''''
        //Destinos - Distância, Duração, Rota e Mapa - Início'''''''''''''''''''''''''''''''''''''''

        // Montar array com os CEPs dos destinos preenchidos
        let destinos = [];
        ordem_servico_destinos.forEach(function (dado) {
            if (dado.destino_cep && dado.destino_ordem > 0 && dado.destino_ordem <= 15) {
                destinos[dado.destino_ordem - 1] = dado.destino_cep;
            }
        });

        // Iterar entre os pares de origem e destino (ex: 1→2, 2→3, etc.)
        for (let i = 0; i < destinos.length - 1; i++) {
            const origem = destinos[i];
            const destino = destinos[i + 1];

            if (origem && destino) {
                //Buscar destino de/para
                var complemento_1 = '';
                var complemento_2 = '';
                ordem_servico_destinos.forEach(function (des) {
                    if (des.destino_ordem == i + 1) {complemento_1 = des.destino_complemento}
                    if (des.destino_ordem == i + 2) {complemento_2 = des.destino_complemento}
                });

                //Texto
                numeroTitulo++;
                //texto = ' '+numeroTitulo + `. DO DESTINO ${i + 1} para o ${i + 2}:`;
                texto = ' '+numeroTitulo + `. DO DESTINO: ${complemento_1} para ${complemento_2}:`;
                if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                await inserirTexto({ x_texto: '', x_spacingBetweenTexts: spacingBetweenTexts5 });
                await inserirTexto({ x_texto: texto, x_spacingBetweenTexts: spacingBetweenTexts4, x_fontSize: 11, x_subtitulo: 'subtitulo', x_fundo:true});

                try {
                    //Distância e Duração''''''''''''''''''''''''''''''''''''
                    let dado = await distanciaDuracaoPontos(origem, destino);

                    //Texto
                    texto = numeroTitulo+'.1 Distância';
                    if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                    await inserirTexto({ x_texto: '   '+texto, x_spacingBetweenTexts: spacingBetweenTexts3, x_fontSize: 11, x_align: 'justify', x_fontStyle: 'bold' });

                    //Texto
                    texto = dado.distancia;
                    if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                    await inserirTexto({ x_texto: '       '+texto, x_spacingBetweenTexts: spacingBetweenTexts3, x_fontSize: 10, x_align: 'justify', x_fontStyle: 'normal' });

                    //Texto
                    texto = '   '+numeroTitulo+'.2 Duração';
                    if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                    await inserirTexto({ x_texto: '   '+texto, x_spacingBetweenTexts: spacingBetweenTexts3, x_fontSize: 11, x_align: 'justify', x_fontStyle: 'bold' });

                    //Texto
                    texto = '       '+dado.duracao;
                    if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                    await inserirTexto({ x_texto: '       '+texto, x_spacingBetweenTexts: spacingBetweenTexts3, x_fontSize: 10, x_align: 'justify', x_fontStyle: 'normal' });
                    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''

                    //Rota passo-a-passo'''''''''''''''''''''''''''''''''''''
                    let dados = await rotaPassoAPasso(origem, destino);

                    //Texto
                    texto = '   '+numeroTitulo+'.3 Rota';
                    if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                    await inserirTexto({ x_texto: '   '+texto, x_spacingBetweenTexts: spacingBetweenTexts3, x_fontSize: 11, x_align: 'justify', x_fontStyle: 'bold' });

                    for (const instrucao of dados) {
                        //Texto
                        texto = '       ' + instrucao;
                        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                        await inserirTexto({ x_texto: '       ' + texto, x_spacingBetweenTexts: spacingBetweenTexts3, x_fontSize: 10, x_align: 'justify', x_fontStyle: 'normal'});
                    }
                    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''

                    //Mapa'''''''''''''''''''''''''''''''''''''''''''''''''''
                    let mapa = await gerarMapaImagem(origem, destino);

                    await inserirMapa(doc, mapa, textWidth-50, 80);
                    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''
                } catch (err) {
                    console.error(`Erro ao buscar distância entre ${origem} e ${destino}:`, err);
                }
            }
        }
        //Destinos - Distância, Duração, Rota e Mapa - Fim''''''''''''''''''''''''''''''''''''''''''
        //Destinos - Distância, Duração, Rota e Mapa - Fim''''''''''''''''''''''''''''''''''''''''''

        //Gerar o pdf, abrir em uma outra aba e colocar link para download''''''''''''''''''''''''''
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
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Gravando pdf - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Gravando pdf - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }
}
