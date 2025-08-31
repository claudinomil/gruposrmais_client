function validar_frm_escalas() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: escala_tipo_id (requerido)
    if (validacao({op:1, value:document.getElementById('escala_tipo_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Escala Tipo requerido.'+'<br>';
    }

    //Campo: escala_jornada_id (requerido)
    if (validacao({op:1, value:document.getElementById('escala_jornada_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Jornada Tipo requerido.'+'<br>';
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

document.addEventListener("DOMContentLoaded", function(event) {});
