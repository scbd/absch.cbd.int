define(['app', 'lodash', 'text!./view-terms-hierarchy.html', 
'components/scbd-angularjs-services/services/utilities', 'services/thesaurus-service'], function (app, _, template) {

    app.directive('viewTermsHierarchy', ["thesaurusService", 'Thesaurus', 
    function (thesaurusService, thesaurus) {
        return {
            restrict: 'EA',
            template: template,
            replace: true,
            scope:{
                binding: '=ngModel',
                locales: '=',
                termDomain:'@'
            },
            link: function ($scope, $attr, $element) {
                
                $scope.$watch('binding', function(newVal, oldVal){
					//console.log(newVal);
					if(newVal && (newVal||[]).length){
						thesaurusService.getDomainTerms($scope.termDomain, {other:true})
						.then(function(terms){
							_.each(newVal, function(term){
								if(term.customValue){
									var otherTerm = angular.copy(_.find(terms, {identifier:'5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'}));
									var parentTerm = _.find(terms, {identifier:term.identifier});
									
									otherTerm.identifier = otherTerm.identifier + '#' + parentTerm.identifier
									parentTerm.narrowerTerms.push(otherTerm.identifier);
									otherTerm.broaderTerms.push(parentTerm.identifier);
									term.identifier = otherTerm.identifier;
									otherTerm.customValue = term.customValue
									terms.push(otherTerm)
								}
								findTerm(term.identifier, terms);
							})
							$scope.rootTerms = thesaurus.buildTree(terms);
						});
					}
			})

			function findTerm(term, terms){
				var traitTerm = _.find(terms, {identifier:term})
				if(traitTerm){
					traitTerm.showTerm = true;					
					_.each(traitTerm.broaderTerms||[], function(broaderTerm){
						findTerm(broaderTerm, terms);
					})
				}
			}
            }
        }
    }])

});