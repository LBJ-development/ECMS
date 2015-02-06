'use strict';

var app = angular.module('ECMS.login', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	
  $routeProvider.when('/login', {
    templateUrl: 'components/login/login.html',
    controller: 'LoginCtrl'
  });
}]);

app.controller('LoginCtrl',
	function($scope, loginService) {

		$scope.login = function(credentials){
			loginService.login(credentials); // Call login service			
		}

});