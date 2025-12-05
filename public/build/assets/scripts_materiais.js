function validar_frm_materiais() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: material_categoria_id (requerido)
    if (validacao({op:1, value:document.getElementById('material_categoria_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Categoria requerido.'+'<br>';
    }

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

function validar_frm_upload_fotografia() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: mat_fotografia_file (arquivo requerido)
    if (validacao({op:18, id:'mat_fotografia_file'}) === false) {
        validacao_ok = false;
        mensagem += 'Arquivo requerido.'+'<br>';
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

function materialModalInfoControle(op, id='') {
    var div_fotografias = document.getElementById('md_mat_div_fotografias');
    var div_dados = document.getElementById('md_mat_div_dados');

    // Fotografias
    if (op == 1) {
        div_fotografias.classList.remove('d-none');
        div_fotografias.classList.add('d-lg-flex');

        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');
    }

    //Dados
    if (op == 2) {
        div_fotografias.classList.remove('d-lg-flex');
        div_fotografias.classList.add('d-none');

        div_dados.classList.remove('d-none');
        div_dados.classList.add('d-lg-flex');

        materialModalInfoDados(id);
    }
}

// Modal Materiais
// Dados
async function materialModalInfoDados(id='') {
    if (id == '') {id = document.getElementById('mi_mat_material_id').value;}

    //Abrir Modal
    var modalEl = document.getElementById('material_modal_info');
    if (!modalEl.classList.contains('show')) {
        new bootstrap.Modal(document.getElementById('material_modal_info')).show();
        ajustarMargensModalsInfo({ modalId:'material_modal_info', top:20, right:20, bottom:20, left:20 });
    }

    //Limpando dados
    let elementos = document.querySelectorAll('.clearClass');
    elementos.forEach(elemento => {elemento.src = ''; elemento.innerHTML = '';});

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'materiais/modalInfo/modal_info/'+id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let json = data;

        //Lendo dados material
        let material = json.material;
console.log(material);
        //Passando dados material''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Header
        document.getElementById('mi_mat_header_nome').innerHTML = material.name;

        //Fotografia
        var fotografia = url_atual+'build/assets/images/materiais/material-0.png';
        if (material.fotografia) {fotografia = material.fotografia;}
        document.getElementById('mi_mat_fotografia_header').src = fotografia;
        document.getElementById('mi_mat_fotografia').src = fotografia;

        //Material id
        document.getElementById('mi_mat_material_id').value = material.id;

        //Dados
        document.getElementById('mi_mat_categoria').value = material.materialCategoriaName;
        document.getElementById('mi_mat_nome').value = material.name;
        document.getElementById('mi_mat_cor').value = material.corName;
        document.getElementById('mi_mat_ca').value = material.ca;
        document.getElementById('mi_mat_descricao').value = material.descricao;
        document.getElementById('mi_mat_ca').value = material.ca;

        // Fotografia
        let upload_fotografia_material_id = document.getElementById('upload_fotografia_material_id');
        if (upload_fotografia_material_id) {upload_fotografia_material_id.value = material.id ?? "";}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }).catch(error => {
        alert('Erro materialModalInfo: '+error);
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    //Botão: frm_upload_fotografia_mat_executar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_fotografia_mat_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_fotografia_mat');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';

        //Tratar Botões
        document.getElementById('frm_upload_fotografia_mat_executar').style.display = 'block';

        //Criticando campos
        if (validar_frm_upload_fotografia() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'materiais/uploadFotografia/upload_fotografia', {
            method: 'POST',
            headers: {
                'REQUEST-ORIGIN': 'fetch',
                'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: formData
        }).then(response => {
            return response.json();
        }).then(data => {
            //Lendo dados
            if (data.success) {
                //Atualizando Fotografias
                const fileInput = document.getElementById('mat_fotografia_file');
                const file = fileInput.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        document.getElementById('mi_mat_fotografia_header').src = reader.result;
                        document.getElementById('mi_mat_fotografia').src = reader.result;
                    };
                    reader.readAsDataURL(file);
                }

                //Reset Form
                formulario.reset();
            } else if (data.error) {
                alertSwal('warning', 'Materiais', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Materiais Upload Fotografia: '+error);
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
