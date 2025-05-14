function validar_frm_mapas() {
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

    //Campo: data_inicio (requerido)
    if (validacao({op:1, value:document.getElementById('data_inicio').value}) === false) {
        validacao_ok = false;
        mensagem += 'Data início requerido.'+'<br>';
    } else {
        //Campo: data_inicio (Data Válida)
        if (validacao({op: 8, value: document.getElementById('data_inicio').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data início Inválida.' + '<br>';
        }
    }

    //Campo: data_fim (requerido)
    if (validacao({op:1, value:document.getElementById('data_fim').value}) === false) {
        validacao_ok = false;
        mensagem += 'Data fim requerido.'+'<br>';
    } else {
        //Campo: data_fim (Data Válida)
        if (validacao({op: 8, value: document.getElementById('data_fim').value}) === false) {
            validacao_ok = false;
            mensagem += 'Data fim Inválida.' + '<br>';
        }
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

async function visualizar_mapa_1_gerar_mapa() {
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

                desenharPoligonos(paths, nome, complexo, bairro, map);
            });

            function desenharPoligonos(paths, nome = '', complexo = '', bairro = '', map) {
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

document.addEventListener("DOMContentLoaded", function(event) {
    //Botão: visualizar_mapa_1_dropdown''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    if (document.getElementById('visualizar_mapa_1_dropdown')) {
        document.getElementById('visualizar_mapa_1_dropdown').addEventListener('click', function () {
            //Hide no crudTable usando a função do CRUD principal
            crudConfiguracao({p_crudTable: 'hide'});

            //Gerar mapa
            visualizar_mapa_1_gerar_mapa();

            //Show no visualizar_mapa_1
            document.getElementById('visualizar_mapa_1').style.display = 'block';
        });
    }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: visualizar_mapa_1_gerar_mapa'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('visualizar_mapa_1_gerar_mapa').addEventListener('click', function() {
        visualizar_mapa_1_gerar_mapa();
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão: visualizar_mapa_1_cancelar'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    document.getElementById('visualizar_mapa_1_cancelar').addEventListener('click', function() {
        //Hide no visualizar_mapa_1
        document.getElementById('visualizar_mapa_1').style.display = 'none';

        //Chamar função usada para cancelar operação no CRUD principal
        crudCancelOperation();
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
