<?php 
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
$db = new Database();
$db->getConnection();
if($_GET['type'] == '2'){
	if($_GET['time_type'] == '0'){
		$date_start = $_GET['date_from']." ".$_GET['time_start'].":00:00";
		$date_end = $_GET['date_from']." ".$_GET['time_end'].":00:00";

		$sql = "SELECT * FROM `services` as s WHERE s.type = '2' AND (SELECT COUNT(*) FROM services_to_order as so WHERE (so.date_from < '".$date_end."' AND so.date_to >= '".$date_start."') AND so.service_id = s.id) = 0 ";
		$sql = $db->query($sql);
		$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
		echo json_encode($sql);
	}
	elseif ($_GET['time_type'] == '1') {
		$date_start = $_GET['date_from']." 00:00:00";
		$date_end =  date("Y-m-d", strtotime("+7 days", strtotime($date_start)))." 00:00:00";
		$sql = "SELECT * FROM `services` as s WHERE s.type = '2' AND (SELECT COUNT(*) FROM services_to_order as so WHERE (so.date_from < '".$date_end."' AND so.date_to >= '".$date_start."') AND so.service_id = s.id) = 0";
		$sql = $db->query($sql);
		$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
		echo json_encode($sql);

	}
	elseif ($_GET['time_type'] == '2'){
		$date_start = $_GET['date_from']." 00:00:00";
		$date_end = $_GET['date_from']." 23:59:59";
		$sql = "SELECT * FROM `services` as s WHERE s.type = '2' AND (SELECT COUNT(*) FROM services_to_order as so WHERE (so.date_from < '".$date_end."' AND so.date_to >= '".$date_start."') AND so.service_id = s.id) = 0";
		$sql = $db->query($sql);
		$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
		echo json_encode($sql);
	}
}
if($_GET['type'] == '1'){
	if($_GET['time_type'] == '0'){
			$date_start = $_GET['date_from']." ".$_GET['time_start'].":00:00";
			$date_end = $_GET['date_from']." ".$_GET['time_end'].":00:00";

			$sql = "SELECT * FROM `services` as s WHERE s.type = '1' AND (SELECT COUNT(*) FROM services_to_order as so WHERE (so.date_from < '".$date_end."' AND so.date_to >= '".$date_start."') AND so.service_id = s.id) = 0 ";
			$sql = $db->query($sql);
			$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
			echo json_encode($sql);
		}
		elseif ($_GET['time_type'] == '1') {
			$date_start = $_GET['date_from']." 00:00:00";
			$date_end =  date("Y-m-d", strtotime("+1 days", strtotime($date_start)))." 00:00:00";
			$sql = "SELECT * FROM `services` as s WHERE s.type = '1' AND (SELECT COUNT(*) FROM services_to_order as so WHERE (so.date_from < '".$date_end."' AND so.date_to >= '".$date_start."') AND so.service_id = s.id) = 0";
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

 ?>

