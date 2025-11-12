//Variaveis de controle global
var url_atual = window.location.protocol + '//' + window.location.host + '/';
let map; //Armazena o Mapa
let mapItens = []; //Array de Itens do Mapa

//Cores para Itens
const mapItensCores = [
    '#FF0000', // Vermelho
    '#00FF00', // Verde
    '#0000FF', // Azul
    '#FFFF00', // Amarelo
    '#FF00FF', // Magenta
    '#00FFFF', // Ciano
    '#FFA500', // Laranja
    '#800080', // Roxo
    '#008000', // Verde escuro
    '#000000'  // Preto
];

async function instanciarMapa(centroLat=0, centroLng=0) {
    try {
        //Centro do Mapa
        let centro_mapa = {lat: -22.970722, lng: -43.219185}; //Lagoa Rodrigo de Freitas
        if (centroLat !== 0 && centroLng !== 0) {centro_mapa = { lat: centroLat, lng: centroLng };}

        //Gerar Mapa vazio
        map = new google.maps.Map(document.getElementById('mp_mapa'), {
            zoom: 14,
            center: centro_mapa,
            styles: [
                { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] }, //Pontos de interesse em geral
                { featureType: "poi.attraction", elementType: "all", stylers: [{ visibility: "off" }] }, //Pontos turísticos
                { featureType: "poi.park", elementType: "all", stylers: [{ visibility: "off" }] }, //Parques e áreas verdes
                { featureType: "poi.school", elementType: "all", stylers: [{ visibility: "off" }] }, //Escolas e universidades
                { featureType: "poi.place_of_worship", elementType: "all", stylers: [{ visibility: "off" }] }, //Igrejas, templos, mesquitas, etc.
                { featureType: "poi.medical", elementType: "all", stylers: [{ visibility: "off" }] }, //Hospitais, clínicas, postos de saúde
                { featureType: "poi.business", elementType: "all", stylers: [{ visibility: "off" }] }, //Estabelecimentos comerciais
                { featureType: "poi.government", elementType: "all", stylers: [{ visibility: "off" }] }, //Prédios e órgãos do governo
                { featureType: "poi.sports_complex", elementType: "all", stylers: [{ visibility: "off" }] }, //Áreas esportivas (estádios, quadras, etc.)
            ]
        });
    } catch (error) {
        alert('Erro ao carregar Mapa:'+error);
    }
}

function configOfcanvas(op=0) {
    document.getElementById('div_ponto_personalizado').style.display = 'none';
    document.getElementById('div_rota_personalizada').style.display = 'none';
    document.getElementById('div_rota_ordem_servico').style.display = 'none';

    if (op == 1) {
        document.getElementById('div_ponto_personalizado').style.display = '';
    }

    if (op == 2) {
        document.getElementById('div_rota_personalizada').style.display = '';
    }

    if (op == 3) {
        document.getElementById('div_rota_ordem_servico').style.display = '';
        document.getElementById('ordem_servico_id').value = '';
    }
}

/*
 * Edição do array mapItens
 * Busca o index pelo map_item_id:
 *      Se achar verifica se tem dado.excluir === true e deleta, se não altera
 *      Se não achar inclui
 */
async function mapItensEditar(dado, excluir=false) {
    //map_item_id é obrigatório para excluir mapItens
    if (!dado || !('map_item_id' in dado)) {return;}

    const index = mapItens.findIndex(item => item.map_item_id === dado.map_item_id);

    if (excluir === true) {
        //Excluir se encontrado
        if (index !== -1) {
            mapItens.splice(index, 1);
            return;
        }
    }

    //Item
    const item = {
        map_item_id: dado.map_item_id ?? null,
        map_item: dado.map_item ?? null,
        id: dado.id ?? null,
        mapa_id: dado.mapa_id ?? null,
        item_tipo_id: dado.item_tipo_id ?? null,
        ponto_tipo_id: dado.ponto_tipo_id ?? null,
        ponto_tipo: dado.ponto_tipo ?? null,
        ordem_servico_id: dado.ordem_servico_id ?? null,
        item_name: dado.item_name ?? null,
        item_descricao: dado.item_descricao ?? null,
        google_grupo: dado.google_grupo ?? null,
        latitude: dado.latitude ?? null,
        longitude: dado.longitude ?? null,
        icone: dado.icone ?? null,
        origem_cep: dado.origem_cep ?? null,
        origem_numero: dado.origem_numero ?? null,
        origem_complemento: dado.origem_complemento ?? null,
        origem_logradouro: dado.origem_logradouro ?? null,
        origem_bairro: dado.origem_bairro ?? null,
        origem_localidade: dado.origem_localidade ?? null,
        origem_uf: dado.origem_uf ?? null,
        destino_cep: dado.destino_cep ?? null,
        destino_numero: dado.destino_numero ?? null,
        destino_complemento: dado.destino_complemento ?? null,
        destino_logradouro: dado.destino_logradouro ?? null,
        destino_bairro: dado.destino_bairro ?? null,
        destino_localidade: dado.destino_localidade ?? null,
        destino_uf: dado.destino_uf ?? null
    };

    //Incluir ou Alterar
    if (index !== -1) {
        mapItens[index] = item;
    } else {
        mapItens.push(item);
    }
}

//Ponto Interesse Individual - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Ponto Interesse Individual - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function mapItensPontoInteresseIndividual(dado) {
    try {
        //POI Sistema Individual
        let map_item_id = '11111'+dado.id;
        let map_item = 'POI Sistema Individual';

        const item = {
            map_item_id: map_item_id,
            map_item: map_item,
            id: dado.id ?? null,
            mapa_id: dado.mapa_id ?? null,
            item_tipo_id: 1,
            ponto_tipo_id: dado.ponto_tipo_id ?? null,
            ponto_tipo: dado.ponto_tipo ?? null,
            ordem_servico_id: dado.ordem_servico_id ?? null,
            item_name: dado.name ?? null,
            item_descricao: dado.descricao ?? null,
            google_grupo: dado.google_grupo ?? null,
            latitude: dado.latitude ?? null,
            longitude: dado.longitude ?? null,
            icone: dado.icone ?? null,
            origem_cep: dado.cep ?? null,
            origem_numero: dado.numero ?? null,
            origem_complemento: dado.complemento ?? null,
            origem_logradouro: dado.logradouro ?? null,
            origem_bairro: dado.bairro ?? null,
            origem_localidade: dado.localidade ?? null,
            origem_uf: dado.uf ?? null,
            destino_cep: dado.destino_cep ?? null,
            destino_numero: dado.destino_numero ?? null,
            destino_complemento: dado.destino_complemento ?? null,
            destino_logradouro: dado.destino_logradouro ?? null,
            destino_bairro: dado.destino_bairro ?? null,
            destino_localidade: dado.destino_localidade ?? null,
            destino_uf: dado.destino_uf ?? null
        };

        await mapItensEditar(item);
        await mapItensPopularMapa();
        await mapItensGrade();
        configOfcanvas();

        pontosInteresseIndividualAutocompleteMudarCor(map_item_id);
    } catch (error) {
        alert('Erro ao carregar:'+error);
    }
}

/*
 * Buscar Pontos de Interesse do Sistema em um input para montar um autocomplete
 */
