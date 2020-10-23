define(['app','lodash','angular'], function(app,_,angular) {
    app.directive('hoverEffect',['$timeout', function ($timeout  ) {
    return {
        scope: {
           binding: '=ngModel'
        },
        restrict: 'EAC',
        link: function (scope, element, attr) {
            element.on( 'mouseenter', function () {
                if(!element.hasClass('true') && attr.isauthenticated != undefined){
                    return;
                }
                if (window.innerWidth > 800) {
                    element.children("ul").addClass("show");
                }
            });

            element.on('mouseleave', function () {
                if(element.children("ul").hasClass("show")){
                   $timeout(function(){
                        element.children("ul").removeClass("show");
                   }, 500);

                }
            });
        }
    };
}]);
});