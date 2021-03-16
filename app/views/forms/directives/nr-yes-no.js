import app from 'app';
import nrYesNoTemplate from 'text!./nr-yes-no.html';
import _ from 'lodash';

    app.directive('nrYesNo', ['$timeout', function ($timeout) {
        return {
            restrict: 'EA',
            template: nrYesNoTemplate,
            replace: true,
            require: "?ngModel",
            scope:{
                binding: '=ngModel',
                question:'=',
                ngDisabledFn: '&ngDisabled',
                required: "@",
                locales: "="
            },
            link: function($scope, $element, $attr, ngModelController) {
                $scope.answer = {}
                
                $scope.updateAnswer = function(){
                    
                    var additionalInformation = $scope.answer.additionalInformation;
                    var value = $scope.question.options[$scope.answer.value].value;

                    if(($scope.hasAdditionalInformation||{}).value != value){
                        additionalInformation = $scope.answer.additionalInformation = undefined;
                    }

                    $scope.binding = {  value : value, additionalInformation : additionalInformation };

                    $scope.hasAdditionalInformation = _.find(($scope.question.options||[]), {type:'lstring', value:value})
                    
                    ngModelController.$setViewValue($scope.binding);                      

                }

                $scope.$watch('binding', function(newVal, oldVal){
                    if($scope.binding!== undefined){
                        $scope.answer.value          = _.indexOf($scope.question.options, _.find($scope.question.options, { value: $scope.binding.value}));
                        $scope.answer.additionalInformation = $scope.binding.additionalInformation;

                        $scope.hasAdditionalInformation = _.find(($scope.question.options||[]), {type:'lstring', value:$scope.binding.value})
                    }
                    else{
                        $scope.answer = {}
                    }
                })
                    
            }
        }
    }])


