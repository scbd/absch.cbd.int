define(['app','./directives/login.directive.html.js'], function (app) {
    app.controller('IndexController', ['$scope', '$http', '$window', '$cookies',  function ($scope, $http, $window, $cookies) {

    	$scope.email = null;
    	$scope.password = null;
        $scope.show_feed_content= false;


         $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent('http://absch.tumblr.com/rss')).success(function (data) {
                $scope.feeds=data.responseData.feed.entries;
            });

        $http.get("/api/v2013/index/select?cb=1394824945962&fl=id,identifier_s,title_t,description_t,url_ss,schema_EN_t,date_dt,government_EN_t,schema_s,number_d,aichiTarget_ss,reference_s,sender_s,meeting_ss,recipient_ss,symbol_s,eventCity_EN_t,eventCountry_EN_t,startDate_s,endDate_s,body_s,code_s,meeting_s,group_s,function_t,department_t,organization_t,summary_EN_t,reportType_EN_t,completion_EN_t,jurisdiction_EN_t,development_EN_t&q=realm_ss:absch+AND+schema_s:*+AND+((+schema_s:meeting+))+AND+(*:*)+AND+(*:*)&rows=4&sort=createdDate_dt+desc,+title_t+asc&start=0&wt=json").then(function (result) {  
                $scope.meetings = result.data;
        });


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

       

    }]);
});
