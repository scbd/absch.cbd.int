import as from '~/app'
import '~/components/scbd-angularjs-services/main';
import { getRecaptchaToken } from '~/services/reCaptcha'

export { default as template } from './draft-document-pdf-link.html'
export default ["$scope", "$http", "$q", "$location", '$sce', 'locale', '$route', 'realm', '$timeout',
    function ($scope, $http, $q, $location, $sce, locale, $route, realm, $timeout) {

        var uniqueId = $route.current.params.documentId;
        var language = ($route.current.params.lang||$location.search()?.lang||''); 

        async function getPdfLink(){

            try{
                $scope.messages = "validating user..."
                const captchaToken   = await getRecaptchaToken();
                $scope.messages += "<br/>user validated..."
                //60 minute expiry
                var document = {
                    shareType   : "link",
                    storageType : "km-document",
                    expiry      : new Date(new Date().getTime()+(60*60*1000)),
                    sharedData  : { "identifier": uniqueId, realm : realm.value },
                    sharedWith  : { "link" : true },
                    forPdf      : true
                }             

                $scope.status = "creatingLink";
                $scope.messages += "<br/>creating share link..."
                const response = (await $http.post('/api/v2018/document-sharing', document,  { headers: {'x-captcha-v2-badge-token':captchaToken}})).data
                const id       = response.id;
                $scope.messages += "<br/>share link created..."
                
                $scope.messages += "<br/>loading link information..."
                const documentShare = (await $http.get('/api/v2018/document-sharing/'+id)).data

                $scope.messages += "<br/>loading hash information..."
                const documentShareInfo = (await $http.get('/api/v2018/document-sharing/'+documentShare.urlHash)).data
                                // console.log(result);            
                let schema = documentShareInfo.sharedData?.document?.type || uniqueId  
                
                $scope.messages += "<br/>redirecting to pdf page..."
                $timeout(()=>{
                    $location.url(`/pdf/draft-documents/${schema}/${documentShare.urlHash}?code=${documentShare.urlHash}&shareId=${id}&${(language ? `lang=${language}`: '&mixLocale=true')}`);
                }, 100)
            }
            catch(e){
                console.error(e);
                $scope.error = "Error generating PDF, please try to reload the page";
            }

        }

        getPdfLink();

}]