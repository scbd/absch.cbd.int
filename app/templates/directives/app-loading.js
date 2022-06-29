import app from '~/app'
import 'angular-animate';

app.directive("appLoading", ['$animate', '$location', function ($animate, $location) {
    return ({
        template:'',
        restrict: "E",
        link: function link($scope, element, attributes) {

            $animate.leave(element.children().eq(1)).then(
                function cleanupAfterAnimation() {
                    element.remove();
                    element = attributes = null;
                }
            );

            var queryString = $location.search();
            if(queryString && (queryString.print || queryString.embed)){
                require(['css!/app/css/print-friendly'], function(){})
                $('body').addClass('print');
            }
            if(queryString && queryString.embed){
                $('body').addClass('embed');
                window.addEventListener('message', (evt)=>{
                    if(evt.data){
                        const data = JSON.parse(evt.data);
                        if(data.type == 'getClientHeight' && window.scbdEmbedData){

                            console.log($(window.scbdEmbedData.selector));
                            var height = $(window.scbdEmbedData.selector).height()+50;
                            data.height = height;
                            data.type = 'setClientHeight';
                            window.parent.postMessage(JSON.stringify(data), evt.origin);
                        }
                    }
                });
                
            }
        }
    });    
}]);