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
                
                require(['components/scbd-angularjs-controls/form-control-directives/all-controls'], function(){
                    ngDialog.open({
                        className : 'ngdialog-theme-default wide',
                        template: 'faq-edit-modal',
                        closeByDocument: false,
                        controller : ['$http', '$scope', function($http, $scope){
                            $scope.languages = ['en'];
                            $scope.toolbar = [
                                ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
                                ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
                                ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
                                ['html', 'insertImage','insertLink', 'insertVideo', 'wordcount', 'charcount']
                            ];
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
