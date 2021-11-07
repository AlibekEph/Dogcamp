<?php 
include_once($_SERVER['DOCUMENT_ROOT'] . "/objects/database.php");

class Worker{
	public $fio;
	public $id;
	public $photo;
	public $email;
	public $tg;
	public $worker_type;
	private $db;

	function __construct($id='', $exist=false, $fio='', $tg='', $email='', $worker_type=''){
		$this->db = new Database();
		$this->db->getConnection();
		if($exist){
			$this->id = $id;
			$sql = "SELECT * FROM workers WHERE id = '".$id."'";
			$sql = $this->db->query($sql);
			$sql = mysqli_fetch_all($sql, MYSQLI_BOTH)[0];
			$this->fio = $sql['fio'];
			$this->email = $sql['email'];
			$this->tg = $sql['tg_username'];
			$this->worker_type = $sql['worker_type'];
		}else{

			
			$sql = "INSERT INTO `workers` (`id`, `fio`, `tg_username`, `chat_id`, `email`, `trainer_id`, `worker_type`) VALUES (NULL, '".$fio."', '".$tg."','', '".$email."', NULL, '".$worker_type."')";
		   	$sql = $this->db->query($sql);
			$last_id = 'SELECT MAX(`id`) FROM `workers`';
			$last_id = $this->db->query($last_id);
			$last_id = ( int ) mysqli_fetch_all($last_id, MYSQLI_ASSOC)[0]["MAX(`id`)"];
			$this->id= $last_id;
			$this->fio = $fio;
			$this->tg = $tg;
			$this->email = $email;
			$this->worker_type = $worker_type;
		}
		$this->db->close();
	}
		public function update()
	{
		$this->db->getConnection();
		$sql = "UPDATE `workers` SET fio = '".$this->fio."', email = '".$this->email."', tg_username = '".$this->tg."' WHERE id = '".$this->id."'";
		$this->db->query($sql);
		$this->db->close();
	}
}

?>