define(['app'], function(app) {

    app.directive('others', function($http) {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/directives/others-directive.html',
            replace: true,
            scope: {
                field: '@field'
            },
            link: function($scope, element, attrs) {},
            controller: ["$scope", function($scope) {

            }]
        }
    });

});
