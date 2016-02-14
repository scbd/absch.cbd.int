define(['text!./home-map.html',
  'app',
  'lodash',
  'text!./pin-popup-abs.html',
  'css!./home-map',
  'scbd-map/ammap3',
  'scbd-map/ammap3-service',
  './party-status.js',
], function(template, app, _, popoverTemplate) {
  'use strict';

  app.directive('homeMap', ['ammap3Service', function(ammap3Service) {
    return {
      restrict: 'E',
      template: template,
      replace: true,
      scope: {},
      require: 'homeMap',
      link: function($scope, $element, $attr, homeMapCrl) { // jshint ignore:line

        $scope.showTagLine = 1;
        homeMapCrl.loadCountries();

        ammap3Service.setGlobalClickListener('index-map',
          function() {
            ammap3Service.closePopovers('index-map'); // close pop overs when clicking water or anywhere

          });

        ammap3Service.setPinImage('index-map', 'invisi-pixel');
        ammap3Service.setPinPopOver('index-map', popoverTemplate);


        ammap3Service.setCountryClickListener('index-map',
          function(event) {

            ammap3Service.openCountryPopup('index-map', event.mapObject.id); //pin, popup,
        });
        //setTimeout(function(){homeMapCrl.playMovie();},5000);// time out wait for intial zoom



      }, //link

      //=======================================================================
      //
      //=======================================================================
      controller: ['$scope', '$http', 'realm', '$q', '$filter', 'commonjs','$timeout', function($scope, $http, realm, $q, $filter, commonjs,$timeout) {
          var reloadDetails = false;
          //====================================================
          function loadCountryMapDetails() {
            if ($scope.countries) {
              $scope.loading = true;
              var schema = ["absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database", "focalPoint"];
              var queryFacetsParameters = {

                'q': '(realm_ss:' + realm.value.toLowerCase() + ') AND NOT version_s:* AND (schema_s:' + schema.join(' OR schema_s:') + ')',
                'fl': '', //fields for results.
                'wt': 'json',
                'rows': 0, //limit
                'facet': true, //get counts back
                'facet.pivot': 'government_s,schema_s',
                'facet.limit': 512
              };
              var countryFacets = $http.get('/api/v2013/index/select', {
                params: queryFacetsParameters
              });
              $q.when(countryFacets).then(function(response) {
                  $scope.countryFacets = response.data.facet_counts.facet_pivot;

                  calculateListViewFacets();



                  ammap3Service.loadCountries('index-map', $scope.countries).then(function() {
                    setTimeout(function(){playMovie();},4000);
                  });
                })
                .then(function() {
                  $scope.loading = false;
                  reloadDetails = false;
                });

            }
          } //loadCountryMapDetails
          //====================================================
          function calculateListViewFacets() {

            _.each($scope.countries, function(country) {
              // country.NFP     = undefined;// country.NDB     = undefined;// country.CNA     = undefined;// country.MSR     = undefined;// country.IRCC    = undefined;// country.CP      = undefined;// country.CPC     = undefined;// country.Total     = undefined;
              var countryFacet = _.where($scope.countryFacets["government_s,schema_s"], {
                value: country.code.toLowerCase()
              });
              if (countryFacet.length > 0) {
                countryFacet[0].pivot.forEach(function(document) {
                  country[$filter("schemaShortName")(document.value.toLowerCase())] = document.count;
                  country.total = (country.total ? country.total : 0) + document.count;
                });
                country = normalizeCountryData(country);
              }

            });
            $timeout(function(){
              $scope.numParty=0;
              $scope.numNonParty=0;
              $scope.numRatified=0;
              $scope.numSignatory=0;
              _.each($scope.countries,function(country){
// console.log(country);
                if(country.isNPParty)
                  $scope.numParty++;
                else if(country.isNPRatified)
                  $scope.numRatified++;
                else if(country.isNPSignatory)
                  $scope.numSignatory++;
                else
                  $scope.numNonParty++;

              });
// console.log('$scope.numParty',$scope.numParty);
// console.log('$scope.numRatified',$scope.numRatified);
// console.log('$scope.numSignatory',$scope.numSignatory);
// console.log('$scope.numNonParty',$scope.numNonParty);
            });

          } //calculateListViewFacets

          //====================================================
          function loadCountries() {
            $scope.loading = true;

            return commonjs.getCountries().then(function(countries) {
                $scope.countries = countries;


              })
              .then(function() {
                loadCountryMapDetails();
                $scope.loading = false;
              });

          }
          //=======================================================================
          //// should be done in client
          //=======================================================================
          function normalizeCountryData(country) {
            if (!country.CNA)
              country.CNA = 0;

            if (!country.CP)
              country.CP = 0;

            if (!country.CPC)
              country.CPC = 0;

            if (!country.IRCC)
              country.IRCC = 0;

            if (!country.MSR)
              country.MSR = 0;

            if (!country.NDB)
              country.NDB = 0;

            if (!country.NFP)
              country.NFP = 0;

            if (country.isNPParty)
              country.status = '<span style="text-align:right;background-color: #428bca;" class="party-status" ng-if="isNPParty">Party</span>';
            else if (country.isNPSignatory)
              country.status = '<span style="text-align:right;background-color: #5bc0de;" class="party-status" ng-if="isNPRatified">Signatory</span>';
            else
              country.status = '<span style="text-align:right;background-color: #888888;" class="party-status" ng-if="isNPSignatory">Non Party</span>';
            return country;
          }

          //====================================================
          function playMovie() {
            var country = {};
            var intervalId;
            var count =0;
            country = ammap3Service.randomCountry('index-map');
            ammap3Service.clickMapObject('index-map', country);
            intervalId = setInterval(function() {
              if(count>=200)clearInterval(intervalId);
              country = ammap3Service.randomCountry('index-map');
              ammap3Service.clickMapObject('index-map', country);
              count++;
            }, 5000);
            ammap3Service.setGlobalClickListener('index-map', function() {
              if (intervalId)
                clearInterval(intervalId); // close pop overs when clicking water or anywhere
              intervalId = 0;
            });
            //ammap3Service.openCountryPopup('index-map',event.mapObject.id);
            //ammap3Service.clickMapObject('index-map',mapObject;
          }
          this.playMovie = playMovie;
          this.loadCountryMapDetails = loadCountryMapDetails;
          this.loadCountries = loadCountries;
        }] //controlerr
    }; //return
  }]); //directive
}); //define