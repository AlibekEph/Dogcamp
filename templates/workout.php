<?php include($_SERVER['DOCUMENT_ROOT'] . "/functions.php"); ?>
				<div class="col-12 mb-3 mt-3">
					<h4>Бронирования для занятий с тренером</h4>
				</div>
				<div class="col-md-6 col-12 mt-3 mb-3 text-center">
					<md-datepicker ng-model="cart_elem.start_date" class="form-control w-100"  md-min-date="cart_elem.min_date" ng-change="cart_elem.get_free_fields()" md-placeholder="Enter date"
                     input-aria-describedby="datepicker-description"
                     input-aria-labelledby="datepicker-header "></md-datepicker>
					
				</div>
				<div class="col-12 mt-3 mb-3">
					<label for="">Выбор поля</label>
					<select ng-model="cart_elem.choosen_id"  ng-class="cart_elem.choosen_id == '0' ? 'select-attention' : ''" class="form-control w-100">
						<option ng-if="cart_elem.fields_var.length != 0" value="0">Выберите поле</option>
						<option ng-if="cart_elem.fields_var.length == 0" value="0">К сожалению в это время нет доступных полей</option>
						<option ng-repeat="field in cart_elem.fields_var" value="{{field.id}}">{{field.title}}</option>
					</select>
				</div>
				<div class="col-md-12 col-12 mt-3 mb-3">
					<label for="">Выберите тренера</label>
					<select ng-model="cart_elem.choosen_trainer_id" ng-change="cart_elem.check_full()" ng-class="cart_elem.choosen_id == '0' ? 'select-attention' : ''" class="form-control w-100">
						<option value="0">Выберите тренера</option>
						<?php 
						foreach (get_trainers() as $trainer) {
							?>
							<option value="<?=$trainer['id']?>"><?=$trainer['fio']?> </option>
							<?php
						}
						 ?>
						
					</select>
				</div>
				<div ng-if="cart_elem.buttons" class="col-6 mt-4 mb-4">
					<button ng-click="copy_elem_from_cart(cart_elem)" class="w-100 btn">Дублировать услугу</button>
				</div>
				<div ng-if="cart_elem.buttons" class="col-6 mt-4 mb-4">
					<button ng-click="del_elem_form_cart(cart_elem)" class="w-100 btn">Удалить услугу</button>
				</div>
								<hr>	
