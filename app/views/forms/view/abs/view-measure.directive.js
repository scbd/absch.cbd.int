define(['app', "text!views/forms/view/abs/view-measure.directive.html",
        'views/measure-matrix/measure-matrix-elements-derective',
        'services/search-service', 'services/app-config-service','views/directives/party-status',
	'views/forms/view/directives/view-default-reference.directive',
	'views/directives/record-options',
    ], function (app, template) {

app.directive("viewMeasure", [function () {
	return {
		restrict   : "EAC",
		template: template ,
		replace    : true,
		transclude : false,
		scope: {
			document    : "=ngModel",
			locale      : "=",
			target      : "@linkTarget",
			allowDrafts : "@",
			hide		: "@"
		},
		controller : ["$scope", "IStorage","$filter", "searchService", "$q", "appConfigService",
         function ($scope, storage, $filter, searchService, $q, appConfigService)
		{
			//====================
			//
			//====================
			$scope.display = function(field) {

				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : false);
			}

            $scope.$watch("document", function (_new) {
				if ($scope.document && $scope.document.header
                    && $scope.document.header.identifier) {
                        var queries = [];
                        if(!$scope.document.measureAmendedBy){
                            var listQuery = {
                                query: 'realm_ss:' + appConfigService.currentRealm.toLowerCase() +
                                 ' AND schema_s:measure AND NOT virtual_b:* AND amendedMeasures_ss:'  + $scope.document.header.identifier+'*'
                            };
                            queries.push(searchService.list(listQuery));
                        }
                        // if(!$scope.document.linkedMeasures){
                        //     var listQuery = {
                        //         query: 'realm_ss:' + appConfigService.currentRealm.toLowerCase() +
                        //          ' AND schema_s:measure AND NOT virtual_b:* AND linkedMeasures_ss:'  + $scope.document.header.identifier+'*'
                        //     };
                        //     queries.push(searchService.list(listQuery));
                        // }
                        $q.all(queries)
                          .then(function(data){
							  if(data[0])
                              	$scope.document.measureAmendedBy = data[0].data.response.docs;
                            //   if(data[1])
							//   	$scope.document.linkedMeasures = data[1].data.response.docs;
                              if($scope.measureMatrixApi)
							  	$scope.measureMatrixApi.reloadMatrix(true);
                          });
				}
			});

			$scope.showLanguage = function(model, type){

				if(type=='file'){
					return $filter("term")(model);
				}
				else
					return model;
			}

			$scope.getTerm = function(term){

				return {
					identifier : term
				}
			}
		
		}]
	};
}]);

});
