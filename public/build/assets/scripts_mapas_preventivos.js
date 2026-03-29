function validar_frm_mapas_preventivos() {
    var validacao_ok = true;
    var mensagem = '';

    // Campo: edificacao_local_id (requerido)
    if (validacao({op:1, value:document.getElementById('edificacao_local_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Edificação Local requerido.'+'<br>';
    }

    // Mensagem
    if (validacao_ok === false) {
        var texto = '<div class="pt-3">';
        texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
        texto += '</div>';

        alertSwal('warning', 'Validação', texto, 'true', 5000);
    }

    // Retorno
    return validacao_ok;
}

document.addEventListener('DOMContentLoaded', function (event) {});
