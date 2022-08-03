import angular from 'angular-flex';
import app from '~/app'
import 'angular-animate';

app.directive("appLoading", ['$animate', '$location', '$window', function ($animate, $location, $window) {
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

                let windowHeight;
                let iframeOriginData;
                function sendIframeCommunication(){
                    const height = $('#page-content-wrapper').height();
                    if(windowHeight != height){
                        windowHeight = height;
                        const data = {
                            ...iframeOriginData.data,
                            height  : windowHeight,
                            type    : 'setClientHeight'
                        };
                        window.parent.postMessage(JSON.stringify(data), iframeOriginData.origin);
                    }
                }
                window.addEventListener('message', (evt)=>{
                    if(evt.data){
                        let data = evt.data;
                        if(typeof evt.data == 'string')
                            data = JSON.parse(evt.data);
                        if(data.type == 'getClientHeight'){
                            iframeOriginData = {data, origin :evt.origin };
                            sendIframeCommunication();
                            resize_ob.observe(document.querySelector("#page-content-wrapper"));
                        }
                    }
                });                
                const resize_ob = new ResizeObserver(function(entries) {
                    sendIframeCommunication();
                });                
            }
        }
    });    
}]);