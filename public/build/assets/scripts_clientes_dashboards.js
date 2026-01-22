async function dashboard_graficos() {
    // Buscar dados
    try {
        const response = await fetch('clientes_dashboards/graficos', {
            method: 'GET',
            headers: { 'REQUEST-ORIGIN': 'fetch' },
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados (${response.status})`);
        }

        const dados = await response.json();
        const grupos_graficos = dados.grupos_graficos;

        // Varrer
        for (const grupo_grafico of grupos_graficos) {
            const grafico_id = grupo_grafico.grafico_id;
            const grafico_name = grupo_grafico.grafico_name;
            const grafico_tipo = grupo_grafico.grafico_tipo;
            const funcName = `dashboard_grafico_${grafico_id}`;

            if (typeof window[funcName] === 'function') {
                await window[funcName](grafico_id, grafico_name, grafico_tipo);
            }
        }
    } catch (erro) {
        console.error('Erro ao carregar gráfico:', erro);
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

    const response = await fetch('clientes_dashboards/grafico/dados/'+grafico_id, {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_1', titleText:grafico_name, titleSubText:graficoData.usuarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_1', titleText:grafico_name, titleSubText:graficoData.usuarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_2(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        usuarios_quantidade: [],
        usuarios_situacoes: []
    };

    const response = await fetch('clientes_dashboards/grafico/dados/'+grafico_id, {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_2', titleText:grafico_name, titleSubText:graficoData.usuarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_2', titleText:grafico_name, titleSubText:graficoData.usuarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_3(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        funcionarios_quantidade: [],
        funcionarios_contratacoes: []
    };

    const response = await fetch('clientes_dashboards/grafico/dados/'+grafico_id, {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_3', titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_3', titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_4(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        funcionarios_quantidade: [],
        funcionarios_funcoes: []
    };

    const response = await fetch('clientes_dashboards/grafico/dados/'+grafico_id, {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_4', titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_4', titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_5(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        funcionarios_quantidade: [],
        funcionarios_generos: []
    };

    const response = await fetch('clientes_dashboards/grafico/dados/'+grafico_id, {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_5', titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_5', titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_6(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        clientes_quantidade: [],
        clientes_status: []
    };

    const response = await fetch('clientes_dashboards/grafico/dados/'+grafico_id, {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_6', titleText:grafico_name, titleSubText:graficoData.clientes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_6', titleText:grafico_name, titleSubText:graficoData.clientes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_7(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        clientes_quantidade: [],
        clientes_tipos: []
    };

    const response = await fetch('clientes_dashboards/grafico/dados/'+grafico_id, {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_7', titleText:grafico_name, titleSubText:graficoData.clientes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_7', titleText:grafico_name, titleSubText:graficoData.clientes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_8(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        transacoes_quantidade: [],
        transacoes_operacoes: []
    };

    const response = await fetch('clientes_dashboards/grafico/dados/'+grafico_id, {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_8', titleText:grafico_name, titleSubText:graficoData.transacoes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_8', titleText:grafico_name, titleSubText:graficoData.transacoes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else {}
}

async function dashboard_grafico_9(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        transacoes_quantidade: [],
        transacoes_submodulos: []
    };

    const response = await fetch('clientes_dashboards/grafico/dados/'+grafico_id, {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_9', titleText:grafico_name, titleSubText:graficoData.transacoes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_9', titleText:grafico_name, titleSubText:graficoData.transacoes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
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

    const response = await fetch('clientes_dashboards/grafico/dados/'+grafico_id, {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_10', titleText:grafico_name, titleSubText:graficoData.operacoes_total_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_10', titleText:grafico_name, titleSubText:graficoData.operacoes_total_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name, graficoTipo:grafico_tipo, classDivGrafico:'col-12 col-md-4', heightDivGrafico:350});
    } else {}
}
// Funções para chamada dos Gráficos com nome dashboard_grafico_id - Fim'''''''''''''''''''''''''''''''
// Funções para chamada dos Gráficos com nome dashboard_grafico_id - Fim'''''''''''''''''''''''''''''''

async function dashboardsChartPieSimple({id='', titleText='', titleSubText='', legenda='bottom', dados=[], graficoId=0, graficoName='', graficoTipo=0, classDivGrafico='col-12 col-md-4', heightDivGrafico=350}) {
    if (id == '') { return; }

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
        toolbox: {
            orient: 'vertical',
            right: -10,
            top: 0,
            feature: {
                myBar: {
                    show: true,
                    title: 'Bar Chart',
                    icon: 'path://M128 896h768v-64H128v64zm128-192h128V384H256v320zm192 0h128V256H448v448zm192 0h128V512H640v192z',
                    onclick: function () {
                        const fn = window[id] || window[callbackFunc];
                        if (typeof fn === 'function') {
                            fn(graficoId, graficoName, 2); // 📊 gráfico de barras
                        } else {
                            console.warn(`Função '${id}' ou '${callbackFunc}' não encontrada.`);
                        }
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
        toolbox: {
            orient: 'vertical',
            right: -10,
            top: 0,
            feature: {
                myPie: {
                    show: true,
                    title: 'Pie Chart',
                    icon: 'path://M512 64a448 448 0 1 1-317.1 765.1A448 448 0 0 1 512 64m0 64a384 384 0 1 0 271.5 112.5A383.6 383.6 0 0 0 512 128zm0 64a320 320 0 0 1 320 320H512V192z',
                    onclick: function () {
                        const fn = window[id] || window[callbackFunc];
                        if (typeof fn === 'function') {
                            fn(graficoId, graficoName, 1); // 🍕 gráfico de pizza
                        } else {
                            console.warn(`Função '${id}' ou '${callbackFunc}' não encontrada.`);
                        }
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

document.addEventListener('DOMContentLoaded', function () {
    // Gráficos
    dashboard_graficos();
});
