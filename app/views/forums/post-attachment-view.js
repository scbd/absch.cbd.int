define(['app', 'lodash','ng-breadcrumbs', 'cbd-forums',
        'services/main'], function(app, _) {

    return ["$scope", "$http", "$q", "$route", "$routeParams","commonjs","$rootScope",'$location',
     function($scope, $http, $q, $route, $routeParams, commonjs, $rootScope, $location) {
        var qs = $location.search();
        console.log(qs)

        if(qs && qs.id){
            var attachmentObjectId = "52000000CBD1985000000000";
            var hex = Number(qs.id).toString(16);
            hex = attachmentObjectId.substr(0, 24 - hex.length) + hex;

            $http.get('/api/v2014/discussions/attachments/' + hex).then(function(result) {
                console.log(result);
                window.location = result.data.URL;
            });
        }
    }];
});
