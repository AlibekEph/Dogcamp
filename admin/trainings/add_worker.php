<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();

  
  $title = "Добавить работника";
include_once("../header.php");
if(isset($_POST['fio'])){
    if($_POST['worker_type'] == '2'){
   $triner = new Trainer('', false, $_POST['fio'], $_POST['tg'], $_POST['email']);
    }else{
      $worker = new Worker('', false, $_POST['fio'], $_POST['tg'], $_POST['email'], $_POST['worker_type']);
    }

    ?>
<div class="alert alert-success alert-dismissible">
  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
  <h5><i class="icon fas fa-check"></i> Работник успешно добавлен!</h5>
</div>
    <?php
  }
 ?>


<div class="content-wrapper ml-0">
    <!-- Main content -->
    <form method="POST" action="" class="content">
      <div class="row">
        <div class="col-12">
          <div class="card card-primary">
            <form action="#" method="POST">
              <div class="card-body">
              	 <div class="form-group">
                  <label>Тип</label>
                  <select name="worker_type" class="form-control" style="width: 100%;">
                    <?php
                    foreach (get_workers_type() as $camp) {
                      ?>
                    <option value="<?=$camp['id']?>"><?=$camp['title']?></option>
                      <?
                    }
                     ?>
                    </select>
                </div>
                <div class="form-group">
                  <label>ФИО</label>
                  <input name="fio" type="text" class="form-control">
                </div>
                 <div class="form-group">
                  <label>Telegram</label>
                  <input name="tg" type="text" placeholder="IvanIvanov" class="form-control">
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input name="email" type="text" class="form-control">
                </div>
                <div class="col-12 mb-3">
                <button type="submit" class="btn btn-block btn-success btn-lg" name="add_button">Добавить</button>
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
