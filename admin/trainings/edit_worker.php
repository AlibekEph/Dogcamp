<?php 
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();

include_once("../header.php");
$sql = "SELECT * FROM workers WHERE id = '".$_GET['id']."' ";
$sql = $db->query($sql);
$sql = mysqli_fetch_all($sql, MYSQLI_BOTH)[0];
if($sql['trainer_id'] != ''){
$worker = new Trainer($sql['trainer_id'], true);
}else{
$worker = new Worker($_GET['id'], true);

}

if (isset($_POST['fio'])) {
  $worker->fio = $_POST['fio'];
  $worker->email = $_POST['email'];
  $worker->tg = $_POST['tg'];
  $worker->update();
  ?>
<div class="alert alert-success alert-dismissible">
  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
  <h5><i class="icon fas fa-check"></i> Работник успешно изменен!</h5>
</div>
  <?php
}
 ?>
<div style="display: none" id="house_id"><?=$house->id?></div>
  
<style>
.preview img{
      max-width: 300px;

}
.server_img {
  display: none;
}
</style>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper ml-0">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Редактировать объект</h1>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <form method="POST" action="" class="content">
      <div class="row">
        <div class="col-12">
          <div class="card card-primary">
            <form action="#" method="POST">
              <div class="card-body">
                <div class="form-group">
                  <label>ФИО</label>
                  <input type="text" name='fio' value="<?=$worker->fio?>" class="form-control">
                </div>
                   <div class="form-group">
                  <label>Email</label>
                  <input type="text" name='email' value="<?=$worker->email?>" class="form-control">
                </div>
                 <div class="form-group">
                  <label>Telegram</label>
                  <input type="text" name='tg' value="<?=$worker->tg?>" class="form-control">
                </div>
                <div class="col-12 mb-3">
                <button type="submit" class="btn btn-block btn-success btn-lg" name="add_button">Сохранить</button>
               </div>

              </div>

            </div>
          <!-- /.card -->
          </form>
        </div>

      </div>
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->


  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->
<!-- jQuery -->
<script src="../plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="../plugins/dropzone/min/dropzone.min.js"></script>
<!-- AdminLTE App -->
<script src="../dist/js/adminlte.min.js"></script>


<script src="../plugins/select2/js/select2.full.min.js"></script>





</body>
</html>
