
require('app').controller('FindController', ['$scope', '$rootScope', '$http', '$timeout', '$q', function ($scope, $rootScope, $http, $timeout, $q) {
    
    var self = this;
    var queryCanceler = null;
    var refreshTimeout = null;

    // this.xhr = null;

    // var iconMap = {
    //     'focalPoint'            : 'icon-user',
    //     'notification'          : 'icon-envelope',
    //     'pressRelease'          : 'icon-bullhorn',
    //     'statement'             : 'icon-microphone',
    //     'announcement'          : 'icon-rss',
    //     'event'                 : 'icon-calendar',
    //     'organization'          : 'icon-building',
    //     'resource'              : 'icon-book',
    //     'aichiTarget'           : 'icon-flag',
    //     'strategicPlanIndicator': 'icon-signal',
    //     'marineEbsa'            : 'icon-map-marker',
    //     'meeting'               : 'icon-calendar',
    //     'meetingDocument'       : 'icon-file',
    //     'decision'              : 'icon-legal',
    //     'recommendation'        : 'icon-legal',
    //     'nationalReport'        : 'icon-quote-left',
    //     'nationalTarget'        : 'icon-flag',
    //     'nationalIndicator'     : 'icon-signal',
    //     'progressAssessment'    : 'icon-eye-open',
    //     'implementationActivity': 'icon-retweet',
    //     'nationalSupportTool'   : 'icon-wrench'
    // };

    // $scope.icon = function (schema) {
    //     return iconMap[schema];
    // }

    // $scope.actionSetPage = function (pageNumber) {
    //     $scope.currentPage = Math.min($scope.pageCount-1, Math.max(0, pageNumber));
    // };

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

    $scope.load = function(item) {
      item.data = {'schema':item.schema, 'url_ss': item.url_ss, 'data': item};
        $http.get("/api/v2013/documents/"+item.identifier_s).then(function (result) {  
            item.data = result.data;

            $http.get("/api/v2013/documents/"+item.identifier_s + "?info").then(function (result) {  
                item.data.info = result.data;
            });

        });

    }


    // if($location.search().q) {
    //     $scope.keywords = $location.search().q;
    //     $location.replace();
    //     $location.search({});
    // }

    // $scope.fixHtml = function (htmlText) {
    //     htmlText = (htmlText || "").replace(/\r\n/g, '<br>')
    // 	htmlText = (htmlText || "").replace(/href="\//g, 'href="http://www.cbd.int/')
    // 	htmlText = (htmlText || "").replace(/href='\//g, "href='http://www.cbd.int/");

    // 	var qHtml = $('<div/>').html(htmlText);

    // 	qHtml.find("script,style").remove();

    // 	return qHtml.html();
    // };

    // $scope.fixUrl = function (url) {
    //     if(url) {
    //              if(url.indexOf( "http://chm.cbd.int/")==0) url = url.substr("http://chm.cbd.int".length);
    //         else if(url.indexOf("https://chm.cbd.int/")==0) url = url.substr("https://chm.cbd.int".length);
    //     }

    //     return url;
    // }


    // function readFacets(solrArray) {

    //     var facets = [];

    //     for (var i = 0; i < solrArray.length; i += 2) {

    //         var facet = JSON.parse(solrArray[i]);

    //         facets.push({ symbol: facet.symbol, title: facet.en, count: solrArray[i + 1] });
    //     }

    //     return facets;
    // };         


    function readFacets2(solrArray) {

        var facets = [];

        for (var i = 0; i < solrArray.length; i += 2) {

            var facet = solrArray[i];

            facets.push({ symbol: facet, title: facet, count: solrArray[i + 1] });
        }

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
            'fl': 'id,identifier_s,title_t,description_t,url_ss,schema_EN_t,date_dt,government_EN_t,schema_s,number_d,aichiTarget_ss,reference_s,sender_s,meeting_ss,recipient_ss,symbol_s,eventCity_EN_t,eventCountry_EN_t,startDate_s,endDate_s,body_s,code_s,meeting_s,group_s,function_t,department_t,organization_t,summary_EN_t,reportType_EN_t,completion_EN_t,jurisdiction_EN_t,development_EN_t',
            'wt': 'json',
            'start': $scope.currentPage * $scope.itemsPerPage,
            'rows': $scope.itemsPerPage,
            'cb': new Date().getTime()
        };
        
       // console.log ( $scope.paginatioQuery);
       //  console.log ( queryParameters);
       // $.merge(queryParameters, $scope.paginatioQuery);
        
console.log(q);

        if (queryCanceler) {
            console.log('trying to abort pending request...');
            queryCanceler.resolve(true);
        }

        queryCanceler = $q.defer();

        $http.get('/api/v2013/index/select', { params: queryParameters, timeout: queryCanceler }).success(function (data) {
           
            queryCanceler = null;

            // $scope.count     = data.response.numFound;
            // $scope.start     = data.response.start;
            // $scope.stop      = data.response.start+data.response.docs.length-1;
            // $scope.rows      = data.response.docs.length;
            // $scope.documents = [];
            
             $scope.rawDocs = [];
             $scope.rawDocs = data.response.docs;
             $scope.documentCount   = data.response.numFound;
            // data.response.docs.forEach(function (document) {
            // 	$scope.documents.push(transformDocument(document));
            // });

            

            if(!$scope.schemas) {
                var queryFacetsParameters = {
                    'q': 'realm_ss:absch',
                    'fl': '',
                    'wt': 'json',
                    'rows': 0,
                    'facet': true,
                    'facet.field': ['schema_REL_ss', 'government_REL_ss', 'aichiTarget_REL_ss', 'thematicArea_REL_ss'],
                    'facet.limit': 512
                };

                $http.get('/api/v2013/index/select', { params: queryFacetsParameters }).success(function (data) {
console.log(data);
                    $scope.schemas = readFacets2(data.facet_counts.facet_fields.schema_REL_ss);
                    $scope.governments = readFacets2(data.facet_counts.facet_fields.government_REL_ss);
                    $scope.regions = readFacets2(data.facet_counts.facet_fields.government_REL_ss);
                    $scope.aichiTargets = readFacets2(data.facet_counts.facet_fields.aichiTarget_REL_ss);
                    $scope.thematicAreas = readFacets2(data.facet_counts.facet_fields.thematicArea_REL_ss);

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

    //============================================================
    //
    //
    //============================================================
    // $scope.actionSetPage = function (pageNumber) {
    //     $scope.currentPage = Math.min($scope.pageCount-1, Math.max(0, pageNumber));
    // };

    //============================================================
    //
    // temp
    //============================================================
    // $scope.range = function (start, end) {

    //     var ret = [];
    //     if (!end) {
    //         end = start;
    //         start = 0;
    //     }

    //     var maxCount = 10;
    //     var middle = 5;
    //     var count = end - start;
        
    //     if (count > maxCount) {
    //         if ($scope.currentPage > middle)
    //             start = $scope.currentPage - middle;

    //         end = Math.min(count, start + maxCount);
    //         start = Math.max(0, end - maxCount);
    //     }
        
    //     for (var i = start; i < end; i++) {
    //         ret.push(i);
    //     }
    //     return ret;
    // };

    $scope.$watch('currentPage',     refresh);
    $scope.$watch('querySchema',     function() { $scope.currentPage=0; refresh(); });
    $scope.$watch('queryGovernment', function() { $scope.currentPage=0; refresh(); });
    $scope.$watch('queryTargets',    function() { $scope.currentPage=0; refresh(); });
    $scope.$watch('queryTheme',      function() { $scope.currentPage=0; refresh(); });
    $scope.$watch('queryDate',       function() { $scope.currentPage=0; refresh(); });
    $scope.$watch('keyword',         function() { $scope.currentPage=0; refresh(); });    

}]);
