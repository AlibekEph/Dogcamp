<?php 
session_start();
include($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");
include($_SERVER['DOCUMENT_ROOT'] . "/objects/house.php");

$db = new Database();
$link = $db->getConnection();
function get_camps(){
	global $db;
	$res = $db->query('SELECT * FROM camps');
	$res = mysqli_fetch_all($res, MYSQLI_BOTH);
	return $res;
}
function get_classes(){
	global $db;
	$res = $db->query('SELECT * FROM classes');
	$res = mysqli_fetch_all($res, MYSQLI_BOTH);
	return $res;
}

function get_houses(){
global $db;
$res = $db->query("SELECT * FROM houses");
$res = mysqli_fetch_all($res, MYSQLI_BOTH);
$houses = array();
foreach ($res as $house) {
	array_push($houses, new House($house['id'], true));
}
return $houses;
}

function del_house($id){
	global $db;
	$db->query("DELETE FROM houses WHERE id = '".$id."'");
}

function proove_auth($re=true){
	global $db;
	$sql = "SELECT * FROM `admin` WHERE password = '".$_SESSION['admin_password']."' AND login = '".$_SESSION['admin_login']."' ";
	$prove = $db->query($sql);
	$post = mysqli_fetch_assoc($prove);
	$protocol = stripos($_SERVER['SERVER_PROTOCOL'],'https') === true ? 'https://' : 'http://';
	if (!isset($post)){
		if($re){
		header('Location:'.$protocol.$_SERVER['HTTP_HOST'].'/index.php');
		}else{
			return false;
		}
	}
	return true;
}

function get_trainers(){
	global $db;
	$sql = "SELECT * FROM trainer ORDER BY id DESC";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
	return $sql;
}

function get_subscription(){
	global $db;
	$sql = "SELECT s.id as id, s.title as title, s.service_type as service_type, s.time_type as time_type, s.count as count, s.sale as sale, t.title as service_title FROM subscription as s INNER JOIN service_type as t ON t.id = s.service_type ORDER BY id DESC";
	$sql = $db->query($sql);
	return mysqli_fetch_all($sql, MYSQLI_BOTH);
}

function time_type_to_srt($time_type){
	if($time_type == '1'){
		return '(на день)';
	}
	if($time_type == '0'){
		return "(на час)";
	}
	return '';
}

function del_subscription($id){
	global $db;
	$sql = "DELETE FROM subscription WHERE id = '".$id."'";
	$db->query($sql);
}

function get_orders(){
	global $db;
	$sql = "SELECT o.id as id, o.coast as coast, o.persons_count as person_count, o.date as date, c.name as name, c.surname as surname, c.email as email, c.phone as phone, c.is_wholesaler as is_wholesaler FROM `orders` as o INNER JOIN clients as c ON c.id = o.client_id ORDER BY o.`date` DESC";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
	return $sql;
}

function del_order($id){
	global $db;
	$sql = "DELETE FROM orders WHERE id = '".$id."'";
	$db->query($sql);
}

function get_items_to_order($id){
global $db;
$result = array();
$sql = "SELECT o.id as id, o.from_order as from_order, o.to_order as to_order,o.sale as sale, o.house_id as house_id, h.name as house_title, o.coast as coast FROM house_to_orders as o INNER JOIN houses as h ON h.id = o.house_id WHERE order_id = '".$id."'";
$sql = $db->query($sql);
$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
foreach ($sql as $house) {
	$type = 'Аренда дома';
	$title = $house['house_title'];
	$date_start = $house['from_order'];
	$date_end = $house['to_order'];
	$coast = $house['coast'];
	$sale = (Int)$house['sale'];
	array_push($result, array('type'=> $type, 'title' => $title, 'date_start' => $date_start, 'date_end' => $date_end, 'coast' => $coast, 'sale' => $sale));
}

$services = "SELECT o.id as id, o.date_from as date_from, o.date_to as date_to, o.coast as coast, o.trainer as trainer, s.title as service_title, st.title as st_title FROM `services_to_order` as o INNER JOIN services as s ON o.service_id = s.id INNER JOIN service_type as st ON st.id = s.type WHERE o.order_id = '".$id."'";
$services = $db->query($services);
$services = mysqli_fetch_all($services, MYSQLI_BOTH);
foreach ($services as $service) {
$type = $service['st_title'];
if($service['trainer'] != 'NULL'){
	$type .= " с тренером";
}
$title = $service['service_title'];
$date_start = $service['date_from'];
$date_end = $service['date_to'];
$coast = $service['coast'];
$sale = '0';
	array_push($result, array('type'=> $type, 'title' => $title, 'date_start' => $date_start, 'date_end' => $date_end, 'coast' => $coast, 'sale' => $sale));
}
return $result;
}

function get_house_desc($id){
	global $db;
	$sql = "SELECT h.id as id, h.from_order as from_date, h.to_order as to_date, c.name as name, c.surname as surname, c.is_wholesaler as is_wholesaler, o.id as order_id FROM house_to_orders as h INNER JOIN orders as o ON h.order_id = o.id  INNER JOIN clients as c ON c.id = o.client_id WHERE h.house_id ORDER BY h.from_order DESC";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
	return $sql;
}

function get_services(){
	global $db;
	$sql = "SELECT s.id as id, s.title as title, t.title as type_title FROM services as s INNER JOIN service_type as t ON t.id = s.type WHERE t.id != '4' ORDER BY s.id DESC";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
	$res = array();
	foreach ($sql as $ser) {
		$id = $ser['id'];
		$type = $ser['type_title'];
		$title = $ser['title'];
		array_push($res, array('id' => $id, 'type' => $type, 'title' => $title));
	}
	return $res;
}

function get_orders_to_service($id){
	global $db;
	$sql = "SELECT o.id as id, s.title as title, o.date_from as date_from, o.date_to as date_to, o.order_id as order_id, o.trainer as trainer_id, t.fio as fio FROM services_to_order as o INNER JOIN services as s ON o.service_id = s.id LEFT JOIN trainer as t ON t.id = o.trainer WHERE s.id = '".$id."'";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
	return $sql;

}

?>