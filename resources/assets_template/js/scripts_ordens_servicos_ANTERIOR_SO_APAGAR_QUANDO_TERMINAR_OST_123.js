function validar_frm_ordens_servicos() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: ordem_servico_tipo_id (requerido)
    if (validacao({op:1, value:document.getElementById('ordem_servico_tipo_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Tipo requerido.'+'<br>';
    } else {
        //Campo: ordem_servico_tipo_id (deve ser um número)
        if (validacao({op:4, value: document.getElementById('ordem_servico_tipo_id').value}) === false) {
            validacao_ok = false;
            mensagem += 'Tipo deve ser escolhido.' + '<br>';
        }
    }

    //Se diferente de inclusão validar campos ost2_ordem_servico_status_id, datas e horas''''''''''''''''''''''''''''''''''''
    if (document.getElementById('frm_operacao').value != 'create') {
        //Campo: ost2_ordem_servico_status_id
        if (validacao({op: 1, value: document.getElementById('ost2_ordem_servico_status_id').value}) === false) {
            validacao_ok = false;
            mensagem += 'Status requerido.' + '<br>';
        } else {
            //Campo: ost2_ordem_servico_status_id (deve ser um número)
            if (validacao({op: 4, value: document.getElementById('ost2_ordem_servico_status_id').value}) === false) {
                validacao_ok = false;
                mensagem += 'Status deve ser escolhido.' + '<br>';
            } else {
                var status_id = document.getElementById('ost2_ordem_servico_status_id').value;

                if (status_id == 1) {  //ABERTA
                    //Campo: ost2_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost2_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost2_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_data_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_data_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost2_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_hora_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_hora_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost2_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }
                } else if (status_id == 2) {  //EM ANDAMENTO
                    //Campo: ost2_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost2_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost2_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_data_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_data_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost2_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_hora_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_hora_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost2_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }
                } else if (status_id == 3) {  //CONCLUÍDA
                    //Campo: ost2_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost2_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost2_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_data_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_data_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost2_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_hora_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_hora_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost2_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_data_conclusao (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_data_conclusao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data conclusão requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost2_data_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_hora_conclusao (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_hora_conclusao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora conclusão requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost2_hora_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora conclusão inválida.' + '<br>';
                        }
                    }
                } else if (status_id == 4) {  //FINALIZADA
                    //Campo: ost2_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost2_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost2_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_data_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_data_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost2_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_hora_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_hora_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost2_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_data_conclusao (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_data_conclusao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data conclusão requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost2_data_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_hora_conclusao (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_hora_conclusao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora conclusão requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost2_hora_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_data_finalizacao (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_data_finalizacao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data finalização requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost2_data_finalizacao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data finalização inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_hora_finalizacao (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_hora_finalizacao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora finalização requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost2_hora_finalizacao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora finalização inválida.' + '<br>';
                        }
                    }
                } else if (status_id == 4) {  //CANCELADA
                    //Campo: ost2_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost2_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost2_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_data_prevista (não requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_data_prevista').value}) === true) {
                        if (validacao({op: 8, value: document.getElementById('ost2_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_hora_prevista (não requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_hora_prevista').value}) === true) {
                        if (validacao({op: 17, value: document.getElementById('ost2_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_data_conclusao (não requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_data_conclusao').value}) === true) {
                        if (validacao({op: 8, value: document.getElementById('ost2_data_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_hora_conclusao (não requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_hora_conclusao').value}) === true) {
                        if (validacao({op: 17, value: document.getElementById('ost2_hora_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_data_finalizacao (não requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_data_finalizacao').value}) === true) {
                        if (validacao({op: 8, value: document.getElementById('ost2_data_finalizacao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data finalização inválida.' + '<br>';
                        }
                    }

                    //Campo: ost2_hora_finalizacao (não requerido)
                    if (validacao({op: 1, value: document.getElementById('ost2_hora_finalizacao').value}) === true) {
                        if (validacao({op: 17, value: document.getElementById('ost2_hora_finalizacao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora finalização inválida.' + '<br>';
                        }
                    }
                }
            }
        }
    }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Campo: ost2_cliente_id (requerido)
    if (validacao({op:1, value:document.getElementById('ost2_cliente_id').value}) === false) {
        if (document.getElementById('ordem_servico_tipo_id').value == 2) {
            validacao_ok = false;
            mensagem += 'Cliente requerido.' + '<br>';
        }
    } else {
        //Campo: ost2_cliente_id (deve ser um número)
        if (validacao({op:4, value: document.getElementById('ost2_cliente_id').value}) === false) {
            validacao_ok = false;
            mensagem += 'Cliente deve ser escolhido.' + '<br>';
        }
    }

    //Grade de Serviços: verificar se tem serviços na grade
    if (!document.querySelector("input[name='servico_id[]']")) {
        validacao_ok = false;
        mensagem += 'Escolha pelo menos um Serviço.' + '<br>';
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

//Grade de Serviços - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Serviços - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Atualiza/Limpa os dados do Serviço escolhido para grade
//operacao = 0 : Limpar
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
function atualizarServicoEscolher(operacao, servico_id='', servico_nome='', servico_valor='', servico_quantidade='') {
    if (operacao == 0) {
        //campos
        document.getElementById('ost2_ts_servico_id').value = servico_id;
        document.getElementById('ost2_ts_servico_nome').value = servico_nome;
        document.getElementById('ost2_ts_servico_valor').value = servico_valor;
        document.getElementById('ost2_ts_servico_quantidade').value = servico_quantidade;

        //botoes
        document.getElementById('ost2_ts_divServicoAdicionar').style.display = 'none';
        document.getElementById('ost2_ts_divServicoRetirar').style.display = 'none';
    }

    if (operacao == 1) {
        //campos
        document.getElementById('ost2_ts_servico_nome').value = servico_nome;
        document.getElementById('ost2_ts_servico_valor').value = servico_valor;
        document.getElementById('ost2_ts_servico_quantidade').value = servico_quantidade;

        //botoes
        document.getElementById('ost2_ts_divServicoAdicionar').style.display = 'block';
        document.getElementById('ost2_ts_divServicoRetirar').style.display = 'none';
    }

    if (operacao == 2) {
        //campos
        document.getElementById('ost2_ts_servico_id').value = servico_id;
        document.getElementById('ost2_ts_servico_nome').value = servico_nome;
        document.getElementById('ost2_ts_servico_valor').value = servico_valor;
        document.getElementById('ost2_ts_servico_quantidade').value = servico_quantidade;

        //botoes
        document.getElementById('ost2_ts_divServicoAdicionar').style.display = 'none';
        document.getElementById('ost2_ts_divServicoRetirar').style.display = 'block';
    }
}

//Atualiza/Limpa os dados do Responsável Funcionário escolhido para grade
//operacao = 0 : Limpar
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
function atualizarResponsavelFuncionarioEscolher(operacao, responsavel_funcionario_id='', responsavel_funcionario_nome='') {
    if (operacao == 0) {
        //campos
        document.getElementById('ost2_ts_responsavel_funcionario_id').value = responsavel_funcionario_id;
        document.getElementById('ost2_ts_responsavel_funcionario_nome').value = responsavel_funcionario_nome;
    }

    if (operacao == 1) {
        //campos
        document.getElementById('ost2_ts_responsavel_funcionario_nome').value = responsavel_funcionario_nome;
    }

    if (operacao == 2) {
        //campos
        document.getElementById('ost2_ts_responsavel_funcionario_id').value = responsavel_funcionario_id;
        document.getElementById('ost2_ts_responsavel_funcionario_nome').value = responsavel_funcionario_nome;
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
        var servico_id = document.getElementById('ost2_ts_servico_id').value;
        var servico_nome = document.getElementById('ost2_ts_servico_nome').value;
        var responsavel_funcionario_id = document.getElementById('ost2_ts_responsavel_funcionario_id').value;
        var responsavel_funcionario_nome = document.getElementById('ost2_ts_responsavel_funcionario_nome').value;
        var servico_valor = document.getElementById('ost2_ts_servico_valor').value;
        var servico_quantidade = document.getElementById('ost2_ts_servico_quantidade').value;
        var servico_valor_total = servico_quantidade * moeda2float(servico_valor);
        var servico_valor_total = float2moeda(servico_valor_total);

        //Montar Linha
        var linha;

        linha = "<tr class='ost2_ts_servico_linha' id='ost2_ts_servico_linha_" + servico_id + "' data-id='" + servico_id + "' style='cursor: pointer' onclick='selecionarServicoExclusão("+servico_id+");'>";
        linha += "  <td class='text-center ost2_ts_servico_item' data-id='" + servico_id + "'></td>";
        linha += "  <td id='ost2_ts_servico_nome_td_" + servico_id + "'>" + servico_nome + "</td>";
        linha += "  <td class='d-none' id='ost2_ts_responsavel_funcionario_id_td_" + servico_id + "'>" + responsavel_funcionario_id + "</td>";
        linha += "  <td id='ost2_ts_responsavel_funcionario_nome_td_" + servico_id + "'>" + responsavel_funcionario_nome + "</td>";
        linha += "  <td id='ost2_ts_servico_valor_td_" + servico_id + "' class='text-end'>R$ " + servico_valor + "</td>";
        linha += "  <td id='ost2_ts_servico_quantidade_td_" + servico_id + "' class='text-center'>" + servico_quantidade + "</td>";
        linha += "  <td class='text-end ost2_ts_servico_valor_total'>R$ " + servico_valor_total + "</td>";
        linha += "</tr>";

        //Adicionar linha na grade
        document.getElementById('ost2_ts_servico_grade').insertAdjacentHTML('beforeend', linha);

        //Montar campos hidden
        var hiddens;

        hiddens = "<div id='ost2_ts_servico_hiddens_" + servico_id + "'>";
        hiddens += "<input class='servico_item_hiddens' type='hidden' name='servico_item[]' id='servico_item' value=''>";
        hiddens += "<input type='hidden' name='servico_id[]' id='servico_id' value='"+servico_id+"'>";
        hiddens += "<input type='hidden' name='servico_nome[]' id='servico_nome' value='"+servico_nome+"'>";
        hiddens += "<input type='hidden' name='responsavel_funcionario_id[]' id='responsavel_funcionario_id' value='"+responsavel_funcionario_id+"'>";
        hiddens += "<input type='hidden' name='responsavel_funcionario_nome[]' id='responsavel_funcionario_nome' value='"+responsavel_funcionario_nome+"'>";
        hiddens += "<input type='hidden' name='servico_valor[]' id='servico_valor' value='"+moeda2float(servico_valor)+"'>";
        hiddens += "<input type='hidden' name='servico_quantidade[]' id='servico_quantidade' value='"+servico_quantidade+"'>";
        hiddens += "<input type='hidden' name='servico_valor_total[]' id='servico_valor_total' value='"+moeda2float(servico_valor_total)+"'>";
        hiddens += "</div>";

        //Adicionar hiddens na div
        document.getElementById('ost2_ts_servico_hiddens').insertAdjacentHTML('beforeend', hiddens);
    }

    if (operacao == 3) {
        //Dados
        servico_id = document.getElementById('ost2_ts_servico_id').value;

        //Remover linha da grade
        let linha = document.getElementById('ost2_ts_servico_linha_' + servico_id);
        if (linha) linha.remove();

        //Remover campos hiddens
        let hiddenFields = document.getElementById('ost2_ts_servico_hiddens_' + servico_id);
        if (hiddenFields) hiddenFields.remove();
    }

    //Atualizando numeração das linhas da coluna Item
    var ln = 0;
    document.querySelectorAll('.ost2_ts_servico_item').forEach((element) => {
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
    document.querySelectorAll('.ost2_ts_servico_valor_total').forEach((element) => {
        valor_total = element.innerHTML;
        valor_total = valor_total.substring(3);
        valor_total = moeda2float(valor_total);

        valor_global += valor_total;
    });

    document.getElementById('ost2_ts_servico_valor_global').innerHTML = 'R$ ' + float2moeda(valor_global);

    //Atualizar Valor Total da OrdemServico
    ost2_atualizarValorTotalOrdemServico(valor_global);
}

//Limpar a Grade de Serviço
function limparServicosGrade() {
    //Limpando Serviços da grade
    document.getElementById('ost2_ts_servico_grade').innerHTML = '';

    //Limpando campos hiddens
    document.getElementById('ost2_ts_servico_hiddens').innerHTML = '';

    //Atualizar Valor Total da OrdemServico
    ost2_atualizarValorTotalOrdemServico(0);
}

//Atualizar o Valor Total da OrdemServico
function atualizarValorTotalOrdemServico(valor_global) {
    let ost2_porcentagem_desconto = document.getElementById('ost2_porcentagem_desconto').value;

    if (ost2_porcentagem_desconto === '') {
        ost2_porcentagem_desconto = 0;
        document.getElementById('ost2_porcentagem_desconto').value = ost2_porcentagem_desconto;
    }

    let ost2_valor_desconto = (valor_global * ost2_porcentagem_desconto) / 100;

    document.getElementById('ost2_valor_desconto').value = float2moeda(ost2_valor_desconto);
    document.getElementById('ost2_valor_desconto_extenso').value = valorExtenso(ost2_valor_desconto);

    document.getElementById('ost2_valor_total').value = float2moeda(valor_global - ost2_valor_desconto);
    document.getElementById('ost2_valor_total_extenso').value = valorExtenso(valor_global - ost2_valor_desconto);
}

//Pegar dados da linha que clicou e jogar para o Serviço Escolher
function selecionarServicoExclusão(servico_id) {
    let servico_nome = document.getElementById('ost2_ts_servico_nome_td_' + servico_id).innerHTML;
    let responsavel_funcionario_id = document.getElementById('ost2_ts_responsavel_funcionario_id_td_' + servico_id).innerHTML;
    let responsavel_funcionario_nome = document.getElementById('ost2_ts_responsavel_funcionario_nome_td_' + servico_id).innerHTML;
    let servico_valor = document.getElementById('ost2_ts_servico_valor_td_' + servico_id).innerHTML;
    servico_valor = servico_valor.substring(3);
    let servico_quantidade = document.getElementById('ost2_ts_servico_quantidade_td_' + servico_id).innerHTML;

    atualizarServicoEscolher(2, servico_id, servico_nome, servico_valor, servico_quantidade);
    atualizarResponsavelFuncionarioEscolher(2, responsavel_funcionario_id, responsavel_funcionario_nome);
}
//Grade de Serviços - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Serviços - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Grade de Veículos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Veículos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Atualiza/Limpa os dados do Veiculo escolhido para grade
//operacao = 0 : Limpar
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
function atualizarVeiculoEscolher(operacao, veiculo_id='', veiculo_marca='', veiculo_modelo='', veiculo_placa='', veiculo_combustivel='') {
    if (operacao == 0) {
        //campos
        document.getElementById('ost2_te_veiculo_id').value = veiculo_id;
        document.getElementById('ost2_te_veiculo_marca').value = veiculo_marca;
        document.getElementById('ost2_te_veiculo_modelo').value = veiculo_modelo;
        document.getElementById('ost2_te_veiculo_placa').value = veiculo_placa;
        document.getElementById('ost2_te_veiculo_combustivel').value = veiculo_combustivel;

        //botoes
        document.getElementById('ost2_te_divVeiculoAdicionar').style.display = 'none';
        document.getElementById('ost2_te_divVeiculoRetirar').style.display = 'none';
    }

    if (operacao == 1) {
        //campos
        document.getElementById('ost2_te_veiculo_marca').value = veiculo_marca;
        document.getElementById('ost2_te_veiculo_modelo').value = veiculo_modelo;
        document.getElementById('ost2_te_veiculo_placa').value = veiculo_placa;
        document.getElementById('ost2_te_veiculo_combustivel').value = veiculo_combustivel;

        //botoes
        document.getElementById('ost2_te_divVeiculoAdicionar').style.display = 'block';
        document.getElementById('ost2_te_divVeiculoRetirar').style.display = 'none';
    }

    if (operacao == 2) {
        //campos
        document.getElementById('ost2_te_veiculo_id').value = veiculo_id;
        document.getElementById('ost2_te_veiculo_marca').value = veiculo_marca;
        document.getElementById('ost2_te_veiculo_modelo').value = veiculo_modelo;
        document.getElementById('ost2_te_veiculo_placa').value = veiculo_placa;
        document.getElementById('ost2_te_veiculo_combustivel').value = veiculo_combustivel;

        //botoes
        document.getElementById('ost2_te_divVeiculoAdicionar').style.display = 'none';
        document.getElementById('ost2_te_divVeiculoRetirar').style.display = 'block';
    }
}

//Atualizar a Grade de Veiculos
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
//operacao = 3 : Retirar
function atualizarVeiculoGrade(operacao) {
    if (operacao == 1) {
        //Dados para preenchera linha da grade
        var veiculo_id = document.getElementById('ost2_te_veiculo_id').value;
        var veiculo_marca = document.getElementById('ost2_te_veiculo_marca').value;
        var veiculo_modelo = document.getElementById('ost2_te_veiculo_modelo').value;
        var veiculo_placa = document.getElementById('ost2_te_veiculo_placa').value;
        var veiculo_combustivel = document.getElementById('ost2_te_veiculo_combustivel').value;

        //Montar Linha
        var linha;

        linha = "<tr class='ost2_te_veiculo_linha' id='ost2_te_veiculo_linha_" + veiculo_id + "' data-id='" + veiculo_id + "' style='cursor: pointer' onclick='selecionarVeiculoExclusão("+veiculo_id+");'>";
        linha += "  <td class='text-center ost2_te_veiculo_item' data-id='" + veiculo_id + "'></td>";
        linha += "  <td id='ost2_te_veiculo_marca_td_" + veiculo_id + "'>" + veiculo_marca + "</td>";
        linha += "  <td id='ost2_te_veiculo_modelo_td_" + veiculo_id + "'>" + veiculo_modelo + "</td>";
        linha += "  <td id='ost2_te_veiculo_placa_td_" + veiculo_id + "'>" + veiculo_placa + "</td>";
        linha += "  <td id='ost2_te_veiculo_combustivel_td_" + veiculo_id + "'>" + veiculo_combustivel + "</td>";
        linha += "</tr>";

        //Adicionar linha na grade
        document.getElementById('ost2_te_veiculo_grade').insertAdjacentHTML('beforeend', linha);

        //Montar campos hidden
        var hiddens;

        hiddens = "<div id='ost2_te_veiculo_hiddens_" + veiculo_id + "'>";
        hiddens += "<input class='veiculo_item_hiddens' type='hidden' name='veiculo_item[]' id='veiculo_item' value=''>";
        hiddens += "<input type='hidden' name='veiculo_id[]' id='veiculo_id' value='"+veiculo_id+"'>";
        hiddens += "<input type='hidden' name='veiculo_marca[]' id='veiculo_marca' value='"+veiculo_marca+"'>";
        hiddens += "<input type='hidden' name='veiculo_modelo[]' id='veiculo_modelo' value='"+veiculo_modelo+"'>";
        hiddens += "<input type='hidden' name='veiculo_placa[]' id='veiculo_placa' value='"+veiculo_placa+"'>";
        hiddens += "<input type='hidden' name='veiculo_combustivel[]' id='veiculo_combustivel' value='"+veiculo_combustivel+"'>";
        hiddens += "</div>";

        //Adicionar hiddens na div
        document.getElementById('ost2_te_veiculo_hiddens').insertAdjacentHTML('beforeend', hiddens);
    }

    if (operacao == 3) {
        //Dados
        veiculo_id = document.getElementById('ost2_te_veiculo_id').value;

        //Remover linha da grade
        let linha = document.getElementById('ost2_te_veiculo_linha_' + veiculo_id);
        if (linha) linha.remove();

        //Remover campos hiddens
        let hiddenFields = document.getElementById('ost2_te_veiculo_hiddens_' + veiculo_id);
        if (hiddenFields) hiddenFields.remove();
    }

    //Atualizando numeração das linhas da coluna Item
    var ln = 0;
    document.querySelectorAll('.ost2_te_veiculo_item').forEach((element) => {
        ln++;
        element.innerHTML = ln;
    });

    //Atualizando numeração das divs da coluna Item dos campos hiddens
    var ln = 0;
    document.querySelectorAll('.veiculo_item_hiddens').forEach((element) => {
        ln++;
        element.value = ln;
    });
}

//Limpar a Grade de Veiculos
function limparVeiculosGrade() {
    //Limpando Veiculos da grade
    document.getElementById('ost2_te_veiculo_grade').innerHTML = '';

    //Limpando campos hiddens
    document.getElementById('ost2_te_veiculo_hiddens').innerHTML = '';
}

//Pegar dados da linha que clicou e jogar para o Veiculo Escolher
function selecionarVeiculoExclusão(veiculo_id) {
    let veiculo_marca = document.getElementById('ost2_te_veiculo_marca_td_' + veiculo_id).innerHTML;
    let veiculo_modelo = document.getElementById('ost2_te_veiculo_modelo_td_' + veiculo_id).innerHTML;
    let veiculo_placa = document.getElementById('ost2_te_veiculo_placa_td_' + veiculo_id).innerHTML;
    let veiculo_combustivel = document.getElementById('ost2_te_veiculo_combustivel_td_' + veiculo_id).innerHTML;

    atualizarVeiculoEscolher(2, veiculo_id, veiculo_marca, veiculo_modelo, veiculo_placa, veiculo_combustivel);
}
//Grade de Veículos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Veículos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Grade de Clientes Executivos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Clientes Executivos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Atualiza/Limpa os dados do Cliente Executivo escolhido para grade
//operacao = 0 : Limpar
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
function atualizarClienteExecutivoEscolher(operacao, cliente_executivo_id='', cliente_executivo_nome='', cliente_executivo_funcao='') {
    if (operacao == 0) {
        //campos
        document.getElementById('ost2_te_cliente_executivo_id').value = cliente_executivo_id;
        document.getElementById('ost2_te_cliente_executivo_nome').value = cliente_executivo_nome;
        document.getElementById('ost2_te_cliente_executivo_funcao').value = cliente_executivo_funcao;

        //botoes
        document.getElementById('ost2_te_divClienteExecutivoAdicionar').style.display = 'none';
        document.getElementById('ost2_te_divClienteExecutivoRetirar').style.display = 'none';
    }

    if (operacao == 1) {
        //campos
        document.getElementById('ost2_te_cliente_executivo_nome').value = cliente_executivo_nome;
        document.getElementById('ost2_te_cliente_executivo_funcao').value = cliente_executivo_funcao;

        //botoes
        document.getElementById('ost2_te_divClienteExecutivoAdicionar').style.display = 'block';
        document.getElementById('ost2_te_divClienteExecutivoRetirar').style.display = 'none';
    }

    if (operacao == 2) {
        //campos
        document.getElementById('ost2_te_cliente_executivo_id').value = cliente_executivo_id;
        document.getElementById('ost2_te_cliente_executivo_nome').value = cliente_executivo_nome;
        document.getElementById('ost2_te_cliente_executivo_funcao').value = cliente_executivo_funcao;

        //botoes
        document.getElementById('ost2_te_divClienteExecutivoAdicionar').style.display = 'none';
        document.getElementById('ost2_te_divClienteExecutivoRetirar').style.display = 'block';
    }
}

//Atualizar a Grade de ClienteExecutivos
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
//operacao = 3 : Retirar
function atualizarClienteExecutivoGrade(operacao) {
    if (operacao == 1) {
        //Dados para preenchera linha da grade
        var cliente_executivo_id = document.getElementById('ost2_te_cliente_executivo_id').value;
        var cliente_executivo_nome = document.getElementById('ost2_te_cliente_executivo_nome').value;
        var cliente_executivo_funcao = document.getElementById('ost2_te_cliente_executivo_funcao').value;

        //Montar Linha
        var linha;

        linha = "<tr class='ost2_te_cliente_executivo_linha' id='ost2_te_cliente_executivo_linha_" + cliente_executivo_id + "' data-id='" + cliente_executivo_id + "' style='cursor: pointer' onclick='selecionarClienteExecutivoExclusão("+cliente_executivo_id+");'>";
        linha += "  <td class='text-center ost2_te_cliente_executivo_item' data-id='" + cliente_executivo_id + "'></td>";
        linha += "  <td id='ost2_te_cliente_executivo_nome_td_" + cliente_executivo_id + "'>" + cliente_executivo_nome + "</td>";
        linha += "  <td id='ost2_te_cliente_executivo_funcao_td_" + cliente_executivo_id + "'>" + cliente_executivo_funcao + "</td>";
        linha += "</tr>";

        //Adicionar linha na grade
        document.getElementById('ost2_te_cliente_executivo_grade').insertAdjacentHTML('beforeend', linha);

        //Montar campos hidden
        var hiddens;

        hiddens = "<div id='ost2_te_cliente_executivo_hiddens_" + cliente_executivo_id + "'>";
        hiddens += "<input class='cliente_executivo_item_hiddens' type='hidden' name='cliente_executivo_item[]' id='cliente_executivo_item' value=''>";
        hiddens += "<input type='hidden' name='cliente_executivo_id[]' id='cliente_executivo_id' value='"+cliente_executivo_id+"'>";
        hiddens += "<input type='hidden' name='cliente_executivo_nome[]' id='cliente_executivo_nome' value='"+cliente_executivo_nome+"'>";
        hiddens += "<input type='hidden' name='cliente_executivo_funcao[]' id='cliente_executivo_funcao' value='"+cliente_executivo_funcao+"'>";
        hiddens += "</div>";

        //Adicionar hiddens na div
        document.getElementById('ost2_te_cliente_executivo_hiddens').insertAdjacentHTML('beforeend', hiddens);
    }

    if (operacao == 3) {
        //Dados
        cliente_executivo_id = document.getElementById('ost2_te_cliente_executivo_id').value;

        //Remover linha da grade
        let linha = document.getElementById('ost2_te_cliente_executivo_linha_' + cliente_executivo_id);
        if (linha) linha.remove();

        //Remover campos hiddens
        let hiddenFields = document.getElementById('ost2_te_cliente_executivo_hiddens_' + cliente_executivo_id);
        if (hiddenFields) hiddenFields.remove();
    }

    //Atualizando numeração das linhas da coluna Item
    var ln = 0;
    document.querySelectorAll('.ost2_te_cliente_executivo_item').forEach((element) => {
        ln++;
        element.innerHTML = ln;
    });

    //Atualizando numeração das divs da coluna Item dos campos hiddens
    var ln = 0;
    document.querySelectorAll('.cliente_executivo_item_hiddens').forEach((element) => {
        ln++;
        element.value = ln;
    });
}

//Limpar a Grade de ClienteExecutivos
function limparClienteExecutivosGrade() {
    //Limpando ClienteExecutivos da grade
    document.getElementById('ost2_te_cliente_executivo_grade').innerHTML = '';

    //Limpando campos hiddens
    document.getElementById('ost2_te_cliente_executivo_hiddens').innerHTML = '';
}

//Pegar dados da linha que clicou e jogar para o ClienteExecutivo Escolher
function selecionarClienteExecutivoExclusão(cliente_executivo_id) {
    let cliente_executivo_nome = document.getElementById('ost2_te_cliente_executivo_nome_td_' + cliente_executivo_id).innerHTML;
    let cliente_executivo_funcao = document.getElementById('ost2_te_cliente_executivo_funcao_td_' + cliente_executivo_id).innerHTML;

    atualizarClienteExecutivoEscolher(2, cliente_executivo_id, cliente_executivo_nome, cliente_executivo_funcao);
}
//Grade de Clientes Executivos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Clientes Executivos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Grade de Destinos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Destinos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Atualiza/Limpa os dados do Destino escolhido para grade
//operacao = 0 : Limpar
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
function atualizarDestinoEscolher(operacao, destino_ordem='', destino_cep='', destino_logradouro='', destino_bairro='', destino_localidade='', destino_uf='', destino_numero='', destino_complemento='') {
    if (operacao == 0) {
        //campos
        document.getElementById('ost2_te_destino_ordem').value = destino_ordem;
        document.getElementById('ost2_te_destino_cep').value = destino_cep;
        document.getElementById('ost2_te_destino_logradouro').value = destino_logradouro;
        document.getElementById('ost2_te_destino_bairro').value = destino_bairro;
        document.getElementById('ost2_te_destino_localidade').value = destino_localidade;
        document.getElementById('ost2_te_destino_uf').value = destino_uf;
        document.getElementById('ost2_te_destino_numero').value = destino_numero;
        document.getElementById('ost2_te_destino_complemento').value = destino_complemento;

        //botoes
        document.getElementById('ost2_te_divDestinoAdicionar').style.display = 'none';
        document.getElementById('ost2_te_divDestinoRetirar').style.display = 'none';
    }

    if (operacao == 1) {
        //campos
        document.getElementById('ost2_te_destino_cep').value = destino_cep;
        document.getElementById('ost2_te_destino_logradouro').value = destino_logradouro;
        document.getElementById('ost2_te_destino_bairro').value = destino_bairro;
        document.getElementById('ost2_te_destino_localidade').value = destino_localidade;
        document.getElementById('ost2_te_destino_uf').value = destino_uf;

        //botoes
        document.getElementById('ost2_te_divDestinoAdicionar').style.display = 'block';
        document.getElementById('ost2_te_divDestinoRetirar').style.display = 'none';
    }

    if (operacao == 2) {
        //campos
        document.getElementById('ost2_te_destino_ordem').value = destino_ordem;
        document.getElementById('ost2_te_destino_cep').value = destino_cep;
        document.getElementById('ost2_te_destino_logradouro').value = destino_logradouro;
        document.getElementById('ost2_te_destino_bairro').value = destino_bairro;
        document.getElementById('ost2_te_destino_localidade').value = destino_localidade;
        document.getElementById('ost2_te_destino_uf').value = destino_uf;
        document.getElementById('ost2_te_destino_numero').value = destino_numero;
        document.getElementById('ost2_te_destino_complemento').value = destino_complemento;

        //botoes
        document.getElementById('ost2_te_divDestinoAdicionar').style.display = 'none';
        document.getElementById('ost2_te_divDestinoRetirar').style.display = 'block';
    }
}

//Atualizar a Grade de Destinos
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
//operacao = 3 : Retirar
function atualizarDestinoGrade(operacao) {
    if (operacao == 1) {
        //Dados para preenchera linha da grade
        var destino_ordem = document.getElementById('ost2_te_destino_ordem').value;
        var destino_cep = document.getElementById('ost2_te_destino_cep').value;
        var destino_numero = document.getElementById('ost2_te_destino_numero').value;
        var destino_complemento = document.getElementById('ost2_te_destino_complemento').value;
        var destino_logradouro = document.getElementById('ost2_te_destino_logradouro').value;
        var destino_bairro = document.getElementById('ost2_te_destino_bairro').value;
        var destino_localidade = document.getElementById('ost2_te_destino_localidade').value;
        var destino_uf = document.getElementById('ost2_te_destino_uf').value;

        //Montar Linha
        var linha;

        linha = "<tr class='ost2_te_destino_linha' id='ost2_te_destino_linha_" + destino_ordem + "' data-id='" + destino_ordem + "' style='cursor: pointer' onclick='selecionarDestinoExclusão("+destino_ordem+");'>";
        linha += "  <td id='ost2_te_destino_ordem_td_" + destino_ordem + "'>" + destino_ordem + "</td>";
        linha += "  <td id='ost2_te_destino_cep_td_" + destino_ordem + "'>" + destino_cep + "</td>";
        linha += "  <td id='ost2_te_destino_logradouro_td_" + destino_ordem + "'>" + destino_logradouro + "</td>";
        linha += "  <td id='ost2_te_destino_bairro_td_" + destino_ordem + "'>" + destino_bairro + "</td>";
        linha += "  <td id='ost2_te_destino_localidade_td_" + destino_ordem + "'>" + destino_localidade + "</td>";
        linha += "  <td id='ost2_te_destino_uf_td_" + destino_ordem + "'>" + destino_uf + "</td>";
        linha += "  <td id='ost2_te_destino_numero_td_" + destino_ordem + "'>" + destino_numero + "</td>";
        linha += "  <td id='ost2_te_destino_complemento_td_" + destino_ordem + "'>" + destino_complemento + "</td>";
        linha += "</tr>";

        //Adicionar linha na grade
        document.getElementById('ost2_te_destino_grade').insertAdjacentHTML('beforeend', linha);

        //Ordenar Tabela Destinos
        ordenarTabelaDestinos(0);

        //Montar campos hidden
        var hiddens;

        hiddens = "<div id='ost2_te_destino_hiddens_" + destino_ordem + "'>";
        hiddens += "<input type='hidden' name='destino_ordem[]' id='destino_ordem' value='"+destino_ordem+"'>";
        hiddens += "<input type='hidden' name='destino_cep[]' id='destino_cep' value='"+destino_cep+"'>";
        hiddens += "<input type='hidden' name='destino_logradouro[]' id='destino_logradouro' value='"+destino_logradouro+"'>";
        hiddens += "<input type='hidden' name='destino_bairro[]' id='destino_bairro' value='"+destino_bairro+"'>";
        hiddens += "<input type='hidden' name='destino_localidade[]' id='destino_localidade' value='"+destino_localidade+"'>";
        hiddens += "<input type='hidden' name='destino_uf[]' id='destino_uf' value='"+destino_uf+"'>";
        hiddens += "<input type='hidden' name='destino_numero[]' id='destino_numero' value='"+destino_numero+"'>";
        hiddens += "<input type='hidden' name='destino_complemento[]' id='destino_complemento' value='"+destino_complemento+"'>";
        hiddens += "</div>";

        //Adicionar hiddens na div
        document.getElementById('ost2_te_destino_hiddens').insertAdjacentHTML('beforeend', hiddens);
    }

    if (operacao == 3) {
        //Dados
        destino_ordem = document.getElementById('ost2_te_destino_ordem').value;

        //Remover linha da grade
        let linha = document.getElementById('ost2_te_destino_linha_' + destino_ordem);
        if (linha) linha.remove();

        //Remover campos hiddens
        let hiddenFields = document.getElementById('ost2_te_destino_hiddens_' + destino_ordem);
        if (hiddenFields) hiddenFields.remove();
    }
}

//Limpar a Grade de Destinos
function limparDestinosGrade() {
    //Limpando Destinos da grade
    document.getElementById('ost2_te_destino_grade').innerHTML = '';

    //Limpando campos hiddens
    document.getElementById('ost2_te_destino_hiddens').innerHTML = '';
}

//Pegar dados da linha que clicou e jogar para o Destino Escolher
function selecionarDestinoExclusão(destino_ordem) {
    let destino_cep = document.getElementById('ost2_te_destino_cep_td_' + destino_ordem).innerHTML;
    let destino_logradouro = document.getElementById('ost2_te_destino_logradouro_td_' + destino_ordem).innerHTML;
    let destino_bairro = document.getElementById('ost2_te_destino_bairro_td_' + destino_ordem).innerHTML;
    let destino_localidade = document.getElementById('ost2_te_destino_localidade_td_' + destino_ordem).innerHTML;
    let destino_uf = document.getElementById('ost2_te_destino_uf_td_' + destino_ordem).innerHTML;
    let destino_numero = document.getElementById('ost2_te_destino_numero_td_' + destino_ordem).innerHTML;
    let destino_complemento = document.getElementById('ost2_te_destino_complemento_td_' + destino_ordem).innerHTML;

    atualizarDestinoEscolher(2, destino_ordem, destino_cep, destino_logradouro, destino_bairro, destino_localidade, destino_uf, destino_numero, destino_complemento);
}

async function buscarEnderecoDestino(cep) {
    //Dados
    var ordem = document.getElementById('ost2_te_destino_ordem').value;
    var cep = document.getElementById('ost2_te_destino_cep').value;
    var numero = document.getElementById('ost2_te_destino_numero').value;
    var complemento = document.getElementById('ost2_te_destino_complemento').value;

    //Limpar Dados
    document.getElementById('ost2_te_destino_logradouro').value = '';
    document.getElementById('ost2_te_destino_bairro').value = '';
    document.getElementById('ost2_te_destino_localidade').value = '';
    document.getElementById('ost2_te_destino_uf').value = '';

    //Validar CEP
    if (validacao({op:1, value:cep}) === true) {
        if (validacao({op:9, value:cep}) === false) {
            alert('CEP inválido.');
            return;
        }
    } else {
        alert('CEP vazio.');
        return;
    }

    //Pesquisar CEP
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.erro) {
        var logradouro = data.logradouro;
        var bairro = data.bairro;
        var localidade = data.localidade;
        var uf = data.uf;

        //copiar os dados para os campos
        atualizarDestinoEscolher(1, ordem, cep, logradouro, bairro, localidade, uf, numero, complemento);
    } else {
        alert('CEP não encontrado.');
        return;
    }
}

function ordenarTabelaDestinos(colunaIndex) {
    let tbody = document.getElementById('ost2_te_destino_grade');
    let linhas = Array.from(tbody.querySelectorAll("tr"));

    linhas.sort((a, b) => {
        let valorA = a.cells[colunaIndex].textContent.trim();
        let valorB = b.cells[colunaIndex].textContent.trim();

        // Converter para número se possível
        if (!isNaN(valorA) && !isNaN(valorB)) {
            return Number(valorA) - Number(valorB);
        }

        return valorA.localeCompare(valorB);
    });

    // Reinsere as linhas ordenadas na tabela
    linhas.forEach(linha => tbody.appendChild(linha));
}
//Grade de Destinos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Destinos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Gerar OrdemServico
function gerar_ordem_servico(ordem_servico_id=0) {
    if (ordem_servico_id == 0) {ordem_servico_id = document.getElementById('registro_id').value;}

    ordem_servico_gerar_pdf(ordem_servico_id);
}

function ordem_servico_gerar_pdf(ordem_servico_id=0) {
    //Configurações
    if (!window.jsPDF) window.jsPDF = window.jspdf.jsPDF;

    //Iniciando jsPDF
    var doc = new jsPDF({orientation: 'p'});

    //Variáveis (Geral)
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    function adicionarCabecalhoRodape() {
        doc.addImage('build/assets/images/ordem_servico_topo.png', 'PNG', 15, 10, pageWidth - 30, 30);
        doc.addImage('build/assets/images/ordem_servico_rodape.png', 'PNG', 15, pageHeight - 30, pageWidth - 20, 20);
    }

    //Função para implementar texto no pdf
    //@PARAM x_align : 'left' // Pode ser 'left', 'right', 'center' ou 'justify'
    //@PARAM x_fontStyle : 'normal', 'bold', 'italic' ou 'bolditalic'
    //@PARAM x_subtitulo : Se for um Título ou Subtítulo que precisa ficar junto do texto posterior então envia algo para não ficar vazio (irá fazer o cálculo diferente de fim de página)
    function gerarTexto({x_texto = '', x_spacingBetweenTexts = spacingBetweenTexts3, x_marginLeft = marginLeft, x_marginTop = novaMarginTop, x_font = 1, x_fontStyle = 'normal', x_fontSize = 12, x_align = 'left', x_subtitulo = ''}) {
        let linhasTexto = doc.splitTextToSize(x_texto, textWidth);
        let alturaTexto = linhasTexto.length * x_spacingBetweenTexts;

        //alert(linhasTexto+' ## '+linhasTexto.length+' ## '+alturaTexto);

        //Verifica se o texto cabe na página, senão cria uma nova
        let espacoFimPagina = 65;
        if (x_subtitulo != '') {espacoFimPagina = 85;}
        if ((x_marginTop + alturaTexto) > (pageHeight - espacoFimPagina)) {
            novaPagina();
            x_marginTop = novaMarginTop; // Reinicia a margem após nova página
        }

        // Define a fonte conforme o parâmetro recebido
        switch (x_font) {
            case 1:
                doc.setFont('helvetica', x_fontStyle);
                break;
            case 2:
                doc.setFont('times', x_fontStyle);
                break;
            case 3:
                doc.setFont('courier', x_fontStyle);
                break;
            default:
                doc.setFont('helvetica', x_fontStyle);
        }

        doc.setFontSize(x_fontSize);

        //Alinhamento texto
        let posX = x_marginLeft; // Padrão: alinhado à esquerda

        if (x_align === 'right') {
            posX = pageWidth - x_marginLeft - doc.getTextWidth(x_texto);
        } else if (x_align === 'center') {
            posX = (pageWidth - doc.getTextWidth(x_texto)) / 2;
        }

        if (x_align === 'justify') {
            doc.text(x_texto, posX, x_marginTop, {maxWidth: textWidth, align: 'justify'});
        } else {
            doc.text(x_texto, posX, x_marginTop);
        }

        x_marginTop += x_spacingBetweenTexts; // Ajusta a posição para a próxima linha

        // Atualiza a margem superior para o próximo bloco de texto
        novaMarginTop = x_marginTop + alturaTexto + x_spacingBetweenTexts;
    }

    function novaPagina() {
        doc.addPage();
        novaMarginTop = marginTop;

        adicionarCabecalhoRodape();
    }

    adicionarCabecalhoRodape();

    //Configurações iniciais
    const marginLeft = 15; //Margem esquerda padrão
    const marginRight = 190; //Margem direita padrão
    const marginTop = 50; //Margem topo inicial
    const textWidth = 170; //Tamanho máximo da linha
    const spacingBetweenTexts1 = 1; //Espaçamento entre dois textos
    const spacingBetweenTexts2 = 2; //Espaçamento entre dois textos
    const spacingBetweenTexts3 = 3; //Espaçamento entre dois textos
    const spacingBetweenTexts4 = 4; //Espaçamento entre dois textos
    const spacingBetweenTexts5 = 5; //Espaçamento entre dois textos
    const spacingBetweenTexts6 = 6; //Espaçamento entre dois textos
    const spacingBetweenTexts8 = 8; //Espaçamento entre dois textos
    const spacingBetweenTexts10 = 10; //Espaçamento entre dois textos

    var novaMarginTop = 0; //Nova margem topo
    var linhasTexto = 0; //Quantidade de linhas do texto
    var alturaTexto = 0; //Altura do texto

    var texto = '';
    var numeroTitulo = 0; //Número dos Títulos do PDF

    //Acessar rota
    fetch('ordens_servicos/'+ordem_servico_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo dados
        if (data.success) {
            //Texto
            texto = 'Ordem Serviço nº. '+data.success.numero_ordem_servico+'/'+data.success.ano_ordem_servico+'.';
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_marginLeft:marginLeft, x_marginTop:marginTop, x_fontSize:12, x_align:'right'});

            //Texto
            texto = data.success.cliente_nome;
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_fontStyle:'bold', x_fontSize:11});

            //Texto
            texto = data.success.cliente_logradouro;
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_fontSize:11});

            //Texto
            texto = data.success.cliente_bairro+' - '+data.success.cliente_cidade;
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_fontSize:11});

            //Tabela de serviços''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            //Texto
            numeroTitulo++;
            texto = numeroTitulo+'. DOS SERVIÇOS';
            gerarTexto({x_texto:'', x_spacingBetweenTexts:spacingBetweenTexts3});
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_fontStyle:'bold', x_fontSize:11, x_subtitulo:'subtitulo'});

            var tabelaHTML = `<table>
                                <thead>
                                    <tr>
                                        <th>&nbsp;<b>ITEM</b>&nbsp;</th>
                                        <th>&nbsp;<b>SERVIÇO</b>&nbsp;</th>
                                        <th>&nbsp;<b>RESPONSÁVEL</b>&nbsp;</th>
                                        <th>&nbsp;<b>VALOR</b>&nbsp;</th>
                                        <th>&nbsp;<b>QTD</b>&nbsp;</th>
                                        <th>&nbsp;<b>TOTAL</b>&nbsp;</th>
                                    </tr>
                                </thead>
                            <tbody>`;

            var qtdLinhasTabela = 1;
            var valorGlobal = 0;

            ordem_servico_servicos = data.success.ordem_servico_servicos;

            ordem_servico_servicos.forEach(function (dado) {
                //Dados para preencher na linha da grade
                servico_item = dado.servico_item;
                servico_nome = dado.servico_nome;
                responsavel_funcionario_nome = dado.responsavel_funcionario_nome;
                servico_valor = dado.servico_valor;
                servico_quantidade = dado.servico_quantidade;
                servico_valor_total = dado.servico_valor_total;

                valorGlobal += parseFloat(servico_valor_total);

                tabelaHTML += `<tr>
                                <td>${servico_item ? servico_item : ''}</td>
                                <td>${servico_nome ? servico_nome : ''}</td>
                                <td>${responsavel_funcionario_nome ? responsavel_funcionario_nome : ''}</td>
                                <td>${'R$ '+float2moeda(servico_valor)}</td>
                                <td>${servico_quantidade ? servico_quantidade : ''}</td>
                                <td>${'R$ '+float2moeda(servico_valor_total)}</td>
                            </tr>`;

                qtdLinhasTabela++;
            });

            tabelaHTML += `<tr>
                            <th colspan="4">VALOR GLOBAL</th>
                            <th colspan="2">${'R$ '+float2moeda(valorGlobal)}</th>
                        </tr>
                    </tbody>
                </table>`;

            qtdLinhasTabela++;
            qtdLinhasTabela++;

            //Criando um elemento temporário para converter a string em HTML real
            var div = document.createElement('div');
            div.innerHTML = tabelaHTML;
            var tabela = div.querySelector('table');

            //Converte a tabela para PDF usando autoTable
            doc.autoTable({
                html: tabela, // Usa a tabela do HTML
                startY: novaMarginTop, // Define onde começa a tabela no PDF
                useCss: true, // Permite que os estilos CSS sejam considerados
                styles: {
                    fontStyle: "normal",
                    fontSize: 8,
                    textColor: [0, 0, 0], // Cor do texto preto
                    lineColor: [121, 130, 156], // Cor da borda cinza escuro (#79829c)
                    lineWidth: 0.2, // Espessura da borda
                },
                headStyles: {
                    fontStyle: "bold",
                    fontSize: 8,
                    fillColor: [0, 254, 255], // Cor do cabeçalho #00FEFF (Ciano)
                    textColor: [0, 0, 0], // Texto preto
                },
                alternateRowStyles: {
                    fillColor: [255, 255, 255], // Cor de fundo alternada para as linhas
                },
                columnStyles: {
                    0: { halign: "center" }, // Coluna ITEM centralizada
                    1: { halign: "left" }, // Coluna DESCRIÇÃO alinhada à esquerda
                    2: { halign: "left" }, // Coluna RESPONSAVEL alinhada à esquerda
                    3: { halign: "right" }, // Coluna VALOR UNITÁRIO alinhada à direita
                    4: { halign: "center" }, // Coluna QUANTIDADE centralizada
                    5: { halign: "right" }, // Coluna VALOR TOTAL alinhada à direita
                },
                didParseCell: function (data) {
                    //Força padding em cada célula
                    data.cell.styles.cellPadding = 2;

                    //Mudar estilos para a última linha
                    if ((data.row.index === data.table.body.length - 1) || (data.row.index === data.table.body.length - 1)) {
                        data.cell.styles.fillColor = [0, 254, 255]; // Fundo ciano
                        data.cell.styles.textColor = [0, 0, 0]; // Texto preto
                        data.cell.styles.fontStyle = "bold"; // Negrito

                        //Mesclar colunas
                        if (data.column.index === 0) {
                            data.cell.colSpan = 4; // Faz a célula ocupar 3 colunas
                            data.cell.styles.halign = "right"; // Alinha o texto ao centro
                        }

                        if (data.column.index === 4) {
                            data.cell.colSpan = 2; // Faz a célula ocupar 3 colunas
                            data.cell.styles.halign = "right"; // Alinha o texto ao centro
                        }
                    }
                },
                margin: { top: 50 },
            });

            //Nova margem topo para depois da tabela
            novaMarginTop = novaMarginTop + (qtdLinhasTabela*6.3) + 5;
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            if (data.success.descricao_servico != '') {
                //Texto
                texto = 'Descrição: '+data.success.descricao_servico;
                gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify', x_fontStyle:'normal'});
            }

            if (data.success.ordemServicoPrioridadeName != '') {
                //Texto
                texto = 'Prioridade: '+data.success.ordemServicoPrioridadeName;
                gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify', x_fontStyle:'normal'});
            }

            if (data.success.observacao != '') {
                //Texto
                texto = 'Observação: '+data.success.observacao;
                gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify', x_fontStyle:'normal'});
            }

            //Tabela de veículos''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            //Texto
            numeroTitulo++;
            texto = numeroTitulo+'. DOS VEÍCULOS';
            gerarTexto({x_texto:'', x_spacingBetweenTexts:spacingBetweenTexts3});
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_fontStyle:'bold', x_fontSize:11, x_subtitulo:'subtitulo'});

            var tabelaHTML = `<table>
                                <thead>
                                    <tr>
                                        <th>&nbsp;<b>ITEM</b>&nbsp;</th>
                                        <th>&nbsp;<b>MARCA</b>&nbsp;</th>
                                        <th>&nbsp;<b>MODELO</b>&nbsp;</th>
                                        <th>&nbsp;<b>PLACA</b>&nbsp;</th>
                                        <th>&nbsp;<b>COMBUSTÍVEL</b>&nbsp;</th>
                                    </tr>
                                </thead>
                            <tbody>`;

            var qtdLinhasTabela = 1;

            ordem_servico_veiculos = data.success.ordem_servico_veiculos;

            ordem_servico_veiculos.forEach(function (dado) {
                //Dados para preencher na linha da grade
                veiculo_item = dado.veiculo_item;
                veiculo_marca = dado.veiculo_marca;
                veiculo_modelo = dado.veiculo_modelo;
                veiculo_placa = dado.veiculo_placa;
                veiculo_combustivel = dado.veiculo_combustivel;

                tabelaHTML += `<tr>
                                <td>${veiculo_item ? veiculo_item : ''}</td>
                                <td>${veiculo_marca ? veiculo_marca : ''}</td>
                                <td>${veiculo_modelo ? veiculo_modelo : ''}</td>
                                <td>${veiculo_placa ? veiculo_placa : ''}</td>
                                <td>${veiculo_combustivel ? veiculo_combustivel : ''}</td>
                            </tr>`;

                qtdLinhasTabela++;
            });

            tabelaHTML += `</tbody>
                        </table>`;

            qtdLinhasTabela++;
            qtdLinhasTabela++;

            //Criando um elemento temporário para converter a string em HTML real
            var div = document.createElement('div');
            div.innerHTML = tabelaHTML;
            var tabela = div.querySelector('table');

            //Converte a tabela para PDF usando autoTable
            doc.autoTable({
                html: tabela, // Usa a tabela do HTML
                startY: novaMarginTop, // Define onde começa a tabela no PDF
                useCss: true, // Permite que os estilos CSS sejam considerados
                styles: {
                    fontStyle: "normal",
                    fontSize: 8,
                    textColor: [0, 0, 0], // Cor do texto preto
                    lineColor: [121, 130, 156], // Cor da borda cinza escuro (#79829c)
                    lineWidth: 0.2, // Espessura da borda
                },
                headStyles: {
                    fontStyle: "bold",
                    fontSize: 8,
                    fillColor: [0, 254, 255], // Cor do cabeçalho #00FEFF (Ciano)
                    textColor: [0, 0, 0], // Texto preto
                },
                alternateRowStyles: {
                    fillColor: [255, 255, 255], // Cor de fundo alternada para as linhas
                },
                columnStyles: {
                    0: { halign: "center" }, // Coluna ITEM centralizada
                    1: { halign: "left" }, // Coluna MARCA alinhada à esquerda
                    2: { halign: "left" }, // Coluna MODELO alinhada à esquerda
                    3: { halign: "center" }, // Coluna PLACA alinhada à esquerda
                    4: { halign: "left" }, // Coluna COMBUSTIVEL centralizada
                },
                didParseCell: function (data) {
                    //Força padding em cada célula
                    data.cell.styles.cellPadding = 2;
                },
                margin: { top: 50 },
            });

            //Nova margem topo para depois da tabela
            novaMarginTop = novaMarginTop + (qtdLinhasTabela*6.3) + 5;
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Tabela de executivos''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            //Texto
            numeroTitulo++;
            texto = numeroTitulo+'. DOS EXECUTIVOS';
            gerarTexto({x_texto:'', x_spacingBetweenTexts:spacingBetweenTexts3});
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_fontStyle:'bold', x_fontSize:11, x_subtitulo:'subtitulo'});

            var tabelaHTML = `<table>
                                <thead>
                                    <tr>
                                        <th>&nbsp;<b>ITEM</b>&nbsp;</th>
                                        <th>&nbsp;<b>NOME</b>&nbsp;</th>
                                        <th>&nbsp;<b>FUNÇÃO</b>&nbsp;</th>
                                    </tr>
                                </thead>
                            <tbody>`;

            var qtdLinhasTabela = 1;

            ordem_servico_executivos = data.success.ordem_servico_executivos;

            ordem_servico_executivos.forEach(function (dado) {
                //Dados para preencher na linha da grade
                cliente_executivo_item = dado.cliente_executivo_item;
                cliente_executivo_nome = dado.cliente_executivo_nome;
                cliente_executivo_funcao = dado.cliente_executivo_funcao;

                tabelaHTML += `<tr>
                                <td>${cliente_executivo_item ? cliente_executivo_item : ''}</td>
                                <td>${cliente_executivo_nome ? cliente_executivo_nome : ''}</td>
                                <td>${cliente_executivo_funcao ? cliente_executivo_funcao : ''}</td>
                            </tr>`;

                qtdLinhasTabela++;
            });

            tabelaHTML += `</tbody>
                        </table>`;

            qtdLinhasTabela++;
            qtdLinhasTabela++;

            //Criando um elemento temporário para converter a string em HTML real
            var div = document.createElement('div');
            div.innerHTML = tabelaHTML;
            var tabela = div.querySelector('table');

            //Converte a tabela para PDF usando autoTable
            doc.autoTable({
                html: tabela, // Usa a tabela do HTML
                startY: novaMarginTop, // Define onde começa a tabela no PDF
                useCss: true, // Permite que os estilos CSS sejam considerados
                styles: {
                    fontStyle: "normal",
                    fontSize: 8,
                    textColor: [0, 0, 0], // Cor do texto preto
                    lineColor: [121, 130, 156], // Cor da borda cinza escuro (#79829c)
                    lineWidth: 0.2, // Espessura da borda
                },
                headStyles: {
                    fontStyle: "bold",
                    fontSize: 8,
                    fillColor: [0, 254, 255], // Cor do cabeçalho #00FEFF (Ciano)
                    textColor: [0, 0, 0], // Texto preto
                },
                alternateRowStyles: {
                    fillColor: [255, 255, 255], // Cor de fundo alternada para as linhas
                },
                columnStyles: {
                    0: { halign: "center" }, // Coluna ITEM centralizada
                    1: { halign: "left" }, // Coluna NOME alinhada à esquerda
                    2: { halign: "left" }, // Coluna FUNÇÃO alinhada à esquerda
                },
                didParseCell: function (data) {
                    //Força padding em cada célula
                    data.cell.styles.cellPadding = 2;
                },
                margin: { top: 50 },
            });

            //Nova margem topo para depois da tabela
            novaMarginTop = novaMarginTop + (qtdLinhasTabela*6.3) + 5;
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Tabela de destinos''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            //Texto
            numeroTitulo++;
            texto = numeroTitulo+'. DOS VEÍCULOS';
            gerarTexto({x_texto:'', x_spacingBetweenTexts:spacingBetweenTexts3});
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_fontStyle:'bold', x_fontSize:11, x_subtitulo:'subtitulo'});

            var tabelaHTML = `<table>
                                <thead>
                                    <tr>
                                        <th>&nbsp;<b>ORDEM</b>&nbsp;</th>
                                        <th>&nbsp;<b>CEP</b>&nbsp;</th>
                                        <th>&nbsp;<b>LOGRADOURO</b>&nbsp;</th>
                                        <th>&nbsp;<b>BAIRRO</b>&nbsp;</th>
                                        <th>&nbsp;<b>LOCALIDADE</b>&nbsp;</th>
                                        <th>&nbsp;<b>UF</b>&nbsp;</th>
                                        <th>&nbsp;<b>NÚMERO</b>&nbsp;</th>
                                        <th>&nbsp;<b>COMPLEMENTO</b>&nbsp;</th>
                                    </tr>
                                </thead>
                            <tbody>`;

            var qtdLinhasTabela = 1;

            ordem_servico_destinos = data.success.ordem_servico_destinos;

            ordem_servico_destinos.forEach(function (dado) {
                //Dados para preencher na linha da grade
                destino_ordem = dado.destino_ordem;
                destino_cep = dado.destino_cep;
                destino_logradouro = dado.destino_logradouro;
                destino_bairro = dado.destino_bairro;
                destino_localidade = dado.destino_localidade;
                destino_uf = dado.destino_uf;
                destino_numero = dado.destino_numero;
                destino_complemento = dado.destino_complemento;

                tabelaHTML += `<tr>
                                <td>${destino_ordem}</td>
                                <td>${destino_cep}</td>
                                <td>${destino_logradouro}</td>
                                <td>${destino_bairro}</td>
                                <td>${destino_localidade}</td>
                                <td>${destino_uf}</td>
                                <td>${destino_numero}</td>
                                <td>${destino_complemento ? destino_complemento : ''}</td>
                            </tr>`;

                qtdLinhasTabela++;
            });

            tabelaHTML += `</tbody>
                        </table>`;

            qtdLinhasTabela++;
            qtdLinhasTabela++;

            //Criando um elemento temporário para converter a string em HTML real
            var div = document.createElement('div');
            div.innerHTML = tabelaHTML;
            var tabela = div.querySelector('table');

            //Converte a tabela para PDF usando autoTable
            doc.autoTable({
                html: tabela, // Usa a tabela do HTML
                startY: novaMarginTop, // Define onde começa a tabela no PDF
                useCss: true, // Permite que os estilos CSS sejam considerados
                styles: {
                    fontStyle: "normal",
                    fontSize: 8,
                    textColor: [0, 0, 0], // Cor do texto preto
                    lineColor: [121, 130, 156], // Cor da borda cinza escuro (#79829c)
                    lineWidth: 0.2, // Espessura da borda
                },
                headStyles: {
                    fontStyle: "bold",
                    fontSize: 8,
                    fillColor: [0, 254, 255], // Cor do cabeçalho #00FEFF (Ciano)
                    textColor: [0, 0, 0], // Texto preto
                },
                alternateRowStyles: {
                    fillColor: [255, 255, 255], // Cor de fundo alternada para as linhas
                },
                columnStyles: {
                    0: { halign: "center" }, // Coluna ORDEM centralizada
                    1: { halign: "left" }, // Coluna CEP alinhada à esquerda
                    2: { halign: "left" }, // Coluna LOGRADOURO alinhada à esquerda
                    3: { halign: "left" }, // Coluna BAIRRO alinhada à esquerda
                    4: { halign: "left" }, // Coluna LOCALIDADE centralizada
                    5: { halign: "left" }, // Coluna UF centralizada
                    6: { halign: "left" }, // Coluna NUMERO centralizada
                    7: { halign: "left" }, // Coluna COMPLEMENTO centralizada
                },
                didParseCell: function (data) {
                    //Força padding em cada célula
                    data.cell.styles.cellPadding = 2;
                },
                margin: { top: 50 },
            });

            //Nova margem topo para depois da tabela
            novaMarginTop = novaMarginTop + (qtdLinhasTabela*6.3) + 5;
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''










            /***************************************************************

             //Texto
             texto = '1. DO VALOR DA PROPOSTA';
             gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts3, x_fontStyle:'bold', x_fontSize:11, x_subtitulo:'subtitulo'});

             //Texto
             texto = '     '+'R$ '+data.success.valor_total+' ('+data.success.valor_total_extenso+')';
             gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts6, x_fontSize:11});

             //Texto
             texto = '2. DA FORMA E CONDIÇÕES DE PAGAMENTO';
             gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts3, x_fontStyle:'bold', x_fontSize:11, x_subtitulo:'subtitulo'});

             //Texto
             texto = '     '+data.success.forma_pagamento;
             gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts6, x_fontSize:11});

             //DAS GENERALIDADES
             if (data.success.paragrafo_1 != '' || data.success.paragrafo_2 != '' || data.success.paragrafo_3 != '' || data.success.paragrafo_4 != '' || data.success.paragrafo_5 != '' || data.success.paragrafo_6 != '' || data.success.paragrafo_7 != '' || data.success.paragrafo_8 != '' || data.success.paragrafo_9 != '' || data.success.paragrafo_10 != '') {
                //Texto
                texto = '3. DAS GENERALIDADES';
                gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts3, x_fontStyle:'bold', x_fontSize:11, x_subtitulo:'subtitulo'});

                var generalidadeItem = 0;

                if (data.success.paragrafo_1 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_1;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify', x_fontStyle:'normal'});
                }

                if (data.success.paragrafo_2 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_2;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }

                if (data.success.paragrafo_3 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_3;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }

                if (data.success.paragrafo_4 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_4;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }

                if (data.success.paragrafo_5 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_5;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }

                if (data.success.paragrafo_6 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_6;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }

                if (data.success.paragrafo_7 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_7;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }

                if (data.success.paragrafo_8 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_8;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }

                if (data.success.paragrafo_9 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_9;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }

                if (data.success.paragrafo_10 != '') {
                    generalidadeItem++;

                    //Texto
                    texto = '     '+'3.'+generalidadeItem+'. '+data.success.paragrafo_10;
                    gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify'});
                }
            }

             *********************************************************/



                //Gerar o pdf, abrir em uma outra aba e colocar link para download''''''''''''''''''''''''''''''''''''''
            const pdfBlob = doc.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);

            //Tentar abrir em uma nova aba
            const newTab = window.open(pdfUrl);

            //Adiciona um link abaixo do botão
            let frm_ordens_servicos = document.getElementById('frm_ordens_servicos');

            //Verifica se já existe um link para evitar duplicação
            let existingLink = document.getElementById('pdf_download_link');
            if (existingLink) {
                existingLink.href = pdfUrl; // Atualiza o link existente
                return;
            }

            //Cria o link dinamicamente
            let link = document.createElement('a');
            link.id = 'pdf_download_link';
            link.href = pdfUrl;
            link.download = 'documento.pdf';
            link.textContent = 'Clique aqui para baixar o PDF';

            //Estiliza o link para ficar vermelho
            link.style.color = 'red';
            link.style.textDecoration = 'underline';
            link.style.display = 'block';
            link.style.marginTop = '10px';

            //Insere o link logo abaixo do botão
            frm_ordens_servicos.parentNode.insertBefore(link, frm_ordens_servicos.nextSibling);
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        }
    }).catch(error => {
        alert('Erro ordem_servico_gerar_pdf:'+error);
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    //Buscar dados do Cliente escolhido
    document.getElementById('ost2_cliente_id').addEventListener('change', function() {
        if (document.getElementById('ost2_cliente_id').value == '') {
            //Inputs
            document.getElementById('ost2_cliente_nome').value = '';
            document.getElementById('ost2_cliente_telefone').value = '';
            document.getElementById('ost2_cliente_celular').value = '';
            document.getElementById('ost2_cliente_email').value = '';
            document.getElementById('ost2_cliente_logradouro').value = '';
            document.getElementById('ost2_cliente_bairro').value = '';
            document.getElementById('ost2_cliente_cidade').value = '';
        } else {
            var ost2_cliente_id = document.getElementById('ost2_cliente_id').value;

            //Route: clientes/id
            fetch('clientes/'+ost2_cliente_id, {
                method: 'GET',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                var cliente = data.success;

                //Telefone
                var telefone = '';
                if (cliente.telefone_1 !== '' && cliente.telefone_1 !== null) {
                    telefone = cliente.telefone_1;
                } else {
                    if (cliente.telefone_2 !== '' && cliente.telefone_2 !== null) {
                        telefone = cliente.telefone_2;
                    }
                }

                if (telefone != '') {
                    telefone = telefone.replace(/\D/g, ""); // Remove tudo que não for número
                    telefone = telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
                }

                //Celular
                var celular = '';
                if (cliente.celular_1 !== '' && cliente.celular_1 !== null) {
                    celular = cliente.celular_1;
                } else {
                    if (cliente.celular_2 !== '' && cliente.celular_2 !== null) {
                        celular = cliente.celular_2;
                    }
                }

                if (celular != '') {
                    celular = celular.replace(/\D/g, ""); // Remove tudo que não for número
                    celular = celular.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
                }

                //Inputs
                document.getElementById('ost2_cliente_nome').value = cliente.name;
                document.getElementById('ost2_cliente_telefone').value = telefone;
                document.getElementById('ost2_cliente_celular').value = celular;
                document.getElementById('ost2_cliente_email').value = cliente.email;
                document.getElementById('ost2_cliente_logradouro').value = cliente.logradouro;
                document.getElementById('ost2_cliente_bairro').value = cliente.bairro;
                document.getElementById('ost2_cliente_cidade').value = cliente.localidade;
            }).catch(error => {
                alert('Erro OrdensServicos:'+error);
            });


        }
    });

    //Grade de Serviços - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Serviços - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Buscar dados do Serviço escolhido
    document.getElementById('ost2_ts_servico_id').addEventListener('change', function() {
        if (document.getElementById('ost2_ts_servico_id').value != '') {
            var ost2_ts_servico_id = document.getElementById('ost2_ts_servico_id').value;

            //Route: servicos/id
            fetch('servicos/'+ost2_ts_servico_id, {
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
                alert('Erro OrdensServicos:'+error);
            });
        }
    });

    //Buscar dados do Responsável Funcionário escolhido
    document.getElementById('ost2_ts_responsavel_funcionario_id').addEventListener('change', function() {
        if (document.getElementById('ost2_ts_responsavel_funcionario_id').value != '') {
            var ost2_ts_responsavel_funcionario_id = document.getElementById('ost2_ts_responsavel_funcionario_id').value;

            //Route: funcionarios/id
            fetch('funcionarios/'+ost2_ts_responsavel_funcionario_id, {
                method: 'GET',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                var funcionario = data.success;

                //copiar os dados para os campos
                atualizarResponsavelFuncionarioEscolher(1, funcionario.id, funcionario.name);
            }).catch(error => {
                alert('Erro OrdensServicos:'+error);
            });
        }
    });

    //Adicionar serviço na grade
    document.getElementById('ost2_ts_servico_adicionar').addEventListener('click', function() {
        var mensagem_erro = '';

        if (document.getElementById('ost2_ts_servico_id').value == '') {
            mensagem_erro += 'Escolha um Serviço.'+'<br>';
        }

        if (document.getElementById('ost2_ts_responsavel_funcionario_id').value == '') {
            mensagem_erro += 'Escolha um Responsável.'+'<br>';
        }

        if (document.getElementById('ost2_ts_servico_valor').value == '') {
            mensagem_erro += 'Valor vazio.'+'<br>';
        }

        if (document.getElementById('ost2_ts_servico_quantidade').value == '' || document.getElementById('ost2_ts_servico_quantidade').value == '0' || document.getElementById('ost2_ts_servico_quantidade').value == 0) {
            mensagem_erro += 'Digite uma quantidade.'+'<br>';
        }

        document.querySelectorAll("input[name='servico_id[]']").forEach((element) => {
            if (document.getElementById('ost2_ts_servico_id').value == element.value) {
                mensagem_erro += 'Serviço já existe na grade.'+'<br>';
            }
        });

        if (mensagem_erro == '') {
            //Adicionar linha na grade
            atualizarServicoGrade(1);

            //Atualizar dados do Serviço escolhido
            atualizarServicoEscolher(0);

            //Atualizar dados do Responsável Funcionário escolhido
            atualizarResponsavelFuncionarioEscolher(0);
        } else {
            alertSwal('error', 'Ordem de Serviço', mensagem_erro, 'true', 2000);
        }
    });

    //Retirar serviço na grade
    document.getElementById('ost2_ts_servico_retirar').addEventListener('click', function() {
        //Adicionar linha na grade
        atualizarServicoGrade(3);

        //Atualizar dados do Serviço escolhido
        atualizarServicoEscolher(0);

        //Atualizar dados do Responsável Funcionário escolhido
        atualizarResponsavelFuncionarioEscolher(0);
    });
    //Grade de Serviços - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Serviços - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Grade de Veículos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Veículos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Buscar dados do Veiculo escolhido
    document.getElementById('ost2_te_veiculo_id').addEventListener('change', function() {
        if (document.getElementById('ost2_te_veiculo_id').value != '') {
            var ost2_te_veiculo_id = document.getElementById('ost2_te_veiculo_id').value;

            //Route: veiculos/id
            fetch('veiculos/'+ost2_te_veiculo_id, {
                method: 'GET',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                var veiculo = data.success;

                //copiar os dados para os campos
                atualizarVeiculoEscolher(1, veiculo.id, veiculo.veiculoMarcaName, veiculo.veiculoModeloName, veiculo.placa, veiculo.veiculoCombustivelName);
            }).catch(error => {
                alert('Erro OrdensVeiculos:'+error);
            });
        }
    });

    //Adicionar Veiculo na grade
    document.getElementById('ost2_te_veiculo_adicionar').addEventListener('click', function() {
        var mensagem_erro = '';

        if (document.getElementById('ost2_te_veiculo_id').value == '') {
            mensagem_erro += 'Escolha um Veículo.'+'<br>';
        }

        document.querySelectorAll("input[name='veiculo_id[]']").forEach((element) => {
            if (document.getElementById('ost2_te_veiculo_id').value == element.value) {
                mensagem_erro += 'Veículo já existe na grade.'+'<br>';
            }
        });

        if (mensagem_erro == '') {
            //Adicionar linha na grade
            atualizarVeiculoGrade(1);

            //Atualizar dados do Veiculo escolhido
            atualizarVeiculoEscolher(0);
        } else {
            alertSwal('error', 'Ordem de Serviço', mensagem_erro, 'true', 2000);
        }
    });

    //Retirar Veiculo na grade
    document.getElementById('ost2_te_veiculo_retirar').addEventListener('click', function() {
        //Adicionar linha na grade
        atualizarVeiculoGrade(3);

        //Atualizar dados do Veiculo escolhido
        atualizarVeiculoEscolher(0);
    });
    //Grade de Veículos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Veículos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Grade de Clientes Executivos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Clientes Executivos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Buscar dados do Executivo escolhido
    document.getElementById('ost2_te_cliente_executivo_id').addEventListener('change', function() {
        if (document.getElementById('ost2_te_cliente_executivo_id').value != '') {
            var ost2_te_cliente_executivo_id = document.getElementById('ost2_te_cliente_executivo_id').value;

            //Route: clientes_executivos/id
            fetch('clientes_executivos/'+ost2_te_cliente_executivo_id, {
                method: 'GET',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                var cliente_executivo = data.success;

                //copiar os dados para os campos
                atualizarClienteExecutivoEscolher(1, cliente_executivo.id, cliente_executivo.executivo_nome, cliente_executivo.executivo_funcao);
            }).catch(error => {
                alert('Erro OrdensExecutivos:'+error);
            });
        }
    });

    //Adicionar Executivo na grade
    document.getElementById('ost2_te_cliente_executivo_adicionar').addEventListener('click', function() {
        var mensagem_erro = '';

        if (document.getElementById('ost2_te_cliente_executivo_id').value == '') {
            mensagem_erro += 'Escolha um Executivo.'+'<br>';
        }

        document.querySelectorAll("input[name='cliente_executivo_id[]']").forEach((element) => {
            if (document.getElementById('ost2_te_cliente_executivo_id').value == element.value) {
                mensagem_erro += 'Executivo já existe na grade.'+'<br>';
            }
        });

        if (mensagem_erro == '') {
            //Adicionar linha na grade
            atualizarClienteExecutivoGrade(1);

            //Atualizar dados do Executivo escolhido
            atualizarClienteExecutivoEscolher(0);
        } else {
            alertSwal('error', 'Ordem de Serviço', mensagem_erro, 'true', 2000);
        }
    });

    //Retirar Executivo na grade
    document.getElementById('ost2_te_cliente_executivo_retirar').addEventListener('click', function() {
        //Adicionar linha na grade
        atualizarClienteExecutivoGrade(3);

        //Atualizar dados do Executivo escolhido
        atualizarClienteExecutivoEscolher(0);
    });
    //Grade de Clientes Executivos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Clientes Executivos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Grade de Destinos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Destinos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Buscar dados do Destino escolhido
    document.getElementById('ost2_te_destino_ordem').addEventListener('change', function() {
        if (document.getElementById('ost2_te_destino_ordem').value != '') {
            buscarEnderecoDestino();
        }
    });

    document.getElementById('ost2_te_destino_cep').addEventListener('change', function() {
        if (document.getElementById('ost2_te_destino_cep').value != '') {
            buscarEnderecoDestino();
        }
    });

    //Adicionar Destino na grade
    document.getElementById('ost2_te_destino_adicionar').addEventListener('click', function() {
        var mensagem_erro = '';

        if (document.getElementById('ost2_te_destino_ordem').value == '') {
            mensagem_erro += 'Escolha uma Ordem para o Destino.'+'<br>';
        }

        if (document.getElementById('ost2_te_destino_cep').value == '') {
            mensagem_erro += 'Escolha um CEP para o Destino.'+'<br>';
        }

        document.querySelectorAll("input[name='destino_ordem[]']").forEach((element) => {
            if (document.getElementById('ost2_te_destino_ordem').value == element.value) {
                mensagem_erro += 'Ordem do Destino já existe na grade.'+'<br>';
            }
        });

        if (mensagem_erro == '') {
            //Adicionar linha na grade
            atualizarDestinoGrade(1);

            //Atualizar dados do Destino escolhido
            atualizarDestinoEscolher(0);
        } else {
            alertSwal('error', 'Ordem de Serviço', mensagem_erro, 'true', 2000);
        }
    });

    //Retirar Destino na grade
    document.getElementById('ost2_te_destino_retirar').addEventListener('click', function() {
        //Adicionar linha na grade
        atualizarDestinoGrade(3);

        //Atualizar dados do Destino escolhido
        atualizarDestinoEscolher(0);
    });
    //Grade de Destinos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Destinos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Campo: ordem_servico_tipo_id
    document.getElementById('ordem_servico_tipo_id').addEventListener('change', function() {
        if (this.value != 2) {
            //Limpar campos
            let ost2_cliente_id = document.getElementById('ost2_cliente_id');
            ost2_cliente_id.value = '';
            ost2_cliente_id.dispatchEvent(new Event('change'));

            //Hide Clientes
            document.getElementById('ost2_divClientes').style.display = 'none';
        } else {
            //Show Clientes
            document.getElementById('ost2_divClientes').style.display = '';
        }
    });

    //Executar ao montar página'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Campo: ordem_servico_tipo_id forçar change
    document.getElementById('ordem_servico_tipo_id').dispatchEvent(new Event('change'));
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
