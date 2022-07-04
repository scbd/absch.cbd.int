import _ from 'lodash';
import moment from 'moment';
import 'views/report-analyzer/directives/national-reports/questions-selector';
import {analyzerMapping} from '~/app-data/report-analyzer-mapping';
import reportsT from '~/app-text/views/report-analyzer/reports.json';

    export { default as template } from './reports.html'
export default ['$scope', '$location', 'commonjs', '$q', '$http', 'realm', 'translationService',
    function ($scope, $location, commonjs, $q, $http, realm, translationService) {
        $scope.isABS = realm.is('ABS');
        $scope.isBCH = realm.is('BCH');
        var baseUrl = require.toUrl('').replace(/\?v=.*$/,'');
        translationService.set('reportsT', reportsT); 
        $scope.overview = {};
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

                $location.url(_.trimEnd($location.path(), '/') + '/analyzer');
            };


            var DefaultRegions = [
                "D50FE62D-8A5E-4407-83F8-AFCAAF708EA4", // CBD Regional Groups - Africa
                "5E5B7AA4-2420-4147-825B-0820F7EC5A4B", // CBD Regional Groups - Asia and the Pacific
                "942E40CA-4C23-4D3A-A0B4-736CD0EFCD54", // CBD Regional Groups - Central and Eastern Europe
                "3D0CCC9A-A0A1-4399-8FA2-41D4D649DB0E", // CBD Regional Groups - Latin America and the Caribbean
                "0EC2E5AE-25F3-4D3A-B71F-8019BB62ED4B"  // CBD Regional Groups - Western Europe and Others
            ];
            // $scope.regionMapping = {};
            

            var appName = realm.value.replace(/-.*/,'').toLowerCase();            
            $scope.reportData = analyzerMapping[appName];        
            var regionsQuery = _.map(DefaultRegions, function(region){return $http.get('/api/v2013/thesaurus/terms/'+region+'?relations')})
            var regionMapping = {}
            
            $q.all(regionsQuery)
            .then(function(data){            
                _.map(data, function(regionData){
                    var region = regionData.data;
                    regionMapping[region.identifier] = {
                        countries : region.narrowerTerms, shortTitle : region.shortTitle, title : region.title, identifier: region.identifier, 
                        count:0 , reportCountries:[]
                    }
                });      
            })
            .then(function(){
                _.forEach($scope.reportData, function(report){
                    if(report.stats && report.stats.regionMapping)
                        report.stats.regionMapping =  _.defaultsDeep({}, report.stats.regionMapping, regionMapping);
                    else
                        report.regionMapping = angular.copy(regionMapping);                       
                    getReportCount(report.type);
                })
            });
            
            $scope.$watch('selectedReportType', function(newVal){
                
                if(newVal){
                    var infoBlockUrl    = _.find($scope.reportData, {type:newVal}).infoBlockUrl
                    $scope.infoBlockUrl = baseUrl + infoBlockUrl;
                }
            });
            function getReportCount(reportType){
                var query  = { 'government_REL' : { $in: DefaultRegions} };
                var fields = '{"government":1}'
        
                var activeReport = _.find($scope.reportData, {type:reportType});                
                if(activeReport.dataUrl){
                    return $http.get(activeReport.dataUrl, {  params: { q : query, f : fields }, cache : true })
                            .then(function(result){
                                _.forEach(activeReport.regionMapping, function(region){
                                    region.count = 0;
                                    region.reportCountries = [];
                                });

                                var reportCountries = [];
                                _.map(result.data, function(report) {                  
                                    var region = _.find(_.values(activeReport.regionMapping), function(region){
                                        return _.includes(region.countries, report.government.identifier);
                                    });
                                    reportCountries.push(report.government.identifier.toUpperCase());
                                    activeReport.regionMapping[region.identifier].count += 1;
                                });
                                $q.when(commonjs.getCountries())
                                .then(function(data){
                                    var parties                          = _.map(_.filter(data, function(country){return wasPartyOnDate(activeReport.deadline, country);}), 'code');
                                    var nonParties                       = _.map(_.filter(data, function(country){return !wasPartyOnDate(activeReport.deadline, country);}), 'code');
                                        activeReport.partyCount          = parties.length;
                                        activeReport.partyReportCount    = _.intersection(parties, reportCountries).length;
                                        activeReport.nonPartyReportCount = _.intersection(nonParties, reportCountries).length;                                        

                                        if(reportType == 'cpbNationalReport2'){ //special case for BCH NR2
                                            activeReport.nonPartyReportCount = 0
                                        }
                                });
                            });
                }
                else if(activeReport.stats){
                    activeReport = _.extend(activeReport, activeReport.stats)
                }
            }

            function wasPartyOnDate(date, entity){
                var appName = realm.value.replace(/-.*/,'').toLowerCase();
                var treaty;
                if(appName == 'abs')
                    treaty = 'XXVII8b';
                else if(appName == 'bch')
                    treaty = 'XXVII8a';
                else
                    throw 'Unknonw application';

                return     entity
                        && _.includes(["ratification","accession", "acceptance", "approval", "succession"], entity.treaties[treaty].instrument)
                        && entity.treaties[treaty].party
                        && (moment.utc(entity.treaties[treaty].party) <= moment.utc(date));
            }

            $scope.hasAnalyzer = function(data){
                return !data.stats;
            }
        }
    ];

