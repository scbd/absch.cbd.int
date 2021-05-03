import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import 'views/forms/view/view-capacity-building-initiative.directive';
import 'views/forms/edit/organization-selector';
import 'services/main';

    export { default as template } from './edit-capacityBuildingInitiative.html';

  export default ["$scope", "$http", "$filter", "$q", "$routeParams", "$controller","$location", "realm","thesaurusService", "Thesaurus", "$timeout", function ($scope, $http, $filter, $q, $routeParams, $controller,$location, realm, thesaurusService, Thesaurus, $timeout) {

        $controller('editController', {$scope: $scope});
        $scope.isABS = realm.is('ABS');
        $scope.isBCH = realm.is('BCH');
        $scope.path = $location.path();
        $scope.countryRegions		= {};
    $timeout (function (){
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
           //regions	        : function() {return thesaurusService.getDomainTerms('regions').then(function(o){return _.sortBy(o, 'name' );})},
           regions	: function() {return thesaurusService.getDomainTerms('regions').then(Thesaurus.buildTree);},
           countries       : function() {return thesaurusService.getDomainTerms('countries').then(function(o){return _.sortBy(o, 'name' );})},
            fundingSources	: function() {return thesaurusService.getDomainTerms('cbiFundingsrc').then(function(o){return _.sortBy(o, 'name' );})},
            libraries       : function() {return thesaurusService.getDomainTerms('cbdLibraries').then(function(o){return _.sortBy(o, 'name' );})},
            languages       : function() {return thesaurusService.getDomainTerms('unLanguages').then(function(o){return _.sortBy(o, 'name' );})},
            // countryRegions	: function() {
            //     return $q.all([
            //       thesaurusService.getDomainTerms('regions'),
            //       thesaurusService.getDomainTerms('countries')
            //     ]).then(function(o) {
            //       var regions   = $filter("orderBy")(o[0], "name");
            //       var countries = $filter("orderBy")(o[1], "name");
            //       var countryRegions = _.union(regions, countries);
            //       return countryRegions;
            //     });
            //   },
          cbdSubjects : function() { return $http.get("/api/v2013/thesaurus/domains/CBD-SUBJECTS/terms", { cache: true }).then(function(o){
            var subjects = ['CBD-SUBJECT-BIOMES', 'CBD-SUBJECT-CROSS-CUTTING'];
            var items = [];
            _.forEach(subjects, function(subject) {
              var term = _.find(o.data, {'identifier': subject } );
              items.push(term);
              _(term.narrowerTerms).forEach(function (term) {
                items.push(_.find(o.data, {'identifier':term}));
              })
            });
            return items;
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
    }, 100 );

    $scope.isGlobalOrRegional = function () {
        if($scope.document && $scope.document.geographicScope){
            return _.includes(['56B8CEB7-56B5-436B-99D9-AA7C4622F326', 'C7D6719B-8AD9-4EB1-A472-B0B858DE0F56'], $scope.document.geographicScope.identifier);
        }
        return false;
    };

    $scope.isNational = function () {
        if($scope.document && $scope.document.geographicScope){
            return $scope.document.geographicScope.identifier == "20B2CC6D-646D-4FD5-BD53-D652BA3FA088";
        }
        return false;
    };
    //============================================================
    //
    //============================================================
    $scope.isSubnational = function () {
        if($scope.document && $scope.document.geographicScope){
            return $scope.document.geographicScope.identifier == "DEBB019D-8647-40EC-8AE5-10CA88572F6E";
        }
        return false;
    };



    //============================================================
    //
    //============================================================
    $scope.isCommunity = function () {
        if($scope.document && $scope.document.geographicScope){
            return $scope.document.geographicScope.identifier == "9627DF2B-FFAC-4F85-B075-AF783FF2A0B5";
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
    // $scope.clearDuration = function () {
    //   if($scope.document && ($scope.document.startDate || $scope.document.endDate))
    //   {
    //       $scope.document.startDate = undefined;
    //       $scope.document.endDate   = undefined;
    //   }
    // };

    // $scope.$watch("[document.startDate,document.endDate]", function () {
    //   $scope.document.durationPeriod = undefined;
    //   $scope.document.durationText = undefined;

    // });
    //============================================================
    //
    //============================================================
    $scope.clearDuration = function () {
        if($scope.document && $scope.document.duration)
            $scope.document.duration = undefined;
    };

        $scope.onBuildQuery = function(searchText, schema){
            var queryOptions = {
                realm     : realm.value,
                schemas	  : [schema],
                searchText: searchText
            }

            return $scope.onBuildDocumentSelectorQuery(queryOptions);
        }
          $scope.onContactQuery = function(searchText){
            var queryOptions = {
              realm     : realm.value,
              fieldQueries: ['schema_s:contact AND type_s:person'],
              searchText: searchText
            }

            return $scope.onBuildDocumentSelectorQuery(queryOptions);

        }

    $scope.isBroaderProjectSelect = function(projectProgramme){
      if(!projectProgramme){
        $scope.document.broaderProjects = undefined;
      }
    }

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
   

        if(_.isEmpty(document.geographicScope))
            document.geographicScope = undefined;
      if(!$scope.isGlobalOrRegional()) {
        delete $scope.countryRegions.regions;
      } else{
        document.geographicScope.customValue = undefined;
      }


      // if(_.isEmpty(document.geographicScope))
      //    document.geographicScope = undefined;
      // if(document.geographicScope && document.geographicScope.regionsOrCountries)
      //     delete document.geographicScope.regionsOrCountries;
        if(document.capacityBuildingsType && !document.capacityBuildingsType.isBroaderProjectPart)
            document.capacityBuildingsType.broaderProjectPart = undefined;

        if(document.status && !$scope.isProposedOrApproved()){
            document.durationPeriod = undefined;
            document.durationText = undefined;
        }
            
        if((document.durationText||'').trim() == '')
            document.durationText = undefined;
        
        if(!document.isProjectProgramme)
          document.broaderProjects = undefined;
        if(!document.isImplementedByAgencies || document.isImplementedByAgencies == undefined)
          document.implementingAgencies = undefined;
        if(!document.isExecutededByAgencies || document.isExecutededByAgencies == undefined)
          document.executingAgencies = undefined;
        if(!document.isCollaboratededByPartners || document.isCollaboratededByPartners == undefined)
          document.collaboratingPartners = undefined;

        if(document.type)
            delete document.type;
        if(document.duration)
            delete document.duration;
        if(document.typeInfo)
            delete document.typeInfo;
      var countryRegions = []
      if($scope.countryRegions){

        if(($scope.countryRegions.countries||[]).length){
          countryRegions = $scope.countryRegions.countries;
        }
        if(($scope.countryRegions.regions||[]).length){
          countryRegions = _.union(countryRegions, $scope.countryRegions.regions)
        }
        document.countryRegions = countryRegions;
      }
        return $scope.sanitizeDocument(document);
      };

    $scope.setCountryRegions = function(countryRegions){
      $q.when(thesaurusService.getDomainTerms('countries')).then(function(countries){
        $scope.countryRegions.countries = _.filter(countryRegions, function(country){
          return _.find(countries, {identifier:country.identifier});
        });
        $scope.countryRegions.regions = _.filter(countryRegions, function(region){
          return !_.find(countries, {identifier:region.identifier});
        });
      });
    }

    $scope.setDocument({}, true).then(function (doc) {
      if($scope.realm.is('ABS'))
        $scope.setDocument({aichiTargets: [{identifier: "AICHI-TARGET-16"}]}, true);
      if(doc.countryRegions){
        $scope.setCountryRegions(doc.countryRegions)
      }
      $scope.isSelfFunding();
    });
    // $scope.setDocument({}, true);
    // if($scope.realm.is('ABS'))
    //     $scope.setDocument({aichiTargets: [{identifier: "AICHI-TARGET-16"}]}, true);
    // if(document.countryRegions){
    //   $scope.setCountryRegions (document.countryRegions)
    // }
  }];

