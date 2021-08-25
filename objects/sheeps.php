<?php 
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/service.php");
class Sheeps extends Service{
	public function get_coast(){
		if($this->time_type == '0'){
			$from_date = strtotime($this->date_to);
			$to_date = strtotime($this->date_from);
			$hours = round(($from_date - $to_date/3600, 1);
			$res = $hours * $this->price;
		}else{
			$res = $price;
		}
		return $res;
	}
	public function insert(){
		if($this->time_type == '1'){
				$date_start =  $this->date_from;
				$date_end =  date("Y-m-d", strtotime("+7 days", strtotime($date_start)))." 00:00:00";
				$sheeps_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$this->order_id."', '".$this->id."', '".$date_start."', '".$date_end."', NULL, '".$this->get_coast()."')";
			}
			else if($this->time_type == '0'){
				$date_start =  $this->date_from;
				$date_end =  $this->date_to;
				$sheeps_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$this->order_id."', '".$this->id."', '".$date_start."', '".$date_end."', NULL, '".$this->get_coast()."')";
			}
			else{
				$date_start =  $this->date_from;
				$date_end =  date("Y-m-d", strtotime($date_start))." 23:59:00";
				$sheeps_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$this->order_id."', '".$this->id."', '".$date_start."', '".$date_end."', ".$this->coach.", '".$this->get_coast()."')";
			}
			$this->db->query($sheeps_sql);
	}


}

 ?>