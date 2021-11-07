<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();
if(isset($_GET['move'])){

if($_GET['move'] == 'del'){
  del_trainer($_GET['id']);
}

if($_GET['move'] == 'del2'){
$train = new Training($_GET['id']);
$train->delete();
}

}
$title = "Таблица тренеров";
include_once("../header.php");
 ?>

 <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Таблица тренеров</h1>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>
  <a href="add_worker.php" class="ml-3 mb-3 btn btn-primary">
      Добавить тренера
    </a>
      <a href="add_train.php" class="ml-3 mb-3 btn btn-primary">
      Добавить тренировку
    </a>
 <a href="trainings_stat.php" class="ml-3 mb-3 btn btn-primary">
    Посмотреть статистику
      </a>

    <!-- Main content -->
    <section ng-app="orders" ng-controller="ordersCtrl" class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <!-- /.card-header -->
              <div class="card-body">
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>ФИО</th>
                    <th>Управление</th>
                  </tr>
                  </thead>
                  <tbody>
                    <?php 
                    foreach (get_trainers() as $order) {
                       ?>
                  <tr>
                    <td><?=$order['id']?></td>
                    <td><?=$order['fio']?></td>
                    <td>
                      <div class="row">
<!--                         <div class="col-4 text-center"><a href="order.php?id=<?=$order['id']?>" class="btn"><i class="fas fa-eye"></i></a></div>
 -->                        <div class="col-4 text-center"><a href="trainings.php?move=del&id=<?=$order['id']?>" class="btn"><i class="fas fa-trash-alt"></i></a></div>
                        <div class="col-4 text-center"><a href="edit_worker.php?id=<?=$order['worker_id']?>" class="btn"><i class="fas fa-edit"></i></a></div>
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
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <form action="?move=edit" method="POST">
            <input type="hidden" name="id" value="{{now_id}}">
          <select class="form-control" ng-model="now" name="status" id="" ng-options="status.id as status.title for status in all">
          </select>
          <button class="btn btn-block btn-lg btn-success mt-4" type="submit">Изменить</button>
        </form>
        </div>
      </div>
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
  <script src="../js/bower_components/angular/angular.js"></script>

<script type="text/javascript" src="dist/js/orders.js"></script>
<!-- Page specific script -->
<script>
  console.log($('#example2'));
 $(function () {
    $("#example1").DataTable({
      "responsive": true, "lengthChange": false, "autoWidth": false,
      "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
  });
</script>
</body>
</html>

