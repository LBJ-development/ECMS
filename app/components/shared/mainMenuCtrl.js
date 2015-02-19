'use strict';

angular.module('ECMSapp.mainMenu', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	
  $routeProvider.when('/login', {
    templateUrl: 'components/login/login.html',
  });
  
   $routeProvider.when('/home', {
    templateUrl: 'components/home/home.html'
  });
  
  $routeProvider.when('/caseadministration', {
    templateUrl: 'components/caseAdministration/caseAdministration.html'
  });
  
   $routeProvider.when('/comingsoon', {
    templateUrl: 'components/shared/comingSoon.html',
  });

   $routeProvider.otherwise({redirectTo: '/comingsoon'});

}])

.controller('MainMenuCtrl', function($http, $scope, $location) {

	$scope.menuSource =    [{
        text: "Home",
        spriteCssClass: "home-menu-btn", // Item image sprite CSS class, optional.                     
        url: "#/home"                // Link URL if navigation is needed, optional.
      },{
         text: "Call Management",              
          url: "#/callmanagement"                               // content within an item
       },
       {
         text: "Case Administration",
		 url: "#/caseadministration",
       
         	items: [ {
                   text: "Assign CM",
				   cssClass: "sub-menu",
		 			url: "#/caseadministration/assigncm"
                 },
				 {
                   text: "Report Distribution",
				    cssClass: "sub-menu",
		 			url: "#/caseadministration/reportdistribution"
                 },
				 {
                   text: "Manage Recoveries",
				    cssClass: "sub-menu",
		 			url: "#/caseadministration/managerecoveries"
                 },
				 {
                   text: "Des Case Rev Cat",
				    cssClass: "sub-menu",
		 			url: "#/caseadministration/descaserevcat"
                 }]
       },
       {
         text: "Case Management",
		 url: "#/casemanagement"               
       },
	   {
         text: "Case Analysis",
		 url: "#/caseanalyasis"              
       },
	   {
         text: "Person Management",
		 url: "#/personmanagement"              
       },
	   {
         text: "Reports",
		 url: "#/reports"              
       },
	   {
         text: "Supervisor",
		 url: "#/supervisor"              
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

.directive ('mainMenu', function ($location, $rootScope) {
	return {
		restrict: 'E',
		controller: 'MainMenuCtrl',
		templateUrl: 'components/shared/mainMenu.html',
		link: function (scope, element, attrs, MainMenuCtrl){
			
			// CHECK IF THE MAIN MENY NEEDS TO BE DISPLAYED
			var url = $location.url();
			scope.displayMainMenu = (url == "/login" ? false : true);
			
			// HIDE THE MENU WHEN LOGIN OUT
			scope.hideMainMenu = function() {
		   		scope.displayMainMenu = false;
	  	 		}
				
			// DISPLAY THE NAME OF THE PAGE THAT HAS BEEN CLICKED
			scope.onSelect = function(ev) {
				
				$rootScope.pageToBuild = $(ev.item.firstChild).text();
				//alert($(ev.item.firstChild).text());
				};
			}
		}
	})
	
.directive ('footer', function () {
	return {
		restrict: 'E',
		templateUrl: 'components/shared/footer.html',
		link: function (scope, element, attrs){
			
			}
		}
	})
	
	function demoController($location, $rootScope, $route, routes) {
    var vm = this;
    var currentPath;
    vm.views = routes;
    vm.animations = [
        { name: 'shuffle-animation', caption: 'Shuffle' },
        { name: 'top-down-animation', caption: 'Top Down' },
        { name: 'fader-animation', caption: 'Fade' }
    ];
    vm.currentAnimation = vm.animations[0];
    vm.setRoute = function (view) {
        $location.path(view.path);
    };
    vm.activeViewClass = function (view) {
        return view.path === currentPath ? 'active' : '';
    };
    vm.activeAnimationClass = function (animation) {
        return animation.name === vm.currentAnimation.name ? 'active' : '';
    };
    vm.setAnimation = function (animation) {
        vm.currentAnimation = animation;
    };

    $rootScope.$on('$routeChangeSuccess', function(scope, next, current) {
        currentPath = next.originalPath;
    });
};