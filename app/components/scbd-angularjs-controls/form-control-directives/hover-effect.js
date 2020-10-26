define(['app','lodash','angular'], function(app,_,angular) {
    app.directive('hoverEffect',['$timeout', function ($timeout  ) {
    return {
        scope: {
            deopDownMenu: '=hoverEffect'
        },
        restrict: 'A',
        link: function (scope, element) {
            element.on( 'mouseenter', function () {
                if (window.innerWidth > 800) {
                    element.children("."+scope.deopDownMenu).addClass("show");
                }
            });
            element.on('mouseleave', function () {
                if(  element.children("."+scope.deopDownMenu).hasClass("show")){
                   $timeout(function(){
                       element.children("."+scope.deopDownMenu).removeClass("show");
                   }, 500);

                }
            });
        }
    };
}]);
});