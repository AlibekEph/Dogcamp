var order = angular.module('order', []);
order.controller('orderCtrl',  function($scope){
	$scope.product = [];
	$scope.product.delivery = 100;
	$scope.product.freeDelivery = false;
	$scope.product.ownDelivery = false;
	$scope.sum = 0;
	$scope.add_product = function() {
		$scope.product.push(new Object());
		$scope.product[$scope.product.length - 1]['count'] = 1;
	};
	$scope.del_product = function(index) {
		$scope.product.splice(index, 1);
		$scope.upload_price();
	};
	$scope.upload_delivery = function(){
		if($scope.product.ownDelivery){
			document.querySelector("#address").value = "Пожарского 18"
			$scope.product.freeDelivery = true;
			$scope.product.delivery = 0;
		}
	}
	$scope.upload_price = function() {
		let new_sum = 0;
		for (var i = $scope.product.length - 1; i >= 0; i--) {
			if("product" in $scope.product[i]){
				new_sum += parseInt($scope.product[i]['product'].split(' ')[1]) * $scope.product[i]['count'];
			}
		}
		
		if($scope.product.discount && $scope.product.discount > 0){
			$scope.sum = Math.round(new_sum * (1 - ($scope.product.discount / 100)));
		} else{
			$scope.sum = new_sum;
		}
		
		if($scope.product.freeDelivery){
		    $scope.product.delivery = 0;
		} else{
			$scope.product.delivery = 100;
		}
		

	};
});