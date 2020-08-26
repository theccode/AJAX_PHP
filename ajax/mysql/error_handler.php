<?php
 set_error_handler('error_handler', E_ALL);

// header('Content-Type: text/plain');

 function error_handler($errNo, $errStr,$errFile,  $errLine){
     if (ob_get_length()) ob_clean();

     $error_message = chr(10) . 'ERRNO: ' . $errNo . chr(10)
         . 'MSG: ' . $errStr . chr(10)
         . 'LOC: ' . $errFile . ' on line ' . $errLine;

     echo $error_message;
     exit;
 }