<?php 
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
$db = new Database();
$link = $db->getConnection();
$cart = json_decode($_POST['cart'], true);
$user = json_decode($_POST['user'], true);
//ищу клиента
	$fi = explode(' ', $user['name']);
	$surname = $fi[0];
	$name = $fi[1];
	$email = $user['email'];
	$phone = $user['phone'];
	$send_not = $user['sending_notifications'];
	$is_wholesaler = $user['is_wholesaler'];
	$sql = "SELECT * FROM clients WHERE (name = '".$name."' AND surname = '".$surname."') OR email = '".$email."' ";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
	if(coutn($sql) == 0){
		$sql = "INSERT INTO `clients` (`id`, `name`, `surname`, `email`, `phone`, `is_wholesaler`, `terms_of_the_privacy_policy`, `promotions_and_so_on`) VALUES (NULL, '".$name."', '".$surname."', '".$email."', '".$phone."', '".$is_wholesaler."', '1', '".$send_not."')";
		$db->query($sql);
		$last_id = 'SELECT MAX(`id`) FROM `clients`';
		$last_id = $this->db->query($last_id);
		$client_id = ( int ) mysqli_fetch_all($last_id, MYSQLI_ASSOC)[0]["MAX(`id`)"];
	}else{
		$client_id = $sql[0]['id'];
	}

//подсчет стоимости
	$pricelist = "SELECT * FROM pricelist";
	$pricelist = $db->query($pricelist);
	$pricelist = mysqli_fetch_all($pricelist, MYSQLI_BOTH);
	for ($i=0; $i < count($pricelist); $i++) { 
		$pricelist[$i]['config'] = json_decode($pricelist[$i]['config']);
	}
	$sum = 0;
	foreach ($cart as $elem) {
		$sum += $elem['price'];
	}


//создаю заказ
	$order = "INSERT INTO `orders` (`id`, `client_id`, `coast`, `persons_count`, `date`) VALUES (NULL, '".$client_id."', '".$sum."', '".$user['persons_count']."', CURRENT_DATE())";

	$db->query($order);
	$last_id = 'SELECT MAX(`id`) FROM `orders`';
	$last_id = $this->db->query($last_id);
	$order_id = ( int ) mysqli_fetch_all($last_id, MYSQLI_ASSOC)[0]["MAX(`id`)"];

//добавляю каждый сервис

