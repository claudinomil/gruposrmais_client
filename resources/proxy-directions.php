<?php

//Usado para Gerar o Mapa de Rota com o Google no Submódulo Ordens de Serviços

$origem = $_GET['origem'];
$destino = $_GET['destino'];
$apiKey = 'AIzaSyARmoDmjUAPxUg4J5Ztuq1ceSqZK6i3WbM';

$url = "https://maps.googleapis.com/maps/api/directions/json?origin=$origem&destination=$destino&key=$apiKey&language=pt&mode=driving";

$response = file_get_contents($url);
header("Content-Type: application/json");
echo $response;
