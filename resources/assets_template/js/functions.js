//Funções para API Google - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para API Google - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

/*
Retorna endereço via CEP
Ex: const addressOrigem = await getAddressFromCep(cepOrigem);
*/
async function getAddressFromCep(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.erro) {
        return `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}, Brasil`;
    } else {
        throw new Error(`CEP ${cep} não encontrado`);
    }
}

/*
Retorna coordenadas via endereço
Ex: const coordsOrigem = await getCoordinatesFromAddress(addressOrigem);
    coordsOrigem.lat e coordsOrigem.lon
*/
async function getCoordinatesFromAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    } else {
        throw new Error(`Coordenadas não encontradas para: ${address}`);
    }
}

/*
API Google
Retorna Distância e Duração entre dois pontos
*/
async function pegarDistanciaDuracao(lat1, lon1, lat2, lon2) {
    const origem = `${lat1},${lon1}`;
    const destino = `${lat2},${lon2}`;
    const url = `/build/proxy-directions.php?origem=${origem}&destino=${destino}`; // usando seu proxy PHP

    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (dados.routes?.length) {
        const distancia = dados.routes[0].legs[0].distance.text;
        const duracao = dados.routes[0].legs[0].duration.text;
        return { distancia, duracao };
    } else {
        throw new Error("Não foi possível obter a distância.");
    }
}

/*
API Google
Retorna a rota entre dois pontos passo a passo
*/
async function pegarRotaPassoAPasso(lat1, lon1, lat2, lon2, comHtml = false) {
    const origem = `${lat1},${lon1}`;
    const destino = `${lat2},${lon2}`;
    const url = `/build/proxy-directions.php?origem=${origem}&destino=${destino}`;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (dados.routes?.length) {
        const passos = dados.routes[0].legs[0].steps;

        const rota = passos.map((step, index) => {
            let instrucao = step.html_instructions;
            const distancia = step.distance.text;

            if (!comHtml) {
                // Substitui <div ...> por \n e remove todas as tags HTML restantes
                instrucao = instrucao
                    .replace(/<div[^>]*>/gi, ', ')
                    .replace(/<\/div>/gi, '')
                    .replace(/<[^>]+>/g, ''); // Remove o restante das tags HTML
            }

            return `${index + 1}. ${instrucao.trim()} (${distancia})`;
        });

        return rota;
    } else {
        throw new Error("Não foi possível obter a rota.");
    }
}

/*
API Google
Retorna Imagem Base64 de dois pontos em um mapa
*/
async function gerarMapaBase64(lat1, lon1, lat2, lon2) {
    const url = `/build/gerar-mapa.php?lat1=${lat1}&lon1=${lon1}&lat2=${lat2}&lon2=${lon2}`;
    const res = await fetch(url);
    const dados = await res.json();

    if (dados.status === "ok") {
        return dados.base64; // isso você pode jogar direto no jsPDF
    } else {
        throw new Error("Erro ao gerar imagem base64.");
    }
}

/*
API Google
Retorna tradução de texto
*/
async function traduzirTextoGoogle(texto, idiomaOrigem = 'pt', idiomaDestino = 'en') {
    const apiKey = 'AIzaSyAvEtoAQmil8RS2Gcl9csltgrVjdbnTHqQ';
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const body = {q: texto, source: idiomaOrigem, target: idiomaDestino, format: 'text'};

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (data.data && data.data.translations && data.data.translations.length > 0) {
            return data.data.translations[0].translatedText;
        } else {
            throw new Error('Tradução não encontrada.');
        }
    } catch (erro) {
        console.error('Erro na tradução:', erro);
        return null;
    }
}

//Distância e Duração
async function distanciaDuracaoPontos(cepOrigem, cepDestino) {
    try {
        //Pegar Endereco dos CEPs
        const addressOrigem = await getAddressFromCep(cepOrigem);
        const addressDestino = await getAddressFromCep(cepDestino);

        //Pegar Coordenadas dos Endereços
        const coordsOrigem = await getCoordinatesFromAddress(addressOrigem);
        const coordsDestino = await getCoordinatesFromAddress(addressDestino);

        //Pegar distância e duração
        const distanciaDuracao = await pegarDistanciaDuracao(coordsOrigem.lat, coordsOrigem.lon, coordsDestino.lat, coordsDestino.lon);
        return distanciaDuracao;
    } catch (error) {
        console.error("Erro:", error);
    }
}

//Rota Passo-a-Passo
async function rotaPassoAPasso(cepOrigem, cepDestino) {
    try {
        // Pegar Endereco dos CEPs
        const addressOrigem = await getAddressFromCep(cepOrigem);
        const addressDestino = await getAddressFromCep(cepDestino);

        // Pegar Coordenadas dos Endereços
        const coordsOrigem = await getCoordinatesFromAddress(addressOrigem);
        const coordsDestino = await getCoordinatesFromAddress(addressDestino);

        // Pegar passos da rota e RETORNAR!
        const rota = await pegarRotaPassoAPasso(coordsOrigem.lat, coordsOrigem.lon, coordsDestino.lat, coordsDestino.lon);

        return rota;

    } catch (error) {
        console.error("Erro:", error);
        throw error; // repassa o erro para o .catch de fora, se necessário
    }
}

//Gerar imagem Mapa
async function gerarMapaImagem(cepOrigem, cepDestino) {
    try {
        //Pegar Endereco dos CEPs
        const addressOrigem = await getAddressFromCep(cepOrigem);
        const addressDestino = await getAddressFromCep(cepDestino);

        //Pegar Coordenadas dos Endereços
        const coordsOrigem = await getCoordinatesFromAddress(addressOrigem);
        const coordsDestino = await getCoordinatesFromAddress(addressDestino);

        //Mapa
        const imagemBase64 = await gerarMapaBase64(coordsOrigem.lat, coordsOrigem.lon, coordsDestino.lat, coordsDestino.lon);

        return imagemBase64;
    } catch (error) {
        console.error("Erro:", error);
    }
}


/*
//Chamada Distância e Duração
distanciaDuracaoPontos('20735-130', '22420-040')
    .then(dado => {
        console.log('Distância:', dado.distancia);
        console.log('Duração:', dado.duracao);
    })
    .catch(err => {
        console.error("Erro distanciaDuracaoPontos:", err);
    });

//Chamada Rota Passo-a-Passo
rotaPassoAPasso('20735-130', '22420-040')
    .then(dado => {
        dado.forEach(instrucao => {
            console.log('Rota: ', instrucao);
        });
    })
    .catch(err => {
        console.error("Erro rotaPassoAPasso:", err);
    });

//Chamada Mapa base64
gerarMapaImagem('20735-130', '22420-040')
    .then(dado => {
        document.getElementById('imagemMapa1').src = dado;
    })
    .catch(err => {
        console.error("Erro gerarMapaImagem:", err);
    });
*/


//Funções para API Google - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para API Google - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//API FOGO CRUZADO''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
const apiFogoCruzadoLogin = async () => {
    const response = await fetch('https://api-service.fogocruzado.org.br/api/v2/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: 'claudinomilhomens@gmail.com',
            password: 'claudino1971'
        })
    });

    if (!response.ok) {
        alert('Erro apiFogoCruzadoLogin: ', response.status);
        return null;
    }

    const data = await response.json();

    return data.data.accessToken;
};

const apiFogoCruzadoOccurrences = async (token) => {
    //INFORMAÇÕES DE USO
    var estado_id_rj = "b112ffbe-17b3-4ad0-8f2a-2038745d1d14";

    var cidade_id_belford_roxo = "88959ad9-b2f5-4a33-a8ec-ceff5a572ca5";
    var cidade_id_cachoeiras_de_macacu = "9d7b569c-ec84-4908-96ab-3706ec3bfc57";
    var cidade_id_duque_de_caxias = "2cded3bc-5dfa-425b-a274-5c1a4b8838d5";
    var cidade_id_guapimirim = "b920f9ed-fa79-4fc0-bc53-ceb14598fa45";
    var cidade_id_itaborai = "74000596-0e8d-4762-af55-6fba1db74ceb";
    var cidade_id_itaguai = "e6aa9117-3816-4f42-a7da-1b4b8eef6cdd";
    var cidade_id_japeri = "dbd21829-f83c-4479-86c8-3f2953021740";
    var cidade_id_mage = "d4231ca8-3c08-42e2-b877-ad00cc49cecf";
    var cidade_id_marica = "bd078555-2b04-4e46-a637-e87d70551a04";
    var cidade_id_mesquita = "5a86d707-02ec-4e09-b497-b000b22f156b";
    var cidade_id_nilopolis = "2a69c719-bffc-4839-b832-1ac02b9e873f";
    var cidade_id_niteroi = "07335d05-e371-42fd-a8f0-42853ccf1a0f";
    var cidade_id_nova_iguacu = "7ab2a9b5-7727-4460-8007-eb58b78cc7c9";
    var cidade_id_paracambi = "6752c981-6a86-4e34-a484-f8b1e2228393";
    var cidade_id_queimados = "17d2880a-2295-4a24-a480-96d9fa0d40d4";
    var cidade_id_rio_bonito = "712f930a-db93-4363-a3c9-9eccc4f12a5f";
    var cidade_id_rio_de_janeiro = "d1bf56cc-6d85-4e6a-a5f5-0ab3f4074be3";
    var cidade_id_sao_goncalo = "ab6bc6ed-952f-48f9-ad84-cbfd3dde53ba";
    var cidade_id_sao_joao_de_meriti = "82f35929-e84c-4842-8181-1dc45a22785f";
    var cidade_id_seropedica = "7ee9135d-6f6a-4f95-91bb-c3a5021d409a";
    var cidade_id_tangua = "c46741dc-bdd2-43d0-92fc-f4d95ed61bf1";

    /*
    EXEMPLOS:

    Filtrando por várias cidades:
    https://api-service.fogocruzado.org.br/api/v2/occurrences
    ?order=ASC
    &page=1
    &take=20
    &idState=813ca36b-91e3-4a18-b408-60b27a1942ef
    &idCities=d79d2347-bd0d-40aa-8dcc-04134cffd988
    &idCities=e37f7ad7-cd64-4279-946a-8d689b9b934b

    Filtrando por data:
    https://api-service.fogocruzado.org.br/api/v2/occurrences
    ?initialdate=2023-01-01
    &finaldate=2023-07-13
    &idState=b112ffbe-17b3-4ad0-8f2a-2038745d1d14
    &typeOccurrence=withVictim
    */

    var data_inicio = "2025-04-07";
    var data_final = "2025-04-07";

    var url = "";

    url += "https://api-service.fogocruzado.org.br/api/v2/occurrences";
    url += "?initialdate="+data_inicio;
    url += "&finaldate="+data_final;
    url += "&idState="+estado_id_rj;
    url += "&idCities="+cidade_id_rio_de_janeiro;
    url += "&idCities="+cidade_id_niteroi;

    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    if (!response.ok) {
        alert('Erro apiFogoCruzadoOccurrences: ', response.status);
        return;
    }

    return await response.json();
};

