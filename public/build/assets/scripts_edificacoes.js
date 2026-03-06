function validar_frm_edificacoes() {
    var validacao_ok = true;
    var mensagem = '';

    // Campo: cliente_id (requerido)
    if (validacao({op:1, value:document.getElementById('cliente_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cliente requerido.'+'<br>';
    }

    // Campo: name (requerido)
    if (validacao({op:1, value:document.getElementById('name').value}) === false) {
        validacao_ok = false;
        mensagem += 'Nome requerido.'+'<br>';
    }

    // Campo: pavimentos (requerido)
    if (validacao({op:1, value:document.getElementById('pavimentos').value}) === false) {
        validacao_ok = false;
        mensagem += 'Pavimentos requerido.'+'<br>';
    }

    // Campo: mezaninos (requerido)
    if (validacao({op:1, value:document.getElementById('mezaninos').value}) === false) {
        validacao_ok = false;
        mensagem += 'Mezaninos requerido.'+'<br>';
    }

    // Campo: coberturas (requerido)
    if (validacao({op:1, value:document.getElementById('coberturas').value}) === false) {
        validacao_ok = false;
        mensagem += 'Coberturas requerido.'+'<br>';
    }

    // Campo: areas_tecnicas (requerido)
    if (validacao({op:1, value:document.getElementById('areas_tecnicas').value}) === false) {
        validacao_ok = false;
        mensagem += 'Áreas Técnicas requerido.'+'<br>';
    }

    // Campo: altura (decimal)
    if (validacao({op:19, value:document.getElementById('altura').value}) === false) {
        validacao_ok = false;
        mensagem += 'Altura tem que ser um valor decimal.'+'<br>';
    }

    // Campo: area_total_construida (decimal)
    if (validacao({op:19, value:document.getElementById('area_total_construida').value}) === false) {
        validacao_ok = false;
        mensagem += 'Área Total Construida tem que ser um valor decimal.'+'<br>';
    }

    // Campo: lotacao (número inteiro)
    if (validacao({op:4, value:document.getElementById('lotacao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Lotação tem que ser um número inteiro.'+'<br>';
    }

    // Campo: carga_incendio (número inteiro)
    if (validacao({op:4, value:document.getElementById('carga_incendio').value}) === false) {
        validacao_ok = false;
        mensagem += 'Carga Incêndio tem que ser um número inteiro.'+'<br>';
    }

    // Campo: incendio_risco_id (requerido)
    if (validacao({op:1, value:document.getElementById('incendio_risco_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Risco Incêndio requerido.'+'<br>';
    }

    // Campo: edificacao_classificacao_id (requerido)
    if (validacao({op:1, value:document.getElementById('edificacao_classificacao_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Classificação Edificação requerido.'+'<br>';
    }

    // Campo: definicao (requerido)
    if (validacao({op:1, value:document.getElementById('definicao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Definição requerido.'+'<br>';
    }

    // Campo: grupo (requerido)
    if (validacao({op:1, value:document.getElementById('grupo').value}) === false) {
        validacao_ok = false;
        mensagem += 'Grupo requerido.'+'<br>';
    }

    // Campo: divisao (requerido)
    if (validacao({op:1, value:document.getElementById('divisao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Divisão requerido.'+'<br>';
    }

    // Campo: ocupacao_uso (requerido)
    if (validacao({op:1, value:document.getElementById('ocupacao_uso').value}) === false) {
        validacao_ok = false;
        mensagem += 'Ocupação requerido.'+'<br>';
    }

    // Campo: descricao (requerido)
    if (validacao({op:1, value:document.getElementById('descricao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Descrição requerido.'+'<br>';
    }

    // Validando dados dos Níveis'''''''''''''''''''''''''''''''''''''''''''''''''''
    // Soma da area total construida dos niveis
    let area_total_construida_niveis = 0;

    // Varrer Pavimentos
    for (i = 1; i <= document.getElementById('pavimentos').value; i++) {
        // Campo: nivel_nome_pavimentos_i (requerido)
        if (validacao({ op: 1, value: document.getElementById(`nivel_nome_pavimentos_${i}`).value }) === false) {
            validacao_ok = false;
            mensagem += 'Nome do Nível Pavimentos ' + i + ' requerido.' + '<br>';
        }

        // Campo: nivel_area_construida_pavimentos_i (decimal)
        if (validacao({ op: 19, value: document.getElementById(`nivel_area_construida_pavimentos_${i}`).value }) === false) {
            validacao_ok = false;
            mensagem += 'Área Total Construida do Nível Pavimentos ' + i + ' tem que ser um valor decimal.' + '<br>';
        }

        // Soma da area total construida dos niveis
        area_total_construida_niveis += parseFloat(moeda2float(document.getElementById(`nivel_area_construida_pavimentos_${i}`).value));
    }

    // Varrer Mezaninos
    for (i = 1; i <= document.getElementById('mezaninos').value; i++) {
        // Campo: nivel_nome_mezaninos_i (requerido)
        if (validacao({ op: 1, value: document.getElementById(`nivel_nome_mezaninos_${i}`).value }) === false) {
            validacao_ok = false;
            mensagem += 'Nome do Nível Mezaninos ' + i + ' requerido.' + '<br>';
        }

        // Campo: nivel_area_construida_mezaninos_i (decimal)
        if (validacao({ op: 19, value: document.getElementById(`nivel_area_construida_mezaninos_${i}`).value }) === false) {
            validacao_ok = false;
            mensagem += 'Área Total Construida do Nível Mezaninos ' + i + ' tem que ser um valor decimal.' + '<br>';
        }

        // Soma da area total construida dos niveis
        area_total_construida_niveis += parseFloat(moeda2float(document.getElementById(`nivel_area_construida_mezaninos_${i}`).value));
    }

    // Varrer Coberturas
    for (i = 1; i <= document.getElementById('coberturas').value; i++) {
        // Campo: nivel_nome_coberturas_i (requerido)
        if (validacao({ op: 1, value: document.getElementById(`nivel_nome_coberturas_${i}`).value }) === false) {
            validacao_ok = false;
            mensagem += 'Nome do Nível Coberturas ' + i + ' requerido.' + '<br>';
        }

        // Campo: nivel_area_construida_coberturas_i (decimal)
        if (validacao({ op: 19, value: document.getElementById(`nivel_area_construida_coberturas_${i}`).value }) === false) {
            validacao_ok = false;
            mensagem += 'Área Total Construida do Nível Coberturas ' + i + ' tem que ser um valor decimal.' + '<br>';
        }

        // Soma da area total construida dos niveis
        area_total_construida_niveis += parseFloat(moeda2float(document.getElementById(`nivel_area_construida_coberturas_${i}`).value));
    }

    // Varrer Areas Tecnicas
    for (i = 1; i <= document.getElementById('areas_tecnicas').value; i++) {
        // Campo: nivel_nome_areas_tecnicas_i (requerido)
        if (validacao({ op: 1, value: document.getElementById(`nivel_nome_areas_tecnicas_${i}`).value }) === false) {
            validacao_ok = false;
            mensagem += 'Nome do Nível Áreas Técnicas ' + i + ' requerido.' + '<br>';
        }

        // Campo: nivel_area_construida_areas_tecnicas_i (decimal)
        if (validacao({ op: 19, value: document.getElementById(`nivel_area_construida_areas_tecnicas_${i}`).value }) === false) {
            validacao_ok = false;
            mensagem += 'Área Total Construida do Nível Áreas Técnicas ' + i + ' tem que ser um valor decimal.' + '<br>';
        }

        // Soma da area total construida dos niveis
        area_total_construida_niveis += parseFloat(moeda2float(document.getElementById(`nivel_area_construida_areas_tecnicas_${i}`).value));
    }

    // Soma da area total construida dos niveis (colocar valor no campo area_total_construida_niveis)
    document.getElementById('area_total_construida_niveis').value = float2moeda(area_total_construida_niveis);
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Verifica se tem nivel_nome_?????_?? duplicados'''''''''''''''''''''''''''''''
    const grupos = ['pavimentos', 'mezaninos', 'coberturas', 'areas_tecnicas'];
    const nomes = [];
    const duplicados = [];

    grupos.forEach(grupo => {
        // Seleciona todos os inputs cujo ID começa com nivel_nome_<grupo>_
        document.querySelectorAll(`[id^="nivel_nome_${grupo}_"]`).forEach(input => {
            const valor = input.value.trim().toLowerCase();
            if (valor) {
                if (nomes.includes(valor)) {
                    duplicados.push(valor);
                } else {
                    nomes.push(valor);
                }
            }
        });
    });

    if (duplicados.length > 0) {
        validacao_ok = false;
        mensagem += 'Existem nomes de Níveis duplicados.' + '<br>';
    }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Campo: area_total_construida x area_total_construida_niveis (igual)
    if (document.getElementById('area_total_construida').value !== document.getElementById('area_total_construida_niveis').value) {
        validacao_ok = false;
        mensagem += 'Área Total Construida x Área Total Construida Níveis não podem ser diferentes.' + '<br>';
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

// Atualizar Nomes Pavimentos
function atualizarNomeNivel(inputId, destinoId) {
    const input = document.getElementById(inputId);
    const destino = document.getElementById(destinoId);

    destino.innerHTML = input.value;
}

// Montar Div Níveis (Pavimentos, Mezaninos, Coberturas e Áreas Técnicas)
async function montarEdificacaoNiveis({ v_cols = 12, v_pavimentos = 0, v_mezaninos = 0, v_coberturas = 0, v_areas_tecnicas = 0, v_div_edificacao_niveis = 'divEdificacaoNiveis' }) {
    // Verificando dados
    v_pavimentos = document.getElementById('pavimentos').value || v_pavimentos;
    v_mezaninos = document.getElementById('mezaninos').value || v_mezaninos;
    v_coberturas = document.getElementById('coberturas').value || v_coberturas;
    v_areas_tecnicas = document.getElementById('areas_tecnicas').value || v_areas_tecnicas;

    // Validação
    if (v_pavimentos == '' || v_mezaninos == '' || v_coberturas == '' || v_areas_tecnicas == '') {
        return;
    }

    // Tamanho das colunas (v_cols - Tamanho de cada coluna de Nível para tamanho de tela grande)
    let col1 = 3;
    let col2 = 12;
    let col3 = 10;
    let col4 = 2;
    let col5 = 9;
    let col6 = 3;

    if (v_cols == 3) {
        col1 = 3;
        col2 = 12;
        col3 = 10;
        col4 = 2;
        col5 = 9;
        col6 = 3;
    }

    if (v_cols == 6) {
        col1 = 6;
        col2 = 9;
        col3 = 2;
        col4 = 1;
        col5 = 4;
        col6 = 2;
    }

    if (v_cols == 12) {
        col1 = 12;
        col2 = 10;
        col3 = 1;
        col4 = 1;
        col5 = 3;
        col6 = 1;
    }

    // Campos Select
    const campos = [
        { id: 'pavimentos',         label: 'Pavimentos',        label_singular: 'Pavimento',        grupo: 'pavimentos',        value: v_pavimentos },
        { id: 'mezaninos',          label: 'Mezaninos',         label_singular: 'Mezanino',         grupo: 'mezaninos',         value: v_mezaninos },
        { id: 'coberturas',         label: 'Coberturas',        label_singular: 'Cobertura',        grupo: 'coberturas',        value: v_coberturas },
        { id: 'areas_tecnicas',     label: 'Áreas Técnicas',    label_singular: 'Área Técnica',     grupo: 'areas_tecnicas',    value: v_areas_tecnicas }
    ];

    // Ordem fixa desejada
    const ordem = ['pavimentos', 'mezaninos', 'coberturas', 'areas_tecnicas'];

    // Buscar Medidas Segurança para usar no retorno'''''''''''''''''''''''''''''''''''''''''''
    const response = await fetch('edificacoes/dados/medidas_seguranca', {
        headers: { 'REQUEST-ORIGIN': 'fetch', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content }
    });

    const response_dados = await response.json();
    const medidas_seguranca = response_dados.success;
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Percorrer os campos
    campos.forEach(campo => {
        const label = campo.label;
        const label_singular = campo.label_singular;
        const grupo = campo.grupo;
        const div_edificacao_niveis = document.getElementById(v_div_edificacao_niveis);
        if (!div_edificacao_niveis) return;

        const grupoId = 'grupo-' + grupo;
        const novoValor = parseInt(campo.value) || 0;
        let grupoDiv = document.getElementById(grupoId);

        // Cria o grupo se ainda não existir
        if (!grupoDiv) {
            grupoDiv = document.createElement('div');
            grupoDiv.className = 'row col-12 mt-2';
            grupoDiv.id = grupoId;

            // Label título
            const labelTitulo = document.createElement('label');
            labelTitulo.className = 'col-12 mb-1 text-success';
            labelTitulo.innerHTML = label;
            grupoDiv.appendChild(labelTitulo);

            // Inserir na ordem correta
            const idx = ordem.indexOf(grupo);
            let inserido = false;

            for (let i = idx + 1; i < ordem.length; i++) {
                const proximo = document.getElementById('grupo-' + ordem[i]);
                if (proximo) {
                    div_edificacao_niveis.insertBefore(grupoDiv, proximo);
                    inserido = true;
                    break;
                }
            }

            if (!inserido) div_edificacao_niveis.appendChild(grupoDiv);
        }

        // Se valor for 0 → remove o grupo inteiro
        if (novoValor === 0) {
            if (grupoDiv) grupoDiv.remove();
            return;
        }

        // Conta quantos blocos já existem (cards)
        const qtdAtual = grupoDiv.querySelectorAll('.card').length;

        // Define cor do card
        let classCardBg = '';
        if (grupo === 'pavimentos') classCardBg = 'bg-primary';
        if (grupo === 'mezaninos') classCardBg = 'bg-success';
        if (grupo === 'coberturas') classCardBg = 'bg-info';
        if (grupo === 'areas_tecnicas') classCardBg = 'bg-warning';

        // Adiciona novos cards se aumentou
        if (novoValor > qtdAtual) {
            for (let i = qtdAtual + 1; i <= novoValor; i++) {
                const div = document.createElement('div');
                div.className = `col-12 col-md-${col1} mb-1`;

                // Montando conteúdo do card
                let divGrupo = '';

                divGrupo += `<div class="card ${classCardBg} text-white-50">`;
                divGrupo += `   <div class="card-body">`;
                divGrupo += `       <h5 class="mb-4 text-white"><i class="mdi mdi-bullseye-arrow me-3"></i> <span id="span_nivel_nome_${grupo}_${i}">${label_singular} ${i}</span></h5>`;
                divGrupo += `       <div class="row">`;
                divGrupo += `           <div class="col-12 col-md-${col2} mb-2">`;
                divGrupo += `               <input type="text" class="form-control form-control-sm" id="nivel_nome_${grupo}_${i}" name="nivel_nome_${grupo}_${i}" oninput="atualizarNomeNivel('nivel_nome_${grupo}_${i}', 'span_nivel_nome_${grupo}_${i}')" placeholder="Digite o Nome ${label_singular}" value="${label_singular} ${i}">`;
                divGrupo += `           </div>`;
                divGrupo += `           <div class="col-10 col-md-${col3} mb-2">`;
                divGrupo += `               <input type="text" class="form-control form-control-sm mask_money" id="nivel_area_construida_${grupo}_${i}" name="nivel_area_construida_${grupo}_${i}" placeholder="Digite ATC ${label_singular}" value="0,00">`;
                divGrupo += `           </div>`;
                divGrupo += `           <div class="col-2 col-md-${col4} mb-2 text-nowrap align-self-end text-end">`;
                divGrupo += `               m²`;
                divGrupo += `           </div>`;
                divGrupo += `       </div>`;

                // Colocando Medidas Segurança'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                let idx = 0;

                divGrupo += `       <div class="row mt-2">`;

                medidas_seguranca.forEach(medida_seguranca => {
                    idx++;

                    //divGrupo += `       <div class="row mt-2">`;
                    divGrupo += `           <div class="col-10 col-md-${col5} text-white mt-2 small">`;
                    divGrupo += `               ${idx}. ${primeiraMaiuscula(medida_seguranca.name)}`;
                    divGrupo += `               <input type="hidden" id="nivel_medida_seguranca_id_${medida_seguranca.id}_${grupo}_${i}" name="nivel_medida_seguranca_id_${medida_seguranca.id}_${grupo}_${i}" value="${medida_seguranca.id}">`;
                    divGrupo += `           </div>`;
                    divGrupo += `           <div class="col-2 col-md-${col6} text-end mt-2">`;
                    divGrupo += `               <input type="text" class="form-control form-control-sm text-center mask_numero_inteiro" id="nivel_quantidade_medida_seguranca_${medida_seguranca.id}_${grupo}_${i}" name="nivel_quantidade_medida_seguranca_${medida_seguranca.id}_${grupo}_${i}" value="0">`;
                    divGrupo += `           </div>`;
                    //divGrupo += `       </div>`;
                });

                divGrupo += `       </div>`;
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                divGrupo += `   </div>`;
                divGrupo += `</div>`;

                div.innerHTML = divGrupo;
                grupoDiv.appendChild(div);
            }

            // Atualizar mascaras
            putMask();
        }

        // Remove cards se diminuiu
        else if (novoValor < qtdAtual) {
            for (let i = qtdAtual; i > novoValor; i--) {
                if (grupoDiv && grupoDiv.lastElementChild) {
                    grupoDiv.lastElementChild.remove();
                }
            }
        }
    });
}

async function preencherEdificacaoNiveis(edificacao_id = 0) {
    // Validando
    if (edificacao_id == 0) {
        console.warn('Nenhuma edificação para preenchimento.');
        return;
    }

    // Dados
    const response_route = await fetch('edificacoes/dados/edificacao_medidas_seguranca/' + edificacao_id, {
        headers: { 'REQUEST-ORIGIN': 'fetch', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content }
    });

    const response_dados = await response_route.json();
    const dados = response_dados.success;

    if (!dados || !Array.isArray(dados) || dados.length === 0) {
        console.warn('Nenhum dado de níveis encontrado para preenchimento.');
        return;
    }

    // Varrer dados
    dados.forEach(item => {
        const {edificacao_nivel_id, medida_seguranca_id, edificacaoMedidaSegurancaQuantidade, edificacaoNivelName, edificacaoNivelAreaConstruida, edificacaoNivelOrdem, edificacaoNivelNivel, medidaSegurancaName} = item;

        // Grupos
        let grupo = '';

        if (edificacaoNivelNivel == 1) { grupo = 'pavimentos'; }
        if (edificacaoNivelNivel == 2) {grupo = 'mezaninos';}
        if (edificacaoNivelNivel == 3) {grupo = 'coberturas';}
        if (edificacaoNivelNivel == 4) { grupo = 'areas_tecnicas'; }

        // Índice
        let indice = edificacaoNivelOrdem;

        // Preencher Campos
        document.getElementById(`span_nivel_nome_${grupo}_${indice}`).innerHTML = edificacaoNivelName;
        document.getElementById(`nivel_nome_${grupo}_${indice}`).value = edificacaoNivelName;
        document.getElementById(`nivel_area_construida_${grupo}_${indice}`).value = float2moeda(edificacaoNivelAreaConstruida);
        document.getElementById(`nivel_quantidade_medida_seguranca_${medida_seguranca_id}_${grupo}_${indice}`).value = edificacaoMedidaSegurancaQuantidade;
    });

    // Atualizar máscaras se necessário
    if (typeof putMask === 'function') putMask();
}

function readonlyEdificacaoNiveis(readonly = true) {
    const grupos = ['pavimentos', 'mezaninos', 'coberturas', 'areas_tecnicas'];
    const maxNiveis = 50;              // número máximo de níveis (ajuste se quiser)
    const maxMedidasSeguranca = 50; // ids de 1 a 50

    grupos.forEach(grupo => {
        for (let i = 0; i <= maxNiveis; i++) {

            // Campos principais de cada nível
            const campoNome = document.getElementById(`nivel_nome_${grupo}_${i}`);
            const campoArea = document.getElementById(`nivel_area_construida_${grupo}_${i}`);

            if (campoNome) campoNome.readOnly = readonly;
            if (campoArea) campoArea.readOnly = readonly;

            // Campos das Medidas Segurança (1 a 50)
            for (let id = 1; id <= maxMedidasSeguranca; id++) {
                const campoSistema = document.getElementById(`nivel_medida_seguranca_id_${id}_${grupo}_${i}`);
                const campoQuantidade = document.getElementById(`nivel_quantidade_medida_seguranca_${id}_${grupo}_${i}`);

                if (campoSistema) campoSistema.readOnly = readonly;
                if (campoQuantidade) campoQuantidade.readOnly = readonly;
            }
        }
    });
}

function edificacaoClassificacaoCampos() {
    // edificacao_classificacao_id
    const edificacao_classificacao_id = document.getElementById('edificacao_classificacao_id');

    // Dados
    const definicao = edificacao_classificacao_id.options[edificacao_classificacao_id.selectedIndex].dataset.definicao;
    const grupo = edificacao_classificacao_id.options[edificacao_classificacao_id.selectedIndex].dataset.grupo;
    const ocupacao_uso = edificacao_classificacao_id.options[edificacao_classificacao_id.selectedIndex].dataset.ocupacao_uso;
    const divisao = edificacao_classificacao_id.options[edificacao_classificacao_id.selectedIndex].dataset.divisao;
    const descricao = edificacao_classificacao_id.options[edificacao_classificacao_id.selectedIndex].dataset.descricao;

    // Campos
    document.getElementById('definicao').value = definicao;
    document.getElementById('grupo').value = grupo;
    document.getElementById('ocupacao_uso').value = ocupacao_uso;
    document.getElementById('divisao').value = divisao;
    document.getElementById('descricao').value = descricao;
}

document.addEventListener('DOMContentLoaded', function (event) {
    // Buscar dados do Cliente escolhido
    document.getElementById('cliente_id').addEventListener('change', function () {
        if (document.getElementById('cliente_id').value == '') {
            // Inputs
            document.getElementById('cliente_nome').value = '';
            document.getElementById('cliente_telefone').value = '';
            document.getElementById('cliente_celular').value = '';
            document.getElementById('cliente_email').value = '';
            document.getElementById('cliente_logradouro').value = '';
            document.getElementById('cliente_bairro').value = '';
            document.getElementById('cliente_cidade').value = '';
        } else {
            var cliente_id = document.getElementById('cliente_id').value;

            // Route: clientes/id
            fetch('clientes/' + cliente_id, {
                method: 'GET',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                var cliente = data.success;

                // Telefone
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
                document.getElementById('cliente_nome').value = cliente.name;
                document.getElementById('cliente_telefone').value = telefone;
                document.getElementById('cliente_celular').value = celular;
                document.getElementById('cliente_email').value = cliente.email;
                document.getElementById('cliente_logradouro').value = cliente.logradouro;
                document.getElementById('cliente_bairro').value = cliente.bairro;
                document.getElementById('cliente_cidade').value = cliente.localidade;
            }).catch(error => {
                alert('Erro EdificaçõesCliente:' + error);
            });


        }
    });
});

