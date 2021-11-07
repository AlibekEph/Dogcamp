<?php 
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
$db = new Database();
$db->getConnection();
if($_GET['type'] == '2'){
	if($_GET['time_type'] == '0'){
		$date_start = $_GET['date_from']." ".$_GET['time_start'].":00:00";
		$date_end = $_GET['date_from']." ".$_GET['time_end'].":00:00";

		$sql = "SELECT * FROM `services` as s  WHERE s.type = '2' AND (SELECT COUNT(*) FROM services_to_order as so INNER JOIN orders as mo ON so.order_id = mo.id where mo.status not in (4,5,6,7) AND (so.date_from < '".$date_end."' AND so.date_to >= '".$date_start."') AND so.service_id = s.id) = 0 ";
		$sql = $db->query($sql);
		$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
		echo json_encode($sql);
	}
	elseif ($_GET['time_type'] == '1') {
		$date_start = $_GET['date_from']." 00:00:00";
		$date_end =  date("Y-m-d", strtotime("+7 days", strtotime($date_start)))." 00:00:00";
		$sql = "SELECT * FROM `services` as s WHERE s.type = '2' AND (SELECT COUNT(*) FROM services_to_order as so INNER JOIN orders as mo ON so.order_id = mo.id where mo.status not in (4,5,6,7) AND (so.date_from < '".$date_end."' AND so.date_to >= '".$date_start."') AND so.service_id = s.id) = 0";
		$sql = $db->query($sql);
		$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
		echo json_encode($sql);

	}
	elseif ($_GET['time_type'] == '2'){
		$date_start = $_GET['date_from']." 00:00:00";
		$date_end = $_GET['date_from']." 23:59:59";
		$sql = "SELECT * FROM `services` as s WHERE s.type = '2' AND (SELECT COUNT(*) FROM services_to_order as so INNER JOIN orders as mo ON so.order_id = mo.id where mo.status not in (4,5,6,7) AND (so.date_from < '".$date_end."' AND so.date_to >= '".$date_start."') AND so.service_id = s.id) = 0";
		$sql = $db->query($sql);
		$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
		echo json_encode($sql);
	}
}
if($_GET['type'] == '1'){
	if($_GET['time_type'] == '0'){
			$date_start = $_GET['date_from']." ".$_GET['time_start'].":00:00";
			$date_end = $_GET['date_from']." ".$_GET['time_end'].":00:00";

			$sql = "SELECT * FROM `services` as s WHERE s.type = '1' AND (SELECT COUNT(*) FROM services_to_order as so INNER JOIN orders as mo ON so.order_id = mo.id where mo.status not in (4,5,6,7) AND (so.date_from < '".$date_end."' AND so.date_to >= '".$date_start."') AND so.service_id = s.id) = 0 ";
			$sql = $db->query($sql);
			$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
			echo json_encode($sql);
		}
		elseif ($_GET['time_type'] == '1') {
			$date_start = $_GET['date_from']." 00:00:00";
			$date_end =  date("Y-m-d", strtotime("+1 days", strtotime($date_start)))." 00:00:00";
			$sql = "SELECT * FROM `services` as s WHERE s.type = '1' AND (SELECT COUNT(*) FROM services_to_order as so INNER JOIN orders as mo ON so.order_id = mo.id where mo.status not in (4,5,6,7) AND (so.date_from < '".$date_end."' AND so.date_to >= '".$date_start."') AND so.service_id = s.id) = 0";
			$sql = $db->query($sql);
			$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
			echo json_encode($sql);

	}
}
if($_GET['move'] == '1'){
	$sql = "SELECT * FROM pricelist";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
	for ($i=0; $i < count($sql); $i++) { 
		$sql[$i]['config'] = json_decode($sql[$i]['config']);
	}
	echo json_encode($sql);
}

if($_GET['move'] == '2'){
	echo json_encode(get_trainers());
}

