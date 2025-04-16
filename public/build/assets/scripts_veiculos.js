function validar_frm_veiculos() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: veiculo_marca_id (requerido)
    if (validacao({op:1, value:document.getElementById('veiculo_marca_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Veículo Marca requerido.'+'<br>';
    }

    //Campo: veiculo_modelo_id (requerido)
    if (validacao({op:1, value:document.getElementById('veiculo_modelo_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Veículo Modelo requerido.'+'<br>';
    }

    //Campo: placa (requerido)
    if (validacao({op:1, value:document.getElementById('placa').value}) === false) {
        validacao_ok = false;
        mensagem += 'Placa requerido.'+'<br>';
    }

    //Campo: renavam (requerido)
    if (validacao({op:1, value:document.getElementById('renavam').value}) === false) {
        validacao_ok = false;
        mensagem += 'Renavam requerido.'+'<br>';
    }

    //Campo: chassi (requerido)
    if (validacao({op:1, value:document.getElementById('chassi').value}) === false) {
        validacao_ok = false;
        mensagem += 'Chassi requerido.'+'<br>';
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
