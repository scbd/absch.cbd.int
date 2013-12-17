var app = angular.module('kmApp', [ 'ngRoute', 'ngSanitize' ]);

app.config(['$routeProvider', '$locationProvider', '$compileProvider', function($routeProvider, $locationProvider, $compileProvider) {

	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('!');

//	app.controllerProvider = $controllerProvider;
    app.routeProvider      = $routeProvider;
    app.compileProvider    = $compileProvider;
//	app.filterProvider     = $filterProvider;
//	app.provide            = $provide;
	
	$routeProvider.
 		when('/', 	   { controller:HomePageController,  templateUrl:'/app/views/index.html' }).
 		when('/test/', { controller:InnerPageController, templateUrl:'/app/views/test.html'  }).
		otherwise({redirectTo:'/help/404'});

 		function HomePageController($scope, $route, $browser, $location, $window) {

 			$scope.test = 'VIEW SCOPE - HomePageController';
		}

		function InnerPageController($scope, $route) {

			$scope.test = 'VIEW SCOPE - InnerPageController';
		}
}]);

function PageController($scope) {

	$scope.test = "PAGE SCOPE";
}