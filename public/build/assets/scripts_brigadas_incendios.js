// Dados Principais - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Dados Principais - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function validar_frm_brigadas_incendios() {
    var validacao_ok = true;
    var mensagem = '';

    // Campo: cliente_id (requerido)
    if (validacao({op:1, value:document.getElementById('cliente_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.'+'<br>';
    }

    // Campo: cliente_nome (requerido)
    if (validacao({op:1, value:document.getElementById('cliente_nome').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.'+'<br>';
    }

    // Campo: data_abertura (Data Válida)
    if (validacao({op:1, value:document.getElementById('data_abertura').value}) === true) {
        if (validacao({op:8, value:document.getElementById('data_abertura').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data abertura inválida.'+'<br>';
        }
    }

    // Campo: data_prevista (Data Válida)
    if (validacao({op:1, value:document.getElementById('data_prevista').value}) === true) {
        if (validacao({op:8, value:document.getElementById('data_prevista').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data prevista inválida.'+'<br>';
        }
    }

    // Campo: data_conclusao (Data Válida)
    if (validacao({op:1, value:document.getElementById('data_conclusao').value}) === true) {
        if (validacao({op:8, value:document.getElementById('data_conclusao').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data conclusão inválida.'+'<br>';
        }
    }

    // Campo: data_finalizacao (Data Válida)
    if (validacao({op:1, value:document.getElementById('data_finalizacao').value}) === true) {
        if (validacao({op:8, value:document.getElementById('data_finalizacao').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data finalização inválida.'+'<br>';
        }
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
// Dados Principais - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Dados Principais - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Grade de Produtos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Grade de Produtos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Elementos Globais
const pro_divProdutos = document.getElementById('pro_divProdutos');
const pro_divEscolherProduto = document.getElementById('pro_divEscolherProduto');
const pro_escolherProdutoId = document.getElementById('pro_escolherProdutoId');
const pro_escolherProdutoQuantidade = document.getElementById('pro_escolherProdutoQuantidade');
const pro_btnAdicionar = document.getElementById('pro_btnAdicionar');
const pro_thOpcoes = document.getElementById('pro_thOpcoes');
const pro_gradeTbody = document.getElementById('pro_gradeTbody');
const pro_camposHiddens = document.getElementById('pro_camposHiddens');

/*
 * Controlar Parte da tela que trata de Produtos
*/
function pro_controleDisplay() {
    // Limpar pro_gradeTbody
    pro_gradeTbody.innerHTML = '';

    // Limpar pro_camposHiddens
    pro_camposHiddens.innerHTML = '';

    if (frm_operacao.value == 'create') {
        pro_divEscolherProduto.style.display = '';
        pro_thOpcoes.style.display = '';
    }
    if (frm_operacao.value == 'view') {
        pro_divEscolherProduto.style.display = 'none';
        pro_thOpcoes.style.display = 'none';
    }
    if (frm_operacao.value == 'edit') {
        pro_divEscolherProduto.style.display = '';
        pro_thOpcoes.style.display = '';
    }
}

/*
 * Verificar se Produto já existe na grade
*/
function pro_existeProdutoGrade(produto_id) {
    if (document.getElementById("pro_produtoLinha_" + produto_id)) {
        return true;
    } else {
        return false;
    }
}

/*
 * Adicionar linha na grade
 * @PARAM registro: recebe produto_id, produto_categoria_name, produto_name, produto_quantidade
*/
async function pro_adicionarLinhaGrade(registro) {
    // Dados para preenchera linha da grade
    let produto_id = registro.produto_id;
    let produto_categoria_name = registro.produto_categoria_name;
    let produto_name = registro.produto_name;
    let produto_quantidade = registro.produto_quantidade;

    let ordenar = produto_categoria_name+' '+produto_name;
    let id_linha_hiddens = produto_id;

    // Montar Linha
    let linha;

    linha = `<tr class="tr_produto_linha" id="pro_produtoLinha_${id_linha_hiddens}" data-produto_id="${produto_id}" data-ordenar="${ordenar}">
                <td class="p-2 text-start align-middle">
                    <div class="text-black">${produto_categoria_name}</div>
                    <div class="text-primary">${produto_name}</div>
                </td>
                <td class="p-2 text-center align-middle text-nowrap">${produto_quantidade}</td>`;

    if (frm_operacao.value != 'view') {
        linha += `<td class="p-2 text-center align-middle text-nowrap">
                        <button type="button" class="btn btn-sm btn-primary text-write py-1" title="Editar Produto da Grade" onclick="pro_editarLinhaGrade(${produto_id}, ${produto_quantidade});">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-danger text-write py-1" title="Retirar Produto da Grade" onclick="pro_removerLinhaGrade(1, ${produto_id});">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>`;
    }

    linha += `</tr>`;

    // Adicionar linha na grade
    pro_gradeTbody.insertAdjacentHTML('beforeend', linha);

    // Montar campos hidden
    let hiddens;

    hiddens = `<div id="pro_produto_hiddens_${id_linha_hiddens}">
                    <input type="hidden" name="pro_produto_id[]" id="pro_produto_id_${id_linha_hiddens}" value="${produto_id}">
                    <input type="hidden" name="pro_produto_categoria_name[]" id="pro_produto_categoria_name_${id_linha_hiddens}" value="${produto_categoria_name}">
                    <input type="hidden" name="pro_produto_name[]" id="pro_produto_name_${id_linha_hiddens}" value="${produto_name}">
                    <input type="hidden" name="pro_produto_quantidade[]" id="pro_produto_quantidade_${id_linha_hiddens}" value="${produto_quantidade}">
                </div>`;

    // Adicionar hiddens na div
    pro_camposHiddens.insertAdjacentHTML('beforeend', hiddens);
}

/*
 * Editar linha da grade Produtos
*/
async function pro_editarLinhaGrade(produto_id, produto_quantidade) {
    pro_escolherProdutoId.value = produto_id;
    pro_escolherProdutoQuantidade.value = produto_quantidade;
}

/*
 * Excluir linha da grade Produtos
 * @PARAM op: 1(Abre modal de confirmação)  2(Não abre modal de confirmação)
*/
async function pro_removerLinhaGrade(op, produto_id) {
    let linha = document.getElementById('pro_produtoLinha_' + produto_id);
    let hiddens = document.getElementById('pro_produto_hiddens_' + produto_id);

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
 * Ordenas linhas na grade Produtos
*/
async function pro_ordenarLinhasGrade() {
    let linhas = Array.from(pro_gradeTbody.querySelectorAll('.tr_produto_linha'));

    linhas.sort((a, b) => {
        let valA = a.dataset.ordenar.toLowerCase();
        let valB = b.dataset.ordenar.toLowerCase();
        return valA.localeCompare(valB); // ordem alfabética
    });

    // Remove as linhas do tbody e reinsere na ordem
    pro_gradeTbody.innerHTML = "";
    linhas.forEach(linha => pro_gradeTbody.appendChild(linha));
}
// Grade de Produtos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Grade de Produtos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Grade de Escalas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Grade de Escalas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Elementos Globais
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

    // Limpar esc_modalBrigadistasDados e Ctrl's
    esc_modalBrigadistasDados.innerHTML = '';
    esc_modalEscalaTipoIdCtrl.value = 0;
    esc_modalQuantidadeBrigadistasPorAlaCtrl.value = 0;

    // frm_operacao
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
async function esc_existeEscalaGrade(escala_tipo_id, posto) {
    // Gerar id_linha_hiddens''''''''''''''''''''''''''''''''''''''''''''''''
    let codigo = await gerarCodigoNumerico(posto);
    let id_linha_hiddens = `${escala_tipo_id}_${codigo}`;
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    if (document.getElementById("esc_escalaLinha_" + id_linha_hiddens)) {
        return true;
    } else {
        return false;
    }
}

/*
 * Adicionar linha na grade
 * @PARAM registro: recebe dados da escala e seus brigadistas
*/
async function esc_adicionarLinhaGrade(registro) {
    // Dados para preenchera linha da grade
    let escala_tipo_id = registro.escala_tipo_id;
    let escala_tipo_name = registro.escala_tipo_name;
    let escala_tipo_quantidade_alas = registro.escala_tipo_quantidade_alas;
    let escala_tipo_quantidade_horas_trabalhadas = registro.escala_tipo_quantidade_horas_trabalhadas;
    let escala_tipo_quantidade_horas_descanso = registro.escala_tipo_quantidade_horas_descanso;
    let quantidade_brigadistas_por_ala = registro.quantidade_brigadistas_por_ala;
    let quantidade_brigadistas_total = registro.quantidade_brigadistas_total;
    let posto = registro.posto;
    let hora_inicio_ala_1 = registro.hora_inicio_ala_1;
    let brigadistas = registro.brigadistas;

    let ordenar = escala_tipo_name;

    // Gerar id_linha_hiddens
    let codigo = await gerarCodigoNumerico(posto);
    let id_linha_hiddens = `${escala_tipo_id}_${codigo}`;

    // Montar Linha
    let linha;

    linha = `<tr class="tr_escala_linha" id="esc_escalaLinha_${id_linha_hiddens}" data-escala_tipo_id="${escala_tipo_id}" data-ordenar="${ordenar}">
                <td class="p-2 text-start">
                    <div><strong>Tipo          : </strong>${escala_tipo_name}</div>
                    <div><strong>Posto         : </strong>${posto}</div>
                    <div><strong>Qtd Alas      : </strong>${escala_tipo_quantidade_alas}</div>
                    <div><strong>Qtd Brig/Ala  : </strong>${quantidade_brigadistas_por_ala}</div>
                    <div><strong>Qtd Brig/Total: </strong>${quantidade_brigadistas_total}</div>
                    <div><strong>Hr Iní. Ala 1 : </strong>${hora_inicio_ala_1}</div>
                </td>`;

    // Preparar coluna Brigadistas
    linha += `<td class="p-2 text-end">
                <div class="table-responsive">
                    <table class="table table-sm mb-0">
                        <thead>
                            <tr class="table-light">
                                <th class="text-center">#</th>
                                <th class="text-start">Brigadista</th>
                                <th class="text-center">Ala</th>
                            </tr>
                        </thead>
                        <tbody>`;

    let num = 0;
    let classTr = '';

    brigadistas.forEach(brig => {
        num++;
        classTr = (num % 2 === 0) ? 'table-success' : 'table-info';

        linha += `<tr class="${classTr}">
                    <th class="text-center" scope="row">${num}</th>
                    <td class="text-start">${brig.funcionario_name}</td>
                    <td class="text-center">${brig.ala}</td>
                  </tr>`;
    });

    linha += `  </tbody>
            </table>
            </div>`;

    // Colocar Opções
    if (frm_operacao.value != 'view') {
        linha += `<td class="p-2 text-center text-nowrap">
                        <button type="button" class="btn btn-sm btn-primary text-write py-1" title="Editar Escala da Grade" onclick="esc_editarLinhaGrade('${id_linha_hiddens}');">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-danger text-write py-1" title="Retirar Escala da Grade" onclick="esc_removerLinhaGrade(1, ${escala_tipo_id}, '${posto}');">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>`;
    }

    linha += `</tr>`;

    // Adicionar linha na grade
    esc_gradeTbody.insertAdjacentHTML('beforeend', linha);

    // Montar campos hidden
    let hiddens = `<div id="esc_escala_hiddens_${id_linha_hiddens}">
                        <input type="hidden" name="esc_id_linha_hiddens[]" id="esc_id_linha_hiddens_${id_linha_hiddens}" value="${id_linha_hiddens}">
                        <input type="hidden" name="esc_escala_tipo_id[]" id="esc_escala_tipo_id_${id_linha_hiddens}" value="${escala_tipo_id}">
                        <input type="hidden" name="esc_escala_tipo_name[]" id="esc_escala_tipo_name_${id_linha_hiddens}" value="${escala_tipo_name}">
                        <input type="hidden" name="esc_escala_tipo_quantidade_alas[]" id="esc_escala_tipo_quantidade_alas_${id_linha_hiddens}" value="${escala_tipo_quantidade_alas}">
                        <input type="hidden" name="esc_escala_tipo_quantidade_horas_trabalhadas[]" id="esc_escala_tipo_quantidade_horas_trabalhadas_${id_linha_hiddens}" value="${escala_tipo_quantidade_horas_trabalhadas}">
                        <input type="hidden" name="esc_escala_tipo_quantidade_horas_descanso[]" id="esc_escala_tipo_quantidade_horas_descanso_${id_linha_hiddens}" value="${escala_tipo_quantidade_horas_descanso}">
                        <input type="hidden" name="esc_quantidade_brigadistas_por_ala[]" id="esc_quantidade_brigadistas_por_ala_${id_linha_hiddens}" value="${quantidade_brigadistas_por_ala}">
                        <input type="hidden" name="esc_quantidade_brigadistas_total[]" id="esc_quantidade_brigadistas_total_${id_linha_hiddens}" value="${quantidade_brigadistas_total}">
                        <input type="hidden" name="esc_posto[]" id="esc_posto_${id_linha_hiddens}" value="${posto}">
                        <input type="hidden" name="esc_hora_inicio_ala_1[]" id="esc_hora_inicio_ala_1_${id_linha_hiddens}" value="${hora_inicio_ala_1}">`;

    brigadistas.forEach((brig, idx) => {
        hiddens += `<input type="hidden" name="esc_funcionario_id_${idx + 1}_${id_linha_hiddens}" id="esc_funcionario_id_${idx + 1}_${id_linha_hiddens}" value="${brig.funcionario_id}">`;
        hiddens += `<input type="hidden" name="esc_funcionario_name_${idx + 1}_${id_linha_hiddens}" id="esc_funcionario_name_${idx + 1}_${id_linha_hiddens}" value="${brig.funcionario_name}">`;
        hiddens += `<input type="hidden" name="esc_ala_${idx + 1}_${id_linha_hiddens}" id="esc_ala_${idx + 1}_${id_linha_hiddens}" value="${brig.ala}">`;
    });

    hiddens += `</div>`;

    // Adicionar hiddens na div
    esc_camposHiddens.insertAdjacentHTML('beforeend', hiddens);

    // Montar ger_escolherEscalaModelo
    ger_escolherEscalaModeloMontarSelect();
}

/*
 * Transforma o formulário do modal brigadistas "esc_modalBrigadistasDados" em um array para montar a tabela de brigadistas da escala
 */
async function esc_modalBrigadistasDadosArray() {
    const brigadistas = [];

    // Seleciona todos os selects de brigadistas
    const selects = document.querySelectorAll('select[name^="esc_escolherFuncionarioId_"]');

    selects.forEach(select => {
        const funcionario_id = select.value;
        const funcionario_name = select.options[select.selectedIndex]?.text || "";

        // Pega o índice do campo (ex: esc_escolherFuncionarioId_3 → 3)
        const idx = select.id.split("_").pop();

        // Busca o input correspondente da ala
        const alaInput = document.getElementById("esc_escolherFuncionarioAla_" + idx);
        const ala = alaInput ? parseInt(alaInput.value, 10) : null;

        if (funcionario_id) { // só adiciona se tiver selecionado alguém
            brigadistas.push({
                funcionario_id: funcionario_id,
                funcionario_name: funcionario_name,
                ala: ala
            });
        }
    });

    // Ordena por ala (número) e depois por nome
    brigadistas.sort((a, b) => {
        if (a.ala !== b.ala) {
            return a.ala - b.ala;
        }
        return a.funcionario_name.localeCompare(b.funcionario_name);
    });

    return brigadistas;
}

/*
 * Editar linha da grade Escalas
*/
async function esc_editarLinhaGrade(id_linha_hiddens) {
    let ed_escala_tipo_id = document.getElementById(`esc_escala_tipo_id_${id_linha_hiddens}`);
    let ed_quantidade_brigadistas_por_ala = document.getElementById(`esc_quantidade_brigadistas_por_ala_${id_linha_hiddens}`);
    let ed_posto = document.getElementById(`esc_posto_${id_linha_hiddens}`);
    let ed_hora_inicio_ala_1 = document.getElementById(`esc_hora_inicio_ala_1_${id_linha_hiddens}`);

    // Preencher campos Escolher
    esc_escolherEscalaTipoId.value = ed_escala_tipo_id.value;
    esc_escolherQuantidadeBrigadistasPorAla.value = ed_quantidade_brigadistas_por_ala.value;
    esc_escolherPosto.value = ed_posto.value;
    esc_escolherHoraInicioAla1.value = ed_hora_inicio_ala_1.value;

    // Montar Modal Brigadistas
    await esc_modalBrigadistasDadosMontar();

    // Preencher campos modal Brigadistas
    for(i=1; i<=300; i++) {
        let esc_escolherFuncionarioId = document.getElementById('esc_escolherFuncionarioId_'+i);
        let esc_escolherFuncionarioAla = document.getElementById('esc_escolherFuncionarioAla_'+i);

        if ((esc_escolherFuncionarioId) && (esc_escolherFuncionarioAla)) {
            esc_escolherFuncionarioId.value = document.getElementById(`esc_funcionario_id_${i}_${id_linha_hiddens}`).value;
            esc_escolherFuncionarioAla.value = document.getElementById(`esc_ala_${i}_${id_linha_hiddens}`).value;
        } else {
            i = 300;
        }
    }
}

/*
 * Excluir linha da grade Escalas
 * @PARAM op: 1(Abre modal de confirmação)  2(Não abre modal de confirmação)
*/
async function esc_removerLinhaGrade(op, escala_tipo_id, posto) {
    // Gerar id_linha_hiddens''''''''''''''''''''''''''''''''''''''''''''''''
    let codigo = await gerarCodigoNumerico(posto);
    let id_linha_hiddens = `${escala_tipo_id}_${codigo}`;
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

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
    let linhas = Array.from(esc_gradeTbody.querySelectorAll('.tr_escala_linha'));

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
    let num = 0;

    // Verificar se é para reconstruir o Modal
    if ((esc_escolherEscalaTipoId.value != esc_modalEscalaTipoIdCtrl.value) || (esc_escolherQuantidadeBrigadistasPorAla.value != esc_modalQuantidadeBrigadistasPorAlaCtrl.value)) {
        // Limpar esc_modalBrigadistasDados e Ctrl's
        esc_modalBrigadistasDados.innerHTML = '';
        esc_modalEscalaTipoIdCtrl.value = 0;
        esc_modalQuantidadeBrigadistasPorAlaCtrl.value = 0;

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
                num++;

                // Montar Linha
                let linha = '';

                linha = `<div class="form-group col-10 pb-3">
                            <select class="form-select form-select-sm" name="esc_escolherFuncionarioId_${num}" id="esc_escolherFuncionarioId_${num}" onchange="esc_modalBrigadistasDadosValidar();">
                                <option value="">Brigadista...</option>`;

                                funcionarios.forEach(function(item) {
                                    linha += `<option value="${item.id}">${item.name}</option>`;
                                });

                linha += `  </select>
                        </div>
                        <div class="form-group col-2 pb-3">
                            <input type="text" class="form-control form-control-sm text-center" name="esc_escolherFuncionarioAla_${num}" id="esc_escolherFuncionarioAla_${num}" value="${ala}" readonly>
                        </div>`;

                // Adicionar linha
                esc_modalBrigadistasDados.insertAdjacentHTML('beforeend', linha);
            }
        }
    }
}

async function esc_modalBrigadistasDadosValidar() {
    let valido = true;
    let funcionariosEscolhidos = new Map();

    // Limpa estados antigos
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());

    for(let i = 1; i <= 300; i++) {
        let esc_escolherFuncionarioId = document.getElementById('esc_escolherFuncionarioId_' + i);
        let esc_escolherFuncionarioAla = document.getElementById('esc_escolherFuncionarioAla_' + i);

        // Só valida se os campos realmente existirem
        if (esc_escolherFuncionarioId && esc_escolherFuncionarioAla) {
            let funcionario_id = esc_escolherFuncionarioId.value.trim();
            let funcionario_name = esc_escolherFuncionarioId.options[esc_escolherFuncionarioId.selectedIndex].text.trim();
            let ala = esc_escolherFuncionarioAla.value.trim();

            // Validar brigadista
            if (funcionario_id === "") {
                esc_modalBrigadistasDadosMarcarInvalido(esc_escolherFuncionarioId, "Selecione um brigadista");
                valido = false;
            }

            // Validar ala
            if (ala === "") {
                esc_modalBrigadistasDadosMarcarInvalido(esc_escolherFuncionarioAla, "Informe a ala");
                valido = false;
            }

            // Verificar duplicidade
            if (funcionario_id !== "") {
                if (funcionariosEscolhidos.has(funcionario_id)) {
                    esc_modalBrigadistasDadosMarcarInvalido(
                        esc_escolherFuncionarioId,
                        `O brigadista "${funcionario_name}" já foi selecionado em outra linha`
                    );
                    valido = false;
                } else {
                    funcionariosEscolhidos.set(funcionario_id, i);
                }
            }
        } else {
            i = 300;
        }
    }

    return valido;
}

// Função auxiliar para aplicar erro visual
function esc_modalBrigadistasDadosMarcarInvalido(campo, mensagem) {
    campo.classList.add("is-invalid");

    let feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    feedback.innerText = mensagem;

    // Evitar duplicar mensagens
    if (!campo.parentNode.querySelector(".invalid-feedback")) {
        campo.parentNode.appendChild(feedback);
    }
}
// Grade de Escalas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Grade de Escalas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Grade de Geradas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Grade de Geradas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Elementos Globais
const ger_divGeradas = document.getElementById('ger_divGeradas');
const ger_divEscolherGerada = document.getElementById('ger_divEscolherGerada');
const ger_escolherEscalaModelo = document.getElementById('ger_escolherEscalaModelo');
const ger_escolherDataInicio = document.getElementById('ger_escolherDataInicio');
const ger_escolherDataTermino = document.getElementById('ger_escolherDataTermino');
const ger_btnAdicionar = document.getElementById('ger_btnAdicionar');
const ger_thOpcoes = document.getElementById('ger_thOpcoes');
const ger_gradeTbody = document.getElementById('ger_gradeTbody');
const ger_camposHiddens = document.getElementById('ger_camposHiddens');

/*
 * Controlar Parte da tela que trata de Escalas
*/
function ger_controleDisplay() {
    // Limpar ger_gradeTbody
    ger_gradeTbody.innerHTML = '';

    // Limpar ger_camposHiddens
    ger_camposHiddens.innerHTML = '';

    // frm_operacao
    if (frm_operacao.value == 'create') {
        ger_divEscolherGerada.style.display = '';
        ger_thOpcoes.style.display = '';
    }

    if (frm_operacao.value == 'view') {
        ger_divEscolherGerada.style.display = 'none';
        ger_thOpcoes.style.display = 'none';
    }

    if (frm_operacao.value == 'edit') {
        ger_divEscolherGerada.style.display = '';
        ger_thOpcoes.style.display = '';
    }
}

/*
 * Adicionar linha na grade
 * @PARAM registro: recebe dados da escala e seus brigadistas
*/
async function ger_adicionarLinhaGrade(registro) {
    // Dados para preenchera linha da grade
    let escala_tipo_id = registro.escala_tipo_id;
    let escala_tipo_name = registro.escala_tipo_name;
    let escala_tipo_quantidade_alas = registro.escala_tipo_quantidade_alas;
    let escala_tipo_quantidade_horas_trabalhadas = registro.escala_tipo_quantidade_horas_trabalhadas;
    let escala_tipo_quantidade_horas_descanso = registro.escala_tipo_quantidade_horas_descanso;
    let quantidade_brigadistas_por_ala = registro.quantidade_brigadistas_por_ala;
    let quantidade_brigadistas_total = registro.quantidade_brigadistas_total;
    let posto = registro.posto;
    let hora_inicio_ala_1 = registro.hora_inicio_ala_1;
    let data_inicio = registro.data_inicio;
    let data_termino = registro.data_termino;
    let brigadistas = JSON.parse(registro.brigadistas);

    let ordenar = escala_tipo_name;

    // Gerar id_linha_hiddens
    let codigo = await gerarCodigoNumerico(posto);
    let id_linha_hiddens = `${escala_tipo_id}_${codigo}`;

    // Montar Linha
    let linha;

    linha = `<tr class="tr_escala_linha" id="ger_escalaLinha_${id_linha_hiddens}" data-escala_tipo_id="${escala_tipo_id}" data-ordenar="${ordenar}">
                <td class="p-2 text-start">
                    <div><strong>Tipo          : </strong>${escala_tipo_name}</div>
                    <div><strong>Posto         : </strong>${posto}</div>
                    <div><strong>Qtd Alas      : </strong>${escala_tipo_quantidade_alas}</div>
                    <div><strong>Qtd Brig/Ala  : </strong>${quantidade_brigadistas_por_ala}</div>
                    <div><strong>Qtd Brig/Total: </strong>${quantidade_brigadistas_total}</div>
                    <div><strong>Hr Iní. Ala 1 : </strong>${hora_inicio_ala_1}</div>
                    <div><strong>Data Início   : </strong>${data_inicio}</div>
                    <div><strong>Data Término   : </strong>${data_termino}</div>
                </td>`;

    // Preparar coluna Brigadistas
    linha += `<td class="p-2 text-end">
                <div class="table-responsive">
                    <table class="table table-sm mb-0">
                        <thead>
                            <tr class="table-light">
                                <th class="text-center">#</th>
                                <th class="text-start">Brigadista</th>
                                <th class="text-center">Ala</th>
                            </tr>
                        </thead>
                        <tbody>`;

    let num = 0;
    let classTr = '';

    brigadistas.forEach(brig => {
        num++;
        classTr = (num % 2 === 0) ? 'table-success' : 'table-info';

        linha += `<tr class="${classTr}">
                    <th class="text-center" scope="row">${num}</th>
                    <td class="text-start">${brig.name}</td>
                    <td class="text-center">${brig.ala}</td>
                  </tr>`;
    });

    linha += `  </tbody>
            </table>
            </div>`;

    // Colocar Opções
    if (frm_operacao.value != 'view') {
        linha += `<td class="p-2 text-center text-nowrap">
                        <button type="button" class="btn btn-sm btn-primary text-write py-1" title="Editar Escala da Grade" onclick="ger_editarLinhaGrade('${id_linha_hiddens}');">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-danger text-write py-1" title="Retirar Escala da Grade" onclick="ger_removerLinhaGrade(1, ${escala_tipo_id}, '${posto}');">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>`;
    }

    linha += `</tr>`;

    // Adicionar linha na grade
    ger_gradeTbody.insertAdjacentHTML('beforeend', linha);

    // Montar campos hidden
    let hiddens = `<div id="ger_escala_hiddens_${id_linha_hiddens}">
                        <input type="hidden" name="ger_id_linha_hiddens[]" id="ger_id_linha_hiddens_${id_linha_hiddens}" value="${id_linha_hiddens}">
                        <input type="hidden" name="ger_escala_tipo_id[]" id="ger_escala_tipo_id_${id_linha_hiddens}" value="${escala_tipo_id}">
                        <input type="hidden" name="ger_escala_tipo_name[]" id="ger_escala_tipo_name_${id_linha_hiddens}" value="${escala_tipo_name}">
                        <input type="hidden" name="ger_escala_tipo_quantidade_alas[]" id="ger_escala_tipo_quantidade_alas_${id_linha_hiddens}" value="${escala_tipo_quantidade_alas}">
                        <input type="hidden" name="ger_escala_tipo_quantidade_horas_trabalhadas[]" id="ger_escala_tipo_quantidade_horas_trabalhadas_${id_linha_hiddens}" value="${escala_tipo_quantidade_horas_trabalhadas}">
                        <input type="hidden" name="ger_escala_tipo_quantidade_horas_descanso[]" id="ger_escala_tipo_quantidade_horas_descanso_${id_linha_hiddens}" value="${escala_tipo_quantidade_horas_descanso}">
                        <input type="hidden" name="ger_quantidade_brigadistas_por_ala[]" id="ger_quantidade_brigadistas_por_ala_${id_linha_hiddens}" value="${quantidade_brigadistas_por_ala}">
                        <input type="hidden" name="ger_quantidade_brigadistas_total[]" id="ger_quantidade_brigadistas_total_${id_linha_hiddens}" value="${quantidade_brigadistas_total}">
                        <input type="hidden" name="ger_posto[]" id="ger_posto_${id_linha_hiddens}" value="${posto}">
                        <input type="hidden" name="ger_hora_inicio_ala_1[]" id="ger_hora_inicio_ala_1_${id_linha_hiddens}" value="${hora_inicio_ala_1}">`;

    brigadistas.forEach((brig, idx) => {
        hiddens += `<input type="hidden" name="ger_funcionario_id_${idx + 1}_${id_linha_hiddens}" id="ger_funcionario_id_${idx + 1}_${id_linha_hiddens}" value="${brig.id}">`;
        hiddens += `<input type="hidden" name="ger_funcionario_name_${idx + 1}_${id_linha_hiddens}" id="ger_funcionario_name_${idx + 1}_${id_linha_hiddens}" value="${brig.name}">`;
        hiddens += `<input type="hidden" name="ger_ala_${idx + 1}_${id_linha_hiddens}" id="ger_ala_${idx + 1}_${id_linha_hiddens}" value="${brig.ala}">`;
    });

    hiddens += `</div>`;

    // Adicionar hiddens na div
    ger_camposHiddens.insertAdjacentHTML('beforeend', hiddens);
}

/*
 * Editar linha da grade Escalas
*/
async function ger_editarLinhaGrade(id_linha_hiddens) {
    let ed_escala_tipo_id = document.getElementById(`ger_escala_tipo_id_${id_linha_hiddens}`);
    let ed_quantidade_brigadistas_por_ala = document.getElementById(`ger_quantidade_brigadistas_por_ala_${id_linha_hiddens}`);
    let ed_posto = document.getElementById(`ger_posto_${id_linha_hiddens}`);
    let ed_hora_inicio_ala_1 = document.getElementById(`ger_hora_inicio_ala_1_${id_linha_hiddens}`);

    // Preencher campos Escolher
    ger_escolherEscalaModelo.value = ed_escala_tipo_id.value;
    ger_escolherDataInicio.value = ed_quantidade_brigadistas_por_ala.value;
    ger_escolherDataTermino.value = ed_posto.value;

    // Preencher campos modal Brigadistas
    for(i=1; i<=300; i++) {
        let ger_escolherFuncionarioId = document.getElementById('ger_escolherFuncionarioId_'+i);
        let ger_escolherFuncionarioAla = document.getElementById('ger_escolherFuncionarioAla_'+i);

        if ((ger_escolherFuncionarioId) && (ger_escolherFuncionarioAla)) {
            ger_escolherFuncionarioId.value = document.getElementById(`ger_funcionario_id_${i}_${id_linha_hiddens}`).value;
            ger_escolherFuncionarioAla.value = document.getElementById(`ger_ala_${i}_${id_linha_hiddens}`).value;
        } else {
            i = 300;
        }
    }
}

/*
 * Excluir linha da grade Escalas
 * @PARAM op: 1(Abre modal de confirmação)  2(Não abre modal de confirmação)
*/
async function ger_removerLinhaGrade(op, escala_tipo_id, posto) {
    // Gerar id_linha_hiddens''''''''''''''''''''''''''''''''''''''''''''''''
    let codigo = await gerarCodigoNumerico(posto);
    let id_linha_hiddens = `${escala_tipo_id}_${codigo}`;
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    let linha = document.getElementById('ger_escalaLinha_' + id_linha_hiddens);
    let hiddens = document.getElementById('ger_escala_hiddens_' + id_linha_hiddens);

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
async function ger_ordenarLinhasGrade() {
    let linhas = Array.from(ger_gradeTbody.querySelectorAll('.tr_escala_linha'));

    linhas.sort((a, b) => {
        let valA = a.dataset.ordenar.toLowerCase();
        let valB = b.dataset.ordenar.toLowerCase();
        return valA.localeCompare(valB); // ordem alfabética
    });

    // Remove as linhas do tbody e reinsere na ordem
    ger_gradeTbody.innerHTML = "";
    linhas.forEach(linha => ger_gradeTbody.appendChild(linha));
}

function ger_escolherEscalaModeloMontarSelect() {
    // Iniciando options
    ger_escolherEscalaModelo.innerHTML = '<option value="">Selecione...</option>';

    // Variáveis
    let container = document.querySelector("#esc_camposHiddens");
    let divs = container.querySelectorAll("div[id^='esc_escala_hiddens_']");
    let contador = 1;

    // Montando
    divs.forEach(div => {
        let option = document.createElement("option");
        option.value = contador++;

        // dados principais
        option.dataset.escala_tipo_id = div.querySelector("input[name='esc_escala_tipo_id[]']").value;
        option.dataset.escala_tipo_name = div.querySelector("input[name='esc_escala_tipo_name[]']").value;
        option.dataset.escala_tipo_quantidade_alas = div.querySelector("input[name='esc_escala_tipo_quantidade_alas[]']").value;
        option.dataset.escala_tipo_quantidade_horas_trabalhadas = div.querySelector("input[name='esc_escala_tipo_quantidade_horas_trabalhadas[]']").value;
        option.dataset.escala_tipo_quantidade_horas_descanso = div.querySelector("input[name='esc_escala_tipo_quantidade_horas_descanso[]']").value;
        option.dataset.quantidade_brigadistas_por_ala = div.querySelector("input[name='esc_quantidade_brigadistas_por_ala[]']").value;
        option.dataset.quantidade_brigadistas_total = div.querySelector("input[name='esc_quantidade_brigadistas_total[]']").value;
        option.dataset.posto = div.querySelector("input[name='esc_posto[]']").value;
        option.dataset.hora_inicio_ala_1 = div.querySelector("input[name='esc_hora_inicio_ala_1[]']").value;

        // brigadistas (sem split de ID)
        let ids = div.querySelectorAll("input[id^='esc_funcionario_id_']");
        let nomes = div.querySelectorAll("input[id^='esc_funcionario_name_']");
        let alas = div.querySelectorAll("input[id^='esc_ala_']");

        let brigadistas = [];
        ids.forEach((input, idx) => {
            brigadistas.push({
                id: input.value,
                name: nomes[idx] ? nomes[idx].value : "",
                ala: alas[idx] ? alas[idx].value : ""
            });
        });

        option.dataset.brigadistas = JSON.stringify(brigadistas);

        // texto visível
        option.textContent = `Escala ${option.dataset.escala_tipo_name} - Posto ${option.dataset.posto}`;

        ger_escolherEscalaModelo.appendChild(option);
    });
}
// Grade de Geradas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Grade de Geradas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// DOMContentLoaded - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// DOMContentLoaded - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
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

    // Grade de Produtos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Grade de Produtos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Adicionar na grade
    pro_btnAdicionar.addEventListener('click', async function() {
        let mensagem_erro = '';

        if (pro_escolherProdutoId.value == '') {
            mensagem_erro += 'Escolha um Produto.<br>';
        }
        if (pro_escolherProdutoQuantidade.value == '') {
            mensagem_erro += 'Digite uma Quantidade.<br>';
        }

        if (mensagem_erro != '') {
            alertSwal('error', 'Brigadas Incêndios', mensagem_erro, 'true', 2000);
            return;
        }

        let produto_selected = pro_escolherProdutoId.options[pro_escolherProdutoId.selectedIndex];

        function adicionar() {
            pro_adicionarLinhaGrade({
                produto_id: produto_selected.dataset.produto_id,
                produto_categoria_name: produto_selected.dataset.produto_categoria_name,
                produto_name: produto_selected.dataset.produto_name,
                produto_quantidade: pro_escolherProdutoQuantidade.value
            });

            pro_escolherProdutoId.value = '';
            pro_escolherProdutoQuantidade.value = '';
            pro_ordenarLinhasGrade();
        }

        if (pro_existeProdutoGrade(produto_selected.dataset.produto_id)) {
            const confirmed = await alertSwalConfirmacao('Este produto já foi adicionado. Confirma alteração?');
            if (!confirmed) {
                return;
            }

            await pro_removerLinhaGrade(2, produto_selected.dataset.produto_id);
            adicionar();
        } else {
            adicionar();
        }
    });
    // Grade de Produtos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Grade de Produtos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Grade de Escalas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Grade de Escalas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

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

        // Verificar se os campos de Ctrl do modal brigadistas está correto
        if ((esc_escolherEscalaTipoId.value != esc_modalEscalaTipoIdCtrl.value) || (esc_escolherQuantidadeBrigadistasPorAla.value != esc_modalQuantidadeBrigadistasPorAlaCtrl.value)) {
            // Limpar esc_modalBrigadistasDados e Ctrl's
            esc_modalBrigadistasDados.innerHTML = '';
            esc_modalEscalaTipoIdCtrl.value = 0;
            esc_modalQuantidadeBrigadistasPorAlaCtrl.value = 0;
        }

        // Verificando Brigadistas (Testar se tem esc_escolherFuncionarioId_1)
        let eBrigadista_1 = document.getElementById('esc_escolherFuncionarioId_1');

        if (!eBrigadista_1) {
            mensagem_erro += 'Escolha os brigadistas para a escala.<br>';
        } else {
            // Validar Brigadistas no modal
            let vBrigadistas = await esc_modalBrigadistasDadosValidar();

            if (vBrigadistas === false) {
                mensagem_erro += 'Confira os brigadistas para a escala.<br>';
            }
        }

        if (mensagem_erro != '') {
            alertSwal('error', 'Brigadas Incêndios', mensagem_erro, 'true', 2000);
            return;
        }

        let escala_selected = esc_escolherEscalaTipoId.options[esc_escolherEscalaTipoId.selectedIndex];

        async function adicionar() {
            await esc_adicionarLinhaGrade({
                escala_tipo_id: escala_selected.dataset.escala_tipo_id,
                escala_tipo_name: escala_selected.dataset.escala_tipo_name,
                escala_tipo_quantidade_alas: escala_selected.dataset.escala_tipo_quantidade_alas,
                escala_tipo_quantidade_horas_trabalhadas: escala_selected.dataset.escala_tipo_quantidade_horas_trabalhadas,
                escala_tipo_quantidade_horas_descanso: escala_selected.dataset.escala_tipo_quantidade_horas_descanso,
                quantidade_brigadistas_por_ala: esc_escolherQuantidadeBrigadistasPorAla.value,
                quantidade_brigadistas_total: esc_escolherQuantidadeBrigadistasPorAla.value * escala_selected.dataset.escala_tipo_quantidade_alas,
                posto: esc_escolherPosto.value,
                hora_inicio_ala_1: esc_escolherHoraInicioAla1.value,
                brigadistas: await esc_modalBrigadistasDadosArray()
            });

            // Limpar dados
            esc_escolherEscalaTipoId.value = '';
            esc_escolherQuantidadeBrigadistasPorAla.value = '';
            esc_escolherPosto.value = '';
            esc_escolherHoraInicioAla1.value = '';

            // Limpar esc_modalBrigadistasDados e Ctrl's
            esc_modalBrigadistasDados.innerHTML = '';
            esc_modalEscalaTipoIdCtrl.value = 0;
            esc_modalQuantidadeBrigadistasPorAlaCtrl.value = 0;

            esc_ordenarLinhasGrade();
        }

        if (await esc_existeEscalaGrade(escala_selected.dataset.escala_tipo_id, esc_escolherPosto.value)) {
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

    // Validação em tempo real dos Brigadistas
    document.addEventListener("change", function (e) {
        if (e.target.matches('select[name="esc_escolherFuncionarioId[]"], input[name="esc_escolherFuncionarioAla[]"]')) {
            esc_modalBrigadistasDadosValidar();
        }
    });
    // Grade de Escalas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Grade de Escalas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Grade de Geradas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Grade de Geradas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Adicionar na grade
    ger_btnAdicionar.addEventListener('click', async function() {
        let mensagem_erro = '';

        if (ger_escolherEscalaModelo.value == '') {
            mensagem_erro += 'Escolha um Modelo de Escala.<br>';
        }

        //Campo: data_inicio (requerido)
        if (validacao({op:1, value:ger_escolherDataInicio.value}) === false) {
            mensagem_erro += 'Data Início requerida.<br>';
        } else {
            //Campo: data_inicio (Data Válida)
            if (validacao({op:8, value:ger_escolherDataInicio.value}) === false) {
                mensagem_erro += 'Data Início Inválida.<br>';
            }
        }

        //Campo: data_termino (requerido)
        if (validacao({op:1, value:ger_escolherDataTermino.value}) === false) {
            mensagem_erro += 'Data Término requerida.<br>';
        } else {
            //Campo: data_termino (Data Válida)
            if (validacao({op:8, value:ger_escolherDataTermino.value}) === false) {
                mensagem_erro += 'Data Término Inválida.<br>';
            }
        }

        if (mensagem_erro != '') {
            alertSwal('error', 'Brigadas Incêndios', mensagem_erro, 'true', 2000);
            return;
        }

        let escala_modelo_selected = ger_escolherEscalaModelo.options[ger_escolherEscalaModelo.selectedIndex];

        async function adicionar() {
            await ger_adicionarLinhaGrade({
                escala_tipo_id: escala_modelo_selected.dataset.escala_tipo_id,
                escala_tipo_name: escala_modelo_selected.dataset.escala_tipo_name,
                escala_tipo_quantidade_alas: escala_modelo_selected.dataset.escala_tipo_quantidade_alas,
                escala_tipo_quantidade_horas_trabalhadas: escala_modelo_selected.dataset.escala_tipo_quantidade_horas_trabalhadas,
                escala_tipo_quantidade_horas_descanso: escala_modelo_selected.dataset.escala_tipo_quantidade_horas_descanso,
                quantidade_brigadistas_por_ala: escala_modelo_selected.dataset.quantidade_brigadistas_por_ala,
                quantidade_brigadistas_total: escala_modelo_selected.dataset.quantidade_brigadistas_total,
                posto: escala_modelo_selected.dataset.posto,
                hora_inicio_ala_1: escala_modelo_selected.dataset.hora_inicio_ala_1,
                data_inicio: ger_escolherDataInicio.value,
                data_termino: ger_escolherDataTermino.value,
                brigadistas: escala_modelo_selected.dataset.brigadistas
            });

            // Limpar dados
            ger_escolherEscalaModelo.value = '';
            ger_escolherDataInicio.value = '';
            ger_escolherDataTermino.value = '';

            ger_ordenarLinhasGrade();
        }

        adicionar();
    });
    // Grade de Geradas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Grade de Geradas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
// DOMContentLoaded - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// DOMContentLoaded - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
