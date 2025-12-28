function validar_frm_materiais_controle_situacoes() {
    var validacao_ok = true;
    var mensagem = '';

    // //Campo: atual_material_situacao_id (requerido)
    // if (validacao({op:1, value:document.getElementById('atual_material_situacao_id').value}) === false) {
    //     validacao_ok = false;
    //     mensagem += 'Situação Alterar requerido.'+'<br>';
    // }

    // //Campo: anterior_material_situacao_id x atual_material_situacao_id (igual)
    // if (document.getElementById('anterior_material_situacao_id').value == document.getElementById('atual_material_situacao_id').value) {
    //     validacao_ok = false;
    //     mensagem += 'Situação Atual não pode ser igual a Situação Alterar.'+'<br>';
    // }

    // //Campo: anterior_estoque_local_id x atual_estoque_local_id (igual)
    // if (document.getElementById('anterior_estoque_local_id').value == document.getElementById('atual_estoque_local_id').value) {
    //     validacao_ok = false;
    //     mensagem += 'Local Atual não pode ser igual a Local Alterar.'+'<br>';
    // }

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
