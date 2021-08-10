import app from 'app';
import _ from 'lodash';
import angular from 'angular';
import 'views/forms/edit/edit';
import 'services/main';
import 'views/forms/edit/document-selector';
import 'views/forms/view/abs/view-measure-status.directive';

export { default as template } from './edit-measure-status.html';

export default ["$scope", "realm", "$q",  "$controller", "thesaurusService","Thesaurus",
    function($scope, realm, $q, $controller ,thesaurusService, Thesaurus) {
        $controller('editController', {
            $scope: $scope
        });
        $scope.jurisdictionRegions		= {};
        var isStatusOptions = ["6F26C635-3257-4CF1-A066-96269610002B", "52D97280-53CB-4456-9F1C-6CC0319BE3A9", "18DCC1C4-A12F-4AE6-A735-A457CB8AB0AD"];
        var notStatusOptions = ["9B78633E-653E-4C60-995E-6EFEA06D2A7C", "6AB1229B-9C68-4858-893A-2193DA4D43DB", "97EE08DD-1E98-4FC8-8865-95B5A4D9977F"];

        _.extend($scope.options, {
            jurisdictions: function () {
                return thesaurusService.getDomainTerms('jurisdiction');
            },
            regions: function () {
                return thesaurusService.getDomainTerms('regions')
                    .then(function (o) {
                        return Thesaurus.buildTree(o);
                    });
            },
            yesStatus: function () {
                return thesaurusService.getDomainTerms('smsrStatus').then(function (o) {
                    return _.filter(o, function (item) {
                        return _.includes(isStatusOptions, item.identifier);
                    });
                });
            },
            noStatus: function () {
                return thesaurusService.getDomainTerms('smsrStatus').then(function (o) {
                    return _.filter(o, function (item) {
                        return _.includes(notStatusOptions, item.identifier);
                    });
                });
            },

            noPicStatus: function () {
                return thesaurusService.getDomainTerms('smsrNoPicStatus');
            },
            iplcType: function () {
                return thesaurusService.getDomainTerms('smsrIplcType');
            },
        });

        //==================================
        //
        //==================================
        $scope.getCleanDocument = function (document) {

            document = document || $scope.document;

            if (!document)
                return undefined;

            if (!$scope.isJurisdictionRegional(document))
                document.jurisdictionRegions = undefined;


            if (!document.hasIplc)
                document.iplcType = undefined;
            if (document.isSubjectToPic)
                document.noPicStatus = undefined;
            if (!document.isSubjectToPic)
                document.picMeasures = undefined;
            if (document.hasIplcRightEstablished)
                document.isIplcRightInPlan = undefined;
            if (document.hasStepsForIplcApproval) {
                document.isStepsForIplcApprovalInPlan = undefined;
            }
            if (!document.hasIplcRightEstablished) {
                document.iplcMeasures = undefined;
                document.otherIplcRelatedRecords = undefined;
                document.isIplcRightFullyImplemented = undefined;
            }
            if (!document.hasStepsForIplcApproval) {
                document.isStepsForIplcApprovalImplemented = undefined;
                document.iplcApprovalMeasures = undefined;
                document.otherIplcApprovalRecords = undefined;
            }

            var jurisdictionRegions = []
            if ($scope.jurisdictionRegions) {

                if (($scope.jurisdictionRegions.countries || []).length) {
                    jurisdictionRegions = $scope.jurisdictionRegions.countries;
                }
                if (($scope.jurisdictionRegions.regions || []).length) {
                    jurisdictionRegions = _.union(jurisdictionRegions, $scope.jurisdictionRegions.regions)
                }
                document.jurisdictionRegions = jurisdictionRegions;
            }
            if (!$scope.isJurisdictionRegional(document))
                document.jurisdictionRegions = undefined;

            if (/^\s*$/g.test(document.notes))
                document.notes = undefined;
            return $scope.sanitizeDocument(document);
        };



         $scope.setDocument({}).then(function (doc) {
             if(doc.jurisdictionRegions){
                 $q.when(thesaurusService.getDomainTerms('countries')).then(function(countries){
                     $scope.jurisdictionRegions.countries = _.filter(doc.jurisdictionRegions, function(country){
                         return _.find(countries, {identifier:country.identifier});
                     });
                     $scope.jurisdictionRegions.regions = _.filter(doc.jurisdictionRegions, function(region){
                         return !_.find(countries, {identifier:region.identifier});
                     });
                 });
             }
         });

        $scope.onBuildQuery = function(searchText, schema) {
            var queryOptions = {
                schemas : [schema],
                realm : realm.value,
                searchText : searchText,
            }
            return $scope.onBuildDocumentSelectorQuery( queryOptions );
        };
        // new functions 

        $scope.isSubnational = function () {
            return $scope.document?.jurisdiction?.identifier == "DEBB019D-8647-40EC-8AE5-10CA88572F6E"; 
        };

        //============================================================
        //
        //============================================================
        $scope.isCommunity = function () {
        return $scope.document?.jurisdiction?.identifier == "9627DF2B-FFAC-4F85-B075-AF783FF2A0B5";
        }; 

        $scope.isEu = function () {
            return ($scope.document?.government?.identifier == "eu" || $scope.document?.government?.identifier == "eur");
        }

    }
];
 


