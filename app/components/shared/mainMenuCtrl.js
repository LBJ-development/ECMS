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
        url: "#/home" ,
		permission: "menu:home"
		
      },{
         text: "Call Management",              
          url: "#/callmanagement",
		  permission: "menu:callmanagement"                            
       },
       {
         text: "Case Administration",
		 url: "#/caseadministration",
       	permission: "menu:caseadministration",
         	items: [ {
                   text: "Assign CM",
				   cssClass: "sub-menu",
		 			url: "#/caseadministration/assigncm",
					permission: "menu:assigncm"
                 },
				 {
                   text: "Report Distribution",
				    cssClass: "sub-menu",
		 			url: "#/caseadministration/reportdistribution",
					permission: "menu:reportdistribution"
                 },
				 {
                   text: "Manage Recoveries",
				    cssClass: "sub-menu",
		 			url: "#/caseadministration/managerecoveries",
					permission: "menu:managerecoveries"
                 },
				 {
                   text: "Des Case Rev Cat",
				    cssClass: "sub-menu",
		 			url: "#/caseadministration/descaserevcat",
					permission: "menu:descaserevcat"
                 }]
       },
       {
         text: "Case Management",
		 url: "#/casemanagement",
		permission: "menu:casemanagement"               
       },
	   {
         text: "Case Analysis",
		 url: "#/caseanalyasis",
		 permission: "menu:caseanalyasis"              
       },
	   {
         text: "Person Management",
		 url: "#/personmanagement" ,
		 permission: "menu:personmanagement"             
       },
	   {
         text: "Reports",
		 url: "#/reports",
		 permission: "menu:reports"              
       },
	   {
         text: "Supervisor",
		 url: "#/supervisor",
		 permission: "menu:supervisor"              
       }]
	})

.directive ('mainMenu', function ($location, $rootScope) {
	return {
		restrict: 'E',
		controller: 'MainMenuCtrl',
		templateUrl: 'components/shared/mainMenu.html',
		link: function ( scope, element, attrs, MainMenuCtrl){
			
			// INITIATE THE LOGGEDIN AS FALSE WHEN LOADING THE MENU THE FIRST TIME
			// IS SET TO TRUE BY THE LOGGIN SERVICE
			$rootScope.loggedIn = false;
			//CHECK IF THE USER IS LOGGED IN WHILE RELOADING THE PAGE
//if(!$rootScope.loggedIn) $location.path('/login'); 
			
			// CHECK IF THE MAIN MENU NEEDS TO BE DISPLAYED
			var url = $location.url();
			scope.displayMainMenu = (url == "/login" ? false : true);
			
			scope.$on('$locationChangeStart', function(event) {
				// CHECK IF THE USER IS LOGGED IN WHILE HITTING DIRECTLY A PARTIAL PAGE
				// IF NOT HE IS REDIRECTED TO THE LOGIN PAGE
				if(!$rootScope.loggedIn) $location.path('/login'); 
					//console.log("FROM LOCATION CHANGE");
				});
				
			//////////////////////////////////////////////////////////////////
			
			var permissions = {
				"menu:home" :"",
				"menu:callmanagement":"",
				"menu:caseadministration":"",
				"menu:casemanagement" : "",
				//"menu:caseanalyasis" : "",
				//"menu:personmanagement" : "",
				//"menu:reports":"",
				"menu:supervisor":""
        	};
			
			$rootScope.menuWithPermissions = [];

			for (var i in scope.menuSource) {
                //console.log(scope.menuSource[i]['permission']);
               // console.log(scope.menuSource[i]['permission'] in permissions);
				
				if (scope.menuSource[i]['permission'] in permissions){
                    //alert(scope.menuSource[i]['permission'] + ' will be enabled');
					 $rootScope.menuWithPermissions.push(scope.menuSource[i]);
					 
					 if('items' in scope.menuSource[i]){
                        //console.log('items exist for ' + scope.menuSource[i]['permission']);
                        var submenu = scope.menuSource[i]['items'];
                       /* console.log(submenu);
                        for (var k in submenu){
                            console.log(submenu[k]);
                            console.log(submenu[k]['permission'] in permissions);
                            if (!(submenu[k]['permission'] in permissions)) {
                                console.log(submenu[k]['permission'] + ' will be disabled');
                            }
                        }*/
                    }
                }  
            }
			
			/////////////////////////////////////////////////////////////
			
			// HIDE THE MENU WHEN LOGIN OUT
			scope.logout = function() {
		   		scope.displayMainMenu = false;
				$rootScope.loggedIn = false;
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
	