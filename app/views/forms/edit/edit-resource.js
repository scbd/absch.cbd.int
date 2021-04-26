import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import 'views/forms/edit/edit-resource-schema-base-directive';
import 'views/forms/view/view-resource.directive';

  export { default as template } from './edit-resource.html';

  export default ["$scope", "$http", "$filter", "Thesaurus", "$q", "Enumerable", "$controller", "IStorage", "$location",
                function ($scope, $http, $filter, Thesaurus, $q, Enumerable, $controller, storage, $location) {


    $scope.path=$location.path();

    //$scope.organizationsRef = [];
    $controller('editController', {$scope: $scope});

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
        if(doc.keywords)
            $scope.keywords = _.map(doc.keywords, function(t){return { value: t};});
        
        if(doc.countryRegions){
            $scope.setCountryRegions (doc.countryRegions)
        }
    });
  }];

