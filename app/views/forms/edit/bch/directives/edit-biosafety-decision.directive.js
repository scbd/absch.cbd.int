define(['app', 'lodash', 'text!./edit-biosafety-decision.directive.html', 'views/forms/edit/edit', 'services/thesaurus-service',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-biosafety-decision.directive"], 
function (app, _, template) {

    app.directive("editBiosafetyDecision", ["$controller", "thesaurusService", "$routeParams", "solr", 'editFormUtility', 
        function($controller, thesaurusService, $routeParams, solr, editFormUtility) {
		return {
			restrict   : "EA",
			template: template,
			replace    : true,
			require    : '?ngModel',
			scope:{
				onPostSubmitFn   : "&onPostSubmit"
			},
			link: function($scope, $element, $attr){
                
				$scope.scientificNameSynonyms = [{}];
				$scope.commonNames = [{}];
				$scope.container        = $attr.container;
    			$scope.isDialog         = $attr.isDialog;  
				$scope.type 			= $attr.documentType; 
                $scope.decisions        = {};
                $controller('editController', {
                    $scope: $scope
                });

                var decisionSubjects = {
                    DEC_7_1    : "E8C5A15C-A736-4fb7-A1B6-192412BE7E45",
                    DEC_7_2    : "BE64016A-C3BD-4C61-9620-C3FEF96B2A24",
                    DEC_7_3    : "8979219B-330B-424F-A52C-209D4B4B65C0",
                    DEC_7_4    : "1B6F702C-0C68-4B53-BCA4-1DA4A25E23A8",
                    DEC_7_5    : "D698B5F7-A434-49E2-A7FF-FE869AFBEE8D",
                    DEC_7_6    : "0C9BBC54-34F1-431A-A579-F018D8E5CEAD",
                    DEC_7_7    : "83C0DBFB-AD5C-4B88-8ECE-5365991F2956",
                    DEC_7_8    : "3293477D-466D-40CB-A890-4B139BCE93AC",
                    DEC_7_9    : "3FF9FEB3-20FA-4287-B562-46635A1154A3",
                    DEC_7_10   : "8E26ACCB-3358-4BC3-8389-56AA508991E6",
                    DEC_7_11   : "A8C8A4D9-8084-4F6E-88B7-47BA04075E40",
                    DEC_7_12   : "2C74A444-32C1-45B0-B1AC-F419773A4A7E",
                }
                _.extend($scope.options, {

                    commonDecisions: function() {
                        return thesaurusService.getDomainTerms('decisionTypes').then(function(o) {					
                            return _.filter(o, function(item){
                                return _.includes([decisionSubjects.DEC_7_1, decisionSubjects.DEC_7_2], item.identifier)
                            });
                        });
                    },
                    otherDecisions: function() {
                        return thesaurusService.getDomainTerms('decisionTypes').then(function(o) {					
                            return _.filter(o, function(item){
                                return !_.includes([decisionSubjects.DEC_7_1, decisionSubjects.DEC_7_2], item.identifier) 
                                    && _.intersection([decisionSubjects.DEC_7_1, decisionSubjects.DEC_7_2], item.broaderTerms).length ==0
                            });
                        });
                    },
                    intentionDecisions: function() {
                        return thesaurusService.getDomainTerms('decisionTypes').then(function(o) {					
                            return _.filter(o, function(item){
                                return _.includes(item.broaderTerms, decisionSubjects.DEC_7_1)
                            });
                        });
                    },
                    directUseDecisions: function() {
                        return thesaurusService.getDomainTerms('decisionTypes').then(function(o) {					
                            return _.filter(o, function(item){
                                return _.includes(item.broaderTerms, decisionSubjects.DEC_7_2)
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

                $scope.onResultDecisionSelected = function(value){
                    $scope.decisionResult = {};
                    if(value == "3EFF4792-A896-4DC7-9945-04FE9C8B5B4F"){ // Approval of the import and/or use of the LMO(s) with conditions
                        $scope.document.extensionPeriod = undefined;
                        $scope.decisionResult.conditions = true;
                        $scope.decisionResult.reasons = true;
                    }
                    else if(value == "6DD1B161-4CDB-4900-BD31-DBB97E86B2AE"){ // Prohibition of the import and/or use of the LMO(s).
                        $scope.document.conditions = undefined;
                        $scope.document.extensionPeriod = undefined;
                        $scope.decisionResult.reasons = true;
                    }
                    else if(value == "8D91ACEE-C6B3-4204-8FE6-00AE424013FF"){ // Request additional relevant information
                        $scope.document.conditions = undefined;
                        $scope.document.extensionPeriod = undefined;
                        $scope.decisionResult.reasons = true;
                    }
                    else if(value == "19F9F13E-195E-45B5-88DD-058A07E0D6F6" ){ // Inform the notifier that the period for communicating the decision has been extended
                        $scope.document.conditions = undefined;
                        $scope.decisionResult.reasons = true;
                        $scope.decisionResult.extensionPeriod = true;
                    }
                    else {
                      $scope.document.conditions = undefined;
                      $scope.document.extensionPeriod = undefined;
                      $scope.document.reason = undefined;
                      $scope.decisionResult = {}
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
                    $scope.isLmoDecisionForIntentionalIntroduction	= _($scope.decisions.commonDecisions||[]).map('identifier').includes(decisionSubjects.DEC_7_1);
                    $scope.isLmoDecisionForDirectUse				= _($scope.decisions.commonDecisions||[]).map('identifier').includes(decisionSubjects.DEC_7_2);
                }
                
                $scope.onOtherDecisionChanged = function(terms){
                    
                    $scope.isSimplifiedProcedure            = false;
                    $scope.isDecisionOnTransitOfLMOs        = false;
                    $scope.isDecisionOnContainedUseOfLMOs   = false;
                    $scope.isShowDecisionDocument           = false;
                    $scope.isTransboundaryMovement          = false;
                    $scope.isImportDomesticRegulationOfLMOs = false;
                    $scope.isUnintentionalMovementOfLMOs    = false;
                    $scope.isIllegalMovementOfLMOs          = false;
                    var identifiersForSectionF = [ decisionSubjects.DEC_7_7, decisionSubjects.DEC_7_9 ];
                    var identifiersForSectionI = [decisionSubjects.DEC_7_6, decisionSubjects.DEC_7_8, decisionSubjects.DEC_7_10, 
                        decisionSubjects.DEC_7_12 , decisionSubjects.DEC_7_11, "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED"];
                
                    if(terms.otherDecisions){
                        if(terms.otherDecisions.identifier == decisionSubjects.DEC_7_3){ $scope.isSimplifiedProcedure	= true; }
                        if(terms.otherDecisions.identifier == decisionSubjects.DEC_7_4){ $scope.isDecisionOnTransitOfLMOs	= true;}
                        if(terms.otherDecisions.identifier == decisionSubjects.DEC_7_5){ $scope.isDecisionOnContainedUseOfLMOs = true;}
                        if(terms.otherDecisions.identifier == decisionSubjects.DEC_7_6){ $scope.isImportDomesticRegulationOfLMOs = true;}
                        if(terms.otherDecisions.identifier == decisionSubjects.DEC_7_7){ $scope.isUnintentionalMovementOfLMOs = true;}
                        if(terms.otherDecisions.identifier == decisionSubjects.DEC_7_9){ $scope.isIllegalMovementOfLMOs= true;}
                        if(_.includes(identifiersForSectionI,terms.otherDecisions.identifier)){ $scope.isShowDecisionDocument = true;}
                        if(_.includes(identifiersForSectionF,terms.otherDecisions.identifier)){ $scope.isTransboundaryMovement = true;}
                    }
                    
                }

                $scope.onDirectUseDecisionChange = function(){
                    $scope.decisions.isDecisionOnLmoImport	       = _($scope.decisions.directUseDecisions||[]).map('identifier').includes('0D0BEEF4-54E4-44C1-ABB2-B89DC145E0B3');
                    $scope.decisions.isDecisionOnLmoDomesticUse	   = _($scope.decisions.directUseDecisions||[]).map('identifier').includes('C15E5CD8-B6F9-41AE-A09C-7EF5F73B0507');

                    if($scope.isLmoDecisionForDirectUse){

                      if(!$scope.decisions.isDecisionOnLmoImport && !$scope.decisions.isDecisionOnLmoDomesticUse)
                            $scope.document.importers = undefined;

                        if(!$scope.decisions.isDecisionOnLmoDomesticUse)
                            $scope.document.exporters = undefined;
                    }

                }

                $scope.isLmoMandatory = function(){
                    return  $scope.isLmoDecisionForIntentionalIntroduction	||  
                            $scope.isLmoDecisionForDirectUse ||			
                            $scope.isSimplifiedProcedure || 
                            $scope.isDecisionOnTransitOfLMOs || 
                            $scope.isDecisionOnContainedUseOfLMOs || 
                            $scope.isImportDomesticRegulationOfLMOs
                }

                $scope.isRiskAssessmentMandatory = function(){
                    return $scope.isLmoDecisionForIntentionalIntroduction	||  $scope.isLmoDecisionForDirectUse || $scope.isSimplifiedProcedure
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
                        if(_.includes(decisionTypesIdentifiers, decisionSubjects.DEC_7_1)){
                            $scope.decisions.commonDecisions.push({identifier:decisionSubjects.DEC_7_1});
                            $scope.isLmoDecisionForIntentionalIntroduction = true
                        }
                        if(_.includes(decisionTypesIdentifiers, decisionSubjects.DEC_7_2)){
                            $scope.decisions.commonDecisions.push({identifier:decisionSubjects.DEC_7_2});
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
                    
                    if($routeParams.identifier){
                        editFormUtility.documentExists(document.header.identifier)
                            .then(function(exists){
                                $scope.documentExists = exists;
                            }).catch(function(e){});
                    }
                });    
			}
		}

   }]);

});
