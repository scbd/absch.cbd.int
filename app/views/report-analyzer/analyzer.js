import './directives/national-reports/questions-selector';
import './directives/national-reports/analyzer'; 
import {analyzerMapping} from '~/app-data/report-analyzer-mapping';
import reportAnalyzerT from '~/app-text/views/report-analyzer/analyzer.json';

    export { default as template } from './analyzer.html';
export default ['$scope', '$location', 'realm', '$timeout', 'translationService',
    function ($scope, $location, realm, $timeout, translationService) {
        var appName         = realm.value.replace(/-.*/,'').toLowerCase();
        $scope.showAnalyzer = false;
        $scope.self         = $scope;
        $scope.reportData   = analyzerMapping[appName];
        translationService.set('reportAnalyzerT', reportAnalyzerT);
        $timeout(function(){

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

                var data = $location.search();

                if(data.date) {
                    $scope.maxDate = new Date(data.date);
                    $scope.maxDate.setDate($scope.maxDate.getDate()+1);
                }

                if(!data.type)
                    data = JSON.parse(sessionStorage.getItem('nrAnalyzerData') || '{}');

                $scope.selectedReportType = mapReportType(data.type);
                $scope.selectedQuestions  = data.questions;
                $scope.selectedRegions    = data.regions;
                $scope.selectedRegionsPreset    = data.regionsPreset;
                $scope.selectedRegionsPresetFilter    = data.regionsPresetFilter;
                $scope.activeReport = _.find($scope.reportData, {type:$scope.selectedReportType});

            } catch (e) {
                sessionStorage.removeItem('nrAnalyzerData');
            } finally {
                //sessionStorage.removeItem('nrAnalyzerData');
            }
            
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
        }

        //========================================
        //
        //
        //========================================
        $scope.$on('nr.analyzer.settings', function(){
            analyze(false);            
        });
    }];

