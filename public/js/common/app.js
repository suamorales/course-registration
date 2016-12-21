'use strict';
var app = angular.module('express-starter', [ 'ngAnimate', 'uiRouter', 'vModal']);

app.config(function($stateProvider) {
  var helloState = {
    name: 'hello',
    url: '/hello',
    template: '<h3>hello world!</h3>'
  }

  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);

}).controller('mainCtrl', ['$rootScope', '$scope', '$routeParams', '$location', '$http', mainCtrlImpl]);

function mainCtrlImpl ($rootScope, $scope, $routeParams, $location, $http) {
	
	// Conventionally handled by a service
	var getCourses = function() {
		$http.get('/courses').then(function(courses){
			$scope.courses = courses;
		})
	};

}

// app.config(['$httpProvider', function(httpProvider) {
// 	httpProvider.defaults.xsrfHeaderName = '_csrf';
// 	httpProvider.defaults.xsrfCookieName = 'XSRF-TOKEN';
// }]);