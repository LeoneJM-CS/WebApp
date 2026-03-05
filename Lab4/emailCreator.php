<?php
$firstName = $_POST['first-name'];
$lastName = $_POST['last-name'];
$DOB = $_POST['DOB'];
$dept = $_POST['dept'];

function Email($firstName, $lastName, $DOB, $dept) 
{
    $subFirst = substr(strtolower($firstName), 0, 4);
    $subLast  = substr(strtolower($lastName), 0, 4);
    $dept = strtolower($dept);
    $dateParts = explode("-", $DOB);
    $year = substr($dateParts[0], -2);
    $email = $dept . "_" . $subFirst . $subLast . $year . "@" . "jbu" . ".edu";
    return $email;
}

$emailaddress = Email($firstName, $lastName, $DOB, $dept);
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Generator</title>
        <style>
            @import url("PhpStylesheet.css");
        </style>
    </head>
    <body>
        <div class="card">
            <h2>Your Email</h2>
            <div class="field">
                <label>Address:</label>
                <span><?php echo htmlspecialchars($emailaddress); ?></span>
            </div>
            <!-- <div class="field">
                <label>Date of Birth:</label>
                <span><?php echo htmlspecialchars($DOB); ?></span>
            </div>
            <div class="field">
                <label>Department:</label>
                <span><?php echo htmlspecialchars($dept); ?></span>
            </div>
            <div class="field">
                <label>Email Address:</label>
                <span><?php echo htmlspecialchars($emailaddress); ?></span>
            </div> -->
            <a href="Lab4.html" class="back-btn">Go Back</a>
        </div>
    </body>
</html>
