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
                    $scope.isEuMember = false;
                    $scope.waiting = true;
                    thesaurusService.getTerms(solr.escape('eu'),{relations:true})
                    .then(function(o) {
                        $scope.isEuMember = (o.narrowerTerms.indexOf(code) !== -1) ? true : false;
                        if(code == 'eu'){
                            $scope.isEuMember = true;
                            $scope.authorityQuery = "schema_s:authority AND government_s="+ solr.escape(o.narrowerTerms.join());
                        }
                        else{ $scope.authorityQuery = 'schema_s:authority AND government_s='+ solr.escape(code);}
                    })
                    .finally(function(){
                        $scope.waiting = false;
                    });
                }
                $scope.onCommonDecisionChanged = function(){
                    $scope.isLmoDecisionForIntentionalIntroduction	= _($scope.decisions.commonDecisions||[]).map('identifier').includes(commonDecisionsIdentifiers[0]);
                    $scope.isLmoDecisionForDirectUse				= _($scope.decisions.commonDecisions||[]).map('identifier').includes(commonDecisionsIdentifiers[1]);
                }
                
                $scope.onOtherDecisionChanged = function(terms){
                    
                    $scope.isSimplifiedProcedure	= false;
                    $scope.isDecisionOnTransitOfLMOs	= false;
                    $scope.isDecisionOnContainedUseOfLMOs	= false;
                    $scope.isShowDecisionDocument	= false;
                    $scope.isTransboundaryMovement = false;
                    var identifiersForSectionF = ["83C0DBFB-AD5C-4B88-8ECE-5365991F2956","3FF9FEB3-20FA-4287-B562-46635A1154A3"];
                    var identifiersForSectionI = ["0C9BBC54-34F1-431A-A579-F018D8E5CEAD","3293477D-466D-40CB-A890-4B139BCE93AC","8E26ACCB-3358-4BC3-8389-56AA508991E6","2C74A444-32C1-45B0-B1AC-F419773A4A7E","5B6177DD-5E5E-434E-8CB7-D63D67D5EBED","A8C8A4D9-8084-4F6E-88B7-47BA04075E40"];
                
                    if(terms.otherDecisions.identifier == "8979219B-330B-424F-A52C-209D4B4B65C0"){ $scope.isSimplifiedProcedure	= true; }
                    if(terms.otherDecisions.identifier == "1B6F702C-0C68-4B53-BCA4-1DA4A25E23A8"){ $scope.isDecisionOnTransitOfLMOs	= true;}
                    if(terms.otherDecisions.identifier == "D698B5F7-A434-49E2-A7FF-FE869AFBEE8D"){ $scope.isDecisionOnContainedUseOfLMOs = true;}
                    if(_.includes(identifiersForSectionI,terms.otherDecisions.identifier)){ $scope.isShowDecisionDocument = true;}
                    if(_.includes(identifiersForSectionF,terms.otherDecisions.identifier)){ $scope.isTransboundaryMovement = true;}
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
                    //Information sharing with other databases
                    if(!document.isForCommercialUse){
                        document.forwardToOECD = undefined;
                        document.isForFoodSafety = undefined;
                        document.codexConduted = undefined;
                        document.forwardToFAO = undefined;
                    }

                   if(!document.isForFoodSafety){
                    document.codexConduted = undefined;
                    document.forwardToFAO = undefined;
                   }
                   
                    if(!document.movementAllowedUnderA131A){
                        document.exemptedFromAIA = undefined;
                    }
                    if(!document.unintentionalTransboundaryMovement){
                        document.estimatedQuantities = undefined;
                        document.releaseCurcumstance = undefined;
                        document.releaseDate = undefined;
                        document.lmoUseInformation = undefined;
                        document.adverseEffectInformation = undefined;
                        document.pointOfContact = undefined;
                    }
                    if(!document.unintentionalTransboundaryMovement && !document.illegalTransboundaryMovement){
                        document.otherInformation = undefined;
                    }
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
                        $scope.decisions.otherDecisions = {};
                        if(!$scope.isLmoDecisionForIntentionalIntroduction && !$scope.isLmoDecisionForDirectUse){
                            $scope.decisions.otherDecisions = {identifier: decisionTypesIdentifiers.toString()}
                            $scope.onOtherDecisionChanged($scope.decisions);
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
