import app from '~/app';
import nrYesNoTemplate from 'text!./nr-yes-no.html';
import _ from 'lodash';
import nrYesNoT from '~/app-text/views/forms/directives/nr-yes-no.json';

    app.directive('nrYesNo', ['$timeout', 'translationService', function ($timeout, translationService) {
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
                translationService.set('nrYesNoT', nrYesNoT);
                $scope.answer = {}
                
                $scope.updateAnswer = function(){

                    var additionalInformation = $scope.answer.additionalInformation;
                    var value = $scope.question.options[$scope.answer.value].value;

                    var nextHasAdditionalInformation = ($scope.question.options || []).filter(function(option) {
                        return (option.type === 'lstring' || option.type === 'lstringRte') && option.value === value;
                      })[0];

                    // Only clear when the explain box wasn't shown before or won't be shown now -
                    // switching between two options that both show it keeps the typed text.
                    if(!$scope.hasAdditionalInformation || !nextHasAdditionalInformation){
                        additionalInformation = $scope.answer.additionalInformation = undefined;
                    }

                    $scope.binding = {  value : value, additionalInformation : additionalInformation };

                    $scope.hasAdditionalInformation = nextHasAdditionalInformation;


                    ngModelController.$setViewValue($scope.binding);

                }

                $scope.isAdditionalInformationRequired = function () {
                    var additionalMandatoryValues = $scope.question.additionalMandatoryValues;
                    if (additionalMandatoryValues === undefined) return true;

                    return additionalMandatoryValues.indexOf(($scope.hasAdditionalInformation || {}).value) !== -1;
                };

                $scope.getNumberedCaption = function () {
                    const caption = $scope.hasAdditionalInformation?.caption || translationService.get('nrYesNoT.pleaseSpecify');
                    const questionNumber =  $scope.question.number;
                    let hiddenLabel = ''
                    if(questionNumber)
                        hiddenLabel = `<span class="question-number">${questionNumber}</span>`;

                    return `${hiddenLabel}${caption}`;
                }; 

                $scope.$watch('binding', function(newVal, oldVal){
                    if($scope.binding!== undefined){
                        $scope.answer.value          = _.indexOf($scope.question.options, _.find($scope.question.options, { value: $scope.binding.value}));
                        $scope.answer.additionalInformation = $scope.binding.additionalInformation;

                        // $scope.hasAdditionalInformation = _.find(($scope.question.options||[]), {type:'lstring', value:$scope.binding.value});
                        $scope.hasAdditionalInformation = ($scope.question.options || []).filter(function(option) {
                            return (option.type === 'lstring' || option.type === 'lstringRte') && option.value === $scope.binding.value;
                          })[0];
                    }
                    else{
                        $scope.answer = {}
                    }
                })
                    
            }
        }
    }])

