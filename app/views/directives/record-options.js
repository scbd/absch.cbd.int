import app from '~/app';
import template from 'text!./record-options.html';
import _ from 'lodash';
import '~/components/scbd-angularjs-services/main';
import '~/services/main';
import { pdfThis, PDF_STORAGE_URL } from '~/services/pdf-this';
import HtmlPdfApi from '~/api/html-pdf-api';
import recordOptionsT from '~/app-text/views/directives/record-options.json';

const PDF_SLOW_AFTER_MS = 8000;
const htmlPdfApi        = new HtmlPdfApi();

app.directive('recordOptions', ['locale', '$route', '$timeout', 'appConfigService', '$filter', '$compile', 'commonjs', 'realm', 'translationService',
    function (appLocale, $route, $timeout, appConfigService, $filter, $compile, commonjs, realm, translationService) {
        return {
            restrict: 'EAC',
            template : template,
            link: function ($scope, $element, attrs) {              
                translationService.set('recordOptionsT', recordOptionsT);             
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


                $scope.print = async function($evt){
                    
                    $evt.preventDefault()
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

                // The tab opens only after the PDF is ready: a blank tab opened first would hide the reCAPTCHA challenge.
                // A stored copy of a published record is offered to the user first, otherwise the pdf is generated.
                // Falls back to the server rendered /pdf route when generation fails.
                $scope.openPdf = async function($evt){

                    $evt.preventDefault();
                    //clicking while it runs in the background brings the progress dialog back
                    if($scope.pdfInBackground){
                        $scope.pdfInBackground = false;
                        return;
                    }

                    if($scope.generatingPdf || $scope.cachedPdfUrl || $scope.readyPdfUrl || $scope.failedPdfUrl)
                        return;

                    $scope.generatingPdf = true;

                    const key = `${realm.value.toLowerCase()}/${$filter('uniqueID')($scope.internalDocumentInfo||$scope.internalDocument)}-${$scope.currentLocale}.pdf`;
                    const isDraft = !!($scope.internalDocumentInfo||{}).workingDocumentID;//drafts change, a stored copy would be stale

                    if(!isDraft){
                        const storedUrl = `${PDF_STORAGE_URL}/${key}`;
                        const exists = await htmlPdfApi.hasPregeneratedPdf(storedUrl);

                        if(exists){
                            $timeout(function(){
                                $scope.generatingPdf = false;
                                $scope.cachedPdfUrl  = getPdfViewerUrl(key);
                                $scope.cachedPdfKey  = key;
                            });
                            return;
                        }
                    }

                    await generatePdf(key);
                };

                $scope.openCachedPdf = function(){
                    const url = $scope.cachedPdfUrl;
                    $scope.cachedPdfUrl = undefined;
                    window.open(url, '_blank');//still inside the user's click, so not blocked
                };

                $scope.generateFreshPdf = function(){
                    $scope.cachedPdfUrl  = undefined;
                    $scope.generatingPdf = true;
                    generatePdf($scope.cachedPdfKey);
                };

                //hides the progress dialog, it comes back with the pdf link once it is ready
                $scope.pdfToBackground = function(){
                    $scope.pdfInBackground = true;
                };

                $scope.showPdfDialog = function(){
                    $scope.pdfInBackground = false;
                };

                $scope.closePdfDialog = function(){
                    $scope.cachedPdfUrl = undefined;
                    $scope.readyPdfUrl  = undefined;
                    $scope.failedPdfUrl = undefined;
                };

                //offers to continue in the background when generating takes a while
                let slowTimer;
                function startSlowTimer(){
                    $timeout.cancel(slowTimer);
                    slowTimer = $timeout(function(){ $scope.pdfSlow = true; }, PDF_SLOW_AFTER_MS);
                }

                async function generatePdf(key){

                    startSlowTimer();
                    let url;
                    try{
                        let header = (await import('~/views/forms/view/print-header.html')).default;
                        let footer = (await import('~/views/forms/view/print-footer.html')).default;
                        header = $compile(header)($scope);
                        footer = $compile(footer)($scope);
                        await $timeout();//let the compiled header/footer render before they are cloned
                        header.css('padding-top', '30px');

                        //the api stores the pdf under the attachment name, which is the cache key
                        //the coloured record header (type and id) followed by the record view
                        const recordElements = [$element.closest('.panel-heading')[0], $element.parent().parent().parent().find('#schemaView')[0]];
                        url = await pdfThis(recordElements, {
                            downloadFileName: key, base:true, baseUrl: realm.baseURL, returnUrl:true,
                            header, footer
                        });
                    }
                    catch(e){
                        console.error('PDF generation failed:', e);
                    }

                    if(url)
                        openPdfTab(getPdfViewerUrl(key));
                    else
                        failPdf();
                }

                //the pdf viewer page, showing the stored pdf when a key is given, otherwise generating it
                function getPdfViewerUrl(storedKey){
                    let viewerUrl = `/${appLocale}${$scope.pdfUrl}`;

                    if(storedKey)
                        viewerUrl += `?storedKey=${encodeURIComponent(storedKey)}`;

                    return viewerUrl;
                }

                function endPdfRun(){
                    $timeout.cancel(slowTimer);
                    $timeout(function(){
                        $scope.pdfSlow         = false;
                        $scope.generatingPdf   = false;
                        $scope.pdfInBackground = false;
                    });
                }

                //the dialog reports the failure and offers the server rendered pdf page instead
                function failPdf(){
                    endPdfRun();
                    $timeout(function(){
                        $scope.failedPdfUrl    = getPdfViewerUrl();
                    });
                }

                function openPdfTab(target){
                    endPdfRun();

                    //popup blockers can reject window.open after the await or a background run, then the dialog offers a link to click
                    if(!window.open(target, '_blank'))
                        $timeout(function(){ $scope.readyPdfUrl = target; });
                }

                function getPdfUrl(){

                    const documentId = $filter('uniqueIDWithoutRevision')($scope.internalDocument);                    
                    let pdfType = 'documents'
                    let pdfDownloadUrl  =  '/pdf/:type/:schema/:documentId/:revision';
                    const schema = $scope.internalDocument.header.schema;

                    if('absPermit' == schema)
                        pdfType = 'ircc-certificate';
                    else if('absCheckpointCommunique' == schema)
                        pdfType = 'cpc-certificate';
                    else if(($scope.internalDocumentInfo||{}).workingDocumentID){//its a draft record
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

