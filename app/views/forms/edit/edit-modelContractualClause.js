import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import 'views/forms/edit/edit-resource-schema-base-directive';
import 'views/forms/view/view-resource.directive';

  export { default as template } from './edit-modelContractualClause.html';

  export default ["$scope", "$http", "$filter", "Thesaurus", "$q", "Enumerable", "$controller", "IStorage", "$location",
                function ($scope, $http, $filter, Thesaurus, $q, Enumerable, $controller, storage, $location) {


    $scope.path=$location.path();

    //$scope.organizationsRef = [];
    $controller('editController', {$scope: $scope});

    _.extend($scope.options, {
      resourceTypes : function() {
        return $q.when($http.get("/api/v2013/thesaurus/domains/840427E5-E5AC-4578-B238-C81EAEEDBDD8/terms", { cache: true })).then(function(o) {
          return  Thesaurus.buildTree(o.data);
        })
      }, mccKeywords : function() {
        return $q.when($http.get("/api/v2013/thesaurus/domains/ABS-A1920-Keywords/terms", { cache: true })).then(function(o) {
          return  Thesaurus.buildTree(o.data);
        })
      }

    });

    //============================================================
    //
    //============================================================
    $scope.setDocument({aichiTargets: [{identifier: "AICHI-TARGET-16"}]}, true)
    .then(function(doc){
        if(doc.keywords)
            $scope.keywords = _.map(doc.keywords, function(t){return { value: t};});
            if(doc.countryregions){
                $scope.setCountryRegions (doc.countryregions)
            }
    });



  }];

