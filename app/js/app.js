'use strict';

define([/*'angular'*/], function () {

	var app = require('angular').module('app', ['ngRoute'])

	app.config(['$controllerProvider', '$compileProvider', '$provide', '$filterProvider', function($controllerProvider, $compileProvider, $provide, $filterProvider) {
		  
	//	app.controllerProvider = $controllerProvider;
	//	app.routeProvider      = $routeProvider;
	//	app.compileProvider    = $compileProvider;
	    app.filter             = $filterProvider.register;
		app.factory            = $provide.factory;
		app.value              = $provide.value;
		app.directive          = $compileProvider.directive;
		app.controller         = $controllerProvider.register;
	}]);

	return app;
});