<?php
header('Content-Type: text/json');
//$dom = new DOMDocument();
//$response = $dom->createElement('response');
//$dom->appendChild($response);
//
//$books = $dom->createElement('books');
////book
//$book = $dom->createElement('book');
//$title = $dom->createElement('title');
//$titleText = $dom->createTextNode('Ajax and PHP: Building Modern Web Applications, 2nd Ed.');
//
//$isbn = $dom->createElement('isbn');
//$isbnText = $dom->createTextNode('978-1904817726');
//
//$title->appendChild($titleText);
//$book->appendChild($title);
//
//$isbn->appendChild($isbnText);
//$book->appendChild($isbn);
//
//$books->appendChild($book);
//$response->appendChild($books);
////xmlString
//
//$xmlString = $dom->saveXML();
//
//echo $xmlString;
$jsonData = array(
    'books' => array(
        'title' => 'Ajax and PHP: Building Modern Web Applications, 2nd Ed.',
        'isbn' => '978-1904817726'
    )
);
echo json_encode($jsonData);