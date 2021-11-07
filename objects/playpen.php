<?php 
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/service.php");
class Playpen extends Service{
	public function get_coast(){
		if($this->time_type == '0'){
			$from_date = strtotime($this->date_from." ".$this->time_start.":00:00");
			$to_date = strtotime($this->date_from." ".$this->time_end.":00:00");
			$hours = round(( $to_date - $from_date )/3600, 1);
			if($this->sale != '' && (Int)$this->sale != 0){

			$res = $hours * $this->sale;
		}else{
			$res = $hours * $this->price;

		}	
		}else{
			if($this->sale != '' && (Int)$this->sale != 0){
			$res = $this->sale;
		}else{
			$res = $this->price;
		}
		}
		return $res;
	}
	public function to_book($order_id){
		if($this->time_type == '1'){
				$date_start =  $this->date_from." 00:00:00";;
				$date_end = $this->date_from." 23:59:59";

				$sheeps_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$order_id."', '".$this->id."', '".$date_start."', '".$date_end."', NULL, '".$this->get_coast()."')";
			}else{
				$date_start =  $this->date_from." ".$this->time_start.":00:00";
				$date_end =  $this->date_from." ".$this->time_end.":00:00";
				$sheeps_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$order_id."', '".$this->id."', '".$date_start."', '".$date_end."', NULL, '".$this->get_coast()."')";
			}

			return $sheeps_sql;
	}

	public function get_title(){
		return "Аренда манежа с ".$this->date_from." до ".$this->date_to;
	}

}

 ?>