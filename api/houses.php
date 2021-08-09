<?php 
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
$classes = explode('|', $_GET['class']);
$class_sql = '';
foreach ($classes as $class) {
	$class_sql .= "`class` = '".$class."' OR";
}
$class_sql = substr($class_sql, 0, -2);
$camps = explode('|', $_GET['camp']);
$camp_sql = '';
foreach ($camps as $camp) {
	$camp_sql .= "`kamp` = '".$camp."' OR ";
}
$camp_sql = substr($camp_sql, 0, -3);
$camp_sql = '('.$camp_sql.')';
if($camps == array('')){
$camp_sql = '1';
}
$class_sql = '('.$class_sql.')';
if($classes == array('')){
$class_sql = '1';
}
$sql = "SELECT id FROM houses as h WHERE ".$class_sql." AND ".$camp_sql. " AND (SELECT COUNT(*) from house_to_orders as o where o.house_id = h.id AND CHECK_DATE('".$_GET['date_from']."','".$_GET['date_to']."', o.from_order, o.to_order)) = 0";
$db = new Database();
$db->getConnection();
$res = $db->query($sql);
$res = mysqli_fetch_all($res, MYSQLI_BOTH);
$result = array();
foreach ($res as $id) {
	array_push($result, new House($id['id'], true));
}
echo json_encode($result);
?>