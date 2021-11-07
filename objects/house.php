<?php
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");

class House{
	public $id;
	public $class;
	public $camp;
	public $title;
	public $photo = array();
	public $description;
	public $keywords;
	public $dis;
	public $camp_name;
	public $class_name;
	public $present = false;
	public $sale;
	public $start_date;
	public $end_date;
	public $desc_seo;
	public $price;
	public $place_count;
	public $full_title;
	private $db;
	function __construct($id='', $exist=false, $name='', $class='', $camp='', $photo=array(), $description='', $keywords='', $desc_seo='', $price='', $place_count='', $sale=''){
		$this->db = new Database();
		$this->db->getConnection();
		if($exist){
			$sql = "SELECT h.id as id, h.class as class_id, h.kamp as camp, h.name as name, h.description as description, h.keywords as keywords, h.desc_seo, h.price as price, h.place_count as place_count, c.name as class_name, h.sale as sale, cam.name as camp_name FROM houses as h INNER JOIN classes AS c ON c.id = h.class INNER JOIN camps AS cam ON cam.id = h.kamp WHERE h.id = '".$id."'";
			$sql = $this->db->query($sql);
			$sql = mysqli_fetch_all($sql, MYSQLI_BOTH)[0];
			$this->id = $id;
			$this->class_id = $sql["class_id"];
			$this->camp = $sql['camp'];
			$this->sale = $sql['sale'];
			$this->camp_name = $sql['camp_name'];
			$this->class_name = $sql['class_name'];
			$this->title = $sql['name'];
			$this->description = $sql['description'];
			$this->keywords = $sql['keywords'];
			$this->desc_seo = $sql['desc_seo'];
			$this->price = $sql['price'];
			$this->place_count = $sql['place_count'];
			$sql2 = "SELECT * FROM photo_to_house WHERE house_id = '".$this->id."' ORDER BY pos";
			$sql2 = $this->db->query($sql2);
			$this->photo = mysqli_fetch_all($sql2, MYSQLI_BOTH);
			$this->db->close();
		}else{
			$sql = "INSERT INTO `houses` (`id`, `class`, `kamp`, `name`, `description`, `keywords`, `desc_seo`, `price`, `place_count`, `sale`) VALUES (NULL, '".$class."', '".$camp."', '".$name."', '".$description."', '".$keywords."', '".$desc_seo."', '".$price."', '".$place_count."', '".$sale."')";
			$sql = $this->db->query($sql);
			$last_id = 'SELECT MAX(`id`) FROM `houses`';
			$last_id = $this->db->query($last_id);
			$last_id = ( int ) mysqli_fetch_all($last_id, MYSQLI_ASSOC)[0]["MAX(`id`)"];
			$this->id= $last_id;
			$counter = 1;
			foreach ($photo as $ph) {
				$sql2 = "INSERT INTO `photo_to_house` (`id`, `name`, `pos`, `house_id`) VALUES (NULL, '".$ph."', '".(String)$counter."', '".$last_id."')";
				$this->db->query($sql2);
				$counter += 1;
			}
			$this->db->close();
		}

	}

	public function update()
	{
		$this->db->getConnection();
		$sql = "UPDATE `houses` SET `desc_seo` = '".$this->desc_seo."',`description` = '".$this->description."',`name` = '".$this->title."',`class` = '".(String)$this->class_id."',`kamp` = '".$this->camp."',`place_count` = '".$this->place_count."', `keywords` = '".$this->keywords."',`price` = '".$this->price."', `sale` = '".$this->sale."' WHERE `houses`.`id` = ".$this->id;
		$this->db->query($sql);
		$sql2 = "DELETE FROM photo_to_house WHERE house_id = '".$this->id."'";
		$this->db->query($sql2);
		$counter = 1;
		foreach ($this->photo as $ph) {
			$sql3 = "INSERT INTO `photo_to_house` (`id`, `name`, `pos`, `house_id`) VALUES (NULL, '".$ph."', '".(String)$counter."', '".$this->id."')";
			$this->db->query($sql3);
			$counter += 1;
		}
		$sql2 = "SELECT * FROM photo_to_house WHERE house_id = '".$this->id."' ORDER BY id";
			$sql2 = $this->db->query($sql2);
			$this->photo = mysqli_fetch_all($sql2, MYSQLI_BOTH);
		$this->db->close();
	}

	public function set_dis($dis){
		$this->dis = $dis;
	}
	public function set_dates($date_start, $date_end){
		$this->start_date = $date_start;
		$this->end_date = $date_end;
	}

	public function set_title($title2){
		$this->full_title = $title2;
	}

	public function to_book($order_id, $sale='0'){
		$st_data = strtotime($this->start_date." 00:00:00");
		$end_date = strtotime($this->end_date." 00:00:00");
		$days_count = round(( $end_date - $st_data )/3600/24);
		/*$st_date = DateTime::createFromFormat('Y-m-d',$this->start_date);
		$end_date = DateTime::createFromFormat('Y-m-d', $this->start_date);
		$days_count = (Int)$st_date->diff($end_date)->format('%a'); */
		if($this->sale != '' && $this->sale != '0'){
			$coast = $days_count * $this->sale;
		}else{
			$coast = $days_count * $this->price;
		}
		if($this->present){
			$coast = 0;
			$sale = 100;
		}
		$sql = "INSERT INTO `house_to_orders` (`id`, `order_id`, `house_id`, `from_order`, `to_order`, `coast`, `sale`) VALUES (NULL, '".$order_id."', '".$this->id."', '".$this->start_date."', '".$this->end_date."', '".$coast."', '".$sale."')";
		return $sql;
	}

	public function set_presents(){
		$this->present = true;
	}

	public function get_coast(){
			$st_date = DateTime::createFromFormat('Y-m-d', $this->start_date);
		$end_date = DateTime::createFromFormat('Y-m-d',$this->end_date);
		$days_count = (Int)$st_date->diff($end_date)->format('%a'); 
		if($this->sale != '' && $this->sale != '0'){
			$coast = $days_count * $this->sale;
		}else{
			$coast = $days_count * $this->price;
		}
		if($this->present){
			$coast = 0;
		}
		return $coast;
	}

	public function get_unic_code(){
		return (Int)((String)$this->id . (String)$this->class_id);
	}

}

?>