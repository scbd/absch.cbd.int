define(['app', 'underscore', 'js/common', 'components/scbd-angularjs-controls/form-control-directives/all-controls', 'components/scbd-angularjs-services/services/main', 
'views/register/directives/register-top-menu', 'services/app-config-service',
], function (app, _) {

    "use strict";
    app.controller("adminUserRolesReportController", ["$scope", "$timeout", "realm", "commonjs", "$q", "appConfigService", "$http", "$filter", "$element",
        function ($scope, $timeout, realm, commonjs, $q, appConfigService, $http, $filter, $element) {
            $scope.sortByField = 'name.en'
            $scope.reverse = false;
            $scope.filters      = {};
            $scope.countries    = {};
            var regions         = [];            
            var roleMapping     = {};
            
            roleMapping['abs']={
                nfp : 1276,
                pa  : 1298,
                nau : 1294,
                iac : 1295
            }
            roleMapping['abs-trg']={
                pa  : 1308,
                nau : 1310,
                iac : 1309
            }
            roleMapping['abs-dev']={
                pa  : 1445,
                nau : 1443,
                iac : 1442
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
                    types.push({ 'identifier': 'iac', 'name': 'ABS-CH IAC' });
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
           
            function loadCountryAndRegions(){
                $q.when(commonjs.getCountries())
                .then(function(data){
                    $scope.countries = data;
                    var eu = _.findWhere($scope.countries, {code: 'EU'});
                    if(eu)
                        eu.code = 'EUR';
                })
                $q.when($http.get('/api/v2013/thesaurus/domains/regions/terms?relations=true', {cache:true}))
                .then(function(response){
                    var cbdRegions = [
                        "D50FE62D-8A5E-4407-83F8-AFCAAF708EA4", // CBD Regional Groups - Africa
                        "5E5B7AA4-2420-4147-825B-0820F7EC5A4B", // CBD Regional Groups - Asia and the Pacific
                        "942E40CA-4C23-4D3A-A0B4-736CD0EFCD54", // CBD Regional Groups - Central and Eastern Europe
                        "3D0CCC9A-A0A1-4399-8FA2-41D4D649DB0E", // CBD Regional Groups - Latin America and the Caribbean
                        "0EC2E5AE-25F3-4D3A-B71F-8019BB62ED4B"  // CBD Regional Groups - Western Europe and Others
                    ];
                    regions = _.map(cbdRegions, function(region){
                        return _.findWhere(response.data, {identifier: region});
                    })
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
                            countries = _.map(_.where($scope.countries, {isParty:true}), function(country){return country.code.toLowerCase()})
                        else if($scope.filters.partyStatus == 'nonparty')
                            countries = _.map(_.where($scope.countries, {isParty:false}), function(country){return country.code.toLowerCase()})
                        else 
                            countries = _.map($scope.countries, function(country){return country.code.toLowerCase()})

                        var userCountries = _.map(result.data, function(user){ if(user.government) return user.government})
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
                         var region = _.find(regions, function(region){
                             return _.contains(region.narrowerTerms, code)
                            })
                         $scope.countriesToShow.push({code:code, name: country.name, count:countryUsers.length, 
                                                        users : countryUsers, region: ((region||{}).title||{}).en,
                                                        user : countryUsers
                                                    })
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


            loadCountryAndRegions();
        }]);
});
