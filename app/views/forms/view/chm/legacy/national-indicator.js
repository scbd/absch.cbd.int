import app from '~/app';
import _ from 'lodash';
import template from "text!./national-indicator.html";
import '~/components/scbd-angularjs-controls/main';
import nationalIndicator from '~/app-text/views/reports/chm/national-indicator.json';

app.directive('viewNationalIndicator',  ["$q", "IStorage", 'translationService',function ($q, storage,translationService) {
	return {
		restrict   : 'E',
		template   : template,
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			allowDrafts : "@"
		},
		link : function ($scope)
		{
			translationService.set('nationalIndicator', nationalIndicator);
			//===============
			//
			//===============
			$scope.$watch("document.strategicPlanIndicators", function(refs) {

				if(refs){
					$q.when(loadReferences(refs)).then(function(result){
						$scope.strategicPlanIndicators = result;
					});
				}
			});

			//===============
			//
			//===============
			function loadReferences(refs) {

				if (!refs)
					return;

				return $q.all(_.map(refs, function(ref) {
					return storage.documents.get(ref.identifier, { info: "", cache: true })
						.then(function(res) {
							return res.data;
						});
				}));
			}
		}
	};
}]);

