<?php
$lat1 = $_GET['lat1'];
$lon1 = $_GET['lon1'];
$lat2 = $_GET['lat2'];
$lon2 = $_GET['lon2'];

$apiKey = 'AIzaSyARmoDmjUAPxUg4J5Ztuq1ceSqZK6i3WbM';

// Obter rota da Directions API
$directionsUrl = "https://maps.googleapis.com/maps/api/directions/json?origin={$lat1},{$lon1}&destination={$lat2},{$lon2}&key={$apiKey}&language=pt&mode=driving";
$directionsResponse = file_get_contents($directionsUrl);
$directionsData = json_decode($directionsResponse, true);

// Verificar se a rota foi encontrada
if (!isset($directionsData['routes'][0]['overview_polyline']['points'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Rota não encontrada']);
    exit;
}

// Obter o polyline
$polyline = $directionsData['routes'][0]['overview_polyline']['points'];

// Montar imagem com rota real
$mapUrl = "https://maps.googleapis.com/maps/api/staticmap?size=800x600&path=enc:" . urlencode($polyline) .
    "&key={$apiKey}&language=pt&markers=color:green|{$lat1},{$lon1}&markers=color:red|{$lat2},{$lon2}&zoom=13";

// Baixar imagem
$imageData = file_get_contents($mapUrl);

if ($imageData) {
    $base64 = 'data:image/png;base64,' . base64_encode($imageData);
    echo json_encode(['status' => 'ok', 'base64' => $base64]);
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao gerar imagem']);
}
