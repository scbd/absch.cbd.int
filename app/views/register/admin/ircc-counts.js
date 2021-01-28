define(['app', 'lodash', 'js/common', 'moment', 'components/scbd-angularjs-controls/form-control-directives/all-controls', 'components/scbd-angularjs-services/services/main',
    'views/register/directives/register-top-menu','chart-js',
    'services/search-service','services/app-config-service', 'services/solr'
], function (app, _) {

        "use strict";
        app.controller("adminIrccCountController", ["$scope", "solr", "searchService", "realm", "commonjs", "$q", "appConfigService", "$http", "$filter",
            function ($scope, solr, searchService, realm, commonjs, $q, appConfigService, $http, $filter) {
                
                var chartObjects = {};

                var nationalChartData = {};
                $scope.nationalRecordsTableData = [];
                $scope.nationalChart = true;

                var referenceChartData = {};
                $scope.referenceRecordsTableData = [];
                $scope.referenceChart = true;

                $scope.filters = {startDate: '2014-10-12'};
                
                $scope.options = {
                    
                    filterCountries: function () {
                       return $http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }).then(function(o){
                            var countries = $filter("orderBy")(o.data, "name");
                            return countries;
                        });
                    },
                    filterDateTypes: function () {
                        var DateType = [];
                        DateType.push({ 'identifier': 'createdDate_dt:', 'name': 'Created On' });
                        DateType.push({ 'identifier': 'updatedDate_dt:', 'name': 'Updated On' });

                        return DateType;
                    },
                    filterPartyStatus: function () {
                        var status = [];
                        status.push({ 'identifier': '1', 'name': 'All' });
                        status.push({ 'identifier': '2', 'name': 'Party' });
                        status.push({ 'identifier': '3', 'name': 'Non-Party' });
                        status.push({ 'identifier': '4', 'name': 'Ratified not yet Party' });

                        return status;
                    }
                };

                $scope.loadFacets = function(){
                    
                    $scope.loadingFacets = true;
                     var nationalRecordsQuery = {
                        rowsPerPage : 1000,
                        fields: 'government_s,government_EN_s,schema_s,dateOfExpiry_dt,usages_EN_ss,entitiesToWhomPICGrantedConfidential_b,usagesConfidential_b,keywords_EN_ss,entitiesToWhomPICGrantedCountry_ss,entitiesToWhomPICGrantedCountry_EN_ss',
                        query: 'schema_s:(schema_s:absPermit )'
                    };

                    
                    var dateType = 'createdDate_dt:'
                    if($scope.filters.dateType){
                        dateType = $scope.filters.dateType;
                    }

                    if($scope.filters.startDate || $scope.filters.endDate) {
                        var startDate   = $scope.filters.startDate ? solr.escape($scope.filters.startDate + 'T00:00:00.000Z') : '*';
                        var endDate     = $scope.filters.endDate ?  solr.escape($scope.filters.endDate + 'T23:59:59.999Z') : '*';
                        nationalRecordsQuery.query += ' AND ' + dateType + ' [ ' + startDate + ' TO ' + endDate + ' ]';
                    }                    
                    
                     if($scope.filters.countries)
                        nationalRecordsQuery.query += ' AND government_s:(' +_.map($scope.filters.countries, solr.escape).join(' ') + ')';

                    $q.when(partyStatusQuery(), function(data){
                        
                        if(data){
                            nationalRecordsQuery.query += data;
                        }

                        $q.when(searchService.list(nationalRecordsQuery))
                                .then(function(results) {

                                    var nationalRecords = {NumberOfIRCC:{}, GrantedTo:{}, 
                                        UsageAndGranted:{}, subjectMatter:{},
                                        countries:{}
                                    };
                                    var data = results.data.response.docs;

                                    nationalRecords.irccCount = results.data.response.numFound;
                                    /////////////////////////////
                                    ///////NumberOfIRCC
                                    //////////////////////////////
                                    nationalRecords.NumberOfIRCC.commercial         =  countIncludes(data, 'usages_EN_ss', 'Commercial');
                                    nationalRecords.NumberOfIRCC.nonCommercial      =  countIncludes(data, 'usages_EN_ss', 'Non-Commercial');
                                    nationalRecords.NumberOfIRCC.commercialAndNonCommercial = _.filter(data, function(doc){
                                                            return _.includes(doc.usages_EN_ss, 'Commercial')
                                                                && _.includes(doc.usages_EN_ss, 'Non-Commercial');
                                                        }).length
                                    nationalRecords.NumberOfIRCC.confidential       =  count(data, 'usagesConfidential_b', true);
                                    nationalRecords.NumberOfIRCC.nonConfidential    =  count(data, 'usagesConfidential_b', false);
                                    
                                    /////////////////////////////
                                    ///////GrantedTo
                                    //////////////////////////////
                                    nationalRecords.GrantedTo.national = _.filter(data, function(doc){
                                                            return _.includes(doc.entitiesToWhomPICGrantedCountry_EN_ss, doc.government_EN_s);
                                                        }).length
                                    nationalRecords.GrantedTo.confidential       =  count(data, 'entitiesToWhomPICGrantedConfidential_b', true);
                                    nationalRecords.GrantedTo.nonConfidential    =  count(data, 'entitiesToWhomPICGrantedConfidential_b', false);
                                            
                                    /////////////////////////////
                                    ///////UsageAndGranted
                                    //////////////////////////////
                                    nationalRecords.UsageAndGranted.commercialNational = _.filter(data, function(doc){
                                        return _.includes(doc.entitiesToWhomPICGrantedCountry_EN_ss, doc.government_EN_s)
                                                && _.includes(doc.usages_EN_ss, 'Commercial');
                                    }).length
                                    nationalRecords.UsageAndGranted.nonCommercialNational = _.filter(data, function(doc){
                                        return _.includes(doc.entitiesToWhomPICGrantedCountry_EN_ss, doc.government_EN_s)
                                            && _.includes(doc.usages_EN_ss, 'Non-Commercial');
                                    }).length;            
                                    nationalRecords.UsageAndGranted.commercialForeign = _.filter(data, function(doc){
                                        return !_.includes(doc.entitiesToWhomPICGrantedCountry_EN_ss, doc.government_EN_s)
                                                && _.includes(doc.usages_EN_ss, 'Commercial');
                                    }).length
                                    nationalRecords.UsageAndGranted.nonCommercialForeign = _.filter(data, function(doc){
                                        return !_.includes(doc.entitiesToWhomPICGrantedCountry_EN_ss, doc.government_EN_s)
                                            && _.includes(doc.usages_EN_ss, 'Non-Commercial');
                                    }).length;
                                    
                                    ///////////////////////////
                                    ///////Subject Matter
                                    //////////////////////////
                                    _.forEach(data, function(doc){
                                        _.forEach(doc.keywords_EN_ss, function(keyword){
                                            if(!nationalRecords.subjectMatter[keyword])
                                                nationalRecords.subjectMatter[keyword]=0;
                                            nationalRecords.subjectMatter[keyword] +=1;
                                        })
                                    })
                                    
                                    nationalRecords.userCountries = {};
                                    nationalRecords.GrantedTo.foreign = 0;
                                    _.forEach(data, function(doc){
                                            ///////////////////////////
                                            ///////Top Countries
                                            //////////////////////////
                                            if(!nationalRecords.countries[doc.government_EN_s])
                                                nationalRecords.countries[doc.government_EN_s]=0;
                                            nationalRecords.countries[doc.government_EN_s] +=1;

                                            ///////////////////////////
                                            ///////Top user countries
                                            //////////////////////////
                                            if(doc.entitiesToWhomPICGrantedCountry_EN_ss){
                                                _.forEach(doc.entitiesToWhomPICGrantedCountry_EN_ss, function(country){

                                                    if( doc.government_EN_s!=country){
                                                        if(!nationalRecords.userCountries[country])
                                                            nationalRecords.userCountries[country]=0;
                                                        
                                                        nationalRecords.userCountries[country] += 1;
                                                        nationalRecords.GrantedTo.foreign += 1;    
                                                    }
                                                })
                                            }
                                    })


                                    



                                    $scope.irccCounts = nationalRecords
                                })
                                .catch(function(error) {
                                    console.log(error);
                                })
                                .finally(function() {
                                    $scope.loadingFacets = false;
                                });                       
                    });                    

                }

                function countIncludes(data, field, value){
                    return _.filter(data, function(doc){
                        return _.includes(doc[field], value);
                    }).length
                }
                function count(data, field, value){
                    return _.filter(data, function(doc){
                        return doc[field]==value;
                    }).length
                }
                // 
                $scope.loadFacets();

                function partyStatusQuery(){

                    if(!$scope.filters.partyStatus || $scope.filters.partyStatus == 1){
                        var defer = $q.defer();
                        defer.resolve();
                        return defer.promise;
                    }
                    else{

                       return $q.when(commonjs.getCountries())
                          .then(function(data){
                            
                             var countries = _.filter(data, function(country){

                                 if($scope.filters.partyStatus==2)
                                    return country.isParty;
                                else if($scope.filters.partyStatus==3)
                                    return !country.isParty;
                                else if($scope.filters.partyStatus==4)
                                    return country.isInbetweenParty;

                             });
                            var countryCodes = _.map(countries, 'code');
                            if(countryCodes.length == 0)
                                countryCodes.push('n-a');

                            var resultCountries = countryCodes.join(' ').toLowerCase()
                            return ' AND government_s:(' + resultCountries + ')';
                            
                          });
                    }

                }

                function drawChart(id, areaChartData, chartObject){
                     if(chartObjects[chartObject])
                            chartObjects[chartObject].destroy();
                            
                    var areaChartOptions = {
                        //Boolean - If we should show the scale at all
                        showScale: true,
                        //Boolean - Whether grid lines are shown across the chart
                        scaleShowGridLines: true,
                        //String - Colour of the grid lines
                        scaleGridLineColor: "rgba(0,0,0,.05)",
                        //Number - Width of the grid lines
                        scaleGridLineWidth: 1,
                        //Boolean - Whether to show horizontal lines (except X axis)
                        scaleShowHorizontalLines: true,
                        //Boolean - Whether to show vertical lines (except Y axis)
                        scaleShowVerticalLines: true,
                        //Boolean - Whether the line is curved between points
                        bezierCurve: true,
                        //Number - Tension of the bezier curve between points
                        bezierCurveTension: 0.3,
                        //Boolean - Whether to show a dot for each point
                        pointDot: false,
                        //Number - Radius of each point dot in pixels
                        pointDotRadius: 4,
                        //Number - Pixel width of point dot stroke
                        pointDotStrokeWidth: 1,
                        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                        pointHitDetectionRadius: 20,
                        //Boolean - Whether to show a stroke for datasets
                        datasetStroke: true,
                        //Number - Pixel width of dataset stroke
                        datasetStrokeWidth: 2,
                        //Boolean - Whether to fill the dataset with a color
                        datasetFill: true,
                        //String - A legend template
                        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
                        //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
                        maintainAspectRatio: true,
                        //Boolean - whether to make the chart responsive to window resizing
                        responsive: true
                    };

                    //-------------
                    //- LINE CHART -
                    //--------------
                    var lineChartCanvas = $(id).get(0).getContext("2d");
                    var lineChart = new Chart(lineChartCanvas);
                    var lineChartOptions = areaChartOptions;
                    lineChartOptions.datasetFill = false;
                    chartObjects[chartObject] = lineChart.Line(areaChartData, lineChartOptions);
                    
                }
               
                function loadChartData(options){
                    
                    var queryFacetsParameters = {
                        'q': '(realm_ss:' + appConfigService.currentRealm.toLowerCase() + ') AND NOT version_s:*',
                        'fl': 'id',
                        'wt': 'json',
                        'rows': 0,
                        'facet': true,
                        'facet.limit': 1012,
                        'facet.range' : 'createdDate_dt',
                        'facet.range.gap' : '+1MONTH',
                        'facet.range.start' : 'NOW/MONTH-' + (monthsDifference("2014-10-12")) + 'MONTH',
                        'facet.range.end' : 'NOW+1MONTH/MONTH'
                    };

                    if(options.type == 'national'){
                            queryFacetsParameters.q += ' AND schema_s:(' + (options.schema ? options.schema : _.without(appConfigService.nationalSchemas, "contact", $scope.filters.excludeNFP ? "focalPoint":"").join(' ')) + ')'
                        if(!$scope.filters.regionalMeasures)
                            queryFacetsParameters.q += ' AND NOT virtual_b:*' 
                        
                        if($scope.filters.countries)
                            queryFacetsParameters.q += ' AND government_s:(' + $scope.filters.countries.join(' ') + ')';                   
                            
                        if(options.partyStatusData){
                            queryFacetsParameters.q += options.partyStatusData;
                        }                        
                        
                    }
                    else if(options.type == 'reference')
                        queryFacetsParameters.q += ' AND schema_s:(' + (options.schema ? options.schema : appConfigService.referenceSchemas.join(' ')) + ')'

                    var dateType = 'createdDate_dt:'
                    if($scope.filters.dateType){
                        dateType = $scope.filters.dateType;
                        queryFacetsParameters['facet.range'] = dateType.replace(':','');
                    }

                    if($scope.filters.startDate || $scope.filters.endDate) {
                        var startDate = $scope.filters.startDate ? solr.escape($scope.filters.startDate + 'T00:00:00.000Z') : '*';
                        var endDate = $scope.filters.endDate ? solr.escape($scope.filters.endDate + 'T23:59:59.999Z') : '*';

                        if(startDate!='*')
                            queryFacetsParameters['facet.range.start'] = 'NOW+1MONTH/MONTH-' + monthsDifference(startDate) + 'MONTH';
                        if(endDate!='*')
                            queryFacetsParameters['facet.range.end']   = 'NOW+1MONTH/MONTH-' + monthsDifference(endDate) + 'MONTH';                                       
                        
                    }
                    
                    
                    var queryAction = $http.get('/api/v2013/index/select', {
                        params: queryFacetsParameters
                    });

                   return $q.all([queryAction])
                    .then(function(results) {
                        var data = { labels: [], data: [] };
                        var facets = searchService.readFacets(results[0].data.facet_counts.facet_ranges[($scope.filters.dateType||'createdDate_dt').replace(':','')].counts)
                        _.forEach(facets, function(facet, i) {
                            var label = moment.utc(facet.symbol).format('MMMM YYYY');
                            data.labels.push(label)
                            var prevCount =0;
                            if($scope.filters && $scope.filters.cumulative && i>0){
                                prevCount = data.data[i-1];
                            }
                            data.data.push(facet.count+prevCount);
                            var tableData = options.type == 'national' ? $scope.nationalRecordsTableData : $scope.referenceRecordsTableData;

                            var tableRow = _.find(tableData , { label : label }) || {label : label, new:true};
                            if(options.schema) 
                                tableRow[options.schema] = facet.count+prevCount;
                            else
                                tableRow['recordCount'] = facet.count+prevCount
                            if(tableRow.new){                                
                                 delete tableRow.new;
                                 tableData.push(tableRow)
                            }
                        });  
                        
                        return data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    })                     
                   
                }

                function monthsDifference(date){
                    var today = moment.utc();
                    var entry = moment.utc(date);
                    if(entry >= today)
                        return 0;
                    return Math.floor(today.diff(entry, 'month', true));
                }
                
                $scope.loadSchemaGraphData = function(schema, schemaKey){
                    
                    $q.when(partyStatusQuery(), function(data){

                            var chartData   = $scope.nationalRecords[schemaKey] ? nationalChartData : referenceChartData;
                            var type        = $scope.nationalRecords[schemaKey] ? 'national' : 'reference';
                            
                            if(schema.includeInGraph && !_.some(chartData.datasets, function(ds){return ds.schema == schemaKey})){
                                $scope.loadingFacets = true;
                                loadChartData({type:type, partyStatusData:data, schema: schemaKey})
                                .then(function(schemaData){
                                    schemaData.label = $filter("schemaShortName")(schemaKey);
                                    schemaData.schema = schemaKey;

                                    var dataset = {
                                        label: "", pointHighlightFill: "#fff", data: []
                                    }
                                    dataset.fillColor = dataset.strokeColor = dataset.pointColor = 
                                    dataset.pointStrokeColor = dataset.pointHighlightStroke = schema.color

                                    chartData.datasets.push(_.extend(dataset, schemaData));
                                    
                                    drawChart("#" + type +"RecordsChart", chartData, type +'ChartObject');


                                })
                                .finally(function(){$scope.loadingFacets = false;})
                            }
                            else if(!schema.includeInGraph){
                                chartData.datasets = _.filter(chartData.datasets, function(ds){return ds.schema != schemaKey});
                                drawChart("#" + type +"RecordsChart", chartData, type +'ChartObject');
                            }
                        });
                  
                }

                $scope.checkAll = function(records, val){
                    _.map(records, function(record, key){
                        record.includeInGraph = val;
                        $scope.loadSchemaGraphData(record, key)
                    })
                }

            }]);
    });
