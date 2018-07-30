define(['app', 'underscore', 'js/common', 'moment', 'components/scbd-angularjs-controls/form-control-directives/all-controls', 'components/scbd-angularjs-services/services/main', 
    'views/register/directives/register-top-menu','chart-js',
    'services/search-service','services/app-config-service',
], function (app) {

        "use strict";
        app.controller("adminReportCountController", ["$scope", "$timeout", "searchService", "realm", "commonjs", "$q", "appConfigService", "$http", "$filter",
            function ($scope, $timeout, searchService, realm, commonjs, $q, appConfigService, $http, $filter) {
                
                var chartObjects = {};

                var nationalChartData = {};
                $scope.nationalRecordsTableData = [];
                $scope.nationalChart = true;

                var referenceChartData = {};
                $scope.referenceRecordsTableData = [];
                $scope.referenceChart = true;

                $scope.filters = {startDate: '2014-10-12'};
                
                $scope.options = {
                    filterTypes: function () {
                        var types = [];
                        types.push({ 'identifier': 'authority', 'name': 'Competent National Authority' });
                        types.push({ 'identifier': 'measure', 'name': 'Legislative, administrative or policy measures' });
                        types.push({ 'identifier': 'database', 'name': 'National Websites and Databases' });
                        types.push({ 'identifier': 'absPermit', 'name': 'Internationally Recognized Certificate of Compliance' });
                        types.push({ 'identifier': 'absCheckpoint', 'name': 'Checkpoints' });
                        types.push({ 'identifier': 'absCheckpointCommunique', 'name': 'Checkpoint Communiqués' });
                        types.push({ 'identifier': 'resource', 'name': 'Virtual Library Record' });
                        return types;
                    },
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
                     $scope.nationalRecordsTableData = [];
                     $scope.nationalChart = true;
                     $scope.filters.includeAllSchemas = false;

                     $scope.referenceRecordsTableData = [];
                     $scope.referenceChart = true;
                     $scope.filters.includeAllReferenceSchemas = false;

                     var nationalRecordsQuery = {
                        rows : 300,
                        fields: 'government_s,schema_s',
                        query: 'schema_s:(' + _.without(appConfigService.nationalSchemas, "contact", $scope.filters.excludeNFP ? "focalPoint":"").join(' ') + ')'
                    };
                    var referenceRecordsQuery = {
                        rows : 300,
                        fields: 'schema_s',
                        query: 'schema_s:(' + appConfigService.referenceSchemas.join(' ') + ')'
                    };
                    var dateType = 'createdDate_dt:'
                    if($scope.filters.dateType){
                        dateType = $scope.filters.dateType;
                    }

                    if($scope.filters.startDate || $scope.filters.endDate) {
                        var startDate = $scope.filters.startDate ? $scope.filters.startDate + 'T00:00:00.000Z' : '*';
                        var endDate = $scope.filters.endDate ? $scope.filters.endDate + 'T23:59:59.999Z' : '*';

                        nationalRecordsQuery.query += ' AND ' + dateType + ' [ ' + startDate + ' TO ' + endDate + ' ]';
                        referenceRecordsQuery.query += ' AND ' + dateType + ' [ ' + startDate + ' TO ' + endDate + ' ]';
                    }
                    
                    if(!$scope.filters.regionalMeasures)
                        nationalRecordsQuery.query += ' AND NOT virtual_b:*' 
                    
                     if($scope.filters.countries)
                        nationalRecordsQuery.query += ' AND government_s:(' + $scope.filters.countries.join(' ') + ')';

                    $q.when(partyStatusQuery(), function(data){
                        
                        if(data){
                            nationalRecordsQuery.query += data;
                        }

                        $q.all([searchService.facetsPivot(nationalRecordsQuery), loadChartData({type:'national', partyStatusData:data}),
                        searchService.facets(referenceRecordsQuery), loadChartData({type:'reference'})])
                                .then(function(results) {
                                    var combineRecordsData = {};
                                    var nationalRecords = {	absCheckpoint		   : { countryCount :0, recordCount : 0, color: '#C0C0C0' },
                                                            absCheckpointCommunique: { countryCount :0, recordCount : 0, color: '#808080' },
                                                            absPermit:               { countryCount :0, recordCount : 0, color: '#800000' },
                                                            authority:               { countryCount :0, recordCount : 0, color: '#808000' },
                                                            database:                { countryCount :0, recordCount : 0, color: '#008000' },
                                                            focalPoint:              { countryCount :0, recordCount : 0, color: '#800080' },
                                                            measure:                 { countryCount :0, recordCount : 0, color: '#008080' },
                                                            absNationalReport:       { countryCount :0, recordCount : 0, color: '#000080' }
                                                        };

                                    _.each(results[0], function(country){
                                        nationalRecords.absCheckpoint.recordCount           += country.schemas.absCheckpoint||0;
                                        nationalRecords.absCheckpointCommunique.recordCount += country.schemas.absCheckpointCommunique||0;
                                        nationalRecords.absPermit.recordCount               += country.schemas.absPermit||0;
                                        nationalRecords.authority.recordCount               += country.schemas.authority||0;
                                        nationalRecords.database.recordCount                += country.schemas.database||0;
                                        nationalRecords.focalPoint.recordCount              += country.schemas.focalPoint||0;
                                        nationalRecords.measure.recordCount                 += country.schemas.measure||0;
                                        nationalRecords.absNationalReport.recordCount       += country.schemas.absNationalReport||0;

                                        nationalRecords.absCheckpoint.countryCount           += (country.schemas.absCheckpoint ? 1 : 0);
                                        nationalRecords.absCheckpointCommunique.countryCount += (country.schemas.absCheckpointCommunique ? 1 : 0);
                                        nationalRecords.absPermit.countryCount               += (country.schemas.absPermit ? 1 : 0);
                                        nationalRecords.authority.countryCount               += (country.schemas.authority ? 1 : 0);
                                        nationalRecords.database.countryCount                += (country.schemas.database ? 1 : 0);
                                        nationalRecords.focalPoint.countryCount              += (country.schemas.focalPoint ? 1 : 0);
                                        nationalRecords.measure.countryCount                 += (country.schemas.measure ? 1 : 0);
                                        nationalRecords.absNationalReport.countryCount       += (country.schemas.absNationalReport ? 1 : 0);
                                    });
                                    $scope.nationalRecords = nationalRecords;
                                    
                                    nationalChartData = {                                    
                                        labels: results[1].labels,
                                        datasets: [
                                            {
                                                label: "National Records",
                                                fillColor: "rgba(60,141,188,0.9)",
                                                strokeColor: "rgba(60,141,188,0.8)",
                                                pointColor: "#3b8bba",
                                                pointStrokeColor: "rgba(60,141,188,1)",
                                                pointHighlightFill: "#fff",
                                                pointHighlightStroke: "rgba(60,141,188,1)",
                                                data: results[1].data
                                            }
                                        ]
                                    };
                                    combineRecordsData = angular.copy(nationalChartData);
                                    if($scope.filters.excludeTotalCount){
                                        nationalChartData.datasets = [];
                                        $scope.filters.includeAllSchemas = true;
                                        $scope.checkAll($scope.nationalRecords, true)
                                    }
                                    drawChart("#nationalRecordsChart", nationalChartData, 'nationalChartObject');
                                    var referenceRecords = {resource		            : { recordCount : 0, color: '#C0C0C0' },
                                                            modelContractualClause      : { recordCount : 0, color: '#808080' },
                                                            communityProtocol           : { recordCount : 0, color: '#800000' },
                                                            capacityBuildingInitiative  : { recordCount : 0, color: '#808000' },
                                                          };

                                    _.each(results[2], function(schema){
                                        referenceRecords[schema.symbol].recordCount = schema.count||0;                                        
                                    });
                                    $scope.referenceRecords = referenceRecords;

                                    referenceChartData = {                                    
                                        labels: results[3].labels,
                                        datasets: [
                                            {
                                                label: "Reference Records",
                                                fillColor: "#fa6938",
                                                strokeColor: "#fa6938",
                                                pointColor: "#3b8bba",
                                                pointStrokeColor: "#fa6938",
                                                pointHighlightFill: "#fff",
                                                pointHighlightStroke: "#fa6938",
                                                data: results[3].data
                                            }
                                        ]
                                    };

                                    combineRecordsData.datasets.push(referenceChartData.datasets[0]);
                                    
                                    if($scope.filters.excludeTotalCount){
                                        referenceChartData.datasets = [];
                                        $scope.filters.includeAllReferenceSchemas = true;
                                        $scope.checkAll($scope.referenceRecords, true)
                                    }
                                    drawChart("#referenceRecordsChart", referenceChartData, 'referenceChartObject');

                                    drawChart("#combineRecordsChart", combineRecordsData, 'combineChartObject');
                                })
                                .catch(function(error) {
                                    console.log(error);
                                })
                                .finally(function() {
                                    $scope.loadingNationalFacets = false;
                                });                       
                    });                    

                }

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
                                    return country.isNPParty;
                                else if($scope.filters.partyStatus==3)
                                    return !country.isNPParty;
                                else if($scope.filters.partyStatus==4)
                                    return country.isNPInbetweenParty;

                             });
                            var countryCodes = _.pluck(countries, 'code');
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
                        var startDate = $scope.filters.startDate ? $scope.filters.startDate + 'T00:00:00.000Z' : '*';
                        var endDate = $scope.filters.endDate ? $scope.filters.endDate + 'T23:59:59.999Z' : '*';

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
                        _.each(facets, function(facet, i) {
                            var label = moment.utc(facet.symbol).format('MMMM YYYY');
                            data.labels.push(label)
                            var prevCount =0;
                            if($scope.filters && $scope.filters.cumulative && i>0){
                                prevCount = data.data[i-1];
                            }
                            data.data.push(facet.count+prevCount);
                            var tableData = options.type == 'national' ? $scope.nationalRecordsTableData : $scope.referenceRecordsTableData;

                            var tableRow = _.findWhere(tableData , { label : label }) || {label : label, new:true};
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
