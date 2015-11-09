// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'login', 'register','print','user'])
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
        //配置post默认头
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        var param = function(obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for(name in obj) {
                value = obj[name];

                if(value instanceof Array) {
                    for(i=0; i<value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value instanceof Object) {
                    for(subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
//设置android标签栏在底部
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
//设置android标签栏在底部
//    路由设置
        $stateProvider
            .state('tabs', {
                url: "/index",
                templateUrl: "tpls/tabs.html"
            })
            .state('tabs.home', {
                url: "/home",
                views: {
                    'tab-home': {
                        templateUrl: "tpls/home.html",
                        //controller: "IndexController"
                    }
                }
            })
            .state('tabs.login', {
                url: "/login",
                views: {
                    'tab-home': {
                        templateUrl: "tpls/login.html",
                        controller: "LoginController"
                    }
                }
            })
            .state('tabs.register', {
                url: "/register",
                views: {
                    'tab-home': {
                        templateUrl: "tpls/register.html",
                        controller: "RegController"
                    }
                }
            })
            .state('tabs.user', {
                url: "/user",
                views: {
                    'tab-user': {
                        templateUrl: "tpls/user.html",
                        controller: "UserController"
                    }
                }
            })
            .state('tabs.print', {
                url: "/print",
                views: {
                    'tab-print': {
                        templateUrl: "tpls/print.html",
                        controller: 'PrintController'
                    }
                }
            })
            .state('tabs.schools', {
                url: "/schools",
                views: {
                    'tab-home': {
                        templateUrl: "tpls/schools.html",
                        //controller: 'RegController'
                    }
                }
            })
        $urlRouterProvider.otherwise("/index/home");//默认路由
    })


