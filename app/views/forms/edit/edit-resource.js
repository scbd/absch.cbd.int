import app from 'app';


  export { default as template } from './edit-resource.html';

  export default ["$scope", "$http", "$filter", "Thesaurus", "$q", "Enumerable", "$controller", "IStorage", "$location",
                function ($scope, $http, $filter, Thesaurus, $q, Enumerable, $controller, storage, $location) {


    $scope.path=$location.path();

    //$scope.organizationsRef = [];
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
  }];

