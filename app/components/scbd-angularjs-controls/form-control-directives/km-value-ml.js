import app from 'app';
import ng from 'angular';
import $ from 'jquery';
import _ from 'lodash';
import template from 'text!./km-value-ml.html'; ;

	app.directive('kmValueMl', [function ()
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
				
				$scope.markdown = attrs.hasOwnProperty("markdown");
				$scope.kmPre	= attrs.hasOwnProperty("kmPre");
				$scope.html		= attrs.hasOwnProperty("html");

				$scope.$watch('locales', function(text) {
					// console.log($scope.locales, _.isString($scope.locales))
					if(_.isString($scope.locales)){
						$scope.localesToDisplay = [$scope.locales]
					}
					else{
						$scope.localesToDisplay = $scope.locales;
					}

				});
				//==============================
				//
				//==============================
				$scope.isShowLocale = function()
				{
					return $scope.locales && $scope.locales.length>1;
				};
				
				$scope.self = $scope;
			}
		};
	}]);

	app.filter('addclear', function(){

		return function(html){
			return  (html||'') + '<div class="html-div-clear-fix"></div>'
		}

	})

