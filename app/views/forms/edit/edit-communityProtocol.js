import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import 'views/forms/edit/edit-resource-schema-base-directive';
import 'views/forms/view/view-resource.directive';

  export { default as template } from './edit-communityProtocol.html';

  export default ["$scope", "$http", "$filter", "Thesaurus", "$q", "Enumerable", "$controller", "IStorage", "$location",
                function ($scope, $http, $filter, Thesaurus, $q, Enumerable, $controller, storage, $location) {


    $scope.path=$location.path();

    $controller('editController', {$scope: $scope});

    //============================================================
    //
    //============================================================
    $scope.setDocument({aichiTargets: [{identifier: "AICHI-TARGET-16"}]}, true)
    .then(function(doc){
        if(doc.keywords)
            $scope.keywords = _.map(doc.keywords, function(t){return { value: t};});

        if(doc.countryRegions){
            $scope.setCountryRegions (doc.countryRegions)
        }
    });


  }];

