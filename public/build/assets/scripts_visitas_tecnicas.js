function validar_frm_visitas_tecnicas() {
    if (document.getElementById('visita_tecnica_tipo_id').value == 1) {return vtt1_validar_frm_visitas_tecnicas();}
    if (document.getElementById('visita_tecnica_tipo_id').value == 2) {return vtt2_validar_frm_visitas_tecnicas();}
}

function gerar_visita_tecnica(visita_tecnica_id=0, visita_tecnica_tipo_id=0, traducao='pt', vt_cs=1) {
    if (visita_tecnica_id == 0) {visita_tecnica_id = document.getElementById('registro_id').value;}
    if (visita_tecnica_tipo_id == 0) {visita_tecnica_tipo_id = document.getElementById('visita_tecnica_tipo_id').value;}

    if (visita_tecnica_tipo_id == 1) {vtt1_visitaTecnicaGerarPdf(visita_tecnica_id, traducao, vt_cs);}
    if (visita_tecnica_tipo_id == 2) {vtt2_visita_tecnica_gerar_pdf(visita_tecnica_id, traducao, vt_cs);}
}

async function executarVisitaTecnica(cliente_id, visita_tecnica_tipo_id, vt_cs) {
    try {
        const response = await fetch('visitas_tecnicas/' + cliente_id + '/' + visita_tecnica_tipo_id + '/' + vt_cs, {
            method: 'POST',
            headers: {
                'REQUEST-ORIGIN': 'fetch',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        });

        const data = await response.json();

        if (data.success) {
            return data.visita_tecnica_id;
        } else if (data.error_validation) {
            let message = '<div class="pt-3">';
            const validations = data.error_validation;

            for (const chave in validations) {
                message += '<div class="col-12 text-start font-size-12"><b>></b> ' + validations[chave] + '</div>';
            }
            message += '</div>';

            alertSwal('warning', "Validação", message, 'true', 20000);
        } else if (data.error_permissao) {
            alertSwal('warning', "Permissão Negada", '', 'true', 2000);
        } else if (data.error) {
            alertSwal('warning', 'Visitas Técnicas', data.error, 'true', 20000);
        } else {
            alert('Erro interno');
        }
    } catch (error) {
        alert('Erro Visita Técnica: ' + error);
    }
}

/*
* Controle da visualização do configurar_perguntas.php
 */
function configurar_perguntas_controle(op) {
    var crudTable = document.getElementById('crudTable');
    var crudForm = document.getElementById('crudForm');
    var crudConfigurarPerguntas = document.getElementById('crudConfigurarPerguntas');

    if (op == 1) {
        crudTable.style.display = 'none';
        crudForm.style.display = 'none';
        crudConfigurarPerguntas.style.display = 'block';
    }

    if (op == 2) {
        crudTable.style.display = 'block';
        crudForm.style.display = 'none';
        crudConfigurarPerguntas.style.display = 'none';
    }
}

function msg_processamento(op, id) {
    let msgDiv = document.getElementById('msg_processamento_' + id);
    let btnAtualizar = document.getElementById('btn_atualizar_' + id);

    // Mensagem de início
    if (op == 1) {
        msgDiv.textContent = 'Processando...';
        msgDiv.className = 'alert alert-info mt-2';

        btnAtualizar.disabled = true;
    }

    // Mensagem de conclusão
    if (op == 2) {
        msgDiv.textContent = 'Processamento concluído!';
        msgDiv.className = 'alert alert-success mt-2';
    }

    // Mensagem de fim
    if (op == 3) {
        setTimeout(() => {
            msgDiv.textContent = '';
            msgDiv.className = 'alert d-none mt-2';

            btnAtualizar.disabled = false;
        }, 2000);
    }
}

function atualizar_pergunta(visita_tecnica_pergunta_id) {
    //FormData
    var formulario = document.getElementById('frm_configurar_perguntas_'+visita_tecnica_pergunta_id);
    var formData = new FormData(formulario);
    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Msg Processamento
    msg_processamento(1, visita_tecnica_pergunta_id);

    //Acessar rota
    fetch(url_atual+'visitas_tecnicas/vtt1/visitas_tecnicas_perguntas/atualizar_pergunta/'+visita_tecnica_pergunta_id, {
        method: 'POST',
        headers: {
            'REQUEST-ORIGIN': 'fetch',
            'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: formData
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo dados
        if (data.success) {
            //Msg Processamento
            msg_processamento(2, visita_tecnica_pergunta_id);
        } else if (data.error) {
            alertSwal('warning', 'Funcionários', data.error, 'true', 20000);
        } else {
            alert('Erro interno');
        }
    }).catch(error => {
        alert('Erro Atualizar Pergunta: '+error);
    }).finally(() => {
        //Msg Processamento
        msg_processamento(3, visita_tecnica_pergunta_id);
    });
}

function previewPerguntas(vt_cs) {
    //Buscar dados do Registro
    fetch('visitas_tecnicas/vtt1/visitas_tecnicas_perguntas/perguntas_completa_sintetica/' + vt_cs, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo dados
        if (data.success) {
            //Visita Técnica Perguntas
            var visita_tecnica_perguntas = '';

            if (vt_cs == 1) {visita_tecnica_perguntas = data.success['perguntas_completa'];}
            if (vt_cs == 2) {visita_tecnica_perguntas = data.success['perguntas_sintetica'];}

            //Montar Perguntas
            const htmlPerguntas = vtt1_gerarHtmlPerguntas(visita_tecnica_perguntas);
            document.getElementById('vtt1_divPreviewPerguntas').innerHTML = htmlPerguntas;

            //Abrir Modal
            new bootstrap.Modal(document.getElementById('vtt1_modalPreviewPerguntas')).show();
        }
    }).catch(error => {
        alert('Erro previewPerguntas:'+error);
    });
}

document.addEventListener('DOMContentLoaded', function(event) {
    //Executar Visita Técnica - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Executar Visita Técnica - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('visita_tecnica_dropdown').addEventListener('click', async function(e) {
        e.preventDefault();

        const target = e.target.closest('a');

        if (target) {
            const cliente_id = document.getElementById('cliente_id').value;
            const visita_tecnica_tipo_id = target.dataset.visita_tecnica_tipo_id;
            const vt_cs = target.dataset.vt_cs;

            //Validar dados'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            var validacao_ok = true;
            var mensagem = '';

            //Campo: cliente_id (requerido)
            if (validacao({op:1, value:cliente_id}) === false) {
                validacao_ok = false;
                mensagem += 'Cliente requerido.' + '<br>';
            } else {
                //Campo: cliente_id (deve ser um número)
                if (validacao({op:4, value:cliente_id}) === false) {
                    validacao_ok = false;
                    mensagem += 'Cliente deve ser escolhido.' + '<br>';
                }
            }

            //Campo: visita_tecnica_tipo_id (requerido)
            if (validacao({op:1, value:visita_tecnica_tipo_id}) === false) {
                validacao_ok = false;
                mensagem += 'Tipo requerido.'+'<br>';
            } else {
                //Campo: visita_tecnica_tipo_id (deve ser um número)
                if (validacao({op:4, value:visita_tecnica_tipo_id}) === false) {
                    validacao_ok = false;
                    mensagem += 'Tipo deve ser escolhido.' + '<br>';
                }
            }

            //Mensagem
            if (validacao_ok === false) {
                var texto = '<div class="pt-3">';
                texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
                texto += '</div>';

                alertSwal('warning', 'Validação', texto, 'true', 5000);

                return false;
            }
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Incluir Visita Técnica''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            const visita_tecnica_id = await executarVisitaTecnica(cliente_id, visita_tecnica_tipo_id, vt_cs);

            await crudTable('visitas_tecnicas');
            await crudEdit(visita_tecnica_id);
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        }
    });
    //Executar Visita Técnica - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Executar Visita Técnica - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Campo: visita_tecnica_tipo_id
    document.getElementById('visita_tecnica_tipo_id').addEventListener('change', function() {
        const div_vtt1 = document.getElementById('divVTT1').style.display = 'none';
        const div_vtt2 = document.getElementById('divVTT2').style.display = 'none';

        if (this.value == 1) {
            const div_vtt1 = document.getElementById('divVTT1').style.display = '';
        }

        if (this.value == 2) {
            const div_vtt2 = document.getElementById('divVTT2').style.display = '';
        }
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
