define(['app', 'lodash', 'text!./edit-biosafety-decision.directive.html', 'views/forms/edit/edit', 'services/main',
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
                
				$scope.container        = $attr.container;
    			$scope.isDialog         = $attr.isDialog;  
				$scope.type 			= $attr.documentType; 
                $scope.decisions        = {};
                $controller('editController', {
                    $scope: $scope
                });

                var decisionSubjects = {
                    DEC_8_1    : "E8C5A15C-A736-4fb7-A1B6-192412BE7E45",
                    DEC_8_2    : "BE64016A-C3BD-4C61-9620-C3FEF96B2A24",
                    DEC_8_3    : "8979219B-330B-424F-A52C-209D4B4B65C0",
                    DEC_8_4    : "1B6F702C-0C68-4B53-BCA4-1DA4A25E23A8",
                    DEC_8_5    : "D698B5F7-A434-49E2-A7FF-FE869AFBEE8D",
                    DEC_8_6    : "83C0DBFB-AD5C-4B88-8ECE-5365991F2956",
                    DEC_8_7    : "3FF9FEB3-20FA-4287-B562-46635A1154A3",
                    DEC_8_8    : "3293477D-466D-40CB-A890-4B139BCE93AC",
                    DEC_8_9    : "0C9BBC54-34F1-431A-A579-F018D8E5CEAD",
                    DEC_8_10   : "8E26ACCB-3358-4BC3-8389-56AA508991E6",
                    DEC_8_11   : "A8C8A4D9-8084-4F6E-88B7-47BA04075E40",
                    DEC_8_12   : "2C74A444-32C1-45B0-B1AC-F419773A4A7E",
                }
                _.extend($scope.options, {

                    commonDecisions: function() {
                        return thesaurusService.getDomainTerms('decisionTypes').then(function(o) {					
                            return _.filter(o, function(item){
                                return _.includes([decisionSubjects.DEC_8_1, decisionSubjects.DEC_8_2], item.identifier)
                            });
                        });
                    },
                    otherDecisions: function() {
                        return thesaurusService.getDomainTerms('decisionTypes').then(function(o) {					
                            return _.filter(o, function(item){
                                return _.includes([decisionSubjects.DEC_8_3, decisionSubjects.DEC_8_4, decisionSubjects.DEC_8_5], item.identifier)
                            });
                        });
                    },
                    communicationDecisions: function() {
                        return thesaurusService.getDomainTerms('decisionTypes').then(function(o) {					
                            return _.filter(o, function(item){
                                return _.includes([ decisionSubjects.DEC_8_6,  decisionSubjects.DEC_8_7,
                                                    decisionSubjects.DEC_8_8,  decisionSubjects.DEC_8_9,
                                                    decisionSubjects.DEC_8_10, decisionSubjects.DEC_8_11,
                                                    decisionSubjects.DEC_8_12
                                                ], item.identifier)
                            });
                        });
                    },
                    intentionDecisions: function() {
                        return thesaurusService.getDomainTerms('decisionTypes').then(function(o) {					
                            return _.filter(o, function(item){
                                return _.includes(item.broaderTerms, decisionSubjects.DEC_8_1)
                            });
                        });
                    },
                    directUseDecisions: function() {
                        return thesaurusService.getDomainTerms('decisionTypes').then(function(o) {					
                            return _.filter(o, function(item){
                                return _.includes(item.broaderTerms, decisionSubjects.DEC_8_2)
                            });
                        });
                    },
                    decisionLMOFFPSubject: function() {
                        return thesaurusService.getDomainTerms('decisionLMOFFPSubject');
                    },
                    decisionResult: function() {
                        return thesaurusService.getDomainTerms('decisionResults');
                    },
                    transboundaryMovementType: function(){
                        return thesaurusService.getDomainTerms('transboundaryMovementTypes')
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
                      $scope.document.reasons = undefined;
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
                    $scope.isLmoDecisionForIntentionalIntroduction	= _($scope.decisions.commonDecisions||[]).map('identifier').includes(decisionSubjects.DEC_8_1);
                    $scope.isLmoDecisionForDirectUse				= _($scope.decisions.commonDecisions||[]).map('identifier').includes(decisionSubjects.DEC_8_2);

                    if(!$scope.isLmoDecisionForIntentionalIntroduction	&& !$scope.isLmoDecisionForDirectUse)
                        $scope.document.decisionResult = undefined;

                    cleanLMOSection();
                }
                
                $scope.onOtherDecisionChanged = function(terms){
                    
                    var decision = terms.otherDecisions || terms.communicationDecision;

                    $scope.isSimplifiedProcedure            = false;
                    $scope.isDecisionOnTransitOfLMOs        = false;
                    $scope.isDecisionOnContainedUseOfLMOs   = false;
                    $scope.isShowDecisionDocument           = false;
                    $scope.isUnintentionalTransboundaryMovement          = false;
                    $scope.isImportDomesticRegulationOfLMOs = false;
                    $scope.isUnintentionalMovementOfLMOs    = false;
                    $scope.isIllegalMovementOfLMOs          = false;
                    var identifiersForSectionI = [decisionSubjects.DEC_8_6, decisionSubjects.DEC_8_8, decisionSubjects.DEC_8_10, 
                        decisionSubjects.DEC_8_12 , decisionSubjects.DEC_8_11, "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED"];
                
                    if(decision){
                        if(decision.identifier == decisionSubjects.DEC_8_3){ $scope.isSimplifiedProcedure	= true; }
                        if(decision.identifier == decisionSubjects.DEC_8_4){ $scope.isDecisionOnTransitOfLMOs	= true;}
                        if(decision.identifier == decisionSubjects.DEC_8_5){ $scope.isDecisionOnContainedUseOfLMOs = true;}
                        if(decision.identifier == decisionSubjects.DEC_8_6){ $scope.isUnintentionalTransboundaryMovement = true;}
                        if(decision.identifier == decisionSubjects.DEC_8_7){ $scope.isUnintentionalTransboundaryMovement = true;}
                        if(_.includes(identifiersForSectionI,decision.identifier)){ $scope.isShowDecisionDocument = true;}
                        
                    }


                    if(!$scope.isSimplifiedProcedure){
                        $scope.document.movementAllowedUnderA131A  = undefined;
                        $scope.document.exemptedFromAIA            = undefined;
                        $scope.document.appliesToSubsequentImports = undefined;
                    }

                    if(!$scope.isUnintentionalTransboundaryMovement)
                        $scope.document.transboundaryMovementType = undefined;
                                        
                    cleanLMOSection();
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

                $scope.onTransboundaryMovementTypeChange = function(type){

                    var document = $scope.document;
                       
                    if((type||{}).identifier != '22B915C4-193E-4087-89ED-D104EEEC4330'){ // Unintentional transboundary movement (Article 17.1)                           
                        document.releaseInformation                 = undefined;
                        document.estimatedQuantities                = undefined;
                        document.releaseCircumstance                = undefined;
                        document.releaseDate                        = undefined;
                        document.lmoUseInformation                  = undefined;
                        document.adverseEffectInformation           = undefined;

                        if((document.transboundaryMovementType||{}).identifier!='22B915C4-193E-4087-89ED-D104EEEC4330')
                            document.pointOfContact                     = undefined;
                    }

                    if((type||{}).identifier != 'A9A800DC-F313-4F79-B3E4-768E41088D11' && $scope.isUnintentionalTransboundaryMovement){ // Illegal transboundary movement (Article 25.3)
                        document.modifiedOrganisms                  = undefined;
                    }

                    if(!type)
                        document.otherTransboundryInformation       = undefined;
                }

                $scope.isLmoMandatory = function(){
                    return  $scope.isLmoDecisionForIntentionalIntroduction	||  
                            $scope.isLmoDecisionForDirectUse ||			
                            $scope.isSimplifiedProcedure || 
                            $scope.isDecisionOnTransitOfLMOs || 
                            $scope.isDecisionOnContainedUseOfLMOs;
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

                    if(!document.isAmendment){
                        document.amendedRecords     = undefined;
                        if(!$scope.documentExists && $scope.status == "ready")
                            document.amendmentsDetails  = undefined;
                    }

                    //////////////////////////////////
                    /////make decision Types field
                    //////////////////////////////////

                    var decisionTypes = [];
                    if($scope.decisions)
                        decisionTypes	=	_.compact($scope.decisions.commonDecisions||[$scope.decisions.otherDecisions||$scope.decisions.communicationDecision]||[]);

                    if($scope.isLmoDecisionForIntentionalIntroduction && document.addressesTransboundaryMovement)
                        decisionTypes = _.union(decisionTypes, [$scope.decisions.intentionDecisions]);

                    if(!$scope.isLmoDecisionForIntentionalIntroduction && $scope.isLmoDecisionForDirectUse)
                        decisionTypes = _.union(decisionTypes, $scope.decisions.directUseDecisions);

                    if(decisionTypes && decisionTypes.length > 0)
                        document.decisionTypes = _(decisionTypes).compact().flatten().value();
                    else
                        document.decisionTypes = undefined;

                    $scope.onCommonDecisionChanged();
                    $scope.onOtherDecisionChanged ($scope.decisions);

                    //section B if 9 is No
                    if (!document.addressesTransboundaryMovement)
                    {
                        document.intentionDecisions = undefined;
                    }
                    $scope.onResultDecisionSelected((document.decisionResult||{}).identifier);
                    $scope.onDirectUseDecisionChange()
                    $scope.onTransboundaryMovementTypeChange(document.transboundaryMovementType)                    

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
                    if(!$scope.isUnintentionalTransboundaryMovement){
                        document.estimatedQuantities = undefined;
                        document.releaseCurcumstance = undefined;
                        document.releaseDate = undefined;
                        document.lmoUseInformation = undefined;
                        document.adverseEffectInformation = undefined;
                        document.pointOfContact = undefined;
                    }
                    if(document.isUnintentionalTransboundaryMovement && !_.includes(['22B915C4-193E-4087-89ED-D104EEEC4330', 'A9A800DC-F313-4F79-B3E4-768E41088D11'],  (document.transboundaryMovementType||{}).identifier)){
                        document.otherTransboundryInformation = undefined;
                    }

                    if (/^\s*$/g.test(document.notes))
                        document.notes = undefined;

                    return $scope.sanitizeDocument(document);
                };
                
                function cleanLMOSection(){
                    if(!$scope.isLmoDecisionForIntentionalIntroduction	&&  !$scope.isLmoDecisionForDirectUse &&			
                        !$scope.isSimplifiedProcedure &&  !$scope.isDecisionOnTransitOfLMOs && !$scope.isDecisionOnContainedUseOfLMOs &&
                        !($scope.document.transboundaryMovementType||{}).identifier=='A9A800DC-F313-4F79-B3E4-768E41088D11'){
                        
                            $scope.document.modifiedOrganisms = undefined;
                    }

                    if(!$scope.isLmoDecisionForIntentionalIntroduction	&& !$scope.isLmoDecisionForDirectUse && !$scope.isSimplifiedProcedure)
                        $scope.document.riskAssessments = undefined;
                }

                $scope.setDocument({})
                .then(function(){
                    var document = $scope.document;
                     if(document.government != undefined){
                        $scope.onCountryChange(document.government.identifier);
                    }
                    if(document.decisionResult != undefined){
                        $scope.onResultDecisionSelected(document.decisionResult.identifier);
                    }
                    if(document.decisionTypes && document.decisionTypes.length > 0){
                        $scope.decisions.commonDecisions = [];
                        var decisionTypesIdentifiers = _.map(document.decisionTypes, 'identifier');
                        if(_.includes(decisionTypesIdentifiers, decisionSubjects.DEC_8_1)){
                            $scope.decisions.commonDecisions.push({identifier:decisionSubjects.DEC_8_1});
                            $scope.isLmoDecisionForIntentionalIntroduction = true
                        }
                        if(_.includes(decisionTypesIdentifiers, decisionSubjects.DEC_8_2)){
                            $scope.decisions.commonDecisions.push({identifier:decisionSubjects.DEC_8_2});
                            $scope.isLmoDecisionForDirectUse = true
                        }
                        $scope.decisions.otherDecisions = {};
                        $scope.decisions.communicationDecision = {};                        
                        if(!$scope.isLmoDecisionForIntentionalIntroduction && !$scope.isLmoDecisionForDirectUse){
                            if(_.intersection([decisionSubjects.DEC_8_3, decisionSubjects.DEC_8_4, decisionSubjects.DEC_8_5], decisionTypesIdentifiers).length){

                                $scope.decisions.otherDecisions = {identifier: decisionTypesIdentifiers.toString()}

                            }
                            else if(_.intersection([decisionSubjects.DEC_8_6, decisionSubjects.DEC_8_7, decisionSubjects.DEC_8_8, decisionSubjects.DEC_8_9,
                                decisionSubjects.DEC_8_10, decisionSubjects.DEC_8_11, decisionSubjects.DEC_8_12], decisionTypesIdentifiers).length){

                                $scope.decisions.communicationDecision = {identifier: decisionTypesIdentifiers.toString()}
                            }
                            else if(_.includes(decisionTypesIdentifiers, '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED')){ //Other
                                $scope.decisions.communicationDecision = document.decisionTypes[0];
                            }
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
                        $scope.status = "loading";
                        editFormUtility.documentExists(document.header.identifier)
                            .then(function(exists){
                                $scope.documentExists = exists;
                            }).catch(function(e){})
                            .finally(function(){
                                $scope.status = "ready";
                            });
                    }
                });    
			}
		}

   }]);

});