function pontoInteresseIndividualAutocomplete(termo) {
    const container = document.getElementById('autocomplete-pois');
    container.innerHTML = '';  // limpa os resultados anteriores

    if (termo.length < 4) return;  // só busca com 4 ou mais caracteres

    fetch(url_atual + 'mapas/buscar_pontos_interesse/' + termo, {
        method: 'GET',
        headers: { 'REQUEST-ORIGIN': 'fetch' }
    })
        .then(response => response.json())
        .then(data => {
            if (!data.success || data.success.length === 0) {
                container.innerHTML = '<div class="list-group-item small px-1">Nenhum resultado</div>';
            } else {
                const pontos_interesse = data.success;

                // Opcional: remover duplicados pelo ID
                const idsUnicos = new Set();
                const pontos_unicos = pontos_interesse.filter(poi => {
                    const id = '11111' + poi.id;
                    if (idsUnicos.has(id)) return false;
                    idsUnicos.add(id);
                    return true;
                });

                pontos_unicos.forEach(poi => {
                    const map_item_id = '11111' + poi.id;
                    const item = document.createElement('a');
                    item.id = map_item_id;
                    item.href = "#";
                    item.className = 'list-group-item list-group-item-action small py-2';
                    item.textContent = poi.name;
                    item.addEventListener('click', function(event) {
                        event.preventDefault();  // bloqueia navegação
                        event.stopPropagation(); // bloqueia propagação para elementos acima
                        mapItensPontoInteresseIndividual(poi);
                        pontosInteresseIndividualAutocompleteMudarCor(map_item_id);
                    });

                    container.appendChild(item);
                });
            }
        })
        .catch(err => {
            console.error('Erro ao buscar POIs:', err);
        });
}

function pontosInteresseIndividualAutocompleteMudarCor(map_item_id=0) {
    const jaExisteNoMapa = mapItens.some(item => item.map_item_id === map_item_id);

    if (jaExisteNoMapa) {
        document.getElementById(map_item_id).classList.add('bg-success', 'text-white');
    } else {
        document.getElementById(map_item_id).classList.remove('bg-success', 'text-white');
    }
}
//Ponto Interesse Individual - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Ponto Interesse Individual - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Ponto Interesse Grupo - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Ponto Interesse Grupo - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function mapItensPontosInteresseGrupo(ponto_tipo_id=0) {
    if (ponto_tipo_id == 0) {return false;}

    try {
        //Buscando Pontos
        const res = await fetch(url_atual + 'pontos_interesse/pontos_tipo/'+ponto_tipo_id, {method: 'GET', headers: {'REQUEST-ORIGIN': 'fetch'}});
        const json = await res.json();
        const pontosInteresse = json.success;

        for (const dado of pontosInteresse) {
            let map_item_id = '22222' + dado.id;
            let map_item = 'POI Sistema Grupo';

            const item = {
                map_item_id: map_item_id,
                map_item: map_item,
                id: dado.id ?? null,
                mapa_id: dado.mapa_id ?? null,
                item_tipo_id: 2,
                ponto_tipo_id: dado.ponto_tipo_id ?? null,
                ponto_tipo: dado.ponto_tipo ?? null,
                ordem_servico_id: dado.ordem_servico_id ?? null,
                item_name: dado.name ?? null,
                item_descricao: dado.descricao ?? null,
                google_grupo: dado.google_grupo ?? null,
                latitude: dado.latitude ?? null,
                longitude: dado.longitude ?? null,
                icone: dado.icone ?? null,
                origem_cep: dado.cep ?? null,
                origem_numero: dado.numero ?? null,
                origem_complemento: dado.complemento ?? null,
                origem_logradouro: dado.logradouro ?? null,
                origem_bairro: dado.bairro ?? null,
                origem_localidade: dado.localidade ?? null,
                origem_uf: dado.uf ?? null,
                destino_cep: dado.destino_cep ?? null,
                destino_numero: dado.destino_numero ?? null,
                destino_complemento: dado.destino_complemento ?? null,
                destino_logradouro: dado.destino_logradouro ?? null,
                destino_bairro: dado.destino_bairro ?? null,
                destino_localidade: dado.destino_localidade ?? null,
                destino_uf: dado.destino_uf ?? null
            };

            await mapItensEditar(item);
        }

        await mapItensPopularMapa();
        await mapItensGrade();
        configOfcanvas();
    } catch (error) {
        alert('Erro ao carregar:'+error);
    }
}
//Ponto Interesse Grupo - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Ponto Interesse Grupo - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Ponto Personalizado - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Ponto Personalizado - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function mapItensPontoPersonalizado(form) {
    try {
        //Ponto Personalizado
        let map_item_id = '33333'+Date.now();
        let map_item = 'Ponto Personalizado';

        const item = {
            map_item_id: map_item_id,
            map_item: map_item,
            id: null,
            mapa_id: null,
            item_tipo_id: 3,
            ponto_tipo_id: form.ponto_tipo_id.value ?? null,
            ponto_tipo: form.ponto_tipo_id.text ?? null,
            ordem_servico_id: null,
            item_name: form.name.value ?? null,
            item_descricao: form.descricao.value ?? null,
            google_grupo: null,
            latitude: form.latitude.value ?? null,
            longitude: form.longitude.value ?? null,
            icone: form.icone.value ?? null,
            origem_cep: null,
            origem_numero: null,
            origem_complemento: null,
            origem_logradouro: null,
            origem_bairro: null,
            origem_localidade: null,
            origem_uf: null,
            destino_cep: null,
            destino_numero: null,
            destino_complemento: null,
            destino_logradouro: null,
            destino_bairro: null,
            destino_localidade: null,
            destino_uf: null
        };

        await mapItensEditar(item);
        await mapItensPopularMapa();
        await mapItensGrade();
        configOfcanvas();
    } catch (error) {
        alert('Erro ao carregar:'+error);
    }
}

