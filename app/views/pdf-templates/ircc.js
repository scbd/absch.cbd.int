import app from '~/app';
import '~/services/main';
import './ircc-directive';
import 'css!~/css/print-friendly.css';
import 'css!~/css/abs/pdf-ircc.css';

	export { default as template } from './ircc.html';
export default ['$scope','$routeParams','$location','$filter',
		function($scope,$routeParams,$location, $filter) {
		
		var documentId = $routeParams.documentId;
		
		if (documentId && /^absch/.test(documentId.toLowerCase())) {
			var docNum = documentId.split('-');
			if (docNum.length == 5) {
				documentId = docNum[3]+'@'+docNum[4]
			}
		}
		$scope.identifier = documentId;

	}];


