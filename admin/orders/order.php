<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();
$title = "Состав заказа";
include_once("../header.php");
 ?>

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
                    <th>Состав заказа</th>
                    
                  </tr>
                  </thead>
                  <tbody>
                    <?php
                    $counter = 1;
                    $sum = 0; 
                    foreach (get_items_to_order($_GET['id']) as $item) {
                   if($item['coast'] != 'В подарок'){
                      $sum += $item['coast'];
                    }
                       ?>
                  <tr>
                    <td><?=$counter?>. <?=$item['title']?><br>
                      <?php
                    if ($item['type'] != 'Аренда дома'){
                       ?>
                      Вид оплаты: <?=$item['time_type']?><br>
                       <?php 
                     }else{
                       ?>
                    Цена: <?=$item['coast']?><br>
                    <?php 
                  }if($item['time_type'] == '' || $item['time_type'] == 'Аренда на неделю'){
                    ?>
                   Дата начала: <?=$item['date_start']?><br>
                    Дата завершения: <?=$item['date_end']?><br>
                    <?php 
                  }else{
                    ?>
                    Дата: <?=$item['date_start']?><br>
                    <?php
                  }
                    if ($item['type'] == 'Аренда дома'){
                      ?>
                    Количество мест: <?=$item['place_count']?><br>
                      <?php
                    }else{
                      if($item['time_type'] == 'Почасовая аренда'){
                     ?>
                    Время начала: <?=$item['time_start']?><br>
                      Время завершения: <?=$item['time_end']?><br>
                    <?php 
                    }
                                        if($item['type'] != 'Снаряды'){
                    ?>
                    Поле: <?=$item['type']?><br>
                    <?php 
                                        }
                    ?>
                    Стоимость: <?=(Int)$item['coast']?> руб
                    <?php
                  }
                    ?>
                  </tr>
                <?php
                $counter +=1;
                 } ?>
                <!-- <tr>
                    <td>Итог</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>></td>
                    <td></td>
                  </tr> -->
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

</body>
</html>