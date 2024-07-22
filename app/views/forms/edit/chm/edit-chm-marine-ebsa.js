import app from '~/app';
import _ from 'lodash';
import '~/views/forms/edit/edit';
import editChmMarineEbsaEditForm from  './edit-chm-marine-ebsa.vue';
import marineEbsa from '~/views/forms/view/chm/marine-ebsa.vue';
export { default as template } from './edit-chm-marine-ebsa.html';
import { provide } from 'vue';
import { safeDelegate } from '~/services/common'
export default ["$scope", "$http", "$filter",  "$controller", "$location", 
    function ($scope,$http, $filter,  $controller, $location) {
        $controller('editController', {
            $scope: $scope           
        });
       
        let vueCleanDocument = null;
        function setupFunctions(){
            provide('getCleanDocument', safeDelegate($scope, (options)=>{
                options = options || {}
                vueCleanDocument = options
            }));
        }
        
        $scope.shareVueComponent = {
            components:{editChmMarineEbsaEditForm, marineEbsa}    ,
            setup:  setupFunctions    
        }   
     
        $scope.getCleanDocument = function(document) {           
            if(vueCleanDocument)     
                return vueCleanDocument?.getCleanDocument(document);
        };
   
        $scope.setDocument();         
    }];