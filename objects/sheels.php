<?php 
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/service.php");
class Sheels extends Service{
	
	public function get_coast(){
			if($this->sale != '' && (Int)$this->sale != 0){
			$res = $this->sale;

			}else{ 
			$res = $this->price;
			}
			return $res;
	}
	public function to_book($order_id){

				$date_start =  $this->date_from." 00:00:00";
				$date_end =   $this->date_from." 23:59:59";
				$sheeps_sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`) VALUES (NULL, '".$order_id."', '4', '".$date_start."', '".$date_end."', NULL, '".$this->get_coast()."')";
			return $sheeps_sql;

	}


}

 ?>