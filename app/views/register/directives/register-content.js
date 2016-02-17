define(['app','/app/views/register/register-record-list.directive.js',
'/app/views/directives/task-id-directive.html.js',
'/app/views/directives/user-details.directive.html.js',
'/app/views/directives/help-directive.html.js',
'bootstrap-datepicker', 'moment', 'text-angular', 'bootbox',], function(app) {

    app.directive("registerContent", [
        function() {

            return {
                restrict: "EA",
                templateUrl: "/app/views/register/directives/register-content.html",
                replace: true,
                transclude: false
            };
        }]);
    });
