<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();
$title = "Редактировать тренировку";
include_once("../header.php");
$train = new Training($_GET['id']);
if(isset($_POST['trainer'])){
  $train->trainer = $_POST['trainer'];
  $train->update();
}
?>



    <!-- Main content -->
    <form method="POST" action="" class="content">
      <div class="row">
        <div class="col-12">
          <div class="card card-primary">
            <form action="" method="POST">
              <div class="card-body">
                <div class="form-group">
                  <label>Тренер</label>
                  <select name="trainer" type="text" class="form-control">
                    <?php
                    foreach (get_trainers() as $trainer) {
                      if($trainer['id'] != $train->trainer){

                        ?>
                      <option value="<?=$trainer['id']?>"><?=$trainer['fio']?></option>
                        <?php
                      }else{
                      ?>
                      <option value="<?=$trainer['id']?>" selected><?=$trainer['fio']?></option>
                       <?
                       }

                     } 
                    ?>
                  </select>
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-6 col-12">
                      <p>Время от: <?=$train->date_from?></p>
                       
                    </div>
                    <div class="col-md-6 col-12">
                      <p>Время до: <?=$train->date_to?></p>
                    </div>
                  </div>
                </div>


                <div class="row">
                  <div class="col-md-6 col-12">
                    <a href="trainings.php?move=del2&id=<?=$train->id?>" class="btn btn-block btn-danger btn-lg mt-3 mb-3">Удалить</a>
                  </div>
                  <div class="col-md-6 col-12">
                    <button type="submit" class="btn btn-block btn-success btn-lg mt-3 mb-3">Сохранить</button>
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
<script src="../plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="../plugins/dropzone/min/dropzone.min.js"></script>
<!-- AdminLTE App -->
<script src="../dist/js/adminlte.min.js"></script>


<script src="../plugins/select2/js/select2.full.min.js"></script>


</script>


</body>
</html>
