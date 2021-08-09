<?php
include_once ($_SERVER['DOCUMENT_ROOT'].'/config/config.php');
class Database {

    // укажите свои учетные данные базы данных 
    public $conn;

    // получаем соединение с БД 
    public function getConnection(){

        $this->conn = null;

            $this->conn = mysqli_connect(DB_ADRESS, DB_USER, DB_PASSWORD, DB);
             mysqli_set_charset($this->conn, "utf8mb4");

        return $this->conn;
    }
    public function query($sql){
        return mysqli_query($this->conn, $sql);
    }

    public function close(){
    	mysqli_close($this->conn);
    }
}
?>