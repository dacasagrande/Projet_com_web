<?php

$host = 'zzz.bordeaux-inp.fr'; //variables de connexion
$dbname = 'pronote';
$username = 'dcasagrande';
$password = '0gigi*ko8DA';
try {
$bdd = new PDO('mysql:host='. $host .';dbname='. $dbname .';charset=utf8',
$username, $password);
} catch(Exception $e) {
// Si erreur, tout arrêter
die('Erreur : '. $e->getMessage());
} 

?>
