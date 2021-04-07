import app from 'app';
import _ from 'lodash';
import template from "text!./view-submission.directive.html";
import 'views/directives/record-options';
import 'services/main';
import 'views/forms/directives/view-terms-hierarchy';

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
                $scope.onThematicAreasTerms = function(terms){
                    if(($scope.document||{}).cpbThematicAreas){
                      var parentIds = ['B18CE475-8D23-4DEC-A9F1-13F0243C9233',
                            '5A1A07F7-FF4B-4302-AC9F-711DA47B215B',
                            '837523BF-6ED8-42FC-A39D-197442BD736B',
                            'F4B40E3C-6804-43E1-AF68-BCE9C2ACF7ED',
                            '0CBE5BD3-84C8-4197-A39A-360EC8841631',
                            '2A6F3EC5-775B-477C-A88E-80CE7DF522E0',
                            'CC16EA96-352B-4A31-ADBE-49C2DD912569'] ;
                             _.forEach(parentIds, function(item) {
                            var term = _.find(terms, {identifier: item})
                            if (term) {

                            var cpbThematicAreas = $scope.document.cpbThematicAreas;
                             if (_(cpbThematicAreas).map('identifier').intersection(term.narrowerTerms).value().length == term.narrowerTerms.length) {
                                terms = _.filter(terms, function (t) {
                                    return !_.includes(term.narrowerTerms, t.identifier)
                                })
                            }
                            }
                        })
                        return terms;
                    }
                }

                $scope.$watch("document.notifications", function(newVal, oldVal)
				{
					if(newVal!=oldVal){
						if(~($scope.notifications||[]).length || newVal!=oldVal){
							var query = {
								query: "symbol_s:(" + _.map(newVal, 'identifier').map(solr.escape).join(' ') + ')',
								fields: "identifier_s,title_s,acronym_s,reference_s, symbol_s"
							};
							searchService.list(query).then(function(data){
								$scope.notifications  = data.data.response.docs;
							});
						}
					}
					else
						$scope.notifications  = [];
				});
            }
        };
    }]);
    
    
    