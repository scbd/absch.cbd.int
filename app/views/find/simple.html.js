define(['app',  'directives/angucomplete-extended', 'jqvmap', 'jqvmapworld'], function (app,angucomplete, jqv, jqvmap) {

    app.controller("SimpleSearchController", ["$scope", "authHttp","underscore","$q","$filter","$timeout", "$location","realm","$routeParams",
     function ($scope, $http, _, $q,$filter,$timeout, $location, realm, $routeParams) {


    	//*******************************************************
        var queryFacetsParameters = {
            //realm_ss:absch OR realm_ss:ABS)
                    'q': '(realm_ss:' + realm.value.toLowerCase() + ' or realm_ss:absch) AND NOT version_s:*',
                    'fl': '', 		//fields for results.
                    'wt': 'json',
                    'rows': 0,		//limit
                    'facet': true,	//get counts back
                    'facet.pivot': 'government_s,schema_s',
                    'facet.limit':512
                };
    	var countryFacets = $http.get('/api/v2013/index/select', { params: queryFacetsParameters })
        var countries = $http.get('/api/v2013/countries');
        var countryColors = {};
        $q.all([countryFacets, countries]).then(function (response) {

            $scope.countryFacets = response[0].data.facet_counts.facet_pivot;
            $scope.countries = response[1].data;

            $scope.selected_circle="party";
            $scope.ratifications = 0;
            $scope.signatures = 0;
            $scope.showMap = true;
            $scope.parties = 0;
            $scope.countriesforAutocomplete = [];
            $scope.inbetweenParties = 0;

            for (var i = 0; i < $scope.countries.length; i++) {

                if ($scope.countries[i].treaties.XXVII8b.instrument == "ratification"
                	|| $scope.countries[i].treaties.XXVII8b.instrument == "accession"
                	|| $scope.countries[i].treaties.XXVII8b.instrument == "acceptance"
                  || $scope.countries[i].treaties.XXVII8b.instrument == "approval"
                  || $scope.countries[i].code == 'EU') {
                    $scope.ratifications++;
                    $scope.countries[i].isRatified = true;
                    if($scope.countries[i].code == 'EU')
                      $scope.countries[i].code = 'EUR'; //temp fix for EU
                    countryColors[$scope.countries[i].code.toUpperCase()] = "#428bca";
                }
                if ($scope.countries[i].treaties.XXVII8b.signature != null ) {
                    $scope.signatures++;
                    $scope.countries[i].isSignatory = true;
                    if(!countryColors[$scope.countries[i].code.toUpperCase()])
                        countryColors[$scope.countries[i].code.toUpperCase()] = "#5bc0de";
                }
                if($scope.countries[i].treaties.XXVII8.party != null){
                  $scope.parties++;
                  $scope.countries[i].isParty = true;
                  if(!countryColors[$scope.countries[i].code.toUpperCase()])
                      countryColors[$scope.countries[i].code.toUpperCase()] = "#808080";
                }

                if($scope.countries[i].isParty)
                    $scope.countriesforAutocomplete.push({name:$scope.countries[i].name.en});

                    // console.log(moment().diff(moment($scope.countries[i].treaties.XXVII8b.deposit),'days'))
                if(moment().diff(moment($scope.countries[i].treaties.XXVII8b.deposit),'days')<90){
                    $scope.countries[i].inbetweenParties = true;
                    $scope.inbetweenParties++;
                }
                //
            }

            countryColors[taiwan] = "#808080";
            countryColors[greenland] = "#428bca";

             loadMap(countryColors);
             $scope.slideMap('#mapDiv','#listDiv');
             CalculateFacets();
            //  console.log($routeParams.commonFormat)
            if($routeParams.commonFormat)
            {
                $scope.searchFilter=$scope.isRatified;
                $scope.updateMap('ratified');
            }
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

         $scope.isInbetweenParties= function(entity){
            $scope.selected_circle="inbetweenParties";
            return entity && entity.inbetweenParties;
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

         $scope.hasFacets= function(entity){
            // console.log($scope.commonFormatFacets,$scope.selected_facet);

             for(var i=0; i<$scope.commonFormatFacets.length;i++){
                 var data = $scope.commonFormatFacets[i];

                 if(data[0] == $scope.selected_facet){
                     //console.log(data[1].countries,(entity.code.toLowerCase()));
                     return data[1].countries.indexOf(entity.code.toLowerCase())>=0
                }
             }

            return false;
         }






        $scope.isSelected = function(facet){

            //
            return facet == $scope.selected_facet;
        }


        function CalculateFacets(){
            var tempFacets = {};
            console.log($scope.countryFacets['government_s,schema_s'].length)
            var count =0;
            _.each($scope.countryFacets['government_s,schema_s'], function(data){
                if(!data.pivot)
                    count++
                _.each(data.pivot, function(facets){

                    //if(facets.value == 'focalPoint')
                        // console.log((tempFacets[facets.value] ? tempFacets[facets.value].facetCount : 0) + facets.count);
                    tempFacets[facets.value] = {"facetCount" : (tempFacets[facets.value] ? tempFacets[facets.value].facetCount : 0) + facets.count,
                                                "countryCount" : (tempFacets[facets.value] ? tempFacets[facets.value].countryCount : 0) + 1,
                                                "countries" : (tempFacets[facets.value] ? tempFacets[facets.value].countries : '') + data.value + ','};
                });

            });
            console.log(count)
            $scope.commonFormatFacets = _.pairs(tempFacets);
            // console.log($scope.commonFormatFacets)
        }





    }]);
// });
});
