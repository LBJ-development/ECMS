'use strict';

angular.module('ECMSapp.adminMain', [])

.factory('DataFtry', function($http, $q) {
	
/*      $("#message").kendoWindow({
        title: "Kendo UI Window",
        modal: true,
        width: 400,
        height: 250,
		position: "center"
      })*/

	var getData = function(URL) {	
	
	//console.log("FROM GET DATA: "  + URL);

		var $promise = $http.get(URL);
		var deferred = $q.defer();
		
		$promise.then(function(result){
			
			if(result.data.status == 'SUCCESS'){
				
				if(result.data.messages.CASES_LIST == 'No results found, please adjust the date range'){
					alert(result.data.messages.CASES_LIST);
				
				} else if(result.data.messages.CASES_LIST == 'More than 500 results found, returning first 500, please adjust the date range') {
					alert(result.data.messages.CASES_LIST);
				}
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

.controller('MainCaseAdminCtrl', ['$scope', 'DataFtry',  function($scope, DataFtry){

	
	// INITIAL DATE RANGE //////////////////////////////////////////////////
		var todayDate 		= new Date();
		var dateOffset 		= (24*60*60*1000) * 2; //DEFAULT: 2 DAYS 
		var startingDate 	= new Date(todayDate.getTime() - dateOffset);
		var endingDate 		= todayDate;
		$scope.startingDate	= startingDate;
		$scope.endingDate	= endingDate;
		
		$scope.urlBase =	//"http://cc-devapp1.ncmecad.net:8080/ecms-staging/rest/caseadmin/cases?startDate=" +
								"/rest/caseadmin/cases?startDate=" +  
								formatStartingDate() + 
								//"2015-02-15" +
								"&endDate=" + 
								formatEndingDate();
								//"2015-02-17";
								
		console.log("FROM INITIAL DATE RANGE: "  + $scope.urlBase);
		
		// WHEN DATE RANGE CHANGES //////////////////////////////////////////////////
		$scope.changeDateRange = function(){

			$scope.urlBase =	//"http://cc-devapp1.ncmecad.net:8080/ecms-staging/rest/caseadmin/cases?startDate=" + 
									"/rest/caseadmin/cases?startDate=" + 
									formatStartingDate() + 
									"&endDate=" + 
									formatEndingDate();
									
		//console.log("FROM CHANGE DATE RANGE: "  + $scope.urlBase);
	};
	function formatStartingDate(){		
		var stDate 	= $scope.startingDate.getDate() ;
		var stMonth = $scope.startingDate.getMonth() + 1;
		var stYear 	= $scope.startingDate.getFullYear();
		return stYear + "-" + stMonth  + "-" + stDate;
	};
	function formatEndingDate(){		
		var enDate 	= $scope.endingDate.getDate() ;
		var enMonth = $scope.endingDate.getMonth() + 1;
		var enYear 	= $scope.endingDate.getFullYear();
		return enYear + "-" + enMonth  + "-" + enDate;
	};
	
	// GRID ////////////////////////////////////////////////////////////////////
	
	var result = {};

	// WATCH FOR A DATE RANGE CHANGE
	$scope.$watch('urlBase', function(newValue, oldValue) {
		
		//console.log("FROM WATCH: "  + $scope.urlBase);

		DataFtry.getData($scope.urlBase).then(function(result){
			
			$scope.mainGridOptions.dataSource.data = result;
	
			setTimeout(function(){
				
				// DELAY THE INITIALIZATION FOR THE TABLE CLICK ENVENT (CHECK IF CHECKBOX IS CLICKED)
				$scope.mainGrid.table.on("click", ".checkbox" , selectRow);
				
			}, 100);
		})
	});
	// GRID SETTINGS 
	$scope.mainGridOptions =  {
		 
		dataSource: {
			data: result,
			    schema: {
					model: {
						fields: {
								caseNumber		: { type: "string" 	},
								dateReceived	: { type: "date"	},
								incidentDate	: { type: "date"	},
								source			: { type: "string"	},
								caseTypeAbbr	: { type: "string" 	},
								caseStatus		: { type: "string"	},
								alerts			: { type: "string" 	},
								state			: { type: "string"	},
								caseManager		: { type: "string"	},
								selectedID		: {editable: false, nullable: true	}
								},
							}
						},
					},
		//height		: 550,
        dataBound	: onDataBound,
		//toolbar		: ["create"],
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
        						//neq		: "Not equal to",
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
						width	: "8%"
						},{
						field	: "dateReceived",
						title	: "Date Rcvd.",
            			format	:"{0:MM/dd/yyyy}" ,
						width	: "9%",
						filterable: false,
						},{
						field	: "incidentDate",
						title	: "Incid. Date",
						format	:"{0:MM/dd/yyyy}" ,
						width	: "9%"
						},{
						field	: "source",
						title	: "Source",
						width	: "6%",
						filterable: {
                        	ui			: sourceFilter,
							operators	: {
      							string	: {
        						eq		: "Equal to",
      								}
                         		}
							}
						},{
						field	: "caseTypeAbbr",
						title	: "Type",
						width	: "9%",
						filterable: {
                        	ui			: typeFilter,
							operators	: {
      							string	: {
        						eq		: "Equal to",
      								}
                         		}
							}
						},{
						field	: "caseStatus",
						title	: "Status",
						width	: "9%",
						filterable: {
                        	ui			: statusFilter,
							operators	: {
      								string	: {
        							eq		: "Equal to",
      										}
                         				}
									}
						},{
						field	: "alerts",
						title	: "Alerts",
						width	: "8%"
						},{
						field	: "state",
						title	: "State",
						width	: "5%",
						filterable: {
							operators	: {
      								string	: {
        							eq		: "Equal to",
      										}
                         				}
									}
						},{
						field	: "caseManager",
						title	: "Assignee",
						width	: "14%"
						},{
							
						field	: "selectedID",
						title	: "Sel.",
						width	: "5%",
						filterable: false,
						sortable: false,
						template: "<input type='checkbox' class='checkbox'/>",
						attributes: {
      						style: "text-align: center"
    					}
                	}]
				};
	// MAKE THE CHECK BOX PERSISTING
 	var checkedIds = {};
	
	function selectRow(){
		var checked		= this.checked,
        	row			= $(this).closest("tr"),
        	grid		= $("#grid").data("kendoGrid"),
        	dataItem	= grid.dataItem(row);

       	 checkedIds[dataItem.caseNumber] = checked;
		 console.log(dataItem.caseNumber)	
	};

	// ON DATABOUND EVENT (WHEN PAGING) RESTORE PREVIOUSLY SELECTED ROWS
    function onDataBound(e) {

        var view = this.dataSource.view();
        for(var i = 0; i < view.length;i++){
            if(checkedIds[view[i].caseNumber]){
                this.tbody.find("tr[data-uid='" + view[i].uid + "']")
                //.addClass("k-state-selected")
                .find(".checkbox")
                .attr("checked","checked");
            }
        }
    };
		
	// FILTERING WITH DROPDOWN MENU 
	var status 	= ["Active", "Recovered", "Closed"],
		types 	= ["ERU", "FA", "NFA", "LIM", "5779", "UHR", "DECC", "RCST", "ATT", "UMR"],
		sources = ["Call", "Email", "Internet", "WebService", "Online Sighting Form"];
			
	function typeFilter(element) {
		//element.kendoMultiSelect({
		element.kendoDropDownList({
			dataSource: types,
			//multiple: "multiple",
			optionLabel: "--Select Value--"
		});
	};
		
	function statusFilter(element) {
		element.kendoDropDownList({
			dataSource: status,
			optionLabel: "--Select Value--"
		});
	};
		
	function sourceFilter(element) {
		element.kendoDropDownList({
			dataSource: sources,
			optionLabel: "--Select Value--"
		});
	};
}])
