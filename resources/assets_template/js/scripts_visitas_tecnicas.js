function validar_frm_visitas_tecnicas() {
    if (document.getElementById('visita_tecnica_tipo_id').value == 1) {return vtt1_validar_frm_visitas_tecnicas();}
    if (document.getElementById('visita_tecnica_tipo_id').value == 2) {return vtt2_validar_frm_visitas_tecnicas();}
}

function gerar_visita_tecnica(visita_tecnica_id=0, visita_tecnica_tipo_id=0, traducao='pt') {
    if (visita_tecnica_id == 0) {visita_tecnica_id = document.getElementById('registro_id').value;}
    if (visita_tecnica_tipo_id == 0) {visita_tecnica_tipo_id = document.getElementById('visita_tecnica_tipo_id').value;}

    if (visita_tecnica_tipo_id == 1) {vtt1_visita_tecnica_gerar_pdf(visita_tecnica_id, traducao);}
    if (visita_tecnica_tipo_id == 2) {vtt2_visita_tecnica_gerar_pdf(visita_tecnica_id, traducao);}
}

async function executarVisitaTecnica(visita_tecnica_tipo_id, cliente_id) {
    try {
        const response = await fetch('visitas_tecnicas/' + visita_tecnica_tipo_id + '/' + cliente_id, {
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

document.addEventListener('DOMContentLoaded', function(event) {
    //Executar Visita Técnica - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Executar Visita Técnica - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('visita_tecnica_dropdown').addEventListener('click', async function(e) {
        e.preventDefault();

        const target = e.target.closest('a');

        if (target) {
            const visita_tecnica_tipo_id = target.dataset.visita_tecnica_tipo_id;
            const cliente_id = document.getElementById('cliente_id').value;

            //Validar dados'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            var validacao_ok = true;
            var mensagem = '';

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
            const visita_tecnica_id = await executarVisitaTecnica(visita_tecnica_tipo_id, cliente_id);

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
