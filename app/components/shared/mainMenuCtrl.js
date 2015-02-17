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

.controller('MainMenuCtrl', function($http, $scope) {
	
	$scope.menuSource =    [{
        text: "Home",
        cssClass: "myClass",                         // Add custom CSS class to the item, optional, added 2012 Q3 SP1.
        url: "/"                // Link URL if navigation is needed, optional.
      },{
         text: "Call Management",              
          url: "/callmanagement"                               // content within an item
       },
       {
         text: "Case Administration",
		 url: "/caseadministration",
       
         	items: [{                                    // Sub item collection
           		text: "Case Admin Main",
		 		url: "/caseadministration"
         		},
                 {
                   text: "Assign CM",
		 			url: "/caseadministration/assigncm"
                 },
				 {
                   text: "Report Distribution",
		 			url: "/caseadministration/reportdistribution"
                 },
				 {
                   text: "Manage Recoveries",
		 			url: "/caseadministration/managerecoveries"
                 },
				 {
                   text: "Des Case Rev Cat",
		 			url: "/caseadministration/descaserevcat"
                 }]
       },
       {
         text: "Case Management",
         spriteCssClass: "imageClass3", // Item image sprite CSS class, optional.
		 url: "/casemanagement"               
       },
	   {
         text: "Case Analysis",
		 url: "/caseanalyasis"              
       },
	   {
         text: "Person Management",
		 url: "/personmanagement"              
       },
	   {
         text: "Reports",
		 url: "/reports"              
       },
	   {
         text: "Supervisor",
		 url: "/supervisor"              
       }]
			
/*
	
		$scope.menuSource = {      
			transport: {
				read: { 
				dataType: 'json',
				url: 'components/shared/test'

				}
			}
		}
*/		
		$scope.productsDataSource = {
            type: "odata",
            serverFiltering: true,
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                }
            }
		}
		console.log($scope.menuSource);
/*		
		

		var data = this;
		data.menus = [];
		
		
		$http.get('components/shared/test.json').success(function(response) {
			data.menus = response;
			//console.log(response);
			
			$scope.menuSource = new kendo.data.DataSource({
			
				data: response
			
			});
		});
*/		
		
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