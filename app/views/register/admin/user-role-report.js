define(['app', 'underscore', 'js/common', 'scbd-angularjs-controls', 'scbd-angularjs-services', 
'views/register/directives/register-top-menu', 'services/app-config-service',
], function (app, _) {

    "use strict";
    app.controller("adminUserRolesReportController", ["$scope", "$timeout", "realm", "commonjs", "$q", "appConfigService", "$http", "$filter", "$element",
        function ($scope, $timeout, realm, commonjs, $q, appConfigService, $http, $filter, $element) {
            $scope.filters = {};
            $scope.countries = {};

            var roleMapping = {};
            roleMapping['abs']={
                nfp : 1276,
                pa  : 1298,
                nau : 1294
            }
            roleMapping['abs-trg']={
                pa  : 1308,
                nau : 1310
            }
            roleMapping['abs-dev']={
                pa  : 1445,
                nau : 1443
            }
//
            $scope.options = {
                filterTypes: function () {
                    var types = [];
                    types.push({ 'identifier': 'have', 'name': 'that have' });
                    types.push({ 'identifier': 'morethenone', 'name': 'that have more then one' });
                    types.push({ 'identifier': 'not',  'name': 'that do not have' });
                    return types;
                },
                filterRoles: function () {
                    var types = [];
                    types.push({ 'identifier': 'nfp', 'name': 'National Focal Point' });
                    types.push({ 'identifier': 'pa', 'name': 'Publishing Authority' });
                    types.push({ 'identifier': 'nau', 'name': 'National Authorized User' });
                    return types;
                },
                filterPartyStatus: function () {
                    var status = [];
                    status.push({ 'identifier': 'all', 'name': 'All Countries' });
                    status.push({ 'identifier': 'party', 'name': 'Parties' });
                    status.push({ 'identifier': 'nonparty', 'name': 'Non-Parties' });

                    return status;
                }
            };
           
            function loadCountries(){
                $q.when(commonjs.getCountries())
                .then(function(data){
                    $scope.countries = data;
                    var eu = _.findWhere($scope.countries, {code: 'EU'});
                    if(eu)
                        eu.code = 'EUR';
                    
                    // _.map(data, function(country){
                    //     $scope.countries[country.code] = {
                    //         isNPParty : country.isNPParty, name:country.name, code:country.code
                    //     }
                    // })
                })
            }
            $scope.loadRecords = function(){
                $scope.userData = [];
                $scope.countriesToShow = [];
                $scope.totalCount = 0;
                var role = roleMapping[realm.value.toLowerCase()][$scope.filters.role];
                if(role){
                    $scope.loadingRecords = true;
                    $q.when($http.get('/api/v2013/users?role='+ role))
                    .then(function(result){
                        $scope.role = role;
                        $scope.userData = result.data;
                        var countries = [];

                        if($scope.filters.partyStatus == 'party')
                            countries = _.map(_.where($scope.countries, {isNPParty:true}), function(country){return country.code.toLowerCase()})
                        else if($scope.filters.partyStatus == 'nonparty')
                            countries = _.map(_.where($scope.countries, {isNPParty:false}), function(country){return country.code.toLowerCase()})
                        else 
                            countries = _.map($scope.countries, function(country){return country.code.toLowerCase()})

                        var userCountries = _.map(result.data, function(user){ if(!user.government)console.log(user); return user.government})
                        var countriesToShow=[];
                        if($scope.filters.filterType == 'have' || $scope.filters.filterType == 'morethenone'){
                            countriesToShow = _.intersection(countries, userCountries);;
                        }
                        else if($scope.filters.filterType == 'not'){                            
                            countriesToShow = _.difference(countries, userCountries);
                        }
                        mapCountries(countriesToShow);
                    })
                    .finally(function(){
                        $scope.loadingRecords=false;
                    })
                }
            }
            function mapCountries(countriesToShow){
                $scope.totalCount = 0;
                _.map(countriesToShow, function(code){
                    var countryUsers = _.where($scope.userData, {government:code})
                    if($scope.filters.filterType == 'morethenone' && countryUsers.length < 2)
                        return;
                    // if(countryUsers.length > 0){
                         $scope.totalCount += countryUsers.length;
                         var country = _.findWhere($scope.countries, {code:code.toUpperCase()})
                         $scope.countriesToShow.push({code:code, name: country.name, count:countryUsers.length, users : countryUsers})
                    // }
                    // else{
                    //     console.log(code);
                    // }
                 })   
            }
            $scope.getCountry = function(code){
                return _.findWhere($scope.countries, {code: code.toUpperCase()})
            }

            $scope.export = function(){
                var users = [];
                $scope.usersToExport = [];
                _.each($scope.countriesToShow, function(country){
                    _.each(country.users, function(user){
                        users.push({country: country.name, userName :user.firstName + ' ' + user.lastName, userEmail : user.email })
                    });
                })
                $scope.usersToExport = users;
                $scope.readyForExport = true;
                require(['tableexport'], function(){
                    $element.find('#forExport').tableExport({
                        formats: ["xlsx", "xls", "csv"],
                        filename: "ABSCH-Users-List",
                    });
                    $element.find('.xlsx').click();
                    $timeout(function(){                        
                        $scope.readyForExport = false;
                    }, 200)
                });  
            }


            loadCountries();
        }]);
});
