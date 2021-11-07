<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();

include_once("../header.php");
if(isset($_POST['title'])){
    $sql = "UPDATE services SET type = '".$_POST['type']."', title = '".$_POST['title']."' WHERE id = '".$_GET['id']."'";
    $db->query($sql);
?>
<div class="alert alert-success alert-dismissible">
  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
  <h5><i class="icon fas fa-check"></i> Сервис успешно отредактирован!</h5>
</div>
<?php
  }

$service = "SELECT * FROM services WHERE id = '".$_GET['id']."'";
$service = $db->query($service);
$service = mysqli_fetch_all($service, MYSQLI_BOTH)[0];
 ?>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper ml-0">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Редактировать сервис</h1>
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
                  <label>Название</label>
                  <input name="title" value="<?=$service['title']?>" type="text" class="form-control">
                </div>
                <div class="form-group">
                  <label>Тип</label>
                  <select name="type" class="form-control" style="width: 100%;">
                    <option value="1">Манеж</option>
                    <option value="2" <?php if($service['type'] == '2') {echo 'selected';}?>>Поле</option>
                  </select>
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
