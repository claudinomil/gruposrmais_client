function validar_frm_mapas_pontos_interesse() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: mapa_ponto_tipo_id (requerido)
    if (validacao({op:1, value:document.getElementById('mapa_ponto_tipo_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Ponto tipo requerido.'+'<br>';
    }

    //Campo: name (requerido)
    if (validacao({op:1, value:document.getElementById('name').value}) === false) {
        validacao_ok = false;
        mensagem += 'Nome requerido.'+'<br>';
    }

    //Campo: latitude (requerido)
    if (validacao({op:1, value:document.getElementById('latitude').value}) === false) {
        validacao_ok = false;
        mensagem += 'Latitude requerido.'+'<br>';
    }

    //Campo: longitude (requerido)
    if (validacao({op:1, value:document.getElementById('longitude').value}) === false) {
        validacao_ok = false;
        mensagem += 'Longitude requerido.'+'<br>';
    }

    //Campo: icone (requerido)
    if (validacao({op:1, value:document.getElementById('icone').value}) === false) {
        validacao_ok = false;
        mensagem += 'Ícone requerido.'+'<br>';
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
