import app from '~/app';
import _ from 'lodash';
import videosData from '~/app-data/help-videos.json';
import '~/views/about/youtube';
import 'ngDialog';
export { default as template } from './videos.html';

  export default ["$rootScope", "$scope", "$q", '$element', '$route', 'ngDialog', function ($rootScope, $scope, $q, $element, $route, ngDialog) {

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



        
   }];

