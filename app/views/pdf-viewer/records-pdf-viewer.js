﻿import app from '~/app';
import pdfObject from 'pdf-object';
import '~/components/scbd-angularjs-services/main';
import pdfViewerT from '~/app-text/views/pdf-viewer/records-pdf-viewer.json';
import { languages } from '~/app-data/un-languages.js';
    app.directive( 'elemReady', function( $parse ) {
        return {
            restrict: 'A',
            link: function( $scope, elem, attrs ) { 
               $scope.safeapply = function(fn) {
                ($scope.$$phase || $scope.$root.$$phase) ? fn() : $scope.$apply(fn);
              }   
               elem.ready(function(){
                 $scope.safeapply(function(){
                     var func = $parse(attrs.elemReady);
                     func($scope);
                 })
               })
            }
         }
     })
    
    export { default as template } from './records-pdf-viewer.html';
export default ["$scope", "$http", "$q", "$location", '$sce', 'locale', '$route', 'realm', '$timeout', 'translationService', '$element',
    function ($scope, $http, $q, $location, $sce, locale, $route, realm, $timeout, translationService, $element) {
        translationService.set('pdfViewerT', pdfViewerT);
        $scope.currentTime = new Date().getTime();
        $scope.languages = languages;
        $scope.pdfLocale = $location.search()?.lang || locale;
        $scope.pdf = {};
        $scope.loading = true;
                
        var uniqueId = ($route.current.params.documentId + '-' + ($route.current.params.revision||'')).replace(/-$/, '')
       
        $scope.pageLoaded = function(){
            $scope.loading = false;
        }

        $scope.finishLoading = function(){
            $scope.loading=false;
        }

        $scope.loadLangPdf = function(lang, force ){
            $scope.pdfLocale = lang;
            $scope.loading = true;
            $scope.unloadPdf = true;
            $scope.pdf.src = getPdfSrc(lang, force); // getPdfSrc(pdfLocale, force)
            var options = {
                pdfOpenParams: {
                    navpanes: 1,
                    toolbar: 1,
                    statusbar: 1,
                    view: "FitV",
                    pagemode: "thumbs",
                    page: 1
                },
                forcePDFJS: true,
                PDFJS_URL: "/app/views/pdf-viewer/pdfjs/web/viewer.b10e641f.html",
                originalUrl:$scope.pdf.fileName
            };
            pdfObject.embed($scope.pdf.src, '#viewPdf', options)
            
            $timeout(function(){
                $scope.unloadPdf = false;
                $scope.loading = false;
                $element.find('.bs-tooltip').tooltip()
            }, 500)
        }

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }
        
        function getPdfSrc(pdfLocale, force){
            $scope.pdf.fileName = uniqueId + '-' + pdfLocale + '.pdf';
            
            var devRealm = /-DEV$/
            var baseApiUrl = 'https://api-direct.cbd.int'
            if(devRealm.test(realm.value))
                baseApiUrl = '';

            var src = '/api/v2017/generate-pdf/{{realm}}/{{type}}/{{locale}}?documentID={{documentId}}&revision={{revision}}&schema={{schema}}&code={{documentId}}';
            
            if($route.current.params.code){
                src = '/api/v2017/generate-pdf/{{realm}}/{{type}}/{{locale}}?code={{code}}';
            }
            
            if(force){
                src += '&force=true&t=' + new Date().getTime();
            }

            src = src   .replace("{{realm}}", realm.value)
                        .replace("{{locale}}", pdfLocale)
                        .replace("{{type}}", $route.current.params.type)
                        .replace(/\{\{documentId\}\}/ig, $route.current.params.documentId)
                        .replace("{{revision}}", $route.current.params.revision)
                        .replace("{{schema}}", $route.current.params.schema)
                        .replace("{{code}}", $route.current.params.code);

            return baseApiUrl + src;
        }

        function loadPdfDocumentDetails(code){
            const language = $scope.pdfLocale||locale||'en';
            if($route.current.params.type == 'draft-documents'){
                $http.get('/api/v2018/document-sharing/'+ code)
                .then(function(result){
                    if(result.data.sharedData){
                        $scope.sharedData = result.data.sharedData;
                        $scope.pdf.uniqueId = uniqueId = $scope.sharedData.document.workingDocumentID + '-draft';
                        $scope.pdf.fileName = uniqueId + '-' + language + '.pdf';
                        $scope.pdf.uniqueId = uniqueId;
                    }
                })
                .then(()=>$scope.loadLangPdf(language))
                .catch(e=>{
                    $scope.error = e.data
                })
            }
            else{
                $scope.pdf.uniqueId = uniqueId;
                $scope.pdf.fileName = uniqueId + '-' + language + '.pdf';
                $scope.pdf.src = getPdfSrc(language);
                $timeout(()=>$scope.loadLangPdf(language), 100);    
            }
        }
        
        if(window.scbdApp.isCrawler){
            let url = `/database/${$route.current.params.documentId}`;
            if($route.current.params.revision)
                url += `-${$route.current.params.revision}`;

            $location.path(url)
        }
        else{
            loadPdfDocumentDetails($route.current.params.documentId);
        }
    }];


