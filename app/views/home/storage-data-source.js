module.exports = ['$scope', 'authHttp', function ($scope, $http) {

    $scope.documentsCount = $http.get('/api/v2013/documents/?collection=my').then(function (response) {
        return response.data.Items.length;
    });

    $scope.draftsCount = $http.get('/api/v2013/documents/?collection=mydraft').then(function (response) {
        return response.data.Items.length;
    });
}];