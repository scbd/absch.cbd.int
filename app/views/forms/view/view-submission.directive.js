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
										_.forEach(terms, function(item){
											if(item.broaderTerms.length == 0 || item.broaderTerms == []){
												var parent =_.find($scope.document.cpbThematicAreas, {identifier: item.identifier});
												if(parent){
													terms = _.filter(terms, function(t){
														return !_.includes(item.narrowerTerms, t.identifier)
													})
												}
											}
										});
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
    
    
    