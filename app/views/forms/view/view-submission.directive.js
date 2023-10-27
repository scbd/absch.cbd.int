﻿import app from '~/app';
import _ from 'lodash';
import template from "text!./view-submission.directive.html";
import '~/views/directives/record-options';
import '~/services/main';
import '~/views/forms/directives/view-terms-hierarchy';
import viewSubmissionT from '~/app-text/views/forms/view/view-submission.json';

    app.directive("viewSubmission", ['searchService', 'solr', 'translationService', function (searchService, solr, translationService) {
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
				translationService.set('viewSubmissionT', viewSubmissionT);

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

                $scope.$watch("document.notifications", function(newVal, oldVal){

					if(~($scope.notifications||[]).length || newVal!=oldVal){
						const selectedIds = _.map(newVal, 'identifier').map(solr.escape)
						if(selectedIds?.length){
							var query = {
								query: `identifier_s:(${selectedIds.join(' ')}) OR symbol_s:(${selectedIds.join(' ')})`,
								fields: "id,identifier_s,title_s,acronym_s,reference_s, symbol_s, uniqueIdentifier_s,schema:schema_s"
							};
							searchService.list(query).then(function(data){
								$scope.notifications  = data.data.response.docs;
							});
						}
						else{
							$scope.notifications  = [];
						}
					}
					else if(!newVal)
						$scope.notifications  = [];
				});
            }
        };
    }]);
    
    
    