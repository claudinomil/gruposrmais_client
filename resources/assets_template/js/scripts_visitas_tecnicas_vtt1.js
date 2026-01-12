let vtt1_visitaTecnicaDadoId = 0; //Id da Pergunta que está sendo manipulada na tabela visitas_tecnicas_dados

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

    //Campo: vtt1_responsavel_funcionario_id (requerido)
    if (validacao({op:1, value:document.getElementById('vtt1_responsavel_funcionario_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Responsável requerido.' + '<br>';
    } else {
        //Campo: vtt1_responsavel_funcionario_id (deve ser um número)
        if (validacao({op:4, value: document.getElementById('vtt1_responsavel_funcionario_id').value}) === false) {
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
function vtt1_formControle(op) {
    let informacoesGerais = document.getElementById('vtt1_divInformacoesGerais');
    let clientes = document.getElementById('vtt1_divClientes');
    let responsavel = document.getElementById('vtt1_divResponsavel');
    let finalizar = document.getElementById('vtt1_divFinaçizar');
    let perguntas = document.getElementById('vtt1_divPerguntas');

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

function vtt1_abrirModalObservacao(visita_tecnica_dado_id) {
    event.preventDefault();

    vtt1_visitaTecnicaDadoId = visita_tecnica_dado_id;

    document.getElementById('vtt1_modal_observacao_texto').value = document.getElementById('vtt1_observacao_texto_'+vtt1_visitaTecnicaDadoId).value;

    new bootstrap.Modal(document.getElementById('vtt1_modalObservacao')).show();

    //Posicionar elemento no topo
    vtt1_posicionarPergunta();
}

function vtt1_abrirModalFotografia(visita_tecnica_dado_id) {
    event.preventDefault();

    vtt1_visitaTecnicaDadoId = visita_tecnica_dado_id;

    document.getElementById('vtt1_modalFotografiaFile').value = '';

    new bootstrap.Modal(document.getElementById('vtt1_modalFotografia')).show();

    //Posicionar elemento no topo
    vtt1_posicionarPergunta();
}

function vtt1_abrirModalPdf(visita_tecnica_dado_id) {
    event.preventDefault();

    vtt1_visitaTecnicaDadoId = visita_tecnica_dado_id;

    document.getElementById('vtt1_modalPdfFile').value = '';

    new bootstrap.Modal(document.getElementById('vtt1_modalPdf')).show();

    //Posicionar elemento no topo
    vtt1_posicionarPergunta();
}

function vtt1_observacaoEnviar() {
    if (document.getElementById('vtt1_modal_observacao_texto').value == '') {
        if (!confirm('Tem certeza que deseja enviar uma Observação vazia?')) return;
    }

    document.getElementById('vtt1_divObservacaoTexto_'+vtt1_visitaTecnicaDadoId).innerHTML = document.getElementById('vtt1_modal_observacao_texto').value;
    document.getElementById('vtt1_observacao_texto_'+vtt1_visitaTecnicaDadoId).value = document.getElementById('vtt1_modal_observacao_texto').value;

    //Show classObservacaoFotografiaPdf
    vtt1_observacaoFotografiaPdfShow();

    //Fechar Modal
    bootstrap.Modal.getInstance(document.getElementById('vtt1_modalObservacao')).hide();

    //Salvar
    vtt1_salvarDadosPergunta(vtt1_visitaTecnicaDadoId);
}

function vtt1_fotografiaEnviar(fileInput) {
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
        const container = document.getElementById(`vtt1_divFotografiaFotos_${vtt1_visitaTecnicaDadoId}`);
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

        fetch('visitas_tecnicas/vtt1/pergunta/uploadFotografia/' + vtt1_visitaTecnicaDadoId + '/' + slotLivre, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    vtt1_fotografiaInserir(data.path);
                    vtt1_observacaoFotografiaPdfShow();
                } else {
                    alert('Erro ao enviar imagem.');
                }

                //Limpa input e fecha modal
                fileInput.value = '';
                bootstrap.Modal.getInstance(document.getElementById('vtt1_modalFotografia')).hide();
            })
            .catch(() => alert('Erro na comunicação com o servidor.'));
    }
}

function vtt1_pdfEnviar(fileInput) {
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
        const container = document.getElementById(`vtt1_divPdf_${vtt1_visitaTecnicaDadoId}`);
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

        fetch('visitas_tecnicas/vtt1/pergunta/uploadPdf/' + vtt1_visitaTecnicaDadoId + '/' + slotLivre, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    vtt1_pdfInserir(data.path);
                    vtt1_observacaoFotografiaPdfShow();
                } else {
                    alert('Erro ao enviar PDF.');
                }

                // Limpa input e fecha modal (se existir modal)
                fileInput.value = '';
                if (document.getElementById('vtt1_modalPdf')) {
                    bootstrap.Modal.getInstance(document.getElementById('vtt1_modalPdf')).hide();
                }
            })
            .catch(() => alert('Erro na comunicação com o servidor.'));
    }
}

