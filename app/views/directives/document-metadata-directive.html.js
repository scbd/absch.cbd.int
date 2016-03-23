define(['app', '/app/js/common.js'
    ], function (app) {
	app.directive('documentMetadata', function($http){
		return{
			restrict: 'EAC',
			replace:true,
			templateUrl: '/app/views/directives/document-metadata-directive.html',
			controller: ['$scope', '$filter','commonjs','$element', '$compile', function($scope, $filter, commonjs, $element, $compile){

				$scope.getDocumentId = function(document){
					if(!document)
						return;
					if(!document.id)
						return $filter("uniqueIDWithoutRevision")(document.info);
					else
						return commonjs.hexToInteger(document.id);
				}
                
               $scope.getUniqueID = function(doc){
                
                   var uid =$filter('uniqueID')(doc);
                   
                   if(!uid)
                    return "unique identifier not yet assigned ";   
                   
                   return uid;
                   
               }
                
                

				$scope.loadReportRecord = function(schema, identifier){

                    require(['/app/views/directives/report-record.js'], function() {

                        var directiveHtml = "<div report-record uid='"+ identifier + "' schema='" +  schema + "'></div>";

                        $scope.$apply(function() {
                            $element.find('#divReportRecord')
                                .empty()
                                .append($compile(directiveHtml)($scope));
                        });
                    });
				}
			}]
		};

	});
});
