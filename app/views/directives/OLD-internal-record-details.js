import app from '~/app';
import template from 'text!./OLD-internal-record-details.html';
import '~/components/scbd-angularjs-services/main';
import '~/views/forms/view/view-history-directive';
	app.directive('internalRecordDetails', function($http){
		return{
			restrict: 'EAC',
			replace:true,
			template: template,
            scope       : {
                doc  : '=',
                docInfo  : '='
            },
			controller: ['$scope','$filter', function($scope, $filter){
                  
                   $scope.getUserCountry = function(id){
                        var term = {};
                        term.identifier = id
                        return $filter('term')(term);
                   }
                    
			}]
		};

	});

