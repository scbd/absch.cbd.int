define(['app', 'text!views/directives/record-options.html', 'underscore', 'scbd-angularjs-services/locale',
'services/app-config-service'], function (app, template, _) {

app.directive('recordOptions', ['locale', '$route', '$timeout', 'appConfigService', '$filter', '$window',
    function (appLocale, $route, $timeout, appConfigService, $filter, $window) {
        return {
            restrict: 'EAC',
            template : template,
            link: function ($scope, $element, attrs) {              

                if(!$scope.currentLocale){
                    $scope.currentLocale = appLocale;
                    $scope.downloadLocale = appLocale;
                }

                $scope.$watch('::internalDocument', function(newVal){
                    if(!newVal)
                        return;
                    //if document does not contain application selected locale, then select one 
                    if(!_.contains($scope.internalDocument.header.languages, appLocale)){

                             if(_.contains($scope.internalDocument.header.languages, 'en')) $scope.currentLocale = 'en';                
                        else if(_.contains($scope.internalDocument.header.languages, 'fr')) $scope.currentLocale = 'fr';
                        else if(_.contains($scope.internalDocument.header.languages, 'es')) $scope.currentLocale = 'es';
                        else if(_.contains($scope.internalDocument.header.languages, 'ru')) $scope.currentLocale = 'ru';
                        else if(_.contains($scope.internalDocument.header.languages, 'ar')) $scope.currentLocale = 'ar';
                        else if(_.contains($scope.internalDocument.header.languages, 'zh')) $scope.currentLocale = 'zh';
                    }
                    if($scope.internalDocumentInfo.workingDocumentBody)
                        $scope.hidePdf = true;
                    if(_.contains(['absPermit', 'absCheckpointCommunique'], $scope.internalDocument.header.schema)){                        
                        if($scope.internalDocumentInfo && $scope.internalDocumentInfo.revision < $scope.internalDocumentInfo.latestRevision)
                            $scope.hidePdf = true;
                    }
                })

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

                $scope.openPdf = function(){
                    var documentId = $filter('uniqueIDWithoutRevision')($scope.internalDocument);
                    var pdfType = 'documents'

                    if('absPermit' == $scope.internalDocument.header.schema)
                        pdfType = 'ircc-certificate';
                    else if('absCheckpointCommunique' == $scope.internalDocument.header.schema)
                        pdfType = 'cpc-certificate';

                    var pdfDownloadUrl  =  '/api/v2017/generate-pdf/:realm/:type/:lang?documentID=:documentId&revision=:revision';
                    pdfDownloadUrl      = pdfDownloadUrl.replace(':realm'       , appConfigService.currentRealm)
                                                        .replace(':type'        , pdfType)
                                                        .replace(':lang'        , $scope.downloadLocale)
                                                        .replace(':documentId'  , documentId)
                                                        .replace(':revision'    , $scope.internalDocumentInfo.revision);

                    $window.open(pdfDownloadUrl);
                }
            }
        };
    }]);
});
