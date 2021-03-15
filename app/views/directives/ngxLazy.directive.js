import app from 'app';
	app.directive('ngxLazy', function ($http, $compile, $timeout) {
	    return {
	        restrict: 'E',
	        scope: {
	            ready: '=ready'
	        },
	        link: function (scope, $element, attr, ctrl, $transclude) {
	        	scope.$watch('ready', function (value) { 
	        		if(value) {	        			
	        			$compile($element.contents())(scope);
	        		}
	        	});
	    	}
	    }
	})
