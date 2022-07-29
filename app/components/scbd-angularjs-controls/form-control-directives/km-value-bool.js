import app from '~/app';
import ng from 'angular';
import $ from 'jquery';
import _ from 'lodash';
import template from 'text!./km-value-bool.html'; ;
import kmValueBoolT from '~/app-text/components/scbd-angularjs-controls/form-control-directives/km-value-bool.json'; 
	app.directive('kmValueBool', ["translationService",function (translationService)
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
				translationService.set('kmValueBoolT', kmValueBoolT);		
			}
		};
	}]);

