import app from 'app';
import template from 'text!./national-records-country.html';
import _ from 'lodash';
import 'views/search/search-results/result-grouped-national-record';
import 'services/main';
import 'views/directives/party-status';

    app.directive('nationalRecordsCountry', ['searchService', 'solr', function(searchService, solr) {
        return {
            restrict: 'EAC',
            replace: true,
            require:'^searchDirective',
            template: template, 
            scope: {
                group:'='
            },
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
                   var currentPage = 1;
                   if(!$scope.group)
                        $scope.norecords = true;

                   $scope.name      = $scope.group.country;
                   $scope.numFound  = _.reduce($scope.group.schemas, function(sum, schema){return sum + (schema||{}).numFound}, 0);
                   $scope.schemas   = $scope.group.schemas;
                   $scope.getFilter = searchDirectiveCtrl.getFilter;
                

                    $scope.loadRecords = function(key, schema, number){

                        schema.isLoading = true;
                        var query = {
                            query   : 'schema_s:(' + solr.escape(key) +') AND government_s:' + 
                                        solr.escape($scope.group.country.toLowerCase()),
                            sort    : 'government_EN_s asc, schemaSort_i asc, sort1_i asc, sort2_i asc, sort3_i asc, sort4_i asc, updatedDate_dt desc',
                            rowsPerPage    : number||5000,
                            start          : number ? undefined : (schema.start==0 ? 10 : schema.start),
                            currentPage    : schema.start==0 ? 1 : Math.ceil((schema.start+number)/10)
                        }
                        return searchService.list(query)
                        .then(function(result){
                            schema.start = query.currentPage*10;
                            
                            schema.docs = schema.docs.concat(result.data.response.docs)
                        })
                        .finally(function(){
                            schema.isLoading = false;
                        })

                    }
            },
        };
    }]);

