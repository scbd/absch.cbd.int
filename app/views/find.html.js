define(['app',
    '../views/find.html.js',
    '../js/directives/forms/form-controls.js',
    '../views/forms/view/record-loader.directive.html.js',
    '../views/find_schemas.partial.html.js',
    '../views/find_countries.partial.html.js',
    '../views/find_facets.partial.html.js',
    '../views/find_themes.partial.html.js',    
    '../views/directives/search-filter-dates.partial.html.js',
    '../views/directives/document-list.partial.html.js'], function (app) {

    app.controller('FindController', ['$scope', '$rootScope', '$http', '$timeout', '$q', function ($scope, $rootScope, $http, $timeout, $q) {
        
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
        // $scope.queryDate       = '*:*';
        $scope.queryKeywords   = '*:*';
        $scope.displayDetails = false;
        $scope.rawDocs = [];


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

            var q = 'realm_ss:absch';//' AND ' + $scope.querySchema + ' AND ' + $scope.queryGovernment + ' AND ' + $scope.queryTheme + ' AND ' + $scope.queryTargets +' AND ' + $scope.queryDate + ' AND ' + $scope.queryKeywords;

            if($scope.keyword)         q += ' AND (title_t:' + $scope.keyword + '* OR description_t:' + $scope.keyword + '* OR text_EN_txt:' + $scope.keyword + '*)';
            
            
            if($scope.querySchema != "*:*" ){            
                q += ' AND (' + $scope.querySchema + ')';
            }
            else
            {
                 q += ' AND schema_s:*';
            }
            if($scope.queryGovernment) q += ' AND (' + $scope.queryGovernment + ')';
            if($scope.queryTheme)      q += ' AND (' + $scope.queryTheme + ')';

            var queryParameters = {
                'q': q,
                'sort': 'createdDate_dt desc, title_t asc',
                'fl': 'id,identifier_s,title_t,createdDate_dt,description_t,url_ss,schema_EN_t,date_dt,government_EN_t,schema_s,number_d,aichiTarget_ss,reference_s,sender_s,meeting_ss,recipient_ss,symbol_s,eventCity_EN_t,eventCountry_EN_t,startDate_s,endDate_s,body_s,code_s,meeting_s,group_s,function_t,department_t,organization_t,summary_EN_t,reportType_EN_t,completion_EN_t,jurisdiction_EN_t,development_EN_t,' +
                        'publicationYear_is,resourceTypes_CEN_ss,regions_CEN_ss,languages_CEN_ss,responsibleForAll_b,jurisdiction_CEN_s,geneticResourceTypes_CEN_ss,usage_CEN_ss,keywords_CEN_ss,informAllAuthorities_b,originCountries_CEN_ss',
                'wt': 'json',
                'start': $scope.currentPage * $scope.itemsPerPage,
                'rows': $scope.itemsPerPage,
                'cb': new Date().getTime()
            };
           
            if (queryCanceler) {
                console.log('trying to abort pending request...');
                queryCanceler.resolve(true);
            }

            queryCanceler = $q.defer();

            $http.get('/api/v2013/index/select', { params: queryParameters, timeout: queryCanceler }).success(function (data) {
               
                queryCanceler = null;

                 $scope.rawDocs = [];
                 $scope.rawDocs = data.response.docs;
                 $scope.documentCount   = data.response.numFound;
                

                if(!$scope.schemas) {
                    var queryFacetsParameters = {
                        'q': 'realm_ss:absch',
                        'fl': '',
                        'wt': 'json',
                        'rows': 0,
                        'facet': true,
                        'facet.field': ['schema_s', 'government_s', 'aichiTarget_REL_ss', 'thematicArea_s'],
                        'facet.limit': 512
                    };

                    $http.get('/api/v2013/index/select', { params: queryFacetsParameters }).success(function (data) {

                        $scope.schemas = readFacets2(data.facet_counts.facet_fields.schema_s);
                        $scope.governments = readFacets2(data.facet_counts.facet_fields.government_s);
                        $scope.regions = readFacets2(data.facet_counts.facet_fields.government_ss);
                        $scope.aichiTargets = readFacets2(data.facet_counts.facet_fields.aichiTarget_REL_ss);
                        $scope.thematicAreas = readFacets2(data.facet_counts.facet_fields.thematicArea_s);
                        console.log(data.facet_counts.facet_fields);
                        console.log(queryFacetsParameters);

                    }).error(function (error) { console.log('onerror'); console.log(error); } );
                }
            }).error(function (error) { console.log('onerror'); console.log(error); });
        };

        $scope.fixHtml = function (htmlText) {
            htmlText = (htmlText || "").replace(/\r\n/g, '<br>')
            htmlText = (htmlText || "").replace(/href="\//g, 'href="http://www.cbd.int/')
            htmlText = (htmlText || "").replace(/href='\//g, "href='http://www.cbd.int/");

            var qHtml = $('<div/>').html(htmlText);

            qHtml.find("script,style").remove();

            return qHtml.html();
        };

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
        function refresh() {

            if(refreshTimeout)
                $timeout.cancel(refreshTimeout);

            refreshTimeout = $timeout(function () { query(); }, 200);
        }
        

        $scope.$watch('currentPage',     refresh);
        $scope.$watch('querySchema',     function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('queryGovernment', function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('queryTargets',    function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('queryTheme',      function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('queryDate',       function() { $scope.currentPage=0; refresh(); });
        $scope.$watch('keyword',         function() { $scope.currentPage=0; refresh(); });    

    }]);

});