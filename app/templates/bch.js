define(['app', 'angular', 'text!./bch-footer.html', './bch-header',
        'bootstrap', 'routes/bch', 'ng-breadcrumbs','toastr',
        'components/scbd-branding/directives/header/header',
        'components/scbd-branding/directives/footer'], function (app, angular, footerHtml) { 'use strict';

    app.directive('bchFooter', [function () { return { restrict: 'E', template: footerHtml }; }]);

    app.controller('BchTemplateController', ['$rootScope', '$location', '$window',
        function ($rootScope, $location, $window) {

            $rootScope.pageTitle = { text: "" };

            $rootScope.$on('$routeChangeSuccess', function () {
                $window.ga('set', 'page', basePath() + $location.path());
                $window.ga('send', 'pageview');
            });

            $rootScope.$on('signOut', function () {
                $window.location.reload();
            });

            //============================================================
            //
            //
            //============================================================
            function basePath() { 
                return (angular.element('base').attr('href') || '').replace(/\/+$/g, '');
            }

            //============================================================
            //
            //
            //============================================================
            function updateSize() {
                $rootScope.$applyAsync(function () {
                    $rootScope.deviceSize = $('.device-size:visible').attr('size');
                });
            }

            updateSize();
            
            angular.element($window).on('resize', updateSize);
            
        }
    ]);
    
    angular.bootstrap(document, [app.name]);
});
