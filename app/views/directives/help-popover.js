define(['app'], function (app) {
	app.directive('helpPopover', function(){
		return{
			restrict: 'EAC',
			replace:true,
			templateUrl: '/app/views/directives/help-popover.html',
			link: ['$scope','element', 'attrs', function($scope, element, attrs){
                        
              
			}]
		};

	});
});
