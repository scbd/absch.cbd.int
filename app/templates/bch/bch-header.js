import app from 'app';
import html from 'text!./bch-header.html';
import _ from 'lodash';
import 'ng-breadcrumbs';
import 'services/main';
import 'components/scbd-angularjs-services/main';
import 'components/scbd-angularjs-controls/main'; ;

    app.directive('bchHeader', ['locale', '$location','breadcrumbs', 'commonjs', '$q',  function (locale, $location, breadcrumbs, commonjs, $q) {
        return {
            restrict: 'E',
            template: html,
            link: function($scope) {
                $scope.locale = locale
                $scope.breadcrumbs     = breadcrumbs;
                
                var sortField = 'name.'+(locale||'en');
                $q.when(commonjs.getCountries(sortField))
                .then(function(res){
                    $scope.countries = res;
                });

                $scope.isEnterPressed = function($event){
                    if($event === true || $event.which === 13){

                        $location.path('/search/nationalRecords').search({text : ($scope.searchQuery||'')})
                        $scope.searchQuery='';
                    }
                }

                $scope.countrySearch = function($event){
                    $event.stopPropagation()
                }

                $scope.filterBreadcrumbs = function(options){
                    return _.uniqBy(options, item => { return item.path; });
                }

                $scope.startsWith = function(item){
                   return !$scope.countrySearchQuery || _.startsWith(item.name[locale].toLowerCase(), $scope.countrySearchQuery.toLowerCase());
                }
            }
        };
    }]);

