import app from 'app';
import _ from 'lodash';
import angular from 'angular';
    app.directive('hoverEffect',['$timeout', function ($timeout  ) {
    return {
        scope: {
            hoverEffect: '@'
        },
        restrict: 'A',
        link: function (scope, element) {
            if(!scope.hoverEffect) return;
            element.on( 'mouseenter', function () {
                if (window.innerWidth > 800) {
                    element.children(scope.hoverEffect).addClass("show");
                }
            });
            element.on('mouseleave', function () {
                if(  element.children(scope.hoverEffect).hasClass("show")){
                   $timeout(function(){
                       element.children(scope.hoverEffect).removeClass("show");
                   }, 500);

                }
            });
        }
    };
}]);

