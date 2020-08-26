<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PHP & MySQL</title>
</head>
<body>
    <?php
        require_once ('config.php');
        require_once ('error_handler.php');

        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        $query = 'SELECT `user_id`, `user_name` FROM `users`';

        $result = $conn->query($query);
        while($row = $result->fetch_array(MYSQLI_ASSOC)){
            $user_id = $row['user_id'];
            $user_name = $row['user_name'];

            echo 'Name of user#' . $user_id .' is '.$user_name . '<br/>';
        }

        $result->close();
        $conn->close();
    ?>
</body>
</html>
