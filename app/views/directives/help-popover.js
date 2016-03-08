define(['app', $], function (app) {
	app.directive('helpPopover', function(){
		return{
			restrict: 'EAC',
			replace:true,
			templateUrl: '/app/views/directives/help-popover.html',
			link: function($scope, element, attrs){
                       
                $scope.showPopover = function(element){   
                    
                    console.log("click");
                    
                    $(element).popover({
                        trigger: 'click',
                        html: true,
                        title: attrs.title,
                        content: attrs.content,
                        placement: attrs.placement
                    });
                };
                        
			},
            
		};

	});
});
