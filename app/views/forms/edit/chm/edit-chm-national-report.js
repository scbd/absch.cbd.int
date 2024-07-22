import app from '~/app';
import _ from 'lodash';
import '~/views/forms/edit/edit';
import editChmNationalReportEditForm from  './edit-chm-national-report.vue';
import nationalReport from '~/views/forms/view/chm/national-report.vue';
export { default as template } from './edit-chm-national-report.html';
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
            components:{editChmNationalReportEditForm, nationalReport}    ,
            setup:  setupFunctions    
        }   
     
        $scope.getCleanDocument = function(document) {           
            if(vueCleanDocument)     
                return vueCleanDocument?.getCleanDocument(document);
        };
   
        $scope.setDocument();         
    }];
