//Montar Divs com opções de Relatórios
async function relatorios() {
    const url = `${window.location.protocol}//${window.location.host}/clientes_relatorios/relatorios`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.success) {
            alert('Relatórios não encontrados.');
            return;
        }

        const grupo_relatorios = data.success.grupo_relatorios;

        document.getElementById('divRelatorios').innerHTML = '';

        let relatorio = '';

        let num = 0;

        for (const grupo_relatorio of grupo_relatorios) {
            const relatorioNome = await traduzirViaLocale(grupo_relatorio['relatorio_name']);
            num++;

            relatorio = `<div class="col-12 col-md-3">
                            <a href="#" onclick="relatorio${grupo_relatorio['relatorio_id']}(1, '${grupo_relatorio['relatorio_name']}');">
                                <div class="alert alert-primary fade show font-size-12 ps-2" role="alert">
                                    <i class="bx bxs-printer font-size-14 ms-0 me-2"></i>${relatorioNome}
                                </div>
                            </a>
                        </div>`;

            document.getElementById('divRelatorios').insertAdjacentHTML('beforeend', relatorio);


        }
    } catch (error) {
            console.error('Erro ao carregar relatórios:', error);
    }
}

function relatorio11(op = 1, relatorio_name = '') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio11_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio11')).show();
    } else {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';

        return new Promise(function(resolve, reject) {
            //Validar campos do modal'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            var validacao_ok = true;
            var mensagem = '';

            //Campo: modal_relatorio11_data_inicio (requerido)
            if (validacao({op:1, value:document.getElementById('modal_relatorio11_data_inicio').value}) === false) {
                validacao_ok = false;
                mensagem += 'Data início requerido.'+'<br>';
            } else {
                //Campo: modal_relatorio11_data_inicio (Data Válida)
                if (validacao({op:8, value:document.getElementById('modal_relatorio11_data_inicio').value}) === false) {
                    validacao_ok = false;
                    mensagem += 'Data início Inválida.'+'<br>';
                }
            }

            //Campo: modal_relatorio11_data_fim (requerido)
            if (validacao({op:1, value:document.getElementById('modal_relatorio11_data_fim').value}) === false) {
                validacao_ok = false;
                mensagem += 'Data fim requerido.'+'<br>';
            } else {
                //Campo: modal_relatorio11_data_fim (Data Válida)
                if (validacao({op:8, value:document.getElementById('modal_relatorio11_data_fim').value}) === false) {
                    validacao_ok = false;
                    mensagem += 'Data fim Inválida.'+'<br>';
                }
            }

            //Campo: modal_relatorio11_cidade_id (requerido)
            if (validacao({op:1, value:document.getElementById('modal_relatorio11_cidade_id').value}) === false) {
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
            var data_inicio = formatarData(1, $('#modal_relatorio11_data_inicio').val());
            var data_fim = formatarData(1, $('#modal_relatorio11_data_fim').val());
            var cidade_id = document.getElementById('modal_relatorio11_cidade_id').value;
            var cidade = document.getElementById('modal_relatorio11_cidade_id').options[document.getElementById('modal_relatorio11_cidade_id').selectedIndex].text;
            var idioma = $('#modal_relatorio11_idioma').val();

            //Dados
            $.get(url+'clientes_relatorios/relatorio11/'+data_inicio+'/'+data_fim+'/'+cidade_id+'/'+cidade+'/'+idioma, function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Gerar PDF
            gerarPDFRelatorio({x_relatorio:11, x_dados:data, x_idioma:$('#modal_relatorio11_idioma').val()});

            //Fechar Modal
            document.getElementById('modal_relatorio11_cancelar').click();
        });
    }
}

function relatorio12(op = 1, relatorio_name = '') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio12_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio12')).show();
    } else {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';

        return new Promise(function(resolve, reject) {
            //Validar campos do modal'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            var validacao_ok = true;
            var mensagem = '';

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
            var ponto_tipo_id = document.getElementById('modal_relatorio12_ponto_tipo_id').value;
            var ponto_natureza_id = document.getElementById('modal_relatorio12_ponto_natureza_id').value;
            var modelo = document.getElementById('modal_relatorio12_modelo').value;
            var idioma = $('#modal_relatorio12_idioma').val();

            //Dados
            $.get(url+'clientes_relatorios/relatorio12/'+ponto_tipo_id+'/'+ponto_natureza_id+'/'+modelo+'/'+idioma, function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Gerar PDF
            gerarPDFRelatorio({x_relatorio:12, x_dados:data, x_idioma:$('#modal_relatorio12_idioma').val()});

            //Fechar Modal
            document.getElementById('modal_relatorio12_cancelar').click();
        });
    }
}

