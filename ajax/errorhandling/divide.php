<?php
//Load error handling module
require_once('error_handler.php');
header('Content-Type: text/xml');



$firstNumber = $_GET['firstNumber'];
$secondNumber = $_GET['secondNumber'];

$answer = $firstNumber / $secondNumber;

$dom = new DOMDocument();

$response = $dom->createElement('response');
$dom->appendChild($response);
//$result = $dom->createElement('result');
$resultText = $dom->createTextNode($answer);
//$result->appendChild($resultText);
$response->appendChild($resultText);

$xmlString = $dom->saveXML();

echo $xmlString;