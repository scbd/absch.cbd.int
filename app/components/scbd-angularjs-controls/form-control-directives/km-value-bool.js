import app from 'app';
import ng from 'angular';
import $ from 'jquery';
import _ from 'lodash';
import template from 'text!./km-value-bool.html'; ;

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

