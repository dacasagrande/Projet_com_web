<?php
    include("bdd.php");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    $donnees_json = file_get_contents('php://input');
    $donnees = json_decode($donnees_json, true);
    //print_r($donnees);
    //echo $donnees['eleve'];
    //echo $donnees['note'];
    global $bdd;
    $req = $bdd->prepare('INSERT INTO `notes` (`valeur`, `idEleve`, `idProf`) VALUES (?, ?, ?);');
    $req->execute([$donnees["note"],$donnees["eleve"],"fplacin"]);
?>