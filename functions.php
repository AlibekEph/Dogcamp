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
	$sql = "SELECT * FROM subscription ORDER BY id DESC";
	$sql = $db->query($sql);
	return mysqli_fetch_all($sql, MYSQLI_BOTH);
}

function get_orders(){
	global $db;
	
}

?>