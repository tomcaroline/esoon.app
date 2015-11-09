/**
 * Created by Administrator on 2015/10/29.
 */
var login = angular.module('login',['ionic','register']);
login.controller('LoginController',function($scope,regcheck){
    $scope.user = {
        phone: '',
        pwd: ''
    }
    $scope.submit = function(){
        if (regcheck.isphone($scope.user.phone) == false) {
            return;
        }
        else{

        }
    }
});