function vtt1_fotografiaInserir(imagemUrl) {
    const container = document.getElementById(`vtt1_divFotografiaFotos_${vtt1_visitaTecnicaDadoId}`);
    if (!container) return;

    for (let i = 1; i <= 3; i++) {
        const img = document.getElementById(`vtt1_img_${vtt1_visitaTecnicaDadoId}_${i}`);
        const inputHidden = document.getElementById(`vtt1_fotografia_${vtt1_visitaTecnicaDadoId}_${i}`);

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
    vtt1_salvarDadosPergunta(vtt1_visitaTecnicaDadoId);
}

function vtt1_pdfInserir(pdfUrl) {
    const container = document.getElementById(`vtt1_divPdf_${vtt1_visitaTecnicaDadoId}`);
    if (!container) return;

    //URL
    var url_atual = window.location.protocol + '//' + window.location.host + '/';

    for (let i = 1; i <= 3; i++) {
        const embed = document.getElementById(`vtt1_img_pdf_${vtt1_visitaTecnicaDadoId}_${i}`);
        const inputHidden = document.getElementById(`vtt1_pdf_${vtt1_visitaTecnicaDadoId}_${i}`);

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
    vtt1_salvarDadosPergunta(vtt1_visitaTecnicaDadoId);
}

function vtt1_removerFotografia(button) {
    const visita_tecnica_dado_id = button.dataset.visita_tecnica_dado_id;
    const slot = button.dataset.slot;

    vtt1_visitaTecnicaDadoId = visita_tecnica_dado_id;

    fetch(`visitas_tecnicas/vtt1/pergunta/removerFotografia/${visita_tecnica_dado_id}/${slot}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const img = document.getElementById(`vtt1_img_${visita_tecnica_dado_id}_${slot}`);
                const input = document.getElementById(`vtt1_fotografia_${visita_tecnica_dado_id}_${slot}`);

                img.src = '';
                input.value = '';

                const container = button.closest('.container-foto');
                container.style.display = 'none';
                container.querySelector('.img-foto').style.display = 'none';
                container.querySelector('.visualizar-foto').style.display = 'none';
                container.querySelector('.remover-foto').style.display = 'none';

                //Salvar
                vtt1_salvarDadosPergunta(vtt1_visitaTecnicaDadoId);
            } else {
                alert('Erro ao remover imagem.');
            }
        })
        .catch(() => alert('Erro na comunicação com o servidor yyy.'));
}

function vtt1_removerPdf(button) {
    const visita_tecnica_dado_id = button.dataset.visita_tecnica_dado_id;
    const slot = button.dataset.slot;

    vtt1_visitaTecnicaDadoId = visita_tecnica_dado_id;

    fetch(`visitas_tecnicas/vtt1/pergunta/removerPdf/${visita_tecnica_dado_id}/${slot}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const embed = document.getElementById(`vtt1_img_pdf_${visita_tecnica_dado_id}_${slot}`);
                const input = document.getElementById(`vtt1_pdf_${visita_tecnica_dado_id}_${slot}`);

                embed.src = '';
                input.value = '';

                const container = button.closest('.container-pdf');
                container.style.display = 'none';
                container.querySelector('.img-pdf').style.display = 'none';
                container.querySelector('.visualizar-pdf').style.display = 'none';
                container.querySelector('.remover-pdf').style.display = 'none';

                //Salvar
                vtt1_salvarDadosPergunta(vtt1_visitaTecnicaDadoId);
            } else {
                alert('Erro ao remover PDF.');
            }
        })
        .catch(() => alert('Erro na comunicação com o servidor.'));
}

