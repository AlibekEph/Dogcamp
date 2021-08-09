<?php
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");

class Service{
	public $id;
	public $title;
	public $type;
	public $gaps = array();
	private $db;
	function __construct($id='', $exist=false, $title='', $type=''){
		$this->db = new Database();
		$this->db->getConnection();
		if($exist){
			$this->id = $id;
			$sql = "SELECT * FROM services WHERE id = '".$this->id."'";
			$sql = $this->db->query($sql);
			$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
			$this->title = $sql['title'];
			$this->type = $sql['type'];
		}else{
			$sql = "INSERT INTO `services` (`id`, `type`, `title`) VALUES (NULL, '".$type."', '".$title."')";
			$this->db->query($sql);
			$last_id = 'SELECT MAX(`id`) FROM `services`';
			$last_id = $this->db->query($last_id);
			$last_id = ( int ) mysqli_fetch_all($last_id, MYSQLI_ASSOC)[0]["MAX(`id`)"];
			$this->id= $last_id;
			$this->title = $title;
			$this->type = $type;
		}
	}

}
