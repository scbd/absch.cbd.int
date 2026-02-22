import './directives/national-reports/questions-selector';
import './directives/national-reports/analyzer'; 
import {analyzerMapping, appendAnalyzerMappingForFrozenDataAnalysis} from '~/app-data/report-analyzer-mapping';
import reportAnalyzerT from '~/app-text/views/report-analyzer/analyzer.json';

    export { default as template } from './analyzer.html';
export default ['$scope', '$location', 'realm', '$timeout', '$route', 'translationService', 'thesaurusService', 'roleService', '$rootScope',
    function ($scope, $location, realm, $timeout, $route, translationService, thesaurusService, roleService, $rootScope) {
        var appName         = realm.value.replace(/-.*/,'').toLowerCase();
        $scope.showAnalyzer = false;
        $scope.self         = $scope;
        $scope.reportData   = analyzerMapping[appName];
        translationService.set('reportAnalyzerT', reportAnalyzerT);


        var unwatch = $rootScope.$watch('user', function (user) {
            if(roleService.isAdministrator()){
                $scope.reportData = appendAnalyzerMappingForFrozenDataAnalysis(appName, analyzerMapping[appName]);
                unwatch();
            }
        });

        $timeout(async function(){

            delete $scope.selectedReportType;
            delete $scope.selectedQuestions;
            delete $scope.selectedRegions;
            delete $scope.maxDate;
            delete $scope.selectedRegionsPreset;
            delete $scope.selectedRegionsPresetFilter;
            

            //========================================
            //
            //
            //========================================
            try {

                const regions = await thesaurusService.getDomainTerms('regions');
                var data = $location.search();

                if(data.date) {
                    $scope.maxDate = new Date(data.date);
                    $scope.maxDate.setDate($scope.maxDate.getDate()+1);
                }

                if(!data.type)
                    data = JSON.parse(sessionStorage.getItem('nrAnalyzerData') || '{}');

                $scope.selectedReportType = mapReportType(data.type);
                
                if (data.questions)
                    $scope.selectedQuestions = data.questions.split(',');
    
                if (data.regions)
                    $scope.selectedRegions = data.regions.split(',')
                                                .map(e=>{
                                                    if(['cbdRegions', 'regions'].includes(data.regionsPreset))
                                                        return regions.find(r=>r.identifier.startsWith(e))?.identifier
                                                    else 
                                                        return e
                                                });

                $scope.selectedRegionsPreset    = data.regionsPreset;
                $scope.selectedRegionsPresetFilter    = data.regionsPresetFilter;
                $scope.activeReport = _.find($scope.reportData, {type:$scope.selectedReportType});

            } catch (e) {
                sessionStorage.removeItem('nrAnalyzerData');
            } finally {
                //sessionStorage.removeItem('nrAnalyzerData');
            }
            $scope.$applyAsync();
            analyze($scope.activeReport ? true : false);
            

            $scope.$watch('selectedReportType', function(newVal){
                $scope.activeReport = _.find($scope.reportData, {type:newVal});
                saveSettings(newVal)
            });
            $scope.$watchCollection('selectedQuestions', saveSettings);
            $scope.$watchCollection('selectedRegions',   saveSettings);
            $scope.$watchCollection('selectedRegionsPreset',   saveSettings);
            $scope.$watchCollection('selectedRegionsPresetFilter',   saveSettings);
        }, 100)

        //========================================
        //
        //
        //========================================
        function saveSettings() {
            sessionStorage.setItem('nrAnalyzerData', JSON.stringify({
                type: $scope.selectedReportType,
                regions: $scope.selectedRegions,
                questions: $scope.selectedQuestions,
                regionsPreset: $scope.selectedRegionsPreset,
                regionsPresetFilter: $scope.selectedRegionsPresetFilter
            }));
        }
        //========================================
        //
        //
        //========================================
        function mapReportType(type) {

            if(type=='nr-cpb-2') return 'cpbNationalReport2';
            if(type=='nr-cpb-3') return 'cpbNationalReport3';

            return type;
        }

        //========================================
        //
        //
        //========================================
        $scope.analyze = analyze;

        function analyze(showAnalyser) {

            if(showAnalyser===undefined)
            showAnalyser = true;

            $scope.showAnalyzer = showAnalyser;

                $route.updateParams({ reportType: $scope.selectedReportType });
                //Pass query string
                $location.search({
                    regions: $scope.selectedRegions?.map(id => id.split('-')[0])?.join(','), // Extract first part before dash,
                    questions: $scope.selectedQuestions?.join(','),
                    type: $scope.selectedReportType,
                    regionsPreset: $scope.selectedRegionsPreset,
                    regionsPresetFilter: $scope.selectedRegionsPresetFilter
                });
                $scope.$applyAsync();
        }
        //========================================
        //
        //
        //========================================
        $scope.$on('nr.analyzer.settings', function(){
            analyze(false);            
        });
    }];

