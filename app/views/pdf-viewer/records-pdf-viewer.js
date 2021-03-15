import app from 'app';
import pdfObject from 'pdf-object';
import 'components/scbd-angularjs-services/main';
    app
    .directive( 'elemReady', function( $parse ) {
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
    .controller("pdfViewer", ["$scope", "$http", "$q", "$location", '$sce', 'locale', '$route', 'realm', '$timeout',
    function ($scope, $http, $q, $location, $sce, locale, $route, realm, $timeout) {

        $scope.pdfLocale = locale;
        $scope.pdf = {};
        $scope.loading = true;
        
        var uniqueId = ($route.current.params.documentId + '-' + $route.current.params.revision||'').replace(/-$/, '')
        $scope.pdf.uniqueId = uniqueId;
        $scope.pdf.src = getPdfSrc($scope.pdfLocale);


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
                PDFJS_URL: "/app/views/pdf-viewer/pdfjs/web/viewer.b10e641f.html"
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
            return src .replace("{{realm}}", realm.value)
                                 .replace("{{locale}}", pdfLocale)
                                 .replace("{{type}}", $route.current.params.type)
                                 .replace("{{documentId}}", $route.current.params.documentId)
                                 .replace("{{revision}}", $route.current.params.revision)
                                 .replace("{{schema}}", $route.current.params.schema);
        }
        $scope.loadLangPdf(locale||'en')
    }])


