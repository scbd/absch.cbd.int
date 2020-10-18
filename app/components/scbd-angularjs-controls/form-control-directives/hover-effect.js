define(['app','lodash','angular'], function(app,_,angular) {
    app.directive('hoverEffect',['$timeout', function ($timeout  ) {
    return {
        scope: {
           binding: '=ngModel',
        },
        restrict: 'EA',
        link: function (scope, element) {
                element.on( 'mouseenter', function (e) {
                element.children("ul").attr("style",'display:block');
            });
            element.on('mouseleave', function (e) {
               if(element.children("ul").attr("style") == 'display:block'){
                element.children("ul").removeAttr("style");
               }
            });
        }
    };
}]);
});