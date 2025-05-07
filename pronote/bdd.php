<?php

$host = 'localhost'; //variables de connexion
$dbname = 'pronote';
$username = 'root';
$password = '';
try {
$bdd = new PDO('mysql:host='. $host .';dbname='. $dbname .';charset=utf8',
$username, $password);
} catch(Exception $e) {
// Si erreur, tout arrêter
die('Erreur : '. $e->getMessage());
} 

?>