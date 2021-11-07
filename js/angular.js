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
rentals.config(function($mdGestureProvider){ 
  $mdGestureProvider.skipClickHijack();
})

rentals.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('YYYY-MM-DD');
    };
});

rentals.controller('rentalsCtrl',  function($scope, $http){
 $scope.house_start = new Date();
 $scope.house_start.min_date = new Date();
 $scope.house_end = new Date();
 $scope.house_end.setDate( $scope.house_end.getDate() + 1);
 $scope.warning_message = "";
 $scope.conditions_of_stay = false;
 $scope.privacy_policy = false;
 $scope.whole_saler = false;
 $scope.sending_notifications = false;
 $scope.people_count = 1;
 $scope.phone = '';
 $scope.tg = '';
 $scope.email = '';
 $scope.fio = '';
 $scope.rent_all_check = false;
 $scope.cart = [];
 $scope.privacy_policy = false;
 $scope.conditions_of_stay = false;

class House{
		data = [];
		date2 = []	
		choose = false;
		date = [];
		full = true;
		elem = [];
		present = false;
		price = 0;
		full_title = "";
		sale = 0;
		days_count = 0;
		class = 'house';
		constructor(house_data){
			this.data = house_data;
			this.update();
		}
		toggle_house(){
			if(this.data.dis == 'y'){
			this.choose = !this.choose;
			if (this.choose){
				this.date = [($scope.house_start.getMonth() + 1)+ '/' + $scope.house_start.getDate()  + '/' + $scope.house_start.getFullYear() ,
				($scope.house_end.getMonth() +1 ) + '/' + $scope.house_end.getDate() + '/' + $scope.house_end.getFullYear()];
				this.date2 = [$scope.house_start.getFullYear()+ '-' + ($scope.house_start.getMonth() + 1) + '-' + $scope.house_start.getDate()  ,
				$scope.house_end.getFullYear() + '-' + ($scope.house_end.getMonth() +1 ) + '-' + $scope.house_end.getDate()];
			} 
			}
			this.update()
		}

		get_cart_price(){
			if(this.data.sale == '' || this.data.sale == '0' || this.data.sale == null){
				return this.data.price 
			}
			else{
				return this.data.sale 
			}
		}

		have_sale(){
				if(this.data.sale == '' || this.data.sale == '0' || this.data.sale == null){
					return false;
				}
				return true;
		}
		get_sale_per(){
			if(this.present){
				return 100;
			}
			return Math.ceil((this.coast_without_sale() - this.price) / this.coast_without_sale() * 100)
		}
		coast_without_sale(){
			let days_count = Math.ceil(Math.abs(new Date(this.date[1]).getTime() - new Date(this.date[0]).getTime()) / (1000 * 3600 * 24));
			this.days_count = days_count;

			return days_count * parseInt(this.data.price) * (!this.present);
		}


		choose_house(){
						if(this.data.dis == 'y'){

			this.date = [ $scope.house_start.getFullYear() + '-' + ($scope.house_start.getMonth() + 1) + '-' + $scope.house_start.getDate(),
				$scope.house_end.getFullYear() + '-' + ($scope.house_end.getMonth() +1 ) + '-' + $scope.house_end.getDate()];
			this.date2 = [$scope.house_start.getFullYear()+ '-' + ($scope.house_start.getMonth() + 1) + '-' + $scope.house_start.getDate()  ,
				$scope.house_end.getFullYear() + '-' + ($scope.house_end.getMonth() +1 ) + '-' + $scope.house_end.getDate()];
			this.choose = true;
		}
			this.update();
		}
		unchoose_house(){
			this.choose = false;
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
			this.days_count = days_count;
			if (this.have_sale()){
			return days_count * parseInt(this.data.sale) * (!this.present);
			}
			return days_count * parseInt(this.data.price) * (!this.present);
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
			if(this.date[0] != undefined){
			let date_1 = formatDate(new Date(this.date[1]));
			let date_0 = formatDate(new Date(this.date[0]));
			let from = date_0.split('-');
			let to = date_1.split('-');
			from = from.reverse().join('.');
			to = to.reverse().join('.');
			return [from,to];
			}
			return [];
		}
		get_prev_photo(){
			this.update()
			return this.data.photo.slice(0, 4);
		}

		get_button_text(){
			return this.present ? 'подарок' : (this.choose ? "отменить выбор" : "выбрать");
		}

	}


	class Playpen{
		full = false;;
		type = "1"
		elem = [];
		title = "Аренда манежа";
		class = 'playpen';
		time_type = "0";
		time_start_vals = ["0","1","2", "3", "4", "5", "6", "7","8", "9","10","11","12","13","14","15","16","17","18","19", "20", "21", "22"];
		time_end_vals = ["1","2", "3", "4", "5", "6", "7","8","9", "10","11","12","13","14","15","16","17","18","19","20",  "20", "21", "22", "23"];
		time_start = "9";
		time_end = "10";
		start_date_2 = "";
		choosen_id = '0';
		start_date = new Date();
		min_date = new Date();
		price = 0;
		sale = 0;
		fields_var = [{'id': '0', 'title': 'Выберите поле'}];
		time_type_restrict = -1;
		full_title = 'Аренда манежа';

		constructor( buttons=true, time_type=-1){
		this.buttons = buttons;
		this.time_type_restrict = time_type;
		if(time_type != -1){
			this.time_type = time_type;
		}
		this.get_free_fields();
		let p_type = 0;
		let sale = $scope.pricelist[this.type + "_" + this.time_type][1];
		if(sale != null && sale != '' &&  parseInt(sale) != 0){
			p_type = 1;
		}
		this.price = String($scope.pricelist[this.type + "_" + this.time_type][p_type]).split('.')[0].replace(/\D+/g,"");

		}

		init(ev){
			this.elem = ev;
		}
		get_to_times(){
			let res = [];
			for (var i = 0; i < this.time_end_vals.length; i++) {
				if(this.time_comparison(this.time_start, this.time_end_vals[i])){
					res.push(this.time_end_vals[i]);
				}
			}
			return res;
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
			this.price = String(this.get_price()).split('.')[0].replace(/\D+/g,"");
			this.full_title = this.get_title();
			this.sale = this.get_sale();
		}

		get_price(){
			let p_type = 0;
		let sale = $scope.pricelist[this.type + "_" + this.time_type][1];
		if(sale != null && sale != '' && parseInt(sale) != 0){
			p_type = 1;
		}
			let price = parseInt($scope.pricelist[this.type + "_" + this.time_type][p_type]);
			if(this.time_type == '0'){
				return String((parseInt(this.time_end) - parseInt(this.time_start)) * price).split('.')[0].replace(/\D+/g,""); 
			}else{
				return String(price).split('.')[0].replace(/\D+/g,"");
			}

		}
		have_sale(){
				let sale = $scope.pricelist[this.type + "_" + this.time_type][1];
				if(sale == '' ||  parseInt(sale) == 0 ||sale == null){
					return false;
				}
				return true;
		}

		get_sale_per(){
			return Math.ceil((this.coast_without_sale() - this.price) / this.coast_without_sale() * 100)
		}

		coast_without_sale(){
			let p_type = 0;
			let price = parseInt($scope.pricelist[this.type + "_" + this.time_type][p_type]);
			if(this.time_type == '0'){
				return String((parseInt(this.time_end) - parseInt(this.time_start)) * price).split('.')[0].replace(/\D+/g,""); 
			}else{
				return String(price).split('.')[0].replace(/\D+/g,"");
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
				$scope.warning_message = "Не выбран манеж";
				$scope.show_warning_message();
			}
		return this.full;

		}

		get_date(){
			if(this.time_type == '1'){
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
					tthis.fields_var = [{'id': '0', 'title': 'Выберите поле'}];
					tthis.fields_var = tthis.fields_var.concat(result.data);
					if(tthis.fields_var.length == 1){
						tthis.fields_var = [{'id': '0', 'title': 'К сожалению в это время нет доступных полей'}];
					}
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
		end_date = new Date(new Date().setDate(new Date().getDate() + 7));
		min_date = new Date();
		fields_var = [{'id': '0', 'title': 'Выберите поле'}];
	time_start_vals = ["0","1","2", "3", "4", "5", "6", "7","8", "9","10","11","12","13","14","15","16","17","18","19", "20", "21", "22"];
		time_end_vals = ["1","2", "3", "4", "5", "6", "7","8","9", "10","11","12","13","14","15","16","17","18","19","20",  "20", "21", "22", "23"];
		time_start = "9";
		title = "Аренда овец";
		choosen_trainer_id = '0';
		price = 0;
		start_date_2 = "";
		trainers_rents = [];
		sale = 0;
		time_type_restrict = -1;
		time_end = "10";
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
		}
		get_to_times(){
			let res = [];
			for (var i = 0; i < this.time_end_vals.length; i++) {
				if(this.time_comparison(this.time_start, this.time_end_vals[i])){
					res.push(this.time_end_vals[i]);
				}
			}
			return res;
		}


		time_comparison(f,s){
			return parseInt(s) > parseInt(f) ? true : false; 
		}

		check_full(){
			if (this.choosen_id != '0'){
				this.full = true;
			}else{
				scrollIntoView(this.elem[0]);
				$scope.warning_message = "Не выбрано поле";
				$scope.show_warning_message();
			}
		return this.full;

		}

		have_sale(){
				let sale = $scope.pricelist[this.type + "_" + this.time_type][1];
				if(sale == '' ||  parseInt(sale) == 0 ||sale == null){
					return false;
				}
				return true;
		}

		get_sale_per(){
			return Math.ceil((this.coast_without_sale() - this.price) / this.coast_without_sale() * 100)
		}

		coast_without_sale(){
			let p_type = 0;
			let price =  parseInt($scope.pricelist[this.type + "_" + this.time_type][p_type]);
			if(this.time_type == '0'){
				return (parseInt(this.time_end) - parseInt(this.time_start)) * price; 
			}
			else{
				return price;
			}

		}
		get_title(){
			let date = this.get_user_date();
			if(this.time_type == '0'){
				return this.title + ' ' + date[0] + ' с '+this.time_start+':00 по '+this.time_end+':00';
			}
			else if(this.time_type == '2'){

				return this.title + ' для занятия с тренером ' +  + ' ' + date[0].substr(1)
			}
			else{

				return this.title + " с " + date[0] + ' по ' + date[1];
			}
		}

		update(){
			this.price = this.get_price();
			this.full_title = this.get_title();
			this.sale = this.get_sale();
		}

		get_price(){
			let p_type = 0;
		let sale = $scope.pricelist[this.type + "_" + this.time_type][1];
		if(sale != null && sale != '' &&  parseInt(sale) != 0){
			p_type = 1;
		}
			let price =  parseInt($scope.pricelist[this.type + "_" + this.time_type][p_type]);
			if(this.time_type == '0'){
				return (parseInt(this.time_end) - parseInt(this.time_start)) * price; 
			}
			else{
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
			if(this.time_type == 1){
				this.end_date = new Date(
				this.start_date.getFullYear(),
				this.start_date.getMonth(),
				 this.start_date.getDate() + 7
				);
			}
			this.update();
			this.full = false;
			this.choosen_id = '0';
			let date_from = formatDate(this.start_date);
			this.start_date_2 = date_from;
			let tthis = this;
			$http.get('../api/services.php?type='+this.type+'&time_type='+this.time_type+'&date_from='+date_from+'&time_start='+this.time_start+'&time_end='+this.time_end).then(
				function success(result) {
					tthis.fields_var = [{'id': '0', 'title': 'Выберите поле'}];
					tthis.fields_var = tthis.fields_var.concat(result.data);
					if(tthis.fields_var.length == 1){
						tthis.fields_var = [{'id': '0', 'title': 'К сожалению в это время нет доступных полей'}];
					}
				});
			this.get_trainings();
		}

		get_trainings(){
			let date_from = formatDate(this.start_date);
			let tthis = this;
			$http.get('../api/services.php?move=3&date_from='+date_from+'&time_type='+this.time_type+'&time_start='+this.time_start+'&time_end='+this.time_end).then(function success(result){
				tthis.trainers_rent = result.data;
			});
		}


	}

	


	class Workout{
		full = false;
		class = 'workout';
		type = '5';
		time_type = '0';
		time_start = "9";
		time_end = "10";
		elem = [];
		start_date = new Date();
		min_date = new Date();
	time_start_vals = ["0","1","2", "3", "4", "5", "6", "7","8", "9","10","11","12","13","14","15","16","17","18","19", "20", "21", "22"];
		time_end_vals = ["1","2", "3", "4", "5", "6", "7","8","9", "10","11","12","13","14","15","16","17","18","19","20",  "20", "21", "22", "23"];
		start_date_2 = "";
		choosen_id = '7';
		choosen_field_id = '0';
		choosen_trainer_id = '0';
		buttons=true;
		choosen_id2 = '';
		trains_var = [];
		title = "Занятие с тренером";
		sale = 0;

		constructor(buttons=true){
			this.buttons = buttons;
			this.update();
			if($scope.trainers_days_list.indexOf(formatDate(this.start_date)) == -1){
				this.start_date = new Date($scope.trainers_days_list[0] ? $scope.trainers_days_list[0] : new Date() );
			}
			//this.get_trainers();

		}
		choosen_id_fied_check(){
			let choosed = [];
			for (var i = this.trains_var.length - 1; i >= 0; i--) {
				if(this.trains_var[i].id == this.choosen_field_id){
				choosed = this.trains_var[i];
				}
			}
			this.choosen_id2 = choosed.id; 
			this.start_date = new Date(choosed.date_from + ' 00:00:00');
			this.start_date2 = choosed.date_from;
			
		}


		get_to_times(){
			let res = [];
			for (var i = 0; i < this.time_end_vals.length; i++) {
				if(this.time_comparison(this.time_start, this.time_end_vals[i])){
					res.push(this.time_end_vals[i]);
				}
			}
			return res;
		}

		init(ev){
			this.elem = ev;
		}

		time_comparison(f,s){
			return parseInt(s) > parseInt(f) ? true : false; 
		}

		check_full(){
			if (this.choosen_trainer_id != '0'){
				this.full = true;
			}else{
				scrollIntoView(this.elem[0]);
						$scope.warning_message = "Не выбрано занятие";
				$scope.show_warning_message();
								this.full = false;

				return false;
			}
			if(this.choosen_field_id != '0'){
				this.full = true;
			}else{
				scrollIntoView(this.elem[0]);
						$scope.warning_message = "Не выбрано занятие";
				$scope.show_warning_message();
				this.full = false;
				return false;
			}
			return this.full;
		}
		get_title(){
			let date = this.get_user_date();
			if(this.start_date2 == undefined){
			return this.title ;

			}else{
				let fio = '';
				for (var i = $scope.trainers.length - 1; i >= 0; i--) {
					if($scope.trainers[i].id == this.choosen_trainer_id){
						fio = $scope.trainers[i].fio;
					}
				}
			return this.title + ' c  ' + fio + ' в ' + this.start_date2.substr(0, 10) + ' с '+this.time_start+':00 по '+this.time_end+':00';
			}
		}


		update(){
			if(this.time_end == null){
				this.time_end = String(parseInt(this.time_start) + 1);
			}
			this.price = this.get_price();
			this.full_title = this.get_title();
			this.sale = this.get_sale();
		}

		have_sale(){
				let sale = $scope.pricelist[this.type + "_" + this.time_type][1];
				if(sale == '' ||  parseInt(sale) == 0 ||sale == null){
					return false;
				}
				return true;
		}

		get_sale_per(){
			return Math.ceil((this.coast_without_sale() - this.price) / this.coast_without_sale() * 100)
		}

		coast_without_sale(){
			let p_type = 0;
			
			let price =  parseInt($scope.pricelist[this.type + "_" + this.time_type][p_type]);
			return (parseInt(this.time_end) - parseInt(this.time_start)) * price; 


		}

		get_price(){
				let p_type = 0;
		let sale = $scope.pricelist[this.type + "_" + this.time_type][1];
		if(sale != null && sale != '' && parseInt(sale) != 0){
			p_type = 1;
		}
			let price =  parseInt($scope.pricelist[this.type + "_" + this.time_type][p_type]);
			return (parseInt(this.time_end) - parseInt(this.time_start)) * price; 

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
			let start_date = new Date(this.start_date.getTime());
				start_date.setUTCHours(parseInt(this.time_start),0,0);
				let end_date = new Date(start_date.getTime());
				end_date.setUTCHours(parseInt(this.time_end),0,0);
				return [time(start_date), time(end_date), this];

		}

		get_trainings(){
			let tthis = this;
			$http.get('../api/services.php?move=5&trainer='+this.choosen_trainer_id).then(function success(result){
				tthis.trains_var = result.data;
			});
		}

		get_trainers(){
			this.full = false;
			this.choosen_id = '0';
			let date_from = formatDate(this.start_date);
			this.start_date_2 = date_from;
			let tthis = this;
			$http.get('../api/services.php?move=3&time_type='+this.time_type+'&date_from='+date_from+'&time_start='+this.time_start+'&time_end='+this.time_end).then(
				function success(result) {
					tthis.trains_var = [{'id':'0', 'lable': 'Выберите занятие'}];
					for (var i = result.data.length - 1; i >= 0; i--) {
						tthis.trains_var.push({'id': result.data[i].id, 'lable': "Занятие у "+result.data[i].fio+" на "+result.data[i].title})
						}

				});
						this.update();

		}
	}


	class Sheels{
		full = false;
		type = '4';
		class = 'sheels';
		title = "Аренда снарядов";
		elem = [];
		time_type = '0';
		choosen_id = '4';
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
		have_sale(){
				let sale = $scope.pricelist[this.type + "_" + this.time_type][1];
				if(sale == '' || parseInt(sale) == 0 ||sale == null){
					return false;
				}
				return true;
		}

		get_sale_per(){
			return Math.ceil((this.coast_without_sale() - this.price) / this.coast_without_sale() * 100)
		}

		coast_without_sale(){
			let p_type = 0;
			
		let price =  parseInt($scope.pricelist[this.type + "_" + this.time_type][p_type]);
			return price;


		}

		get_price(){
				let p_type = 0;
		let sale = $scope.pricelist[this.type + "_" + this.time_type][1];
		if(sale != null && sale != '' &&  parseInt(sale) != 0){
			p_type = 1;
		}
			let price =  parseInt($scope.pricelist[this.type + "_" + this.time_type][p_type]);
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
			let start_date = new Date(this.start_date.getTime());
			start_date.setUTCHours(0,0,0);
			let end_date = new Date(start_date.getTime());
			end_date.setDate(end_date.getDate() + 1);
			return [time(start_date), time(end_date), this];
		}

	}


	class SubscriptionSheep{
		full = false;
		class = 'subscriptionsheep';
		items_type = '';
		type = '6';
		dates = [];
		count = 0;
		sale = 0;
		time_type = '0';
		time_start_vals = ["9","10","11","12","13","14","15","16","17","18","19"];
		elem = [];
		min_date = new Date();
		start_date = new Date();
		items = [];
		price = 0;
		sale = 0;
		title = "";

		constructor(count, sale, title){
			this.count = count;
			this.sale = sale;
			this.title = title;
			this.update();
		}

		init(ev){
			this.elem = ev;
		}
		get_title(){
				return this.title;
		}

		get_free_fields(date){
				date.time_end = String(parseInt(date.time_start) + 1);
						date.full = false;
			date.choosen_id = '0';
			let date_from = formatDate(date.date);
			let tthis = date;
			$http.get('../api/services.php?type='+date.type+'&time_type='+this.time_type+'&date_from='+date_from+'&time_start='+date.time_start+'&time_end='+date.time_end).then(
				function success(result) {
					tthis.fields_var = [{'id':'0', 'title': 'Выберите поле'}];
					tthis.fields_var = tthis.fields_var.concat(result.data);
					if(tthis.fields_var.length == 1){
						tthis.fields_var = [{'id':'0', 'title': 'К сожалению в это время нет доступных полей'}];
					}

				});
		}

		update(){
			this.price = this.get_price();
			this.full_title = this.get_title();
			this.sale = this.get_sale();
		}

		get_price(){
			let price =  parseInt($scope.pricelist["2_" + this.time_type]);
			return (price * this.count) * ((100 - this.sale) / 100)
		}

		get_sale(){
			return parseInt(this.sale) + '%';
		}

		add_date(){
			if(this.dates.length >= this.count){
				$scope.warning_message = "Вы уже выбрали максимальное количество дат";
				$scope.show_warning_message();
				return 0;
			}
			for (var i = this.dates.length - 1; i >= 0; i--) {
				if(this.dates[i].date == formatDate(this.start_date)){
						$scope.warning_message = "Вы уже выбрали эту дату";
				$scope.show_warning_message();

				return 0;
				}
			}
			let date = {
				'date':formatDate(this.start_date),
				 'time_start': '9',
				 'time_end': '10',
				 'choosen_id': "0",
				 'type': '2',
				 'fields_var': []
			};
			this.dates.push(date);
			this.get_free_fields(date);

			this.dates.sort(function(a,b){
			  return new Date(a.date) - new Date(b.date);
			});

		}

		del_date(date){
			this.dates.splice(this.dates.indexOf(date), 1);
		}

		check_full(){
			let res = true;
			for (var i = this.dates.length - 1; i >= 0; i--) {
				if(this.dates[i].choosen_id == '0'){
					res = false;
					scrollIntoView(this.elem[0]);
				$scope.warning_message = "Вы выбрали загоны не для всех дат";
				$scope.show_warning_message();
				}
			}
			if(this.dates.length != this.count){
				res = false;
				scrollIntoView(this.elem[0]);
				$scope.warning_message = "Надо выбрать еще " + (this.count - this.dates.length) + ' дат';
				$scope.show_warning_message();
			}
			this.full = res;
			return res;
		}

	}


	class SubscriptionWorkout{
class = 'subscriptionworkout';
		type = '7';
		count = 0;
		time_type = '0';
		sale = 0;
		elem = [];
		price = 0;
		sale = 0;
		sub_count = 1;
		title = "";

		constructor(count, sale, title){
			this.count = count;
			this.sale = sale;
			this.title = title;
			this.sale2 = sale;
			this.full_title = title;
			this.update();
		}
		init(ev){
			this.elem = ev;
		}
		get_price(){
			let price =  parseInt($scope.pricelist["5_" + this.time_type]);
			return (price * this.count) * ((100 - this.sale2) / 100) * this.sub_count;
		}
		update(){
			this.price = this.get_price();
			this.sale = this.get_sale();
		}

		get_sale(){
			return parseInt(this.sale) + '%';
		}
		minus(){
			if(this.sub_count >= 2){
				this.sub_count -=1;
				this.update();
			}
		}
		plus(){
			this.sub_count += 1;
			this.update();
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
			if(!validateEmail($scope.email)){
				$scope.warning_message = 'Введите верный email';
				document.getElementById('email').scrollIntoView();
				$scope.show_warning_message();
				return false;
			}
			$scope.phone = document.getElementById('tel').value;
			if($scope.fio == '' || $scope.email == '' || $scope.phone == ''){
				$scope.warning_message = 'Введите контактные данные';
				document.getElementById('fio').scrollIntoView();
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
	 		let people_count = document.getElementById('people-counter');
	 		if(people_count){
	 		$scope.people_count = parseInt(document.getElementById('people-counter').value);
	 		}
	 		if($scope.people_count > houses_people_sum && houses_people_sum != 0){
	 			$scope.warning_message = "Количество мест в домах не рассчитано на количество постояльцев, которое вы указали";
	 			document.getElementById('people-counter').scrollIntoView();
	 			$scope.show_warning_message();
	 			return false;
	 		}
	 		for (var i = this.items.length - 1; i >= 0; i--) {

	 			this.items[i].start_date = new Date(new Date(this.items[i].start_date).getTime() - new Date(this.items[i].start_date).getTimezoneOffset() * 60 * 1000);
	 			this.items[i].start_date2 = new Date(new Date(this.items[i].start_date2).getTime() - new Date(this.items[i].start_date).getTimezoneOffset() * 60 * 1000);
	 		}

	 		let user = {'name': $scope.fio, 'email': $scope.email, 'phone': $scope.phone,'tg': $scope.tg , 'is_wholesaler': $scope.whole_saler * 1,
	 		 'sending_notifications': $scope.sending_notifications * 1, 'person_count': $scope.people_count};
	 		$http({
			    url: '../api/payment.php',
			    method: "POST",
			    data: 'cart='+JSON.stringify(this.items)+'&user='+JSON.stringify(user),
			        headers: {'Content-Type': 'application/x-www-form-urlencoded'}

			    
			    }).then(function success(result) {
			  //  	console.log(result);
			  document.location.href = result.data;
			    });


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
							
							scrollIntoView(gap2[2].elem[0]);
							$scope.warning_message = "Данное время конфликтует с предыдущей услугой";
							$scope.show_warning_message();
							return result;
						}else{
						
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
	$scope.dis_dates = [];
	$scope.trainers_days_list = []
	
	$scope.check_houses_to_present = function(){
		let choosen_houses = [];
		for (var i = 0; i < $scope.houses.length; i++) {
			if($scope.houses[i].choose){
				choosen_houses.push($scope.houses[i]);
			}
		}
		let present_houses_count = Math.floor(choosen_houses.length / 7);
		if(present_houses_count != 0){
		let sorted_houses = choosen_houses;
		for (var i = 0; i < $scope.houses.length; i++) {
			$scope.houses[i].present = false;
			$scope.houses[i].update();
		}
		sorted_houses = sorted_houses.sort(function (a, b){
		if (a.data.dis == 'y' && b.data.dis == 'n') return 1;
		 if (a.data.class_id < b.data.class_id) return -1;
	  if (a.data.class_id > b.data.class_id) return 1;
	  // при равных score сортируем по time
	  if (a.price < b.price) return -1;
	  if (a.price > b.price) return 1;
	  if (a.id < b.id) return -1;
	  if (a.id > b.id) return 1;
		}).reverse();
		for (var i = 0; i < $scope.houses.length; i++) {
			$scope.houses[i].present = false;
		}	
		for (var i = 0; i < present_houses_count; i++) {
			sorted_houses[i].present = true;
			sorted_houses[i].update();
		}
	}else{
		for (var i = 0; i < $scope.houses.length; i++) {
			$scope.houses[i].present = false;
			$scope.houses[i].update();
		}
	}
	}

	$scope.get_trainers = function(){
		$http.get('../api/services.php?move=2').then(function success(result){
			$scope.trainers = [{'id':'0', 'fio':'Выберите тренера'}]
			$scope.trainers = $scope.trainers.concat(result.data);
		});
	}
	$scope.get_trainers();
	$scope.rent_all = function() {
		if($scope.rent_all_check){
		$scope.whole_saler = true;
		for (var i = $scope.houses.length - 1; i >= 0; i--) {
			$scope.houses[i].choose_house();
		}
		$scope.check_cart_btn();
		$scope.check_houses_to_present();
	}else{
		for (var i = $scope.houses.length - 1; i >= 0; i--) {
			$scope.houses[i].unchoose_house();
		}
		$scope.check_cart_btn();
		$scope.check_houses_to_present();
	}
	};


	$scope.update = function(){

		$scope.check_houses_to_present();
	 	$scope.house_start.min_date = new Date();
		$scope.house_end.min_date = new Date(
			$scope.house_start.getFullYear(),
			$scope.house_start.getMonth(),
			 $scope.house_start.getDate() + 1,0, 0, 0
			);
	
		 
		 	if(new Date(formatDate($scope.house_start)) >= new Date(formatDate($scope.house_end))){
		 	$scope.house_end =  new Date(
			$scope.house_start.getFullYear(),
			$scope.house_start.getMonth(),
			 $scope.house_start.getDate() + 1, 0, 0, 0
			);
		 }
		 let flag2 = false;
		 	for (var i = 0; i < $scope.dis_dates.length; i++) {
		 		if(checkDateEntrance(new Date($scope.dis_dates[i]), $scope.house_start, $scope.house_end)){
		 			flag2 = true;
		 			break;
		 		}
		 	}
		 	if (flag2) {
		 		$scope.house_end =  new Date(
			$scope.house_start.getFullYear(),
			$scope.house_start.getMonth(),
			 $scope.house_start.getDate() + 1
			);
		 	}
		 /*let check_start = new Date($scope.house_start);
		 let check_end = formatDate($scope.house_end);

		 while(formatDate(check_start) != chekc_end){
		 	check
		 }*/
	
		let date_from = $scope.house_start.getFullYear() + '-' + ($scope.house_start.getMonth() + 1) + '-' + $scope.house_start.getDate();
		let date_to = $scope.house_end.getFullYear() + '-' + ($scope.house_end.getMonth() + 1) + '-' + $scope.house_end.getDate();
				$('[href*="brandjs"],.w-webflow-badge').attr('style', 'display:none !important');$('a[href="'+window.location.href+'"]').addClass('w--current');
					document.querySelector('#ftco-loader-update').classList.add('show');

		$http.get('../api/houses.php?class='+$scope.class.join('|')+'&camp='+$scope.camp.join('|')+'&date_from='+date_from+'&date_to='+date_to).then(
			function success(result) {
				let mas = [];
				$scope.dis_dates = result.data.dates;
				/*for (var i =  0; i < $scope.dis_dates.length; i++) {
					if($scope.dis_dates[i] == formatDate($scope.house_start)){
						$scope.house_start = $scope.house_start.setDate($scope.house_start.getDate() + 1);
					}
				}*/
				for (var i = result.data.houses.length - 1; i >= 0; i--) {
					mas.push(new House(result.data.houses[i]));
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
				$scope.houses = pre_mas.sort(function(a,b){
							if (a.data.dis <= b.data.dis){
								return 1;
							};
				});
				if($scope.dis_dates.indexOf(formatDate($scope.house_start)) != -1){
				let some_d = new Date($scope.house_start.getFullYear(),
			$scope.house_start.getMonth(),
			 $scope.house_start.getDate() + 1,0, 0, 0);
			 $scope.house_start = new Date(some_d);
			 setTimeout( $scope.update, 500);
						 return 0;
				}
			
				setTimeout(function(){
					document.querySelector('#ftco-loader-update').classList.remove('show');
				}, 1000)
			$scope.check_cart_btn();
			}
			);

	
	
	}

	$scope.services_click = function(as){
		$scope.check_cart_btn();
		if(as){
			$scope.pre_open_cart();
			document.querySelector(".offer-modal").classList.remove("d-none");
			document.querySelector("#take-offer").classList.remove("d-none");
		}
	}

	$scope.check_cart_btn = function(){
		let house_flag = false;
		let sub_flag = false;
		for (var i = 0; i < $scope.subscription.length; i++){
				if($scope.subscription[i].check){
					sub_flag = true;
					break;
				}
			}
			for (var i = 0; i < $scope.houses.length; i++) {
				if ($scope.houses[i].choose){
					house_flag = true;
					break;
				}
			}
		if($scope.sheeps || $scope.sheels || $scope.playpen || $scope.workout || sub_flag || house_flag){
			document.getElementById('take-offer').classList.remove('d-none');
		}else{
			document.getElementById('take-offer').classList.add('d-none');
		}
	}; 

	function scrollIntoView(elem) {
		   var e = elem.getElementsByTagName('div')[0];
		   if (!!e && e.scrollIntoView) {
		       e.scrollIntoView();
		   }
		}

	function get_price_list(){
		$http.get('../api/services.php?move=1').then(function success(result) {
			let data = result.data;
			let res = {};
			for (var i = data.length - 1; i >= 0; i--) {
				let key = data[i].config.type + '_' + data[i].config.time_type;
				res[key] = [data[i].price, data[i].sale];
			}
			$scope.pricelist = res;
		});
	}

	get_price_list();

		$scope.get_subscription = function(){
			$http.get('../api/subscription.php?move=1').then(function success(result) {
				$scope.subscription = result.data;
			});
		};
		 $scope.get_subscription();
	$scope.update();

		function time(date){

		return parseInt((date.getTime() + date.getTimezoneOffset() * 60 * 1000)/1000);
		}
		
		$scope.filter_class = function(id) {
			document.getElementById('date-filter').classList.remove('d-none');
			document.getElementById('rent-all').classList.remove('d-none');

			
			if($scope.class.indexOf(id) == -1){
				$scope.class.push(id);
			}
			else{
				$scope.class.splice($scope.class.indexOf(id), 1); 

			}
			$scope.update();
		};


		$scope.filter_camp = function(id) {
			document.getElementById('class-filter').classList.remove('d-none');
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

		$scope.trainers_days = function(){
			$http.get('../api/services.php?move=4').then(function success(result){
			$scope.trainers_days_list = result.data;
			});
		}
		$scope.trainers_days();

		$scope.rent_all_text = function(){
			if(!$scope.rent_all_check){
				return 'Выбрать все';
			}else{
				return 'Отменить выбор';
			}
		}
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
			if(elem.length > 6){
				$scope.whole_saler = true;
				$scope.whole_saler_preview();
			}else{
				$scope.open_cart();
			}
		}


		$scope.OnlyTrainersDays = function(date){
			if($scope.trainers_days_list.indexOf(formatDate(date)) == -1){
				return false;
			} 
			return true;
		}

		$scope.onlyWeekendsPredicate = function(date) {
			let fdate = formatDate(date);
			let ndate = formatDate(new Date(date).setDate(new Date(date).getDate() + 1))
    		var day = date.getDay();
    		return $scope.dis_dates.indexOf(fdate) === -1 && date >= new Date().setDate(new Date().getDate() - 1) ;
  		};
  		$scope.onlyWeekendsPredicate2 = function(date) {
			let fdate = formatDate(date);
    		var day = date.getDay();
    		let flag2 = true;
    		let first_dis = '';
    		let check_start = new Date($scope.house_start);
		 	for (var i = 0; i < $scope.dis_dates.length; i++) {
		 		if(checkDateEntrance(new Date($scope.dis_dates[i]), check_start, date)){
		 			first_dis = $scope.dis_dates[i];
		 			flag2 = false;
		 			break;
		 		}
		 	}
		 	for (var i = $scope.dis_dates.length - 1; i >= 0; i--) {
		 		if(new Date($scope.dis_dates[i]).getTime() >= new Date($scope.house_start).getTime()){
		 			first_dis = $scope.dis_dates[i];
		 		}
		 	}
		/* while(formatDate(check_start) != check_end){
		 	check_start.setDate(check_start.getDate() + 1);
		 	if ($scope.dis_dates.indexOf(formatDate(check_start)) != -1){
		 		flag2 = false;
		 		break;
		 	}
		 }*/
		 if( formatDate(date) == first_dis){
		 	return true;
		 }
    		return ($scope.dis_dates.indexOf(fdate) === -1 || first_dis == formatDate(date)) && date >= new Date().setDate(new Date().getDate() - 1) && flag2;
  		};

  		function checkDateEntrance(date, start, end) {

		  if (date >= start && date <= end)
		    return true;
		  else
		   	return false;
		}

		$scope.open_cart = function() {

			let elems = [];
			if($scope.cart instanceof Cart){
				elems = $scope.cart.get_services();
			}
			if ($scope.sheeps){
				let flag = true;
				for (var i = elems.length - 1; i >= 0; i--) {
					if(elems[i] instanceof Sheeps){
						flag = false;
					}
				}
				if(flag){
				elems.push(new Sheeps());
			}
			}else{
				let flag = false;
				let elem = [];
				for (var i = elems.length - 1; i >= 0; i--) {
					if(elems[i] instanceof Sheeps){
						flag = true;
						elem = elems[i];
					}
				}
				if(flag){
				elems.splice(elems.indexOf(elem), 1);
				}
			}
			if ($scope.workout){
				let flag = true;
				for (var i = elems.length - 1; i >= 0; i--) {
					if(elems[i] instanceof Workout){
						flag = false;
					}
				}
				if(flag){
				elems.push(new Workout());
			}
			}else{
				let flag = false;
				let elem = [];
				for (var i = elems.length - 1; i >= 0; i--) {
					if(elems[i] instanceof Workout){
						flag = true;
						elem = elems[i];
					}
				}
				if(flag){
				elems.splice(elems.indexOf(elem), 1);
				}
			}
			if ($scope.sheels){
				let flag = true;
				for (var i = elems.length - 1; i >= 0; i--) {
					if(elems[i] instanceof Sheels){
						flag = false;
					}
				}
				if(flag){
				elems.push(new Sheels());
			}
			}else{
				let flag = false;
				let elem = [];
				for (var i = elems.length - 1; i >= 0; i--) {
					if(elems[i] instanceof Sheels){
						flag = true;
						elem = elems[i];
					}
				}
				if(flag){
				elems.splice(elems.indexOf(elem), 1);
				}
			}
			if ($scope.playpen){
					let flag = true;
				for (var i = elems.length - 1; i >= 0; i--) {
					if(elems[i] instanceof Playpen){
						flag = false;
					}
				}
				if(flag){
				elems.push(new Playpen());
			}
			}else{
				let flag = false;
				let elem = [];
				for (var i = elems.length - 1; i >= 0; i--) {
					if(elems[i] instanceof Playpen){
						flag = true;
						elem = elems[i];
					}
				}
				if(flag){
				elems.splice(elems.indexOf(elem), 1);
				}
			}
			for (var i = 0; i < $scope.subscription.length; i++){
				if($scope.subscription[i].check){
					if($scope.subscription[i].service_type == '6'){
					elems.push(new SubscriptionSheep($scope.subscription[i].count, $scope.subscription[i].sale, $scope.subscription[i].title));
				}else{
					elems.push(new SubscriptionWorkout($scope.subscription[i].count, $scope.subscription[i].sale, $scope.subscription[i].title));
								}
				}
			}
			for (var i = 0; i < $scope.houses.length; i++) {
				if ($scope.houses[i].choose){
					elems.push($scope.houses[i]);
				}
			}
			$scope.cart = new Cart(elems);
		}


	
		$scope.del_elem_form_cart = function(elem) {
			if(elem instanceof House){
				elem.toggle_house();
			}
			$scope.cart.items.splice($scope.cart.items.indexOf(elem), 1);
			$scope.update();
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
		}


	});

rentals.filter('sumColumn', function(){
        return function(dataSet, columnToSum){
        	            let sum = 0;

        	try {
            for(let i = 0; i < dataSet.length; i++){
                sum += parseFloat(dataSet[i][columnToSum]) || 0;
            }
} catch (err) {
}
            return sum;
        };
    })