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

$sql = "SELECT id as id, IF((SELECT COUNT(*) from house_to_orders as o where o.house_id = h.id AND CHECK_DATE('".$_GET['date_from']."','".$_GET['date_to']."', o.from_order, o.to_order)) = 0, 'y', 'n') as dis_house  FROM houses as h WHERE ".$class_sql." AND ".$camp_sql. " ";
$db = new Database();
$db->getConnection();
$houses_count = "SELECT id FROM houses as h WHERE ".$class_sql." AND ".$camp_sql;
$houses_count = $db->query($houses_count);
$houses_count = mysqli_fetch_all($houses_count);
$res = $db->query($sql);
$res = mysqli_fetch_all($res, MYSQLI_BOTH);
$result = array();
foreach ($res as $id) {
	array_push($result, new House($id['id'], true));
	$result[array_key_last($result)]->set_dis($id['dis_house']);
}
$orders = "SELECT o.house_id as house_id, o.from_order as from_order, o.to_order as to_order FROM `house_to_orders` as o INNER JOIN houses as h ON o.house_id = h.id WHERE o.`to_order` > CURRENT_DATE AND ".$class_sql." AND ".$camp_sql;
$orders = $db->query($orders);
$orders = mysqli_fetch_all($orders, MYSQLI_BOTH);
$result_dates = array();

if (count($orders) != 0){
	//Распеределение по номерам домов
	$houses = array();
	foreach ($orders as $order) {
		if(array_key_exists($order['house_id'], $houses)){
			array_push($houses[$order['house_id']], array($order['from_order'], $order['to_order']));
		}else{
			$houses[$order['house_id']] = array();
			array_push($houses[$order['house_id']], array($order['from_order'], $order['to_order']));
		}
	}

	//Поиск дома с самой маленькой загрузкой
	function cmp_function($a, $b){
		return (count($a) > count($b));
	}
	 
	uasort($houses, 'cmp_function');
	$min_house = array_shift($houses);

	//Поиск дат

	$dates = array();
	foreach ($min_house as $h_date) {
		$date_start = $h_date[0];
		$date_end = $h_date[1];
		array_push($dates, array('date' => $date_start,'count' => 0));
		$date_end = date("Y-m-d", strtotime("-1 days", strtotime($date_end)));
		while($date_start != $date_end) {
		$date_start = date("Y-m-d", strtotime("+1 days", strtotime($date_start)));
		array_push($dates, array('date' => $date_start, 'count' => 0));
		}

	}

	for ($i=0; $i < count($dates); $i++) { 
		if(date('Y-m-d') > $dates[$i]['date']){
			unset($dates[$i]);
		}

	}
	//получаем поиск пересечений

	$dates = array_values($dates);

	for ($i=0; $i < count($dates); $i++) { 
		foreach ($houses as $house) {
			$flag_date = false;
			foreach ($house as $gap) {
				$inRange = ($dates[$i]['date'] >= $gap[0] && $dates[$i]['date'] <= $gap[1])? true : false;
				if ($inRange) {
					$flag_date = true;
					break;
				}
			}
			if($flag_date){
				$dates[$i]['count'] += 1;
			}else{
				break;
			}

		}
	}
	/*$dates2 = new ArrayObject($dates);
	$dates2 = $dates2->getArrayCopy();*/
	foreach ($dates as $date) {
		if(count($houses_count) - 1 != $date['count']){
			$delete_key = array_search($date, $dates);
				unset($dates[$delete_key]);
			}
	}
	$result_dates = array();
	foreach ($dates as $date) {
		array_push($result_dates, $date['date']);
	}
}

echo json_encode(array('houses' => $result, 'dates' => $result_dates));
?>