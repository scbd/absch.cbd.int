import app from 'app';
import _ from 'lodash';
import template from 'text!./view-terms-hierarchy.html';
import 'components/scbd-angularjs-services/main';
import 'services/main';

    app.directive('viewTermsHierarchy', ["thesaurusService", 'Thesaurus', 
    function (thesaurusService, thesaurus) {
        return {
            restrict: 'EA',
            template: template,
            replace: true,
            scope:{
                binding: '=ngModel',
                locales: '=',
                termDomain:'@',
                onTermsLoaded: '&?'
            },
            link: function ($scope, $element, $attr) {
                $scope.view = $attr.view||'tree';
                $scope.$watch('binding', function(newVal, oldVal){
                    //console.log(newVal);                   
                    var newTerms = angular.copy(newVal);                    
                    if(!_.isArray(newVal))
                        newTerms = [newTerms];

					if($scope.termDomain && newTerms && (newTerms||[]).length){
						thesaurusService.getDomainTerms($scope.termDomain, {other:true})
						.then(function(terms){
                            if($scope.onTermsLoaded && typeof $scope.onTermsLoaded == 'function'){
                                terms = $scope.onTermsLoaded({terms:terms})
                            }
                            if($attr.hideIdentifier!=undefined){
                                terms = _.filter( terms, function ( item ) {
                                    return item.identifier != $attr.hideIdentifier
                                   } );
                                }
                            var OtherTerm = angular.copy(_.find(terms, {identifier:'5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'}))
							_.forEach(_.compact(newTerms), function(term, index){
								if(term.customValue){
									var otherTerm = angular.copy(OtherTerm);
									var parentTerm = _.find(terms, {identifier:term.identifier});
									
                                    otherTerm.identifier = otherTerm.identifier + '#' + index;
                                    if(parentTerm){
                                        otherTerm.identifier = otherTerm.identifier + '#' + parentTerm.identifier + '#' + index;
                                        parentTerm.narrowerTerms.push(otherTerm.identifier);
									    otherTerm.broaderTerms.push(parentTerm.identifier);
                                    }
                                    //term.identifier = otherTerm.identifier;
                                    otherTerm.showTerm = true;	
									otherTerm.customValue = term.customValue;
                                    parentTerm.customValue = undefined;
									terms.push(otherTerm)
								}
								findTerm(term.identifier, terms);
                            })
                            // console.log(terms)
							$scope.rootTerms = thesaurus.buildTree(terms);
						});
					}
			})

			function findTerm(term, terms){
				var traitTerm = _.find(terms, {identifier:term})
				if(traitTerm){
					traitTerm.showTerm = true;					
					_.forEach(traitTerm.broaderTerms||[], function(broaderTerm){
						findTerm(broaderTerm, terms);
					})
				}
			}
            }
        }
    }])

