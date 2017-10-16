define(['app', 'text!views/directives/record-options.html', 'underscore', 'scbd-angularjs-services/locale'], function (app, template, _) {
app.directive('recordOptions', ['locale', function (appLocale) {
        return {
            restrict: 'EAC',
            template : template,
            link: function ($scope, element, attrs) {
                


                if(!$scope.currentLocale){
                    $scope.currentLocale = appLocale;
                    $scope.downloadLocale = appLocale;
                }

                if($scope.document){
                    //if document does not contain application selected locale, then select one 
                    if(!_.contains($scope.document.header.languages, appLocale)){

                             if(_.contains($scope.document.header.languages, 'en')) $scope.currentLocale = 'en';                
                        else if(_.contains($scope.document.header.languages, 'fr')) $scope.currentLocale = 'fr';
                        else if(_.contains($scope.document.header.languages, 'es')) $scope.currentLocale = 'es';
                        else if(_.contains($scope.document.header.languages, 'ru')) $scope.currentLocale = 'ru';
                        else if(_.contains($scope.document.header.languages, 'ar')) $scope.currentLocale = 'ar';
                        else if(_.contains($scope.document.header.languages, 'zh')) $scope.currentLocale = 'zh';
                    }
                }
                if((($scope.document||{}).createdDate_dt) || $scope.$parent.internalDocumentInfo)
                    $scope.updatedOn = ($scope.document||{}).createdDate_dt || $scope.$parent.internalDocumentInfo.updatedOn;

                $scope.setCurrentLocale = function(loc){
                    $scope.currentLocale=loc
                    $scope.locale=loc
                    $scope.downloadLocale = loc;
                }
            }
        };
    }]);
});

