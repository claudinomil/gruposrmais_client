//Variaveis de controle global
let map; //Armazena o Mapa
let poligonosComunidades = []; //Array de Polígonos de Comunidades
let pontosInteressePreDefinidos = []; //Array de Pontos Interesse Pré-definidos
let pontosPersonalizados = []; //Array de Pontos Personalizados
let rotasPersonalizadas = []; //Array de Rotas Personalizadas
let coresRotasFixas = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6', '#16A085', '#E67E22', '#8E44AD', '#2ECC71', '#E74C3C'];
let corRotaIndex = 0;

async function mp_mapa(centroLat=0, centroLng=0) {
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

async function mp_pontos_interesse(mapa_ponto_tipo_id=0) {
    if (mapa_ponto_tipo_id == 0) {return false;}

    try {
        const mapaPontoTipoChecked = document.getElementById('mapa_ponto_tipo_'+mapa_ponto_tipo_id).checked;

        if (mapaPontoTipoChecked) {
            //URL
            var url_atual = window.location.protocol + '//' + window.location.host + '/';

            //Buscando Pontos
            const res = await fetch(url_atual + 'mapas_pontos_interesse/mapa_pontos_tipo/'+mapa_ponto_tipo_id, {method: 'GET', headers: {'REQUEST-ORIGIN': 'fetch'}});
            const json = await res.json();
            const pontosInteresse = json.success;

            //Marcadores do Banco de Dados
            pontosInteresse.forEach(o => {
                const marker = new google.maps.Marker({
                    position: { lat: Number(o.latitude), lng: Number(o.longitude) },
                    map: map,
                    title: `${o.name}: ${o.descricao}`,
                    icon: 'build/assets/images/icones/mapas/' + o.icone
                });

                pontosInteressePreDefinidos.push({
                    mapa_ponto_tipo_id: o.mapa_ponto_tipo_id,
                    marker: marker
                });
            });
        } else {
            mp_pontos_interesse_remover(mapa_ponto_tipo_id);
        }
    } catch (error) {
        alert('Erro ao carregar:'+error);
    }
}

function mp_pontos_interesse_remover(mapa_ponto_tipo_id) {
    pontosInteressePreDefinidos = pontosInteressePreDefinidos.filter(item => {
        if (item.mapa_ponto_tipo_id === mapa_ponto_tipo_id) {
            item.marker.setMap(null); // Remove do mapa
            return false; // Remove do array
        }

        return true; // Mantém no array
    });
}

async function mp_mapa_comunidades() {
    if (!map) {return false;}

    try {
        const comunidadesChecked = document.getElementById('comunidades').checked;

        if (comunidadesChecked) {
            const response = await fetch('/build/assets/comunidades.json');
            const comunidades = await response.json();

            comunidades.forEach(comunidade => {
                const nome = comunidade.attributes.nome;
                const complexo = comunidade.attributes.complexo;
                const bairro = comunidade.attributes.bairro;

                const rings = comunidade.geometry.rings;

                //Formatar as coordenadas no formato { lat, lng }
                const paths = rings.map(ring =>
                    ring.map(coord => ({
                        lat: coord[1],
                        lng: coord[0]
                    }))
                );

                mp_mapa_comunidades_desenhar_poligonos(paths, nome, complexo, bairro, map);
            });
        } else {
            mp_mapa_comunidades_remover();
        }
    } catch (error) {
        alert('Erro ao carregar:'+error);
    }
}

function mp_mapa_comunidades_desenhar_poligonos(paths, nome = '', complexo = '', bairro = '', map) {
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
        poligonosComunidades.push(polygon); // <--- Adiciona no array

        polygon.addListener("mouseover", (e) => {
            var content = `<div style="display: flex; justify-content: space-between; align-items: center; min-width: 200px; margin-top: -2px;">
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
}

function mp_mapa_comunidades_remover() {
    poligonosComunidades.forEach(polygon => {
        polygon.setMap(null); // Remove do mapa
    });

    poligonosComunidades = []; // Limpa o array
}

function mp_mapa_POIs_google() {
    /*
     * poi: Pontos de interesse em geral
     * poi.attraction: Pontos turísticos
     * poi.park: Parques e áreas verdes
     * poi.school: Escolas e universidades
     * poi.place_of_worship: Igrejas, templos, mesquitas, etc
     * poi.medical: Hospitais, clínicas, postos de saúde
     * poi.business: Estabelecimentos comerciais
     * poi.government: Prédios e órgãos do governo
     * poi.sports_complex: Áreas esportivas (estádios, quadras, etc.)
     */

    if (!map) return;

    const config = [
        { id: "pois_google_attraction", featureType: "poi.attraction" },
        { id: "pois_google_park", featureType: "poi.park" },
        { id: "pois_google_school", featureType: "poi.school" },
        { id: "pois_google_place_of_worship", featureType: "poi.place_of_worship" },
        { id: "pois_google_medical", featureType: "poi.medical" },
        { id: "pois_google_business", featureType: "poi.business" },
        { id: "pois_google_government", featureType: "poi.government" },
        { id: "pois_google_sports_complex", featureType: "poi.sports_complex" }
    ];

    const estilos = [];

    // Desativa todos os POIs específicos que NÃO estão marcados
    config.forEach(item => {
        const checkbox = document.getElementById(item.id);
        estilos.push({
            featureType: item.featureType,
            elementType: "all",
            stylers: [{ visibility: checkbox && checkbox.checked ? "on" : "off" }]
        });
    });

    map.setOptions({ styles: estilos });
}

function mp_config_ofcanvas(op=0) {
    document.getElementById('div_ponto_personalizado').style.display = 'none';
    document.getElementById('div_rota_personalizada').style.display = 'none';
    document.getElementById('grade_ponto_personalizado').style.display = 'none';
    document.getElementById('grade_rota_personalizada').style.display = 'none';

    if (op == 1) {
        document.getElementById('div_ponto_personalizado').style.display = '';
    }

    if (op == 2) {
        document.getElementById('div_rota_personalizada').style.display = '';
    }

    if (op == 3) {
        if (pontosPersonalizados.length > 0) {
            document.getElementById('grade_ponto_personalizado').style.display = '';
        }

        if (rotasPersonalizadas.length > 0) {
            document.getElementById('grade_rota_personalizada').style.display = '';
        }
    }
}

async function mp_visualizar(id=0) {
    //URL
    var url_atual = window.location.protocol + '//' + window.location.host + '/';

    try {
        //Buscando Pontos
        const res = await fetch(url_atual + 'mapas/visualizar_mapa/'+id, {method: 'GET', headers: {'REQUEST-ORIGIN': 'fetch'}});
        const ocorrencias = await res.json();

        //Filtrar ocorrências com base nos pontosTiposSelecionados
        const ocorrenciasFiltradas = ocorrencias.filter(o => pontosTiposSelecionados.includes(String(o.mapa_ponto_tipo_id)));

        //Pontos iniciais e centro do mapa
        const lagoa = { lat: -22.970722, lng: -43.219185 };
        const rocinha = { lat: -22.988558, lng: -43.239077 };

        //Gerar Mapa com pontos
        const map = new google.maps.Map(document.getElementById('mp_mapa'), {
            zoom: 14,
            center: lagoa
        });

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            suppressMarkers: true,
            preserveViewport: true // <-- ESSENCIAL para manter o centro definido
        });

        //Marcadores do Banco de Dados
        ocorrenciasFiltradas.forEach(o => {
            new google.maps.Marker({
                position: { lat: Number(o.latitude), lng: Number(o.longitude) },
                map: map,
                title: `${o.name}: ${o.descricao}`,
                icon: 'build/assets/images/icones/mapas/'+o.icone
            });
        });

        /***************
         Rota entre a Lagoa e Rocinha - Cel Vinicius mandou retirar

         //Marcador da Lagoa
         const markerA = new google.maps.Marker({
            position: lagoa,
            map: map,
            title: "Lagoa Rodrigo de Freitas"
        });

         //Marcador da Rocinha
         const markerB = new google.maps.Marker({
            position: rocinha,
            map: map,
            title: "Rocinha"
        });

         const infoWindowA = new google.maps.InfoWindow();
         const infoWindowB = new google.maps.InfoWindow();

         directionsService.route({
            origin: lagoa,
            destination: rocinha,
            travelMode: google.maps.TravelMode.DRIVING
        }, function (response, status) {
            if (status === "OK") {
                directionsRenderer.setDirections(response);

                const route = response.routes[0];
                const leg = route.legs[0];

                //InfoWindows com tempo/distância
                const texto = `<strong>Distância:</strong> ${leg.distance.text}<br><strong>Duração:</strong> ${leg.duration.text}`;

                infoWindowA.setContent(`<strong>Lagoa x Rocinha</strong><br>${texto}`);
                infoWindowB.setContent(`<strong>Lagoa x Rocinha</strong><br>${texto}`);

                // Evento de hover para mostrar popups
                markerA.addListener("mouseover", () => infoWindowA.open(map, markerA));
                markerA.addListener("mouseout", () => infoWindowA.close());

                markerB.addListener("mouseover", () => infoWindowB.open(map, markerB));
                markerB.addListener("mouseout", () => infoWindowB.close());
            } else {
                alert("Falha ao traçar a rota: " + status);
            }
        });
         ****************/

            //Poligonos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        const comunidadesChecked = document.getElementById('comunidades').checked;

        if (comunidadesChecked) {
            const response = await fetch('/build/assets/comunidades.json');
            const comunidades = await response.json();

            comunidades.forEach(comunidade => {
                const nome = comunidade.attributes.nome;
                const complexo = comunidade.attributes.complexo;
                const bairro = comunidade.attributes.bairro;

                const rings = comunidade.geometry.rings;

                //Formatar as coordenadas no formato { lat, lng }
                const paths = rings.map(ring =>
                    ring.map(coord => ({
                        lat: coord[1],
                        lng: coord[0]
                    }))
                );

                mp_mapa_comunidades_desenhar_poligonos(paths, nome, complexo, bairro, map);
            });

            function mp_mapa_comunidades_desenhar_poligonos(paths, nome = '', complexo = '', bairro = '', map) {
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

                    polygon.addListener("mouseover", (e) => {
                        var content = `<div style="display: flex; justify-content: space-between; align-items: center; min-width: 200px; margin-top: -2px;">
                                                <strong style="font-size: 14px;">${nome}</strong>
                                            </div>
                                            <div style="margin-top: 4px;">
                                                <br>
                                                <b>Complexo:</b> ${complexo}<br><br>
                                                <b>Bairro:</b> ${bairro}
                                            </div>`;

                        //var inf = 'Nome: '+nome+'\n'+'Complexo: '+complexo+'\n'+'Bairro: '+bairro;

                        infoWindow.setContent(content);
                        infoWindow.setPosition(e.latLng);
                        infoWindow.open(map);
                    });

                    polygon.addListener("mouseout", () => {
                        infoWindow.close();
                    });
                });
            }
        }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    } catch (error) {
        console.error('Erro ao carregar ocorrências:', error);
    }
}









//Pontos Personalizados'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function mp_validar_form_ponto_personalizado() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: mapa_ponto_tipo_id (requerido)
    if (validacao({op:1, value:document.getElementById('mapa_ponto_tipo_id').value}) === false) {
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

    if (mp_validar_form_ponto_personalizado() === false) {return;}

    const form = e.target;
    const pontoId = form.ponto_id.value || Date.now(); // Gera ID se for novo
    const nome = form.name.value;
    const descricao = form.descricao.value;
    const tipoId = form.mapa_ponto_tipo_id.value;
    const tipoNome = form.mapa_ponto_tipo_id.selectedOptions[0].text;
    const lat = parseFloat(form.latitude.value);
    const lng = parseFloat(form.longitude.value);
    const icone = form.icone.value;

    //Verifica se já existe (edição)
    const existente = pontosPersonalizados.find(p => p.id == pontoId);

    if (existente) {
        //Atualiza marcador
        existente.marker.setPosition({ lat, lng });
        existente.marker.setIcon('build/assets/images/icones/mapas/' + icone);
        existente.nome = nome;
        existente.descricao = descricao;
        existente.tipoId = tipoId;
        existente.tipoNome = tipoNome;
    } else {
        //Cria marcador novo
        const marker = new google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: nome,
            icon: 'build/assets/images/icones/mapas/' + icone
        });

        pontosPersonalizados.push({ id: pontoId, marker, nome, descricao, tipoId, tipoNome });
    }

    mp_grade_pontos_personalizados_atualizar();

    form.reset();
});

function mp_grade_pontos_personalizados_atualizar() {
    const tbody = document.querySelector('#tabelaPontos tbody');
    tbody.innerHTML = '';

    pontosPersonalizados.forEach(ponto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${ponto.tipoNome}<br>${ponto.nome}</td>
            <td class="text-center text-end">
                <button class="btn btn-sm btn-outline-primary me-1" title="Ver no mapa" onclick="mp_ponto_personalizado_ver('${ponto.id}')">
                    <i class="fas fa-map-marker-alt"></i>
                </button>
                <button class="btn btn-sm btn-outline-secondary me-1" title="Editar" onclick="mp_ponto_personalizado_editar('${ponto.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" title="Excluir" onclick="mp_ponto_personalizado_remover('${ponto.id}')">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    mp_config_ofcanvas(3);
}

function mp_ponto_personalizado_ver(id) {
    const ponto = pontosPersonalizados.find(p => p.id == id);
    if (!ponto) return;

    // Centraliza no ponto
    map.panTo(ponto.marker.getPosition());
    map.setZoom(17); // Ajuste o nível de zoom conforme desejar

    // (Opcional) Abre um InfoWindow com o nome/descrição
    const infoWindow = new google.maps.InfoWindow({
        content: `<strong>${ponto.tipoNome}</strong><br>${ponto.nome}`
    });
    infoWindow.open(map, ponto.marker);
}

function mp_ponto_personalizado_editar(id) {
    const ponto = pontosPersonalizados.find(p => p.id == id);
    if (!ponto) return;

    const form = document.getElementById('form_ponto_personalizado');
    form.ponto_id.value = ponto.id;
    form.name.value = ponto.nome;
    form.descricao.value = ponto.descricao;
    form.mapa_ponto_tipo_id.value = ponto.tipoId;
    form.latitude.value = ponto.marker.getPosition().lat();
    form.longitude.value = ponto.marker.getPosition().lng();
    form.icone.value = ponto.marker.getIcon().split('/').pop();
alert('1');
    mp_config_ofcanvas(1);
}

function mp_ponto_personalizado_remover(id) {
    const index = pontosPersonalizados.findIndex(p => p.id == id);
    if (index !== -1) {
        pontosPersonalizados[index].marker.setMap(null);
        pontosPersonalizados.splice(index, 1);
        mp_grade_pontos_personalizados_atualizar();
    }
}
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Rotas Personalizadas''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function mp_validar_form_rota_personalizada() {
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

    if (mp_validar_form_rota_personalizada() === false) {return;}

    const form = e.target;
    const rotaId = form.rota_id.value || Date.now(); // Gera ID se for novo
    const cepOrigem = form.cep_origem.value;
    const numeroOrigem = form.numero_origem.value;
    const complementoOrigem = form.complemento_origem.value;
    const cepDestino = form.cep_destino.value;
    const numeroDestino = form.numero_destino.value;
    const complementoDestino = form.complemento_destino.value;

    const origem = `${cepOrigem}, ${numeroOrigem} ${complementoOrigem}`;
    const destino = `${cepDestino}, ${numeroDestino} ${complementoDestino}`;

    // Verifica se é edição
    const existente = rotasPersonalizadas.find(r => r.id == rotaId);

    if (existente) {
        existente.origem = origem;
        existente.destino = destino;
        existente.cepOrigem = cepOrigem;
        existente.cepDestino = cepDestino;

        // Remove rota anterior do mapa se houver
        if (existente.directionsRenderer) {
            existente.directionsRenderer.setMap(null);
        }
    } else {
        rotasPersonalizadas.push({ id: rotaId, origem, destino, cepOrigem, cepDestino });
    }

    //Desenha a rota no mapa
    const directionsService = new google.maps.DirectionsService();
    const corLinha = mp_rota_personalizada_cor(); // Pega a próxima cor da lista

    const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true, // Suprime os ícones padrão
        polylineOptions: {
            strokeColor: corLinha,
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
            //Gerando icone da cor da rota'''''''''''''''''''''''''''''''''
            const leg = result.routes[0].legs[0];

            //Ícone SVG com a cor da linha
            const svgIcon = {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: corLinha,
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: '#000'
            };

            //Criar marcador de origem
            const marcadorOrigem = new google.maps.Marker({
                position: leg.start_location,
                map: map,
                title: 'Origem',
                icon: svgIcon
            });

            //Criar marcador de destino
            const marcadorDestino = new google.maps.Marker({
                position: leg.end_location,
                map: map,
                title: 'Destino',
                icon: svgIcon
            });
            //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            directionsRenderer.setDirections(result);

            const rota = rotasPersonalizadas.find(r => r.id == rotaId);
            if (rota) {
                rota.directionsRenderer = directionsRenderer;
                rota.cor = corLinha; // (opcional) salva a cor junto
            }

            mp_grade_rotas_personalizadas_atualizar();

            form.reset();
        } else {
            alert('Erro ao traçar rota: ' + status);
        }
    });
});

function mp_grade_rotas_personalizadas_atualizar() {
    const tbody = document.querySelector('#tabelaRotas tbody');
    tbody.innerHTML = '';

    rotasPersonalizadas.forEach(rota => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${rota.cepOrigem}</td>
            <td>${rota.cepDestino}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-primary me-1" title="Ver no mapa" onclick="mp_rota_personalizada_ver('${rota.id}')">
                    <i class="fas fa-route"></i>
                </button>
                <button class="btn btn-sm btn-outline-secondary me-1" title="Editar" onclick="mp_rota_personalizada_editar('${rota.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" title="Excluir" onclick="mp_rota_personalizada_remover('${rota.id}')">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function mp_rota_personalizada_ver(id) {
    const rota = rotasPersonalizadas.find(r => r.id == id);
    if (!rota || !rota.directionsRenderer) return;
    rota.directionsRenderer.setMap(map);
    map.setZoom(13);
}

function mp_rota_personalizada_editar(id) {
    const rota = rotasPersonalizadas.find(r => r.id == id);
    if (!rota) return;

    const form = document.getElementById('form_rota_personalizada');
    form.rota_id.value = rota.id;

    // Extração básica do cep e número
    const [cepOrigem] = rota.origem.split(',');
    const [cepDestino] = rota.destino.split(',');

    form.cep_origem.value = cepOrigem.trim();
    form.numero_origem.value = ''; // Não armazenado separadamente
    form.complemento_origem.value = '';
    form.cep_destino.value = cepDestino.trim();
    form.numero_destino.value = '';
    form.complemento_destino.value = '';

    document.getElementById('div_rota_personalizada').style.display = 'block';
}

function mp_rota_personalizada_remover(id) {
    const index = rotasPersonalizadas.findIndex(r => r.id == id);
    if (index !== -1) {
        const rota = rotasPersonalizadas[index];
        if (rota.directionsRenderer) {
            rota.directionsRenderer.setMap(null);
        }
        rotasPersonalizadas.splice(index, 1);
        mp_grade_rotas_personalizadas_atualizar();

        //Remover icone
        if (rota.marcadorOrigem) rota.marcadorOrigem.setMap(null);
        if (rota.marcadorDestino) rota.marcadorDestino.setMap(null);
    }
}

function mp_rota_personalizada_cor() {
    const cor = coresRotasFixas[corRotaIndex % coresRotasFixas.length];
    corRotaIndex++;
    return cor;
}
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''









document.addEventListener("DOMContentLoaded", function(event) {
    //Mapa inicial''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    mp_mapa();
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: mp_escolher''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('mp_escolher').addEventListener('click', function () {
        //Gerar mapa
        mp_visualizar();
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});









async function visualizar_mapa_1_gerar_mapa_APAGAR() {
    //URL
    var url_atual = window.location.protocol + '//' + window.location.host + '/';

    try {
        //Pegar pontos tipos marcados
        const checkboxesMarcados = document.querySelectorAll('.checkPontoTipo:checked');
        const pontosTiposSelecionados = Array.from(checkboxesMarcados).map(checkbox => checkbox.value);

        //Buscando Pontos
        const res = await fetch(url_atual + 'mapas/visualizar_mapa_1/ddd/xxx', {method: 'GET', headers: {'REQUEST-ORIGIN': 'fetch'}});
        const ocorrencias = await res.json();

        //Filtrar ocorrências com base nos pontosTiposSelecionados
        const ocorrenciasFiltradas = ocorrencias.filter(o => pontosTiposSelecionados.includes(String(o.mapa_ponto_tipo_id)));

        //Pontos iniciais e centro do mapa
        const lagoa = { lat: -22.970722, lng: -43.219185 };
        const rocinha = { lat: -22.988558, lng: -43.239077 };

        //Gerar Mapa com pontos
        const map = new google.maps.Map(document.getElementById('visualizar_mapa_1_mapa'), {
            zoom: 14,
            center: lagoa
        });

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            suppressMarkers: true,
            preserveViewport: true // <-- ESSENCIAL para manter o centro definido
        });

        //Marcadores do Banco de Dados
        ocorrenciasFiltradas.forEach(o => {
            new google.maps.Marker({
                position: { lat: Number(o.latitude), lng: Number(o.longitude) },
                map: map,
                title: `${o.name}: ${o.descricao}`,
                icon: 'build/assets/images/icones/mapas/'+o.icone
            });
        });

        //Marcador da Lagoa
        const markerA = new google.maps.Marker({
            position: lagoa,
            map: map,
            title: "Lagoa Rodrigo de Freitas"
        });

        //Marcador da Rocinha
        const markerB = new google.maps.Marker({
            position: rocinha,
            map: map,
            title: "Rocinha"
        });

        const infoWindowA = new google.maps.InfoWindow();
        const infoWindowB = new google.maps.InfoWindow();

        directionsService.route({
            origin: lagoa,
            destination: rocinha,
            travelMode: google.maps.TravelMode.DRIVING
        }, function (response, status) {
            if (status === "OK") {
                directionsRenderer.setDirections(response);

                const route = response.routes[0];
                const leg = route.legs[0];

                // // Ajusta os limites do mapa para a rota
                // const bounds = new google.maps.LatLngBounds();
                // leg.steps.forEach(step => {
                //     bounds.extend(step.start_location);
                //     bounds.extend(step.end_location);
                // });
                // map.fitBounds(bounds);

                // InfoWindows com tempo/distância
                const texto = `<strong>Distância:</strong> ${leg.distance.text}<br><strong>Duração:</strong> ${leg.duration.text}`;

                infoWindowA.setContent(`<strong>Lagoa x Rocinha</strong><br>${texto}`);
                infoWindowB.setContent(`<strong>Lagoa x Rocinha</strong><br>${texto}`);

                // Evento de hover para mostrar popups
                markerA.addListener("mouseover", () => infoWindowA.open(map, markerA));
                markerA.addListener("mouseout", () => infoWindowA.close());

                markerB.addListener("mouseover", () => infoWindowB.open(map, markerB));
                markerB.addListener("mouseout", () => infoWindowB.close());
            } else {
                alert("Falha ao traçar a rota: " + status);
            }
        });

        //Poligonos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        const comunidadesChecked = document.getElementById('comunidades').checked;

        if (comunidadesChecked) {
            const response = await fetch('/build/assets/comunidades.json');
            const comunidades = await response.json();

            comunidades.forEach(comunidade => {
                const nome = comunidade.attributes.nome;
                const complexo = comunidade.attributes.complexo;
                const bairro = comunidade.attributes.bairro;

                const rings = comunidade.geometry.rings;

                //Formatar as coordenadas no formato { lat, lng }
                const paths = rings.map(ring =>
                    ring.map(coord => ({
                        lat: coord[1],
                        lng: coord[0]
                    }))
                );

                mp_mapa_comunidades_desenhar_poligonos(paths, nome, complexo, bairro, map);
            });

            function mp_mapa_comunidades_desenhar_poligonos(paths, nome = '', complexo = '', bairro = '', map) {
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

                    polygon.addListener("mouseover", (e) => {
                        var content = `<div style="display: flex; justify-content: space-between; align-items: center; min-width: 200px; margin-top: -2px;">
                                                <strong style="font-size: 14px;">${nome}</strong>
                                            </div>
                                            <div style="margin-top: 4px;">
                                                <br>
                                                <b>Complexo:</b> ${complexo}<br><br>
                                                <b>Bairro:</b> ${bairro}
                                            </div>`;

                        //var inf = 'Nome: '+nome+'\n'+'Complexo: '+complexo+'\n'+'Bairro: '+bairro;

                        infoWindow.setContent(content);
                        infoWindow.setPosition(e.latLng);
                        infoWindow.open(map);
                    });

                    polygon.addListener("mouseout", () => {
                        infoWindow.close();
                    });
                });
            }
        }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    } catch (error) {
        console.error('Erro ao carregar ocorrências:', error);
    }
}
