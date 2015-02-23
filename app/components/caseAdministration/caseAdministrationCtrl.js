'use strict';

angular.module('ECMSapp.adminMain', ['ngRoute'])

/*.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/adminMain', {
    templateUrl: 'components/caseAdministration/adminMain.html'
  });
}])*/


.controller("DatePickerCtrl", function($scope){
          $scope.monthSelectorOptions = {
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
      })