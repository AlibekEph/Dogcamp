var orders = angular.module('orders', []);
orders.controller('ordersCtrl',  function($scope, $http){
	$scope.open_change_status = function(id){
				$scope.now_id = id;
		$http.get('../../api/orders.php?move=1&id='+id).then(function success(result){
		console.log(result);
		let all = [];
		for (var i = 0; i < result.data.all.length; i++) {
			if(result.data.all[i]['id'] != '1'){
			all.push(result.data.all[i]);
		}
		}
		$scope.all = all;
		$scope.now = result.data.need.status;
		let modal = document.querySelector("#modal-info");
		modal.classList.add("show");
        modal.style.width = 100 + "%";
        modal.style.height = 100 + "%";
		});
		
	}
	$scope.close_change_status = function(){
	 let modal = document.querySelector("#modal-info")
    modal.classList.remove("show")
    modal.style.width = 0
    modal.style.height = 0	
	}

	$scope.open_notif_modal = function(id, last_date){
		$scope.now_date_id = id;
		$scope.last_date = last_date;
		let modal = document.querySelector("#modal-info2");
		modal.classList.add("show");
        modal.style.width = 100 + "%";
        modal.style.height = 100 + "%";
	}
	$scope.close_date = function(){
	 let modal = document.querySelector("#modal-info2")
    modal.classList.remove("show")
    modal.style.width = 0
    modal.style.height = 0	
	}
});