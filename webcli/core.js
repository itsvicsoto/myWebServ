/**
* myTee Module
*
* Description
*/
var app = angular.module('testApp', ['appService', 'appFilter']);

app.controller('LoginCtrl', ['$http', '$scope', 'authRequest', function($http, $scope, authRequest){
	$scope.userName = 'carlo.danan';
	$scope.passWord = 'tee';

	$scope.loginUser = function(){
		authRequest.get($scope.userName, $scope.passWord)
		.then(function(resp){
			if (resp.data.content[0].length != 0)
			{
				$scope.loginResult = "Found!";
			} else {
				$scope.loginResult = "User does not exist!";
			}
		});
	}
}])

app.controller('ProductCtrl', ['$scope', '$http', 'ApiDataSource', function($scope, $http, ApiDataSource){
	$scope.productCode = 46075;

	$scope.checkCode = function(){
			ApiDataSource.qdata($scope.productCode)
			.then(function(resp){
				console.log(resp);
				$scope.productRes = resp.data.content[0].PartId;
			});
	}

	$scope.checkCodeAgain =  function(){
		ApiDataSource.refreshdata($scope.productCode)
		.then(function(resp){
			console.log(resp)
			$scope.productRes1 = resp.data.content[0].FullName;
		});
	}
}])


app.controller('ProductTblCtrl', ['$scope', '$http', '$filter', 'ApiDataSource', function($scope, $http, $filter, ApiDataSource){
	 $scope.lists = [
    { index: 'Customer'},
    { index: 'Customer Order No.' },
    { index: 'Project Name' },
    { index: 'Part No.' },
    { index: 'Order Unit Qty' },
    { index: 'Element Qty' },
    { index: 'EDH Number' },
    { index: 'Complete by' },
    { index: 'No. of days late' },
    { index: 'BOM Done' }, 
    { index: 'Designer' },
  ];

	$scope.dispTbl = function(){
		ApiDataSource.qdata().then(function(resp){
			
			var dateFilter = $filter('date')(resp.data.content[0].CompleteBy);
			console.log(dateFilter);
			$scope.dateData = resp.data.content[0].CompleteBy;

			// $scope.dataStore = [
			// 	{data: resp.data.content[0].Name},
			// 	{data: resp.data.content[0].CustomerPoNumber},
			// 	{data: resp.data.content[0].CustomerProject},
			// 	{data: resp.data.content[0].Number},
			// 	{data: resp.data.content[0].OrderQtyToManufacture},
			// 	{data: resp.data.content[0].ElementQty},
			// 	{data: resp.data.content[0].EdhNo},
			// 	{data: resp.data.content[0].CompleteBy},
			// 	{data: resp.data.content[0].BOMDone},
			// 	{data: resp.data.content[0].FullName},
			// ];


			//console.log($scope.dataStore);
		})
	}

}])


