import app from '~/app';
import template from "text!./view-laboratory-detection.directive.html";
import '~/views/directives/record-options';
import '~/views/forms/view/directives/view-record-reference.directive';
import '~/views/forms/view/bch/view-lmo.directive';
import _ from "lodash";
import viewLabDetectionT from '~/app-text/views/forms/view/bch/view-laboratory-detection.json';
    app.directive("viewLaboratoryDetection", ['translationService', function (translationService) {
        return {
            restrict   : "EAC",
            template: template ,
            replace    : true,
            transclude : false,
            scope: {
                document: "=ngModel",
                locale  : "=",
                target  : "@linkTarget",
                hide	: "@"
            },
            controller : ["$scope", function ($scope)
            {
			translationService.set('viewLabDetectionT', viewLabDetectionT);
                //====================
                //
                //====================

                $scope.onDetectionTerms = function(terms){
                 if(($scope.document||{}).detectionMethods){
                        _.forEach(terms, function(item){
                            if(item.broaderTerms.length == 0 || item.broaderTerms == []){
                                var parent =_.find($scope.document.detectionMethods, {identifier: item.identifier});
                                if(parent){
                                    terms = _.filter(terms, function(t){
                                        return !_.includes(item.narrowerTerms, t.identifier)
                                    })
                                }
                            }
                        });
                        return terms;
                    }
                }

                $scope.display = function(field) {
                    
                    if(!$scope.hide) return true; //show all fields
    
                    return( $scope.hide.indexOf(field) >= 0 ? false : true);
                }
            }]
        };
    }]);
    
    
