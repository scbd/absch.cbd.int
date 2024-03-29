import app from '~/app';
import _ from 'lodash';
import template from 'text!./edit-biosafety-decision.directive.html';
import '~/views/forms/edit/edit';
import '~/services/main';
import '~/views/forms/edit/document-selector';
import "~/views/forms/view/bch/view-biosafety-decision.directive";
import editBiosafetyDecisionT from '~/app-text/views/forms/edit/bch/directives/edit-biosafety-decision.json';

app.directive("editBiosafetyDecision", ["$controller", "thesaurusService", "$routeParams", "solr", 'editFormUtility', 'realm', '$timeout', 'translationService',
    function ($controller, thesaurusService, $routeParams, solr, editFormUtility, realm, $timeout, translationService) {
		return {
			restrict   : "EA",
			template: template,
			replace    : true,
			require    : '?ngModel',
			scope:{
				onPostSubmitFn   : "&onPostSubmit"
			},
			link: function($scope, $element, $attr){
                translationService.set('editBiosafetyDecisionT', editBiosafetyDecisionT);  
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
                const transboundaryMovementType = {
                    'unintentional' : '22B915C4-193E-4087-89ED-D104EEEC4330', 
                    'illegal'       : 'A9A800DC-F313-4F79-B3E4-768E41088D11'
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
                            //special case to replace other text
                            $timeout(function() {
                                $element.find(".communication-decisions").find(".other-term label")
                                .contents().eq(3).replaceWith($element.find('#otherSubject').text());
                            },500);				
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
                    $scope.isEu = false;
                    $scope.isEuMember = false;
                    $scope.waiting = true;
                    thesaurusService.getTerms(solr.escape('eu'),{relations:true})
                    .then(function(o) {
                        $scope.isEuMember = (o.narrowerTerms.indexOf(code) !== -1) ? true : false;
                        if(code == 'eu'){
                            $scope.isEuMember = true;
                            $scope.isEu = true;
                            $scope.EuQuery = " AND government_s:("+ solr.escape(o.narrowerTerms.join(' ')) + ')';
                        }
                        else{
                          $scope.isEu = false;
                          $scope.EuQuery = ' AND government_s:'+ solr.escape(code);
                        }

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
                    
                    var decision = terms.otherDecisions?.identifier ? terms.otherDecisions : terms.communicationDecision;

                    $scope.isSimplifiedProcedure                = false;
                    $scope.isDecisionOnTransitOfLMOs            = false;
                    $scope.isDecisionOnContainedUseOfLMOs       = false;
                    $scope.isShowDecisionDocument               = false;
                    $scope.isUnintentionalTransboundaryMovement = false;
                    $scope.isImportDomesticRegulationOfLMOs     = false;
                    $scope.isUnintentionalMovementOfLMOs        = false;
                    $scope.isIllegalMovementOfLMOs              = false;
                    $scope.domesticRegulationsNotification      = false;
                    var identifiersForSectionI = [decisionSubjects.DEC_8_6, decisionSubjects.DEC_8_8, decisionSubjects.DEC_8_10, 
                        decisionSubjects.DEC_8_12 , decisionSubjects.DEC_8_11, "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED"];
                
                    if(decision){
                        if(decision.identifier == decisionSubjects.DEC_8_3){ $scope.isSimplifiedProcedure	= true; }
                        if(decision.identifier == decisionSubjects.DEC_8_4){ $scope.isDecisionOnTransitOfLMOs	= true;}
                        if(decision.identifier == decisionSubjects.DEC_8_5){ $scope.isDecisionOnContainedUseOfLMOs = true;}                        
                        if(decision.identifier == decisionSubjects.DEC_8_9) $scope.domesticRegulationsNotification = true;

                        if(decision.identifier == decisionSubjects.DEC_8_6){ 
                            $scope.isUnintentionalTransboundaryMovement = true;
                            $scope.document.transboundaryMovementType = {identifier : transboundaryMovementType.unintentional}
                            $scope.onTransboundaryMovementTypeChange($scope.document.transboundaryMovementType) 
                        }
                        if(decision.identifier == decisionSubjects.DEC_8_7){ 
                            $scope.isUnintentionalTransboundaryMovement = true;
                            $scope.document.transboundaryMovementType = {identifier : transboundaryMovementType.illegal}
                            $scope.onTransboundaryMovementTypeChange($scope.document.transboundaryMovementType) 
                        }
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
				
                      if(!$scope.decisions.isDecisionOnLmoImport 
                        && !$scope.decisions.isDecisionOnLmoDomesticUse
                        && !$scope.isLmoDecisionForIntentionalIntroduction)
                            $scope.document.importers = undefined;
                        // TODO need to verify
                       if(!$scope.decisions.isDecisionOnLmoImport 
                        && !$scope.isLmoDecisionForIntentionalIntroduction)
                            $scope.document.exporters = undefined;
                    }

                }

                $scope.onTransboundaryMovementTypeChange = function(type){

                    var document = $scope.document;
                       
                    if((type||{}).identifier != transboundaryMovementType.unintentional){ // Unintentional transboundary movement (Article 17.1)                           
                        document.releaseInformation                 = undefined;
                        document.estimatedQuantities                = undefined;
                        document.releaseCircumstance                = undefined;
                        document.releaseDate                        = undefined;
                        document.lmoUseInformation                  = undefined;
                        document.adverseEffectInformation           = undefined;

                        if((document.transboundaryMovementType||{}).identifier!=transboundaryMovementType.unintentional)
                            document.pointOfContact                     = undefined;
                    }

                    if((type||{}).identifier != transboundaryMovementType.illegal && $scope.isUnintentionalTransboundaryMovement){ // Illegal transboundary movement (Article 25.3)
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
                    return $scope.isLmoDecisionForIntentionalIntroduction	||  ($scope.isLmoDecisionForDirectUse && $scope.decisions.isDecisionOnLmoDomesticUse) || $scope.isSimplifiedProcedure
                }
                //==================================
                //
                //==================================

                $scope.onContactQuery = function(searchText){
                  var queryOptions = {
                       realm     : realm.value,
                       fieldQueries: ['schema_s:contact'],
                       searchText: searchText
                  }

                  return $scope.onBuildDocumentSelectorQuery(queryOptions);

                }

                $scope.onBuildQuery = function(searchText,schemasVal){
                    if (!$scope.document || !$scope.document.government)
                         return;
					
                    var queryOptions = {
                        realm     : realm.value,
				        schemas	  : [schemasVal],
                        searchText: searchText
                    }
                    if(schemasVal=="biosafetyDecision" && $scope.document?.header?.identifier){
                        queryOptions.fieldQueries = [`NOT identifier_s:${solr.escape($scope.document.header.identifier)}`];
                    }
				    queryOptions.government = $scope.document.government.identifier;
                   
				      	return $scope.onBuildDocumentSelectorQuery(queryOptions);
                }


            $scope.onAuthorityBuildQuery = function(searchText){

              if (!$scope.document || !$scope.document.government)
                return;

              var queryOptions = {
                realm     : realm.value,
                schemas	  : ['authority'],
                searchText: searchText
              }
              queryOptions.fieldQueries = ['schema_s:authority '+$scope.EuQuery];
              queryOptions.government = $scope.document.government.identifier;

              return $scope.onBuildDocumentSelectorQuery(queryOptions);
            }
            // for RiskAssesment
            $scope.onRiskAssesmentBuildQuery = function(searchText){

                if (!$scope.document || !$scope.document.government)
                return;

                var queryOptions = {
                realm     : realm.value,
                schemas	  : ['nationalRiskAssessment'],
                searchText: searchText
                }
                if($scope.isEu){
                queryOptions.fieldQueries = ['schema_s:nationalRiskAssessment '+$scope.EuQuery];
                } else {
                queryOptions.government = $scope.document.government.identifier;
                }
                return $scope.onBuildDocumentSelectorQuery(queryOptions);
            }

                $scope.onBuildSkipGovernmentQuery = function(searchText,schemasVal){

                    var queryOptions = {
                        realm     : realm.value,
                        schemas	  : [schemasVal],
                        searchText: searchText
                    }
                      return $scope.onBuildDocumentSelectorQuery(queryOptions);
                }


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
                        document.codexConducted = undefined;
                        document.forwardToFAO = undefined;
                    }

                   if(!document.isForFoodSafety){
                    document.codexConducted = undefined;
                    document.forwardToFAO = undefined;
                   }
                   
                    if(!document.movementAllowedUnderA131A){
                        //document.exemptedFromAIA = undefined;
                        document.appliesToSubsequentImports = undefined;
                    }
                    if(!$scope.isUnintentionalTransboundaryMovement){
                        document.estimatedQuantities = undefined;
                        document.releaseCircumstance = undefined;
                        document.releaseDate = undefined;
                        document.lmoUseInformation = undefined;
                        document.adverseEffectInformation = undefined;
                        document.pointOfContact = undefined;
                    }
                    if(document.isUnintentionalTransboundaryMovement && !_.includes([transboundaryMovementType.unintentional, transboundaryMovementType.illegal],  (document.transboundaryMovementType||{}).identifier)){
                        document.otherTransboundryInformation = undefined;
                    }

                    if(!(document.decisionTypes||[]).length){
                        document.importers = undefined;
                        document.exporters = undefined;
                        document.forwardToOECD = undefined;
                        document.isForCommercialUse = undefined;
                    }

                    if (/^\s*$/g.test(document.notes))
                        document.notes = undefined;

                    return $scope.sanitizeDocument(document);
                };
				$scope.changeTransboundaryMovement = function ( isTransboundaryMovement ) {
                    if (isTransboundaryMovement)
                    {
                        $scope.document.appliesToTransboundaryMovement = undefined;
                        $scope.document.importers  = undefined;
					} else {
                        $scope.decisions.intentionDecisions = undefined;
                        $scope.document.receiptDate = undefined;
                        $scope.document.receiptAcknowledgementDate = undefined;
                        $scope.document.communicationDate = undefined;
                        $scope.document.exporters = undefined;
                        $scope.document.importers  = undefined;
					}
				
                }
                function cleanLMOSection(){
                    if(!$scope.isLmoDecisionForIntentionalIntroduction	&& !$scope.isLmoDecisionForDirectUse){
                        $scope.document.addressesTransboundaryMovement = undefined;
                    }
                    if(!$scope.isLmoDecisionForIntentionalIntroduction	&&  !$scope.isLmoDecisionForDirectUse &&			
                        !$scope.isSimplifiedProcedure &&  !$scope.isDecisionOnTransitOfLMOs && !$scope.isDecisionOnContainedUseOfLMOs &&
                        $scope.document.transboundaryMovementType?.identifier!=transboundaryMovementType.illegal && 
                        !$scope.domesticRegulationsNotification){
                        
                        $scope.document.modifiedOrganisms = undefined;
                    }
                    
                    if(!$scope.isLmoDecisionForIntentionalIntroduction	&& !$scope.isLmoDecisionForDirectUse && !$scope.isSimplifiedProcedure
                        && !$scope.isDecisionOnContainedUseOfLMOs && !$scope.isDecisionOnTransitOfLMOs && !$scope.domesticRegulationsNotification)
                        $scope.document.riskAssessments = undefined;

                    if($scope.isLmoDecisionForIntentionalIntroduction){
                        $scope.decisions.directUseDecisions = undefined;
                        if(!$scope.document.addressesTransboundaryMovement)
                            $scope.document.exporters           = undefined;
                        // $scope.document.importers           = undefined;
                    }
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
                            var selectedOptions =  _.filter(options, function(o){
                                return _.includes(decisionTypesIdentifiers, o.identifier);
                            })
                            if(selectedOptions)
                                $scope.decisions.directUseDecisions =  selectedOptions
                        })
                    }                    
                });    
			}
		}

   }]);


