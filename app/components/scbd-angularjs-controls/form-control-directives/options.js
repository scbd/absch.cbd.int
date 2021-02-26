define(['app', 'text!components/scbd-angularjs-controls/form-control-directives/options.html','jquery','angular-localizer'], function(app, template,$) { ;
app.directive('afcOptions', function() {
				return {
						restrict: 'AEC',
						scope: {
								binding: "=ngModel",
								options: '=',
								title: '@',
								placeholder: '@',
								help: '@',
								name: '@?',
						},
						template: template,
						controller: function($scope, $element, $attrs, $transclude, Localizer) {
								for (var key in $scope.options)
										$scope.options[key] = Localizer.phrase($scope.options[key]);

								$('select', $element).each(function() {
										for (var i in $attrs)
												if (i.substr(0, 1) != '$' && !$scope[i] && i != 'ngModel')
														$(this).attr(i, $attrs[i]);
								});
						},
				};
		});
});