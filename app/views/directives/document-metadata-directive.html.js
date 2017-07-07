define(['app','text!views/directives/document-metadata-directive.html', '/app/js/common.js'
    ], function (app, template) {
	app.directive('documentMetadata', function($http){
		return{
			restrict: 'EAC',
			replace:true,
			template: template,
			controller: ['$scope', '$filter','commonjs','$element', '$compile', function($scope, $filter, commonjs, $element, $compile){

				$scope.getUniqueID = function(document){
					if(!document)
						return;
                    var uid
					// if(!document.id)
					// 	uid = $filter("uniqueIDWithoutRevision")(document.info);
					// else
					uid = $filter("uniqueID")(document);

                    if(!uid)
                     return "[new draft]";

                    return uid;
				}

                $scope.getUniqueIDForUrl = function(document){
                    if(!document)
						return;
                    var uid

                    if(!document.id)
						uid = $filter("uniqueIDWithoutRevision")(document);
					else
					    uid = $filter("uniqueID")(document);

                    if(document.revision || document.info && document.info.revision){
                        var revision = (document.revision || document.info.revision);
                        //temporary till revision data is migrated
                        var tempUId = $filter("uniqueID")(document);
                        if(tempUId == uid+'-'+revision)
                            return uid

                        return  uid + '/' + revision;
                    }

                    return  uid;
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
