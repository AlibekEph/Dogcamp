var stat = angular.module('Stat', []);
stat.controller('statCtrl',  function($scope, $http){
	$scope.months = [];
	var now_date = new Date();
	$scope.month_name = {
		0: 'январь',
		1: 'февраль',
		2: 'март',
		3: 'апрель',
		4: 'май',
		5: 'июнь',
		6: 'июль',
		7: 'август',
		8: 'сентябрь',
		9: 'октябрь',
		10: 'ноябрь',
		11: 'декабрь'
		 }
	$scope.now_date_select = String(parseInt(((now_date.getMonth() + 0) % 12)+ 1)) + " "+ String(Math.floor(now_date.getFullYear() + ((now_date.getMonth() + 1 + 0) / 13)));
	for (var i = 0; i < 11; i++) {
		$scope.months.push(String(parseInt(((now_date.getMonth() + i) % 12)+ 1)) + " "+ String(Math.floor(now_date.getFullYear() + ((now_date.getMonth() + 1 + i) / 13))))
	}
	function checkDateEntrance(date, start, end) {

		  if (date >= start && date <= end){

		    return true;
		}
		  else{

		   	return false;
		   }
		}
	$scope.hours = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
	$scope.get_all = function(){
	$scope.houses = [];
	$scope.result = [];

	$http.get('../../api/services.php?move=8').then(function success(result){
		console.log(result);

				let month = String(now_date.getMonth() + 1);

		$scope.houses = result.data;
		for (var i = 0; i <= 30; i++) {
			$scope.result.push([i, []]);
			for(var j = 0; j <= 16; j++){
				$scope.result[i][1].push({});
				for (var house = $scope.houses.length - 1; house >= 0; house--) {
					let from_date =  new Date($scope.houses[house]['from_date']);
					let to_date =  new Date($scope.houses[house]['to_date'])
					let month_now = String(parseInt($scope.now_date_select.split(' ')[0]));
					let year_now = String(parseInt($scope.now_date_select.split(' ')[1]));
					let now = new Date(month_now +'/'+String(i+1)+'/'+year_now+' '+String(j+6)+':00');
					if(checkDateEntrance(now,from_date, to_date)){
						if(!($scope.houses[house]['order_id']  in $scope.result[i][1][j])){
							$scope.result[i][1][j][$scope.houses[house]['order_id']] = [];
						}
						$scope.result[i][1][j][$scope.houses[house]['order_id']].push([$scope.houses[house]['id'],["— "+$scope.houses[house]['trainer_fio'], '— №'+$scope.houses[house]['order_id'], '— '+$scope.houses[house]['name']]]);
					}
				}
			}
		}
		console.log($scope.result)
	});
}
$scope.get_all();

	$scope.have_houses = function(spis){
		if(Object.keys(spis).length == 0){
			return false;
		}
		return true;
	}

	$scope.get_date_part = function(){
		let month_now = String(parseInt($scope.now_date_select.split(' ')[0]));
					let year_now = String(parseInt($scope.now_date_select.split(' ')[1]));

		return "."+String(month_now) + '.' + year_now;
	}

	$scope.open_modal = function(spis, day){
		if(Object.keys(spis).length != 0){
			  let modal = document.querySelector("#modal-info");
			   modal.classList.add("show");
        modal.style.width = 100 + "%";
        modal.style.height = 100 + "%";
		$scope.modal_val = [day,spis];
		}
	}

	$scope.show_da = function(sp){
	}
	$scope.get_month_name = function(month){
			let s = month.split(' ');
			let p1 = $scope.month_name[s[0] - 1];
			let p2 = s[1];
			return p1 + ' ' + p2;
	}

});