const apiFogoCruzadoMain = async () => {
    const token = await apiFogoCruzadoLogin();

    if (token) {
        const ocorrencias = await apiFogoCruzadoOccurrences(token);

        if (ocorrencias.code == 200) {
            const dados = ocorrencias.data;

            var numOcor = 0;

            dados.forEach(function(item) {
                numOcor++;

                console.log('OCORRÊNCIA N. : '+numOcor+' XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
                console.log('Endereço: ', item.address);
                console.log('Vizinhança: ', item.neighborhood.name);
                if (item.locality) {console.log('Localização: ', item.locality.name);}
                console.log('Data: ', item.date);
                console.log('Ação Policial: ', item.policeAction);
                console.log('Presença do Agente: ', item.agentPresence);
                console.log('Razão Principal: ', item.contextInfo.mainReason.name);
                console.log('Unidade Policial: ', item.contextInfo.policeUnit);
                if (item.clippings) {console.log('Recortes: ', item.clippings.name);}

                if (item.victims) {
                    let vitimas = item.victims;

                    var numVit = 0;

                    vitimas.forEach(function(vitima) {
                        numVit++;

                        console.log('VÍTIMA N. : ' + numVit + ' YYYYYYYYYYYYYYYYYYYY');
                        console.log('Tipo: ', vitima.type);
                        console.log('Situação: ', vitima.situation);
                        console.log('Idade: ', vitima.age);
                        console.log('Gênero: ', vitima.genre.name);
                        console.log('Raça: ', vitima.race);
                        console.log('FIM DA VÍTIMA N. : '+numVit+' YYYYYYYYYYYYYYYYYYYY');
                    });
                }

                console.log('FIM DA OCORRÊNCIA N. : '+numOcor+' XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
            });


            //console.log(ocorrencias);


        } else {
            alert('Erro apiFogoCruzadoMain: ', ocorrencias.msg);
        }
    } else {
        alert('Erro apiFogoCruzadoMain: Token inválido.');
    }
};

// apiFogoCruzadoMain();
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''







/*
* Função para Gerar PDF com a Biblioteca jsPDF
* Gera Pdf para funcionario_acao_1
 */
function funcionario_acao_1_gerar_pdf() {
    //Formulario campos
    const funcionario_acao_1_local = document.getElementById('funcionario_acao_1_local').value;
    const funcionario_acao_1_dias_horarios = document.getElementById('funcionario_acao_1_dias_horarios').value;
    const funcionario_acao_1_valor = document.getElementById('funcionario_acao_1_valor').value;

    //funcionarios_ids
    const funcionariosMarcados = document.querySelectorAll('input[name="funcionario_acao_1_funcionario_id"]:checked');
    const funcionarios_ids = Array.from(funcionariosMarcados).map(checkbox => checkbox.value);

    if (funcionario_acao_1_local == '' || funcionario_acao_1_dias_horarios == '' || funcionario_acao_1_valor == '' || funcionarios_ids.length <= 0) {
        alert('Escolha o Local, Data/Horário, Valor e pelo menos 1(um) Funcionário.');
    } else {
        //URL
        var url_atual = window.location.protocol + '//' + window.location.host + '/';

        //Acessar rota
        fetch(url_atual + 'funcionarios/funcionarioAcao1/funcionario_acao_1_gerar_pdf_dados/' + funcionarios_ids, {
            method: 'GET',
            headers: {'REQUEST-ORIGIN': 'fetch'}
        }).then(response => {
            return response.json();
        }).then(data => {
            //Lendo json
            let funcionariosDados = data;

            //Dados
            if (funcionariosDados.length <= 0) {
                alert('Nenhum dado encontrado para gerar PDF.');
            } else {
                //Configurações
                if (!window.jsPDF) window.jsPDF = window.jspdf.jsPDF;

                //Iniciando jsPDF
                var doc = new jsPDF({orientation: 'p'});

                //Setando Font
                doc.setFont("helvetica");

                //Variáveis (Geral)
                const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
                const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
                const funcionario_acao_1_local = document.getElementById('funcionario_acao_1_local').value;
                const funcionario_acao_1_dias_horarios = document.getElementById('funcionario_acao_1_dias_horarios').value;
                const funcionario_acao_1_valor = document.getElementById('funcionario_acao_1_valor').value;

                //Varrer Funcionários
                funcionariosDados.forEach((funcionarioDado, index) => {
                    if (index > 0) {
                        doc.addPage();
                    }

                    //Texto Contrato''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                    //Configurações iniciais para texto do Contrato
                    const marginLeft = 20;
                    const marginRight = 190;
                    const marginTop = 20;
                    const textWidth = 170; // Largura máxima para o texto
                    const spacingBetweenTextsA = 5;
                    const spacingBetweenTextsB = 6;
                    const spacingBetweenTextsC = 10;
                    const spacingBetweenTextsD = 12;
                    const spacingBetweenTextsE = 15;

                    //Dados
                    const contratante_nome = 'CONSULTARIA MAIS COMÉRCIO E SERVIÇOS DE ENGENHARIA E ARQUITETURA LTDA';
                    const contratante_cnpj = '35.205.811/0001-03';
                    const contratante_endereco = 'Rua Aristides Lobo, nº 124, parte, Rio Comprido, Rio de Janeiro, RJ, CEP: 20250-450';
                    const contratante_representante = 'seu sócio MARCUS VINICIUS MACHADO DE OLIVEIRA, brasileiro, militar e empresário, casado, portador da carteira de identidade nº 008717697-0, expedida pelo Detran/RJ, inscrita no CPF sob o nº 023.824.687-69';
                    const contratado_nome = funcionarioDado.name;
                    const contratado_cpf = funcionarioDado.cpf;

                    var contratado_endereco = '';

                    if (funcionarioDado.cep !== null) {
                        contratado_endereco = funcionarioDado.logradouro + ', ' + funcionarioDado.numero + ', ' + funcionarioDado.complemento + ', ' + funcionarioDado.bairro + ', ' + funcionarioDado.localidade + ', ' + funcionarioDado.uf + ', ' + funcionarioDado.cep;
                    }

                    var novaMarginTop = 0;
                    var linhasTexto = 0;
                    var alturaTexto = 0;

                    //Texto
                    var texto = '';

                    //Texto
                    texto = `CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE BOMBEIRO CIVIL`;

                    novaMarginTop = marginTop;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsB;

                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(14);
                    doc.text(texto, ((pageWidth - doc.getTextWidth(texto)) / 2), novaMarginTop);

                    //Texto
                    texto = `CONTRATANTE: ${contratante_nome}, devidamente inscrita no CNPJ de nº ${contratante_cnpj}, com sede na ${contratante_endereco}, neste ato representada por seu sócio ${contratante_representante}, doravante denominado CONTRATANTE.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsB;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, { maxWidth: textWidth, align: 'justify' });

                    //Texto
                    texto = `CONTRATADO: ${contratado_nome}, inscrito(a) no CPF sob nº ${contratado_cpf}`;
                    if (contratado_endereco != '') {texto += `, com endereço em ${contratado_endereco}`;}
                    texto += `, doravante denominado CONTRATADO.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `Têm entre si justo e contratado a prestação de serviços de bombeiro civil, conforme as cláusulas e condições a seguir estabelecidas.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `CLÁUSULA PRIMEIRA - DO OBJETO`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsD;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(14);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `1.1. O presente contrato tem por objeto a prestação de serviços de bombeiro civil de forma autônoma, pelo CONTRATADO, compreendendo atividades de prevenção e combate a incêndios, atendimento emergencial de primeiros socorros e controle de pânico, com o fornecimento dos respectivos Equipamentos de Proteção Individual e material de Primeiros Socorros, conforme especificações a seguir:`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `a) Local da prestação dos serviços: ${funcionario_acao_1_local};`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `b) Horário da prestação de serviços: ${funcionario_acao_1_dias_horarios};`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `1.2. A execução dos serviços deverá atender às normas da Lei Federal nº 11.901/2009, bem como às normas da ABNT NBR 14608/2007, que regulamentam a atuação do bombeiro civil.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    // //Texto
                    // texto = `1.3. A execução dos serviços deverá atender plenamente ao horário de funcionamento do local da prestação dos serviços. O horário poderá ser ajustado contratualmente, desde que seja preservado o número de 12 horas trabalhadas por 36 horas de descanso, totalizando 36 horas semanais, conforme art. 5º da Lei 11.901/2009.`;
                    //
                    // novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    // linhasTexto = doc.splitTextToSize(texto, textWidth);
                    // alturaTexto = linhasTexto.length * spacingBetweenTextsA;
                    //
                    // if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}
                    //
                    // doc.setFont('helvetica', 'normal');
                    // doc.setFontSize(12);
                    // doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `1.4. Fica expressamente pactuado que este contrato é firmado entre partes autônomas e independentes, sem qualquer subordinação ou exclusividade, e sem que se estabeleça qualquer vínculo empregatício entre as partes ou com terceiros contratados pelo CONTRATADO para a execução dos serviços.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `CLÁUSULA SEGUNDA - OBRIGAÇÕES DO CONTRATADO:`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsD;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(14);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `2.1. O CONTRATADO obriga-se a:`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `a) Executar os serviços com zelo, pontualidade e profissionalismo;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `b) Utilizar uniforme adequado e manter-se devidamente equipado com EPIs;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `c) Manter sigilo absoluto sobre quaisquer informações internas do local vigiado;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `d) Comunicar ao CONTRATANTE sobre quaisquer irregularidades ou necessidades de adequação em segurança.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `2.2. Os serviços a serem executados pelo CONTRATADO compreendem ações de prevenção e de emergência, descritos a seguir:`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `2.2.1. Ações de Prevenção:`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `a) Identificar e avaliar os riscos existentes;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `b) Elaborar relatório das irregularidades encontradas nos sistemas preventivos com apresentação de eventuais sugestões para melhoria das condições de segurança;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `c) Conhecer, em profundidade, a técnica e tática para utilização dos equipamentos e sistemas de extinção de incêndio: mangueiras, extintores, chuveiros automáticos e CO2;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `d) Conhecer a localização dos alarmes, extintores, caixas de incêndio, bem como, a ligação do conjunto de bombas de pressurização da rede de hidrantes;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `e) Inspecionar periodicamente os equipamentos de proteção contra incêndio e de rotas de fuga, comunicando ao fiscal do contrato, com a maior brevidade possível, as anormalidades detectadas;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `f) Executar ronda(s) diária(s) conforme a orientação recebida da CONTRATANTE, verificando todas as dependências das instalações, adotando os cuidados e providências necessários para o perfeito desempenho das funções e manutenção da ordem nas instalações;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `g) Analisar com rapidez a situação e empregar os meios disponíveis para debelar um incêndio;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `h) Investigar a origem de qualquer anormalidade na edificação que seja indício de princípio de incêndio;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `i) Comunicar à CONTRATANTE, toda ocorrência anormal que verificar;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `j) Apresentar à CONTRATANTE, relatório formal das irregularidades encontradas, com propostas e medidas corretivas adequadas;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `k) Testar periodicamente os equipamentos de combate a incêndio e afins;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `l) Avaliar e acompanhar as atividades de risco;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `m) Estar sempre em condições de auxiliar o CBMERJ, por ocasião de sua chegada, no sentido de fornecer dados gerais sobre o edifício e o evento, bem como, promover o rápido e fácil acesso aos dispositivos de segurança;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `n) Efetuar rondas diárias e esporádicas em todas as instalações dos edifícios para verificar a existência de possíveis problemas que possam representar eventuais riscos de incêndio.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `2.2.2. Ações de Emergência:`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `a) Identificar e avaliar a situação;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `b) Acionar imediatamente o CBMERJ;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `c) Verificar a transmissão do alarme e auxiliar no abandono da edificação;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `d) Combater os incêndios em sua fase inicial, de forma que possam ser controlados por meio de materiais e equipamentos colocados pela CONTRATANTE a disposição da CONTRATADO;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `e) Atuar no controle de pânico;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `f) Prestar os primeiros socorros a feridos;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `g) Interromper o fornecimento de energia elétrica quando da ocorrência de sinistro;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `h) Estar sempre em condições de auxiliar o CBMERJ, por ocasião de sua chegada, no sentido de fornecer dados gerais sobre a ocorrência, bem como promover o rápido e fácil acesso aos dispositivos de segurança.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `CLÁUSULA TERCEIRA - OBRIGAÇÕES DO CONTRATANTE`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsD;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(14);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `3.1. O CONTRATANTE obriga-se a:`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `a) Disponibilizar ao CONTRATADO as informações necessárias para o desempenho de suas funções;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `b) Fornecer acesso a um espaço adequado para guarda de equipamentos e descanso, se aplicável;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `c) Efetuar o pagamento dos honorários conforme estipulado neste contrato;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `d) Cumprir as normas de segurança aplicáveis ao local onde os serviços serão prestados.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `e) Exercer a fiscalização dos serviços por técnicos especialmente designados.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `f) Indicar instalações sanitárias, para uso do CONTRATADO;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `CLÁUSULA QUARTA - REMUNERAÇÃO E CONDIÇÕES DE PAGAMENTO`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsD;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(14);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `4.1. Pela prestação dos serviços, o CONTRATANTE pagará ao CONTRATADO o valor de R$ ${funcionario_acao_1_valor}, a ser pago diariamente.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `4.2. O pagamento será realizado via transferência bancária, PIX ou dinheiro.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    // //Texto
                    // texto = `4.3. Em caso de atraso no pagamento, incidirão sobre o valor devido:`;
                    //
                    // novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    // linhasTexto = doc.splitTextToSize(texto, textWidth);
                    // alturaTexto = linhasTexto.length * spacingBetweenTextsA;
                    //
                    // if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}
                    //
                    // doc.setFont('helvetica', 'normal');
                    // doc.setFontSize(12);
                    // doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});
                    //
                    // //Texto
                    // texto = `a) Multa de 2% (dois por cento) sobre o montante em aberto;`;
                    //
                    // novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    // linhasTexto = doc.splitTextToSize(texto, textWidth);
                    // alturaTexto = linhasTexto.length * spacingBetweenTextsA;
                    //
                    // if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}
                    //
                    // doc.setFont('helvetica', 'normal');
                    // doc.setFontSize(12);
                    // doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});
                    //
                    // //Texto
                    // texto = `b) Juros moratórios de 1% ao mês, calculados pro rata die;`;
                    //
                    // novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    // linhasTexto = doc.splitTextToSize(texto, textWidth);
                    // alturaTexto = linhasTexto.length * spacingBetweenTextsA;
                    //
                    // if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}
                    //
                    // doc.setFont('helvetica', 'normal');
                    // doc.setFontSize(12);
                    // doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});
                    //
                    // //Texto
                    // texto = `c) Correção monetária pelo índice IPCA;`;
                    //
                    // novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    // linhasTexto = doc.splitTextToSize(texto, textWidth);
                    // alturaTexto = linhasTexto.length * spacingBetweenTextsA;
                    //
                    // if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}
                    //
                    // doc.setFont('helvetica', 'normal');
                    // doc.setFontSize(12);
                    // doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `CLÁUSULA QUINTA - INADIMPLEMENTO`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsD;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(14);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `5.1. Caso o CONTRATANTE não efetue o pagamento no prazo acordado, o CONTRATADO poderá:`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `a) Aplicar as penalidades previstas na cláusula 4.3;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `b) Suspender a prestação dos serviços até a regularização do pagamento;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `c) Rescindir o contrato, mediante notificação formal, caso o atraso seja superior a 15 (quinze) dias.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `5.2. Caso o CONTRATADO não cumpra suas funções de forma adequada ou falte sem justificativa, o CONTRATANTE poderá:`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `a) Aplicar descontos proporcionais sobre os dias não trabalhados;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `b) Rescindir o contrato de imediato, sem aviso prévio.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `CLÁUSULA SEXTA - DURAÇÃO E RESCISÃO`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsD;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(14);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `6.1. O presente contrato terá vigência de [prazo: ex. 6 meses, 12 meses], a contar da data de assinatura, podendo ser prorrogado por acordo mútuo.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `6.2. O contrato poderá ser rescindido:`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `a) Por mútuo acordo entre as partes;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `b) Pela inadimplência do CONTRATANTE por mais de 15 dias;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `c) Pelo descumprimento das obrigações estipuladas neste contrato;`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `d) Por falta grave do CONTRATADO, como negligência, abandono do posto ou conduta inadequada.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `6.3. Em caso de rescisão sem justa causa, a parte que der causa deverá comunicar a outra com 15 (quinze) dias de antecedência.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `CLÁUSULA SÉTIMA - RESPONSABILIDADE E SEGURANÇA`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsD;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(14);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `7.1. O CONTRATADO será responsável civil e criminalmente por qualquer ato de negligência ou imprudência que ocasione danos ao CONTRATANTE ou a terceiros.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `7.2. O CONTRATANTE se compromete a fornecer um ambiente seguro e adequado para o desempenho das funções do CONTRATADO`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `CLÁUSULA OITAVA - DAS RESPONSABILIDADES FISCAIS E PREVIDENCIÁRIAS`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsD;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(14);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `8.1 A CONTRATADA assume integral responsabilidade pelo recolhimento de tributos, contribuições previdenciárias e quaisquer encargos decorrentes da prestação de serviços.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsC;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `8.2. A CONTRATANTE está isenta de qualquer responsabilidade em relação a vínculos trabalhistas, previdenciários, ou fiscais da CONTRATADA ou de seus empregados e/ou colaboradores, ficando a cargo exclusivo da CONTRATADA todas as providências necessárias para cumprimento dessas obrigações.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `8.3. A CONTRATADA obriga-se a isentar e indenizar a CONTRATANTE em caso de qualquer reclamação trabalhista, previdenciária ou fiscal promovida por terceiros contratados pelo CONTRATADO que venha a resultar em condenação ou ônus financeiro para a CONTRATANTE.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `CLÁUSULA NONA -  DISPOSIÇÕES GERAIS`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsD;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(14);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `9.1. O presente contrato não gera vínculo empregatício, sendo o CONTRATADO um profissional autônomo, responsável por todas as suas obrigações previdenciárias e fiscais.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `9.2. Qualquer alteração neste contrato deverá ser realizada mediante aditivo contratual, assinado por ambas as partes.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `9.3. As partes elegem o foro da Comarca da Capital do Estado do Rio de Janeiro, para dirimir eventuais litígios decorrentes deste contrato.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `E, por estarem justas e contratadas, as partes assinam o presente contrato em duas vias de igual teor e forma, na presença de duas testemunhas.`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = dataExtenso(3, dataServidor(2));

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsD;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `______________________________________`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsC;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `CONTRATANTE`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `______________________________________`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsC;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `CONTRATADO`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `________________________________`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsC;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `TESTEMUNHA 1:`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `CPF:`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `________________________________`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsC;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `TESTEMUNHA 2:`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});

                    //Texto
                    texto = `CPF:`;

                    novaMarginTop = novaMarginTop + alturaTexto + spacingBetweenTextsA;
                    linhasTexto = doc.splitTextToSize(texto, textWidth);
                    alturaTexto = linhasTexto.length * spacingBetweenTextsA;

                    if ((novaMarginTop + alturaTexto) > 270) {doc.addPage(); novaMarginTop = marginTop;}

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(texto, marginLeft, novaMarginTop, {maxWidth: textWidth, align: 'justify'});
                    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                    //Rodapé''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                    // var footer_text_1_margin_left = 105;
                    // var footer_text_2_margin_left = 125;
                    // var data_hora = dataServidor(2) + ' às ' + horaServidor(2);
                    //
                    // doc.setFontSize(10);
                    // doc.text('Gerado pelo Sistema SAC', pageWidth / 2, pageHeight - 15, {align: 'center'});
                    // doc.text(data_hora, pageWidth / 2, pageHeight - 10, {align: 'center'});
                    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                });

                //Gerar o pdf, abrir em uma outra aba e colocar link para download''''''''''''''''''''''''''''''''''''''
                const pdfBlob = doc.output('blob');
                const pdfUrl = URL.createObjectURL(pdfBlob);

                //Tentar abrir em uma nova aba
                const newTab = window.open(pdfUrl);

                //Adiciona um link abaixo do botão
                let funcionario_acao_1_botoes = document.getElementById('funcionario_acao_1_botoes');

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
                funcionario_acao_1_botoes.parentNode.insertBefore(link, funcionario_acao_1_botoes.nextSibling);
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            }
        }).catch(error => {
            alert('Erro funcionario_acao_1_gerar_pdf: ' + error);
        });
    }
}

