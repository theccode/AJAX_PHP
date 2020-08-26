<?php
set_error_handler('error_handler',E_ALL);

function error_handler($errNo, $errStr, $errFile, $errLine){
    if (ob_get_length()) ob_clean();

    header('Content-Type: text/plain');

    $error_message = chr(10) . 'ERRNO: ' . $errNo . chr(10) .
        'TEXT: ' . $errStr . chr(10) .
        'LOCATION: ' . $errFile .
        'on line ' . $errLine;

    echo $error_message;

    exit;
}