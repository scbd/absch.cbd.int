import app from '~/app';
import _ from 'lodash';
import '~/views/forms/edit/edit';
import '~/views/forms/view/abs/view-abs-procedure.directive';
import editAbsProcedureT from '~/app-text/views/forms/edit/abs/edit-absProcedure.json';

    export { default as template } from './edit-absProcedure.html';

  export default ["$scope", "realm", "$http", "$filter", "$q", "$routeParams", "$controller", "$location", "translationService", 
    function ($scope, realm, $http, $filter, $q, $routeParams, $controller, $location, translationService) {
        $controller('editController', {
            $scope: $scope
        });

        translationService.set('editAbsProcedureT', editAbsProcedureT);
        $scope.path = $location.path();

        _.extend($scope.options, {
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

                    _.forEach(jurisdictions, function(element) {
                        element.__value = element.name;
                    });

                    return jurisdictions;
                });
            },
            keywords   : function() {
                return $http.get("/api/v2013/thesaurus/domains/CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924/terms", { cache: true }).then(function(o){return o.data;});
            }
        });

        $scope.ac_jurisdictions = function() {
            return $scope.options.jurisdictions().then(function(jurisdictions) {
                _.forEach(jurisdictions, function(element) {
                    element.__value = element.name;
                });
                return jurisdictions;
            });
        };

         $scope.onContactQuery = function(searchText){
 
                var queryOptions = {
                schemas : ['contact', 'authority'],
                realm : realm.value,
                searchText: searchText,
                query : `((schema_s:authority AND government_s:${$scope.document.government.identifier}) OR schema_s:contact)`
                }
                return $scope.onBuildDocumentSelectorQuery(queryOptions);
            }

        $scope.onMeaureQuery = function(searchText){
            
            var queryOptions = {
                schemas	  : ['measure'],
                realm     : realm.value,
                searchText: searchText
            }
            if ($scope.document && $scope.document.government)
                queryOptions.government = $scope.document.government.identifier;

            return $scope.onBuildDocumentSelectorQuery(queryOptions);
        }
        //==================================
        //
        //==================================
        $scope.isSubNational = function(document) {

            document = document || $scope.document;

            return document &&
                document.jurisdiction &&
                document.jurisdiction.identifier == "DEBB019D-8647-40EC-8AE5-10CA88572F6E";
        };

        //==================================
        //
        //==================================
        $scope.isCommunity = function(document) {

            document = document || $scope.document;

            return document &&
                document.jurisdiction &&
                document.jurisdiction.identifier == "9627DF2B-FFAC-4F85-B075-AF783FF2A0B5";
        };
        //==================================
        //
        //==================================
        $scope.isOthers = function(document) {

            document = document || $scope.document;

            return document &&
                document.jurisdiction &&
                document.jurisdiction.identifier == "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED";
        };
        //==================================
        //
        //==================================
        $scope.getCleanDocument = function(document) {

            document = document || $scope.document;

            if (!document)
                return undefined;

            //document = angular.fromJson(angular.toJson(document));

            if (document.jurisdiction && !$scope.isSubNational(document) && !$scope.isCommunity(document) && !$scope.isOthers(document)) {
                document.jurisdiction.customValue = undefined;
            }
        

            if (/^\s*$/g.test(document.notes))
                document.notes = undefined;

            return $scope.sanitizeDocument(document);
        };

        $scope.setDocument();
    }];

