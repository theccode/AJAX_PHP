<?php
    require_once ('index_top.php');
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ajax Form</title>
    <link rel="stylesheet" href="validate.css">
</head>
<body onload="setFocus()">
    <fieldset>
        <legend class="txtFormLegend">
            New User Registration Form
        </legend>
        <form name="frmRegistration" action="validate.php" method="post">
            <input type="hidden" name="validationType" value="php">
<!--            username-->
            <label for="txtUsername">Desired Username:</label>
            <input type="text" name="txtUsername" id="txtUsername" onblur="validate(this.value, this.id)" value="<?=$_SESSION['values']['txtUsername']?>">
            <span id="txtUsernameFailed" class="<?=$_SESSION['errors']['txtUsername']?>">This username is in use or username empty field.</span>
            <br/>
<!--            Name-->
            <label for="txtName">Your name:</label>
            <input type="text" name="txtName" id="txtName" onblur="validate(this.value, this.id)" value="<?=$_SESSION['values']['txtName']?>">
            <span id="txtNameFailed" class="<?=$_SESSION['errors']['txtName']?>">Please enter your name.</span>
            <br />
<!--            Gender-->
            <label for="selGender">Gender: </label>
            <select name="selGender" id="selGender" onblur="validate(this.value, this.id)">
                <?php buildOptions($genderOptions, $_SESSION['values']['selGender']);?>
            </select><!--            Gender-->
                <span id="selGenderFailed" class="<?=$_SESSION['errors']['selGender']?>">
                    Please select a gender
                </span>
                <br/>
           <!-- Birthday-->
            <label for="txtBthDay">Your Birthday:</label>

            <select name="selBthMonth" id="selBthMonth" onblur="validate(this.value, this.id)">
                <?php buildOptions($monthOptions, $_SESSION['values']['selBthMonth']);?>
            </select>
               &nbsp;-&nbsp;
<!--            Day-->

            <input type="text" name="txtBthDay" id="txtBthDay" onblur="validate(this.value, this.id)" value="<?=$_SESSION['values']['txtBthDay']?>" maxlength="2" size="2">
            &nbsp;-&nbsp;
<!--            Year-->
            <input type="text" name="txtBthYear" id="txtBthYear" onblur="validate(document.getElementById('selBthMonth').options[document.getElementById('selBthMonth').selectedIndex].value + '#' + document.getElementById('txtBthDay').value + '#' +this.value, this.id)" value="<?=$_SESSION['values']['txtBthYear']?>" maxlength="4" size="2">
<!--            Month, Day, Year validation-->
            <span id="selBthMonthFailed" class="<?=$_SESSION['errors']['selBthMonth']?>">
                    Please select your birth month
            </span>
            <span id="txtBthDayFailed" class="<?=$_SESSION['errors']['txtBthDay']?>">
                    Please select a birth day
            </span>
            <span id="txtBthYearFailed" class="<?=$_SESSION['errors']['txtBthYear']?>">
                    Please select a valid date.
            </span>
            <br/>
<!--            Email-->
            <label for="txtEmail">Your email:</label>
            <input type="text" name="txtEmail" id="txtEmail" onblur="validate(this.value, this.id)" value="<?=$_SESSION['values']['txtEmail']?>">
            <span id="txtEmailFailed" class="<?=$_SESSION['errors']['txtEmail']?>">Please enter your email.</span>
            <br/>
            <!--            Phone Number-->
            <label for="txtPhone">Your phone number:</label>
            <input type="text" name="txtPhone" id="txtPhone" onblur="validate(this.value, this.id)" value="<?=$_SESSION['values']['txtPhone']?>">
            <span id="txtPhoneFailed" class="<?=$_SESSION['errors']['txtPhone']?>">Please insert a valid US phone number (xxx-xxx-xxxx).</span>
            <br/>
<!--            Read terms checkbox-->
            <input type="checkbox" name="chkReadTerms" id="chkReadTerms" class="left" onblur="validate(this.checked, this.id)" <?php if ($_SESSION['values']['chkReadTerms'] == 'on') echo 'checked="checked"';?>>
            I've read the Terms of Use.
            <span id="chkReadTermsFailed" class="<?=$_SESSION['errors']['chkReadTerms']?>">
                Please make sure you read the terms of use.
            </span>
            <br/>
<!--            End of form-->
            <span class="txtSmall">Note: All fields are required!</span>
            <br><br>
            <input type="submit" name="submitbutton" value="Register" class="left button">
        </form>
    </fieldset>
    <script src="xhr.js"></script>
    <script src="validate.js"></script>
</body>
</html>