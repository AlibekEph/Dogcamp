<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
$title = "Аренда";
include_once("header.php") ?>
<div ng-app="rentals" ng-controller="rentalsCtrl">
<div class="s1-rentals">
	<div class="container w-container">
   <div class="s1-rentals-wrap">
      <div class="menu-block-riding-hall"><a href="/" class="menu-link">Горыныч</a><a href="/school.php" class="menu-link">Школа</a><a href="/malinovo.php" class="menu-link">Малиново</a><a href="/riding-hall.php" class="menu-link">Манеж</a><a href="/rentals.php" aria-current="page" class="menu-link w--current">аренда<br></a><a href="/shares.php" class="menu-link">Акции</a><a href="/photo.php" class="menu-link">фото</a><a href="/contacts.php" class="menu-link">Контакты</a></div>
      <div class="offers-wrap">
         <a href="/rentals.php" aria-current="page" class="offers-link-block w-inline-block w--current">
            <div class="offers-desc">Аренда домика</div>
            <img src="images/Group20(2).png" loading="lazy" alt="" class="vektor-1">
         </a>
         <a href="#" class="offers-link-block w-inline-block">
            <div class="offers-desc">запись на пастьбу</div>
            <img src="images/Group20(3).png" loading="lazy" alt="" class="vektor-2">
         </a>
         <a href="/shares.php" class="offers-link-block w-inline-block">
            <div class="offers-desc">наши акции</div>
            <img src="images/gift201.png" loading="lazy" alt="" class="vektor-3">
         </a>
      </div>
   </div>
