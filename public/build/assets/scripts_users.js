function validar_frm_users() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: name (requerido)
    if (validacao({op:1, value:document.getElementById('name').value}) === false) {
        validacao_ok = false;
        mensagem += 'Nome requerido.'+'<br>';
    }

    //Campo: email (requerido)
    if (validacao({op:1, value:document.getElementById('email').value}) === false) {
        validacao_ok = false;
        mensagem += 'E-mail requerido.'+'<br>';
    }

    //Campo: email (email)
    if (validacao({op:5, value:document.getElementById('email').value}) === false) {
        validacao_ok = false;
        mensagem += 'E-mail inválido.'+'<br>';
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
