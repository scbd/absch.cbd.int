import app from '~/app';
import '~/views/countries/country-profile-directive';
import '~/views/directives/block-region-directive';
import '~/services/main';
import '~/components/scbd-angularjs-services/main';
import 'ng-breadcrumbs';
import 'css!https://cdn.cbd.int/flag-icon-css@3.0.0/css/flag-icon.min.css';
import countryProfileT from '~/app-text/views/countries/country-profile.json';

  export { default as template } from './country-profile.html';

  export default ["$scope","$route", "$sce", "$timeout", "IStorage","locale", 'commonjs', '$q', 'breadcrumbs', '$element', '$compile', 'realm', 'ngMeta','searchService', 'translationService',
    function($scope,$route, $sce, $timeout, IStorage, locale, commonjs, $q, breadcrumbs, $element, $compile, realm, ngMeta,searchService, translationService) {
      translationService.set('countryProfileT', countryProfileT);
      $scope.code      = $route.current.params.code;
      $scope.isBCH     = realm.is('BCH');
      $scope.isABS     = realm.is('ABS');
      $scope.locale    = locale;

      $q.when(commonjs.getCountry($scope.code.toUpperCase()))
      .then(function(country){ 
          $scope.country = country;
          $scope.country.code = $scope.country.code.toLowerCase();
          $scope.country.name = $scope.country.name[locale];
          $scope.country.cssClass='flag-icon-'+$scope.country.code;
          breadcrumbs.options = { 'country_name': $scope.country.name };

          ngMeta.resetMeta();  
          var title = $scope.country.name + ' | Country Profile';
          var url   = realm.baseURL + '/' + locale  + '/countries/' + $scope.country.code.toUpperCase()
          ngMeta.setTitle(title);
          // ngMeta.setTag('description', summary || window.scbdApp.title);
          ngMeta.setTag('canonical', $sce.trustAsResourceUrl(url));
          loadCountryProfile($scope.country.code);

      });
      
      function loadCountryProfile(code){

        var searchQuery = $scope.exportQuery = {
            fields  : 'identifier_s',
            query   : 'schema_s:countryProfile AND government_s:' + code 
        };

        searchService.list(searchQuery)
        .then(function(result){   
          if(result.data.response.docs.length){
            IStorage.documents.get(result.data.response.docs[0].identifier_s)
            .then(function (document) {
              $scope.countryProfile = document.data;
            });
          }
        });
      } 

      if($scope.code.toUpperCase() == 'GB')
            $timeout(function(){$element.find('[data-bs-toggle="tooltip"]').tooltip()}, 300); 
      
      if($scope.$root.deviceSize !== 'sm' && $scope.$root.deviceSize !== 'xs'){
        $scope.loadingMap = true;
        angular.element(document).ready(async function () {
            await import('~/views/countries/country-map')
            $scope.$apply(function(){
                var mapElement = $element.find('#Jumbotron');
                $compile(mapElement.append('<country-map  hide-title="1" zoom-to="{{code}}" ></country-map>'))($scope);
                $scope.loadingMap = false;                    
            });
        });
      }

    }
  ];

