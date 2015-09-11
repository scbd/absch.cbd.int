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
				
			}]
		};
	}])

});
