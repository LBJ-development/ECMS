'use strict';

angular.module('ECMSapp.adminMain', ['ngRoute'])

// SERVICE DATA FOR TESTING PURPOSE -- RETURN AN INSTANCE OF THE FUNCTION
.service("DataSvrc" ,function(){
	this.getData = function(num){
		var data = generateCaseAdminData(num);
		return data;	
	}
	return this;
})

// FACTORY DATA FOR TESTING PURPOSE -- RETURN A RESULT
.factory("testDataFtry", function(){
	return{
		getData: function(num){
			return generateCaseAdminData(num)
		}
	}
})

.factory('DataFtry', function($http, $q) {

	var getData = function() {
	 
		var urlBase = "http://cc-devapp1.ncmecad.net:8080/ecms-staging/rest/caseadmin/cases?startDate=2015-02-18&endDate=2015-02-19";
		var $promise = $http.get(urlBase);
		
		var deferred = $q.defer();
		
		$promise.then(function(result){
			
			if(result.data.status == 'SUCCESS'){
				//console.log(result.data.status);
				deferred.resolve(result.data.content);
				
			} else {
				alert("Something better is coming!");
			}
		})
		return deferred.promise;
	};
    return {
      getData: getData
    };
})

.controller("DatePickerCtrl",['$rootScope','$scope',  function($rootScope, $scope){
	var todayDate 		= new Date();
	var dateOffset 		= (24*60*60*1000) * 2; //DEFAULT: 2 DAYS 
	var startingDate 	= new Date(todayDate.getTime() - dateOffset);
	var endingDate 		= todayDate;

	$scope.startingDate	= startingDate;
	$scope.endingDate	= endingDate;
	$rootScope.numRecords	= 33*2; // 33 RECORDS/DAY

	$rootScope.changeDateRange = function(){
		
		var numDays = ($scope.endingDate - $scope.startingDate) / 86400000;
		var numRecords = 33 * numDays; // 33 RECORDS/DAY
		$rootScope.numRecords = numRecords;
		//console.log("FROM DATEPICKERCTRL: " + DataSvrc.getData(numRecords));
	}
}])

//.controller("CaseAdminCtrl",['$rootScope', '$scope', 'DataSvrc', function($rootScope, $scope, DataSvrc){
.controller("CaseAdminCtrl",['$rootScope', '$scope', 'DataFtry', function($rootScope, $scope, DataFtry){

	DataFtry.getData().then(function(result){

		$scope.mainGridOptions =  {
		 
		dataSource: {
			data: result,
			    schema: {
					model: {
						fields: {
								caseNumber		: { type: "string" 	},
								dateReceived	: { type: "date"	},
								incidentDates	: { type: "date"	},
								source			: { type: "string"	},
								caseType		: { type: "string" 	},
								caseStatus		: { type: "string"	},
								alerts			: { type: "string" 	},
								state			: { type: "string"	},
								caseManager		: { type: "string"	},
								selected		: { type: "boolean"	}
								}
							}
						},
					},
		//height		: 550,
		sortable	: true,
		scrollable	: false,
		filterable	: {
					mode		: "menu",
    				extra		: false,
					messages	: {
      					info		: "Filter by:",
						selectValue	: "Select category",
						isTrue		: "selected",
						isFalse		: "not selected"
							},
					operators	: {
      						string	: {
        						eq			: "Equal to",
        						//neq			: "Not equal to",
								contains	: "Contains",
								startswith	: "Starts with",
								endswith	: "Ends with"
      							},
							number	: {
								eq			: "Equal to",
								},
							date	: {
								gt			: "After",
       					 		lt			: "Before"
								}
							}
  						},
		pageable	: {
                     	refresh: true,
                      	pageSizes: true,
                     	buttonCount: 5,
						pageSize: 15
                        },
						
		/*columnMenu: {
   			messages	: {
      			columns			: "Choose columns",
      			filter			: "Apply filter",
      			sortAscending	: "Sort (asc)",
      			sortDescending	: "Sort (desc)"
							}
    				},*/
		columns		: [{
						field	: "caseNumber",
						title	: "RFS/Case",
						width	: "8%",
						attributes: {
      						//style: "text-align: center"
    						}
						},{
						field	: "dateReceived",
						title	: "Date Rcvd.",
            			format	:"{0:MM/dd/yyyy}" ,
						width	: "9%",
						filterable: false,
						},{
						field	: "incidentDates",
						title	: "Incid. Date",
						format	:"{0:MM/dd/yyyy}" ,
						width	: "9%"
						},{
						field	: "source",
						title	: "Source",
						width	: "6%"
						},{
						field	: "caseType",
						title	: "Type",
						width	: "9%"
						},{
						field	: "caseStatus",
						title	: "Status",
						width	: "9%",
						},{
						field	: "alerts",
						title	: "Alerts",
						width	: "8%"
						},{
						field	: "state",
						title	: "State",
						width	: "5%"
						},{
						field	: "caseManager",
						title	: "Assignee",
						width	: "14%"
						},{
						field	: "selected",
						title	: "Sel.",
						width	: "5%",
						filterable: false,
						template: "<input type='checkbox'/>",
						attributes: {
      						style: "text-align: center"
    					}
                	}]
				};

		
	});
		

	
	//var caseAdminData = DataSvrc.getData($rootScope.numRecords);
	
	//console.log("FROM CONTROLER: ");
	
	/*var caseAdminData = DataFtry.getData(function(data){
		
		console.log("FROM CONTROLER: " + data);
		
	});*/
	
	/*var $promise = DataFtry.getData();
	
	$promise.then(function(){
		console.log("FROM CONTROLER: " + caseAdminData);
	});
	*/
	
	
	
	
	
	// WATCH FOR A DATE RANGE CHANGE
	/*$rootScope.$watch('numRecords', function(newValue, oldValue) {
		
			caseAdminData = DataSvrc.getData(newValue);
			$scope.mainGridOptions.dataSource.data = caseAdminData;
			console.log($scope.mainGridOptions.dataSource.data);
	});*/
	

	
	
}])