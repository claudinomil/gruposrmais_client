// Dados Principais - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Dados Principais - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function validar_frm_materiais_movimentacoes() {
    var validacao_ok = true;
    var mensagem = '';

    // Campo: origem_estoque_local_id (requerido)
    if (validacao({op:1, value:document.getElementById('origem_estoque_local_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Origem Local requerido.'+'<br>';
    } else {
        // Campo: origem_estoque_nome (requerido)
        if (validacao({op:1, value:document.getElementById('origem_estoque_nome').value}) === false) {
            validacao_ok = false;
            mensagem += 'Origem Estoque Nome requerido.'+'<br>';
        }

        // Empresa
        if (document.getElementById('origem_estoque_local_id').value == 1) {
            // Campo: origem_empresa_nome (requerido)
            if (validacao({op:1, value:document.getElementById('origem_empresa_nome').value}) === false) {
                validacao_ok = false;
                mensagem += 'Origem Empresa Nome requerido.'+'<br>';
            }
        }

        // Cliente
        if (document.getElementById('origem_estoque_local_id').value == 2) {
            // Campo: origem_cliente_nome (requerido)
            if (validacao({op:1, value:document.getElementById('origem_cliente_nome').value}) === false) {
                validacao_ok = false;
                mensagem += 'Origem Cliente Nome requerido.'+'<br>';
            }
        }
    }

    // Campo: destino_estoque_local_id (requerido)
    if (validacao({op:1, value:document.getElementById('destino_estoque_local_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Destino Local requerido.'+'<br>';
    } else {
        // Campo: destino_estoque_nome (requerido)
        if (validacao({op:1, value:document.getElementById('destino_estoque_nome').value}) === false) {
            validacao_ok = false;
            mensagem += 'Destino Estoque Nome requerido.'+'<br>';
        }

        // Empresa
        if (document.getElementById('destino_estoque_local_id').value == 1) {
            // Campo: destino_empresa_nome (requerido)
            if (validacao({op:1, value:document.getElementById('destino_empresa_nome').value}) === false) {
                validacao_ok = false;
                mensagem += 'Destino Empresa Nome requerido.'+'<br>';
            }
        }

        // Cliente
        if (document.getElementById('destino_estoque_local_id').value == 2) {
            // Campo: destino_cliente_nome (requerido)
            if (validacao({op:1, value:document.getElementById('destino_cliente_nome').value}) === false) {
                validacao_ok = false;
                mensagem += 'Destino Cliente Nome requerido.'+'<br>';
            }
        }
    }

    // Campo: quantidade (requerido)
    if (validacao({op:1, value:document.getElementById('quantidade').value}) === false) {
        validacao_ok = false;
        mensagem += 'Quantidade requerido.'+'<br>';
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

// Elementos Globais
const frm_operacao = document.getElementById('frm_operacao');
// Dados Principais - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Dados Principais - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// DOMContentLoaded - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// DOMContentLoaded - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
document.addEventListener('DOMContentLoaded', function(event) {
    // Buscar dados do origem_estoque_local_id escolhido
    document.getElementById('origem_estoque_local_id').addEventListener('change', async function () {
        const inputs = {
            id: document.getElementById('origem_estoque_local_id'),
            origem_estoque_nome: document.getElementById('origem_estoque_nome'),
            origem_empresa_nome: document.getElementById('origem_empresa_nome'),
            origem_cliente_nome: document.getElementById('origem_cliente_nome')
        };

        const clearInputs = () => Object.values(inputs).forEach(i => i.tagName === 'INPUT' ? i.value = '' : null);

        const formatPhone = (num) => {
            if (!num) return '';
            num = num.replace(/\D/g, "");
            return num.length === 10
                ? num.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3")
                : num.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
        };

        clearInputs();

        if (!inputs.id.value) return clearInputs();

        try {
            const response = await fetch(`estoques_locais/${inputs.id.value}`, {
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            });
            const { success: estoque_local } = await response.json();


            console.log(estoque_local);


            inputs.origem_estoque_nome.value = estoque_local.estoque_nome || '';
            inputs.origem_empresa_nome.value = estoque_local.empresa_nome || '';
            inputs.origem_cliente_nome.value = estoque_local.cliente_nome || '';
        } catch (e) {
            alert('Erro OrigemEstoqueLocalId: ' + e);
        }
    });

    // Buscar dados do destino_estoque_local_id escolhido
    document.getElementById('destino_estoque_local_id').addEventListener('change', async function () {
        const inputs = {
            id: document.getElementById('destino_estoque_local_id'),
            destino_estoque_nome: document.getElementById('destino_estoque_nome'),
            destino_empresa_nome: document.getElementById('destino_empresa_nome'),
            destino_cliente_nome: document.getElementById('destino_cliente_nome')
        };

        const clearInputs = () => Object.values(inputs).forEach(i => i.tagName === 'INPUT' ? i.value = '' : null);

        const formatPhone = (num) => {
            if (!num) return '';
            num = num.replace(/\D/g, "");
            return num.length === 10
                ? num.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3")
                : num.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
        };

        clearInputs();

        if (!inputs.id.value) return clearInputs();

        try {
            const response = await fetch(`estoques_locais/${inputs.id.value}`, {
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            });
            const { success: estoque_local } = await response.json();

            inputs.destino_estoque_nome.value = estoque_local.estoque_nome || '';
            inputs.destino_empresa_nome.value = estoque_local.empresa_nome || '';
            inputs.destino_cliente_nome.value = estoque_local.cliente_nome || '';
        } catch (e) {
            alert('Erro DestinoEstoqueLocalId: ' + e);
        }
    });
});
// DOMContentLoaded - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// DOMContentLoaded - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
