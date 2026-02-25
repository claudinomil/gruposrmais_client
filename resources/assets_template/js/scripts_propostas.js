function validar_frm_propostas() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: cliente_id (requerido)
    if (validacao({op:1, value:document.getElementById('cliente_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.'+'<br>';
    } else {
        //Campo: cliente_id (deve ser um número)
        if (validacao({op: 4, value: document.getElementById('cliente_id').value}) === false) {
            validacao_ok = false;
            mensagem += 'Cliente deve ser escolhido.' + '<br>';
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

//Atualiza/Limpa os dados do Serviço escolhido para grade
//operacao = 0 : Limpar
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
//operacao = 3 : Retirar
function atualizarServicoEscolher(operacao, servico_id='', servico_nome='', servico_valor='', servico_qtd='') {
    if (operacao == 0) {
        //campos
        document.getElementById('ts_servico_id').value = servico_id;
        //document.getElementById('select2-ts_servico_id-container').innerHTML = servico_nome;
        document.getElementById('ts_servico_nome').value = servico_nome;
        document.getElementById('ts_servico_valor').value = servico_valor;
        document.getElementById('ts_servico_qtd').value = servico_qtd;

        //botoes
        document.getElementById('ts_servico_adicionar_div').style.display = 'none';
        document.getElementById('ts_servico_retirar_div').style.display = 'none';
    }

    if (operacao == 1) {
        //campos
        document.getElementById('ts_servico_nome').value = servico_nome;
        document.getElementById('ts_servico_valor').value = servico_valor;
        document.getElementById('ts_servico_qtd').value = servico_qtd;

        //botoes
        document.getElementById('ts_servico_adicionar_div').style.display = 'block';
        document.getElementById('ts_servico_retirar_div').style.display = 'none';
    }

    if (operacao == 2) {
        //campos
        document.getElementById('ts_servico_id').value = servico_id;
        //document.getElementById('select2-ts_servico_id-container').innerHTML = servico_nome;
        document.getElementById('ts_servico_nome').value = servico_nome;
        document.getElementById('ts_servico_valor').value = servico_valor;
        document.getElementById('ts_servico_qtd').value = servico_qtd;

        //botoes
        document.getElementById('ts_servico_adicionar_div').style.display = 'none';
        document.getElementById('ts_servico_retirar_div').style.display = 'block';
    }
}

//Atualizar a Grade de Serviço
//operacao = 0 : Somente atualiza os valores
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
//operacao = 3 : Retirar
function atualizarServicoGrade(operacao) {
    if (operacao == 1) {
        //Dados para preenchera linha da grade
        servico_id = document.getElementById('ts_servico_id').value;
        servico_nome = document.getElementById('ts_servico_nome').value;
        servico_valor = document.getElementById('ts_servico_valor').value;
        servico_qtd = document.getElementById('ts_servico_qtd').value;
        servico_valor_total = servico_qtd * moeda2float(servico_valor);
        servico_valor_total = float2moeda(servico_valor_total);

        //Montar Linha
        var linha;

        linha = "<tr class='ts_servico_linha' id='ts_servico_linha_" + servico_id + "' data-id='" + servico_id + "' style='cursor: pointer' onclick='selecionarServicoExclusão("+servico_id+");'>";
        linha += "  <td class='text-center ts_servico_item' data-id='" + servico_id + "'></td>";
        linha += "  <td id='ts_servico_nome_td_" + servico_id + "'>" + servico_nome + "</td>";
        linha += "  <td id='ts_servico_valor_td_" + servico_id + "' class='text-end'>R$ " + servico_valor + "</td>";
        linha += "  <td id='ts_servico_qtd_td_" + servico_id + "' class='text-center'>" + servico_qtd + "</td>";
        linha += "  <td class='text-end ts_servico_valor_total'>R$ " + servico_valor_total + "</td>";
        linha += "</tr>";

        //Adicionar linha na grade
        document.getElementById('ts_servico_grade').insertAdjacentHTML('beforeend', linha);

        //Montar campos hidden
        var hiddens;

        hiddens = "<div id='ts_servico_hiddens_" + servico_id + "'>";
        hiddens += "<input class='servico_item_hiddens' type='hidden' name='servico_item[]' id='servico_item' value=''>";
        hiddens += "<input type='hidden' name='servico_id[]' id='servico_id' value='"+servico_id+"'>";
        hiddens += "<input type='hidden' name='servico_nome[]' id='servico_nome' value='"+servico_nome+"'>";
        hiddens += "<input type='hidden' name='servico_valor[]' id='servico_valor' value='"+moeda2float(servico_valor)+"'>";
        hiddens += "<input type='hidden' name='servico_quantidade[]' id='servico_quantidade' value='"+servico_qtd+"'>";
        hiddens += "<input type='hidden' name='servico_valor_total[]' id='servico_valor_total' value='"+moeda2float(servico_valor_total)+"'>";
        hiddens += "</div>";

        //Adicionar hiddens na div
        document.getElementById('ts_servico_hiddens').insertAdjacentHTML('beforeend', hiddens);
    }

    if (operacao == 3) {
        //Dados
        servico_id = document.getElementById('ts_servico_id').value;

        //Remover linha da grade
        let linha = document.getElementById('ts_servico_linha_' + servico_id);
        if (linha) linha.remove();

        //Remover campos hiddens
        let hiddenFields = document.getElementById('ts_servico_hiddens_' + servico_id);
        if (hiddenFields) hiddenFields.remove();
    }

    //Atualizando numeração das linhas da coluna Item
    var ln = 0;
    document.querySelectorAll('.ts_servico_item').forEach((element) => {
        ln++;
        element.innerHTML = ln;
    });

    //Atualizando numeração das divs da coluna Item dos campos hiddens
    var ln = 0;
    document.querySelectorAll('.servico_item_hiddens').forEach((element) => {
        ln++;
        element.value = ln;
    });

    //Atualizando Valor Global
    var valor_global = 0;
    var valor_total = 0;
    document.querySelectorAll('.ts_servico_valor_total').forEach((element) => {
        valor_total = element.innerHTML;
        valor_total = valor_total.substring(3);
        valor_total = moeda2float(valor_total);

        valor_global += valor_total;
    });

    document.getElementById('ts_servico_valor_global').innerHTML = 'R$ ' + float2moeda(valor_global);

    //Atualizar Valor Total da Proposta
    atualizarValorTotalProposta(valor_global);
}

//Limpar a Grade de Serviço
function limparServicosGrade() {
    //Limpando Serviços da grade
    document.getElementById('ts_servico_grade').innerHTML = '';

    //Limpando campos hiddens
    document.getElementById('ts_servico_hiddens').innerHTML = '';

    //Atualizar Valor Total da Proposta
    atualizarValorTotalProposta(0);
}

//Atualizar o Valor Total da Proposta
function atualizarValorTotalProposta(valor_global) {
    let porcentagem_desconto = document.getElementById('porcentagem_desconto').value;

    if (porcentagem_desconto === '') {
        porcentagem_desconto = 0;
        document.getElementById('porcentagem_desconto').value = porcentagem_desconto;
    }

    let valor_desconto = (valor_global * porcentagem_desconto) / 100;

    document.getElementById('valor_desconto').value = float2moeda(valor_desconto);
    document.getElementById('valor_desconto_extenso').value = valorExtenso(valor_desconto);

    document.getElementById('valor_total').value = float2moeda(valor_global - valor_desconto);
    document.getElementById('valor_total_extenso').value = valorExtenso(valor_global - valor_desconto);
}

//Pegar dados da linha que clicou e jogar para o Serviço Escolher
function selecionarServicoExclusão(servico_id) {
    let servico_nome = document.getElementById('ts_servico_nome_td_' + servico_id).innerHTML;
    let servico_valor = document.getElementById('ts_servico_valor_td_' + servico_id).innerHTML;
    servico_valor = servico_valor.substring(3);
    let servico_qtd = document.getElementById('ts_servico_qtd_td_' + servico_id).innerHTML;

    atualizarServicoEscolher(2, servico_id, servico_nome, servico_valor, servico_qtd);
}

document.addEventListener("DOMContentLoaded", function (event) {
    //Criar Data da Proposta por extenso
    document.getElementById('data_proposta').addEventListener('change', function() {
        if (document.getElementById('data_proposta').value != '') {
            var data_extenso = dataExtenso(2, document.getElementById('data_proposta').value);
            document.getElementById('data_proposta_extenso').value = data_extenso;
        }
    });


    //Buscar dados do Cliente escolhido
    document.getElementById('cliente_id').addEventListener('change', function() {
        if (document.getElementById('cliente_id').value != '') {
            var cliente_id = document.getElementById('cliente_id').value;

            //Route: clientes/id
            fetch('clientes/'+cliente_id, {
                method: 'GET',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                var cliente = data.success;

                document.getElementById('cliente_nome').value = cliente.name;
                document.getElementById('cliente_logradouro').value = cliente.logradouro;
                document.getElementById('cliente_bairro').value = cliente.bairro;
                document.getElementById('cliente_cidade').value = cliente.localidade;
            }).catch(error => {
                alert('Erro Propostas:'+error);
            });


        }
    });

    //Buscar dados do Serviço escolhido
    document.getElementById('ts_servico_id').addEventListener('change', function() {
        if (document.getElementById('ts_servico_id').value != '') {
            var ts_servico_id = document.getElementById('ts_servico_id').value;

            //Route: servicos/id
            fetch('servicos/'+ts_servico_id, {
                method: 'GET',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                var servico = data.success;

                //copiar os dados para os campos
                atualizarServicoEscolher(1, servico.id, servico.name, servico.valor, '1');
            }).catch(error => {
                alert('Erro Propostas:'+error);
            });
        }
    });

    //Adicionar serviço na grade
    document.getElementById('ts_servico_adicionar').addEventListener('click', function() {
        if (document.getElementById('ts_servico_id').value == '') {
            alert('Escolha um Serviço.');
            return;
        }

        if (document.getElementById('ts_servico_valor').value == '') {
            alert('Valor vazio.');
            return;
        }

        if (document.getElementById('ts_servico_qtd').value == '' || document.getElementById('ts_servico_qtd').value == '0' || document.getElementById('ts_servico_qtd').value == 0) {
            alert('Digite uma quantidade.');
            return;
        }

        //Adicionar linha na grade
        atualizarServicoGrade(1);

        //Atualizar dados do Serviço escolhido
        atualizarServicoEscolher(0);
    });

    //Retirar serviço na grade
    document.getElementById('ts_servico_retirar').addEventListener('click', function() {
        //Adicionar linha na grade
        atualizarServicoGrade(3);

        //Atualizar dados do Serviço escolhido
        atualizarServicoEscolher(0);
    });
});
