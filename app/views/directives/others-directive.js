import app from 'app';
import template from 'text!./others-directive.html';

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


