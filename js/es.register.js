/**
 * Created by Administrator on 2015/10/29.
 */
var reg = angular.module('register', ['ionic']);

reg.factory('regcheck', function ($ionicPopup) {
    return {
        'isphone': function (phone) {
            if (phone == undefined || phone == '') {
                $ionicPopup.alert({title: '警告', template: '手机号不能为空！'});
                return false;
            }
            var flag = !!phone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
            if (flag == false) {
                $ionicPopup.alert({title: '警告', template: '请输入正确的手机号!'});
                return false
            }
            return true;
        }
    }
});
reg.controller('RegController', function ($scope, $ionicPopup, $http, $timeout, regcheck) {
    $scope.reg = {
        school: '电子科技大学',
        phone: '',
        checkcode: '',
        pwd: ''
    }
    $scope.yzmtext = '发送验证码';
    $scope.typeofpwd = 'password';
    $scope.checkok = false;
    $scope.checkfal = false;
    $scope.looks = false;
    $scope.unlooks = true;
    $scope.send_id = '';
    $scope.isDisabled = false;
    //发送验证码
    $scope.telcode = function () {
        var tel = $scope.reg.phone;
        if (regcheck.isphone(tel) == false) {
            return;
        }
        //发送验证码请求
        $http.post('http://api.esoon.me:81/user/checkcode', {num: $scope.reg.phone})
            .success(function (data, status, headers, config) {
                if (data.status == 1) {
                    $scope.send_id = data.data.send_id;
                    waitTime(120);
                }
                if (data.status == 2) {
                    $ionicPopup.alert({title: '警告', template: '您的手机已被注册,请联系管理员！'});
                    return;
                }

            })
            .error(function (data, status, headers, config) {
                $ionicPopup.alert({title: '警告', template: '验证码发送失败！'});
                return;
            });
    }
    //验证验证码是否正确
    $scope.checkcode = function () {
        $http.post('http://api.esoon.me:81/user/verify_checkcode', {send_id: $scope.send_id, num: $scope.reg.checkcode})
            .success(function (data) {
                if (data.status == 1) {
                    $scope.checkok = true;
                }
                if (data.status == 0) {
                    $scope.checkfal = true;
                }
            })
            .error(function (data) {
                $scope.checkfal = true;
            })
    }
//按钮倒计时
    function waitTime(time) {
        var wait = time;
        if (wait == 0) {
            $scope.$apply(function () {
                $scope.isDisabled = false;
                $scope.yzmtext = "发送验证码";
            });
            return;
        }
        else {
            $scope.isDisabled = true;
            $scope.yzmtext = wait + '秒后重发';
            wait--;
            $timeout(function () {
                waitTime(wait);
            }, 1000);
        }
    }
    //切换查看密码
    $scope.look = function(){
        $scope.looks = true;
        $scope.unlooks = false;
        $scope.typeofpwd = 'text';
    }
    $scope.unlook = function(){
        $scope.looks = false;
        $scope.unlooks = true;
        $scope.typeofpwd = 'password';
    }
//注册提交按钮
    $scope.submit = function(){
        alert('ok');
    }
});