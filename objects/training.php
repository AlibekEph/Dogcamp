<?php
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");

class Training{
	public $id;
	public $date_from;
	public $order_id;
	public $date_to;
	public $title;
	public $trainer;
	private $db;

	function __construct($id='', $exist=true){
$this->db = new Database();
		$this->db->getConnection();
		if($exist){
			$sql = "SELECT sto.trainer as trainer, sto.date_from as date_from, sto.date_to as date_to, s.title as title, sto.order_id as order_id FROM services_to_order as sto INNER JOIN services_to_order as sto2 ON sto.service_id2 = sto2.id INNER JOIN services as s ON s.id = sto2.service_id WHERE sto.id = '".$id."'";
			$sql = $this->db->query($sql);
			$sql = mysqli_fetch_all($sql, MYSQLI_BOTH)[0];
			$this->id = $id;
			$this->order_id = $sql['order_id'];
			$this->trainer = $sql['trainer'];
			$this->title = $sql['title'];
			$this->date_from = $sql['date_from'];
			$this->date_to = $sql['date_to'];
		}

	}

	public function update(){
		$sql = "UPDATE services_to_order SET trainer = '".$this->trainer."' WHERE id = '".$this->id."'";
		$this->db->query($sql);
	}
	public function delete(){
		$sql = "DELETE FROM services_to_order WHERE id = '".$this->id."'";
		$this->db->query($sql);
	}
}