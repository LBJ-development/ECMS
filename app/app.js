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

/*.config(['$routeProvider', function($routeProvider) {
$routeProvider.otherwise({redirectTo: '/login'});
}]);
*/

