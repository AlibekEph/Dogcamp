var stat = angular.module('Stat', []);
stat.controller('statCtrl',  function($scope, $http){
	function checkDateEntrance(date, start, end) {
		  if (date >= start && date <= end){
		    return true;
		}
		  else{

		   	return false;
		   }
		}
	$scope.days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
	$scope.month = {
		1: 'январь',
		2: 'февраль',
		3: 'март',
		4: 'апрель',
		5: 'май',
		6: 'июнь',
		7: 'июль',
		8: 'август',
		9: 'сентябрь',
		10: 'октябрь',
		11: 'ноябрь',
		12: 'декабрь'
		 }
	$scope.houses = [];
	$scope.result = {};
	var now_date = new Date();

	$http.get('../../api/services.php?move=6').then(function success(result){
		console.log(result);
		$scope.houses = result.data;
		let year_p = 0
		for (var i = 1; i <= 13; i++) {
			let month = (now_date.getMonth() + i) % 13;
			if((now_date.getMonth() + i) % 13== 0){
				month += 1;
				year_p= 1;
				i += 1;

			}
						let year = now_date.getFullYear() + year_p;

			$scope.result['+'+month+' '+year] = [];
			for(var j = 1; j <= 31; j++){
				$scope.result['+'+month+' '+year][j] = {};
				for (var house = $scope.houses.length - 1; house >= 0; house--) {
					let from_date =  new Date($scope.houses[house]['from_date']+' 00:00:00');
					//from_date.setMonth(from_date.getMonth() - 1);
					let to_date =  new Date($scope.houses[house]['to_date']+' 00:00:00')
					//to_date.setMonth(to_date.getMonth() - 1);

					if(checkDateEntrance(new Date(month+'/'+String(j)+'/'+year),from_date, to_date)){
						if(!($scope.houses[house]['order_id']  in $scope.result['+'+month+' '+year][j])){
							$scope.result['+'+month+' '+year][j][$scope.houses[house]['order_id']] = [];
						}
						$scope.result['+'+month+' '+year][j][$scope.houses[house]['order_id']].push($scope.houses[house]['name'] + ' №'+$scope.houses[house]['house_id']);
					}
				}
			}
		}
		console.log($scope.result);
	});

	$scope.have_houses = function(spis){
		if(Object.keys(spis).length == 0){
			return false;
		}
		return true;
	}

	$scope.open_modal = function(spis, day){
		if(Object.keys(spis).length != 0){
			  let modal = document.querySelector("#modal-info");
			   modal.classList.add("show");
        modal.style.width = 100 + "%";
        modal.style.height = 100 + "%";
		$scope.modal_val = [day,spis];
		console.log($scope.modal_val);
		}
	}

	$scope.show_da = function(sp){
		console.log(sp);
	}

});