import app from '~/app';
import template from 'text!./result-default.html';
import _ from 'lodash';
import '~/services/main';
import '~/views/forms/view/record-loader.directive';
import '~/views/forms/view/bch/icons';
import resultDefaultT from '~/app-text/views/search/search-results/result-default.json';

app.directive('resultDefault', ["$timeout", "translationService", 'realm', "$filter",
     function ($timeout, translationService, realm, $filter) {
        return {
            restrict: 'EAC',
            replace: true,
            template: template, 
            scope: {
                doc:'=',
                type:'@'
            },
            link: function($scope, $element, $attr) {
                translationService.set('resultDefaultT', resultDefaultT);
                $scope.showExternalLink = $attr.externalLink=='true'
                $scope.api = {};
                $scope.$watch('showDoc', function(newVal){
                    if(newVal && $scope.doc){
                        $timeout(function(){
                            $scope.api.recordLoaderApi.loadDocument($scope.doc.schema_s, $scope.doc.identifier_s);
                        }, 10);
                    } 
                });

                $scope.canShowIcons = function(schema){
                    return _.includes(['modifiedOrganism', 'nationalRiskAssessment', 'independentRiskAssessment', 'biosafetyDecision', 'biosafetyLaw', 'authority'], schema);
                }

                $scope.isRevoked = function(values){
                    return values.includes('Revoked')
                }
                $scope.$on('evt:closeRecord', function(evt, closeDoc) {
                    $scope.showDoc = closeDoc;
                });

                $scope.showRecord = function(){
                    if(!canShowInline($scope.doc)){
                        return window.open($scope.doc.url_ss[0], '_blank');
                    }
                    $scope.showDoc=!$scope.showDoc
                }

                $scope.recordUrl = function(doc){

                    if(!canShowInline(doc) && doc.url_ss?.length){
                        return doc?.url_ss?.[0];
                    }

                    const shortCode = $filter("schemaShortName")(doc.schema_s);
                    return `/database/${encodeURIComponent(shortCode)}}/${encodeURIComponent(doc.uniqueIdentifier_s?.toUpperCase())}`
                }

                function canShowInline(doc){

                    if(!doc?.url_ss?.length)
                        return true;
                    //TODO need logic when there will be multiple urls
                    const url = doc.url_ss[0];

                    if(url.startsWith('http')){
                        if(doc.schema_s == 'decision')
                            return false;

                        // ALL SCBD records should open inline
                        const realmSchema = realm.schemas[doc.schema_s];
                        if(realmSchema?.type == 'scbd')
                            return true;

                        //this logic currently only applies to reference records. BCH/ABS records are displayed in CHM search.
                        if(realmSchema?.type == 'reference')
                            return doc.realm_ss && doc.uniqueIdentifier_s?.toUpperCase()?.startsWith(realm.uIdPrefix);
                    }
                    
                    return true;

                }   
                
            },
        };
    }]);

