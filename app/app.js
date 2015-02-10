'use strict';

// JavaScript Documentvar
var app = angular.module('ECMSapp', [
	'ngRoute',
	'ECMSapp.login',
	'ECMSapp.home',
	'ECMSapp.adminMain',
	'jqwidgets', 
	'jqwidgets-amd',
	'kendo.directives' 
	])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
