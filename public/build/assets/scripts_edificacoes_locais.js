function validar_frm_edificacoes_locais() {
    var validacao_ok = true;
    var mensagem = '';

    // Campo: edificacao_nivel_id (requerido)
    if (validacao({op:1, value:document.getElementById('edificacao_nivel_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Edificação Nível requerido.'+'<br>';
    }

    // Campo: name (requerido)
    if (validacao({op:1, value:document.getElementById('name').value}) === false) {
        validacao_ok = false;
        mensagem += 'Nome requerido.'+'<br>';
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
