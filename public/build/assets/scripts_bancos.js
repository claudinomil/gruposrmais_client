function validar_frm_bancos() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: name (requerido)
    if (validacao({op:1, value:document.getElementById('name').value}) === false) {
        validacao_ok = false;
        mensagem += 'Nome requerido.'+'<br>';
    }

    //Campo: name (mínimo de 3 caracteres)
    if (validacao({op:2, value:document.getElementById('name').value, minCaracteres:3}) === false) {
        validacao_ok = false;
        mensagem += 'Nome precisa ter no mínimo 3 caracteres.'+'<br>';
    }

    //Campo: numero (somente números)
    if (validacao({op:4, value:document.getElementById('numero').value}) === false) {
        validacao_ok = false;
        mensagem += 'Número só pode conter dígitos de 0 a 9.'+'<br>';
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
