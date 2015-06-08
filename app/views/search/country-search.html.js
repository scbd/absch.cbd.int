define(['app','underscore','angular-localizer','scbd-angularjs-services','scbd-angularjs-filters','scbd-angularjs-controls'], function (app, _) {
   
    app.controller('searchByCountryController', ['$scope', '$http', 'realm','$q','$filter',
        function ($scope, $http, realm, $q, $filter) {
            
        $scope.countries=[];
        $scope.colors={};
       // $scope.loading=true;

        $http.get("/api/v2013/thesaurus/domains/countries/terms",{ cache: true }).then(function (o) {$scope.countries = $filter('orderBy')(o.data, 'name');});

        if(!$scope.options) {
            $scope.options = {
                countries: $http.get("/api/v2013/thesaurus/domains/countries/terms",{ cache: true }).then(function (o) { return $filter('orderBy')(o.data, 'name'); }),
            };
        }

        $scope.nationalRecords = [
            { identifier: 'authority'                   , title: 'Competent National Authority'},
            { identifier: 'measure'                     , title: 'National Measures'},
            { identifier: 'absCheckpoint'               , title: 'ABS Checkpoint' },
            { identifier: 'database'                    , title: 'National Website or Database'},
            { identifier: 'focalPoint'                  , title: 'ABS Focal Point'  },
            { identifier: 'absPermit'                   , title: 'IRCC' },
            { identifier: 'absCheckpointCommunique'     , title: 'CPC' },
        ];
        
          $scope.showSchemas = ["authority","measure","absCheckpoint","database","focalPoint","absPermit","absCheckpointCommunique"];

        $scope.querySchema     = " ( schema_s: authority OR schema_s: measure OR schema_s: absCheckpoint OR schema_s: database OR schema_s: focalPoint OR schema_s: absPermit OR schema_s: absCheckpointCommunique) ";
        $scope.queryGovernment = '*:*';
        $scope.queryKeywords = '*:*';

        //================================================
        $scope.query = function () {

            // NOT version_s:* remove non-public records from resultset
            var q = 'NOT version_s:* AND realm_ss: '+ realm.value.toLowerCase() + ' AND ' + $scope.querySchema  + ' AND ' + $scope.queryGovernment;

            var queryParameters = {
                'q': q,
                'sort': 'government_EN_t asc, createdDate_dt desc, title_t asc',
                'fl': 'id,title_t,description_t,url_ss,schema_EN_t,date_dt,government_EN_t,schema_s,summary_EN_t,jurisdiction_EN_t, type_ss, uniqueIdentifier_s',
                'wt': 'json',
                'start': 0,
                'rows': 1000,
                'cb': new Date().getTime(),
                'group':true,
                'group.field':'government_s',
                'group.limit':1000,
                'group.sort': 'government_EN_t asc'
            };

            $http.get('/api/v2013/index/select', { params: queryParameters}).success(function (data) {
                
                $scope.documents = data.grouped.government_s.groups;
                $scope.records = $scope.documents;
                
            }).error(function (error) { console.log('onerror'); console.log(error); });
        };


        

        //================================================
        $scope.$watch('government', function() {

                  if(!$scope.government) {
                     $scope.queryGovernment = "*:*";
                     $scope.runSearch();
                }
  
                $scope.queryGovernment = buildQuery($scope.government, "government_s"); 
                $scope.runSearch();
                //updateMap(recs, $scope.documents, "#666666");

                return;
        });

        //================================================
        $scope.$watch('schema', function() {

                 if(!$scope.schema) {
                     $scope.querySchema = " ( schema_s: authority OR schema_s: measure OR schema_s: absCheckpoint OR schema_s: database OR schema_s: focalPoint OR schema_s: absPermit OR schema_s: absCheckpointCommunique) ";
                     $scope.runSearch();
                }

             
                $scope.querySchema = buildQuery($scope.schema, "schema_s"); 
                $scope.runSearch();
                //updateMap(recs, $scope.documents, "#666666");

                return;
        });


        //================================================
        function buildQuery (filter, field) {

            if(!filter) return '*:*';
            if(!filter.length === 0) return '*:*';
            
            console.log("building query");

            var conditions = [];

            filter.forEach(function (item) {
                if(item)
                    conditions.push(field+':'+item.identifier);
            });

            var query = '';

            conditions.forEach(function (condition) { query = query + (query==='' ? '( ' : ' OR ') + condition; });
            query += ' )';

            return query;
        }




        //================================================
        // $scope.$watch('records', function() {
        //
        //     if(!$scope.records){
        //         console.log("watching records !rec")
        //         return;
        //     }
        //
        //     if($scope.records.length == 0){
        //         console.log("watching records rec.length=0")
        //         $('#vmap').vectorMap('set', 'colors', '');
        //         return;
        //     }
        //
        //
        //     console.log("watching records");
        //
        //     startMap($scope.documents,'#ffffff');
        //     updateMap($scope.records, $scope.documents, '#428bca');
        //
        //     delete $scope.loading;
        //
        // });

        //================================================
        //================================================
        //================================================
        //================================================
        //================================================


        //================================================
        $scope.updateMap = function(recs, docs, color) {

            var map_index = getMapIndex();

            if(!docs || !recs){
                console.log("udpate map !rec")
                return;
            }

            console.log("udpatING MAP");

            //set all countries to white
            _.each($scope.countries, function(item) {
                $("#jqvmap" + map_index + "_" + item.identifier).attr("fill", "#ffffff");
            });

            //set all countries to white
            _.each(recs, function(item) {
                $("#jqvmap" + map_index + "_" + item.groupValue).attr("fill", color);
            });

        }

        //================================================
        function startMap(recs, color) {

            if(!recs){
                return;
            }

            if(recs.length == 0){
                return;
            }

            var colors = {};

            _.forEach(recs, function(item) {
                colors[item.groupValue] = color;
            });

            $('#vmap').vectorMap('set', 'colors', colors);

        }

        //================================================
        function getMapIndex(id) {
            if (!id)
                id = 1;
            //the jvqmap increase its index when map is visisted multiple times
            //hence get the index of any country and use it for all others
            //TODO: check why
            if ($("#jqvmap" + id + "_ca").length == 0)
              return getMapIndex(id + 1)

            return id;
        }

        //================================================
        function loadMap() {

            $('#vmap').vectorMap({
                map: 'world_en',
                backgroundColor: null,
                    backgroundColor: '#fff',
                   color: '#ffffff',
                   hoverOpacity: 0.7,
                   selectedColor: '#666666',
                   enableZoom: true,
                   showTooltip: true,
                   normalizeFunction: 'polynomial',
                   onRegionClick: function(element, code, region)
                    {
                        $scope.government = "[{'identifier','" + code + "'}]";
                    }
            });
            $('.jqvmap-zoomin').html('<i class="glyphicon glyphicon-plus"/>')
            $('.jqvmap-zoomout').html('<i class="glyphicon glyphicon-minus"/>')

        }

        //================================================
        $scope.runSearch= function() {
           // $scope.loading = true;
            $scope.query();
           // $scope.updateMap($scope.records, $scope.documents, "#428bca");
           // delete $scope.loading;
        }

        //================================================


       // loadMap();
        $scope.runSearch();


    }]);
});
