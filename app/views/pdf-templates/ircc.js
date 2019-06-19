define(['app', 'services/app-config-service', './ircc-directive',
], function (app) {

	app.controller('irccPdfView', ['$scope','$routeParams','$location','$filter',
		function($scope,$routeParams,$location, $filter) {
		
		var documentId = $routeParams.documentId;
		
		if (documentId && /^absch/.test(documentId.toLowerCase())) {
			var docNum = documentId.split('-');
			if (docNum.length == 5) {
				documentId = docNum[3]+'@'+docNum[4]
			}
		}
		$scope.identifier = documentId;

	}]);

});
