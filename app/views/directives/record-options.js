define(['app', 'text!views/directives/record-options.html', 'underscore', 'components/scbd-angularjs-services/services/locale',
'services/app-config-service', 'js/common'], function (app, template, _) {

app.directive('recordOptions', ['locale', '$route', '$timeout', 'appConfigService', '$filter', '$window', 'commonjs', '$timeout',
    function (appLocale, $route, $timeout, appConfigService, $filter, $window, commonjs, $timeout) {
        return {
            restrict: 'EAC',
            template : template,
            link: function ($scope, $element, attrs) {              
                $scope.termLocales = {};
                if(!$scope.currentLocale){
                    $scope.currentLocale = appLocale;
                    $scope.downloadLocale = appLocale;
                }

                $scope.$watch('::internalDocument', function(newVal){
                    if(!newVal)
                        return;
                    _.each($scope.internalDocument.header.languages, function(l){
                        $scope.termLocales[l] =  { identifier:'lang-'+l };
                    })
                    //if document does not contain application selected locale, then select one 
                    if(!_.contains($scope.internalDocument.header.languages, appLocale)){

                             if(_.contains($scope.internalDocument.header.languages, 'en')) $scope.currentLocale = 'en';                
                        else if(_.contains($scope.internalDocument.header.languages, 'fr')) $scope.currentLocale = 'fr';
                        else if(_.contains($scope.internalDocument.header.languages, 'es')) $scope.currentLocale = 'es';
                        else if(_.contains($scope.internalDocument.header.languages, 'ru')) $scope.currentLocale = 'ru';
                        else if(_.contains($scope.internalDocument.header.languages, 'ar')) $scope.currentLocale = 'ar';
                        else if(_.contains($scope.internalDocument.header.languages, 'zh')) $scope.currentLocale = 'zh';
                    }
                    if($scope.internalDocumentInfo && $scope.internalDocumentInfo.documentID === undefined && !$scope.internalDocumentInfo.id)
                        $scope.hidePdf = true;
                    if(_.contains(['absPermit', 'absCheckpointCommunique'], $scope.internalDocument.header.schema)){                        
                        if($scope.internalDocumentInfo && $scope.internalDocumentInfo && 
                           $scope.internalDocumentInfo.revision < $scope.internalDocumentInfo.latestRevision)
                            $scope.hidePdf = true;
                    }
                    $timeout(function(){
                        $scope.pdfUrl = getPdfUrl();                        
                        $element.find('.lang-tooltip').tooltip()
                    }, 200);
                })

                $scope.setCurrentLocale = function(loc){
                    $scope.currentLocale=loc
                    $scope.locale=loc
                    $scope.downloadLocale = loc;
                    $scope.updateComparision();
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

                function getPdfUrl(){
                    var documentId = $filter('uniqueIDWithoutRevision')($scope.internalDocument);
                    
                    var pdfType = 'documents'

                    if('absPermit' == $scope.internalDocument.header.schema)
                        pdfType = 'ircc-certificate';
                    else if('absCheckpointCommunique' == $scope.internalDocument.header.schema)
                        pdfType = 'cpc-certificate';
                    else if(_.contains(appConfigService.scbdSchemas, $scope.internalDocument.header.schema))
                        pdfType = 'scbd-records'

                    var pdfDownloadUrl  =  '/pdf/:type/:schema/:documentId/:revision';
                    pdfDownloadUrl      = pdfDownloadUrl.replace(':type'        , pdfType)
                                                        .replace(':documentId'  , documentId)
                                                        .replace(':revision'    , ($scope.internalDocumentInfo||{}).revision||'')
                                                        .replace(':schema'      , $scope.internalDocument.header.schema);
                    return pdfDownloadUrl;
                    // $window.open(pdfDownloadUrl);
                }
            }
        };
    }]);
});
