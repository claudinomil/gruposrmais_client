// Dados Principais - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Dados Principais - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function validar_frm_produtos_entradas() {
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

    if (forn_id.value != 777 && forn_id.value != 888 && forn_id.value != 999) {
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
function pro_controleBotoes(executada) {
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

// Grade de Produtos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Grade de Produtos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Elementos Globais
const pro_divProdutos = document.getElementById('pro_divProdutos');
const pro_divEscolherProduto = document.getElementById('pro_divEscolherProduto');
const pro_escolherProdutoId = document.getElementById('pro_escolherProdutoId');
const pro_escolherProdutoTipoId = document.getElementById('pro_escolherProdutoTipoId');
const pro_escolherProdutoNumeroPatrimonio = document.getElementById('pro_escolherProdutoNumeroPatrimonio');
const pro_escolherProdutoValorUnitario = document.getElementById('pro_escolherProdutoValorUnitario');
const pro_btnAdicionar = document.getElementById('pro_btnAdicionar');
const pro_thOpcoes = document.getElementById('pro_thOpcoes');
const pro_tfOpcoes = document.getElementById('pro_tfOpcoes');
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
        pro_tfOpcoes.style.display = '';
    }
    if (frm_operacao.value == 'view') {
        pro_divEscolherProduto.style.display = 'none';
        pro_thOpcoes.style.display = 'none';
        pro_tfOpcoes.style.display = 'none';
    }
    if (frm_operacao.value == 'edit') {
        pro_divEscolherProduto.style.display = '';
        pro_thOpcoes.style.display = '';
        pro_tfOpcoes.style.display = '';
    }
}

