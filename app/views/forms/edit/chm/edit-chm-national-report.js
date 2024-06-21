import app from '~/app';
import _ from 'lodash';
import '~/views/forms/edit/edit';
import editChmNationalReportT from '~/app-text/views/forms/edit/chm/edit-chm-national-report.json'; 
import editChmNationalReportEditForm from  './edit-chm-national-report.vue';
import nationalReport from '~/views/forms/view/chm/national-report.vue';
export { default as template } from './edit-chm-national-report.html';

export default ["$scope", "realm", "$http", "$filter", "$q", "$routeParams", "$controller", "$location", "translationService", 
    function ($scope, realm, $http, $filter, $q, $routeParams, $controller, $location, translationService) {
        $controller('editController', {
            $scope: $scope           
        });
       
        $scope.shareVueComponent = {
            components:{editChmNationalReportEditForm, nationalReport}        
        }
        $scope.vueReviewDocumentInfo = {
            body : $scope.review.document
        }
        translationService.set('editChmNationalReportT', editChmNationalReportT);
        $scope.path = $location.path();

        _.extend($scope.options, {           
            countries:		$http.get("/api/v2013/thesaurus/domains/countries/terms",								{ cache: true }).then(function (o) { return $filter('orderBy')(o.data, 'name'); }),
            jurisdictions:	$http.get("/api/v2013/thesaurus/domains/50AC1489-92B8-4D99-965A-AAE97A80F38E/terms",	{ cache: true }).then(function (o) { return o.data; }),
            approvedStatus:	$http.get("/api/v2013/thesaurus/domains/E27760AB-4F87-4FBB-A8EA-927BDE375B48/terms",	{ cache: true }).then(function (o) { return o.data; }),
            approvingBody:	$http.get("/api/v2013/thesaurus/domains/F1A5BFF1-F555-40D1-A24C-BBE1BE8E82BF/terms",	{ cache: true }).then(function (o) { return o.data; }),
            reportStatus:	$http.get("/api/v2013/thesaurus/domains/7F0D898A-6BF1-4CE6-AA77-7FEAED3429C6/terms",	{ cache: true }).then(function (o) { 
                return o.data;
            }), 
            reportTypes:	$http.get("/api/v2013/thesaurus/domains/2FD0C77B-D30B-42BC-8049-8C62D898A193/terms",	{ cache: true }).then(function (o) { 
                    var rtypes = [];
                    var data = [];
                    data = o.data;
                    
                    // if(keepTypeOptions){	
                    //     for(var i=0; i < data.length; i++)
                    //     {
                    //         if(keepTypeOptions.indexOf(data[i].identifier) >= 0 )
                    //             rtypes.push(data[i]);
                    //     }
                    // }
                    // else if(rmTypeOptions){
                    //     for(var i=0; i < data.length; i++)
                    //     {
                    //         if(rmTypeOptions.indexOf(data[i].identifier) < 0)
                    //             rtypes.push(data[i]);
                    //     }
                    // }
                    // else 
                    //     rtypes = o.data;
                    
                    // return thesaurus.buildTree(rtypes); 
                    return data
                    
                })
           
        })

        
        $scope.getCleanDocument = function(document) {

            document = document || $scope.document;

            if (!document)
                return undefined;

            //document = angular.fromJson(angular.toJson(document));

            if (document.jurisdiction && !$scope.isSubNational(document) && !$scope.isCommunity(document) && !$scope.isOthers(document)) {
                document.jurisdiction.customValue = undefined;
            }
        

            if (/^\s*$/g.test(document.notes))
                document.notes = undefined;

            return $scope.sanitizeDocument(document);
        };

        $scope.setDocument();

    }];

