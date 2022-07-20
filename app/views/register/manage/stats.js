import app from '~/app';
import _ from 'lodash';
import 'chart-js';
import '~/components/scbd-angularjs-services/main';
import '~/services/main';
import 'moment';
import '~/views/register/directives/register-top-menu';
import '~/components/scbd-angularjs-controls/main';

        
        export { default as template } from './stats.html';

        export default ["$scope", "$timeout", "IGenericService", "solr", "commonjs", "searchService", "$rootScope", 
        "$q", "$filter", "appConfigService", "IStorage",
            function ($scope, $timeout, IGenericService, solr, commonjs, searchService, $rootScope,
             $q, $filter, appConfigService, storage) {
                    var pieObject;

                    $scope.filters = {};
                    $scope.schemas = [
                        {
                        value: 0,
                        color: "#f56954",
                        highlight: "#f56954",
                        schema: "authority",
                        label : "Competent National Authority (CNA)",
                        class : "text-red"
                        },
                        {
                        value: 0,
                        color: "#00a65a",
                        highlight: "#00a65a",
                        schema: "measure",
                        label : "Legislative, administrative or policy measures on access and benefit-sharing (MSR)",
                        class : "text-green"
                        },
                        {
                        value: 0,
                        color: "#f39c12",
                        highlight: "#f39c12",
                        schema: "database",
                        label : "National Website or Database (NDB)",
                        class : "text-yellow"
                        },
                        {
                        value: 0,
                        color: "#00c0ef",
                        highlight: "#00c0ef",
                        schema: "absPermit",
                        label : "Permit or its equivalent constituting an internationally recognized certificate of compliance (IRCC)",
                        class : "text-aqua"
                        },
                        {
                        value: 0,
                        color: "#3c8dbc",
                        highlight: "#3c8dbc",
                        schema: "absCheckpoint",
                        label : "Checkpoint (CP)",
                        class : "text-light-blue"
                        },
                        {
                        value: 0,
                        color: "#3c8dbc",
                        highlight: "#3c8dbc",
                        schema: "absProcedure",
                        label : "ABS Procedure (PRO)",
                        class : "text-light-blue"
                        },
                        {
                        value: 0,
                        color: "#d2d6de",
                        highlight: "#d2d6de",
                        schema: "absCheckpointCommunique",
                        label : "Checkpoint Communiqué (CPC)",
                        class : "text-gray"
                        },
                        {
                        value: 0,
                        color: "#d2d6de",
                        highlight: "#d2d6de",
                        schema: "absNationalReport",
                        label : " Interim National Report on the Implementation of the Nagoya Protocol (NR)",
                        class : "text-orange"
                        }
                    ]
                    $scope.options = {                    
                                        countries: function () {
                                            return $.when(commonjs.getCountries()).then(function(o){
                                                var countries = $filter("orderBy")(o, "name.en");
                                                return _.map(countries, function(country){ return _.extend(country, {identifier:country.code})});
                                            });
                                        }
                    };
                   
                    function loadGovernmentStats(government){

                        IGenericService.query('v2017', 'countries-pending-tasks')
                                        .then(function (result) {
                                            $scope.pendingTasks = result;

                                            _.forEach(result, function(task){
                                                if(task.hasOwnProperty('hasABSPA')){
                                                    $scope.hasPublishingAuthority = task.hasABSPA;
                                                }
                                            })
                                        });
                        $q.when(searchService.governmentSchemaFacets(government))
                        .then(function(data){
                            console.log(data);
                            // if(data){
                                _.forEach($scope.schemas, function(schema){
                                    if(data && data.schemas)
                                        schema.value = data.schemas[schema.schema]||0;
                                    else
                                        schema.value = 0
                                })
                            // }
                            updatePieChart();
                        })

                        loadPendingReferenceUpdate(government);

                        $q.when(loadRecords('measure'))
                        .then(function(documents){
                            $scope.measureElementMissing = [];
                            _.forEach(documents, function(document){
                                if((document.absMesasureNotApplicable===undefined || document.absMesasureNotApplicable===false)
                                    && document.absMesasure===undefined){
                                        $scope.measureElementMissing.push(document);
                                    }
                            });
                        });
                    }

                    function loadPendingReferenceUpdate(government){

                        var searchQuery = {
                            fields: 'id,schema_s, title_t, uniqueIdentifier_s,uniqueIdentifierRevisions_ss, updatedDate_dt, _revision_i',
                            query : 'government_s:' + solr.escape(government) + ' AND schema_s:(' + 
                                    _(appConfigService.nationalSchemas).without("contact", "focalPoint").map(solr.escape).value().join(' ') + 
                                    ') AND linkedRecordUniqueIdentifier_ss:* AND NOT virtual_b',
                            rowsPerPage : 1000
                        };

                        searchService.list(searchQuery)
                        .then(function(data){
                            console.log(data.data);
                            if(data.data && data.data.response.numFound > 0){
                                var countryDocuments = data.data.response.docs;
                                var uniqueIdentifiers = _.uniq(_.flatten(_.map(data.data.response.docs, "uniqueIdentifierRevisions_ss")));
                                var documentNumbers = _.map(uniqueIdentifiers, function(identifier){
                                                        var documentIdRevision  = identifier.replace(/((^([a-z]|[A-Z]){1,8})[\-]([a-z]|[A-Z]){1,4}[\-]([a-z]|[A-Z]){1,2}[\-])+/,'')
                                                        var documentId          = documentIdRevision.replace(/([\-][0-9]{1,2})/, '');
                                                        var documentRevision    = documentIdRevision.replace(/([0-9]{1,8}[\-])/, '');
                                                        return {identifier:identifier, documentId: documentId, solrId: commonjs.integerToHex(documentId, "nationalRecord"), revision: documentRevision };
                                                    });

                                var solrIds = _.uniq((_.map(documentNumbers, "solrId")));
                                if(solrIds.length > 0){
                                    searchQuery.query = "id:(" + _.map(solrIds, solr.escape).join(' ') + ') AND NOT virtual_b';
                                    searchService.list(searchQuery)
                                    .then(function(referenceRecords){
                                        console.log(referenceRecords);
                                        var documentsForUpdate = [];
                                        _.forEach(countryDocuments, function(document){
                                            if(document.uniqueIdentifierRevisions_ss){
                                                _.forEach(document.uniqueIdentifierRevisions_ss, function(uid){
                                                    var documentNumber = _.find(documentNumbers, {identifier:uid});
                                                    var refRecord = _.find(referenceRecords.data.response.docs, {id:documentNumber.solrId});
                                                    if(refRecord && refRecord._revision_i > Number(documentNumber.revision)){
                                                       var docForUpdate = _.find(documentsForUpdate, {id: document.id})
                                                       var idForUpdate = {
                                                                    uid : documentNumber.identifier, currentVersion : Number(documentNumber.revision),
                                                                    newVersion : refRecord._revision_i
                                                                }
                                                       if(!docForUpdate)
                                                            documentsForUpdate.push(_.extend(document,{
                                                                idForUpdate : [idForUpdate]
                                                            }));
                                                        else 
                                                            docForUpdate.idForUpdate.push(idForUpdate);
                                                        
                                                    }
                                                });
                                            }
                                        });
                                        console.log(documentsForUpdate);
                                        $scope.documentsForUpdate = documentsForUpdate;
                                    });
                                }
                            }
                        });

                    }

                    function updatePieChart(){
                        if(pieObject)
                            pieObject.destroy();
                        var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
                        var pieChart = new Chart(pieChartCanvas);
                        
                        var PieData = $scope.schemas;
                        // color: #ff851b
                        var pieOptions = {
                            //Boolean - Whether we should show a stroke on each segment
                            segmentShowStroke: true,
                            //String - The colour of each segment stroke
                            segmentStrokeColor: "#fff",
                            //Number - The width of each segment stroke
                            segmentStrokeWidth: 1,
                            //Number - The percentage of the chart that we cut out of the middle
                            percentageInnerCutout: 50, // This is 0 for Pie charts
                            //Number - Amount of animation steps
                            animationSteps: 100,
                            //String - Animation easing effect
                            animationEasing: "easeOutBounce",
                            //Boolean - Whether we animate the rotation of the Doughnut
                            animateRotate: true,
                            //Boolean - Whether we animate scaling the Doughnut from the centre
                            animateScale: false,
                            //Boolean - whether to make the chart responsive to window resizing
                            responsive: true,
                            // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
                            maintainAspectRatio: false,
                            //String - A legend template
                            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
                            //String - A tooltip template
                            tooltipTemplate: "<%=value %> <%=label%>"
                        };
                        //Create pie or douhnut chart
                        // You can switch between pie and douhnut using the method below.
                        pieObject = pieChart.Doughnut(PieData, pieOptions);
                    }

                    function loadRecords(schema) {

                        if (schema === null || schema == undefined)
                            return;

                        var qAnd = [];
                        qAnd.push("(type eq '" + schema + "')");
                            
                        var qDocuments = storage.documents.query(qAnd.join(" and ") || undefined, undefined, {body:true});

                        return $q.all([qDocuments])
                                .then(function (results) {
                                    return results[0].data.Items;
                                });
                   }
                   
                   $scope.$watch('filters', function(newVal){
                       if(newVal && newVal.government){// && !$rootScope.user.government){
                            loadGovernmentStats(newVal.government.toLowerCase())
                       }
                   }, true)

                   $scope.getDocumentsForUpdate = function(schema){
                       if(schema && $scope.documentsForUpdate){
                        //    console.log(_.find($scope.documentsForUpdate, {schema_s:schema}));
                           return _.filter($scope.documentsForUpdate, {schema_s:schema});
                       }
                   }

                    if($rootScope.user && $rootScope.user.government)
                        loadGovernmentStats($rootScope.user.government);
            }];
    
