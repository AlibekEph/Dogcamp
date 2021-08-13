<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();

if(isset($_GET['move'])){

if($_GET['move'] == 'del'){
  del_subscription($_GET['id']);
}
}
include_once("header.php") ?>



  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper ml-0">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Таблица абонементов</h1>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>
    <a href="add_subscription.php" class="ml-3 mb-3 btn btn-primary">
      Добавить абонемент
    </a>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <!-- /.card-header -->
              <div class="card-body">
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>Название</th>
                    <th>Тип</th>
                    <th>Количество</th>
                    <th>Скидка</th>
                    <th>Действия</th>
                  </tr>
                  </thead>
                  <tbody>
                    <?php 
                    foreach (get_subscription() as $sub) {
                       ?>
                  <tr>
                    <td><?=$sub['title']?></td>
                    <td><?=$sub['service_title']?> <?=time_type_to_srt($sub['time_type'])?></td>
                    <td><?=$sub['count']?></td>
                    <td><?=$sub['sale']?></td>
                    <td>
                      <div class="row">
                        <div class="col-4 text-center"><a href="subscriptions.php?move=del&id=<?=$sub['id']?>" class="btn"><i class="fas fa-trash-alt"></i></a></div>
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
<script src="plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- DataTables  & Plugins -->
<script src="plugins/datatables/jquery.dataTables.min.js"></script>
<script src="plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
<script src="plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
<script src="plugins/datatables-buttons/js/dataTables.buttons.min.js"></script>
<script src="plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></script>
<script src="plugins/jszip/jszip.min.js"></script>
<script src="plugins/pdfmake/pdfmake.min.js"></script>
<script src="plugins/pdfmake/vfs_fonts.js"></script>
<script src="plugins/datatables-buttons/js/buttons.html5.min.js"></script>
<script src="plugins/datatables-buttons/js/buttons.print.min.js"></script>
<script src="plugins/datatables-buttons/js/buttons.colVis.min.js"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="dist/js/demo.js"></script>
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
