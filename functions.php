<?php 
session_start();
include($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");
include($_SERVER['DOCUMENT_ROOT'] . "/objects/house.php");
include($_SERVER['DOCUMENT_ROOT'] . "/objects/playpen.php");
include($_SERVER['DOCUMENT_ROOT'] . "/objects/sheeps.php");
include($_SERVER['DOCUMENT_ROOT'] . "/objects/sheels.php");
include($_SERVER['DOCUMENT_ROOT'] . "/objects/workout.php");
include($_SERVER['DOCUMENT_ROOT'] . "/objects/trainer.php");
include($_SERVER['DOCUMENT_ROOT'] . "/objects/worker.php");
include($_SERVER['DOCUMENT_ROOT'] . "/objects/training.php");
include($_SERVER['DOCUMENT_ROOT'] . "/objects/notifications.php");

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
		header('Location:'.$protocol.$_SERVER['HTTP_HOST'].'/admin/login.php');
		}else{
			return false;
		}
	}
	return true;
}

function get_trainers(){
	global $db;
	$sql = "SELECT t.id as id, t.fio as fio, t.photo as phone, w.id as worker_id FROM trainer as t INNER JOIN workers as w ON t.id = w.trainer_id ORDER BY id DESC";
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
function del_trainer($id){
	global $db;
	$sql = "DELETE FROM trainer WHERE id = '".$id."'";
	$db->query($sql);
}
function del_people($id){
	global $db;
	$sql = "DELETE FROM workers WHERE id = '".$id."'";
	$sql = $db->query($sql);
}
function get_orders(){
	global $db;
	$sql = "SELECT o.id as id, c.promotions_and_so_on as promotions_and_so_on, o.payment_date as payment_date, o.coast as coast, o.persons_count as person_count, os.title as status, o.date as date, c.name as name, c.surname as surname, c.email as email, o.notification_date as notification_date, c.phone as phone, c.is_wholesaler as is_wholesaler FROM `orders` as o INNER JOIN clients as c ON c.id = o.client_id INNER JOIN orders_statuses as os ON o.status = os.id WHERE o.status != '1' OR o.status = '3' ORDER BY o.`date` DESC";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
	return $sql;
}

function del_order($id){
	global $db;
	$sql = "DELETE FROM orders WHERE id = '".$id."'";
	$db->query($sql);
}

function del_service($id){
	global $db;
	$sql = "DELETE FROM services WHERE id = '".$id."'";
	$db->query($sql);
}

function get_items_to_order($id){
global $db;
$result = array();
$sql = "SELECT o.id as id, o.from_order as from_order, h.place_count as place_count, o.to_order as to_order,o.sale as sale, o.house_id as house_id, h.name as house_title, o.coast as coast FROM house_to_orders as o INNER JOIN houses as h ON h.id = o.house_id WHERE order_id = '".$id."'";
$sql = $db->query($sql);
$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
foreach ($sql as $house) {
	$type = 'Аренда дома';
	$title = $house['house_title'];
	$date_start = $house['from_order'];
	$date_end = $house['to_order'];
	$coast = $house['coast'];
	$sale = $house['sale'];
	if($coast == '0.00'){
	$coast = "В подарок";
	}
	$place_count = $house['place_count'];
	array_push($result, array('type'=> $type, 'title' => $title, 'time_type'=> '', 'date_start' => $date_start, 'date_end' => $date_end, 'place_count' => $place_count, 'coast' => $coast, 'sale' => $sale));
}

$services = "SELECT o.id as id, o.date_from as date_from, o.service_id2 as service_id2,s2.title as training_field, o.date_to as date_to, o.coast as coast, o.trainer as trainer, s.title as service_title, st.title as st_title FROM `services_to_order` as o INNER JOIN services as s ON o.service_id = s.id LEFT JOIN services_to_order as o2 ON o.service_id2 = o2.id LEFT JOIN services as s2 ON s2.id = o2.service_id INNER JOIN service_type as st ON st.id = s.type WHERE o.order_id = '".$id."'";
$services = $db->query($services);
$services = mysqli_fetch_all($services, MYSQLI_BOTH);
foreach ($services as $service) {
$type = $service['st_title'];
if($service['trainer'] != '' && $service['service_id2'] == '0'){
	$type .= " с тренером";
}
$title = $service['service_title'];
$date_start = substr($service['date_from'],0, 11);
$date_end =  substr($service['date_to'],0, 11);
$time_type = '';
$time_start = substr($service['date_from'], 11, 8);
$time_end = substr($service['date_to'], 11, 8);
if($date_start == $date_end){
$time_type = 'Почасовая аренда';
}
if($time_end == '23:59:59'){
$time_type = 'Аренда на день';
}
if($date_start != $date_end){
	$time_type = 'Аренда на неделю';
}
$coast = $service['coast'];
if($service['training_field'] != ''){
    $title = $service['training_field'];
}
$sale = '0';
array_push($result, array('type'=> $title, 'title' => $type, 'time_start' => $time_start, 'time_end' => $time_end, 'time_type' => $time_type, 'date_start' => $date_start, 'date_end' => $date_end, 'coast' => $coast, 'sale' => $sale));
}
return $result;
}

function get_house_desc($id){
	global $db;
	$sql = "SELECT h.id as id, h.from_order as from_date, h.to_order as to_date, c.name as name, c.surname as surname, c.is_wholesaler as is_wholesaler, o.id as order_id FROM house_to_orders as h INNER JOIN orders as o ON h.order_id = o.id  INNER JOIN clients as c ON c.id = o.client_id WHERE h.house_id = '".$id."' ORDER BY h.from_order DESC";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
	return $sql;
}

function get_services(){
	global $db;
	$sql = "SELECT s.id as id, s.title as title, s.type as type_id, t.title as type_title FROM services as s INNER JOIN service_type as t ON t.id = s.type WHERE s.id != 7 ORDER BY s.id DESC";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
	$res = array();
	foreach ($sql as $ser) {
		$id = $ser['id'];
		$type = $ser['type_title'];
		$title = $ser['title'];
		$type_id = $ser['type_id'];
		array_push($res, array('id' => $id, 'type' => $type, 'title' => $title,'type_id' => $type_id));
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

function change_order($status, $id){
	global $db;
	$sql = "UPDATE orders SET status = '".substr($status.' ', 7, -1)."' WHERE id = '".$id."'";
	$sql = $db->query($sql);
	if(substr($status.' ', 7, -1) == '4' || substr($status.' ', 7, -1) == '5' || substr($status.' ', 7, -1) == '6'){
		$notif = new Notifications();
		$notif->close_order($id, $status);
	}
}


function get_order_list($order_id){
	$text = '';
                    $counter = 1;
                    $sum = 0; 
                    foreach (get_items_to_order($order_id) as $item) {
                    	if($item['coast'] != 'В подарок'){
                      $sum += $item['coast'];
                  }
				$text .= (String)$counter.". ".$item['title']."\n";
                    if ($item['type'] != 'Аренда дома'){
                      $text .= "Вид оплаты: ".$item['time_type']."\n"; 
                     }else{
                    $text .= "Цена: ".$item['coast']."\n";
                  }if($item['time_type'] == '' || $item['time_type'] == 'Аренда на неделю'){
                   $text .= "Дата начала: ".$item['date_start']."\n";
                    $text .= "Дата завершения: ".$item['date_end']."\n";
                  }else{
                    $text .= "Дата: ".$item['date_start']."\n";
                  }
                    if ($item['time_type'] == ''){
                    $text .= "Количество мест: ".$item['place_count']."\n";
                    }else{
                      if($item['time_type'] == 'Почасовая аренда'){
                    $text .= "Время начала: ".substr($item['time_start'],0,5)."\n";
                     $text .="Время завершения: ".substr($item['time_end'],0,5)."\n";
                    }
                    if($item['type'] != 'Снаряды'){
                    $text .= "Поле: ".$item['type']."\n";
                    }
                    $text .= "Стоимость: ".(Int)$item['coast']."руб \n";
                  }
                  $text .= "\n";
                
                $counter +=1;
                 }
return $text;
}


function get_order_text($order_id){
    global $db;
    $sql = "SELECT h.name as title, hto.coast as coast, hto.from_order as from_order, hto.to_order as to_order FROM house_to_orders as hto INNER JOIN houses as h ON h.id = hto.house_id WHERE hto.order_id = '".$order_id."' ";
    $sql = $db->query($sql);
    $sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
    $client = "SELECT c.name as name, os.title as status, o.coast as coast, c.surname as surname, c.patronymic as patronymic, c.email as email, c.phone as phone, c.tg_username as tg FROM orders as o INNER JOIN clients as c ON o.client_id = c.id INNER JOIN orders_statuses as os ON os.id = o.status WHERE o.id = '".$order_id."'";
    $client = $db->query($client);
    $client = mysqli_fetch_all($client, MYSQLI_BOTH)[0];
    $text = '';
    	$sum = 0;
    	$text .= "Здравствуйте, ".$client['name']."!\n";
    	$text .= "Вы оформили заказ № ".$order_id." на сайте dogcamping.ru.\n";
    	$text .= "Спасибо!\n";
    	$text .= "Детали заказа:\n";
    	$text .= "Ваше ФИО: ".$client['surname']." ".$client['name']." ".$client['patronymic']."\n";
    	$text .= "Ваш телефон: ".$client['phone']."\n";
    	$text .= "Ваш E-mail: ".$client['email']."\n\n";
    	$text .= "Состав заказа: \n";
    	$text .= get_order_list($order_id);
    	$text.= "Общая стоимость заказа: ".(String)$client['coast']."₽ \n";
    	if(count($sql) != 0){
    	    $text .= "Бронирование с ".$sql[0]['from_order']." до ".$sql[0]['to_order']." \n";
    	}
    	if($client['status']){
    	    $text .= "Статус заказа: ".$client['status']." \n";
    	}
    	$text .= "Если у Вас остались вопросы, Вы можете связаться с нами по контактам ниже:\n";
    	$text .= "+7 (904) 599-57-82\n";
    	$text .= "gorynychclub@gmail.com\n";
    
    return $text;
}



function get_order_text_admin_tg($order_id){
	global $db;
    $client = "SELECT c.name as name, os.title as status, o.coast as coast, c.surname as surname, c.patronymic as patronymic, c.email as email, c.phone as phone, c.tg_username as tg, c.email as email FROM orders as o INNER JOIN clients as c ON o.client_id = c.id INNER JOIN orders_statuses as os ON os.id = o.status WHERE o.id = '".$order_id."'";
    $client = $db->query($client);
    $client = mysqli_fetch_all($client, MYSQLI_BOTH)[0];
    $text = "Оформлен новый заказ\n\n";
    $text .= "ID: ".$order_id."\n";
    $text .= "https://dogcamping.ru/admin/orders/order.php?id=".$order_id."\n";
    $text .= "Контакты клиента\n\n";
    $text .= "ФИО:\n";
    $text .= $client['name']." ".$client['surname']."\n\n";
    $text .= "Телефон:\n";
    $text .= $client['phone']."\n\n";
    $text .= "Email:\n";
    $text .= $client['email'];
    $text .= "Состав заказа: \n";
    $text .= get_order_list($order_id);
    return $text;
}

function get_order_text_admin($order_id){
    global $db;
    $sql = "SELECT h.name as title, hto.coast as coast, hto.from_order as from_order, hto.to_order as to_order FROM house_to_orders as hto INNER JOIN houses as h ON h.id = hto.house_id  WHERE hto.order_id = '".$order_id."' ";
    $sql = $db->query($sql);
    $sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
    $client = "SELECT c.name as name, os.title as status, o.coast as coast, c.surname as surname, c.patronymic as patronymic, c.email as email, c.phone as phone, c.tg_username as tg FROM orders as o INNER JOIN clients as c ON o.client_id = c.id INNER JOIN orders_statuses as os ON os.id = o.status WHERE o.id = '".$order_id."'";
    $client = $db->query($client);
    $client = mysqli_fetch_all($client, MYSQLI_BOTH)[0];
    $text = '';
    	$sum = 0;
    	$text .= "На сайте dogcamping.ru оформлен новый заказ\n";
    	$text .= "ID:".$order_id."\n";
    	$text .= "Детали заказа:\n";
    	$text .= "ФИО</b>: ".$client['surname']." ".$client['name']." ".$client['patronymic']."\n";
    	$text .= "телефон: ".$client['phone']."\n";
    	$text .= "E-mail: ".$client['email']."\n\n";
    	$text .= "Состав заказа: \n";
    	$text .= get_order_list($order_id);
    	$text.= "Общая стоимость заказа: ".(String)$client['coast']."₽ \n";
    	if(count($sql) != 0){
    	$text .= "Бронирование с ".$sql[0]['from_order']." до ".$sql[0]['to_order']." \n";
    	}
    	$text .= "Статус заказа: ".$client['status'];

    
    	

    return $text;
}

function get_training_text($date_from, $date_to, $client_fio, $field, $order_id){
	global $db;
	$date = substr($date_from, 0, 10);
	$hours_from =  substr($date_from, 11, 2);
	$hours_to =  substr($date_to, 11, 2);
	$text = "Для вас есть новая запись на вашу тренировку\n\n";
	$text .= "Дата: ".$date."\n";
	$text .= "Время: с ".$hours_from.":00 до ".$hours_to.":00\n";
	$text .= "Поле: ".$field."\n\n";
	$text .= "ID: ".$order_id;
	return $text;
}
function get_chaban_text($date_from, $date_to, $field){
	$date = substr($date_from, 0, 10);
	$hours_from =  substr($date_from, 11, 2);
	if((Int)$hours_from < 9){
		$hours_from = "9";
	}
	$hours_to =  substr($date_to, 11, 2);
	$text = "Необходимо пригнать овец\n\n";
	$text .= "Дата: ".$date."\n";
	$text .= "Время: ".$hours_from."\n";
	$text .= "Поле: ".$field."\n";
	return $text;
}

function get_workers_type(){
	global $db;
	$sql = "SELECT * FROM workers_type";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql,MYSQLI_BOTH);
	return $sql;
}
function get_workers(){
	global $db;
	$sql = "SELECT w.id as id, w.fio as fio, w.tg_username as tg, w.email as email, wt.title as worker_type, wt.id as worker_type_id FROM workers as w INNER JOIN workers_type as wt ON wt.id = w.worker_type";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
	return $sql;
}
function del_worker($id){
	global $db;
	$sql = "DELETE FROM workers WHERE id = '".$id."'";
	$db->query($sql);
}
function get_add_service_link($type){
	if($type == '1'){
		return 'add_manezh.php';
	}
	if($type == '2'){
		return 'add_sheeps.php';
	}
	if($type == '4'){
		return 'add_projectail.php';
	}
}

function site_close_show(){
	global $db;
	$sql = "SELECT * FROM settings";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH)[0];
	if($sql['close_site'] == '0'){
		return "d-none";
	}
	else{
		return '';
	}
}

function change_notif_date($id, $date){
	global $db;
	$sql = "UPDATE orders SET notification_date = '".$date."' WHERE id = '".$id."'";
	$db->query($sql);
}
function change_payment_date($id, $date){
	global $db;
	$sql = "UPDATE orders SET payment_date = '".$date."' WHERE id = '".$id."'";
	$db->query($sql);
}

function get_all_trainings(){
	global $db;
	$sql = "SELECT sto.id as id, t.fio as fio, sto.date_from as date_from, t.id as trainer_id FROM services_to_order as sto INNER JOIN trainer as t ON t.id = sto.trainer INNER JOIN orders as o ON o.id = sto.order_id WHERE o.status not in (4,5,6,7) AND sto.service_id2 = '0' AND sto.date_from >= NOW()";
$sql = $db->query($sql);
$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
return $sql;
}

function get_orders_train(){
	global $db;
	$sql = "SELECT c.name as name, c.surname as surname, o.id as id FROM orders as o INNER JOIN clients as c ON c.id = o.client_id WHERE o.status not in (4,5,6,7) ORDER BY o.id DESC";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
	return $sql;
}
function text_for_rent_field_for_trainer($date, $id, $field){
	$text = "Назначена тренировка\n\n";
	$text .= "Дата: ".substr($date,0,11)."\n";
	$text .= "Поле: ".$field."\n";
	$text .= "ID заказа: ".$id;
	return $text;
}

?>