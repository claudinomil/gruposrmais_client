async function prepararContainers(grafico_grupo_id=0) {
    try {
        const response = await fetch(`dashboards/graficos/${grafico_grupo_id}`, {
            method: "GET",
            headers: { "REQUEST-ORIGIN": "fetch" },
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados (${response.status})`);
        }

        // Dados Retorno
        const dados = await response.json();

        // Dados Desmembrados
        const grafico_grupos = dados.grafico_grupos;
        const grupo_graficos = dados.grupo_graficos;

        // containerControleGrupos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        const containerControleGrupos = document.getElementById("containerControleGrupos");
        containerControleGrupos.innerHTML = "";

        let dropdownGrupos = `<div class="dropdown">
                                        <button type="button" class="btn btn-light text-success col-12" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="mdi mdi-select-group font-size-18 me-1"></i> <span class="d-none d-sm-inline-block">Grupos <i class="mdi mdi-chevron-down"></i></span></button>
                                        <div class="dropdown-menu col-12 text-center">`;

        grafico_grupos.forEach((gg) => {
            dropdownGrupos += `<a class="dropdown-item" href="#" onclick="prepararContainers(${gg.id})">${gg.name}</a>`;
        });

        dropdownGrupos += `<div class="dropdown-divider"></div>`;

        dropdownGrupos += `<a class="dropdown-item" href="#" onclick="prepararContainers(0)">Mostrar todos</a>`;

        dropdownGrupos += `     </div>
                                    </div>`;

        containerControleGrupos.innerHTML = dropdownGrupos;
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        // containerControleGraficos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        const containerControleGraficos = document.getElementById("containerControleGraficos");
        containerControleGraficos.innerHTML = "";

        // Ordenar
        grupo_graficos.sort(
            (a, b) =>
                a.grafico_ordem_visualizacao - b.grafico_ordem_visualizacao,
        );

        grupo_graficos.forEach((gg) => {
            const row = document.createElement("div");
            row.className = "mb-2";

            row.innerHTML = `
                <div class="row align-items-center">
                    <div class="col-7">
                        <input type="checkbox" class="form-check-input grafico-check" id="check_${gg.grafico_id}" data-id="${gg.grafico_id}" data-name="${gg.grafico_name}" checked>
                        <span class="small">${gg.grafico_name}</span>
                    </div>
                    <div class="col-3">
                        <select class="form-select form-select-sm" id="tipo_${gg.grafico_id}">
                            <option value="1" ${gg.grafico_tipo == 1 ? "selected" : ""}>Pizza</option>
                            <option value="2" ${gg.grafico_tipo == 2 ? "selected" : ""}>Barra</option>
                        </select>
                    </div>
                    <div class="col-2">
                        <button class="btn btn-sm btn-success" onclick="gerarGraficoUnico(${gg.grafico_id})">Gerar</button>
                    </div>
                </div>
            `;

            containerControleGraficos.appendChild(row);
        });
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        // containerGraficos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        const containerGraficos = document.getElementById('containerGraficos');

        containerGraficos.innerHTML = "";

        grupo_graficos.forEach((gg) => {
            let col = document.createElement('div');
            col.className = 'col-12 col-md-4';

            let el = document.createElement('div');
            el.id = `dashboard_grafico_${gg.grafico_id}`;
            el.className = 'border border-2 rounded p-2';
            el.style.height = '350px';

            col.appendChild(el);

            containerGraficos.appendChild(col);
        });
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        // containerHeader'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        const containerHeader = document.getElementById('containerHeader');
        const dash_topo_titulo = document.getElementById("dash_topo_titulo");

        dash_topo_titulo.innerHTML = 'Todos';

        grafico_grupos.forEach((gg) => {
            if (grafico_grupo_id == gg.id) {
                dash_topo_titulo.innerHTML = gg.name;
            }
        });

        // Nome do Cliente/Edificação/Edificação Nível
        if (grafico_grupo_id == 3) {
            containerHeader.classList.replace('align-items-center', 'align-items-start');

            const cliEdiEdiNivName = `<br>
                            <div class="text-primary font-size-12">
                                ${primeiraMaiuscula(clienteName.value)}
                            </div>
                            <div class="text-success font-size-11">
                                ${primeiraMaiuscula(edificacaoName.value)}
                            </div>
                            <div class="text-warning font-size-10">
                                ${primeiraMaiuscula(edificacaoNivelName.value)}
                            </div>`;

            dash_topo_titulo.insertAdjacentHTML('beforeend', cliEdiEdiNivName);
        } else {
            containerHeader.classList.replace('align-items-start', 'align-items-center');
        }
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        // containerInformacoes''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        containerInformacoes.innerHTML = '';

        await prepararContainerInformacoes(grafico_grupo_id);
        //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    } catch (erro) {
        console.error("Erro prepararContainers:", erro);
    } finally {
        // Gerar Gráficos Selecionados
        await gerarGraficosSelecionados();
    }
}

async function prepararContainerInformacoes(grafico_grupo_id = 0) {
    if (grafico_grupo_id == 0) { return; }

    try {
        const response = await fetch(`dashboards/grupo/informacoes/${grafico_grupo_id}/${clienteId.value}/${edificacaoId.value}/${edificacaoNivelId.value}`, {
            method: "GET",
            headers: { "REQUEST-ORIGIN": "fetch" },
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados (${response.status})`);
        }

        // Dados Retorno
        const dados = await response.json();

        // Se retornou dados
        if (Object.keys(dados).length > 0) {
            // Grupo: Sistema
            if (grafico_grupo_id == 1) {
                // Dados Retorno
                const usuarios_quantidade = dados?.usuarios_quantidade ?? 0;
                const funcionarios_quantidade = dados?.funcionarios_quantidade ?? 0;
                const clientes_quantidade = dados?.clientes_quantidade ?? 0;
                const transacoes_quantidade = dados?.transacoes_quantidade ?? 0;

                // Usuários Quantidade'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var informacaoValor = usuarios_quantidade;

                backGround = 'success';
                avatarCor = 'success';
                avatarIcone = 'mdi mdi-account';
                informacaoPrincipal = 'Usuários';
                informacaoValor = informacaoValor;
                informacaoValorCor = 'dark';
                informacaoDescricao = '';

                await dashboardsChartInfo1({ backGround: backGround, avatarCor: avatarCor, avatarIcone: avatarIcone, informacaoPrincipal: informacaoPrincipal, informacaoValor: informacaoValor, informacaoValorCor: informacaoValorCor, informacaoDescricao: informacaoDescricao });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Funcionários Quantidade'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var informacaoValor = funcionarios_quantidade;

                backGround = 'primary';
                avatarCor = 'primary';
                avatarIcone = 'mdi mdi-account-hard-hat';
                informacaoPrincipal = 'Funcionários';
                informacaoValor = informacaoValor;
                informacaoValorCor = 'dark';
                informacaoDescricao = '';

                await dashboardsChartInfo1({ backGround: backGround, avatarCor: avatarCor, avatarIcone: avatarIcone, informacaoPrincipal: informacaoPrincipal, informacaoValor: informacaoValor, informacaoValorCor: informacaoValorCor, informacaoDescricao: informacaoDescricao });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Clientes Quantidade'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var informacaoValor = clientes_quantidade;

                backGround = 'info';
                avatarCor = 'info';
                avatarIcone = 'mdi mdi-account-tie';
                informacaoPrincipal = 'Clientes';
                informacaoValor = informacaoValor;
                informacaoValorCor = 'dark';
                informacaoDescricao = '';

                await dashboardsChartInfo1({ backGround: backGround, avatarCor: avatarCor, avatarIcone: avatarIcone, informacaoPrincipal: informacaoPrincipal, informacaoValor: informacaoValor, informacaoValorCor: informacaoValorCor, informacaoDescricao: informacaoDescricao });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Transações Quantidade'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var informacaoValor = transacoes_quantidade;

                backGround = 'warning';
                avatarCor = 'warning';
                avatarIcone = 'mdi mdi-database';
                informacaoPrincipal = 'Transações';
                informacaoValor = informacaoValor;
                informacaoValorCor = 'dark';
                informacaoDescricao = '';

                await dashboardsChartInfo1({ backGround: backGround, avatarCor: avatarCor, avatarIcone: avatarIcone, informacaoPrincipal: informacaoPrincipal, informacaoValor: informacaoValor, informacaoValorCor: informacaoValorCor, informacaoDescricao: informacaoDescricao });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }

            // Grupo: Operações
            if (grafico_grupo_id == 2) {
                // Dados Retorno
                const ordens_servicos_quantidade = dados?.ordens_servicos_quantidade ?? 0;
                const visitas_tecnicas_quantidade = dados?.visitas_tecnicas_quantidade ?? 0;
                const brigadas_incendios_quantidade = dados?.brigadas_incendios_quantidade ?? 0;
                const vistorias_sistemas_quantidade = dados?.vistorias_sistemas_quantidade ?? 0;

                // Ordens Serviços Quantidade''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var informacaoValor = ordens_servicos_quantidade;

                backGround = 'success';
                avatarCor = 'success';
                avatarIcone = 'mdi mdi-account';
                informacaoPrincipal = 'Ordens Serviços';
                informacaoValor = informacaoValor;
                informacaoValorCor = 'dark';
                informacaoDescricao = '';

                await dashboardsChartInfo1({ backGround: backGround, avatarCor: avatarCor, avatarIcone: avatarIcone, informacaoPrincipal: informacaoPrincipal, informacaoValor: informacaoValor, informacaoValorCor: informacaoValorCor, informacaoDescricao: informacaoDescricao });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Visitas Técnicas Quantidade'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var informacaoValor = visitas_tecnicas_quantidade;

                backGround = 'primary';
                avatarCor = 'primary';
                avatarIcone = 'mdi mdi-account-hard-hat';
                informacaoPrincipal = 'Visitas Técnicas';
                informacaoValor = informacaoValor;
                informacaoValorCor = 'dark';
                informacaoDescricao = '';

                await dashboardsChartInfo1({ backGround: backGround, avatarCor: avatarCor, avatarIcone: avatarIcone, informacaoPrincipal: informacaoPrincipal, informacaoValor: informacaoValor, informacaoValorCor: informacaoValorCor, informacaoDescricao: informacaoDescricao });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Brigadas Incêndios Quantidade'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var informacaoValor = brigadas_incendios_quantidade;

                backGround = 'info';
                avatarCor = 'info';
                avatarIcone = 'mdi mdi-account-tie';
                informacaoPrincipal = 'Brigadas Incêndios';
                informacaoValor = informacaoValor;
                informacaoValorCor = 'dark';
                informacaoDescricao = '';

                await dashboardsChartInfo1({ backGround: backGround, avatarCor: avatarCor, avatarIcone: avatarIcone, informacaoPrincipal: informacaoPrincipal, informacaoValor: informacaoValor, informacaoValorCor: informacaoValorCor, informacaoDescricao: informacaoDescricao });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Vistorias Sistemas Quantidade'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var informacaoValor = vistorias_sistemas_quantidade;

                backGround = 'warning';
                avatarCor = 'warning';
                avatarIcone = 'mdi mdi-database';
                informacaoPrincipal = 'Vistorias Sistemas';
                informacaoValor = informacaoValor;
                informacaoValorCor = 'dark';
                informacaoDescricao = '';

                await dashboardsChartInfo1({ backGround: backGround, avatarCor: avatarCor, avatarIcone: avatarIcone, informacaoPrincipal: informacaoPrincipal, informacaoValor: informacaoValor, informacaoValorCor: informacaoValorCor, informacaoDescricao: informacaoDescricao });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }

            // Grupo: Clientes x Edificações
            if (grafico_grupo_id == 3) {
                // Dados Retorno
                const documentos_exigidos_quantidade   = dados?.documentos_exigidos_quantidade   ?? 0;
                const documentos_exigidos_pendentes    = dados?.documentos_exigidos_pendentes    ?? 0;
                const documentos_exigidos_lancados     = dados?.documentos_exigidos_lancados     ?? 0;
                const documentos_exigidos_vencidos     = dados?.documentos_exigidos_vencidos     ?? 0;
                const documentos_exigidos_nao_vencidos = dados?.documentos_exigidos_nao_vencidos ?? 0;
                const lucs_quantidade                  = dados?.lucs_quantidade                  ?? 0;
                const lucs_ocupadas                    = dados?.lucs_ocupadas                    ?? 0;
                const lucs_desocupadas                 = dados?.lucs_desocupadas                 ?? 0;
                const quantidade_lojas = dados?.quantidade_lojas ?? 0;
                const quantidade_sistemas_preventivos = dados?.quantidade_sistemas_preventivos ?? 0;

                // Documentos Exigidos Lançados''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var informacaoValor = documentos_exigidos_quantidade === 0 ? 0 : (documentos_exigidos_lancados * 100) / documentos_exigidos_quantidade;
                informacaoValor = informacaoValor.toFixed(2);

                backGround = 'success';
                avatarCor = 'success';
                avatarIcone = 'fas fa-file-invoice';
                informacaoPrincipal = 'Documentos Lançados';
                informacaoValor = informacaoValor + ' %';
                informacaoValorCor = 'dark';
                informacaoDescricao = documentos_exigidos_lancados + ' de ' + documentos_exigidos_quantidade;

                await dashboardsChartInfo1({ backGround: backGround, avatarCor: avatarCor, avatarIcone: avatarIcone, informacaoPrincipal: informacaoPrincipal, informacaoValor: informacaoValor, informacaoValorCor: informacaoValorCor, informacaoDescricao: informacaoDescricao });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Documentos Exigidos Pendentes''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var informacaoValor = documentos_exigidos_quantidade === 0 ? 0 : (documentos_exigidos_pendentes * 100) / documentos_exigidos_quantidade;
                informacaoValor = informacaoValor.toFixed(2);

                backGround = 'danger';
                avatarCor = 'danger';
                avatarIcone = 'fas fa-file-invoice';
                informacaoPrincipal = 'Documentos Pendentes';
                informacaoValor = informacaoValor + ' %';
                informacaoValorCor = 'dark';
                informacaoDescricao = documentos_exigidos_pendentes + ' de ' + documentos_exigidos_quantidade;

                await dashboardsChartInfo1({ backGround: backGround, avatarCor: avatarCor, avatarIcone: avatarIcone, informacaoPrincipal: informacaoPrincipal, informacaoValor: informacaoValor, informacaoValorCor: informacaoValorCor, informacaoDescricao: informacaoDescricao });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Documentos Exigidos não Vencidos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var informacaoValor = documentos_exigidos_lancados === 0 ? 0 : (documentos_exigidos_nao_vencidos * 100) / documentos_exigidos_lancados;
                informacaoValor = informacaoValor.toFixed(2);

                backGround = 'primary';
                avatarCor = 'primary';
                avatarIcone = 'fas fa-file-import';
                informacaoPrincipal = 'Documentos no Prazo';
                informacaoValor = informacaoValor + ' %';
                informacaoValorCor = 'dark';
                informacaoDescricao = documentos_exigidos_nao_vencidos + ' de ' + documentos_exigidos_lancados;

                await dashboardsChartInfo1({ backGround: backGround, avatarCor: avatarCor, avatarIcone: avatarIcone, informacaoPrincipal: informacaoPrincipal, informacaoValor: informacaoValor, informacaoValorCor: informacaoValorCor, informacaoDescricao: informacaoDescricao });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Documentos Exigidos Vencidos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var informacaoValor = documentos_exigidos_lancados === 0 ? 0 : (documentos_exigidos_vencidos * 100) / documentos_exigidos_lancados;
                informacaoValor = informacaoValor.toFixed(2);

                backGround = 'warning';
                avatarCor = 'warning';
                avatarIcone = 'fas fa-file-export';
                informacaoPrincipal = 'Documentos Vencidos';
                informacaoValor = informacaoValor + ' %';
                informacaoValorCor = 'dark';
                informacaoDescricao = documentos_exigidos_vencidos + ' de ' + documentos_exigidos_lancados;

                await dashboardsChartInfo1({ backGround: backGround, avatarCor: avatarCor, avatarIcone: avatarIcone, informacaoPrincipal: informacaoPrincipal, informacaoValor: informacaoValor, informacaoValorCor: informacaoValorCor, informacaoDescricao: informacaoDescricao });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // LUCs Ocupadas'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var informacaoValor = lucs_quantidade === 0 ? 0 : (lucs_ocupadas * 100) / lucs_quantidade;
                informacaoValor = informacaoValor.toFixed(2);

                backGround = 'success';
                avatarCor = 'success';
                avatarIcone = 'fas fa-grip-vertical';
                informacaoPrincipal = 'LUCs Ocupadas';
                informacaoValor = informacaoValor + ' %';
                informacaoValorCor = 'dark';
                informacaoDescricao = lucs_ocupadas + ' de ' + lucs_quantidade;

                await dashboardsChartInfo1({ backGround: backGround, avatarCor: avatarCor, avatarIcone: avatarIcone, informacaoPrincipal: informacaoPrincipal, informacaoValor: informacaoValor, informacaoValorCor: informacaoValorCor, informacaoDescricao: informacaoDescricao });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // LUCs Desocupadas''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var informacaoValor = lucs_quantidade === 0 ? 0 : (lucs_desocupadas * 100) / lucs_quantidade;
                informacaoValor = informacaoValor.toFixed(2);

                backGround = 'danger';
                avatarCor = 'danger';
                avatarIcone = 'fas fa-grip-vertical';
                informacaoPrincipal = 'LUCs Desocupadas';
                informacaoValor = informacaoValor + ' %';
                informacaoValorCor = 'dark';
                informacaoDescricao = lucs_desocupadas + ' de ' + lucs_quantidade;

                await dashboardsChartInfo1({ backGround: backGround, avatarCor: avatarCor, avatarIcone: avatarIcone, informacaoPrincipal: informacaoPrincipal, informacaoValor: informacaoValor, informacaoValorCor: informacaoValorCor, informacaoDescricao: informacaoDescricao });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Lojas'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                backGround = 'info';
                avatarCor = 'info';
                avatarIcone = 'fas fa-store-alt';
                informacaoPrincipal = 'Lojas';
                informacaoValor = quantidade_lojas;
                informacaoValorCor = 'dark';
                informacaoDescricao = '&nbsp;';

                await dashboardsChartInfo1({ backGround: backGround, avatarCor: avatarCor, avatarIcone: avatarIcone, informacaoPrincipal: informacaoPrincipal, informacaoValor: informacaoValor, informacaoValorCor: informacaoValorCor, informacaoDescricao: informacaoDescricao });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                // Sistemas Preventivos''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                backGround = 'success';
                avatarCor = 'success';
                avatarIcone = 'fas fa-fire-extinguisher';
                informacaoPrincipal = 'Sistemas Preventivos';
                informacaoValor = quantidade_sistemas_preventivos;
                informacaoValorCor = 'dark';
                informacaoDescricao = '&nbsp;';

                await dashboardsChartInfo1({ backGround: backGround, avatarCor: avatarCor, avatarIcone: avatarIcone, informacaoPrincipal: informacaoPrincipal, informacaoValor: informacaoValor, informacaoValorCor: informacaoValorCor, informacaoDescricao: informacaoDescricao });
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }
        }
    } catch (erro) {
        console.error("Erro prepararContainerInformacoes:", erro);
    } finally { }
}

