$compile.directive('search2', function ($http) {
    return {
        restrict: 'EAC',
        templateUrl: '/app/abs/directives/search2/search2.partial.html',
        replace: true,
        // require : "?ngModel",
        scope: {
              // placeholder: '@',
              // ngDisabledFn : '&ngDisabled',
              // binding    : '=ngModel',
              // locales    : '=',
              // required   : "@"
        },
        link: function ($scope, element, attrs, ngModelController)
        {
        },
        controller: ['$scope', '$q', function ($scope, $q)
        {
            var self = this;

            this.xhr = null;

            $scope.actionSetPage = function (pageNumber) {
                $scope.currentPage = Math.min($scope.pageCount-1, Math.max(0, pageNumber));
            };

            $scope.loaded = false;
            $scope.itemsPerPage = 25;
            $scope.pageCount = 0;
            $scope.currentPage = 0;
            $scope.querySchema = '*:*';
            $scope.queryGovernment = '*:*';
            $scope.queryTheme    = '*:*';
            $scope.queryDate     = '*:*';
            $scope.queryKeywords = '*:*';

            $scope.fixHtml = function (htmlText) {
                htmlText = (htmlText || "").replace(/\r\n/g, '<br>')
            	htmlText = (htmlText || "").replace(/href="\//g, 'href="http://www.cbd.int/')
            	htmlText = (htmlText || "").replace(/href='\//g, "href='http://www.cbd.int/");

            	var qHtml = $('<div/>').html(htmlText);

            	qHtml.find("script,style").remove();

            	return qHtml.html();
            };

            function readFacets(solrArray) {

                var facets = [];

                for (var i = 0; i < solrArray.length; i += 2) {

                    var facet = JSON.parse(solrArray[i]);

                    facets.push({ symbol: facet.symbol, title: facet.en, count: solrArray[i + 1] });
                }

                return facets;
            };         


            function readFacets2(solrArray) {

                var facets = [];

                for (var i = 0; i < solrArray.length; i += 2) {

                    var facet = solrArray[i];

                    facets.push({ symbol: facet, title: facet, count: solrArray[i + 1] });
                }

                return facets;
            };              function search() {
                $scope.currentPage = 0;
                query();
            }

            function query() {

                console.log("QUERY");

                var q = 'realm_ss:absch AND ' + $scope.querySchema + ' AND ' + $scope.queryGovernment + ' AND ' + $scope.queryTheme + ' AND ' + $scope.queryDate + ' AND ' + $scope.queryKeywords;

                var queryParameters = {
                    'q': q,
                    'fl': 'id,title_t,description_t,url_ss,schema_EN_t,date_dt,government_EN_t,schema_s',
                    'wt': 'json',
                    'start': $scope.currentPage * $scope.itemsPerPage,
                    'rows': 25
                };

                if (self.canceler != null)
                    self.canceler.resolve();

                self.canceler = $q.defer();

                self.xhr = $http.get('/api/v2013/index/select', { params: queryParameters, timeout: self.canceler.promise }).success(function (data) {

                    $scope.count = data.response.numFound;
                    $scope.start = data.response.start;
                    $scope.stop  = data.response.start+data.response.docs.length-1;
                    $scope.rows  = data.response.docs.length;

                    $scope.documents = data.response.docs;

                    $scope.pageCount = Math.ceil(data.response.numFound / $scope.itemsPerPage);

                    queryParameters['facet'] = true;
                    queryParameters['facet.field'] = ['schema_CEN_s', 'government_CEN_s', 'thematicArea_CEN_ss', 'thematicArea_REL_ss'];
                    queryParameters['facet.limit'] = 256;

                    self.canceler = $q.defer();

                    $http.get('/api/v2013/index/select', { params: queryParameters, timeout: self.canceler.promise }).success(function (data) {

                        $scope.schemas = readFacets(data.facet_counts.facet_fields.schema_CEN_s);
                        $scope.governments = readFacets(data.facet_counts.facet_fields.government_CEN_s);
                        $scope.thematicAreas = readFacets2(data.facet_counts.facet_fields.thematicArea_REL_ss);

                        self.canceler = null;

                    }).error(function (data) { console.log('ABORTED'); } );
                }).error(function (data) { console.log('ABORTED'); });
            };

            $scope.range = function (start, end) {

                var ret = [];
                if (!end) {
                    end = start;
                    start = 0;
                }

                var maxCount = 10;
                var middle = 5;
                var count = end - start;
                
                if (count > maxCount) {
                    if ($scope.currentPage > middle)
                        start = $scope.currentPage - middle;

                    end = Math.min(count, start + maxCount);
                    start = Math.max(0, end - maxCount);
                }
                
                for (var i = start; i < end; i++) {
                    ret.push(i);
                }
                return ret;
            };

            $scope.$watch('currentPage', function (newValue, oldValue) { if (newValue != oldValue) query(); });
            $scope.$watch('querySchema', function (newValue, oldValue) { if (newValue != oldValue) search(); });
            $scope.$watch('queryGovernment', function (newValue, oldValue) { if (newValue != oldValue) search(); });
            $scope.$watch('queryTheme', function (newValue, oldValue) { if (newValue != oldValue) search(); });
            $scope.$watch('queryDate', function (newValue, oldValue) { if (newValue != oldValue) search(); });
            $scope.$watch('queryKeywords', function (newValue, oldValue) { if (newValue != oldValue) search(); });

            query(); // init
        }]
    }
})

//============================================================
//
//
//============================================================
$compile.directive('search2Schema', function ($http) {
    return {
        restrict: 'EAC',
        templateUrl: '/app/abs/directives/search2/search2-schema.partial.html?v892e42e',
        replace: true,
        // require : "?ngModel",
        scope: {
              // placeholder: '@',
              // ngDisabledFn : '&ngDisabled',
              title: '@title',
              items: '=ngModel',
              field: '@field',
              query: '=query',
              // locales    : '=',
              // rows       : '=',
              // required   : "@"
        },
        link: function ($scope, element, attrs, ngModelController)
        {
        },
        controller : ['$scope', '$element', '$window', function ($scope, $element, $window)
        {
            $scope.expanded = false;
            $scope.selectedItems = [];
            $scope.facet = $scope.field.replace('_s', ''); // TODO: replace @field by @facet

            var parameters = $window.URI().search(true);

            if (parameters[$scope.facet]) {
                $scope.selectedItems.push(parameters[$scope.facet]);
            }

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

                console.log($scope.items1);
                console.log($scope.items2);
                console.log($scope.items3);


                $element.find("#dialogSelect").modal("show");





                //if(!$scope.expanded)
                    //$scope.$parent.$broadcast('onExpand', $scope);

                //$scope.expanded = !$scope.expanded;
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

                console.log($scope.query);
                
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
                scope.item.selected = !scope.item.selected;
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
                    console.log(query);
                    $scope.query = query;
                }
            }

            function buildConditions (conditions, items) {
                items.forEach(function (item) { 
                    if(item.selected)
                        conditions.push($scope.field+':'+item.identifier);
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

            $scope.nationalRecords = [
                { identifier: 'focalPoint'             , title: 'National Focal Points' },
                { identifier: 'authority'              , title: 'Competent National Authorities' },
                { identifier: 'database'               , title: 'National Databases' },
                { identifier: 'measure'                , title: 'National Measures' },
                { identifier: 'absCheckpoint'          , title: 'Checkpoints' },
                { identifier: 'absPermit'              , title: 'Permits' },
                { identifier: 'absCheckpointCommunique', title: 'Checkpoint Communiques' }];

            $scope.referenceRecords = [
                { identifier: 'organization', title: 'ABS Related Organizations' },
                { identifier: 'resource'    , title: 'Virtual Library Resources' }
            ];

            $scope.meetingRecords = [
                { identifier: 'meeting'        , title: 'Meetings' },
                { identifier: 'meetingDocument', title: 'Meeting Documents' },
                { identifier: 'decision'       , title: 'Decisions' }//,
                // { identifier: 'recommentation' , title: 'Recommentations' }
            ];

            $scope.releaseRecords = [
                { identifier: 'notification', title: 'Notifications' },
                { identifier: 'pressRelease', title: 'Press Releases' },
                { identifier: 'statement'   , title: 'Statements' }
            ];

            $scope.terms = _.union($scope.nationalRecords, $scope.referenceRecords, $scope.meetingRecords, $scope.releaseRecords);
            $scope.termsx = dictionarize($scope.terms);

            function onWatch_items(values) { if(!values) return;
                console.dir(values);
                values.forEach(function (item) {
                    if(_.has($scope.termsx, item.symbol))
                        $scope.termsx[item.symbol].count = item.count;
                });
            }

            $scope.$watch('items', onWatch_items);

            $scope.refresh = buildQuery;
        }]
    }
});

//============================================================
//
//
//============================================================
$compile.directive('search2Facet', function ($http) {
    return {
        restrict: 'EAC',
        templateUrl: '/app/abs/directives/search2/search2-facet.partial.html?v892e14e22',
        replace: true,
        // require : "?ngModel",
        scope: {
              // placeholder: '@',
              // ngDisabledFn : '&ngDisabled',
              title: '@title',
              items: '=ngModel',
              field: '@field',
              query: '=query',
              // locales    : '=',
              // rows       : '=',
              // required   : "@"
        },
        link: function ($scope, element, attrs, ngModelController)
        {
        },
        controller : ['$scope', '$element', '$window', function ($scope, $element, $window)
        {
            $scope.expanded = false;
            $scope.selectedItems = [];
            $scope.facet = $scope.field.replace('_s', ''); // TODO: replace @field by @facet

            var parameters = $window.URI().search(true);

            if (parameters[$scope.facet]) {
                $scope.selectedItems.push(parameters[$scope.facet]);
            }

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

                buildQuery();
                // $scope.updateQuery();
            };

            $scope.actionExpand = function() {

                var count1 = Math.ceil($scope.items.length/3);
                var count2 = Math.ceil(($scope.items.length-count1)/2);
                var count3 = Math.ceil(($scope.items.length-count2-count1));

                $scope.items1 = $scope.items.slice(0, count1);
                $scope.items2 = $scope.items.slice(count1, count2+count2);
                $scope.items3 = $scope.items.slice(count1+count2, count1+count2+count3);

                console.log($scope.items1);
                console.log($scope.items2);
                console.log($scope.items3);


                $element.find("#dialogSelect").modal("show");
            };

            $scope.ccc = function(item) {
                return $scope.isSelected(item) ? 'facet selected' : 'facet unselected';
            };

            $scope.onclick = function (scope, evt) {
                scope.item.selected = !scope.item.selected;
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
                }
            }

            function buildConditions (conditions, items) {
                items.forEach(function (item) { 
                    if(item.selected)
                        conditions.push($scope.field+':'+item.identifier);
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

            $scope.terms = [];
            $scope.termsx = [];
            $http.get('/api/v2013/thesaurus/domains/countries/terms').success(function (data) {
                $scope.terms = data;
                $scope.termsx = dictionarize($scope.terms);
                onWatch_items($scope.items);
            });

            function onWatch_items(values) { if(!values) return;
                console.dir(values);
                values.forEach(function (item) {
                    if(_.has($scope.termsx, item.symbol))
                        $scope.termsx[item.symbol].count = item.count;
                });
            }

            $scope.$watch('items', onWatch_items);

            $scope.refresh = buildQuery;
        }]
    }
})

//============================================================
//
//
//============================================================
$compile.directive('search2Theme', function ($http) {
    return {
        restrict: 'EAC',
        templateUrl: '/app/abs/directives/search2/search2-theme.partial.html',
        replace: true,
        // require : "?ngModel",
        scope: {
              // placeholder: '@',
              // ngDisabledFn : '&ngDisabled',
              title: '@title',
              items: '=ngModel',
              field: '@field',
              query: '=query',
              // locales    : '=',
              // rows       : '=',
              // required   : "@"
        },
        link: function ($scope, element, attrs, ngModelController)
        {
        },
        controller : ['$scope', '$element', '$window', 'Thesaurus', function ($scope, $element, $window, thesaurus)
        {
            $scope.expanded = false;
            $scope.selectedItems = [];
            $scope.facet = $scope.field.replace('_s', ''); // TODO: replace @field by @facet

            var parameters = $window.URI().search(true);

            if (parameters[$scope.facet]) {
                $scope.selectedItems.push(parameters[$scope.facet]);
            }

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

                console.log($scope.items1);
                console.log($scope.items2);
                console.log($scope.items3);


                $element.find("#dialogSelect").modal("show");

                




                





                //if(!$scope.expanded)
                    //$scope.$parent.$broadcast('onExpand', $scope);

                //$scope.expanded = !$scope.expanded;
            };

            $scope.$on('onExpand', function(scope) {
                if(scope!=$scope && $scope.expanded)
                    $scope.expanded = false;
            });

            $scope.filterx = function(item) {
                console.log(item);
                //return item.selected;
            };

            $scope.ccc = function(item) {
                return $scope.isSelected(item) ? 'facet selected' : 'facet unselected';
            };

            $scope.updateQuery = function() {

                console.log($scope.query);
                
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

            function select(item) {
                if(!item.selected) item.indeterminate = true;
                if(item.narrowerTerms) item.narrowerTerms.forEach(select);
            }

            var unselect = $scope.unselect = function (item) {
                if(!item.selected) item.indeterminate = false;
                if(item.narrowerTerms) item.narrowerTerms.forEach(unselect);
            }

            function setBroaders(broaderTerms, selected) {

                if(!broaderTerms) return;

                broaderTerms.forEach(function (term) {

                    term.indeterminateCounterA = term.indeterminateCounterA + (selected ? 1 : -1);
                    console.log(term.indeterminateCounterA);
                    term.indeterminate = !term.selected && (term.indeterminateCounterA + term.indeterminateCounterB) > 0;

                    setBroaders(term.broaderTerms, selected); 
                });


                // if(term.indeterminate) {
                //     term.state = term.selected;
                //     term.selected = false;
                // }

                // if(!term.indeterminate) {
                //     term.selected = term.state;
                //     term.state = null;
                // }

                // term.indeterminate = selected;

                
            }

            function setNarrowers(narrowerTerms, selected) {

                if(!narrowerTerms) return;

                narrowerTerms.forEach(function (term) { 

                    term.indeterminateCounterB = term.indeterminateCounterB + (selected ? 1 : -1);
                    console.log(term.indeterminateCounterB);
                    term.indeterminate = !term.selected && (term.indeterminateCounterA + term.indeterminateCounterB) > 0;

                    setNarrowers(term.narrowerTerms, selected); 
                });


                // 

                // 

                // term.indeterminate = selected;

                
            }

            $scope.onclick = function (scope, evt) {
                scope.item.selected = !scope.item.selected;
                $scope.ts(scope, evt);
            }

            $scope.ts = function (scope, evt) {

                var term = scope.item;

                term.indeterminate = !term.selected && (term.indeterminateCounterA + term.indeterminateCounterB) > 0;

                setBroaders(term.broaderTerms, term.selected);
                setNarrowers(term.narrowerTerms, term.selected);
                
                //if(scope.item.indeterminate)
                  //  scope.item.indeterminate = scope.item.indeterminate = false;

                //if(scope.item.selected==true) unselect(scope.item);
                //else          
         //       if(scope.item.selected) { if(scope.item.narrowerTerms) scope.item.narrowerTerms.forEach(select); }
           //     else                    { if(scope.item.narrowerTerms) scope.item.narrowerTerms.forEach(unselect); }

                //var cb = evt.target;
                                
                //if (cb.readOnly) cb.checked=cb.readOnly=false;
                //else if (!cb.checked) cb.readOnly=cb.indeterminate=true;

                //$scope.actionSelect(scope.item);



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
                }

                console.log($scope.query);
            }

            function buildConditions (conditions, items) {
                items.forEach(function (item) { 
                    if(item.selected)
                        conditions.push('thematicArea_REL_ss:'+item.identifier);
                    else if(item.narrowerTerms) {
                        buildConditions(conditions, item.narrowerTerms);
                    }
                });
            }

            function flatten(items, collection) {
                items.forEach(function (item) { 
                    item.selected = false;
                    item.indeterminateCounterA = 0;
                    item.indeterminateCounterB = 0;
                    collection[item.identifier] = item;
                    if(item.narrowerTerms) 
                        flatten(item.narrowerTerms, collection);
                });
                return collection;
            }

            $scope.termsx = [];
            $http.get('/api/v2013/thesaurus/domains/CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924/terms').success(function (data) {
                $scope.terms = thesaurus.buildTree(data);
                $scope.termsx = flatten($scope.terms, {});
                $scope.termsxx = _.values($scope.termsx);
            });

            $scope.$watch('items', function (values) { if(!values) return;

                values.forEach(function (item) {
                    if(_.has($scope.termsx, item.symbol))
                        $scope.termsx[item.symbol].count = item.count;
                });
            });
        }]
    }
});

//============================================================
//
//
//============================================================
$compile.directive('bindIndeterminate', [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.bindIndeterminate, function (value) {
                element[0].indeterminate = value;
            });
        }
    };
}]);

