async function dashboardCanvas() {
    try {
        const response = await fetch('dashboards/graficos', {
            method: 'GET',
            headers: { 'REQUEST-ORIGIN': 'fetch' },
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados (${response.status})`);
        }

        const dados = await response.json();
        const grupos = dados.grupos_graficos;

        const container = document.getElementById('dashboardCanvasContent');
        container.innerHTML = '';

        // Ordenar
        grupos.sort((a, b) => a.grafico_ordem_visualizacao - b.grafico_ordem_visualizacao);

        grupos.forEach(g => {
            const row = document.createElement('div');
            row.className = 'mb-2';

            row.innerHTML = `
                <div class="row align-items-center">
                    <div class="col-7">
                        <input type="checkbox" class="form-check-input grafico-check" id="check_${g.grafico_id}" data-id="${g.grafico_id}" data-name="${g.grafico_name}" checked>
                        <span class="small">${g.grafico_name}</span>
                    </div>
                    <div class="col-3">
                        <select class="form-select form-select-sm" id="tipo_${g.grafico_id}">
                            <option value="1" ${g.grafico_tipo == 1 ? 'selected' : ''}>Pizza</option>
                            <option value="2" ${g.grafico_tipo == 2 ? 'selected' : ''}>Barra</option>
                        </select>
                    </div>
                    <div class="col-2">
                        <button class="btn btn-sm btn-success" onclick="dashboardGerarUnico(${g.grafico_id})">Gerar</button>
                    </div>
                </div>
            `;

            container.appendChild(row);
        });

    } catch (erro) {
        console.error('Erro ao carregar gráfico:', erro);
    }
}

async function dashboardGerarUnico(id) {
    const check = document.getElementById(`check_${id}`);

    const el = document.getElementById(`dashboard_grafico_${id}`);

    if (!check.checked) {
        if (el) el.style.display = 'none';
        return;
    }

    const nome = check.dataset.name;
    const tipo = parseInt(document.getElementById(`tipo_${id}`).value);

    const fn = await window['dashboard_grafico_' + id];

    if (typeof fn === 'function') {
        fn(id, nome, tipo);
    }
}

function dashboardGerarSelecionados() {
    document.querySelectorAll('.grafico-check').forEach(check => {
        const id = check.dataset.id;

        if (check.checked) {
            dashboardGerarUnico(id);
        } else {
            const el = document.getElementById(`dashboard_grafico_${id}`);
            if (el) el.style.display = 'none';
        }
    });
}

function dashboardToggleAll(status) {
    document.querySelectorAll('.grafico-check').forEach(check => {
        check.checked = status;
    });
}

function garantirContainerGrafico(id, classDiv, height) {
    let el = document.getElementById(`dashboard_grafico_${id}`);

    if (!el) {
        const container = document.getElementById('divGraficos');

        el = document.createElement('div');
        el.id = `dashboard_grafico_${id}`;
        el.className = classDiv || 'col-12 col-md-4 p-0 p-2';
        el.style.height = height ? height + 'px' : '350px';

        container.appendChild(el);
    }

    // sempre garante visível ao gerar
    el.style.display = '';

    return el;
}

// Funções para chamada dos Gráficos com nome dashboard_grafico_id - Início''''''''''''''''''''''''''''
// Funções para chamada dos Gráficos com nome dashboard_grafico_id - Início''''''''''''''''''''''''''''
async function dashboard_grafico_1(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        usuarios_quantidade: [],
        usuarios_grupos: []
    };

    const response = await fetch('dashboards/grafico/dados/'+grafico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    const dados = await response.json();

    // Atualiza apenas os campos existentes
    for (const key in graficoData) {
        if (Object.hasOwn(dados, key)) {
            graficoData[key] = dados[key];
        }
    }

    // Dados Gráfico
    const dados_grafico = graficoData.usuarios_grupos.map(item => ({
        name: primeiraMaiuscula(item.name),
        value: item.quantidade
    }));

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.usuarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.usuarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_2(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        usuarios_quantidade: [],
        usuarios_situacoes: []
    };

    const response = await fetch('dashboards/grafico/dados/'+grafico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    const dados = await response.json();

    // Atualiza apenas os campos existentes
    for (const key in graficoData) {
        if (Object.hasOwn(dados, key)) {
            graficoData[key] = dados[key];
        }
    }

    // Dados Gráfico
    const dados_grafico = graficoData.usuarios_situacoes.map(item => ({
        name: primeiraMaiuscula(item.name),
        value: item.quantidade
    }));

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.usuarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.usuarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_3(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        funcionarios_quantidade: [],
        funcionarios_contratacoes: []
    };

    const response = await fetch('dashboards/grafico/dados/'+grafico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    const dados = await response.json();

    // Atualiza apenas os campos existentes
    for (const key in graficoData) {
        if (Object.hasOwn(dados, key)) {
            graficoData[key] = dados[key];
        }
    }

    // Dados Gráfico
    const dados_grafico = graficoData.funcionarios_contratacoes.map(item => ({
        name: primeiraMaiuscula(item.name),
        value: item.quantidade
    }));

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_4(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        funcionarios_quantidade: [],
        funcionarios_funcoes: []
    };

    const response = await fetch('dashboards/grafico/dados/'+grafico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    const dados = await response.json();

    // Atualiza apenas os campos existentes
    for (const key in graficoData) {
        if (Object.hasOwn(dados, key)) {
            graficoData[key] = dados[key];
        }
    }

    // Dados Gráfico
    const dados_grafico = graficoData.funcionarios_funcoes.map(item => ({
        name: primeiraMaiuscula(item.name),
        value: item.quantidade
    }));

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_5(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        funcionarios_quantidade: [],
        funcionarios_generos: []
    };

    const response = await fetch('dashboards/grafico/dados/'+grafico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    const dados = await response.json();

    // Atualiza apenas os campos existentes
    for (const key in graficoData) {
        if (Object.hasOwn(dados, key)) {
            graficoData[key] = dados[key];
        }
    }

    // Dados Gráfico
    const dados_grafico = graficoData.funcionarios_generos.map(item => ({
        name: primeiraMaiuscula(item.name),
        value: item.quantidade
    }));

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_6(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        clientes_quantidade: [],
        clientes_status: []
    };

    const response = await fetch('dashboards/grafico/dados/'+grafico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    const dados = await response.json();

    // Atualiza apenas os campos existentes
    for (const key in graficoData) {
        if (Object.hasOwn(dados, key)) {
            graficoData[key] = dados[key];
        }
    }

    // Dados Gráfico
    const dados_grafico = graficoData.clientes_status.map(item => ({
        name: primeiraMaiuscula(item.name),
        value: item.quantidade
    }));

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.clientes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.clientes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_7(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        clientes_quantidade: [],
        clientes_tipos: []
    };

    const response = await fetch('dashboards/grafico/dados/'+grafico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    const dados = await response.json();

    // Atualiza apenas os campos existentes
    for (const key in graficoData) {
        if (Object.hasOwn(dados, key)) {
            graficoData[key] = dados[key];
        }
    }

    // Dados Gráfico
    const dados_grafico = graficoData.clientes_tipos.map(item => ({
        name: primeiraMaiuscula(item.name),
        value: item.quantidade
    }));

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.clientes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.clientes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_8(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        transacoes_quantidade: [],
        transacoes_operacoes: []
    };

    const response = await fetch('dashboards/grafico/dados/'+grafico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    const dados = await response.json();

    // Atualiza apenas os campos existentes
    for (const key in graficoData) {
        if (Object.hasOwn(dados, key)) {
            graficoData[key] = dados[key];
        }
    }

    // Dados Gráfico
    const dados_grafico = graficoData.transacoes_operacoes.map(item => ({
        name: primeiraMaiuscula(item.name),
        value: item.quantidade
    }));

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.transacoes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.transacoes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_9(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        transacoes_quantidade: [],
        transacoes_submodulos: []
    };

    const response = await fetch('dashboards/grafico/dados/'+grafico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    const dados = await response.json();

    // Atualiza apenas os campos existentes
    for (const key in graficoData) {
        if (Object.hasOwn(dados, key)) {
            graficoData[key] = dados[key];
        }
    }

    // Dados Gráfico
    const dados_grafico = graficoData.transacoes_submodulos.map(item => ({
        name: primeiraMaiuscula(item.name),
        value: item.quantidade
    }));

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.transacoes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.transacoes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_10(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        operacoes_propostas_quantidade: [],
        operacoes_brigadas_incendios_quantidade: [],
        operacoes_visitas_tecnicas_quantidade: [],
        operacoes_ordens_servicos_quantidade: [],
        operacoes_total_quantidade: []
    };

    const response = await fetch('dashboards/grafico/dados/'+grafico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    const dados = await response.json();

    // Atualiza apenas os campos existentes
    for (const key in graficoData) {
        if (Object.hasOwn(dados, key)) {
            graficoData[key] = dados[key];
        }
    }

    // Dados Gráfico
    const dados_grafico = [
        { name: 'Propostas', value: graficoData.operacoes_propostas_quantidade },
        { name: 'Brigadas Incêndios', value: graficoData.operacoes_brigadas_incendios_quantidade },
        { name: 'Visitas Técnicas', value: graficoData.operacoes_visitas_tecnicas_quantidade },
        { name: 'Ordens Serviços', value: graficoData.operacoes_ordens_servicos_quantidade }
    ];

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.operacoes_total_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.operacoes_total_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_11(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        funcionarios_quantidade: [],
        funcionarios_contratacoes: []
    };

    const response = await fetch('dashboards/grafico/dados/'+grafico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    const dados = await response.json();

    // Atualiza apenas os campos existentes
    for (const key in graficoData) {
        if (Object.hasOwn(dados, key)) {
            graficoData[key] = dados[key];
        }
    }

    // Dados Gráfico
    const dados_grafico = graficoData.funcionarios_contratacoes.map(item => ({
        name: primeiraMaiuscula(item.name),
        value: item.quantidade
    }));

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_12(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        funcionarios_quantidade: [],
        funcionarios_funcoes: []
    };

    const response = await fetch('dashboards/grafico/dados/'+grafico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    const dados = await response.json();

    // Atualiza apenas os campos existentes
    for (const key in graficoData) {
        if (Object.hasOwn(dados, key)) {
            graficoData[key] = dados[key];
        }
    }

    // Dados Gráfico
    const dados_grafico = graficoData.funcionarios_funcoes.map(item => ({
        name: primeiraMaiuscula(item.name),
        value: item.quantidade
    }));

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_13(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        funcionarios_quantidade: [],
        funcionarios_generos: []
    };

    const response = await fetch('dashboards/grafico/dados/'+grafico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    const dados = await response.json();

    // Atualiza apenas os campos existentes
    for (const key in graficoData) {
        if (Object.hasOwn(dados, key)) {
            graficoData[key] = dados[key];
        }
    }

    // Dados Gráfico
    const dados_grafico = graficoData.funcionarios_generos.map(item => ({
        name: primeiraMaiuscula(item.name),
        value: item.quantidade
    }));

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_14(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        operacoes_propostas_quantidade: [],
        operacoes_brigadas_incendios_quantidade: [],
        operacoes_visitas_tecnicas_quantidade: [],
        operacoes_ordens_servicos_quantidade: [],
        operacoes_total_quantidade: []
    };

    const response = await fetch('dashboards/grafico/dados/'+grafico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    const dados = await response.json();

    // Atualiza apenas os campos existentes
    for (const key in graficoData) {
        if (Object.hasOwn(dados, key)) {
            graficoData[key] = dados[key];
        }
    }

    // Dados Gráfico
    const dados_grafico = [
        { name: 'Propostas', value: graficoData.operacoes_propostas_quantidade },
        { name: 'Brigadas Incêndios', value: graficoData.operacoes_brigadas_incendios_quantidade },
        { name: 'Visitas Técnicas', value: graficoData.operacoes_visitas_tecnicas_quantidade },
        { name: 'Ordens Serviços', value: graficoData.operacoes_ordens_servicos_quantidade }
    ];

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.operacoes_total_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.operacoes_total_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_15(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        operacoes_propostas_quantidade: [],
        operacoes_brigadas_incendios_quantidade: [],
        operacoes_visitas_tecnicas_quantidade: [],
        operacoes_ordens_servicos_quantidade: [],
        operacoes_total_quantidade: []
    };

    const response = await fetch('dashboards/grafico/dados/'+grafico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    const dados = await response.json();

    // Atualiza apenas os campos existentes
    for (const key in graficoData) {
        if (Object.hasOwn(dados, key)) {
            graficoData[key] = dados[key];
        }
    }

    // Dados Gráfico
    const dados_grafico = [
        { name: 'Propostas', value: graficoData.operacoes_propostas_quantidade },
        { name: 'Brigadas Incêndios', value: graficoData.operacoes_brigadas_incendios_quantidade },
        { name: 'Visitas Técnicas', value: graficoData.operacoes_visitas_tecnicas_quantidade },
        { name: 'Ordens Serviços', value: graficoData.operacoes_ordens_servicos_quantidade }
    ];

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.operacoes_total_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.operacoes_total_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_16(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        operacoes_propostas_quantidade: [],
        operacoes_brigadas_incendios_quantidade: [],
        operacoes_visitas_tecnicas_quantidade: [],
        operacoes_ordens_servicos_quantidade: [],
        operacoes_total_quantidade: []
    };

    const response = await fetch('dashboards/grafico/dados/'+grafico_id, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    });

    const dados = await response.json();

    // Atualiza apenas os campos existentes
    for (const key in graficoData) {
        if (Object.hasOwn(dados, key)) {
            graficoData[key] = dados[key];
        }
    }

    // Dados Gráfico
    const dados_grafico = [
        { name: 'Propostas', value: graficoData.operacoes_propostas_quantidade },
        { name: 'Brigadas Incêndios', value: graficoData.operacoes_brigadas_incendios_quantidade },
        { name: 'Visitas Técnicas', value: graficoData.operacoes_visitas_tecnicas_quantidade },
        { name: 'Ordens Serviços', value: graficoData.operacoes_ordens_servicos_quantidade }
    ];

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.operacoes_total_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.operacoes_total_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}
// Funções para chamada dos Gráficos com nome dashboard_grafico_id - Fim'''''''''''''''''''''''''''''''
// Funções para chamada dos Gráficos com nome dashboard_grafico_id - Fim'''''''''''''''''''''''''''''''

async function dashboardsChartPieSimple({id='', titleText='', titleSubText='', legenda='bottom', dados=[], graficoId=0, graficoName='', graficoTipo=0, classDivGrafico='col-12 col-md-4', heightDivGrafico=350}) {
    if (id == '') { return; }

    const el = garantirContainerGrafico(graficoId, classDivGrafico, heightDivGrafico);

    // Verificar se precisa criar elemento div no DOM para renderizar gráfico
    if (!document.getElementById(id)) {
        // Criando div no DOM para renderizar gráfico
        const col = document.createElement("div");
        col.className = classDivGrafico;
        col.innerHTML = `<div class="card"><div class="card-body p-0 p-2" style="height: ${heightDivGrafico}px;" id="${id}"></div></div>`;
        document.getElementById('divGraficos').appendChild(col);
    }

    // Chart
    var chartDom = document.getElementById(id);

    // Se já existe um gráfico nesse elemento, destruir
    if (echarts.getInstanceByDom(chartDom)) {echarts.dispose(chartDom);}

    // Iniciar
    var myChart = echarts.init(chartDom);

    // Opções
    var option;

    // Legenda: legenda (string) -> 'top' | 'bottom' | 'left' | 'right' '''''''''''''''''''''

    // valores padrão (fallback)
    var legendConfig = {
        top: 0,
        left: 'center',
        orient: 'horizontal'
    };

    // ajuste do centro do gráfico para evitar sobreposição com a legenda
    var seriesCenter = ['50%', '50%']; // padrão

    // Mapeamento do parâmetro `legenda`
    switch ((legenda || '').toLowerCase()) {
        case 'top':
            // → Coloca a legenda no topo, ao centro
            legendConfig = { top: 0, left: 'center', orient: 'horizontal' };
            // → move o gráfico um pouco para baixo (para não encostar na legenda)
            seriesCenter = ['50%', '55%'];
            break;

        case 'bottom':
            // → Coloca a legenda no rodapé, ao centro
            legendConfig = { bottom: 0, left: 'center', orient: 'horizontal' };
            // → move o gráfico um pouco para cima (para abrir espaço no rodapé)
            seriesCenter = ['50%', '45%'];
            break;

        case 'left':
            // → Legenda vertical à esquerda, centralizada verticalmente
            legendConfig = { orient: 'vertical', left: 10, top: 'center' };
            // → move o gráfico para a direita para abrir espaço para a legenda
            seriesCenter = ['55%', '50%'];
            break;

        case 'right':
            // → Legenda vertical à direita, centralizada verticalmente
            legendConfig = { orient: 'vertical', right: 10, top: 'center' };
            // → move o gráfico para a esquerda para abrir espaço para a legenda
            seriesCenter = ['35%', '50%'];
            break;

        default:
            // → valor inválido ou vazio: legenda top-center (comportamento padrão)
            legendConfig = { top: 0, left: 'center', orient: 'horizontal' };
            seriesCenter = ['50%', '55%'];
            break;
    }
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Title'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    titleConfig = {title: {show: false}};

    if (titleText != '') {
        titleConfig = {title: {text: titleText, subtext: titleSubText, left: 'center'}};
    }
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Monta option usando as configurações calculadas
    option = {
        textStyle: {fontSize: 10},
        ...titleConfig,
        backgroundColor: '#ffffff',
        toolbox: {
            orient: 'vertical',
            right: -10,
            top: 0,
            feature: {
                myConfig: {
                    show: true,
                    title: 'Configurações',
                    icon: 'path://M487.4 315.7l-42.6-24.6a193.5 193.5 0 0 0-14.6-35.4l24.1-41.7a16 16 0 0 0-2.7-19.4l-45.3-45.3a16 16 0 0 0-19.4-2.7l-41.7 24.1a193.5 193.5 0 0 0-35.4-14.6l-6.5-48.9A16 16 0 0 0 288 96h-64a16 16 0 0 0-15.9 13.5l-6.5 48.9a193.5 193.5 0 0 0-35.4 14.6l-41.7-24.1a16 16 0 0 0-19.4 2.7L60 196.9a16 16 0 0 0-2.7 19.4l24.1 41.7a193.5 193.5 0 0 0-14.6 35.4l-48.9 6.5A16 16 0 0 0 0 320v64a16 16 0 0 0 13.5 15.9l48.9 6.5a193.5 193.5 0 0 0 14.6 35.4l-24.1 41.7a16 16 0 0 0 2.7 19.4l45.3 45.3a16 16 0 0 0 19.4 2.7l41.7-24.1a193.5 193.5 0 0 0 35.4 14.6l6.5 48.9A16 16 0 0 0 224 608h64a16 16 0 0 0 15.9-13.5l6.5-48.9a193.5 193.5 0 0 0 35.4-14.6l41.7 24.1a16 16 0 0 0 19.4-2.7l45.3-45.3a16 16 0 0 0 2.7-19.4l-24.1-41.7a193.5 193.5 0 0 0 14.6-35.4l48.9-6.5A16 16 0 0 0 512 384v-64a16 16 0 0 0-13.5-15.9zM256 416a96 96 0 1 1 0-192 96 96 0 0 1 0 192z',
                    onclick: function () {
                        const canvas = document.getElementById('dashboardCanvas');
                        const offcanvas = new bootstrap.Offcanvas(canvas);
                        offcanvas.show();
                    }
                },
                saveAsImage: { title: 'Save Image' }
            }
        },
        tooltip: {
            trigger: 'item',
            textStyle: {fontSize: 10}
        },
        legend: {
            // Aplica a configuração resultante da switch acima
            ...legendConfig,
            textStyle: {fontSize: 10}
        },
        series: [
            {
                type: 'pie',
                radius: '40%',
                center: seriesCenter,
                data: dados,
                emphasis: {
                    itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // Aplica a configuração ao gráfico
    option && myChart.setOption(option);
}

async function dashboardsChartBarSimple({id='', titleText='', titleSubText='', dados=[], graficoId=0, graficoName='', graficoTipo=0, classDivGrafico='col-12 col-md-4', heightDivGrafico=350}) {
    if (id == '') { return; }

    const el = garantirContainerGrafico(graficoId, classDivGrafico, heightDivGrafico);

    // Verificar se precisa criar elemento div no DOM para renderizar gráfico
    // if (!document.getElementById(id)) {
    //     // Criando div no DOM para renderizar gráfico
    //     const col = document.createElement("div");
    //     col.className = classDivGrafico;
    //     col.innerHTML = `<div class="card"><div class="card-body p-0 p-2" style="height: ${heightDivGrafico}px;" id="${id}"></div></div>`;
    //     document.getElementById('divGraficos').appendChild(col);
    // }

    // Chart
    var chartDom = document.getElementById(id);

    // Se já existe um gráfico nesse elemento, destruir
    if (echarts.getInstanceByDom(chartDom)) {echarts.dispose(chartDom);}

    // Iniciar
    var myChart = echarts.init(chartDom);

    // Opções
    var option;

    // Title'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    titleConfig = {title: {show: false}};

    if (titleText != '') {
        titleConfig = {title: {text: titleText, subtext: titleSubText, left: 'center'}};
    }
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Monta option usando as configurações calculadas
    option = {
        textStyle: {fontSize: 10},
        ...titleConfig,
        backgroundColor: '#ffffff',
        toolbox: {
            orient: 'vertical',
            right: -10,
            top: 0,
            feature: {
                myConfig: {
                    show: true,
                    title: 'Configurações',
                    icon: 'path://M487.4 315.7l-42.6-24.6a193.5 193.5 0 0 0-14.6-35.4l24.1-41.7a16 16 0 0 0-2.7-19.4l-45.3-45.3a16 16 0 0 0-19.4-2.7l-41.7 24.1a193.5 193.5 0 0 0-35.4-14.6l-6.5-48.9A16 16 0 0 0 288 96h-64a16 16 0 0 0-15.9 13.5l-6.5 48.9a193.5 193.5 0 0 0-35.4 14.6l-41.7-24.1a16 16 0 0 0-19.4 2.7L60 196.9a16 16 0 0 0-2.7 19.4l24.1 41.7a193.5 193.5 0 0 0-14.6 35.4l-48.9 6.5A16 16 0 0 0 0 320v64a16 16 0 0 0 13.5 15.9l48.9 6.5a193.5 193.5 0 0 0 14.6 35.4l-24.1 41.7a16 16 0 0 0 2.7 19.4l45.3 45.3a16 16 0 0 0 19.4 2.7l41.7-24.1a193.5 193.5 0 0 0 35.4 14.6l6.5 48.9A16 16 0 0 0 224 608h64a16 16 0 0 0 15.9-13.5l6.5-48.9a193.5 193.5 0 0 0 35.4-14.6l41.7 24.1a16 16 0 0 0 19.4-2.7l45.3-45.3a16 16 0 0 0 2.7-19.4l-24.1-41.7a193.5 193.5 0 0 0 14.6-35.4l48.9-6.5A16 16 0 0 0 512 384v-64a16 16 0 0 0-13.5-15.9zM256 416a96 96 0 1 1 0-192 96 96 0 0 1 0 192z',
                    onclick: function () {
                        const canvas = document.getElementById('dashboardCanvas');
                        const offcanvas = new bootstrap.Offcanvas(canvas);
                        offcanvas.show();
                    }
                },
                saveAsImage: { title: 'Save Image' }
            }
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {fontSize: 10},
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
            type: 'category',
            data: dados.map(item => item.name),
            axisTick: {
                alignWithLabel: true
            }
            }
        ],
        yAxis: [
            {
            type: 'value'
            }
        ],
        series: [
            {
                //name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: dados.map(item => item.value)
            }
        ]
        };

        // Aplica a configuração ao gráfico
    option && myChart.setOption(option);
}

document.addEventListener('DOMContentLoaded', async function () {
    // Montar Canvas
    await dashboardCanvas();

    // Gerar Gráficos Selecionados
    dashboardGerarSelecionados();
});
