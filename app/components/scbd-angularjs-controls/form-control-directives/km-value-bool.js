define(['app', 'angular', 'jquery', 'lodash', 'text!./km-value-bool.html'], function(app, ng, $, _, template) { 'use strict';

	app.directive('kmValueBool', [function ()
	{
		return {
			restrict: 'EAC',
			template: template,
			replace: true,
			scope: {
				value    : '=',
				locales    : '='
			},
			link: function ($scope, element, attrs)
			{				
			}
		};
	}]);
});
