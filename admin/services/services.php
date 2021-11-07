<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();
if(isset($_GET['move'])){

if($_GET['move'] == 'del'){
  del_service($_GET['id']);
}
}
$title="Настройки услуг";
include_once("../header.php");
 ?>



  <!-- Content Wrapper. Contains page content -->
  <div ng-app="Services" ng-controller="ServicesCtrl" class="content-wrapper ml-0">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Таблица сервисов</h1>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>
  <a href="add_service.php" class="ml-3 mb-3 btn btn-primary">
      Добавить сервис
    </a>
     <a href="edit_pricelist.php" class="ml-3 mb-3 btn btn-primary">
      Редактировать прайслист
    </a>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <!-- /.card-header -->
              <div class="card-body">
                <div class="form-group mt-4 mb-4">
                  <label>Показать:</label>
                  <select name="order" ng-model="now_chooses" type="text" class="form-control">
                      <option value="0">Все</option>
                      <option value="2">Поля для теренровок</option>
                      <option value="1">Манежи</option>
                      <option value="4">Снаряды</option>
                  </select>
                </div>
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>id Сервиса</th>
                    <th>Тип</th>
                    <th>Название</th>
                    <th>Действия</th>
                  </tr>
                  </thead>
                  <tbody>
                    <?php 
                    foreach (get_services() as $ser) {
                       ?>
                  <tr ng-if="show_line('<?=$ser['type_id']?>')">
                    <td><?=$ser['id']?></td>
                    <td><?=$ser['type']?></td>
                    <td><?=$ser['title']?></td>      
                    <td>
                      <div class="row">
                        <div class="col-4 text-center"><a href="service_stat.php?id=<?=$ser['id']?>" class="btn"><i class="fas fa-eye"></i></button></div>
                        <div class="col-3 text-center"><a href="edit_service.php?id=<?=$ser['id']?>" class="btn"><i class="fas fa-edit"></i></a></div>
                        <div class="col-4 text-center"><a href="services.php?move=del&id=<?=$ser['id']?>" class="btn"><i class="fas fa-trash-alt"></i></a></div>
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
    </section>
    <!-- /.content -->
  </div>
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

<script type="text/javascript" src="../dist/js/services.js"></script>
<!-- Page specific script -->
<script>
  $(function () {
    $("#example1").DataTable({
      "responsive": true, "lengthChange": false, "autoWidth": false,
      "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
  });
</script>
</body>
</html>

