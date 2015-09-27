define(['app','/app/js/common.js','moment',
    // '/app/views/forms/view/record-loader.directive.html.js',
    // '/app/views/directives/document-list.partial.html.js',
    '/app/views/directives/home-country-dashboard-directive.html.js'], function (app) {
    app.controller('IndexController', ['$scope', '$http', '$window', '$cookies','realm', '$filter','$rootScope','commonjs',
    function ($scope, $http, $window, $cookies, realm, $filter, $rootScope, commonjs) {

    	$scope.email = null;
    	$scope.password = null;
        $scope.show_feed_content= false;


        //  $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent('http://absch.tumblr.com/rss')).success(function (data) {
        //         $scope.feeds=data.responseData.feed.entries;
        //     });

        $http.get("/api/v2013/index/select?fl=id,identifier_s,title_t,description_t,url_ss,schema_EN_t,date_dt,government_EN_t,schema_s,number_d,aichiTarget_ss,reference_s,sender_s,meeting_ss,recipient_ss,symbol_s,eventCity_EN_t,eventCountry_EN_t,startDate_s,endDate_s,body_s,code_s,meeting_s,group_s,function_t,department_t,organization_t,summary_EN_t,reportType_EN_t,completion_EN_t,jurisdiction_EN_t,development_EN_t&q=(realm_ss:" + realm.value + ")+AND+schema_s:*+AND+((+schema_s:meeting+))+AND+(*:*)+AND+(*:*)&rows=4&sort=createdDate_dt+desc,+title_t+asc&start=0&wt=json")
        .then(function (result) {
                $scope.meetings = result.data;
        });
        $scope.locale = 'en';
        //var today= moment();
        var today= moment();
        var entry= moment("2014-10-12");
        //$scope.Math = window.Math;
        //$scope.daysUntilEntry = $scope.Math.floor(entry.diff(today, 'milliseconds', true)/86400000);
        $scope.entryintoforce = today.diff(entry, 'hours', true) >= 0 ? true:false;
        //scope.daysSinceEntry = 
   
        $scope.yearsSinceEntry = today.diff(entry, 'years', true);
        var years = Math.floor($scope.yearsSinceEntry);
        
        var monthsYears = entry;
        if(years > 1){
            monthsYears = entry.add( years-1, 'year');
            $scope.monthsSinceEntry = today.diff(monthsYears, 'month', true) - entry.diff(monthsYears, 'month', true); 
        }
        else{
            $scope.monthsSinceEntry = today.diff(monthsYears, 'month', true) ; 
        }
        var months = Math.floor($scope.monthsSinceEntry);
        monthsYears = monthsYears.add(months, 'month');
        $scope.daysSinceEntry = today.diff(monthsYears, 'days', true);
        var days = Math.round($scope.daysSinceEntry) ;

        $scope.yearsSinceEntry = years;
        $scope.monthsSinceEntry = months;
        $scope.daysSinceEntry = days;
    	//============================================================
    	//
    	//
    	//============================================================
    	$scope.doSignIn = function doSignIn () {

    		$scope.errorInvalid = false;
            $scope.errorTimeout = false;
            $scope.waiting      = true;

            //

            var credentials = { 'email': $scope.email, 'password': $scope.password };

            $http.post('/api/v2013/authentication/token', credentials).then(function onsuccess(success) {

    			$cookies.authenticationToken = success.data.authenticationToken;
                $cookies.email = $scope.rememberMe ? $scope.email : undefined;

                var response = { type: 'setAuthenticationToken', authenticationToken: $cookies.authenticationToken, setAuthenticationEmail: $cookies.email };

            	var authenticationFrame = angular.element(document.querySelector('#authenticationFrame'))[0];
                authenticationFrame.contentWindow.postMessage(JSON.stringify(response), 'https://accounts.cbd.int');

            	$window.location.href = $window.location.href;

            }, function onerror(error) {

            	$scope.password     = "";
                $scope.errorInvalid = error.status == 403;
                $scope.errorTimeout = error.status != 403;
                $scope.waiting      = false;
            });
    	}



        //============================================================
        //
        //
        //============================================================
    	function query () {

            var schema = [ "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database"]

            var q = '(realm_ss:' + realm.value.toLowerCase() + ' or realm_ss:absch) AND NOT version_s:*';
            var schemaQuery = ' AND (schema_s:' + schema.join(' OR schema_s:') + ')';
            var queryParameters = {
                'q': q + schemaQuery,
                'sort': 'createdDate_dt desc, title_t asc',
                'fl': 'id,identifier_s,title_t,createdDate_dt,description_t,url_ss,schema_EN_t,date_dt,government_EN_t,schema_s,number_d,aichiTarget_ss,reference_s,sender_s,meeting_ss,recipient_ss,symbol_s,eventCity_EN_t,eventCountry_EN_t,startDate_s,endDate_s,body_s,code_s,meeting_s,group_s,function_t,department_t,organization_t,summary_EN_t,reportType_EN_t,completion_EN_t,jurisdiction_EN_t,development_EN_t,' +
                        'government_s,publicationYear_is,resourceTypes_CEN_ss,regions_CEN_ss,languages_CEN_ss,absResposibleForAll_b,jurisdiction_CEN_s,geneticResourceTypes_CEN_ss,usage_CEN_ss,keywords_CEN_ss,informAllAuthorities_b,originCountries_CEN_ss,orgperson_s,status_EN_t,type_EN_t,endDate_dt,startDate_dt,amendmentIntent_i,' +
                        'resourceLinksLanguage_ss,',
                'wt': 'json',
                'start': 0,
                'rows': 10,
                //'cb': new Date().getTime()
            };
            var nationalRecordsParam = queryParameters.q + schemaQuery

            $http.get('/api/v2013/index/select', { params: queryParameters})
                 .success(function (data) {
                    $scope.rawNationalDocs = data.response.docs;
                }).error(function(error){$scope.rawNationalDocs=[]});

            schemaQuery = ' AND (schema_s:news)';
            var referenceRecordsParam = angular.copy(queryParameters);
            referenceRecordsParam.q = q + schemaQuery
            $http.get('/api/v2013/index/select', { params: referenceRecordsParam})
                 .success(function (data) {
                    $scope.rawRefDocs_News = data.response.docs;
                }).error(function(error){$scope.rawRefDocs_News=[]});
                
            schemaQuery = ' AND (schema_s:meeting)';
            var meetingQueryParameters = {
                'q': q + schemaQuery,
                'fq': 'startDate_dt:[NOW TO *]',
                'sort': 'startDate_dt asc',
                'fl': 'id,identifier_s,title_t,createdDate_dt,description_t,url_ss,schema_EN_t,date_dt,government_EN_t,schema_s,number_d,aichiTarget_ss,reference_s,sender_s,meeting_ss,recipient_ss,symbol_s,eventCity_EN_t,eventCountry_EN_t,startDate_s,endDate_s,body_s,code_s,meeting_s,group_s,function_t,department_t,organization_t,summary_EN_t,reportType_EN_t,completion_EN_t,jurisdiction_EN_t,development_EN_t,' +
                        'government_s,publicationYear_is,resourceTypes_CEN_ss,regions_CEN_ss,languages_CEN_ss,absResposibleForAll_b,jurisdiction_CEN_s,geneticResourceTypes_CEN_ss,usage_CEN_ss,keywords_CEN_ss,informAllAuthorities_b,originCountries_CEN_ss,orgperson_s,status_EN_t,type_EN_t,endDate_dt,startDate_dt,amendmentIntent_i,' +
                        'resourceLinksLanguage_ss,',
                'wt': 'json',
                'start': 0,
                'rows': 10,
                //'cb': new Date().getTime()
            };
            meetingQueryParameters.q = q + schemaQuery
            $http.get('/api/v2013/index/select', { params: meetingQueryParameters})
                 .success(function (data) {
                    $scope.rawRefDocs_Meeting = data.response.docs;
                }).error(function(error){$scope.rawRefDocs_Meeting=[]});
                
      
            schemaQuery = ' AND (schema_s:notification)';
            var referenceRecordsParam = angular.copy(queryParameters);
            referenceRecordsParam.q = q + schemaQuery
            $http.get('/api/v2013/index/select', { params: referenceRecordsParam})
                 .success(function (data) {
                    $scope.rawRefDocs_Notification = data.response.docs;
                }).error(function(error){$scope.rawRefDocs_Notification=[]});
                
        };
        query()

        $scope.getResourceType = function(type){

            if(type && type.length>0){
                return JSON.parse((type[0])).en;
            }

        }
          $scope.getDocumentId = function(document) {
              if ((document.schema_s == 'absPermit' || document.schema_s == 'absCheckpoint' ||
                    document.schema_s == 'absCheckpointCommunique' || document.schema_s == 'authority' ||
                    document.schema_s == 'measure' || document.schema_s == 'database' ||
                    document.schema_s == 'resource')){
                return $filter("uniqueIDWithoutRevision")(document);
              }
              else {
                  return commonjs.hexToInteger(document.id || document.identifier_s);
              }
          }

    }]);
});
