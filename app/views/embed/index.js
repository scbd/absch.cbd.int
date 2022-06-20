import app from 'app';

export { default as template } from './index.html';

export default ['$scope', '$routeParams', '$http', '$location', 'locale',
 function ($scope, $routeParams, $http, $location, locale){

    const elementMapping = {
        'chm-document' : '#recordContent'
    }

    async function init(){

        $scope.loading = true;

        try{
            if($routeParams.accessKey){
                const data = (await $http.get(`/api/v2018/document-sharing/${$routeParams.accessKey}`)).data;
                console.log(data);
                // if(data.sharType == 'embed')
              
                window.scbdEmbedData = {
                    selector : elementMapping[data.storageType]
                }
                if(data.storageType == 'chm-document'){
                    $scope.$apply(()=>{
                        $location.path(`/database/record/${data.sharedData.recordKey}`);
                    })
                }
                
            }
        }
        catch(err){
            console.log(err);
        }
        finally{
            $scope.loading = false;
        }
    }

    // function registerIframeCommunication(selector){

    //     window.addEventListener('message', (evt)=>{
    //         console.log(evt);

    //         if(evt.data){
    //             const data = JSON.parse(evt.data);
    //             if(data.type == 'getClientHeight'){
    //                 var height = $(selector).height()+20;
    //                 data.height = height;
    //                 data.type = 'setClientHeight';
    //                 window.parent.postMessage(JSON.stringify(data), evt.origin);
    //             }
    //         }
    //     });
    // }

    function sendIframeCommunication(selector){
        var height = $(selector).height()+20;
        var data = {
            height : height,
            type : 'setClientHeight'
        }
        window.parent.postMessage(JSON.stringify(data), '*');
    }

    init()

}];