/*
* Validar valor recebido
* Retorna true se valor foi validado
* Retorna false se valor não foi validado
*
* @PARAM op=1 : Campo Requerido
* @PARAM op=2 : Mínimo de Caracteres
* @PARAM op=3 : Máximo de Caracteres
* @PARAM op=4 : Somente Números
* @PARAM op=5 : E-mail Válido
* @PARAM op=6 : CNPJ Válido
* @PARAM op=7 : CPF Válido
* @PARAM op=8 : Data Válida
* @PARAM op=9 : CEP Válido
* @PARAM op=10 : URL Válida
* @PARAM op=11 : Telefone Válido
* @PARAM op=12 : Celular Válido
* @PARAM op=13 : PIS Válido
* @PARAM op=14 : PASEP Válido
* @PARAM op=15 : Carteira Trabalho Válido
* @PARAM op=16 : Campo FILE com arquivo PDF (enviar id do elemento)
* @PARAM op=17 : Hora Válida
 */
function validacao({op=0, value='', minCaracteres=0, maxCaracteres=0, id=''}) {
    var regex;

    //Campo Requerido
    if (op == 1) {
        //Expressão regular que verifica se a entrada é vazia ou contém apenas espaços em branco
        regex = /^\s*$/;

        //Verificando
        if (regex.test(value) === true) {
            return false;
        } else {
            return true;
        }
    }

    //Mínimo de Caracteres
    if (op == 2) {
        //Expressão regular que verifica se a entrada tem pelo menos 'minimo' caracteres
        regex = new RegExp(`^.{${minCaracteres},}$`);

        //Verificando
        if (regex.test(value) === true) {
            return true;
        } else {
            return false;
        }
    }

    //Máximo de Caracteres
    if (op == 3) {
        //Expressão regular que verifica se a entrada tem no máximo 'maximo' caracteres
        regex = new RegExp(`^.{0,${maxCaracteres}}$`);

        //Verificando
        if (regex.test(value) === true) {
            return true;
        } else {
            return false;
        }
    }

    //Somente Números
    if (op == 4) {
        //Expressão regular que verifica se a entrada contém somente números
        regex = /^[0-9]+$/;

        //Verificando
        if (regex.test(value) === true) {
            return true;
        } else {
            return false;
        }
    }

    //E-mail Válido
    if (op == 5) {
        //Expressão regular para validar endereços de e-mail
        regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        //Verificando
        if (regex.test(value) === true) {
            return true;
        } else {
            return false;
        }
    }

    //CNPJ Válido
    if (op == 6) {
        //Remover caracteres não numéricos
        value = value.replace(/\D/g, '');

        //Verificar se CNPJ possui 14 dígitos
        if (value.length !== 14) return false;

        //Verificar se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(value)) return false;

        //Validar dígitos verificadores
        const peso = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let soma = 0;
        for (let i = 0; i < 12; i++) {
            soma += parseInt(value.charAt(i)) * peso[i + 1];
        }
        let resto = soma % 11;
        let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
        if (parseInt(value.charAt(12)) !== digitoVerificador1) return false;

        soma = 0;
        for (let i = 0; i < 13; i++) {
            soma += parseInt(value.charAt(i)) * peso[i];
        }
        resto = soma % 11;
        let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

        return parseInt(value.charAt(13)) === digitoVerificador2;
    }

    //CPF Válido
    if (op == 7) {
        //Remover caracteres não numéricos
        value = value.replace(/\D/g, '');

        //Verificar se o CPF possui 11 dígitos
        if (value.length !== 11) return false;

        //Verificar se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(value)) return false;

        //Validar dígitos verificadores
        let soma = 0;
        let resto;
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(value.charAt(i - 1)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(value.charAt(9))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(value.charAt(i - 1)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;

        return resto === parseInt(value.charAt(10));
    }

    //Data Válida
    if (op == 8) {
        //Expressão regular para verificar o formato da data (DD/MM/AAAA)
        regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        //Verificando
        if (regex.test(value) === true) {
            return true;
        } else {
            return false;
        }
    }

    //CEP Válido
    if (op == 9) {
        //Expressão regular para verificar o formato do CEP (XXXXX-XXX)
        regex = /^\d{5}-\d{3}$/;

        //Verificando
        if (regex.test(value) === true) {
            return true;
        } else {
            return false;
        }
    }

    //URL Válida
    if (op == 10) {
        //Expressão regular para verificar o formato básico da URL
        regex = /^(ftp|http|https):\/\/[^ "]+$/;

        //Verificando
        if (regex.test(value) === true) {
            return true;
        } else {
            return false;
        }
    }

    //Telefone Válido
    if (op == 11) {
        //Expressão regular para validar números de telefone brasileiros
        regex = /^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/;

        //Verificando
        if (regex.test(value) === true) {
            return true;
        } else {
            return false;
        }
    }

    //Celular Válido
    if (op == 12) {
        //Expressão regular para validar números de celular brasileiros
        regex = /^\(?\d{2}\)?[-.\s]?\d{5}[-.\s]?\d{4}$/;

        //Verificando
        if (regex.test(value) === true) {
            return true;
        } else {
            return false;
        }
    }

    //PIS Válido
    if (op == 13) {
        //Expressão regular para validar números de PIS brasileiros
        regex = /^\d{3}\.\d{5}\.\d{2}-\d$/;

        //Verificando
        if (regex.test(value) === true) {
            return true;
        } else {
            return false;
        }
    }

    //PASEP Válido
    if (op == 14) {
        //Expressão regular para validar números de PASEP brasileiros
        regex = /^\d{3}\.\d{5}\.\d{2}-\d$/;

        //Verificando
        if (regex.test(value) === true) {
            return true;
        } else {
            return false;
        }
    }

    //Carteira Trabalho Válido
    if (op == 15) {
        //Expressão regular para validar números de CTPS brasileiros
        regex = /^\d{7,14}$/;

        //Verificando
        if (regex.test(value) === true) {
            return true;
        } else {
            return false;
        }
    }

    //Campo FILE com arquivo PDF
    if (op == 16) {
        let elemento = document.getElementById(id);
        const file = elemento.files[0]; // Obtém o primeiro arquivo selecionado

        //verificar se é vazio
        if (!file) {
            return false;
        }

        //verificar se é um PDF (MIME type ou extensão)
        if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
            elemento.value = ''; //Limpa o campo caso não seja um PDF
            return false;
        }

        return true;
    }

    //Hora Válida
    if (op == 17) {
        //Expressão regular para verificar o formato da hora (HH:mm:ss)
        regex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;

        //Verificando
        if (regex.test(value) === true) {
            return true;
        } else {
            return false;
        }
    }
}

//Código para Acessar Câmera Frontal e Traseira - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Código para Acessar Câmera Frontal e Traseira - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Função para iniciar a captura da câmera
function startCameraFrontal() {
    //Verifica se o navegador suporta a API de captura de mídia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        //Solicita permissão para acessar a câmera
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
            .then(function (stream) {
                //O usuário concedeu permissão para acessar a câmera (Obtém elementos do DOM)
                const videoFrontal = document.getElementById('videoFrontal');
                videoFrontal.srcObject = stream;
                videoFrontal.play();
            })
            .catch(function (error) {
                // O usuário negou a permissão ou ocorreu um erro
                alert('Erro ao acessar a câmera:'+error);
            });
    } else {
        alert('Seu navegador não suporta a API de captura de mídia.');
    }
}

//Função para parar a captura da câmera
function stopCameraFrontal() {
    const videoFrontal = document.getElementById('videoFrontal');
    const tracksFrontal = videoFrontal.srcObject.getTracks();

    tracksFrontal.forEach(function (track) {
        track.stop(); // Para cada faixa de vídeo
    });
}

//Função para iniciar a captura da câmera traseira
function startCameraTraseira() {
    //Verifica se o navegador suporta a API de captura de mídia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        //Solicita permissão para acessar a câmera
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(function (stream) {
                //O usuário concedeu permissão para acessar a câmera (Obtém elementos do DOM)
                const videoTraseira = document.getElementById('videoTraseira');
                videoTraseira.srcObject = stream;
                videoTraseira.play();
            })
            .catch(function (error) {
                // O usuário negou a permissão ou ocorreu um erro
                alert('Erro ao acessar a câmera:'+error);
            });
    } else {
        alert('Seu navegador não suporta a API de captura de mídia.');
    }
}

//Função para parar a captura da câmera traseira
function stopCameraTraseira() {
    const videoTraseira = document.getElementById('videoTraseira');
    const tracks = videoTraseira.srcObject.getTracks();

    tracks.forEach(function (track) {
        track.stop(); // Para cada faixa de vídeo
    });
}
//Código para Acessar Câmera Frontal e Traseira - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Código para Acessar Câmera Frontal e Traseira - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

function fornecedorExtraData(id='') {
    //Limpando dados
    $('.jsonFornecedor').html('');

    //Verificar se mandou id ou se veio do registro_id
    if (id == '') {id = $('#registro_id').val();}

    //URL
    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Ajax
    $.ajax({
        processing: true,
        serverSide: true,
        type: "GET",
        url: url_atual+"fornecedores/extradata/"+id,
        data: {},
        datatype: "json",
        success: function (response) {
            //Lendo json
            let json = JSON.parse(response);

            //Lendo dados Fornecedor
            let fornecedor = json.fornecedor;

            //Passando dados Fornecedor
            $('.jsonFornecedorName').html(fornecedor.name);

            if (fornecedor.status == '1') {nameStatus = 'Ativo';}
            if (fornecedor.status == '2') {nameStatus = 'Inativo';}
            $('.jsonFornecedorStatus').html(nameStatus);

            if (fornecedor.tipo == '1') {
                $('.jsonFornecedorTipo').html('Pessoa Jurídica');
                $('.labelFornecedorCnpjCpf').html('CNPJ');
                $('.jsonFornecedorCnpj').html(aplicarMascaraJs(fornecedor.cnpj, '##.###.###/####-##'));
            }

            if (fornecedor.tipo == '2') {
                $('.jsonFornecedorTipo').html('Pessoa Física');
                $('.labelFornecedorCnpjCpf').html('CPF');
                $('.jsonFornecedorCpf').html(aplicarMascaraJs(fornecedor.cpf, '###.###.###-##'));
            }

            //Informações Gerais
            $('.jsonFornecedorSite').html(fornecedor.site);
            $('.jsonFornecedorEmail').html(fornecedor.email);

            if (fornecedor.telefone_1 != '' && fornecedor.telefone_1 !== null) {$('.jsonFornecedorContatoTelefone1').html(aplicarMascaraJs(fornecedor.telefone_1, '(##) #####-####'));}
            if (fornecedor.telefone_2 != '' && fornecedor.telefone_2 !== null) {$('.jsonFornecedorContatoTelefone2').html(aplicarMascaraJs(fornecedor.telefone_2, '(##) #####-####'));}
            if (fornecedor.celular_1 != '' && fornecedor.celular_1 !== null) {$('.jsonFornecedorContatoCelular1').html(aplicarMascaraJs(fornecedor.celular_1, '(##) #####-####'));}
            if (fornecedor.celular_2 != '' && fornecedor.celular_2 !== null) {$('.jsonFornecedorContatoCelular2').html(aplicarMascaraJs(fornecedor.celular_2, '(##) #####-####'));}

            //Lendo dados servicos''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            let fornecedor_compras = json.fornecedor_compras;

            var tbodyCompras = '';

            //Passando dados compras (Tabela)
            var row = 0;

            function montarTable(item) {
                row++;

                xxx = item.xxx;
                yyy = item.yyy;

                tbodyCompras += "<tr>";
                tbodyCompras += "<th scope='row'>" + row + "</th>";
                tbodyCompras += "<td>" + xxx + "</td>";
                tbodyCompras += "<td>" + yyy + "</td>";
                tbodyCompras += "</tr>";
            }

            fornecedor_compras.forEach(montarTable);

            //Destruindo e iniciando (Simulando um Refresh)
            $('.class-datatable-2').DataTable().destroy();
            $('.jsonFornecedorComprasTable').html(tbodyCompras);

            configurarDataTable(2);

            //Alterar tamanho do input Pesquisar da tabela
            $('.dataTables_filter .fildFilterTable').attr('style',  'width:150px');
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        },
        complete: function () {},
        error: function (response) {
            alert('ERROR: '+response);
        }
    });
}

//Busca dados e monta o modal para o submódulo funcionarios
function funcionarioModalInfo(id='') {
    if (id == '') {id = document.getElementById('registro_id').value;}

    //Abrir Modal
    new bootstrap.Modal(document.getElementById('funcionario_modal_info')).show();

    //Limpando dados
    let elementos = document.querySelectorAll('.clearClass');
    elementos.forEach(elemento => {elemento.src = ''; elemento.innerHTML = '';});

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'funcionarios/modalInfo/modal_info/'+id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let json = data;

        //Lendo dados funcionario
        let funcionario = json.funcionario;

        //Passando dados funcionario'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Header
        const header_mi_fun_foto = document.querySelector('#funcionario_modal_info #header #mi_fun_foto');
        const header_mi_fun_nome = document.querySelector('#funcionario_modal_info #header #mi_fun_nome');
        const header_mi_fun_funcao = document.querySelector('#funcionario_modal_info #header #mi_fun_funcao');
        const header_mi_fun_email = document.querySelector('#funcionario_modal_info #header #mi_fun_email');
        const header_mi_fun_departamento = document.querySelector('#funcionario_modal_info #header #mi_fun_departamento');

        header_mi_fun_foto.src = url_atual+funcionario.foto;
        header_mi_fun_nome.innerHTML = funcionario.name;
        header_mi_fun_funcao.innerHTML = funcionario.funcaoName;
        header_mi_fun_email.innerHTML = funcionario.email;
        header_mi_fun_departamento.innerHTML = funcionario.departamentoName;

        //Tab Dados
        const tab_fun_dados_mi_fun_cpf = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_cpf');
        const tab_fun_dados_mi_fun_departamento = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_departamento');
        const tab_fun_dados_mi_fun_funcao = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_funcao');
        const tab_fun_dados_mi_fun_nome = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_nome');
        const tab_fun_dados_mi_fun_telefones = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_telefones');
        const tab_fun_dados_mi_fun_celulares = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_celulares');
        const tab_fun_dados_mi_fun_data_admissao = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_data_admissao');
        const tab_fun_dados_mi_fun_data_demissao = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_data_demissao');
        const tab_fun_dados_mi_fun_pis = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_pis');
        const tab_fun_dados_mi_fun_pasep = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_pasep');
        const tab_fun_dados_mi_fun_carteira_trabalho = document.querySelector('#funcionario_modal_info #tab_fun_dados #mi_fun_carteira_trabalho');

        tab_fun_dados_mi_fun_cpf.innerHTML = funcionario.cpf;
        tab_fun_dados_mi_fun_departamento.innerHTML = funcionario.departamentoName;
        tab_fun_dados_mi_fun_funcao.innerHTML = funcionario.funcaoName;
        tab_fun_dados_mi_fun_nome.innerHTML = funcionario.name;
        tab_fun_dados_mi_fun_telefones.innerHTML = formatarTelCel(1, funcionario.telefone_1)+'  '+formatarTelCel(1, funcionario.telefone_2);
        tab_fun_dados_mi_fun_celulares.innerHTML = formatarTelCel(2, funcionario.celular_1)+'  '+formatarTelCel(2, funcionario.celular_2);
        tab_fun_dados_mi_fun_data_admissao.innerHTML = formatarData(2, funcionario.data_admissao);
        tab_fun_dados_mi_fun_data_demissao.innerHTML = formatarData(2, funcionario.data_demissao);
        tab_fun_dados_mi_fun_pis.innerHTML = funcionario.pis;
        tab_fun_dados_mi_fun_pasep.innerHTML = funcionario.pasep;
        tab_fun_dados_mi_fun_carteira_trabalho.innerHTML = funcionario.carteira_trabalho;

        //Upload Foto
        const tab_fun_foto_upload_foto_funcionario_id = document.querySelector('#funcionario_modal_info #tab_fun_foto #upload_foto_funcionario_id');
        const tab_fun_foto_upload_foto_funcionario_name = document.querySelector('#funcionario_modal_info #tab_fun_foto #upload_foto_funcionario_name');

        tab_fun_foto_upload_foto_funcionario_id.value = funcionario.id;
        tab_fun_foto_upload_foto_funcionario_name.value = funcionario.name;

        //Upload Documento PDF
        const tab_documento_pdf_upload_documentos_pdfs_funcionario_id = document.querySelector('#funcionario_modal_info #tab_fun_documentos_pdfs #upload_documentos_pdfs_funcionario_id');

        tab_documento_pdf_upload_documentos_pdfs_funcionario_id.value = funcionario.id;
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }).catch(error => {
        alert('Erro funcionarioModalInfo: ', error);
    });
}