/*
 * Adicionar linha na grade
 * @PARAM registro: recebe produto_id, produto_categoria_name, produto_name, produto_numero_patrimonio, produto_valor_unitario
*/
async function pro_adicionarLinhaGrade(registro) {
    // Dados para preenchera linha da grade
    let produto_item_id = registro.produto_item_id;
    let produto_id = registro.produto_id;
    let produto_categoria_name = registro.produto_categoria_name;
    let produto_name = registro.produto_name;
    let produto_tipo_id = registro.produto_tipo_id;
    let produto_tipo_name = registro.produto_tipo_name;
    let produto_numero_patrimonio = registro.produto_numero_patrimonio;
    let produto_valor_unitario = toNumberOrMoney(registro.produto_valor_unitario, 'money');

    let ordenar = produto_categoria_name+' '+produto_name;

    // Novo ID único da linha (timestamp + contador simples)
    let id_linha_hiddens = Date.now() + '_' + Math.floor(Math.random() * 10000);

    // Montar Linha
    let linha;

    linha = `<tr class="tr_produto_linha" id="pro_produtoLinha_${id_linha_hiddens}" data-produto_id="${produto_id}" data-ordenar="${ordenar}">
                <td class="p-2 text-start align-middle">
                    <div class="text-black">${produto_categoria_name}</div>
                    <div class="text-primary">${produto_name}</div>
                </td>
                <td class="p-2 text-center align-middle text-nowrap">${produto_tipo_name}</td>
                <td class="p-2 text-center align-middle text-nowrap">${produto_numero_patrimonio}</td>
                <td class="p-2 text-center align-middle text-nowrap">${produto_valor_unitario}</td>`;

    if (frm_operacao.value != 'view') {
        linha += `<td class="p-2 text-center align-middle text-nowrap">
                            <button type="button" class="btn btn-sm btn-danger text-write py-1" title="Retirar Produto da Grade" onclick="pro_removerLinhaGrade(1, '${id_linha_hiddens}');">
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
                    <input type="hidden" name="pro_produto_item_id[]" value="${produto_item_id}">
                    <input type="hidden" name="pro_produto_id[]" value="${produto_id}">
                    <input type="hidden" name="pro_produto_categoria_name[]" value="${produto_categoria_name}">
                    <input type="hidden" name="pro_produto_name[]" value="${produto_name}">
                    <input type="hidden" name="pro_produto_tipo_id[]" value="${produto_tipo_id}">
                    <input type="hidden" name="pro_produto_tipo_name[]" value="${produto_tipo_name}">
                    <input type="hidden" name="pro_produto_numero_patrimonio[]" value="${produto_numero_patrimonio}">
                    <input type="hidden" name="pro_produto_valor_unitario[]" value="${produto_valor_unitario}">
                </div>`;

    // Adicionar hiddens na div
    pro_camposHiddens.insertAdjacentHTML('beforeend', hiddens);
}

/**
 * Verifica se existem números de patrimônio duplicados na grade
 * e exibe um alert caso existam.
 *
 */
function pro_verificarDuplicadosPatrimonio() {
    const patrimonios = [];
    const duplicados = [];

    document.querySelectorAll('input[name="pro_produto_numero_patrimonio[]"]').forEach(input => {
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

        alertSwal('error', 'Produtos Entradas', msg, 'true', 3000);

        return true;
    }

    return false;
}

/*
 * Excluir linha da grade Produtos
 * @PARAM op: 1(Abre modal de confirmação)  2(Não abre modal de confirmação)
*/
async function pro_removerLinhaGrade(op, id_linha_hiddens) {
    let linha = document.getElementById('pro_produtoLinha_' + id_linha_hiddens);
    let hiddens = document.getElementById('pro_produto_hiddens_' + id_linha_hiddens);

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
    pro_colocarTotalGeralGrade();
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

async function pro_somarValorUnitarioGrade() {
    let soma = 0;

    document.querySelectorAll('input[name="pro_produto_valor_unitario[]"]').forEach(campo => {
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

async function pro_colocarTotalGeralGrade() {
    let vt = await pro_somarValorUnitarioGrade();
    let valor = toNumberOrMoney(vt, 'money');
    document.getElementById('pro_gradeTotalGeral').innerHTML = valor;
    document.getElementById('valor_total_grade').value = valor;
}
// Grade de Produtos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Grade de Produtos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Modal - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Modal - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function validar_frm_upload_nota_fiscal() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: upload_nota_fiscal_produto_entrada_id (requerido)
    if (validacao({op:1, value:document.getElementById('upload_nota_fiscal_produto_entrada_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Produto Entrada requerido.'+'<br>';
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

function produtoEntradaModalInfoControle(op, id='') {
    var div_dados = document.getElementById('md_men_div_dados');
    var div_nota_fiscal = document.getElementById('md_men_div_nota_fiscal');

    //Dados
    if (op == 1) {
        div_dados.classList.remove('d-none');
        div_dados.classList.add('d-lg-flex');

        div_nota_fiscal.classList.remove('d-lg-flex');
        div_nota_fiscal.classList.add('d-none');

        produtoEntradaModalInfoDados(id);
    }

    // Nota Fiscal
    if (op == 2) {
        div_dados.classList.remove('d-lg-flex');
        div_dados.classList.add('d-none');

        div_nota_fiscal.classList.remove('d-none');
        div_nota_fiscal.classList.add('d-lg-flex');
    }
}

async function produtoEntradaModalInfoDados(id='') {
    if (id == '') {id = document.getElementById('mi_men_produto_entrada_id').value;}

    //Abrir Modal
    var modalEl = document.getElementById('produto_entrada_modal_info');
    if (!modalEl.classList.contains('show')) {
        new bootstrap.Modal(document.getElementById('produto_entrada_modal_info')).show();
        ajustarMargensModalsInfo({ modalId:'produto_entrada_modal_info', top:20, right:20, bottom:20, left:20 });
    }

    //Limpando dados
    let elementos = document.querySelectorAll('.clearClass');
    elementos.forEach(elemento => {elemento.src = ''; elemento.innerHTML = '';});

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'produtos_entradas/modalInfo/modal_info/'+id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        // Lendo json
        let json = data;

        // Lendo dados produto_entrada
        let produto_entrada = json.produto_entrada;

        // Passando dados produto_entrada''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        // Header
        document.getElementById('mi_men_header_nome').innerHTML = 'Nota Fiscal: '+produto_entrada.nf_numero;

        // id's
        document.getElementById('mi_men_produto_entrada_id').value = produto_entrada.id;
        document.getElementById('upload_nota_fiscal_produto_entrada_id').value = produto_entrada.id;

        // Dados
        document.getElementById('mi_men_empresa_nome').value = produto_entrada.empresaName;
        document.getElementById('mi_men_fornecedor_nome').value = produto_entrada.fornecedor_nome;
        document.getElementById('mi_men_fornecedor_cnpj').value = produto_entrada.fornecedor_cnpj;
        document.getElementById('mi_men_nf_numero').value = produto_entrada.nf_numero;
        document.getElementById('mi_men_nf_serie').value = produto_entrada.nf_serie;
        document.getElementById('mi_men_nf_chave_acesso').value = produto_entrada.nf_chave_acesso;
        document.getElementById('mi_men_data_emissao').value = produto_entrada.data_emissao;
        document.getElementById('mi_men_valor_desconto').value = produto_entrada.valor_desconto;
        document.getElementById('mi_men_valor_total').value = produto_entrada.valor_total;

        // PDF
        produtoEntradaModalInfoPdf(produto_entrada.nf_pdf_caminho);
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }).catch(error => {
        alert('Erro produtoEntradaModalInfo: '+error);
    });
}

async function produtoEntradaModalInfoPdf(caminhoPdf) {
    // Limpar view do pdf anterior
    document.getElementById('div_mem_mostrar_pdf').innerHTML = '';

    let linkPdf = 'Não encontrado';

    if (caminhoPdf) {
        // ve se arquivo existe
        var arquivo_existe = await arquivoExiste(caminhoPdf);
        if (arquivo_existe === true) {
            // PDF no Modal
            produtoEntradaModalInfoMostrarPdf(caminhoPdf);

            // PDF em outra Aba do navegador
            linkPdf = `<a href="#" onclick="produtoEntradaModalInfoMostrarPdf('${caminhoPdf}', true);">Visualizar Nota Fiscal</a>`;
        }
    }

    document.getElementById('label_mem_nota_fiscal_arquivo').innerHTML = linkPdf;
}

async function produtoEntradaModalInfoMostrarPdf(caminhoPdf, novaAba = false) {
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
        const response = await fetch(`produtos_entradas/executar_entrada/${id}`, {
            headers: {
                'REQUEST-ORIGIN': 'fetch',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            }
        });

        const { message: message } = await response.json();

        document.getElementById('frm_produtos_entradas').submit();
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

    // Grade de Produtos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Grade de Produtos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Adicionar na grade
    pro_btnAdicionar.addEventListener('click', async function() {
        let mensagem_erro = '';

        if (pro_escolherProdutoId.value == '') {
            mensagem_erro += 'Escolha um Produto.<br>';
        }
        if (pro_escolherProdutoTipoId.value == '') {
            mensagem_erro += 'Escolha um Produto Tipo.<br>';
        }
        if (pro_escolherProdutoValorUnitario.value == '') {
            mensagem_erro += 'Digite um Valor Unitário.<br>';
        }

        if (pro_escolherProdutoTipoId.value == 1) {
            if (pro_escolherProdutoNumeroPatrimonio.value.trim() === '') {
                mensagem_erro += 'Digite um Número de Patrimônio.<br>';
            } else if (!/^\d{5}$/.test(pro_escolherProdutoNumeroPatrimonio.value)) {
                mensagem_erro += 'O Número de Patrimônio deve conter exatamente 5 dígitos numéricos.<br>';
            }
        }

        if (mensagem_erro != '') {
            alertSwal('error', 'Produtos Entradas', mensagem_erro, 'true', 2000);
            return;
        }

        let produto_selected = pro_escolherProdutoId.options[pro_escolherProdutoId.selectedIndex];
        let produto_tipo_selected = pro_escolherProdutoTipoId.options[pro_escolherProdutoTipoId.selectedIndex];

        function adicionar() {
            pro_adicionarLinhaGrade({
                produto_item_id: '',
                produto_id: produto_selected.dataset.produto_id,
                produto_categoria_name: produto_selected.dataset.produto_categoria_name,
                produto_name: produto_selected.dataset.produto_name,
                produto_tipo_id: produto_tipo_selected.dataset.produto_tipo_id,
                produto_tipo_name: produto_tipo_selected.dataset.produto_tipo_name,
                produto_numero_patrimonio: pro_escolherProdutoNumeroPatrimonio.value,
                produto_valor_unitario: pro_escolherProdutoValorUnitario.value
            });

            pro_escolherProdutoId.value = '';
            pro_escolherProdutoTipoId.value = '';
            pro_escolherProdutoNumeroPatrimonio.value = '';
            pro_escolherProdutoValorUnitario.value = '';
            pro_ordenarLinhasGrade();

            pro_verificarDuplicadosPatrimonio();

            // Colocar Total Geral
            pro_colocarTotalGeralGrade();
        }

        adicionar();
    });
    // Grade de Produtos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Grade de Produtos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Modal - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Modal - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: frm_upload_nota_fiscal_men_executar
    document.getElementById('frm_upload_nota_fiscal_men_executar').addEventListener('click', function() {
        //FormData
        var formulario = document.getElementById('frm_upload_nota_fiscal_men');
        var formData = new FormData(formulario);
        var url_atual = window.location.protocol+'//'+window.location.host+'/';
        var upload_nota_fiscal_produto_entrada_id = document.getElementById('upload_nota_fiscal_produto_entrada_id').value;

        //Criticando campos
        if (validar_frm_upload_nota_fiscal() === false) {return false;}

        //Acessar rota
        fetch(url_atual+'produtos_entradas/uploadNotaFiscal/upload_nota_fiscal', {
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
                await produtoEntradaModalInfoPdf(data.nf_pdf_caminho);
                await produtoEntradaModalInfoMostrarPdf(data.nf_pdf_caminho);

                alertSwal('success', 'Produtos Entradas', data.success, 'true', 20000);
            } else if (data.error) {
                alertSwal('warning', 'Produtos Entradas', data.error, 'true', 20000);
            } else {
                alert('Erro interno');
            }
        }).catch(error => {
            alert('Erro Produtos Entradas Upload Nota Fiscal PDF: '+error);
        });
    });
    // Modal - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Modal - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
// DOMContentLoaded - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// DOMContentLoaded - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
