'use strict';

angular.module('ECMSapp.mainMenu', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	
  $routeProvider.when('/login', {
    templateUrl: 'components/login/login.html',
  });
  
  $routeProvider.when('/adminMain', {
    templateUrl: 'components/caseAdministration/adminMain.html'
  });
  
   $routeProvider.otherwise({redirectTo: '/login'});
}])

.controller('MainMenuCtrl',
	function($scope) {
		
	})

.directive ('mainMenu', function () {

	return {
		restrict: 'E',
		controller: 'MainMenuCtrl',
		templateUrl: 'components/shared/mainMenu.html',
		link: function (scope, element, attrs, MainNavigationCtrl){
	
			}
		}
	})