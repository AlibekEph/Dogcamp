<?php 
include_once($_SERVER['DOCUMENT_ROOT'] . "/functions.php");

$sql = "SELECT o.id FROM orders as o WHERE o.notification_date = '".date('Y-m-d')."'";
$sql = $db->query($sql);
$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
$notif = new Notifications();
foreach ($sql as $id) {
	$notif->send_notif_payment($id['id']);
}
$sql = "SELECT o.id FROM orders as o WHERE o.payment_date = '".date('Y-m-d')."' AND o.status = 3";
$sql = $db->query($sql);
$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
foreach ($sql as $id) {
	$notif->send_close_payment_date($id['id']);
	$sql = "UPDATE orders SET status = '5' WHERE id = '".$id['id']."'";
	$db->query($sql);
}
?>