import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import 'views/forms/edit/edit-resource-schema-base-directive';
import 'views/forms/view/view-resource.directive';

  export { default as template } from './edit-communityProtocol.html';

  export default ["$scope", "thesaurusService", "$controller", "$location",
                function ($scope, thesaurusService, $controller, $location) {


    $scope.path=$location.path();

    $controller('editController', {$scope: $scope});

    _.extend($scope.options, {
        resourceTypes : function() {return thesaurusService.getDomainTerms('cppResourceTypes');}, 
      });
    //============================================================
    //
    //============================================================
    $scope.setDocument({aichiTargets: [{identifier: "AICHI-TARGET-16"}]}, true)
    .then(function(doc){
        $scope.isCpp = true
        if(doc.countryRegions){
            $scope.setCountryRegions (doc.countryRegions)
        }
    });


  }];

