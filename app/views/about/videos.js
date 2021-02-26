define(['app','lodash', 'app-data/help-videos', 'views/about/youtube', 'ngDialog',], function (app, _, videosData) {
app.controller("videosController",
        ["$rootScope", "$scope", "$q", '$element', '$route', 'ngDialog', function ($rootScope, $scope, $q, $element, $route, ngDialog) {

        $scope.videos = videosData;

        if($route.current.params.videoId && videosData[$route.current.params.videoId]){
           $scope.video_pop = [videosData[$route.current.params.videoId]];
           console.log ($scope.video_pop );
        }

        if ($scope.video_pop){
                ngDialog.open({ template: 'video-pop-modal', 
                        className: 'ngdialog-theme-default',
                        scope:$scope,

                });
        }



        
   }]);
});
