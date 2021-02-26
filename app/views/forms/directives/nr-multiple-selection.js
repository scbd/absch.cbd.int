define(['app', 'text!views/forms/directives/nr-yes-no.html'], function (app, nrYesNoTemplate) {

    app.directive('nrMulti', function () {
        return {
            restrict: 'EA',
            template: nrYesNoTemplate,
            replace: true,
            scope:{
                binding: '=ngModel',
                question:'=',
                ngDisabledFn: '&ngDisabled',
                required: "@"
            },
            link: function ($scope) {
                $scope.selection = {}
                
                
                $scope.updateAnswer = function(){
                    $scope.binding = $scope.question.options[$scope.selection.answer].value
                }

                if($scope.binding!== undefined)
                    $scope.selection.answer = $scope.question.options.indexOf($scope.binding, 0);
            }
        }
    })

});