// Gerar Relatório com Topo, Tabela com dados e Rodapé
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

    async function adicionarCabecalho(topo) {
        doc.addImage(topo, 'PNG', 15, 10, pageWidth - 30, 30);
    }

    //Função para implementar texto no pdf
    //@PARAM x_align : 'left' // Pode ser 'left', 'right', 'center' ou 'justify'
    //@PARAM x_fontStyle : 'normal', 'bold', 'italic' ou 'bolditalic'
    //@PARAM x_subtitulo : Se for um Título ou Subtítulo que precisa ficar junto do texto posterior então envia algo para não ficar vazio (irá fazer o cálculo diferente de fim de página)
    async function inserirTexto({x_texto = '', x_spacingBetweenTexts = 3, x_marginLeft = marginLeft, x_marginTop = novaMarginTop, x_font = 1, x_fontStyle = 'normal', x_fontSize = 12, x_align = 'left', x_subtitulo = '', x_atualizarNovaMarginTop = true, x_fundo = false, x_fundo_cor = 1, x_textColor = 1}) {
        let linhasTexto = doc.splitTextToSize(x_texto, textWidth);
        let alturaTexto = linhasTexto.length * x_spacingBetweenTexts;

        //Verifica se o texto cabe na página, senão cria uma nova
        let espacoFimPagina = 45;
        if (x_subtitulo != '') {espacoFimPagina = 65;}
        if ((x_marginTop + alturaTexto) > (pageHeight - espacoFimPagina)) {
            await novaPaginaCabecalhoRodape();
            x_marginTop = novaMarginTop; // Reinicia a margem após nova página
        }

        // Cor texto
        if (x_textColor == 1) {doc.setTextColor(0, 0, 0);} // Preto
        if (x_textColor == 2) {doc.setTextColor(255, 0, 0);} // Vermelho
        if (x_textColor == 3) {doc.setTextColor(0, 0, 255);} // Azul
        if (x_textColor == 4) {doc.setTextColor(0, 200, 0);} // Verde

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

    async function novaPaginaCabecalhoRodape() {
        doc.addPage();
        novaMarginTop = marginTop;

        await adicionarCabecalhoRodape(pageTopo, pageRodape);

    }

    async function novaPaginaCabecalho() {
        doc.addPage();
        novaMarginTop = marginTop;

        await adicionarCabecalho(pageTopo);
    }

    // Função interna para desenhar campos (retângulos ou opções)
    async function desenharCampos(campos, startY) {
        let xLeft = marginLeft;

        for (const campo of campos) {
            // Campo pode ser: [label, width, quebra]
            // ou: [label, width, quebra, tipo, opcoes]
            let [labelOriginal, width, quebra, tipo = 'retangulo', opcoes = []] = campo;

            // Traduz label se necessário
            const label = (traducao === 'en') ? await traduzirTextoGoogle(labelOriginal) : labelOriginal;

            doc.setFontSize(8);
            doc.text(label + ":", xLeft, startY - 2);

            if (tipo === 'retangulo') {
                // Desenha retângulo simples (padrão)
                doc.roundedRect(xLeft, startY, width, rowHeight, cornerRadius, cornerRadius);
            }
            else if (tipo === 'opcoes') {
                // Exemplo: ["Gênero", 100, true, "opcoes", ["Masculino", "Feminino", "Outro"]]
                let xOp = xLeft;
                const espacoEntre = 5;
                const tamanhoQuadrado = 3.5;

                for (const opcao of opcoes) {
                    const textoOpcao = (traducao === 'en') ? await traduzirTextoGoogle(opcao) : opcao;
                    // desenha o quadradinho
                    doc.rect(xOp, startY + 2, tamanhoQuadrado, tamanhoQuadrado);
                    // escreve o texto ao lado
                    doc.text(textoOpcao, xOp + tamanhoQuadrado + 2, startY + 2 + tamanhoQuadrado);
                    // avança posição
                    xOp += tamanhoQuadrado + doc.getTextWidth(textoOpcao) + espacoEntre + 2;
                }
            }

            xLeft += width + 5;

            // quebra de linha
            if (quebra) {
                xLeft = marginLeft;
                startY += rowHeight + 8;
            }
        }

        return startY; // retorna o Y final para continuar desenhando
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

        //Relatório 11 - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 11 - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        if (x_relatorio == 11) {
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
        //Relatório 11 - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 11 - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Relatório 12 - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 12 - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        if (x_relatorio == 12) {
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

            //Modelo
            modelo = dados.relatorio_modelo;

            // Relatório Analítico
            if (modelo == 1) {
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
                                        <th>&nbsp;<b>TIPO/NOME</b>&nbsp;</th>
                                        <th width="200px">&nbsp;<b>NATUREZA</b>&nbsp;</th>
                                        <th>&nbsp;<b>ESPECIALIDADE(S)</b>&nbsp;</th>
                                    </tr>
                                </thead>
                            <tbody>`;

                var qtdLinhasTabela = 1;

                var registros = dados.relatorio_registros;
                var especialidades = dados.relatorio_registros_especialidades;

                // Agrupa as especialidades por ponto_interesse_id
                var especialidadesPorPonto = {};

                // Cria
                especialidades.forEach(function (esp) {
                    var id = esp.ponto_interesse_id;

                    if (!especialidadesPorPonto[id]) {
                        especialidadesPorPonto[id] = [];
                    }

                    especialidadesPorPonto[id].push(esp);
                });

                // Ordena as especialidades de cada ponto por nome
                Object.keys(especialidadesPorPonto).forEach(function (id) {
                    especialidadesPorPonto[id].sort(function (a, b) {
                        return a.especialidadeName.localeCompare(b.especialidadeName);
                    });
                });

                // Varrendo registros
                registros.forEach(function (dado) {
                    //Dados para preencher na linha da grade
                    var ponto_tipo = dado.ponto_tipo ? dado.ponto_tipo : '';
                    var ponto_natureza = dado.ponto_natureza ? dado.ponto_natureza : '';
                    var nome = dado.name ? dado.name : '';

                    var esp = especialidadesPorPonto[dado.id];
                    var listaEspecialidades = esp && esp.length ? 'Especialidades: ' + esp.map(e => e.especialidadeName).join(', ') : '';

                    tabelaHTML += `<tr>
                                <td>${ponto_tipo}:<br>${nome}</td>
                                <td>${ponto_natureza}</td>
                                <td>${listaEspecialidades}</td>
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
                    margin: { top: 50, left: 15, right: 15, bottom: 40 }, // <-- reserva espaço pro rodapé
                    useCss: true, // Permite que os estilos CSS sejam considerados
                    styles: {
                        fontStyle: "normal",
                        fontSize: 8,
                        textColor: [0, 0, 0], // Cor do texto preto
                        lineColor: [121, 130, 156], // Cor da borda cinza escuro (#79829c)
                        lineWidth: 0.2, // Espessura da borda
                        cellPadding: 2,
                        overflow: 'linebreak',
                        whiteSpace: 'nowrap'
                    },
                    columnStyles: {
                        0: {cellWidth: 60},
                        1: {cellWidth: 30},
                        2: {cellWidth: 'auto' },
                    },
                    headStyles: {
                        fontStyle: "bold",
                        fontSize: 8,
                        fillColor: [242, 206, 237], // Cor do cabeçalho (Ciano)
                        textColor: [0, 0, 0], // Texto preto
                    },
                    alternateRowStyles: {
                        fillColor: [255, 255, 255], // Cor de fundo alternada para as linhas
                    },
                    didDrawPage: function (data) {
                        // Redesenha cabeçalho e rodapé em todas as páginas
                        adicionarCabecalhoRodape(pageTopo, pageRodape);
                    },
                    didParseCell: function (data) {
                        // se for célula de cabeçalho, força nowrap + elipsize
                        if (data.cell.section === 'head') {
                            data.cell.styles.whiteSpace = 'nowrap';
                            data.cell.styles.overflow = 'ellipsize'; // evita quebra; mostrará "..." se faltar espaço
                            data.cell.styles.cellPadding = 2;
                        }

                        //Força padding em cada célula
                        data.cell.styles.cellPadding = 2;
                    }
                });

                //Nova margem topo para depois da tabela
                novaMarginTop = novaMarginTop + (qtdLinhasTabela*6.3) + 5;
                //Tabela - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //Tabela - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }

            // Relatório Sintético
            if (modelo == 2) {
                //Texto
                texto = dados.relatorio_nome;
                if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
                texto = ' '+texto;
                await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:12, x_fontStyle:'bold', x_fundo:true});

                var registros = dados.relatorio_registros;
                var especialidades = dados.relatorio_registros_especialidades;

                // Agrupa as especialidades por ponto_interesse_id
                var especialidadesPorPonto = {};

                // Cria
                especialidades.forEach(function (esp) {
                    var id = esp.ponto_interesse_id;

                    if (!especialidadesPorPonto[id]) {
                        especialidadesPorPonto[id] = [];
                    }

                    especialidadesPorPonto[id].push(esp);
                });

                // Ordena as especialidades de cada ponto por nome
                Object.keys(especialidadesPorPonto).forEach(function (id) {
                    especialidadesPorPonto[id].sort(function (a, b) {
                        return a.especialidadeName.localeCompare(b.especialidadeName);
                    });
                });

                // Agrupa registros por bairro
                const bairros = {};

                for (const dado of registros) {
                    if (!bairros[dado.bairro]) {
                        bairros[dado.bairro] = [];
                    }

                    bairros[dado.bairro].push(dado);
                }

                // Ordenar os Bairros
                const bairrosOrdenados = Object.keys(bairros).sort((a, b) => a.localeCompare(b, 'pt-BR'));

                // Monta o relatório formatado por Bairro
                for (const bairro of bairrosOrdenados) {
                    // Qtd Pontos no Bairro
                    var qtd_pontos = 0;

                    //Texto
                    texto = primeiraMaiuscula(bairro);
                    inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:14, x_fontStyle:'bolditalic', x_textColor:3});

                    // Colocar Pontos de Interesse do Bairro
                    for (const dado of bairros[bairro]) {
                        qtd_pontos++;

                        var ponto_tipo = dado.ponto_tipo ? dado.ponto_tipo : '';
                        var ponto_natureza = dado.ponto_natureza ? dado.ponto_natureza : '';
                        var nome = dado.name ? dado.name : '';
                        var telefone_1 = dado.telefone_1 ? dado.telefone_1 : '';
                        var telefone_2 = dado.telefone_2 ? dado.telefone_2 : '';
                        var numero = dado.numero ? dado.numero : '';
                        var complemento = dado.complemento ? dado.complemento : '';
                        var logradouro = dado.logradouro ? dado.logradouro : '';

                        // Telefone
                        var telefone = '';
                        if (telefone_1 != '') {
                            telefone += formatarTelCel(3, telefone_1);
                        }
                        if (telefone_2 != '') {
                            if (telefone != '') {telefone += ' / ';}
                            telefone += formatarTelCel(3, telefone_2);
                        }

                        // Endereço
                        var endereco = logradouro;
                        if (numero != '') {endereco += ', '+numero;}
                        if (complemento != '') {endereco += ', '+complemento;}

                        // Título
                        var titulo = `${qtd_pontos}. ${nome} (Natureza ${ponto_natureza}) - (${telefone})`;

                        //Texto
                        texto = primeiraMaiuscula(titulo);
                        inserirTexto({x_texto:texto, x_spacingBetweenTexts:2, x_fontSize:10});

                        //Texto
                        texto = primeiraMaiuscula(endereco);
                        inserirTexto({x_texto:texto, x_spacingBetweenTexts:2, x_fontSize:10, x_marginLeft:marginLeft+4});

                        // lista de especialidades
                        var esp = especialidadesPorPonto[dado.id];
                        var listaEspecialidades = esp && esp.length ? 'Especialidades: ' + esp.map(e => e.especialidadeName).join(', ') : '';

                        //Texto
                        texto = primeiraMaiuscula(listaEspecialidades);
                        inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_fontSize:10, x_align:'justify', x_marginLeft:marginLeft+4});
                    }

                    //relatorio += '\n';
                }
            }
        }
        //Relatório 12 - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 12 - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Gerar o pdf, abrir em uma outra aba e colocar link para download - Início'''''''''''''''''''''''''''''''''''''
        //Gerar o pdf, abrir em uma outra aba e colocar link para download - Início'''''''''''''''''''''''''''''''''''''
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        //Tentar abrir em uma nova aba
        const newTab = window.open(pdfUrl);

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

async function carregarImgBase64(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = url;
        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
        };
        img.onerror = reject;
    });
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
