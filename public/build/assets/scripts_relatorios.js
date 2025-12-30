//Montar Divs com opções de Relatórios
async function relatorios() {
    const url = `${window.location.protocol}//${window.location.host}/relatorios/relatorios`;

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

            // relatorios += `<div class="col-12 col-md-3">
            //                 <div class="card">
            //                     <div class="card-body" style="padding: 0.5rem 0.5rem !important;">
            //                         <div class="row">
            //                             <div class="col-3 col-md-3 text-center">
            //                                 <i class="bx bx-printer font-size-24"></i>
            //                             </div>
            //                             <div class="col-9 col-md-9">
            //                                 <h5 class="text-truncate">${relatorioNome}</h5>
            //                                 <button type="button" class="btn btn-light btn-sm w-xs" onclick="relatorio${grupo_relatorio['relatorio_id']}(1, '${grupo_relatorio['relatorio_name']}');">
            //                                     Filtro
            //                                 </button>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>`;

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

function relatorio8(op=1, relatorio_name='') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio8_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio8')).show();
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
            var ponto_tipo_id = document.getElementById('modal_relatorio8_ponto_tipo_id').value;
            var ponto_natureza_id = document.getElementById('modal_relatorio8_ponto_natureza_id').value;
            var modelo = document.getElementById('modal_relatorio8_modelo').value;
            var idioma = $('#modal_relatorio8_idioma').val();

            //Dados
            $.get(url+'relatorios/relatorio8/'+ponto_tipo_id+'/'+ponto_natureza_id+'/'+modelo+'/'+idioma, function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Gerar PDF
            gerarPDFRelatorio({x_relatorio:8, x_dados:data, x_idioma:$('#modal_relatorio8_idioma').val()});

            //Fechar Modal
            document.getElementById('modal_relatorio8_cancelar').click();
        });
    }
}

function relatorio9(op=1, relatorio_name='') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio9_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio9')).show();
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
            var idioma = $('#modal_relatorio9_idioma').val();

            //Dados
            $.get(url+'relatorios/relatorio9/'+idioma, function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Gerar PDF
            gerarPDFRelatorio({x_relatorio:9, x_dados:data, x_idioma:$('#modal_relatorio9_idioma').val()});

            //Fechar Modal
            document.getElementById('modal_relatorio9_cancelar').click();
        });
    }
}

