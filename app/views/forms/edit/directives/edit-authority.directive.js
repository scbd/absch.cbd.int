import app from 'app';
import _ from 'lodash';
import template from 'text!./edit-authority.directive.html';
import 'services/main';
import 'views/forms/edit/edit';
import 'views/forms/edit/document-selector';
import 'views/forms/edit/warning-message-cna';
import 'views/forms/view/view-authority.directive';

	app.directive("editAuthority", ["$http", "Thesaurus", "$q", "$controller", "$location", "realm", "solr",'thesaurusService',
    function($http, Thesaurus, $q, $controller, $location, realm, solr,thesaurusService) {
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
				$controller('editController', { $scope: $scope });

                $scope.getMeasures=[];
                $scope.path = $location.path();
                $scope.isBch = realm.is('BCH');
                $scope.isAbs = realm.is('ABS');
                

                _.extend($scope.options, {
                    organizationTypes: function() { return thesaurusService.getDomainTerms('organizationTypes')
                        .then(function(types){ return _.filter(types, function(type){return type.identifier!='B3699A74-EF2E-467A-A82F-EF2149A2EFC5'}); }) },
                    cbdSubjects: function() {return thesaurusService.getDomainTerms('cbdSubjects')},
                    jurisdictions: function() {return thesaurusService.getDomainTerms('cnaJurisdictions', {other:true})},
                    absGeneticResourceTypes: function() {return thesaurusService.getDomainTerms('absGeneticResourceTypes')},
                    absGeneticResourceAreas: function() {return thesaurusService.getDomainTerms('absGeneticResourceAreas')},
                    functions: function() {
                        var functionDomain = 'subjectAreas';
                        if($scope.type=='SPCA')//supplementaryAuthority
                            functionDomain = 'supplementaryProtocolFunctions';

                        return thesaurusService.getDomainTerms(functionDomain, {other:true, otherType:'lstring'});
                    },
                    bchOrganismTypes: function() { return thesaurusService.getDomainTerms('typeOfOrganisms', {other:true, otherType:'lstring'})},
                    absFunctions: function() {return thesaurusService.getDomainTerms('absFunctions');},
                    keywords: function() { return thesaurusService.getDomainTerms('keywords');},

                });

                //==================================
                $scope.showResponsibleforAllMsg = function() {

                    //TODO: you need to gain access to the promise in order to do this correctly.a Otherwise the document won't be loaded when angular evaluated the ng-show.
                    if (!$scope.document || (!$scope.document.responsibleForAll || !$scope.validationReport))
                        return false;

                    return _.some($scope.validationReport.errors, function(error) {
                        return error.property == 'responsibleForAllNot';
                    });
                };


                //==================================
                //
                //==================================
                $scope.getCleanDocument = function(document) {

                    document = document || $scope.document;
                    ///////for legacy records////////////////
                    document.bchFunctions = undefined;
                    document.bchOrganismTypes = undefined;
                    ////////////////////////
                    if (!document)
                        return undefined;
                    
                    ///////for legacy records////////////////            
                    resolveLegacyFields(document)

                    if(!document.hasOwnProperty('responsibleForAll'))
                        document.responsibleForAll       = document.absResponsibleForAll;
                    
                    if($scope.isBCH){//no longer required for BCH
                        document.policyBasisForCompetencyRef = undefined;
                    }
                    //delete obsolete fields
                    document.absPolicyBasisForCompetencyRef = undefined;
                    document.absPolicyBasisForCompetency = undefined;

                    if ($scope.type == 'SPCA' || document.responsibleForAll) {
                        document.absJurisdiction = undefined;
                        document.absJurisdictionName = undefined;
                        document.absGeneticResourceTypes = undefined;
                    }
                    else{
                        if(!$scope.showJurisdictionName())
                            document.absJurisdictionName = undefined;
                    }


                    if($scope.isBch){

                        if($scope.type != 'SPCA'){ //Not Suuplementary protocol
                            document.responsibleForAll = undefined;
                        }
                            
                        document.absJurisdiction = undefined;
                        document.absJurisdictionName = undefined;
                        document.absGeneticResourceTypes = undefined;
                        if($scope.type == 'SPCA'){ //Suuplementary protocol
                            document.cpbOrganismTypes = undefined;
                            document.functions = undefined;
                        }
                    }
                    else{
                        document.functions = undefined;
                        document.cpbOrganismTypes = undefined;
                    }

                    if (/^\s*$/g.test(document.notes))
                        document.notes = undefined;

                    return $scope.sanitizeDocument(document);
                };
                //==================================
                $scope.setDocument({}).then(function(document){
                    resolveLegacyFields(document)
                });

                //==================================
                $scope.showJurisdictionName = function() {

                    if (!$scope.document || !$scope.document.absJurisdiction)
                        return false;

                    //var jurisdictions = $scope.document.absJurisdiction
                    return _.intersection(_.map($scope.document.absJurisdiction, 'identifier'),
                                        ['DEBB019D-8647-40EC-8AE5-10CA88572F6E', 'DEEEDB35-A34B-4755-BF77-D713017195E3', '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED']).length > 0;
                }

                $scope.onContactQuery = function(searchText, tab){
                    var queryOptions = {
                        realm     : realm.value,
                        identifier: $scope.document.header.identifier,
                        government: $scope.document.government.identifier,
                        searchText: searchText
                    }

                    if($scope.isAbs)
                        queryOptions.schemas = ['contact', 'authority']
                    else
                        queryOptions.schemas = ['contact']

                    return $scope.onBuildDocumentSelectorQuery(queryOptions);

                }

                function resolveLegacyFields(document){

                    document.policyBasisForCompetencyRef    = document.policyBasisForCompetencyRef || document.absPolicyBasisForCompetencyRef;
                    document.policyBasisForCompetency       = document.policyBasisForCompetency || document.absPolicyBasisForCompetency;
                    document.functions                      = document.functions || document.cpbFunctions || document.bchFunctions;
                    document.bchFunctions                   = document.cpbFunctions = undefined;
                    document.absPolicyBasisForCompetencyRef = undefined;
                    document.absPolicyBasisForCompetency    = undefined;        
                    document.bchOrganismTypes               = undefined;
                }

			}
		}

   }]);


