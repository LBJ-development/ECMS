'use strict';

angular.module('ECMSapp.adminMain', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/adminMain', {
    templateUrl: 'components/caseAdministration/adminMain.html'
  });
}])

.controller('AdminMainFilterCtrl', function($scope) {
	
	$scope.RFSSourceType = {
            placeholder: "Select RFS Source types",
            dataTextField: "text",
            dataValueField: "value",
            valuePrimitive: true,
            autoBind: false,
			dataSource:  
                   [
                 { text: "Call", 					value: "1" },
       			 { text: "Email", 					value: "2" },
				 { text: "Internet", 				value: "3" },
				 { text: "Fax", 					value: "4" },
				 { text: "Electronic", 				value: "5" },
				 { text: "Online Sighting Form",	value: "6" },
				 { text: "Hague App", 				value: "7" },
				 { text: "NCIC", 					value: "8" },
				 { text: "NamUs", 					value: "9" }
				   ]
        };
	
	 $scope.RFSType = {
            placeholder: "Select RFS types",
            dataTextField: "text",
            dataValueField: "value",
            valuePrimitive: true,
            autoBind: false,
			dataSource:  
                   [
                 { text: "Intake", 		value: "1" },
       			 { text: "Lead", 		value: "2" },
				 { text: "TA", 			value: "3" },
				 { text: "Cybertip", 	value: "4" }
				   ]
        };
		
		 $scope.caseType = {
            placeholder: "Select Case types",
            dataTextField: "text",
            dataValueField: "value",
            valuePrimitive: true,
            autoBind: false,
			dataSource:  
                   [
                 { text: "ERU", 		value: "1" },
       			 { text: "FA", 			value: "2" },
				 { text: "NFA", 		value: "3" },
				 { text: "LIM", 		value: "4" },
				 { text: "5779", 		value: "5" },
				 { text: "ATAB", 		value: "6" },
				 { text: "UNID", 		value: "7" },
				 { text: "DEC", 		value: "8" },
				 { text: "UMR", 		value: "9" },
				 { text: "RCST", 		value: "10" }
				   ]
        };
		
		 $scope.mediaStatus = {
            placeholder: "Select Media Statuses",
            dataTextField: "text",
            dataValueField: "value",
            valuePrimitive: true,
            autoBind: false,
			dataSource:  
                   [
                 { text: "Not Media Ready", value: "1" },
       			 { text: "Certified", 		value: "2" },
				 { text: "Restricted", 		value: "3" },
				 { text: "No Media", 		value: "4" }
				   ]
        };
	})

.controller('AdminMainResultCtrl', function($scope) {

	// prepare the data
	var data = generatenotification(13);

	var source =
		{
		localdata: data,
		datafields:
			[
				{ name: 'id', type: 'number'},
				{ name: 'events', type: 'string' },
				{ name: 'objects', type: 'string' },
				{ name: 'details', type: 'string' },
				{ name: 'users', type: 'string' },
				{ name: 'seen', type: 'bool' }
			],
		datatype: "array"
		};
	var columns = 
		[
			{ text: 'ID', datafield: 'id', width: '5%', cellsAlign: 'center', align: 'center'},
			{ text: 'Object/Event', datafield: 'events', width: '20%', align: 'center'},
			{ text: 'Object ID', datafield: 'objects', width: '20%', align: 'center'},
			{ text: 'Details', datafield: 'details', width: '35%', align: 'center'},
			{ text: 'User', datafield: 'users', width: '15%', cellsFormat: 'c2', align: 'center' },
			{ text: 'Seen', datafield: 'seen', width: '5%', columntype: 'checkbox', cellsAlign: 'center', align: 'center',  cellsformat: 'c2' }
		];
      
	$scope.gridSettings =
		{
			width: '100%',
			autoheight: true,
			source: source,                
			columns: columns,
			editable: true,
            enabletooltips: true

		};
	})

.controller("DatePickerCtrl", function($scope){
          $scope.monthSelectorOptions = {
            start: "year",
            depth: "year"
          };
          $scope.getType = function(x) {
            return typeof x;
          };
          $scope.isDate = function(x) {
            return x instanceof Date;
          };
      })