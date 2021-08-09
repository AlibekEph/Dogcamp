 <?php 
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
proove_auth();

include_once("header.php");
$house = new House($_GET['id'], true);

if (isset($_POST['title'])) {
  $house->title = $_POST['title'];
  $house->price = $_POST['price'];
  $house->camp = $_POST['camp'];
  $house->photo = $_POST['images'];
  $house->description = $_POST['description'];
  $house->keywords = $_POST['keywords'];
  $house->desc_seo = $_POST['desc_seo'];
  $house->place_count = $_POST['place_count'];
  $house->class = $_POST['class'];
  $house->update();

}
 ?>
<div style="display: none" id="house_id"><?=$house->id?></div>
  
<style>
.preview img{
      max-width: 300px;

}
.server_img {
  display: none;
}
</style>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper ml-0">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Редактировать объект</h1>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <form method="POST" action="" class="content">
      <div class="row">
        <div class="col-12">
          <div class="card card-primary">
            <form action="#" method="POST">
              <div class="card-body">
                <div class="form-group">
                  <label>Название</label>
                  <input type="text" name='title' value="<?=$house->title?>" class="form-control">
                </div>
                <div class="form-group">
                  <label>Цена (РУБ)</label>
                  <input type="number" name="price" value="<?=$house->price?>" class="form-control">
                </div>
                <div class="form-group">
                  <label>Количество мест</label>
                  <input type="text" name="place_count" value="<?=$house->place_count?>" class="form-control">
                </div>
                <div class="form-group">
                  <label>Кемпинг</label>
                  <select class="form-control" name="camp" style="width: 100%;">
                    <?php
                    foreach (get_camps() as $camp) {
                      if($camp['id'] == $house->camp){
                        ?>
                      <option value="<?=$camp['id']?>" selected><?=$camp['name']?></option>

                        <?php
                      }else{
                      ?>
                    <option value="<?=$camp['id']?>"><?=$camp['name']?></option>
                      <?
                    }}
                     ?>
                  </select>
                </div>
                <div class="form-group">
                  <label>Категория</label>
                  <select class="form-control" style="width: 100%;">
                  <?php
                    foreach (get_classes() as $class) {
                      if($class['id'] == $house->class){
                        ?>
                      <option value="<?=$class['id']?>" selected><?=$class['name']?></option>

                        <?php
                      }else{
                      ?>
                    <option value="<?=$class['id']?>"><?=$class['name']?></option>
                      <?
                    }}
                     ?>
                  </select>
                </div>

<?php foreach ($house->photo as $image): ?>


    <div class="server_img" id="server_img_<?= $image['pos'] ?>"><?= $image['name'] ?></div>

<?php endforeach; ?>
                <div class="form-group">
                  <label>Фотографии</label>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="card card-default">
                        <div class="card-body">
                          <div id="actions" class="row">
                            <div class="col-lg-6">
                              <div class="btn-group w-100">
                                <span class="btn btn-success col fileinput-button">
                                  <i class="fas fa-plus"></i>
                                  <span>Добавить файлы</span>
                                </span>
                                
                                <button type="reset" class="btn btn-warning col cancel">
                                  <i class="fas fa-times-circle"></i>
                                  <span>Отменить</span>
                                </button>
                              </div>
                            </div>
                            <div class="col-lg-6 d-flex align-items-center">
                              <div class="fileupload-process w-100">
                                <div id="total-progress" class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                                  <div class="progress-bar progress-bar-success" style="width:0%;" data-dz-uploadprogress></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="table table-striped files" id="previews">
                            <div id="template" class="row mt-2">
                              <div class="col-auto">
                                  <span class="preview"><img src="data:," alt="" data-dz-thumbnail /></span>
                              </div>
                              <div class="col d-flex align-items-center">
                                  <p class="mb-0">
                                    <span class="lead"  data-dz-name></span>
                                    <input type="hidden" class="hidden-input-image" name="images[]" data-dz-name>
                                    (<span data-dz-size></span>)
                                  </p>
                                  <strong class="error text-danger" data-dz-errormessage></strong>
                              </div>
                              <div class="col-4 d-flex align-items-center">
                                  <div class="progress progress-striped active w-100" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                                    <div class="progress-bar progress-bar-success" style="width:0%;" data-dz-uploadprogress></div>
                                  </div>
                              </div>
                              <div class="col-auto d-flex align-items-center">
                                <div class="btn-group">
                                  <button type="button" class="btn btn-primary start">
                                    <i class="fas fa-upload"></i>
                                    <span>Начать</span>
                                  </button>
                                  <button type="button" data-dz-remove class="btn btn-warning cancel">
                                    <i class="fas fa-times-circle"></i>
                                    <span>Отменить</span>
                                  </button>
                                  <button type="button" data-dz-remove class="btn btn-danger delete">
                                    <i class="fas fa-trash"></i>
                                    <span>Удалить</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- /.card -->
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label>Описание</label>
                  <textarea name="description" class="form-control" cols="30" rows="10"><?=$house->description?></textarea>
                </div>
                <div class="form-group">
                  <label>Ключевые слова через запятую</label>
                  <input name="keywords" type="text" value="<?=$house->keywords?>" class="form-control">
                </div>
                 <div class="form-group">
                  <label>Описание SEO</label>
                  <textarea name="desc_seo" class="form-control" cols="30" rows="10"><?=$house->desc_seo?></textarea>
                </div>
                <div class="col-12 mb-3">
                <button type="submit" class="btn btn-block btn-success btn-lg" name="add_button">Сохраниить</button>
               </div>

              </div>

            </div>
          <!-- /.card -->
          </form>
        </div>

      </div>
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->


  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->
