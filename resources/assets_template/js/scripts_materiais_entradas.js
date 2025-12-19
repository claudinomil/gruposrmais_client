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

    // Campo: fornecedor_id (empresas)
    const forn_id = document.getElementById('fornecedor_id');

    if (forn_id.value != 1 && forn_id.value != 2 && forn_id.value != 3) {
        // Campo: nf_numero (requerido)
        if (validacao({op:1, value:document.getElementById('nf_numero').value}) === false) {
            validacao_ok = false;
            mensagem += 'NF Número.'+'<br>';
        }

        // Campo: nf_serie (requerido)
        if (validacao({op:1, value:document.getElementById('nf_serie').value}) === false) {
            validacao_ok = false;
            mensagem += 'NF Série.'+'<br>';
        }
    } else {
        // Campo: nf_numero
        document.getElementById('nf_numero').value = '';

        // Campo: nf_serie
        document.getElementById('nf_serie').value = '';
    }

    // Campo: data_emissao (requerido)
    if (validacao({op:1, value:document.getElementById('data_emissao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Data Emissão requerido.'+'<br>';
    } else {
        // Campo: data_emissao (Data Válida)
        if (validacao({op:8, value:document.getElementById('data_emissao').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data Emissão Inválida.'+'<br>';
        }
    }

    // Campo: estoque_local_id (requerido)
    if (validacao({op:1, value:document.getElementById('estoque_local_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Local requerido.'+'<br>';
    }

    // Campo: valor_total x valor_desconto x valor_total_grade
    const vt = document.getElementById('valor_total');
    const vd = document.getElementById('valor_desconto');
    const vtg = document.getElementById('valor_total_grade');

    if ((toNumberOrMoney(vtg.value, 'float', 2) + toNumberOrMoney(vd.value, 'float', 2)) !== toNumberOrMoney(vt.value, 'float', 2)) {
        validacao_ok = false;
        mensagem += 'Valor Total diferente do Valor Desconto + Valor Total da Grade.'+'<br>';
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

/*
 * Controlar Botões
*/
function mat_controleBotoes(executada) {
    // Botão CRUD Edit
    const btnCrudButtonEdit = document.getElementById('btnCrudButtonEdit');

    if (btnCrudButtonEdit) {
        btnCrudButtonEdit.style.display = '';

        if (executada == 1) {
            btnCrudButtonEdit.style.display = 'none';
        }
    }

    // Botão CRUD Delete
    const btnCrudButtonDelete = document.getElementById('btnCrudButtonDelete');

    if (btnCrudButtonDelete) {
        btnCrudButtonDelete.style.display = '';

        if (executada == 1) {
            btnCrudButtonDelete.style.display = 'none';
        }
    }
}
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
 * Adicionar linha na grade
 * @PARAM registro: recebe material_id, material_categoria_name, material_name, material_numero_patrimonio, material_valor_unitario
*/
async function mat_adicionarLinhaGrade(registro) {
    // Dados para preenchera linha da grade
    let material_item_id = registro.material_item_id;
    let material_id = registro.material_id;
    let material_categoria_name = registro.material_categoria_name;
    let material_name = registro.material_name;
    let material_numero_patrimonio = registro.material_numero_patrimonio;
    let material_valor_unitario = toNumberOrMoney(registro.material_valor_unitario, 'money');

    let ordenar = material_categoria_name+' '+material_name;

    // Novo ID único da linha (timestamp + contador simples)
    let id_linha_hiddens = Date.now() + '_' + Math.floor(Math.random() * 10000);

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
                            <button type="button" class="btn btn-sm btn-danger text-write py-1" title="Retirar Material da Grade" onclick="mat_removerLinhaGrade(1, '${id_linha_hiddens}');">
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
                    <input type="hidden" name="mat_material_item_id[]" value="${material_item_id}">
                    <input type="hidden" name="mat_material_id[]" value="${material_id}">
                    <input type="hidden" name="mat_material_categoria_name[]" value="${material_categoria_name}">
                    <input type="hidden" name="mat_material_name[]" value="${material_name}">
                    <input type="hidden" name="mat_material_numero_patrimonio[]" value="${material_numero_patrimonio}">
                    <input type="hidden" name="mat_material_valor_unitario[]" value="${material_valor_unitario}">
                </div>`;

    // Adicionar hiddens na div
    mat_camposHiddens.insertAdjacentHTML('beforeend', hiddens);
}

/**
 * Verifica se existem números de patrimônio duplicados na grade
 * e exibe um alert caso existam.
 *
 */
function mat_verificarDuplicadosPatrimonio() {
    const patrimonios = [];
    const duplicados = [];

    document.querySelectorAll('input[name="mat_material_numero_patrimonio[]"]').forEach(input => {
        const valor = (input.value || '').trim();
        if (valor !== '') {
            if (patrimonios.includes(valor) && !duplicados.includes(valor)) {
                duplicados.push(valor);
            }
            patrimonios.push(valor);
        }
    });

    if (duplicados.length > 0) {
        let msg = 'Patrimônio duplicados na grade:\n' + duplicados.map(p => `- ${p}`).join('\n');

        alertSwal('error', 'Materiais Entradas', msg, 'true', 3000);

        return true;
    }

    return false;
}

/*
 * Excluir linha da grade Materiais
 * @PARAM op: 1(Abre modal de confirmação)  2(Não abre modal de confirmação)
*/
async function mat_removerLinhaGrade(op, id_linha_hiddens) {
    let linha = document.getElementById('mat_materialLinha_' + id_linha_hiddens);
    let hiddens = document.getElementById('mat_material_hiddens_' + id_linha_hiddens);

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

// Modal - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function validar_frm_upload_nota_fiscal() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: upload_nota_fiscal_material_entrada_id (requerido)
    if (validacao({op:1, value:document.getElementById('upload_nota_fiscal_material_entrada_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Material Entrada requerido.'+'<br>';
    }

    //Campo: men_nota_fiscal_file (arquivo PDF requerido)
    if (validacao({op:16, id:'men_nota_fiscal_file'}) === false) {
        validacao_ok = false;
        mensagem += 'Arquivo PDF requerido.'+'<br>';
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

function materialEntradaModalInfoControle(op, id='') {
    var div_dados = document.getElementById('md_men_div_dados');
    var div_nota_fiscal = document.getElementById('md_men_div_nota_fiscal');

    //Dados
    if (op == 1) {
        div_dados.classList.remove('d-none');
        div_dados.classList.add('d-lg-flex');

        div_nota_fiscal.classList.remove('d-lg-flex');
        div_nota_fiscal.classList.add('d-none');

        materialEntradaModalInfoDados(id);
    }

    // Nota Fiscal
    if (op == 2) {
        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_nota_fiscal.classList.remove('d-none');
        div_nota_fiscal.classList.add('d-lg-flex');
    }
}

async function materialEntradaModalInfoDados(id='') {
    if (id == '') {id = document.getElementById('mi_men_material_entrada_id').value;}

    //Abrir Modal
    var modalEl = document.getElementById('material_entrada_modal_info');
    if (!modalEl.classList.contains('show')) {
        new bootstrap.Modal(document.getElementById('material_entrada_modal_info')).show();
        ajustarMargensModalsInfo({ modalId:'material_entrada_modal_info', top:20, right:20, bottom:20, left:20 });
    }

    //Limpando dados
    let elementos = document.querySelectorAll('.clearClass');
    elementos.forEach(elemento => {elemento.src = ''; elemento.innerHTML = '';});

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'materiais_entradas/modalInfo/modal_info/'+id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        // Lendo json
        let json = data;

        // Lendo dados material_entrada
        let material_entrada = json.material_entrada;

        // Passando dados material_entrada''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        // Header
        document.getElementById('mi_men_header_nome').innerHTML = 'Nota Fiscal: '+material_entrada.nf_numero;

        // id's
        document.getElementById('mi_men_material_entrada_id').value = material_entrada.id;
        document.getElementById('upload_nota_fiscal_material_entrada_id').value = material_entrada.id;

        // Dados
        document.getElementById('mi_men_empresa_nome').value = material_entrada.empresaName;
        document.getElementById('mi_men_fornecedor_nome').value = material_entrada.fornecedor_nome;
        document.getElementById('mi_men_fornecedor_cnpj').value = material_entrada.fornecedor_cnpj;
        document.getElementById('mi_men_nf_numero').value = material_entrada.nf_numero;
        document.getElementById('mi_men_nf_serie').value = material_entrada.nf_serie;
        document.getElementById('mi_men_nf_chave_acesso').value = material_entrada.nf_chave_acesso;
        document.getElementById('mi_men_data_emissao').value = material_entrada.data_emissao;
        document.getElementById('mi_men_valor_desconto').value = material_entrada.valor_desconto;
        document.getElementById('mi_men_valor_total').value = material_entrada.valor_total;

        // PDF
        materialEntradaModalInfoPdf(material_entrada.nf_pdf_caminho);
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }).catch(error => {
        alert('Erro materialEntradaModalInfo: '+error);
    });
}

async function materialEntradaModalInfoPdf(caminhoPdf) {
    // Limpar view do pdf anterior
    document.getElementById('div_mem_mostrar_pdf').innerHTML = '';

    let linkPdf = 'Não encontrado';

    if (caminhoPdf) {
        // ve se arquivo existe
        var arquivo_existe = await arquivoExiste(caminhoPdf);
        if (arquivo_existe === true) {
            // PDF no Modal
            materialEntradaModalInfoMostrarPdf(caminhoPdf);

            // PDF em outra Aba do navegador
            linkPdf = `<a href="#" onclick="materialEntradaModalInfoMostrarPdf('${caminhoPdf}', true);">Visualizar Nota Fiscal</a>`;
        }
    }

    document.getElementById('label_mem_nota_fiscal_arquivo').innerHTML = linkPdf;
}

async function materialEntradaModalInfoMostrarPdf(caminhoPdf, novaAba = false) {
    if (!caminhoPdf) {return;}

    if (novaAba) {
        window.open(caminhoPdf, '_blank');
    } else {
        const div = document.getElementById('div_mem_mostrar_pdf');
        if (!div) {return;}

        // ve se arquivo existe
        var arquivo_existe = await arquivoExiste(caminhoPdf);
        if (arquivo_existe === true) {
            div.innerHTML = `<iframe src="${caminhoPdf}" width="100%" height="100%" style="border:none;"></iframe>`;
        }
    }
}
// Modal - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Diversas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Diversas - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function div_executarEntrada(id=0) {
    const confirmed = await alertSwalConfirmacao();

    if (confirmed) {
        const response = await fetch(`materiais_entradas/executar_entrada/${id}`, {
            headers: {
                'REQUEST-ORIGIN': 'fetch',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            }
        });

        const { message: message } = await response.json();

        alert(message);

        document.getElementById('frm_materiais_entradas').submit();
    }
}
// Diversas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Diversas - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

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
                material_item_id: '',
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

            mat_verificarDuplicadosPatrimonio();

            // Colocar Total Geral
            mat_colocarTotalGeralGrade();
        }

        adicionar();
    });
    // Grade de Materiais - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Grade de Materiais - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Modal - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Modal - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_nota_fiscal_men_executar
    document.getElementById('frm_upload_nota_fiscal_men_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_nota_fiscal_men');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';
        var upload_nota_fiscal_material_entrada_id = document.getElementById('upload_nota_fiscal_material_entrada_id').value;

        //Criticando campos
        if (validar_frm_upload_nota_fiscal() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'materiais_entradas/uploadNotaFiscal/upload_nota_fiscal', {
            method: 'POST',
            headers: {
                'REQUEST-ORIGIN': 'fetch',
                'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: formData
        }).then(response => {
            return response.json();
        }).then(async data => {
            //Lendo dados
            if (data.success) {
                formulario.reset();

                // PDF
                await materialEntradaModalInfoPdf(data.nf_pdf_caminho);
                await materialEntradaModalInfoMostrarPdf(data.nf_pdf_caminho);

                alertSwal('success', 'Materiais Entradas', data.success, 'true', 20000);
            } else if (data.error) {
                alertSwal('warning', 'Materiais Entradas', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Materiais Entradas Upload Nota Fiscal PDF: '+error);
        });
    });
    // Modal - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Modal - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
// DOMContentLoaded - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// DOMContentLoaded - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
