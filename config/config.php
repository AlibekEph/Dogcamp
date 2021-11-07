<?php 
define('DOMAIN', 'dogcamp.local');
define('PROTOCOL', 'http');
define('DB_ADRESS', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB','kamping');
define('EMAIL_HOST','mail.hosting.reg.ru');
define('EMAIL_ADRESS','info@dogcamping.ru');
define('EMAIL_PASSWORD','4U1m2Y1o');
define('TELEGRAM_TOKEN', '2053126329:AAHPzbcM6JuVAnai_P4d4sqYG0RH7NX1JJY');

$db = mysqli_connect(DB_ADRESS, DB_USER, DB_PASSWORD, DB);

mysqli_query($db, "SET NAMES 'utf8';");
mysqli_query($db, "SET CHARACTER SET 'utf8';");
mysqli_query($db, "SET SESSION collation_connection = 'utf8_general_ci';");

if(!$db) {
  die("Connection failed: " . mysqli_connect_error());
}

?>