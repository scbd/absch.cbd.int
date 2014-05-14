define(['app'], function (app) {
	app.directive('documentMetadata', function($http){
		return{
			restrict: 'EAC',
			replace:true,
			templateUrl: '/app/views/directives/document-metadata-directive.html',		
			controller: ['$scope', function($scope){
			}]
		};

	});
});