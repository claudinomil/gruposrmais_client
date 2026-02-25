function ost3_validar_frm_ordens_servicos() {
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

    //Se diferente de inclusão validar campos ost3_ordem_servico_status_id, datas e horas''''''''''''''''''''''''''''''''''''
    if (document.getElementById('frm_operacao').value != 'create') {
        //Campo: ost3_ordem_servico_status_id
        if (validacao({op: 1, value: document.getElementById('ost3_ordem_servico_status_id').value}) === false) {
            validacao_ok = false;
            mensagem += 'Status requerido.' + '<br>';
        } else {
            //Campo: ost3_ordem_servico_status_id (deve ser um número)
            if (validacao({op: 4, value: document.getElementById('ost3_ordem_servico_status_id').value}) === false) {
                validacao_ok = false;
                mensagem += 'Status deve ser escolhido.' + '<br>';
            } else {
                var status_id = document.getElementById('ost3_ordem_servico_status_id').value;

                if (status_id == 1) {  //ABERTA
                    //Campo: ost3_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost3_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost3_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_data_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_data_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost3_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_hora_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_hora_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost3_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }
                } else if (status_id == 2) {  //EM ANDAMENTO
                    //Campo: ost3_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost3_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost3_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_data_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_data_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost3_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_hora_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_hora_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost3_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }
                } else if (status_id == 3) {  //CONCLUÍDA
                    //Campo: ost3_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost3_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost3_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_data_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_data_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost3_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_hora_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_hora_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost3_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_data_conclusao (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_data_conclusao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data conclusão requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost3_data_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_hora_conclusao (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_hora_conclusao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora conclusão requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost3_hora_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora conclusão inválida.' + '<br>';
                        }
                    }
                } else if (status_id == 4) {  //FINALIZADA
                    //Campo: ost3_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost3_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost3_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_data_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_data_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost3_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_hora_prevista (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_hora_prevista').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora prevista requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost3_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_data_conclusao (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_data_conclusao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data conclusão requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost3_data_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_hora_conclusao (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_hora_conclusao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora conclusão requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost3_hora_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_data_finalizacao (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_data_finalizacao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data finalização requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost3_data_finalizacao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data finalização inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_hora_finalizacao (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_hora_finalizacao').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora finalização requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost3_hora_finalizacao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora finalização inválida.' + '<br>';
                        }
                    }
                } else if (status_id == 4) {  //CANCELADA
                    //Campo: ost3_data_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_data_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Data abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 8, value: document.getElementById('ost3_data_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_hora_abertura (requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_hora_abertura').value}) === false) {
                        validacao_ok = false;
                        mensagem += 'Hora abertura requerido.' + '<br>';
                    } else {
                        if (validacao({op: 17, value: document.getElementById('ost3_hora_abertura').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora abertura inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_data_prevista (não requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_data_prevista').value}) === true) {
                        if (validacao({op: 8, value: document.getElementById('ost3_data_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_hora_prevista (não requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_hora_prevista').value}) === true) {
                        if (validacao({op: 17, value: document.getElementById('ost3_hora_prevista').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora prevista inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_data_conclusao (não requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_data_conclusao').value}) === true) {
                        if (validacao({op: 8, value: document.getElementById('ost3_data_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_hora_conclusao (não requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_hora_conclusao').value}) === true) {
                        if (validacao({op: 17, value: document.getElementById('ost3_hora_conclusao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora conclusão inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_data_finalizacao (não requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_data_finalizacao').value}) === true) {
                        if (validacao({op: 8, value: document.getElementById('ost3_data_finalizacao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Data finalização inválida.' + '<br>';
                        }
                    }

                    //Campo: ost3_hora_finalizacao (não requerido)
                    if (validacao({op: 1, value: document.getElementById('ost3_hora_finalizacao').value}) === true) {
                        if (validacao({op: 17, value: document.getElementById('ost3_hora_finalizacao').value}) === false) {
                            validacao_ok = false;
                            mensagem += 'Hora finalização inválida.' + '<br>';
                        }
                    }
                }
            }
        }
    }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Campo: ost3_cliente_id (requerido)
    if (validacao({op:1, value:document.getElementById('ost3_cliente_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.' + '<br>';
    } else {
        //Campo: ost3_cliente_id (deve ser um número)
        if (validacao({op:4, value: document.getElementById('ost3_cliente_id').value}) === false) {
            validacao_ok = false;
            mensagem += 'Cliente deve ser escolhido.' + '<br>';
        }
    }

    //Campo: ost3_servico_id (requerido)
    if (validacao({op:1, value:document.getElementById('ost3_servico_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Serviço requerido.' + '<br>';
    }

    //Grade de Destinos
    var qtd_linhas_grade_destinos = 0;
    document.querySelectorAll("input[name='ost3_destino_ordem[]']").forEach((element) => {
        qtd_linhas_grade_destinos++;
    });

    if (qtd_linhas_grade_destinos == 0) {
        validacao_ok = false;
        mensagem += 'Escolha pelo menos um destino.' + '<br>';
    }

    //Grade de Destinos (Datas e Horas)
    for(i=1; i<=qtd_linhas_grade_destinos; i++) {
        //Campo: ost3_destino_data_agendada_i (não requerido)
        if (validacao({op: 1, value: document.getElementById('ost3_destino_data_agendada_'+i).value}) === true) {
            if (validacao({op: 8, value: document.getElementById('ost3_destino_data_agendada_'+i).value}) === false) {
                validacao_ok = false;
                mensagem += 'Data agendamento ('+i+') inválida.' + '<br>';
            }
        }

        //Campo: ost3_destino_hora_agendada_i (não requerido)
        if (validacao({op: 1, value: document.getElementById('ost3_destino_hora_agendada_'+i).value}) === true) {
            if (validacao({op: 17, value: document.getElementById('ost3_destino_hora_agendada_'+i).value}) === false) {
                validacao_ok = false;
                mensagem += 'Hora agendamento ('+i+') inválida.' + '<br>';
            }
        }

        //Campo: ost3_destino_data_inicio_i (não requerido)
        if (validacao({op: 1, value: document.getElementById('ost3_destino_data_inicio_'+i).value}) === true) {
            if (validacao({op: 8, value: document.getElementById('ost3_destino_data_inicio_'+i).value}) === false) {
                validacao_ok = false;
                mensagem += 'Data início ('+i+') inválida.' + '<br>';
            }
        }

        //Campo: ost3_destino_hora_inicio_i (não requerido)
        if (validacao({op: 1, value: document.getElementById('ost3_destino_hora_inicio_'+i).value}) === true) {
            if (validacao({op: 17, value: document.getElementById('ost3_destino_hora_inicio_'+i).value}) === false) {
                validacao_ok = false;
                mensagem += 'Hora início ('+i+') inválida.' + '<br>';
            }
        }

        //Campo: ost3_destino_data_termino_i (não requerido)
        if (validacao({op: 1, value: document.getElementById('ost3_destino_data_termino_'+i).value}) === true) {
            if (validacao({op: 8, value: document.getElementById('ost3_destino_data_termino_'+i).value}) === false) {
                validacao_ok = false;
                mensagem += 'Data término ('+i+') inválida.' + '<br>';
            }
        }

        //Campo: ost3_destino_hora_termino_i (não requerido)
        if (validacao({op: 1, value: document.getElementById('ost3_destino_hora_termino_'+i).value}) === true) {
            if (validacao({op: 17, value: document.getElementById('ost3_destino_hora_termino_'+i).value}) === false) {
                validacao_ok = false;
                mensagem += 'Hora término ('+i+') inválida.' + '<br>';
            }
        }
    }

    //Grade de Veículos
    var qtd_linhas_grade_veiculos = 0;
    document.querySelectorAll("input[name='ost3_veiculo_id[]']").forEach((element) => {
        qtd_linhas_grade_veiculos++;
    });

    if (qtd_linhas_grade_veiculos == 0) {
        validacao_ok = false;
        mensagem += 'Escolha pelo menos um veículo.' + '<br>';
    }

    //Grade de Clientes Executivos
    var qtd_linhas_grade_cliente_executivos = 0;
    document.querySelectorAll("input[name='ost3_cliente_executivo_id[]']").forEach((element) => {
        qtd_linhas_grade_cliente_executivos++;
    });

    if (qtd_linhas_grade_cliente_executivos == 0) {
        validacao_ok = false;
        mensagem += 'Escolha pelo menos um executivo.' + '<br>';
    }

    //Grade de Equipes
    var qtd_linhas_grade_equipe_funcionarios = 0;
    document.querySelectorAll("input[name='ost3_equipe_funcionario_id[]']").forEach((element) => {
        qtd_linhas_grade_equipe_funcionarios++;
    });

    if (qtd_linhas_grade_equipe_funcionarios == 0) {
        validacao_ok = false;
        mensagem += 'Escolha pelo menos um funcionário.' + '<br>';
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

//Grade de Destinos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Destinos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Atualiza/Limpa os dados do Destino escolhido para grade
//operacao = 0 : Limpar
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
function ost3_atualizarDestinoEscolher(operacao, destino_ordem='', destino_cep='', destino_logradouro='', destino_bairro='', destino_localidade='', destino_uf='', destino_numero='', destino_complemento='') {
    if (operacao == 0) {
        //campos
        document.getElementById('ost3_te_destino_ordem').value = destino_ordem;
        document.getElementById('ost3_te_destino_cep').value = destino_cep;
        document.getElementById('ost3_te_destino_logradouro').value = destino_logradouro;
        document.getElementById('ost3_te_destino_bairro').value = destino_bairro;
        document.getElementById('ost3_te_destino_localidade').value = destino_localidade;
        document.getElementById('ost3_te_destino_uf').value = destino_uf;
        document.getElementById('ost3_te_destino_numero').value = destino_numero;
        document.getElementById('ost3_te_destino_complemento').value = destino_complemento;

        //botoes
        document.getElementById('ost3_te_divDestinoAdicionar').style.display = 'none';
        document.getElementById('ost3_te_divDestinoRetirar').style.display = 'none';
    }

    if (operacao == 1) {
        //campos
        document.getElementById('ost3_te_destino_cep').value = destino_cep;
        document.getElementById('ost3_te_destino_logradouro').value = destino_logradouro;
        document.getElementById('ost3_te_destino_bairro').value = destino_bairro;
        document.getElementById('ost3_te_destino_localidade').value = destino_localidade;
        document.getElementById('ost3_te_destino_uf').value = destino_uf;

        //botoes
        document.getElementById('ost3_te_divDestinoAdicionar').style.display = 'block';
        document.getElementById('ost3_te_divDestinoRetirar').style.display = 'none';
    }

    if (operacao == 2) {
        //campos
        document.getElementById('ost3_te_destino_ordem').value = destino_ordem;
        document.getElementById('ost3_te_destino_cep').value = destino_cep;
        document.getElementById('ost3_te_destino_logradouro').value = destino_logradouro;
        document.getElementById('ost3_te_destino_bairro').value = destino_bairro;
        document.getElementById('ost3_te_destino_localidade').value = destino_localidade;
        document.getElementById('ost3_te_destino_uf').value = destino_uf;
        document.getElementById('ost3_te_destino_numero').value = destino_numero;
        document.getElementById('ost3_te_destino_complemento').value = destino_complemento;

        //botoes
        document.getElementById('ost3_te_divDestinoAdicionar').style.display = 'none';
        document.getElementById('ost3_te_divDestinoRetirar').style.display = 'block';
    }
}

//Atualizar a Grade de Destinos
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
//operacao = 3 : Retirar
function ost3_atualizarDestinoGrade(operacao, data_destino_datas_horas=[]) {
    if (operacao == 1) {
        //Dados para preenchera linha da grade
        var destino_ordem = document.getElementById('ost3_te_destino_ordem').value;
        var destino_cep = document.getElementById('ost3_te_destino_cep').value;
        var destino_numero = document.getElementById('ost3_te_destino_numero').value;
        var destino_complemento = document.getElementById('ost3_te_destino_complemento').value;
        var destino_logradouro = document.getElementById('ost3_te_destino_logradouro').value;
        var destino_bairro = document.getElementById('ost3_te_destino_bairro').value;
        var destino_localidade = document.getElementById('ost3_te_destino_localidade').value;
        var destino_uf = document.getElementById('ost3_te_destino_uf').value;

        //Montar Linha
        var linha;

        linha = "<tr class='ost3_te_destino_linha' id='ost3_te_destino_linha_" + destino_ordem + "' data-id='" + destino_ordem + "' style='cursor: pointer' onclick='ost3_selecionarDestinoExclusão("+destino_ordem+");'>";
        linha += "  <td id='ost3_te_destino_ordem_td_" + destino_ordem + "'>" + destino_ordem + "</td>";
        linha += "  <td id='ost3_te_destino_cep_td_" + destino_ordem + "'>" + destino_cep + "</td>";
        linha += "  <td id='ost3_te_destino_logradouro_td_" + destino_ordem + "'>" + destino_logradouro + "</td>";
        linha += "  <td id='ost3_te_destino_bairro_td_" + destino_ordem + "'>" + destino_bairro + "</td>";
        linha += "  <td id='ost3_te_destino_localidade_td_" + destino_ordem + "'>" + destino_localidade + "</td>";
        linha += "  <td id='ost3_te_destino_uf_td_" + destino_ordem + "'>" + destino_uf + "</td>";
        linha += "  <td id='ost3_te_destino_numero_td_" + destino_ordem + "'>" + destino_numero + "</td>";
        linha += "  <td id='ost3_te_destino_complemento_td_" + destino_ordem + "'>" + destino_complemento + "</td>";
        linha += "</tr>";

        //Adicionar linha na grade
        document.getElementById('ost3_te_destino_grade').insertAdjacentHTML('beforeend', linha);

        //Ordenar Tabela Destinos
        ost3_ordenarTabelaDestinos(0);

        //Montar campos hidden
        var hiddens;

        hiddens = "<div id='ost3_te_destino_hiddens_" + destino_ordem + "'>";
        hiddens += "<input type='hidden' name='ost3_destino_ordem[]' id='ost3_destino_ordem' value='"+destino_ordem+"'>";
        hiddens += "<input type='hidden' name='ost3_destino_cep[]' id='ost3_destino_cep' value='"+destino_cep+"'>";
        hiddens += "<input type='hidden' name='ost3_destino_logradouro[]' id='ost3_destino_logradouro' value='"+destino_logradouro+"'>";
        hiddens += "<input type='hidden' name='ost3_destino_bairro[]' id='ost3_destino_bairro' value='"+destino_bairro+"'>";
        hiddens += "<input type='hidden' name='ost3_destino_localidade[]' id='ost3_destino_localidade' value='"+destino_localidade+"'>";
        hiddens += "<input type='hidden' name='ost3_destino_uf[]' id='ost3_destino_uf' value='"+destino_uf+"'>";
        hiddens += "<input type='hidden' name='ost3_destino_numero[]' id='ost3_destino_numero' value='"+destino_numero+"'>";
        hiddens += "<input type='hidden' name='ost3_destino_complemento[]' id='ost3_destino_complemento' value='"+destino_complemento+"'>";
        hiddens += "</div>";

        //Adicionar hiddens na div
        document.getElementById('ost3_te_destino_hiddens').insertAdjacentHTML('beforeend', hiddens);
    }

    if (operacao == 3) {
        //Dados
        destino_ordem = document.getElementById('ost3_te_destino_ordem').value;

        //Remover linha da grade
        let linha = document.getElementById('ost3_te_destino_linha_' + destino_ordem);
        if (linha) linha.remove();

        //Remover campos hiddens
        let hiddenFields = document.getElementById('ost3_te_destino_hiddens_' + destino_ordem);
        if (hiddenFields) hiddenFields.remove();
    }

    ost3_atualizarDestinoDatasHorasGrade(data_destino_datas_horas);
}

//Limpar a Grade de Destinos
function ost3_limparDestinosGrade() {
    //Limpando Destinos da grade
    document.getElementById('ost3_te_destino_grade').innerHTML = '';

    //Limpando campos hiddens
    document.getElementById('ost3_te_destino_hiddens').innerHTML = '';
}

//Pegar dados da linha que clicou e jogar para o Destino Escolher
function ost3_selecionarDestinoExclusão(destino_ordem) {
    let destino_cep = document.getElementById('ost3_te_destino_cep_td_' + destino_ordem).innerHTML;
    let destino_logradouro = document.getElementById('ost3_te_destino_logradouro_td_' + destino_ordem).innerHTML;
    let destino_bairro = document.getElementById('ost3_te_destino_bairro_td_' + destino_ordem).innerHTML;
    let destino_localidade = document.getElementById('ost3_te_destino_localidade_td_' + destino_ordem).innerHTML;
    let destino_uf = document.getElementById('ost3_te_destino_uf_td_' + destino_ordem).innerHTML;
    let destino_numero = document.getElementById('ost3_te_destino_numero_td_' + destino_ordem).innerHTML;
    let destino_complemento = document.getElementById('ost3_te_destino_complemento_td_' + destino_ordem).innerHTML;

    ost3_atualizarDestinoEscolher(2, destino_ordem, destino_cep, destino_logradouro, destino_bairro, destino_localidade, destino_uf, destino_numero, destino_complemento);
}

async function ost3_buscarEnderecoDestino(cep) {
    //Dados
    var ordem = document.getElementById('ost3_te_destino_ordem').value;
    var cep = document.getElementById('ost3_te_destino_cep').value;
    var numero = document.getElementById('ost3_te_destino_numero').value;
    var complemento = document.getElementById('ost3_te_destino_complemento').value;

    //Limpar Dados
    document.getElementById('ost3_te_destino_logradouro').value = '';
    document.getElementById('ost3_te_destino_bairro').value = '';
    document.getElementById('ost3_te_destino_localidade').value = '';
    document.getElementById('ost3_te_destino_uf').value = '';

    //Validar CEP
    if (validacao({op:1, value:cep}) === true) {
        if (validacao({op:9, value:cep}) === false) {
            alert('CEP inválido.');
            return;
        }
    } else {
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
        ost3_atualizarDestinoEscolher(1, ordem, cep, logradouro, bairro, localidade, uf, numero, complemento);
    } else {
        alert('CEP não encontrado.');
        return;
    }
}

function ost3_ordenarTabelaDestinos(colunaIndex) {
    let tbody = document.getElementById('ost3_te_destino_grade');
    let linhas = Array.from(tbody.querySelectorAll("tr"));

    linhas.sort((a, b) => {
        let valueA = a.cells[colunaIndex].textContent.trim();
        let valueB = b.cells[colunaIndex].textContent.trim();

        // Converter para número se possível
        if (!isNaN(valueA) && !isNaN(valueB)) {
            return Number(valueA) - Number(valueB);
        }

        return valueA.localeCompare(valueB);
    });

    // Reinsere as linhas ordenadas na tabela
    linhas.forEach(linha => tbody.appendChild(linha));
}
//Grade de Destinos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Destinos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Grade de Destinos Datas e Horas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Destinos Datas e Horas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Atualizar a Grade de Destinos Datas e Horas
function ost3_atualizarDestinoDatasHorasGrade(data_destino_datas_horas) {
    //Verificando se tem dados para colocar na grade'''''''''''''''''''''''''''''''''''''''''''
    var destino_data_agendada = [];
    var destino_hora_agendada = [];
    var destino_data_inicio = [];
    var destino_hora_inicio = [];
    var destino_data_termino = [];
    var destino_hora_termino = [];

    for (let i = 1; i <= 15; i++) {
        if (data_destino_datas_horas.lenhgt == 0) {
            if (document.getElementById('ost3_destino_destino_ordem_' + i)) {
                var destino_ordem = document.getElementById('ost3_te_destino_ordem_td_' + i).innerHTML;

                destino_data_agendada[i] = '';
                destino_hora_agendada[i] = '';
                destino_data_inicio[i] = '';
                destino_hora_inicio[i] = '';
                destino_data_termino[i] = '';
                destino_hora_termino[i] = '';

                if (document.getElementById('ost3_destino_data_agendada_' + destino_ordem)) {destino_data_agendada[i] = document.getElementById('ost3_destino_data_agendada_' + destino_ordem).value;}
                if (document.getElementById('ost3_destino_hora_agendada_' + destino_ordem)) {destino_hora_agendada[i] = document.getElementById('ost3_destino_hora_agendada_' + destino_ordem).value;}
                if (document.getElementById('ost3_destino_data_inicio_' + destino_ordem)) {destino_data_inicio[i] = document.getElementById('ost3_destino_data_inicio_' + destino_ordem).value;}
                if (document.getElementById('ost3_destino_hora_inicio_' + destino_ordem)) {destino_hora_inicio[i] = document.getElementById('ost3_destino_hora_inicio_' + destino_ordem).value;}
                if (document.getElementById('ost3_destino_data_termino_' + destino_ordem)) {destino_data_termino[i] = document.getElementById('ost3_destino_data_termino_' + destino_ordem).value;}
                if (document.getElementById('ost3_destino_hora_termino_' + destino_ordem)) {destino_hora_termino[i] = document.getElementById('ost3_destino_hora_termino_' + destino_ordem).value;}
            }
        } else {
            if (document.getElementById('frm_operacao').value == 'view' || document.getElementById('frm_operacao').value == 'edit') {
                data_destino_datas_horas.forEach(function (item) {
                    //Dados para preencher na linha da grade
                    destino_data_agendada[item.destino_ordem] = formatarData(2, item.destino_data_agendada);
                    destino_hora_agendada[item.destino_ordem] = item.destino_hora_agendada;
                    destino_data_inicio[item.destino_ordem] = formatarData(2, item.destino_data_inicio);
                    destino_hora_inicio[item.destino_ordem] = item.destino_hora_inicio;
                    destino_data_termino[item.destino_ordem] = formatarData(2, item.destino_data_termino);
                    destino_hora_termino[item.destino_ordem] = item.destino_hora_termino;
                });
            }
        }
    }
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Limpar
    ost3_limparDestinosDatasHorasGrade();

    //Criar
    for(i=1; i<=15; i++) {
        if (document.getElementById('ost3_te_destino_ordem_td_'+i)) {
            //Destino ordem
            var destino_ordem = document.getElementById('ost3_te_destino_ordem_td_'+i).innerHTML;

            //Readonly
            var x_readonly = '';
            if (document.getElementById('frm_operacao').value == 'view') {x_readonly = 'readonly';}

            //Montar Linha
            var linha;

            linha = "<tr class='ost3_te_destino_datas_horas_linha' id='ost3_te_destino_datas_horas_linha_" + i + "' data-id='" + i + "' style='cursor: pointer'>";
            linha += "  <td><input type='text' class='form-control text-center' id='ost3_destino_destino_ordem_"+destino_ordem+"' name='ost3_destino_destino_ordem_"+destino_ordem+"' value='"+destino_ordem+"' readonly></td>";
            linha += "  <td><input type='text' class='form-control mask_date' id='ost3_destino_data_agendada_"+destino_ordem+"' name='ost3_destino_data_agendada_"+destino_ordem+"' value='"+destino_data_agendada[i]+"' "+x_readonly+"></td>";
            linha += "  <td><input type='text' class='form-control mask_time' id='ost3_destino_hora_agendada_"+destino_ordem+"' name='ost3_destino_hora_agendada_"+destino_ordem+"' value='"+destino_hora_agendada[i]+"' "+x_readonly+"></td>";
            linha += "  <td><input type='text' class='form-control mask_date' id='ost3_destino_data_inicio_"+destino_ordem+"' name='ost3_destino_data_inicio_"+destino_ordem+"' value='"+destino_data_inicio[i]+"' "+x_readonly+"></td>";
            linha += "  <td><input type='text' class='form-control mask_time' id='ost3_destino_hora_inicio_"+destino_ordem+"' name='ost3_destino_hora_inicio_"+destino_ordem+"' value='"+destino_hora_inicio[i]+"' "+x_readonly+"></td>";
            linha += "  <td><input type='text' class='form-control mask_date' id='ost3_destino_data_termino_"+destino_ordem+"' name='ost3_destino_data_termino_"+destino_ordem+"' value='"+destino_data_termino[i]+"' "+x_readonly+"></td>";
            linha += "  <td><input type='text' class='form-control mask_time' id='ost3_destino_hora_termino_"+destino_ordem+"' name='ost3_destino_hora_termino_"+destino_ordem+"' value='"+destino_hora_termino[i]+"' "+x_readonly+"></td>";
            linha += "</tr>";

            //Adicionar linha na grade
            document.getElementById('ost3_te_destino_datas_horas_grade').insertAdjacentHTML('beforeend', linha);

            //Ordenar Tabela Destinos Datas Horas
            ost3_ordenarTabelaDestinosDatasHoras(0);

            removeMask();
            putMask();
        }
    }
}

//Limpar a Grade de Destinos Datas e Horas
function ost3_limparDestinosDatasHorasGrade() {
    //Limpando Destinos Datas e Horas da grade
    document.getElementById('ost3_te_destino_datas_horas_grade').innerHTML = '';
}

function ost3_ordenarTabelaDestinosDatasHoras(colunaIndex) {
    let tbody = document.getElementById('ost3_te_destino_datas_horas_grade');
    let linhas = Array.from(tbody.querySelectorAll("tr"));

    linhas.sort((a, b) => {
        let valueA = a.cells[colunaIndex].textContent.trim();
        let valueB = b.cells[colunaIndex].textContent.trim();

        // Converter para número se possível
        if (!isNaN(valueA) && !isNaN(valueB)) {
            return Number(valueA) - Number(valueB);
        }

        return valueA.localeCompare(valueB);
    });

    // Reinsere as linhas ordenadas na tabela
    linhas.forEach(linha => tbody.appendChild(linha));
}
//Grade de Destinos Datas e Horas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Destinos Datas e Horas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Grade de Veículos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Veículos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Atualiza/Limpa os dados do Veiculo escolhido para grade
//operacao = 0 : Limpar
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
function ost3_atualizarVeiculoEscolher(operacao, veiculo_id='', veiculo_marca='', veiculo_modelo='', veiculo_placa='', veiculo_combustivel='') {
    if (operacao == 0) {
        //campos
        document.getElementById('ost3_te_veiculo_id').value = veiculo_id;
        document.getElementById('ost3_te_veiculo_marca').value = veiculo_marca;
        document.getElementById('ost3_te_veiculo_modelo').value = veiculo_modelo;
        document.getElementById('ost3_te_veiculo_placa').value = veiculo_placa;
        document.getElementById('ost3_te_veiculo_combustivel').value = veiculo_combustivel;

        //botoes
        document.getElementById('ost3_te_divVeiculoAdicionar').style.display = 'none';
        document.getElementById('ost3_te_divVeiculoRetirar').style.display = 'none';
    }

    if (operacao == 1) {
        //campos
        document.getElementById('ost3_te_veiculo_marca').value = veiculo_marca;
        document.getElementById('ost3_te_veiculo_modelo').value = veiculo_modelo;
        document.getElementById('ost3_te_veiculo_placa').value = veiculo_placa;
        document.getElementById('ost3_te_veiculo_combustivel').value = veiculo_combustivel;

        //botoes
        document.getElementById('ost3_te_divVeiculoAdicionar').style.display = 'block';
        document.getElementById('ost3_te_divVeiculoRetirar').style.display = 'none';
    }

    if (operacao == 2) {
        //campos
        document.getElementById('ost3_te_veiculo_id').value = veiculo_id;
        document.getElementById('ost3_te_veiculo_marca').value = veiculo_marca;
        document.getElementById('ost3_te_veiculo_modelo').value = veiculo_modelo;
        document.getElementById('ost3_te_veiculo_placa').value = veiculo_placa;
        document.getElementById('ost3_te_veiculo_combustivel').value = veiculo_combustivel;

        //botoes
        document.getElementById('ost3_te_divVeiculoAdicionar').style.display = 'none';
        document.getElementById('ost3_te_divVeiculoRetirar').style.display = 'block';
    }
}

//Atualizar a Grade de Veiculos
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
//operacao = 3 : Retirar
function ost3_atualizarVeiculoGrade(operacao) {
    if (operacao == 1) {
        //Dados para preenchera linha da grade
        var veiculo_id = document.getElementById('ost3_te_veiculo_id').value;
        var veiculo_marca = document.getElementById('ost3_te_veiculo_marca').value;
        var veiculo_modelo = document.getElementById('ost3_te_veiculo_modelo').value;
        var veiculo_placa = document.getElementById('ost3_te_veiculo_placa').value;
        var veiculo_combustivel = document.getElementById('ost3_te_veiculo_combustivel').value;

        //Montar Linha
        var linha;

        linha = "<tr class='ost3_te_veiculo_linha' id='ost3_te_veiculo_linha_" + veiculo_id + "' data-id='" + veiculo_id + "' style='cursor: pointer' onclick='ost3_selecionarVeiculoExclusão("+veiculo_id+");'>";
        linha += "  <td class='text-center ost3_te_veiculo_item' data-id='" + veiculo_id + "'></td>";
        linha += "  <td id='ost3_te_veiculo_marca_td_" + veiculo_id + "'>" + veiculo_marca + "</td>";
        linha += "  <td id='ost3_te_veiculo_modelo_td_" + veiculo_id + "'>" + veiculo_modelo + "</td>";
        linha += "  <td id='ost3_te_veiculo_placa_td_" + veiculo_id + "'>" + veiculo_placa + "</td>";
        linha += "  <td id='ost3_te_veiculo_combustivel_td_" + veiculo_id + "'>" + veiculo_combustivel + "</td>";
        linha += "</tr>";

        //Adicionar linha na grade
        document.getElementById('ost3_te_veiculo_grade').insertAdjacentHTML('beforeend', linha);

        //Montar campos hidden
        var hiddens;

        hiddens = "<div id='ost3_te_veiculo_hiddens_" + veiculo_id + "'>";
        hiddens += "<input class='veiculo_item_hiddens' type='hidden' name='ost3_veiculo_item[]' id='ost3_veiculo_item' value=''>";
        hiddens += "<input type='hidden' name='ost3_veiculo_id[]' id='ost3_veiculo_id' value='"+veiculo_id+"'>";
        hiddens += "<input type='hidden' name='ost3_veiculo_marca[]' id='ost3_veiculo_marca' value='"+veiculo_marca+"'>";
        hiddens += "<input type='hidden' name='ost3_veiculo_modelo[]' id='ost3_veiculo_modelo' value='"+veiculo_modelo+"'>";
        hiddens += "<input type='hidden' name='ost3_veiculo_placa[]' id='ost3_veiculo_placa' value='"+veiculo_placa+"'>";
        hiddens += "<input type='hidden' name='ost3_veiculo_combustivel[]' id='ost3_veiculo_combustivel' value='"+veiculo_combustivel+"'>";
        hiddens += "</div>";

        //Adicionar hiddens na div
        document.getElementById('ost3_te_veiculo_hiddens').insertAdjacentHTML('beforeend', hiddens);
    }

    if (operacao == 3) {
        //Dados
        veiculo_id = document.getElementById('ost3_te_veiculo_id').value;

        //Remover linha da grade
        let linha = document.getElementById('ost3_te_veiculo_linha_' + veiculo_id);
        if (linha) linha.remove();

        //Remover campos hiddens
        let hiddenFields = document.getElementById('ost3_te_veiculo_hiddens_' + veiculo_id);
        if (hiddenFields) hiddenFields.remove();
    }

    //Atualizando numeração das linhas da coluna Item
    var ln = 0;
    document.querySelectorAll('.ost3_te_veiculo_item').forEach((element) => {
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
function ost3_limparVeiculosGrade() {
    //Limpando Veiculos da grade
    document.getElementById('ost3_te_veiculo_grade').innerHTML = '';

    //Limpando campos hiddens
    document.getElementById('ost3_te_veiculo_hiddens').innerHTML = '';
}

//Pegar dados da linha que clicou e jogar para o Veiculo Escolher
function ost3_selecionarVeiculoExclusão(veiculo_id) {
    let veiculo_marca = document.getElementById('ost3_te_veiculo_marca_td_' + veiculo_id).innerHTML;
    let veiculo_modelo = document.getElementById('ost3_te_veiculo_modelo_td_' + veiculo_id).innerHTML;
    let veiculo_placa = document.getElementById('ost3_te_veiculo_placa_td_' + veiculo_id).innerHTML;
    let veiculo_combustivel = document.getElementById('ost3_te_veiculo_combustivel_td_' + veiculo_id).innerHTML;

    ost3_atualizarVeiculoEscolher(2, veiculo_id, veiculo_marca, veiculo_modelo, veiculo_placa, veiculo_combustivel);
}
//Grade de Veículos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Veículos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Grade de Clientes Executivos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Clientes Executivos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Atualiza/Limpa os dados do Cliente Executivo escolhido para grade
//operacao = 0 : Limpar
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
function ost3_atualizarClienteExecutivoEscolher(operacao, cliente_executivo_id='', cliente_executivo_nome='', cliente_executivo_funcao='', cliente_executivo_veiculo_id='') {
    if (operacao == 0) {
        //campos
        document.getElementById('ost3_te_cliente_executivo_id').value = cliente_executivo_id;
        document.getElementById('ost3_te_cliente_executivo_nome').value = cliente_executivo_nome;
        document.getElementById('ost3_te_cliente_executivo_funcao').value = cliente_executivo_funcao;
        document.getElementById('ost3_te_cliente_executivo_veiculo_id').value = cliente_executivo_veiculo_id;

        //botoes
        document.getElementById('ost3_te_divClienteExecutivoAdicionar').style.display = 'none';
        document.getElementById('ost3_te_divClienteExecutivoRetirar').style.display = 'none';
    }

    if (operacao == 1) {
        //campos
        document.getElementById('ost3_te_cliente_executivo_nome').value = cliente_executivo_nome;
        document.getElementById('ost3_te_cliente_executivo_funcao').value = cliente_executivo_funcao;

        //botoes
        document.getElementById('ost3_te_divClienteExecutivoAdicionar').style.display = 'block';
        document.getElementById('ost3_te_divClienteExecutivoRetirar').style.display = 'none';
    }

    if (operacao == 2) {
        //campos
        document.getElementById('ost3_te_cliente_executivo_id').value = cliente_executivo_id;
        document.getElementById('ost3_te_cliente_executivo_nome').value = cliente_executivo_nome;
        document.getElementById('ost3_te_cliente_executivo_funcao').value = cliente_executivo_funcao;
        document.getElementById('ost3_te_cliente_executivo_veiculo_id').value = cliente_executivo_veiculo_id;

        //botoes
        document.getElementById('ost3_te_divClienteExecutivoAdicionar').style.display = 'none';
        document.getElementById('ost3_te_divClienteExecutivoRetirar').style.display = 'block';
    }
}

//Atualizar a Grade de ClienteExecutivos
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
//operacao = 3 : Retirar
function ost3_atualizarClienteExecutivoGrade(operacao) {
    if (operacao == 1) {
        //Dados para preenchera linha da grade
        var cliente_executivo_id = document.getElementById('ost3_te_cliente_executivo_id').value;
        var cliente_executivo_nome = document.getElementById('ost3_te_cliente_executivo_nome').value;
        var cliente_executivo_funcao = document.getElementById('ost3_te_cliente_executivo_funcao').value;
        var cliente_executivo_veiculo_id = document.getElementById('ost3_te_cliente_executivo_veiculo_id').value;

        var select_veiculo = document.getElementById('ost3_te_cliente_executivo_veiculo_id');
        var cliente_executivo_veiculo = select_veiculo.options[select_veiculo.selectedIndex].text;

        //Montar Linha
        var linha;

        linha = "<tr class='ost3_te_cliente_executivo_linha' id='ost3_te_cliente_executivo_linha_" + cliente_executivo_id + "' data-id='" + cliente_executivo_id + "' style='cursor: pointer' onclick='ost3_selecionarClienteExecutivoExclusão("+cliente_executivo_id+");'>";
        linha += "  <td class='text-center ost3_te_cliente_executivo_item' data-id='" + cliente_executivo_id + "'></td>";
        linha += "  <td id='ost3_te_cliente_executivo_nome_td_" + cliente_executivo_id + "'>" + cliente_executivo_nome + "</td>";
        linha += "  <td id='ost3_te_cliente_executivo_funcao_td_" + cliente_executivo_id + "'>" + cliente_executivo_funcao + "</td>";
        linha += "  <td id='ost3_te_cliente_executivo_veiculo_td_" + cliente_executivo_id + "'>" + cliente_executivo_veiculo + "</td>";
        linha += "</tr>";

        //Adicionar linha na grade
        document.getElementById('ost3_te_cliente_executivo_grade').insertAdjacentHTML('beforeend', linha);

        //Montar campos hidden
        var hiddens;

        hiddens = "<div id='ost3_te_cliente_executivo_hiddens_" + cliente_executivo_id + "'>";
        hiddens += "<input class='cliente_executivo_item_hiddens' type='hidden' name='ost3_cliente_executivo_item[]' id='ost3_cliente_executivo_item' value=''>";
        hiddens += "<input type='hidden' name='ost3_cliente_executivo_id[]' id='ost3_cliente_executivo_id' value='"+cliente_executivo_id+"'>";
        hiddens += "<input type='hidden' name='ost3_cliente_executivo_nome[]' id='ost3_cliente_executivo_nome' value='"+cliente_executivo_nome+"'>";
        hiddens += "<input type='hidden' name='ost3_cliente_executivo_funcao[]' id='ost3_cliente_executivo_funcao' value='"+cliente_executivo_funcao+"'>";
        hiddens += "<input type='hidden' name='ost3_cliente_executivo_veiculo_id[]' id='ost3_cliente_executivo_veiculo_id' value='"+cliente_executivo_veiculo_id+"'>";
        hiddens += "</div>";

        //Adicionar hiddens na div
        document.getElementById('ost3_te_cliente_executivo_hiddens').insertAdjacentHTML('beforeend', hiddens);
    }

    if (operacao == 3) {
        //Dados
        cliente_executivo_id = document.getElementById('ost3_te_cliente_executivo_id').value;

        //Remover linha da grade
        let linha = document.getElementById('ost3_te_cliente_executivo_linha_' + cliente_executivo_id);
        if (linha) linha.remove();

        //Remover campos hiddens
        let hiddenFields = document.getElementById('ost3_te_cliente_executivo_hiddens_' + cliente_executivo_id);
        if (hiddenFields) hiddenFields.remove();
    }

    //Atualizando numeração das linhas da coluna Item
    var ln = 0;
    document.querySelectorAll('.ost3_te_cliente_executivo_item').forEach((element) => {
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
function ost3_limparClienteExecutivosGrade() {
    //Limpando campos escolher
    document.getElementById('ost3_te_cliente_executivo_id').value = '';
    document.getElementById('ost3_te_cliente_executivo_nome').value = '';
    document.getElementById('ost3_te_cliente_executivo_funcao').value = '';
    document.getElementById('ost3_te_cliente_executivo_veiculo_id').value = '';

    //Limpando ClienteExecutivos da grade
    document.getElementById('ost3_te_cliente_executivo_grade').innerHTML = '';

    //Limpando campos hiddens
    document.getElementById('ost3_te_cliente_executivo_hiddens').innerHTML = '';
}

//Pegar dados da linha que clicou e jogar para o ClienteExecutivo Escolher
function ost3_selecionarClienteExecutivoExclusão(cliente_executivo_id) {
    let cliente_executivo_nome = document.getElementById('ost3_te_cliente_executivo_nome_td_' + cliente_executivo_id).innerHTML;
    let cliente_executivo_funcao = document.getElementById('ost3_te_cliente_executivo_funcao_td_' + cliente_executivo_id).innerHTML;

    ost3_atualizarClienteExecutivoEscolher(2, cliente_executivo_id, cliente_executivo_nome, cliente_executivo_funcao);
}

function ost3_atualizarComboVeiculosClienteExecutivo() {
    //Combo ost3_te_cliente_executivo_veiculo_id
    const combo_cliente_executivo_veiculo_id = document.getElementById('ost3_te_cliente_executivo_veiculo_id');
    combo_cliente_executivo_veiculo_id.innerHTML = '';

    //Variáveis de Controle
    var qtdVeiculos = 0;
    var options = `<option value='' selected>Selecione...</option>`;

    //Varrer Grade Veículos
    const veiculos = document.querySelectorAll('#ost3_te_veiculo_hiddens .veiculo_item_hiddens');

    veiculos.forEach(veiculo => {
        qtdVeiculos++;

        const parentDiv = veiculo.parentElement; // a <div id='ost3_te_veiculo_hiddens_XXX'>

        const veiculo_id = parentDiv.querySelector("input[name='ost3_veiculo_id[]']").value;
        const marca = parentDiv.querySelector("input[name='ost3_veiculo_marca[]']").value;
        const modelo = parentDiv.querySelector("input[name='ost3_veiculo_modelo[]']").value;
        const placa = parentDiv.querySelector("input[name='ost3_veiculo_placa[]']").value;

        options += `<option value='${veiculo_id}'>${marca+' - '+modelo+' - '+placa}</option>`;
    });

    if (qtdVeiculos > 0) {combo_cliente_executivo_veiculo_id.innerHTML = options;}
}
//Grade de Clientes Executivos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Clientes Executivos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Grade de Equipes - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Equipes - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Atualiza/Limpa os dados do Funcionário escolhido para grade
//operacao = 0 : Limpar
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
function ost3_atualizarEquipeEscolher(operacao, equipe_funcionario_id='', equipe_funcionario_nome='', equipe_funcionario_funcao='', equipe_funcionario_veiculo_id='') {
    if (operacao == 0) {
        //campos
        document.getElementById('ost3_te_equipe_funcionario_id').value = equipe_funcionario_id;
        document.getElementById('ost3_te_equipe_funcionario_nome').value = equipe_funcionario_nome;
        document.getElementById('ost3_te_equipe_funcionario_funcao').value = equipe_funcionario_funcao;
        document.getElementById('ost3_te_equipe_funcionario_veiculo_id').value = equipe_funcionario_veiculo_id;

        //botoes
        document.getElementById('ost3_te_divEquipeAdicionar').style.display = 'none';
        document.getElementById('ost3_te_divEquipeRetirar').style.display = 'none';
    }

    if (operacao == 1) {
        //campos
        document.getElementById('ost3_te_equipe_funcionario_nome').value = equipe_funcionario_nome;
        document.getElementById('ost3_te_equipe_funcionario_funcao').value = equipe_funcionario_funcao;

        //botoes
        document.getElementById('ost3_te_divEquipeAdicionar').style.display = 'block';
        document.getElementById('ost3_te_divEquipeRetirar').style.display = 'none';
    }

    if (operacao == 2) {
        //campos
        document.getElementById('ost3_te_equipe_funcionario_id').value = equipe_funcionario_id;
        document.getElementById('ost3_te_equipe_funcionario_nome').value = equipe_funcionario_nome;
        document.getElementById('ost3_te_equipe_funcionario_funcao').value = equipe_funcionario_funcao;
        document.getElementById('ost3_te_equipe_funcionario_veiculo_id').value = equipe_funcionario_veiculo_id;

        //botoes
        document.getElementById('ost3_te_divEquipeAdicionar').style.display = 'none';
        document.getElementById('ost3_te_divEquipeRetirar').style.display = 'block';
    }
}

//Atualizar a Grade de Equipes
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
//operacao = 3 : Retirar
function ost3_atualizarEquipeGrade(operacao) {
    if (operacao == 1) {
        //Dados para preenchera linha da grade
        var equipe_funcionario_id = document.getElementById('ost3_te_equipe_funcionario_id').value;
        var equipe_funcionario_nome = document.getElementById('ost3_te_equipe_funcionario_nome').value;
        var equipe_funcionario_funcao = document.getElementById('ost3_te_equipe_funcionario_funcao').value;
        var equipe_funcionario_veiculo_id = document.getElementById('ost3_te_equipe_funcionario_veiculo_id').value;

        var select_veiculo = document.getElementById('ost3_te_equipe_funcionario_veiculo_id');
        var equipe_funcionario_veiculo = select_veiculo.options[select_veiculo.selectedIndex].text;

        //Montar Linha
        var linha;

        linha = "<tr class='ost3_te_equipe_funcionario_linha' id='ost3_te_equipe_funcionario_linha_" + equipe_funcionario_id + "' data-id='" + equipe_funcionario_id + "' style='cursor: pointer' onclick='ost3_selecionarEquipeExclusão("+equipe_funcionario_id+");'>";
        linha += "  <td class='text-center ost3_te_equipe_funcionario_item' data-id='" + equipe_funcionario_id + "'></td>";
        linha += "  <td id='ost3_te_equipe_funcionario_nome_td_" + equipe_funcionario_id + "'>" + equipe_funcionario_nome + "</td>";
        linha += "  <td id='ost3_te_equipe_funcionario_funcao_td_" + equipe_funcionario_id + "'>" + equipe_funcionario_funcao + "</td>";
        linha += "  <td id='ost3_te_equipe_funcionario_veiculo_td_" + equipe_funcionario_id + "'>" + equipe_funcionario_veiculo + "</td>";
        linha += "</tr>";

        //Adicionar linha na grade
        document.getElementById('ost3_te_equipe_funcionario_grade').insertAdjacentHTML('beforeend', linha);

        //Montar campos hidden
        var hiddens;

        hiddens = "<div id='ost3_te_equipe_funcionario_hiddens_" + equipe_funcionario_id + "'>";
        hiddens += "<input class='equipe_funcionario_item_hiddens' type='hidden' name='ost3_equipe_funcionario_item[]' id='ost3_equipe_funcionario_item' value=''>";
        hiddens += "<input type='hidden' name='ost3_equipe_funcionario_id[]' id='ost3_equipe_funcionario_id' value='"+equipe_funcionario_id+"'>";
        hiddens += "<input type='hidden' name='ost3_equipe_funcionario_nome[]' id='ost3_equipe_funcionario_nome' value='"+equipe_funcionario_nome+"'>";
        hiddens += "<input type='hidden' name='ost3_equipe_funcionario_funcao[]' id='ost3_equipe_funcionario_funcao' value='"+equipe_funcionario_funcao+"'>";
        hiddens += "<input type='hidden' name='ost3_equipe_funcionario_veiculo_id[]' id='ost3_equipe_funcionario_veiculo_id' value='"+equipe_funcionario_veiculo_id+"'>";
        hiddens += "</div>";

        //Adicionar hiddens na div
        document.getElementById('ost3_te_equipe_funcionario_hiddens').insertAdjacentHTML('beforeend', hiddens);
    }

    if (operacao == 3) {
        //Dados
        equipe_funcionario_id = document.getElementById('ost3_te_equipe_funcionario_id').value;

        //Remover linha da grade
        let linha = document.getElementById('ost3_te_equipe_funcionario_linha_' + equipe_funcionario_id);
        if (linha) linha.remove();

        //Remover campos hiddens
        let hiddenFields = document.getElementById('ost3_te_equipe_funcionario_hiddens_' + equipe_funcionario_id);
        if (hiddenFields) hiddenFields.remove();
    }

    //Atualizando numeração das linhas da coluna Item
    var ln = 0;
    document.querySelectorAll('.ost3_te_equipe_funcionario_item').forEach((element) => {
        ln++;
        element.innerHTML = ln;
    });

    //Atualizando numeração das divs da coluna Item dos campos hiddens
    var ln = 0;
    document.querySelectorAll('.equipe_funcionario_item_hiddens').forEach((element) => {
        ln++;
        element.value = ln;
    });
}

//Limpar a Grade de Equipes
function ost3_limparEquipesGrade() {
    //Limpando campos escolher
    document.getElementById('ost3_te_equipe_funcionario_id').value = '';
    document.getElementById('ost3_te_equipe_funcionario_nome').value = '';
    document.getElementById('ost3_te_equipe_funcionario_funcao').value = '';
    document.getElementById('ost3_te_equipe_funcionario_veiculo_id').value = '';

    //Limpando Equipes da grade
    document.getElementById('ost3_te_equipe_funcionario_grade').innerHTML = '';

    //Limpando campos hiddens
    document.getElementById('ost3_te_equipe_funcionario_hiddens').innerHTML = '';
}

//Pegar dados da linha que clicou e jogar para o Equipe Escolher
function ost3_selecionarEquipeExclusão(equipe_funcionario_id) {
    let equipe_funcionario_nome = document.getElementById('ost3_te_equipe_funcionario_nome_td_' + equipe_funcionario_id).innerHTML;
    let equipe_funcionario_funcao = document.getElementById('ost3_te_equipe_funcionario_funcao_td_' + equipe_funcionario_id).innerHTML;

    ost3_atualizarEquipeEscolher(2, equipe_funcionario_id, equipe_funcionario_nome, equipe_funcionario_funcao);
}

function ost3_atualizarComboVeiculosEquipe() {
    //Combo ost3_te_equipe_funcionario_veiculo_id
    const combo_equipe_funcionario_veiculo_id = document.getElementById('ost3_te_equipe_funcionario_veiculo_id');
    combo_equipe_funcionario_veiculo_id.innerHTML = '';

    //Variáveis de Controle
    var qtdVeiculos = 0;
    var options = `<option value='' selected>Selecione...</option>`;

    //Varrer Grade Veículos
    const veiculos = document.querySelectorAll('#ost3_te_veiculo_hiddens .veiculo_item_hiddens');

    veiculos.forEach(veiculo => {
        qtdVeiculos++;

        const parentDiv = veiculo.parentElement; // a <div id='ost3_te_veiculo_hiddens_XXX'>

        const veiculo_id = parentDiv.querySelector("input[name='ost3_veiculo_id[]']").value;
        const marca = parentDiv.querySelector("input[name='ost3_veiculo_marca[]']").value;
        const modelo = parentDiv.querySelector("input[name='ost3_veiculo_modelo[]']").value;
        const placa = parentDiv.querySelector("input[name='ost3_veiculo_placa[]']").value;

        options += `<option value='${veiculo_id}'>${marca+' - '+modelo+' - '+placa}</option>`;
    });

    if (qtdVeiculos > 0) {combo_equipe_funcionario_veiculo_id.innerHTML = options;}
}
//Grade de Equipes - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Grade de Equipes - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

document.addEventListener('DOMContentLoaded', function(event) {
    //Buscar dados do Cliente escolhido
    document.getElementById('ost3_cliente_id').addEventListener('change', function() {
        if (document.getElementById('ost3_cliente_id').value == '') {
            //Inputs
            document.getElementById('ost3_cliente_nome').value = '';
            document.getElementById('ost3_cliente_telefone').value = '';
            document.getElementById('ost3_cliente_celular').value = '';
            document.getElementById('ost3_cliente_email').value = '';
            document.getElementById('ost3_cliente_logradouro').value = '';
            document.getElementById('ost3_cliente_bairro').value = '';
            document.getElementById('ost3_cliente_cidade').value = '';
        } else {
            var ost3_cliente_id = document.getElementById('ost3_cliente_id').value;

            //Route: clientes/id
            fetch('clientes/'+ost3_cliente_id, {
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
                document.getElementById('ost3_cliente_nome').value = cliente.name;
                document.getElementById('ost3_cliente_telefone').value = telefone;
                document.getElementById('ost3_cliente_celular').value = celular;
                document.getElementById('ost3_cliente_email').value = cliente.email;
                document.getElementById('ost3_cliente_logradouro').value = cliente.logradouro;
                document.getElementById('ost3_cliente_bairro').value = cliente.bairro;
                document.getElementById('ost3_cliente_cidade').value = cliente.localidade;
            }).catch(error => {
                alert('Erro OrdensServicos:'+error);
            });


        }
    });

    //Grade de Serviços - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Serviços - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Buscar dados do Responsável Funcionário escolhido
    document.getElementById('ost3_ts_responsavel_funcionario_id').addEventListener('change', function() {
        if (document.getElementById('ost3_ts_responsavel_funcionario_id').value != '') {
            var ost3_ts_responsavel_funcionario_id = document.getElementById('ost3_ts_responsavel_funcionario_id').value;

            //Route: funcionarios/id
            fetch('funcionarios/'+ost3_ts_responsavel_funcionario_id, {
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
                document.getElementById('ost3_responsavel_funcionario_id').value = funcionario.id;
                document.getElementById('ost3_responsavel_funcionario_nome').value = funcionario.name;
            }).catch(error => {
                alert('Erro OrdensServicos:'+error);
            });
        } else {
            //copiar os dados para os campos
            document.getElementById('ost3_responsavel_funcionario_id').value = '';
            document.getElementById('ost3_responsavel_funcionario_nome').value = '';
        }
    });
    //Grade de Serviços - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Serviços - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Grade de Destinos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Destinos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Buscar dados do Destino escolhido
    document.getElementById('ost3_te_destino_ordem').addEventListener('change', function() {
        if (document.getElementById('ost3_te_destino_ordem').value != '') {
            ost3_buscarEnderecoDestino();
        }
    });

    document.getElementById('ost3_te_destino_cep').addEventListener('change', function() {
        if (document.getElementById('ost3_te_destino_cep').value != '') {
            ost3_buscarEnderecoDestino();
        }
    });

    //Adicionar Destino na grade
    document.getElementById('ost3_te_destino_adicionar').addEventListener('click', function() {
        var mensagem_erro = '';

        if (document.getElementById('ost3_te_destino_ordem').value == '') {
            mensagem_erro += 'Escolha uma Ordem para o Destino.'+'<br>';
        }

        if (document.getElementById('ost3_te_destino_cep').value == '') {
            mensagem_erro += 'Escolha um CEP para o Destino.'+'<br>';
        }

        document.querySelectorAll("input[name='ost3_destino_ordem[]']").forEach((element) => {
            if (document.getElementById('ost3_te_destino_ordem').value == element.value) {
                mensagem_erro += 'Ordem do Destino já existe na grade.'+'<br>';
            }
        });

        if (mensagem_erro == '') {
            //Adicionar linha na grade
            ost3_atualizarDestinoGrade(1);

            //Atualizar dados do Destino escolhido
            ost3_atualizarDestinoEscolher(0);
        } else {
            alertSwal('error', 'Ordem de Serviço', mensagem_erro, 'true', 2000);
        }
    });

    //Retirar Destino na grade
    document.getElementById('ost3_te_destino_retirar').addEventListener('click', function() {
        //Adicionar linha na grade
        ost3_atualizarDestinoGrade(3);

        //Atualizar dados do Destino escolhido
        ost3_atualizarDestinoEscolher(0);
    });
    //Grade de Destinos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Destinos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Grade de Veículos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Veículos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Buscar dados do Veiculo escolhido
    document.getElementById('ost3_te_veiculo_id').addEventListener('change', function() {
        if (document.getElementById('ost3_te_veiculo_id').value != '') {
            var ost3_te_veiculo_id = document.getElementById('ost3_te_veiculo_id').value;

            //Route: veiculos/id
            fetch('veiculos/'+ost3_te_veiculo_id, {
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
                ost3_atualizarVeiculoEscolher(1, veiculo.id, veiculo.veiculoMarcaName, veiculo.veiculoModeloName, veiculo.placa, veiculo.veiculoCombustivelName);
            }).catch(error => {
                alert('Erro OrdensVeiculos:'+error);
            });
        }
    });

    //Adicionar Veiculo na grade
    document.getElementById('ost3_te_veiculo_adicionar').addEventListener('click', function() {
        var mensagem_erro = '';

        if (document.getElementById('ost3_te_veiculo_id').value == '') {
            mensagem_erro += 'Escolha um Veículo.'+'<br>';
        }

        document.querySelectorAll("input[name='ost3_veiculo_id[]']").forEach((element) => {
            if (document.getElementById('ost3_te_veiculo_id').value == element.value) {
                mensagem_erro += 'Veículo já existe na grade.'+'<br>';
            }
        });

        if (mensagem_erro == '') {
            //Adicionar linha na grade
            ost3_atualizarVeiculoGrade(1);

            //Atualizar dados do Veiculo escolhido
            ost3_atualizarVeiculoEscolher(0);
        } else {
            alertSwal('error', 'Ordem de Serviço', mensagem_erro, 'true', 2000);
        }
    });

    //Retirar Veiculo na grade
    document.getElementById('ost3_te_veiculo_retirar').addEventListener('click', function() {
        //Adicionar linha na grade
        ost3_atualizarVeiculoGrade(3);

        //Atualizar dados do Veiculo escolhido
        ost3_atualizarVeiculoEscolher(0);
    });
    //Grade de Veículos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Veículos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Grade de Clientes Executivos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Clientes Executivos - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Buscar dados do Executivo escolhido
    document.getElementById('ost3_te_cliente_executivo_id').addEventListener('change', function() {
        if (document.getElementById('ost3_te_cliente_executivo_id').value != '') {
            //Montar combo veiculos'''''''''''''''''''''''''
            ost3_atualizarComboVeiculosClienteExecutivo();
            //''''''''''''''''''''''''''''''''''''''''''''''

            var ost3_te_cliente_executivo_id = document.getElementById('ost3_te_cliente_executivo_id').value;

            //Route: clientes_executivos/id
            fetch('clientes_executivos/'+ost3_te_cliente_executivo_id, {
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
                ost3_atualizarClienteExecutivoEscolher(1, cliente_executivo.id, cliente_executivo.executivo_nome, cliente_executivo.executivo_funcao);
            }).catch(error => {
                alert('Erro OrdensExecutivos:'+error);
            });
        }
    });

    //Adicionar Executivo na grade
    document.getElementById('ost3_te_cliente_executivo_adicionar').addEventListener('click', function() {
        var mensagem_erro = '';

        if (document.getElementById('ost3_te_cliente_executivo_id').value == '') {
            mensagem_erro += 'Escolha um Executivo.'+'<br>';
        }

        if (document.getElementById('ost3_te_cliente_executivo_veiculo_id').value == '') {
            mensagem_erro += 'Escolha um Veículo.'+'<br>';
        }

        document.querySelectorAll("input[name='ost3_cliente_executivo_id[]']").forEach((element) => {
            if (document.getElementById('ost3_te_cliente_executivo_id').value == element.value) {
                mensagem_erro += 'Executivo já existe na grade.'+'<br>';
            }
        });

        if (mensagem_erro == '') {
            //Adicionar linha na grade
            ost3_atualizarClienteExecutivoGrade(1);

            //Atualizar dados do Executivo escolhido
            ost3_atualizarClienteExecutivoEscolher(0);
        } else {
            alertSwal('error', 'Ordem de Serviço', mensagem_erro, 'true', 2000);
        }
    });

    //Retirar Executivo na grade
    document.getElementById('ost3_te_cliente_executivo_retirar').addEventListener('click', function() {
        //Adicionar linha na grade
        ost3_atualizarClienteExecutivoGrade(3);

        //Atualizar dados do Executivo escolhido
        ost3_atualizarClienteExecutivoEscolher(0);
    });
    //Grade de Clientes Executivos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Clientes Executivos - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Grade de Equipes - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Equipes - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Buscar dados do Funcionario escolhido
    document.getElementById('ost3_te_equipe_funcionario_id').addEventListener('change', function() {
        if (document.getElementById('ost3_te_equipe_funcionario_id').value != '') {
            //Montar combo veiculos'''''''''''''''''''''''''
            ost3_atualizarComboVeiculosEquipe();
            //''''''''''''''''''''''''''''''''''''''''''''''

            var ost3_te_equipe_funcionario_id = document.getElementById('ost3_te_equipe_funcionario_id').value;

            //Route: funcionarios/id
            fetch('funcionarios/'+ost3_te_equipe_funcionario_id, {
                method: 'GET',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                var equipe_funcionario = data.success;

                //copiar os dados para os campos
                ost3_atualizarEquipeEscolher(1, equipe_funcionario.id, equipe_funcionario.name, equipe_funcionario.funcaoName);
            }).catch(error => {
                alert('Erro OrdensEquipes:'+error);
            });
        }
    });

    //Adicionar Funcionario na grade
    document.getElementById('ost3_te_equipe_funcionario_adicionar').addEventListener('click', function() {
        var mensagem_erro = '';

        if (document.getElementById('ost3_te_equipe_funcionario_id').value == '') {
            mensagem_erro += 'Escolha um Funcionário.'+'<br>';
        }

        if (document.getElementById('ost3_te_equipe_funcionario_veiculo_id').value == '') {
            mensagem_erro += 'Escolha um Veículo.'+'<br>';
        }

        document.querySelectorAll("input[name='ost3_equipe_funcionario_id[]']").forEach((element) => {
            if (document.getElementById('ost3_te_equipe_funcionario_id').value == element.value) {
                mensagem_erro += 'Funcionário já existe na grade.'+'<br>';
            }
        });

        if (mensagem_erro == '') {
            //Adicionar linha na grade
            ost3_atualizarEquipeGrade(1);

            //Atualizar dados do Funcionario escolhido
            ost3_atualizarEquipeEscolher(0);
        } else {
            alertSwal('error', 'Ordem de Serviço', mensagem_erro, 'true', 2000);
        }
    });

    //Retirar Funcionario na grade
    document.getElementById('ost3_te_equipe_funcionario_retirar').addEventListener('click', function() {
        //Adicionar linha na grade
        ost3_atualizarEquipeGrade(3);

        //Atualizar dados do Funcionario escolhido
        ost3_atualizarEquipeEscolher(0);
    });
    //Grade de Equipes - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Grade de Equipes - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
