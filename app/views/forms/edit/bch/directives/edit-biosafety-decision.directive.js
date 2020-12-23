define(['app', 'lodash', 'text!./edit-biosafety-decision.directive.html', 'views/forms/edit/edit', 'services/thesaurus-service',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-biosafety-decision.directive"], 
function (app, _, template) {

	app.directive("editBiosafetyDecision", ["$controller", "thesaurusService", "$routeParams", "solr", function($controller, thesaurusService, $routeParams, solr) {
		return {
			restrict   : "EA",
			template: template,
			replace    : true,
			require    : '?ngModel',
			scope:{
				onPostSubmitFn   : "&onPostSubmit"
			},
			link: function($scope, $element, $attr){
                $scope.isEdit = $routeParams.identifier;
				$scope.scientificNameSynonyms = [{}];
				$scope.commonNames = [{}];
				$scope.container        = $attr.container;
    			$scope.isDialog         = $attr.isDialog;  
				$scope.type 			= $attr.documentType; 
                $scope.decisions        = {};
                $controller('editController', {
                    $scope: $scope
                });
                $scope.isEdit = false;
                if($routeParams.identifier != undefined){
                    $scope.isEdit = true;
                }
                var commonDecisionsIdentifiers = ["E8C5A15C-A736-4fb7-A1B6-192412BE7E45", "BE64016A-C3BD-4C61-9620-C3FEF96B2A24"]
                _.extend($scope.options, {

                    commonDecisions: function() {
                        return thesaurusService.getDomainTerms('decisionTypes').then(function(o) {					
                            return _.filter(o, function(item){
                                return _.includes(commonDecisionsIdentifiers, item.identifier)
                            });
                        });
                    },
                    otherDecisions: function() {
                        return thesaurusService.getDomainTerms('decisionTypes').then(function(o) {					
                            return _.filter(o, function(item){
                                return !_.includes(commonDecisionsIdentifiers, item.identifier) 
                                    && _.intersection(commonDecisionsIdentifiers, item.broaderTerms).length ==0
                            });
                        });
                    },
                    intentionDecisions: function() {
                        return thesaurusService.getDomainTerms('decisionTypes').then(function(o) {					
                            return _.filter(o, function(item){
                                return _.includes(item.broaderTerms, commonDecisionsIdentifiers[0])
                            });
                        });
                    },
                    directUseDecisions: function() {
                        return thesaurusService.getDomainTerms('decisionTypes').then(function(o) {					
                            return _.filter(o, function(item){
                                return _.includes(item.broaderTerms, commonDecisionsIdentifiers[1])
                            });
                        });
                    },
                    decisionLMOFFPSubject: function() {
                        return thesaurusService.getDomainTerms('decisionLMOFFPSubject');
                    },
                    decisionResult: function() {
                        return thesaurusService.getDomainTerms('decisionResults');
                    }
                    
                });
                $scope.selectDecision = function(value){
                    $scope.decClass = "";
                    if(value == "3EFF4792-A896-4DC7-9945-04FE9C8B5B4F"){
                        $scope.decClass = "two";
                    }
                    if(value == "6DD1B161-4CDB-4900-BD31-DBB97E86B2AE"){
                        $scope.decClass = "three";
                    }
                    if(value == "8D91ACEE-C6B3-4204-8FE6-00AE424013FF"){
                        $scope.decClass = "four";
                    }
                    if(value == "19F9F13E-195E-45B5-88DD-058A07E0D6F6" ){
                        $scope.decClass = "five";
                    }
                }
                
                $scope.onCountryChange = function(code){
                    if(code == 'eu'){
                        $scope.waiting = true;
                        thesaurusService.getTerms(solr.escape(code),{relations:true})
                        .then(function(o) {
                            $scope.authorityQuery = "schema_s:authority AND government_s="+ solr.escape(o.narrowerTerms.join());
                        })
                        .finally(function(){
                                $scope.waiting = false;
                        });   
                    }
                    else{
                         $scope.authorityQuery = 'schema_s:authority AND government_s='+ solr.escape(code);
                    }
                }
                $scope.onCommonDecisionChanged = function(){
                    $scope.isLmoDecisionForIntentionalIntroduction	= _($scope.decisions.commonDecisions||[]).map('identifier').includes(commonDecisionsIdentifiers[0]);
                    $scope.isLmoDecisionForDirectUse				= _($scope.decisions.commonDecisions||[]).map('identifier').includes(commonDecisionsIdentifiers[1]);
                }
                //==================================
                //
                //==================================
                $scope.getCleanDocument = function(document) {

                    document = document || $scope.document;

                    if (!document)
                        return undefined;

                    //////////////////////////////////
                    /////make decision Types field
                    //////////////////////////////////

                    var decisionTypes = [];
                    if($scope.decisions)
                        decisionTypes	=	_.compact($scope.decisions.commonDecisions||[$scope.decisions.otherDecisions]||[]);

                    if($scope.isLmoDecisionForIntentionalIntroduction && document.addressesTransboundaryMovement)
                        decisionTypes = _.union(decisionTypes, [$scope.decisions.intentionDecisions]);

                    if(!$scope.isLmoDecisionForIntentionalIntroduction && $scope.isLmoDecisionForDirectUse)
                        decisionTypes = _.union(decisionTypes, $scope.decisions.directUseDecisions);

                    if(decisionTypes && decisionTypes.length > 0)
                        document.decisionTypes = _(decisionTypes).compact().flatten().value();
                    else
                        document.decisionTypes = undefined;

                    if (/^\s*$/g.test(document.notes))
                        document.notes = undefined;

                    return $scope.sanitizeDocument(document);
                };
                
                $scope.setDocument({})
                .then(function(){
                    var document = $scope.document;
                     if(document.government != undefined){
                        $scope.onCountryChange(document.government.identifier);
                    }
                    if(document.decisionResult != undefined){
                        $scope.selectDecision(document.decisionResult.identifier);
                    }
                    if(document.decisionTypes && document.decisionTypes.length > 0){
                        $scope.decisions.commonDecisions = [];
                        var decisionTypesIdentifiers = _.map(document.decisionTypes, 'identifier');
                        if(_.includes(decisionTypesIdentifiers, commonDecisionsIdentifiers[0])){
                            $scope.decisions.commonDecisions.push({identifier:commonDecisionsIdentifiers[0]});
                            $scope.isLmoDecisionForIntentionalIntroduction = true
                        }
                        if(_.includes(decisionTypesIdentifiers, commonDecisionsIdentifiers[1])){
                            $scope.decisions.commonDecisions.push({identifier:commonDecisionsIdentifiers[1]});
                            $scope.isLmoDecisionForDirectUse = true
                        }
                        $scope.options.intentionDecisions()
                        .then(function(options){
                            var selectedOption = _.find(options, function(o){
                                return _.includes(decisionTypesIdentifiers, o.identifier);
                            })
                            if(selectedOption)
                                $scope.decisions.intentionDecisions = {identifier:selectedOption.identifier}
                        })
                        $scope.options.directUseDecisions()
                        .then(function(options){
                            var selectedOption =  _.find(options, function(o){
                                return _.includes(decisionTypesIdentifiers, o.identifier);
                            })
                            if(selectedOption)
                                $scope.decisions.directUseDecisions =  {identifier:selectedOption.identifier}
                        })
                    }

                });    
			}
		}

   }]);

});
