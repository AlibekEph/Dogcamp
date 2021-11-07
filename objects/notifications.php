<?php 
include_once($_SERVER['DOCUMENT_ROOT'] . "/vendor/php_mail/PHPMailer.php");
include_once($_SERVER['DOCUMENT_ROOT'] . "/vendor/php_mail/SMTP.php");
include_once($_SERVER['DOCUMENT_ROOT'] . "/vendor/php_mail/Exception.php");

include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");


class Notifications{
	private $mail;
	private $db;
function __construct(){
	$this->db = new Database();
	$this->db->getConnection();
		$this->mail = new PHPMailer\PHPMailer\PHPMailer();
		
		    $this->mail->isSMTP();   
		    $this->mail->CharSet = "UTF-8";
		    $this->mail->SMTPAuth   = true;
		    //$mail->SMTPDebug = 2;
		    $this->mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

		    // Настройки вашей почты
		    $this->mail->Host       = EMAIL_HOST; // SMTP сервера вашей почты
		    $this->mail->Username   = EMAIL_ADRESS; // Логин на почте
		    $this->mail->Password   = EMAIL_PASSWORD; // Пароль на почте
		    $this->mail->SMTPSecure = 'ssl';
		    $this->mail->Port       = 465;
		    $this->mail->setFrom(EMAIL_ADRESS, 'Dogcamping'); // Адрес самой почты и имя отправителя
	}

public function send_tg_message($text, $chat_id){
    $text2 = str_replace("<b>", "", $text);
    $text2 = str_replace("</b>", "", $text2);
    $text2 = str_replace("<i>", "", $text2);
    $text2 = str_replace("</i>", "", $text2);
	$ch = curl_init();
    curl_setopt_array(
        $ch,
        array(
            CURLOPT_URL => 'https://api.telegram.org/bot' . TELEGRAM_TOKEN . '/sendMessage',
            CURLOPT_POST => TRUE,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_POSTFIELDS => array(
                'chat_id' => $chat_id,
                'text' => $text2,
                'parse_mode' => 'HTML'
            ),
        )
    );
    curl_exec($ch);
}

private function send_mail_message($title, $text, $to){
    $text2 = str_replace("\n", "<br>", $text);
	$body = "
	<h2>$title</h2>
	<b>Почта:</b> $to<br><br>
	<b>Сообщение:</b><br>$text2
	";
	$this->mail->clearAddresses();
	$this->mail->addAddress($to);  
	$this->mail->isHTML(true);
	$this->mail->Subject = $title;
	$this->mail->Body = $body;    
	try {
	// Проверяем отравленность сообщения
	if ($this->mail->send()) {$result = "success";} 
	else {$result = "error";}
   
	} catch (Exception $e) {
	    $result = "error";
	    $status = "Сообщение не было отправлено. Причина ошибки: {$this->mail->ErrorInfo}";
	}

}


public function success_order($order_id){
	$this->send_new_order($order_id);
	$this->send_new_training($order_id);
	$this->send_to_chaban($order_id);
}

public function send_new_order($order_id){
    $order = "SELECT * FROM orders WHERE id = '".$order_id."' ";
    $order = $this->db->query($order);
    $order = mysqli_fetch_all($order, MYSQLI_BOTH)[0];
    $client = "SELECT * FROM clients WHERE id = '".$order['client_id']."'";
    $client = $this->db->query($client);
    $client = mysqli_fetch_all($client, MYSQLI_BOTH)[0];
    $admins = "SELECT * FROM workers WHERE worker_type = 1";
    $admins = $this->db->query($admins);
    $admins = mysqli_fetch_all($admins, MYSQLI_BOTH);
    $text = get_order_text($order_id);
    if($client['chat_id'] != ''){
    	$to = $client['chat_id'];
    	$this->send_tg_message($text, $to);
    }
    if($client['email'] != ''){
    	$to = $client['email'];
    	$this->send_mail_message("Оформлен новый заказ на сайте dogcamping.ru", $text, $to);
    }
    $text_admin = get_order_text_admin($order_id);
    $text_admin_tg = get_order_text_admin_tg($order_id);
    if($text_admin != ''){
    foreach ($admins as $admin) {
    	if($admin['chat_id'] != ''){
    	$to = $admin['chat_id'];
    	$this->send_tg_message($text_admin_tg, $to);
    }
    if($admin['email'] != ''){
    	$to = $admin['email'];
    	$this->send_mail_message("Оформлен новый заказ на сайте dogcamping.ru", $text_admin, $admin['email']);
    }
    }
    }

}

public function send_new_training($order_id){
	$trainings = "SELECT sto.date_from as date_from, sto.date_to as date_to, sto.trainer as trainer_id, w.tg_username as tg, w.chat_id as chat_id, w.fio as fio, w.email as email, s.title as service_title, c.name as client_name, c.surname as client_surname, c.patronymic as client_patronymic FROM services_to_order as sto INNER JOIN workers as w ON w.trainer_id = sto.trainer INNER JOIN orders as o ON o.id = sto.order_id INNER JOIN clients as c ON c.id = o.client_id INNER JOIN services_to_order as sto2 ON sto2.id = sto.service_id2 INNER JOIN services as s ON s.id = sto2.service_id WHERE sto.order_id = '".$order_id."' AND sto.trainer != '' AND sto.service_id2 != 0";
	$trainings = $this->db->query($trainings);
	$trainings = mysqli_fetch_all($trainings, MYSQLI_BOTH);
	foreach ($trainings as $training) {
		$client_fio = $training['client_surname']." ".$training['client_name']." ".$training['client_patronymic'];
		$text = get_training_text($training['date_from'], $training['date_to'], $client_fio, $training['service_title'], $order_id);
		if($training['chat_id'] != ''){
			$this->send_tg_message($text, $training['chat_id']);
		}
	}
	$rent_field = "SELECT sto.date_from as date_from, s.title as field, sto.order_id as order_id, w.chat_id as chat_id FROM services_to_order as sto INNER JOIN services as s ON s.id = sto.service_id INNER JOIN workers as w ON w.trainer_id = sto.trainer WHERE sto.trainer != '' AND sto.service_id2 = '0' AND sto.order_id = '".$order_id."'";
	$rent_field = $this->db->query($rent_field);
	$rent_field = mysqli_fetch_all($rent_field, MYSQLI_BOTH);
	foreach ($rent_field as $rent) {
		$text = text_for_rent_field_for_trainer($rent['date_from'], $rent['order_id'], $rent['field']);
		if($rent['chat_id'] != ''){
			$this->send_tg_message($text, $rent['chat_id']);
		}
	}
}

public function send_to_chaban($order_id){
	$sheeps = "SELECT sto.date_from as date_from, sto.date_to as date_to, s.title as field FROM services_to_order as sto INNER JOIN services as s ON s.id = sto.service_id WHERE s.type = 2 AND sto.order_id = '".$order_id."'";
	$sheeps = $this->db->query($sheeps);
	$sheeps = mysqli_fetch_all($sheeps, MYSQLI_BOTH);
	$chabans  = "SELECT * FROM workers WHERE worker_type = 3";
	$chabans = $this->db->query($chabans);
	$chabans = mysqli_fetch_all($chabans, MYSQLI_BOTH);
	foreach ($chabans as $chaban) {
	foreach ($sheeps as $sheep) {
			$text = get_chaban_text($sheep['date_from'], $sheep['date_to'], $sheep['field']);
			$this->send_tg_message($text, $chaban['chat_id']);
		}
	}
}

public function close_order($order_id, $status){
	$sql = "SELECT c.chat_id as chat_id, o.id as id FROM orders as o INNER JOIN clients as c ON c.id = o.client_id WHERE o.id = '".$order_id."'";
	$sql = $this->db->query($sql);
	$client = mysqli_fetch_all($sql, MYSQLI_BOTH)[0];
	if($client['chat_id']){
		$close_type = '';
		switch ($status) {
			case 'string:4':
				$close_type = ' был отменен';
				break;
			case 'string:5':
				$close_type = ' был отменен без возврата';
				break;
			case 'string:6':
				$close_type = ' был отменен с возвратом';
				break;
		}
		$text = "Ваш заказ №".$client['id'].$close_type;
		$this->send_tg_message($text, $client['chat_id']);
	}
}

public function send_notif_payment($order_id){
	$sql = "SELECT c.chat_id as chat_id, o.coast as coast FROM orders as o INNER JOIN clients as c ON o.client_id = c.id WHERE o.id = '".$order_id."' ";
	$sql = $this->db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH)[0];
	if($sql['chat_id'] != ''){
		$text = "**Напоминаем об оплате**\n\n";
		$text .= "Вы оформляли заказ №".$order_id." на сайте Dogcamping.ru\n";
		$text .= "Вам нужно оплатить ".(String)((Int)$sql['coast']-5000)." рублей до ";
		$text = "Напоминаем об обязательной предоплате вашего заказа в размере ".$sql['coast'];
		$this->send_tg_message($text, $sql['chat_id']);
	}
}
public function send_contact_email($email, $name, $city, $text2){
	$text = "Новое сообщение с Dogcamping.ru \n";
	$text .= "Имя: ".$name."\n";
	$text .= "Email: ".$email."\n";
	$text .= "Город: ".$city."\n";
	$text .= "Сообщение: ".$text2;
	$sql = "SELECT email FROM settings";
	$sql = $this->db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH)[0];
	$email = $sql['email'];
	$this->send_mail_message("Новое сообщение с сайта Dogcamping", $text,$email );
}
public function send_close_payment_date($order_id){
	$sql = "SELECT c.chat_id as chat_id FROM orders as o INNER JOIN clients as c ON c.id = o.client_id WHERE o.id = '".$order_id."'";
	$sql = $this->db->query($sql);
	$sql = mysqli_fetch_all($sql, MYSQLI_BOTH)[0];
	$text = "**Ваш заказ №".$order_id." на сайте Dogcamping.ru отменен**\n";
	$text .= "Причина: истек срок оплаты";
	$chat_id = $sql['chat_id'];
	$this->send_tg_message($text, $chat_id);
}
}