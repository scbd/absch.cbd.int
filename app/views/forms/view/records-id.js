define(['app','components/scbd-angularjs-services/services/locale','./record-loader.directive'], function (app) {

    app.controller("recordsViewController", ['$scope', "$sce", "commonjs", "$timeout", "$filter", 
        "realm", "$element", 'searchService', 'ngMeta', 'locale',
    function ($scope, $sce, commonjs, $timeout, $filter, realm, $element, searchService, ngMeta, locale){

        function setMetaTags(){
            var document;
            if($scope.api){
                document = $scope.api.getDocument()
                if(document){
                    searchService.list({
                        fields:'rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:description_EN_t,uniqueIdentifier_s,url_ss',
                        query:'identifier_s:'+document.header.identifier
                    })
                    .then(function(result){
                        var schemaName      = $filter('schemaName')(document.header.schema);	
                        var schemaShortCode = $filter('schemaShortName')(document.header.schema);	
                        var indexDoc = result.data.response.docs[0];
                        var title = indexDoc.rec_countryName;
                        title = title ? (title + ' | ') : '';
                        title += schemaName;
                        var summary = indexDoc.rec_title

                        if(indexDoc.rec_summary)
                            summary += ' | ' + indexDoc.rec_summary;

                        ngMeta.resetMeta();   
                        ngMeta.setTitle(title);
                        ngMeta.setTag('description', summary || window.scbdApp.title);
                        // TODO: use url_ss when all indexers are moved a good url
                        // TODO: move all index url to https://ch.cbd.int/database/{SchemShortCode}/{UniqueID}
                        //       eg http://absch.cbd.int/database/MSR/ABSCH-MSR-HT-206856
                        // if(indexDoc.url_ss.length>0){
                        //     var url = _.find(indexDoc.url_ss, function(url){
                        //         return ~url.indexOf(realm.originalObject.baseURL)
                        //     })
                        //     ngMeta.setTag('canonical', url)
                        // }
                        if(indexDoc.uniqueIdentifier_s){
                            var uniqueId = indexDoc.uniqueIdentifier_s.replace(/\-[0-9]{1,2}$/, '').toUpperCase()
                            var url = realm.originalObject.baseURL + '/' + locale  + '/' + schemaShortCode + '/' + uniqueId
                            ngMeta.setTag('canonical', $sce.trustAsResourceUrl(url))
                        }
                    })

                }
            }
            if(!document)
                $timeout(setMetaTags, 1000)
        }

        setMetaTags();
    }])
});
