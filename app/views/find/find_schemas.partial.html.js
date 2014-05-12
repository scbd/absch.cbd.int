define(['app'], function (app) {

app.directive('searchFilterSchemas', function ($http) {
    return {
        restrict: 'EAC',
        templateUrl: '/app/views/find_schemas.partial.html',
        replace: true,
        scope: {
              title: '@title',
              items: '=ngModel',
              field: '@field',
              query: '=query',
        },
        link: function ($scope, element, attrs, ngModelController)
        {
        },
        controller : ['$scope', '$element', '$location', 'Thesaurus', "IStorage", "guid", "$q", "Enumerable", "$filter",
         function ($scope, $element, $location, Thesaurus, storage, guid, $q, Enumerable, $filter)
        {
            $scope.expanded = false;
            $scope.selectedItems = [];
            $scope.facet = $scope.field.replace('_s', ''); // TODO: replace @field by @facet

            $scope.expandSearch = 0;
            $scope.msrAdoptionDate= '*:*'
            $scope.msrRetirementDate= '*:*'
            $scope.msrEntryinForceDate= '*:*'
            $scope.mssApplicationDate= '*:*'

            $scope.permitIssuanceDate= '*:*'
            $scope.permitExpiryDate= '*:*'

            $scope.options  = {
               jurisdiction             : function () { return $http.get("/api/v2013/thesaurus/domains/7A56954F-7430-4B8B-B733-54B8A5E7FF40/terms",  { cache: true }).then(function(o){ return o.data; }); },
               status                   : function () { return $http.get("/api/v2013/thesaurus/domains/ED7CDBD8-7762-4A84-82DD-30C01458A799/terms",  { cache: true }).then(function(o){ return o.data; }); },
               typeOfDocuments          : function () { return $http.get("/api/v2013/thesaurus/domains/144CF550-7629-43F3-817E-CACDED34837E/terms",  { cache: true }).then(function(o){ return o.data; }); },
               absJurisdictions         : function () { return $http.get("/api/v2013/thesaurus/domains/51A113E9-071F-440A-83DC-E3499B7C646D/terms", { cache: true }).then(function (o) { return o.data; }); },
               absGeneticResourceTypes  : function () { return $http.get("/api/v2013/thesaurus/domains/1A22EAAB-9BBC-4543-890E-DEF913F59E98/terms", { cache: true }).then(function (o) { return Thesaurus.buildTree(o.data); }); },
               keywords                 : function () { return $http.get("/api/v2013/thesaurus/domains/1A22EAAB-9BBC-4543-890E-DEF913F59E98/terms", { cache: true }).then(function (o) { return Thesaurus.buildTree(o.data); }); },
               usage                    : function () { return $http.get("/api/v2013/thesaurus/domains/A7B77788-8C90-4849-9327-E181E9522F3A/terms", { cache: true }).then(function (o) { return o.data; }); },
               cpjurisdictions          : function () { return $http.get("/api/v2013/thesaurus/domains/D7BD5BDE-A6B9-4261-B788-16839CCC4F7E/terms", { cache: true }).then(function(o){ return o.data; }); },
               countries                : function () { return $http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }).then(function (o) { return $filter("orderBy")(o.data, "name"); }); },
               resourceTypes            : function () { return $http.get("/api/v2013/thesaurus/domains/83BA4728-A843-442B-9664-705F55A8EC52/terms", { cache: true }).then(function(o){ return Thesaurus.buildTree(o.data); }); },
               regions                  : function () { return $q.all([$http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }),
                                                            $http.get("/api/v2013/thesaurus/domains/regions/terms",   { cache: true })]).then(function(o) {
                                                                            return Enumerable.from($filter("orderBy")(o[0].data, "name")).union(
                                                                                   Enumerable.from($filter("orderBy")(o[1].data, "name"))).toArray();
                                                           });
                                                      },            
                absSubjects             : function () { return $http.get("/api/v2013/thesaurus/domains/CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924/terms", { cache: true }).then(function(o){ return o.data; }); },
                
            };

            $scope.isSelected = function(item) {
                return $.inArray(item.symbol, $scope.selectedItems) >= 0;
            };


            $scope.closeDialog = function() {
                $element.find("#dialogSelect").modal("hide");
            };

            $scope.actionSelect = function(item) {

                if($scope.isSelected(item)) {
                    $scope.selectedItems.splice($.inArray(item.symbol, $scope.selectedItems), 1);
                } else {
                    $scope.selectedItems.push(item.symbol);
                }

                $scope.updateQuery();
            };

            $scope.actionExpand = function() {

                var count1 = Math.ceil($scope.items.length/3);
                var count2 = Math.ceil(($scope.items.length-count1)/2);
                var count3 = Math.ceil(($scope.items.length-count2-count1));

                $scope.items1 = $scope.items.slice(0, count1);
                $scope.items2 = $scope.items.slice(count1, count2+count2);
                $scope.items3 = $scope.items.slice(count1+count2, count1+count2+count3);

                $element.find("#dialogSelect").modal("show");
            };

            $scope.$on('onExpand', function(scope) {
                if(scope!=$scope && $scope.expanded)
                    $scope.expanded = false;
            });

            $scope.filterx = function(item) {
                return $scope.isSelected(item) || $scope.expanded;
            };

            $scope.ccc = function(item) {
                return $scope.isSelected(item) ? 'facet selected' : 'facet unselected';
            };

            $scope.updateQuery = function() {
                
                $scope.query = '';

                $scope.selectedItems.forEach(function(item) {
                    $scope.query += ($scope.query=='' ? '' : ' OR ') + $scope.field+':' + item;
                });

                if($scope.query!='')
                    $scope.query = '(' + $scope.query + ')';
                else
                    $scope.query = '*:*';

                console.log($scope.query);
            };

            $scope.onclick = function (scope, evt) {
                
                $scope[scope].selected = !$scope[scope].selected;
                $scope.expandSearch--;
                //console.log( $scope.terms);
                buildQuery();
            }

            function buildQuery () {
                var conditions = [];
                buildConditions(conditions, $scope.terms);

                if(conditions.length==0) $scope.query = '*:*';
                else {
                    var query = '';
                    conditions.forEach(function (condition) { query = query + (query=='' ? '( ' : ' OR ') + condition; });
                    query += ' )';
                    $scope.query = query;
                    console.log (query);
                }
            }

            function buildConditions (conditions, items) {
                items.forEach(function (item) { 

                    if(item.selected){

                        var subFilterQuery = '(' + $scope.field+':'+item.identifier;
                        if(item.subFilters){
                            item.subFilters.forEach(function(filter){

                                    // console.log($scope);
                                    // console.log($scope['msrTJurisdiction'])
                                if(filter.type=='multiselect'){
                                    if( $scope[filter.name] && $scope[filter.name].length > 0){
                                        // debugger;
                                        var selectedValues = $scope[filter.name];    
                                        console.log (selectedValues)                                     ;
                                            subFilterQuery = subFilterQuery + ' AND (' + filter.field +':'+ selectedValues.join(' OR ' + filter.field + ': ') + ')';      
                                            //subFilterQuery = subFilterQuery.replace(',', ' OR ');                                        
                                    }
                                }
                                else if(filter.type=='calendar'){
                                        var selectedValues = $scope[filter.name];  
                                        if(selectedValues != '*:*'){
                                            subFilterQuery = subFilterQuery + ' AND ' + selectedValues;                                                  
                                        }
                                }
                                else {
                                    if($scope[filter.name])
                                        subFilterQuery = subFilterQuery + ' AND ('  + filter.field +':'+  $scope[filter.name] + ')';       
                                }
                            });
                        }

                      subFilterQuery = subFilterQuery + ')'
                //console.log(subFilterQuery);
                        conditions.push(subFilterQuery);
                    }
                });                 
 
            }


            function dictionarize(items) {
                var dictionary = [];
                items.forEach(function (item) { 
                    item.selected = false;
                    dictionary[item.identifier] = item;
                });
                return dictionary;
            }

            $scope.focalpoint              = { identifier: 'focalPoint',               title: 'National Focal Points'
                                             };
            $scope.authority               = { identifier: 'authority',                title: 'Competent National Authorities' ,
                                               subFilters : [
                                                                { name: 'cnaResponsibleForAll',     type: 'yesno' , field: 'responsibleForAll_b'},
                                                                { name: 'cnaJurisdiction',          type: 'multiselect', field: 'jurisdiction_s' },
                                                                { name: 'cnaGeneticResourceTypes',  type: 'multiselect' , field: 'geneticResourceTypes_ss'}                                                         
                                                            ]
                                             };
            $scope.database                = { identifier: 'database',                 title: 'National Websites and Databases', count: 0 };
            $scope.measure                 = { identifier: 'measure',                  title: 'Legislative, administrative and policy measures', count: 0,
                                               subFilters : [
                                                                { name: 'msrJurisdiction', type: 'multiselect', field: 'jurisdiction_s' },
                                                                { name: 'msrStatus', type: 'multiselect', field: 'status_s' },
                                                                { name: 'msrType', type: 'multiselect', field: 'type_s' },

                                                                { name: 'msrAdoptionDate', type: 'calendar' , field: 'adoption_s'},
                                                                { name: 'msrRetirementDate', type: 'calendar' , field: 'retired_s'},
                                                                { name: 'msrEntryinForceDate', type: 'calendar' , field: 'entryIntoForce_s'},
                                                                { name: 'mssApplicationDate', type: 'calendar' , field: 'limitedApplication_s'}      
                                                            ]
                                            };
            $scope.absPermit               = { identifier: 'absPermit',                title: 'Permits and their equivalent' ,
                                               subFilters : [
                                                                //{ name: 'permitAuthority',  type: 'reference' , field: 'jurisdiction_s'},
                                                                { name: 'permitusage',      type: 'multiselect' , field: 'usage_ss'},
                                                                { name: 'permitkeywords',   type: 'multiselect' , field: 'keywords_ss'},
                                                                { name: 'permitExpiryDate', type: 'calendar' , field: 'expiration_s'},
                                                                { name: 'permitIssuanceDate', type: 'calendar' , field: 'date_s'}      
                                                            ]
                                             };
            $scope.absCheckpoint           = { identifier: 'absCheckpoint',            title: 'Checkpoints' ,
                                               subFilters : [
                                                                { name: 'cpInformAllAuthorities', type: 'yesno' , field: 'informAllAuthorities_b'},
                                                                { name: 'cpJurisdiction',      type: 'multiselect', field: 'jurisdiction_s' }
                                                            ]
                                              };
            $scope.absCheckpointCommunique = { identifier: 'absCheckpointCommunique',  title: 'Checkpoint Communiqués' ,
                                               subFilters : [
                                                                { name: 'cpcoriginCountries',      type: 'multiselect', field: 'originCountries_ss' }
                                                            ]
                                               };

            $scope.resource                = { identifier: 'resource',                 title: 'Virtual Library Record' ,
                                               subFilters : [
                                                                { name: 'vlrpublicationYear', type: 'multiselect', field: 'publicationYear_is'},
                                                                { name: 'vlrresourceTypes',   type: 'multiselect' , field: 'resourceTypes_ss'},
                                                                { name: 'vlrRegions',         type: 'multiselect', field: 'regions_ss' }
                                                            ]
                                               };
            $scope.organization            = { identifier: 'organization',             title: 'ABS Related Organizations' };
            $scope.meeting                 = { identifier: 'meeting',                  title: 'Meetings &amp; Meeting Outcomes ({{meeting.count}})' };
            $scope.notification            = { identifier: 'notification',             title: 'Notifications' };
            $scope.pressRelease            = { identifier: 'pressRelease',             title: 'Press Releases' };
            $scope.statement               = { identifier: 'statement',                title: 'Statements' };

            $scope.terms  = [ $scope.focalpoint, $scope.authority, $scope.database, $scope.measure, $scope.absPermit, $scope.absCheckpoint, $scope.absCheckpointCommunique, $scope.resource, $scope.organization, $scope.meeting, $scope.notification, $scope.pressRelease, $scope.statement ];
            $scope.termsx = dictionarize($scope.terms);

            // Set intitial selection from QueryString parameters

            var initialSelection = $location.search()[$scope.facet];

            if(initialSelection && $scope.termsx[initialSelection]) {
                $scope.termsx[initialSelection].selected = true;
            }

            function onWatch_items(values) { if(!values) return;
                values.forEach(function (item) { console.log (item);
                    if(_.has($scope.termsx, item.symbol))
                    {
                        $scope.termsx[item.symbol].count = item.count;

                    }
                });
            }

            $scope.$watch('items', onWatch_items);
 
            $scope.refresh = function(selected){
                
                if(selected)
                    $scope.expandSearch++;
                else
                    $scope.expandSearch--;

                buildQuery();
            }
            
            buildQuery();
            
            $scope.terms.forEach(function (item) { 
                if(item.subFilters){
                    item.subFilters.forEach(function(filter){
                        $scope.$watch(filter.name, 
                            function(oldValue, newValue){
                               if(oldValue != newValue){
                                    buildQuery();
                                }
                            });
                        }
                    );                    
                }
            });

            // $('.dropdownCheck').on("click", "*", function (e) {
            //     e.stopPropagation();
            // });

            // // $('.date-filter').on("click", "ul li *", function (e) {
            // //     e.stopPropagation();
            // // });
            // $(document).on('click', 'blaise.ul', function (e) {
            //     e.stopPropagation();
            // });
            

        }]
    }
});
});