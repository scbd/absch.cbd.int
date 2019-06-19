define(['app', 'pdf-object', 'components/scbd-angularjs-services/services/locale'], function (app, pdfObject) {
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
    .controller("urlPdfViewer", ["$scope", "$http", "$q", "$location", '$sce', 'locale', '$route', 'realm', '$timeout',
    function ($scope, $http, $q, $location, $sce, locale, $route, realm, $timeout) {

        $scope.pdfLocale = locale;
        $scope.pdf = {};
        $scope.loading = true;
        
        var uniqueId = "Guide_to_the_ABS_Clearing-House"
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
                PDFJS_URL: "/app/views/pdf-viewer/pdfjs/web/viewer.html"
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
            var src = 'http://Matthews-MacBook-Pro.local:7070/api/render-pdf?baseurl=Matthews-MacBook-Pro.local:2010&url=http://Matthews-MacBook-Pro.local:2010/pdf-templates/about'
            return src;
        }
        $scope.loadLangPdf(locale||'en')
    }])

})
