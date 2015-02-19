'use strict';

angular.module('ECMSapp.home', [])

/*.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'components/home/home.html',
    controller: 'HomeCtrl'
  });
}])
*/
.controller('HomeCtrl', function($scope) {

	 $scope.mainGridOptions = {
		dataSource: {
			  type: "js",
                            transport: {
                                read: "http://dev-webiis/UIDesigns/ECMS/app/assets/js/notifications"
                            },
			schema: {
				model: {
					fields: {
						ID:			{ type: "number" },
						ObjectEV:	{ type: "string" },
						ObjectID:	{ type: "string" },
						Detail:		{ type: "string" },
						User:		{ type: "string" },
						Seen:		{ type: "boolean" }
						}
					}
				}
			},
			height: 550,
			columns: [{
                    field: "ID",
                    width: "120px"
                    },{
                    field: "ObjectEV",
                    title: "Object/Event",
                    width: "120px"
                    },{
                    field: "ObjectID",
					title: "Object ID",
                    width: "120px"
                    },{
                    field: "Detail",
                    width: "120px"
                    },{
                    field: "User"
					},{
                    field: "Seen"
                }]
		};
	});