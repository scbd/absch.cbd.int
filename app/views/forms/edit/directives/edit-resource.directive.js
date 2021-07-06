import app from 'app';
import _ from 'lodash';
import template from 'text!./edit-resource.directive.html';
import 'views/forms/edit/edit';
import 'views/forms/edit/edit-resource-schema-base-directive';

app.directive("editResource", ["$controller", "$location", function ($controller, $location) {
    return {
        restrict: 'EA',
        template: template ,
        replace: true,
        link : function($scope){
            $scope.path=$location.path();

            $controller('editController', {$scope: $scope});

            $scope.setOptions();
            //============================================================
            //
            //============================================================
            $scope.setTarget16 = function (document) {

                document = document || $scope.document;

                if (!document)
                    return undefined;

                if(document.aichiTargets){
                    var hasTarget16 = _.find(document.aichiTargets, { "identifier": "AICHI-TARGET-16"});

                    if(!hasTarget16)
                        document.aichiTargets.push({identifier: "AICHI-TARGET-16"});

                        $scope.document.aichiTargets = document.aichiTargets;
                }
                else {
                    $scope.document.aichiTargets = [{identifier: "AICHI-TARGET-16"}];
                }
            };

            //============================================================
            //
            //============================================================
            var newDocument = {};
            if($scope.isABS)
                newDocument = {aichiTargets: [{identifier: "AICHI-TARGET-16"}]}

            $scope.setDocument(newDocument, true)
            .then(function(doc){
                $scope.isVlr = true;
                if(doc.countryRegions){
                    $scope.setCountryRegions (doc.countryRegions)
                }
            });
        }
    }
}]);