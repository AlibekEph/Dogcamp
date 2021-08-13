<?php 
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");


$houses_count = "SELECT * FROM houses ";
$houses_count = $db->query($houses_count);
$houses_count = mysqli_fetch_all($houses_count, MYSQLI_BOTH);
$houses_count = count($houses_count);
//Поиск аренд домов, которые заканчиваются позднее сегодняшнего дня
$orders = "SELECT * FROM `house_to_orders` WHERE `to_order` > CURRENT_DATE";
$orders = $db->query($orders);
$orders = mysqli_fetch_all($orders, MYSQLI_BOTH);

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
		echo date('Y-m-d')." ".$dates[$i]['date']."<br>";
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
			//echo $gap[0]." ".$gap[1]."  ".$dates[$i]['date']."<br>";
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

foreach ($dates as $date) {
	if($houses_count - 1 != $date['count']){
		$delete_key = array_search($date, $dates);
			unset($dates[$delete_key]);
		}
}

$result_dates = array();
foreach ($dates as $date) {
	array_push($result_dates, $date['date']);
}
var_dump($result_dates);
?>