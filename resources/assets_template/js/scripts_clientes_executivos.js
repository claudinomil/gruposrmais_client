function validar_frm_clientes_executivos() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: cliente_id (requerido)
    if (validacao({op:1, value:document.getElementById('cliente_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.'+'<br>';
    }

    //Campo: executivo_nome (requerido)
    if (validacao({op:1, value:document.getElementById('executivo_nome').value}) === false) {
        validacao_ok = false;
        mensagem += 'Executivo Nome requerido.'+'<br>';
    }

    //Campo: executivo_funcao (requerido)
    if (validacao({op:1, value:document.getElementById('executivo_funcao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Executivo Função requerido.'+'<br>';
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
