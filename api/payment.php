<?php 
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
require_once ($_SERVER['DOCUMENT_ROOT'] . "/vendor/autoload.php");
function sortByClass($house1, $house2){
if($house1->class_id > $house2->class_id){
	return 1;
}
if($house1->class_id < $house2->class_id){
	return -1;
}
if($house1->get_coast() < $house2->get_coast()){
	return 1;
}
if($house1->get_coast() > $house2->get_coast()){
	return -1;
}
if((Int)$house1->id > (Int)$house2->id){
	return -1;
}
if((Int)$house1->id < (Int)$house2->id){
	return 1;
}
}
$db = new Database();
$link = $db->getConnection();
$cart = json_decode($_POST['cart'], true);
$user = json_decode($_POST['user'], true);
//ищу клиента
	$fi = explode(' ', $user['name']);
	$surname = $fi[0];
	$name = $fi[1];
	$patronymic = $fi[2];
	$email = $user['email'];
	$phone = $user['phone'];
	$tg = $user['tg'];
	$send_not = $user['sending_notifications'];
	$is_wholesaler = $user['is_wholesaler'];
	$sql = "SELECT * FROM clients WHERE (name = '".$name."' AND surname = '".$surname."' AND patronymic = '".$patronymic."') AND email = '".$email."' AND tg_username = '".$tg."' AND phone = '".$phone."' ";
	$sql = $db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
	if(count($sql) == 0){
		$sql = "INSERT INTO `clients` (`id`, `name`, `surname`, `patronymic`, `email`, `phone`, `is_wholesaler`, `terms_of_the_privacy_policy`, `promotions_and_so_on`, `tg_username`) VALUES (NULL, '".$name."', '".$surname."', '".$patronymic."','".$email."', '".$phone."', '".$is_wholesaler."', '1', '".$send_not."', '".$tg."')";
		$db->query($sql);
		$last_id = 'SELECT MAX(`id`) FROM `clients`';
		$last_id = $db->query($last_id);
		$client_id = ( int ) mysqli_fetch_all($last_id, MYSQLI_ASSOC)[0]["MAX(`id`)"];
	}else{
		$client_id = $sql[0]['id'];
	}
//подсчет стоимости
	/*$pricelist = "SELECT * FROM pricelist";
	$pricelist = $db->query($pricelist);
	$pricelist = mysqli_fetch_all($pricelist, MYSQLI_BOTH);
	for ($i=0; $i < count($pricelist); $i++) { 
		$pricelist[$i]['config'] = json_decode($pricelist[$i]['config']);
	}
	$sum = 0;
	foreach ($cart as $elem) {
		$sum += $elem['price'];
	}*/

$order_elems = array();
foreach ($cart as $elem) {
	switch ($elem['class']) {
		case 'house':
			$house = new House($elem['data']['id'], true);
			$house->set_dates($elem['date2'][0], $elem['date2'][1]);
			$house->set_title($elem['full_title']);
			array_push($order_elems, $house);
			break;

		case 'playpen':
			$playpen = new Playpen($elem['choosen_id'], $elem['start_date'], $elem['time_type'], $elem['time_start'], $elem['time_end']);
			$playpen->set_title($elem['title']);
			array_push($order_elems, $playpen);
			break;

		case 'sheeps':
			$sheeps = new Sheeps($elem['choosen_id'], $elem['start_date'], $elem['time_type'], $elem['time_start'], $elem['time_end'], $elem['choosen_trainer_id']);
			$sheeps->set_title($elem['title']);
			array_push($order_elems, $sheeps);
			break;

		case 'sheels':
			$sheels = new Sheels($elem['choosen_id'], $elem['start_date'], $elem['time_type'], $elem['time_start'], $elem['time_end'], $elem['choosen_trainer_id']);
			$sheels->set_title($elem['title']);
			array_push($order_elems, $sheels);
			break;
		
		case 'workout':
			$workout = new Workout($elem['choosen_id'], $elem['start_date2'], $elem['time_type'], $elem['time_start'], $elem['time_end'], $elem['choosen_trainer_id']);
			$workout->set_title($elem['title']);
			$workout->set_service_id2($elem['choosen_id2']);
			array_push($order_elems, $workout);
			break;

		default:
			# code...
			break;
	}
}
$wholesaller = '0';
$houses = array();
foreach ($order_elems as $elem) {
	if($elem instanceof House){
		array_push($houses, $elem);
	}
}
if(count($houses) >= 7){
	$wholesaller = '1';
}
if($wholesaller == '1'){
usort($houses, 'sortByClass');


$houses = array_reverse($houses);
$count_present = floor(count($houses) / 7);
for ($i=0; $i < $count_present; $i++) { 
	$houses[$i]->set_presents();
}
}
$sum = 0;
foreach ($order_elems as $elem) {
	$sum += (Int) $elem->get_coast();
}
//создаю заказ
	$order = "INSERT INTO `orders` (`id`, `client_id`, `coast`, `persons_count`, `date`, `wholesaller`, `status`) VALUES (NULL, '".$client_id."', '".$sum."', '".$user['person_count']."', CURRENT_DATE(), '".$wholesaller."', '1')";
	$db->query($order);
	$last_id = 'SELECT MAX(`id`) FROM `orders`';
	$last_id = $db->query($last_id);
	$order_id = ( int ) mysqli_fetch_all($last_id, MYSQLI_ASSOC)[0]["MAX(`id`)"];
