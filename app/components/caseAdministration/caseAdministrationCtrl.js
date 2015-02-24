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
	
	var caseAdminData = generateCaseAdminData(10)
	
	$scope.startingDate	= startingDate;
	$scope.endingDate	= endingDate;
	$scope.numRecords	= 33*2; // 33 records/day

	$scope.getRecords = function(){
		
		var numDays = ($scope.endingDate - $scope.startingDate) / 86400000;
		var numRecords = 33 * numDays; // 33 records/day
		caseAdminData = generateCaseAdminData(numRecords);
		$scope.numRecords = numRecords;
			console.log(caseAdminData);
		}
})

.controller("CaseAdminCtrl", function($scope){
	
	var caseAdminData = generateCaseAdminData(20);
	
	$scope.mainGridOptions =  {
		 
		dataSource	: {
			data: caseAdminData,
			    schema: {
					model: {
						fields: {
								cases			: { type: "string" },
								receivedDate	: { type: "date" },
								incidentDate	: { type: "date" },
								source			: { type: "string" },
								caseType		: { type: "string" },
								caseStatus		: { type: "string" },
								numVictims		: { type: "string" },
								endangerment	: { type: "boolean" },
								alerts			: { type: "string" },
								state			: { type: "string" },
								division		: { type: "string" },
								assignee		: { type: "string" },
								selected		: { type: "boolean" }
								}
							}
						},
					},
		height		: 550,
		sortable	: true,
		columns		: [{
						field	: "cases",
						title	: "RFS/Case",
						width	: "8%",
						attributes: {
      						//style: "text-align: center"
    						}
						},{
						field	: "receivedDate",
						title	: "Date Rcvd",
            			format	:"{0:MM/dd/yyyy}" ,
						width	: "8%"
						},{
						field	: "incidentDate",
						title	: "Incid. Date",
						format	:"{0:MM/dd/yyyy}" ,
						width	: "8%"
						},{
						field	: "source",
						title	: "Source",
						width	: "10%"
						},{
						field	: "caseType",
						title	: "Case Type",
						width	: "10%"
						},{
						field	: "caseStatus",
						title	: "case Status",
						template: "<input type='checkbox'/>",
						width	: "10%",
						attributes: {
      						style: "text-align: center"
    						}
						},{
						field	: "numVictims",
						title	: "# Vic.",
						width	: "3%"
						},{
						field	: "endangerment",
						title	: "Endg.",
						width	: "3%"
						},{
						field	: "alerts",
						title	: "Alerts",
						width	: "10%"
						},{
						field	: "state",
						title	: "State",
						width	: "10%"
						},{
						field	: "division",
						title	: "Div",
						width	: "5%"
						},{
						field	: "assignee",
						title	: "Assignee",
						width	: "10%"
						},{
						field	: "selected",
						title	: "Sel.",
						width	: "3%"
                	}]
				};
	
})