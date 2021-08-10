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
                    <th>Название</th>
                    <th>Тип аренды</th>
                    <th>Дата начала</th>
                    <th>Дата окончания</th>
                    <th>ID заказа</th>
                  </tr>
                  </thead>
                  <tbody>
                    <?php 
                    foreach (get_orders_to_service($_GET['id']) as $item) {
                       ?>
                  <tr>
                    <td><?=$item['title']?></td>
                    <td><?=$item['trainer_id'] == 'NULL' ? 'Обычная аренда' : 'Аренда с тренером ('.$item['fio'].')'?></td>
                    <td><?=$item['date_from']?></td>
                    <td><?=$item['date_to']?></td>
                    <td><a href="order.php?id=<?=$item['order_id']?>"><?=$item['order_id']?></a></td>

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