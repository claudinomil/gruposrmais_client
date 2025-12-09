// Dados Principais - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Dados Principais - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function validar_frm_materiais_entradas() {
    var validacao_ok = true;
    var mensagem = '';

    // Campo: fornecedor_id (requerido)
    if (validacao({op:1, value:document.getElementById('fornecedor_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Fornecedor requerido.'+'<br>';
    }

    // Campo: fornecedor_nome (requerido)
    if (validacao({op:1, value:document.getElementById('fornecedor_nome').value}) === false) {
        validacao_ok = false;
        mensagem += 'Fornecedor requerido.'+'<br>';
    }

    // Campo: valor_total x valor_total_grade
    if (document.getElementById('valor_total').value !== document.getElementById('valor_total_grade').value) {
        validacao_ok = false;
        mensagem += 'Valor Total diferente do Valor Total da Grade.'+'<br>';
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

// Grade de Materiais - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Grade de Materiais - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Elementos Globais
const mat_divMateriais = document.getElementById('mat_divMateriais');
const mat_divEscolherMaterial = document.getElementById('mat_divEscolherMaterial');
const mat_escolherMaterialId = document.getElementById('mat_escolherMaterialId');
const mat_escolherMaterialNumeroPatrimonio = document.getElementById('mat_escolherMaterialNumeroPatrimonio');
const mat_escolherMaterialValorUnitario = document.getElementById('mat_escolherMaterialValorUnitario');
const mat_btnAdicionar = document.getElementById('mat_btnAdicionar');
const mat_thOpcoes = document.getElementById('mat_thOpcoes');
const mat_tfOpcoes = document.getElementById('mat_tfOpcoes');
const mat_gradeTbody = document.getElementById('mat_gradeTbody');
const mat_camposHiddens = document.getElementById('mat_camposHiddens');

/*
 * Controlar Parte da tela que trata de Materiais
*/
function mat_controleDisplay() {
    // Limpar mat_gradeTbody
    mat_gradeTbody.innerHTML = '';

    // Limpar mat_camposHiddens
    mat_camposHiddens.innerHTML = '';

    if (frm_operacao.value == 'create') {
        mat_divEscolherMaterial.style.display = '';
        mat_thOpcoes.style.display = '';
        mat_tfOpcoes.style.display = '';
    }
    if (frm_operacao.value == 'view') {
        mat_divEscolherMaterial.style.display = 'none';
        mat_thOpcoes.style.display = 'none';
        mat_tfOpcoes.style.display = 'none';
    }
    if (frm_operacao.value == 'edit') {
        mat_divEscolherMaterial.style.display = '';
        mat_thOpcoes.style.display = '';
        mat_tfOpcoes.style.display = '';
    }
}

/*
 * Verificar se Material já existe na grade
*/
function mat_existeMaterialGrade(material_id) {
    if (document.getElementById("mat_materialLinha_" + material_id)) {
        return true;
    } else {
        return false;
    }
}

/*
 * Adicionar linha na grade
 * @PARAM registro: recebe material_id, material_categoria_name, material_name, material_numero_patrimonio, material_valor_unitario
*/
async function mat_adicionarLinhaGrade(registro) {
    // Dados para preenchera linha da grade
    let material_id = registro.material_id;
    let material_categoria_name = registro.material_categoria_name;
    let material_name = registro.material_name;
    let material_numero_patrimonio = registro.material_numero_patrimonio;
    let material_valor_unitario = toNumberOrMoney(registro.material_valor_unitario, 'money');

    let ordenar = material_categoria_name+' '+material_name;
    let id_linha_hiddens = material_id;

    // Montar Linha
    let linha;

    linha = `<tr class="tr_material_linha" id="mat_materialLinha_${id_linha_hiddens}" data-material_id="${material_id}" data-ordenar="${ordenar}">
                <td class="p-2 text-start align-middle">
                    <div class="text-black">${material_categoria_name}</div>
                    <div class="text-primary">${material_name}</div>
                </td>
                <td class="p-2 text-center align-middle text-nowrap">${material_numero_patrimonio}</td>
                <td class="p-2 text-center align-middle text-nowrap">${material_valor_unitario}</td>`;

    if (frm_operacao.value != 'view') {
        linha += `<td class="p-2 text-center align-middle text-nowrap">
                        <button type="button" class="btn btn-sm btn-primary text-write py-1" title="Editar Material da Grade" onclick="mat_editarLinhaGrade('${material_id}', '${material_numero_patrimonio}', '${material_valor_unitario}');">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-danger text-write py-1" title="Retirar Material da Grade" onclick="mat_removerLinhaGrade(1, ${material_id});">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>`;
    }

    linha += `</tr>`;

    // Adicionar linha na grade
    mat_gradeTbody.insertAdjacentHTML('beforeend', linha);

    // Montar campos hidden
    let hiddens;

    hiddens = `<div id="mat_material_hiddens_${id_linha_hiddens}">
                    <input type="hidden" name="mat_material_id[]" id="mat_material_id_${id_linha_hiddens}" value="${material_id}">
                    <input type="hidden" name="mat_material_categoria_name[]" id="mat_material_categoria_name_${id_linha_hiddens}" value="${material_categoria_name}">
                    <input type="hidden" name="mat_material_name[]" id="mat_material_name_${id_linha_hiddens}" value="${material_name}">
                    <input type="hidden" name="mat_material_numero_patrimonio[]" id="mat_material_numero_patrimonio_${id_linha_hiddens}" value="${material_numero_patrimonio}">
                    <input type="hidden" name="mat_material_valor_unitario[]" id="mat_material_valor_unitario_${id_linha_hiddens}" value="${material_valor_unitario}">
                </div>`;

    // Adicionar hiddens na div
    mat_camposHiddens.insertAdjacentHTML('beforeend', hiddens);
}

/*
 * Editar linha da grade Materiais
*/
async function mat_editarLinhaGrade(material_id, material_numero_patrimonio, material_valor_unitario) {
    mat_escolherMaterialId.value = material_id;
    mat_escolherMaterialNumeroPatrimonio.value = material_numero_patrimonio;
    mat_escolherMaterialValorUnitario.value = material_valor_unitario;
}

/*
 * Excluir linha da grade Materiais
 * @PARAM op: 1(Abre modal de confirmação)  2(Não abre modal de confirmação)
*/
async function mat_removerLinhaGrade(op, material_id) {
    let linha = document.getElementById('mat_materialLinha_' + material_id);
    let hiddens = document.getElementById('mat_material_hiddens_' + material_id);

    if (linha && hiddens) {
        if (op == 1) {
            const confirmed = await alertSwalConfirmacao();
            if (confirmed) {
                linha.remove();
                hiddens.remove();
            }
        }

        if (op == 2) {
            linha.remove();
            hiddens.remove();
        }
    }

    // Colocar Total Geral
    mat_colocarTotalGeralGrade();
}

/*
 * Ordenas linhas na grade Materiais
*/
async function mat_ordenarLinhasGrade() {
    let linhas = Array.from(mat_gradeTbody.querySelectorAll('.tr_material_linha'));

    linhas.sort((a, b) => {
        let valA = a.dataset.ordenar.toLowerCase();
        let valB = b.dataset.ordenar.toLowerCase();
        return valA.localeCompare(valB); // ordem alfabética
    });

    // Remove as linhas do tbody e reinsere na ordem
    mat_gradeTbody.innerHTML = "";
    linhas.forEach(linha => mat_gradeTbody.appendChild(linha));
}

async function mat_somarValorUnitarioGrade() {
    let soma = 0;

    document.querySelectorAll('input[name="mat_material_valor_unitario[]"]').forEach(campo => {
        let valor = campo.value || '0';

        // Limpa formatação e converte
        valor = valor.trim().replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.');

        const numero = parseFloat(valor);

        if (!isNaN(numero)) {
            soma += numero;
        }
    });

    return soma;
}

async function mat_colocarTotalGeralGrade() {
    let vt = await mat_somarValorUnitarioGrade();
    let valor = toNumberOrMoney(vt, 'money');
    document.getElementById('mat_gradeTotalGeral').innerHTML = valor;
    document.getElementById('valor_total_grade').value = valor;
}
// Grade de Materiais - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Grade de Materiais - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// DOMContentLoaded - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// DOMContentLoaded - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
document.addEventListener('DOMContentLoaded', function(event) {
    // Buscar dados do Fornecedor escolhido
    document.getElementById('fornecedor_id').addEventListener('change', async function () {
        const inputs = {
            id: document.getElementById('fornecedor_id'),
            fornecedor_nome: document.getElementById('fornecedor_nome'),
            fornecedor_cnpj: document.getElementById('fornecedor_cnpj'),
            fornecedor_email: document.getElementById('fornecedor_email'),
            fornecedor_telefone: document.getElementById('fornecedor_telefone'),
            fornecedor_celular: document.getElementById('fornecedor_celular'),
            fornecedor_logradouro: document.getElementById('fornecedor_logradouro'),
            fornecedor_logradouro_numero: document.getElementById('fornecedor_logradouro_numero'),
            fornecedor_logradouro_complemento: document.getElementById('fornecedor_logradouro_complemento'),
            fornecedor_bairro: document.getElementById('fornecedor_bairro'),
            fornecedor_cidade: document.getElementById('fornecedor_cidade'),
            fornecedor_uf: document.getElementById('fornecedor_uf')
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
            const response = await fetch(`fornecedores/${inputs.id.value}`, {
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            });
            const { success: fornecedor } = await response.json();

            inputs.fornecedor_nome.value       = fornecedor.name || '';
            inputs.fornecedor_cnpj.value       = fornecedor.cnpj || '';
            inputs.fornecedor_email.value      = fornecedor.email || '';
            inputs.fornecedor_telefone.value   = formatPhone(fornecedor.telefone_1 || fornecedor.telefone_2);
            inputs.fornecedor_celular.value    = formatPhone(fornecedor.celular_1 || fornecedor.celular_2);
            inputs.fornecedor_logradouro.value = fornecedor.logradouro || '';
            inputs.fornecedor_logradouro_numero.value = fornecedor.numero || '';
            inputs.fornecedor_logradouro_complemento.value = fornecedor.complemento || '';
            inputs.fornecedor_bairro.value     = fornecedor.bairro || '';
            inputs.fornecedor_cidade.value     = fornecedor.localidade || '';
            inputs.fornecedor_uf.value         = fornecedor.uf || '';
        } catch (e) {
            alert('Erro OrdensServicos: ' + e);
        }
    });

    // Grade de Materiais - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Grade de Materiais - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Adicionar na grade
    mat_btnAdicionar.addEventListener('click', async function() {
        let mensagem_erro = '';

        if (mat_escolherMaterialId.value == '') {
            mensagem_erro += 'Escolha um Material.<br>';
        }
        if (mat_escolherMaterialValorUnitario.value == '') {
            mensagem_erro += 'Digite um Valor Unitário.<br>';
        }
        if (mat_escolherMaterialNumeroPatrimonio.value == '') {
            mensagem_erro += 'Digite um Número de Patrimônio.<br>';
        }

        if (mensagem_erro != '') {
            alertSwal('error', 'Materiais Entradas', mensagem_erro, 'true', 2000);
            return;
        }

        let material_selected = mat_escolherMaterialId.options[mat_escolherMaterialId.selectedIndex];

        function adicionar() {
            mat_adicionarLinhaGrade({
                material_id: material_selected.dataset.material_id,
                material_categoria_name: material_selected.dataset.material_categoria_name,
                material_name: material_selected.dataset.material_name,
                material_numero_patrimonio: mat_escolherMaterialNumeroPatrimonio.value,
                material_valor_unitario: mat_escolherMaterialValorUnitario.value
            });

            mat_escolherMaterialId.value = '';
            mat_escolherMaterialNumeroPatrimonio.value = '';
            mat_escolherMaterialValorUnitario.value = '';
            mat_ordenarLinhasGrade();

            // Colocar Total Geral
            mat_colocarTotalGeralGrade();
        }

        if (mat_existeMaterialGrade(material_selected.dataset.material_id)) {
            const confirmed = await alertSwalConfirmacao('Este material já foi adicionado. Confirma alteração?');
            if (!confirmed) {
                return;
            }

            await mat_removerLinhaGrade(2, material_selected.dataset.material_id);
            adicionar();
        } else {
            adicionar();
        }
    });
    // Grade de Materiais - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Grade de Materiais - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
// DOMContentLoaded - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// DOMContentLoaded - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
