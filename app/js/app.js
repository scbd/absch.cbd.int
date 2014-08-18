'use strict';

define([/*'angular', 'angular-route', 'angular-cookies', */], function () {

  //TODO: reevaluate what is actually needed. Ie. I don't think we still need drag and drop here.
	var app = require('angular').module('app', ['ngRoute', 'ngCookies','chieffancypants.loadingBar', 'ngAnimate', 'ngSanitize', 'angular-intro', 'formControls',]);

	app.config(['$controllerProvider', '$compileProvider', '$provide', '$filterProvider',
		function($controllerProvider, $compileProvider, $provide, $filterProvider) {
		 // console.log($routeProvider);
		//app.controllerProvider = $controllerProvider;
		//app.routeProvider      = $routeProvider;
		//app.compileProvider    = $compileProvider;
		app.filter = function(name, param1, param2, param3, param4) {
			return (fromCache('filter', name) ||
					toCache  ('filter', name, $filterProvider.register(name, param1, param2, param3, param4))).data;
		};

		app.factory = function(name, param1, param2, param3, param4) {
			return (fromCache('factory', name) ||
					toCache  ('factory', name, $provide.factory(name, param1, param2, param3, param4))).data;
		};

		app.value = function(name, param1, param2, param3, param4) {
			return (fromCache('value', name) ||
					toCache  ('value', name, $provide.value(name, param1, param2, param3, param4))).data;
		};

		app.controller = function(name, param1, param2, param3, param4) {
			return (fromCache('controller', name) ||
					toCache  ('controller', name, $controllerProvider.register(name, param1, param2, param3, param4))).data;
		};

		app.directive = function(name, param1, param2, param3, param4) {
			return (fromCache('directive', name) ||
					toCache  ('directive', name, $compileProvider.directive(name, param1, param2, param3, param4))).data;
		};


		//==========================================
		//==========================================
		//==========================================
		//==========================================

		var lazyCache = {};

		function fromCache(type, name) {

			var key = type+':'+name;

			if(lazyCache[key])
				console.log('Already defined: '+key);

			return lazyCache[key];
		}

		function toCache(type, name, data) {

			var key = type+':'+name;

			if(lazyCache[key])
				throw 'Cannot cache: Already defined: '+key;

			lazyCache[key] = { data : data };

			return lazyCache[key];
		}

	}]);

  app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      //padding route attributes to the rootscope
      if(current.$$route && current.$$route.subTemplateUrl)
        $rootScope.subTemplateUrl = current.$$route.subTemplateUrlFull;
    });

  });

	return app;
});
