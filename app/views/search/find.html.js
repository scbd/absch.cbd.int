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
    '/app/views/directives/help-directive.html.js'],
     function (app,_) {

    app.controller('FindController', ['$scope', '$rootScope', '$http', '$timeout', '$q','realm', '$routeParams','$location','$element','commonjs','$mdSidenav', '$mdUtil', '$mdMedia',
        function ($scope, $rootScope, $http, $timeout, $q, realm, $routeParams,$location, $element, commonjs, $mdSidenav, $mdUtil, $mdMedia) {

            $scope.showHelp = {'show':true,'hasHelp':true, showTour:false};
            $scope.toggleLeft = buildToggler('left');
            $scope.toggleRight = buildToggler('right');
            //**********************************************************
            $scope.close = function () {
                  $mdSidenav('left').close()
                    .then(function () {
                      $log.debug("close LEFT is done");
                    });
                };

            //**********************************************************
            function buildToggler(navID) {
              var debounceFn =  $mdUtil.debounce(function(){
                    $mdSidenav(navID)
                      .toggle()
                      .then(function () {
                        $log.debug("toggle " + navID + " is done");
                      });
                  },300);
              return debounceFn;
            }



        $scope.startTour=false;

        if($routeParams.tour)
        {
            $scope.startTour=true;
            $location.search("tour", null);
        }



        var self = this;
        var queryCanceler = null;
        var refreshTimeout = null;

        

        // $scope.loaded          = false;
        $scope.itemsPerPage    = 25;
        $scope.documentCount   = 0;
        $scope.currentPage     = 0;

        $scope.querySchema     = '*:*';
        $scope.queryGovernment = '*:*';
        // $scope.queryTargets    = '*:*';
        $scope.queryTheme      = '*:*';
        $scope.queryRegion      = '*:*';
        // $scope.queryDate       = '*:*';
        $scope.queryKeywords   = '*:*';
        $scope.displayDetails = false;
        $scope.countryResultFilter = [];
        $scope.queryPartyStatus = '';

        $scope.sortBy = '';
        $scope.sortOptions = [
        { label: 'Date Published', value: 'createdDate_dt', },
        { label: 'Title', value: 'title_t', },
        { label: 'Country', value: 'government_EN_T', },
        ];
        $scope.sortResults = function() {
          console.log('sort by: ', $scope.sortBy);
          query();
        };

        $scope.rawDocs = [];



        //============================================================
        //
        //
        //============================================================
        function readFacets2(solrArray) {

            var facets = [];
            if(solrArray){
                for (var i = 0; i < solrArray.length; i += 2) {

                    var facet = solrArray[i];

                    facets.push({ symbol: facet, title: facet, count: solrArray[i + 1] });
                }
            }

               // console.log(solrArray);
            return facets;
        };

        //============================================================
        //
        //
        //============================================================
    	function query () {

            var schema = [ "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database", "resource",
                           "meeting", "notification","pressRelease","statement" ,"focalPoint", "news", "modelContractualClause"]

            var q = '(realm_ss:' + realm.value.toLowerCase() + ' or realm_ss:absch) AND NOT version_s:*';
            //' AND ' + $scope.querySchema + ' AND ' + $scope.queryGovernment + ' AND ' + $scope.queryTheme + ' AND ' + $scope.queryTargets +' AND ' + $scope.queryDate + ' AND ' + $scope.queryKeywords;

            var keywordQuery = '';

            if($scope.keyword){
                q += keywordQuery = ' AND (title_t:*' + $scope.keyword + '* OR description_t:*' + $scope.keyword + '* OR text_EN_txt:*' + $scope.keyword + '* OR uniqueIdentifier_s:*' + $scope.keyword.toLowerCase() + '*)';
            }

            if($scope.querySchema != "*:*" ){
                q += ' AND (' + $scope.querySchema + ')';
            }
            else
            {
                 q += ' AND (schema_s:(' + schema.join(' ') + '))';
                 //console.log(q);
            }
            if($scope.queryGovernment) q += ' AND (' + $scope.queryGovernment + ')';
            if($scope.queryTheme)      q += ' AND (' + $scope.queryTheme + ')';
              //console.log('region: ', q);
            if($scope.queryRegion)      q += ' AND (' + $scope.queryRegion + ')';
            if($scope.queryPartyStatus) q += ' AND (' + $scope.queryPartyStatus + ')';
            var orderByFields;

            if(!$scope.orderBy)
                orderByFields = 'createdDate_dt desc';
            else
                orderByFields = $scope.orderBy;

            var queryParameters
            if($scope.previewType == 'list'){
                $scope.rawDocs = undefined;
                queryParameters = {
                    'q': q,
                    'sort': orderByFields,
                    'fl': 'id,identifier_s,title_t,createdDate_dt,description_t,url_ss,schema_EN_t,date_dt,government_EN_t,schema_s,number_d,aichiTarget_ss,reference_s,sender_s,meeting_ss,recipient_ss,symbol_s,eventCity_EN_t,eventCountry_EN_t,startDate_s,endDate_s,body_s,code_s,meeting_s,group_s,function_t,department_t,organization_t,summary_EN_t,reportType_EN_t,completion_EN_t,jurisdiction_EN_t,development_EN_t,' +
                            'government_s,publicationYear_is,resourceTypes_CEN_ss,regions_CEN_ss,languages_CEN_ss,absResposibleForAll_b,absJurisdiction_EN_t,jurisdiction_CEN_s,geneticResourceTypes_CEN_ss,thematicAreas_CEN_ss,usage_CEN_ss,keywords_CEN_ss,informAllAuthorities_b,originCountries_CEN_ss,orgperson_s,status_EN_t,type_EN_t,endDate_dt,startDate_dt,amendmentIntent_i,' +
                            'resourceLinksLanguage_ss,type_ss,ownerGovernment_s',
                    'wt': 'json',
                    'start': $scope.currentPage * $scope.itemsPerPage,
                    'rows': $scope.itemsPerPage,
                    //'cb': new Date().getTime()
                };
            }
            else if($scope.previewType == 'group'){
                queryParameters = {
                    'q': q + ' AND government_s:*',
                    'sort': 'government_EN_t asc, createdDate_dt desc, title_t asc',
                    'fl': 'id,identifier_s,title_t,description_t,url_ss,schema_EN_t,date_dt,government_s,government_EN_t,schema_s,summary_EN_t,jurisdiction_EN_t, type_ss, uniqueIdentifier_s,ownerGovernment_s',
                    'wt': 'json',
                    'start': $scope.currentPage * $scope.itemsPerPage,
                    'rows': $scope.itemsPerPage,
                    'group': true,
                    'group.ngroups' : true,
                    'group.field': 'government_s',
                    'group.limit': 1000,
                    'group.sort': 'government_EN_t asc'
                };
            }

            if($scope.sortBy)
              queryParameters.sort = $scope.sortBy + ' desc, ' + queryParameters.sort;

            if (queryCanceler) {
                console.log('trying to abort pending request...');
                queryCanceler.resolve(true);
            }

            queryCanceler = $q.defer();
            $http.get('/api/v2013/index/select', { params: queryParameters, timeout: queryCanceler }).success(function (data) {

                queryCanceler = null;


                 if($scope.previewType=='list'){
                    $scope.rawDocs = data.response.docs;
                    $scope.documentCount   = data.response.numFound;
                 }
                 else {
                     var lRawDocs = [];
                     if($scope.rawDocs && $scope.currentPage!=0)
                        lRawDocs = _.clone($scope.rawDocs);
                        
                    _.map(lRawDocs, function(doc){doc.newRecord = false;});
                    
                    data.grouped.government_s.groups.forEach(function(doc){                    
                                doc.newRecord = true;
                                lRawDocs.push(doc);
                    });
                    $scope.rawDocs = lRawDocs;
                    $scope.documentCount = data.grouped.government_s.ngroups;
                 }

                if(!$scope.schemas) {
                    var queryFacetsParameters = {
                        'q': '(realm_ss:' + realm.value.toLowerCase() + ' or realm_ss:absch) AND NOT version_s:* AND (schema_s:(' + schema.join(' ') + '))',
                        'fl': '', 		//fields for results.
                        'wt': 'json',
                        'rows': 0,		//limit
                        'facet': true,	//get counts back
                        'facet.field': ['schema_s', 'government_s', 'aichiTarget_REL_ss', 'thematicAreas_ss', 'government_REL_ss'],
                        'facet.limit': 512
                    };

                    $http.get('/api/v2013/index/select', { params: queryFacetsParameters }).success(function (data) {

                        $scope.schemas = readFacets2(data.facet_counts.facet_fields.schema_s);
                        $scope.governments = readFacets2(data.facet_counts.facet_fields.government_s);
                        $scope.regions = readFacets2(data.facet_counts.facet_fields.government_ss);
                        $scope.aichiTargets = readFacets2(data.facet_counts.facet_fields.aichiTarget_REL_ss);
                        $scope.thematicAreas = readFacets2(data.facet_counts.facet_fields.thematicAreas_ss);
                        $scope.regionFacets = readFacets2(data.facet_counts.facet_fields.government_REL_ss);
                        //console.log(data.facet_counts.facet_fields);
                        //console.log($scope.thematicAreas);

                    }).error(function (error) { console.log('onerror'); console.log(error); } );
                }
            }).error(function (error) { console.log('onerror'); console.log(error); });
        };

        //============================================================
        //
        //
        //============================================================
        $scope.fixHtml = function (htmlText) {
            htmlText = (htmlText || "").replace(/\r\n/g, '<br>')
            htmlText = (htmlText || "").replace(/href="\//g, 'href="http://www.cbd.int/')
            htmlText = (htmlText || "").replace(/href='\//g, "href='http://www.cbd.int/");

            var qHtml = $('<div/>').html(htmlText);

            qHtml.find("script,style").remove();

            return qHtml.html();

        };

        //============================================================
        //
        //
        //============================================================

        $scope.fixUrl = function (url) {
            if(url) {
                     if(url.indexOf( "http://absch.cbd.int/")==0) url = url.substr("http://absch.cbd.int".length);
                else if(url.indexOf("https://absch.cbd.int/")==0) url = url.substr("https://absch.cbd.int".length);
            }

            return url;
        }
        //============================================================
        //
        //
        //============================================================
        $scope.clearFilter = function(){

            $scope.keyword = "";
            $scope.queryPartyStatus = "";
            $scope.partyStatusString = undefined;
            $scope.$broadcast("clearFilter",{});
        }

        //============================================================
        //
        //
        //============================================================
        function refresh() {

            if(refreshTimeout)
                $timeout.cancel(refreshTimeout);

            refreshTimeout = $timeout(function () { query(); }, 200);
        }

        $scope.$watch('currentPage',     function() { refresh() });
        $scope.$watch('querySchema',     function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('queryGovernment', function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('queryTargets',    function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('queryTheme',      function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('queryRegion',     function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('queryDate',       function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('keyword',         function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('orderBy',         function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('previewType',     function(newValue, oldValue) {
            if(newValue && oldValue){
                $scope.rawDocs = undefined;
                $scope.documentCount = 0;

                if($scope.currentPage>0)
                    $scope.currentPage=0;
                else
                    refresh();
            }
        });
        $scope.previewType = 'group';

        $scope.updatePreviewType = function(type){
            $scope.previewType=type;
            $scope.rawDocs = undefined;
        }

        $scope.$on('externalFilter', function(evt, data){
            $timeout(function(){
                if(data.type == 'country'){
                    if(data.operation=='add' && _.indexOf($scope.countryResultFilter, data.value)==-1)
                        $scope.countryResultFilter.push(data.value);
                    else if(data.operation=='remove' && _.indexOf($scope.countryResultFilter, data.value)>=0)
                        $scope.countryResultFilter.splice(_.indexOf($scope.countryResultFilter, data.value), 1);
                }
                else if(data.type == 'keyword'){
                    $scope.keyword = data.value;
                }
            },100);
            //console.log(data,    $scope.keyword );
        })

        $element.find('[data-toggle="tooltip"]').tooltip()
        var isMenuVisisble = true;
        $('#toggleMenu').click(function() {
            isMenuVisisble = !isMenuVisisble;

            $( "#leftMenu" ).toggle( "slide" );
            if(!isMenuVisisble){
                $('#search-results').removeClass('col-xs-9');
                //$('#search-results').addClass('col-xs-12');
            }
            else {
                //$('#search-results').removeClass('col-xs-12');
                $('#search-results').addClass('col-xs-9');
            }
        });

        $scope.queryStatus = function(type){

            commonjs.getCountries()
            .then(function(data){
                $scope.partyStatusString = undefined;
                var npParties

                if(type=='party' || type == 'nonParty'){

                    if(type=='party'){
                        npParties = _.where(data, {isNPParty:true});
                        $scope.partiesCount = npParties.length;
                        $scope.partyStatusString = 'Party to the Nagoya Protocol';
                    }
                    else {
                        npParties = _.where(data, {isNPParty:false});
                        $scope.nonPartiesCount = npParties.length;
                        $scope.partyStatusString = 'Non-Party';
                    }
                    $scope.queryPartyStatus =
                                        ('government_s:(' +
                                        _.pluck(npParties, 'code') +
                                        ')').toLowerCase().replace(/,/g, ' ');
                }
                else {
                    $scope.queryPartyStatus = '';
                }
                $scope.currentPage=0; refresh();
            });
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
    }]);

});
