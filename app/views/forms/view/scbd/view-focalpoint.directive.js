import app from '~/app';
import template from 'text!./view-focalpoint.directive.html';
import '~/views/directives/record-options';
import viewFocalPointT from '~/app-text/views/forms/view/scbd/view-focalpoint.directive.json';

app.directive('viewFocalPoint', ['realm', 'translationService', function(realm, translationService) {
	return {
		restrict: 'EAC',
		template: template ,
		replace: true,
		scope: {
			document: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		link: function($scope, element, attrs, controller) {
			translationService.set('viewFocalPointT', viewFocalPointT);
		},
		controller: ['$scope','commonjs', '$q', async function ($scope, commonjs, $q) {

			const chFolder = realm.is('BCH') ? 'bch' : 'abs';
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

