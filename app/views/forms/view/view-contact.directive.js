define(['app',"/app/views/forms/view/view-contact-reference.directive.js",
'/app/views/directives/party-status.js'], function(app) {

    app.directive("viewContact", [function() {
        return {
            restrict: "EAC",
            templateUrl: "/app/views/forms/view/view-contact.directive.html",
            replace: true,
            transclude: false,
            scope: {
                document: "=ngModel",
                locale: "=",
                target: "@linkTarget"
            },
            controller: ["$scope", function ($scope){}]
        };
    }]);
});
