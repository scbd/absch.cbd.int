define(['app', 'lodash', 'views/forms/view/bch/view-lmo-reference.directive', 'services/solr',
'angucomplete-alt','views/directives/block-region-directive', 'services/search-service', 'js/common',
'./lmo-decisions', './risk-assessments', 'views/forms/view/record-loader.directive'], function(app, _) { 'use strict';

app.controller("LmoReportController", ['$scope', '$routeParams', '$route', 'solr', 'searchService', '$timeout',
	function($scope, $routeParams, $route, solr, searchService, $timeout) {

        $scope.tab = $routeParams.tab;
		$scope.identifier = $route.current.params.documentId;		
		
		$scope.$watch('newLmo', function(newVal){
			if(newVal){
				$scope.identifier = newVal.originalObject.identifier_s;
				//commonjs.hexToInteger();
                var tab = $scope.tab;
                $scope.tab = undefined;	
                $route.updateParams({documentId:newVal.originalObject.identifier_s})
                $timeout(function(){$scope.tab = tab}, 100);			
			}
		})
		
		$scope.loadLMos = function(userInputString, timeoutPromise){
			$scope.loadingData=true;
			var searchQuery = solr.escape(userInputString);
// unescape ^ so that users can add boosting to the query using solr syntax
			searchQuery		= searchQuery.replace(/\\^\d+(\s|$)/g,   '^');
			var query = {
				fieldQuery: ['schema_s:modifiedOrganism'],
				query : 'text_EN_txt:(' + searchQuery + ')',
				fields: 'id,identifier_s,title:title_EN_t,summary:summary_EN_t'
			}
		    return searchService.list(query).then(function(r) {
				return {data : r.data.response.docs};
			})
			.finally(function(){$scope.loadingData=false;});
		}

        $scope.changeTab = function(tab){
            $scope.tab = tab;
            $route.updateParams({tab:tab});
        }

	}]);
	
});
