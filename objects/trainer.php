<?php 
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");

class Trainer{
	public $fio;
	public $id;
	public $photo;
	private $db;

	function __construct($id='', $exist=false, $fio='', $photo=''){
		$this->db = new Database();
		$this->db->getConnection();
		if($exist){
			$this->id = $id;
			$sql = "SELECT * FROM trainer WHERE id = '".$id."'";
			$sql = $this->db->query($sql);
			$sql = mysqli_fetch_all($sql, MYSQLI_BOTH)[0];
			$this->fio = $sql['fio'];
			$this->photo = $sql['photo'];
		}else{
			$sql = "INSERT INTO `trainer` (`id`, `fio`, `photo`) VALUES (NULL, '".$fio."', '".$photo."')";
			$sql = $this->db->query($sql);
			$last_id = 'SELECT MAX(`id`) FROM `trainer`';
			$last_id = $this->db->query($last_id);
			$last_id = ( int ) mysqli_fetch_all($last_id, MYSQLI_ASSOC)[0]["MAX(`id`)"];
			$this->id= $last_id;
			$this->fio = $fio;
			$this->photo = $photo;
		}
		$this->db->close();
	}
		public function update()
	{
		$this->db->getConnection();
		$sql = "UPDATE `trainer` SET 'fio' = '".$this->fio."', 'photo' = '".$this->photo."' WHERE id = '".$this->id."'";
		$this->db->query($sql);
		$this->db->close();
	}
}

?>