foreach ($cart as $elem) {
	switch ($elem['class']) {
		case 'house':
			$house_sql = "INSERT INTO `house_to_orders` (`id`, `order_id`, `house_id`, `from_order`, `to_order`, `coast`, `sale`) VALUES (NULL, '".$order_id."', '".$elem['data']['id']."', '".$elem['date'][0]."', '".$elem['date'][1]."', '".$elem['price']."', '".$elem['sale']."')";
			$db->query();
			break;

		case 'playpen':
			if($elem['time_type'] == '1'){
				$date_start = $elem['start_date_2']." 00:00:00";
				$date_end =  date("Y-m-d", strtotime("+1 days", strtotime($date_start)))." 00:00:00";
				$playpen_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$order_id."', '".$elem['choosen_id']."', '".$date_start."', '".$date_end."', NULL, '".$elem['price']."')";
			}else{
				$date_start = $elem['start_date_2']." ".$elem['time_start'].":00:00";
				$date_end = $elem['start_date_2']." ".$elem['time_end'].":00:00";
				$playpen_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$order_id."', '".$elem['choosen_id']."', '".$date_start."', '".$date_end."', NULL, '".$elem['price']."')";
			}
			$db->query($playpen_sql);
			break;

		case 'sheeps':
			if($elem['time_type'] == '1'){
				$date_start =  $elem['start_date_2']." 00:00:00";
				$date_end =  date("Y-m-d", strtotime("+7 days", strtotime($date_start)))." 00:00:00";
				$sheeps_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$order_id."', '".$elem['choosen_id']."', '".$date_start."', '".$date_end."', NULL, '".$elem['price']."')";
			}else{
				$date_start =  $elem['start_date_2']." ".$elem['time_start'].":00:00";
				$date_end =  $elem['start_date_2']." ".$elem['time_end'].":00:00";
				$sheeps_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$order_id."', '".$elem['choosen_id']."', '".$date_start."', '".$date_end."', NULL, '".$elem['price']."')";
			}
			$db->query($sheeps_sql);
			break;

		case 'workout':
			$date_start = $elem['start_date_2']." 00:00:00";
			$date_end = $elem['start_date_2']." 23:59:59";
			$workout_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$order_id."', '".$elem['choosen_id']."', '".$date_start."', '".$date_end."', '".$elem['choosen_trainer_id']."', '".$elem['price']."')";
			$db->query($workout_sql);
			break;

		case 'sheels':
			$date_start = $elem['start_date_2']." 00:00:00";
			$date_end = $elem['start_date_2']." 23:59:59";
			$sheels_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$order_id."', '4', '".$date_start."', '".$date_end."', NULL, '".$elem['price']."')";
			$db->query($sheels_sql);
			break;

		case 'subscription':
			foreach ($elem['items'] as $item) {
				switch ($elem['class']) {
					case 'playpen':
						if($item['time_type'] == '1'){
							$date_start = $item['start_date_2']." 00:00:00";
							$date_end =  date("Y-m-d", strtotime("+1 days", strtotime($date_start)))." 00:00:00";
							$playpen_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$order_id."', '".$item['choosen_id']."', '".$date_start."', '".$date_end."', NULL, '".$elem['price']."')";
						}else{
							$date_start = $item['start_date_2']." ".$item['time_start'].":00:00";
							$date_end = $item['start_date_2']." ".$item['time_end'].":00:00";
							$playpen_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$order_id."', '".$item['choosen_id']."', '".$date_start."', '".$date_end."', NULL, '".$elem['price']."')";
						}
						$db->query($playpen_sql);
						break;

					case 'sheeps':
						if($elem['time_type'] == '1'){
							$date_start =  $item['start_date_2']." 00:00:00";
							$date_end =  date("Y-m-d", strtotime("+7 days", strtotime($date_start)))." 00:00:00";
							$sheeps_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$order_id."', '".$item['choosen_id']."', '".$date_start."', '".$date_end."', NULL, '".$elem['price']."')";
						}else{
							$date_start =  $item['start_date_2']." ".$item['time_start'].":00:00";
							$date_end =  $item['start_date_2']." ".$item['time_end'].":00:00";
							$sheeps_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$order_id."', '".$elem['choosen_id']."', '".$date_start."', '".$date_end."', NULL, '".$elem['price']."')";
						}
						$db->query($sheeps_sql);
						break;

					case 'workout':
						$date_start = $item['start_date_2']." 00:00:00";
						$date_end = $item['start_date_2']." 23:59:59";
						$workout_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$order_id."', '".$item['choosen_id']."', '".$date_start."', '".$date_end."', '".$item['choosen_trainer_id']."', '".$elem['price']."')";
						$db->query($workout_sql);
						break;

					case 'sheels':
						$date_start = $item['start_date_2']." 00:00:00";
						$date_end = $item['start_date_2']." 23:59:59";
						$sheels_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$order_id."', '4', '".$date_start."', '".$date_end."', NULL, '".$elem['price']."')";
						$db->query($sheels_sql);
						break;
						}
					}
				break;

		default:
			break;
	}
}

//Запрос к сберу 

$vars = array();
 
$vars['userName'] = 'логин';
$vars['password'] = 'пароль';
 
/* ID заказа в магазине */
$vars['orderNumber'] = $order_id;
 
/* Корзина для чека (необязательно) */
 
/* Сумма заказа в копейках */
$vars['amount'] = (Int)$sum * 100;
 
/* URL куда клиент вернется в случае успешной оплаты */
$vars['returnUrl'] = PROTOCOL'://'.DOMAIN.'/payment/success.php';
	
/* URL куда клиент вернется в случае ошибки */
$vars['failUrl'] = PROTOCOL'://'.DOMAIN.'/payment/error.php';
 
/* Описание заказа, не более 24 символов, запрещены % + \r \n */
$vars['description'] = 'Заказ №' . $order_id ;
 
$ch = curl_init('https://3dsec.sberbank.ru/payment/rest/registerPreAuth.do?' . http_build_query($vars));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HEADER, false);
$res = curl_exec($ch);
curl_close($ch);
$res = json_decode($res, JSON_OBJECT_AS_ARRAY);
if (empty($res['orderId'])){
	echo $res['errorMessage'];						
} else {
	/* Успех: */
	/* Тут нужно сохранить ID платежа в своей БД - $res['orderId'] */
 
	/* Перенаправление клиента на страницу оплаты */
	echo json_encode($res);
}

?>