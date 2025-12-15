function validar_frm_estoques_locais() {
    var validacao_ok = true;
    var mensagem = '';

    // Campo: estoque_id (requerido)
    if (validacao({op:1, value:document.getElementById('estoque_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Estoque requerido.'+'<br>';
    } else {
        // Estoque (Empresa)
        if (document.getElementById('estoque_id').value == '1') {
            // Campo: empresa_id (requerido)
            if (validacao({op:1, value:document.getElementById('empresa_id').value}) === false) {
                validacao_ok = false;
                mensagem += 'Empresa requerido.'+'<br>';
            }
        }

        // Estoque (Cliente)
        if (document.getElementById('estoque_id').value == '2') {
            // Campo: cliente_id (requerido)
            if (validacao({op:1, value:document.getElementById('cliente_id').value}) === false) {
                validacao_ok = false;
                mensagem += 'Cliente requerido.'+'<br>';
            }
        }
    }

    // Campo: name (requerido)
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

// Globais
const estoque_id = document.getElementById('estoque_id');
const divEmpresaId = document.getElementById('divEmpresaId');
const empresa_id = document.getElementById('empresa_id');
const divClienteId = document.getElementById('divClienteId');
const cliente_id = document.getElementById('cliente_id');

function controleGrade() {
    document.getElementById('btnCrudEditGradeId1').style.display = 'none';
    document.getElementById('btnCrudEditGradeId2').style.display = 'none';

    document.getElementById('btnCrudDeleteGradeId1').style.display = 'none';
    document.getElementById('btnCrudDeleteGradeId2').style.display = 'none';
}

function controleForm() {
    divEmpresaId.style.display = 'none';
    divClienteId.style.display = 'none';

    if (estoque_id.value == '1') {
        divEmpresaId.style.display = '';
        cliente_id.value = '';
    }

    if (estoque_id.value == '2') {
        divClienteId.style.display = '';
        empresa_id.value = '';
    }
}

// DOMContentLoaded - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// DOMContentLoaded - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
document.addEventListener('DOMContentLoaded', function(event) {
    estoque_id.addEventListener('change', function () {
        controleForm();
    });

    controleForm();
});
// DOMContentLoaded - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// DOMContentLoaded - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