function validarFormPontoPersonalizado() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: ponto_tipo_id (requerido)
    if (validacao({op:1, value:document.getElementById('ponto_tipo_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Ponto tipo requerido.'+'<br>';
    }

    //Campo: name (requerido)
    if (validacao({op:1, value:document.getElementById('name').value}) === false) {
        validacao_ok = false;
        mensagem += 'Nome requerido.'+'<br>';
    }

    //Campo: latitude (requerido)
    if (validacao({op:1, value:document.getElementById('latitude').value}) === false) {
        validacao_ok = false;
        mensagem += 'Latitude requerido.'+'<br>';
    }

    //Campo: longitude (requerido)
    if (validacao({op:1, value:document.getElementById('longitude').value}) === false) {
        validacao_ok = false;
        mensagem += 'Longitude requerido.'+'<br>';
    }

    //Campo: icone (requerido)
    if (validacao({op:1, value:document.getElementById('icone').value}) === false) {
        validacao_ok = false;
        mensagem += 'Ícone requerido.'+'<br>';
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

document.getElementById('form_ponto_personalizado').addEventListener('submit', function (e) {
    e.preventDefault();

    if (validarFormPontoPersonalizado() === false) {return;}

    const form = e.target;

    mapItensPontoPersonalizado(form);

    form.reset();
});
//Ponto Personalizado - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Ponto Personalizado - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Pontos Google - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Pontos Google - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function mapItensPontosGoogle(poi) {
    try {
        //POIs Google Grupo
        let map_item_id = '44444'+poi;
        let map_item = 'POIs Google Grupo';

        const item = {
            map_item_id: map_item_id,
            map_item: map_item,
            id: null,
            mapa_id: null,
            item_tipo_id: 4,
            ponto_tipo_id: null,
            ponto_tipo: null,
            ordem_servico_id: null,
            item_name: null,
            item_descricao: null,
            google_grupo: poi ?? null,
            latitude: null,
            longitude: null,
            icone: null,
            origem_cep: null,
            origem_numero: null,
            origem_complemento: null,
            origem_logradouro: null,
            origem_bairro: null,
            origem_localidade: null,
            origem_uf: null,
            destino_cep: null,
            destino_numero: null,
            destino_complemento: null,
            destino_logradouro: null,
            destino_bairro: null,
            destino_localidade: null,
            destino_uf: null
        };

        await mapItensEditar(item);
        await mapItensPopularMapa();
        await mapItensGrade();
        configOfcanvas();
    } catch (error) {
        alert('Erro ao carregar:'+error);
    }
}
//Pontos Google - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Pontos Google - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Rota Personalizada - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Rota Personalizada - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function mapItensRotaPersonalizada(form) {
    try {
        //Rota Personalizada
        let map_item_id = '55555'+Date.now();
        let map_item = 'Rota Personalizada';

        const item = {
            map_item_id: map_item_id,
            map_item: map_item,
            id: null,
            mapa_id: null,
            item_tipo_id: 5,
            ponto_tipo_id: null,
            ponto_tipo: null,
            ordem_servico_id: null,
            item_name: form.rota_name.value ?? null,
            item_descricao: form.rota_descricao.value ?? null,
            google_grupo: null,
            latitude: null,
            longitude: null,
            icone: null,
            origem_cep: form.cep_origem.value ?? null,
            origem_numero: form.numero_origem.value ?? null,
            origem_complemento: null,
            origem_logradouro: null,
            origem_bairro: null,
            origem_localidade: null,
            origem_uf: null,
            destino_cep: form.cep_destino.value ?? null,
            destino_numero: form.numero_destino.value ?? null,
            destino_complemento: null,
            destino_logradouro: null,
            destino_bairro: null,
            destino_localidade: null,
            destino_uf: null
        };

        await mapItensEditar(item);
        await mapItensPopularMapa();
        await mapItensGrade();
        configOfcanvas();
    } catch (error) {
        alert('Erro ao carregar:'+error);
    }
}

function validarFormRotaPersonalizada() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: cep_origem (requerido / CEP Válido)
    if (validacao({op:9, value:document.getElementById('cep_origem').value}) === false) {
        validacao_ok = false;
        mensagem += 'CEP Origem Inválido.'+'<br>';
    }

    //Campo: numero_origem (requerido)
    if (validacao({op:1, value:document.getElementById('numero_origem').value}) === false) {
        validacao_ok = false;
        mensagem += 'Número Origem requerido.'+'<br>';
    }

    //Campo: cep_destino (requerido / CEP Válido)
    if (validacao({op:9, value:document.getElementById('cep_destino').value}) === false) {
        validacao_ok = false;
        mensagem += 'CEP Destino Inválido.'+'<br>';
    }

    //Campo: numero_destino (requerido)
    if (validacao({op:1, value:document.getElementById('numero_destino').value}) === false) {
        validacao_ok = false;
        mensagem += 'Número Destino requerido.'+'<br>';
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

document.getElementById('form_rota_personalizada').addEventListener('submit', async function (e) {
    e.preventDefault();

    if (validarFormRotaPersonalizada() === false) {return;}

    const form = e.target;

    mapItensRotaPersonalizada(form);

    form.reset();
});
//Rota Personalizada - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Rota Personalizada - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Rotas Ordens de Serviços - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Rotas Ordens de Serviços - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function mapItensRotaOrdemServico(dado) {
    try {
        //Rota Ordem Servico
        let map_item_id = '66666'+dado.indice;
        let map_item = 'Rota Órdem Serviço';

        const item = {
            map_item_id: map_item_id,
            map_item: map_item,
            id: null,
            mapa_id: null,
            item_tipo_id: 6,
            ponto_tipo_id: null,
            ponto_tipo: null,
            ordem_servico_id: null,
            item_name: dado.rota_name ?? null,
            item_descricao: dado.rota_descricao ?? null,
            google_grupo: null,
            latitude: null,
            longitude: null,
            icone: null,
            origem_cep: dado.cep_origem ?? null,
            origem_numero: dado.numero_origem ?? null,
            origem_complemento: null,
            origem_logradouro: null,
            origem_bairro: null,
            origem_localidade: null,
            origem_uf: null,
            destino_cep: dado.cep_destino ?? null,
            destino_numero: dado.numero_destino ?? null,
            destino_complemento: null,
            destino_logradouro: null,
            destino_bairro: null,
            destino_localidade: null,
            destino_uf: null
        };

        await mapItensEditar(item);
        await mapItensPopularMapa();
        await mapItensGrade();
        configOfcanvas();
    } catch (error) {
        alert('Erro ao carregar:'+error);
    }
}

async function mapItensBuscarDestinosOrdemServico(ordem_servico_id = 0) {
    if (ordem_servico_id == 0) return false;

    try {
        const res = await fetch(url_atual + 'mapas/ordem_servico_destinos/' + ordem_servico_id, {
            method: 'GET',
            headers: { 'REQUEST-ORIGIN': 'fetch' }
        });

        const json = await res.json();
        const ordemServicoDestinos = json.success;

        ordemServicoDestinos.sort((a, b) => Number(a.destino_ordem) - Number(b.destino_ordem));

        for (let i = 0; i < ordemServicoDestinos.length - 1; i++) {
            const origem = ordemServicoDestinos[i];
            const destino = ordemServicoDestinos[i + 1];

            const origemDescricao = `${origem.destino_logradouro}, ${origem.destino_numero}`;
            const destinoDescricao = `${destino.destino_logradouro}, ${destino.destino_numero}`;

            let indice = i+1;

            const dado = {
                indice: indice,
                rota_name: 'Destino '+indice,
                rota_descricao: origemDescricao + ' x ' + destinoDescricao,
                cep_origem: origem.destino_cep,
                numero_origem: origem.destino_numero,
                cep_destino: destino.destino_cep,
                numero_destino: destino.destino_numero
            };

            mapItensRotaOrdemServico(dado);
        }
    } catch (error) {
        alert('Erro ao carregar: ' + error);
    }
}
//Rotas Ordens de Serviços - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Rotas Ordens de Serviços - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Polígonos Comunidades - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Polígonos Comunidades - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function mapItensPoligonosComunidades() {
    try {
        //Polígonos Comunidades
        let map_item_id = '77777'+Date.now();
        let map_item = 'Polígonos Comunidades';

        const item = {
            map_item_id: map_item_id,
            map_item: map_item,
            id: null,
            mapa_id: null,
            item_tipo_id: 7,
            ponto_tipo_id: null,
            ponto_tipo: null,
            ordem_servico_id: null,
            item_name: null,
            item_descricao: null,
            google_grupo: null,
            latitude: null,
            longitude: null,
            icone: null,
            origem_cep: null,
            origem_numero: null,
            origem_complemento: null,
            origem_logradouro: null,
            origem_bairro: null,
            origem_localidade: null,
            origem_uf: null,
            destino_cep: null,
            destino_numero: null,
            destino_complemento: null,
            destino_logradouro: null,
            destino_bairro: null,
            destino_localidade: null,
            destino_uf: null
        };

        await mapItensEditar(item);
        await mapItensPopularMapa();
        await mapItensGrade();
        configOfcanvas();
    } catch (error) {
        alert('Erro ao carregar:'+error);
    }
}
//Polígonos Comunidades - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Polígonos Comunidades - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

/*
 * Montar Grade com os Ítens do array maoItens
 */
function mapItensGrade() {
    const tbody = document.querySelector('#map_itens_tabela tbody');
    tbody.innerHTML = '';

    if (mapItens.length == 0) {
        const tr = document.createElement('tr');

        tr.innerHTML = `<td colspan="2">Nenhum item encontrado no Mapa.</td>`;
        tbody.appendChild(tr);
    } else {
        var itemTexto = '';

        mapItens.forEach(item => {
            if (item.item_tipo_id == 1) {itemTexto = item.map_item+'<br>'+item.ponto_tipo+'<br>'+item.item_name;}
            if (item.item_tipo_id == 2) {itemTexto = item.map_item+'<br>'+item.ponto_tipo+'<br>'+item.item_name;}
            if (item.item_tipo_id == 3) {itemTexto = item.map_item+'<br>'+item.ponto_tipo+'<br>'+item.item_name;}
            if (item.item_tipo_id == 4) {itemTexto = item.map_item+'<br>'+'POI: '+item.google_grupo;}
            if (item.item_tipo_id == 5) {itemTexto = item.map_item+'<br>'+item.item_name;}
            if (item.item_tipo_id == 6) {itemTexto = item.map_item+'<br>'+item.item_name+'<br>'+item.item_descricao;}
            if (item.item_tipo_id == 7) {itemTexto = item.map_item+'<br>'+item.item_name;}

            const tr = document.createElement('tr');

            let htmlTr = `
                <td>${itemTexto}</td>
                <td class="text-end">`;

            //Somente pontos podem ser centralizados no Mapa
            if (item.item_tipo_id == 1 || item.item_tipo_id == 2 || item.item_tipo_id == 3 || item.item_tipo_id == 5 || item.item_tipo_id == 6 || item.item_tipo_id == 7) {
                htmlTr += `
                    <button class="btn btn-sm btn-outline-primary me-1" title="Ver no mapa" onclick="mapItensCentralizar(${item.item_tipo_id}, '${item.map_item_id}')">
                        <i class="fas fa-map-marker-alt"></i>
                    </button>`;
            }

            htmlTr += `
                    <button class="btn btn-sm btn-outline-danger" title="Excluir" onclick="mapItensRemover('${item.map_item_id}')">
                        <i class="fas fa-trash-alt"></i>
                    </button>`;

            htmlTr += `
                </td>
            `;

            tr.innerHTML = htmlTr;

            tbody.appendChild(tr);
        });
    }
}

function mapItensCentralizar(item_tipo_id, map_item_id) {
    /*
    * item_tipo_id
    * 1 : POI Sistema Individual
    * 2 : POI Sistema Grupo
    * 3 : Ponto Personalizado
    * 4 : POI Google Grupo
    * 5 : Rota Personalizada
    * 6 : Rotas Órdem Serviço
    * 7 : Polígonos Comunidades
    */

    //Centralizar Ponto
    if (item_tipo_id == 1 || item_tipo_id == 2 || item_tipo_id == 3) {
        const ponto = mapItens.find(d => d.map_item_id === map_item_id);

        if (ponto && ponto.marker) {
            map.setCenter(ponto.marker.getPosition());
        }
    }

    //Centralizar Rota
    if (item_tipo_id == 5 || item_tipo_id == 6) {
        const dado = mapItens.find(d => d.map_item_id === map_item_id);

        if (dado && dado.rota && dado.rota.result) {
            const bounds = dado.rota.result.routes[0].bounds;
            map.fitBounds(bounds);
        }
    }

    //Centralizar Polígono Comunidade
    if (item_tipo_id == 7) {
        const dado = mapItens.find(d => d.map_item_id === map_item_id);

        if (dado && dado.item_tipo_id === 7 && dado.comunidades) {
            const bounds = new google.maps.LatLngBounds();

            dado.comunidades.forEach(com => {
                const paths = com.polygon.getPath(); // retorna MVCArray

                paths.forEach((latlng) => {
                    bounds.extend(latlng);
                });
            });

            map.fitBounds(bounds);
        }
    }
}

async function mapItensRemover(map_item_id) {
    //Remover do Array mapItens
    const item = {
        map_item_id: map_item_id
    };

    await mapItensEditar(item, true);
    await mapItensPopularMapa();
    await mapItensGrade();
    configOfcanvas();
}

async function mapItensLimparMapa() {
    await instanciarMapa();
}

async function mapItensPopularMapa() {
    await mapItensLimparMapa();

    /*
    * item_tipo_id
    * 1 : POI Sistema Individual
    * 2 : POIs Sistema Grupo
    * 3 : Ponto Personalizado
    * 4 : POIs Google Grupo
    * 5 : Rota Personalizada
    * 6 : Rotas Órdem Serviço
    */

    //item_tipo_id: 1, 2, 3
    mapItens.filter(dado => [1, 2, 3].includes(dado.item_tipo_id)).forEach(dado => {
        const marker = new google.maps.Marker({
            position: { lat: Number(dado.latitude), lng: Number(dado.longitude) },
            map: map,
            title: `${dado.item_name}: ${dado.item_descricao}`,
            icon: 'build/assets/images/icones/mapas/' + dado.icone
        });

        marker.map_item_id = dado.map_item_id;

        //Anexando o marker no próprio dado
        dado.marker = marker;
    });

    //item_tipo_id: 4
    var poi_on_off = 'off';
    var poi_attraction_on_off = 'off';
    var poi_park_on_off = 'off';
    var poi_school_on_off = 'off';
    var poi_place_of_worship_on_off = 'off';
    var poi_medical_on_off = 'off';
    var poi_business_on_off = 'off';
    var poi_government_on_off = 'off';
    var poi_sports_complex_on_off = 'off';

    mapItens.filter(dado => dado.item_tipo_id === 4).forEach(dado => {
        if (dado.google_grupo == 'poi') {poi_on_off = 'on';}
        if (dado.google_grupo == 'poi.attraction') {poi_attraction_on_off = 'on';}
        if (dado.google_grupo == 'poi.park') {poi_park_on_off = 'on';}
        if (dado.google_grupo == 'poi.school') {poi_school_on_off = 'on';}
        if (dado.google_grupo == 'poi.place_of_worship') {poi_place_of_worship_on_off = 'on';}
        if (dado.google_grupo == 'poi.medical') {poi_medical_on_off = 'on';}
        if (dado.google_grupo == 'poi.business') {poi_business_on_off = 'on';}
        if (dado.google_grupo == 'poi.government') {poi_government_on_off = 'on';}
        if (dado.google_grupo == 'poi.sports_complex') {poi_sports_complex_on_off = 'on';}
    });

    const estilos = [
        { featureType: "poi", elementType: "all", stylers: [{ visibility: poi_on_off }] }, //Pontos de interesse em geral
        { featureType: "poi.attraction", elementType: "all", stylers: [{ visibility: poi_attraction_on_off }] }, //Pontos turísticos
        { featureType: "poi.park", elementType: "all", stylers: [{ visibility: poi_park_on_off }] }, //Parques e áreas verdes
        { featureType: "poi.school", elementType: "all", stylers: [{ visibility: poi_school_on_off }] }, //Escolas e universidades
        { featureType: "poi.place_of_worship", elementType: "all", stylers: [{ visibility: poi_place_of_worship_on_off }] }, //Igrejas, templos, mesquitas, etc.
        { featureType: "poi.medical", elementType: "all", stylers: [{ visibility: poi_medical_on_off }] }, //Hospitais, clínicas, postos de saúde
        { featureType: "poi.business", elementType: "all", stylers: [{ visibility: poi_business_on_off }] }, //Estabelecimentos comerciais
        { featureType: "poi.government", elementType: "all", stylers: [{ visibility: poi_government_on_off }] }, //Prédios e órgãos do governo
        { featureType: "poi.sports_complex", elementType: "all", stylers: [{ visibility: poi_sports_complex_on_off }] }, //Áreas esportivas (estádios, quadras, etc.)
    ];

    map.setOptions({ styles: estilos });

    //item_tipo_id: 5, 6
    let corIndex = 0;
    for (const dado of mapItens.filter(dado => [5, 6].includes(dado.item_tipo_id))) {
        let cepOrigem = dado.origem_cep;
        let numeroOrigem = dado.origem_numero;
        let cepDestino = dado.destino_cep;
        let numeroDestino = dado.destino_numero;

        let origem = `${cepOrigem}, ${numeroOrigem}`;
        let destino = `${cepDestino}, ${numeroDestino}`;

        //Guarda os dados diretamente no dado
        dado.rota = {
            origem,
            destino,
            cepOrigem,
            cepDestino,
            directionsRenderer: null,
            result: null,
            cor: mapItensCores[corIndex]  // Guarda a cor também, se quiser
        };

        const directionsService = new google.maps.DirectionsService();

        const directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            suppressMarkers: false,
            polylineOptions: {
                strokeColor: mapItensCores[corIndex],   // Aplica a cor!
                strokeOpacity: 0.8,
                strokeWeight: 5
            }
        });

        directionsService.route({
            origin: origem,
            destination: destino,
            travelMode: google.maps.TravelMode.DRIVING
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
                // Guarda o renderer e resultado dentro do dado
                dado.rota.directionsRenderer = directionsRenderer;
                dado.rota.result = result;
            } else {
                alert('Erro ao traçar rota: ' + status);
            }
        });

        corIndex++;
        if (corIndex >= mapItensCores.length) {
            corIndex = 0;  // Opcional: reinicia se acabar as cores
        }
    }

    //item_tipo_id: 7
    for (const dado of mapItens.filter(dado => dado.item_tipo_id === 7)) {
        const response = await fetch('/build/assets/comunidades.json');
        const comunidades = await response.json();

        dado.comunidades = []; //Cria uma propriedade para armazenar os polígonos relacionados

        comunidades.forEach(comunidade => {
            const nome = comunidade.attributes.nome;
            const complexo = comunidade.attributes.complexo;
            const bairro = comunidade.attributes.bairro;
            const rings = comunidade.geometry.rings;

            // Formatar as coordenadas no formato { lat, lng }
            const paths = rings.map(ring =>
                ring.map(coord => ({
                    lat: coord[1],
                    lng: coord[0]
                }))
            );

            //Desenha o polígono diretamente aqui
            const infoWindow = new google.maps.InfoWindow();

            paths.forEach((path) => {
                const polygon = new google.maps.Polygon({
                    paths: path,
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35
                });

                polygon.setMap(map);

                // ✅ Guarda tudo no próprio dado
                dado.comunidades.push({
                    nome,
                    complexo,
                    bairro,
                    polygon,
                    infoWindow
                });

                polygon.addListener("mouseover", (e) => {
                    const content = `<div style="display: flex; justify-content: space-between; align-items: center; min-width: 200px; margin-top: -2px;">
                                    <strong style="font-size: 14px;">${nome}</strong>
                                </div>
                                <div style="margin-top: 4px;">
                                    <br>
                                    <b>Complexo:</b> ${complexo}<br><br>
                                    <b>Bairro:</b> ${bairro}
                                </div>`;
                    infoWindow.setContent(content);
                    infoWindow.setPosition(e.latLng);
                    infoWindow.open(map);
                });

                polygon.addListener("mouseout", () => {
                    infoWindow.close();
                });
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    //Mapa inicial
    instanciarMapa();

    //Botão: mp_escolher''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('mp_escolher').addEventListener('click', function () {
        //Gerar mapa
        mp_visualizar();
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Combobox: ordem_servico_id''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('ordem_servico_id').addEventListener('change', function () {
        mapItensBuscarDestinosOrdemServico(this.value);
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});



// function mp_mapa_POIs_google() {
//     /*
//      * poi: Pontos de interesse em geral
//      * poi.attraction: Pontos turísticos
//      * poi.park: Parques e áreas verdes
//      * poi.school: Escolas e universidades
//      * poi.place_of_worship: Igrejas, templos, mesquitas, etc
//      * poi.medical: Hospitais, clínicas, postos de saúde
//      * poi.business: Estabelecimentos comerciais
//      * poi.government: Prédios e órgãos do governo
//      * poi.sports_complex: Áreas esportivas (estádios, quadras, etc.)
//      */
//
//     if (!map) return;
//
//     const config = [
//         { id: "pois_google_attraction", featureType: "poi.attraction" },
//         { id: "pois_google_park", featureType: "poi.park" },
//         { id: "pois_google_school", featureType: "poi.school" },
//         { id: "pois_google_place_of_worship", featureType: "poi.place_of_worship" },
//         { id: "pois_google_medical", featureType: "poi.medical" },
//         { id: "pois_google_business", featureType: "poi.business" },
//         { id: "pois_google_government", featureType: "poi.government" },
//         { id: "pois_google_sports_complex", featureType: "poi.sports_complex" }
//     ];
//
//     const estilos = [];
//
//     // Desativa todos os POIs específicos que NÃO estão marcados
//     config.forEach(item => {
//         const checkbox = document.getElementById(item.id);
//         estilos.push({
//             featureType: item.featureType,
//             elementType: "all",
//             stylers: [{ visibility: checkbox && checkbox.checked ? "on" : "off" }]
//         });
//     });
//
//     map.setOptions({ styles: estilos });
// }
//
// function configOfcanvas(op=0) {
//     document.getElementById('div_ponto_personalizado').style.display = 'none';
//     document.getElementById('div_rota_personalizada').style.display = 'none';
//     document.getElementById('div_rota_ordem_servico').style.display = 'none';
//     document.getElementById('grade_ponto_personalizado').style.display = 'none';
//     document.getElementById('grade_rota_personalizada').style.display = 'none';
//     document.getElementById('grade_rota_ordem_servico').style.display = 'none';
//
//     if (op == 1) {
//         document.getElementById('div_ponto_personalizado').style.display = '';
//     }
//
//     if (op == 2) {
//         document.getElementById('div_rota_personalizada').style.display = '';
//     }
//
//     if (op == 3) {
//         document.getElementById('div_rota_ordem_servico').style.display = '';
//         document.getElementById('ordem_servico_id').value = '';
//     }
//
//     if (op == 77) {
//         if (pontosPersonalizados.length > 0) {
//             document.getElementById('grade_ponto_personalizado').style.display = '';
//         }
//
//         if (rotasPersonalizadas.length > 0) {
//             document.getElementById('grade_rota_personalizada').style.display = '';
//         }
//
//         if (rotasOrdemServico.length > 0) {
//             document.getElementById('grade_rota_ordem_servico').style.display = '';
//         }
//     }
// }
//
// async function mp_visualizar(id=0) {
//     //URL
//
//     try {
//         //Buscando Pontos
//         const res = await fetch(url_atual + 'mapas/visualizar_mapa/'+id, {method: 'GET', headers: {'REQUEST-ORIGIN': 'fetch'}});
//         const ocorrencias = await res.json();
//
//         //Filtrar ocorrências com base nos pontosTiposSelecionados
//         const ocorrenciasFiltradas = ocorrencias.filter(o => pontosTiposSelecionados.includes(String(o.ponto_tipo_id)));
//
//         //Pontos iniciais e centro do mapa
//         const lagoa = { lat: -22.970722, lng: -43.219185 };
//         const rocinha = { lat: -22.988558, lng: -43.239077 };
//
//         //Gerar Mapa com pontos
//         const map = new google.maps.Map(document.getElementById('mp_mapa'), {
//             zoom: 14,
//             center: lagoa
//         });
//
//         const directionsService = new google.maps.DirectionsService();
//         const directionsRenderer = new google.maps.DirectionsRenderer({
//             map: map,
//             suppressMarkers: true,
//             preserveViewport: true // <-- ESSENCIAL para manter o centro definido
//         });
//
//         //Marcadores do Banco de Dados
//         ocorrenciasFiltradas.forEach(o => {
//             new google.maps.Marker({
//                 position: { lat: Number(o.latitude), lng: Number(o.longitude) },
//                 map: map,
//                 title: `${o.name}: ${o.descricao}`,
//                 icon: 'build/assets/images/icones/mapas/'+o.icone
//             });
//         });
//
//         /***************
//          Rota entre a Lagoa e Rocinha - Cel Vinicius mandou retirar
//
//          //Marcador da Lagoa
//          const markerA = new google.maps.Marker({
//             position: lagoa,
//             map: map,
//             title: "Lagoa Rodrigo de Freitas"
//         });
//
//          //Marcador da Rocinha
//          const markerB = new google.maps.Marker({
//             position: rocinha,
//             map: map,
//             title: "Rocinha"
//         });
//
//          const infoWindowA = new google.maps.InfoWindow();
//          const infoWindowB = new google.maps.InfoWindow();
//
//          directionsService.route({
//             origin: lagoa,
//             destination: rocinha,
//             travelMode: google.maps.TravelMode.DRIVING
//         }, function (response, status) {
//             if (status === "OK") {
//                 directionsRenderer.setDirections(response);
//
//                 const route = response.routes[0];
//                 const leg = route.legs[0];
//
//                 //InfoWindows com tempo/distância
//                 const texto = `<strong>Distância:</strong> ${leg.distance.text}<br><strong>Duração:</strong> ${leg.duration.text}`;
//
//                 infoWindowA.setContent(`<strong>Lagoa x Rocinha</strong><br>${texto}`);
//                 infoWindowB.setContent(`<strong>Lagoa x Rocinha</strong><br>${texto}`);
//
//                 // Evento de hover para mostrar popups
//                 markerA.addListener("mouseover", () => infoWindowA.open(map, markerA));
//                 markerA.addListener("mouseout", () => infoWindowA.close());
//
//                 markerB.addListener("mouseover", () => infoWindowB.open(map, markerB));
//                 markerB.addListener("mouseout", () => infoWindowB.close());
//             } else {
//                 alert("Falha ao traçar a rota: " + status);
//             }
//         });
//          ****************/
//
//             //Poligonos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//         const comunidadesChecked = document.getElementById('comunidades').checked;
//
//         if (comunidadesChecked) {
//             const response = await fetch('/build/assets/comunidades.json');
//             const comunidades = await response.json();
//
//             comunidades.forEach(comunidade => {
//                 const nome = comunidade.attributes.nome;
//                 const complexo = comunidade.attributes.complexo;
//                 const bairro = comunidade.attributes.bairro;
//
//                 const rings = comunidade.geometry.rings;
//
//                 //Formatar as coordenadas no formato { lat, lng }
//                 const paths = rings.map(ring =>
//                     ring.map(coord => ({
//                         lat: coord[1],
//                         lng: coord[0]
//                     }))
//                 );
//
//                 mapItensPoligonosComunidadesDesenhar(paths, nome, complexo, bairro, map);
//             });
//         }
//         //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//     } catch (error) {
//         console.error('Erro ao carregar ocorrências:', error);
//     }
// }
//
//
//
//
//
//
//
//
//
//
// //Rotas Personalizadas''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// function validarFormRotaPersonalizada() {
//     var validacao_ok = true;
//     var mensagem = '';
//
//     //Campo: cep_origem (requerido / CEP Válido)
//     if (validacao({op:9, value:document.getElementById('cep_origem').value}) === false) {
//         validacao_ok = false;
//         mensagem += 'CEP Origem Inválido.'+'<br>';
//     }
//
//     //Campo: numero_origem (requerido)
//     if (validacao({op:1, value:document.getElementById('numero_origem').value}) === false) {
//         validacao_ok = false;
//         mensagem += 'Número Origem requerido.'+'<br>';
//     }
//
//     //Campo: cep_destino (requerido / CEP Válido)
//     if (validacao({op:9, value:document.getElementById('cep_destino').value}) === false) {
//         validacao_ok = false;
//         mensagem += 'CEP Destino Inválido.'+'<br>';
//     }
//
//     //Campo: numero_destino (requerido)
//     if (validacao({op:1, value:document.getElementById('numero_destino').value}) === false) {
//         validacao_ok = false;
//         mensagem += 'Número Destino requerido.'+'<br>';
//     }
//
//     //Mensagem
//     if (validacao_ok === false) {
//         var texto = '<div class="pt-3">';
//         texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
//         texto += '</div>';
//
//         alertSwal('warning', 'Validação', texto, 'true', 5000);
//     }
//
//     //Retorno
//     return validacao_ok;
// }
//
// document.getElementById('form_rota_personalizada').addEventListener('submit', async function (e) {
//     e.preventDefault();
//
//     if (validarFormRotaPersonalizada() === false) {return;}
//
//     const form = e.target;
//     const rotaId = form.rota_personalizado_id.value || Date.now(); // Gera ID se for novo
//     const cepOrigem = form.cep_origem.value;
//     const numeroOrigem = form.numero_origem.value;
//     const complementoOrigem = form.complemento_origem.value;
//     const cepDestino = form.cep_destino.value;
//     const numeroDestino = form.numero_destino.value;
//     const complementoDestino = form.complemento_destino.value;
//
//     const origem = `${cepOrigem}, ${numeroOrigem} ${complementoOrigem}`;
//     const destino = `${cepDestino}, ${numeroDestino} ${complementoDestino}`;
//
//     // Verifica se é edição
//     const existente = rotasPersonalizadas.find(r => r.id == rotaId);
//
//     if (existente) {
//         existente.origem = origem;
//         existente.destino = destino;
//         existente.cepOrigem = cepOrigem;
//         existente.cepDestino = cepDestino;
//
//         // Remove rota anterior do mapa se houver
//         if (existente.directionsRenderer) {
//             existente.directionsRenderer.setMap(null);
//         }
//     } else {
//         rotasPersonalizadas.push({ id: rotaId, origem, destino, cepOrigem, cepDestino });
//     }
//
//     //Desenha a rota no mapa
//     const directionsService = new google.maps.DirectionsService();
//     const corLinha = mapItensRotaPersonalizadaCor(); // Pega a próxima cor da lista
//
//     const directionsRenderer = new google.maps.DirectionsRenderer({
//         map: map,
//         suppressMarkers: true, // Suprime os ícones padrão
//         polylineOptions: {
//             strokeColor: corLinha,
//             strokeOpacity: 0.8,
//             strokeWeight: 5
//         }
//     });
//
//     directionsService.route({
//         origin: origem,
//         destination: destino,
//         travelMode: google.maps.TravelMode.DRIVING
//     }, (result, status) => {
//         if (status === google.maps.DirectionsStatus.OK) {
//             //Gerando icone da cor da rota'''''''''''''''''''''''''''''''''
//             const leg = result.routes[0].legs[0];
//
//             //Ícone SVG com a cor da linha
//             const svgIcon = {
//                 path: google.maps.SymbolPath.CIRCLE,
//                 scale: 8,
//                 fillColor: corLinha,
//                 fillOpacity: 1,
//                 strokeWeight: 1,
//                 strokeColor: '#000'
//             };
//
//             //Criar marcador de origem
//             const marcadorOrigem = new google.maps.Marker({
//                 position: leg.start_location,
//                 map: map,
//                 title: 'Origem',
//                 icon: svgIcon
//             });
//
//             //Criar marcador de destino
//             const marcadorDestino = new google.maps.Marker({
//                 position: leg.end_location,
//                 map: map,
//                 title: 'Destino',
//                 icon: svgIcon
//             });
//             //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//
//             directionsRenderer.setDirections(result);
//
//             const rota = rotasPersonalizadas.find(r => r.id == rotaId);
//             if (rota) {
//                 rota.directionsRenderer = directionsRenderer;
//                 rota.cor = corLinha; // (opcional) salva a cor junto
//             }
//
//             mp_grade_rotas_personalizadas_atualizar();
//
//             form.reset();
//         } else {
//             alert('Erro ao traçar rota: ' + status);
//         }
//     });
// });
//
// function mp_grade_rotas_personalizadas_atualizar() {
//     const tbody = document.querySelector('#tabelaRotasPersonalizadas tbody');
//     tbody.innerHTML = '';
//
//     rotasPersonalizadas.forEach(rota => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//             <td>${rota.cepOrigem}</td>
//             <td>${rota.cepDestino}</td>
//             <td class="text-center">
//                 <button class="btn btn-sm btn-outline-primary me-1" title="Ver no mapa" onclick="mapItensRotaCentralizar('${rota.id}')">
//                     <i class="fas fa-route"></i>
//                 </button>
//                 <button class="btn btn-sm btn-outline-secondary me-1" title="Editar" onclick="mapItensRotaEditar('${rota.id}')">
//                     <i class="fas fa-edit"></i>
//                 </button>
//                 <button class="btn btn-sm btn-outline-danger" title="Excluir" onclick="mapItensRotaRemover('${rota.id}')">
//                     <i class="fas fa-trash-alt"></i>
//                 </button>
//             </td>
//         `;
//         tbody.appendChild(tr);
//     });
// }
//
// function mapItensRotaCentralizar(id) {
//     const rota = rotasPersonalizadas.find(r => r.id == id);
//     if (!rota || !rota.directionsRenderer) return;
//     rota.directionsRenderer.setMap(map);
//     map.setZoom(13);
// }
//
// function mapItensRotaEditar(id) {
//     const rota = rotasPersonalizadas.find(r => r.id == id);
//     if (!rota) return;
//
//     const form = document.getElementById('form_rota_personalizada');
//     form.rota_personalizado_id.value = rota.id;
//
//     // Extração básica do cep e número
//     const [cepOrigem] = rota.origem.split(',');
//     const [cepDestino] = rota.destino.split(',');
//
//     form.cep_origem.value = cepOrigem.trim();
//     form.numero_origem.value = ''; // Não armazenado separadamente
//     form.complemento_origem.value = '';
//     form.cep_destino.value = cepDestino.trim();
//     form.numero_destino.value = '';
//     form.complemento_destino.value = '';
//
//     document.getElementById('div_rota_personalizada').style.display = 'block';
// }
//
// function mapItensRotaRemover(id) {
//     const index = rotasPersonalizadas.findIndex(r => r.id == id);
//     if (index !== -1) {
//         const rota = rotasPersonalizadas[index];
//         if (rota.directionsRenderer) {
//             rota.directionsRenderer.setMap(null);
//         }
//         rotasPersonalizadas.splice(index, 1);
//         mp_grade_rotas_personalizadas_atualizar();
//
//         //Remover icone
//         if (rota.marcadorOrigem) rota.marcadorOrigem.setMap(null);
//         if (rota.marcadorDestino) rota.marcadorDestino.setMap(null);
//     }
// }
//
// function mapItensRotaPersonalizadaCor() {
//     const cor = coresRotasFixas[corRotaIndex % coresRotasFixas.length];
//     corRotaIndex++;
//     return cor;
// }
// //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//
// //Rotas Ordem Serviço'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// async function mapItensBuscarDestinosOrdemServico(ordem_servico_id = 0) {
//     if (ordem_servico_id == 0) return false;
//
//     try {
//
//         const res = await fetch(url_atual + 'mapas/ordem_servico_destinos/' + ordem_servico_id, {
//             method: 'GET',
//             headers: { 'REQUEST-ORIGIN': 'fetch' }
//         });
//         const json = await res.json();
//         const ordemServicoDestinos = json.success;
//
//         ordemServicoDestinos.sort((a, b) => Number(a.destino_ordem) - Number(b.destino_ordem));
//
//         rota_ordem_servico_id = 0;
//
//         for (let i = 0; i < ordemServicoDestinos.length - 1; i++) {
//             const origem = ordemServicoDestinos[i];
//             const destino = ordemServicoDestinos[i + 1];
//
//             const origemPush = `${origem.destino_cep}, ${origem.destino_numero} ${origem.destino_complemento}`;
//             const destinoPush = `${destino.destino_cep}, ${destino.destino_numero} ${destino.destino_complemento}`;
//
//             const rotaId = rota_ordem_servico_id;
//
//             rotasOrdemServico.push({
//                 id: rotaId,
//                 origemPush,
//                 destinoPush,
//                 cepOrigem: origem.destino_cep,
//                 cepDestino: destino.destino_cep,
//                 directionsRenderer: null,
//                 marcadorOrigem: null,
//                 marcadorDestino: null
//             });
//
//             const directionsService = new google.maps.DirectionsService();
//             const corLinha = mp_rota_ordem_servico_cor();
//
//             const directionsRenderer = new google.maps.DirectionsRenderer({
//                 map: map,
//                 suppressMarkers: true,
//                 polylineOptions: {
//                     strokeColor: corLinha,
//                     strokeOpacity: 0.8,
//                     strokeWeight: 5
//                 }
//             });
//
//             directionsService.route({
//                 origin: origemPush,
//                 destination: destinoPush,
//                 travelMode: google.maps.TravelMode.DRIVING
//             }, (result, status) => {
//                 if (status === google.maps.DirectionsStatus.OK) {
//                     const leg = result.routes[0].legs[0];
//
//                     const svgIcon = {
//                         path: google.maps.SymbolPath.CIRCLE,
//                         scale: 8,
//                         fillColor: corLinha,
//                         fillOpacity: 1,
//                         strokeWeight: 1,
//                         strokeColor: '#000'
//                     };
//
//                     const marcadorOrigem = new google.maps.Marker({
//                         position: leg.start_location,
//                         map: map,
//                         title: 'Origem',
//                         icon: svgIcon
//                     });
//
//                     const marcadorDestino = new google.maps.Marker({
//                         position: leg.end_location,
//                         map: map,
//                         title: 'Destino',
//                         icon: svgIcon
//                     });
//
//                     directionsRenderer.setDirections(result);
//
//                     // ⚠️ Aqui, usa a variável capturada rotaId
//                     const rota = rotasOrdemServico.find(r => r.id == rotaId);
//                     if (rota) {
//                         rota.directionsRenderer = directionsRenderer;
//                         rota.marcadorOrigem = marcadorOrigem;
//                         rota.marcadorDestino = marcadorDestino;
//                         rota.cor = corLinha;
//                     }
//
//                     mp_grade_rotas_ordem_servico_atualizar();
//                 } else {
//                     alert('Erro ao traçar rota: ' + status);
//                 }
//             });
//
//             rota_ordem_servico_id++;
//         }
//     } catch (error) {
//         alert('Erro ao carregar: ' + error);
//     }
// }
//
// function mp_grade_rotas_ordem_servico_atualizar() {
//     const tbody = document.querySelector('#tabelaRotasOrdemServico tbody');
//     tbody.innerHTML = '';
//
//     rotasOrdemServico.forEach(rota => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//             <td>${rota.cepOrigem}</td>
//             <td>${rota.cepDestino}</td>
//             <td class="text-center">
//                 <button class="btn btn-sm btn-outline-primary me-1" title="Ver no mapa" onclick="mp_rota_ordem_servico_ver('${rota.id}')">
//                     <i class="fas fa-route"></i>
//                 </button>
//                 <button class="btn btn-sm btn-outline-danger" title="Excluir" onclick="mp_rota_ordem_servico_remover('${rota.id}')">
//                     <i class="fas fa-trash-alt"></i>
//                 </button>
//             </td>
//         `;
//         tbody.appendChild(tr);
//     });
// }
//
// function mp_rota_ordem_servico_ver(id) {
//     const rota = rotasOrdemServico.find(r => r.id == id);
//     if (!rota || !rota.directionsRenderer) return;
//
//     rota.directionsRenderer.setMap(map);
//     if (rota.marcadorOrigem) rota.marcadorOrigem.setMap(map);
//     if (rota.marcadorDestino) rota.marcadorDestino.setMap(map);
//
//     map.setZoom(13);
// }
//
// function mp_rota_ordem_servico_remover(id) {
//     const index = rotasOrdemServico.findIndex(r => r.id == id);
//     if (index !== -1) {
//         const rota = rotasOrdemServico[index];
//
//         if (rota.directionsRenderer) {
//             rota.directionsRenderer.setMap(null);
//         }
//         if (rota.marcadorOrigem) {
//             rota.marcadorOrigem.setMap(null);
//         }
//         if (rota.marcadorDestino) {
//             rota.marcadorDestino.setMap(null);
//         }
//
//         rotasOrdemServico.splice(index, 1);
//         mp_grade_rotas_ordem_servico_atualizar();
//     }
// }
//
// function mp_rota_ordem_servico_cor() {
//     const cor = coresRotasFixas[corRotaIndex % coresRotasFixas.length];
//     corRotaIndex++;
//     return cor;
// }
// //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//
// //Outras funções''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// function pontoInteresseIndividualAutocomplete(termo) {
//     const container = document.getElementById('autocomplete-pois');
//     container.innerHTML = '';  // limpa os resultados anteriores
//
//     if (termo.length < 4) return;  // só busca com 3 ou mais caracteres
//
//     //URL
//
//     fetch(url_atual + 'mapas/buscar_pontos_interesse/'+termo, {method: 'GET', headers: {'REQUEST-ORIGIN': 'fetch'}})
//         .then(response => response.json())
//         .then(data => {
//             if (data.length === 0) {
//                 container.innerHTML = '<div class="list-group-item small px-1">Nenhum resultado</div>';
//             } else {
//                 var pontos_interesse = data.success;
//
//                 pontos_interesse.forEach(poi => {
//                     const item = document.createElement('a');
//                     item.href = "#";
//                     item.className = 'list-group-item list-group-item-action small py-1';
//                     item.textContent = poi.name;  // ajuste conforme o campo que armazena o nome
//                     item.onclick = () => pontoInteresseIndividualAutocomplete(poi);
//                     container.appendChild(item);
//                 });
//             }
//         })
//         .catch(err => {
//             console.error('Erro ao buscar POIs:', err);
//         });
// }
//
// function pontoInteresseIndividualAutocomplete(poi) {
//     console.log('POI selecionado:', poi);
//     // Aqui você pode, por exemplo:
//     // - adicionar o POI no mapa
//     // - preencher outro campo
//     // - fechar o dropdown
//     alert(`POI Selecionado: ${poi.name}`);
// }
// //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//
// document.addEventListener("DOMContentLoaded", function(event) {
//     //Mapa inicial''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//     instanciarMapa();
//     //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//
//     //Botão: mp_escolher''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//     document.getElementById('mp_escolher').addEventListener('click', function () {
//         //Gerar mapa
//         mp_visualizar();
//     });
//     //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//
//     //Combobox: ordem_servico_id''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//     document.getElementById('ordem_servico_id').addEventListener('change', function () {
//         //Buscar Destinos da Órddem de Serviço
//         mapItensBuscarDestinosOrdemServico(this.value);
//     });
//     //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// });
//
//
//
//
//
//
//
//
//
// async function visualizar_mapa_1_gerar_mapa_APAGAR() {
//     //URL
//
//     try {
//         //Pegar pontos tipos marcados
//         const checkboxesMarcados = document.querySelectorAll('.checkPontoTipo:checked');
//         const pontosTiposSelecionados = Array.from(checkboxesMarcados).map(checkbox => checkbox.value);
//
//         //Buscando Pontos
//         const res = await fetch(url_atual + 'mapas/visualizar_mapa_1/ddd/xxx', {method: 'GET', headers: {'REQUEST-ORIGIN': 'fetch'}});
//         const ocorrencias = await res.json();
//
//         //Filtrar ocorrências com base nos pontosTiposSelecionados
//         const ocorrenciasFiltradas = ocorrencias.filter(o => pontosTiposSelecionados.includes(String(o.ponto_tipo_id)));
//
//         //Pontos iniciais e centro do mapa
//         const lagoa = { lat: -22.970722, lng: -43.219185 };
//         const rocinha = { lat: -22.988558, lng: -43.239077 };
//
//         //Gerar Mapa com pontos
//         const map = new google.maps.Map(document.getElementById('visualizar_mapa_1_mapa'), {
//             zoom: 14,
//             center: lagoa
//         });
//
//         const directionsService = new google.maps.DirectionsService();
//         const directionsRenderer = new google.maps.DirectionsRenderer({
//             map: map,
//             suppressMarkers: true,
//             preserveViewport: true // <-- ESSENCIAL para manter o centro definido
//         });
//
//         //Marcadores do Banco de Dados
//         ocorrenciasFiltradas.forEach(o => {
//             new google.maps.Marker({
//                 position: { lat: Number(o.latitude), lng: Number(o.longitude) },
//                 map: map,
//                 title: `${o.name}: ${o.descricao}`,
//                 icon: 'build/assets/images/icones/mapas/'+o.icone
//             });
//         });
//
//         //Marcador da Lagoa
//         const markerA = new google.maps.Marker({
//             position: lagoa,
//             map: map,
//             title: "Lagoa Rodrigo de Freitas"
//         });
//
//         //Marcador da Rocinha
//         const markerB = new google.maps.Marker({
//             position: rocinha,
//             map: map,
//             title: "Rocinha"
//         });
//
//         const infoWindowA = new google.maps.InfoWindow();
//         const infoWindowB = new google.maps.InfoWindow();
//
//         directionsService.route({
//             origin: lagoa,
//             destination: rocinha,
//             travelMode: google.maps.TravelMode.DRIVING
//         }, function (response, status) {
//             if (status === "OK") {
//                 directionsRenderer.setDirections(response);
//
//                 const route = response.routes[0];
//                 const leg = route.legs[0];
//
//                 // // Ajusta os limites do mapa para a rota
//                 // const bounds = new google.maps.LatLngBounds();
//                 // leg.steps.forEach(step => {
//                 //     bounds.extend(step.start_location);
//                 //     bounds.extend(step.end_location);
//                 // });
//                 // map.fitBounds(bounds);
//
//                 // InfoWindows com tempo/distância
//                 const texto = `<strong>Distância:</strong> ${leg.distance.text}<br><strong>Duração:</strong> ${leg.duration.text}`;
//
//                 infoWindowA.setContent(`<strong>Lagoa x Rocinha</strong><br>${texto}`);
//                 infoWindowB.setContent(`<strong>Lagoa x Rocinha</strong><br>${texto}`);
//
//                 // Evento de hover para mostrar popups
//                 markerA.addListener("mouseover", () => infoWindowA.open(map, markerA));
//                 markerA.addListener("mouseout", () => infoWindowA.close());
//
//                 markerB.addListener("mouseover", () => infoWindowB.open(map, markerB));
//                 markerB.addListener("mouseout", () => infoWindowB.close());
//             } else {
//                 alert("Falha ao traçar a rota: " + status);
//             }
//         });
//
//         //Poligonos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//         const comunidadesChecked = document.getElementById('comunidades').checked;
//
//         if (comunidadesChecked) {
//             const response = await fetch('/build/assets/comunidades.json');
//             const comunidades = await response.json();
//
//             comunidades.forEach(comunidade => {
//                 const nome = comunidade.attributes.nome;
//                 const complexo = comunidade.attributes.complexo;
//                 const bairro = comunidade.attributes.bairro;
//
//                 const rings = comunidade.geometry.rings;
//
//                 //Formatar as coordenadas no formato { lat, lng }
//                 const paths = rings.map(ring =>
//                     ring.map(coord => ({
//                         lat: coord[1],
//                         lng: coord[0]
//                     }))
//                 );
//
//                 mapItensPoligonosComunidadesDesenhar(paths, nome, complexo, bairro, map);
//             });
//
//             function mapItensPoligonosComunidadesDesenhar(paths, nome = '', complexo = '', bairro = '', map) {
//                 const infoWindow = new google.maps.InfoWindow();
//
//                 paths.forEach((path) => {
//                     const polygon = new google.maps.Polygon({
//                         paths: path,
//                         strokeColor: "#FF0000",
//                         strokeOpacity: 0.8,
//                         strokeWeight: 2,
//                         fillColor: "#FF0000",
//                         fillOpacity: 0.35
//                     });
//
//                     polygon.setMap(map);
//
//                     polygon.addListener("mouseover", (e) => {
//                         var content = `<div style="display: flex; justify-content: space-between; align-items: center; min-width: 200px; margin-top: -2px;">
//                                                 <strong style="font-size: 14px;">${nome}</strong>
//                                             </div>
//                                             <div style="margin-top: 4px;">
//                                                 <br>
//                                                 <b>Complexo:</b> ${complexo}<br><br>
//                                                 <b>Bairro:</b> ${bairro}
//                                             </div>`;
//
//                         //var inf = 'Nome: '+nome+'\n'+'Complexo: '+complexo+'\n'+'Bairro: '+bairro;
//
//                         infoWindow.setContent(content);
//                         infoWindow.setPosition(e.latLng);
//                         infoWindow.open(map);
//                     });
//
//                     polygon.addListener("mouseout", () => {
//                         infoWindow.close();
//                     });
//                 });
//             }
//         }
//         //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//     } catch (error) {
//         console.error('Erro ao carregar ocorrências:', error);
//     }
// }
