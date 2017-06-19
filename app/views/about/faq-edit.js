define(['app', 'text!./faq-edit.html', 'ngDialog'], 
function(app, template){

    app.directive('faqEdit', ['$http', '$q', 'ngDialog', function ($http, $q, ngDialog) {
      return {
        restrict: 'EA',
        template : template,
        scope : {
            faq : '='
        },
        link : function($scope, elm, attrs){
            
            $scope.editFaq = function(){
                var faqForEdit = angular.copy($scope.faq);
                
                require(['scbd-angularjs-controls'], function(){
                    ngDialog.open({
                        className : 'ngdialog-theme-default wide',
                        template: 'faq-edit-modal',
                        closeByDocument: false,
                        controller : ['$http', '$scope', function($http, $scope){
                            $scope.languages = ['en'];
                            $scope.document = faqForEdit;
                            $scope.save = function(document){

                            }
                        }]
                    });
                })
            }
        }
      }
    }])

});
