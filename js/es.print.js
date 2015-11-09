/**
 * Created by Administrator on 2015/10/30.
 */
var print = angular.module('print', ['ionic']);
print.directive('esColor',function(){
    return {
        scope: {
            esColor:'=',

        },
        link: function(scope,element,attrs){
            element.bind('click',function() {
                scope.$apply(function(){
                    if(scope.esColor == '黑色')
                    {
                        scope.esColor = '彩色';
                        element.text('黑色');
                    }
                    else{
                        scope.esColor = '黑色';
                        element.text('彩色');
                    }
                });
            });
        }
    }
});
print.directive('esDoublepage',function(){
    return {
        scope: {
            esDoublepage:'=',

        },
        link: function(scope,element,attrs){
            element.bind('click',function() {
                scope.$apply(function(){
                    if(scope.esDoublepage == '单面')
                    {
                        scope.esDoublepage = '双面';
                        element.text('单面');
                    }
                    else{
                        scope.esDoublepage = '单面';
                        element.text('双面');
                    }
                });
            });
        }
    }
});
print.directive('esYasuo',function(){
    return {
        scope: {
            esYasuo:'=',

        },
        link: function(scope,element,attrs){
            element.bind('click',function() {
                scope.$apply(function(){
                    if(scope.esYasuo == '正常')
                    {
                        scope.esYasuo = '压缩';
                        element.text('正常');
                    }
                    else{
                        scope.esYasuo = '正常';
                        element.text('压缩');
                    }
                });
            });
        }
    }
});
print.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    //scope.fileread = changeEvent.target.files[0];
                    // or all selected files:
                    if(changeEvent.target.files.length == 0)
                    {
                        return;
                    }
                    else
                        scope.fileread = changeEvent.target.files;
                });
            });
        }
    }
}]);
print.filter('tton',function(){
    return function(type){
        if(type == 'image/jpeg'){
            return 'images/img.png';
        }
        if (type == 'application/msword') {
            return 'images/word.png'
        }
        if (type == 'application/pdf') {
            return 'images/pdf.png'
        }
        if (type == 'application/vnd.ms-excel') {
            return 'images/excel.png'
        }
        if (type == 'application/vnd.ms-powerpoint') {
            return 'images/ppt.png'
        }
        return 'images/other.png';
    }
});
print.controller('PrintController', function ($scope,$ionicPopup) {
    $scope.sellers = [{name: '大学商店'}, {name: '小学商店'}, {name: "初中商店"}];
    $scope.tips = '点我选择文件...';
    $scope.selected = '小学商店';
    $scope.showtip = true;
    $scope.info = {
        color:'黑色',
        doublepage:'单面',
        yasuo:'正常',
        num: 1
    };
    $scope.fs = {};
    $scope.defaultinfo = '黑色,单面,1份';
    $scope.showMsg = function(){
        $ionicPopup.alert({title: '温馨提示', template: '由于手机浏览器限制，请到电脑端获得最佳体验效果'});
    };
    //$scope.flist = printfunc.fstoarr($scope.fs);
});
