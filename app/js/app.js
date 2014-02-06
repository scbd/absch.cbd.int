'use strict';

define([/*'angular'*/], function () {

	var app = require('angular').module('app', ['ngRoute'])

	app.config(['$controllerProvider', '$compileProvider', '$provide', function($controllerProvider, $compileProvider, $provide) {
		  
	//	app.controllerProvider = $controllerProvider;
	//	app.routeProvider      = $routeProvider;
	//	app.compileProvider    = $compileProvider;
	//  app.filterProvider     = $filterProvider;
	//	app.provide            = $provide;
		app.directive          = $compileProvider.directive;
		app.controller         = $controllerProvider.register;
	}]);

	return app;
});