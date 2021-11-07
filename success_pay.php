<?php 
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
include_once("header.php"); 
$vars = array();
$vars['userName'] = 'P490904206589-api';
$vars['password'] = 'r$56apTnQ';
$vars['orderId'] = $_GET['orderId'];
 
$ch = curl_init('https://securepayments.sberbank.ru/payment/rest/getOrderStatusExtended.do?' . http_build_query($vars));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HEADER, false);
$res = curl_exec($ch);
curl_close($ch);
$db = new Database();
$db->getConnection();
$res = json_decode($res, true);
$order_id = explode('-tt-', $res['orderNumber'])[0];

if ($res["orderStatus"] == 2){
	foreach ($_SESSION['elems'] as $elem) {
		$db->query($elem);
	}
	$order = "SELECT * FROM orders WHERE id = '".$order_id."'";
	$order = $db->query($order);
	$order = mysqli_fetch_all($order, MYSQLI_BOTH)[0];
	if($order['wholesaller'] == '1'){
		$set_status = "UPDATE orders SET status = '3' WHERE id = '".$order['id']."'";
	}else{
		$set_status = "UPDATE orders SET status = '2' WHERE id = '".$order['id']."'";
	}
	$db->query($set_status);
	$notif = new Notifications();
	$notif->success_order($order['id']);
}
$_SESSION['elems'] = array();
?>


<div class="container text-center" style="margin-top:10em; height:60%;">
    <h2>Спасибо! Заказ успешно оплачен!</h2>
    <h5 class="text-center mt-4 mb-4">Вам необходимо перейти в Ваш телеграм и активировать бота <br> для получения уведомлений по вашему заказу по ссылке ниже</h5>
    <h5 class="text-center mt-4 mb-4"><a class="rentals-card-btn active p-2" href="https://t.me/dogcamping_bot" style="text-decoration:none;text-transform:none">Перейти к боту</a></h5>
    <h5 class="text-center mt-4 mb-4"><a href="https://dogcamping.ru/rentals.php">Вернуться к оформлению нового заказа</a></h5>
</div>

<?php include_once("footer.php"); ?>