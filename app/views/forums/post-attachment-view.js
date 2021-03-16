import app from 'app';
import _ from 'lodash';
import 'ng-breadcrumbs';
import 'cbd-forums';
import 'services/main';

    export { default as template } from './post-attachment-view.html';
export default ["$scope", "$http", "$q", "$route", "$routeParams","commonjs","$rootScope",'$location',
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

