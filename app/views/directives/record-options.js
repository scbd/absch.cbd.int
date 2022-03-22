import app from 'app';
import template from 'text!./record-options.html';
import _ from 'lodash';
import 'components/scbd-angularjs-services/main';
import 'services/main';

app.directive('recordOptions', ['locale', '$route', '$timeout', 'appConfigService', '$filter', '$compile', 'commonjs', 'realm',
    function (appLocale, $route, $timeout, appConfigService, $filter, $compile, commonjs, realm) {
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
                    $scope.updateComparison();
                }


                $scope.print = async function(){
                    $scope.printing = true;

                                  await import('printThis');
                    let  header = (await import('~/views/forms/view/print-header.html')).default;
                    let  footer = (await import('~/views/forms/view/print-footer.html')).default;	
                    header = $compile(header)($scope);					
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
                    
                }

                function getPdfUrl(){

                    const documentId = $filter('uniqueIDWithoutRevision')($scope.internalDocument);                    
                    const pdfType = 'documents'
                    let pdfDownloadUrl  =  '/pdf/:type/:schema/:documentId/:revision';
                    const schema = $scope.internalDocument.header.schema;

                    if('absPermit' == schema)
                        pdfType = 'ircc-certificate';
                    else if('absCheckpointCommunique' == schema)
                        pdfType = 'cpc-certificate';
                    else if($scope.internalDocumentInfo.workingDocumentID){//its a draft record
                        pdfDownloadUrl = `/pdf/draft-documents/:schema/${$route.current.params.code}`;
                    }
                    else if(_.includes(appConfigService.scbdSchemas, schema))
                        pdfType = 'scbd-records'

                    pdfDownloadUrl      = pdfDownloadUrl.replace(':type'        , pdfType)
                                                        .replace(':documentId'  , documentId)
                                                        .replace(':revision'    , ($scope.internalDocumentInfo||{}).revision||'')
                                                        .replace(':schema'      , schema);
                    return pdfDownloadUrl;
                }
            }
        };
    }]);

