define(['app', 'lodash', 'services/search-service', 'views/forms/edit/edit', 'js/common',
'views/forms/edit/document-selector', 'views/forms/edit/warning-message-cna', '../view/view-authority.directive',
'services/thesaurus-service' ], function(app, _) {

    app.controller("editAuthority", ["$scope", "$http", "$element", "Thesaurus", "$q", "$controller", "$location", "IStorage", "commonjs",'thesaurusService',
     function($scope, $http, $element, Thesaurus, $q, $controller, $location, storage, commonjs,thesaurusService) {
        $controller('editController', {
            $scope: $scope
        });

        $scope.getMeasures=[];
        $scope.path = $location.path();
        //$scope.documentUID = "NEW";

        _.extend($scope.options, {
            organizationTypes: function() {
                return $http.get("/api/v2013/thesaurus/domains/Organization%20Types/terms", {
                    cache: true
                }).then(function(o) {
                    return o.data;
                });
            },
            cbdSubjects: function() {
                return $http.get("/api/v2013/thesaurus/domains/CBD-SUBJECTS/terms", {
                    cache: true
                }).then(function(o) {
                    return o.data;
                });
            },
            jurisdictions: function() {
                return $q.all([
                    $http.get("/api/v2013/thesaurus/domains/D7BD5BDE-A6B9-4261-B788-16839CCC4F7E/terms", {
                        cache: true
                    }),
                    $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED", {
                        cache: true
                    })
                ]).then(function(o) {
                    var jurisdictions = o[0].data;
                    jurisdictions.push(o[1].data);
                    return jurisdictions;
                });
            },
            absGeneticResourceTypes: function() {
                return $http.get("/api/v2013/thesaurus/domains/20945FA8-C24C-4AF6-B3D9-367592AFDF48/terms", {
                    cache: true
                }).then(function(o) {
                    return o.data;
                });
            },
            absGeneticResourceAreas: function() {
                return $http.get("/api/v2013/thesaurus/domains/545CD54C-CFF3-41E8-A003-FDD278426A3A/terms", {
                    cache: true
                }).then(function(o) {
                    return o.data;
                });
            },
            functions: function() {
                var functionDomain = 'subjectAreas';
                if($scope.type=='SPCA')//supplementaryAuthority
                    functionDomain = 'supplementaryProtocolFunctions';

                return thesaurusService.getDomainTerms(functionDomain, {other:true, otherType:'lstring'});
            },
            bchOrganismTypes: function() {
                return thesaurusService.getDomainTerms('typeOfOrganisms', {other:true, otherType:'lstring'});
            },           
            absFunctions: function() {
                return $http.get("/api/v2013/thesaurus/domains/8102E184-E282-47F7-A49F-4C219B0EE235/terms", {
                    cache: true
                }).then(function(o) {
                    return o.data;
                });
            },
            keywords: function() {
                return $http.get("/api/v2013/thesaurus/domains/1A22EAAB-9BBC-4543-890E-DEF913F59E98/terms", {
                    cache: true
                }).then(function(o) {
                    return Thesaurus.buildTree(o.data);
                });
            },

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


            if($scope.realm.is('BCH')){

                if($scope.type != 'SPCA'){ //Not Suuplementary protocol
                    document.responsibleForAll = undefined;
                    document.responsibilities = undefined;
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

            return document;
        };
        //==================================
        $scope.setDocument({}).then(function(document){
            resolveLegacyFields(document)
            if($scope.type != 'SPCA')
                $scope.cnaNameTitle = $element.find('#titleCNA').text()
            else if($scope.type == 'SPCA')
                $scope.cnaNameTitle = $element.find('#titleSPCA').text()
        });

        //==================================
        $scope.showJurisdictionName = function() {

            if (!$scope.document || !$scope.document.absJurisdiction)
                return false;

            //var jurisdictions = $scope.document.absJurisdiction
            return _.intersection(_.map($scope.document.absJurisdiction, 'identifier'),
                                ['DEBB019D-8647-40EC-8AE5-10CA88572F6E', 'DEEEDB35-A34B-4755-BF77-D713017195E3', '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED']).length > 0;
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

    }]);
});
