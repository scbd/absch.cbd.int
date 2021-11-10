import app from 'app';
import _ from 'lodash';
import 'views/forms/view/bch/view-lmo-reference.directive';
import 'services/main';
import 'angucomplete-alt';
import 'views/directives/block-region-directive';
import 'views/reports/bch/lmo-decisions';
import 'views/reports/bch/risk-assessments';
import 'views/forms/view/record-loader.directive'; ;

export { default as template } from './lmo-decisions-risk-assessments.html';

export default ['$scope', '$routeParams', '$route', 'solr', 'searchService', '$timeout',
	function($scope, $routeParams, $route, solr, searchService, $timeout) {

        $scope.tab = $routeParams.tab;
		$scope.identifier = $route.current.params.documentId;		
		
		$scope.$watch('newLmo', function(newVal){
			if(newVal){
				$scope.identifier = newVal.identifier_s;
				//commonjs.hexToInteger();
                var tab = $scope.tab;
                $scope.tab = undefined;	
                $route.updateParams({documentId:newVal.identifier_s})
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

	}];
	

