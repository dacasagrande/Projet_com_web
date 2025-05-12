<?php

function recupNoteEleve($idEleve, $mdpEleve) {
    global $bdd;
    $requete = 'SELECT `valeur`,`matiere`,`nomProf` FROM `notes` JOIN eleve ON eleve.idEleve=notes.idEleve JOIN prof ON prof.idProf=notes.idProf WHERE eleve.idEleve = ? AND eleve.mdp= ? ;';
    $response = $bdd->prepare($requete);
    $response->execute([$idEleve, $mdpEleve]);
    $ligne = $response->fetchAll(); 
    return $ligne;
}

function recupNoteProf($idProf,$mdpProf) {
    global $bdd;
    $requete = 'SELECT `valeur`,`nom`,`nomEleve`, `numGroupe` FROM `notes` JOIN eleve ON eleve.idEleve=notes.idEleve JOIN prof ON prof.idProf=notes.idProf JOIN classe ON classe.idClasse=eleve.idClasse WHERE prof.idProf = ? AND prof.mdp= ? ;';
    $response = $bdd->prepare($requete);
    $response->execute([$idProf, $mdpProf]);
    $ligne = $response->fetchAll(); 
    return $ligne;
}


function envoiJSON($tab){
    header('Content-Type: application/json');
    //print_r($tab);
    $json = json_encode($tab, JSON_UNESCAPED_UNICODE);
    echo $json;
}

?>