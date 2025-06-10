let visitaTecnicaDadoId = 0; //Id da Pergunta que está sendo manipulada na tabela visitas_tecnicas_dados

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

function vtt1_abrirModalObservacao(visita_tecnica_dado_id) {
    event.preventDefault();

    visitaTecnicaDadoId = visita_tecnica_dado_id;

    tinymce.get('vtt1_modal_observacao_texto').setContent(document.getElementById('vtt1_observacao_texto_'+visitaTecnicaDadoId).value);

    new bootstrap.Modal(document.getElementById('vtt1_modalObservacao')).show();

    //Posicionar elemento no topo
    vtt1_posicionarPergunta();
}

function vtt1_abrirModalFotografia(visita_tecnica_dado_id) {
    event.preventDefault();

    visitaTecnicaDadoId = visita_tecnica_dado_id;

    document.getElementById('vtt1_modalFotografiaFile').value = '';

    new bootstrap.Modal(document.getElementById('vtt1_modalFotografia')).show();

    //Posicionar elemento no topo
    vtt1_posicionarPergunta();
}

function vtt1_observacaoEnviar() {
    if (tinymce.get('vtt1_modal_observacao_texto').getContent() == '') {
        if (!confirm('Tem certeza que deseja enviar uma Observação vazia?')) return;
    }

    document.getElementById('vtt1_divObservacaoTexto_'+visitaTecnicaDadoId).innerHTML = tinymce.get('vtt1_modal_observacao_texto').getContent();
    document.getElementById('vtt1_observacao_texto_'+visitaTecnicaDadoId).value = tinymce.get('vtt1_modal_observacao_texto').getContent();

    //Show classObservacaoFotografia
    vtt1_observacaoFotografiaShow();

    //Fechar Modal
    bootstrap.Modal.getInstance(document.getElementById('vtt1_modalObservacao')).hide();

    //Salvar
    vtt1_salvarDadosPergunta();
}

function vtt1_fotografiaEnviar(fileInput) {
    //const fileInput = document.getElementById('vtt1_modalFotografiaFile');
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Nenhuma imagem selecionada.');
        return;
    }

    const file = files[0];

    //Encontra o próximo slot livre
    const container = document.getElementById(`vtt1_divFotografiaFotos_${visitaTecnicaDadoId}`);
    const fotoContainers = container.querySelectorAll('.container-foto');

    let slotLivre = null;

    for (let i = 0; i < fotoContainers.length; i++) {
        const inputHidden = fotoContainers[i].querySelector('input[type="hidden"]');
        if (!inputHidden.value) {
            slotLivre = i + 1; // slots começam em 1
            break;
        }
    }

    if (!slotLivre) {
        alert('Todos os slots estão preenchidos.');
        return;
    }

    //Upload Fotografia
    const formData = new FormData();
    formData.append('foto', file);

    fetch('visitas_tecnicas/pergunta/uploadFotografia/'+visitaTecnicaDadoId+'/'+slotLivre, {
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
                vtt1_observacaoFotografiaShow();
            } else {
                alert('Erro ao enviar imagem.');
            }

            //Limpa o input para permitir selecionar o mesmo arquivo novamente
            fileInput.value = '';

            //Fechar Modal
            bootstrap.Modal.getInstance(document.getElementById('vtt1_modalFotografia')).hide();
        })
        .catch(() => alert('Erro na comunicação com o servidor hhh.'));
}

