define(['app','text!./endorsement-directive.html', 'services/main' ], function (app, template) {
	app.directive('endorsement', function($http){
		return{
			restrict: 'EAC',
			replace:true,
			template: template,
            scope       : {
                identifier  : '=',
                schema      : '='
            },
			controller: ['$scope', 'searchService', 'solr', function($scope, searchService, solr){

                $scope.loadEndorsments = function(identifier){

                    var searchQuery = {
                        fields: 'government_s, government_EN_s, createdDate_dt',
                        query : 'schema_s:endorsement AND endorsedDocument_s :' + solr.escape(identifier)
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
