function validar_frm_sistemas_preventivos() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: medida_seguranca_id (requerido)
    if (validacao({op:1, value:document.getElementById('medida_seguranca_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Medida Segurança requerido.'+'<br>';
    }

    //Campo: name (requerido)
    if (validacao({op:1, value:document.getElementById('name').value}) === false) {
        validacao_ok = false;
        mensagem += 'Nome requerido.'+'<br>';
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

function atualizarEquipamentoPreventivoEscolher(operacao, equipamento_preventivo_id = '', equipamento_preventivo_nome = '', equipamento_preventivo_qtd = '') {
    if (operacao == 0) {
        //campos
        document.getElementById('ep_equipamento_preventivo_id').value = equipamento_preventivo_id;
        //document.getElementById('select2-ep_equipamento_preventivo_id-container').innerHTML = equipamento_preventivo_nome;
        document.getElementById('ep_equipamento_preventivo_nome').value = equipamento_preventivo_nome;
        document.getElementById('ep_equipamento_preventivo_qtd').value = equipamento_preventivo_qtd;

        //botoes
        document.getElementById('ep_equipamento_preventivo_adicionar_div').style.display = 'none';
        document.getElementById('ep_equipamento_preventivo_retirar_div').style.display = 'none';
    }

    if (operacao == 1) {
        //campos
        document.getElementById('ep_equipamento_preventivo_nome').value = equipamento_preventivo_nome;
        document.getElementById('ep_equipamento_preventivo_qtd').value = equipamento_preventivo_qtd;

        //botoes
        document.getElementById('ep_equipamento_preventivo_adicionar_div').style.display = 'block';
        document.getElementById('ep_equipamento_preventivo_retirar_div').style.display = 'none';
    }

    if (operacao == 2) {
        //campos
        document.getElementById('ep_equipamento_preventivo_id').value = equipamento_preventivo_id;
        //document.getElementById('select2-ep_equipamento_preventivo_id-container').innerHTML = equipamento_preventivo_nome;
        document.getElementById('ep_equipamento_preventivo_nome').value = equipamento_preventivo_nome;
        document.getElementById('ep_equipamento_preventivo_qtd').value = equipamento_preventivo_qtd;

        //botoes
        document.getElementById('ep_equipamento_preventivo_adicionar_div').style.display = 'none';
        document.getElementById('ep_equipamento_preventivo_retirar_div').style.display = 'block';
    }
}

function atualizarEquipamentoPreventivoGrade(operacao) {
    if (operacao == 1) {
        //Dados para preenchera linha da grade
        equipamento_preventivo_id = document.getElementById('ep_equipamento_preventivo_id').value;
        equipamento_preventivo_nome = document.getElementById('ep_equipamento_preventivo_nome').value;
        equipamento_preventivo_qtd = document.getElementById('ep_equipamento_preventivo_qtd').value;

        //Montar Linha
        var linha;

        linha = "<tr class='ep_equipamento_preventivo_linha' id='ep_equipamento_preventivo_linha_" + equipamento_preventivo_id + "' data-id='" + equipamento_preventivo_id + "' style='cursor: pointer' onclick='selecionarEquipamentoPreventivoExclusão("+equipamento_preventivo_id+");'>";
        linha += "  <td class='text-center ep_equipamento_preventivo_item' data-id='" + equipamento_preventivo_id + "'></td>";
        linha += "  <td id='ep_equipamento_preventivo_nome_td_" + equipamento_preventivo_id + "'>" + equipamento_preventivo_nome + "</td>";
        linha += "  <td id='ep_equipamento_preventivo_qtd_td_" + equipamento_preventivo_id + "' class='text-center'>" + equipamento_preventivo_qtd + "</td>";
        linha += "</tr>";

        //Adicionar linha na grade
        document.getElementById('ep_equipamento_preventivo_grade').insertAdjacentHTML('beforeend', linha);

        //Montar campos hidden
        var hiddens;

        hiddens = "<div id='ep_equipamento_preventivo_hiddens_" + equipamento_preventivo_id + "'>";
        hiddens += "<input class='equipamento_preventivo_item_hiddens' type='hidden' name='equipamento_preventivo_item[]' id='equipamento_preventivo_item' value=''>";
        hiddens += "<input type='hidden' name='equipamento_preventivo_id[]' id='equipamento_preventivo_id' value='"+equipamento_preventivo_id+"'>";
        hiddens += "<input type='hidden' name='equipamento_preventivo_nome[]' id='equipamento_preventivo_nome' value='" + equipamento_preventivo_nome + "'>";
        hiddens += "<input type='hidden' name='equipamento_preventivo_quantidade[]' id='equipamento_preventivo_quantidade' value='" + equipamento_preventivo_qtd + "'>";
        hiddens += "</div>";

        //Adicionar hiddens na div
        document.getElementById('ep_equipamento_preventivo_hiddens').insertAdjacentHTML('beforeend', hiddens);
    }

    if (operacao == 3) {
        //Dados
        equipamento_preventivo_id = document.getElementById('ep_equipamento_preventivo_id').value;

        //Remover linha da grade
        let linha = document.getElementById('ep_equipamento_preventivo_linha_' + equipamento_preventivo_id);
        if (linha) linha.remove();

        //Remover campos hiddens
        let hiddenFields = document.getElementById('ep_equipamento_preventivo_hiddens_' + equipamento_preventivo_id);
        if (hiddenFields) hiddenFields.remove();
    }

    //Atualizando numeração das linhas da coluna Item
    var ln = 0;
    document.querySelectorAll('.ep_equipamento_preventivo_item').forEach((element) => {
        ln++;
        element.innerHTML = ln;
    });

    //Atualizando numeração das divs da coluna Item dos campos hiddens
    var ln = 0;
    document.querySelectorAll('.equipamento_preventivo_item_hiddens').forEach((element) => {
        ln++;
        element.value = ln;
    });
}

//Limpar a Grade de Equipamento Preventivo
function limparEquipamentosPreventivosGrade() {
    //Limpando Equipamentos Preventivos da grade
    document.getElementById('ep_equipamento_preventivo_grade').innerHTML = '';

    //Limpando campos hiddens
    document.getElementById('ep_equipamento_preventivo_hiddens').innerHTML = '';
}

//Pegar dados da linha que clicou e jogar para o Equipamento Preventivo Escolher
function selecionarEquipamentoPreventivoExclusão(equipamento_preventivo_id) {
    let equipamento_preventivo_nome = document.getElementById('ep_equipamento_preventivo_nome_td_' + equipamento_preventivo_id).innerHTML;
    let equipamento_preventivo_qtd = document.getElementById('ep_equipamento_preventivo_qtd_td_' + equipamento_preventivo_id).innerHTML;

    atualizarEquipamentoPreventivoEscolher(2, equipamento_preventivo_id, equipamento_preventivo_nome, equipamento_preventivo_qtd);
}

document.addEventListener("DOMContentLoaded", function (event) {
    //Buscar dados do Equipamento Preventivo escolhido
    document.getElementById('ep_equipamento_preventivo_id').addEventListener('change', function() {
        if (document.getElementById('ep_equipamento_preventivo_id').value != '') {
            var ep_equipamento_preventivo_id = document.getElementById('ep_equipamento_preventivo_id').value;

            //Route: equipamentos_preventivos/id
            fetch('equipamentos_preventivos/'+ep_equipamento_preventivo_id, {
                method: 'GET',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                var equipamento_preventivo = data.success;

                //copiar os dados para os campos
                atualizarEquipamentoPreventivoEscolher(1, equipamento_preventivo.id, equipamento_preventivo.name, '1');
            }).catch(error => {
                alert('Erro Sistemas Preventivos:'+error);
            });
        }
    });

    //Adicionar Equipamento Preventivo na grade
    document.getElementById('ep_equipamento_preventivo_adicionar').addEventListener('click', function() {
        if (document.getElementById('ep_equipamento_preventivo_id').value == '') {
            alert('Escolha um Equipamento Preventivo.');
            return;
        }

        if (document.getElementById('ep_equipamento_preventivo_qtd').value == '' || document.getElementById('ep_equipamento_preventivo_qtd').value == '0' || document.getElementById('ep_equipamento_preventivo_qtd').value == 0) {
            alert('Digite uma quantidade.');
            return;
        }

        //Adicionar linha na grade
        atualizarEquipamentoPreventivoGrade(1);

        //Atualizar dados do Equipamento Preventivo escolhido
        atualizarEquipamentoPreventivoEscolher(0);
    });

    //Retirar Equipamento Preventivo na grade
    document.getElementById('ep_equipamento_preventivo_retirar').addEventListener('click', function() {
        //Adicionar linha na grade
        atualizarEquipamentoPreventivoGrade(3);

        //Atualizar dados do Equipamento Preventivo escolhido
        atualizarEquipamentoPreventivoEscolher(0);
    });
});
