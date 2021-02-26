define(['app', 'text!./others-directive.html'], function(app, template) {

    app.directive('others', function($http) {
        return {
            restrict: 'EAC',
            template: template,
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
