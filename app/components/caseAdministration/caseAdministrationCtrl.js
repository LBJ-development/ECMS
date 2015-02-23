'use strict';

angular.module('ECMSapp.adminMain', ['ngRoute'])

/*.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/adminMain', {
    templateUrl: 'components/caseAdministration/adminMain.html'
  });
}])*/


.controller("DatePickerCtrl", function($scope){
	var todayDate 		= new Date();
	var dateOffset 		= (24*60*60*1000) * 2; //2 days
	var startingDate 	= new Date(todayDate.getTime() - dateOffset);
	var endingDate 		= todayDate;
		
	console.log(startingDate);
	
	$scope.startingDay = {
		value: startingDate
	}
	
	$scope.endingDay = {
		value: endingDate
	}
			
/*	$scope.monthSelectorOptions = {
		start: "year",
            depth: "year"
          };
          $scope.getType = function(x) {
			  
			  console.log(x);
            return typeof x;
          };
          $scope.isDate = function(x) {
            return x instanceof Date;
          };
      */
	  })