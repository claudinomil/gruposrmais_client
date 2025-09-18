function validar_frm_brigadas_incendios() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: cliente_id (requerido)
    if (validacao({op:1, value:document.getElementById('cliente_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.'+'<br>';
    }

    //Campo: cliente_nome (requerido)
    if (validacao({op:1, value:document.getElementById('cliente_nome').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.'+'<br>';
    }

    //Campo: data_abertura (Data Válida)
    if (validacao({op:1, value:document.getElementById('data_abertura').value}) === true) {
        if (validacao({op:8, value:document.getElementById('data_abertura').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data abertura inválida.'+'<br>';
        }
    }
    
    //Campo: data_prevista (Data Válida)
    if (validacao({op:1, value:document.getElementById('data_prevista').value}) === true) {
        if (validacao({op:8, value:document.getElementById('data_prevista').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data prevista inválida.'+'<br>';
        }
    }
    
    //Campo: data_conclusao (Data Válida)
    if (validacao({op:1, value:document.getElementById('data_conclusao').value}) === true) {
        if (validacao({op:8, value:document.getElementById('data_conclusao').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data conclusão inválida.'+'<br>';
        }
    }
    
    //Campo: data_finalizacao (Data Válida)
    if (validacao({op:1, value:document.getElementById('data_finalizacao').value}) === true) {
        if (validacao({op:8, value:document.getElementById('data_finalizacao').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data finalização inválida.'+'<br>';
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

//Elementos Globais
const frm_operacao = document.getElementById('frm_operacao');
const divInformacoesGerais = document.getElementById('divInformacoesGerais');

/*
 * Controlar Parte Principal da tela
 * @PARAM op = 1(Create)  2(View)  3(Edit) 
*/
function controleDisplay() {
    if (frm_operacao.value == 'create') {divInformacoesGerais.style.display = 'none';}
    if (frm_operacao.value == 'view') {divInformacoesGerais.style.display = '';}
    if (frm_operacao.value == 'edit') {divInformacoesGerais.style.display = '';}
}

//Materiais - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Materiais - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Elementos Globais
const mat_divMateriais = document.getElementById('mat_divMateriais');
const mat_divEscolherMaterial = document.getElementById('mat_divEscolherMaterial');
const mat_escolherMaterialId = document.getElementById('mat_escolherMaterialId');
const mat_escolherMaterialQuantidade = document.getElementById('mat_escolherMaterialQuantidade');
const mat_btnAdicionar = document.getElementById('mat_btnAdicionar');
const mat_thOpcoes = document.getElementById('mat_thOpcoes');
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
    }
    if (frm_operacao.value == 'view') {
        mat_divEscolherMaterial.style.display = 'none';
        mat_thOpcoes.style.display = 'none';
    }
    if (frm_operacao.value == 'edit') {
        mat_divEscolherMaterial.style.display = '';
        mat_thOpcoes.style.display = '';
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
 * @PARAM registro: recebe material_id, material_categoria_name, material_name, material_quantidade
*/
async function mat_adicionarLinhaGrade(registro) {
    //Dados para preenchera linha da grade
    let material_id = registro.material_id;
    let material_categoria_name = registro.material_categoria_name;
    let material_name = registro.material_name;
    let material_quantidade = registro.material_quantidade;

    let ordenar = material_categoria_name+' '+material_name;
    
    //Montar Linha
    let linha;

    linha = `<tr class="material_linha" id="mat_materialLinha_${material_id}" data-material_id="${material_id}" data-ordenar="${ordenar}">
                <td class="p-2 text-start align-middle">
                    <div class="text-black">${material_categoria_name}</div>
                    <div class="text-primary">${material_name}</div>
                </td>
                <td class="p-2 text-center align-middle text-nowrap">${material_quantidade}</td>`;

    if (frm_operacao.value != 'view') {
        linha += `<td class="p-2 text-center align-middle text-nowrap">
                        <button type="button" class="btn btn-sm btn-primary text-write py-1" title="Editar Material da Grade" onclick="mat_editarLinhaGrade(${material_id}, ${material_quantidade});">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-danger text-write py-1" title="Retirar Material da Grade" onclick="mat_removerLinhaGrade(1, ${material_id});">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>`;
    }

    linha += `</tr>`;

    //Adicionar linha na grade
    mat_gradeTbody.insertAdjacentHTML('beforeend', linha);

    //Montar campos hidden
    let hiddens;

    hiddens = `<div id="mat_material_hiddens_${material_id}">
                    <input type="hidden" name="mat_material_id[]" id="mat_material_id" value="${material_id}">
                    <input type="hidden" name="mat_material_categoria_name[]" id="mat_material_categoria_name" value="${material_categoria_name}">
                    <input type="hidden" name="mat_material_name[]" id="mat_material_name" value="${material_name}">
                    <input type="hidden" name="mat_material_quantidade[]" id="mat_material_quantidade" value="${material_quantidade}">
                </div>`;

    //Adicionar hiddens na div
    mat_camposHiddens.insertAdjacentHTML('beforeend', hiddens);
}

/*
 * Editar linha da grade Materiais
*/
async function mat_editarLinhaGrade(material_id, material_quantidade) {
    mat_escolherMaterialId.value = material_id;
    mat_escolherMaterialQuantidade.value = material_quantidade;
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
}

/*
 * Ordenas linhas na grade Materiais
*/
async function mat_ordenarLinhasGrade() {
    let linhas = Array.from(mat_gradeTbody.querySelectorAll('tr'));

    linhas.sort((a, b) => {
        let valA = a.dataset.ordenar.toLowerCase();
        let valB = b.dataset.ordenar.toLowerCase();
        return valA.localeCompare(valB); // ordem alfabética
    });

    // Remove as linhas do tbody e reinsere na ordem
    mat_gradeTbody.innerHTML = "";
    linhas.forEach(linha => mat_gradeTbody.appendChild(linha));
}
//Materiais - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Materiais - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Escalas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Escalas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Elementos Globais
const esc_divEscalas = document.getElementById('esc_divEscalas');
const esc_divEscolherEscala = document.getElementById('esc_divEscolherEscala');
const esc_escolherEscalaTipoId = document.getElementById('esc_escolherEscalaTipoId');
const esc_escolherQuantidadeBrigadistasPorAla = document.getElementById('esc_escolherQuantidadeBrigadistasPorAla');
const esc_escolherPosto = document.getElementById('esc_escolherPosto');
const esc_escolherHoraInicioAla1 = document.getElementById('esc_escolherHoraInicioAla1');
const esc_modalEscalaTipoIdCtrl = document.getElementById('esc_modalEscalaTipoIdCtrl');
const esc_modalQuantidadeBrigadistasPorAlaCtrl = document.getElementById('esc_modalQuantidadeBrigadistasPorAlaCtrl');
const esc_btnAdicionar = document.getElementById('esc_btnAdicionar');
const esc_thOpcoes = document.getElementById('esc_thOpcoes');
const esc_gradeTbody = document.getElementById('esc_gradeTbody');
const esc_camposHiddens = document.getElementById('esc_camposHiddens');
const esc_modalBrigadistasDados = document.getElementById('esc_modalBrigadistasDados');

/*
 * Controlar Parte da tela que trata de Escalas
*/
function esc_controleDisplay() {
    // Limpar esc_gradeTbody
    esc_gradeTbody.innerHTML = '';

    // Limpar esc_camposHiddens
    esc_camposHiddens.innerHTML = '';

    // Limpar esc_modalBrigadistasDados
    esc_modalBrigadistasDados.innerHTML = '';

    if (frm_operacao.value == 'create') {
        esc_divEscolherEscala.style.display = '';
        esc_thOpcoes.style.display = '';
    }
    if (frm_operacao.value == 'view') {
        esc_divEscolherEscala.style.display = 'none';
        esc_thOpcoes.style.display = 'none';
    }
    if (frm_operacao.value == 'edit') {
        esc_divEscolherEscala.style.display = '';
        esc_thOpcoes.style.display = '';
    }
}

/*
 * Verificar se Escala já existe na grade
*/
function esc_existeEscalaGrade(escala_tipo_id, posto) {
    let id_linha_hiddens = `${escala_tipo_id}${posto.replace(/\s+/g, "")}`;

    if (document.getElementById("esc_escalaLinha_" + id_linha_hiddens)) {
        return true;
    } else {
        return false;
    }
}

/*
 * Adicionar linha na grade
 * @PARAM registro: recebe escala_tipo_id, escala_tipo_name, escala_tipo_quantidade_alas, escala_tipo_quantidade_horas_trabalhadas, escala_tipo_quantidade_horas_descanso
*/
async function esc_adicionarLinhaGrade(registro) {
    //Dados para preenchera linha da grade
    let escala_tipo_id = registro.escala_tipo_id;
    let escala_tipo_name = registro.escala_tipo_name;
    let escala_tipo_quantidade_alas = registro.escala_tipo_quantidade_alas;
    let escala_tipo_quantidade_horas_trabalhadas = registro.escala_tipo_quantidade_horas_trabalhadas;
    let escala_tipo_quantidade_horas_descanso = registro.escala_tipo_quantidade_horas_descanso;
    let quantidade_brigadistas_por_ala = registro.quantidade_brigadistas_por_ala;
    let quantidade_brigadistas_total = registro.quantidade_brigadistas_total;
    let posto = registro.posto;
    let hora_inicio_ala_1 = registro.hora_inicio_ala_1;

    let ordenar = escala_tipo_name;

    let id_linha_hiddens = `${escala_tipo_id}${posto.replace(/\s+/g, "")}`;
    
    // Montar Linha
    let linha;

    linha = `<tr class="escala_linha" id="esc_escalaLinha_${id_linha_hiddens}" data-escala_tipo_id="${escala_tipo_id}" data-ordenar="${ordenar}">
                <td class="p-2 text-start align-middle">
                    <div><strong>Tipo          : </strong>${escala_tipo_name}</div>
                    <div><strong>Posto         : </strong>${posto}</div>
                    <div><strong>Qtd Alas      : </strong>${escala_tipo_quantidade_alas}</div>
                    <div><strong>Qtd Brig/Ala  : </strong>${quantidade_brigadistas_por_ala}</div>
                    <div><strong>Qtd Brig/Total: </strong>${quantidade_brigadistas_total}</div>
                    <div><strong>Hr Iní. Ala 1 : </strong>${hora_inicio_ala_1}</div>
                </td>`;

    if (frm_operacao.value != 'view') {
        linha += `<td class="p-2 text-center align-middle text-nowrap">
                        <button type="button" class="btn btn-sm btn-primary text-write py-1" title="Editar Escala da Grade" onclick="esc_editarLinhaGrade(${escala_tipo_id}, ${quantidade_brigadistas_por_ala}, '${posto}', '${hora_inicio_ala_1}');">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-danger text-write py-1" title="Retirar Escala da Grade" onclick="esc_removerLinhaGrade(1, ${escala_tipo_id}, '${posto}');">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>`;
    }

    linha += `</tr>`;

    //Adicionar linha na grade
    esc_gradeTbody.insertAdjacentHTML('beforeend', linha);

    //Montar campos hidden
    let hiddens;

    hiddens = `<div id="esc_escala_hiddens_${id_linha_hiddens}">
                    <input type="hidden" name="esc_escala_tipo_id[]" id="esc_escala_tipo_id" value="${escala_tipo_id}">
                    <input type="hidden" name="esc_escala_tipo_name[]" id="esc_escala_tipo_name" value="${escala_tipo_name}">
                    <input type="hidden" name="esc_escala_tipo_quantidade_alas[]" id="esc_escala_tipo_quantidade_alas" value="${escala_tipo_quantidade_alas}">
                    <input type="hidden" name="esc_escala_tipo_quantidade_horas_trabalhadas[]" id="esc_escala_tipo_quantidade_horas_trabalhadas" value="${escala_tipo_quantidade_horas_trabalhadas}">
                    <input type="hidden" name="esc_escala_tipo_quantidade_horas_descanso[]" id="esc_escala_tipo_quantidade_horas_descanso" value="${escala_tipo_quantidade_horas_descanso}">
                    <input type="hidden" name="esc_quantidade_brigadistas_por_ala[]" id="esc_quantidade_brigadistas_por_ala" value="${quantidade_brigadistas_por_ala}">
                    <input type="hidden" name="esc_quantidade_brigadistas_total[]" id="esc_quantidade_brigadistas_total" value="${quantidade_brigadistas_total}">
                    <input type="hidden" name="esc_posto[]" id="esc_posto" value="${posto}">
                    <input type="hidden" name="esc_hora_inicio_ala_1[]" id="esc_hora_inicio_ala_1" value="${hora_inicio_ala_1}">
                </div>`;

    //Adicionar hiddens na div
    esc_camposHiddens.insertAdjacentHTML('beforeend', hiddens);
}

/*
 * Editar linha da grade Escalas
*/
async function esc_editarLinhaGrade(escala_tipo_id, quantidade_brigadistas_por_ala, posto, hora_inicio_ala_1) {
    esc_escolherEscalaTipoId.value = escala_tipo_id;
    esc_escolherQuantidadeBrigadistasPorAla.value = quantidade_brigadistas_por_ala;
    esc_escolherPosto.value = posto;
    esc_escolherHoraInicioAla1.value = hora_inicio_ala_1;
}

/*
 * Excluir linha da grade Escalas
 * @PARAM op: 1(Abre modal de confirmação)  2(Não abre modal de confirmação)
*/
async function esc_removerLinhaGrade(op, escala_tipo_id, posto) {
    let id_linha_hiddens = `${escala_tipo_id}${posto.replace(/\s+/g, "")}`;

    let linha = document.getElementById('esc_escalaLinha_' + id_linha_hiddens);
    let hiddens = document.getElementById('esc_escala_hiddens_' + id_linha_hiddens);

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
}

/*
 * Ordenas linhas na grade Escalas
*/
async function esc_ordenarLinhasGrade() {
    let linhas = Array.from(esc_gradeTbody.querySelectorAll('tr'));

    linhas.sort((a, b) => {
        let valA = a.dataset.ordenar.toLowerCase();
        let valB = b.dataset.ordenar.toLowerCase();
        return valA.localeCompare(valB); // ordem alfabética
    });

    // Remove as linhas do tbody e reinsere na ordem
    esc_gradeTbody.innerHTML = "";
    linhas.forEach(linha => esc_gradeTbody.appendChild(linha));
}

/*
 * Montar esc_modalBrigadistasDados
*/
async function esc_modalBrigadistasDadosMontar() {
    // Verificar campos exigidos
    if (esc_escolherEscalaTipoId.value == '' || esc_escolherQuantidadeBrigadistasPorAla.value == '') {
        return;
    }

    // Pegar dados da Escala Tipo selecionada
    let escala_selected = esc_escolherEscalaTipoId.options[esc_escolherEscalaTipoId.selectedIndex];
    let escala_tipo_quantidade_alas = escala_selected.dataset.escala_tipo_quantidade_alas;

    // Outros dados
    let quantidade_brigadistas_total = esc_escolherQuantidadeBrigadistasPorAla.value * escala_tipo_quantidade_alas;
    let montarModal = 0;
    let ala = 0;

    // Verificar se é para reconstruir o Modal

    console.log(esc_escolherEscalaTipoId.value);
    console.log(esc_modalEscalaTipoIdCtrl.value);
    console.log(esc_escolherQuantidadeBrigadistasPorAla.value);
    console.log(esc_modalQuantidadeBrigadistasPorAlaCtrl.value);

    if ((esc_escolherEscalaTipoId.value != esc_modalEscalaTipoIdCtrl.value) || (esc_escolherQuantidadeBrigadistasPorAla.value != esc_modalQuantidadeBrigadistasPorAlaCtrl.value)) {
        // Limpar esc_modalBrigadistasDados
        esc_modalBrigadistasDados.innerHTML = '';

        montarModal = 1;
    }

    if (montarModal == 1) {
        // Guardar variaveis de Ctrl
        esc_modalEscalaTipoIdCtrl.value = esc_escolherEscalaTipoId.value;
        esc_modalQuantidadeBrigadistasPorAlaCtrl.value = esc_escolherQuantidadeBrigadistasPorAla.value;

        // Buscar dados Funcionários
        const response = await fetch('brigadas_incendios/dados/tables/1', {
            headers: {
                'REQUEST-ORIGIN': 'fetch',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            }
        });

        const dados = await response.json();
        const funcionarios = dados.funcionarios;

        for(i=1; i<=escala_tipo_quantidade_alas; i++) {
            ala++;

            for(x=1; x<=esc_escolherQuantidadeBrigadistasPorAla.value; x++) {
                // Montar Linha
                let linha = '';
                
                linha = `<div class="form-group col-10 pb-3">
                            <select class="form-select form-select-sm" name="esc_escolherFuncionarioId[]">
                                <option value="">Brigadista...</option>`;

                                funcionarios.forEach(function(item) {
                                    linha += `<option value="${item.id}">${item.name}</option>`;
                                });

                linha += `  </select>
                        </div>
                        <div class="form-group col-2 pb-3">
                            <input type="text" class="form-control form-control-sm text-center" name="esc_escolherFuncionarioAla[]" value="${ala}" readonly>
                        </div>`;
                        
                // Adicionar linha
                esc_modalBrigadistasDados.insertAdjacentHTML('beforeend', linha);
            }
        }
    }
}
//Escalas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Escalas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

document.addEventListener('DOMContentLoaded', function(event) {
    // Buscar dados do Cliente escolhido
    document.getElementById('cliente_id').addEventListener('change', async function () {
        const inputs = {
            id: document.getElementById('cliente_id'),
            cliente_nome: document.getElementById('cliente_nome'),
            cliente_cnpj: document.getElementById('cliente_cnpj'),
            cliente_email: document.getElementById('cliente_email'),
            cliente_telefone: document.getElementById('cliente_telefone'),
            cliente_celular: document.getElementById('cliente_celular'),
            cliente_logradouro: document.getElementById('cliente_logradouro'),
            cliente_logradouro_numero: document.getElementById('cliente_logradouro_numero'),
            cliente_logradouro_complemento: document.getElementById('cliente_logradouro_complemento'),
            cliente_bairro: document.getElementById('cliente_bairro'),
            cliente_cidade: document.getElementById('cliente_cidade'),
            cliente_uf: document.getElementById('cliente_uf')
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
            const response = await fetch(`clientes/${inputs.id.value}`, {
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            });
            const { success: cliente } = await response.json();

            inputs.cliente_nome.value       = cliente.name || '';
            inputs.cliente_cnpj.value       = cliente.cnpj || '';
            inputs.cliente_email.value      = cliente.email || '';
            inputs.cliente_telefone.value   = formatPhone(cliente.telefone_1 || cliente.telefone_2);
            inputs.cliente_celular.value    = formatPhone(cliente.celular_1 || cliente.celular_2);
            inputs.cliente_logradouro.value = cliente.logradouro || '';
            inputs.cliente_logradouro_numero.value = cliente.numero || '';
            inputs.cliente_logradouro_complemento.value = cliente.complemento || '';
            inputs.cliente_bairro.value     = cliente.bairro || '';
            inputs.cliente_cidade.value     = cliente.localidade || '';
            inputs.cliente_uf.value         = cliente.uf || '';
        } catch (e) {
            alert('Erro OrdensServicos: ' + e);
        }
    });

    //Materiais - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Materiais - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Adicionar na grade
    mat_btnAdicionar.addEventListener('click', async function() {
        let mensagem_erro = '';

        if (mat_escolherMaterialId.value == '') {
            mensagem_erro += 'Escolha um Material.<br>';
        }
        if (mat_escolherMaterialQuantidade.value == '') {
            mensagem_erro += 'Digite uma Quantidade.<br>';
        }

        if (mensagem_erro != '') {
            alertSwal('error', 'Brigadas Incêndios', mensagem_erro, 'true', 2000);
            return;
        }

        let material_selected = mat_escolherMaterialId.options[mat_escolherMaterialId.selectedIndex];

        function adicionar() {
            mat_adicionarLinhaGrade({
                material_id: material_selected.dataset.material_id,
                material_categoria_name: material_selected.dataset.material_categoria_name,
                material_name: material_selected.dataset.material_name,
                material_quantidade: mat_escolherMaterialQuantidade.value
            });

            mat_escolherMaterialId.value = '';
            mat_escolherMaterialQuantidade.value = '';
            mat_ordenarLinhasGrade();
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
    //Materiais - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Materiais - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Escalas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Escalas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Adicionar na grade
    esc_btnAdicionar.addEventListener('click', async function() {
        let mensagem_erro = '';

        if (esc_escolherEscalaTipoId.value == '') {
            mensagem_erro += 'Escolha um Tipo.<br>';
        }
        if (esc_escolherQuantidadeBrigadistasPorAla.value == '') {
            mensagem_erro += 'Escolha uma Qtd Brig/Ala.<br>';
        }
        if (esc_escolherPosto.value == '') {
            mensagem_erro += 'Escolha um Posto.<br>';
        }
        if (esc_escolherHoraInicioAla1.value == '') {
            mensagem_erro += 'Escolha uma Hr Iní. Ala 1.<br>';
        }
        if (mensagem_erro != '') {
            alertSwal('error', 'Brigadas Incêndios', mensagem_erro, 'true', 2000);
            return;
        }

        let escala_selected = esc_escolherEscalaTipoId.options[esc_escolherEscalaTipoId.selectedIndex];

        function adicionar() {
            esc_adicionarLinhaGrade({
                escala_tipo_id: escala_selected.dataset.escala_tipo_id,
                escala_tipo_name: escala_selected.dataset.escala_tipo_name,
                escala_tipo_quantidade_alas: escala_selected.dataset.escala_tipo_quantidade_alas,
                escala_tipo_quantidade_horas_trabalhadas: escala_selected.dataset.escala_tipo_quantidade_horas_trabalhadas,
                escala_tipo_quantidade_horas_descanso: escala_selected.dataset.escala_tipo_quantidade_horas_descanso,
                quantidade_brigadistas_por_ala: esc_escolherQuantidadeBrigadistasPorAla.value,
                quantidade_brigadistas_total: esc_escolherQuantidadeBrigadistasPorAla.value * escala_selected.dataset.escala_tipo_quantidade_alas,
                posto: esc_escolherPosto.value,
                hora_inicio_ala_1: esc_escolherHoraInicioAla1.value
            });

            esc_escolherEscalaTipoId.value = '';
            esc_escolherQuantidadeBrigadistasPorAla.value = '';
            esc_escolherPosto.value = '';
            esc_escolherHoraInicioAla1.value = '';

            esc_ordenarLinhasGrade();
        }

        if (esc_existeEscalaGrade(escala_selected.dataset.escala_tipo_id, esc_escolherPosto.value)) {
            const confirmed = await alertSwalConfirmacao('Esta escala já foi adicionado. Confirma alteração?');
            if (!confirmed) {
                return;
            }

            await esc_removerLinhaGrade(2, escala_selected.dataset.escala_tipo_id, esc_escolherPosto.value);
            adicionar();
        } else {
            adicionar();
        }
    });
    //Escalas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Escalas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});