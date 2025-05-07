<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
include("bdd.php");
include("function.php");

if (empty($_GET)) {     //connexion sans paramètre
    header("Content-Type: text/html; charset=UTF-8");
    echo "page d'accueil";
    print_r($_GET);
}
elseif ($_GET['mode']=="élève") {
    $donnees = recupNoteEleve($_GET['url']);
    envoiJSON($donnees);
}
else {
    $donnees = recupNoteProf($_GET['url']);
    envoiJSON($donnees);
}

?>