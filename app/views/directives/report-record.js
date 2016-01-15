define(['app', 'underscore', ], function (app, _) {
        app.directive('reportRecord', function () {
                return {
                        restrict: 'EAC',
                        replace: true,
                        // transclude: true,
                        templateUrl: '/app/views/directives/report-record.html',
                        scope: {
                                uid: '@',
                        },
                        link: ['$scope', '$q', '$element', function ($scope, $q, $element) {

                        }]
                        , controller: ['$scope','$rootScope', '$q','$element','$http', '$filter',
                                function ($scope, $rootScope, $q, $element, $http, $filter) {



                        }]
                };

        });
});
