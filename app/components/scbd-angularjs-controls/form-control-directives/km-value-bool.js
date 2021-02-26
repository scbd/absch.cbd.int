define(['app', 'angular', 'jquery', 'lodash', 'text!components/scbd-angularjs-controls/form-control-directives/km-value-bool.html'], function(app, ng, $, _, template) { ;

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
