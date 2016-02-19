define(['app', '/app/js/common.js',
'/app/views/search-new/search-results/record-viewer.js'
    ], function (app) {
	app.controller('adminReportedRecordsCtrl', ['$scope', '$http','commonjs','$element',
        function($scope, $http, commonjs, $element){
                $http.get('http://localhost:8000/api/v2015/report-records')
                .then(function(data){
                    $scope.reportRecords = data.data
                });

			}]
		);

});
