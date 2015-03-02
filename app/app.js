'use strict';

// JavaScript Documentvar
var app = angular.module('ECMSapp', [
	'ngRoute',
	'ngAnimate',
	'ECMSapp.login',
	'ECMSapp.home',
	'ECMSapp.adminMain',
	'ECMSapp.mainMenu',
	'kendo.directives' 
	])


// BALLU /////////////////////////////////////////////////////////////////////////////////////////
/*
app.factory("StorageService", function($window, $rootScope) {
    return {
        setToken: function(val) {
            $window.localStorage && $window.localStorage.setItem('token', val);
            return this;
        },
        getToken: function() {
            return $window.localStorage && $window.localStorage.getItem('token');
        }
    };
});

app.factory("ConfigService", function($window, $rootScope) {
    return {
        setRestURI: function(val) {
            $window.localStorage && $window.localStorage.setItem('resturl', val);
            return this;
        },
        getRestURI: function() {
            return $window.localStorage && $window.localStorage.getItem('resturl');
        }
    };
});

app.factory('httpRequestInterceptor', function (StorageService, ConfigService) {
    return {
        request: function (config) {
            config.headers['X-Auth-Token'] = StorageService.getToken();
            if (config.url.indexOf('.html') === -1){
                config.url = ConfigService.getRestURI() + config.url ;
            }
            return config;
        }
    };
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});

app.run( function(ConfigService){
    ConfigService.setRestURI("http://localhost:8080/");
});*/