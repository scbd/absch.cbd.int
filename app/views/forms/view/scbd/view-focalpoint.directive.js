import app from '~/app';
import template from 'text!./view-focalpoint.directive.html';
import '~/views/directives/record-options';
import { getApplicationArticleRealm } from "../../services/composables/articles.js";

app.directive('viewFocalPoint', ['realm', function(realm) {
	return {
		restrict: 'EAC',
		template: template ,
		replace: true,
		scope: {
			document: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		controller: ['$scope','commonjs', '$q', async function ($scope, commonjs, $q) {

			const chFolder = getApplicationArticleRealm(realm);
			const { categories } = await import(`../../../../app-data/${chFolder}/focal-point-category.js`);

			$scope.nfpCategory = function(category){
				if(categories){
					const cat = categories.find(e=>~e.key.indexOf(category))
					if(cat)
						return cat.title;
				}
			}

			$scope.$watch('::document', function(newVal){
				if(!newVal)
					return
				$scope.focalPointDetails = {
					categoryIdentifiers : (newVal.categories||[]).map(e=>{return {identifier:e}})
				}
				$q.when(commonjs.getReferenceRecordIndex('focalPoint', newVal.header.identifier))
					.then(function(result){
							$scope.focalPointDetails = { ...$scope.focalPointDetails, ...result.data };
							$scope.focalPointDetails.address_EN_t = ($scope.focalPointDetails.address_EN_t||'').replace(/\n/g, '<br/>')
					})
			})
			
			
		}]
	}
}]);