// function vtt1_fotografiaEnviarDireto(input) {
//     const files = input.files;
//
//     if (files.length === 0) {
//         alert('Nenhuma imagem capturada.');
//         return;
//     }
//
//     const file = files[0];
//
//     // Mesmo processo de slots
//     const container = document.getElementById(`vtt1_divFotografiaFotos_${visitaTecnicaDadoId}`);
//     const fotoContainers = container.querySelectorAll('.container-foto');
//
//     let slotLivre = null;
//
//     for (let i = 0; i < fotoContainers.length; i++) {
//         const inputHidden = fotoContainers[i].querySelector('input[type="hidden"]');
//         if (!inputHidden.value) {
//             slotLivre = i + 1;
//             break;
//         }
//     }
//
//     if (!slotLivre) {
//         alert('Todos os slots estão preenchidos.');
//         return;
//     }
//
//     // Upload
//     const formData = new FormData();
//     formData.append('foto', file);
//
//     fetch('visitas_tecnicas/pergunta/uploadFotografia/' + visitaTecnicaDadoId + '/' + slotLivre, {
//         method: 'POST',
//         headers: {
//             'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
//         },
//         body: formData
//     })
//         .then(res => res.json())
//         .then(data => {
//             if (data.success) {
//                 vtt1_fotografiaInserir(data.path);
//                 vtt1_observacaoFotografiaShow();
//             } else {
//                 alert('Erro ao enviar imagem.');
//             }
//
//             input.value = ''; // Limpar para poder tirar novamente
//         })
//         .catch(() => alert('Erro na comunicação com o servidor.'));
// }

function vtt1_fotografiaInserir(imagemUrl) {
    const container = document.getElementById(`vtt1_divFotografiaFotos_${visitaTecnicaDadoId}`);
    if (!container) return;

    for (let i = 1; i <= 3; i++) {
        const img = document.getElementById(`vtt1_img_${visitaTecnicaDadoId}_${i}`);
        const inputHidden = document.getElementById(`vtt1_fotografia_${visitaTecnicaDadoId}_${i}`);

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
    vtt1_salvarDadosPergunta();
}

function vtt1_removerFotografia(button) {
    const visita_tecnica_dado_id = button.dataset.visita_tecnica_dado_id;
    const slot = button.dataset.slot;

    visitaTecnicaDadoId = visita_tecnica_dado_id;

    fetch(`visitas_tecnicas/pergunta/removerFotografia/${visita_tecnica_dado_id}/${slot}`, {
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
                vtt1_salvarDadosPergunta();
            } else {
                alert('Erro ao remover imagem.');
            }
        })
        .catch(() => alert('Erro na comunicação com o servidor yyy.'));
}

function vtt1_visualizarFotografia(button) {
    const visita_tecnica_dado_id = button.dataset.visita_tecnica_dado_id;
    const slot = button.dataset.slot;

    visitaTecnicaDadoId = visita_tecnica_dado_id;

    const img = document.getElementById(`vtt1_img_${visita_tecnica_dado_id}_${slot}`);
    const imgUrl = img.src;

    const modalImg = document.getElementById('modalVisualizarImagemSrc');
    modalImg.src = imgUrl;

    const bootstrapModal = new bootstrap.Modal(document.getElementById('modalVisualizarImagem'));
    bootstrapModal.show();
}

function vtt1_salvarDadosPergunta(visita_tecnica_dado_id=0) {
    //Mostrar vtt1_divBloqueio para bloquear interações
    document.getElementById('vtt1_divBloqueio').style.display = 'block';

    //visitaTecnicaDadoId
    if (visita_tecnica_dado_id != 0) {visitaTecnicaDadoId = visita_tecnica_dado_id;}

    //Verificar Resposta
    var resposta = 0;

    if (document.getElementById('vtt1_resposta_'+visitaTecnicaDadoId+'_1').checked) {resposta = 1;}
    if (document.getElementById('vtt1_resposta_'+visitaTecnicaDadoId+'_2').checked) {resposta = 2;}
    if (document.getElementById('vtt1_resposta_'+visitaTecnicaDadoId+'_3').checked) {resposta = 3;}

    //Verificar Observação
    var observacao = document.getElementById('vtt1_observacao_texto_'+visitaTecnicaDadoId).value;

    //Verificar Fotografias
    var fotografia_1 = document.getElementById('vtt1_fotografia_'+visitaTecnicaDadoId+'_1').value;
    var fotografia_2 = document.getElementById('vtt1_fotografia_'+visitaTecnicaDadoId+'_2').value;
    var fotografia_3 = document.getElementById('vtt1_fotografia_'+visitaTecnicaDadoId+'_3').value;

    //Montar dados e Salvar na tabela'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    let payload = {resposta, observacao, fotografia_1, fotografia_2, fotografia_3};

    //Acessar rota
    fetch('visitas_tecnicas/pergunta/updatePergunta/'+visitaTecnicaDadoId, {
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
    const elemento = document.getElementById('vtt1_divPergunta_' + visitaTecnicaDadoId);
    const posicao = elemento.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
        top: posicao - 100,  // 100px acima do elemento
        behavior: 'smooth'   // rolagem suave
    });
}

