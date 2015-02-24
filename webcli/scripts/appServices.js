/**
* appservice Module
*
* Description
*/
var myService = angular.module('appService', []);

var result;
var baseURL = 'http://localhost:3000';

myService.factory('authRequest', ['$http', function($http){
	return {
		get: function(user, pw){
			var request;
			request = $http.post(baseURL + '/login',{
				user: user,
				pw: pw
			});

			return request;	
		}		
	};
}])

myService.factory('ApiDataSource', ['$http', function($http){
	return {
		
		qdata: function(productCode){
			if (!result){
				result = $http.post(baseURL + '/submit',{code: productCode});
			} else {
				console.log('meron na');
			}
				return result;
		},

		refreshdata: function(productCode){
			result = $http.post(baseURL + '/submit',{code: productCode});
			return result;
		}
	};

}])