$_SESSION['elems'] = array();
foreach ($order_elems as $elem) {
	array_push($_SESSION['elems'], $elem->to_book($order_id));
}
//добавляю каждый сервис

//Запрос к сберу 

$vars = array();
 
$vars['userName'] = 'P490904206589-api';
$vars['password'] = 'r$56apTnQ';
 
$vars['orderNumber'] = $order_id."-tt-".rand();
 
 $cart = array(
);
/*$counter = 1;
foreach ($order_elems as $elem) {
	array_push($cart, 
	array(
		'positionId' => (String)$counter,
		'name' => $elem->full_title,
		'quantity' => array(
			'value' => 1,    
			'measure' => 'шт'
		),
		'itemAmount' => $elem->get_coast(),
		'itemCode' => (String)$elem->get_unic_code(),
		'tax' => array(
			'taxType' => 0		),
		'itemPrice' => $elem->get_coast()
	)
	);
	$counter++;
}*/
/*$vars['orderBundle'] = json_encode(
	array(
		'cartItems' => array(
			'items' => $cart
		)
	)
);*/
$vars['amount'] = (Int)$sum * 100;
 if($wholesaller == '1'){
$vars['amount'] = 5000 * 100;

}
$vars['returnUrl'] = PROTOCOL.'://'.DOMAIN.'/success_pay.php';
	
$vars['failUrl'] = PROTOCOL.'://'.DOMAIN.'/error.php';
 
$vars['description'] = 'Заказ №' . $order_id ;
 
$ch = curl_init('https://securepayments.sberbank.ru/payment/rest/register.do?' . http_build_query($vars));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HEADER, false);
$res = curl_exec($ch);
curl_close($ch);
$res = json_decode($res, JSON_OBJECT_AS_ARRAY);
if (empty($res['orderId'])){
	echo $res['errorMessage'];
	$sql = "DELETE FROM orders WHRER id = '".$order_id."'";
	$db->query($sql);
	$_SESSION['elems'] = array();						
} else {

echo $res['formUrl'];
}
/*$userName = "T490904206589-operator"; 
$password = "T490904206589";
$orderNumber = $order_id;
$amount = (Int)$sum * 100;
$returnUrl = PROTOCOL.'://'.DOMAIN.'/payment/success.php';
 $curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'https://3dsec.sberbank.ru/payment/rest/register.do');
curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, 'amount='.$amount.'&currency=810&language=ru&orderNumber='.$orderNumber.'&returnUrl='.$returnUrl.'&jsonParams={"orderNumber":'.$orderNumber.'}&pageView=DESKTOP&expirationDate
=2014-09-08T14:14:14&merchantLogin=merch_child');
$out = curl_exec($curl);
echo $out;
curl_close($curl);*/
/*use Voronkovich\SberbankAcquiring\Client;

$client = new Client(['userName' => 'T490904206589-operator', 'password' => 'T490904206589']);
$orderId     = $order_id;
$orderAmount = (Int)$sum * 100;
$returnUrl   = PROTOCOL.'://'.DOMAIN.'/payment/success.php';

// You can pass additional parameters like a currency code and etc.
$params['failUrl']  =  PROTOCOL.'://'.DOMAIN.'/payment/error.php';

$result = $client->registerOrder($orderId, $orderAmount, $returnUrl, $params);

$paymentOrderId = $result['orderId'];
$paymentFormUrl = $result['formUrl'];

var_dump($result);*/
?>