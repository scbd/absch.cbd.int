define(['app', 'text!./record-options.html', 'lodash', 'components/scbd-angularjs-services/main',
'services/main'], function (app, template, _) {

app.directive('recordOptions', ['locale', '$route', '$timeout', 'appConfigService', '$filter', '$window', 'commonjs',
    function (appLocale, $route, $timeout, appConfigService, $filter, $window, commonjs) {
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
                    _.forEach($scope.internalDocument.header.languages, function(l){
                        $scope.termLocales[l] =  { identifier:'lang-'+l };
                    })
                    //if document does not contain application selected locale, then select one 
                    if(!_.includes($scope.internalDocument.header.languages, appLocale)){

                             if(_.includes($scope.internalDocument.header.languages, 'en')) $scope.currentLocale = 'en';
                        else if(_.includes($scope.internalDocument.header.languages, 'fr')) $scope.currentLocale = 'fr';
                        else if(_.includes($scope.internalDocument.header.languages, 'es')) $scope.currentLocale = 'es';
                        else if(_.includes($scope.internalDocument.header.languages, 'ru')) $scope.currentLocale = 'ru';
                        else if(_.includes($scope.internalDocument.header.languages, 'ar')) $scope.currentLocale = 'ar';
                        else if(_.includes($scope.internalDocument.header.languages, 'zh')) $scope.currentLocale = 'zh';
                    }
                    if($scope.internalDocumentInfo && $scope.internalDocumentInfo.documentID === undefined && !$scope.internalDocumentInfo.id)
                        $scope.hidePdf = true;
                    if(_.includes(['absPermit', 'absCheckpointCommunique'], $scope.internalDocument.header.schema)){
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
                    require(['printThis', 'text!./print-footer.html'], function(printObj, header, footer){						
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
                    else if(_.includes(appConfigService.scbdSchemas, $scope.internalDocument.header.schema))
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
