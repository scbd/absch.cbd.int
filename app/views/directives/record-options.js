define(['app', 'text!views/directives/record-options.html', 'js/common'], function (app, template) {
app.directive('recordOptions', function () {
        return {
            restrict: 'EAC',
            template : template,
            scope : {
                  date : '='
                },
            link: function ($scope, element, attrs) {
                
            },
            controller: [ "$scope", '$rootScope', '$filter', '$timeout', 'commonjs', '$q',
					 function ($scope, $rootScope, $filter, $timeout, commonjs, $q) 
					{
				
                    

					}
				]
        };
    });
});

