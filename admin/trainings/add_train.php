<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();
$title = "Добавить тренировку";
include_once("../header.php");
if(isset($_POST['training'])){
  $train = explode('|',$_POST['training']);
  $service_id = $train[0];
  $date = substr($train[1],0, 11);
  $date_from = $date." ".$_POST['from_time'];
  $date_to = $date." ".$_POST['to_time'];
  $trainer_id = $train[2];
  $time_from = (Int)substr($_POST['from_time'], 0, 2);
  $time_to = (Int)substr($_POST['to_time'], 0, 2);
  $price = "SELECT * FROM pricelist WHERE id = 7";
  $price = $db->query($price);
  $price = (Int)mysqli_fetch_all($price, MYSQLI_BOTH)[0]['price'];
  $coast = ($time_to - $time_from) * $price;
  $sql = "INSERT INTO `services_to_order` (`id`, `order_id`, `service_id`, `date_from`, `date_to`, `trainer`, `coast`, `service_id2`) VALUES (NULL, '".$_POST['order']."', '7', '".$date_from."', '".$date_to."', '".$trainer_id."', '".$coast."', '".$service_id."')";
  $db->query($sql);
  $last_id = 'SELECT MAX(`id`) FROM `services_to_order`';
  $last_id = $db->query($last_id);
  $last_id = ( int ) mysqli_fetch_all($last_id, MYSQLI_ASSOC)[0]["MAX(`id`)"];
  $training = "SELECT sto.date_from as date_from, sto.date_to as date_to, sto.trainer as trainer_id, w.tg_username as tg, w.chat_id as chat_id, w.fio as fio, w.email as email, s.title as service_title, c.name as client_name, c.surname as client_surname, c.patronymic as client_patronymic FROM services_to_order as sto INNER JOIN workers as w ON w.trainer_id = sto.trainer INNER JOIN orders as o ON o.id = sto.order_id INNER JOIN clients as c ON c.id = o.client_id INNER JOIN services_to_order as sto2 ON sto2.id = sto.service_id2 INNER JOIN services as s ON s.id = sto2.service_id  WHERE sto.order_id = '".$_POST['order']."' AND sto.trainer != '' AND sto.service_id2 != 0 AND sto.id = '".$last_id."'";
  $training = $db->query($training);
  $training = mysqli_fetch_all($training, MYSQLI_BOTH)[0];
  $notif = new Notifications();
  $client_fio = $training['client_surname']." ".$training['client_name']." ".$training['client_patronymic'];
    $text = get_training_text($training['date_from'], $training['date_to'], $client_fio, $training['service_title'], $_POST['order']);
    if($training['chat_id'] != ''){
      $notif->send_tg_message($text, $training['chat_id']);
    }
  ?>
<div class="alert alert-success alert-dismissible">
  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
  <h5><i class="icon fas fa-check"></i> Запись на тренировку успешно добавлена!</h5>
</div>
  <?php
}
?>



    <!-- Main content -->
    <form method="POST" action="" class="content">
      <div class="row">
        <div class="col-12">
          <div class="card card-primary">
            <form action="#" method="POST">
              <div class="card-body">
                <div class="form-group">
                  <label>Занятие</label>
                  <select name="training" type="text" class="form-control">
                    <?php 
                    foreach (get_all_trainings() as $train) {
                      ?>
                      <option value="<?=$train['id']?>|<?=$train['date_from']?>|<?=$train['trainer_id']?>">Занятие с тренером <?=$train['fio']?> <?=substr($train['date_from'],0, 11)?></option>
                      <?php
                    }
                    ?>
                  </select>
                </div>
                <div class="form-group">
                  <label>Заказ</label>
                  <select name="order" type="text" class="form-control">
                    <?php 
                    foreach (get_orders_train() as $order) {
                      ?>
                      <option value="<?=$order['id']?>">Заказ  №<?=$order['id']?> <?=$order['surname']?> <?=$order['name']?></option>
                      <?php
                    }
                    ?>
                  </select>
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-6 col-12">
                      <p>Время от:</p>
                      <select name="from_time" id="" class="form-control">
                        <option label="9:00" value="09:00:00" selected="selected">9:00</option>
                        <option label="10:00" value="10:00:00">10:00</option>
                        <option label="11:00" value="11:00:00">11:00</option>
                        <option label="12:00" value="12:00:00">12:00</option>
                        <option label="13:00" value="13:00:00">13:00</option>
                        <option label="14:00" value="14:00:00">14:00</option>
                        <option label="15:00" value="15:00:00">15:00</option>
                        <option label="16:00" value="16:00:00">16:00</option>
                        <option label="17:00" value="17:00:00">17:00</option>
                        <option label="18:00" value="18:00:00">18:00</option>
                        <option label="19:00" value="19:00:00">19:00</option>
                      </select>
                    </div>
                    <div class="col-md-6 col-12">
                      <p>Время до:</p>
                      <select name="to_time" id="" class="form-control">
                        <option label="10:00" value="10:00:00">10:00</option>
                        <option label="11:00" value="11:00:00">11:00</option>
                        <option label="12:00" value="12:00:00">12:00</option>
                        <option label="13:00" value="13:00:00">13:00</option>
                        <option label="14:00" value="14:00:00">14:00</option>
                        <option label="15:00" value="15:00:00">15:00</option>
                        <option label="16:00" value="16:00:00">16:00</option>
                        <option label="17:00" value="17:00:00">17:00</option>
                        <option label="18:00" value="18:00:00">18:00</option>
                        <option label="19:00" value="19:00:00">19:00</option>
                        <option label="20:00" value="20:00:00">20:00</option>

                      </select>
                    </div>
                  </div>
                </div>


                <div class="row">
                  <div class="col-12">
                    <button type="submit" class="btn btn-block btn-success btn-lg mt-3 mb-3">Добавить</button>
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
