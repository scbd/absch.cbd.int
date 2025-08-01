import app from '~/app';
import _ from 'lodash';
import '~/views/forms/edit/edit';
import '~/views/forms/edit/directives/edit-resource-schema-base-directive';
import '~/views/forms/view/view-resource.directive';

  export { default as template } from './edit-communityProtocol.html';

  export default ["$scope", "thesaurusService", "$controller", "$location","realm",
                function ($scope, thesaurusService, $controller, $location,realm) {


    $scope.path=$location.path();
    $scope.isABS = realm.is('ABS');
    $scope.isBCH = realm.is('BCH');
    $scope.isCHM = realm.is('CHM');

    $controller('editController', {$scope: $scope});

    $scope.setOptions();
    _.extend($scope.options, {
        resourceTypes : function() {return thesaurusService.getDomainTerms('cppResourceTypes');}, 
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
        $scope.isCpp = true
        if(doc.countryRegions){
            $scope.setCountryRegions (doc.countryRegions)
        };
        // do we need to set aichiTargets to gbfTargets?
        // move aichi target -> gbf target
        if (!doc.gbfTargets?.length){  
            if (doc?.aichiTargets?.find((obj) => obj.identifier === 'AICHI-TARGET-16')){                      
                doc.gbfTargets = [{"identifier":"GBF-TARGET-13"}];	                
                // doc.aichiTargets = doc.aichiTargets.filter(item => item.identifier !== 'AICHI-TARGET-16');                      
            }	              	
        } 
    });


  }];