//Busca dados e monta grade de documentos pdfs do submódulo funcionários
function funcionarioModalInfoGradeDocumentosPdf({funcionario_id='', id_elemento_visualisacao='', btn_visualizar=true, btn_deletar=true}) {
    if (id_elemento_visualisacao == '') {return false;}
    if (funcionario_id == '') {funcionario_id = document.getElementById('registro_id').value;}

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'funcionarios/modalInfo/documentos_pdf/'+funcionario_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let documentos = data;

        //Grade
        let grade = '';

        //Montar Grade
        if (documentos.length > 0) {
            grade += '<table class="table">';
            grade += '  <thead>';
            grade += '      <tr>';
            grade += '          <th scope="col">#</th>';
            grade += '          <th scope="col">Descrição</th>';
            grade += '          <th scope="col">Data</th>';
            grade += '          <th scope="col">Aviso</th>';

            if (btn_visualizar === true || btn_deletar === true) {
                grade += '          <th scope="col">Ações</th>';
            }

            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            //Varrer
            let ln = 0;
            documentos.forEach(dado => {
                ln++;

                //Aviso
                let aviso_texto = '';

                if (dado.aviso == 0) {aviso_texto = 'Nenhum Aviso';}
                if (dado.aviso == 1) {aviso_texto = 'Avisar a cada 1 mês';}
                if (dado.aviso == 2) {aviso_texto = 'Avisar a cada 3 meses';}
                if (dado.aviso == 3) {aviso_texto = 'Avisar a cada 6 meses';}
                if (dado.aviso == 4) {aviso_texto = 'Avisar a cada 1 ano';}
                if (dado.aviso == 5) {aviso_texto = 'Avisar a cada 3 anos';}
                if (dado.aviso == 6) {aviso_texto = 'Avisar a cada 6 anos';}

                //Ações
                let acoes = '';

                acoes += '<div class="row">';

                if (btn_visualizar === true || btn_deletar === true) {
                    if (btn_visualizar === true) {
                        acoes += '  <div class="col-6">';
                        acoes += '      <button type="button" class="btn btn-outline-info text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Documento" onclick="window.open(\'' + dado.caminho + '\', \'_blank\');"><i class="fa fa-file-pdf font-size-18"></i></button>';
                        acoes += '  </div>';
                    }

                    if (btn_deletar === true) {
                        acoes += '  <div class="col-6">';
                        acoes += '      <button type="button" class="btn btn-outline-danger text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Documento" onclick="funcionarioModalInfoDeletarDocumentoPdf(' + dado.id + ');"><i class="fa fa-trash-alt font-size-18"></i></button>';
                        acoes += '  </div>';
                    }
                }

                acoes += '</div>';

                //TR
                grade += '<tr>';
                grade += '  <th scope="row">'+ln+'</th>';
                grade += '  <td>'+dado.descricao+'</td>';
                grade += '  <td>'+formatarData(2, dado.data_documento)+'</td>';
                grade += '  <td>'+aviso_texto+'</td>';

                if (btn_visualizar === true || btn_deletar === true) {
                    grade += '  <td>'+acoes+'</td>';
                }

                grade += '</tr>';
            });

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum documento encontrado.';
        }

        //Retornar Grade
        document.getElementById(id_elemento_visualisacao).innerHTML = grade;
    }).catch(error => {
        alert('Erro funcionarioModalInfoGradeDocumentosPdf: '+error);
    });
}

//Função para deletar documento da grade
function funcionarioModalInfoDeletarDocumentoPdf(funcionario_documento_id) {
    //Confirmação de Delete
    alertSwalConfirmacao(function (confirmed) {
        if (confirmed) {
            var url_atual = window.location.protocol+'//'+window.location.host+'/';

            //Acessar rota
            fetch(url_atual+'funcionarios/modalInfo/deletar_documento_pdf/'+funcionario_documento_id, {
                method: 'DELETE',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                //Lendo dados
                if (data.success) {
                    alertSwal('success', 'Funcionários', data.success, 'true', 2000);

                    //Dados
                    let funcionario_id = document.getElementById('upload_documentos_pdfs_funcionario_id').value;

                    //Montar Grade
                    funcionarioModalInfoGradeDocumentosPdf({funcionario_id:funcionario_id, id_elemento_visualisacao:'div_frm_upload_documentos_pdfs_fun_listar'});
                } else if (data.error) {
                    alertSwal('error', 'Funcionários', data.error, 'true', 2000);
                } else if (data.error_permissao) {
                    alertSwal('warning', "Permissão Negada", '', 'true', 2000);
                } else {
                    alert('Erro interno');
                }
            }).catch(error => {
                alert('Erro funcionarioModalInfoDeletarDocumentoPdf:'+error);
            });
        }
    });
}

//Busca dados e monta o modal para o submódulo clientes
function clienteModalInfo(id='') {
    if (id == '') {id = document.getElementById('registro_id').value;}

    //Abrir Modal
    new bootstrap.Modal(document.getElementById('cliente_modal_info')).show();

    //Limpando dados
    let elementos = document.querySelectorAll('.clearClass');
    elementos.forEach(elemento => {elemento.src = ''; elemento.innerHTML = '';});

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'clientes/modalInfo/modal_info/'+id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let json = data;

        //Lendo dados cliente
        let cliente = json.cliente;

        //Acertos
        if (cliente.status == 1) {var status = 'ATIVO';}
        if (cliente.status == 2) {var status = 'INATIVO';}

        if (cliente.tipo == 1) {
            var tipo = 'PESSOA JURÍDICA';
            var cpf_cnpj = cliente.cnpj;
        }
        if (cliente.tipo == 2) {
            var tipo = 'PESSOA FÍSICA';
            var cpf_cnpj = cliente.cpf;
        }

        //Passando dados cliente'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Header
        const header_mi_cli_nome = document.querySelector('#cliente_modal_info #header #mi_cli_nome');
        const header_mi_cli_email = document.querySelector('#cliente_modal_info #header #mi_cli_email');

        header_mi_cli_nome.innerHTML = cliente.name;
        header_mi_cli_email.innerHTML = cliente.email;

        //Tab Dados
        const tab_cli_dados_mi_cli_status = document.querySelector('#cliente_modal_info #tab_cli_dados #mi_cli_status');
        const tab_cli_dados_mi_cli_tipo = document.querySelector('#cliente_modal_info #tab_cli_dados #mi_cli_tipo');
        const tab_cli_dados_mi_cli_cpf_cnpj = document.querySelector('#cliente_modal_info #tab_cli_dados #mi_cli_cpf_cnpj');
        const tab_cli_dados_mi_cli_nome = document.querySelector('#cliente_modal_info #tab_cli_dados #mi_cli_nome');
        const tab_cli_dados_mi_cli_telefones = document.querySelector('#cliente_modal_info #tab_cli_dados #mi_cli_telefones');
        const tab_cli_dados_mi_cli_celulares = document.querySelector('#cliente_modal_info #tab_cli_dados #mi_cli_celulares');
        const tab_cli_dados_mi_cli_data_nascimento = document.querySelector('#cliente_modal_info #tab_cli_dados #mi_cli_data_nascimento');

        tab_cli_dados_mi_cli_status.innerHTML = status;
        tab_cli_dados_mi_cli_tipo.innerHTML = tipo;
        tab_cli_dados_mi_cli_cpf_cnpj.innerHTML = cpf_cnpj;
        tab_cli_dados_mi_cli_nome.innerHTML = cliente.name;
        tab_cli_dados_mi_cli_telefones.innerHTML = formatarTelCel(1, cliente.telefone_1)+'  '+formatarTelCel(1, cliente.telefone_2);
        tab_cli_dados_mi_cli_celulares.innerHTML = formatarTelCel(2, cliente.celular_1)+'  '+formatarTelCel(2, cliente.celular_2);
        tab_cli_dados_mi_cli_data_nascimento.innerHTML = formatarData(2, cliente.data_admissao);

        //Upload Documento PDF
        const tab_documento_pdf_upload_documentos_pdfs_cliente_id = document.querySelector('#cliente_modal_info #tab_cli_documentos_pdfs #upload_documentos_pdfs_cliente_id');

        tab_documento_pdf_upload_documentos_pdfs_cliente_id.value = cliente.id;
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }).catch(error => {
        alert('Erro clienteModalInfo: ', error);
    });
}

//Busca dados e monta grade de documentos pdfs do submódulo clientes
function clienteModalInfoGradeDocumentosPdf({cliente_id='', id_elemento_visualisacao='', btn_visualizar=true, btn_deletar=true}) {
    if (id_elemento_visualisacao == '') {return false;}
    if (cliente_id == '') {cliente_id = document.getElementById('registro_id').value;}

    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    //Acessar rota
    fetch(url_atual+'clientes/modalInfo/documentos_pdf/'+cliente_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        //Lendo json
        let documentos = data;

        //Grade
        let grade = '';

        //Montar Grade
        if (documentos.length > 0) {
            grade += '<table class="table">';
            grade += '  <thead>';
            grade += '      <tr>';
            grade += '          <th scope="col">#</th>';
            grade += '          <th scope="col">Descrição</th>';
            grade += '          <th scope="col">Data</th>';
            grade += '          <th scope="col">Aviso</th>';

            if (btn_visualizar === true || btn_deletar === true) {
                grade += '          <th scope="col">Ações</th>';
            }

            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            //Varrer
            let ln = 0;
            documentos.forEach(dado => {
                ln++;

                //Aviso
                let aviso_texto = '';

                if (dado.aviso == 0) {aviso_texto = 'Nenhum Aviso';}
                if (dado.aviso == 1) {aviso_texto = 'Avisar a cada 1 mês';}
                if (dado.aviso == 2) {aviso_texto = 'Avisar a cada 3 meses';}
                if (dado.aviso == 3) {aviso_texto = 'Avisar a cada 6 meses';}
                if (dado.aviso == 4) {aviso_texto = 'Avisar a cada 1 ano';}
                if (dado.aviso == 5) {aviso_texto = 'Avisar a cada 3 anos';}
                if (dado.aviso == 6) {aviso_texto = 'Avisar a cada 6 anos';}

                //Ações
                let acoes = '';

                acoes += '<div class="row">';

                if (btn_visualizar === true || btn_deletar === true) {
                    if (btn_visualizar === true) {
                        acoes += '  <div class="col-6">';
                        acoes += '      <button type="button" class="btn btn-outline-info text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Documento" onclick="window.open(\'' + dado.caminho + '\', \'_blank\');"><i class="fa fa-file-pdf font-size-18"></i></button>';
                        acoes += '  </div>';
                    }

                    if (btn_deletar === true) {
                        acoes += '  <div class="col-6">';
                        acoes += '      <button type="button" class="btn btn-outline-danger text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Documento" onclick="clienteModalInfoDeletarDocumentoPdf(' + dado.id + ');"><i class="fa fa-trash-alt font-size-18"></i></button>';
                        acoes += '  </div>';
                    }
                }

                acoes += '</div>';

                //TR
                grade += '<tr>';
                grade += '  <th scope="row">'+ln+'</th>';
                grade += '  <td>'+dado.descricao+'</td>';
                grade += '  <td>'+formatarData(2, dado.data_documento)+'</td>';
                grade += '  <td>'+aviso_texto+'</td>';

                if (btn_visualizar === true || btn_deletar === true) {
                    grade += '  <td>'+acoes+'</td>';
                }

                grade += '</tr>';
            });

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhum documento encontrado.';
        }

        //Retornar Grade
        document.getElementById(id_elemento_visualisacao).innerHTML = grade;
    }).catch(error => {
        alert('Erro clienteModalInfoGradeDocumentosPdf: '+error);
    });
}