function vtt1_visualizarFotografia(button) {
    const visita_tecnica_dado_id = button.dataset.visita_tecnica_dado_id;
    const slot = button.dataset.slot;

    vtt1_visitaTecnicaDadoId = visita_tecnica_dado_id;

    const img = document.getElementById(`vtt1_img_${visita_tecnica_dado_id}_${slot}`);
    const imgUrl = img.src;

    const modalImg = document.getElementById('modalVisualizarImagemSrc');
    modalImg.src = imgUrl;

    const bootstrapModal = new bootstrap.Modal(document.getElementById('modalVisualizarImagem'));
    bootstrapModal.show();
}

function vtt1_visualizarPdf(button) {
    const visita_tecnica_dado_id = button.dataset.visita_tecnica_dado_id;
    const slot = button.dataset.slot;

    vtt1_visitaTecnicaDadoId = visita_tecnica_dado_id;

    const embed = document.getElementById(`vtt1_pdf_${visita_tecnica_dado_id}_${slot}`);
    const pdfUrl = embed.value;

    const modalPdf = document.getElementById('modalVisualizarPdfSrc');
    modalPdf.src = pdfUrl;

    const bootstrapModal = new bootstrap.Modal(document.getElementById('modalVisualizarPdf'));
    bootstrapModal.show();
}

function vtt1_salvarDadosPergunta(visita_tecnica_dado_id) {
    //Mostrar vtt1_divBloqueio para bloquear interações
    document.getElementById('vtt1_divBloqueio').style.display = 'block';

    vtt1_visitaTecnicaDadoId = visita_tecnica_dado_id;

    //Verificar Hiddens
    var visita_tecnica_id = document.getElementById('vtt1_visita_tecnica_id_'+vtt1_visitaTecnicaDadoId).value;
    var titulo = document.getElementById('vtt1_titulo_'+vtt1_visitaTecnicaDadoId).value;
    var subtitulo = document.getElementById('vtt1_subtitulo_'+vtt1_visitaTecnicaDadoId).value;
    var pergunta = document.getElementById('vtt1_pergunta_'+vtt1_visitaTecnicaDadoId).value;

    //Verificar Resposta
    var resposta = 0;

    if (document.getElementById('vtt1_resposta_'+vtt1_visitaTecnicaDadoId+'_1').checked) {resposta = 1;}
    if (document.getElementById('vtt1_resposta_'+vtt1_visitaTecnicaDadoId+'_2').checked) {resposta = 2;}
    if (document.getElementById('vtt1_resposta_'+vtt1_visitaTecnicaDadoId+'_3').checked) {resposta = 3;}

    //Verificar Quantidade
    var quantidade = document.getElementById('vtt1_quantidade_'+vtt1_visitaTecnicaDadoId).value;

    //Verificar Observação
    var observacao = document.getElementById('vtt1_observacao_texto_'+vtt1_visitaTecnicaDadoId).value;

    //Verificar Fotografias
    var fotografia_1 = document.getElementById('vtt1_fotografia_'+vtt1_visitaTecnicaDadoId+'_1').value;
    var fotografia_2 = document.getElementById('vtt1_fotografia_'+vtt1_visitaTecnicaDadoId+'_2').value;
    var fotografia_3 = document.getElementById('vtt1_fotografia_'+vtt1_visitaTecnicaDadoId+'_3').value;

    //Verificar PDFs
    var pdf_1 = document.getElementById('vtt1_pdf_'+vtt1_visitaTecnicaDadoId+'_1').value;
    var pdf_2 = document.getElementById('vtt1_pdf_'+vtt1_visitaTecnicaDadoId+'_2').value;
    var pdf_3 = document.getElementById('vtt1_pdf_'+vtt1_visitaTecnicaDadoId+'_3').value;

    //Montar dados e Salvar na tabela'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    let payload = {visita_tecnica_id, titulo, subtitulo, pergunta, resposta, quantidade, observacao, fotografia_1, fotografia_2, fotografia_3, pdf_1, pdf_2, pdf_3};

    //Acessar rota
    fetch('visitas_tecnicas/vtt1/pergunta/updatePergunta/'+vtt1_visitaTecnicaDadoId, {
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
        alert('Erro vtt1_salvarDadosPergunta: '+error);
    }).finally(() => {
        //Oculta vtt1_divBloqueio independentemente do resultado
        document.getElementById('vtt1_divBloqueio').style.display = 'none';
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Posiciona no topo
    vtt1_posicionarPergunta();
}

function vtt1_posicionarPergunta() {
    //Posicionar elemento no topo
    const elemento = document.getElementById('vtt1_divPergunta_' + vtt1_visitaTecnicaDadoId);
    const posicao = elemento.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
        top: posicao - 100,  // 100px acima do elemento
        behavior: 'smooth'   // rolagem suave
    });
}

