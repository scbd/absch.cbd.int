import app from 'app';
import template from 'text!./view-focalpoint.directive.html';
import 'views/directives/record-options';

app.directive('viewFocalPoint', [function() {
	return {
		restrict: 'EAC',
		template: template ,
		replace: true,
		transclude: false,
		scope: {
			document: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		controller: ['$scope','commonjs', '$q', function ($scope, commonjs, $q) {


			
			
			
			$scope.getNFPText = commonjs.getNFPText;

			$scope.$watch('::document', function(newVal){
				$q.when(commonjs.getReferenceRecordIndex('focalPoint', newVal.header.identifier))
					.then(function(result){
							$scope.focalPointDetails = result.data
							$scope.focalPointDetails.description_EN_t = ($scope.focalPointDetails.description_EN_t||'').replace(/\n/g, '<br/>')
					})
			})
			
			
		}]
	}
}]);

