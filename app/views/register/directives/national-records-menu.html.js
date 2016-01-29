define(['app'], function(app) {

    app.directive("registerNationalMenu", [
        function() {

            return {
                restrict: "EA",
                templateUrl: "/app/views/register/directives/national-records-menu.html",
                replace: true,
                transclude: false
            };
        }]);
    });
