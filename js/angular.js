const curDate = Date.now();
rentals = angular.module('rentals', ['ngMaterial']);
rentals.constant('rentals',curDate);

rentals.config(['$httpProvider','rentals',function($httpProvider,appVersion){
  $httpProvider.interceptors.push(function() {
      return {
       'request': function(config) {
           if(!config.cached && config.url.indexOf('.html') > -1){
            if(config.url.indexOf("?") > -1){
              config.url = config.url.replace("?","?v="+appVersion+"&");
            }
            else{
              config.url += "?v="+appVersion;
            }
           }
           return config;
        }
      };
    });
}]);

rentals.controller('rentalsCtrl',  function($scope, $http){
 $scope.house_start = new Date();
 $scope.house_start.min_date = new Date();
 console.log($scope.house_start.min_date);
 $scope.house_end = new Date();
 $scope.house_end.setDate( $scope.house_end.getDate() + 1);
 $scope.warning_message = "";
 $scope.conditions_of_stay = false;
 $scope.privacy_policy = false;
 $scope.whole_saler = false;
 $scope.sending_notifications = false;
 $scope.people_count = '1';
 $scope.phone = '';
 $scope.email = '';
 $scope.fio = '';
class House{
		data = [];	
		choose = false;
		date = [];
		full = true;
		elem = [];
		present = false;
		price = 0;
		full_title = "";
		sale = 0;
		class = 'house';
		constructor(house_data){
			this.data = house_data;
		}
		toggle_house(){
			this.choose = !this.choose;
			if (this.choose){
				this.date = [ $scope.house_start.getFullYear() + '-' + ($scope.house_start.getMonth() + 1) + '-' + $scope.house_start.getDate(),
				$scope.house_end.getFullYear() + '-' + ($scope.house_end.getMonth() +1 ) + '-' + $scope.house_end.getDate()];
			} 
			this.update()
		}

		choose_house(){
			this.date = [ $scope.house_start.getFullYear() + '-' + ($scope.house_start.getMonth() + 1) + '-' + $scope.house_start.getDate(),
				$scope.house_end.getFullYear() + '-' + ($scope.house_end.getMonth() +1 ) + '-' + $scope.house_end.getDate()];
			this.choose = true;
			this.update();
		}

		check_full(){
			return this.full;
		}

		init(ev){
			this.elem = ev;
		}
		update(){
			this.price = this.get_price();
			this.full_title = this.get_title();
			this.sale = this.get_sale();
		}

		get_title(){
			let date = this.get_user_date();

			return this.data.title + ' с '+date[0]+' по '+date[1];
		}

		get_price(){
			let days_count = Math.ceil(Math.abs(new Date(this.date[1]).getTime() - new Date(this.date[0]).getTime()) / (1000 * 3600 * 24));
			return days_count * this.data.price * (!this.present);
		}

		get_sale(){
			if (this.present) {
				return 100;
			}else{
				return 0;
			}
			return this.sale;
		}

		get_user_date(){
			let from = this.date[0].split('-');
			let to = this.date[1].split('-');
			from = from.reverse().join('.');
			to = to.reverse().join('.');
			return [from,to];
		}
		get_prev_photo(){
			this.update()
			return this.data.photo.slice(0, 4);
		}

		get_button_text(){
			return this.present ? 'подарок' : (this.choose ? "выбрано" : "выбрать");
		}

	}


	class Playpen{
		full = false;;
		type = "1"
		elem = [];
		title = "Аренда манежа";
		class = 'playpen';
		time_type = "0";
		time_start_vals = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22"];
		time_end_vals = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
		time_start = "0";
		time_end = "1";
		start_date_2 = "";
		choosen_id = '0';
		start_date = new Date();
		min_date = new Date();
		price = 0;
		sale = 0;
		time_type_restrict = -1;
		full_title = 'Аренда манежа';

		constructor( buttons=true, time_type=-1){
		this.buttons = buttons;
		this.time_type_restrict = time_type;
		if(time_type != -1){
			this.time_type = time_type;
		}
		this.get_free_fields();
		this.price = $scope.pricelist[this.type + "_" + this.time_type];
		}

		init(ev){
			this.elem = ev;
		}

		time_comparison(f,s){
			return parseInt(s) > parseInt(f) ? true : false; 
		}

		get_title(){
			let date = this.get_user_date();
			if(this.time_type == '0'){
				return this.title + ' ' + date + ' с '+this.time_start+':00 по '+this.time_end+':00';
			}else{
				return this.title + " " + date;
			}
		}

		update(){
			this.price = this.get_price();
			this.full_title = this.get_title();
			this.sale = this.get_sale();
		}

		get_price(){
			let price = parseInt($scope.pricelist[this.type + "_" + this.time_type]);
			console.log(price);
			console.log($scope.pricelist);
			if(this.time_type == '0'){
				return (parseInt(this.time_end) - parseInt(this.time_start)) * price; 
			}else{
				return price;
			}

		}

		get_sale(){
			return this.sale;
		}

		get_user_date(){
			let date = formatDate(this.start_date);
			date = date.split('-');
			date = date.reverse().join('.');
			return date;
		}


		check_full(){
			if (this.choosen_id != '0'){
				this.full = true;
			}else{
				scrollIntoView(this.elem[0]);
				$scope.warning_message = "Невыбран манеж";
				$scope.show_warning_message();
			}
		return this.full;

		}

		get_date(){
			if(this.time_type == '1'){
				console.log(time(this.start_date));
				let start_date = new Date(this.start_date.getTime());
				start_date.setUTCHours(0,0,0);
				let end_date = new Date(start_date.getTime());
				end_date.setDate(end_date.getDate() + 1);
				return [time(start_date), time(end_date), this];
			}
			else{
				let start_date = new Date(this.start_date.getTime());
				start_date.setUTCHours(parseInt(this.time_start),0,0);
				let end_date = new Date(start_date.getTime());
				end_date.setUTCHours(parseInt(this.time_end),0,0);
				return [time(start_date), time(end_date), this];

			}
		}	

		get_free_fields(){
			if(this.time_end == null){
				this.time_end = String(parseInt(this.time_start) + 1);
			}
			this.update()
			this.full = false;
			this.choosen_id = '0';
			let date_from = formatDate(this.start_date);
			this.start_date_2 = date_from;
			let tthis = this;
			$http.get('../api/services.php?type='+this.type+'&time_type='+this.time_type+'&date_from='+date_from+'&time_start='+this.time_start+'&time_end='+this.time_end).then(
				function success(result) {
					console.log(result);
					tthis.fields_var = result.data;

				});
		}

	}



	class Sheeps{
		full = false;
		buttons = true;
		type = "2"
		elem = [];
		class = 'sheeps';
		time_type = "0";
		start_date = new Date();
		min_date = new Date();
		fields_var = [];
		time_start_vals = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22"];
		time_end_vals = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
		time_start = "0";
		title = "Аренда овец";
		price = 0;
		start_date_2 = "";
		sale = 0;
		time_type_restrict = -1;
		time_end = "1";
		choosen_id = '0';
		constructor(buttons=true, time_type=-1){
		this.buttons = buttons;
		this.time_type_restrict = time_type;
		if(time_type != -1){
			this.time_type = time_type;
		}
		this.get_free_fields()
		}
		init(ev){
			this.elem = ev;
			console.log(ev);
		}

		time_comparison(f,s){
			return parseInt(s) > parseInt(f) ? true : false; 
		}

		check_full(){
			if (this.choosen_id != '0'){
				this.full = true;
			}else{
				scrollIntoView(this.elem[0]);
				$scope.warning_message = "Невыбрано поле";
				$scope.show_warning_message();
			}
		return this.full;

		}
		get_title(){
			let date = this.get_user_date();
			if(this.time_type == '0'){
				return this.title + ' ' + date[0] + ' с '+this.time_start+':00 по '+this.time_end+':00';
			}else{

				return this.title + " с " + date[0] + ' по ' + date[1];
			}
		}

		update(){
			this.price = this.get_price();
			this.full_title = this.get_title();
			this.sale = this.get_sale();
		}

		get_price(){
			let price =  parseInt($scope.pricelist[this.type + "_" + this.time_type]);
			console.log(price);
			console.log($scope.pricelist);
			if(this.time_type == '0'){
				return (parseInt(this.time_end) - parseInt(this.time_start)) * price; 
			}else{
				return price;
			}

		}

		get_sale(){
			return this.sale;
		}

		get_user_date(){
			let date = formatDate(this.start_date);
			let date_end = formatDate(new Date(this.start_date).setDate(this.start_date.getDate() + 7));
			date = date.split('-');
			date = date.reverse().join('.');
			date_end = date_end.split('-');
			date_end = date_end.reverse().join('.');
			return [date, date_end];
		}

		get_date(){
			if(this.time_type == '1'){
				console.log(time(this.start_date));
				let start_date = new Date(this.start_date.getTime());
				start_date.setUTCHours(0,0,0);
				let end_date = new Date(start_date.getTime());
				end_date.setDate(end_date.getDate() + 7);
				return [time(start_date), time(end_date), this];
			}
			else{
				let start_date = new Date(this.start_date.getTime());
				start_date.setUTCHours(parseInt(this.time_start),0,0);
				let end_date = new Date(start_date.getTime());
				end_date.setUTCHours(parseInt(this.time_end),0,0);
				return [time(start_date), time(end_date), this];

			}
		}	

		get_free_fields(){
			if(this.time_end == null){
				this.time_end = String(parseInt(this.time_start) + 1);
			}
			this.update();
			this.full = false;
			this.choosen_id = '0';
			let date_from = formatDate(this.start_date);
			this.start_date_2 = date_from;
			let tthis = this;
			$http.get('../api/services.php?type='+this.type+'&time_type='+this.time_type+'&date_from='+date_from+'&time_start='+this.time_start+'&time_end='+this.time_end).then(
				function success(result) {
					console.log(result);
					tthis.fields_var = result.data;

				});
		}


	}

	


	class Workout{
		full = false;
		class = 'workout';
		type = '2';
		time_type = '2';
		elem = [];
		start_date = new Date();
		min_date = new Date();
		start_date_2 = "";
		choosen_field_id = '0';
		choosen_trainer_id = '0';
		buttons=true;
		title = "Тренеровка с тренером";
		sale = 0;

		constructor(buttons=true){
			this.buttons = buttons;
			this.update();
			this.get_free_fields();
		}

		init(ev){
			this.elem = ev;
		}

		check_full(){
			if (this.choosen_id != '0' && this.choosen_trainer_id != '0'){
				this.full = true;
			}else{
				scrollIntoView(this.elem[0]);
				if(this.choosen_id == '0'){
					$scope.warning_message = "Невыбрано поле";
				}
				else{
					$scope.warning_message = "Невыбран тренер";
				}
				$scope.show_warning_message();
			}
			return this.full;
		}
		get_title(){
			let date = this.get_user_date();
				return this.title + ' ' + date;
		}

		update(){
			this.price = this.get_price();
			this.full_title = this.get_title();
			this.sale = this.get_sale();
		}

		get_price(){
			let price =  parseInt($scope.pricelist[this.type + "_" + this.time_type]);
			console.log(price);
			console.log($scope.pricelist);
			return price;

		}

		get_sale(){
			return this.sale;
		}

		get_user_date(){
			let date = formatDate(this.start_date);
			date = date.split('-');
			date = date.reverse().join('.');
			
			return date;
		}

		get_date(){
			console.log(time(this.start_date));
			let start_date = new Date(this.start_date.getTime());
			start_date.setUTCHours(0,0,0);
			let end_date = new Date(start_date.getTime());
			end_date.setDate(end_date.getDate() + 1);
			return [time(start_date), time(end_date), this];
		}	

		get_free_fields(){
			this.update();
			this.full = false;
			this.choosen_id = '0';
			let date_from = formatDate(this.start_date);
			this.start_date_2 = date_from;
			let tthis = this;
			$http.get('../api/services.php?type='+this.type+'&time_type='+this.time_type+'&date_from='+date_from).then(
				function success(result) {
					console.log(result);
					tthis.fields_var = result.data;

				});
		}
	}


	class Sheels{
		full = false;
		type = '4';
		class = 'sheels';
		title = "Аренда снарядов";
		elem = [];
		time_type = '0';
		start_date = new Date();
		min_date = new Date();
		start_date_2 = "";
		sale = 0;
		buttons=true;
		constructor(buttons=true){
			this.buttons = buttons;
			this.update();
		}

		init(ev){
			this.elem = ev;
		}

		check_full(){
			this.full = true;
			return true;
		}

		get_title(){
			let date = this.get_user_date();
				return this.title + ' ' + date;
		}

		update(){
			this.price = this.get_price();
			this.full_title = this.get_title();
			this.sale = this.get_sale();
		}

		get_price(){
			let price =  parseInt($scope.pricelist[this.type + "_" + this.time_type]);
			console.log(price);
			console.log($scope.pricelist);
			return price;

		}

		get_sale(){
			return this.sale;
		}

		get_user_date(){
			let date = formatDate(this.start_date);
			this.start_date_2 = date;
			date = date.split('-');
			date = date.reverse().join('.');
			
			return date;
		}

		get_date(){
			console.log(time(this.start_date));
			let start_date = new Date(this.start_date.getTime());
			start_date.setUTCHours(0,0,0);
			let end_date = new Date(start_date.getTime());
			end_date.setDate(end_date.getDate() + 1);
			return [time(start_date), time(end_date), this];
		}

	}


	class Subscription{
		full = false;
		class = 'subscription';
		items_type = '';
		count = 0;
		sale = 0;
		elem = [];
		items = [];
		price = 0;
		sale = 0;
		title = "";

		constructor(items_type, time_type, count, sale, title){
			this.items_type = items_type;
			this.count = count;
			this.sale = sale;
			this.title = title;
			for (var i = count - 1; i >= 0; i--) {
				if(items_type == '1'){
					this.items.push(new Playpen(false, time_type));
				}
				if(items_type == '2'){
					this.items.push(new Sheeps(false, time_type));
				}
				if(items_type == '5'){
					this.items.push(new Workout(false));
				}
				if(items_type == '4'){
					this.items.push(new Sheels(false));
				}
			}
			this.update();
		}

		init(ev){
			this.elem = ev;
		}
		get_title(){
				return this.title;
		}

		update(){
			this.price = this.get_price();
			this.full_title = this.get_title();
			this.sale = this.get_sale();
		}

		get_price(){
			let res = 0;
			for (var i = this.items.length - 1; i >= 0; i--) {
				res += this.items[i].price;
			}
			return res * (parseInt(this.sale) / 100);
		}

		get_sale(){
			return parseInt(this.sale) + '%';
		}

		check_full(){
			let res = true;
			for (var i = this.items.length - 1; i >= 0; i--) {
				if(this.items[i].check_full() == false){
					res = false;
				}
			}
			this.full = res;
			return res;
		}

	}


	class Cart{
		items = [];
		constructor(elems){
			this.items = elems;

		}

		check_full(){
			let res = true;
			for (var i = this.items.length - 1; i >= 0; i--) {
				if(!this.items[i].check_full()){
					res = false;
					break;
				}
			}
			return res;
		}

		get_services(){
			let services =  this.items.filter(function(item) {
  				return item.class != 'house';
					});
			return services;
		}

		get_houses(){
			let houses =  this.items.filter(function(item) {
  				return item.class == 'house';
					});
			return houses;
		}

		checkout(){
			if($scope.fio == '' || $scope.email == '' || $scope.phone == ''){
				$scope.warning_message = 'Введите контактные данные';
				$scope.show_warning_message();
				return false;
			}

			if(!this.check_full()){
				return false;
			}
			if(this.check_date().status == 'error'){
				return false;
			}

			
	 		if(!$scope.conditions_of_stay && !$scope.privacy_policy){
	 			$scope.warning_message = "Подтвердите соглашения";
	 			$scope.show_warning_message();
	 			return false;
	 		}

	 		let houses_people_sum = 0;
	 		for (var i = this.get_houses().length - 1; i >= 0; i--) {
	 			houses_people_sum += parseInt(this.get_houses()[i].data.place_count);
	 		}

	 		if($scope.people_count > houses_people_sum && houses_people_sum != 0){
	 			$scope.warning_message = "Количество мест в домах не рассчитано на количество постояльцев, которое вы указали";
	 			document.getElementById('people-counter').scrollIntoView();
	 			$scope.show_warning_message();
	 			return false;
	 		}
	 		let user = {'name': $scope.fio, 'email': $scope.email, 'phone': $scope.phone, 'is_wholesaler': $scope.whole_saler * 1,
	 		 'sending_notifications': $scope.sending_notifications * 1, 'person_count': $scope.people_count};
	 		 console.log('cart='+JSON.stringify(this.items));
	 		 console.log('&user='+JSON.stringify(user));
	 		/*$http({
			    url: '../api/payment.php',
			    method: "POST",
			    data: 'cart='+JSON.stringify(this.items)+'&user='+JSON.stringify(user),
			        headers: {'Content-Type': 'application/x-www-form-urlencoded'}

			    
			    }).then(function success(result) {
			    	console.log(result);
			    });*/


		}

		check_date()
		{
			let cal = {};
			for (var i = 0; i < this.items.length; i++) 
			{
				if(this.items[i].class != 'house')
				{
					if (this.items[i].class == 'subscription')
					{
						for (var j = 0; j < this.items[i].items.length; j++) 
						{
							let item = this.items[i].items[j];
							let key = item.type + "_" + item.choosen_id;
							let pre = item.get_date();
							if(Object.keys(cal).includes(key))
							{
								cal[key].push(pre);
							}else
							{
								cal[key] = [];
								cal[key].push(pre);
							}
						}
					}else
					{
						let item = this.items[i];
						let key = item.type + "_" + item.choosen_id;
						let pre = item.get_date();
						if(Object.keys(cal).includes(key))
						{
							cal[key].push(pre);
						}else
						{
							cal[key] = [];
							cal[key].push(pre);
						}

					}
				}
			}
			console.log(cal);
			let result = {};

			for (var i in cal) 
			{
				for (var j =  0; j < cal[i].length; j++) 
				{
					let gap = cal[i][j];
					for (var k = 0; k < cal[i].slice(j).length; k++) 
					{
						let gap2 = cal[i].slice(j)[k]; 
						if(gap == gap2){
							continue;
						}
						if((gap[0] < gap2[1]) && (gap[1] > gap2[0]))
						{
							result = {"status" : "error", "object" : gap2[2]};
							console.log('Объекты:')
							console.log(gap[2]);
							console.log(gap2[2]);
							console.log(result);
							scrollIntoView(gap2[2].elem[0]);
							$scope.warning_message = "Данное время конфликтует с предыдущей услугой";
							$scope.show_warning_message();
							return result;
						}else{
							console.log(gap[2]);
							console.log(gap2[2]);
							console.log(result);
						}
					}
				}
			}
			result = {"status": "success"};
			return result;
		}
	}


	$scope.date_from = '';
	$scope.date_to = '';
	$scope.class = [];
	$scope.camp = [];
	$scope.houses = [];
	$scope.whole_saler_privicy = false;
	
	$scope.check_houses_to_present = function(){
		let choosen_houses = [];
		for (var i = $scope.houses.length - 1; i >= 0; i--) {
			if($scope.houses[i].choose){
				choosen_houses.push($scope.houses[i]);
			}
		}
		let present_houses_count = Math.floor(choosen_houses.length / 7);
		console.log(present_houses_count);
		let sorted_houses = choosen_houses;
		for (var i = 0; i < $scope.houses.length; i++) {
			$scope.houses[i].present = false;
		}
		sorted_houses = sorted_houses.sort(function (a, b){
		 if (a.data.class < b.data.class) return -1;
	  if (a.data.class > b.data.class) return 1;
	  // при равных score сортируем по time
	  if (a.price < b.price) return -1;
	  if (a.price > b.price) return 1;
		}).reverse();
		console.log(sorted_houses);
		for (var i = 0; i < $scope.houses.length; i++) {
			$scope.houses[i].present = false;
		}	
		for (var i = 0; i < present_houses_count; i++) {
			sorted_houses[i].present = true;
		}
		console.log(sorted_houses);
	}

	$scope.rent_all = function() {
		$scope.whole_saler = true;
		for (var i = $scope.houses.length - 1; i >= 0; i--) {
			$scope.houses[i].choose_house();
		}
		$scope.check_houses_to_present();
	};


	$scope.update = function(){	
		$scope.house_start.setUTCHours(0,0,0);
		$scope.house_end.setUTCHours(0,0,0);
		$scope.check_houses_to_present();
 	$scope.house_start.min_date = new Date();
	$scope.house_end.min_date = new Date(
			$scope.house_start.getFullYear(),
			$scope.house_start.getMonth(),
			 $scope.house_start.getDate() + 1
			);
		 console.log($scope.house_start.min_date);
		 if($scope.house_start.getTime() >= $scope.house_end.getTime()){
		 	console.log('11222');
		 	$scope.house_end =  new Date(
			$scope.house_start.getFullYear(),
			$scope.house_start.getMonth(),
			 $scope.house_start.getDate() + 1
			);
		 }else{
		 	console.log('22333');
		 	console.log($scope.house_start.getTime());
		 	console.log($scope.house_end.getTime());
		 }
		let date_from = $scope.house_start.getFullYear() + '-' + ($scope.house_start.getMonth() + 1) + '-' + $scope.house_start.getDate();
		let date_to = $scope.house_end.getFullYear() + '-' + ($scope.house_end.getMonth() + 1) + '-' + $scope.house_end.getDate();
		$http.get('../api/houses.php?class='+$scope.class.join('|')+'&camp='+$scope.camp.join('|')+'&date_from='+date_from+'&date_to='+date_to).then(
			function success(result) {
				let mas = [];
				console.log(result);
				for (var i = result.data.length - 1; i >= 0; i--) {
					mas.push(new House(result.data[i]));
				}
				for (var i = $scope.houses.length - 1; i >= 0; i--) {
					if (!$scope.houses[i].choose){
						$scope.houses.splice(i,1);
					}
				}
				let pre_mas = [];
				pre_mas = $scope.houses.concat(mas);
				let ids = []
				for (var i = 0; i < pre_mas.length; i++ ) {
					if (ids.indexOf(pre_mas[i].data.id) != -1){
						pre_mas[i] = '';
					}else{
						ids.push(pre_mas[i].data.id);
					}
				}
				pre_mas = pre_mas.filter(element => element !== '');
				$scope.houses = pre_mas;
				console.log($scope.houses);
			}
			);

	}
	function scrollIntoView(elem) {
		console.log(elem);
		   var e = elem.getElementsByTagName('div')[0];
		   console.log(e);
		   if (!!e && e.scrollIntoView) {
		       e.scrollIntoView();
		   }
		}

	function get_price_list(){
		$http.get('../api/services.php?move=1').then(function success(result) {
			console.log(result);
			let data = result.data;
			let res = {};
			for (var i = data.length - 1; i >= 0; i--) {
				let key = data[i].config.type + '_' + data[i].config.time_type;
				res[key] = data[i].price;
			}
			$scope.pricelist = res;
		});
	}

	get_price_list();

	$scope.update();

		function time(date){
		return parseInt(date.getTime()/1000)
		}

		$scope.filter_class = function(id) {
			if($scope.class.indexOf(id) == -1){
				$scope.class.push(id);
			}
			else{
				$scope.class.splice($scope.class.indexOf(id), 1); 

			}
			$scope.update();
		};


		$scope.filter_camp = function(id) {
			console.log('1')
			if($scope.camp.indexOf(id) != -1){
					$scope.camp.splice($scope.camp.indexOf(id), 1);
				}
				else{
					$scope.camp.push(id);
				}		
				$scope.update();
			};

		$scope.show_warning_message = function(){
			document.getElementById('warning-message').classList.remove('d-none');
		}

		$scope.show_success_message = function(){
			document.getElementById('success-message').classList.remove('d-none');
		}


		function formatDate(date) {
			var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

			if (month.length < 2) 
				month = '0' + month;
			if (day.length < 2) 
				day = '0' + day;

			return [year, month, day].join('-');
		}

		$scope.get_subscription = function(){
			$http.get('../api/subscription.php?move=1').then(function success(result) {
				console.log(result);
				$scope.subscription = result.data;
			});
		};
		 $scope.get_subscription();


		$scope.change_btn = function(house) {
			house.toggle_house();
			$scope.update();
		};

		$scope.house_desc = function(e, house) {
			if(e.target.tagName != 'BUTTON'){
				$scope.choosen_house = house;
				document.getElementById('house_desc').classList.toggle('d-none');
			}
		}

		$scope.cancel_wholesaler = function() {
			document.getElementById('wholesaller-message').classList.add('d-none');
			document.querySelector(".offer-modal").classList.add("d-none")
			$scope.whole_saler = false;
		}

		$scope.whole_saler_preview = function() {
			document.getElementById('wholesaller-message').classList.remove('d-none');

		}

		$scope.continue_wholesaller = function() {
			if($scope.whole_saler_privicy){
				document.getElementById('wholesaller-message').classList.add('d-none');
				$scope.open_cart();
			}
		}

		$scope.pre_open_cart = function(){
			let elem = [];
			let pre_sum = 0;
			for (var i = 0; i < $scope.houses.length; i++) {
				if ($scope.houses[i].choose){
					elem.push($scope.houses[i]);
					pre_sum += $scope.houses[i].price;
				}
			}
			$scope.pre_sum = pre_sum;
			console.log(elem);
			if(elem.length > 6){
				$scope.whole_saler = true;
				$scope.whole_saler_preview();
			}else{
				$scope.open_cart();
			}
		}

		$scope.open_cart = function() {

			let elems = [];
			console.log($scope.subscription);
			if ($scope.sheeps){
				elems.push(new Sheeps());
			}
			if ($scope.workout){
				elems.push(new Workout());
			}
			if ($scope.sheels){
				elems.push(new Sheels());
			}
			if ($scope.playpen){
				elems.push(new Playpen());
			}
			for (var i = 0; i < $scope.subscription.length; i++){
				if($scope.subscription[i].check){
					elems.push(new Subscription($scope.subscription[i].service_type, $scope.subscription[i].time_type, $scope.subscription[i].count, $scope.subscription[i].sale, $scope.subscription[i].title));
				}
			}
			console.log($scope.houses);
			for (var i = 0; i < $scope.houses.length; i++) {
				if ($scope.houses[i].choose){
					elems.push($scope.houses[i]);
				}
			}
			$scope.cart = new Cart(elems);
			console.log($scope.cart);
		}

		$scope.del_elem_form_cart = function(elem) {
			console.log($scope.cart.items.indexOf(elem));
			$scope.cart.items.splice($scope.cart.items.indexOf(elem), 1);
		};

		$scope.copy_elem_from_cart = function(elem) {
			let index = $scope.cart.items.indexOf(elem);
			let new_elem = [];
			if (elem.class == 'playpen'){
				new_elem = new Playpen();
			}
			if (elem.class == 'workout'){
				new_elem = new Workout();
			}
			if (elem.class == 'sheeps'){
				new_elem = new Sheeps();
			}
			if (elem.class == 'sheels'){
				new_elem = new Sheels();
			}
			if (elem.class == 'subscription'){
				new_elem = new Subscription(elem.items_type, elem.time_type_restrict, elem.count, elem.sale, elem.title);
			}
			$scope.cart.items.splice(index + 1, 0, new_elem);
			console.log($scope.cart.items);
		}


	});

rentals.filter('sumColumn', function(){
        return function(dataSet, columnToSum){
            let sum = 0;

            for(let i = 0; i < dataSet.length; i++){
                sum += parseFloat(dataSet[i][columnToSum]) || 0;
            }

            return sum;
        };
    })