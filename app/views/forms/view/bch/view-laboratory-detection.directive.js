define(['app', "text!views/forms/view/bch/view-laboratory-detection.directive.html", 	'views/directives/record-options',
'views/forms/view/directives/view-record-reference.directive', './view-lmo.directive'], function (app, template) {
    
    app.directive("viewLaboratoryDetection", [function () {
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
            },
            controller : ["$scope", function ($scope)
            {
                
                
                
                //====================
                //
                //====================
                $scope.display = function(field) {
                    
                    if(!$scope.hide) return true; //show all fields
    
                    return( $scope.hide.indexOf(field) >= 0 ? false : true);
                }
            }]
        };
    }]);
    
    });
    