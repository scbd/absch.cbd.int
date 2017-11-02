define(['app', 'text!views/directives/record-options.html', 'underscore', 'scbd-angularjs-services/locale'], function (app, template, _) {
app.directive('recordOptions', ['locale', '$route', '$timeout', function (appLocale, $route, $timeout) {
        return {
            restrict: 'EAC',
            template : template,
            link: function ($scope, $element, attrs) {
                


                if(!$scope.currentLocale){
                    $scope.currentLocale = appLocale;
                    $scope.downloadLocale = appLocale;
                }

                if($scope.internalDocument){
                    //if document does not contain application selected locale, then select one 
                    if(!_.contains($scope.internalDocument.header.languages, appLocale)){

                             if(_.contains($scope.internalDocument.header.languages, 'en')) $scope.currentLocale = 'en';                
                        else if(_.contains($scope.internalDocument.header.languages, 'fr')) $scope.currentLocale = 'fr';
                        else if(_.contains($scope.internalDocument.header.languages, 'es')) $scope.currentLocale = 'es';
                        else if(_.contains($scope.internalDocument.header.languages, 'ru')) $scope.currentLocale = 'ru';
                        else if(_.contains($scope.internalDocument.header.languages, 'ar')) $scope.currentLocale = 'ar';
                        else if(_.contains($scope.internalDocument.header.languages, 'zh')) $scope.currentLocale = 'zh';
                    }
                }
                if((($scope.document||{}).createdDate_dt) || $scope.$parent.internalDocumentInfo)
                    $scope.updatedOn = ($scope.document||{}).createdDate_dt || $scope.$parent.internalDocumentInfo.updatedOn;

                $scope.setCurrentLocale = function(loc){
                    $scope.currentLocale=loc
                    $scope.locale=loc
                    $scope.downloadLocale = loc;
                }


                $scope.print = function(){
                    $scope.printing = true;
                    require(['printThis', 'text!views/forms/view/print-header.html', 'text!views/forms/view/print-footer.html'], function(printObj, header, footer){						
                        $element.parent().parent().parent().find('#schemaView').printThis({
                            debug:false,
                            printContainer:true,
                            importCSS:true,
                            importStyle : true,
                            pageTitle : ($route.current.params.documentID||'')+$('title').text(),
                            loadCSS : '/app/css/print-friendly.css',
                            header : header,
                            footer : footer
                        });	
                        $timeout(function(){$scope.printing = false;},200);
                    });
                    
                }
            }
        };
    }]);
});

