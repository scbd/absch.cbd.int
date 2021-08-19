import app from 'app';
import template from 'text!./document-metadata-directive.html';
import 'services/main';
	app.directive('documentMetadata', function($http){
		return{
			restrict: 'EA',
			replace:true,
			template: template,
            controller: ['$scope','$rootScope', '$filter','commonjs','$element', '$compile', '$timeout', '$route', '$location',
                function($scope, $rootScope, $filter, commonjs, $element, $compile, $timeout, $route, $location){

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

				$scope.loadReportRecord = async function(schema, identifier,title){
                    
                    await import('~/views/directives/report-record');
                    var directiveHtml = "<div report-record uid='"+ identifier + "' schema='" +  schema +  "' title='" +  title + "'></div>";
                    $scope.$apply(function() {
                        $element.find('#divReportRecord')
                            .empty()
                            .append($compile(directiveHtml)($scope));
                        $element.find('#reportRecordCtl').click();
                    });
                }
                
                $scope.showReportedRecord = function(){
                    return !/^\/register\/\w{2,4}\/new/.test($location.path()) &&
                           !/^\/register\/\w{2,4}\/([a-z])\w.+\/edit/i.test($location.path());
                }
			}]
		};

	});

