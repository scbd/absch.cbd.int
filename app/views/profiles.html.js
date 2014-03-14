require("app").controller("ProfileController", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {

  $scope.code = $routeParams.code;

	//*******************************************************
	$http.get('/api/v2013/countries/'+ $scope.code, { cache: true }).then(function (response) {
        $scope.country = response.data;  
    });

	//*******************************************************
	$http.get('/api/v2013/index/select?cb=1394816088237&fl=id,identifier_s,title_t,description_t,url_ss,schema_EN_t,date_dt,government_EN_t,schema_s,number_d,aichiTarget_ss,reference_s,sender_s,meeting_ss,recipient_ss,symbol_s,eventCity_EN_t,eventCountry_EN_t,startDate_s,endDate_s,body_s,code_s,meeting_s,group_s,function_t,department_t,organization_t,summary_EN_t,reportType_EN_t,completion_EN_t,jurisdiction_EN_t,development_EN_t&q=realm_ss:absch+AND+schema_s:*+AND+((+schema_s:focalPoint+))+AND+((+government_s:'+ $scope.code.toLowerCase() +'+))+AND+(*:*)&rows=25&sort=createdDate_dt+desc,+title_t+asc&start=0&wt=json', { cache: true }).then(function (response) {
        $scope.absch_nfp = response.data;   
    });



    

}]);