</div>
</div>
<div class="s2-rentals">
	<div class="container w-container">
		<div class="s2-rentals-wrap">
			<h1 class="h1">Аренда</h1>
			
			<div class="rentals-wrap">
				<div class="sidebar">
					<div class="w-form">
						<form action="#">
							<div class="filter-box">
								<div class="rentals-sitebar-header">По кемпингам</div>
								<div class="attrs-list">
									<?php 
									foreach(get_camps() as $camp){
									 ?>
									<label  class="w-checkbox checkbox-field">
										<div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
										<input ng-click="filter_camp(<?=$camp['id']?>)" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label-2 w-form-label"><?=$camp['name']?></span>
									</label>
									<?php 
										}
									 ?>
								</div>
							</div>
							<div id="class-filter" class="filter-box d-none">
								<div class="rentals-sitebar-header">По категориям домиков</div>
								<div class="attrs-list">
									<?php 
									foreach(get_classes() as $class){
									 ?>
								   <label class="w-checkbox checkbox-field">
								      <div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
								      <input ng-click="filter_class(<?=$class['id']?>)"  type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label-2 w-form-label"><?=$class['name']?></span>
								   </label>
								   <?php 
								}
								    ?>
								</div>
							</div>
							<div id="date-filter" class="filter-box filter-date d-none">
								<div class="rentals-sitebar-header">По дате</div>
					<md-datepicker ng-model="house_start"  md-min-date="house_start.min_date" ng-change="update()" md-placeholder="Enter date"
                     input-aria-describedby="datepicker-description"
                     input-aria-labelledby="datepicker-header " md-date-filter="onlyWeekendsPredicate"></md-datepicker>
                     <md-datepicker ng-model="house_end" ng-change="update()" md-min-date="house_end.min_date" md-placeholder="Enter date"
                     input-aria-describedby="datepicker-description"
                     input-aria-labelledby="datepicker-header " md-date-filter="onlyWeekendsPredicate2"></md-datepicker>
							</div>

							<div id="rent-all" class="row d-none">
				<div class="col-12 text-center">
					<label class="w-checkbox checkbox-field">
											<div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
											<input ng-change="rent_all()" ng-model="rent_all_check" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label-2 w-form-label">Выбрать все</span>
					</label>
				</div>
			</div>
							<div class="filter-box filter-date">
								<button class="btn btn-main w-100 d-none" ng-click="pre_open_cart()" id="take-offer" type="button">Перейти к заказу</button>
							</div>
						</form>
						<div class="w-form-done">
							<div>Thank you! Your submission has been received!</div>
						</div>
						<div class="w-form-fail">
							<div>Oops! Something went wrong while submitting the form.</div>
						</div>
					</div>
				</div>
				<div class="content">
				    <div class="content-wrap-2">
						<div class="w-form">
							<form id="email-form-2" name="email-form-2" data-name="Email Form 2" action="#">
								<div class="filter-box">
									<div class="rentals-sitebar-header">Сопутствующие услуги</div>
									<div class="attrs-list"   >
										<label class="w-checkbox checkbox-field">
											<div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
											<input ng-change="check_cart_btn()"  ng-model="sheeps" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label-2 w-form-label">Аренда овец</span>
										</label>
										<label class="w-checkbox checkbox-field">
											<div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
											<input ng-change="check_cart_btn()"  ng-model="workout" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label-2 w-form-label">Тренировки</span>
										</label>
										<label class="w-checkbox checkbox-field">
											<div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
											<input ng-change="check_cart_btn()"  ng-model="sheels" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label-2 w-form-label">Аренда снарядов</span>
										</label>
										<label class="w-checkbox checkbox-field">
											<div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
											<input ng-change="check_cart_btn()"  ng-model="playpen" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label-2 w-form-label">Аренда манежа</span>
										</label>
										<label ng-repeat="sub in subscription track by $index"class="w-checkbox checkbox-field">
											<div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
											<input  ng-change="check_cart_btn()" ng-model="sub.check" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label-2 w-form-label">{{sub.title}}</span>
										</label>
											
									</div>
									
								</div>
							</form>
							<div class="w-form-done">
								<div>Thank you! Your submission has been received!</div>
							</div>
							<div class="w-form-fail">
								<div>Oops! Something went wrong while submitting the form.</div>
							</div>
						</div>
					</div>
					<div class="content-wrap-1 houses-main-block">
                            <div id="ftco-loader-update" class="show fullscreen"><svg class="circular" width="48px" height="48px"><circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee"/><circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#CB759F"/></svg></div>
							<div ng-repeat="house in houses track by $index" class="rentals-card" ng-click="house_desc($event, house)"><img src="sources/houses/{{house.data.id}}/{{house.data.photo[0].name}}" loading="lazy" sizes="(max-width: 479px) 100vw, 225px"  alt="" class="rentals-card-img">
								<div class="rentals-card-header">{{house.data.title}}</div>
								<div class="rentals-card-desc">{{house.data.description}}</div>
								<div class="rentals-card-desc rentals-card-price">{{house.data.price}} РУБ</div>
								<div class="rentals-card-desc rentals-card-places">Кол-во мест: {{house.data.place_count}}</div>

								<div class="rentals-card-btn-holder">
									<button ng-click="change_btn(house)" ng-class="{'present-house-btn' : house.present, 'active' : house.choose}" class="rentals-card-btn btn">{{house.get_button_text()}}</button>
									<button ng-if="house.choose" class="rentals-card-btn btn mt-3 choosen-house-lable">Забронировано <br> с {{house.get_user_date()[0]}} по {{house.get_user_date()[1]}}</button>
								</div>
							</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</div>
