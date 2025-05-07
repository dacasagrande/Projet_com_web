<?php

function recupNoteEleve($nomEleve) {
    global $bdd;
    $requete = 'SELECT `valeur`,`matiere`,`nomProf` FROM `notes` JOIN eleve ON eleve.idEleve=notes.idEleve JOIN prof ON prof.idProf=notes.idProf WHERE eleve.nomEleve = ?;';
    $response = $bdd->prepare($requete);
    $response->execute([$nomEleve]);
    $ligne = $response->fetchAll(); 
    return $ligne;
}

function recupNoteProf($nomProf) {
    global $bdd;
    $requete = 'SELECT `valeur`,`nom`,`nomEleve`, `numGroupe` FROM `notes` JOIN eleve ON eleve.idEleve=notes.idEleve JOIN prof ON prof.idProf=notes.idProf JOIN classe ON classe.idClasse=eleve.idClasse WHERE nomProf = ?;
';
    $response = $bdd->prepare($requete);
    $response->execute([$nomProf]);
    $ligne = $response->fetchAll(); 
    return $ligne;
}


function envoiJSON($tab){
    header('Content-Type: application/json');
    //print_r($tab);
    $json = json_encode($tab, JSON_UNESCAPED_UNICODE);
    echo $json;
}

function ajouterNote()
{
    echo $_POST[];
}

?>