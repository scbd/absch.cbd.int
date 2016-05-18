define(['app'], function(app) {

    app.directive("registerNationalMenu", [
        function() {

            return {
                restrict: "EA",
                templateUrl: "/app/views/register/directives/national-records-menu.html",
                replace: true,
                transclude: false,
                   controller : ['$scope', '$element','$timeout',
                    function($scope, $element, $timeout){

                     $timeout(function(){
                                $element.find('[data-toggle="tooltip"]').tooltip();
                            },50);
                }],
                
            };
        }]);
    });
