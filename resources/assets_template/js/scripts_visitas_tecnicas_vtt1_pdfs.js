async function vtt1_visitaTecnicaGerarPdf(visita_tecnica_id, traducao='pt', vt_cs=1) {
    try {
        //Aviso Temporário na tela'''''''''''''''''''''''''''''''''''''''''''''''''''''
        var loadingAvisoTmp = document.getElementById('loading-aviso-tmp');
        loadingAvisoTmp.innerHTML = 'Processando, por favor aguarde...';
        loadingAvisoTmp.style.display = 'block';
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        await vtt1_gerarPDF(visita_tecnica_id, traducao, vt_cs);
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

async function vtt1_gerarPDF(visita_tecnica_id, traducao='pt', vt_cs) {
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
        const cliente_id = data.success.cliente_id; //cliente_id para ser usado nas funções internas
        var pageTopo = 'build/assets/images/visita_tecnica_topo.png';
        var pageRodape = 'build/assets/images/visita_tecnica_rodape.png';

        //Verificar se existe topo para cliente''''''''''''''''''''''''''''''''''''''''''''''''''''''
        var topoClienteExiste = await arquivoExiste('build/assets/images/visita_tecnica_topo_cliente_'+cliente_id+'.png');
        if (topoClienteExiste === true) {pageTopo = 'build/assets/images/visita_tecnica_topo_cliente_'+cliente_id+'.png';}
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Verificar se existe rodapé para cliente''''''''''''''''''''''''''''''''''''''''''''''''''''
        var rodapeClienteExiste = await arquivoExiste('build/assets/images/visita_tecnica_rodape_cliente_'+cliente_id+'.png');
        if (rodapeClienteExiste === true) {pageRodape = 'build/assets/images/visita_tecnica_rodape_cliente_'+cliente_id+'.png';}
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Variáveis
        var novaMarginTop = 0; //Nova margem topo
        var texto = '';
        var numeroTitulo = 0; //Número dos Títulos do PDF

        //Configurações - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Configurações - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Funções internas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Funções internas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        async function noCacheUrl(url) {
            return url + '?_=' + new Date().getTime();
        }

        async function adicionarCabecalhoRodape(topo, rodape) {
            topo = await noCacheUrl(topo);
            rodape = await noCacheUrl(rodape);

            doc.addImage(topo, 'PNG', 15, 10, pageWidth - 30, 30);
            doc.addImage(rodape, 'PNG', 15, pageHeight - 30, pageWidth - 20, 20);

            novaMarginTop = marginTop;
        }

        /* Função para desenhar um retângulo com ou sem fundo
         * x1 → posição X inicial da linha.
         * y1 → posição Y inicial da linha.
         * x2 → posição X final da linha.
         * y2 → posição Y final da linha.
         * */
        async function inserirLinha({x1 = marginLeft, y1 = marginLeft, x2 = textWidth, y2 = marginLeft, espessura = 0.3}) {
            doc.setLineWidth(espessura);
            doc.line(x1, y1, x2, y2);

            novaMarginTop += espessura;
        }

        /* Função para desenhar um retângulo com ou sem fundo
         * Parâmetro xPos → posição X (em milímetros por padrão) onde começa o retângulo.
         * Parâmetro yPos → posição Y.
         * Parâmetro width → largura do retângulo.
         * Parâmetro height → altura do retângulo.
         * Parâmetro style (opcional) → como o retângulo será desenhado: "S" → somente contorno (default). / "F" → preenchido. / "DF" ou "FD" → preenchido e com contorno.
         */
        async function inserirRetangulo({xPos = marginLeft, yPos = novaMarginTop, width = textWidth, height = 20, style = 'F', cor = 1}) {
            //Altura precisa ser testado com o height mais 20
            let alturaTexto = height + 20;

            //Verifica se o retângulo cabe na página, senão cria uma nova
            if (await verificarNovaPagina({alturaTexto:alturaTexto}) === true) {
                //Pegar novo valor da variavel novaMarginTop
                yPos = novaMarginTop;
            }

            //Cor
            if (cor == 1) {doc.setFillColor('#d2d3d4');}
            if (cor == 2) {doc.setFillColor('#9eeaf7');}
            if (cor == 3) {doc.setFillColor('#30b383');}

            //Desenhar
            doc.rect(xPos, yPos, width, height, style);

            //Nova Margem Topo
            novaMarginTop += height;
        }

        /* Função para inserir Fotografia
         * Parâmetro caminho → Caminho da Fotografia
         * Parâmetro xPos → posição X (em milímetros por padrão) onde começa a Fotografia.
         * Parâmetro yPos → posição Y.
         * Parâmetro height → altura da Fotografia.
         */
        async function inserirFotografia({caminho, xPos = marginLeft, yPos = novaMarginTop, height = 50, alterarNovaMarginTop = false}) {
            // Converte caminho para Base64
            let imagemBase64 = await fetch(caminho)
                .then(res => res.blob())
                .then(blob => new Promise((resolve) => {
                    let reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                }));

            // Detecta formato automaticamente a partir do base64
            let formato = 'PNG'; // padrão
            if (imagemBase64.startsWith('data:image/jpeg')) formato = 'JPEG';
            if (imagemBase64.startsWith('data:image/jpg')) formato = 'JPEG';
            if (imagemBase64.startsWith('data:image/webp')) formato = 'WEBP';
            if (imagemBase64.startsWith('data:image/png')) formato = 'PNG';

            // Criar objeto Image para pegar dimensões
            let img = new Image();
            img.src = imagemBase64;

            await new Promise((resolve) => { img.onload = resolve; });

            // Calcula largura proporcional à altura
            let proporcao = img.width / img.height;
            let largura = height * proporcao;

            // Verifica se cabe na página
            let alturaTexto = height + 20;

            if (await verificarNovaPagina({alturaTexto:alturaTexto}) === true) {
                yPos = novaMarginTop;
            }

            // Inserir imagem no PDF
            doc.addImage(imagemBase64, formato, xPos, yPos, largura, height);

            //Atualizar margem topo
            if (alterarNovaMarginTop === true) {
                novaMarginTop += height;
            }
        }

        /* Função para inserir texto (uma ou várias linhas)
         * texto → conteúdo a ser escrito.
         * xPos → posição X (em milímetros por padrão).
         * yPos → posição Y.
         * align → alinhamento do texto: 'left' // Pode ser 'left', 'right', 'center' ou 'justify'
         * fontStyle → 'normal', 'bold', 'italic' ou 'bolditalic'
         * */
        async function inserirTexto({texto = '', xPos = 0, yPos = 0, width = textWidth, align = 'left', font = 1, fontStyle = 'normal', fontSize = 12, cor = 1, alterarNovaMarginTop = true}) {
            //Font Size
            doc.setFontSize(fontSize);

            //Calcular alturaTexto no PDF com relação ao tamanho da fonte
            let alturaTexto = getAlturaTexto(texto, width);

            //Alterar novaMarginTop
            if (alterarNovaMarginTop === true) {
                novaMarginTop += alturaTexto;
            }

            //Verifica se o texto cabe na página, senão cria uma nova
            if (await verificarNovaPagina({alturaTexto:alturaTexto}) === true) {
                //Pegar novo valor da variavel novaMarginTop
                yPos = novaMarginTop;
            }

            //Define a fonte conforme o parâmetro recebido
            switch (font) {
                case 1:
                    doc.setFont('helvetica', fontStyle);
                    break;
                case 2:
                    doc.setFont('times', fontStyle);
                    break;
                case 3:
                    doc.setFont('courier', fontStyle);
                    break;
                default:
                    doc.setFont('helvetica', fontStyle);
            }

            //Cor
            if (cor == 1) {doc.setTextColor('#000000');}
            if (cor == 2) {doc.setTextColor('#ffffff');}

            //Alinhamento texto
            if (align === 'right') {
                xPos = pageWidth - marginLeft - doc.getTextWidth(texto);
            } else if (align === 'center') {
                xPos = (pageWidth - doc.getTextWidth(texto)) / 2;
            }

            //Inserir x_texto
            if (align === 'justify') {
                doc.text(texto, xPos, yPos, {maxWidth:width, align: 'justify'});
            } else {
                doc.text(texto, xPos, yPos);
            }
        }

        //Função para verificar se deve chamar página nova
        async function verificarNovaPagina({alturaTexto = 0}) {
            let espacoFimPagina = 50;

            if ((novaMarginTop + alturaTexto) > (pageHeight - espacoFimPagina)) {
                await novaPagina();

                novaMarginTop = marginTop;

                return true;
            }

            return false;
        }

        //Buscar altura do texto no PDF
        function getAlturaTexto(texto, width=textWidth) {
            //Quebra o texto
            let linhas = doc.splitTextToSize(texto, width);

            //Tamanho da fonte atual em pt
            let fontSize = doc.getFontSize();

            //Fator de altura de linha do jsPDF (default ~1.15)
            let lineHeightFactor = doc.getLineHeightFactor ? doc.getLineHeightFactor() : 1.15;

            //Altura de uma linha em "unidades do PDF"
            let lineHeight = fontSize * lineHeightFactor * 0.3528;

            //Altura total
            return linhas.length * lineHeight;
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

        //Parte inicial do Relatório''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Cabeçalho e rodapé
        await adicionarCabecalhoRodape(pageTopo, pageRodape);

        //Retângulo
        await inserirRetangulo({xPos:marginLeft, yPos:novaMarginTop, width:textWidth, height:5, cor: 1, style:'F'});

        //Texto
        texto = ' SISTEMA PREVINIR';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop-1, fontSize:10, alterarNovaMarginTop:false});

        //Texto
        texto = 'PREVENÇÃO E PROTEÇÃO ';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop-1, fontSize:10, align:'right', alterarNovaMarginTop:false});

        //Retângulo
        novaMarginTop += 2;
        await inserirRetangulo({xPos:marginLeft, yPos:novaMarginTop, width:textWidth, height:5, cor: 1, style:'F'});

        //Texto
        texto = ' RELATÓRIO DO SISTEMA DE VISTORIA TÉCNICA DE EXAUSTÃO MECÂNICA COZINHA PROFISSIONAL';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop-1, fontSize:9, alterarNovaMarginTop:false});

        //Retângulo
        novaMarginTop += 2;
        await inserirRetangulo({xPos:marginLeft, yPos:novaMarginTop, width:textWidth, height:5, cor: 2, style:'F'});

        //Principal Cliente e Rede Principal
        if (data.success.principalClienteName != null) {
            //Texto
            texto = ' '+data.success.principalClienteName;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop-1, fontSize:10, alterarNovaMarginTop:false});

            //Texto
            if (data.success.redeClienteName != null) {
                //Texto
                texto = data.success.redeClienteName+' ';
                if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop-1, fontSize:10, align:'right', alterarNovaMarginTop:false});
            }
        } else {
            //Texto
            if (data.success.redeClienteName != null) {
                //Texto
                texto = ' '+data.success.redeClienteName;
                if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop-1, fontSize:10, alterarNovaMarginTop:false});
            }
        }

        //Retângulo
        novaMarginTop += 2;
        await inserirRetangulo({xPos:marginLeft, yPos:novaMarginTop, width:textWidth, height:5, cor: 3, style:'F'});

        //Texto
        texto = data.success.cliente_nome;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop-1, fontSize:10, fontStyle:'bold', align:'center', cor:2, alterarNovaMarginTop:false});

        //Linha
        novaMarginTop += 2;
        await inserirLinha({x1:marginLeft, y1:novaMarginTop, x2:195, y2:novaMarginTop, espessura:0.3});

        //Texto
        novaMarginTop += 5;
        texto = 'VISITA TÉCNICA: '+'nº. '+data.success.numero_visita_tecnica+'/'+data.success.ano_visita_tecnica+' em '+data.success.data_prevista;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop, fontSize:10});

        //Texto
        novaMarginTop += 3;
        texto = 'RESPONSÁVEL: '+data.success.responsavel_funcionario_nome;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop, fontSize:10});

        //Linha
        await inserirLinha({x1:marginLeft, y1:novaMarginTop, x2:195, y2:novaMarginTop-1, espessura:0.3});

        //Retângulo
        novaMarginTop += 2;
        await inserirRetangulo({xPos:marginLeft, yPos:novaMarginTop, width:textWidth, height:5, cor: 1, style:'F'});

        //Texto
        texto = ' 1. OBJETIVO DO SISTEMA PREVENIR:';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop-1, fontSize:10});

        //Texto
        texto = 'O sistema de vistoria técnica de exaustão mecânica em cozinhas profissionais tem como objetivo assegurar que os equipamentos e instalações responsáveis pela remoção de vapores, fumaça, gordura e calor estejam operando de forma eficiente, segura e em conformidade com as legislações e normas técnicas vigentes, tais como:';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop, align:'justify', fontSize:10});

        //Texto
        novaMarginTop += 3;
        texto = '(i) Decreto nº 42, de 17 de dezembro de 2018 - Código de Segurança Contra Incêndio e Pânico';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop, fontSize:10});

        //Texto
        texto = '(ii) Nota Técnica nº 3-01:2019 - Cozinha profissional';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop, fontSize:10});

        //Texto
        texto = '(iii) ABNT NBR 14518:2020 - Sistemas de ventilação para cozinha profissional';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop, fontSize:10});

        //Texto
        texto = '(iv) ABNT NBR 5410:2020 – Instalações elétricas de baixa tensão';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop, fontSize:10});

        //Retângulo
        novaMarginTop += 3;
        await inserirRetangulo({xPos:marginLeft, yPos:novaMarginTop, width:textWidth, height:5, cor: 1, style:'F'});

        //Texto
        texto = ' 2. DADOS DO ESTABELECIMENTO:';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop-1, fontSize:10});

        //Texto
        texto = 'RAZÃO SOCIAL: '+data.success.cliente_nome;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop, fontSize:10});

        //Texto
        texto = 'CNPJ: '+data.success.cliente_cnpj;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop, fontSize:10});

        //Texto
        texto = 'ENDEREÇO: '+data.success.cliente_logradouro+', '+data.success.cliente_logradouro_numero+', '+data.success.cliente_logradouro_complemento+' - '+data.success.cliente_bairro+' - '+data.success.cliente_cidade+' - '+data.success.cliente_uf;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop, fontSize:10});
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Parte intermediária do Relatório (Perguntas)''''''''''''''''''''''''''''''''''''''''''''''
        let perguntas = data.success.visitas_tecnicas_dados;
        if (vt_cs == 1) {perguntas = perguntas.filter(p => p.completa === 1).sort((a, b) => a.completa_ordem - b.completa_ordem);}
        if (vt_cs == 2) {perguntas = perguntas.filter(p => p.sintetica === 1).sort((a, b) => a.sintetica_ordem - b.sintetica_ordem);}

        //Varrer Perguntas da Visita Técnica Completa
        let contadorTitulo = 2;
        let contadorSubtitulo = 0;
        let contadorPergunta = 0;
        let tituloAtual = null;
        let subtituloAtual = null;
        let opcoes = 0;

        let url_atual = window.location.protocol + '//' + window.location.host + '/';

        for (const dado of perguntas) {
            //Opções
            opcoes = dado.opcoes;

            //Título''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            if (dado.titulo !== tituloAtual) {
                contadorTitulo++;
                contadorSubtitulo = 0;
                contadorPergunta = 0;
                tituloAtual = dado.titulo;
                subtituloAtual = null;

                //Retângulo
                novaMarginTop += 3;
                await inserirRetangulo({xPos:marginLeft, yPos:novaMarginTop, width:textWidth, height:5, cor: 1, style:'F'});

                //Texto
                texto = ' '+contadorTitulo+'. '+dado.titulo;
                if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop-1, fontSize:9});
            }
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Subtítulo'''''''''''''''''''''''''''''''''''''''''''''''''''''''
            if (dado.subtitulo) {
                if (dado.subtitulo !== subtituloAtual) {
                    contadorSubtitulo++;
                    contadorPergunta = 1;
                    subtituloAtual = dado.subtitulo;

                    //Retângulo
                    novaMarginTop += 3;
                    await inserirRetangulo({xPos:marginLeft, yPos:novaMarginTop, width:textWidth, height:5, cor: 1, style:'F'});

                    //Texto
                    texto = ' '+contadorTitulo+'.'+String.fromCharCode(64 + contadorSubtitulo)+'. '+dado.subtitulo;
                    if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                    await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop-1, fontSize:9});
                } else {
                    contadorPergunta++;
                }

                //Texto
                novaMarginTop += 3;
                texto = contadorTitulo+'.'+String.fromCharCode(64 + contadorSubtitulo)+'.'+contadorPergunta+'. '+dado.pergunta;
                if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop, fontSize:9});
            } else {
                contadorPergunta++;

                //Texto
                novaMarginTop += 3;
                texto = contadorTitulo+'.'+contadorPergunta+'. '+dado.pergunta;
                if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop, fontSize:9});
            }
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Respostas e quantidade''''''''''''''''''''''''''''''''''''''''''
            //Respostas
            let respostas = '';

            if (dado.resposta == 1 || dado.resposta == 2 || dado.resposta == 3) {
                let resposta_1_x = (dado.resposta == 1) ? 'X' : ' ';
                let resposta_2_x = (dado.resposta == 2) ? 'X' : ' ';
                let resposta_3_x = (dado.resposta == 3) ? 'X' : ' ';

                respostas = '('+resposta_1_x+') SIM     ('+resposta_2_x+') NÃO     ('+resposta_3_x+') NI';
            }

            //Quantidade
            let quantidade = '';

            if (dado.quantidade > 0) {
                quantidade = 'Qtd: '+ dado.quantidade;
            }

            //Respostas e Quantidade
            let respostas_quantidade = '';

            if (respostas != '') {
                respostas_quantidade = respostas + '          ' + quantidade;
            } else {
                respostas_quantidade = quantidade;
            }

            //Texto
            novaMarginTop += 3;
            texto = respostas_quantidade;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop, fontSize:9});
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Observação''''''''''''''''''''''''''''''''''''''''''''''''''''''
            if (dado.observacao !== null && dado.observacao !== '') {
                //Texto
                novaMarginTop += 3;
                texto = 'Observação: '+dado.observacao;
                if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop, fontSize:9, align:'justify'});
            }
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Fotografias'''''''''''''''''''''''''''''''''''''''''''''''''''''
            let alterarNovaMarginTop = 0;

            if (dado.fotografia_1 !== null && dado.fotografia_1 !== '') {
                //Verificar Arquivo''''''''''''''''''''''''''''''''''''''
                var fotografia_1Existe = await arquivoExiste(dado.fotografia_1);
                if (fotografia_1Existe === true) {
                    alterarNovaMarginTop = 1;
                    await inserirFotografia({caminho:dado.fotografia_1, xPos:marginLeft, yPos:novaMarginTop, height:20});
                }
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }
            if (dado.fotografia_2 !== null && dado.fotografia_2 !== '') {
                //Verificar Arquivo''''''''''''''''''''''''''''''''''''''
                var fotografia_2Existe = await arquivoExiste(dado.fotografia_2);
                if (fotografia_2Existe === true) {
                    alterarNovaMarginTop = 1;
                    await inserirFotografia({caminho:dado.fotografia_2, xPos:marginLeft, yPos:novaMarginTop, height:20});
                }
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }
            if (dado.fotografia_3 !== null && dado.fotografia_3 !== '') {
                //Verificar Arquivo''''''''''''''''''''''''''''''''''''''
                var fotografia_3Existe = await arquivoExiste(dado.fotografia_3);
                if (fotografia_3Existe === true) {
                    alterarNovaMarginTop = 1;
                    await inserirFotografia({caminho:dado.fotografia_3, xPos:marginLeft, yPos:novaMarginTop, height:20});
                }
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }

            //Alterar novaMarginTop
            if (alterarNovaMarginTop == 1) {
                novaMarginTop += 30;
            }
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Parte final do Relatório (Quadro de Classificação de Risco e Conclusão)'''''''''''''''''''
        //Dados Titulo
        contadorTitulo++;
        contadorSubtitulo = 0;
        contadorPergunta = 0;
        tituloAtual = 'CLASSIFICAÇÃO DE RISCO';
        subtituloAtual = null;

        //Retângulo
        novaMarginTop += 3;
        await inserirRetangulo({xPos:marginLeft, yPos:novaMarginTop, width:textWidth, height:5, cor: 1, style:'F'});

        //Texto
        texto = ' '+contadorTitulo+'. '+tituloAtual;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop-1, fontSize:9});

        //Tabela
        novaMarginTop += 3;

        //Tabela Dados''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Linha 1
        let lin1_col1 = '1';
        let lin1_col2 = 'Risco Muito Baixo';
        if (traducao == 'en') {lin1_col2 = await traduzirTextoGoogle(lin1_col2);}
        let lin1_col3 = 'Sistema 100% conforme à norma, com equipamentos elétricos, manutenção em dia, baixo volume de vapores e gordura, com filtros e proteção total.';
        if (traducao == 'en') {lin1_col3 = await traduzirTextoGoogle(lin1_col3);}

        //Linha 2
        let lin2_col1 = '2';
        let lin2_col2 = 'Risco Baixo';
        if (traducao == 'en') {lin2_col2 = await traduzirTextoGoogle(lin2_col2);}
        let lin2_col3 = 'Sistema bem mantido, com equipamentos a gás, baixo a médio uso, boas práticas operacionais, pequena geração de gordura, e proteção contra incêndio.';
        if (traducao == 'en') {lin2_col3 = await traduzirTextoGoogle(lin2_col3);}

        //Linha 3
        let lin3_col1 = '3';
        let lin3_col2 = 'Risco Moderado';
        if (traducao == 'en') {lin3_col2 = await traduzirTextoGoogle(lin3_col2);}
        let lin3_col3 = 'Equipamentos geram média carga de gordura; há alguma deficiência na limpeza, manutenção ou isolamento. Sistema atende parcialmente à norma.';
        if (traducao == 'en') {lin3_col3 = await traduzirTextoGoogle(lin3_col3);}

        //Linha 4
        let lin4_col1 = '4';
        let lin4_col2 = 'Risco Alto';
        if (traducao == 'en') {lin4_col2 = await traduzirTextoGoogle(lin4_col2);}
        let lin4_col3 = 'Uso intenso de combustíveis sólidos (lenha, carvão), acúmulo de resíduos, ausência de proteção automática, manutenção irregular.';
        if (traducao == 'en') {lin4_col3 = await traduzirTextoGoogle(lin4_col3);}

        //Linha 5
        let lin5_col1 = '5';
        let lin5_col2 = 'Risco Crítico';
        if (traducao == 'en') {lin5_col2 = await traduzirTextoGoogle(lin5_col2);}
        let lin5_col3 = 'Sistema fora da norma, com riscos iminentes: excesso de gordura, coifas mal dimensionadas, dutos mal isolados, ventiladores sem proteção, etc.';
        if (traducao == 'en') {lin5_col3 = await traduzirTextoGoogle(lin5_col3);}

        let tabelaDados =[
            [lin1_col1, lin1_col2, lin1_col3],
            [lin2_col1, lin2_col2, lin2_col3],
            [lin3_col1, lin3_col2, lin3_col3],
            [lin4_col1, lin4_col2, lin4_col3],
            [lin5_col1, lin5_col2, lin5_col3]
        ];
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        doc.autoTable({
            startY: novaMarginTop,
            head: [
                [
                    { content: "NÍVEL", styles: { halign: "center", fillColor: [220, 220, 220] } },
                    { content: "CLASSIFICAÇÃO", styles: { halign: "center", fillColor: [220, 220, 220] } },
                    { content: "DESCRIÇÃO", styles: { halign: "center", fillColor: [220, 220, 220] } }
                ]
            ],
            columnStyles: {
                0: { halign: "center" }, //Coluna 1
                1: { halign: "center" }, //Coluna 2
                2: { halign: "left" }, //Coluna 3
            },
            body: tabelaDados,
            styles: {
                fontSize: 8,
                textColor: [0, 0, 0],
                lineColor: [0, 0, 0],
                lineWidth: 0.3,
                valign: "middle"
            },
            didParseCell: function (data) {
                // Coluna 1 = CLASSIFICAÇÃO
                if (data.section === "body" && data.column.index === 1) {
                    switch (data.row.index) {
                        case 0: // Linha 1
                            data.cell.styles.fillColor = [144, 238, 144]; // Verde claro
                            break;
                        case 1: // Linha 2
                            data.cell.styles.fillColor = [255, 255, 153]; // Amarelo claro
                            break;
                        case 2: // Linha 3
                            data.cell.styles.fillColor = [255, 255, 0]; // Amarelo forte
                            break;
                        case 3: // Linha 4
                            data.cell.styles.fillColor = [255, 165, 0]; // Laranja
                            break;
                        case 4: // Linha 5
                            data.cell.styles.fillColor = [255, 0, 0]; // Vermelho
                            data.cell.styles.textColor = [255, 255, 255]; // Texto branco
                            break;
                    }
                }
            }
        });
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Parte final do Relatório (Conclusão da Visita Técnica)''''''''''''''''''''''''''''''''''''
        //Dados Titulo
        contadorTitulo++;
        contadorSubtitulo = 0;
        contadorPergunta = 0;
        tituloAtual = 'CONCLUSÃO';
        subtituloAtual = null;

        //Alterar novaMarginTop para o gravar depois do quadro acima
        novaMarginTop += 60;

        //Retângulo
        novaMarginTop += 3;
        await inserirRetangulo({xPos:marginLeft, yPos:novaMarginTop, width:textWidth, height:5, cor: 1, style:'F'});

        //Texto
        texto = ' '+contadorTitulo+'. '+tituloAtual;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop-1, fontSize:9});

        //Tabela
        novaMarginTop += 3;

        //Tabela Dados''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        let nivel = 0;
        let nivel_fillcolor = [220, 220, 220];
        let nivel_color = [0, 0, 0];
        let classificacao = data.success.classificacao;

        if (data.success.nivel == 1) {
            nivel = lin1_col2;
            nivel_fillcolor = [144, 238, 144];
        }
        if (data.success.nivel == 2) {
            nivel = lin2_col2;
            nivel_fillcolor = [255, 255, 153];
        }
        if (data.success.nivel == 3) {
            nivel = lin3_col2;
            nivel_fillcolor = [255, 255, 0];
        }
        if (data.success.nivel == 4) {
            nivel = lin4_col2;
            nivel_fillcolor = [255, 165, 0];
        }
        if (data.success.nivel == 5) {
            nivel = lin5_col2;
            nivel_fillcolor = [255, 0, 0];
            nivel_color = [255, 255, 255];
        }

        let tabelaDados2 =[[nivel, classificacao]];
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        doc.autoTable({
            startY: novaMarginTop,
            head: [
                [
                    { content: "CLASSIFICAÇÃO DE RISCO", colSpan: 2, styles: { halign: "left", fillColor: [173, 216, 230] }}
                ],
                [
                    { content: "NÍVEL", styles: { halign: "center", fillColor: [220, 220, 220] } },
                    { content: "CLASSIFICAÇÃO", styles: { halign: "center", fillColor: [220, 220, 220] } }
                ]
            ],
            columnStyles: {
                0: { halign: "center" }, //Coluna 1
                1: { halign: "left" }, //Coluna 2
            },
            body: tabelaDados2,
            styles: {
                fontSize: 8,
                textColor: [0, 0, 0],
                lineColor: [0, 0, 0],
                lineWidth: 0.3,
                valign: "middle"
            },
            didParseCell: function (data) {
                // Exemplo: pintar a célula da linha 1 (índice 0) e coluna 1 (índice 0)
                if (data.section === "body" && data.row.index === 0 && data.column.index === 0) {
                    data.cell.styles.fillColor = nivel_fillcolor;
                    data.cell.styles.textColor = nivel_color;
                }
            }
        });
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Parte final do Relatório (Comentários da Visita Técnica)''''''''''''''''''''''''''''''''''
        //Dados Titulo
        contadorTitulo++;
        contadorSubtitulo = 0;
        contadorPergunta = 0;
        tituloAtual = 'COMENTÁRIOS';
        subtituloAtual = null;

        //Alterar novaMarginTop para o gravar depois do quadro acima
        novaMarginTop += 30;

        //Retângulo
        novaMarginTop += 3;
        await inserirRetangulo({xPos:marginLeft, yPos:novaMarginTop, width:textWidth, height:5, cor: 1, style:'F'});

        //Texto
        texto = ' '+contadorTitulo+'. '+tituloAtual;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        await inserirTexto({texto:texto, xPos:marginLeft, yPos:novaMarginTop-1, fontSize:9});

        //Tabela
        novaMarginTop += 3;

        //Tabela Dados''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        let comentarios = data.success.comentarios;

        let tabelaDados3 =[[comentarios]];
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        doc.autoTable({
            startY: novaMarginTop,
            head: [
                [
                    { content: "COMENTÁRIOS", styles: { halign: "center", fillColor: [220, 220, 220] } }
                ]
            ],
            columnStyles: {
                0: { halign: "center" }, //Coluna 1
            },
            body: tabelaDados3,
            styles: {
                fontSize: 8,
                textColor: [0, 0, 0],
                lineColor: [0, 0, 0],
                lineWidth: 0.3,
                valign: "middle"
            }
        });
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Gerar o pdf, abrir em uma outra aba e colocar link para download''''''''''''''''''''''''''
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        //Tentar abrir em uma nova aba
        const newTab = window.open(pdfUrl);


        //ESSAS LINHAS ABAIXO CRIAM UM LINK PARA BAIXAR O PDF'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //ESSAS LINHAS ABAIXO CRIAM UM LINK PARA BAIXAR O PDF'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        /*

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

        */


        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Gravando pdf - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Gravando pdf - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }
}
