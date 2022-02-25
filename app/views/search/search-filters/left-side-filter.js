import app from 'app';
import template from 'text!./left-side-filter.html';
import _ from 'lodash';
import 'ngDialog';
import 'components/scbd-angularjs-services/main';
import 'services/main';
import 'views/forms/edit/document-selector'

        app.directive('leftSideFilter', ['ngDialog', 'locale', 'solr', 'realm', '$timeout',
         function (ngDialog, locale, solr, realm, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                require: '^searchDirective',
                template: template,
                scope: false,
                link:async function ($scope, $element, $attrs, searchDirectiveCtrl) {
                    
                    $scope.isBCH        = realm.is('BCH');
                    $scope.isABS        = realm.is('ABS');    
                    
                    var freeTextKeys = 0;
                    // $scope.leftMenuFilters = {}
                    $scope.locale = locale;
                    $scope.onSchemaFilterChanged = function (schema, selected) {
                        if (!selected) {
                            if ($scope.leftMenuFilters)
                                delete $scope.leftMenuFilters[schema];
                            $scope.leftMenuFilters = _.omit($scope.leftMenuFilters, _.isUndefined);
                            if (_.isEmpty($scope.leftMenuFilters))
                                $scope.leftMenuFilters = undefined;
                        }
                        else {

                            var fieldMappings = angular.copy(searchDirectiveCtrl.getSchemaFieldMapping(schema));

                            if (!_.isEmpty(fieldMappings)) {
                                if (!$scope.leftMenuFilters)
                                    $scope.leftMenuFilters = {};
                                $scope.leftMenuFilters[schema] = fieldMappings
                            }
                        }
                        return $scope.leftMenuFilters;
                    }

                    $scope.showFilterDialog = function (schema, filter, facets) {
                        let filterDialog = ngDialog.open({
                            template: 'filtersDialog', 
                            className: 'search-filters ngdialog-theme-default wide',
                            controller: ['$scope', 'thesaurusService', 'searchService', function ($scope, thesaurusService, searchService) {

                                $scope.treeViewSelected = [];
                                $scope.schema = schema;
                                $scope.filter = filter;
                                $scope.facets = facets;
                                $scope.searchRelated = filter.searchRelated;
                                var options;
                                _.forEach(filter.selectedItems, function (option) {
                                    if (filter.type == 'thesaurus' || filter.type == 'solr' || filter.type == 'customListFn')
                                        $scope.treeViewSelected.push({ identifier: option.identifier });
                                });

                                $scope.treeOptions = function () {
                                    var dataSource;
                                    if (filter.type == "thesaurus") {
                                        var otherTerm = filter.otherTerm;
                                        if(otherTerm == undefined)
                                            otherTerm = true;
                                        dataSource = thesaurusService.getDomainTerms(filter.term, {other:otherTerm, narrowerOf: filter.narrowerOf})
                                                        .then(function(terms){ 
                                                            if(filter.additionalTerms)
                                                                terms = [...terms, ...(filter.additionalTerms||[])];

                                                            if(filter.without){
                                                                return _.filter(terms, function(type){
                                                                    return !(filter.without||[]).includes(type.identifier)
                                                                }); 
                                                            }

                                                            return terms;
                                                        })
                                            
                                    }
                                    else if (filter.type == 'solr') {
                                        dataSource = runSolrQuery(filter.query);
                                    }
                                    else if (filter.type == 'customListFn')
                                        dataSource = searchDirectiveCtrl[filter.fn]();

                                    return dataSource.then(function (data) { return options = data; })
                                };

                                $scope.closeDialog = function () {
                                    ngDialog.close(filterDialog.id);
                                }
                                $scope.applyFilter = function () {

                                    var selectedItems = {};
                                    _.forEach($scope.treeViewSelected, function (item) {
                                        selectedItems[item.identifier] = _.find(options, { identifier: item.identifier });
                                    })
                                    updateBaseFilter(selectedItems, schema, filter, $scope.searchRelated);
                                    ngDialog.close(filterDialog.id);
                                }
                                $scope.onBeforeSearch = function(keyword){
                                    keyword = keyword.replace(/[0]/g, "Ø");
                                    return keyword;
                                }

                                function runSolrQuery(query) {
                                    var lQuery = {
                                        query: query.q,
                                        fields: query.fl,
                                        sort: query.s,
                                        rowsPerPage: 3000,
                                        currentPage: 0
                                    }
                                    return searchService.list(lQuery)
                                        .then(function (result) {
                                            return _(result.data.response.docs).map(function (item) {
                                                if(_.isArray(item.title)){
                                                    item.title = item.title.join(' | ')
                                                }
                                                return {
                                                    identifier: item.identifier,
                                                    title: { en: item.title }
                                                }
                                            }).sortBy('title.en').value()
                                        });
                                }

                            }]
                        })

                        function updateBaseFilter(selectedItems, schema, field, searchRelated) {
                            var filter = _.find($scope.leftMenuFilters[schema], { title: field.title })
                            filter.selectedItems = selectedItems;
                            filter.searchRelated = searchRelated;
                            searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters)
                        }
                    }

                    $scope.ngRepeatFinished = function () {
                        $timeout(()=>{
                            $element.find('[data-bs-toggle="tooltip"]').tooltip();
                        }, 0);                      
                    }
                    $scope.removeSchema = (schema)=>{
                        console.log($scope.leftMenuFilters)
                        searchDirectiveCtrl.removeGlobalFilter(schema);
                    }
                    $scope.removeSchemaFilters = function (option, filter) {
                        //for some reason the tooltip currently focused is not removed on removeSchemaFilters evt, so remove all tooltip since 
                        // it will be the only tooltip open. 
                        $element.find('[data-bs-toggle="tooltip"]').tooltip('hide');
                        $timeout(function(){
                            if(filter.type=='solrRecords'){
                                var index = _.findIndex(filter.selectedItems, function(item){ return item.identifier == option.identifier_s });//+ '@' + option._revision_i
                                filter.selectedItems?.splice(index, 1);
                            }
                            else{
                                delete filter.selectedItems[option.identifier];
                            }

                            searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters);
                        }, 200)
                        
                    }
                    $scope.RemoveLeftMenuFilters = function(){
                        $scope.leftMenuFilters = undefined;
                        searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters)
                    }
                    $scope.clearFilterOptions = function (schema, filter) {
                        if(filter){
                            clearFilterOptions(filter)
                        }
                        else{
                            var filters = $scope.leftMenuFilters[schema]
                            _.forEach(filters, clearFilterOptions);
                        }
                        searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters);
                    }

                    $scope.onFilterDateChange = function (val) {                        
                        searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters);
                    }

                    $scope.clearFilterDate = function (filter) {
                        filter.filterValue = undefined;
                        searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters);
                    }

                    $scope.saveSchemaFreeText = function (filter, text) {
                        if (!filter.selectedItems)
                            filter.selectedItems = {};
                        freeTextKeys++;
                        filter.selectedItems[freeTextKeys] = { title: text, identifier: freeTextKeys };
                        searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters)
                        filter.searchKeyword = '';
                    }

                    $scope.recordSelected = function(item, filter){                        
                        searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters)
                    }

                    $scope.hasItems = function(items){
                        return items && _.keys(items).length;
                    }

                    $scope.onBuildQuery = function(searchText, tab, lFilter){
                        const filter = angular.copy(lFilter);
                        const lQueries = [];
                        let queries = {
                            fieldQueries : [],
                            query        : '*:*'
                        }

                        if(filter.query){
                            if(filter.query.fl)
                                queries.fields = filter.query.fl

                            if(filter.query.s && !searchText)
                                queries.sort = filter.query.s

                            if(filter.query.fq)
                                queries.fieldQueries = filter.query.fq;

                            if((filter.query.q||'') != '')
                                lQueries.push(filter.query.q)
                        }
                  
                        queries.fieldQueries.push('realm_ss:'+solr.escape(realm.value))
                                    
                        if((searchText||'')!=''){
                            var queryText;
                            var searchFields = filter.query.searchFields||['text_EN_txt'];

                            queryText = '(' + solr.escape(searchText) + ')';
                              
                            var freeTextQuery   = _.map(searchFields, function(field, i){
                                                    return field + ':' + queryText + '^' + ((searchFields.length-i)+1);
                                                }).join(' OR ');

                            lQueries.push(freeTextQuery);
                        }

                        if(lQueries.length)
                            queries.query = solr.andOr(lQueries, 'AND')
                        
                        if(filter.customQueryFn)
                            queries = $scope.customQueries[filter.customQueryFn](filter, queries);

                        return angular.copy(queries);
                    }

                    $scope.onRecordsFetched = function(data, query, filter){
                        if(filter.customResultFn)
                            data = $scope.customResult[filter.customResultFn](filter, data, query);
                        return data;
                    }

                    $scope.customQueries = {
                        organismNamesQuery
                    }
                    $scope.customResult = {
                        organismNamesResult
                    }

                    $scope.$on('evt:updateLeftMenuFilters', (evt, leftMenuFilters)=>{
                        $scope.leftMenuFilters = leftMenuFilters;
                        $timeout(()=>{
                            $scope.recordSelected();
                            $scope.$broadcast( 'evt:loadDocumentSelectorSelectedRecords', leftMenuFilters );
                        }, 200)
                    });


                    function organismNamesQuery(filter, query){
                        query = query || {};

                        query.rowsPerPage = 2000;

                        return query;
                    }
                    function organismNamesResult(filter, data, query){
                        const newResult = [];

                        data.docs.forEach(e=>{
                            if(e.rec_title){                               
                                e.rec_title.forEach((c, i)=>{
                                    newResult.push({
                                        ...e,
                                        identifier_s : `${e.identifier_s}@${i}`,
                                        rec_title : c
                                    })
                                })
                            }
                        })
                        return {
                            docs : _.sortBy(newResult, 'rec_title'),
                            pageCount: newResult.length,
                            start   : 0
                        }
                    }

                    function clearFilterOptions(filter){
                        if(filter.type!='solrRecords'){
                            _.forEach(filter.selectedItems, function(item){
                                $element.find('#' + item.identifier).tooltip('hide')
                            })
                        }
                        else{
                            $scope.$broadcast('event:remove-selected-records', {instanceId:filter.$$hashKey});
                        }
                        filter.selectedItems = {};
                    }

                    //load dependant directive
                    await import('~/views/forms/edit/document-selector')
                }
            };
        }]);
    
