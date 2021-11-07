<?php 
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();
if(isset($_POST['sheep_hour'])){
$sql = "UPDATE pricelist SET price = '".$_POST['sheep_hour']."', sale = '".$_POST['sale_sheep_hour']."' WHERE config = '".'{"type":"2","time_type":"0"}'."'";
$db->query($sql);
$sql = "UPDATE pricelist SET price = '".$_POST['sheep_week']."', sale = '".$_POST['sale_sheep_week']."' WHERE config = '".'{"type":"2","time_type":"1"}'."'";
$db->query($sql);
$sql = "UPDATE pricelist SET price = '".$_POST['sheep_train']."', sale = '".$_POST['sale_sheep_train']."' WHERE config = '".'{"type":"2","time_type":"2"}'."'";
$db->query($sql);
$sql = "UPDATE pricelist SET price = '".$_POST['manezh_hour']."', sale = '".$_POST['sale_manezh_hour']."' WHERE config = '".'{"type":"1","time_type":"0"}'."'";
$db->query($sql);
$sql = "UPDATE pricelist SET price = '".$_POST['manezh_day']."', sale = '".$_POST['sale_manezh_day']."' WHERE config = '".'{"type":"1","time_type":"1"}'."'";
$db->query($sql);
$sql = "UPDATE pricelist SET price = '".$_POST['sheels']."', sale = '".$_POST['sale_sheels']."' WHERE config = '".'{"type":"4","time_type":"0"}'."'";
$db->query($sql);
$sql = "UPDATE pricelist SET price = '".$_POST['training']."', sale = '".$_POST['sale_training']."' WHERE config = '".'{"type":"5","time_type":"0"}'."'";
$db->query($sql);

}
include_once("../header.php");
$sql = "SELECT * FROM pricelist ";
$sql = $db->query($sql);
$sql = mysqli_fetch_all($sql, MYSQLI_BOTH);
$prices = [];
for ($i=0; $i < count($sql); $i++) { 
  array_push($prices, array('id' => $sql[$i]['id'], 'price' => $sql[$i]['price'],'sale' => $sql[$i]['sale'], 'type'=>json_decode($sql[$i]['config'],true)));
}
foreach ($prices as $price) {
  switch ($price['type']['type']) {
    case '2':
      switch ($price['type']['time_type']) {
        case '0':
          $sheep_hour = $price['price'];
          $sale_sheep_hour = $price['sale'];
          break;
        case '1':
          $sheep_week = $price['price'];
          $sale_sheep_week = $price['sale'];

          break;
        case '2':
          $sheep_train = $price['price'];
          $sale_sheep_train = $price['sale'];

          break;
        
      }
      break;
     case '1':
      switch ($price['type']['time_type']) {
        case '0':
          $manezh_hour = $price['price'];
          $sale_manezh_hour = $price['sale'];

          break;
        case '1':
          $manezh_day = $price['price'];
          $sale_manezh_day = $price['sale'];

          break;
        
      }
    break;
    case '4':
      $sheels = $price['price'];
          $sale_sheels = $price['sale'];

      break;
    case '5':
     $training = $price['price'];
          $sale_training = $price['sale'];

    break;
  }

}


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
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Редактировать цены</h1>
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
                  <label>Почасовое бронирование для самостоятельных тренировок </label>
                  <input type="number" name='sheep_hour' value="<?=$sheep_hour?>" class="form-control">
                  <label>Почасовое бронирование для самостоятельных тренировок СО СКИДКОЙ </label>
                  <input type="number" name='sale_sheep_hour' value="<?=$sale_sheep_hour?>" class="form-control mb-5">
                </div>
                   <div class="form-group">
                  <label>Бронирование на неделю для самостоятельных тренировок </label>
                  <input type="number" name='sheep_week' value="<?=$sheep_week?>" class="form-control">
                  <label>Бронирование на неделю для самостоятельных тренировок СО СКИДКОЙ </label>
                  <input type="number" name='sale_sheep_week' value="<?=$sale_sheep_week?>" class="form-control mb-5">
                </div>
                 <div class="form-group">
                  <label>Бронирование для занятий с тренером</label>
                  <input type="number" name='sheep_train' value="<?=$sheep_train?>" class="form-control">
                  <label>Бронирование для занятий с тренером СО СКИДКОЙ </label>
                  <input type="number" name='sale_sheep_train' value="<?=$sale_sheep_train?>" class="form-control mb-5">
                </div>
                 <div class="form-group">
                  <label>Аренда манежа на час</label>
                  <input type="number" name='manezh_hour' value="<?=$manezh_hour?>" class="form-control">
                  <label>Аренда манежа на час СО СКИДКОЙ </label>
                  <input type="number" name='sale_manezh_hour' value="<?=$sale_manezh_hour?>" class="form-control mb-5">
                </div>
                 <div class="form-group">
                  <label>Аренда манежа на день</label>
                  <input type="number" name='manezh_day' value="<?=$manezh_day?>" class="form-control">
                  <label>Аренда манежа на день СО СКИДКОЙ </label>
                  <input type="number" name='sale_manezh_day' value="<?=$sale_manezh_day?>" class="form-control mb-5">
                </div>
                 <div class="form-group">
                  <label>Аренда снарядов</label>
                  <input type="number" name='sheels' value="<?=$sheels?>" class="form-control">
                  <label>Аренда снарядов СО СКИДКОЙ </label>
                  <input type="number" name='sale_sheels' value="<?=$sale_sheels?>" class="form-control mb-5">
                </div>
                 <div class="form-group">
                  <label>Почасовая запись на занятие с тренером </label>
                  <input type="number" name='training' value="<?=$training?>" class="form-control">
                  <label>Почасовая запись на занятие с тренером СО СКИДКОЙ </label>
                  <input type="number" name='sale_training' value="<?=$sale_training?>" class="form-control mb-5">
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