function vtt1_observacaoFotografiaPdfShow() {
    const observacaoFotografiasPdfs = document.querySelectorAll('.classObservacaoFotografiaPdf');

    observacaoFotografiasPdfs.forEach(element => {
        const visita_tecnica_dado_id = element.getAttribute('data-visita_tecnica_dado_id');

        var observacao_texto = document.getElementById('vtt1_observacao_texto_'+visita_tecnica_dado_id).value;
        var fotografia_1 = document.getElementById('vtt1_fotografia_'+visita_tecnica_dado_id+'_1').value;
        var fotografia_2 = document.getElementById('vtt1_fotografia_'+visita_tecnica_dado_id+'_2').value;
        var fotografia_3 = document.getElementById('vtt1_fotografia_'+visita_tecnica_dado_id+'_3').value;
        var pdf_1 = document.getElementById('vtt1_pdf_'+visita_tecnica_dado_id+'_1').value;
        var pdf_2 = document.getElementById('vtt1_pdf_'+visita_tecnica_dado_id+'_2').value;
        var pdf_3 = document.getElementById('vtt1_pdf_'+visita_tecnica_dado_id+'_3').value;

        if (observacao_texto != '' || fotografia_1 != '' || fotografia_2 != '' || fotografia_3 != '' || pdf_1 != '' || pdf_2 != '' || pdf_3 != '') {
            document.getElementById('vtt1_divObservacaoFotografiaPdf_' + visita_tecnica_dado_id).style.display = '';
        } else {
            document.getElementById('vtt1_divObservacaoFotografiaPdf_'+visita_tecnica_dado_id).style.display = 'none';
        }
    });
}

