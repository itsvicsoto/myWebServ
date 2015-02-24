/**
* appFilter Module
*
* Description
*/
var myFilter = angular.module('appFilter', []);

myFilter.filter('date', ['$filter', function($filter){
	return function(input){
		if (input == null){return "";}
		var newDate = $filter('date')(new Date(input), 'dd MMM yyyy');
		return newDate;
	};
}])

