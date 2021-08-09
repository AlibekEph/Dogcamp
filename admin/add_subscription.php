<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();

  if(isset($_POST['title'])){
    $service = explode('_', $_POST['type']);
    $sql = "INSERT INTO `subscription` (`id`, `title`, `service_type`, `time_type`, `count`, `sale`) VALUES (NULL, '".$_POST['title']."', '".$service[0]."', '".$service[1]."', '".$_POST['count']."', '".$_POST['sale']."')";
    $db->query($sql);
  }
include_once("header.php") ;

 ?>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper ml-0">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Добавить объект</h1>
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
                  <input name="title" type="text" class="form-control">
                </div>
                <div class="form-group">
                  <label>Скидка %</label>
                  <input name="sale" type="number" class="form-control">
                </div>
                <div class="form-group">
                  <label>Количество</label>
                  <input name="count" type="number" class="form-control">
                  </div>
                <div class="form-group">
                  <label>Сервис</label>
                  <select name="type" class="form-control" style="width: 100%;">
                    <option value="1_1">Аренда манежа (на день)</option>
                    <option value="2_1">Аренда овец (на неделю)</option>
                    <option value="4_1">Тренировка с тренером</option>
                    <option value="5_1">Санярды (на день)</option>


                  </select>
                </div>
                <div class="col-12 mb-3">
                <button type="submit" class="btn btn-block btn-success btn-lg" name="add_button">Добавить товар</button>
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
