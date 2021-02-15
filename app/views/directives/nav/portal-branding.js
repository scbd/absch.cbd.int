define(['app', 'text!views/directives/nav/portal-branding.html', 'lodash', ], function(app,template,  _) {
    app.directive('portalBranding', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            template: template,
            scope: {
                uid: '@',
            },
            link: ['$scope', '$q', '$element', function($scope, $q, $element) {

            }],
            controller: ['$scope', '$rootScope', '$q', '$element', '$http', '$filter','$location', 'locale',
                function($scope, $rootScope, $q, $element, $http, $filter, $location, locale) {

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.env_name = "ABS-CH";
                    $scope.production_env = true;
                    $scope.development_env = false;
                    $scope.training_env = false;
                    $scope.locale   = locale;
                    if ($location.absUrl().toLowerCase().indexOf("://absch.cbddev.xyz") > 0 || $location.absUrl().toLowerCase().indexOf("localhost:2010") > 0) {
                        $scope.development_env = true;
                        $scope.training_env = false;
                        $scope.production_env = false;
                        $scope.env_name = "DEVELOPMENT";
                    }
                    if ($location.absUrl().toLowerCase().indexOf("://training-absch.cbd.int") > 0) {
                        $scope.development_env = false;
                        $scope.training_env = true;
                        $scope.production_env = false;
                        $scope.env_name = "TRAINING";
                    }

                }
            ]
        };

    });
});