function alternarTodos(status) {
    document.querySelectorAll('.grafico-check').forEach(check => {
        check.checked = status;
    });
}

async function abrirControle() {
    const canvas = document.getElementById('containerControle');

    // cria instância do offcanvas
    const offcanvas = new bootstrap.Offcanvas(canvas);

    offcanvas.show();
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

// Gráfico id=1 (Usuários Grupos)
async function dashboard_grafico_1(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        usuarios_quantidade: [],
        usuarios_grupos: []
    };

    const response = await fetch('dashboards/grafico/dados/grafico_1', {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.usuarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.usuarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else {}
}

// Gráfico id=2 (Usuários Situações)
async function dashboard_grafico_2(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        usuarios_quantidade: [],
        usuarios_situacoes: []
    };

    const response = await fetch('dashboards/grafico/dados/grafico_2', {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.usuarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.usuarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else {}
}

// Gráfico id=3 (Funcionários Contratações)
async function dashboard_grafico_3(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        funcionarios_quantidade: [],
        funcionarios_contratacoes: []
    };

    const response = await fetch('dashboards/grafico/dados/grafico_3', {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else {}
}

// Gráfico id=4 (Funcionários Funções)
async function dashboard_grafico_4(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        funcionarios_quantidade: [],
        funcionarios_funcoes: []
    };

    const response = await fetch('dashboards/grafico/dados/grafico_4', {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else {}
}

// Gráfico id=5 (Funcionários Gêneros)
async function dashboard_grafico_5(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        funcionarios_quantidade: [],
        funcionarios_generos: []
    };

    const response = await fetch('dashboards/grafico/dados/grafico_5', {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.funcionarios_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else {}
}

// Gráfico id=6 (Clientes Status)
async function dashboard_grafico_6(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        clientes_quantidade: [],
        clientes_status: []
    };

    const response = await fetch('dashboards/grafico/dados/grafico_6', {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.clientes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.clientes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else {}
}

// Gráfico id=7 (Clientes Tipos)
async function dashboard_grafico_7(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        clientes_quantidade: [],
        clientes_tipos: []
    };

    const response = await fetch('dashboards/grafico/dados/grafico_7', {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.clientes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.clientes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else {}
}

// Gráfico id=8 (Transações Operações)
async function dashboard_grafico_8(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        transacoes_quantidade: [],
        transacoes_operacoes: []
    };

    const response = await fetch('dashboards/grafico/dados/grafico_8', {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.transacoes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.transacoes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else {}
}

// Gráfico id=9 (Transações Submódulos)
async function dashboard_grafico_9(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        transacoes_quantidade: [],
        transacoes_submodulos: []
    };

    const response = await fetch('dashboards/grafico/dados/grafico_9', {
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
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.transacoes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.transacoes_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else {}
}

// Gráfico id=10 (Operações)
async function dashboard_grafico_10(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        operacoes_vistorias_sistemas_quantidade: [],
        operacoes_brigadas_incendios_quantidade: [],
        operacoes_visitas_tecnicas_quantidade: [],
        operacoes_ordens_servicos_quantidade: [],
        operacoes_total_quantidade: []
    };

    const response = await fetch('dashboards/grafico/dados/grafico_10', {
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
        { name: 'Vistorias Sistemas', value: graficoData.operacoes_vistorias_sistemas_quantidade },
        { name: 'Brigadas Incêndios', value: graficoData.operacoes_brigadas_incendios_quantidade },
        { name: 'Visitas Técnicas', value: graficoData.operacoes_visitas_tecnicas_quantidade },
        { name: 'Ordens Serviços', value: graficoData.operacoes_ordens_servicos_quantidade }
    ];

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.operacoes_total_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.operacoes_total_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else {}
}
// Gráfico id=11 (Cliente Edificação - LUCs Ocupados)
async function dashboard_grafico_11(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        lucs_quantidade: 0,
        lucs_ocupadas: 0,
        lucs_desocupadas: 0
    };

    const response = await fetch(`dashboards/grafico/dados/grafico_11/${clienteId.value}/${edificacaoId.value}/${edificacaoNivelId.value}`, {
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
        { name: 'LUCs Ocupadas', value: graficoData.lucs_ocupadas },
        { name: 'LUCs Desocupadas', value: graficoData.lucs_desocupadas }
    ];

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.lucs_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.lucs_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else {}
}

// Gráfico id=12 (Cliente Edificação - Documentos Exigidos)
async function dashboard_grafico_12(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        documentos_exigidos_pendentes: 0,
        documentos_exigidos_lancados: 0,
        documentos_exigidos_quantidade: 0
    };

    const response = await fetch(`dashboards/grafico/dados/grafico_12/${clienteId.value}/${edificacaoId.value}/${edificacaoNivelId.value}`, {
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
        { name: 'Pendentes', value: graficoData.documentos_exigidos_pendentes },
        { name: 'Lançados', value: graficoData.documentos_exigidos_lancados }
    ];

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.documentos_exigidos_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.documentos_exigidos_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else {}
}

// Gráfico id=13 (Status Documental Geral)
async function dashboard_grafico_13(grafico_id, grafico_name, grafico_tipo) {
    // Global
    const graficoData = {
        documentos_exigidos_lancados: 0,
        documentos_exigidos_nao_lancados: 0,
        documentos_exigidos_vencidos: 0,
        documentos_exigidos_nao_vencidos: 0,
        documentos_exigidos_quantidade: 0
    };

    const response = await fetch(`dashboards/grafico/dados/grafico_13/${clienteId.value}/${edificacaoId.value}/${edificacaoNivelId.value}`, {
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
        { name: 'Válidos', value: graficoData.documentos_exigidos_lancados },
        { name: 'Não Lançados', value: graficoData.documentos_exigidos_nao_lancados },
        { name: 'Vencidos', value: graficoData.documentos_exigidos_vencidos },
        { name: 'No Prazo', value: graficoData.documentos_exigidos_nao_vencidos }
    ];

    // Renderizando
    if (grafico_tipo == 1) {
        await dashboardsChartPieSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.documentos_exigidos_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else if (grafico_tipo == 2) {
        await dashboardsChartBarSimple({id:'dashboard_grafico_'+grafico_id, titleText:grafico_name, titleSubText:graficoData.documentos_exigidos_quantidade+' Registros', dados:dados_grafico, graficoId:grafico_id, graficoName:grafico_name});
    } else {}
}

async function dashboard_grafico_14(grafico_id, grafico_name, grafico_tipo) { }

async function dashboard_grafico_15(grafico_id, grafico_name, grafico_tipo) {}

async function dashboard_grafico_16(grafico_id, grafico_name, grafico_tipo) {}
// Funções para chamada dos Gráficos com nome dashboard_grafico_id - Fim'''''''''''''''''''''''''''''''
// Funções para chamada dos Gráficos com nome dashboard_grafico_id - Fim'''''''''''''''''''''''''''''''

// Funções de Modelos de Gráficos (Info, Pizza, Bar, etc) - Início'''''''''''''''''''''''''''''''''''''
// Funções de Modelos de Gráficos (Info, Pizza, Bar, etc) - Início'''''''''''''''''''''''''''''''''''''
async function dashboardsChartInfo1(
    {
        backGround = 'success',
        avatarCor = 'success',
        avatarIcone = 'bx bx-copy-alt',
        informacaoPrincipal = null,
        informacaoPrincipalCor = 'dark',
        informacaoValor = null,
        informacaoValorCor = 'dark',
        informacaoDescricaoCor = 'dark',
        informacaoDescricao = null
    }) {
    if (informacaoPrincipal !== null) { informacaoPrincipal = informacaoPrincipal.toUpperCase(); }


    // const chartInfo = `<div class="flex-fill alert alert-${backGround} border border-2 rounded mb-0 py-1 px-2">
    //                         <div class="d-flex align-items-center">
    //                             <div class="avatar-sm"><i class="${avatarIcone} text-${avatarCor} font-size-26"></i></div>
    //                             <div class="w-100 text-center">
    //                                 ${informacaoPrincipal != null ? `<div class="fw-bold text-${informacaoPrincipalCor} font-size-11">${informacaoPrincipal}</div>` : ''}
    //                                 ${informacaoValor != null ? `<div class="fw-bold text-${informacaoValorCor} font-size-16">${informacaoValor}</div>` : ''}
    //                                 ${informacaoDescricao != null ? `<div class="text-${informacaoDescricaoCor} font-size-10">${informacaoDescricao}</div>` : ''}
    //                             </div>
    //                         </div>
    //                     </div>`;

    const chartInfo = `<div class="col-12 col-md-3 p-1 g-1">
                            <div class="flex-fill alert alert-${backGround} border border-2 rounded mb-0 py-1 px-2">
                                <div class="d-flex align-items-center">
                                    <div class="avatar-sm"><i class="${avatarIcone} text-${avatarCor} font-size-26"></i></div>
                                    <div class="w-100 text-center">
                                        ${informacaoPrincipal != null ? `<div class="fw-bold text-${informacaoPrincipalCor} font-size-11">${informacaoPrincipal}</div>` : ''}
                                        ${informacaoValor != null ? `<div class="fw-bold text-${informacaoValorCor} font-size-16">${informacaoValor}</div>` : ''}
                                        ${informacaoDescricao != null ? `<div class="text-${informacaoDescricaoCor} font-size-10">${informacaoDescricao}</div>` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>`;

    containerInformacoes.insertAdjacentHTML('beforeend', chartInfo);
}

async function dashboardsChartPieSimple({ id = '', titleText = '', titleSubText = '', legenda = 'bottom', dados = [], graficoId = 0, graficoName = '' }) {
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
        titleConfig = { title: { textStyle: { fontSize: 14 }, text: titleText.toUpperCase(), subtext: titleSubText, left: 'center' } };
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

async function dashboardsChartBarSimple({id='', titleText='', titleSubText='', dados=[], graficoId=0, graficoName=''}) {
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
        titleConfig = { title: { textStyle: { fontSize: 14 }, text: titleText.toUpperCase(), subtext: titleSubText, left: 'center' } };
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
// Funções de Modelos de Gráficos (Info, Pizza, Bar, etc) - Fim''''''''''''''''''''''''''''''''''''''''
// Funções de Modelos de Gráficos (Info, Pizza, Bar, etc) - Fim''''''''''''''''''''''''''''''''''''''''

document.addEventListener("DOMContentLoaded", async function () {
    // Elementos
    const clienteId = document.getElementById('clienteId');
    const clienteName = document.getElementById('clienteName');
    const edificacaoId = document.getElementById('edificacaoId');
    const edificacaoName = document.getElementById('edificacaoName');
    const edificacaoNivelId = document.getElementById('edificacaoNivelId');
    const edificacaoNivelName = document.getElementById('edificacaoNivelName');
    const containerInformacoes = document.getElementById('containerInformacoes');
    const controle_ce_cliente_id = document.getElementById('controle_ce_cliente_id');
    const controle_ce_edificacao_id = document.getElementById('controle_ce_edificacao_id');
    const controle_ce_edificacao_nivel_id = document.getElementById('controle_ce_edificacao_nivel_id');
    const controle_ce_gerar_dashboard = document.getElementById('controle_ce_gerar_dashboard');

    // Campos de Controle Clientes x Edificações''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Guarda todas as opções originais
    const edificacoesOptions = Array.from(controle_ce_edificacao_id.options);
    const niveisOptions = Array.from(controle_ce_edificacao_nivel_id.options);

    // Filtra Edificações pelo Cliente
    controle_ce_cliente_id.addEventListener('change', function () {
        const clienteId = this.value;

        // Reset Edificação
        controle_ce_edificacao_id.innerHTML = '';
        edificacoesOptions.forEach(option => {
            if (option.value === '0' || option.dataset.cliente_id === clienteId) {
                controle_ce_edificacao_id.appendChild(option.cloneNode(true));
            }
        });

        // Reset Nível
        controle_ce_edificacao_nivel_id.innerHTML = '';
        niveisOptions.forEach(option => {
            if (option.value === '0') {
                controle_ce_edificacao_nivel_id.appendChild(option.cloneNode(true));
            }
        });
    });

    // Filtra Níveis pela Edificação
    controle_ce_edificacao_id.addEventListener('change', function () {
        const edificacaoId = this.value;

        controle_ce_edificacao_nivel_id.innerHTML = '';
        niveisOptions.forEach(option => {
            if (option.value === '0' || option.dataset.edificacao_id === edificacaoId) {
                controle_ce_edificacao_nivel_id.appendChild(option.cloneNode(true));
            }
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // controle_ce_gerar_dashboard''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    controle_ce_gerar_dashboard.addEventListener('click', async function () {
        // Popular Elementos
        clienteId.value = controle_ce_cliente_id.value;
        clienteName.value = controle_ce_cliente_id.options[controle_ce_cliente_id.selectedIndex].text;
        edificacaoId.value = controle_ce_edificacao_id.value;
        edificacaoName.value = controle_ce_edificacao_id.options[controle_ce_edificacao_id.selectedIndex].text;
        edificacaoNivelId.value = controle_ce_edificacao_nivel_id.value;
        edificacaoNivelName.value = controle_ce_edificacao_nivel_id.options[controle_ce_edificacao_nivel_id.selectedIndex].text;

        // Preparar Containers
        await prepararContainers(3);
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Preparar Containers
    await prepararContainers(1);
});
