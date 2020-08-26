<?php
//enable php session
session_start();
//Build HTML <option> tags
function buildOptions($options, $selectOption){
    foreach($options as $value => $text){
        if ($value === $selectOption){
            echo '<option value="'. $value .'" selected="selected">' . $text . '<option/>';
        } else {
            echo '<option value="'. $value .'">' . $text . '<option/>';
        }
    }
}

$genderOptions = array(
    '0'=>'[SELECT]',
    '1'=>'Male',
    '2'=>'Female'
);

$monthOptions = array(
  '0' => '[SELECT]',
  '1' => 'January',
  '2' => 'February',
  '3' => 'March',
  '4' => 'April',
  '5' => 'May',
  '6' => 'June',
  '7' => 'July',
  '8' => 'August',
  '9' => 'September',
  '10' => 'October',
  '11' => 'November',
  '12' => 'December'
);

if (!isset($_SESSION['values'])){
    $_SESSION['values']['txtUsername'] = '';
    $_SESSION['values']['txtName'] = '';
    $_SESSION['values']['selGender'] = '';
    $_SESSION['values']['selBthMonth'] = '';
    $_SESSION['values']['txtBthDay'] = '';
    $_SESSION['values']['txtBthYear'] = '';
    $_SESSION['values']['txtEmail'] = '';
    $_SESSION['values']['txtPhone'] = '';
    $_SESSION['values']['chkReadTerms'] = '';
}
if (!isset($_SESSION['errors'])){
    $_SESSION['errors']['txtUsername'] = 'hidden';
    $_SESSION['errors']['txtName'] = 'hidden';
    $_SESSION['errors']['selGender'] = 'hidden';
    $_SESSION['errors']['selBthMonth'] = 'hidden';
    $_SESSION['errors']['txtBthDay'] = 'hidden';
    $_SESSION['errors']['txtBthYear'] = '';
    $_SESSION['errors']['txtEmail'] = 'hidden';
    $_SESSION['errors']['txtPhone'] = 'hidden';
    $_SESSION['errors']['chkReadTerms'] = 'hidden';
}

