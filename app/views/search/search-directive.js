import app from '~/app';
import _ from 'lodash';
import 'ngDialog';
import 'angular-animate';
import 'angular-joyride';
import 'toastr';
import joyRideText      from '~/app-text/views/search/search-joyride-tour.json';
import  { scbdSchemas } from '~/components/scbd-angularjs-services/main';
import template         from 'text!./search-directive.html';
import {getLimitedTerms} from '~/services/common';
import '~/services/main';
import '~/views/directives/export-directive';
import '~/components/scbd-angularjs-controls/main';
import './search-filters/keyword-filter';
import './search-filters/national-filter';
import './search-filters/reference-filter';
import './search-filters/scbd-filter';
import './search-filters/country-filter';
import './search-filters/region-filter';
import './search-filters/date-filter';
import './search-filters/left-side-filter';
import './search-results/result-default';
import './search-results/list-view';
import './search-results/group-view';
import './directives/result-view-options';
import '~/views/reports/matrix/data-matrix.directive';
import 'angular-vue'
import searchDirectiveT from '~/app-text/views/search/search-directive.json';

    app.directive('searchDirective', function() {
        return {
            restrict: 'EAC',
            replace: true,
            template: template, 
            controller: ['$scope','$q', 'realm', '$element', 'commonjs', 'localStorageService', '$filter', 'Thesaurus' ,
             'appConfigService', '$routeParams', '$location', 'ngDialog', '$attrs', '$rootScope', 'thesaurusService',
                'joyrideService', '$timeout', 'locale', 'solr', 'toastr', '$log', 'IGenericService', 'translationService',
            function($scope, $q, realm, $element, commonjs, localStorageService, $filter, thesaurus, 
                    appConfigService, $routeParams, $location, ngDialog, $attrs, $rootScope, thesaurusService, joyrideService, 
                $timeout, locale, solr, toastr, $log, IGenericService, translationService) {
                        var customQueryFn = {
                            buildExpiredPermitQuery : buildExpiredPermitQuery,
                            buildContactsUserCountryfn : buildContactsUserCountryfn
                        }
                        translationService.set('searchDirectiveT', searchDirectiveT);
                        var leftMenuSchemaFieldMapping;
                        var activeFilter;
                        var base_fields = 'id, rec_date:updatedDate_dt, rec_creationDate:createdDate_dt,identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,';
                        var en_fields =  'rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:summary_t,rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt';
    
                        var groupFieldMapping = [
                            {
                                field:'government', 
                                sortFields:['government_EN_s asc'],
                                tabs: ['nationalRecords', 'allRecords'],
                                solrField:'government_s',
                                titleField:'government_'+locale.toUpperCase()+'_s'
                            },
                            {
                                field:'schema', 
                                sortFields:['schema_EN_s asc'],
                                solrField:'schema_s',
                                titleField:'schema_'+locale.toUpperCase()+'_s'
                            },
                            // {
                            //     field:'submissionYear', 
                            //     sortFields:['submissionYear_s asc'],
                            //     solrField:'submissionYear_s',
                            //     titleField:'submissionYear_s'
                            // }
                        ];    
                        var queryCanceler = null;                        
                        var isABS = realm.is('ABS');
                        var isBCH = realm.is('BCH');   
                        var leftMenuFilters  = [];
                        $scope.searchAlertError = '';
                        $scope.realm         = realm
                        $scope.searchFilters = {};
                        $scope.setFilters    = {};
                        $scope.relatedKeywords = {};
                        $scope.isAlertSearch = $attrs.isAlertSearch,
                        $scope.searchResult = {
                            sortFields      : ['updatedDate_dt desc'],
                            currentTab      : 'allRecords',
                            currentPage     : 1,
                            rowsPerPage     : 25,
                            groupByFields   : ['government', 'schema'],
                            viewType        : 'default',
    
                            skipResults       : $attrs.skipResults,
                            skipDateFilter    : $attrs.skipDateFilter,
                            skipSaveFilter    : $attrs.skipSaveFilter,
                            skipTextFilter    : $attrs.skipTextFilter,
                            skipKeywordsFilter: $attrs.skipKeywordsFilter,
    
                            searchFilters   : {},
                            countriesFilters: {},
                            regionsFilter   : {},
                            searchKeyword   : ''
                        }   
                        $scope.hideSubFilters = false;
                    ////////////////////////////////////////////
                    ////// scope functions
                    ////////////////////////////////////////////
                    $scope.tour = function(){
                        $scope.tourOn = true;
                        var joyride = joyrideService;
                        
                        joyride.config = {
                            overlay: true,
                            onStepChange: function(){  },
                            onStart: function(){   },
                            onFinish: function(){
                                joyride.start = false;
                                $scope.tourOn = false; 
                                $scope.showFilters = false;                             
                                $('#searchResult').removeClass('active jr_target'); 
                            },
                            steps : [
                                {
                                    appendToBody: true,
                                    title       : joyRideText.welcome.title,
                                    content     : joyRideText.welcome.content
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#freeText",
                                    title       : joyRideText.freeText.title,
                                    content     : joyRideText.freeText.content,
                                    placement   : 'bottom'
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#globalSearch",
                                    title       : joyRideText.globalSearch.title,
                                    content     : joyRideText.globalSearch.content,
                                    placement   : 'top',
                                    customClass : "search-global-search-jr"
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#recordTypesFilterTabJR",
                                    title       : joyRideText.recordTypesFilterTab.title,
                                    content     : joyRideText.recordTypesFilterTab.content,
                                    placement   : 'top',
                                    beforeStep  : openFilterTab
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#keywordsFilterTabJR",
                                    title       : joyRideText.keywordsFilterTab.title,
                                    content     : joyRideText.keywordsFilterTab.content,
                                    placement   : 'top',
                                    beforeStep  : openFilterTab
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#countryFilterTabJR",
                                    title       : joyRideText.countryFilterTab.title,
                                    content     : joyRideText.countryFilterTab.content,
                                    placement   : 'top',
                                    beforeStep  : openFilterTab
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#regionFilterTabJR",
                                    title       : joyRideText.regionFilterTab.title,
                                    content     : joyRideText.regionFilterTab.content,
                                    placement   : 'top',
                                    beforeStep  : openFilterTab
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#dateFilterTabJR",
                                    title       : joyRideText.dateFilterTab.title,
                                    content     : joyRideText.dateFilterTab.content,
                                    placement   : 'top',
                                    beforeStep  : openFilterTab
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#closeFilterTab",
                                    title       : joyRideText.closeFilterTab.title,
                                    content     : joyRideText.closeFilterTab.content,
                                    placement   : 'left',
                                    beforeStep  : openFilterTab
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#referenceRecordsTab",
                                    title       : joyRideText.searchResult.title,
                                    content     : joyRideText.searchResult.content,
                                    placement   : 'top',
                                    beforeStep  : closeFilterTab
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#Search-Filter",
                                    title       : joyRideText.subFilters.title,
                                    content     : joyRideText.subFilters.content,
                                    placement   : 'top',
                                    beforeStep  : openSubFilters
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#record1",
                                    title       : joyRideText.recordView.title,
                                    content     : joyRideText.recordView.content,
                                    placement   : 'top',
                                    beforeStep  : closeSubFilters
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#viewType",
                                    title       : joyRideText.viewType.title,
                                    content     : joyRideText.viewType.content,
                                    placement   : 'top',
                                    customClass : "search-view-type-records-jr"
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#sortBy",
                                    title       : joyRideText.sortBy.title,
                                    content     : joyRideText.sortBy.content,
                                    placement   : 'bottom',
                                    customClass : "search-sort-by-records-jr"
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#shareRecord",
                                    title       : joyRideText.sendRecords.title,
                                    content     : joyRideText.sendRecords.content,
                                    placement   : 'top',
                                    customClass : "search-send-records-jr"
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#exportRecords",
                                    title       : joyRideText.exportRecords.title,
                                    content     : joyRideText.exportRecords.content,
                                    placement   : 'left',
                                    customClass : "search-export-records-jr"
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#needHelp",
                                    title       : joyRideText.needHelp.title,
                                    content     : joyRideText.needHelp.content,
                                    placement   : 'bottom',
                                    beforeStep  : gotoSectionHelp,
                                    customClass : "need-help-jr"
                                },
                                {
                                    appendToBody: true,
                                    type        : 'element',
                                    selector    : "#slaask-button-cross",
                                    title       : joyRideText.needMoreHelp.title,
                                    content     : joyRideText.needMoreHelp.content,
                                    placement   : 'top',
                                    customClass : "need-more-help-jr"
                                }

                            ]
                        };
                        joyride.start = true;

                        function openFilterTab(resumeJoyride){
                            var step = joyride.config.steps[joyride.current];
                            if(step.selector == "#closeFilterTab") { 
                                $scope.showFilters = "recordTypesFilter"; }
                            else {
                                $scope.showFilters = step.selector.replace('#','').replace('TabJR', ''); }
                            $timeout(resumeJoyride, 100);
                        }

                        function gotoSectionHelp (resumeJoyride){
                            $('html,body').scrollTop(0);
                            $timeout(resumeJoyride, 100);
                        }

                        function closeFilterTab(resumeJoyride){
                            $scope.showFilters = false;
                            $timeout(resumeJoyride, 100);
                        }
                        function openSubFilters(resumeJoyride){
                            var authorityFilter = $scope.searchFilters['authority'];
                            if(!$scope.setFilters[authorityFilter.id]){
                                $scope.saveFilter(authorityFilter);
                            }
                            $timeout(resumeJoyride, 100);
                        }
                        function closeSubFilters(resumeJoyride){
                            var authorityFilter = $scope.searchFilters['authority'];
                            if($scope.setFilters[authorityFilter.id]){
                                $scope.removeFilter(authorityFilter);
                            }
                            $timeout(resumeJoyride, 100);
                        }


                    }
                    if($routeParams.openTour){
                        $scope.tour();
                    }
                    function savedFilters(doc,subFilters){
                        // if(!$scope.searchResult.data.facets[doc.id])
                        //     return;
                        //TODO: if free text check to see if there is a UID and convert to identifier

                        // if (typeof doc === 'string') {
                        //     filterID = doc;
                        //     termID = $scope.searchFilters[filterID].id;
                        //     var broader = $scope.searchFilters[filterID].broader;
                        // }
                        var filter = $scope.setFilters[doc.id];
                        if ($scope.setFilters[doc.id]){
                            delete $scope.setFilters[doc.id];
                        }
                        else{
                            if(doc.type == 'date' && doc.dateField =='updatedDate_dt'){
                                $scope.setFilters[doc.id] = filter = {
                                    type : doc.type,
                                    dateField : doc.dateField,
                                    name : doc.name,
                                    query : doc.query
                                };
                            }
                            else {
                                $scope.setFilters[doc.id] = filter = {
                                    type : doc.type,
                                    otherType : doc.otherType,
                                    name : doc.name,
                                    id : doc.id
                                };
                            }
                      }
                        if((filter||{}).type == 'schema'){
                            $scope.leftMenuEnabled = true;
                            if($scope.onSchemaFilterChanged){
                                leftMenuFilters = $scope.onSchemaFilterChanged(doc.id, $scope.setFilters[doc.id])
                                if(subFilters){
                                    for ( const subFilterKey in subFilters) {
                                        const subFilter = subFilters[subFilterKey];
                                        subFilter.forEach( filter => {
                                            if ( leftMenuFilters && leftMenuFilters[subFilterKey] ) {
                                                let filterItem = leftMenuFilters[subFilterKey].find( q => q.field == filter.field );
                                                filterItem.selectedItems = filter.selectedItemsIds || filter.selectedItems;
                                            }
                                        } )
                                    }
                                }
                            }
                        }

                        updateQueryResult();
                    }

                    $scope.savedAlertFilter = function(doc, subFilters){
                        savedFilters(doc, subFilters);
                    }

                    $scope.saveFilter = function (doc) {
                        savedFilters(doc);
                    };

                    $scope.saveFreeTextFilter = function(text, $event) {

                        if(!text && text.length <= 0)
                            return;

                        var fid = text;
                        var id = undefined;

                         if($scope.setFilters[fid] )
                           delete $scope.setFilters[fid];
                        else{
                           $scope.setFilters[fid] = {'type':'freeText', 'name': text, 'id':fid};

                           $scope.searchKeyword = "";
                          
                           $scope.searchResult.sortFields = ['relevance asc']
                        }

                        updateQueryResult();

                        if($event)
                            $event.preventDefault();
                    };

                    $scope.saveDateFilter = function (filterID, query, dateVal) {
                        if(dateVal.field=='updatedDate_dt') 
                        {
                             var name = 'Date published ('+dateVal.value.start.format('DD-MM-YYYY') + ' - ' + dateVal.value.end.format('DD-MM-YYYY') + ')' ;
                        }

                        if(dateVal.field=='createdDate_dt') 
                        {
                             var name = 'Date created ('+dateVal.value.start.format('DD-MM-YYYY') + ' - ' + dateVal.value.end.format('DD-MM-YYYY') + ')' ;
                        }
                        $scope.setFilters[filterID] = {
                            type: $scope.searchFilters[filterID].type,
                            query: query,
                            name: name,
                            id: $scope.searchFilters[filterID].id,
                            dateField:dateVal.field
                        };

                        updateQueryResult();
                    };

                    $scope.removeFilter = function (filter) {
                        var filterID = filter.id;
                        if(filter.type == 'rawQuery'){
                            filterID='rawQuery';
                            updateQueryString('raw-query',undefined);
                        }

                        var id = $scope.setFilters[filterID].filterID
                        delete $scope.setFilters[filterID];

                        if($scope.searchFilters[filterID] && $scope.searchFilters[filterID].type == 'schema' && $scope.onSchemaFilterChanged){
                            var leftFilters = $scope.onSchemaFilterChanged(filterID, $scope.setFilters[filterID]);                            
                            leftMenuFilters = leftFilters;
                            updateQueryString('schema');
                        }
                        //remove children
                        var dels = {};
                        var toDelete = _.forEach($scope.setFilters, function (filter) {
                            if (filter.broader === filterID) {
                                $scope.removeFilter(filter);
                            }
                        });

                        updateQueryResult();
                    };

                    $scope.onSortByChange = function(fields){
                        $scope.searchResult.sortFields = fields;
                        $scope.searchResult.sortFields = fields;
                        updateQueryString('sort',fields);
                        updateQueryResult();
                    }

                    $scope.onViewTypeChange = function(options){                        
                        $scope.searchResult.viewType = options.viewType;
                        updateQueryString('viewType',options.viewType);

                        if(options.viewType == 'group')
                            $scope.searchResult.groupByFields = options.fields;

                        updateQueryResult();
                    }

                    $scope.isFilterOn = function (filterID) {
                        if (!filterID)
                            return false;

                        return $scope.setFilters[filterID] ? true : false;
                    };

                    $scope.switchTab = function(tab){
                        if($scope.searchResult.currentTab == tab)
                            return;
                        $scope.searchResult.currentTab = tab;
                        updateQueryString('tab',tab);
                        updateQueryResult();
                    }

                    $scope.clearFilter = function(){
                        updateQueryString('schema');
                        $scope.setFilters = {};
                        leftMenuFilters = [];
                        $scope.RemoveLeftMenuFilters()
                        updateQueryResult();
                    };

                    $scope.onExportClick = function({listType, fields}){
                        
                        var viewType = $scope.searchResult.viewType;
                        if(['default', 'list', 'group'].includes(viewType)){
                            return $scope.searchResult.listViewApi.onExport({listType, fields});
                        }
                        else if(viewType == 'group'){
                            return $scope.searchResult.listViewApi.onExport({listType, fields});
                            // resultQuery = $scope.searchResult.groupViewApi.export(queryOptions, sortFields, pageNumber||1);
                        }
                        else if($scope.searchResult.viewType == 'matrix'){
                            if($scope.searchResult.matrixViewApi.isBusy)
                                toastr.info($element.find('#exportDisabledMessage').text())
                            else 
                                $scope.searchResult.matrixViewApi.onExport();
                        }
                    }

                    $scope.onEditFreeTextFilterDone = function(filter){
                        // delete $scope.setFilters[filter.id];
                        var oldKey =  filter.id;
                        filter.edit         =   false;
                        filter.name         = _.clone(filter.editValue);
                        filter.id           = filter.name 
                        filter.editValue    = undefined;

                        $scope.setFilters = _.mapKeys($scope.setFilters, function(value, key) {
                                                if(key == oldKey)
                                                    return filter.id;
                                                return key;
                                            });
                        updateQueryResult();
                    }

                    $scope.onEditFreeTextFilterCanceled = function(filter){
                        filter.edit=false;
                        filter.editValue = undefined;
                    }
                    $scope.onEditFreeTextFilter = function(filter){
                        filter.edit=true;
                        filter.editValue = _.clone(filter.name);
                    }
                    $scope.onKeyDown = function($evt, filter){
                        if($evt.which == 13){
                            $scope.onEditFreeTextFilterDone(filter)
                        }
                    }
                    ////////////////////////////////////////////
                    ////// end $scope functions
                    ////////////////////////////////////////////

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    
                    ////////////////////////////////////////////
                    ////// internal functions
                    ////////////////////////////////////////////

                    async function init(){

                        leftMenuSchemaFieldMapping = await loadLeftMenuFieldMapping();
                        loadFilters().then(()=>{

                            var query =  $location.search();
                            var currentPage = query.currentPage||1;
                            if(query.currentPage)
                                $scope.searchResult.currentPage = currentPage;
                            if(query.rowsPerPage)
                                $scope.searchResult.rowsPerPage = query.rowsPerPage;
                            if(query.tab)
                                $scope.searchResult.currentTab = query.tab;
                            if(query.group){
                                if(typeof query.group == 'string')
                                    query.group = [query.group]
                                $scope.searchResult.groupByFields = query.group;
                            }
                            if(query.sort){
                                if(typeof query.sort == 'string')
                                    query.sort = [query.sort]
                                $scope.searchResult.sortFields = query.sort;
                            }
                            if(query.viewType)
                                $scope.searchResult.viewType = query.viewType;

                            if(query.searchShareQueryId){
                                if(query.embed)
                                    $scope.hideSubFilters = true;
                                $scope.clearFilter();
                                $scope.searchAlertError = '';
                                const filters = localStorageService.get($routeParams.searchShareQueryId);
                                $scope.obsoleteSchemas = localStorageService.get(`${$routeParams.searchShareQueryId}_obsoleteSchemas`);
                                setExternalFilters(filters);
                            }
                            else if($routeParams.id && !$scope.isAlertSearch) {
                                $scope.clearFilter();
                                $scope.searchAlertError = '';
                                IGenericService.get('v2016', 'me/subscriptions', $routeParams.id)
                                .then(function (data) {
                                    setExternalFilters(data);
                                })
                                .catch(function (err) {
                                    console.error(err)//ToDo: will update for correct error text

                                    if(err.status == 403){
                                        $scope.searchAlertError = "The search query is currently private and cannot be accessed by you. Please contact the owner to make the query public for further use.";
                                    }
                                    else{
                                        $scope.searchAlertError = err?.statusText;
                                    }
                                });
                            }
                            else if(query){
                                if(query.text){
                                    $scope.saveFreeTextFilter(query.text);
                                }
                                if(query.country){
                                    $scope.saveFilter(query.country);
                                }
                                if(query.schema){
                                    $scope.saveFilter(query.schema);
                                }
                            }

                            if(query["raw-query"]){
                                saveRawQueryFilter(query["raw-query"]);
                            }

                            $timeout(function(){updateQueryResult(currentPage);}, 200)
                        });
                        $scope.pageInitialized = true;
                    }

                    function setExternalFilters(filters){
                        const mainFilters = filters.filters;
                        mainFilters.forEach( e => {
                            $scope.saveFilter( e );
                        } );

                        if ( filters.subFilters ) {
                            const subFilters = filters.subFilters;
                            for ( const subFilterKey in subFilters) {
                                const subFilter = subFilters[subFilterKey];
                                subFilter.forEach( filter => {
                                    if ( leftMenuFilters && leftMenuFilters[subFilterKey] ) {
                                        let filterItem = leftMenuFilters[subFilterKey].find( q => q.field == filter.field );
                                        filterItem.selectedItems = filter.selectedItemsIds || filter.selectedItems;
                                    }
                                })
                            }

                            $scope.$emit( 'evt:updateLeftMenuFilters', leftMenuFilters );
                        }
                    }
                    function loadFilters() {
                
                        if (_.isEmpty($scope.searchFilters)) {
                            $scope.searchFilters = {};
                            $scope.searchFilters = localStorageService.get("searchFilters");
                        }
                        if (_.isEmpty($scope.searchFilters)) {
                            $scope.searchFilters = {};
                            
                            var chKeywordsFilter;
                            if (isABS)
                                chKeywordsFilter = loadABSKeywordFilters();
                            else if (isBCH)
                                chKeywordsFilter = loadBCHKeywordFilters();

                            return $q.all([loadSchemaFilters(), loadCountryFilters(), loadRegionsFilters(), loadDateFilters(), chKeywordsFilter])
                            .then(function(){
                                var query =  $location.search();
                                if(query.schema){
                                    var schemaFilters = getSearchFilters('schema')
                                    if(!_.isArray(query.schema))
                                        query.schema = [query.schema];

                                    _.forEach(query.schema, function(s){
                                        var sch = _.find(schemaFilters, {id:s});
                                        if (!$scope.isAlertSearch) {
                                            $scope.saveFilter(sch)
                                        }
                                    })
                                }
                                // console.log($scope.searchFilters)
                                // localStorageService.set("searchFilters", $scope.searchFilters);
                            })
                        }                
                    };
                    $scope.canShowSaveFilter = function(){
                        return !$scope.skipSaveFilter && !_.isEmpty($scope.setFilters);
                    }

                    function saveRawQueryFilter(query){
                        $scope.setFilters['rawQuery'] = {
                            type     : 'rawQuery',
                            name     : 'Custom query',
                            id       : query
                        };
                    }

                    function addFilter(filterKey, filterInfo) {                        
                        $scope.searchFilters[filterKey] = filterInfo;
                    };

                    function removeGlobalFilter(schema){
                        $scope.removeFilter({id:schema})
                    }

                    function getSearchFilters(type, fn) {
                        if (!type)
                            return $scope.searchFilters;

                        return _.filter($scope.searchFilters, function (item) {
                            if (item.type === type && (fn==undefined || fn(item)))  return item;
                        });
                    };
                    
                    function getSelectedFilters(type, fn) {
                        if (!type)
                            return $scope.setFilters;

                        return _.filter($scope.setFilters, function (item) {
                            if (item.type === type && (fn==undefined || fn(item)))  return item;
                        });
                    };

                    function getFilter(id) {
                        return $scope.searchFilters[id];
                    };

                    function loadSchemaFilters() {

                        _.forEach(realm.schemas, function (schema, key) {
                                addFilter(key, { 'sort': schema.sort, 'type': 'schema', 'name': $filter('lstring')(schema.titlePlural||schema.title), 'id': key, 
                                        'description': $filter('lstring')((schema.description || {})), otherType:schema.type });
                        })
                        if(isBCH){
                            addFilter('partyToProtocol' , { 'sort': 1, 'type': 'partyStatus', 'name': 'Party to the Cartagena Protocol on Biosafety'             , 'id': 'partyToProtocol' , 'description': '' });
                            addFilter('NKLSParty'       , { 'sort': 2, 'type': 'partyStatus', 'name': 'Party to the Supplementary Protocol'                      , 'id': 'NKLSParty'       , 'description': '' });
                            addFilter('inbetween'       , { 'sort': 3, 'type': 'partyStatus', 'name': 'Ratified, not yet Party to the Cartagena Protocol on Biosafety'  , 'id': 'inbetween'       , 'description': '' });
                            addFilter('nonParty'        , { 'sort': 4, 'type': 'partyStatus', 'name': 'Not a Party to the Cartagena Protocol on Biosafety '      , 'id': 'nonParty'        , 'description': '' });
                        }
                        if(isABS){
                            addFilter('partyToProtocol' , { 'sort': 1, 'type': 'partyStatus', 'name': 'Party to the Protocol'                   , 'id': 'partyToProtocol' , 'description': '' });
                            addFilter('inbetween'       , { 'sort': 2, 'type': 'partyStatus', 'name': 'Ratified, not yet Party to the Protocol' , 'id': 'inbetween'       , 'description': '' });
                            addFilter('nonParty'        , { 'sort': 3, 'type': 'partyStatus', 'name': 'Not a Party to the Protocol '            , 'id': 'nonParty'        , 'description': '' });
                        }

                        //SCBD
                        _.forEach(scbdSchemas, function (schema, key) {
                            addFilter(key, { 'sort': schema.sort, 'type': 'schema', 'name': $filter('lstring')(schema.titlePlural||schema.title), 'id': key, 
                                    'description': $filter('lstring')((schema.description || {})), otherType:'scbd' });
                        });
                    };

                    function loadCountryFilters() {

                        return $q.when(commonjs.getCountries(), function (data) {
                            var countries = data;

                            _.forEach(countries, function (country, index) {
                                addFilter(country.code.toLowerCase(), { 'sort': index, 'type': 'country', 'name': country.name, 
                                'id': country.code.toLowerCase(), 
                                'description': '', 
                                "isCBDParty": country.isCBDParty, 
                                "isParty": country.isParty, 
                                "isNKLSParty": country.isNKLSParty,  
                                "isRatified": country.isRatified, 
                                "isInbetweenParty": country.isInbetweenParty, 
                                "entryIntoForce": country.entryIntoForce});
                            });
                        });
                    };

                    function loadRegionsFilters() {

                        return $q.when(commonjs.getRegions(), function (regions) {
                            _.forEach(regions, function (region, index) {
                                addRegionFilter(region);
                            });
                        });
                    };

                    function addRegionFilter(region, parent) {

                        addFilter(region.identifier, { 'type': 'region', 'name': region.title, 'id': region.identifier, 
                        'description': '', 'parent': parent });

                        _.forEach(region.narrowerTerms, function (narrower) {
                            addRegionFilter(narrower, region.identifier);
                        });
                    }
                    
                    function loadDateFilters() {
                        addFilter('updatedDate_dt', { 'sort': 1, 'type': 'date', 'name': 'Published On', 'id': 'updatedDate_dt', 
                        'description': 'Date range when the record was published' });
                        addFilter('createdDate_dt', { 'sort': 1, 'type': 'date', 'name': 'Created On', 'id': 'createdDate_dt', 
                        'description': 'Date range when the record was created' });
                    };

                    function loadBCHKeywordFilters() {
                        var promises = []
                        promises.push(getFocalPointTypes().then(function(keywords){loopKeywords(keywords);}));
                        promises.push(cbdSubjectsCustomFn().then(function(keywords){loopKeywords(keywords);}));
                        promises.push(vlrResourceCustomFn().then(function(keywords){loopKeywords(keywords);}));
                        promises.push(thesaurusService.getDomainTerms('decisionTypes'             ).then(function(keywords){loopKeywords(keywords, 'decisionTypes'             )}));
                        promises.push(thesaurusService.getDomainTerms('legislationAgreementTypes' ).then(function(keywords){loopKeywords(keywords, 'legislationAgreementTypes' )}));
                        promises.push(thesaurusService.getDomainTerms('subjectAreas'              ).then(function(keywords){loopKeywords(keywords, 'subjectAreas'              )}));
                        promises.push(thesaurusService.getDomainTerms('cnaJurisdictions'          ).then(function(keywords){loopKeywords(keywords, 'cnaJurisdictions'          )}));
                        promises.push(thesaurusService.getDomainTerms('riskAssessmentScope'       ).then(function(keywords){loopKeywords(keywords, 'riskAssessmentScope'       )}));
                        promises.push(thesaurusService.getDomainTerms('areasOfExpertise'          ).then(function(keywords){loopKeywords(keywords, 'areasOfExpertise'          )}));
                        promises.push(thesaurusService.getDomainTerms('resourceTypes'             ).then(function(keywords){loopKeywords(keywords, 'resourceTypes'             )}));
                        promises.push(thesaurusService.getDomainTerms('languages'                 ).then(function(keywords){loopKeywords(keywords, 'languages'                 )}));
                        promises.push(thesaurusService.getDomainTerms('typeOfOrganisms'           ).then(function(keywords){loopKeywords(keywords, 'typeOfOrganisms'           )}));
                        promises.push(thesaurusService.getDomainTerms('domestication'             ).then(function(keywords){loopKeywords(keywords, 'domestication'             )}));
                        promises.push(thesaurusService.getDomainTerms('OrganismCommonUses'        ).then(function(keywords){loopKeywords(keywords, 'OrganismCommonUses'        )}));
                        promises.push(thesaurusService.getDomainTerms('dnaSequenceFamily'         ).then(function(keywords){loopKeywords(keywords, 'dnaSequenceFamily'         )})); 
                        promises.push(thesaurusService.getDomainTerms('dnaSequenceTraits'         ).then(function(keywords){loopKeywords(keywords, 'dnaSequenceTraits'         )}));
                        promises.push(thesaurusService.getDomainTerms('techniqueUsed'             ).then(function(keywords){loopKeywords(keywords, 'techniqueUsed'             )}));
                        promises.push(thesaurusService.getDomainTerms('decisionLMOFFPSubject'     ).then(function(keywords){loopKeywords(keywords, 'decisionLMOFFPSubject'     )}));
                        promises.push(thesaurusService.getDomainTerms('decisionResults'           ).then(function(keywords){loopKeywords(keywords, 'decisionResults'           )}));
                        promises.push(thesaurusService.getDomainTerms('organizationTypes'         ).then(function(types){ return _.filter(types, function(type){return type.identifier!='B3699A74-EF2E-467A-A82F-EF2149A2EFC5'}); })
                                                      .then(function(keywords){loopKeywords(keywords, 'organizationTypes'         )}));
                        
                        
                        
                        return $q.all(promises);
                    
                    }

                    function loadABSKeywordFilters() {
                        var promises = []
                        promises.push(cbdSubjectsCustomFn().then(function(keywords){loopKeywords(keywords);}));
                        promises.push(vlrResourceCustomFn().then(function(keywords){loopKeywords(keywords);}));
                        promises.push(thesaurusService.getDomainTerms('keywords'            ).then(function(keywords){loopKeywords(keywords, 'keywords'             )}));
                        promises.push(thesaurusService.getDomainTerms('thematicAreas'       ).then(function(keywords){loopKeywords(keywords, 'thematicAreas'        )}));
                        promises.push(thesaurusService.getDomainTerms('keyAreas'            ).then(function(keywords){loopKeywords(keywords, 'keyAreas'             )}));
                        promises.push(thesaurusService.getDomainTerms('cnaJurisdictions'    ).then(function(keywords){loopKeywords(keywords, 'cnaJurisdictions'     )}));
                        promises.push(thesaurusService.getDomainTerms('aBSkeyareas'         ).then(function(keywords){loopKeywords(keywords, 'aBSkeyareas'          )}));
                        promises.push(thesaurusService.getDomainTerms('allKeywords'         ).then(function(keywords){loopKeywords(keywords, 'allKeywords'          )}));


                        promises.push(thesaurusService.getDomainTerms('msrElements'         ).then(function(keywords){loopKeywords(keywords, 'msrElements'          )}));
                                                                        
                        return $q.all(promises);
                    
                    }

                    async function cbdCountriesCustomFn() {
                        return thesaurusService.getDomainTerms('countries').then(function (o) { return _.sortBy(o, 'name'); })
                    }

                    async function getFocalPointTypes(){
                        const chFolder = realm.is('BCH') ? 'bch' : 'abs';
                        const { categories } = await import(`../../app-data/${chFolder}/focal-point-category.js`);

                        return categories.map(category=>{
                            return { 
                                identifier: category.key,
                                title     : { [locale] : category.title },
                                functions : category.categories
                            };
                        });
                    }

                    async function vlrResourceCustomFn () {
                        let excludeTerms = [];
                        if(isBCH){
                            excludeTerms = ['6B245045-8379-4582-A081-2565B67F8B3A'];//AbsRelated
                        }
                        return thesaurusService.getDomainTerms('resourceTypesVlr').then((terms)=>{
                            return getLimitedTerms(terms, excludeTerms);
                        })
                    }

                    async function cbdSubjectsCustomFn() { return thesaurusService.getDomainTerms('cbdSubjects')
                        .then(function(o){
                        var subjects = ['CBD-SUBJECT-BIOMES', 'CBD-SUBJECT-CROSS-CUTTING'];
                        var items = [];
                            _.forEach(subjects, function(subject) {
                                var term = _.find(o, {'identifier': subject } );
                                items.push(term);
                                _(term.narrowerTerms).forEach(function (term) {
                                    items.push(_.find(o, {'identifier':term}));
                                })
                            });
                            return items;
                        });
                    }

                    function loopKeywords(keywords, schemaFieldKey){
                        if((keywords||[]).length){
                            _.forEach(keywords, function (keyword, index) {
                                addKeywordFilter(keyword, schemaFieldKey, keyword.broader||keyword.broaderTerms);
                            });
                        }
                    }

                    function addKeywordFilter(keyword, schemaFieldKey, broader) {
                        // for future lookup
                        // https://github.com/scbd/absch.cbd.int/commit/0823ab3e6a9aaa68dd59fca379b8158b83a348ba#diff-a8418aa523a6be485d60f93925c4c38dL975

                        // var schemaFieldMap = _.cloneDeep(bchSchemaFieldMapping[schemaFieldKey]);

                        var existingFilter = _.find($scope.searchFilters, function(fil){
                            return fil.name[locale] == $filter('lstring')(keyword.title)
                        })
                        if(existingFilter){                           
                            // _.each(schemaFieldMap, function(field){
                            //     field.identifier = keyword.identifier
                            // })
                            existingFilter.identifiers  = _([existingFilter.id]).union([keyword.identifier], existingFilter.identifiers||[]).compact().uniq().value()
                            // existingFilter.schemaFields = _.union(schemaFieldMap, existingFilter.schemaFields||[])                            
                        }
                        else{
                            var filter = {  'type': 'keyword', 'name': keyword.title, 'id': keyword.identifier, 'description': '', 'broader': broader };
                            addFilter(keyword.identifier, filter);
                        }

                    }

                    function updateQueryString(field, values){
                        if(field!='sort'){
                            $location.search('currentPage', 1);
                            $scope.searchResult.currentPage = 1;
                        }
                        $location.search(field, values)

                    }

                    function groupByFields(){
                        return groupFieldMapping;
                    }

                    function groupingCombination(mappings){
                        var combinations = []
                        mappings = mappings || groupFieldMapping;

                        _.forEach(mappings, function(group){
                            var groupField = group.field
                            var others = _.without(mappings, group)

                            var otherComb = _.map(others, function(field){
                                                var lfield = field.field
                                                combinations.push(groupField + '_' + lfield)
                                                return lfield
                                            }).join('_');
                                            
                            combinations.push('grp_'+group.field)
                            combinations.push('grp_'+groupField + '_' + otherComb)
                            combinations = _.union(combinations, otherComb);
                        })   
                        return combinations
                    }

                    function combinationField(fields){      
                        fields = _.filter(fields, function(f){
                            var groupMap = _.find(groupFieldMapping, {field:f})
                            return groupMap && (!groupMap.tabs || ~groupMap.tabs.indexOf($scope.searchResult.currentTab))
                        })
                        var map = {
                            groupField : 'grp_'+fields.join('_') + '_s',
                            sortFields:[]
                        };
                        _.forEach(fields, function(field){
                            var group = _.find(groupFieldMapping, {field:field})
                            map.sortFields.push(group.sortFields)
                        })
                        map.sortFields = _.flatten(map.sortFields);
                        return map;
                    }

                    function sanitizeFacets(facets){
                        var schemaTypes = {all:0}
                        _.forEach((facets.facet_fields['schemaType_s']||[]), function(facet, key){
                            schemaTypes[key] = facet;
                            schemaTypes.all = schemaTypes.all + (schemaTypes[key]||0);
                        });
                        var facets = {
                                        schemaTypes: schemaTypes, 
                                        schemas   : facets.facet_fields['schema_s'], 
                                        keywords  : facets.facet_fields['all_terms_ss'],
                                        countries : facets.facet_fields['countryRegions_ss'], 
                                        regions   : facets.facet_fields['countryRegions_REL_ss']
                                    };
                        //combine regions and countries facets to match the count.
                        // if any fields has regions than selecting any country from that region should return result
                        if(facets.regions){
                            _.forEach(facets.countries, function(con, key){
                                if(facets.regions[key])
                                    facets.countries[key] = (facets.countries[key]||0) + facets.regions[key];
                            })
                        }
                        if(facets.countries){
                            _.forEach(facets.regions, function(reg, key){
                                if(facets.countries[key])
                                    facets.regions[key] = (facets.regions[key]||0) + facets.countries[key];
                            })
                        }

                        return facets;
                    }

                    function updateQueryResult(pageNumber){
                        $timeout(function(){//call digest cycle to update the directive api params
                            $scope.searchResult.loading = true;
                            var queryOptions = buildSearchQuery()
                            var sortFields = ''
                            var resultQuery;
                            if(($scope.searchResult.sortFields||[]).length > 0)
                                sortFields = $scope.searchResult.sortFields.join(', ');
                            
                            if(queryOptions.highlight){ 
                                //if highlight is enabled that means there is freetext, if the sort is by only lastUpdated use relevance
                                if(sortFields == 'updatedDate_dt desc')
                                    sortFields   = ['relevance asc'];
                            }

                            var viewType = $scope.searchResult.viewType;
                            if(viewType=='default' && $scope.searchResult.currentTab == 'allRecords')
                                viewType = 'list'
                            else if(viewType=='default' && $scope.searchResult.currentTab == 'nationalRecords')
                                viewType = 'group'
                            else if(viewType=='default' && ($scope.searchResult.currentTab == 'referenceRecords' || $scope.searchResult.currentTab == 'scbdRecords'))
                                viewType = 'list'

                            if(viewType == 'list'){
                                resultQuery = $scope.searchResult.listViewApi.updateResult(queryOptions, sortFields, pageNumber||1);
                            }
                            else if(viewType == 'group'){
                                if(sortFields == 'updatedDate_dt desc')
                                    $scope.searchResult.sortFields = sortFields = ['government_EN_s asc', sortFields];
                        
                                queryOptions.groupByFields = $scope.searchResult.groupByFields;                                
                                updateQueryString('group', queryOptions.groupByFields);
                                resultQuery = $scope.searchResult.groupViewApi.updateResult(queryOptions, sortFields, pageNumber||1);
                            }
                            else if($scope.searchResult.viewType == 'matrix'){
                                resultQuery = $scope.searchResult.matrixViewApi.updateResult(queryOptions);
                            }
                            resultQuery.then(function(data){
                                $scope.searchResult.data = data;
                            })
                            .catch(function(e){
                                toastr.error('There was an error running search query.')
                                var exception = {
                                    data    :  e.data||e.message, status:e.status,
                                    url     : (e.config||{}).url, params: (e.config||{}).params,
                                    stack   : e.stack
                                }                                
                                $log.error(JSON.stringify(exception))
                            })
                            .finally(function(){$scope.searchResult.loading = false;})
                        }, 0)
                    }


                    function getAllSearchFilters() {
                        
                        let leftFilterQuery = {}
                        _.forEach(leftMenuFilters, function (f, key) {
                            _.forEach(f, function (filter) {
                                if (!_.isEmpty(filter.selectedItems)) {
                                    leftFilterQuery[key] = leftFilterQuery[key] || [];
                                    const { field, relatedField, searchRelated, term, title, type } = filter
                                    leftFilterQuery[key].push({ field, relatedField, searchRelated, selectedItems: filter.selectedItems, term, title, type });
                                }
                            });
                        });

                        return {
                            filters     :   _.values($scope.setFilters),
                            subFilters  :   leftFilterQuery                            
                        }
                    }

                    function buildSearchQuery(){
                        var tagQueries          = {};
                        var tabQuery            = buildTabQuery();
                        var schemaQuery         = buildSchemaQuery();                        
                        var schemaSubQuery      = buildSchemaSubQuery()||{};                        
                        var keywordQuery        = buildFieldQuery('keyword',  'all_terms_ss')
                        var countryQuery        = _.compact([buildFieldQuery('country',  'countryRegions_ss'), buildFieldQuery('country',  'countryRegions_REL_ss')]).join(' OR ');
                        var partyStatusQuery    = buildPartyStatusQuery();
                        var regionQuery         = _.compact([buildFieldQuery('region',   'countryRegions_ss'), buildFieldQuery('region',   'countryRegions_REL_ss')]).join(' OR ');
                        var textQuery           = buildFreeTextQuery('freeText', 'text_EN_txt');
                        var rawQuery            = buildRawQuery();

                        var dateQuery           = buildDateQuery();

                        var queries            = _.compact([dateQuery, textQuery, rawQuery]);
                        var query              = '';
                        const highlight        = textQuery!=undefined||schemaSubQuery.freeTextQuery!=undefined;
                        if(queries.length)
                            query              = solr.andOr(queries, 'AND');
                        if(schemaQuery != '(*:*)')
                            tagQueries.schema  =  schemaQuery;
                        tagQueries.version     =  '(*:* NOT version_s:*)'
                        tagQueries.schemaSub   =  schemaSubQuery.query;
                        tagQueries.schemaType  =  tabQuery;
                        tagQueries.partyStatus =  partyStatusQuery;
                        tagQueries.keywords    =  keywordQuery;
                        tagQueries.government  =  countryQuery;
                        tagQueries.region      =  regionQuery;
                        //special query for Contact as only records which have reference contact are searchable.
                        tagQueries.contact     =  '(*:* NOT schema_s:contact) OR (schema_s:contact AND (refReferenceRecords_ss:* OR refNationalRecords_ss:*))';
                       
                        if(schemaSubQuery.freeTextQuery){ //append subfilters query to general query to benefit highlighting and relevance
                            query = solr.andOr(_.compact([query, tagQueries.schemaSub]), 'AND')
                        }

                        return {
                            query      :  query||'',
                            tagQueries : _(tagQueries).map(function(f, t){if(f) return '{!tag='+t+'}' + f;}).compact().value(),
                            facetFields : [
                                '{!ex=schemaType}schemaType_s',
                                '{!ex=schema,schemaType,schemaSub}schema_s', 
                                '{!ex=government}countryRegions_ss', 
                                '{!ex=keywords}all_terms_ss', 
                                '{!ex=region}countryRegions_REL_ss'
                            ],
                            pivotFacetFields: 'schema_s, all_Terms_ss',
                            highlight       : highlight,
                            highlightFields :'text_EN_txt'
                        };
                    }

                    function buildSchemaQuery() {
                        
                        var filters = getSelectedFilters('schema')
                        if (!(filters||[]).length){  
                            return "(*:*)";
                        }                                            
                                                
                        var query = buildAdvanceSettingsQuery(filters, 'schema_s');

                        updateQueryString('schema',  _.map(filters, 'id'));

                        return query;
                    }

                    function buildSchemaSubQuery(){
                        //since the left side filter has to apply locally to the schema only
                        // loop and add or conditions on schemas when sub filters exists else just make schema array query
                        if(!_.isEmpty(leftMenuFilters)){
                            var schemaQueries = []
                            var freeTexQueries = []    
                            _.forEach(leftMenuFilters, function(filters, key){

                                // If main filter has been disabled than exclude results
                                var mainFilter = $scope.setFilters[key]
                                if(!mainFilter || mainFilter.disabled || mainFilter.excludeResult)
                                    return;

                                var subQueries = [];                            
                                subQueries.push('schema_s:'+ key)
                                _.forEach(filters, function(filter){
                                    var subQuery;
                                    if(filter.disabled)
                                        return;
                                    if(filter.fieldfn!=undefined){ //custom function                                            
                                        var q = customQueryFn[filter.fieldfn](filter);
                                        if(q)
                                            subQuery = q;
                                    }
                                    else if(!_.isEmpty(filter.selectedItems)){
                                        var ids = _.map(filter.selectedItems, s=>s.identifier.toString().replace(/\@[0-9]{1,3}$/, ''));
                                        if(filter.type == 'freeText'){                                          
                                            ids = _.map(filter.selectedItems,  function(filter){
                                                return {name:filter.title};
                                            });
                                            subQuery = buildFreeTextQuery('freeText', filter.field, ids);
                                            
                                            if(!filter.excludeResult)
                                                freeTexQueries.push(subQuery)
                                        }
                                        else{
                                            var field = filter.field;
                                            if(filter.searchRelated && filter.relatedField)
                                                field = filter.relatedField;
                                            subQuery = field + ':(' + _.map(ids, solr.escape).join(' ') + ')';
                                        }
                                    }
                                    else if(filter.type == 'date' && filter.filterValue){
                                        subQuery = buildDateFieldQuery(filter);
                                    }
                                    else if(filter.type == 'yesNo' && filter.filterValue!== undefined){
                                        subQuery = filter.field + ':' + solr.escape(filter.filterValue);
                                    }
                                    if(subQuery){
                                        if(filter.excludeResult)
                                            subQuery = '(*:* NOT (' + subQuery + '))'
                                        subQueries.push(subQuery);
                                    }
                                });
                                // if(subQueries.length>1){
                                    subQueries = _.uniq(subQueries)                                       
                                    schemaQueries.push(solr.andOr(subQueries, 'AND'))
                                // }
                            })
                            if(schemaQueries.length){
                                return {
                                    query          : solr.andOr(schemaQueries,  'OR'),
                                    freeTextQuery  : freeTexQueries.length ? solr.andOr(freeTexQueries, 'OR') : undefined
                                }
                            }
                        }
                    }

                    function buildTabQuery(){
                        var tab = $scope.searchResult.currentTab; 
                        if(tab == 'nationalRecords')
                            return 'schemaType_s:national'
                        if(tab == 'referenceRecords')
                            return 'schemaType_s:reference'
                        if(tab == 'scbdRecords')
                            return 'schemaType_s:scbd'
                    }

                    function buildDateQuery(){
                        var filters = getSelectedFilters('date')
                        if (!filters?.length){     
                            return;
                        }
                        var values = [];
                        _.forEach(filters, function (filter) {
                            if(filter.exclude)
                                return;

                            let dateQuery = filter.dateField+':' + filter.query;

                            if(filter.excludeResult)
                                dateQuery = `(*:* NOT (${dateQuery}))`;

                            values.push(dateQuery)
                        });
                        if(values.length)
                            return solr.andOr(values, 'AND')
                    }

                    function buildDateFieldQuery({ field, filterValue:date }) {
                        
                        if(date.start || date.end) {
                            const start   = date.start ? solr.escape(date.start.locale('en').format('YYYY-MM-DD')   + 'T00:00:00.000Z')  : '*';
                            const end     = date.end   ? solr.escape(date.end.locale('en').format('YYYY-MM-DD')     + 'T23:59:59.999Z') : '*';
    
                            return field + ':[ ' + start + ' TO ' + end + ' ]';
                        } 
                    }

                    function buildPartyStatusQuery() {                        
                        
                        var filters = getSelectedFilters('partyStatus')
                        if (!(filters||[]).length){     
                            return;
                        }
                        var values;
                        var countries = getSearchFilters('country')
                        _.forEach(filters, function (item) {
                            values = (values||'') + " " + getCountryList(item.id, countries);
                        });
                        if(values)
                            return 'government_s:(' + solr.escape(values) + ')';
                    }

                    function buildFieldQuery(filterType, field) {
                        
                        var filters = getSelectedFilters(filterType)
                        if (!(filters||[]).length){     
                            return;
                        }
                        var query = buildAdvanceSettingsQuery(filters, field);
                        
                        return query;
                    }

                    function buildFreeTextQuery(filterType, field, filters) {
                        
                        filters = filters || getSelectedFilters(filterType);
                        if (!(filters||[]).length){     
                            return;
                        }
                        var query = '';
                        //for freetext use boosting
                        var boostFields = {
                            uniqueIdentifier_t   : 6,
                            government_EN_t      : 5.5,
                            countryRegions_EN_txt: 5,
                            title_EN_t           : 4,
                            summary_EN_t         : 3,
                            schema_EN_t          : 2,
                            text_EN_txt          : 1,
                        };

                        if(!boostFields[field])
                            boostFields[field] = 1;

                        var freeTextVals = _(filters).map(function(filter){
                                                if(!filter.disabled && !filter.excludeResult){ 
                                                    return solr.escape(_.trim(filter.name))
                                                }
                                            }).compact().uniq().value();

                        var excludedValues =  _(filters).map(function(filter){
                                                if(!filter.disabled && filter.excludeResult){ 
                                                    return solr.escape(_.trim(filter.name))
                                                }
                                            }).compact().uniq().value();
                        
                        if(freeTextVals.length)
                            query = _.map(freeTextVals, function(val){return buildBoostQuery(boostFields, val)}).join(' AND ');

                        if(excludedValues.length){
                            var excludeQuery = '(*:* NOT ' + buildBoostQuery(boostFields, excludedValues) + ')'
                            if(query.length){
                                query = '(' + query + ' AND ' + excludeQuery + ')'
                            }
                            else
                                query = excludeQuery
                        }
                        
                        return query;

                    }

                    function buildBoostQuery(boostFields, val){
                        // to avoid solr falling back to default field when 
                        // search has multiple words put text inside ()                            
                        return  '(' + 
                                    _(boostFields).map(function(boost, boostField){
                                        if(~val.indexOf('-'))//not sure if its good idea
                                            return `(${boostField}:("${val}")^${boost})`;

                                        return `(${boostField}:(${val})^${boost})`;
                                    }).value().join(' OR ') +
                                ')'
                    }

                    function buildExpiredPermitQuery(filter){
                        if(filter.filterValue == true){
                            return 'dateOfExpiry_dt:[* TO NOW]'
                        }
                        else if(filter.filterValue == false)
                            return 'dateOfExpiry_dt:[NOW TO *]'
                        
                    }
                    function buildContactsUserCountryfn(filter){
                        var countries =  _.map(filter.selectedItems, 'identifier') 
                        if(countries.length){
                            return 'country_s:(' + solr.escape(countries.join(' ')) + ') AND referencedPermits_ss:*';
                        }
                    }
                    function buildAdvanceSettingsQuery(filters, field){

                        var validValues     =   _(filters).map(function(filter){
                                                    if(!filter.disabled && !filter.excludeResult)
                                                        return solr.escape(filter.id);                                                        
                                                }).compact().uniq().value();

                        var excludedValues =   _(filters).map(function(filter){
                                                    if(!filter.disabled && filter.excludeResult)
                                                        return solr.escape(filter.id);                                                        
                                                }).compact().uniq().value();

                        var query = '';
                        if(validValues.length)
                            query = field + ':(' + validValues.join(' ') + ')';

                        if(excludedValues.length){
                            var excludeQuery = '*:* NOT ' + field + ':(' + excludedValues.join(' ') + ')'
                            if(query.length){
                                query = '(' + query + ' AND ' + excludeQuery + ')'
                            }
                            else
                                query = excludeQuery
                        }
                        
                        return query;
                    }

                    function buildRawQuery(){
                        // console.log($scope.setFilters['rawQuery']||{});
                        const query = ($scope.setFilters['rawQuery']||{}).id;
                        // const parseQuery = query.split(':').map(e=>)
                        // return solr.escape(();

                        return query;
                    }

                    function getCountryList(id, list){

                        var templist = _.filter(list, function (item) {

                            if (id === 'partyToProtocol' && item.isParty === true)
                                return item;
                            else if (id === 'nonParty' && item.isParty === false)
                                return item;
                            if (id === 'NKLSParty' && item.isNKLSParty === true)
                                return item;
                            else if (id === 'inbetween' && item.isInbetweenParty === true)
                                return item;
                        });

                        var govs = _.map(templist, 'id');

                        return govs.join(" ");
                    }

                    function getSchemaFieldMapping(schema){
                        return leftMenuSchemaFieldMapping[schema];
                    }

                    function onLeftFilterUpdate(filters){
                        leftMenuFilters = filters;
                        updateQueryResult();
                    }

                    $scope.getLeftSubFilters = function(){
                        return leftMenuFilters
                    }
                    async function loadLeftMenuFieldMapping(){
                        
                        if(isABS) {
                            const {absLeftMenuFilters} = await import('./search-filters/abs-left-menu-filters.js');
                            return absLeftMenuFilters;
                        }
                        else {
                            const { bchLeftMenuFilters } = await import('./search-filters/bch-left-menu-filters.js');
                            return bchLeftMenuFilters;
                        }
                    }

	                $scope.showSaveFilter = function ( filters ) {

                        if (!$rootScope.user || !$rootScope.user.isAuthenticated ) {
                            var signIn = $scope.$on( 'signIn', function ( evt, data ) {
                                $scope.addEdit();
                                signIn();
                            } );

                            $( '#loginDialog' ).modal( "show" );
                        } else {

                            ngDialog.open({
                                className: 'ngdialog-theme-default wide save-this-search-alert',
                                template: 'saveMySearchDialog',
                                controller: ['$scope', 'IGenericService', '$timeout', 'realm', function ($scope, IGenericService, $timeout, realm) {
                                    $scope.saveThisFilter = filters;
                                    $scope.save = function (document) {
                                        $scope.errors = [];
                                        if (!document || document.queryTitle == '') {
                                            $scope.errors.push('Please enter title of the alert')
                                        }
                                        if (!$scope.saveThisFilter || _.isEmpty($scope.saveThisFilter)) {
                                            $scope.errors.push('Please select at least one filter')
                                        }
                                        if ($scope.errors && $scope.errors.length > 0) {
                                            $("#dialog-errors").animate({
                                                scrollTop: 0
                                            }, 600);
                                            return;
                                        }

                                        $scope.loading = true;
                                        var operation;

                                        document.isSystemAlert = false;
                                        let leftFilterQuery = {}
                                        _.forEach(leftMenuFilters, function(f, key){
                                            _.forEach(f, function(filter){
                                                if(!_.isEmpty(filter.selectedItems)){
                                                    leftFilterQuery[key] = leftFilterQuery[key] || [];
                                                    const  {field, relatedField, searchRelated, term, title, type } = filter
                                                    leftFilterQuery[key].push({field, relatedField, searchRelated, selectedItems:filter.selectedItems, term, title, type});
                                                }
                                            });
                                        });
                                        document.filters = _.values($scope.saveThisFilter);
                                        document.subFilters = leftFilterQuery; // pass only selected sub-filters query
                                        document.realm = realm.value;
                                        if (!document._id)
                                            operation = IGenericService.create('v2016', 'me/subscriptions', document);
                                        else
                                            operation = IGenericService.update('v2016', 'me/subscriptions', document._id, document);

                                        operation.then(function (data) {
                                            $scope.closeDialog();
                                            if (!document._id)
                                                document._id = data.id;
                                        });
                                    };
                                        $scope.getFilterName = function (name) {
                                            return (typeof name === "object")?name[locale]:name;
                                        }
                                    $scope.closeDialog = function () {
                                        ngDialog.close();
                                    };

                                }]
                            });
                        }
                    }


                    init();

                    this.getAllSearchFilters      = getAllSearchFilters     ;
                    this.getSearchFilters         = getSearchFilters        ;
                    this.addFilter                = addFilter               ;
                    this.removeGlobalFilter       = removeGlobalFilter      ;
                    this.getFilter                = getFilter               ;
                    this.getSchemaFieldMapping    = getSchemaFieldMapping   ;
                    this.onLeftFilterUpdate       = onLeftFilterUpdate      ;

                    this.groupByFields            = groupByFields           ;
                    this.groupingCombination      = groupingCombination     ;
                    this.combinationField         = combinationField        ;
                    this.sanitizeFacets           = sanitizeFacets          ;
                    this.cbdSubjectsCustomFn      = cbdSubjectsCustomFn     ;
                    this.vlrResourceCustomFn      = vlrResourceCustomFn     ;
                    this.cbdCountriesCustomFn     = cbdCountriesCustomFn    ;
                    this.getFocalPointTypes       = getFocalPointTypes
            }]//controller
        };
    });

