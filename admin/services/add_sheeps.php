<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();
$title = "Добавить аренду овец";
include_once("../header.php");

?>



    <!-- Main content -->
    <form method="POST" action="" class="content">
      <div class="row">
        <div class="col-12">
          <div class="card card-primary">
            <form action="#" method="POST">
              <div class="card-body">
                <div class="form-group">
                  <label>Способ бронирования</label>
                  <select name="title" type="text" class="form-control"></select>
                </div>
                <div class="form-group">
                  <label>Дата</label>
                  <input type="date" class="form-control">
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-6 col-12">
                      <p>Время от:</p>
                      <select name="" id="" class="form-control"></select>
                    </div>
                    <div class="col-md-6 col-12">
                      <p>Время до:</p>
                      <select name="" id="" class="form-control"></select>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label>Место для тренировок</label>
                  <select name="" id="" class="form-control"></select>
                </div>

                <div class="row">
                  <div class="col-md-6 col-12">
                    <button class="btn btn-block btn-info btn-lg mt-3 mb-3">Добавить еще один день</button>
                  </div>
                  <div class="col-md-6 col-12">
                    <button class="btn btn-block btn-danger btn-lg mt-3 mb-3">Удалить</button>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-block btn-success btn-lg mt-3 mb-3">Сохранить</button>
                  </div>
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


</script>


</body>
</html>
