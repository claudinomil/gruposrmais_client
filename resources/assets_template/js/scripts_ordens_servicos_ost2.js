function ost2_validar_frm_ordens_servicos() {
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
    if (!document.querySelector("input[name='ost2_servico_id[]']")) {
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

//Grade de Serviços - Início''''''''''''''''''''''''''''''''''''''''''
//Grade de Serviços - Início''''''''''''''''''''''''''''''''''''''''''

//Atualiza/Limpa os dados do Serviço escolhido para grade
//operacao = 0 : Limpar
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
function ost2_atualizarServicoEscolher(operacao, servico_id='', servico_nome='', servico_valor='', servico_quantidade='') {
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
function ost2_atualizarResponsavelFuncionarioEscolher(operacao, responsavel_funcionario_id='', responsavel_funcionario_nome='') {
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
function ost2_atualizarServicoGrade(operacao) {
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

        linha = "<tr class='ost2_ts_servico_linha' id='ost2_ts_servico_linha_" + servico_id + "' data-id='" + servico_id + "' style='cursor: pointer' onclick='ost2_selecionarServicoExclusão("+servico_id+");'>";
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
        hiddens += "<input class='servico_item_hiddens' type='hidden' name='ost2_servico_item[]' id='ost2_servico_item' value=''>";
        hiddens += "<input type='hidden' name='ost2_servico_id[]' id='ost2_servico_id' value='"+servico_id+"'>";
        hiddens += "<input type='hidden' name='ost2_servico_nome[]' id='ost2_servico_nome' value='"+servico_nome+"'>";
        hiddens += "<input type='hidden' name='ost2_responsavel_funcionario_id[]' id='ost2_responsavel_funcionario_id' value='"+responsavel_funcionario_id+"'>";
        hiddens += "<input type='hidden' name='ost2_responsavel_funcionario_nome[]' id='ost2_responsavel_funcionario_nome' value='"+responsavel_funcionario_nome+"'>";
        hiddens += "<input type='hidden' name='ost2_servico_valor[]' id='ost2_servico_valor' value='"+moeda2float(servico_valor)+"'>";
        hiddens += "<input type='hidden' name='ost2_servico_quantidade[]' id='ost2_servico_quantidade' value='"+servico_quantidade+"'>";
        hiddens += "<input type='hidden' name='ost2_servico_valor_total[]' id='ost2_servico_valor_total' value='"+moeda2float(servico_valor_total)+"'>";
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
function ost2_limparServicosGrade() {
    //Limpando Serviços da grade
    document.getElementById('ost2_ts_servico_grade').innerHTML = '';

    //Limpando campos hiddens
    document.getElementById('ost2_ts_servico_hiddens').innerHTML = '';

    //Atualizar Valor Total da OrdemServico
    ost2_atualizarValorTotalOrdemServico(0);
}

//Atualizar o Valor Total da OrdemServico
function ost2_atualizarValorTotalOrdemServico(valor_global) {
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
function ost2_selecionarServicoExclusão(servico_id) {
    let servico_nome = document.getElementById('ost2_ts_servico_nome_td_' + servico_id).innerHTML;
    let responsavel_funcionario_id = document.getElementById('ost2_ts_responsavel_funcionario_id_td_' + servico_id).innerHTML;
    let responsavel_funcionario_nome = document.getElementById('ost2_ts_responsavel_funcionario_nome_td_' + servico_id).innerHTML;
    let servico_valor = document.getElementById('ost2_ts_servico_valor_td_' + servico_id).innerHTML;
    servico_valor = servico_valor.substring(3);
    let servico_quantidade = document.getElementById('ost2_ts_servico_quantidade_td_' + servico_id).innerHTML;

    ost2_atualizarServicoEscolher(2, servico_id, servico_nome, servico_valor, servico_quantidade);
    ost2_atualizarResponsavelFuncionarioEscolher(2, responsavel_funcionario_id, responsavel_funcionario_nome);
}
//Grade de Serviços - Fim'''''''''''''''''''''''''''''''''''''''''''''
//Grade de Serviços - Fim'''''''''''''''''''''''''''''''''''''''''''''

document.addEventListener('DOMContentLoaded', function(event) {
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

    //Grade de Serviços - Início''''''''''''''''''''''''''''''''''''''
    //Grade de Serviços - Início''''''''''''''''''''''''''''''''''''''

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
                ost2_atualizarServicoEscolher(1, servico.id, servico.name, servico.valor, '1');
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
                ost2_atualizarResponsavelFuncionarioEscolher(1, funcionario.id, funcionario.name);
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

        document.querySelectorAll("input[name='ost2_servico_id[]']").forEach((element) => {
            if (document.getElementById('ost2_ts_servico_id').value == element.value) {
                mensagem_erro += 'Serviço já existe na grade.'+'<br>';
            }
        });

        if (mensagem_erro == '') {
            //Adicionar linha na grade
            ost2_atualizarServicoGrade(1);

            //Atualizar dados do Serviço escolhido
            ost2_atualizarServicoEscolher(0);

            //Atualizar dados do Responsável Funcionário escolhido
            ost2_atualizarResponsavelFuncionarioEscolher(0);
        } else {
            alertSwal('error', 'Ordem de Serviço', mensagem_erro, 'true', 2000);
        }
    });

    //Retirar serviço na grade
    document.getElementById('ost2_ts_servico_retirar').addEventListener('click', function() {
        //Adicionar linha na grade
        ost2_atualizarServicoGrade(3);

        //Atualizar dados do Serviço escolhido
        ost2_atualizarServicoEscolher(0);

        //Atualizar dados do Responsável Funcionário escolhido
        ost2_atualizarResponsavelFuncionarioEscolher(0);
    });
    //Grade de Serviços - Fim'''''''''''''''''''''''''''''''''''''''''
    //Grade de Serviços - Fim'''''''''''''''''''''''''''''''''''''''''
});
