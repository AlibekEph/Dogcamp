<?php
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");

class Service{
	public $id;
	public $date_from;
	public $date_to;
	public $time_type;
	public $title;
	public $type;
	public $price;
	public $order_id;
	public $coach;
	public $type_title;
	private $db;
	function __construct($id='', $date_from, $date_to, $time_type, $order_id, $coach='NULL'){
		$this->db = new Database();
		$this->db->getConnection();
		$this->order_id = $order_id;
		$this->date_to;
		$this->coach = $coach;
		$this->date_from;
		$this->id = $id;
		$sql = "SELECT s.id as id, s.type as type, s.title as title, t.title as type_title FROM services as s INNER JOIN service_type as t ON t.id = s.type WHERE s.id = '".$this->id."'";
		$sql = $this->db->query($sql);
		$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
		$this->title = $sql['title'];
		$this->type = $sql['type'];
		$this->type_title = $sql['type_title'];
		$this->time_type = $time_type;
		$this->db->close();
		$this->get_price();
	}

	public function get_price(){
		$config = array('type' => $this->type, 'time_type' => $this->time_type);
		$this->db->getConnection();
		$config = json_encode($config)
		$sql = "SELECT * FROM pricelist WHERE config = '".$config."'";
		$sql = $this->db->query($sql);
		$this->price = $sql['price'];
	}




}
