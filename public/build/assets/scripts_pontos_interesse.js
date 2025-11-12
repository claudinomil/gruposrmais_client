function validar_frm_pontos_interesse() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: ponto_tipo_id (requerido)
    if (validacao({op:1, value:document.getElementById('ponto_tipo_id').value}) === false) {
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

    //Campo: telefone_1 (não requerido / Telefone Válido)
    if (validacao({op:1, value:document.getElementById('telefone_1').value}) === true) {
        //Campo: telefone_1 (Telefone Válido)
        if (validacao({op:11, value:document.getElementById('telefone_1').value}) === false) {
            validacao_ok = false;
            mensagem += 'Telefone 1 Inválido.'+'<br>';
        }
    }

    //Campo: telefone_2 (não requerido / Telefone Válido)
    if (validacao({op:1, value:document.getElementById('telefone_2').value}) === true) {
        //Campo: telefone_2 (Telefone Válido)
        if (validacao({op:11, value:document.getElementById('telefone_2').value}) === false) {
            validacao_ok = false;
            mensagem += 'Telefone 2 Inválido.'+'<br>';
        }
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

function configurarTela() {
    // Configuração inicial
    divPontoNaturezaId.style.display = 'none';
    divEspecialidade.style.display = 'none';

    document.querySelectorAll('.class_div_especialidade_tipo').forEach(el => {el.style.display = 'none';});

    // Hospital
    if (ponto_tipo_id.value == 1) {
        // Configuração
        divPontoNaturezaId.style.display = 'block';
        divEspecialidade.style.display = 'block';

        document.querySelectorAll('.class_div_especialidade_tipo_id_1').forEach(el => {el.style.display = 'block';});
    }

    // Escola
    if (ponto_tipo_id.value == 3) {
        // Configuração
        divPontoNaturezaId.style.display = 'block';
        divEspecialidade.style.display = 'block';

        document.querySelectorAll('.class_div_especialidade_tipo_id_2').forEach(el => {el.style.display = 'block';});
    }
}

// Globais
const ponto_tipo_id = document.getElementById('ponto_tipo_id');
const divPontoNaturezaId = document.getElementById('divPontoNaturezaId');
const divEspecialidade = document.getElementById('divEspecialidade');

document.addEventListener("DOMContentLoaded", function(event) {
    // Campo ponto_tipo_id
    ponto_tipo_id.addEventListener('change', function() {configurarTela();});
});