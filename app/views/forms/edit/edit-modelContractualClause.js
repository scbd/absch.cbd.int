import app from '~/app';
import _ from 'lodash';
import '~/views/forms/edit/edit';
import '~/views/forms/edit/directives/edit-resource-schema-base-directive';
import '~/views/forms/view/view-resource.directive';

  export { default as template } from './edit-modelContractualClause.html';

  export default ["$scope", "thesaurusService", "$controller", "$location","realm",
                function ($scope, thesaurusService, $controller, $location,realm) {


    $scope.path=$location.path();
    $scope.isABS = realm.is('ABS');
    $scope.isBCH = realm.is('BCH');
    $scope.isCHM = realm.is('CHM');

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

    var newDocument = {};
    if($scope.isABS)
        newDocument = {gbfTargets: [{"identifier":"GBF-TARGET-13"}]}

    if($scope.isBCH)
        newDocument = {gbfTargets: [{"identifier":"GBF-TARGET-17"}]}  

    $scope.setDocument(newDocument, true)
    .then(function(doc){
        $scope.isMcc = true
        if(doc.countryRegions){
            $scope.setCountryRegions (doc.countryRegions)
        }
    });



  }];

