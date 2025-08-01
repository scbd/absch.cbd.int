
import app from '~/app';
import _ from 'lodash';
import template from "text!./national-support-tool.html";
import nationalSupportTool from '~/app-text/views/reports/chm/national-support-tool.json';


app.directive('viewNationalSupportTool', ["$q", "IStorage",'translationService', function ($q, storage,translationService) {
	return {
		restrict   : 'EAC',
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
			translationService.set('nationalSupportTool ', nationalSupportTool );
			//===============
			//
			//===============
			//do we need this section?
			$scope.$watch("document.aichiTargets", function (refs) {
				if(refs){
					$q.when(loadReferences(refs, { info : true })).then(function(result){
						$scope.aichiTargets = result;
					});
				}
			});

			//===============
			//
			//===============
			$scope.$watch("document.otherAichiTargets", function (refs) {
				if(refs){
					$q.when(loadReferences(refs, { info : true })).then(function(result){
						$scope.otherAichiTargets = result;
					});
				}
			});

			//===============
			//
			//===============
			$scope.$watch("document.nationalTargets", function (refs) {
				if(refs){
					$q.when(loadReferences(refs, { info : true })).then(function(result){
						$scope.nationalTargets = result;
					});
				}
			});


			//===============
			//
			//===============
			function loadReferences(refs, options) {

				if (!refs)
					return;

				options = _.extend(options || {}, { cache: true });

				return $q.all(_.map(refs, function(ref) {
					return storage.documents.get(ref.identifier, options)
						.then(function(res) {
							return res.data;
						});
				}));
			}
		}
	};
}]);

