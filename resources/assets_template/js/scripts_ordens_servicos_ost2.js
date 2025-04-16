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

async function ost2_ordem_servico_gerar_pdf(ordem_servico_id=0, traducao='pt') {
    try {
        document.getElementById('loadingAviso').style.display = 'block';
        await ost2_gerarPDF(ordem_servico_id, traducao);
    } catch (e) {
        alert("Erro ao gerar PDF: " + e.message);
    } finally {
        document.getElementById('loadingAviso').style.display = 'none';
    }
}

async function ost2_gerarPDF(ordem_servico_id=0, traducao='pt') {
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
    let response = await fetch('ordens_servicos/' + ordem_servico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    let data = await response.json();

    //Lendo dados
    if (data.success) {
        //Texto
        texto = 'Ordem Serviço nº. '+data.success.numero_ordem_servico+'/'+data.success.ano_ordem_servico+'.';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_marginLeft:marginLeft, x_marginTop:marginTop, x_fontSize:12, x_align:'right'});

        //Texto
        texto = data.success.cliente_nome;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_fontStyle:'bold', x_fontSize:11});

        //Texto
        texto = data.success.cliente_logradouro;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_fontSize:11});

        //Texto
        texto = data.success.cliente_bairro+' - '+data.success.cliente_cidade;
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
        gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts2, x_fontSize:11});

        //Tabela de serviços''''''''''''''''''''''''''''''''''''''
        //Texto
        numeroTitulo++;
        texto = numeroTitulo+'. DOS SERVIÇOS';
        if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
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
        if (traducao == 'en') {tabelaHTML = await traduzirTextoGoogle(tabelaHTML);}
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
                3: { halign: "right", cellWidth: 'wrap', overflow: 'hidden' }, // Coluna VALOR UNITÁRIO alinhada à direita
                4: { halign: "center", cellWidth: 'wrap', overflow: 'hidden' }, // Coluna QUANTIDADE centralizada
                5: { halign: "right", cellWidth: 'wrap', overflow: 'hidden' }, // Coluna VALOR TOTAL alinhada à direita
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
        novaMarginTop = novaMarginTop + (qtdLinhasTabela*7) + 10;
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        if (data.success.ordemServicoPrioridadeName != '') {
            //Texto
            texto = 'Prioridade: '+data.success.ordemServicoPrioridadeName;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify', x_fontStyle:'normal'});
        }

        if (data.success.descricao_servico != '') {
            //Texto
            texto = 'Descrição: '+data.success.descricao_servico;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify', x_fontStyle:'normal'});
        }

        if (data.success.observacao != '') {
            //Texto
            texto = 'Observação: '+data.success.observacao;
            if (traducao == 'en') {texto = await traduzirTextoGoogle(texto);}
            gerarTexto({x_texto:texto, x_spacingBetweenTexts:spacingBetweenTexts4, x_fontSize:11, x_align:'justify', x_fontStyle:'normal'});
        }

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
}

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
