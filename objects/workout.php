<?php 
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/service.php");
class Workout extends Service{
	public $service_id2;
	public function get_coast(){
		if($this->sale != '' && (Int)$this->sale != 0){
						$price = $this->sale;
					}
					else{
						$price = $this->price;

					}
    	$from_date = strtotime($this->date_from." ".$this->time_start.":00:00");
		$to_date = strtotime($this->date_from." ".$this->time_end.":00:00");
		$hours = round(( $to_date - $from_date )/3600, 1);
		$res = $price * $hours;
		return $res;
	}

	public function set_service_id2($id){
		$this->service_id2 = $id;
	}

	public function to_book($order_id){

				$date_start =  $this->date_from." ".$this->time_start.":00:00";
				$date_end =  $this->date_from." ".$this->time_end.":00:00";
				$sheeps_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`, `service_id2`) VALUES (NULL, '".$order_id."', '".$this->id."', '".$date_start."', '".$date_end."', '".$this->coach."', '".$this->get_coast()."', '".$this->service_id2."')";
				return $sheeps_sql;

	}


}

 ?>