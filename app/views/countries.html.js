define(['app',  'directives/angucomplete-extended'], function (app,angucomplete) {

    app.controller("CountriesController", ["$scope", "$http", function ($scope, $http) {

    	//*******************************************************
    	$scope.countries = $http.get('/api/v2013/countries', { cache: true }).then(function (response) {
            $scope.selected_circle="party";
            $scope.countries = response.data;
            $scope.ratifications = 0;
            $scope.signatures = 0;

            $scope.parties = 0;
            $scope.countriesforAutocomplete = [];

            for (var i = 0; i < $scope.countries.length; i++) {

                $scope.countries[i].isParty = true;
                if ($scope.countries[i].treaties.XXVII8b.instrument == "ratification"
                	|| $scope.countries[i].treaties.XXVII8b.instrument == "accession"
                	|| $scope.countries[i].treaties.XXVII8b.instrument == "acceptance"
                  || $scope.countries[i].treaties.XXVII8b.instrument == "approval"
                  || $scope.countries[i].code == 'EU') {
                    $scope.ratifications++;
                    $scope.countries[i].isRatified = true;
                    if($scope.countries[i].code == 'EU')
                      $scope.countries[i].code = 'EUR'; //temp fix for EU
                }
                if ($scope.countries[i].treaties.XXVII8b.signature != null ) {
                    $scope.signatures++;
                    $scope.countries[i].isSignatory = true
                }
                if($scope.countries[i].treaties.XXVII8.party != null){
                  $scope.parties++;
                }
                 $scope.countriesforAutocomplete.push({name:$scope.countries[i].name.en});
            }
            //deduct EU count
            //$scope.ratifications--;
        });

        var today= moment();
        var entry= moment("20141012", "YYYYMMDD");
        $scope.Math = window.Math;
        $scope.daysUntilEntry = $scope.Math.floor(entry.diff(today, 'milliseconds', true)/86400000);

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

         $scope.isPartyToCBD= function(entity){
            $scope.selected_circle="party";
            return entity && entity.treaties.XXVII8.party != null;
         }

         $scope.isSignatory = function(entity){
            $scope.selected_circle="signatory";
            return entity && entity.treaties.XXVII8b.signature != null;
         }

         $scope.isRatified= function(entity){
            $scope.selected_circle="ratified";
            return entity && (entity.treaties.XXVII8b.instrument == "ratification" ||
                              entity.treaties.XXVII8b.instrument == "accession" ||
                              entity.treaties.XXVII8b.instrument == "acceptance"
                              || entity.treaties.XXVII8b.instrument == "approval" );
         }

    }]);
// });
});
