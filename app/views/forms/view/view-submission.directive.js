define(['app', "text!views/forms/view/view-submission.directive.html", 	'views/directives/record-options', 'services/solr', 'services/search-service'
], function (app, template) {

    app.directive("viewSubmission", ['searchService', 'solr', function (searchService, solr) {
        return {
            restrict   : "EA",
            template: template ,
            replace    : true,
            scope: {
                document: "=ngModel",
                locale  : "=",
                target  : "@linkTarget",
                hide	: "@"
            },
            link:function($scope){

                $scope.$watch("document.notifications", function(newVal, oldVal)
				{
					if(newVal){
						if(~($scope.notifications||[]).length || newVal!=oldVal){
							var query = {
								query: "symbol_s:(" + _.map(newVal, 'identifier').map(solr.escape).join(' ') + ')',
								fields: "identifier_s,title_s,acronym_s,reference_s, symbol_s"
							};
							searchService.list(query).then(function(data){
								$scope.notifications  = data;
							});
						}
					}
					else
						$scope.notifications  = [];
				});
            }
        };
    }]);
    
    });
    