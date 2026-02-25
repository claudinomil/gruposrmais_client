let vtt2_visitaTecnicaDadoId = 0; //Id da Pergunta que está sendo manipulada na tabela visitas_tecnicas_dados

function vtt2_validar_frm_visitas_tecnicas() {
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

    //Se diferente de inclusão validar campos vtt2_visita_tecnica_status_id, datas e horas''''''''''''''''''''''''''''''''''''
    if (document.getElementById('frm_operacao').value != 'create') {
        //Campo: vtt2_visita_tecnica_status_id
        if (validacao({op: 1, value: document.getElementById('vtt2_visita_tecnica_status_id').value}) === false) {
            validacao_ok = false;
            mensagem += 'Status requerido.' + '<br>';
        } else {
            //Campo: vtt2_visita_tecnica_status_id (deve ser um número)
            if (validacao({op: 4, value: document.getElementById('vtt2_visita_tecnica_status_id').value}) === false) {
                validacao_ok = false;
                mensagem += 'Status deve ser escolhido.' + '<br>';
            } else {
                var status_id = document.getElementById('vtt2_visita_tecnica_status_id').value;

                if (status_id == 1) {  //ABERTA
                    //Campo: vtt2_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt2_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt2_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_data_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_data_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt2_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_hora_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_hora_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt2_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }
                } else if (status_id == 2) {  //EM ANDAMENTO
                    //Campo: vtt2_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt2_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt2_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_data_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_data_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt2_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_hora_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_hora_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt2_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }
                } else if (status_id == 3) {  //CONCLUÍDA
                    //Campo: vtt2_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt2_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt2_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_data_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_data_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt2_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_hora_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_hora_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt2_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_data_conclusao (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_data_conclusao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data conclusão requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt2_data_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_hora_conclusao (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_hora_conclusao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora conclusão requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt2_hora_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora conclusão inválida.' + '<br>';
                        }
                    }
                } else if (status_id == 4) {  //FINALIZADA
                    //Campo: vtt2_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt2_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt2_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_data_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_data_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt2_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_hora_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_hora_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt2_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_data_conclusao (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_data_conclusao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data conclusão requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt2_data_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_hora_conclusao (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_hora_conclusao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora conclusão requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt2_hora_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_data_finalizacao (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_data_finalizacao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data finalização requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt2_data_finalizacao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data finalização inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_hora_finalizacao (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_hora_finalizacao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora finalização requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt2_hora_finalizacao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora finalização inválida.' + '<br>';
                        }
                    }
                } else if (status_id == 4) {  //CANCELADA
                    //Campo: vtt2_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('vtt2_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('vtt2_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_data_prevista (não requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_data_prevista').value}) === true) {
                        if (validacao({op: 8, value: document.getElementById('vtt2_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_hora_prevista (não requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_hora_prevista').value}) === true) {
                        if (validacao({op: 17, value: document.getElementById('vtt2_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_data_conclusao (não requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_data_conclusao').value}) === true) {
                        if (validacao({op: 8, value: document.getElementById('vtt2_data_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_hora_conclusao (não requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_hora_conclusao').value}) === true) {
                        if (validacao({op: 17, value: document.getElementById('vtt2_hora_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_data_finalizacao (não requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_data_finalizacao').value}) === true) {
                        if (validacao({op: 8, value: document.getElementById('vtt2_data_finalizacao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data finalização inválida.' + '<br>';
                        }
                    }

                    //Campo: vtt2_hora_finalizacao (não requerido)
                    if (validacao({op: 1, value: document.getElementById('vtt2_hora_finalizacao').value}) === true) {
                        if (validacao({op: 17, value: document.getElementById('vtt2_hora_finalizacao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora finalização inválida.' + '<br>';
                        }
                    }
                }
            }
        }
    }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Campo: vtt2_cliente_id (requerido)
    if (validacao({op:1, value:document.getElementById('vtt2_cliente_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.' + '<br>';
    } else {
        //Campo: vtt2_cliente_id (deve ser um número)
        if (validacao({op:4, value: document.getElementById('vtt2_cliente_id').value}) === false) {
            validacao_ok = false;
            mensagem += 'Cliente deve ser escolhido.' + '<br>';
        }
    }

    //Campo: vtt2_responsavel_funcionario_id (requerido)
    if (validacao({op:1, value:document.getElementById('vtt2_responsavel_funcionario_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Responsável requerido.' + '<br>';
    } else {
        //Campo: vtt2_responsavel_funcionario_id (deve ser um número)
        if (validacao({op:4, value: document.getElementById('vtt2_responsavel_funcionario_id').value}) === false) {
            validacao_ok = false;
            mensagem += 'Responsável deve ser escolhido.' + '<br>';
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

/*
* Controle do Formulário
* @PARAM op : 1(Formulário Completo)
* @PARAM op : 2(Informações principais)
* @PARAM op : 3(Perguntas)
* @PARAM op : 4(Finalização)
 */
function vtt2_formControle(op) {
    let informacoesGerais = document.getElementById('vtt2_divInformacoesGerais');
    let clientes = document.getElementById('vtt2_divClientes');
    let responsavel = document.getElementById('vtt2_divResponsavel');
    let finalizar = document.getElementById('vtt2_divFinalizar');
    let perguntas = document.getElementById('vtt2_divPerguntas');

    informacoesGerais.style.display = 'none';
    clientes.style.display = 'none';
    responsavel.style.display = 'none';
    finalizar.style.display = 'none';
    perguntas.style.display = 'none';

    // 1(Formulário Completo)
    if (op == 1) {
        informacoesGerais.style.display = '';
        clientes.style.display = '';
        responsavel.style.display = '';
        finalizar.style.display = '';
        perguntas.style.display = '';
    }

    // 2(Informações principais)
    if (op == 2) {
        informacoesGerais.style.display = '';
        clientes.style.display = '';
        responsavel.style.display = '';
    }

    // 3(Perguntas)
    if (op == 3) {
        perguntas.style.display = '';
    }

    // 4(Finalização)
    if (op == 4) {
        finalizar.style.display = '';
    }
}

function vtt2_abrirModalObservacao(visita_tecnica_dado_id) {
    event.preventDefault();

    vtt2_visitaTecnicaDadoId = visita_tecnica_dado_id;

    document.getElementById('vtt2_modal_observacao_texto').value = document.getElementById('vtt2_observacao_texto_'+vtt2_visitaTecnicaDadoId).value;

    new bootstrap.Modal(document.getElementById('vtt2_modalObservacao')).show();

    //Posicionar elemento no topo
    vtt2_posicionarPergunta();
}

function vtt2_abrirModalFotografia(visita_tecnica_dado_id) {
    event.preventDefault();

    vtt2_visitaTecnicaDadoId = visita_tecnica_dado_id;

    document.getElementById('vtt2_modalFotografiaFile').value = '';

    new bootstrap.Modal(document.getElementById('vtt2_modalFotografia')).show();

    //Posicionar elemento no topo
    vtt2_posicionarPergunta();
}

function vtt2_abrirModalPdf(visita_tecnica_dado_id) {
    event.preventDefault();

    vtt2_visitaTecnicaDadoId = visita_tecnica_dado_id;

    document.getElementById('vtt2_modalPdfFile').value = '';

    new bootstrap.Modal(document.getElementById('vtt2_modalPdf')).show();

    //Posicionar elemento no topo
    vtt2_posicionarPergunta();
}

function vtt2_observacaoEnviar() {
    if (document.getElementById('vtt2_modal_observacao_texto').value == '') {
        if (!confirm('Tem certeza que deseja enviar uma Observação vazia?')) return;
    }

    document.getElementById('vtt2_divObservacaoTexto_'+vtt2_visitaTecnicaDadoId).innerHTML = document.getElementById('vtt2_modal_observacao_texto').value;
    document.getElementById('vtt2_observacao_texto_'+vtt2_visitaTecnicaDadoId).value = document.getElementById('vtt2_modal_observacao_texto').value;

    //Show classObservacaoFotografiaPdf
    vtt2_observacaoFotografiaPdfShow();

    //Fechar Modal
    bootstrap.Modal.getInstance(document.getElementById('vtt2_modalObservacao')).hide();

    //Salvar
    vtt2_salvarDadosPergunta(vtt2_visitaTecnicaDadoId);
}

function vtt2_fotografiaEnviar(fileInput) {
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Nenhuma imagem selecionada.');
        return;
    }

    //Pega a imagem e reduz o tamanho'''''''''''''''''''''''''''''''''''''''''''
    const file = files[0];
    const maxDim = 1024; // tamanho máximo da largura/altura

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            // Calcula nova largura e altura mantendo proporção
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxDim) {
                    height = Math.round(height * (maxDim / width));
                    width = maxDim;
                }
            } else {
                if (height > maxDim) {
                    width = Math.round(width * (maxDim / height));
                    height = maxDim;
                }
            }

            // Cria canvas e desenha a imagem redimensionada
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Converte canvas para Blob (image/jpeg com qualidade 0.8)
            canvas.toBlob(function(blob) {
                // Aqui blob é o arquivo redimensionado que você vai enviar
                uploadFoto(blob);
            }, 'image/jpeg', 0.8);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    function uploadFoto(blob) {
        // Encontra o próximo slot livre
        const container = document.getElementById(`vtt2_divFotografiaFotos_${vtt2_visitaTecnicaDadoId}`);
        const fotoContainers = container.querySelectorAll('.container-foto');

        let slotLivre = null;
        for (let i = 0; i < fotoContainers.length; i++) {
            const inputHidden = fotoContainers[i].querySelector('input[type="hidden"]');
            if (!inputHidden.value) {
                slotLivre = i + 1;
                break;
            }
        }

        if (!slotLivre) {
            alert('Todos os slots estão preenchidos.');
            return;
        }

        // Envia o Blob no FormData
        const formData = new FormData();
        formData.append('foto', blob, 'foto.jpg'); // pode passar nome opcional

        fetch('visitas_tecnicas/vtt2/pergunta/uploadFotografia/' + vtt2_visitaTecnicaDadoId + '/' + slotLivre, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    vtt2_fotografiaInserir(data.path);
                    vtt2_observacaoFotografiaPdfShow();
                } else {
                    alert('Erro ao enviar imagem.');
                }

                //Limpa input e fecha modal
                fileInput.value = '';
                bootstrap.Modal.getInstance(document.getElementById('vtt2_modalFotografia')).hide();
            })
            .catch(() => alert('Erro na comunicação com o servidor.'));
    }
}

function vtt2_pdfEnviar(fileInput) {
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Nenhum arquivo PDF selecionado.');
        return;
    }

    const file = files[0];

    // Valida se é PDF
    if (file.type !== 'application/pdf') {
        alert('Por favor, selecione um arquivo PDF válido.');
        fileInput.value = '';
        return;
    }

    // Envia o PDF direto
    uploadPdf(file);

    function uploadPdf(pdfFile) {
        // Encontra o próximo slot livre
        const container = document.getElementById(`vtt2_divPdf_${vtt2_visitaTecnicaDadoId}`);
        const pdfContainers = container.querySelectorAll('.container-pdf');

        let slotLivre = null;
        for (let i = 0; i < pdfContainers.length; i++) {
            const inputHidden = pdfContainers[i].querySelector('input[type="hidden"]');
            if (!inputHidden.value) {
                slotLivre = i + 1;
                break;
            }
        }

        if (!slotLivre) {
            alert('Todos os slots de PDF estão preenchidos.');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', pdfFile, 'documento.pdf');

        fetch('visitas_tecnicas/vtt2/pergunta/uploadPdf/' + vtt2_visitaTecnicaDadoId + '/' + slotLivre, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    vtt2_pdfInserir(data.path);
                    vtt2_observacaoFotografiaPdfShow();
                } else {
                    alert('Erro ao enviar PDF.');
                }

                // Limpa input e fecha modal (se existir modal)
                fileInput.value = '';
                if (document.getElementById('vtt2_modalPdf')) {
                    bootstrap.Modal.getInstance(document.getElementById('vtt2_modalPdf')).hide();
                }
            })
            .catch(() => alert('Erro na comunicação com o servidor.'));
    }
}

function vtt2_fotografiaInserir(imagemUrl) {
    const container = document.getElementById(`vtt2_divFotografiaFotos_${vtt2_visitaTecnicaDadoId}`);
    if (!container) return;

    for (let i = 1; i <= 3; i++) {
        const img = document.getElementById(`vtt2_img_${vtt2_visitaTecnicaDadoId}_${i}`);
        const inputHidden = document.getElementById(`vtt2_fotografia_${vtt2_visitaTecnicaDadoId}_${i}`);

        if (inputHidden && !inputHidden.value) {
            img.src = imagemUrl;
            inputHidden.value = imagemUrl;

            const containerDiv = img.closest('.container-foto');
            containerDiv.style.display = 'block';
            containerDiv.querySelector('.img-foto').style.display = 'block';
            containerDiv.querySelector('.visualizar-foto').style.display = 'block';
            containerDiv.querySelector('.remover-foto').style.display = 'block';

            break;
        }
    }

    //Salvar
    vtt2_salvarDadosPergunta(vtt2_visitaTecnicaDadoId);
}

function vtt2_pdfInserir(pdfUrl) {
    const container = document.getElementById(`vtt2_divPdf_${vtt2_visitaTecnicaDadoId}`);
    if (!container) return;

    //URL
    var url_atual = window.location.protocol + '//' + window.location.host + '/';

    for (let i = 1; i <= 3; i++) {
        const embed = document.getElementById(`vtt2_img_pdf_${vtt2_visitaTecnicaDadoId}_${i}`);
        const inputHidden = document.getElementById(`vtt2_pdf_${vtt2_visitaTecnicaDadoId}_${i}`);

        if (inputHidden && !inputHidden.value) {
            embed.src = url_atual+'build/assets/images/image_pdf.png';
            inputHidden.value = pdfUrl;

            const containerDiv = embed.closest('.container-pdf');
            containerDiv.style.display = 'block';
            containerDiv.querySelector('.img-pdf').style.display = 'block';
            containerDiv.querySelector('.visualizar-pdf').style.display = 'block';
            containerDiv.querySelector('.remover-pdf').style.display = 'block';

            break;
        }
    }

    //Salvar
    vtt2_salvarDadosPergunta(vtt2_visitaTecnicaDadoId);
}

function vtt2_removerFotografia(button) {
    const visita_tecnica_dado_id = button.dataset.vtt2_visita_tecnica_dado_id;
    const slot = button.dataset.vtt2_slot;

    vtt2_visitaTecnicaDadoId = visita_tecnica_dado_id;

    fetch(`visitas_tecnicas/vtt2/pergunta/removerFotografia/${visita_tecnica_dado_id}/${slot}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const img = document.getElementById(`vtt2_img_${visita_tecnica_dado_id}_${slot}`);
                const input = document.getElementById(`vtt2_fotografia_${visita_tecnica_dado_id}_${slot}`);

                img.src = '';
                input.value = '';

                const container = button.closest('.container-foto');
                container.style.display = 'none';
                container.querySelector('.img-foto').style.display = 'none';
                container.querySelector('.visualizar-foto').style.display = 'none';
                container.querySelector('.remover-foto').style.display = 'none';

                //Salvar
                vtt2_salvarDadosPergunta(vtt2_visitaTecnicaDadoId);
            } else {
                alert('Erro ao remover imagem.');
            }
        })
        .catch(() => alert('Erro na comunicação com o servidor yyy.'));
}

function vtt2_removerPdf(button) {
    const visita_tecnica_dado_id = button.dataset.vtt2_visita_tecnica_dado_id;
    const slot = button.dataset.vtt2_slot;

    vtt2_visitaTecnicaDadoId = visita_tecnica_dado_id;

    fetch(`visitas_tecnicas/vtt2/pergunta/removerPdf/${visita_tecnica_dado_id}/${slot}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const embed = document.getElementById(`vtt2_img_pdf_${visita_tecnica_dado_id}_${slot}`);
                const input = document.getElementById(`vtt2_pdf_${visita_tecnica_dado_id}_${slot}`);

                embed.src = '';
                input.value = '';

                const container = button.closest('.container-pdf');
                container.style.display = 'none';
                container.querySelector('.img-pdf').style.display = 'none';
                container.querySelector('.visualizar-pdf').style.display = 'none';
                container.querySelector('.remover-pdf').style.display = 'none';

                //Salvar
                vtt2_salvarDadosPergunta(vtt2_visitaTecnicaDadoId);
            } else {
                alert('Erro ao remover PDF.');
            }
        })
        .catch(() => alert('Erro na comunicação com o servidor.'));
}

function vtt2_visualizarFotografia(button) {
    const visita_tecnica_dado_id = button.dataset.vtt2_visita_tecnica_dado_id;
    const slot = button.dataset.vtt2_slot;

    vtt2_visitaTecnicaDadoId = visita_tecnica_dado_id;

    const img = document.getElementById(`vtt2_img_${visita_tecnica_dado_id}_${slot}`);
    const imgUrl = img.src;

    const modalImg = document.getElementById('modalVisualizarImagemSrc');
    modalImg.src = imgUrl;

    const bootstrapModal = new bootstrap.Modal(document.getElementById('modalVisualizarImagem'));
    bootstrapModal.show();
}

function vtt2_visualizarPdf(button) {
    const visita_tecnica_dado_id = button.dataset.vtt2_visita_tecnica_dado_id;
    const slot = button.dataset.vtt2_slot;

    vtt2_visitaTecnicaDadoId = visita_tecnica_dado_id;

    const embed = document.getElementById(`vtt2_pdf_${visita_tecnica_dado_id}_${slot}`);
    const pdfUrl = embed.value;

    const modalPdf = document.getElementById('modalVisualizarPdfSrc');
    modalPdf.src = pdfUrl;

    const bootstrapModal = new bootstrap.Modal(document.getElementById('modalVisualizarPdf'));
    bootstrapModal.show();
}

function vtt2_salvarDadosPergunta(visita_tecnica_dado_id) {
    //Mostrar vtt2_divBloqueio para bloquear interações
    document.getElementById('vtt2_divBloqueio').style.display = 'block';

    vtt2_visitaTecnicaDadoId = visita_tecnica_dado_id;

    //Verificar Hiddens
    var visita_tecnica_id = document.getElementById('vtt2_visita_tecnica_id_'+vtt2_visitaTecnicaDadoId).value;
    var titulo = document.getElementById('vtt2_titulo_'+vtt2_visitaTecnicaDadoId).value;
    var subtitulo = document.getElementById('vtt2_subtitulo_'+vtt2_visitaTecnicaDadoId).value;
    var pergunta = document.getElementById('vtt2_pergunta_'+vtt2_visitaTecnicaDadoId).value;

    //Verificar Resposta
    var resposta = 0;

    if (document.getElementById('vtt2_resposta_'+vtt2_visitaTecnicaDadoId+'_1').checked) {resposta = 1;}
    if (document.getElementById('vtt2_resposta_'+vtt2_visitaTecnicaDadoId+'_2').checked) {resposta = 2;}
    if (document.getElementById('vtt2_resposta_'+vtt2_visitaTecnicaDadoId+'_3').checked) {resposta = 3;}

    //Verificar Quantidade
    var quantidade = document.getElementById('vtt2_quantidade_'+vtt2_visitaTecnicaDadoId).value;

    //Verificar Observação
    var observacao = document.getElementById('vtt2_observacao_texto_'+vtt2_visitaTecnicaDadoId).value;

    //Verificar Fotografias
    var fotografia_1 = document.getElementById('vtt2_fotografia_'+vtt2_visitaTecnicaDadoId+'_1').value;
    var fotografia_2 = document.getElementById('vtt2_fotografia_'+vtt2_visitaTecnicaDadoId+'_2').value;
    var fotografia_3 = document.getElementById('vtt2_fotografia_'+vtt2_visitaTecnicaDadoId+'_3').value;

    //Verificar PDFs
    var pdf_1 = document.getElementById('vtt2_pdf_'+vtt2_visitaTecnicaDadoId+'_1').value;
    var pdf_2 = document.getElementById('vtt2_pdf_'+vtt2_visitaTecnicaDadoId+'_2').value;
    var pdf_3 = document.getElementById('vtt2_pdf_'+vtt2_visitaTecnicaDadoId+'_3').value;

    //Montar dados e Salvar na tabela'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    let payload = {visita_tecnica_id, titulo, subtitulo, pergunta, resposta, quantidade, observacao, fotografia_1, fotografia_2, fotografia_3, pdf_1, pdf_2, pdf_3};

    //Acessar rota
    fetch('visitas_tecnicas/vtt2/pergunta/updatePergunta/'+vtt2_visitaTecnicaDadoId, {
        method: 'POST',
        headers: {
            'REQUEST-ORIGIN': 'fetch',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify(payload)
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo dados
        if (data.success) {

        } else if (data.error) {
            alertSwal('warning', 'Visitas Técnicas', data.error, 'true', 20000);
        } else {
            alert('Erro interno');
        }
    }).catch(error => {
        alert('Erro vtt2_salvarDadosPergunta: '+error);
    }).finally(() => {
        //Oculta vtt2_divBloqueio independentemente do resultado
        document.getElementById('vtt2_divBloqueio').style.display = 'none';
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Posiciona no topo
    vtt2_posicionarPergunta();
}

function vtt2_posicionarPergunta() {
    //Posicionar elemento no topo
    const elemento = document.getElementById('vtt2_divPergunta_' + vtt2_visitaTecnicaDadoId);
    const posicao = elemento.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
        top: posicao - 100,  // 100px acima do elemento
        behavior: 'smooth'   // rolagem suave
    });
}

function vtt2_observacaoFotografiaPdfShow() {
    const observacaoFotografiasPdfs = document.querySelectorAll('.classObservacaoFotografiaPdf');

    observacaoFotografiasPdfs.forEach(element => {
        const visita_tecnica_dado_id = element.getAttribute('data-vtt2_visita_tecnica_dado_id');

        var observacao_texto = document.getElementById('vtt2_observacao_texto_'+visita_tecnica_dado_id).value;
        var fotografia_1 = document.getElementById('vtt2_fotografia_'+visita_tecnica_dado_id+'_1').value;
        var fotografia_2 = document.getElementById('vtt2_fotografia_'+visita_tecnica_dado_id+'_2').value;
        var fotografia_3 = document.getElementById('vtt2_fotografia_'+visita_tecnica_dado_id+'_3').value;
        var pdf_1 = document.getElementById('vtt2_pdf_'+visita_tecnica_dado_id+'_1').value;
        var pdf_2 = document.getElementById('vtt2_pdf_'+visita_tecnica_dado_id+'_2').value;
        var pdf_3 = document.getElementById('vtt2_pdf_'+visita_tecnica_dado_id+'_3').value;

        if (observacao_texto != '' || fotografia_1 != '' || fotografia_2 != '' || fotografia_3 != '' || pdf_1 != '' || pdf_2 != '' || pdf_3 != '') {
            document.getElementById('vtt2_divObservacaoFotografiaPdf_' + visita_tecnica_dado_id).style.display = '';
        } else {
            document.getElementById('vtt2_divObservacaoFotografiaPdf_'+visita_tecnica_dado_id).style.display = 'none';
        }
    });
}

function vtt2_gerarHtmlPerguntas(visitas_tecnicas_dados) {
    let html = '<h5 class="pb-4 text-primary"><i class="fas fa-question"></i> Perguntas</h5>';

    let contadorTitulo = 0;
    let contadorSubtitulo = 0;
    let contadorPergunta = 0;
    let tituloAtual = null;
    let subtituloAtual = null;

    var url_atual = window.location.protocol + '//' + window.location.host + '/';

    let operacao = document.getElementById('frm_operacao').value;
    let opcoes = 0;

    visitas_tecnicas_dados = visitas_tecnicas_dados.filter(p => p.completa === 1).sort((a, b) => a.completa_ordem - b.completa_ordem);


    visitas_tecnicas_dados.forEach(dado => {
        opcoes = dado.opcoes;

        //Resposta''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        var campo_resposta_1 = '';
        var campo_resposta_2 = '';
        var campo_resposta_3 = '';

        if (dado.resposta == 1) {campo_resposta_1 = 'checked';}
        if (dado.resposta == 2) {campo_resposta_2 = 'checked';}
        if (dado.resposta == 3) {campo_resposta_3 = 'checked';}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Resposta Disabled'''''''''''''''''''''''''''''''''''''''''''''''
        var campo_resposta_disabled = '';

        if (operacao == 'view') {var campo_resposta_disabled = 'disabled';}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Quantidade Disabled'''''''''''''''''''''''''''''''''''''''''''''
        var campo_quantidade_disabled = '';

        if (operacao == 'view') {var campo_quantidade_disabled = 'disabled';}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Observaçao''''''''''''''''''''''''''''''''''''''''''''''''''''''
        var campo_observacao = '';

        if (dado.observacao !== null) {campo_observacao = dado.observacao;}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Fotografia''''''''''''''''''''''''''''''''''''''''''''''''''''''
        var campo_fotografia_1 = '';
        var campo_fotografia_2 = '';
        var campo_fotografia_3 = '';

        if (dado.fotografia_1 !== null) {campo_fotografia_1 = dado.fotografia_1;}
        if (dado.fotografia_2 !== null) {campo_fotografia_2 = dado.fotografia_2;}
        if (dado.fotografia_3 !== null) {campo_fotografia_3 = dado.fotografia_3;}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Pdf'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        var campo_pdf_1 = '';
        var campo_pdf_2 = '';
        var campo_pdf_3 = '';

        if (dado.pdf_1 !== null) {campo_pdf_1 = dado.pdf_1;}
        if (dado.pdf_2 !== null) {campo_pdf_2 = dado.pdf_2;}
        if (dado.pdf_3 !== null) {campo_pdf_3 = dado.pdf_3;}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Verificar se deixa aberto a vtt2_divObservacaoFotografiaPdf_''''
        var vtt2_divObservacaoFotografiaPdf_display = '';

        if (campo_observacao == '' && campo_fotografia_1 == '' && campo_fotografia_2 == '' && campo_fotografia_3 == '' && campo_pdf_1 == '' && campo_pdf_2 == '' && campo_pdf_3 == '') {
            var vtt2_divObservacaoFotografiaPdf_display = 'none';
        }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Html
        html += `<div class="row pb-3">
            <input type="hidden" name="vtt2_visita_tecnica_id_${dado.id}" id="vtt2_visita_tecnica_id_${dado.id}" value="${dado.visita_tecnica_id}">
            <input type="hidden" name="vtt2_titulo_${dado.id}" id="vtt2_titulo_${dado.id}" value="${dado.titulo}">
            <input type="hidden" name="vtt2_subtitulo_${dado.id}" id="vtt2_subtitulo_${dado.id}" value="${dado.subtitulo}">
            <input type="hidden" name="vtt2_pergunta_${dado.id}" id="vtt2_pergunta_${dado.id}" value="${dado.pergunta}">`;

        if (dado.titulo !== tituloAtual) {
            contadorTitulo++;
            contadorSubtitulo = 0;
            contadorPergunta = 0;
            tituloAtual = dado.titulo;
            subtituloAtual = null;

            html += `<div class="col-12 py-4"><strong>${contadorTitulo}. ${dado.titulo}</strong></div>`;
        }

        if (dado.subtitulo) {
            if (dado.subtitulo !== subtituloAtual) {
                contadorSubtitulo++;
                contadorPergunta = 1;
                subtituloAtual = dado.subtitulo;

                html += `<div class="col-12 ps-3 py-4"><strong>${String.fromCharCode(64 + contadorSubtitulo)}. ${dado.subtitulo}</strong></div>`;
            } else {
                contadorPergunta++;
            }

            html += `<div class="row col-12 bg-light ms-3 py-2" id="vtt2_divPergunta_${dado.id}">
                        <div class="col-12 col-md-6">${contadorTitulo}.${String.fromCharCode(64 + contadorSubtitulo)}.${contadorPergunta}. ${dado.pergunta}</div>`;
        } else {
            contadorPergunta++;

            html += `<div class="row col-12 bg-light ms-3 py-2 px-0" id="vtt2_divPergunta_${dado.id}">
                        <div class="col-12 col-md-6">${contadorTitulo}.${contadorPergunta}. ${dado.pergunta}</div>`;
        }

        html += `<div class="col-12 col-md-6">
                    <hr class="d-block d-md-none my-2">`;

        html += `<div class="d-flex flex-wrap justify-content-center justify-content-xl-end">`;

        //Respostas
        if ([4, 8, 11, 13, 15, 17, 19, 21, 22, 24, 25, 26, 28, 29, 30, 31].includes(opcoes)) {
            html += `<div class="form-check-success text-start flex-grow-1 px-1">
                        <input class="form-check-input" type="radio" onclick="vtt2_salvarDadosPergunta(${dado.id})" name="vtt2_resposta_${dado.id}" id="vtt2_resposta_${dado.id}_1" ${campo_resposta_1} ${campo_resposta_disabled}>
                        <label class="form-check-label" for="vtt2_resposta_${dado.id}_1">Sim</label>
                    </div>
                    <div class="form-check-success text-start flex-grow-1 px-1">
                        <input class="form-check-input" type="radio" onclick="vtt2_salvarDadosPergunta(${dado.id})" name="vtt2_resposta_${dado.id}" id="vtt2_resposta_${dado.id}_2" ${campo_resposta_2} ${campo_resposta_disabled}>
                        <label class="form-check-label" for="vtt2_resposta_${dado.id}_2">Não</label>
                    </div>
                    <div class="form-check-success text-start flex-grow-1 px-1">
                        <input class="form-check-input" type="radio" onclick="vtt2_salvarDadosPergunta(${dado.id})" name="vtt2_resposta_${dado.id}" id="vtt2_resposta_${dado.id}_3" ${campo_resposta_3} ${campo_resposta_disabled}>
                        <label class="form-check-label" for="vtt2_resposta_${dado.id}_3">NI</label>
                    </div>`;
        }

        //Quantidade
        if ([5, 9, 12, 14, 15, 18, 20, 21, 23, 24, 25, 27, 28, 29, 30, 31].includes(opcoes)) {
            html += `<div class="form-group text-center flex-grow-1 px-1">
                        <label class="form-label small">Qtd: </label>
                        <input type="text" class="form-control form-control-sm d-inline-block text-center" onchange="vtt2_salvarDadosPergunta(${dado.id})" name="vtt2_quantidade_${dado.id}" id="vtt2_quantidade_${dado.id}" value="${dado.quantidade}" placeholder="Qtd" min="0" max="999" oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 3)" style="width: 40px;" ${campo_quantidade_disabled}>
                    </div>`;
        }

        if (operacao != 'view') {
            //Observação
            if ([1, 6, 7, 8, 9, 16, 17, 18, 19, 20, 21, 26, 27, 28, 29, 31].includes(opcoes)) {
                html += `<div class="text-end flex-grow-1 px-1">
                            <a href="#" onclick="vtt2_abrirModalObservacao(${dado.id})" title="Anexar Observação" id="vtt2_btnObservacao_${dado.id}">
                                <i class="bx bx-detail text-success font-size-18"></i>
                            </a>
                        </div>`;
            }

            //Imagens
            if ([3, 7, 10, 13, 14, 16, 19, 20, 22, 23, 25, 26, 27, 29, 30, 31].includes(opcoes)) {
                html += `<div class="text-end flex-grow-1 px-1">
                            <a href="#" onclick="vtt2_abrirModalFotografia(${dado.id})" title="Anexar Fotografia" id="vtt2_btnFotografia_${dado.id}">
                                <i class="bx bxs-photo-album text-primary font-size-18"></i>
                            </a>
                        </div>`;
            }

            //Pdf
            if ([2, 6, 10, 11, 12, 16, 17, 18, 22, 23, 24, 26, 27, 28, 30, 31].includes(opcoes)) {
                html += `<div class="text-end flex-grow-1 px-1">
                            <a href="#" onclick="vtt2_abrirModalPdf(${dado.id})" title="Anexar PDF" id="vtt2_btnPdf_${dado.id}">
                                <i class="bx bxs-file-pdf text-danger font-size-18"></i>
                            </a>
                        </div>`;
            }
        }

        html += `</div>`;

        html += `
            </div>
            <div class="row classObservacaoFotografiaPdf" id="vtt2_divObservacaoFotografiaPdf_${dado.id}" data-vtt2_visita_tecnica_dado_id="${dado.id}" style="display: ${vtt2_divObservacaoFotografiaPdf_display};">
                <hr class="ms-3 my-2" />`;

        //Observação
        if ([1, 6, 7, 8, 9, 16, 17, 18, 19, 20, 21, 26, 27, 28, 29, 31].includes(opcoes)) {
            html += `<div class="col-12 col-md-4 text-success" id="vtt2_divObservacao_${dado.id}">
                    Observação<br>
                    <div class="col-12 text-black justify-content-start" id="vtt2_divObservacaoTexto_${dado.id}"> ${campo_observacao}</div>
                    <textarea id="vtt2_observacao_texto_${dado.id}" name="vtt2_observacao_texto_${dado.id}" style="display: none;">${campo_observacao}</textarea>
                </div>`;
        }

        //Imagens
        if ([3, 7, 10, 13, 14, 16, 19, 20, 22, 23, 25, 26, 27, 29, 30, 31].includes(opcoes)) {
            html += `<div class="col-12 col-md-4 text-primary" id="vtt2_divFotografia_${dado.id}">
                    Fotografia(s)<br>
                    <div class="col-12 d-flex flex-wrap text-black" id="vtt2_divFotografiaFotos_${dado.id}">`;

            for (let i = 1; i <= 3; i++) {
                //Dados e acertos'''''''''''''''''''''''''''''''''''''''''''''
                var campo_fotografia = '';
                var display_fotografia = '';

                if (i == 1) {
                    campo_fotografia = campo_fotografia_1;
                }
                if (i == 2) {
                    campo_fotografia = campo_fotografia_2;
                }
                if (i == 3) {
                    campo_fotografia = campo_fotografia_3;
                }

                if (campo_fotografia == '') {
                    display_fotografia = 'display: none;';
                }
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //html
                html += `
                    <div class="m-2 d-inline-block text-center position-relative container-foto" style="${display_fotografia}">
                        <button type="button" class="btn btn-sm btn-success position-absolute top-0 start-0 p-0 px-1 visualizar-foto" style="${display_fotografia}" data-vtt2_visita_tecnica_dado_id="${dado.id}" data-vtt2_slot="${i}"><i class="fas fa-search"></i></button>
                        <img src="${campo_fotografia}" class="img-thumbnail img-foto" style="width: 70px; height: 70px; object-fit: cover; ${display_fotografia}" name="vtt2_img_${dado.id}_${i}" id="vtt2_img_${dado.id}_${i}">
                        <input type="hidden" name="vtt2_fotografia_${dado.id}_${i}" id="vtt2_fotografia_${dado.id}_${i}" value="${campo_fotografia}">
                `;

                if (operacao != 'view') {
                    html += `
                        <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 p-0 px-1 remover-foto" style="${display_fotografia}" data-vtt2_visita_tecnica_dado_id="${dado.id}" data-vtt2_slot="${i}"><i class="fas fa-times"></i></button>
                    `;
                }

                html += `
                    </div>
                `;
            }

            html += `
                        </div>
                    </div>`;
        }

        //Pdf
        if ([2, 6, 10, 11, 12, 16, 17, 18, 22, 23, 24, 26, 27, 28, 30, 31].includes(opcoes)) {
            html += `<div class="col-12 col-md-4 text-danger" id="vtt2_divPdf_${dado.id}">
                    PDF(s)<br>
                    <div class="col-12 d-flex flex-wrap text-black" id="vtt2_divPdfPdfs_${dado.id}">`;

            for (let i = 1; i <= 3; i++) {
                //Dados e acertos'''''''''''''''''''''''''''''''''''''''''''''
                var campo_pdf = '';
                var display_pdf = '';

                if (i == 1) {
                    campo_pdf = campo_pdf_1;
                }
                if (i == 2) {
                    campo_pdf = campo_pdf_2;
                }
                if (i == 3) {
                    campo_pdf = campo_pdf_3;
                }

                if (campo_pdf == '') {
                    display_pdf = 'display: none;';
                }
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //html
                html += `
                    <div class="m-2 d-inline-block text-center position-relative container-pdf" style="${display_pdf}">
                        <button type="button" class="btn btn-sm btn-success position-absolute top-0 start-0 p-0 px-1 visualizar-pdf" style="${display_pdf}" data-vtt2_visita_tecnica_dado_id="${dado.id}" data-vtt2_slot="${i}"><i class="fas fa-search"></i></button>
                        <img src="${url_atual+'build/assets/images/image_pdf.png'}" class="img-thumbnail img-pdf" style="width: 70px; height: 70px; object-fit: cover; ${display_pdf}" name="vtt2_img_pdf_${dado.id}_${i}" id="vtt2_img_pdf_${dado.id}_${i}">
                        <input type="hidden" name="vtt2_pdf_${dado.id}_${i}" id="vtt2_pdf_${dado.id}_${i}" value="${campo_pdf}">
                `;

                if (operacao != 'view') {
                    html += `
                        <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 p-0 px-1 remover-pdf" style="${display_pdf}" data-vtt2_visita_tecnica_dado_id="${dado.id}" data-vtt2_slot="${i}"><i class="fas fa-times"></i></button>
                    `;
                }

                html += `
                    </div>
                `;
            }

            html += `
                        </div>
                    </div>`;
        }

        html += `</div>
        </div>
        </div>
        `;
    });

    return html;
}

document.addEventListener('DOMContentLoaded', function (event) {
    //Buscar dados do Responsável escolhido
    document.getElementById('vtt2_responsavel_funcionario_id').addEventListener('change', function() {
        if (document.getElementById('vtt2_responsavel_funcionario_id').value == '') {
            //Inputs
            document.getElementById('vtt2_responsavel_funcionario_nome').value = '';
            document.getElementById('vtt2_responsavel_funcionario_email').value = '';
        } else {
            var vtt2_responsavel_funcionario_id = document.getElementById('vtt2_responsavel_funcionario_id').value;

            //Route: funcionarios/id
            fetch('funcionarios/'+vtt2_responsavel_funcionario_id, {
                method: 'GET',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                var funcionario = data.success;

                //Inputs
                document.getElementById('vtt2_responsavel_funcionario_nome').value = funcionario.name;
                document.getElementById('vtt2_responsavel_funcionario_email').value = funcionario.email;
            }).catch(error => {
                alert('Erro VisitasTecnicas:'+error);
            });
        }
    });

    //Botões para visualizar e remover fotografia'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.addEventListener('click', function (e) {
        const btnRemover = e.target.closest('.remover-foto');
        if (btnRemover) {
            if (!confirm('Tem certeza que deseja remover esta fotografia?')) return;

            vtt2_removerFotografia(btnRemover);
            return; // para não disparar outros handlers acidentalmente
        }

        const btnVisualizar = e.target.closest('.visualizar-foto');
        if (btnVisualizar) {
            vtt2_visualizarFotografia(btnVisualizar);
        }
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botões para visualizar e remover pdfs'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.addEventListener('click', function (e) {
        const btnRemoverPdf = e.target.closest('.remover-pdf');
        if (btnRemoverPdf) {
            if (!confirm('Tem certeza que deseja remover este PDF?')) return;

            vtt2_removerPdf(btnRemoverPdf);
            return; // para não disparar outros handlers acidentalmente
        }

        const btnVisualizarPdf = e.target.closest('.visualizar-pdf');
        if (btnVisualizarPdf) {
            vtt2_visualizarPdf(btnVisualizarPdf);
        }
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
