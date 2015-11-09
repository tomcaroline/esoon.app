var user = angular.module('user',['ionic']);
user.controller('UserController', ['$scope', function($scope){
	$scope.userinfo = {
		username: 'tomcaroline',
		useraddr: '四川，乐山'
	};
	$scope.hasMsg = false;
	$scope.showmsg = function(){
		$scope.hasMsg = true;
	};
}]);