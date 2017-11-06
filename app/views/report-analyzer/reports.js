define(['lodash', 'views/report-analyzer/directives/national-reports/questions-selector'
], function (_) {
    'use strict';

    return ['$scope', '$location', 'commonjs', '$q', '$http',
    function($scope, $location, commonjs, $q, $http) {

            //========================================
            //
            //
            //========================================
            $scope.analyze = function () {

                var data = {
                    type: $scope.selectedReportType,
                    regions: $scope.selectedRegions,
                    questions: $scope.selectedQuestions,
                    regionsPreset: $scope.selectedRegionsPreset,
                    regionsPresetFilter: $scope.selectedRegionsPresetFilter
                };
                sessionStorage.setItem('nrAnalyzerData', JSON.stringify(data));

                $location.url(_.trimRight($location.path(), '/') + '/analyzer');
            };


            var DefaultRegions = [
                "D50FE62D-8A5E-4407-83F8-AFCAAF708EA4", // CBD Regional Groups - Africa
                "5E5B7AA4-2420-4147-825B-0820F7EC5A4B", // CBD Regional Groups - Asia and the Pacific
                "942E40CA-4C23-4D3A-A0B4-736CD0EFCD54", // CBD Regional Groups - Central and Eastern Europe
                "3D0CCC9A-A0A1-4399-8FA2-41D4D649DB0E", // CBD Regional Groups - Latin America and the Caribbean
                "0EC2E5AE-25F3-4D3A-B71F-8019BB62ED4B"  // CBD Regional Groups - Western Europe and Others
            ];
            $scope.regionMapping = {};
    
            
            var regionsQuery = _.map(DefaultRegions, function(region){return $http.get('/api/v2013/thesaurus/terms/'+region+'?relations')})
        
            $q.all(regionsQuery)
            .then(function(data){            
                _.map(data, function(regionData){
                    var region = regionData.data;
                    $scope.regionMapping[region.identifier] = {
                        countries : region.narrowerTerms, shortTitle : region.shortTitle, title : region.title, identifier: region.identifier, 
                        count:0 , reportCountries:[]
                    }
                })
                $q.when(getReportCount())
                .then(function(result){
                    var reportCountries = [];
                    _.map(result.data, function(report) {                  
                        var region = _.find(_.values($scope.regionMapping), function(region){
                            return _.contains(region.countries, report.government.identifier);
                        });
                        reportCountries.push(report.government.identifier.toUpperCase());
                        $scope.regionMapping[region.identifier].count += 1;
                    });
                    $q.when(commonjs.getCountries())
                    .then(function(data){
                        var parties  = _.map(_.filter(data, function(country){return country.isNPParty;}), 'code');
                        var nonParties =  _.map(_.filter(data, function(country){return !country.isNPParty;}), 'code');
                        $scope.interimNationalReportByNPPartiesCount = _.intersection(parties, reportCountries).length;
                        $scope.interimNationalReportByNPNonPartiesCount = _.intersection(nonParties, reportCountries).length;
                    });
                });
            });
    
            function getReportCount(){
              var reportType = 'npInterimNationalReport1'
              var query  = { 'government_REL' : { $in: DefaultRegions} };
              var fields = '{"government":1}'
    
              var collectionUrls = {
                  cpbNationalReport2 : "/api/v2015/national-reports-cpb-2",
                  cpbNationalReport3 : "/api/v2015/national-reports-cpb-3",
                  npInterimNationalReport1  : "/api/v2017/national-reports-np-1"
              };
    
              return $http.get(collectionUrls[reportType], {  params: { q : query, f : fields }, cache : true });
            }
    
            $scope.analyze = function () {
                
                var data = {
                    type: $scope.selectedReportType,
                    regions: $scope.selectedRegions,
                    questions: $scope.selectedQuestions,
                    regionsPreset: $scope.selectedRegionsPreset,
                    regionsPresetFilter: $scope.selectedRegionsPresetFilter
                };
                sessionStorage.setItem('nrAnalyzerData', JSON.stringify(data));
    
                $location.url(_.trimRight($location.path(), '/') + '/analyzer');
            };
            
        }
    ];
});
