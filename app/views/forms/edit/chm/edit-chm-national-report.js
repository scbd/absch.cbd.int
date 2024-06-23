import app from '~/app';
import _ from 'lodash';
import '~/views/forms/edit/edit';
import editChmNationalReportEditForm from  './edit-chm-national-report.vue';
import nationalReport from '~/views/forms/view/chm/national-report.vue';
export { default as template } from './edit-chm-national-report.html';


export default ["$scope", "$http", "$filter",  "$controller", "$location", 
    function ($scope,$http, $filter,  $controller, $location) {
        $controller('editController', {
            $scope: $scope           
        });
       
        $scope.shareVueComponent = {
            components:{editChmNationalReportEditForm, nationalReport}        
        }   
     
        $scope.path = $location.path();    
     
        const editFormRef = editChmNationalReportEditForm;    
        $scope.getCleanDocument = function(document) {
          
            console.log(editFormRef);       
            return editFormRef.getCleanDocument(document);
         

            // document = document || $scope.document;

            // if (!document)
            //     return undefined;

            // //document = angular.fromJson(angular.toJson(document));


            // if (/^\s*$/g.test(document.notes))
            //     document.notes = undefined;

            // return $scope.sanitizeDocument(document);
        };
   
        $scope.setDocument();
         
    }];

