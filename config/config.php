<?php 
define('DOMAIN', 'dogcamp.local');
define('PROTOCOL', 'http');
define('DB_ADRESS', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB','kamping');

$db = mysqli_connect(DB_ADRESS, DB_USER, DB_PASSWORD, DB);

mysqli_query($db, "SET NAMES 'utf8';");
mysqli_query($db, "SET CHARACTER SET 'utf8';");
mysqli_query($db, "SET SESSION collation_connection = 'utf8_general_ci';");

if(!$db) {
  die("Connection failed: " . mysqli_connect_error());
}

?>