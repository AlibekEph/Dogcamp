<?php 
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
$db = new Database();
$db->getConnection();
if($_GET['move'] == '1'){
	$sql = "SELECT o.status as status FROM orders as o WHERE o.id = '".$_GET['id']."'";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH)[0];
	$sql2 = "SELECT * FROM orders_statuses";
	$sql2 = $db->query($sql2);
	$sql2 = mysqli_fetch_all($sql2, MYSQLI_BOTH); 
	$res =  array('need' => $sql, 'all' => $sql2);
	echo json_encode($res);
}


?>