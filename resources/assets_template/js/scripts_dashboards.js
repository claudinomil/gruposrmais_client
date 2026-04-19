async function prepararContainers(grafico_grupo_id=0) {
    try {
        const response = await fetch(`dashboards/graficos/${grafico_grupo_id}`, {
            method: "GET",
            headers: { "REQUEST-ORIGIN": "fetch" },
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados (${response.status})`);
        }

        const dados = await response.json();

        // containerControleGrupos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        const grafico_grupos = dados.grafico_grupos;

        const containerControleGrupos = document.getElementById("containerControleGrupos");
        containerControleGrupos.innerHTML = "";

        let dropdownGrupos = `<div class="dropdown">
                                        <button type="button" class="btn btn-light col-12" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="mdi mdi-select-group font-size-18 me-1"></i> <span class="d-none d-sm-inline-block">Grupos <i class="mdi mdi-chevron-down"></i></span></button>
                                        <div class="dropdown-menu col-12 text-center">`;

        grafico_grupos.forEach((c) => {
            dropdownGrupos += `<a class="dropdown-item" href="#" onclick="prepararContainers(${c.id})">${c.name}</a>`;
        });

        dropdownGrupos += `<div class="dropdown-divider"></div>`;

        dropdownGrupos += `<a class="dropdown-item" href="#" onclick="prepararContainers(0)">Mostrar todos</a>`;

        dropdownGrupos += `     </div>
                                    </div>`;

        containerControleGrupos.innerHTML = dropdownGrupos;
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        // containerControleGraficos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        const grupo_graficos = dados.grupo_graficos;

        const containerControleGraficos = document.getElementById("containerControleGraficos");
        containerControleGraficos.innerHTML = "";

        // Ordenar
        grupo_graficos.sort(
            (a, b) =>
                a.grafico_ordem_visualizacao - b.grafico_ordem_visualizacao,
        );

        grupo_graficos.forEach((g) => {
            const row = document.createElement("div");
            row.className = "mb-2";

            row.innerHTML = `
                <div class="row align-items-center">
                    <div class="col-7">
                        <input type="checkbox" class="form-check-input grafico-check" id="check_${g.grafico_id}" data-id="${g.grafico_id}" data-name="${g.grafico_name}" checked>
                        <span class="small">${g.grafico_name}</span>
                    </div>
                    <div class="col-3">
                        <select class="form-select form-select-sm" id="tipo_${g.grafico_id}">
                            <option value="1" ${g.grafico_tipo == 1 ? "selected" : ""}>Pizza</option>
                            <option value="2" ${g.grafico_tipo == 2 ? "selected" : ""}>Barra</option>
                        </select>
                    </div>
                    <div class="col-2">
                        <button class="btn btn-sm btn-success" onclick="gerarGraficoUnico(${g.grafico_id})">Gerar</button>
                    </div>
                </div>
            `;

            containerControleGraficos.appendChild(row);
        });
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        // containerGraficos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        const containerGraficos = document.getElementById('containerGraficos');

        containerGraficos.innerHTML = "";

        grupo_graficos.forEach((g) => {
            el = document.createElement('div');
            el.id = `dashboard_grafico_${g.grafico_id}`;
            el.className = 'col-12 col-md-4 p-0 p-2';
            el.style.height = '350px';

            containerGraficos.appendChild(el);
        });
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    } catch (erro) {
        console.error("Erro prepararContainers:", erro);
    } finally {
        // criarBotaoControle
        await criarBotaoControle();

        // Gerar Gráficos Selecionados
        await gerarGraficosSelecionados();
    }
}

function alternarTodos(status) {
    document.querySelectorAll('.grafico-check').forEach(check => {
        check.checked = status;
    });
}

async function criarBotaoControle() {
    const divBreadcrumbRight = document.getElementById('divBreadcrumbRight');
    const canvas = document.getElementById('containerControle');

    // cria instância do offcanvas
    const offcanvas = new bootstrap.Offcanvas(canvas);

    // cria botão
    const botao = document.createElement('button');

    botao.type = 'button';
    botao.className = 'btn btn-sm btn-warning';
    botao.textContent = 'Controle';

    // adiciona no divBreadcrumbRight
    divBreadcrumbRight.innerHTML = '';
    divBreadcrumbRight.appendChild(botao);

    // controla abrir/fechar
    botao.addEventListener('click', () => {
        offcanvas.show();
    });
}

async function gerarGraficoUnico(id) {
    const check = document.getElementById(`check_${id}`);

    const container_grafico = document.getElementById(`dashboard_grafico_${id}`);

    if (!check.checked) {
        if (container_grafico) container_grafico.style.display = 'none';
        return;
    } else {
        container_grafico.style.display = '';
    }

    const nome = check.dataset.name;
    const tipo = parseInt(document.getElementById(`tipo_${id}`).value);

    const fn = await window['dashboard_grafico_' + id];

    if (typeof fn === 'function') {
        await fn(id, nome, tipo);
    }
}

async function gerarGraficosSelecionados() {
    const checks = document.querySelectorAll('.grafico-check');

    for (const check of checks) {
        const id = check.dataset.id;

        if (check.checked) {
            await gerarGraficoUnico(id);
        } else {
            const el = document.getElementById(`dashboard_grafico_${id}`);
            if (el) el.style.display = 'none';
        }
    }
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
        lojas_ocupadas: [],
        lojas_desocupadas: [],
        lojas_total: []
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
        { name: 'Lojas Ocupadas', value: graficoData.lojas_ocupadas },
        { name: 'Lojas Desocupadas', value: graficoData.lojas_desocupadas }
    ];

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.lojas_total+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.lojas_total+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_16(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        documentos_exigidos_pendentes: [],
        documentos_exigidos_concluidos: [],
        documentos_exigidos_total: []
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
        { name: 'Documentos Pendentes', value: graficoData.documentos_exigidos_pendentes },
        { name: 'Documentos Concluídos', value: graficoData.documentos_exigidos_concluidos }
    ];

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.documentos_exigidos_total+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.documentos_exigidos_total+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4 p-0 p-2', heightDivGrafico:350});
    } else {}
}
// Funções para chamada dos Gráficos com nome dashboard_grafico_id - Fim'''''''''''''''''''''''''''''''
// Funções para chamada dos Gráficos com nome dashboard_grafico_id - Fim'''''''''''''''''''''''''''''''

async function dashboardsChartPieSimple({id='', titleText='', titleSubText='', legenda='bottom', dados=[], graficoId=0, graficoName='', graficoTipo=0, classDivGrafico='col-12 col-md-4', heightDivGrafico=350}) {
    if (id == '') { return; }

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

document.addEventListener("DOMContentLoaded", async function () {
    // Preparar Containers
    await prepararContainers(1);
});
