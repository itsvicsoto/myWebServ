/**
* myTee Module
*
* Description
*/
var app = angular.module('testApp', [])

app.controller('LoginCtrl', function($scope, $http){
	$scope.loginUser = function(user, pw) {
		$http.post('/login', 
			{
				user: user,
				pw: pw
			})
			.success(function(data) {
				if(data.status == 'proceed'){
						$scope.loginResult = 'User Found!';
					}
			})
			.error(function(data){
				console.log('err: ' + data);
			})
	}
});

app.controller('ProductCtrl', function($scope, $http){
	$scope.checkCode = function(productCode) {
		$http.post('/codesubmit',
			{
				data: productCode
			}).success(function(data) {
				console.log(data)
			}).error(function(data) {
				console.log(data)
			})
	}
});

