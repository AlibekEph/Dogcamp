<?php
include($_SERVER['DOCUMENT_ROOT'] . "/functions.php");
$title = "Аренда";
include_once("header.php") ?>
<div ng-app="rentals" ng-controller="rentalsCtrl" style="background:#FAFAFA">
<div class="s1-rentals">
	<div class="container w-container">
   <div class="s1-rentals-wrap">
      <div class="menu-block-riding-hall" style="margin-top:50px;background:#ccc;"><a href="/" class="menu-link">Горыныч</a><a href="/school.php" class="menu-link">Школа</a><a href="/malinovo.php" class="menu-link">Малиново</a><a href="/riding-hall.php" class="menu-link">Манеж</a><a href="/rentals.php" aria-current="page" class="menu-link w--current">аренда<br></a><a href="/shares.php" class="menu-link">Акции</a><a href="/photo.php" class="menu-link">фото</a><a href="/contacts.php" class="menu-link">Контакты</a></div>
   </div>
</div>
</div>
<div class="s2-rentals">
	<div class="container w-container">
		<div class="s2-rentals-wrap">
			
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
							<div id="date-filter" class="filter-box filter-date">
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
											<input ng-change="rent_all()" ng-model="rent_all_check" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label-2 w-form-label">{{rent_all_text()}}</span>
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
					<div class="w-form">
							<form id="email-form-2" name="email-form-2" data-name="Email Form 2" action="#">
								<div class="filter-box">
									<div class="rentals-sitebar-header">Сопутствующие услуги</div>
									<div class="attrs-list"   >
										<label class="w-checkbox checkbox-field">
											<div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
											<input ng-change="services_click(sheeps)"  ng-model="sheeps" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label-2 w-form-label">Аренда овец</span>
										</label>
										<label class="w-checkbox checkbox-field">
											<div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
											<input ng-change="services_click(workout)"  ng-model="workout" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label-2 w-form-label">Тренировки</span>
										</label>
										<label class="w-checkbox checkbox-field">
											<div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
											<input ng-change="services_click(sheels)"  ng-model="sheels" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label-2 w-form-label">Аренда снарядов</span>
										</label>
										<label class="w-checkbox checkbox-field">
											<div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
											<input ng-change="services_click(playpen)"  ng-model="playpen" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label-2 w-form-label">Аренда манежа</span>
										</label>
										<label ng-repeat="sub in subscription track by $index"class="w-checkbox checkbox-field d-none">
											<div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
											<input ng-change="services_click(sub.check)" ng-model="sub.check" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label-2 w-form-label">{{sub.title}}</span>
										</label>
											
									</div>
									
								</div>
							</form>
							<div class="filter-box filter-date">
								<button class="btn btn-main w-100 d-none" ng-click="pre_open_cart()" id="take-offer" type="button">Оформить заказ</button>
							</div>
							<div class="w-form-done">
								<div>Thank you! Your submission has been received!</div>
							</div>
							<div class="w-form-fail">
								<div>Oops! Something went wrong while submitting the form.</div>
							</div>
						</div>
						<div class="filter-box filter-date text-center">
							<button class="btn btn-main w-100 scheme-link"><a href="#gor-scheme" >Карта-схема Горыныч </a>  <br> <a href="#gor-scheme"><span style="font-size:0.6em">Нажмите, чтобы посмотреть</span></a> </button>
						</div>
						<div class="filter-box filter-date text-center">
							<button class="btn btn-main w-100 scheme-link"><a href="#malinovo-scheme" >Карта-схема Малиново </a>  <br> <a href="#malinovo-scheme"><span style="font-size:0.6em">Нажмите, чтобы посмотреть</span></a> </button>
						</div>
				</div>
				<div class="content">
				    <div class="content-wrap-2">

					</div>
					<div class="content-wrap-1 houses-main-block">
                            <div id="ftco-loader-update" class="show fullscreen"><svg class="circular" width="48px" height="48px"><circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee"/><circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#CB759F"/></svg></div>
							<div ng-repeat="house in houses | orderBy:'-data.dis' track by $index" class="rentals-card" ng-click="house_desc($event, house)"><img src="sources/houses/{{house.data.id}}/{{house.data.photo[0].name}}" loading="lazy" sizes="(max-width: 479px) 100vw, 225px"  alt="" class="rentals-card-img">
								<div class="rentals-card-header">{{house.data.title}}</div>
								<div class="rentals-card-desc">{{house.data.description}}</div>
								<div class="rentals-card-desc rentals-card-price">Стоимость: {{house.get_cart_price()}} <span ng-if="house.have_sale()" style="text-decoration:line-through;font-size:0.8em"> {{house.data.price}} </span> руб./сутки</div>
								<div class="rentals-card-desc rentals-card-places">Мест для заселения: {{house.data.place_count}}</div>
								<div ng-if="house.data.dis == 'n'" class="rentals-card-btn-holder">
									<button class="rentals-card-btn btn dis-btn">Недоступно</button>
								</div>
								<div ng-if="house.data.dis == 'y'" class="rentals-card-btn-holder">
									<button ng-click="change_btn(house)" ng-class="{'present-house-btn' : house.present, 'active' : house.choose}" class="rentals-card-btn btn">{{house.get_button_text()}}</button>
									<button ng-if="house.choose" class="rentals-card-btn btn mt-3 choosen-house-lable">Выбрано для аренды <br> с {{house.get_user_date()[0]}} по {{house.get_user_date()[1]}}</button>
								</div>
							</div>
							<div class="row">
							    <div class="col-12 mt-4 mb-4" id="gor-scheme">
							        <p class="mt-2 mb-2">Схема расположения домиков в Горыныче</p>
							        <hr>
							        <img src="images/scheme-gor.png" class="img" loading="lazy">
							    </div>
							    <div class="col-12 mt-4 mb-4" id="malinovo-scheme">
							        <p class="mt-2 mb-2">Схема расположения домиков в Малиново</p>
							        <hr>
							        <img src="images/scheme-malinovo.png" class="img" loading="lazy">
							    </div>
							</div>
					</div>
					
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
					<input type="text" id="fio" placeholder="ФИО *" ng-model="fio" class="form-control">
				</div>
				<div class="col-12 mt-3 mb-3">
					<input type="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"  placeholder="Email *" ng-model="email" class="form-control">
				</div>
				<div class="col-12 mt-3 mb-3">
					<input id="tel" type="text" placeholder="Телефон *" ng-model="phone" class="form-control">
				</div>
				<div class="col-12 mt-3 mb-3">
					<input id="tg" type="text" placeholder="Ваш никнейм в Telegram без @: username" ng-model="tg" class="form-control">
				</div>
				<div ng-if="cart.get_houses().length != 0" class="col-12 mt-3 mb-3">
					<label for="">Количество человек *</label>
					<input id="people-counter" type="number" value="1" ng-model="people_count" class="form-control">
				</div>
				<hr>	

				<d-service ng-repeat="cart_elem in cart.get_services()"  attributes="{'class': cart_elem.class}" >
				</d-service>
				<div class="col-12 mt-3 mb-3">
					<input ng-model="conditions_of_stay" type="checkbox" class="form-control d-inline w-auto mr-2">
					<label class="d-inline">Соглашение с <a href="/conditions.php">условиями пребывания в кемпинге*</a></label>
				</div>
				<div class="col-12 mt-3 mb-3">
					<input ng-model="privacy_policy" type="checkbox" class="form-control d-inline w-auto mr-2">
					<label class="d-inline">Соглашение с <a href="/policy.php">политикой конфиденциальности*</a></label>
				</div>
				<div class="col-12 mt-3 mb-3">
					<input ng-model="sending_notifications" type="checkbox" class="form-control d-inline w-auto mr-2">
					<label class="d-inline">Соглашение на рассылку уведомлений</label>
				</div>
				<div class="col-12 mt-4 mb-4 text-left">
					<h2>Заказ:</h2>
				</div>
				<div class="col-12 mt-4 mb-4 text-left">
					<h3 class="mt-0 mb-0">Сумма: {{ cart.items | sumColumn: 'price' }} РУБ</h3>
				</div>
				<div class="col-12" style="overflow-x: scroll">
				    <p>Прокрутите таблицу в сторону, чтобы увидеть всю информацию</p>
					<table class="table w-100" border="1">
						<thead>
							<tr>
								<th scope="col">Название</th>
								<th scope="col">Сумма</th>
								<th scope="col">Количество суток</th>
								<th scope="col">Скидка</th>
								<th scope="col">Удалить</th>
							</tr>
						</thead>
						<tbody>
						    
							<tr ng-repeat="cart_elem in cart.items" ng-class="cart_elem.present? 'gift-row': ''">
								<td scope="row" class="text-center p-3">{{cart_elem.full_title}} <img ng-if="cart_elem.present" src="images/gift201.png" loading="lazy" class="vektor-3 m-0"></td>
								<td class="text-center p-3">{{cart_elem.price}} <span ng-if="cart_elem.have_sale()" style="text-decoration:line-through;font-size:0.8em"> {{cart_elem.coast_without_sale()}} </span> </td>
								<td class="text-center p-3">{{cart_elem.days_count ? cart_elem.days_count : '-'}} </td>
								<td class="text-center p-3"> {{cart_elem.get_sale_per()}}%</td>
								<td class="text-center p-3"> <button ng-click="del_elem_form_cart(cart_elem)" class="btn btn-main">Удалить</button> </td>
							</tr>

						</tbody>
					</table>
				</div>

				<div class="col-12 col-sm-6 mt-2 mb-2">
					<button ng-if="cart.items.length != 0"  ng-click="cart.checkout()" class="w-100 btn">Оформить заказ</button>
				</div>
				<div class="col-12 col-sm-6 mt-2 mb-2">
					<button class="w-100 btn-active close-popup-btn">Перейти к выбору</button>
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

<div id="wholesaller-message" class="modal-overlay house-info-modal d-none">
	<div class="modal-popup warning-popup">
		
		<div class="modal-body">
			<div class="row">
				<div class="col-12">
					<h4 class="text-center">Вы собираетесь забронировать весь кемпинг — общая стоимость бронирования составляет {{pre_sum}} рублей. Такое бронирование происходит по предоплате в размере 5000 рублей. После оформления и внесения предоплаты, с вами свяжется менеджер. Внимание! Предоплата не подлежит возврату. Нажимая, вы соглашаетесь с этими условиями</h4>
				</div>
			</div>
			<div class="col-12 mt-3 mb-3 text-center">
					<input ng-model="whole_saler_privicy" type="checkbox" class="form-control d-inline w-auto mr-2">
					<label class="d-inline">Согласен с условиями</label>
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
	background: #CB759F;
	color:#fff;
}
.dis-btn{
	background-color: #949494;
    color: #fff;
    border: 1px solid #949494;
}
</style>


<?php include_once("footer.php") ?>
