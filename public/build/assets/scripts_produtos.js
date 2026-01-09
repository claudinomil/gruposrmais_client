function validar_frm_produtos() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: produto_categoria_id (requerido)
    if (validacao({op:1, value:document.getElementById('produto_categoria_id').value}) === false) {
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

    //Campo: pro_fotografia_file (arquivo requerido)
    if (validacao({op:18, id:'pro_fotografia_file'}) === false) {
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

function produtoModalInfoControle(op, id='') {
    var div_fotografias = document.getElementById('md_pro_div_fotografias');
    var div_dados = document.getElementById('md_pro_div_dados');

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

        produtoModalInfoDados(id);
    }
}

// Modal Produtos
// Dados
async function produtoModalInfoDados(id='') {
    if (id == '') {id = document.getElementById('mi_pro_produto_id').value;}

    //Abrir Modal
    var modalEl = document.getElementById('produto_modal_info');
    if (!modalEl.classList.contains('show')) {
        new bootstrap.Modal(document.getElementById('produto_modal_info')).show();
        ajustarMargensModalsInfo({ modalId:'produto_modal_info', top:20, right:20, bottom:20, left:20 });
    }

    //Limpando dados
    let elementos = document.querySelectorAll('.clearClass');
    elementos.forEach(elemento => {elemento.src = ''; elemento.innerHTML = '';});

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'produtos/modalInfo/modal_info/'+id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let json = data;

        //Lendo dados produto
        let produto = json.produto;

        //Passando dados produto''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Header
        document.getElementById('mi_pro_header_nome').innerHTML = produto.name;

        //Fotografia
        var fotografia = url_atual+'build/assets/images/produtos/produto-0.png';
        if (produto.fotografia) {fotografia = produto.fotografia;}
        document.getElementById('mi_pro_fotografia_header').src = fotografia;
        document.getElementById('mi_pro_fotografia').src = fotografia;

        //Produto id
        document.getElementById('mi_pro_produto_id').value = produto.id;

        //Dados
        document.getElementById('mi_pro_categoria').value = produto.produtoCategoriaName;
        document.getElementById('mi_pro_nome').value = produto.name;
        document.getElementById('mi_pro_cor').value = produto.corName;
        document.getElementById('mi_pro_ca').value = produto.ca;
        document.getElementById('mi_pro_descricao').value = produto.descricao;
        document.getElementById('mi_pro_ca').value = produto.ca;

        // Fotografia
        let upload_fotografia_produto_id = document.getElementById('upload_fotografia_produto_id');
        if (upload_fotografia_produto_id) {upload_fotografia_produto_id.value = produto.id ?? "";}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }).catch(error => {
        alert('Erro produtoModalInfo: '+error);
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    //Botão: frm_upload_fotografia_pro_executar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('frm_upload_fotografia_pro_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_fotografia_pro');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';

        //Tratar Botões
        document.getElementById('frm_upload_fotografia_pro_executar').style.display = 'block';

        //Criticando campos
        if (validar_frm_upload_fotografia() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'produtos/uploadFotografia/upload_fotografia', {
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
                const fileInput = document.getElementById('pro_fotografia_file');
                const file = fileInput.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        document.getElementById('mi_pro_fotografia_header').src = reader.result;
                        document.getElementById('mi_pro_fotografia').src = reader.result;
                    };
                    reader.readAsDataURL(file);
                }

                //Reset Form
                formulario.reset();
            } else if (data.error) {
                alertSwal('warning', 'Produtos', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Produtos Upload Fotografia: '+error);
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