//Função para deletar documento da grade
function clienteModalInfoDeletarDocumentoPdf(cliente_documento_id) {
    //Confirmação de Delete
    alertSwalConfirmacao(function (confirmed) {
        if (confirmed) {
            var url_atual = window.location.protocol+'//'+window.location.host+'/';

            //Acessar rota
            fetch(url_atual+'clientes/modalInfo/deletar_documento_pdf/'+cliente_documento_id, {
                method: 'DELETE',
                headers: {
                    'REQUEST-ORIGIN': 'fetch',
                    'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                //Lendo dados
                if (data.success) {
                    alertSwal('success', 'Clientes', data.success, 'true', 2000);

                    //Dados
                    let cliente_id = document.getElementById('upload_documentos_pdfs_cliente_id').value;

                    //Montar Grade
                    clienteModalInfoGradeDocumentosPdf({cliente_id:cliente_id, id_elemento_visualisacao:'div_frm_upload_documentos_pdfs_cli_listar'});
                } else if (data.error) {
                    alertSwal('error', 'Clientes', data.error, 'true', 2000);
                } else if (data.error_permissao) {
                    alertSwal('warning', "Permissão Negada", '', 'true', 2000);
                } else {
                    alert('Erro interno');
                }
            }).catch(error => {
                alert('Erro clienteModalInfoDeletarDocumentoPdf:'+error);
            });
        }
    });
}

function notificacaoLerData(id) {
    //Buscar dados do Registro
    $.get("notificacoes/"+id, function (data) {
        //Lendo dados
        if (data.success) {
            $('.jsonNotificacaoLerTitulo').html(data.success.title);
            $('.jsonNotificacaoLerNotificacao').html(data.success.notificacao);
        } else if (data.error_not_found) {
            alertSwal('warning', "Registro não encontrado", '', 'true', 2000);
        } else if (data.error_permissao) {
            alertSwal('warning', "Permissão Negada", '', 'true', 2000);
        } else {
            alert('Erro interno');
        }
    });
}

//Marcar permissão -list quando escolher qualquer outra
function checkedPermissaoTable(opClick, submodulo_id) {
    //opClick = 1 : Clicou em todos_listar
    if (opClick == 1) {
        if ($('#todos_listar').is(':checked') == true) {
            for (id = 1; id <= 100; id++) {
                $('#listar_' + id).prop('checked', true);
            }
        } else {
            $('#todos_mostrar').prop('checked', false);
            $('#todos_criar').prop('checked', false);
            $('#todos_editar').prop('checked', false);
            $('#todos_deletar').prop('checked', false);

            for (id = 1; id <= 100; id++) {
                $('#listar_' + id).prop('checked', false);
                $('#mostrar_' + id).prop('checked', false);
                $('#criar_' + id).prop('checked', false);
                $('#editar_' + id).prop('checked', false);
                $('#deletar_' + id).prop('checked', false);
            }
        }
    }

    //opClick = 2 : Clicou em todos_mostrar
    if (opClick == 2) {
        if ($('#todos_mostrar').is(':checked') == true) {
            $('#todos_listar').prop('checked', true);

            for (id = 1; id <= 100; id++) {
                $('#mostrar_' + id).prop('checked', true);

                $('#listar_' + id).prop('checked', true);
            }
        } else {
            for (id = 1; id <= 100; id++) {
                $('#mostrar_' + id).prop('checked', false);
            }
        }
    }

    //opClick = 3 : Clicou em todos_criar
    if (opClick == 3) {
        if ($('#todos_criar').is(':checked') == true) {
            for (id = 1; id <= 100; id++) {
                $('#criar_' + id).prop('checked', true);

                $('#todos_listar').prop('checked', true);
                $('#listar_' + id).prop('checked', true);
            }
        } else {
            for (id = 1; id <= 100; id++) {
                $('#criar_' + id).prop('checked', false);
            }
        }
    }

    //opClick = 4 : Clicou em todos_editar
    if (opClick == 4) {
        if ($('#todos_editar').is(':checked') == true) {
            for (id = 1; id <= 100; id++) {
                $('#editar_' + id).prop('checked', true);

                $('#todos_listar').prop('checked', true);
                $('#listar_' + id).prop('checked', true);
            }
        } else {
            for (id = 1; id <= 100; id++) {
                $('#editar_' + id).prop('checked', false);
            }
        }
    }

    //opClick = 5 : Clicou em todos_deletar
    if (opClick == 5) {
        if ($('#todos_deletar').is(':checked') == true) {
            for (id = 1; id <= 100; id++) {
                $('#deletar_' + id).prop('checked', true);

                $('#todos_listar').prop('checked', true);
                $('#listar_' + id).prop('checked', true);
            }
        } else {
            for (id = 1; id <= 100; id++) {
                $('#deletar_' + id).prop('checked', false);
            }
        }
    }

    //opClick = 6 : Clicou em listar_
    if (opClick == 6) {
        if ($('#listar_' + submodulo_id).is(':checked') == false) {
            $('#todos_mostrar').prop('checked', false);
            $('#mostrar_' + submodulo_id).prop('checked', false);

            $('#todos_criar').prop('checked', false);
            $('#criar_' + submodulo_id).prop('checked', false);

            $('#todos_editar').prop('checked', false);
            $('#editar_' + submodulo_id).prop('checked', false);

            $('#todos_deletar').prop('checked', false);
            $('#deletar_' + submodulo_id).prop('checked', false);
        }
    }

    //opClick = 7 : Clicou em mostrar_
    if (opClick == 7) {
        if ($('#mostrar_' + submodulo_id).is(':checked') == true) {
            $('#listar_' + submodulo_id).prop('checked', true);
        }

        if ($('#mostrar_' + submodulo_id).is(':checked') == false) {
            $('#todos_mostrar').prop('checked', false);
        }
    }

    //opClick = 8 : Clicou em criar_
    if (opClick == 8) {
        if ($('#criar_' + submodulo_id).is(':checked') == true) {
            $('#listar_' + submodulo_id).prop('checked', true);
        }

        if ($('#criar_' + submodulo_id).is(':checked') == false) {
            $('#todos_criar').prop('checked', false);
        }
    }
    //opClick = 9 : Clicou em editar_
    if (opClick == 9) {
        if ($('#editar_' + submodulo_id).is(':checked') == true) {
            $('#listar_' + submodulo_id).prop('checked', true);
        }

        if ($('#editar_' + submodulo_id).is(':checked') == false) {
            $('#todos_editar').prop('checked', false);
        }
    }
    //opClick = 10 : Clicou em deletar_
    if (opClick == 10) {
        if ($('#deletar_' + submodulo_id).is(':checked') == true) {
            $('#listar_' + submodulo_id).prop('checked', true);
        }

        if ($('#deletar_' + submodulo_id).is(':checked') == false) {
            $('#todos_deletar').prop('checked', false);
        }
    }
}

//Modal de Confirmação
function alertSwalConfirmacao(callback) {
    Swal.fire({
        title: 'Confirma operação?',
        text: '',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Confirmar',
        confirmButtonColor: '#38c172',
        denyButtonText: `<i class="fa fa-thumbs-down"></i> Cancelar`,
        denyButtonColor: '#e3342f',
        customClass: {
            container: '...',
            popup: 'small',
            header: '...',
            title: 'h5',
            closeButton: '...',
            icon: 'small',
            image: '...',
            content: '...',
            htmlContainer: '...',
            input: '...',
            inputLabel: '...',
            validationMessage: '...',
            actions: '...',
            confirmButton: 'btn btn-success',
            denyButton: '...',
            cancelButton: 'btn btn-primary',
            loader: '...',
            footer: '....'
        }
    }).then((confirmed) => {
        callback(confirmed && confirmed.value == true);
    });
}

//Modal de Confirmação com submit
function alertSwalConfirmacaoSubmit(frm_name) {
    Swal.fire({
        title: 'Confirma operação?',
        text: '',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Confirmar',
        confirmButtonColor: '#38c172',
        denyButtonText: `<i class="fa fa-thumbs-down"></i> Cancelar`,
        denyButtonColor: '#e3342f',
        customClass: {
            container: '...',
            popup: 'small',
            header: '...',
            title: 'h5',
            closeButton: '...',
            icon: 'small',
            image: '...',
            content: '...',
            htmlContainer: '...',
            input: '...',
            inputLabel: '...',
            validationMessage: '...',
            actions: '...',
            confirmButton: 'btn btn-success',
            denyButton: '...',
            cancelButton: 'btn btn-primary',
            loader: '...',
            footer: '....'
        }
    }).then((confirmed) => {
        $('#'+frm_name).submit();
    });
}

//Modal de Confirmação para Exclusão de Registro - (CRUD)
// function alertSwalConfirmacaoExclusaoRegistro(id, descricao) {
//     Swal.fire({
//         title: 'Confirma exclusão do registro?',
//         text: descricao,
//         icon: 'warning',
//         showDenyButton: true,
//         confirmButtonText: '<i class="fa fa-thumbs-up"></i> Confirmar',
//         confirmButtonColor: '#38c172',
//         denyButtonText: `<i class="fa fa-thumbs-down"></i> Cancelar`,
//         denyButtonColor: '#e3342f'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             Livewire.emit("destroy", id);
//         }
//     });
// }

//Modal para Mensagens
function alertSwal(icon='success', title='', html='', showConfirmButton=false, timer=2000) {
    Swal.fire({
        icon: icon,
        title: title,
        html: html,
        showConfirmButton: showConfirmButton,
        timer: timer
    });
}

//visualizar a imagem da font awesome em uma div ao lado
function viewFontAwesome(field) {
    if ($('#'+field).val() != '') {
        const image_view = $('#image_view');
        image_view.attr('class', $('#'+field).val());
    }
}

//Retorna data Servidor
//op=1 : 9999-99-99
//op=2 : 99/99/9999
function dataServidor(op) {
    //Dados
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();

    //Retorno
    if (op == 1) {return ano+'-'+mes+'-'+dia;}
    if (op == 2) {return dia+'/'+mes+'/'+ano;}
}

//Retorna hora Servidor
//op=1 : H:m:s
//op=2 : H:m
function horaServidor(op) {
    //Dados
    var data = new Date();
    var hora = data.getHours().toString();
    var minutos = data.getMinutes().toString();
    var segundos = data.getSeconds().toString();

    //Acertos
    if (hora.length == 1) {hora = '0'+hora;}
    if (minutos.length == 1) {minutos = '0'+minutos;}
    if (segundos.length == 1) {segundos = '0'+segundos;}

    //Retorno
    if (op == 1) {return hora+':'+minutos+':'+segundos;}
    if (op == 2) {return hora+':'+minutos;}
}

//Retorna data por extenso
//op=1, data=14/04/2023 : Sexta-feira, 14 de Abril de 2023
//op=2, data=14/04/2023 : Rio de Janeiro, 14 de Abril de 2023
//op=3, data=14/04/2023 : Rio de Janeiro, Sexta-feira, 14 de Abril de 2023

function dataExtenso(op, data_informada) {
    meses = new Array("Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro");
    semana = new Array("Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado");

    var dia_informado = data_informada.split('/')[0];
    var mes_informado = data_informada.split('/')[1];
    var ano_informado = data_informada.split('/')[2];
    var data = ano_informado + '-' + mes_informado + '-' + dia_informado + " 00:00:00";
    var dataInfo = new Date(data);
    var dia = dataInfo.getDate();
    var dias = dataInfo.getDay();
    var mes = dataInfo.getMonth();
    var ano = dataInfo.getFullYear();

    if (op == 1) {
        var dataext = semana[dias] + ", " + dia + " de " + meses[mes] + " de " + ano;
    }

    if (op == 2) {
        var dataext = "Rio de Janeiro, " + dia + " de " + meses[mes] + " de " + ano;
    }

    if (op == 3) {
        var dataext = "Rio de Janeiro, " + semana[dias] + ", " + dia + " de " + meses[mes] + " de " + ano;
    }

    return dataext;
}

function valorExtenso(vlr) {
    var Num=parseFloat(vlr);

    if (vlr == 0) {
        return "Zero";
    } else {
        var inteiro = parseInt(vlr);; // parte inteira do valor

        if(inteiro<1000000000000000) {
            var resto = Num.toFixed(2) - inteiro.toFixed(2);       // parte fracionária do valor
            resto=resto.toFixed(2)
            var vlrS =  inteiro.toString();

            var cont=vlrS.length;
            var extenso="";
            var auxnumero;
            var auxnumero2;
            var auxnumero3;

            var unidade =["", "um", "dois", "três", "quatro", "cinco",
                "seis", "sete", "oito", "nove", "dez", "onze",
                "doze", "treze", "quatorze", "quinze", "dezesseis",
                "dezessete", "dezoito", "dezenove"];

            var centena = ["", "cento", "duzentos", "trezentos",
                "quatrocentos", "quinhentos", "seiscentos",
                "setecentos", "oitocentos", "novecentos"];

            var dezena = ["", "", "vinte", "trinta", "quarenta", "cinquenta",
                "sessenta", "setenta", "oitenta", "noventa"];

            var qualificaS = ["reais", "mil", "milhão", "bilhão", "trilhão"];
            var qualificaP = ["reais", "mil", "milhões", "bilhões", "trilhões"];

            for (var i=cont;i > 0;i--)
            {
                var verifica1="";
                var verifica2=0;
                var verifica3=0;
                auxnumero2="";
                auxnumero3="";
                auxnumero=0;
                auxnumero2 = vlrS.substr(cont-i,1);
                auxnumero = parseInt(auxnumero2);


                if((i==14)||(i==11)||(i==8)||(i==5)||(i==2))
                {
                    auxnumero2 = vlrS.substr(cont-i,2);
                    auxnumero = parseInt(auxnumero2);
                }

                if((i==15)||(i==12)||(i==9)||(i==6)||(i==3))
                {
                    extenso=extenso+centena[auxnumero];
                    auxnumero2 = vlrS.substr(cont-i+1,1)
                    auxnumero3 = vlrS.substr(cont-i+2,1)

                    if((auxnumero2!="0")||(auxnumero3!="0"))
                        extenso+=" e ";

                }else

                if(auxnumero>19){
                    auxnumero2 = vlrS.substr(cont-i,1);
                    auxnumero = parseInt(auxnumero2);
                    extenso=extenso+dezena[auxnumero];
                    auxnumero3 = vlrS.substr(cont-i+1,1)

                    if((auxnumero3!="0")&&(auxnumero2!="1"))
                        extenso+=" e ";
                }
                else if((auxnumero<=19)&&(auxnumero>9)&&((i==14)||(i==11)||(i==8)||(i==5)||(i==2)))
                {
                    extenso=extenso+unidade[auxnumero];
                }else if((auxnumero<10)&&((i==13)||(i==10)||(i==7)||(i==4)||(i==1)))
                {
                    auxnumero3 = vlrS.substr(cont-i-1,1);
                    if((auxnumero3!="1")&&(auxnumero3!=""))
                        extenso=extenso+unidade[auxnumero];
                }

                if(i%3==1)
                {
                    verifica3 = cont-i;
                    if(verifica3==0)
                        verifica1 = vlrS.substr(cont-i,1);

                    if(verifica3==1)
                        verifica1 = vlrS.substr(cont-i-1,2);

                    if(verifica3>1)
                        verifica1 = vlrS.substr(cont-i-2,3);

                    verifica2 = parseInt(verifica1);

                    if(i==13)
                    {
                        if(verifica2==1){
                            extenso=extenso+" "+qualificaS[4]+" ";
                        }else if(verifica2!=0){extenso=extenso+" "+qualificaP[4]+" ";}}
                    if(i==10)
                    {
                        if(verifica2==1){
                            extenso=extenso+" "+qualificaS[3]+" ";
                        }else if(verifica2!=0){extenso=extenso+" "+qualificaP[3]+" ";}}
                    if(i==7)
                    {
                        if(verifica2==1){
                            extenso=extenso+" "+qualificaS[2]+" ";
                        }else if(verifica2!=0){extenso=extenso+" "+qualificaP[2]+" ";}}
                    if(i==4)
                    {
                        if(verifica2==1){
                            extenso=extenso+" "+qualificaS[1]+" ";
                        }else if(verifica2!=0){extenso=extenso+" "+qualificaP[1]+" ";}}
                    if(i==1)
                    {
                        if(verifica2==1){
                            extenso=extenso+" "+qualificaS[0]+" ";
                        }else {extenso=extenso+" "+qualificaP[0]+" ";}}
                }
            }
            resto = resto * 100;
            var aexCent=0;
            if(resto<=19&&resto>0)
                extenso+=" e "+unidade[resto]+" Centavos";
            if(resto>19)
            {
                aexCent=parseInt(resto/10);

                extenso+=" e "+dezena[aexCent]
                resto=resto-(aexCent*10);

                if(resto!=0)
                    extenso+=" e "+unidade[resto]+" Centavos";
                else extenso+=" Centavos";
            }

            return extenso;
        } else {
            return "Numero maior que 999 trilhões";
        }
    }
}

function float2moeda(num) {
    x = 0;

    if (num < 0) {
        num = Math.abs(num);
        x = 1;
    }

    if (isNaN(num)) num = "0";

    cents = Math.floor((num*100+0.5)%100);
    num = Math.floor((num*100+0.5)/100).toString();

    if (cents < 10) cents = "0" + cents;

    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
        num = num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
    ret = num + ',' + cents;

    if (x == 1) ret = ' - ' + ret;

    return ret;
}

function moeda2float(moeda){
    moeda = moeda.replace(".","");
    moeda = moeda.replace(".","");
    moeda = moeda.replace(".","");
    moeda = moeda.replace(".","");
    moeda = moeda.replace(",",".");
    return parseFloat(moeda);
}

function aplicarMascaraJs(value, pattern) {
    let i = 0;
    const v = value.toString();
    return pattern.replace(/#/g, () => v[i++] || '');
}

//Funções para o Submódulo Clientes - INÍCIO''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para o Submódulo Clientes - INÍCIO''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function pavimentosShowHide() {
    numero_pavimentos = $('#numero_pavimentos').val();

    for(i=1; i<=50; i++) {
        if (numero_pavimentos >= i) {
            $('#divMedidasSeguranca' + i).show();
        } else {
            $('#divMedidasSeguranca'+i).hide();

            //Limpar campos do Pavimento que deu hide
            $('#divMedidasSeguranca'+i+' .cbSegurancaMedida').prop('checked', false);
            $('#divMedidasSeguranca'+i+' .quantidadeSegurancaMedida').val('');
            $('#divMedidasSeguranca'+i+' .tipoSegurancaMedida').val('');
            $('#divMedidasSeguranca'+i+' .observacaoSegurancaMedida').val('');
        }
    }
}
//Funções para o Submódulo Clientes - FIM'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para o Submódulo Clientes - FIM'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Funções para o Submódulo Cliente Serviços - INÍCIO''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para o Submódulo Cliente Serviços - INÍCIO''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''


//Limpar Dados do Modal
function cs_limparDados() {
    bi_limparDados();
}

//Configuração campos que vão aparecer para o Serviço escolhido
function cs_configuracaoCampos() {
    var servico_tipo_id = $('#servico_id option[value="'+$('#servico_id').val()+'"]').attr('data-servico_tipo_id');

    //Hide campos
    $('#divQuantidade').hide();
    $('#divDataInicio').hide();
    $('#divDataFim').hide();
    $('#divDataVencimento').hide();
    $('#divValor').hide();

    //d-none
    $('#divSTBrigada').addClass('d-none');
    $('#divSTVisitaTecnica').addClass('d-none');
    $('#divSTManutencao').addClass('d-none');

    //Serviço Tipo 1: BRIGADA DE INCÊNDIO
    if (servico_tipo_id == 1) {
        //Show campos
        $('#divDataInicio').show();
        $('#divDataFim').show();
        $('#divDataVencimento').show();
        $('#divValor').show();

        $('#divSTBrigada').removeClass('d-none');

        //Limpar campos
        $('#quantidade').val('');
    }

    //Serviço Tipo 2: MANUTENÇÃO
    if (servico_tipo_id == 2) {
        //Show campos
        $('#divQuantidade').show();
        $('#divDataInicio').show();
        $('#divDataFim').show();
        $('#divDataVencimento').show();
        $('#divValor').show();

        //$('#divSTManutencao').removeClass('d-none');
    }

    //Serviço Tipo 3: VISITA TÉCNICA
    if (servico_tipo_id == 3) {
        //Show campos
        $('#divDataInicio').show();
        $('#divDataFim').show();
        $('#divDataVencimento').show();
        $('#divValor').show();

        //$('#divSTVisitaTecnica').removeClass('d-none');

        //Limpar campos
        $('#quantidade').val('');
    }
}

//BRIGADA DE INCÊNDIO - INICIO''''''''''''''''''''''''''''''''''''''''''''''''
//BRIGADA DE INCÊNDIO - INICIO''''''''''''''''''''''''''''''''''''''''''''''''

//Limpar Dados
function bi_limparDados() {
    bi_limparFormulario();
    bi_limparGradeBrigadistas();
}

//Limpar Formulário
function bi_limparFormulario() {
    //Limpar informações gerais
    $('#bi_escala_tipo_id').val('');
    $('#bi_quantidade_alas_escala').val('');
    $('#bi_quantidade_brigadistas_por_ala').val('');
    $('#bi_quantidade_brigadistas_total').val('');
    $('#bi_hora_inicio_ala').val('');
}

//Limpar Grade de Brigadistas
function bi_limparGradeBrigadistas() {
    //Limpar grade de brigadistas
    $('#bi_grade_funcionario_id').val('');
    $('#select2-bi_grade_funcionario_id-container').html('');
    $('#bi_grade_funcionario_nome').val('');
    $('#bi_grade_ala').val('');

    $('#bi_tbody_grade_brigadistas').html('');
    $('#bi_funcionario_hiddens').html('');
}

//Atualiza/Limpa grade de brigadistas
//operacao = 0 : Limpar
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
//operacao = 3 : Retirar
function bi_gradeBrigadistasEscolher(operacao, funcionario_id='', funcionario_nome='', ala='') {
    if (operacao == 0) {
        //campos
        $('#bi_grade_funcionario_id').val(funcionario_id);
        $('#select2-bi_grade_funcionario_id-container').html(funcionario_nome);
        $('#bi_grade_funcionario_nome').val(funcionario_nome);
        $('#bi_grade_ala').val(ala);

        //botoes
        $('#bi_divGradeFuncionarioAdicionar').hide();
        $('#bi_divGradeFuncionarioRetirar').hide();
    }

    if (operacao == 1) {
        //campos
        $('#bi_grade_funcionario_nome').val(funcionario_nome);

        //botoes
        $('#bi_divGradeFuncionarioAdicionar').show();
        $('#bi_divGradeFuncionarioRetirar').hide();
    }

    if (operacao == 2) {
        //campos
        $('#bi_grade_funcionario_id').val(funcionario_id);
        $('#select2-bi_grade_funcionario_id-container').html(funcionario_nome);
        $('#bi_grade_funcionario_nome').val(funcionario_nome);
        $('#bi_grade_ala').val(ala);

        //botoes
        $('#bi_divGradeFuncionarioAdicionar').hide();
        $('#bi_divGradeFuncionarioRetirar').show();
    }
}

//Atualizar a Grade de Brigadistas
//operacao = 0 : Somente atualiza os valores
//operacao = 1 : Adicionar
//operacao = 2 : Atualizar
//operacao = 3 : Retirar
function bi_gradeBrigadistasAtualizar(operacao) {
    if (operacao == 1) {
        //Dados para preenchera linha da grade
        var bi_grade_funcionario_id = $('#bi_grade_funcionario_id').val();
        var bi_grade_funcionario_nome = $('#bi_grade_funcionario_nome').val();
        var bi_grade_ala = $('#bi_grade_ala').val();

        //Montar Linha
        var linha;

        linha = "<tr class='bi_funcionario_linha' id='bi_funcionario_linha_" + bi_grade_funcionario_id + "' data-id='" + bi_grade_funcionario_id + "' style='cursor: pointer'>";
        linha += "  <td id='funcionario_ala_td_" + bi_grade_funcionario_id + "'>" + bi_grade_ala + "</td>";
        linha += "  <td id='funcionario_nome_td_" + bi_grade_funcionario_id + "'>" + bi_grade_funcionario_nome + "</td>";
        linha += "</tr>";

        //Adicionar linha na grade
        $('#bi_tbody_grade_brigadistas').append(linha);

        //Montar campos hidden
        var hiddens;

        hiddens = "<div id='bi_funcionario_hiddens_" + bi_grade_funcionario_id + "'>";
        hiddens += "<input type='hidden' name='bi_funcionario_id[]' id='bi_funcionario_id' value='"+bi_grade_funcionario_id+"'>";
        hiddens += "<input type='hidden' name='bi_funcionario_nome[]' id='bi_funcionario_nome' value='"+bi_grade_funcionario_nome+"'>";
        hiddens += "<input type='hidden' name='bi_ala[]' id='bi_ala' value='"+bi_grade_ala+"'>";
        hiddens += "</div>";

        //Adicionar hiddens na div
        $('#bi_funcionario_hiddens').append(hiddens);
    }

    if (operacao == 3) {
        //Dados
        var bi_grade_funcionario_id = $('#bi_grade_funcionario_id').val();

        //Remover linha da grade
        $('#bi_funcionario_linha_'+bi_grade_funcionario_id).remove();

        //Remover campos hiddens
        $('#bi_funcionario_hiddens_'+bi_grade_funcionario_id).remove();
    }

    //Contando Funcionarios na grade
    $('#bi_funcionario_total').html('Total: '+$('.bi_funcionario_linha').length+'/'+$('#bi_quantidade_brigadistas_total').val());
}

//Alterar campo bi_quantidade_brigadistas_total de acordo com os campos bi_escala_tipo_id e bi_quantidade_brigadistas_por_ala
function bi_quantidadeBrigadistasTotal() {
    var bi_quantidade_brigadistas_total = 0;

    if ($('#bi_escala_tipo_id').val() != '' && $('#bi_quantidade_brigadistas_por_ala').val() != '') {
        var qtd_alas_escala = $('#bi_quantidade_alas_escala').val();
        var qtd_brigadistas_por_ala = $('#bi_quantidade_brigadistas_por_ala').val();

        bi_quantidade_brigadistas_total = qtd_alas_escala * qtd_brigadistas_por_ala;
    }

    $('#bi_quantidade_brigadistas_total').val(bi_quantidade_brigadistas_total);
}

//Verificar se dados da grade estão corretos
//@PARAN op=1 : Ao escolher Brigadista para colocar na grade
//@PARAN op=2 : Ao tentar Incluir ou Alterar
function bi_gradeBrigadistasVerificacao(op) {
    //Verificar se qtd de Brigadistas em cada ala na grade está correto''''''''''''''''''''''''
    for(i=1; i<=$('#bi_quantidade_alas_escala').val(); i++) {
        var qtd_na_grade = 0;
        $("input[name='bi_ala[]']").each(function () {
            if ($(this).val() == i) {
                qtd_na_grade++;
            }
        });

        if (qtd_na_grade > $('#bi_quantidade_brigadistas_por_ala').val()) {
            alert('Ala '+i+'. '+'É preciso ter '+$('#bi_quantidade_brigadistas_por_ala').val()+' Brigadistas em cada Ala na Grade.');
            return false;
        }
    }
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Verificar se qtd de Brigadistas na grade está correto''''''''''''''''''''''''''''''''''''''
    var qtd_na_grade = 0;
    $("input[name='bi_funcionario_id[]']").each(function () {qtd_na_grade++;});

    if (qtd_na_grade > $('#bi_quantidade_brigadistas_total').val()) {
        alert('É preciso ter '+$('#bi_quantidade_brigadistas_total').val()+' Brigadistas na Grade.');
        return false;
    }

    //Se for para Salvar verifica se a quantidade na grade é menor
    if (op == 2) {
        if (qtd_na_grade < $('#bi_quantidade_brigadistas_total').val()) {
            alert('É preciso ter ' + $('#bi_quantidade_brigadistas_total').val() + ' Brigadistas na Grade.');
            return false;
        }
    }
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    return true;
}

//Configuração conforme escala escolhida
function bi_configuracaoConformeEscala(bi_escala_tipo_id) {
    var quantidade_alas = $('#bi_escala_tipo_id option[value="'+bi_escala_tipo_id+'"]').attr('data-quantidade_alas');

    //Campos hidden
    $('#bi_quantidade_alas_escala').val(quantidade_alas);

    //campo bi_grade_ala <options>
    var bi_grade_ala_options = '<option value="">&nbsp;</option>';
    for (i = 1; i <= quantidade_alas; i++) {
        bi_grade_ala_options += '<option value="' + i + '">' + i + '</option>';
    }

    $('#bi_grade_ala').html(bi_grade_ala_options);

    //Quantidade Total de Brigadistas
    bi_quantidadeBrigadistasTotal();
}
//BRIGADA DE INCÊNDIO - FIM'''''''''''''''''''''''''''''''''''''''''''''''''''
//BRIGADA DE INCÊNDIO - FIM'''''''''''''''''''''''''''''''''''''''''''''''''''

//VISITA TÉCNICA - INICIO'''''''''''''''''''''''''''''''''''''''''''''''''''''
//VISITA TÉCNICA - INICIO'''''''''''''''''''''''''''''''''''''''''''''''''''''

//Verificar se pode salvar
function vt_verificacao() {
    var retorno = true;

    //Buscar dados do Registro
    $.ajax({
        type:'GET',
        url: 'clientes/'+$('#cliente_id').val(),
        async: false,
        success: function (data) {
            //Lendo dados
            if (data.success) {
                cliente_seguranca_medidas = data.success['cliente_seguranca_medidas'];

                if (cliente_seguranca_medidas.length <= 0) {
                    alert('Erro nos dados vindos do Cliente. Verifique as Medidas de Segurança.');
                    retorno = false;
                }
            }
        }
    });

    return retorno;
}
//VISITA TÉCNICA - FIM''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//VISITA TÉCNICA - FIM''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Funções para o Submódulo Cliente Serviços - FIM'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para o Submódulo Cliente Serviços - FIM'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Funções para o Submódulo Visitas Técnicas - INÍCIO''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para o Submódulo Visitas Técnicas - INÍCIO''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

function vt_configurarFormulario(dados) {
    if ($('#frm_operacao').val() == 'edit') {
        //Div's Principais''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        $('#divInformacoesServico').show();
        $('#divClassificacaoDecretoInformacoesGerais').hide();
        $('#divMedidasSeguranca').show();
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Pdf's'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        $('.input_projeto_scip_pdf').show();
        $('.btn_projeto_scip_pdf_upload').show();

        $('.input_laudo_exigencias_pdf').show();
        $('.btn_laudo_exigencias_pdf_upload').show();

        $('.input_certificado_aprovacao_pdf').show();
        $('.btn_certificado_aprovacao_pdf_upload').show();

        $('.input_certificado_aprovacao_simplificado_pdf').show();
        $('.btn_certificado_aprovacao_simplificado_pdf_upload').show();

        $('.input_certificado_aprovacao_assistido_pdf').show();
        $('.btn_certificado_aprovacao_assistido_pdf_upload').show();
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    } else {
        //Div's Principais''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        $('#divInformacoesServico').show();
        $('#divClassificacaoDecretoInformacoesGerais').show();
        $('#divMedidasSeguranca').show();
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Pdf's'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        $('.input_projeto_scip_pdf').hide();
        $('.btn_projeto_scip_pdf_upload').hide();

        $('.input_laudo_exigencias_pdf').hide();
        $('.btn_laudo_exigencias_pdf_upload').hide();

        $('.input_certificado_aprovacao_pdf').hide();
        $('.btn_certificado_aprovacao_pdf_upload').hide();

        $('.input_certificado_aprovacao_simplificado_pdf').hide();
        $('.btn_certificado_aprovacao_simplificado_pdf_upload').hide();

        $('.input_certificado_aprovacao_assistido_pdf').hide();
        $('.btn_certificado_aprovacao_assistido_pdf_upload').hide();
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }

    //Classificação - Documentos''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    $('#divProjetoScip').hide();
    $('#divLaudoExigencias').hide();
    $('#divCertificadoAprovacao').hide();
    $('#divCertificadoAprovacaoSimplificado').hide();
    $('#divCertificadoAprovacaoAssistido').hide();

    if (dados.projeto_scip == 1) {$('#divProjetoScip').show();}
    if (dados.laudo_exigencias == 1) {$('#divLaudoExigencias').show();}
    if (dados.certificado_aprovacao == 1) {$('#divCertificadoAprovacao').show();}
    if (dados.certificado_aprovacao_simplificado == 1) {$('#divCertificadoAprovacaoSimplificado').show();}
    if (dados.certificado_aprovacao_assistido == 1) {$('#divCertificadoAprovacaoAssistido').show();}
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
}

function vt_preencherFormulario(dados) {
    //Dados do Serviço criado no submódulo Clientes'''''''''''''''''''''''''''''''''''
    let clientes_servicos_servico = dados.clientes_servicos_servico;

    //Campos
    $('#is_cliente').val(clientes_servicos_servico.clienteName);
    $('#is_servico_status').val(clientes_servicos_servico.servicoStatusName);
    $('#is_responsavel_funcionario').val(clientes_servicos_servico.responsavelFuncionarioName);
    $('#is_data_inicio').val(clientes_servicos_servico.data_inicio);
    $('#is_data_fim').val(clientes_servicos_servico.data_fim);
    $('#is_data_vencimento').val(clientes_servicos_servico.data_vencimento);
    $('#is_valor').val(clientes_servicos_servico.valor);
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Classificação - Medidas de Segurança''''''''''''''''''''''''''''''''''''''''''''
    var numero_pavimentos = dados.numero_pavimentos;
    var cliente_seguranca_medidas = dados['cliente_seguranca_medidas'];
    var medidas_seguranca = '';

    //verificar validacoes
    if (numero_pavimentos == '' || numero_pavimentos == '0' || numero_pavimentos == 0) {
        alert('Erro nos dados vindos do Cliente. Verifique o Número de Pavimentos.');
        $('#divMedidasSeguranca').hide();
        return false;
    }
    if (cliente_seguranca_medidas.length <= 0) {
        alert('Erro nos dados vindos do Cliente. Verifique as Medidas de Segurança.');
        $('#divMedidasSeguranca').hide();
        return false;
    }

    //Montar
    for (pavimento = 1; pavimento <= numero_pavimentos; pavimento++) {
        ctrl = 0;

        medidas_seguranca += '<h6 class="pb-3 text-success"><i class="fa fa-fire-extinguisher"></i> Medidas de Segurança - Pavimento ' + '<span class="font-size-15">' + pavimento + '</span>' + '</h6>';

        //Campos
        $.each(cliente_seguranca_medidas, function (i, campo) {
            if (pavimento == campo.pavimento) {
                ctrl++;

                seguranca_medida_id = campo.seguranca_medida_id;

                if (campo.seguranca_medida_nome === null || campo.seguranca_medida_nome === undefined) {
                    seguranca_medida_nome = '';
                } else {
                    seguranca_medida_nome = campo.seguranca_medida_nome;
                }
                if (campo.seguranca_medida_quantidade === null || campo.seguranca_medida_quantidade === undefined) {
                    seguranca_medida_quantidade = '';
                } else {
                    seguranca_medida_quantidade = campo.seguranca_medida_quantidade;
                }
                if (campo.seguranca_medida_tipo === null || campo.seguranca_medida_tipo === undefined) {
                    seguranca_medida_tipo = '';
                } else {
                    seguranca_medida_tipo = campo.seguranca_medida_tipo;
                }
                if (campo.seguranca_medida_observacao === null || campo.seguranca_medida_observacao === undefined) {
                    seguranca_medida_observacao = '';
                } else {
                    seguranca_medida_observacao = campo.seguranca_medida_observacao;
                }
                if (campo.status === null || campo.status === undefined) {
                    status = '';
                } else {
                    status = campo.status;
                }
                if (campo.observacao === null || campo.observacao === undefined) {
                    observacao = '';
                } else {
                    observacao = campo.observacao;
                }

                medidas_seguranca += vt_prepararMedidasSegurancas(ctrl, pavimento, seguranca_medida_id, seguranca_medida_nome, seguranca_medida_quantidade, seguranca_medida_tipo, seguranca_medida_observacao, status, observacao);
            }
        });
    }

    $('#divMedidasSegurancaItens').html(medidas_seguranca);

    return true;
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
}

function vt_prepararMedidasSegurancas(ctrl, pavimento, seguranca_medida_id, seguranca_medida_nome, seguranca_medida_quantidade, seguranca_medida_tipo, seguranca_medida_observacao, status, observacao) {
    //Verificar se os campos vao ser readonly
    if ($('#frm_operacao').val() == 'edit') {readonly = ''; disabled = '';} else {readonly = 'readonly'; disabled = 'disabled';}

    //Combo status''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    var combo_status = '';
    var selected0 = '';
    var selected1 = '';
    var selected2 = '';

    if (status == 0) {selected0 = 'selected';}
    if (status == 1) {selected1 = 'selected';}
    if (status == 2) {selected2 = 'selected';}

    combo_status = '<select class="form-control col-12" id="status_' + pavimento + '_' + seguranca_medida_id + '" name="status_' + pavimento + '_' + seguranca_medida_id + '" required="required" '+readonly+'  '+disabled+'>';
    combo_status += '  <option value="0" '+selected0+'>Não Conferido</option>';
    combo_status += '  <option value="1" '+selected1+'>Aprovado</option>';
    combo_status += '  <option value="2" '+selected2+'>Restrição</option>';
    combo_status += '</select>';
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    var medidas_seguranca;

    medidas_seguranca = '<div class="col-12 col-md-6 pb-3">';
    medidas_seguranca += '  <div class="col-12 alert alert-primary">';
    medidas_seguranca += '      <div class="form-group col-12 pb-3">';
    medidas_seguranca += '          <div class="text-primary font-size-11 fw-bold align-middle me-2"><span class="font-size-14">'+pavimento+'.'+ctrl+'</span>' + '&nbsp;'+seguranca_medida_nome+ '</div>';
    medidas_seguranca += '          <input type="hidden" id="seguranca_medida_id_' + pavimento + '_' + seguranca_medida_id + '" name="seguranca_medida_id_' + pavimento + '_' + seguranca_medida_id + '" value="' + seguranca_medida_id + '">';
    medidas_seguranca += '          <input type="hidden" id="seguranca_medida_nome_' + pavimento + '_' + seguranca_medida_id + '" name="seguranca_medida_nome_' + pavimento + '_' + seguranca_medida_id + '" value="' + seguranca_medida_nome + '">';
    medidas_seguranca += '          <input type="hidden" name="ids_seguranca_medidas[]" value="' + seguranca_medida_id + '">';
    medidas_seguranca += '      </div>';
    medidas_seguranca += '      <div class="row">';
    medidas_seguranca += '          <div class="form-group col-12 col-md-2 pb-3">';
    medidas_seguranca += '              <label class="form-label">Qtd</label>';
    medidas_seguranca += '              <div class="col-12 text-dark">'+seguranca_medida_quantidade+'</div>';
    medidas_seguranca += '          </div>';
    medidas_seguranca += '          <div class="form-group col-12 col-md-10 pb-3">';
    medidas_seguranca += '              <label class="form-label">Tipo</label>';
    medidas_seguranca += '              <div class="col-12 text-dark">'+seguranca_medida_tipo+'</div>';
    medidas_seguranca += '          </div>';
    medidas_seguranca += '      </div>';
    medidas_seguranca += '      <div class="row">';
    medidas_seguranca += '          <div class="form-group col-12 col-md-4">';
    medidas_seguranca += '              <label class="form-label">Status</label>';
    medidas_seguranca +=                combo_status;
    medidas_seguranca += '          </div>';
    medidas_seguranca += '          <div class="form-group col-12 col-md-8">';
    medidas_seguranca += '              <label class="form-label">Observação</label>';
    medidas_seguranca += '              <textarea class="form-control" id="observacao_' + pavimento + '_' + seguranca_medida_id + '" name="observacao_' + pavimento + '_' + seguranca_medida_id + '" '+readonly+'>' + observacao + '</textarea>';
    medidas_seguranca += '          </div>';
    medidas_seguranca += '      </div>';
    medidas_seguranca += '  </div>';
    medidas_seguranca += '</div>';

    return medidas_seguranca;
}
//Funções para o Submódulo Visitas Técnicas - FIM'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para o Submódulo Visitas Técnicas - FIM'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Funções para o Submódulo Brigadas Incêndios - INÍCIO''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para o Submódulo Brigadas Incêndios - INÍCIO''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Preencher o Formulário com Informações do Serviço
function bi_preencherFormulario(dados) {
    //Dados do Serviço criado no submódulo Clientes'''''''''''''''''''''''''''''''''''
    let clientes_servicos_servico = dados.clientes_servicos_servico;

    //Campos
    $('#is_cliente').val(clientes_servicos_servico.clienteName);
    $('#is_servico_status').val(clientes_servicos_servico.servicoStatusName);
    $('#is_responsavel_funcionario').val(clientes_servicos_servico.responsavelFuncionarioName);
    $('#is_data_inicio').val(clientes_servicos_servico.data_inicio);
    $('#is_data_fim').val(clientes_servicos_servico.data_fim);
    $('#is_data_vencimento').val(clientes_servicos_servico.data_vencimento);
    $('#is_valor').val(clientes_servicos_servico.valor);
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
}

//Brigadas Incêndios - Escalas - INÍCIO''''''''''''''''''
//Brigadas Incêndios - Escalas - INÍCIO''''''''''''''''''

//Grade de Registros de Escalas
function bi_montarGradeEscala() {
    //Verificar período
    if ($('#es_periodo_data_1').val() == '' || $('#es_periodo_data_2').val() == '') {
        alert('Escolha um Período.');
    } else {
        $('.er_grade_escala').DataTable({
            language: {
                pageLength: {
                    '-1': 'Mostrar todos os registros',
                    '_': 'Mostrar %d registros'
                },
                lengthMenu: 'Exibir _MENU_ resultados por página',
                emptyTable: 'Nenhum registro encontrado',
                info: 'Mostrando de _START_ até _END_ de _TOTAL_ registros',
                infoEmpty: 'Mostrando 0 até 0 de 0 registros',
                infoFiltered: '(Filtrados de _MAX_ registros)',
                infoThousands: '.',
                loadingRecords: 'Carregando...',
                processing: 'Processando...',
                zeroRecords: 'Nenhum registro encontrado',
                search: 'Pesquisar',
                paginate: {
                    next: 'Próximo',
                    previous: 'Anterior',
                    first: 'Primeiro',
                    last: 'Último'
                }
            },
            bDestroy: true,
            responsive: false,
            pageLength: 5,
            lengthChange: true,
            autoWidth: true,
            order: [],
            processing: true,
            serverSide: false,
            ajax: 'brigadas/escalas_index/' + $('#registro_id').val() + '/' + $('#es_periodo_data_1').val() + '/' + $('#es_periodo_data_2').val(),
            columnDefs: [{'targets': [0, 1, 2, 3], 'orderable': false}],
            columns: [
                {'data': '#'},
                {'data': 'funcionario_nome'},
                {'data': 'chegada_saida'},
                {'data': 'action'}
            ]
        });
    }
}
//Brigadas Incêndios - Escalas - FIM'''''''''''''''''''''
//Brigadas Incêndios - Escalas - FIM'''''''''''''''''''''

//Brigadas Incêndios - Rondas - INÍCIO'''''''''''''''''''
//Brigadas Incêndios - Rondas - INÍCIO'''''''''''''''''''

//Função para montar o Formulário da Ronda
//@PARAN op=1 : Executar Ronda - Dados vão vir da tabela clientes_seguranca_medidas
//@PARAN op=2 : Visualizar Ronda - Dados vão vir da tabela brigadas_rondas_seguranca_medidas
function formularioRonda(op, dados) {
    //dados
    var seguranca_medidas = dados;

    //Classificação - Medidas de Segurança''''''''''''''''''''''''''''''''''''''''''''
    var retorno = '';
    var retorno_titulo = '';
    var retorno_linha = '';

    //verificar validacoes
    if (seguranca_medidas.length <= 0) {
        alert('Erro nos dados vindos do Cliente. Verifique as Medidas de Segurança.');
        return;
    }

    //numero_pavimentos (Fictício)
    var numero_pavimentos = 50;

    //Montar
    for (var pavimento = 1; pavimento <= numero_pavimentos; pavimento++) {
        var ctrl = 0;

        retorno_titulo = '<h6 class="pb-3 text-success"><i class="fa fa-fire-extinguisher"></i> Medidas de Segurança - Pavimento ' + '<span class="font-size-15">' + pavimento + '</span>' + '</h6>';
        retorno_linha = '';

        //Campos
        $.each(seguranca_medidas, function (i, campo) {
            if (pavimento == campo.pavimento) {
                ctrl++;

                if (op == 1) {
                    var seguranca_medida_id = campo.seguranca_medida_id;
                    var seguranca_medida_nome = campo.seguranca_medida_nome;
                    var seguranca_medida_quantidade = campo.quantidade;
                    var seguranca_medida_tipo = campo.tipo;
                    var status = '';
                    var observacao = '';
                    var foto = '';
                }

                if (op == 2) {
                    var seguranca_medida_id = campo.seguranca_medida_id;
                    var seguranca_medida_nome = campo.seguranca_medida_nome;
                    var seguranca_medida_quantidade = campo.seguranca_medida_quantidade;
                    var seguranca_medida_tipo = campo.seguranca_medida_tipo;
                    var status = campo.status;
                    var observacao = campo.observacao;
                    var foto = campo.foto;
                }

                retorno_linha += formularioRondaSegurancaMedidas(op, ctrl, pavimento, seguranca_medida_id, seguranca_medida_nome, seguranca_medida_quantidade, seguranca_medida_tipo, status, observacao, foto);
            }
        });

        if (retorno_linha != '') {retorno += retorno_titulo+retorno_linha;}
    }

    $('#divMedidasSegurancaRondaItens').html(retorno);
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
}

//Função para montar as Segurança Medidas no Formulário Ronda
//@PARAN op=1 : Executar Ronda
//@PARAN op=2 : Visualizar Ronda
function formularioRondaSegurancaMedidas(op, ctrl, pavimento, seguranca_medida_id, seguranca_medida_nome, seguranca_medida_quantidade, seguranca_medida_tipo, status, observacao, foto) {
    //Verificar se os campos vao ser readonly
    var readonly = '';
    var disabled = '';

    var textoStatus = 'NÃO INFORMADO';
    var textoCor = '';

    var botoesStyle = '';

    var botaoVerFoto = '&nbsp;';
    var botaoVerFotoStyle = '';

    if (op == 2) {
        readonly = 'readonly';
        disabled = 'disabled';

        if (status == 0) {
            textoStatus = textoStatus = '<i class="far fa-calendar-minus"></i>'+' NÃO ENCONTRADO';
            textoCor = 'text-warning';
        }

        if (status == 1) {
            textoStatus = textoStatus = '<i class="far fa-calendar-check"></i>'+' CONFERIDO';
            textoCor = 'text-success';
        }

        if (status == 2) {
            textoStatus = textoStatus = '<i class="far fa-calendar-times"></i>'+' DANIFICADO';
            textoCor = 'text-danger';
        }

        botoesStyle = 'style="display:none;"';

        if (foto !== null) {
            botaoVerFoto = '<button type="button" class="btn btn-sm btn-primary text-center font-size-12 pt-0 pb-0" data-bs-toggle="modal" data-bs-target=".modal-ver-foto" data-bs-placement="top" onclick="$(\'#verFoto\').attr(\'src\', $(\'#foto_'+pavimento+'_'+seguranca_medida_id+'\').val());">Ver</button>';
        }

        botaoVerFotoStyle = 'style="display:none;"';
    }

    var medidas_seguranca;

    medidas_seguranca = '<div class="col-12 col-md-6 pb-3">';
    medidas_seguranca += '  <div class="col-12 alert alert-primary">';
    medidas_seguranca += '      <div class="form-group col-12 pb-3">';
    medidas_seguranca += '          <div class="text-primary font-size-11 fw-bold align-middle me-2"><span class="font-size-14">'+pavimento+'.'+ctrl+'</span>' + '&nbsp;'+seguranca_medida_nome+ '</div>';
    medidas_seguranca += '          <input type="hidden" id="seguranca_medida_id_' + pavimento + '_' + seguranca_medida_id + '" name="seguranca_medida_id_' + pavimento + '_' + seguranca_medida_id + '" value="' + seguranca_medida_id + '">';
    medidas_seguranca += '          <input type="hidden" id="seguranca_medida_nome_' + pavimento + '_' + seguranca_medida_id + '" name="seguranca_medida_nome_' + pavimento + '_' + seguranca_medida_id + '" value="' + seguranca_medida_nome + '">';
    medidas_seguranca += '          <input type="hidden" id="seguranca_medida_quantidade_' + pavimento + '_' + seguranca_medida_id + '" name="seguranca_medida_quantidade_' + pavimento + '_' + seguranca_medida_id + '" value="' + seguranca_medida_quantidade + '">';
    medidas_seguranca += '          <input type="hidden" id="seguranca_medida_tipo_' + pavimento + '_' + seguranca_medida_id + '" name="seguranca_medida_tipo_' + pavimento + '_' + seguranca_medida_id + '" value="' + seguranca_medida_tipo + '">';
    medidas_seguranca += '          <input type="hidden" name="ids_seguranca_medidas[]" value="' + seguranca_medida_id + '">';
    medidas_seguranca += '      </div>';
    medidas_seguranca += '      <div class="row">';

    medidas_seguranca += '          <div class="form-group col-2 col-md-2 pb-3">';
    medidas_seguranca += '              <label class="form-label">Qtd</label>';
    medidas_seguranca += '              <div class="col-12 text-dark">'+seguranca_medida_quantidade+'</div>';
    medidas_seguranca += '          </div>';

    medidas_seguranca += '          <div class="form-group col-10 col-md-10 pb-3">';
    medidas_seguranca += '              <label class="form-label">Tipo</label>';
    medidas_seguranca += '              <div class="col-12 text-dark">'+seguranca_medida_tipo+'</div>';
    medidas_seguranca += '          </div>';

    medidas_seguranca += '          <div class="form-group col-12 col-md-8 pb-3">';
    medidas_seguranca += '              <label class="form-label">Observação</label>';
    medidas_seguranca += '              <textarea class="form-control" id="observacao_' + pavimento + '_' + seguranca_medida_id + '" name="observacao_' + pavimento + '_' + seguranca_medida_id + '" '+readonly+'>' + observacao + '</textarea>';
    medidas_seguranca += '          </div>';

    medidas_seguranca += '          <div class="form-group col-8 pb-3 text-center border border-primary rounded">';
    medidas_seguranca += '              <label class="form-label">Status</label>';
    medidas_seguranca += '              <div class="pb-2 font-size-12 '+textoCor+'" id="textoStatus_' + pavimento + '_' + seguranca_medida_id + '">'+textoStatus+'</div>';
    medidas_seguranca += '              <div class="row" '+botoesStyle+'>';
    medidas_seguranca += '                  <div class="col-4">';
    medidas_seguranca += '                      <button type="button" class="btn btn-outline-warning text-center font-size-16" onclick="formularioRondaCampoStatus(0, '+pavimento+', '+seguranca_medida_id+');"><i class="far fa-calendar-minus"></i></button>';
    medidas_seguranca += '                  </div>';
    medidas_seguranca += '                  <div class="col-4">';
    medidas_seguranca += '                      <button type="button" class="btn btn-outline-success text-center font-size-16" onclick="formularioRondaCampoStatus(1, '+pavimento+', '+seguranca_medida_id+');"><i class="far fa-calendar-check"></i></button>';
    medidas_seguranca += '                  </div>';
    medidas_seguranca += '                  <div class="col-4">';
    medidas_seguranca += '                      <button type="button" class="btn btn-outline-danger text-center font-size-16" onclick="formularioRondaCampoStatus(2, '+pavimento+', '+seguranca_medida_id+');"><i class="far fa-calendar-times"></i></button>';
    medidas_seguranca += '                  </div>';
    medidas_seguranca += '              </div>';
    medidas_seguranca += '              <input type="hidden" class="inputsStatus" id="status_' + pavimento + '_' + seguranca_medida_id + '" name="status_' + pavimento + '_' + seguranca_medida_id + '" value="' + status + '" data-pavimento="'+pavimento+'" data-seguranca_medida_id="'+seguranca_medida_id+'" data-seguranca_medida_nome="'+seguranca_medida_nome+'">';
    medidas_seguranca += '          </div>';

    medidas_seguranca += '          <div class="form-group col-1">&nbsp;</div>';

    medidas_seguranca += '          <div class="form-group col-3 pb-3 text-center border border-primary rounded">';
    medidas_seguranca += '              <label class="form-label">Foto</label>';
    medidas_seguranca += '              <div class="pb-2 font-size-12" id="botaoVerFoto_' + pavimento + '_' + seguranca_medida_id + '">'+botaoVerFoto+'</div>';
    medidas_seguranca += '              <div class="row" '+botaoVerFotoStyle+'>';
    medidas_seguranca += '                  <div class="col-12">';
    medidas_seguranca += '                      <button type="button" class="btn btn-outline-primary text-center font-size-16" data-bs-toggle="modal" data-bs-target=".modal-camera-traseira" data-bs-placement="top" onclick="$(\'#fotoTraseiraPavimento\').val('+pavimento+'); $(\'#fotoTraseiraSegurancaMedidaId\').val('+seguranca_medida_id+'); startCameraTraseira(); layoutTirarExcluirFotoTraseira(1);"><i class="far fa-image"></i></button>';
    medidas_seguranca += '                  </div>';
    medidas_seguranca += '              </div>';
    medidas_seguranca += '              <input type="hidden" class="inputsFoto" id="foto_' + pavimento + '_' + seguranca_medida_id + '" name="foto_' + pavimento + '_' + seguranca_medida_id + '" value="' + foto + '" data-pavimento="'+pavimento+'" data-seguranca_medida_id="'+seguranca_medida_id+'" data-seguranca_medida_nome="'+seguranca_medida_nome+'">';
    medidas_seguranca += '          </div>';

    medidas_seguranca += '      </div>';
    medidas_seguranca += '  </div>';
    medidas_seguranca += '</div>';

    return medidas_seguranca;
}

//Função para alterar os campos status e textoStatus
function formularioRondaCampoStatus(id, pavimento, seguranca_medida_id) {
    if (id == 0) {
        textoStatus = '<i class="far fa-calendar-minus"></i>'+' NÃO ENCONTRADO';
        textoCor = 'text-warning';
    }

    if (id == 1) {
        textoStatus = '<i class="far fa-calendar-check"></i>'+' CONFERIDO';
        textoCor = 'text-success';
    }

    if (id == 2) {
        textoStatus = '<i class="far fa-calendar-times"></i>'+' DANIFICADO';
        textoCor = 'text-danger';
    }

    $('#textoStatus_' + pavimento + '_' + seguranca_medida_id).html(textoStatus);
    $('#textoStatus_' + pavimento + '_' + seguranca_medida_id).removeClass('text-warning').removeClass('text-success').removeClass('text-danger').addClass(textoCor);
    $('#status_' + pavimento + '_' + seguranca_medida_id).val(id);
}

//Função para colocar botao ver foto
function formularioRondaBotaoVerFoto(pavimento, seguranca_medida_id) {
    var botao = '<button type="button" class="btn btn-sm btn-primary text-center font-size-12 pt-0 pb-0" data-bs-toggle="modal" data-bs-target=".modal-camera-traseira" data-bs-placement="top" onclick="$(\'#fotoTraseiraPavimento\').val('+pavimento+'); $(\'#fotoTraseiraSegurancaMedidaId\').val('+seguranca_medida_id+'); layoutTirarExcluirFotoTraseira(2); $(\'#photoTraseira\').attr(\'src\', $(\'#foto_'+pavimento+'_'+seguranca_medida_id+'\').val());">Ver</button>';

    $('#botaoVerFoto_'+pavimento+'_'+seguranca_medida_id).html(botao);
}

//Função para validar campos antes de salvar Formulário Ronda
function formularioRondaValidar() {
    var error = false;
    var message = 0;
    var status = '';

    //Varrer campos status para saber se foram todos escolhidos
    $('.inputsStatus').each(function () {
        status = $(this).val();

        if (status == '') {
            error = true;
            message = "Medidas de Segurança - Pavimento "+$(this).data('pavimento')+": "+$(this).data('seguranca_medida_nome')+" - Escolha o Status.";
        } else if (status == 0) { //NÃO ENCONTRADO
            if ($('#foto_'+$(this).data('pavimento')+"_"+$(this).data('seguranca_medida_id')).val() == '') {
                error = true;
                message = "Medidas de Segurança - Pavimento "+$(this).data('pavimento')+": "+$(this).data('seguranca_medida_nome')+" - Tire foto do local.";
            }
        } else if (status == 1) { //CONFERIDO
        } else if (status == 2) { //DANIFICADO
            if ($('#foto_'+$(this).data('pavimento')+"_"+$(this).data('seguranca_medida_id')).val() == '') {
                error = true;
                message = "Medidas de Segurança - Pavimento "+$(this).data('pavimento')+": "+$(this).data('seguranca_medida_nome')+" - Tire foto do local.";
            }
        } else {}
    });

    if (error) {
        alert(message);
        return false;
    }

    return true;
}

//Brigadas Incêndios - Rondas - FIM''''''''''''''''''''''
//Brigadas Incêndios - Rondas - FIM''''''''''''''''''''''

//Funções para o Submódulo Brigadas Incêndios - FIM'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para o Submódulo Brigadas Incêndios - FIM'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Funções para o QRCode Brigada Escalas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para o QRCode Brigada Escalas - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Função para montar layout para Tirar/Excluir Foto
function layoutTirarExcluirFotoFrontal(op) {
    //Layout para Tirar Foto
    if (op == 1) {
        //Hide / Show
        $('#btnTirarFotoFrontal').show();
        $('#btnExcluirFotoFrontal').hide();

        $('#videoFrontal').show();
        $('#canvasFrontal').show();
        $('#photoFrontal').hide();
    }

    //Layout para Excluir Foto
    if (op == 2) {
        //Hide / Show
        $('#btnTirarFotoFrontal').hide();
        $('#btnExcluirFotoFrontal').show();

        $('#videoFrontal').hide();
        $('#canvasFrontal').hide();
        $('#photoFrontal').show();
    }
}

//Função para montar layout para Tirar/Excluir Foto
function layoutTirarExcluirFotoTraseira(op) {
    //Layout para Tirar Foto
    if (op == 1) {
        //Hide / Show
        $('#btnTirarFotoTraseira').show();
        $('#btnExcluirFotoTraseira').hide();

        $('#videoTraseira').show();
        $('#canvasTraseira').show();
        $('#photoTraseira').hide();
    }

    //Layout para Excluir Foto
    if (op == 2) {
        //Hide / Show
        $('#btnTirarFotoTraseira').hide();
        $('#btnExcluirFotoTraseira').show();

        $('#videoTraseira').hide();
        $('#canvasTraseira').hide();
        $('#photoTraseira').show();
    }

    //Fechar modal
    if (op == 3) {
        $('.modal-camera-traseira').modal('hide');
    }
}
//Funções para o QRCode Brigada Escalas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para o QRCode Brigada Escalas - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}

//Funções para Api ViaCep Para rodar em formulario sem REPEATER (Inicio)''''''''''''''''''''''''''''''''''''''''''''''''

/*
* @PARAM op=1 : Entrada 01/02/2003   Saída 2003-02-01
* @PARAM op=2 : Entrada 2003-02-01   Saída 01/02/2003
 */
function formatarData(op, data) {
    if (data === null || data == '' || data === undefined) {return '';}

    if (op == 1) {
        var dia = data.substring(0, 2);
        var mes = data.substring(3, 5);
        var ano = data.substring(6, 10);

        return ano+'-'+mes+'-'+dia;
    }

    if (op == 2) {
        var dia = data.substring(8, 10);
        var mes = data.substring(5, 7);
        var ano = data.substring(0, 4);

        return dia+'/'+mes+'/'+ano;
    }
}

/*
* @PARAM op=1 : Entrada 2135523524   Saída (21) 3552-3524
* @PARAM op=2 : Entrada 21964210128   Saída (21) 96421-0128
 */
function formatarTelCel(op, numero) {
    if (numero === null || numero == '') {return '';}

    numero = numero.replaceAll(' ', '');
    numero = numero.replaceAll('.', '');
    numero = numero.replaceAll('/', '');
    numero = numero.replaceAll('-', '');

    if (op == 1) {
        return '('+numero.substring(0, 2)+') '+numero.substring(2, 6)+'-'+numero.substring(6, 10);
    }

    if (op == 2) {
        return '('+numero.substring(0, 2)+') '+numero.substring(2, 7)+'-'+numero.substring(7, 11);
    }
}

//FORMULARIO COM CAMPOS SIMPLES'''''''''''''''''''''''''''''''''''''''''''''
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('logradouro').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('localidade').value=("");
    document.getElementById('uf').value=("");
    //document.getElementById('ibge').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouro').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('localidade').value=(conteudo.localidade);
        document.getElementById('uf').value=(conteudo.uf);
        //document.getElementById('ibge').value=(conteudo.ibge);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouro').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('localidade').value="...";
            document.getElementById('uf').value="...";
            //document.getElementById('ibge').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//FORMULARIO COM CAMPOS _COBRANCA'''''''''''''''''''''''''''''''''''''''''''
function limpa_formulário_cep_cobranca() {
    //Limpa valores do formulário de cep_cobranca.
    document.getElementById('logradouro_cobranca').value=("");
    document.getElementById('bairro_cobranca').value=("");
    document.getElementById('localidade_cobranca').value=("");
    document.getElementById('uf_cobranca').value=("");
    //document.getElementById('ibge_cobranca').value=("");
}

function meu_callback_cobranca(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouro_cobranca').value=(conteudo.logradouro);
        document.getElementById('bairro_cobranca').value=(conteudo.bairro);
        document.getElementById('localidade_cobranca').value=(conteudo.localidade);
        document.getElementById('uf_cobranca').value=(conteudo.uf);
        //document.getElementById('ibge_cobranca').value=(conteudo.ibge);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep_cobranca();
        alert("CEP não encontrado.");
    }
}