function vtt1_observacaoFotografiaShow() {
    const observacoesFotos = document.querySelectorAll('.classObservacaoFotografia');

    observacoesFotos.forEach(element => {
        const visita_tecnica_dado_id = element.getAttribute('data-visita_tecnica_dado_id');

        var observacao_texto = document.getElementById('vtt1_observacao_texto_'+visita_tecnica_dado_id).value;
        var fotografia_1 = document.getElementById('vtt1_fotografia_'+visita_tecnica_dado_id+'_1').value;
        var fotografia_2 = document.getElementById('vtt1_fotografia_'+visita_tecnica_dado_id+'_2').value;
        var fotografia_3 = document.getElementById('vtt1_fotografia_'+visita_tecnica_dado_id+'_3').value;

        if (observacao_texto != '' || fotografia_1 != '' || fotografia_2 != '' || fotografia_3 != '') {
            document.getElementById('vtt1_divObservacaoFotografia_' + visita_tecnica_dado_id).style.display = '';
        } else {
            document.getElementById('vtt1_divObservacaoFotografia_'+visita_tecnica_dado_id).style.display = 'none';
        }
    });
}

function vtt1_gerarHtmlPerguntas(visitas_tecnicas_dados) {
    let html = '<h5 class="text-primary"><i class="fas fa-question"></i> Responda as Perguntas</h5>';
    let contadorTitulo = 0;
    let contadorSubtitulo = 0;
    let contadorPergunta = 0;
    let tituloAtual = null;
    let subtituloAtual = null;

    let operacao = document.getElementById('frm_operacao').value;

    visitas_tecnicas_dados.forEach(dado => {
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

        //Verificar se deixa aberto a vtt1_divObservacaoFotografia_'''''''
        var vtt1_divObservacaoFotografia_display = '';

        if (campo_observacao == '' && campo_fotografia_1 == '' && campo_fotografia_2 == '' && campo_fotografia_3 == '') {
            var vtt1_divObservacaoFotografia_display = 'none';
        }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Html
        html += '<div class="row pb-3">';

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

            html += `
                <div class="row col-12 bg-light ms-3 py-2">
                    <div class="col-12 col-md-7">${contadorTitulo}.${String.fromCharCode(64 + contadorSubtitulo)}.${contadorPergunta}. ${dado.pergunta}</div>
            `;
        } else {
            contadorPergunta++;

            html += `
                <div class="row col-12 bg-light ms-3 py-2 px-0" id="vtt1_divPergunta_${dado.id}">
                    <div class="col-12 col-md-7">${contadorTitulo}.${contadorPergunta}. ${dado.pergunta}</div>
            `;
        }

        html += `
            <div class="col-12 col-md-5">
                <hr class="d-block d-md-none my-2">
                <div class="row col-12 d-flex justify-content-center justify-content-xl-end">
                    <div class="form-check-success col-4 text-center">
                        <input class="form-check-input" type="radio" onclick="vtt1_salvarDadosPergunta(${dado.id})" name="vtt1_resposta_${dado.id}" id="vtt1_resposta_${dado.id}_1" ${campo_resposta_1} ${campo_resposta_disabled}>
                        <label class="form-check-label" for="vtt1_resposta_${dado.id}_1">Sim</label>
                    </div>
                    <div class="form-check-success col-4 text-center">
                        <input class="form-check-input" type="radio" onclick="vtt1_salvarDadosPergunta(${dado.id})" name="vtt1_resposta_${dado.id}" id="vtt1_resposta_${dado.id}_2" ${campo_resposta_2} ${campo_resposta_disabled}>
                        <label class="form-check-label" for="vtt1_resposta_${dado.id}_2">Não</label>
                    </div>
                    <div class="form-check-success col-4 text-center">
                        <input class="form-check-input" type="radio" onclick="vtt1_salvarDadosPergunta(${dado.id})" name="vtt1_resposta_${dado.id}" id="vtt1_resposta_${dado.id}_3" ${campo_resposta_3} ${campo_resposta_disabled}>
                        <label class="form-check-label" for="vtt1_resposta_${dado.id}_3">NI</label>
                    </div>
                </div>
        `;

        if (operacao != 'view') {
            html += `<hr class="d-block my-2">
                    <div class="col-12 d-flex justify-content-center justify-content-xl-end">
                        <div class="col-6 text-center">
                            <a href="#" onclick="vtt1_abrirModalObservacao(${dado.id})" title="Anexar Observação" id="vtt1_btnObservacao_${dado.id}">
                                <i class="bx bx-detail text-success font-size-18"></i>
                            </a>
                        </div>
                        <div class="col-6 text-center">
                            <a href="#" onclick="vtt1_abrirModalFotografia(${dado.id})" title="Anexar Fotografia" id="vtt1_btnFotografia_${dado.id}">
                                <i class="bx bxs-photo-album text-primary font-size-18"></i>
                            </a>
                        </div>
                    </div>
            `;
        }

        html += `
            </div>

            <div class="row classObservacaoFotografia" id="vtt1_divObservacaoFotografia_${dado.id}" data-visita_tecnica_dado_id="${dado.id}" style="display: ${vtt1_divObservacaoFotografia_display};">
                <hr class="ms-3" />
                <div class="col-12 col-md-7 text-success">
                    Observação<br>
                    <div class="col-12 text-black justify-content-start" id="vtt1_divObservacaoTexto_${dado.id}"> ${campo_observacao}</div>
                    <textarea id="vtt1_observacao_texto_${dado.id}" name="vtt1_observacao_texto_${dado.id}" style="display: none;">${campo_observacao}</textarea>
                </div>
                <div class="col-12 col-md-5 text-primary">
                    Fotografia(s)<br>
                    <div class="col-12 d-flex flex-wrap text-black" id="vtt1_divFotografiaFotos_${dado.id}">
        `;

        for (let i = 1; i <= 3; i++) {
            //Dados e acertos'''''''''''''''''''''''''''''''''''''''''''''
            var campo_fotografia = '';
            var display_fotografia = '';

            if (i == 1) {campo_fotografia = campo_fotografia_1;}
            if (i == 2) {campo_fotografia = campo_fotografia_2;}
            if (i == 3) {campo_fotografia = campo_fotografia_3;}

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
                </div>
            </div>
        </div>
        </div>
        `;
    });

    return html;
}

document.addEventListener('DOMContentLoaded', function(event) {
    //Editor de texto'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    tinymce.init({
        selector:"textarea#vtt1_modal_observacao_texto",
        height:200,
        plugins:["advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker","searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking","save table contextmenu directionality emoticons template paste textcolor"],
        toolbar:"insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons",
        menubar: 'edit view insert format table'
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

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
});















































































































// function vtt1_abrirModalFotografia(visita_tecnica_dado_id) {
//     event.preventDefault();
//
//     visitaTecnicaDadoId = visita_tecnica_dado_id;
//
//     document.getElementById('vtt1_modalFotografiaFile').value = '';
//
//     new bootstrap.Modal(document.getElementById('vtt1_modalFotografia')).show();
//
//     //Posicionar elemento no topo
//     vtt1_posicionarPergunta();
// }
//
// function vtt1_fotografiaEnviar() {
//     const fileInput = document.getElementById('vtt1_modalFotografiaFile');
//     const files = fileInput.files;
//
//     if (files.length === 0) {
//         alert('Nenhuma imagem selecionada.');
//         return;
//     }
//
//     const file = files[0];
//
//     //Encontra o próximo slot livre
//     const container = document.getElementById(`vtt1_divFotografiaFotos_${visitaTecnicaDadoId}`);
//     const fotoContainers = container.querySelectorAll('.container-foto');
//
//     let slotLivre = null;
//
//     for (let i = 0; i < fotoContainers.length; i++) {
//         const inputHidden = fotoContainers[i].querySelector('input[type="hidden"]');
//         if (!inputHidden.value) {
//             slotLivre = i + 1; // slots começam em 1
//             break;
//         }
//     }
//
//     if (!slotLivre) {
//         alert('Todos os slots estão preenchidos.');
//         return;
//     }
//
//     //Upload Fotografia
//     const formData = new FormData();
//     formData.append('foto', file);
//
//     fetch('visitas_tecnicas/pergunta/uploadFotografia/'+visitaTecnicaDadoId+'/'+slotLivre, {
//         method: 'POST',
//         headers: {
//             'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
//         },
//         body: formData
//     })
//         .then(res => res.json())
//         .then(data => {
//             if (data.success) {
//                 vtt1_fotografiaInserir(data.path);
//             } else {
//                 alert('Erro ao enviar imagem.');
//             }
//
//             //Limpa o input para permitir selecionar o mesmo arquivo novamente
//             fileInput.value = '';
//
//             //Show classObservacaoFotografia
//             vtt1_observacaoFotografiaShow();
//
//             //Fechar Modal
//             bootstrap.Modal.getInstance(document.getElementById('vtt1_modalFotografia')).hide();
//         })
//         .catch(() => alert('Erro na comunicação com o servidor.'));
// }
//
// function vtt1_fotografiaInserir(imagemUrl) {
//     const container = document.getElementById(`vtt1_divFotografiaFotos_${visitaTecnicaDadoId}`);
//     if (!container) return;
//
//     for (let i = 1; i <= 3; i++) {
//         const img = document.getElementById(`vtt1_img_${visitaTecnicaDadoId}_${i}`);
//         const inputHidden = document.getElementById(`vtt1_fotografia_${visitaTecnicaDadoId}_${i}`);
//
//         if (inputHidden && !inputHidden.value) {
//             img.src = imagemUrl;
//             inputHidden.value = imagemUrl;
//
//             const containerDiv = img.closest('.container-foto');
//             containerDiv.style.display = 'block';
//             containerDiv.querySelector('.img-foto').style.display = 'block';
//             containerDiv.querySelector('.visualizar-foto').style.display = 'block';
//             containerDiv.querySelector('.remover-foto').style.display = 'block';
//
//             break;
//         }
//     }
//
//     //Salvar
//     vtt1_salvarDadosPergunta();
// }
//
// <div class="modal fade" id="vtt1_modalFotografia" tabindex="-1" role="dialog" aria-labelledby="vtt1_modalFotografiaTitle" aria-hidden="true">
//     <div class="modal-dialog modal-dialog-centered" role="document">
//     <div class="modal-content">
//     <div class="modal-header">
//     <h5 class="modal-title" id="vtt1_modalFotografiaTitle">Fotografia</h5>
//     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//     </div>
//     <div class="modal-body">
//     <input type="file" id="vtt1_modalFotografiaFile" accept="image/*">
//     </div>
//     <div class="modal-footer">
//     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
//     <button type="button" class="btn btn-primary" onclick="vtt1_fotografiaEnviar();">Enviar <i class="fab fa-telegram-plane ms-1"></i></button>
// </div>
// </div>
// </div>
// </div>
//
// A função vtt1_abrirModalFotografia: abre um modal "vtt1_modalFotografia" para buscar uma fotografia no proprio PC, com um input file;
//
// A função vtt1_fotografiaEnviar: pega a imagem do input file faz upload para a pasta "build/assets/images/visitas_tecnicas" e depois de confirmado o upload chama a função vtt1_fotografiaInserir;
//
// A função vtt1_fotografiaInserir: insere a imagem em um slot vazio;
//
// Agora preciso que ao abrir o modal "vtt1_modalFotografia" para buscar a imagem no PC, sirva tambem se o usuário estiver no celular para buscar no armazenamento do celular e que tambem coloque um botão ao lado do input file para tirar foto e fazer os outros procedimentos, colocar no slot e fazer upload.
