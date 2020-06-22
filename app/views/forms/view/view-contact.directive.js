define(['app', "text!views/forms/view/view-contact.directive.html","views/forms/view/directives/view-default-reference.directive",
'views/directives/party-status'], 
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
