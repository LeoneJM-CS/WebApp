<?php
    $teams = ["Barcelona", "Real Madrid", "Atletico Madrid", "Sevilla"];
    echo "Teams in the array: ";
    foreach ($teams as $team) {
        echo $team . ", \n";
    }
    echo "\n";
    sort($teams);
    echo "Teams in sorted order: ";
    foreach ($teams as $team) {
        echo $team . ", \n";
    }
    // print_r($teams);
    rsort($teams);
    echo "Teams in reverse sorted order: ";
    foreach ($teams as $team) {
        echo $team . ", \n";
    }
?>
