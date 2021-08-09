<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();
if(isset($_GET['move'])){

if($_GET['move'] == 'del'){
  del_order($_GET['id']);
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
            <h1>Таблица аренды</h1>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

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
                    <th>id Заказа</th>
                    <th>ФИ заказчика</th>
                    <th>Email</th>
                    <th>Телефон</th>
                    <th>Стоимость</th>
                    <th>Количество человек</th>
                    <th>Дата</th>
                    <th>Оптовик</th>
                    <th>Действия</th>
                  </tr>
                  </thead>
                  <tbody>
                    <?php 
                    foreach (get_orders() as $order) {
                       ?>
                  <tr>
                    <td><?=$order['id']?></td>
                    <td><?=$order['surname']." ".$order['name']?></td>
                    <td><?=$order['email']?></td>
                    <td><?=$order['phone']?></td>
                    <td><?=$order['coast']?></td>
                    <td><?=$order['person_count']?></td>
                    <td><?=$order['date']?></td>
                    <td><?=$order['id']?></td> 
                    <td><?=$order['is_wholesaler'] ? 'Да' : 'Нет'?></td>                   
                    <td>
                      <div class="row">
                        <div class="col-4 text-center"><a href="orders?move=del&id=<?=$order['id']?>" class="btn"><i class="fas fa-trash-alt"></i></a></div>
                        <div class="col-4 text-center"><a href="order.php?id=<?=$order['id']?>" class="btn"><i class="fas fa-eye"></i></button></div>
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

