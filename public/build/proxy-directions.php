<?php

//Usado para Gerar o Mapa de Rota com o Google no Submódulo Ordens de Serviços

session_start();

$origem = $_GET['origem'];
$destino = $_GET['destino'];

$apiKey = $_SESSION['api_google_key'];

$url = "https://maps.googleapis.com/maps/api/directions/json?origin=$origem&destination=$destino&key=$apiKey&language=pt&mode=driving";

$response = file_get_contents($url);
header("Content-Type: application/json");
echo $response;
