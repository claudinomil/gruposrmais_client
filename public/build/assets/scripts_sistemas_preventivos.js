function validar_frm_sistemas_preventivos() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: medida_seguranca_id (requerido)
    if (validacao({op:1, value:document.getElementById('medida_seguranca_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Medida Segurança requerido.'+'<br>';
    }

    //Campo: name (requerido)
    if (validacao({op:1, value:document.getElementById('name').value}) === false) {
        validacao_ok = false;
        mensagem += 'Nome requerido.'+'<br>';
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
