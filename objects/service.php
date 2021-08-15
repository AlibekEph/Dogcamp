<?php
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");

class Service{
	public $id;
	public $date_from;
	public $date_to;
	public $time_type;
	public $title;
	public $type;
	public $type_title;
	private $db;
	function __construct($id='', $date_from, $date_to, $time_type){
		$this->db = new Database();
		$this->db->getConnection();
		$this->id = $id;
		$sql = "SELECT s.id as id, s.type as type, s.title as title, t.title as type_title FROM services as s INNER JOIN service_type as t ON t.id = s.type WHERE s.id = '".$this->id."'";
		$sql = $this->db->query($sql);
		$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
		$this->title = $sql['title'];
		$this->type = $sql['type'];
		$this->type_title = $sql['type_title'];
		$this->time_type = $time_type;
		$this->db->close();
	}

}
