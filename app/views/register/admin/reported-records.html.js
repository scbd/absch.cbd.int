define(['app', '/app/js/common.js',
'/app/views/search/search-results/record-viewer.js',
 '/app/views/register/directives/register-top-menu.js'
    ], function (app) {
	app.controller('adminReportedRecordsCtrl', ['$scope', '$http','commonjs','$element',
        function($scope, $http, commonjs, $element){
                $http.get('/api/v2015/report-records')
                .then(function(data){
                    $scope.reportRecords = data.data
                });

			}]
		);

});
