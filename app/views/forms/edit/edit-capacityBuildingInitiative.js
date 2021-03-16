import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import '.views/forms/edit/view/view-capacity-building-initiative.directive';
import 'views/forms/edit/organization-selector';
import 'services/main';

    export { default as template } from './edit-capacityBuildingInitiative.html';

  export default ["$scope", "$http", "$filter", "$q", "$routeParams", "$controller","$location", "realm","thesaurusService", function ($scope, $http, $filter, $q, $routeParams, $controller,$location, realm, thesaurusService) {

        $controller('editController', {$scope: $scope});
        $scope.isABS = realm.is('ABS');
        $scope.isBCH = realm.is('BCH');
        $scope.path = $location.path();

        _.extend($scope.options, {
           
            activityScope   : function() {return thesaurusService.getDomainTerms('cbiCpbTypes');},
            targetGroups    : function() {return thesaurusService.getDomainTerms('cbiAudience');},
            geographicScope : function() {return thesaurusService.getDomainTerms('jurisdictions');},
            aichiTargets    : function() {return thesaurusService.getDomainTerms('aichiTargets');},
            absKeyAreas     : function() {return thesaurusService.getDomainTerms('keyAreas');},
            status          : function() {return thesaurusService.getDomainTerms('cbiStatus');},
            cbiTypes        : function() {return thesaurusService.getDomainTerms('cbiTypes');},
            absCategories   : function() {return thesaurusService.getDomainTerms('cbiCats');},
            bchCategories   : function() {return thesaurusService.getDomainTerms('categories', {other:true, otherType:'lstring'});},
            bchTargetGroups : function() {return thesaurusService.getDomainTerms('mainTargetGroups', {other:true, otherType:'lstring'});},
            cpbThematicAreas: function() {return thesaurusService.getDomainTerms('cpbThematicAreas', {other:true, otherType:'lstring'});},
            regions	        : function() {return thesaurusService.getDomainTerms('regions').then(function(o){return _.sortBy(o, 'name' );})},
            countries       : function() {return thesaurusService.getDomainTerms('countries').then(function(o){return _.sortBy(o, 'name' );})},
            fundingSources	: function() {return thesaurusService.getDomainTerms('cbiFundingsrc').then(function(o){return _.sortBy(o, 'name' );})},
            libraries       : function() {return thesaurusService.getDomainTerms('cbdLibraries').then(function(o){return _.sortBy(o, 'name' );})},
            languages       : function() {return thesaurusService.getDomainTerms('unLanguages').then(function(o){return _.sortBy(o, 'name' );})},
            countryRegions	: function() {
                return $q.all([
                  thesaurusService.getDomainTerms('regions'),
                  thesaurusService.getDomainTerms('countries')
                ]).then(function(o) {
                  var regions   = $filter("orderBy")(o[0], "name");
                  var countries = $filter("orderBy")(o[1], "name");
                  var countryRegions = _.union(regions, countries);
                  return countryRegions;
                });
              },           
            // need to verify, where we are using this or any other future use ?
            // chmregions: function() { return $q.all([thesaurusService.getDomainTerms('countries'), thesaurusService.getDomainTerms('geographicRegions')])
            //     .then(function(data) {
            //         return Enumerable.from($filter('orderBy')(data[0], 'title.en')).union(
            //             Enumerable.from($filter('orderBy')(data[1], 'title.en'))).toArray();
            //     });
            // },
        });
    $scope.isGlobalOrRegional = function () {
        if($scope.document && $scope.document.geographicScope && $scope.document.geographicScope.scope){
            return _.includes(['56B8CEB7-56B5-436B-99D9-AA7C4622F326', 'C7D6719B-8AD9-4EB1-A472-B0B858DE0F56'], $scope.document.geographicScope.scope.identifier);
        }
        return false;
    };

    $scope.isNational = function () {
        if($scope.document && $scope.document.geographicScope && $scope.document.geographicScope.scope){
            return $scope.document.geographicScope.scope.identifier == "20B2CC6D-646D-4FD5-BD53-D652BA3FA088";
        }
        return false;
    };
    //============================================================
    //
    //============================================================
    $scope.isSubnational = function () {
        if($scope.document && $scope.document.geographicScope && $scope.document.geographicScope.scope){
            return $scope.document.geographicScope.scope.identifier == "DEBB019D-8647-40EC-8AE5-10CA88572F6E";
        }
        return false;
    };



    //============================================================
    //
    //============================================================
    $scope.isCommunity = function () {
        if($scope.document && $scope.document.geographicScope && $scope.document.geographicScope.scope){
            return $scope.document.geographicScope.scope.identifier == "9627DF2B-FFAC-4F85-B075-AF783FF2A0B5";
        }
        return false;
    };

    //============================================================
    //
    //============================================================
    $scope.isPartofBroaderInitiative = function () {
        if($scope.document && $scope.document.type){
            return $scope.document.type.identifier == "8E66C5C7-194C-4A27-9218-26ED003E6D30";
        }
        return false;
    };

    //============================================================
    //
    //============================================================
    $scope.isSelfFunding = function () {
        if($scope.document && $scope.document.fundingSourceTypes){
            return !_.isEmpty(_.filter($scope.document.fundingSourceTypes, { identifier: "AFDE8912-E398-4194-95BA-FE488DCC891A"}));
        }
        return false;
    };

    $scope.isProposedOrApproved = function(){

        if($scope.document && $scope.document.status)
            return _.includes(['73E2AC27-D964-487C-A4E6-0997BB27AF01','851B10ED-AE62-4F28-B178-6D40389CC8DB'], $scope.document.status.identifier)
        return false;
    }

    //============================================================
    //
    //============================================================
    $scope.clearDates = function () {
        if($scope.document && ($scope.document.startDate || $scope.document.endDate))
        {
            $scope.document.startDate = undefined;
            $scope.document.endDate   = undefined;
        }
    };

    //============================================================
    //
    //============================================================
    $scope.clearDuration = function () {
        if($scope.document && $scope.document.duration)
            $scope.document.duration = undefined;
    };

    // $scope.$watch('document.geographicScope.scope', function(newVal){
    //     if(!$scope.document)
    //         return;
    //     if($scope.isGlobalOrRegional() && $scope.isNational())
    //         return;
    //     if(!$scope.isGlobalOrRegional())
    //         $scope.geographicalRegions = undefined;
    //     if(!$scope.isNational())
    //         $scope.geographicalCountries = undefined;
    // })

    //==================================
    //
    //==================================
    $scope.getCleanDocument = function(document) {

        document = document || $scope.document;

        if (!document)
          return undefined;

        if (/^\s*$/g.test(document.notes))
          document.notes = undefined;

        if(!document.geographicScope)
            document.geographicScope = {};
        if(!$scope.isGlobalOrRegional())
            delete document.geographicScope.regions;
        if(!$scope.isGlobalOrRegional() && !$scope.isNational() && !$scope.isCommunity())
            delete document.geographicScope.countries;

        if(_.isEmpty(document.geographicScope))
            document.geographicScope = undefined;

        if(document.capacityBuildingsType && !document.capacityBuildingsType.isBroaderProjectPart)
            document.capacityBuildingsType.broaderProjectPart = undefined;

        if(document.status && !$scope.isProposedOrApproved()){
            document.durationPeriod = undefined;
            document.durationText = undefined;
        }
            
        if((document.durationText||'').trim() == '')
            document.durationText = undefined;
        

        if(document.type)
            delete document.type;
        if(document.duration)
            delete document.duration;
        if(document.geographicScope && document.geographicScope.regionsOrCountries)
            delete document.geographicScope.regionsOrCountries;
        if(document.typeInfo)
            delete document.typeInfo;
            
        return $scope.sanitizeDocument(document);
      };

    $scope.setDocument({}, true);
    if($scope.realm.is('ABS'))
        $scope.setDocument({aichiTargets: [{identifier: "AICHI-TARGET-16"}]}, true);

  }];