<!-- jQuery -->
<script src="plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="plugins/dropzone/min/dropzone.min.js"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.min.js"></script>


<script src="plugins/select2/js/select2.full.min.js"></script>


<script>
  // DropzoneJS Demo Code Start
  Dropzone.autoDiscover = false

  // Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
  var previewNode = document.querySelector("#template")
  previewNode.id = ""
   var house_id = document.querySelectorAll('#house_id')[0].innerText;

  var previewTemplate = previewNode.parentNode.innerHTML
  previewNode.parentNode.removeChild(previewNode)

  var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
    url: "upload_files.php?move=2&id="+house_id, // Set the url
    thumbnailWidth: 80,
    maxFiles: 12,
    thumbnailHeight: 80,
    parallelUploads: 20,
    previewTemplate: previewTemplate,
    autoQueue: false, // Make sure the files aren't queued until manually added
    previewsContainer: "#previews", // Define the container to display the previews
    clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
  })
 var path = document.querySelectorAll('.server_img').length;
//Сколько картинок столько и циклов
for (i = 1; i <= path; i++) {

  //Имя каждой
  console.log( document.querySelectorAll('#server_img_' + i)[0]);
  var img_name = document.querySelectorAll('#server_img_' + i)[0].innerText,
  mockFile = { name: img_name};

//Добавляем файл drop-zon через событие
myDropzone.emit("addedfile", mockFile);
console.log(mockFile);
mockFile.previewElement.querySelectorAll('.start')[0].style.display = 'none';
mockFile.previewElement.querySelectorAll('.cancel')[0].style.display = 'none';
mockFile.previewElement.querySelectorAll('.progress-striped')[0].style.display = 'none';
mockFile.previewElement.querySelectorAll('.hidden-input-image')[0].value = img_name;

//Делаем превьюху по Url где хранятся загруженные картинки
myDropzone.emit("thumbnail", mockFile, "../sources/houses/" + house_id + "/" + mockFile.name);
myDropzone.emit("complete", mockFile);
}
//Даем статус загруженные
  myDropzone.on("addedfile", function(file) {
    // Hookup the start button
    file.previewElement.querySelector(".start").onclick = function() {
     myDropzone.enqueueFile(file);
     file.previewElement.getElementsByClassName('hidden-input-image')[0].value = file.upload.filename;
     console.log(file.previewElement.getElementsByClassName('hidden-input-image')[0].value); 
   }
  })

  // Update the total progress bar
  myDropzone.on("totaluploadprogress", function(progress) {
    document.querySelector("#total-progress .progress-bar").style.width = progress + "%"
  })

  myDropzone.on("sending", function(file) {
    // Show the total progress bar when upload starts
    document.querySelector("#total-progress").style.opacity = "1"
    // And disable the start button
    file.previewElement.querySelector(".start").setAttribute("disabled", "disabled")
  })

  // Hide the total progress bar when nothing's uploading anymore
  myDropzone.on("queuecomplete", function(progress) {
    document.querySelector("#total-progress").style.opacity = "0"
  })

  // Setup the buttons for all transfers
  // The "add files" button doesn't need to be setup because the config
  // `clickable` has already been specified.
  document.querySelector("#actions .start").onclick = function() {
    myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED))
  }
  document.querySelector("#actions .cancel").onclick = function() {
    myDropzone.removeAllFiles(true)
  }
 
    
    
  // DropzoneJS Demo Code End
</script>


</body>
</html>