function relatorio10(op=1, relatorio_name='') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio10_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio10')).show();
    } else {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';

        return new Promise(function(resolve, reject) {
            //Dados
            $.get(url+'relatorios/relatorio10'+'/'+$('#modal_relatorio10_material_id').val()+'/'+$('#modal_relatorio10_material_categoria_id').val()+'/'+$('#modal_relatorio10_estoque_local_id').val()+'/'+$('#modal_relatorio10_empresa_id').val()+'/'+$('#modal_relatorio10_cliente_id').val()+'/'+$('#modal_relatorio10_material_situacao_id').val()+'/'+$('#modal_relatorio10_idioma').val(), function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Gerar PDF
            gerarPDFRelatorio({x_relatorio:10, x_dados:data, x_idioma:$('#modal_relatorio10_idioma').val()});

            //Fechar Modal
            document.getElementById('modal_relatorio10_cancelar').click();
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
                margin: { top: 50, left: 15, right: 15, bottom: 40 }, // <-- reserva espaço pro rodapé
                useCss: true, // Permite que os estilos CSS sejam considerados
                styles: {
                    fontStyle: "normal",
                    fontSize: 8,
                    textColor: [0, 0, 0], // Cor do texto preto
                    lineColor: [121, 130, 156], // Cor da borda cinza escuro (#79829c)
                    lineWidth: 0.2, // Espessura da borda
                    cellPadding: 2,
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
                columnStyles: {
                    0: { halign: "left" }, // Coluna NOME centralizada
                },
                didDrawPage: function (data) {
                    // Redesenha cabeçalho e rodapé em todas as páginas
                    adicionarCabecalhoRodape(pageTopo, pageRodape);
                },
                didParseCell: function (data) {
                    //Força padding em cada célula
                    data.cell.styles.cellPadding = 2;
                }
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
                margin: { top: 50, left: 15, right: 15, bottom: 40 }, // <-- reserva espaço pro rodapé
                useCss: true, // Permite que os estilos CSS sejam considerados
                styles: {
                    fontStyle: "normal",
                    fontSize: 8,
                    textColor: [0, 0, 0], // Cor do texto preto
                    lineColor: [121, 130, 156], // Cor da borda cinza escuro (#79829c)
                    lineWidth: 0.2, // Espessura da borda
                    cellPadding: 2,
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
                columnStyles: {
                    0: { halign: "left" }, // Coluna NOME centralizada
                },
                didDrawPage: function (data) {
                    // Redesenha cabeçalho e rodapé em todas as páginas
                    adicionarCabecalhoRodape(pageTopo, pageRodape);
                },
                didParseCell: function (data) {
                    //Força padding em cada célula
                    data.cell.styles.cellPadding = 2;
                }
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
                margin: { top: 50, left: 15, right: 15, bottom: 40 }, // <-- reserva espaço pro rodapé
                useCss: true, // Permite que os estilos CSS sejam considerados
                styles: {
                    fontStyle: "normal",
                    fontSize: 8,
                    textColor: [0, 0, 0], // Cor do texto preto
                    lineColor: [121, 130, 156], // Cor da borda cinza escuro (#79829c)
                    lineWidth: 0.2, // Espessura da borda
                    cellPadding: 2,
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
                columnStyles: {
                    0: { halign: "left" }, // Coluna NOME centralizada
                },
                didDrawPage: function (data) {
                    // Redesenha cabeçalho e rodapé em todas as páginas
                    adicionarCabecalhoRodape(pageTopo, pageRodape);
                },
                didParseCell: function (data) {
                    //Força padding em cada célula
                    data.cell.styles.cellPadding = 2;
                }
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

        //Relatório 8 - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 8 - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        if (x_relatorio == 8) {
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
        //Relatório 8 - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 8 - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Relatório 9 - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 9 - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        if (x_relatorio == 9) {
            //Cabeçalho e rodapé
            //await adicionarCabecalho(pageTopo);

            // // Não vai colocar cabeçalho então muda a marginTop
            // startY = marginTop - 40;

            // //Texto
            // texto = 'SISTEMA SAC';
            // if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            // texto = ' '+texto;
            // await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:startY, x_fontSize:12, x_fontStyle:'bold', x_align:'left', x_fundo:true, x_fundo_cor:2});

            // //Texto
            // texto = 'ADMINISTRAÇÃO E CONTROLE';
            // if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            // texto = texto+' ';
            // await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:startY, x_fontSize:12, x_fontStyle:'bold', x_align:'right'});

            // //Texto
            // texto = dados.relatorio_nome;
            // if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            // texto = ' '+texto;
            // await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:startY+10, x_fontSize:10, x_align:'left', x_fundo:true, x_fundo_cor:1});

            // //Texto
            // texto = dados.relatorio_data+' às '+dados.relatorio_hora;
            // if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            // texto = texto+' ';
            // await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:startY+10, x_fontSize:10, x_align:'right'});

            // Configurações Gerais
            doc.setFont("helvetica", "normal");

            var xLeft = marginLeft;
            var startY = 0;
            var rowHeight = 7;
            var cornerRadius = 1;

            // Página 1''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            //Texto
            startY = 10;
            texto = 'SISTEMA SAC';
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ' '+texto;
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:startY, x_fontSize:12, x_fontStyle:'bold', x_align:'left', x_fundo:true, x_fundo_cor:2});

            //Texto
            startY = 10;
            texto = 'ADMINISTRAÇÃO E CONTROLE';
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = texto+' ';
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:startY, x_fontSize:12, x_fontStyle:'bold', x_align:'right'});

            //Texto
            startY += 10;
            texto = dados.relatorio_nome;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ' '+texto;
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:startY, x_fontSize:10, x_align:'left', x_fundo:true, x_fundo_cor:1});

            //Texto
            texto = 'Página 1/2'; //dados.relatorio_data+' às '+dados.relatorio_hora;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = texto+' ';
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:startY, x_fontSize:10, x_align:'right'});

            // Subtítulo Informações Gerais
            startY += 15;
            texto = 'Informações Gerais';
            if (traducao === 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ':: '+texto;
            doc.setFontSize(12);
            doc.text(texto, marginLeft, startY);

            // Formulário
            startY = startY + 10;
            var campos = [
                ["Nome", 70, false], ["CPF", 40, false], ["Empresa", 60, true, "opcoes", ["SR Mais", "Consultoria Mais"]],
                ["Tipo de Contratação", 60, false], ["Departamento", 60, false], ["Função", 50, true],
                ["Nome Profissional", 60, false], ["Nascimento", 40, false], ["Sexo", 70, true, "opcoes", ["Masculino", "Feminino", "Outro"]],
                ["Celular", 40, false], ["Telefone", 40, false], ["E-mail", 90, true],
                ["Estado Civil", 60, false], ["Escolaridade", 55, false], ["Nacionalidade", 55, true],
                ["Naturalidade", 60, false], ["Mãe", 55, false], ["Pai", 55, true],
                ["Cor/Raça", 180, true, "opcoes", ["Branca", "Preta", "Parda", "Amarela", "Indígena"]]
            ];

            // Chamada
            startY = await desenharCampos(campos, startY);

            // Subtítulo Dados Bancários
            texto = 'Dados Bancários';
            if (traducao === 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ':: '+texto;
            startY = startY + 5;
            doc.setFontSize(12);
            doc.text(texto, marginLeft, startY);

            // Formulário
            startY = startY + 10;
            var campos = [
                ["Banco", 40, false], ["Agência", 20, false], ["Conta", 30, false], ["PIX Tipo", 30, false], ["PIX Chave", 40, true]
            ];

            // Chamada
            startY = await desenharCampos(campos, startY);

            // Subtítulo Endereço
            texto = 'Endereço';
            if (traducao === 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ':: '+texto;
            startY = startY + 5;
            doc.setFontSize(12);
            doc.text(texto, marginLeft, startY);

            // Formulário
            startY = startY + 10;
            var campos = [
                ["Logradouro", 100, false], ["Número", 20, false], ["Complemento", 50, true],
                ["Bairro", 47.5, false], ["Localidade", 47.5, false], ["UF", 20, false], ["CEP", 30, true]
            ];

            // Chamada
            startY = await desenharCampos(campos, startY);
            //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            // Página 2''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            doc.addPage();

            //Texto
            startY = 10;
            texto = 'SISTEMA SAC';
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ' '+texto;
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:startY, x_fontSize:12, x_fontStyle:'bold', x_align:'left', x_fundo:true, x_fundo_cor:2});

            //Texto
            startY = 10;
            texto = 'ADMINISTRAÇÃO E CONTROLE';
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = texto+' ';
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:startY, x_fontSize:12, x_fontStyle:'bold', x_align:'right'});

            //Texto
            startY += 10;
            texto = dados.relatorio_nome;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ' '+texto;
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:startY, x_fontSize:10, x_align:'left', x_fundo:true, x_fundo_cor:1});

            //Texto
            texto = 'Página 2/2'; //dados.relatorio_data+' às '+dados.relatorio_hora;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = texto+' ';
            await inserirTexto({x_texto:texto, x_spacingBetweenTexts:4, x_marginTop:startY, x_fontSize:10, x_align:'right'});

            // Subtítulo Documentos
            startY += 15;
            texto = 'Documentos';
            if (traducao === 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ':: '+texto;
            doc.setFontSize(12);
            doc.text(texto, marginLeft, startY);

            // Formulário
            startY += 10;
            var campos = [
                ["Carteira Nacional - CN (Órgão)", 75, false], ["CN (Estado)", 20, false], ["CN (Número)", 40, false], ["CN (Emissão)", 30, true],
                ["Identidade Pessoal - IP (Órgão)", 75, false], ["IP (Estado)", 20, false], ["IP (Número)", 40, false], ["IP (Emissão)", 30, true],
                ["Identidade Profissional - IP (Órgão)", 75, false], ["IP (Estado)", 20, false], ["IP (Número)", 40, false], ["IP (Emissão)", 30, true],
                ["Título de Eleitor - TE (Número)", 60, false], ["TE (Zona)", 60, false], ["TE (Seção)", 50, true],
                ["PIS", 60, false], ["PASEP", 60, false], ["Carteira Trabalho", 50, true],
                ["Atestado de Saúde Ocupacional - ASO (Tipo)", 145, false], ["ASO (Emissão)", 30, true],
                ["CNH", 30, false, "opcoes", ["Sim", "Não"]], ["CNH (Categoria)", 30, false], ["CNH (Validade)", 30, true]
            ];

            // Chamada
            startY = await desenharCampos(campos, startY);

            // Subtítulo Transporte
            texto = 'Transporte';
            if (traducao === 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ':: '+texto;
            startY += 5;
            doc.setFontSize(12);
            doc.text(texto, marginLeft, startY);

            // Formulário
            startY += 10;
            var campos = [
                ["Utiliza transporte público?", 35, false, "opcoes", ["Sim", "Não"]], ["Necessita vale-transporte?", 35, false, "opcoes", ["Sim", "Não"]], ["Endereço de embarque", 100, true],
                ["Tipo de transporte", 145, false, "opcoes", ["Ônibus", "Metrô/Trem", "Van", "Aplicativo", "Carro Próprio", "Moto", "Bicicleta"]], ["Vl passagens (diário) R$", 30, true]
            ];

            // Chamada
            startY = await desenharCampos(campos, startY);

            // Subtítulo Dependentes
            texto = 'Dependentes';
            if (traducao === 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = ':: '+texto;
            startY += 5;
            doc.setFontSize(12);
            doc.text(texto, marginLeft, startY);

            // Formulário
            startY += 10;
            var campos = [
                ["1. Nome", 80, false], ["Grau de Parentesco", 60, false], ["Data Nascimento", 30, true],
                ["2. Nome", 80, false], ["Grau de Parentesco", 60, false], ["Data Nascimento", 30, true]
            ];

            // Chamada
            startY = await desenharCampos(campos, startY);
            //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            // Assinatura''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            // Nome
            texto = 'Assinatura do Funcionário';
            if (traducao === 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = texto+': ___________________________________________';
            doc.setFontSize(9);
            doc.text(texto, xLeft, 270);

            //Data
            texto = 'Data';
            if (traducao === 'en') {texto = await traduzirTextoGoogle(texto);}
            texto = texto+': ____/____/______';
            doc.setFontSize(9);
            doc.text(texto, 160, 270);
            //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        }
        //Relatório 9 - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 9 - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Relatório 10 - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 10 - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        if (x_relatorio == 10) {
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
                                    <th>&nbsp;#&nbsp;</th>
                                    <th>&nbsp;PATRIMÔNIO&nbsp;</th>
                                    <th>&nbsp;MATERIAL&nbsp;</th>
                                    <th>&nbsp;LOCAL&nbsp;</th>
                                    <th>&nbsp;SITUAÇÃO&nbsp;</th>
                                </tr>
                            </thead>
                        <tbody>`;

            var qtdLinhasTabela = 1;

            var registros = dados.relatorio_registros;

            registros.forEach(function (dado, index) {
                //Dados para preencher na linha da grade
                var patrimonio = dado.material_numero_patrimonio;
                var material = dado.material_nome+'<br><br>'+dado.material_categoria;

                var local = '';
                if (dado.material_estoque_id == 1) {
                    local = dado.material_local+'<br><br>'+dado.material_estoque_nome+': '+dado.material_local_empresa;
                } else {
                    local = dado.material_local+'<br><br>'+dado.material_estoque_nome+': '+dado.material_local_cliente;
                }

                var situacao = '';
                if (dado.material_situacao_id == 1 || dado.material_situacao_id == 2 || dado.material_situacao_id == 5) {
                    situacao = dado.material_situacao+'<br><br>'+dado+'Movimentação Permitida';
                } else {
                    situacao = dado.material_situacao;
                }

                tabelaHTML += `<tr data-index="${index}">
                                <td></td>
                                <td>${patrimonio ? patrimonio : ''}</td>
                                <td>${material ? material : ''}</td>
                                <td>${local ? local : ''}</td>
                                <td>${situacao ? situacao : ''}</td>
                            </tr>`;

                qtdLinhasTabela++;
            });

            tabelaHTML += `</tbody>
                    </table>`;

            qtdLinhasTabela++;
            qtdLinhasTabela++;

            // Carregar Img Base64
            for (const registro of registros) {
                if (registro.material_fotografia) {
                    try {
                        registro.material_fotografia_base64 = await carregarImgBase64(
                            'http://gruposrmais-client.test/' + registro.material_fotografia
                        );
                    } catch (err) {
                        console.warn('Erro ao carregar imagem:', err);
                    }
                }
            }

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
                },
                headStyles: {
                    fontStyle: "bold",
                    fontSize: 8,
                    fillColor: [242, 206, 237],
                    textColor: [0, 0, 0]
                },
                alternateRowStyles: {
                    fillColor: [255, 255, 255], // Cor de fundo alternada para as linhas
                },
                columnStyles: {
                    0: { halign: "center", cellWidth: 15 },
                    1: { halign: "center", minCellWidth: 25, fontStyle: "bold" },
                    2: { halign: "left", minCellWidth: 25 },
                    3: { halign: "left", minCellWidth: 25 }

                },
                didDrawPage: function (data) {
                    adicionarCabecalhoRodape(pageTopo, pageRodape);
                },
                didParseCell: function (data) {
                    data.cell.styles.cellPadding = 2;
                },
                didDrawCell: function (data) {
                    if (data.section === 'body' && data.column.index === 0) {
                        const rowElement = data.cell.raw && data.cell.raw.parentElement;
                        if (!rowElement) return;

                        const rowIndex = parseInt(rowElement.getAttribute('data-index'));
                        const registro = registros[rowIndex];
                        if (registro && registro.material_fotografia_base64) {
                            const imgW = 8;
                            const imgH = 8;
                            const x = data.cell.x + (data.cell.width - imgW) / 2;
                            const y = data.cell.y + (data.cell.height - imgH) / 2;
                            doc.addImage(registro.material_fotografia_base64, 'PNG', x, y, imgW, imgH);
                        }
                    }
                }
            });

            //Nova margem topo para depois da tabela
            novaMarginTop = novaMarginTop + (qtdLinhasTabela*6.3) + 5;
            //Tabela - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            //Tabela - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        }
        //Relatório 10 - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Relatório 10 - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

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
