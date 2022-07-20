import app from '~/app';
import template from 'text!./result-default.html';
import _ from 'lodash';
import '~/services/main';
import '~/views/forms/view/record-loader.directive';
import '~/views/forms/view/bch/icons';
import resultDefaultT from '~/app-text/views/search/search-results/result-default.json';

app.directive('resultDefault', ["$timeout", "translationService", function ($timeout, translationService) {
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
                
            },
        };
    }]);

