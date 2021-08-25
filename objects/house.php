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
	public $desc_seo;
	public $price;
	public $place_count;
	private $db;
	function __construct($id='', $exist=false, $name='', $class='', $camp='', $photo=array(), $description='', $keywords='', $desc_seo='', $price='', $place_count=''){
		$this->db = new Database();
		$this->db->getConnection();
		if($exist){
			$sql = "SELECT h.id as id, h.class as class, h.kamp as camp, h.name as name, h.description as description, h.keywords as keywords, h.desc_seo, h.price as price, h.place_count as place_count, c.name as class_name, cam.name as camp_name FROM houses as h INNER JOIN classes AS c ON c.id = h.class INNER JOIN camps AS cam ON cam.id = h.kamp WHERE h.id = '".$id."'";
			$sql = $this->db->query($sql);
			$sql = mysqli_fetch_all($sql, MYSQLI_BOTH)[0];
			$this->id = $id;
			$this->class = $sql['class'];
			$this->camp = $sql['camp'];
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
			$sql = "INSERT INTO `houses` (`id`, `class`, `kamp`, `name`, `description`, `keywords`, `desc_seo`, `price`, `place_count`) VALUES (NULL, '".$class."', '".$camp."', '".$name."', '".$description."', '".$keywords."', '".$desc_seo."', '".$price."', '".$place_count."')";
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
		$sql = "UPDATE `houses` SET `desc_seo` = '".$this->desc_seo."',`description` = '".$this->description."',`title` = '".$this->title."',`class` = '".$this->class."',`kamp` = '".$this->camp."',`place_count` = '".$this->place_count."', `keywords` = '".$this->keywords."',`price` = '".$this->price."' WHERE `houses`.`id` = ".$this->id;
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

}

?>