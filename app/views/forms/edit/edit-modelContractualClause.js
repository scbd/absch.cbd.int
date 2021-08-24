import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import '~/views/forms/edit/directives/edit-resource-schema-base-directive';
import '~/views/forms/view/view-resource.directive';

  export { default as template } from './edit-modelContractualClause.html';

  export default ["$scope", "thesaurusService", "$controller", "$location",
                function ($scope, thesaurusService, $controller, $location) {


    $scope.path=$location.path();

    //$scope.organizationsRef = [];
    $controller('editController', {$scope: $scope});

    $scope.setOptions();
    _.extend($scope.options, {
      resourceTypes : function() {return thesaurusService.getDomainTerms('mccResourceTypes');}, 
      mccKeywords   : function() {return thesaurusService.getDomainTerms('mccKeywords');}
    });
    //============================================================
    //
    //============================================================
    $scope.setDocument({aichiTargets: [{identifier: "AICHI-TARGET-16"}]}, true)
    .then(function(doc){
        $scope.isMcc = true
        if(doc.countryRegions){
            $scope.setCountryRegions (doc.countryRegions)
        }
    });



  }];

