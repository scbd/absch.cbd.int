define(['app', "text!/app/views/forms/view/view-contact.directive.html","/app/views/forms/view/view-contact-reference.directive.js",
'/app/views/directives/party-status.js'], 
function(app, template) {

    app.directive("viewContact", [function() {
        return {
            restrict: "EAC",
            template: template ,
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
