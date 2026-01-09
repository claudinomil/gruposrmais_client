// Dados Principais - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Dados Principais - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function validar_frm_produtos_movimentacoes() {
    var validacao_ok = true;
    var mensagem = '';

    // Campo: origem_estoque_local_id (requerido)
    if (validacao({op:1, value:document.getElementById('origem_estoque_local_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Origem Local requerido.'+'<br>';
    }

    // Campo: produtos_entradas_itens (selecionado)
    const checados = document.querySelectorAll('input[name="produtos_entradas_itens[]"]:checked');
    if (checados.length == 0) {
        validacao_ok = false;
        mensagem += 'Nenhum Produto selecionado para Movimentação.'+'<br>';
    }

    // Campo: destino_estoque_local_id (requerido)
    if (validacao({op:1, value:document.getElementById('destino_estoque_local_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Destino Local requerido.'+'<br>';
    }

    // Campo: origem_estoque_local_id x destino_estoque_local_id
    if (document.getElementById('origem_estoque_local_id').value == document.getElementById('destino_estoque_local_id').value) {
        validacao_ok = false;
        mensagem += 'Origem Local não pode ser igual ao Destino Local.'+'<br>';
    }

    // // Campo: data_movimentacao (requerido)
    // if (validacao({op:1, value:document.getElementById('data_movimentacao').value}) === false) {
    //     validacao_ok = false;
    //     mensagem += 'Data Movimentação requerido.'+'<br>';
    // } else {
    //     // Campo: data_movimentacao (Data Válida)
    //     if (validacao({op:8, value:document.getElementById('data_movimentacao').value}) === false) {
    //         validacao_ok = false;
    //         mensagem += 'Data Movimentação Inválida.'+'<br>';
    //     }
    // }

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

// Elementos Globais
const frm_operacao = document.getElementById('frm_operacao');
// Dados Principais - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Dados Principais - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

async function grade_produtos() {
    //Aviso Temporário na tela'''''''''''''''''''''''''''''''''''''''''''''''''''''
    var loadingAvisoTmp = document.getElementById('loading-aviso-tmp');
    loadingAvisoTmp.innerHTML = 'Buscando Produtos (Movimentação), por favor aguarde...';
    loadingAvisoTmp.style.display = 'block';
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Elementos
    const divProdutosMovimentacao = document.getElementById('divProdutosMovimentacao');
    const origem_estoque_local_id = document.getElementById('origem_estoque_local_id');
    const frm_operacao = document.getElementById('frm_operacao');
    const produto_movimentacao_id = document.getElementById('registro_id');

    if (!produto_movimentacao_id.value) {produto_movimentacao_id.value = 0;}

    // Produtos
    let produtos = [];

    // Limpar a Grade
    divProdutosMovimentacao.innerHTML = '';

    // Buscar Produtos para a Grade
    const response = await fetch(`produtos_movimentacoes/produtos_entradas_itens/${frm_operacao.value}/${origem_estoque_local_id.value}/${produto_movimentacao_id.value}`, {
        headers: {
            'REQUEST-ORIGIN': 'fetch',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
    });

    const json = await response.json();

    produtos = json.success || [];

    // gradeProdutos
    let gradeProdutos = '';

    if (produtos.length === 0) {
        gradeProdutos = '<div class="form-group col-12 text-danger pb-3">&nbsp;&nbsp;&nbsp;Não foi encontrado Produto para esse Local</div>';

        divProdutosMovimentacao.innerHTML = gradeProdutos;
    } else {
        // Varrer
        for (const registro of produtos) {
            let produtoFotografia = registro.produtoFotografia;

            var arquivo_existe = await arquivoExiste(produtoFotografia);
            if (arquivo_existe === false) {produtoFotografia = 'build/assets/images/produtos/produto-0.png';}

            if (frm_operacao.value == 'create') {
                gradeProdutos = `<div class="col-12 col-md-4">
                                    <div class="row alert alert-success p-1 m-1" style="cursor: pointer;" onclick="const cb = this.querySelector('input[type=checkbox]'); cb.checked = !cb.checked;">
                                        <div class="col-1 px-0">
                                            <input class="form-check-input" type="checkbox" id="produto_entrada_item_id_${registro.id}" name="produtos_entradas_itens[]" value="${registro.id}" onclick="event.stopPropagation();">
                                        </div>
                                        <div class="col-2 px-0">
                                            <img src="${produtoFotografia}" alt="" class="img-thumbnail avatar-sm">
                                        </div>
                                        <div class="col-9">
                                            <h6 class="text-truncate">Patrimônio: ${registro.produto_numero_patrimonio}</h6>
                                            <p class="text-truncate text-muted small mb-0">${registro.produto_name}</p>
                                        </div>
                                    </div>
                                </div>`;
            }

            if (frm_operacao.value == 'view') {
                gradeProdutos = `<div class="col-12 col-md-4">
                                    <div class="row alert alert-success p-1 m-1">
                                        <div class="col-2 px-0">
                                            <img src="${produtoFotografia}" alt="" class="img-thumbnail avatar-sm">
                                        </div>
                                        <div class="col-10">
                                            <h6 class="text-truncate">Patrimônio: ${registro.produto_numero_patrimonio}</h6>
                                            <p class="text-truncate text-muted small mb-0">${registro.produto_name}</p>
                                        </div>
                                    </div>
                                </div>`;
            }


            divProdutosMovimentacao.insertAdjacentHTML('beforeend', gradeProdutos);
        }
    }

    //Aviso Temporário na tela'''''''''''''''''''''''''''''''''''''''''''''''''''''
    var loadingAvisoTmp = document.getElementById('loading-aviso-tmp');
    loadingAvisoTmp.innerHTML = '';
    loadingAvisoTmp.style.display = 'none';
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
}

// DOMContentLoaded - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// DOMContentLoaded - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
document.addEventListener('DOMContentLoaded', function(event) {
    // Buscar dados do origem_estoque_local_id escolhido
    document.getElementById('origem_estoque_local_id').addEventListener('change', async function () {
        // Dados
        const origem_estoque_local_id = document.getElementById('origem_estoque_local_id');
        const origem_estoque_nome = document.getElementById('origem_estoque_nome');
        const origem_empresa_nome = document.getElementById('origem_empresa_nome');
        const origem_cliente_nome = document.getElementById('origem_cliente_nome');

        // Return
        if (!origem_estoque_local_id.value) return;

        // Buscar Informações
        try {
            const response = await fetch(`estoques_locais/${origem_estoque_local_id.value}`, {
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            });

            const { success: estoque_local } = await response.json();

            origem_estoque_nome.value = estoque_local.estoque_nome || '';
            origem_empresa_nome.value = estoque_local.empresa_nome || '';
            origem_cliente_nome.value = estoque_local.cliente_nome || '';

            // Formatar Tela
            const divOrigemEmpresaNome = document.getElementById('divOrigemEmpresaNome');
            const divOrigemClienteNome = document.getElementById('divOrigemClienteNome');

            divOrigemEmpresaNome.style.display = 'none';
            divOrigemClienteNome.style.display = 'none';

            if (estoque_local.estoque_id == 1) {divOrigemEmpresaNome.style.display = '';}
            if (estoque_local.estoque_id == 2) {divOrigemClienteNome.style.display = '';}
        } catch (e) {
            alert('Erro OrigemEstoqueLocalId1: ' + e);
        }

        // Buscar Produtos que estão nesse estoque_local_id
        grade_produtos();
    });

    // Buscar dados do destino_estoque_local_id escolhido
    document.getElementById('destino_estoque_local_id').addEventListener('change', async function () {
        // Dados
        const destino_estoque_local_id = document.getElementById('destino_estoque_local_id');
        const destino_estoque_nome = document.getElementById('destino_estoque_nome');
        const destino_empresa_nome = document.getElementById('destino_empresa_nome');
        const destino_cliente_nome = document.getElementById('destino_cliente_nome');

        // Return
        if (!destino_estoque_local_id.value) return;

        // Buscar Informações
        try {
            const response = await fetch(`estoques_locais/${destino_estoque_local_id.value}`, {
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            });

            const { success: estoque_local } = await response.json();

            destino_estoque_nome.value = estoque_local.estoque_nome || '';
            destino_empresa_nome.value = estoque_local.empresa_nome || '';
            destino_cliente_nome.value = estoque_local.cliente_nome || '';

            // Formatar Tela
            const divDestinoEmpresaNome = document.getElementById('divDestinoEmpresaNome');
            const divDestinoClienteNome = document.getElementById('divDestinoClienteNome');

            divDestinoEmpresaNome.style.display = 'none';
            divDestinoClienteNome.style.display = 'none';

            if (estoque_local.estoque_id == 1) {divDestinoEmpresaNome.style.display = '';}
            if (estoque_local.estoque_id == 2) {divDestinoClienteNome.style.display = '';}
        } catch (e) {
            alert('Erro DestinoEstoqueLocalId: ' + e);
        }
    });
});
// DOMContentLoaded - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// DOMContentLoaded - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
