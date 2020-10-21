define(['app','lodash','angular'], function(app,_,angular) {
    app.directive('hoverEffect',['$timeout', function ($timeout  ) {
    return {
        scope: {
           binding: '=ngModel',
        },
        restrict: 'EA',
        link: function (scope, element) {
            element.on( 'mouseenter', function () {
                if (window.innerWidth > 800) {
                    element.children("ul").addClass("show");
                }
            });

            element.on('mouseleave', function () {
                if(element.children("ul").hasClass("show")){
                    element.children("ul").removeClass("show");
                }
            });
        }
    };
}]);
});