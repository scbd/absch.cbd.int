require("app").controller("CountriesController", ["$scope", "$http", function ($scope, $http) {



	//*******************************************************
	$scope.countries = $http.get('/api/v2013/countries', { cache: true }).then(function (response) {
        $scope.countries = response.data;
        $scope.ratifications = 0;
        $scope.signatures = 0;


        for (var i = 0; i < $scope.countries.length; i++) {
            if ($scope.countries[i].treaties.XXVII8b.instrument == "ratification" || $scope.countries[i].treaties.XXVII8b.instrument == "accession" ) {
                $scope.ratifications++;
            }
            if ($scope.countries[i].treaties.XXVII8b.signature != null ) {
                $scope.signatures++;
            }
        }

    });

    $scope.orderList = true;
   	$scope.sortTerm = 'treaties.XXVII8b.deposit';

   	 //==================================
   	 $scope.sortTable = function (term) {

   	     if ($scope.sortTerm == term) {
   	         $scope.orderList = !$scope.orderList;
   	     }
   	     else {
   	         $scope.sortTerm = term;
   	         $scope.orderList = true;
   	     }
   	 }




}]);