//============================================================
//
//
//============================================================
$compile.directive('search2Date', function ($http) {
    return {
        restrict: 'EAC',
        templateUrl: '/app/abs/directives/search2/search2-date.partial.html',
        replace: true,
        scope: {
              title: '@title',
              query: '=query'//,
              //since: '=since',
              //until: '=until'
        },
        link: function ($scope, element, attrs, ngModelController) {
        },
        controller : ["$scope", function ($scope) {

            var now = new Date();

            $scope.dates = [
                { text: 'Any', date: '' },
                { text: 'Last day', date: new Date(new Date(now).setDate(now.getDate()-1)).toISOString() },
                { text: 'Last week', date: new Date(new Date(now).setDate(now.getDate()-7)).toISOString() },
                { text: 'Last two weeks', date: new Date(new Date(now).setDate(now.getDate()-14)).toISOString() },
                { text: 'Last month', date: new Date(new Date(now).setMonth(now.getMonth()-1)).toISOString() },
                { text: 'Last two months', date: new Date(new Date(now).setMonth(now.getMonth()-2)).toISOString() },
                { text: 'Last six months', date: new Date(new Date(now).setMonth(now.getMonth()-6)).toISOString() },
                { text: 'Last year', date: new Date(new Date(now).setMonth(now.getMonth()-12)).toISOString() },
            ];

            $scope.since = null;
            $scope.until = null;
            $scope.selectedDate = '';

            $scope.$watch('since', updateQuery);
            $scope.$watch('until', updateQuery);

            function updateQuery () {

                if($scope.since || $scope.until) {
                    var since = $scope.since ? $scope.since + 'T00:00:00.000Z' : '*';
                    var until = $scope.until ? $scope.until + 'T23:59:59.999Z' : '*';

                    $scope.query = ' ( createdDate_s:[ ' + since + ' TO ' + until + ' ] ) ';
                } else {
                    $scope.query = '*:*';
                }
                
                console.log($scope.query);
            };

            $scope.$watch('selectedDate', function (value) {
                $scope.since = $scope.selectedDate.date ? new Date($scope.selectedDate.date).toISOString().substr(0, 10) : null;
                $scope.until = null;
            });

            $scope.updateQuery = updateQuery;
        }]
    }
})

//============================================================
//
//
//============================================================
$compile.directive('search2Keywords', function ($http) {
    return {
        restrict: 'EAC',
        templateUrl: '/app/abs/directives/search2/search2-keywords.partial.html',
        // replace: true,
        // require : "?ngModel",
        scope: {
            // placeholder: '@',
            // ngDisabledFn : '&ngDisabled',
            title: '@title',
            items: '=ngModel',
            query: '=query',
            // locales    : '=',
            // rows       : '=',
            // required   : "@"
        },
        link: function ($scope, element, attrs, ngModelController) {
        },
        controller: ["$scope", function ($scope) {
            $scope.value = '';

            $scope.updateQuery = function () {

                $scope.query.q = '';
            };

            $scope.$watch('value', function () {
                $scope.query = $scope.value == '' ? '*:*' : '(title_t:' + $scope.value + '* OR description_t:' + $scope.value + '* OR text_EN_txt:' + $scope.value + '*)';

                console.log($scope.query);
            });
        }]
    }
})


