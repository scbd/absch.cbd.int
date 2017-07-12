define(['app','underscore', 'json!app-data/help-videos.json', './youtube', './left-menu',], function (app, _, videosData) {
app.controller("videosController",
	["$rootScope", "$scope", "$q", '$element', '$route', function ($rootScope, $scope, $q, $element, $route) {

        $scope.videos = videosData;
        if($route.current.params.videoId && videosData[$route.current.params.videoId]){
           $scope.videos = [videosData[$route.current.params.videoId]];
        }

        
   }]);
});
