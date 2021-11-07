<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();
$flag = 0;
if(isset($_GET['move'])){

if($_GET['move'] == 'del'){
  del_order($_GET['id']);
  $flag = 1;
}
if($_GET['move'] == 'edit'){
  change_order($_POST['status'], $_POST['id']);
  $flag = 2;
}
if ($_GET['move'] == 'notif') {
  $falg = 2;
  change_notif_date($_POST['id'], $_POST['notif_date']);
  change_payment_date($_POST['id'], $_POST['payment_date']);
}
}
$title = "Таблица заказов";
include_once("../header.php");
if($flag == '1'){
  ?>
<div class="alert alert-success alert-dismissible">
  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
  <h5><i class="icon fas fa-check"></i> Заказ успешно удален!</h5>
</div>
  <?
}
if($flag == '2'){
  ?>
<div class="alert alert-success alert-dismissible">
  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
  <h5><i class="icon fas fa-check"></i> Заказ успешно сохранен!</h5>
</div>
  <?php
}
 ?>




    <!-- Main content -->
    <section ng-app="orders" ng-controller="ordersCtrl" class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <!-- /.card-header -->
              <div class="card-body" style="overflow-x:scroll">
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>ФИО заказчика</th>
                    <th>Тел. заказчика</th>
                    <th>Кол-во человек</th>
                    <th>Email заказчика</th>
                    <th>Стоимость заказа</th>
                    <th>Дата оформления</th>
                    <th>Отметки о согласии</th>
                    <th>Тип заказа</th>
                    <th>Статус заказа</th>
                    <th>Дата отправки уведомлений</th>
                    <th>Дата отмены заказа за истечение срока опаты</th>
                    <th style="display: none;">Детали заказа</th>
                    <th>Управление</th>
                  </tr>
                  </thead>
                  <tbody>
                    <?php 
                    foreach (get_orders() as $order) {
                       ?>
                  <tr>
                    <td><?=$order['id']?></td>
                    <td><?=$order['surname']." ".$order['name']?></td>
                    <td><?=$order['phone']?></td>
                    <td><?=$order['person_count']?></td>
                    <td><?=$order['email']?></td>
                    <td><?=$order['coast']?></td>
                    <td><?=$order['date']?></td>
                    <td><?php if($order['promotions_and_so_on'] == '1'){ echo "Все";} else{ echo "Только обязательные";} ?></td>
                    <td><?=$order['is_wholesaler'] ? 'Оптовик' : 'Розничный'?></td>
                    <td><?=$order['status']?></td>
                    <td><?=$order['notification_date']?></td>
                    <td><?=$order['payment_date']?></td>
                    <td style="display:none"><?=get_order_list($order['id'])?></td>
                    <td>
                      <div class="row">
                        <div class="col-3 text-center"><a href="order.php?id=<?=$order['id']?>" class="btn"><i class="fas fa-eye"></i></a></div>
                        <div class="col-3 text-center"><button class="btn"><i ng-click="open_notif_modal(<?=$order['id']?>, '<?=$order['notification_date']?>')" class="fas fa-paper-plane"></i></button></div>
                        <div class="col-3 text-center"><button class="btn"><i ng-click="open_change_status(<?=$order['id']?>)" class="fas fa-edit"></i></button></div>
                        <div class="col-12 text-center mt-3"><a href="orders.php?move=del&id=<?=$order['id']?>" class="btn btn-danger" style="font-size:12px">Удалить заказ</a></div>
                      </div>
                    </td>

                  </tr>
                  <?php } ?>
                  </tbody>

                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
      <div class="modal fade " id="modal-info" style="padding-right: 16px; display: block;width: 0;height: 0;" aria-modal="true" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content bg-info">
        <div class="modal-header">
          <h4 class="modal-title">Изменение статуса заказа</h4>
          <button ng-click="close_change_status()" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <form action="?move=edit" method="POST">
            <input type="hidden" name="id" value="{{now_id}}">
          <select class="form-control" ng-model="now" name="status" id="" ng-options="status.id as status.title for status in all ">
          </select>
          <button class="btn btn-block btn-lg btn-success mt-4" type="submit">Изменить</button>
        </form>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <div class="modal fade" id="modal-info2" style="padding-right: 16px; display: block; width: 0%; height: 0%;" aria-modal="true" role="dialog">
    <div class="modal-dialog">
      <form action="?move=notif" method="POST" class="modal-content bg-info">
        <div class="modal-header">
          <input type="hidden" name="id" value="{{now_date_id}}">
          <h4 class="modal-title ng-binding">Дата отправки уведомления</h4>
          <button type="button" ng-click="close_date()" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
        <label>Дата отправки уведомления</label>
    <input type="date" name ="notif_date" class="form-control w-100"> 
    <label>Срок истечения оплаты</label>
        <input type="date" name ="payment_date" class="form-control w-100"> 

    <button type="submit" class="btn btn-success w-100 mt-3">Сохранить</button>
    
</div>
      </form>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
    </section>
    <!-- /.content -->
  <!-- /.content-wrapper -->
  <footer class="main-footer text-center ml-0">
    <div class="d-sm-block pt-4 pb-4">
      <b>ГОРЫНЫЧ</b>
    </div>
  </footer>

  <!-- /.control-sidebar -->
</div>

<!-- ./wrapper -->

<!-- jQuery -->
<script src="../plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- DataTables  & ../plugins -->
<script src="../plugins/datatables/jquery.dataTables.min.js"></script>
<script src="../plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="../plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
<script src="../plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
<script src="../plugins/datatables-buttons/js/dataTables.buttons.min.js"></script>
<script src="../plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></script>
<script src="../plugins/jszip/jszip.min.js"></script>
<script src="../plugins/pdfmake/pdfmake.min.js"></script>
<script src="../plugins/pdfmake/vfs_fonts.js"></script>
<script src="../plugins/datatables-buttons/js/buttons.html5.min.js"></script>
<script src="../plugins/datatables-buttons/js/buttons.print.min.js"></script>
<script src="../plugins/datatables-buttons/js/buttons.colVis.min.js"></script>
<!-- AdminLTE App -->
<script src="../dist/js/adminlte.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="../dist/js/demo.js"></script>
  <script src="../../js/bower_components/angular/angular.js"></script>

<script type="text/javascript" src="../dist/js/orders.js"></script>
<!-- Page specific script -->
<script>
  console.log($('#example2'));
 $(function () {
    $("#example1").DataTable({
      "responsive": false, "lengthChange": false, "autoWidth": false,
      "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
       "order": [[ 0, "desc" ]]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
  });
</script>
</body>
</html>

