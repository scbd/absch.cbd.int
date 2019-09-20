define(['app', "text!views/forms/view/view-submission.directive.html", 	'views/directives/record-options'], function (app, template) {

    app.directive("viewSubmission", [function () {
        return {
            restrict   : "EAC",
            template: template ,
            replace    : true,
            transclude : false,
            scope: {
                document: "=ngModel",
                locale  : "=",
                target  : "@linkTarget",
                hide	: "@"
            }
        };
    }]);
    
    });
    