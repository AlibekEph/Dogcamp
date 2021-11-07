<?php 
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();
$title = "Прочие настройки";
include_once("../header.php");

if(isset($_POST['close_site'])){
  $sql = "UPDATE settings SET close_site = '".$_POST['close_site']."', email = '".$_POST['email']."' WHERE id = 1";
  $db->query($sql);
}

$sql = "SELECT * FROM settings";
$sql = $db->query($sql);
$sql = mysqli_fetch_all($sql, MYSQLI_BOTH)[0];
$email =$sql['email'];
$close_site = $sql['close_site'];

 ?>

  
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


    <!-- Main content -->
    <form method="POST" action="" class="content">
      <div class="row">
        <div class="col-12">
          <div class="card card-primary">
            <form action="#" method="POST">
              <div class="card-body">
                <div class="form-group">
                  <label>Закрыть сайт на технические работы </label>
                  <select name='close_site' >
                    <option value="1" <?php if($close_site == '1'){echo 'selected';} ?>> Закрыть</option>
                    <option value="0" <?php if($close_site == '0'){echo 'selected';} ?>> Открыть</option>

                  </select>
                </div>
                 <div class="form-group">
                  <label>Email для формы обратной связи</label>
                  <input type="text" name='email' value="<?=$email?>" class="form-control">
                </div>
                 
                 
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
