define(['app'], function (app) {
	app.directive('documentMetadata', function($http){
		return{
			restrict: 'EAC',
			replace:true,
			templateUrl: '/app/views/directives/document-metadata-directive.html',
			controller: ['$scope', '$filter','commonjs', function($scope, $filter, commonjs){

				$scope.getDocumentId = function(document){
					if(!document)
						return;
					if(!document.id)
						return $filter("uniqueIDWithoutRevision")(document.info);
					else
						return commonjs.hexToInteger(document.id);
				}

				$scope.getDocumentSchema = function(schema){

					if(schema.toLowerCase() == "pressrelease" || schema.toLowerCase() == "statement"
						|| schema.toLowerCase() == "news" || schema.toLowerCase() == "notification" ||
						schema.toLowerCase() == "meeting" || schema.toLowerCase() == "focalpoint")
						return schema;
					else
						return $filter("schemaShortName")(schema.toLowerCase())
				}
			}]
		};

	});
});
