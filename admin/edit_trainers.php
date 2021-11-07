<?php 
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();

include_once("header.php");
$house = new Trainer($_GET['id'], true);

if (isset($_POST['fio'])) {
  $house->fio = $_POST['fio'];
  $house->update();
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
                  <input type="text" name='fio' value="<?=$house->fio?>" class="form-control">
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
<script src="plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="plugins/dropzone/min/dropzone.min.js"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.min.js"></script>


<script src="plugins/select2/js/select2.full.min.js"></script>





</body>
</html>
