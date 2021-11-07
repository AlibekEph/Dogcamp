<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();

$title = "Статистика домиков";
include_once("../header.php") ?>
<style>
  table td, table tr{
    padding:0 !important;
    cursor: pointer;
  }
</style>

<div ng-app="Stat" ng-controller="statCtrl">
       <div class="modal fade" id="modal-info" style="padding-right: 16px; display: block;width: 0;height: 0;" aria-modal="true" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content bg-info">
        <div class="modal-header">
          <h4 class="modal-title">{{modal_val[0][1]}} {{month[modal_val[0][0].substr(1).split(' ')[0]]}} {{modal_val[0][0].substr(1).split(' ')[1]}}</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body" style="overflow-y:scroll;max-height:300px">
            <div ng-repeat="(order, houses) in modal_val[1]">
                  <p ng-repeat="hou in houses track by $index">{{hou}}</p>
                  <a style="color: #fff" href="<?=PROTOCOL?>://<?=DOMAIN?>/admin/orders/order.php?id={{order}}"><h5>ID {{order}}</h5></a>
                  <hr style="border-top: 3px solid rgba(0,0,0,.3)">
            </div>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>

<div>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <!-- /.card-header -->
              <div class="card-body">
                <table class="table" border=1 >
                  <tr>
                    <th>Месяцы</th>
                    <th ng-repeat="(monthss, _) in result">{{month[monthss.substr(1).split(' ')[0]]}} {{monthss.substr(1).split(' ')[1]}}</th>
                  </tr>

                  <tr ng-repeat="day_num in days" >
                  <td>{{day_num}}</td>
                  <td class='text-center'  ng-repeat="(monthss, val) in result" ng-class="{'bg-yellow': have_houses(result[monthss][day_num])}" ng-click="open_modal(result[monthss][day_num], [monthss, day_num])" >
                        {{have_houses(result[monthss][day_num])? 'бронь' : ''}}
                  </td>
                  </tr>

                  
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
<!-- Page specific script -->
            <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=60e34a808bfdf75dabfab6de" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

            <script src="../../js/bower_components/angular/angular.js"></script>

<script type="text/javascript" src="../dist/js/stat.js"></script>

<script>
  $(function () {
    $("#example1").DataTable({
      "responsive": true, "lengthChange": false, "autoWidth": false,
      "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
  });
</script>
<script>
  //КОД ДЛЯ МОДАЛОК
  let closeBtn = document.querySelector("#modal-info button[aria-label='Close']")
  let modal = document.querySelector("#modal-info")
  closeBtn.addEventListener("click",  function (){
    modal.classList.remove("show")
    modal.style.width = 0
    modal.style.height = 0
  })

  //КОНЕЦ КОДА ДЛЯ МОДАЛОК

  // let cells = document.querySelectorAll(".table td")
  // for(let cell of cells){
  //   if(cell.classList.contains("bg-yellow") || cell.innerHTML.toLowerCase() === "бронь"){
  //     cell.addEventListener("click", function(){
  //       modal.classList.add("show")
  //       modal.style.width = 100 + "%"
  //       modal.style.height = 100 + "%"
  //     })
  //   }
  // }

</script>
</body>
</html>
