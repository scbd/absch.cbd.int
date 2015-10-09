define(['app','underscore','/app/js/common.js',
    'introjs','scbd-angularjs-services', 'scbd-angularjs-filters', 'scbd-angularjs-controls',
    '/app/views/forms/view/record-loader.directive.html.js',
    '/app/views/search/find_schemas.partial.html.js',
    '/app/views/search/find_countries.partial.html.js',
    '/app/views/search/search-filter-regions.js',
    '/app/views/search/find_facets.partial.html.js',
    '/app/views/search/find_themes.partial.html.js',
    '/app/views/directives/search-filter-dates.partial.html.js',
    '/app/views/directives/document-list.partial.html.js', 'bootstrap-datepicker','moment',
    '/app/views/directives/help-directive.html.js',
    '/app/views/search/search-directives/search-directive.html.js',
    '/app/views/search/search-directives/national-records-filter-directive.html.js',
    '/app/views/countries/country-map-list-directive.html.js', '/app/services/search-service.js'],
     function (app,_) {

    app.controller('FindController', ['$scope', '$rootScope','showHelp' ,'$http', '$timeout', '$q','realm', '$routeParams',
        '$location','$element','commonjs','$mdSidenav', '$mdUtil', '$mdMedia', 'searchService',
        function ($scope, $rootScope,showHelp, $http, $timeout, $q, realm, $routeParams,$location,
            $element, commonjs, $mdSidenav, $mdUtil, $mdMedia, searchService) {

        var self = this;
        var queryCanceler = null;
        var refreshTimeout = null;

        $scope.orderReferenceBy = "title_s acs";
        $scope.itemsPerPage    = 25;
        $scope.documentCount   = 0;
        $scope.currentPage     = 0;

        $scope.querySchema     = '*:*';
        $scope.queryGovernment = '*:*';
        $scope.queryTheme      = '*:*';
        $scope.queryRegion      = '*:*';
        $scope.queryKeywords   = '*:*';
        $scope.displayDetails = false;
        $scope.countryResultFilter = [];
        $scope.queryPartyStatus = '';

        $scope.previewType = 'group';
        $scope.sortBy = '';
        $scope.rawDocs = [];

        //============================================================
        //
        //
        //============================================================
        $scope.clearFilter = function(){

            $scope.keyword = "";
            $scope.queryPartyStatus = "";
            $scope.partyStatusString = undefined;
            $scope.queryGovernment = undefined;
            $scope.queryRegion = undefined;
            $scope.queryThem = undefined;
            $scope.$broadcast("clearFilter",{});
        }
        $scope.$watch('currentPage',     function() {
            refresh();
        });
        $scope.$watch('querySchema',     function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('queryGovernment', function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('queryTargets',    function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('queryTheme',      function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('queryRegion',     function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('queryDate',       function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('keyword',         function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('orderReferenceBy',function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('previewType',     function(newValue, oldValue) {
            if(newValue && oldValue && $scope.rawDocs){
                $scope.rawDocs = undefined;
                $scope.documentCount = 0;

                if($scope.currentPage>0){
                    $scope.clearFilter();
                    $scope.currentPage=0;
                }
                else
                    refresh();
            }
        });

        $scope.updatePreviewType = function(type){
            $scope.previewType=type;
            $scope.rawDocs = undefined;
            $scope.clearFilter();
        }

        $scope.removeFilter = function(filter){
            $scope.$broadcast('removeFilter',{data:filter});
        }
        $scope.removeCountryFilter = function(filter){
            $scope.countryApi.unSelectItem(filter.code);
        }
        $scope.removeRegionFilter = function(filter){
            $scope.regionsApi.unSelectItem(filter.identifier);
        }
        $scope.removeThematicAreaFilter = function(filter){
            $scope.thematicAreaApi.unSelectItem(filter.identifier);
        }

        //============================================================
        //
        //
        //============================================================
    	function query () {
            if($scope.recordType =='country')
                return;

            if(!$scope.recordType)
                $scope.recordType = 'national';

            if (queryCanceler) {
                console.log('trying to abort pending request...');
                queryCanceler.resolve(true);
            }

            var q = '(realm_ss:' + realm.value.toLowerCase() + ') AND NOT version_s:*';
            q += '(' + $scope.querySchema + ')';

            if($scope.queryGovernment){
                // if($scope.queryGovernment.indexOf("government_s:eur") < 0)
                $scope.queryGovernment = $scope.queryGovernment.replace("government_s:eu", "government_s:eur");
                q += ' AND (' + $scope.queryGovernment + ')';
            }
            if($scope.queryTheme)      q += ' AND (' + $scope.queryTheme + ')';
            if($scope.queryRegion)      q += ' AND (' + $scope.queryRegion + ')';
            if($scope.queryPartyStatus) q += ' AND (' + $scope.queryPartyStatus + ')';

            var orderByFields='createdDate_dt desc';

            if($scope.recordType == 'reference'){
                orderByFields = $scope.orderReferenceBy;
            }

            var searchOperation;
            queryCanceler = $q.defer();

            if($scope.previewType == 'list' || $scope.recordType == 'reference'){
                $scope.rawDocs = undefined;
                var listQuery = {
                    query: q,
                    sort: orderByFields,
                    fields      : 'id,identifier_s,title_t,createdDate_dt,description_t,url_ss,schema_EN_t,date_dt,government_EN_t,schema_s,number_d,aichiTarget_ss,reference_s,sender_s,meeting_ss,recipient_ss,symbol_s,eventCity_EN_t,eventCountry_EN_t,startDate_s,endDate_s,body_s,code_s,meeting_s,group_s,function_t,department_t,organization_t,summary_EN_t,reportType_EN_t,completion_EN_t,jurisdiction_EN_t,development_EN_t,' +
                                  'government_s,publicationYear_is,resourceTypes_CEN_ss,regions_CEN_ss,languages_CEN_ss,absResposibleForAll_b,absJurisdiction_EN_t,jurisdiction_CEN_s,geneticResourceTypes_CEN_ss,thematicAreas_CEN_ss,usage_CEN_ss,keywords_CEN_ss,informAllAuthorities_b,originCountries_CEN_ss,orgperson_s,status_EN_t,type_EN_t,endDate_dt,startDate_dt,amendmentIntent_i,' +
                                  'resourceLinksLanguage_ss,type_ss,ownerGovernment_s',
                    currentPage : $scope.currentPage,
                    itemsPerPage: $scope.itemsPerPage
                };
                searchOperation = searchService.list(listQuery, queryCanceler);
            }
            else if($scope.previewType == 'group'){
                if($scope.currentPage==0)
                    $scope.rawDocs = undefined;
                var groupQuery = {
                    query       : q + ' AND government_s:*',
                    sort        : 'government_EN_t asc, createdDate_dt desc, title_t asc',
                    fields      : 'id,identifier_s,title_t,description_t,url_ss,schema_EN_t,date_dt,government_s,government_EN_t,schema_s,summary_EN_t,jurisdiction_EN_t,type_ss,uniqueIdentifier_s,ownerGovernment_s,type_EN_t,status_EN_t',
                    groupField  : 'government_s',
                    groupSort   : 'government_EN_t asc',
                    currentPage : $scope.currentPage,
                    itemsPerPage: $scope.itemsPerPage
                };
                searchOperation = searchService.group(groupQuery, queryCanceler);
            }

            $q.when(searchOperation)
              .then(function (data) {
                queryCanceler = null;
                 if($scope.previewType=='list'|| $scope.recordType == 'reference'){
                    $scope.rawDocs = data.data.response.docs;
                    $scope.documentCount   = data.data.response.numFound;
                 }
                 else {
                     var lRawDocs = [];
                     if($scope.rawDocs && $scope.currentPage!=0)
                        lRawDocs = _.clone($scope.rawDocs);

                    _.map(lRawDocs, function(doc){doc.newRecord = false;});

                    data.data.grouped.government_s.groups.forEach(function(doc){
                                doc.newRecord = true;
                                lRawDocs.push(doc);
                    });
                    $scope.rawDocs = lRawDocs;
                    $scope.documentCount = data.data.grouped.government_s.ngroups;
                 }

                if(!$scope.schemas) {
                    var schemas = [ "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database","focalPoint",
                                    "resource", "meeting", "notification","pressRelease","statement" , "news", "modelContractualClause"];

                    var facetQuery = {
                        query  : '(realm_ss:' + realm.value.toLowerCase() + ') AND NOT version_s:* AND (schema_s:(' +
                                 schemas.join(' ') + '))',
                        fields : ['schema_s', 'government_s', 'thematicAreas_ss', 'government_REL_ss']
                    };
                    searchService.facets(facetQuery)
                        .then(function(data){
                                $scope.schemas = data.schema_s;
                                $scope.governments = data.government_s;
                                $scope.thematicAreas = data.thematicAreas_ss;
                                $scope.regionFacets = data.government_REL_ss;
                        });
                }
            }).catch(function (error) {
                    console.log('onerror'); console.log(error);
            });
        };

        //============================================================
        //
        //
        //============================================================
        function refresh() {

            if(refreshTimeout)
                $timeout.cancel(refreshTimeout);

            refreshTimeout = $timeout(function () { query(); }, 200);
        }




    }]);

});
