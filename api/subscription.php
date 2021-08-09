<?php 
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
$db = new Database();
$db->getConnection();

if($_GET['move'] == '1'){
	echo json_encode(get_subscription());
}
?>