import app from '~/app';
import _ from 'lodash';
import template from 'text!./edit-resource.directive.html';
import '~/views/forms/edit/edit';
import './edit-resource-schema-base-directive';

app.directive("editResource", ["$controller", "$location", function ($controller, $location) {
    return {
        restrict: 'EA',
        template: template ,
        replace: true,
        require    : '?ngModel',
        scope:{
            onPostSubmitFn   : "&onPostSubmit"
        },
        link : function($scope, $element, $attr){
            $scope.path=$location.path();
            $scope.container        = $attr.container;
            $scope.isDialog         = $attr.isDialog;  
            $scope.type 			= $attr.documentType;

            $controller('editController', {$scope: $scope});

            $scope.setOptions();           

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
                $scope.isVlr = true;
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
        }
    }
}]);