function pesquisacep_cobranca(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouro_cobranca').value="...";
            document.getElementById('bairro_cobranca').value="...";
            document.getElementById('localidade_cobranca').value="...";
            document.getElementById('uf_cobranca').value="...";
            //document.getElementById('ibge_cobranca').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback_cobranca';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep_cobranca();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep_cobranca();
    }
};
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para Api ViaCep Para rodar em formulario sem REPEATER (Fim)'''''''''''''''''''''''''''''''''''''''''''''''''''

//Funções para Api ViaCep Para rodar em formulario com REPEATER (Inicio)'''''''''''''''''''''''''''''''''''''''''''''''''
function limpa_formulário_cep_repeater() {
    //Limpa valores do formulário de cep.
    $("input[type=text][name='endereco["+$('#ctrl_endereco_indice').val()+"][a_endereco]']").val('');
}

function meu_callback_repeater(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        $("input[type=text][name='endereco["+$('#ctrl_endereco_indice').val()+"][a_endereco]']")
            .val(conteudo.logradouro+', '+
                $("input[type=text][name='endereco["+$('#ctrl_endereco_indice').val()+"][a_numero]']").val()+' - '+
                $("input[type=text][name='endereco["+$('#ctrl_endereco_indice').val()+"][a_complemento]']").val()+' - '+
                conteudo.bairro+' - '+
                conteudo.localidade+' - '+
                conteudo.uf);
    } else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep_repeater(indice) {
    //retornar o indice do campo
    $('#ctrl_endereco_indice').val(indice);

    //Valor do campo CEP
    var valorCampoCep = $("input[type=text][name='endereco["+indice+"][a_cep]']").val();

    //Nova variável "cep" somente com dígitos.
    var cep = valorCampoCep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            $("input[type=text][name='endereco["+indice+"][a_endereco]']").val('...');

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};
//Funções para Api ViaCep Para rodar em formulario com REPEATER (Fim)'''''''''''''''''''''''''''''''''''''''''''''''''''
