define(['app', 'text!views/directives/route-loading-directive.html', 'views/directives/block-region-directive'], 
function(app, template){

    app.directive('routeLoading', ['$rootScope', function($rootScope){
        return {
            restrict: 'E',
            template: template,
            link: function(scope, elem, attrs) {
                scope.isRouteLoading = false;
        
                $rootScope.$on('$routeChangeStart', function() {
                    scope.isRouteLoading = true;
                });
        
                $rootScope.$on('$routeChangeSuccess', function() {
                    scope.isRouteLoading = false;
                });

                // $rootScope.$on('$routeChangeError',
                //     function(event, current, previous, rejection) {
                //         var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                //             'unknown target';
                //         var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                //         /**
                //          * Optionally log using a custom service or $log.
                //          * (Don't forget to inject custom service)
                //          */
                //         logger.warning(msg, [current]);
                //     }
                // );
            }
        };
    }])
})