if($_GET['move'] == '3'){
	switch ($_GET['time_type']) {
		case '0':
			$date_start = $_GET['date_from']." ".$_GET['time_start'].":00:00";
			$date_end = $_GET['date_from']." ".$_GET['time_end'].":00:00";
			break;

		case '1':
			$date_start = $_GET['date_from']." 00:00:00";
			$date_end =  date("Y-m-d", strtotime("+7 days", strtotime($date_start)))." 00:00:00";
			break;
		case '2':
			$date_start = $_GET['date_from']." 00:00:00";
			$date_end = $_GET['date_from']." 23:59:59";
			break;
	}
	$sql = "SELECT o.id as id, o.date_from as date_from, s.title as title, o.date_to as date_to, t.fio as fio, t.id as trainer_id FROM `services_to_order` as o INNER JOIN trainer AS t ON t.id = o.trainer INNER JOIN services as s ON s.id = o.service_id INNER JOIN orders as mo ON o.order_id = mo.id where mo.status not in (4,5,6,7) AND o.`date_from` < '".$date_end."' AND o.`date_to` > '".$date_start."' AND o.trainer != '' AND o.service_id2 = '0'";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
	echo json_encode($sql);
}

if($_GET['move'] == '4'){
$sql = "SELECT DISTINCT SUBSTRING(so.`date_from`,1, 10) as date FROM `services_to_order` as so INNER JOIN orders as mo ON so.order_id = mo.id where mo.status not in (4,5,6,7) AND so.`trainer` != '' AND so.`date_to` >= NOW()";
$sql = $db->query($sql);
$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
$res = array();
foreach ($sql as $date) {
	array_push($res, $date['date']);
}
echo json_encode($res);
}
if($_GET['move'] == '5'){
$sql = "SELECT so.id, so.date_from, so.service_id FROM services_to_order as so INNER JOIN orders as mo ON so.order_id = mo.id where mo.status not in (4,5,6,7) AND so.trainer = '".$_GET['trainer']."' AND so.date_from >=  NOW() AND so.service_id2 = '0'";
$sql = $db->query($sql);
$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
echo json_encode($sql);
}

if($_GET['move'] == '6'){
$sql = "SELECT h.id as house_id, hto.order_id as order_id, hto.from_order as from_date, hto.to_order as to_date, h.name as name FROM house_to_orders as hto INNER JOIN houses as h ON h.id = hto.house_id INNER JOIN orders as mo ON hto.order_id = mo.id where mo.status not in (4,5,6,7) AND hto.to_order >= '".date('Y-m-01')."'";
$sql = $db->query($sql);
$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
echo json_encode($sql);

}
if($_GET['move'] == '7'){
$sql = "SELECT s.title as name, sto.trainer as trainer, t.fio as trainer_fio, s.type as service_type, sto.order_id as order_id, sto.date_from as from_date, sto.date_to as to_date, s.id as service_id FROM services_to_order as sto INNER JOIN services as s ON s.id = sto.service_id LEFT JOIN trainer as t ON sto.trainer = t.id INNER JOIN orders as mo ON sto.order_id = mo.id where mo.status not in (4,5,6,7) AND  sto.date_to >= '".date('Y-m-01')." 00:00:00' AND sto.service_id2 = 0 AND s.id = ".$_GET['service'];
$sql = $db->query($sql);
$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
echo json_encode($sql);
}

if ($_GET['move'] == '8') {
$sql = "SELECT sto.id as id, s.title as name, sto.trainer as trainer, t.fio as trainer_fio, sto.order_id as order_id, sto.date_from as from_date, sto.date_to as to_date, sto2.service_id as service_id FROM services_to_order as sto INNER JOIN services_to_order as sto2 ON sto2.id = sto.service_id2 INNER JOIN services as s ON sto2.service_id = s.id LEFT JOIN trainer as t ON sto.trainer = t.id INNER JOIN orders as mo ON sto.order_id = mo.id where mo.status not in (4,5,6,7) AND sto.date_to >= '".date('Y-m-01')." 00:00:00' AND sto.service_id2 != 0";
$sql = $db->query($sql);
$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
echo json_encode($sql);
}

if($_GET['move'] == '9'){
$sql = "SELECT sto.id as id, t.fio as fio, sto.date_from as date_from, t.id as trainer_id FROM services_to_order as sto INNER JOIN trainer as t ON t.id = sto.trainer INNER JOIN orders as o ON o.id = sto.order_id WHERE o.status not in (4,5,6,7) AND sto.service_id2 = '0' AND sto.date_from >= NOW()";
$sql = $db->query($sql);
$sql = mysqli_fetch_all($sql);
return json_encode($sql);
}
 ?>









