/**
* myTee Module
*
* Description
*/
var app = angular.module('testApp', [])

app.controller('LoginCtrl', function($scope, $http){
	$scope.userName = 'carlo.danan'
	$scope.passWord = 'tee'

	$scope.loginUser = function(user, pw) {
		$http.post('/login', 
			{
				user: user,
				pw: pw
			})
			.success(function(data) {
				if(data.status == 'proceed'){
						if (data.content.length != 0)
						{
							$scope.loginResult = 'User Found';
						}
					}
			})
			.error(function(data){
				console.log('err: ' + data);
			})
	}
});

app.controller('ProductCtrl', function($scope, $http){
	$scope.productCode = 46075;

	$scope.checkCode = function(productCode) {
	$http.post('/submit',
		{
			code: productCode
		}).success(function(data) {
			if (data.content.length != 0)
			{
				$scope.productRes = data.content[0].PartId;
			}
		}).error(function(data) {
			console.log('err: ' + data);
		})
	}
});

