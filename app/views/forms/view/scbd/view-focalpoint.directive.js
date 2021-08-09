import app from 'app';
import template from 'text!./view-focalpoint.directive.html';
import 'views/directives/record-options';

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

			const chFolder = realm.is('BCH') ? 'bch' : 'abs';
			const { categories } = await import(`/app/app-data/${chFolder}/focal-point-category.js`);

			$scope.nfpCategory = function(category){
				if(categories){
					const cat = categories.find(e=>~e.key.indexOf(category))
					if(cat)
						return cat.title;
				}
			}

			$scope.$watch('::document', function(newVal){
				$q.when(commonjs.getReferenceRecordIndex('focalPoint', newVal.header.identifier))
					.then(function(result){
							$scope.focalPointDetails = result.data
							$scope.focalPointDetails.description_EN_t = ($scope.focalPointDetails.description_EN_t||'').replace(/\n/g, '<br/>')
					})
			})
			
			
		}]
	}
}]);

