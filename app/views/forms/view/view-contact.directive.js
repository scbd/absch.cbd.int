import app from 'app';
import template from "text!./view-contact.directive.html";
import "views/forms/view/directives/view-record-reference.directive";
import viewContactT from '~/app-text/views/forms/view/view-contact.json';

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
            controller: ["$scope", "translationService", function ($scope, translationService){
                translationService.set('viewContactT', viewContactT);
            }]
        };
    }]);

