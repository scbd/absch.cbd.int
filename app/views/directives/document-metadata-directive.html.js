define(['app'], function (app) {
	app.directive('documentMetadata', function($http){
		return{
			restrict: 'EAC',
			replace:true,
			templateUrl: '/app/views/directives/document-metadata-directive.html',
			controller: ['$scope', '$filter', function($scope, $filter){

				$scope.getDocumentId = function(document){

					if(!document.id)
						return $filter("uniqueIDWithoutRevision")(document.info);
					else
						return document.id;
				}
			}]
		};

	});
});
