define(['app'], function (app) {

	app.directive('editSchemaResourceBase', ["$q", "$timeout", function ($q, $timeout)
	{
		return {
			restrict: 'EAC',
			templateUrl: '/app/views/forms/edit/edit-resource-schema-base-directive.html',
			replace: true,
			// scope: {
			// 	document 	  	: '=',
			// 	getDocumentFn 	: '&',
			// 	options			: '='
			// },
			controller: ["$scope", "IStorage", "editFormUtility", function ($scope, storage, editFormUtility)
			{
				
				
				if($scope.document_type=="modelContractualClause"){
					$scope.heading = "Model Contractual Clause";
					$scope.shortHeading = "MCC";
				}
				else if($scope.document_type=="resource"){
					$scope.heading = "Virtual Library Record";
					$scope.shortHeading = "VLR";
				}
				
				
			}]
		};
	}])

});