<div id="house_desc" class="modal-overlay house-info-modal d-none">
	<div class="modal-popup">
		<div class="modal-head">
			<button class="btn close-popup" type="button">&times;</button>
		</div>
		<div class="modal-body">
			<div class="row">
				<div class="col-12">
					<h2 class="text-center">{{choosen_house.data.camp_name}}</h2>
				</div>
				<div ng-repeat="img in choosen_house.data.photo" class="col-lg-4 col-md-4 col-sm-4 mt-3 mb-3">
					<img src="sources/houses/{{choosen_house.data.id}}/{{img.name}}" loading="lazy" alt="" class="modal-img">
				</div>
				<div class="col-12">
					<p>{{choosen_house.data.title}}</p>
				</div>
				<div class="col-12 mt-2 mb-2">
					<h3>Категория: {{choosen_house.data.class_name}}</h3>
				</div>
				<div class="col-12 mt-2 mb-2">
					<h3>Расположение: {{choosen_house.data.camp_name}}</h3>
				</div>
				<div class="col-12 mt-2 mb-2">
					<h3>Кол-во человек: {{choosen_house.data.place_count}}</h3>
				</div>
				<div class="col-12 mt-2 mb-2">
					<h3>Цена: {{choosen_house.data.price}} РУБ</h3>
				</div>
				<div class="col-12 mt-4 mb-4">
					<button ng-click="change_btn(choosen_house)" ng-class="choosen_house.choose ? 'active' : ''" class=" w-100 btn">{{choosen_house.get_button_text()}}</button>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal-overlay offer-modal d-none">
	<div class="modal-popup">
		<div class="modal-head">
			<button class="btn close-popup" type="button">&times;</button>
		</div>
		<div class="modal-body">
			<div class="row">
				<div class="col-12">
					<h2 class="text-center">Оформление заказа</h2>
				</div>
				<div class="col-12 mt-3 mb-3">
					<input type="text" id="fio" placeholder="ФИ *" ng-model="fio" class="form-control">
				</div>
				<div class="col-12 mt-3 mb-3">
					<input type="text"  placeholder="Email *" ng-model="email" class="form-control">
				</div>
				<div class="col-12 mt-3 mb-3">
					<input type="text" placeholder="Телефон *" ng-model="phone" class="form-control">
				</div>
				<div class="col-12 mt-3 mb-3">
					<label for="">Количество человек *</label>
					<input id="people-counter" type="number" ng-model="people_count" value="1" class="form-control">
				</div>
				<hr>	

				<d-service ng-repeat="cart_elem in cart.get_services()"  attributes="{'class': cart_elem.class}" >
				</d-service>
				<div class="col-12 mt-3 mb-3 text-center">
					<label for="">Соглашение с условиями пребывания в кемпинге *</label>
					<input ng-model="conditions_of_stay" type="checkbox" class="form-control">
				</div>
				<div class="col-12 mt-3 mb-3 text-center">
					<label for="">Соглашение с политикой конфиденциальности *</label>
					<input ng-model="privacy_policy" type="checkbox" class="form-control">
				</div>
				<div class="col-12 mt-3 mb-3 text-center">
					<label for="">Соглашение на рассылку уведомлений</label>
					<input ng-model="sending_notifications" type="checkbox" class="form-control">
				</div>
				<div class="col-12 mt-4 mb-4 text-left">
					<h2>Заказ:</h2>
				</div>
			<d-house ng-repeat="house in cart.get_houses()" attributes="{'class': house.class}"></d-house>
				<div class="col-12 mt-4 mb-4 text-left">
					<h3 class="mt-0 mb-0">Сумма: {{ cart.items | sumColumn: 'price' }} РУБ</h3>
				</div>
				<div class="col-12">
					<table class="table w-100" border="1">
						<thead>
							<tr>
								<th scope="col">Название</th>
								<th scope="col">Цена</th>
								<th scope="col">Скидка</th>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="cart_elem in cart.items">
								<td scope="row" class="text-center p-3">{{cart_elem.full_title}}</td>
								<td class="text-center p-3">{{cart_elem.price}} </td>
								<td class="text-center p-3"> {{cart_elem.sale}} </td>
							</tr>

						</tbody>
					</table>
				</div>

				<div class="col-12 mt-4 mb-4">
					<button ng-click="cart.checkout()" class="w-100 btn">Оформить заказ</button>
				</div>
			</div>
		</div>
	</div>
