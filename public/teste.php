<?php


$apiKey = "AIzaSyCySX2x8e-TEfua6M1gZG1vNGIYng1av4g"; // 🔁 Substitua aqui

$origem = "Rua Medina, 309, Rio de Janeiro";
$destino = "Maracanã, Rio de Janeiro";
$pontoExtra = "Cristo Redentor, Rio de Janeiro";

// 1. Buscar rota com Directions API
$directionsUrl = "https://maps.googleapis.com/maps/api/directions/json?"
    . "origin=" . urlencode($origem)
    . "&destination=" . urlencode($destino)
    . "&mode=driving"
    . "&key=" . $apiKey;

$response = file_get_contents($directionsUrl);
$data = json_decode($response, true);

if ($data['status'] !== 'OK') {
    die("Erro ao obter rota: " . $data['status']);
}

// 2. Extrair a polyline
$polyline = $data['routes'][0]['overview_polyline']['points'];



$iconOrigem = "https://sistema.gruposrmais.com.br/build/assets/images/icones/mapas/museu_do_amanha.png";
$iconDestino = "https://sistema.gruposrmais.com.br/build/assets/images/icones/mapas/corpo_de_bombeiros.png";
$iconPontoExtra = "https://sistema.gruposrmais.com.br/build/assets/images/icones/mapas/cinema.png";



// 3. Criar URL da Static Maps API com rota e marcadores
$staticMapUrl = "https://maps.googleapis.com/maps/api/staticmap?"
    . "size=800x600"
    . "&path=enc:" . urlencode($polyline)
    . "&markers=icon:" . urlencode($iconOrigem) . "|" . urlencode($origem)
    . "&markers=icon:" . urlencode($iconDestino) . "|" . urlencode($destino)
    . "&markers=icon:" . urlencode($iconPontoExtra) . "|" . urlencode($pontoExtra)
    . "&key=" . $apiKey;



//$staticMapUrl = "https://maps.googleapis.com/maps/api/staticmap?"
//    . "size=800x600"
//    . "&path=enc:" . urlencode($polyline)
//    . "&markers=color:green|label:A|" . urlencode($origem)
//    . "&markers=color:red|label:B|" . urlencode($destino)
//    . "&markers=color:blue|label:C|" . urlencode($pontoExtra)
//    . "&key=" . $apiKey;





// 4. Baixar e salvar imagem
$image = file_get_contents($staticMapUrl);
file_put_contents("mapa_rota.png", $image);

echo "✅ Imagem gerada: mapa_rota.png";
