<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Админ-панель</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../plugins/fontawesome-free/css/all.min.css">
  <!-- DataTables -->
  <link rel="stylesheet" href="../plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
  <link rel="stylesheet" href="../plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
  <link rel="stylesheet" href="../plugins/datatables-buttons/css/buttons.bootstrap4.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../dist/css/adminlte.min.css">
</head>
<body class="hold-transition sidebar-mini">
<div class="wrapper">
  <!-- Navbar -->
  
  <!-- /.navbar -->

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper ml-0">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1><?php if(isset($title)){echo $title;} else {echo "Админ-панель";} ?></h1>
          </div>
        </div>
        <div class="row mt-5 mb-5">
          <div class="col-lg-2 col-md-3 col-sm-6 col-12 text-center mt-3 mb-3">
            <a href="<?=PROTOCOL?>://<?=DOMAIN?>/admin/orders/orders.php" class="btn btn-primary w-100">Управление заказами</a>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-6 col-12 text-center mt-3 mb-3">
            <a href="<?=PROTOCOL?>://<?=DOMAIN?>/admin/houses/houses.php" class="btn btn-primary w-100">Настройки домиков</a>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-6 col-12 text-center mt-3 mb-3">
            <a href="<?=PROTOCOL?>://<?=DOMAIN?>/admin/services/services.php" class="btn btn-primary w-100">Настройки услуг</a>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-6 col-12 text-center mt-3 mb-3">
            <a href="<?=PROTOCOL?>://<?=DOMAIN?>/textolite" class="btn btn-primary w-100">Настройки страниц</a>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-6 col-12 text-center mt-3 mb-3">
            <a href="<?=PROTOCOL?>://<?=DOMAIN?>/admin/trainings/peoples.php" class="btn btn-primary w-100">Настройки уведомлений</a>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-6 col-12 text-center mt-3 mb-3">
            <a href="<?=PROTOCOL?>://<?=DOMAIN?>/admin/trainings/trainings.php" class="btn btn-primary w-100">Управление тренировками</a>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-6 col-12 text-center mt-3 mb-3">
            <a href="<?=PROTOCOL?>://<?=DOMAIN?>/admin/settings/settings.php" class="btn btn-primary w-100">Прочие настройки</a>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-6 col-12 text-center mt-3 mb-3">
            <a href="<?=PROTOCOL?>://<?=DOMAIN?>" class="btn btn-primary w-100">Перейти на сайт</a>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>
