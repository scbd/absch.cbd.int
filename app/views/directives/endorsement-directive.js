define(['app','/app/services/search-service.js'
    ], function (app) {
	app.directive('endorsement', function($http){
		return{
			restrict: 'EAC',
			replace:true,
			templateUrl: '/app/views/directives/endorsement-directive.html',
            scope       : {
                identifier  : '=',
                schema      : '='
            },
			controller: ['$scope', 'searchService', function($scope, searchService){

                $scope.loadEndorsments = function(identifier){

                    var searchQuery = {
                        fields: 'government_s, government_EN_s, createdDate_dt',
                        query : 'schema_s:endorsement AND endorsedDocument_s :' + identifier
                    };

                    searchService.list(searchQuery)
                    .then(function(data){
                        console.log(data.data);
                        $scope.endorsements = data.data.response.docs;
                    });

                };

                $scope.loadEndorsments($scope.identifier);
			}]
		};

	});
});
