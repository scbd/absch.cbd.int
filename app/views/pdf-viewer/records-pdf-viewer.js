import app from 'app';
import pdfObject from 'pdf-object';
import 'components/scbd-angularjs-services/main';
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
export default ["$scope", "$http", "$q", "$location", '$sce', 'locale', '$route', 'realm', '$timeout',
    function ($scope, $http, $q, $location, $sce, locale, $route, realm, $timeout) {

        $scope.pdfLocale = locale;
        $scope.pdf = {};
        $scope.loading = true;
        
        var uniqueId = ($route.current.params.documentId + '-' + ($route.current.params.revision||'')).replace(/-$/, '')
       
        $scope.pageLoaded = function(){
            $scope.loading = false;
        }

        $scope.finishLoading = function(){
            $scope.loading=false;
        }

        $scope.loadLangPdf = function(lang){
            $scope.loading = true;
            $scope.unloadPdf = true;
            $scope.pdf.src = getPdfSrc(lang);
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
            }, 500)
        }

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }
        
        function getPdfSrc(pdfLocale){
            $scope.pdf.fileName = uniqueId + '-' + pdfLocale + '.pdf';
            
            var devRealm = /-DEV$/
            var baseApiUrl = 'https://api-direct.cbd.int'
            if(devRealm.test(realm.value))
                baseApiUrl = '';

            var src = baseApiUrl + '/api/v2017/generate-pdf/{{realm}}/{{type}}/{{locale}}?documentID={{documentId}}&revision={{revision}}&schema={{schema}}';
            src = src   .replace("{{realm}}", realm.value)
                        .replace("{{locale}}", pdfLocale)
                        .replace("{{type}}", $route.current.params.type)
                        .replace("{{documentId}}", $route.current.params.documentId)
                        .replace("documentID", $route.current.params.type == 'draft-documents' ? 'code':'documentID')
                        .replace("{{revision}}", $route.current.params.revision)
                        .replace("{{schema}}", $route.current.params.schema);
            return src;
        }

        function loadPdfDocumentDetails(code){
            if($route.current.params.type == 'draft-documents'){
                $http.get('/api/v2018/document-sharing/'+ code)
                .then(function(result){
                    if(result.data.sharedData){
                        $scope.sharedData = result.data.sharedData;
                        $scope.pdf.uniqueId = uniqueId = $scope.sharedData.document.workingDocumentID + '-draft';
                        $scope.pdf.fileName = uniqueId + '-' + locale + '.pdf';
                        $scope.pdf.uniqueId = uniqueId;
                    }
                })
                .then(()=>$scope.loadLangPdf(locale||'en'))
                .catch(e=>{
                    $scope.error = e.data
                })
            }
            else{
                $scope.pdf.uniqueId = uniqueId;
                $scope.pdf.fileName = uniqueId + '-' + locale + '.pdf';
                $scope.pdf.src = getPdfSrc($scope.pdfLocale);
                $timeout(()=>$scope.loadLangPdf(locale||'en'), 100);    
            }
        }

        loadPdfDocumentDetails($route.current.params.documentId)
    }];


