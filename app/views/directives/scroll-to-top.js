define(['app', 'text!views/directives/scroll-to-top.html'], function(app, template) {

    app.directive('scrollToTop', function($http) {
        return {
            restrict: 'EAC',
            template: template,
            replace: true,
            scope: {
                field: '@field'
            },
            link: function($scope, element, attrs) {},
            controller: ["$scope", "$window", function($scope, $window) {

                $scope.gotoTop = function() {
                    $window.scrollTo(0, 0);
                  }

            }]
        }
    });

});
