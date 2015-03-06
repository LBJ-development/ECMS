'use strict';

angular.module('ECMSapp.home', [])

.controller('HomeCtrl', function($scope) {

	var notificationData = generatenotification(13);

	$scope.mainGridOptions =  {
		 
		dataSource	: {
			data: notificationData,
			    schema: {
					model: {
						fields: {
								id		: { type: "number" },
								events	: { type: "string" },
								objects	: { type: "string" },
								details	: { type: "string" },
								users	: { type: "string" },
								seen	: { type: "boolean" }
								}
							}
						},
					},
		height		: 550,
		sortable: true,
		columns		: [{
						field	: "id",
						title	: "ID",
						width	: "50px",
						sortable: false,
						attributes: {
      						style: "text-align: center"
    					}
					},{
						field	: "events",
						title	: "Object/Event",
						width	: "15%"
					},{
						field	: "objects",
						title	: "Object ID",
						width	: "20%"
						},{
						field	: "details",
						title	: "Details",
						
						},{
						field	: "users",
						title	: "User",
						width	: "15%"
						},{
						field	: "seen",
						title	: "Seen",
						template: "<input type='checkbox'/>",
						width	: "70px",
						sortable: false,
						attributes: {
      						style: "text-align: center"
    					}
                	}]
				};
			});
	
			