<?php
include($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");
if($_GET['move'] == '1'){
	if(!isset($_GET['id'])){
	$last_id = 'SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_NAME = "houses" AND table_schema = "'.DB.'";';
	$last_id = mysqli_query($db, $last_id);
	$last_id = ( int ) mysqli_fetch_all($last_id, MYSQLI_ASSOC)[0]["AUTO_INCREMENT"];
	$last_id = $last_id;
	}
	else{
		$last_id = $_GET['id'];
	}
	// Каталог, в который мы будем принимать файл:
	$uploaddir = '../sources/houses/'.$last_id."/";
	 if (!file_exists($uploaddir)) { mkdir($uploaddir, 0777, true); } 

	$uploadfile = $uploaddir.basename($_FILES['file']['name']);

	// Копируем файл из каталога для временного хранения файлов:
	if (copy($_FILES['file']['tmp_name'], $uploadfile))
	{
	echo "<h3>Файл успешно загружен на сервер</h3>";
	}
	else { echo "<h3>Ошибка! Не удалось загрузить файл на сервер!</h3>"; exit; }

	// Выводим информацию о загруженном файле:
	echo "<h3>Информация о загруженном на сервер файле: </h3>";
	echo "<p><b>Оригинальное имя загруженного файла: ".$_FILES['file']['name']."</b></p>";
	echo "<p><b>Mime-тип загруженного файла: ".$_FILES['file']['type']."</b></p>";
	echo "<p><b>Размер загруженного файла в байтах: ".$_FILES['file']['size']."</b></p>";
	echo "<p><b>Временное имя файла: ".$_FILES['file']['tmp_name']."</b></p>";
}
if($_GET['move'] == '2'){
$last_id = $_GET['id'];
$uploaddir = '../sources/houses/'.$last_id."/";
	 if (!file_exists($uploaddir)) { mkdir($uploaddir, 0777, true); } 

	$uploadfile = $uploaddir.basename($_FILES['file']['name']);

	// Копируем файл из каталога для временного хранения файлов:
	if (copy($_FILES['file']['tmp_name'], $uploadfile))
	{
	echo "<h3>Файл успешно загружен на сервер</h3>";
	}
	else { echo "<h3>Ошибка! Не удалось загрузить файл на сервер!</h3>"; exit; }

	// Выводим информацию о загруженном файле:
	echo "<h3>Информация о загруженном на сервер файле: </h3>";
	echo "<p><b>Оригинальное имя загруженного файла: ".$_FILES['file']['name']."</b></p>";
	echo "<p><b>Mime-тип загруженного файла: ".$_FILES['file']['type']."</b></p>";
	echo "<p><b>Размер загруженного файла в байтах: ".$_FILES['file']['size']."</b></p>";
	echo "<p><b>Временное имя файла: ".$_FILES['file']['tmp_name']."</b></p>";
}
?>