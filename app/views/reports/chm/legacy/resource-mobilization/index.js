
import app from '~/app';
import _ from 'lodash';
import rmHelpers from './rmHelpers';
import modalComments from './modalComments';
import linechart from './linechart';
export { default as template } from './index.html';
import indexT from '~/app-text/views/reports/chm/resource-mobilization/index.json';

export default ['$scope', '$http', '$filter', '$q', 'realm', '$document', 'translationService',function($scope, $http, $filter, $q, realm, $document,translationService) {

        translationService.set('indexT', indexT );

        //============================================================
        //
        //============================================================
        $scope.chartOptions = {
            title : 'Trend',
            yTitle: 'USD in thousands'
        };

        //============================================================
        //
        //============================================================
        $scope.loadChart = function (event, Q, key, country, isTotal) {
            if(isTotal)
                $scope.getChartTotal(Q, key);
            else
                $scope.getChartData(Q, key, country);

            $scope.chartOptions.title = $scope.getCountryName(country);

            if(key==="progressIndicators")
                $scope.chartOptions.yTitle = 'Coefficient';

            angular.element('#hiddenChart').contents().appendTo(event.currentTarget);
        };

        //============================================================
        //
        //============================================================
        $scope.loadChart2 = function (event, Q, key, subkey, country) {
            $scope.getChartData2(Q, key, subkey, country);

            angular.element('#hiddenChart').contents().appendTo(event.currentTarget);
        };

        //============================================================
        //
        //============================================================
        $scope.loadChart2020 = function (event, Q, keys, country, isTotal=false) {
            if(isTotal){
                $scope.getChartTotal2020(Q, keys, country);
            }
            else {
                $scope.getChartData2020(Q, keys, country)
            }

            $scope.chartOptions.title = $scope.getCountryName(country);
            angular.element('#hiddenChart').contents().appendTo(event.currentTarget);
        };

        //============================================================
        //
        //============================================================
        $scope.unloadChart = function () {

            if(angular.element($document[0].querySelector("a span#chartContainer")).length > 0){
                angular.element($document[0].querySelector("span#chartContainer")).detach().appendTo('#hiddenChart');
            }
        };

        //============================================================
        //
        //============================================================
        $scope.getChartTotal = function (Q, key) {
            $scope.chartData = [];
            var years;

            if(key ==="baselineFlows")      years = $scope.options.baselineYears;
            if(key ==="progressFlows")      years = $scope.options.progressYears;
            if(key ==="progressIndicators") years = $scope.options.progressYears;

            if(key ==="baselineFlows" || key ==="progressFlows"){
                _.forEach(years, function (year) {
                    var total = $scope.getTotal(Q, key, year);
                    $scope.chartData.push({'year': year, 'value':total});
                });
            }

            if(key ==="progressIndicators") {
                _.forEach(years, function (year) {
                    var total = $scope.getAggregateTotalCoefficient(year);
                    $scope.chartData.push({'year': year, 'value':total});
                });
            }
        };

        //============================================================
        //
        //============================================================
        $scope.getChartTotal2020 = function (Q, keys) {
            $scope.chartData = [];
            var years;

            if(_.includes(keys, 'progressFlows'))      years = $scope.options.progressYears;
            if(_.includes(keys, 'progressIndicators')) years = $scope.options.progressYears;
            if(_.includes(keys, 'financialFlows'))     years = $scope.options.progressYearsUpTo2020;
            if(_.includes(keys, 'contributions'))      years = $scope.options.collectiveActionYears2020;

            _.forEach(years, function (year) {

                var total = 0;

                if(_.includes(keys, 'contributions')){
                    total = $scope.getTotal(Q, 'contributions', year, 2020);
                }
                else{
                    if(year <  2016){
                        total = $scope.getTotal(Q, 'progressFlows', year);
                    }
                    else {
                        total = $scope.getTotal(Q, 'financialFlows', year, 2020);
                    }
                }
                $scope.chartData.push({'year': year, 'value':total});
            });
        };

        //============================================================
        //
        //============================================================
        $scope.getChartData = function (Q, key, country) {
            $scope.chartData = [];

            if(!$scope.records || !Q || !country)
                return;

            var rec = _.find($scope.records, {government_s: country});

            if(!rec) return;

            var years;

            if(key ==="baselineFlows")      years = $scope.options.baselineYears;
            if(key ==="progressFlows")      years = $scope.options.progressYears;
            if(key ==="progressIndicators") years = $scope.options.progressYears;
            if(key ==="expenditures")       years = $scope.options.domesticYears;
            if(key ==="contributions")      years = $scope.options.domesticYears;

            if(rec[Q] && rec[Q][key]){

                _.forEach(years, function(year){
                    var value = 0;

                    if(rec[Q][key] && rec[Q][key][year])
                        value = rec[Q][key][year];

                    $scope.chartData.push({'year': year, 'value':value});
                });

            }
        };

        //============================================================
        //
        //============================================================
        $scope.getChartData2 = function (Q, key, subkey, country) {
            $scope.chartData = [];

            if(!$scope.records || !Q || !country || !subkey)
                return;

            var rec = _.find($scope.records, {government_s: country});

            if(!rec) return;

            var years = $scope.options.fundingNeedsYears;


            if(rec[Q] && rec[Q][key]){
                _.forEach(years, function (year) {
                    var value = 0;

                    if(rec[Q][key] && rec[Q][key][year] && rec[Q][key][year][subkey])
                        value = rec[Q][key][year][subkey];

                    $scope.chartData.push({'year': year, 'value': value});
                });
            }
        };

        //============================================================
        //
        //============================================================
        $scope.getChartData2020 = function (Q, keys, country) {
            $scope.chartData = [];
            
            if(!$scope.records || !$scope.records2020 || !Q || !keys || !country)
                return;
                
            var rec2015 = _.find($scope.records, {government_s: country});
            var rec2020 = _.find($scope.records2020, {government_s: country});

            if(!rec2015 && !rec2020) return;

            var years;

            if(_.includes(keys, "progressFlows"))      years = $scope.options.progressYears;
            if(_.includes(keys, "financialFlows"))     years = $scope.options.progressYearsUpTo2020
            if(_.includes(keys, "progressIndicators")) years = $scope.options.progressYearsUpTo2020
            if(_.includes(keys, "contributions"))      years = $scope.options.collectiveActionYears2020

            var data = [];

            if(_.includes(keys, "contributions")) {
                data = rec2020[Q][keys[0]]
            }
            else {
                if(rec2015 && rec2015[Q] && rec2015[Q][keys[0]]){
                    var rec2015Data = rec2015[Q][keys[0]];
                }
                if(rec2020 && rec2020[Q] && rec2020[Q][keys[1]]){
                    var rec2020Data = rec2020[Q][keys[1]];
                }
    
                data = _.merge(rec2015Data, rec2020Data );
            }

            _.forEach(years, function(year){
                var value = 0;

                if(data[year])
                    value = data[year];

                $scope.chartData.push({'year': year, 'value':value});
            });
        }

        $scope.title = 'Financial Reporting Framework Analyzer';
        $scope.criteria = {};
        $scope.options = {
            elements: [ { identifier: '1',       name: '1. International financial resource flows'},
                        { identifier: '1.1',     name: '1.1. Amount provided by countries in support of biodiversity in developing countries'},
                        { identifier: '1.1.1',   name: '1.1.1. Baseline information'},
                        { identifier: '1.1.2',   name: '1.1.2. Monitoring progress in mobilizing international financial flows'},
                        { identifier: '1.2',     name: '1.2. Measures taken by countries to encourage the private sector and CSO to provide international support for the implementation of the Strategic Plan for Biodiversity 2011-2020'},
                        { identifier: '2',       name: '2. Inclusion of biodiversity in priorities or plans'},
                        { identifier: '3',       name: '3.  Assessment and/or evaluation of values'},
                        { identifier: '4',       name: '4. Reporting current domestic biodiversity expenditures'},
                        { identifier: '4.1',     name: '4.1. Annual financial support provided to domestic biodiversity-related activities  '},
                        { identifier: '4.2',     name: '4.2.  Information on sources and categories'},
                        { identifier: '4.3',     name: '4.3. Role of collective action and non-market approaches'},
                        { identifier: '4.3.1',   name: '4.3.1. Assessments undertaken of the role of collective action for achieving the objectives of the Convention'},
                        { identifier: '4.3.2',   name: '4.3.2. Additional information on the assessment'},
                        { identifier: '5',       name: '5. Reporting funding needs, gaps, and priorities'},
                        { identifier: '6',       name: '6. National finance plans'},
                        { identifier: '7',       name: '7. Measures taken by countries to encourage the private sector and CSO to provide domestic support for the implementation of the Strategic Plan for Biodiversity 2011-2020'},
                        { identifier: '8',       name: '8. Availability of financial resources for achieving targets'},],
                        
            baselineYears            : _.range(2006, 2011),
            progressYears            : _.range(2011, 2016),
            progressYears2020        : _.range(2016, 2021),
            progressYearsUpTo2020    : _.range(2011, 2021),
            domesticYears            : _.range(2006, 2016),
            fundingNeedsYears        : _.range(2014, 2021),
            collectiveActionYears2020: _.range(2015, 2021),

            financialPlans : [{ identifier: 'expectedGap', title: 'Expected funding gap'},
                              { identifier: 'domesticTotal', title: 'Domestic sources'},
                              { identifier: 'internationalTotal', title: 'International sources'},
                              { identifier: 'remainingGap', title: 'Remaining gap'}],

            docTypes : [ {identifier: 'frf2015', title: 'Reporting on baseline and progress towards 2015'},
                         {identifier: 'frf2020', title: 'Reporting on progress towards 2020'}]
        };

        $scope.indent = function(elem) {
            
            var indentation = "";

            var s = elem.split(".");

            var last = (s[s.length-1]).trim();

            for(var i = 0; i < s.length-1; i++){
                indentation = indentation + '&nbsp;&nbsp;';
            }
            return indentation + last;
        }

        //============================================================
        //
        //============================================================
        $scope.getFinanacialPlanTitle = function (code) {

            if($scope.options && $scope.options.financialPlans){

                var item =  _.find($scope.options.financialPlans, {identifier: code});

                if(item)
                    return item.title;
            }
            return '';
        };

        //============================================================
        //
        //============================================================
        $scope.init = function () {

            $http.get('/api/v2013/thesaurus/domains/countries/terms', { cache : true }).then(function(response) {
                var allCountries =  _.map(response.data, function (c) {
                                            return { identifier:c.identifier, name:c.title.en };
                                    });

                $scope.allCountries = $filter('orderBy')(allCountries, 'name');

                initData();
            });

            $http.get("/api/v2013/thesaurus/domains/regions/terms?relations", { cache: true }).then(function(o){

                var allRegions =  _.filter(o.data, function (region) {
                                    return (region.name).indexOf('CBD Regional Groups') !== -1 && (region.name).indexOf('sub-region') === -1 ;
                                });

                $scope.cbdRegionsAll = allRegions;

                var cbdRegions = _.map(allRegions , function (region) {
                    return { identifier:region.identifier, name: region.name.replace('CBD Regional Groups - ', '') };
                });

                $scope.cbdRegions = $filter('orderBy')(cbdRegions, 'name');
            });
        };

        //============================================================
        //
        //============================================================
        $scope.setRegionCountries = function (identifier) {

            if(!_.isEmpty(identifier)){
                var regionCountries = [];
                var region =_.find($scope.cbdRegionsAll, {identifier:identifier});

                regionCountries = _.union(regionCountries, region.expandedNarrowerTerms);

                var docCountries = _.intersection($scope.docCountries, regionCountries);

                $scope.reportCountries = _.filter($scope.allCountries, function (ctr) {
                                               return _.includes(docCountries, ctr.identifier);
                                         });
           }
           else {
                $scope.reportCountries = _.filter($scope.allCountries, function (ctr) {
                                               return _.includes($scope.docCountries, ctr.identifier);
                                         });
           }
        };

        //============================================================
        //
        //============================================================
        $scope.filterByRegions = function (identifier) {

            $scope.criteria.selectedCountries = undefined;

            if(!_.isEmpty(identifier))
            {
                $scope.records = [];
                var region =_.find($scope.cbdRegionsAll, {identifier:identifier});
                $scope.setRegionCountries(identifier);

                _.forEach($scope.documents, function (doc) {
                    if(_.includes(region.expandedNarrowerTerms, doc.government_s)){
                        $scope.records.push(doc);
                    }
                });
                $scope.records = $filter('orderBy')($scope.records, 'government_EN_s');
                loadComments();
            }
            else {
                $scope.records = $filter('orderBy')($scope.documents, 'government_EN_s');
                $scope.setRegionCountries();
                loadComments();
            }
        };

        //============================================================
        //
        //============================================================
        $scope.filterByCountries = function (identifier) {

            if(!_.isEmpty(identifier))
            {
                $scope.records = [];

                _.forEach($scope.documents, function (doc) {
                    if(doc.government_s === identifier)
                        $scope.records.push(doc);
                });
                loadComments();
            }
            else {
                $scope.filterByRegions($scope.criteria.selectedRegions);
                loadComments();
            }
        };

        //============================================================
        //
        //============================================================
        $scope.$watch('criteria.selectedRegions', function(newValue, oldValue) {
            if(newValue !== oldValue){
                $scope.filterByRegions(newValue);
            }
        });

        //============================================================
        //
        //============================================================
        $scope.$watch('criteria.selectedCountries', function(newValue, oldValue) {
            if(newValue !== oldValue){
                $scope.filterByCountries(newValue);
            }
        });

        //============================================================
        //
        //============================================================
        $scope.getTotal = function (Q, key, year, docYear = 2015) {

            if(!Q || !year || !key) return 0;

            var docs = [];

            if(docYear == 2015){
                if(!$scope.records) return 0;

                 docs = $scope.records;
            }

            if(docYear == 2020){

                if(!$scope.records2020) return 0;

                docs = $scope.records2020;
            }

            var yearTotals = _.map(docs, function (rec) {
                    if(rec[Q] && rec[Q][key] && rec[Q][key][year])
                        return (rec[Q][key][year]);
                    else
                        return 0;
                });

            return _.sum(yearTotals);
        };

        //============================================================
        //
        //============================================================
        $scope.getTotal2 = function (Q, key, year, subkey, docYear = 2015) {

            if(!Q || !year || !key || !subkey)
                return 0;

            var docs = [];

            if(docYear == 2015){
                if(!$scope.records) return 0;

                docs = $scope.records;
            }

            if(docYear == 2020){
                if(!$scope.records2020) return 0;

                docs = $scope.records2020;
            }
                         
            var yearTotals =     _.map(docs, function (rec) {
                    if(rec[Q] && rec[Q][key] && rec[Q][key][year] && rec[Q][key][year][subkey])
                        return (rec[Q][key][year][subkey]);
                    else
                        return 0;
                });

            return _.sum(yearTotals);
        };

        //============================================================
        //
        //============================================================
        $scope.getAverageTotal = function (Q, key, docYear = 2015) {

            if(!Q || !key)
                return 0;

            var docs = [];

            if(docYear == 2015){
                if(!$scope.records) return 0;

                docs = $scope.records;
            }

            if(docYear = 2020){
                if(!$scope.records2020) return 0;

                docs = $scope.records2020;
            } 

            var total =     _.map(docs, function (rec) {

                    if(rec[Q] && rec[Q][key])

                        return rec[Q][key];
                    else
                        return 0;
                });

            return _.sum(total);
        };

        //============================================================
        //
        //============================================================
        $scope.getAggregateTotalCoefficient = function (Q, key, year, docYear = 2015) {

            if(!Q || !key || !year) return 0;

            var docs = [];
            var progressYearTotal = 0;

            if(docYear == 2015)
            {
                if(!$scope.records) return 0;
                docs = $scope.records;

                progressYearTotal = $scope.getTotal(Q, key, year) ;
            }

            if(docYear == 2020)
            {
                if(!$scope.records) return 0;
                docs = $scope.records2020;

                progressYearTotal = $scope.getTotal(Q, key, year, 2020) ;
            }   

            var pCountries = _.map(docs, function (rec) {

                                    if(rec[Q] && rec[Q][key] && rec[Q][key] && rec[Q][key][year])
                                        if(rec[Q][key][year] > 0)
                                            return rec.government_s;
                                });

            //  TO_REVIEW for 2020
            var baselineAverageTotal = _.sum(_.map(docs, function (rec) {
                                            if(_.includes(pCountries, rec.government_s) && rec[Q].baselineFlows_average)
                                                return rec[Q].baselineFlows_average;

                                            })
                                        );

            if(baselineAverageTotal>0)
                return progressYearTotal/baselineAverageTotal;

            
            return 0;
                
        };


        //============================================================
        //
        //============================================================
        $scope.getCount = function (Q, key, answer, year = 2015) {

            if(!Q || !key || (answer === undefined)) return 0;

            var docs = [];

            if(year == 2015) {
                if(!$scope.records) return 0;
                docs = $scope.records;
            }
            if(year == 2020){
                if(!$scope.records2020) return 0;
                docs = $scope.records2020;
            }

            var recs = _.filter(docs, function (rec) {

                            if(rec[Q] && (rec[Q][key] || _.isBoolean(rec[Q][key])))
                                return rec[Q][key] === answer;
                        });
            return recs.length;
        };
    

        //============================================================
        //
        //============================================================
        $scope.getCountM = function (Q, key, answers, year = 2015) {

            if(!Q || !key || _.isEmpty(answers))
                return 0;

            var docs = [];

            if(year == 2015) {
                if(!$scope.records) return 0;
                docs = $scope.records;
            }
            if(year == 2020){
                if(!$scope.records2020) return 0;
                docs = $scope.records2020;
            }                

            var recs = _.filter(docs, function (rec) {
                            if(rec[Q] && (rec[Q][key] || _.isBoolean(rec[Q][key])))
                                return _.includes(answers, rec[Q][key]);
                        });
            return recs.length;
        };

        //============================================================
        //
        //============================================================
        $scope.getCountKey = function (Q, key, year = 2015) {

            if(!Q || !key)
                return 0;

            var docs = [];

            if(year == 2015) {
                if(!$scope.records) return 0;
                docs = $scope.records;
            }
            if(year == 2020){
                if(!$scope.records2020) return 0;
                docs = $scope.records2020;
            }                 

            var recs = _.filter(docs, function (rec) {
                            if(rec[Q] && rec[Q][key])
                                return (rec[Q][key]);
                        });

            return recs.length;
        };

        

        //============================================================
        //
        //============================================================
        $scope.getPercentage = function (Q, key, answer, year = 2015) {

            if(!Q || !key || (answer === undefined))
                return 0;
            
                var docs = [];

            if(year == 2015) {
                if(!$scope.records) return 0;
                docs = $scope.records;
            }
            if(year == 2020){
                if(!$scope.records2020) return 0;
                docs = $scope.records2020;
            } 
            
            var recs = _.filter(docs, function (rec) {
                            if(rec[Q] && rec[Q][key])
                                return rec[Q][key] === answer;
                        });
            return (recs.length/$scope.getCountryCount(Q, key, year).length)*100;
        };

        //============================================================
        //
        //============================================================
        $scope.getRecordsWithKey = function (Q, key, year = 2015) {

            if(!Q || !key)
                return 0;

            var docs = [];

            if(year == 2015) {
                if(!$scope.records) return 0;
                docs = $scope.records;
            }
            if(year == 2020){
                if(!$scope.records2020) return 0;
                docs = $scope.records2020;
            }                 

            var recs = _.filter(docs, function (rec) {
                            if(rec[Q] && !_.isEmpty(rec[Q][key]))
                            {
                                return rec;
                            }
                        });

            return recs;
        };

        //============================================================
        //
        //============================================================
        $scope.getCountryName = function (code) {

            var country = _.find($scope.allCountries, {identifier:code});

            if(country)
                return country.name;

            return '';
        };

        //============================================================
        //
        //============================================================
        $scope.isElementVisible = function (element) {
            if($scope.criteria && $scope.criteria.selectedElements){
                return _.isEqual($scope.criteria.selectedElements, element);
            }

            return true;
        };

        //============================================================
        //
        //============================================================
        $scope.isTotalVisible = function () {

            if($scope.records && $scope.records.length < 2)
                return false;
            else
                return true;
        };


        $scope.baselineRows_show         = true;
        $scope.progressRows_show         = true;
        $scope.domesticActivityRows_show = true;
        $scope.contributionsRows_show    = true;
        $scope.estimateRows_show         = true;
        $scope.planRows_show             = true;

        $scope.contributions2020Rows_show    = true;

        //============================================================
        //
        //============================================================
        $scope.isElemCollapsed = function (elem) {
            $scope[elem+"_show"] = angular.element($document[0].querySelector('#'+elem)).hasClass('in');
        };

        //============================================================
        //
        //============================================================
        $scope.getComments = function (year, Q, key, answer) {

            if(!year || !Q || !key) return;

            var docs = [];

            if(year===2015) docs = $scope.records;
            if(year===2020) docs = $scope.records2020;
            
            var records = _.filter(docs, function (rec) {

                                if(rec[Q] && rec[Q][key])
                                    return rec[Q][key] === answer;
                            });

            if(records)
                return _.compact(
                                _.map(records, function (rec) {
                                    var countryName = $scope.getCountryName(rec.government_s);
                                    if(rec[Q] && rec[Q][key+'Comments'])
                                        return {country: countryName, comment: rec[Q][key+'Comments']};
                                }));
        };

        //============================================================
        //
        //============================================================
        $scope.getComments2 = function (year, Q, key) {

            if(!year || !Q || !key) return;

            var docs = [];

            if(year===2015) docs = $scope.records;
            if(year===2020) docs = $scope.records2020;
            
            var records = _.filter(docs, function (rec) {

                                if(rec[Q] && rec[Q][key])
                                    return rec[Q][key];
                            });

            if(records)
                return _.compact(
                                _.map(records, function (rec) {
                                    var countryName = $scope.getCountryName(rec.government_s);
                                    if(rec[Q] && rec[Q][key])
                                        return {country: countryName, comment: rec[Q][key]};
                                }));
        };

        //============================================================
        //
        //============================================================
        var loadComments = function () {

            // 2015
            $scope.comments_Q1_2_some          = $scope.getComments(2015, 'Q1', 'hasPrivateSectorMeasures', 'some');
            $scope.comments_Q1_2_comprehensive = $scope.getComments(2015, 'Q1', 'hasPrivateSectorMeasures', 'comprehensive');
            $scope.comments_Q2_some            = $scope.getComments(2015, 'Q2', 'hasNationalBiodiversityInclusion', 'some');
            $scope.comments_Q2_comprehensive   = $scope.getComments(2015, 'Q2', 'hasNationalBiodiversityInclusion', 'comprehensive');
            $scope.comments_Q3_some            = $scope.getComments(2015, 'Q3', 'hasBiodiversityAssessment', 'some');
            $scope.comments_Q3_comprehensive   = $scope.getComments(2015, 'Q3', 'hasBiodiversityAssessment', 'comprehensive');

            $scope.comments_Q4_some            = $scope.getComments(2015, 'Q4', 'domesticCollectiveAction', 'some');
            $scope.comments_Q4_notnecessary    = $scope.getComments(2015, 'Q4', 'domesticCollectiveAction', 'notnecessary');
            $scope.comments_Q4_comprehensive   = $scope.getComments(2015, 'Q4', 'domesticCollectiveAction', 'comprehensive');

            $scope.comments_Q7_some            = $scope.getComments(2015, 'Q7', 'hasDomesticPrivateSectorMeasures', 'some');
            $scope.comments_Q7_comprehensive   = $scope.getComments(2015, 'Q7', 'hasDomesticPrivateSectorMeasures', 'comprehensive');

            // getComments2
            // 2015
            $scope.comments_Q1_methodologicalComments                       = $scope.getComments2(2015, 'Q1', 'methodologicalComments');
            $scope.comments_Q4_sourcesAdditionalComments                    = $scope.getComments2(2015, 'Q4', 'sourcesAdditionalComments');
            $scope.comments_Q4_domesticCollectiveActionMethodologyComments  = $scope.getComments2(2015, 'Q4', 'domesticCollectiveActionMethodologyComments');
            $scope.comments_Q5_fundingNeedsDataAdditionalComments           = $scope.getComments2(2015, 'Q5', 'fundingNeedsDataAdditionalComments');

            // 2020 
            $scope.comments2020_Q1_2_some          = $scope.getComments(2020, 'Q1', 'hasPrivateSectorMeasures', 'some');
            $scope.comments2020_Q1_2_comprehensive = $scope.getComments(2020, 'Q1', 'hasPrivateSectorMeasures', 'comprehensive');
            $scope.comments2020_Q2_some            = $scope.getComments(2020, 'Q2', 'hasNationalBiodiversityInclusion', 'some');
            $scope.comments2020_Q2_comprehensive   = $scope.getComments(2020, 'Q2', 'hasNationalBiodiversityInclusion', 'comprehensive');
            $scope.comments2020_Q3_notnecessary    = $scope.getComments(2020, 'Q3', 'hasBiodiversityAssessment', 'notnecessary');
            $scope.comments2020_Q3_some            = $scope.getComments(2020, 'Q3', 'hasBiodiversityAssessment', 'some');
            $scope.comments2020_Q3_comprehensive   = $scope.getComments(2020, 'Q3', 'hasBiodiversityAssessment', 'comprehensive');
            $scope.comments2020_Q4_some            = $scope.getComments(2020, 'Q4', 'domesticCollectiveAction', 'some');
            $scope.comments2020_Q4_notnecessary    = $scope.getComments(2020, 'Q4', 'domesticCollectiveAction', 'notnecessary');
            $scope.comments2020_Q4_comprehensive   = $scope.getComments(2020, 'Q4', 'domesticCollectiveAction', 'comprehensive');

            $scope.comments2020_Q5_some            = $scope.getComments(2020, 'Q5', 'hasDomesticPrivateSectorMeasures', 'some');
            $scope.comments2020_Q5_comprehensive   = $scope.getComments(2020, 'Q5', 'hasDomesticPrivateSectorMeasures', 'comprehensive');
            
            // 2020
            $scope.comments2020_Q1_methodologicalComments                      = $scope.getComments2(2020, 'Q1', 'methodologicalComments');
            $scope.comments2020_Q1_hasPrivateSectorMeasuresComments            = $scope.getComments2(2020, 'Q1', 'hasPrivateSectorMeasuresComments');
            $scope.comments2020_Q2_nationalBiodiversityInclusionComments       = $scope.getComments2(2020, 'Q2', 'hasNationalBiodiversityInclusionComments');
            $scope.comments2020_Q3_hasBiodiversityAssessmentComments           = $scope.getComments2(2020, 'Q3', 'hasBiodiversityAssessmentComments');
            $scope.comments2020_Q4_domesticCollectiveActionMethodologyComments = $scope.getComments2(2020, 'Q4', 'domesticCollectiveActionMethodologyComments');
            $scope.comments2020_Q5_nationalPlansAdditionalComments             = $scope.getComments2(2020, 'Q5', 'nationalPlansAdditionalComments');
            $scope.comments2020_Q5_domesticPrivateSectorMeasuresComments       = $scope.getComments2(2020, 'Q5', 'domesticPrivateSectorMeasuresComments');
        };

        //============================================================
        //
        //============================================================
        $scope.getCountryCount = function (Q, key, year = 2015) {

            var docs = [];

            if(year == 2015){
                if(!$scope.records)     return 0;
                docs = $scope.records;    
            }
                
            if(year == 2020) {
                if(!$scope.records2020) return 0;
                docs = $scope.records2020;
            }

            var recs = _.filter(docs, function (rec) {
                    return (rec[Q] && rec[Q][key] && !_.isEmpty(rec[Q][key]));
            });

            return recs.length;
        };

        //============================================================
        //
        //============================================================
        $scope.getPlans2020KeyAmount = function (sources, year)
        {
            if(_.isEmpty(sources) || !year) return ;
            var src =  _.find(sources, {'year': year });

            if(src && src.amount)
                return  src.amount;

            return ;
        }

        //============================================================
        //
        //============================================================
        $scope.getPlans2020KeyTrend = function (sources, year)
        {
            if(_.isEmpty(sources) || !year) return ;
            var src =  _.find(sources, {'year': year });
     
            if(src && _.has(src, 'hasReduced')){
                return  src.hasReduced;
            }
            return;
        }

        //============================================================
        //
        //============================================================
        $scope.get2020FinancialFlows = function (Q, key, government, year) {

            if(!Q || !key || !government || !year) return 0;

            var doc = _.first(_.filter($scope.records2020, { 'government_s': government}));

            if(doc && doc[Q] && doc[Q][key] && doc[Q][key][year]) 
                return doc[Q][key][year];
            
            // return null;
        }

        //============================================================
        //
        //============================================================
        var initData = function () {
            // NOT version_s:* remove non-public records from resultset
            var q = 'NOT version_s:* AND realm_ss:' + realm.toLowerCase() + ' AND (schema_s:resourceMobilisation OR schema_s:resourceMobilisation2020)'; 

            var queryParameters = {
                'q'    : q,
                'sort' : 'createdDate_dt desc',
                'fl'   : 'schema_s, id, url_ss, government_s, government_EN_s, Q1_s, Q2_s, Q3_s, Q4_s, Q5_s, Q6_s, Q7_s, Q8_s',
                'wt'   : 'json',
                'start': 0,
                'rows' : 1000,
                'cb'   : new Date().getTime(),
            };

            $http.get('/api/v2013/index/select', { params: queryParameters}).success(function (data) {
            
                $scope.documents    = data.response.docs;

                $scope.documents = _.map($scope.documents, function (doc) {

                    if(doc.Q1_s) { _.assign(doc, { Q1 : JSON.parse(doc.Q1_s) }); delete doc.Q1_s;}
                    if(doc.Q2_s) { _.assign(doc, { Q2 : JSON.parse(doc.Q2_s) }); delete doc.Q2_s;}
                    if(doc.Q3_s) { _.assign(doc, { Q3 : JSON.parse(doc.Q3_s) }); delete doc.Q3_s;}
                    if(doc.Q4_s) { _.assign(doc, { Q4 : JSON.parse(doc.Q4_s) }); delete doc.Q4_s;}
                    if(doc.Q5_s) { _.assign(doc, { Q5 : JSON.parse(doc.Q5_s) }); delete doc.Q5_s;}
                    if(doc.Q6_s) { _.assign(doc, { Q6 : JSON.parse(doc.Q6_s) }); delete doc.Q6_s;}
                    if(doc.Q7_s) { _.assign(doc, { Q7 : JSON.parse(doc.Q7_s) }); delete doc.Q7_s;}
                    if(doc.Q8_s) { _.assign(doc, { Q8 : JSON.parse(doc.Q8_s) }); delete doc.Q8_s;}

                    return doc;
                });

                $scope.records      = _.filter($scope.documents, { 'schema_s': 'resourceMobilisation'});
                $scope.records2020  = _.filter($scope.documents, { 'schema_s': 'resourceMobilisation2020'});
                $scope.docCountries = _.map(data.response.docs, 'government_s');

                $scope.setRegionCountries();
                loadComments();

            }).error(function (error) { console.log('onerror'); console.log(error); });
        };

        //============================================================
        //
        //============================================================
        $scope.init();

    }];
