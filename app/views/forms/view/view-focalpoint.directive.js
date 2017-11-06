define(['app', 'text!views/forms/view/view-focalpoint.directive.html', 
'views/directives/record-options',
], function (app, template) {

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


			if((($scope.document||{}).createdDate_dt) || $scope.$parent.internalDocumentInfo)
			$scope.updatedOn = ($scope.document||{}).createdDate_dt || $scope.$parent.internalDocumentInfo.updatedOn;
			
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
});