function vtt1_gerarHtmlPerguntas(visitas_tecnicas_dados) {
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

        //Verificar se deixa aberto a vtt1_divObservacaoFotografiaPdf_''''
        var vtt1_divObservacaoFotografiaPdf_display = '';

        if (campo_observacao == '' && campo_fotografia_1 == '' && campo_fotografia_2 == '' && campo_fotografia_3 == '' && campo_pdf_1 == '' && campo_pdf_2 == '' && campo_pdf_3 == '') {
            var vtt1_divObservacaoFotografiaPdf_display = 'none';
        }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Html
        html += `<div class="row pb-3">
            <input type="hidden" name="vtt1_visita_tecnica_id_${dado.id}" id="vtt1_visita_tecnica_id_${dado.id}" value="${dado.visita_tecnica_id}">
            <input type="hidden" name="vtt1_titulo_${dado.id}" id="vtt1_titulo_${dado.id}" value="${dado.titulo}">
            <input type="hidden" name="vtt1_subtitulo_${dado.id}" id="vtt1_subtitulo_${dado.id}" value="${dado.subtitulo}">
            <input type="hidden" name="vtt1_pergunta_${dado.id}" id="vtt1_pergunta_${dado.id}" value="${dado.pergunta}">`;

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

            html += `<div class="row col-12 bg-light ms-3 py-2" id="vtt1_divPergunta_${dado.id}">
                        <div class="col-12 col-md-6">${contadorTitulo}.${String.fromCharCode(64 + contadorSubtitulo)}.${contadorPergunta}. ${dado.pergunta}</div>`;
        } else {
            contadorPergunta++;

            html += `<div class="row col-12 bg-light ms-3 py-2 px-0" id="vtt1_divPergunta_${dado.id}">
                        <div class="col-12 col-md-6">${contadorTitulo}.${contadorPergunta}. ${dado.pergunta}</div>`;
        }

        html += `<div class="col-12 col-md-6">
                    <hr class="d-block d-md-none my-2">`;

        html += `<div class="d-flex flex-wrap justify-content-center justify-content-xl-end">`;

        //Respostas
        if ([4, 8, 11, 13, 15, 17, 19, 21, 22, 24, 25, 26, 28, 29, 30, 31].includes(opcoes)) {
            html += `<div class="form-check-success text-start flex-grow-1 px-1">
                        <input class="form-check-input" type="radio" onclick="vtt1_salvarDadosPergunta(${dado.id})" name="vtt1_resposta_${dado.id}" id="vtt1_resposta_${dado.id}_1" ${campo_resposta_1} ${campo_resposta_disabled}>
                        <label class="form-check-label" for="vtt1_resposta_${dado.id}_1">Sim</label>
                    </div>
                    <div class="form-check-success text-start flex-grow-1 px-1">
                        <input class="form-check-input" type="radio" onclick="vtt1_salvarDadosPergunta(${dado.id})" name="vtt1_resposta_${dado.id}" id="vtt1_resposta_${dado.id}_2" ${campo_resposta_2} ${campo_resposta_disabled}>
                        <label class="form-check-label" for="vtt1_resposta_${dado.id}_2">Não</label>
                    </div>
                    <div class="form-check-success text-start flex-grow-1 px-1">
                        <input class="form-check-input" type="radio" onclick="vtt1_salvarDadosPergunta(${dado.id})" name="vtt1_resposta_${dado.id}" id="vtt1_resposta_${dado.id}_3" ${campo_resposta_3} ${campo_resposta_disabled}>
                        <label class="form-check-label" for="vtt1_resposta_${dado.id}_3">NI</label>
                    </div>`;
        }

        //Quantidade
        if ([5, 9, 12, 14, 15, 18, 20, 21, 23, 24, 25, 27, 28, 29, 30, 31].includes(opcoes)) {
            html += `<div class="form-group text-center flex-grow-1 px-1">
                        <label class="form-label small">Qtd: </label>
                        <input type="text" class="form-control form-control-sm d-inline-block text-center" onchange="vtt1_salvarDadosPergunta(${dado.id})" name="vtt1_quantidade_${dado.id}" id="vtt1_quantidade_${dado.id}" value="${dado.quantidade}" placeholder="Qtd" min="0" max="999" oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 3)" style="width: 40px;" ${campo_quantidade_disabled}>
                    </div>`;
        }

        if (operacao != 'view') {
            //Observação
            if ([1, 6, 7, 8, 9, 16, 17, 18, 19, 20, 21, 26, 27, 28, 29, 31].includes(opcoes)) {
                html += `<div class="text-end flex-grow-1 px-1">
                            <a href="#" onclick="vtt1_abrirModalObservacao(${dado.id})" title="Anexar Observação" id="vtt1_btnObservacao_${dado.id}">
                                <i class="bx bx-detail text-success font-size-18"></i>
                            </a>
                        </div>`;
            }

            //Imagens
            if ([3, 7, 10, 13, 14, 16, 19, 20, 22, 23, 25, 26, 27, 29, 30, 31].includes(opcoes)) {
                html += `<div class="text-end flex-grow-1 px-1">
                            <a href="#" onclick="vtt1_abrirModalFotografia(${dado.id})" title="Anexar Fotografia" id="vtt1_btnFotografia_${dado.id}">
                                <i class="bx bxs-photo-album text-primary font-size-18"></i>
                            </a>
                        </div>`;
            }

            //Pdf
            if ([2, 6, 10, 11, 12, 16, 17, 18, 22, 23, 24, 26, 27, 28, 30, 31].includes(opcoes)) {
                html += `<div class="text-end flex-grow-1 px-1">
                            <a href="#" onclick="vtt1_abrirModalPdf(${dado.id})" title="Anexar PDF" id="vtt1_btnPdf_${dado.id}">
                                <i class="bx bxs-file-pdf text-danger font-size-18"></i>
                            </a>
                        </div>`;
            }
        }

        html += `</div>`;

        html += `
            </div>
            <div class="row classObservacaoFotografiaPdf" id="vtt1_divObservacaoFotografiaPdf_${dado.id}" data-visita_tecnica_dado_id="${dado.id}" style="display: ${vtt1_divObservacaoFotografiaPdf_display};">
                <hr class="ms-3 my-2" />`;

        //Observação
        if ([1, 6, 7, 8, 9, 16, 17, 18, 19, 20, 21, 26, 27, 28, 29, 31].includes(opcoes)) {
            html += `<div class="col-12 col-md-4 text-success" id="vtt1_divObservacao_${dado.id}">
                    Observação<br>
                    <div class="col-12 text-black justify-content-start" id="vtt1_divObservacaoTexto_${dado.id}"> ${campo_observacao}</div>
                    <textarea id="vtt1_observacao_texto_${dado.id}" name="vtt1_observacao_texto_${dado.id}" style="display: none;">${campo_observacao}</textarea>
                </div>`;
        }

        //Imagens
        if ([3, 7, 10, 13, 14, 16, 19, 20, 22, 23, 25, 26, 27, 29, 30, 31].includes(opcoes)) {
            html += `<div class="col-12 col-md-4 text-primary" id="vtt1_divFotografia_${dado.id}">
                    Fotografia(s)<br>
                    <div class="col-12 d-flex flex-wrap text-black" id="vtt1_divFotografiaFotos_${dado.id}">`;

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
                        <button type="button" class="btn btn-sm btn-success position-absolute top-0 start-0 p-0 px-1 visualizar-foto" style="${display_fotografia}" data-visita_tecnica_dado_id="${dado.id}" data-slot="${i}"><i class="fas fa-search"></i></button>
                        <img src="${campo_fotografia}" class="img-thumbnail img-foto" style="width: 70px; height: 70px; object-fit: cover; ${display_fotografia}" name="vtt1_img_${dado.id}_${i}" id="vtt1_img_${dado.id}_${i}">
                        <input type="hidden" name="vtt1_fotografia_${dado.id}_${i}" id="vtt1_fotografia_${dado.id}_${i}" value="${campo_fotografia}">
                `;

                if (operacao != 'view') {
                    html += `
                        <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 p-0 px-1 remover-foto" style="${display_fotografia}" data-visita_tecnica_dado_id="${dado.id}" data-slot="${i}"><i class="fas fa-times"></i></button>
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
            html += `<div class="col-12 col-md-4 text-danger" id="vtt1_divPdf_${dado.id}">
                    PDF(s)<br>
                    <div class="col-12 d-flex flex-wrap text-black" id="vtt1_divPdfPdfs_${dado.id}">`;

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
                        <button type="button" class="btn btn-sm btn-success position-absolute top-0 start-0 p-0 px-1 visualizar-pdf" style="${display_pdf}" data-visita_tecnica_dado_id="${dado.id}" data-slot="${i}"><i class="fas fa-search"></i></button>
                        <img src="${url_atual+'build/assets/images/image_pdf.png'}" class="img-thumbnail img-pdf" style="width: 70px; height: 70px; object-fit: cover; ${display_pdf}" name="vtt1_img_pdf_${dado.id}_${i}" id="vtt1_img_pdf_${dado.id}_${i}">
                        <input type="hidden" name="vtt1_pdf_${dado.id}_${i}" id="vtt1_pdf_${dado.id}_${i}" value="${campo_pdf}">
                `;

                if (operacao != 'view') {
                    html += `
                        <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 p-0 px-1 remover-pdf" style="${display_pdf}" data-visita_tecnica_dado_id="${dado.id}" data-slot="${i}"><i class="fas fa-times"></i></button>
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

async function vtt1_visitaTecnicaGerarPdf(visita_tecnica_id=0, traducao='pt', vt_cs=1) {
    try {
        //Aviso Temporário na tela'''''''''''''''''''''''''''''''''''''''''''''''''''''
        var loadingAvisoTmp = document.getElementById('loading-aviso-tmp');
        loadingAvisoTmp.innerHTML = 'Processando, por favor aguarde...';
        loadingAvisoTmp.style.display = 'block';
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        await vtt1_gerarPDF(visita_tecnica_id, traducao, vt_cs);
    } catch (e) {
        alert("Erro ao gerar PDF: " + e.message);
    } finally {
        //Aviso Temporário na tela'''''''''''''''''''''''''''''''''''''''''''''''''''''
        var loadingAvisoTmp = document.getElementById('loading-aviso-tmp');
        loadingAvisoTmp.innerHTML = '';
        loadingAvisoTmp.style.display = 'none';
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }
}

async function vtt1_gerarPDF(visita_tecnica_id=0, traducao='pt', vt_cs) {
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

document.addEventListener('DOMContentLoaded', function(event) {
    //Buscar dados do Responsável escolhido
    document.getElementById('vtt1_responsavel_funcionario_id').addEventListener('change', function() {
        if (document.getElementById('vtt1_responsavel_funcionario_id').value == '') {
            //Inputs
            document.getElementById('vtt1_responsavel_funcionario_nome').value = '';
            document.getElementById('vtt1_responsavel_funcionario_email').value = '';
        } else {
            var vtt1_responsavel_funcionario_id = document.getElementById('vtt1_responsavel_funcionario_id').value;

            //Route: funcionarios/id
            fetch('funcionarios/'+vtt1_responsavel_funcionario_id, {
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
                document.getElementById('vtt1_responsavel_funcionario_nome').value = funcionario.name;
                document.getElementById('vtt1_responsavel_funcionario_email').value = funcionario.email;
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

            vtt1_removerFotografia(btnRemover);
            return; // para não disparar outros handlers acidentalmente
        }

        const btnVisualizar = e.target.closest('.visualizar-foto');
        if (btnVisualizar) {
            vtt1_visualizarFotografia(btnVisualizar);
        }
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botões para visualizar e remover pdfs'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.addEventListener('click', function (e) {
        const btnRemoverPdf = e.target.closest('.remover-pdf');
        if (btnRemoverPdf) {
            if (!confirm('Tem certeza que deseja remover este PDF?')) return;

            vtt1_removerPdf(btnRemoverPdf);
            return; // para não disparar outros handlers acidentalmente
        }

        const btnVisualizarPdf = e.target.closest('.visualizar-pdf');
        if (btnVisualizarPdf) {
            vtt1_visualizarPdf(btnVisualizarPdf);
        }
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
