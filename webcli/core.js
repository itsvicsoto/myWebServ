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
		}).success(function(data) {
			console.log(data);
		}).error(function(data){
			console.log('err: ' + data);
		});
	}
})

// function postLogin($scope, $http) {
// 	var getUser, getPass;
// 	var content = '';
// 	$('.btnSubmit').click(function() {
// 		getUser = $('.userName').val();
// 		getPass = $('.passWord').val();
// 		$.ajax({
// 			type: 'POST', 
// 			url: 'http://localhost:3000/login', 
// 			data: ({
// 				user: getUser,
// 				pw: getPass
// 			}),
// 			success: function(data, status){
// 				console.log(data);
// 				if (data.status == 'proceed') {$('.title').html('found')};
// 			}
		
// 		});
// 	});
// }
