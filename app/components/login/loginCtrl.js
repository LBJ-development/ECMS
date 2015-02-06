'use strict';

angular.module('ECMSapp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	
  $routeProvider.when('/login', {
    templateUrl: 'components/login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl',
	function($scope, loginService) {
		//$scope.errormessage = "";
		$scope.isDisabled = true;
		$scope.login = function(credentials){
			loginService.login(credentials, $scope); // Call login service	
		}

		this.enableBtn = function(){
			$scope.isDisabled 			= false;	
			$scope.buttonClass  		= 'regular-btn';
		};
		
		this.disableBtn = function(){
			$scope.isDisabled 			= true;	
			$scope.buttonClass  		= 'disabled-btn';
			$scope.errormessageclass 	= "errorMessageOff";		
		};
		
		this.hideErrorMessage = function(){
			$scope.errormessageclass 	= "errorMessageOff";
		}
	})

.directive ('loginDirective', function () {

	return {
		restrict: 'E',
		transclude: false,
		controller: 'LoginCtrl',
		link: function (scope, element, attrs, LoginCtrl){

			scope.buttonClass 		= "disabled-btn";
			scope.errormessageclass = "errorMessageOff";	

			var username = document.getElementById("username");
			var password = document.getElementById("password");

				username.addEventListener('input', function() {
					LoginCtrl.hideErrorMessage();
					( username.value != "" && password.value != "")? LoginCtrl.enableBtn() : LoginCtrl.disableBtn();
        		});
				
				password.addEventListener('input', function() {
					LoginCtrl.hideErrorMessage();
					( username.value != "" && password.value != "")? LoginCtrl.enableBtn() : LoginCtrl.disableBtn();
        		});
			}
		}
	})