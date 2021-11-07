<?php 
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
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
 
$res = json_decode($res, JSON_OBJECT_AS_ARRAY);
$db = new Database();
$db->getConnection();
$order_id = explode('-tt-', $res['orderNumber'])[0];
$sql = "DELETE FROM house_to_orders WHERE order_id = '".$order_id."'";
$db->query($sql);
$sql = "DELETE FROM services_to_order WHERE order_id = '".$order_id."'";
$db->query($sql);
$sql = "DELETE FROM orders WHERE id = '".$order_id."'";
$db->query($sql);
$_SESSION['elems'] = array();
include_once("header.php"); 

?>


<div class="container text-center" style="margin-top:10em; height:60%;">
    <h2>К сожалению во время оформления заказа произошла ошибка!</h2>
    <h2><a href="https://dogcamping.ru/rentals.php">На главную</a></h2>
</div>

<?php include_once("footer.php"); ?>