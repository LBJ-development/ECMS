'use strict';

// JavaScript Documentvar
var app = angular.module('ECMSapp', [
	'ngRoute',
	'ECMSapp.login',
	'ECMSapp.home',
	'jqwidgets', 
	'jqwidgets-amd'
	])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