</div>
<div id="warning-message" class="modal-overlay house-info-modal d-none">
	<div class="modal-popup warning-popup">
		<div class="modal-head">
			<button class="btn close-popup" type="button">&times;</button>
		</div>
		<div class="modal-body">
			<div class="row">
				<div class="col-12">
					<h4 class="text-center">{{warning_message}}</h4>
				</div>
			</div>
		</div>
	</div>
</div>
<div id="success-message" class="modal-overlay house-info-modal d-none">
	<div class="modal-popup warning-popup">
		<div class="modal-head">
			<button class="btn close-popup" type="button">&times;</button>
		</div>
		<div class="modal-body">
			<div class="row">
				<div class="col-12">
					<h4 class="text-center">Поздравляем! В подарок Вы получили 2 домика!</h4>
				</div>
			</div>
		</div>
	</div>
</div>
<div id="payment-message" class="modal-overlay house-info-modal d-none">
	<div class="modal-popup warning-popup">
		<div class="modal-head">
			<button class="btn close-popup" type="button">&times;</button>
		</div>
		<div class="modal-body">
			<div class="row">
				<div class="col-12">
					<a href="success_pay.php">Оплатить</a>
				</div>
			</div>
		</div>
	</div>
</div>
<div id="wholesaller-message" class="modal-overlay house-info-modal d-none">
	<div class="modal-popup warning-popup">
		
		<div class="modal-body">
			<div class="row">
				<div class="col-12">
					<h4 class="text-center">Вы собираетесь забронировать весь кемпинг — общая стоимость бронирования составляет {{pre_sum}} рублей. Такое бронирование происходит по предоплате в размере 5000 рублей. После оформления и внесения предоплаты, с вами свяжется менеджер. Внимание! Предоплата не подлежит возврату. Нажимая, вы соглашаетесь с этими условиями</h4>
				</div>
			</div>
			<div class="col-12 mt-3 mb-3 text-center">
					<label for="">Соглашен с условиями</label>
					<input ng-model="whole_saler_privicy" type="checkbox" class="form-control">
				</div>
				<div class="col-12 mb-3 mt-3">
					<div class="row">
			<div class="col-6 mt-4 mb-4">
					<button ng-click="cancel_wholesaler()" class="w-100 btn">Отмена</button>
				</div>
				<div class="col-6 mt-4 mb-4">
					<button ng-click="continue_wholesaller()" class="w-100 btn">Продолжить</button>
				</div>
			</div>
			</div>
		</div>
	</div>
</div>
<!-- <script type="text/javascript">$(document).ready(function(){$('[href*="brandjs"],.w-webflow-badge').attr('style', 'display:none !important');$('a[href="'+window.location.href+'"]').addClass('w--current');});</script>
		<script>
			window.onload = function(){
				setTimeout(function(){
					document.querySelector('#ftco-loader').classList.remove('show');
				}, 100)
			}

		</script> -->
</div>
<style type="text/css">
	.md-datepicker-calendar-pane{
		z-index: 1000000;
	}
	d-service{
		display: contents;
	}
	d-house{
		display: contents;
	}
	hr {
  width:100%;
  height: 3px;
  background-color: #CB759F;
}	
.select-attention{
  border:2px solid red;
  border-radius: 5px;
}
.choosen-house-lable{
	background-color: #fff;
    color: #CB759F;
    transition: .3s;
}

.rent-all{
	text-transform: uppercase;
	cursor: pointer;
	font-weight: 600;
}

.rent-all.rent-all-selected{
	color: #cb759f;
}

.warning-popup{
	width:450px;
	max-width: 95%;
	overflow-y: hidden;
}
.present-house-btn{
	background-color: #ffdc33 !important;
    border: #ffdc33 solid !important;
}

.houses-main-block{
    position:relative;
}
.md-calendar-date-disabled{
	background: #ffc0cb;
}
</style>


<?php include_once("footer.php") ?>