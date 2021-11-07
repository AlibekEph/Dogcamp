<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");

    include('../vendor/autoload.php'); //Подключаем библиотеку
    use Telegram\Bot\Api; 
 $telegram = new Api('2053126329:AAHPzbcM6JuVAnai_P4d4sqYG0RH7NX1JJY'); //Устанавливаем токен, полученный у BotFather
    $result = $telegram -> getWebhookUpdates(); //Передаем в переменную $result полную информацию о сообщении пользователя
    
    $text = $result["message"]["text"]; //Текст сообщения
    $chat_id = $result["message"]["chat"]["id"]; //Уникальный идентификатор пользователя
    $name = $result["message"]["from"]["username"]; //Юзернейм пользователя
    $db = new Database();
    $link = $db->getConnection();
    if($text){
         if ($text == "/start") {
            $reply = "Добро пожаловать в бота!";
            $telegram->sendMessage([ 'chat_id' => $chat_id, 'text' => $reply ]);
            $users = "SELECT * FROM clients WHERE tg_username = '".$name."'";
            $users = $db->query($users);
            $users = mysqli_fetch_all($users, MYSQLI_BOTH);

            foreach($users as $user){
            	if($user['chat_id'] != $chat_id){
            		$set_chat_id = "UPDATE clients SET chat_id = '".$chat_id."' WHERE id = '".$user['id']."'";
            		$set_chat_id = $db->query($set_chat_id);
            		$last_order = "SELECT * FROM orders WHERE client_id = '".$user['id']."' ORDER BY id DESC LIMIT 1";
            		$last_order = $db->query($last_order);
            		$last_order = mysqli_fetch_all($last_order, MYSQLI_BOTH);
            		if (count($last_order) != 0) {
            			$last_order = $last_order[0];
            			$text = get_order_text($last_order['id']);
            			if($text != ''){
						$telegram->sendMessage([ 'chat_id' => $chat_id, 'text' => $text ]);
            			}
            		}
            	}
            }
            $workers = "SELECT * FROM workers WHERE tg_username = '".$name."'";
            $workers = $db->query($workers);
            $workers = mysqli_fetch_all($workers, MYSQLI_BOTH);
            foreach ($workers as $worker) {
           
            	if($worker['chat_id'] != $chat_id){
					$set_chat_id = "UPDATE workers SET chat_id = '".$chat_id."' WHERE id = '".$worker['id']."'";
					$db->query($set_chat_id);
            	}
            }
        }
    }else{
    	$telegram->sendMessage([ 'chat_id' => $chat_id, 'text' => "Отправьте текстовое сообщение." ]);
    }
?>