<?php 
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/service.php");
class Workout extends Service{
	public $coach;
	public function get_coast(){
		$res = $price;
		return $res;
	}

	public function set_coach($id){
		$this->coach = $id;
	}

	public function insert(){
				$date_start =  $this->date_from;
				$date_end =  date("Y-m-d", strtotime("+7 days", strtotime($date_start)))." 00:00:00";
				$sheeps_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$this->order_id."', '".$this->id."', '".$date_start."', '".$date_end."', '".$this->coach."', '".$this->get_coast()."')";
			$this->db->query($sheeps_sql);
	}


}

 ?>