<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();
include_once("header.php") ?>

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
                    <th>Тип</th>
                    <th>Название</th>
                    <th>Дата начала</th>
                    <th>Дата окончания</th>
                    <th>Цена</th>
                    <th>Скидка</th>
                  </tr>
                  </thead>
                  <tbody>
                    <?php 
                    foreach (get_items_to_order($_GET['id']) as $item) {
                       ?>
                  <tr>
                    <td><?=$item['type']?></td>
                    <td><?=$item['title']?></td>
                    <td><?=$item['date_start']?></td>
                    <td><?=$item['date_end']?></td>
                    <td><?=$item['coast']?></td>
                    <td><?=$item['sale']?></td>

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