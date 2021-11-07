var services = angular.module('Services', []);
services.controller('ServicesCtrl', function($scope, $http){
	$scope.now_chooses = '0';


	$scope.show_line = function(type){
		if($scope.now_chooses == '0' || $scope.now_chooses == type){
			return true;
		}
		return false;
	}
});