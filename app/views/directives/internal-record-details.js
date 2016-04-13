define(['app' , 'scbd-angularjs-services', 'scbd-angularjs-filters', 	'/app/views/forms/view/view-history-directive.html.js',

    ], function (app) {
	app.directive('internalRecordDetails', function($http){
		return{
			restrict: 'EAC',
			replace:true,
			templateUrl: '/app/views/directives/internal-record-details.html',
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
});
