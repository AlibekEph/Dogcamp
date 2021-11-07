<?php 
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");

class Trainer{
	public $fio;
	public $id;
	public $photo;
	public $worker_id;
	public $email;
	public $tg;

	private $db;

	function __construct($id='', $exist=false, $fio='', $tg='', $email=''){
		$this->db = new Database();
		$this->db->getConnection();
		if($exist){
			$this->id = $id;
			$sql = "SELECT * FROM workers WHERE trainer_id = '".$id."'";
			$sql = $this->db->query($sql);
			$sql = mysqli_fetch_all($sql, MYSQLI_BOTH)[0];
			$this->fio = $sql['fio'];
			$this->email = $sql['email'];
			$this->tg = $sql['tg_username'];
			$this->worker_id = $sql['id'];
		}else{
			$sql = "INSERT INTO `trainer` (`id`, `fio`, `photo`) VALUES (NULL, '".$fio."', '')";
			$sql = $this->db->query($sql);

			$last_id = 'SELECT MAX(`id`) FROM `trainer`';
			$last_id = $this->db->query($last_id);
			$last_id = ( int ) mysqli_fetch_all($last_id, MYSQLI_ASSOC)[0]["MAX(`id`)"];
			$sql = "INSERT INTO `workers` (`id`, `fio`, `tg_username`, `chat_id`, `email`, `trainer_id`, `worker_type`) VALUES (NULL, '".$fio."', '".$tg."','', '".$email."', '".(String)$last_id."', '2')";
			$sql = $this->db->query($sql);
			$this->id= $last_id;
			$this->fio = $fio;
		}
		$this->db->close();
	}
		public function update()
	{
		$this->db->getConnection();
		$sql = "UPDATE `trainer` SET fio = '".$this->fio."' WHERE id = '".$this->id."'";
		$this->db->query($sql);
		$sql = "UPDATE `workers` SET fio = '".$this->fio."', email = '".$this->email."', tg_username = '".$this->tg."' WHERE trainer_id = '".$this->id."'";
		$this->db->query($sql);
		$this->db->close();
	}
}

?>