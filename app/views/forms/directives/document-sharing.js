import template from './document-sharing.html'
import app from '~/app'
import 'angular'
import _ from 'lodash'
import 'ngDialog'
import 'components/scbd-angularjs-services/main';
import documentSharingT from '~/app-text/views/forms/directives/document-sharing.json';

app.directive('documentSharing', ["$http", "$q", "$route", 'ngDialog', '$timeout', 'IGenericService', '$document', '$window', '$rootScope', 'realm', 'locale', 'translationService',
    function ($http, $q, $route, ngDialog, $timeout, genericService, $document, $window, $rootScope, realm, locale, translationService) {
    return {
        restrict   : 'E',
        template   : template,
        replace    : true,
        transclude : false,
        scope      : {
            title : '@',
            identifier : '=',
            restrictionField : '@',
            restrictionFieldValue : '=',
            disabled		    : "=?ngDisabled",
            getLocales          : '&',
        },
        link : function($scope, $element)
        {
            $scope.self = $scope;
            $scope.status   = "";
            $scope.error    = null;
            translationService.set('documentSharingT', documentSharingT);

            $scope.shareDocument = function(){
                
                ngDialog.open({
                    template: 'shareDocumentTemplate.html',													
                    closeByDocument: true,
                    closeByEscape: true,
                    showClose: true,
                    closeByNavigation: false,
                    scope: $scope
                });
                loadSharedLinks()
            }

            $scope.getPdf = function(){
                $scope.pdfUrl = undefined;
                ngDialog.open({
                    template: 'documentPdfTemplate.html',													
                    closeByDocument: true,
                    closeByEscape: true,
                    showClose: true,
                    closeByNavigation: false,
                    scope: $scope                    
                });
                $q.when($scope.getLocales())
                .then(function(locales){
                    $scope.documentLocales = locales
                    // if(document && document.urlHash){
                        $scope.pdfUrl = '/pdf/draft-documents/';//+ $scope.document.sharedData.identifier + '/'+ $scope.document.urlHash;  
                    // }
                    // else{
                    //     $q.when($scope.createLink())
                    //     .then(function(){
                    //         $scope.pdfUrl = '/pdf/draft-documents/'+ $scope.document.sharedData.identifier + '/'+ $scope.document.urlHash;
                    //     })
                    // }   
                })
            }

            $scope.createLink = function(){
                                    
                var newDocument = {}
                newDocument.storageType = "km-document";
                newDocument.sharedData = {
                    "identifier"            : $scope.identifier,
                    "restrictionField"      : $scope.restrictionField
                };
                if($scope.restrictionFieldValue)
                newDocument.sharedData.restrictionFieldValue = $scope.restrictionFieldValue.toString();

                newDocument.sharedWith = { "link" : true };
                
                return saveLink(newDocument);
            }

            $scope.shareEmail = function(shareEmails){  
                if(!shareEmails)
                    return;

                let document = {
                    storageType: "km-document",
                    sharedData : {
                        identifier       : $scope.identifier,
                        restrictionField : $scope.restrictionField
                    },
                    sharedWith: {
                        emails           : shareEmails
                    }
                }
                if($scope.restrictionFieldValue)
                    document.sharedData.restrictionFieldValue = $scope.restrictionFieldValue.toString();                   

                saveLink(document);
            }

            function saveLink(document){

                var operation;

                if(document._id)
                    operation = genericService.update('v2018', 'document-sharing', document._id, document);
                else
                    operation = genericService.create('v2018', 'document-sharing', document);

                $scope.status = "creatingLink";
                return $q.when(operation)
                .then(function(response){
                    var id= response.id || document._id;
                    return $q.when(get(id))
                            .then(function(data){                            
                                $scope.document = undefined;
                                if(!$scope.sharedLinks)
                                    $scope.sharedLinks = [];
                                $scope.sharedLinks.push(data);
                            })
                })
                .finally(function(){
                    $scope.status = '';
                })

            }

            $scope.getUrl = function(hash){

                return location.origin + '/database/share/' + hash;
            }

            $scope.copyUrl = function(index){
                var body = angular.element($window.document.body);
                var textarea = angular.element('<textarea/>');
                textarea.css({
                    position: 'fixed',
                    opacity: '0'
                });

                textarea.val($document.find('#shareUrl_'+index).val());
                body.append(textarea);
                textarea[0].select();

                try {
                    var successful = $window.document.execCommand('copy');
                    if (!successful) throw successful;
                } catch (err) {
                } finally {
                    textarea.remove();
                }
            }

            $scope.hasStatus = function(status, link){
                
                switch (status) {
                    case 'active':
                        return !link.revoked && (!link.expiry || new Date(link.expiry) > new Date())
                        break;                    
                    case 'expired':
                        return new Date(link.expiry) < new Date()
                        break;
                    case 'revoked':
                        return link.revoked;
                        break;
                    default:
                        break;
                }

            }

            $scope.revokeLink = function(link){

                var operation;
                operation = genericService.delete('v2018', 'document-sharing', link._id+'/revoke');

                link.status = "revokingLink";
                return $q.when(operation)
                .then(function(response){
                    link.revoked= true;
                })
                .finally(function(){
                    link.status = '';
                })

            }
            $scope.close = function(){
                ngDialog.close();
            }

            function loadSharedLinks(){
                if($scope.sharedLinks && $scope.sharedLinks.length)
                    return;

                $scope.isLoading = true;
                var q = {
                    "sharedData.identifier"            : $scope.identifier,
                    "sharedData.restrictionField"      : $scope.restrictionField,
                    "sharedData.restrictionFieldValue" : $scope.restrictionFieldValue.toString(),
                    "sharedBy"                         : $rootScope.user.userID,
                    $or: [ { "forPdf": false }, { "forPdf": { $exists : false} }  ]
                }        
                return $q.when(genericService.query('v2018', 'document-sharing', q))
                .then(function(response){
                    if(response && response.length > 0){
                        $scope.sharedLinks = response;
                    }
                })
                .finally(function(){
                    $scope.isLoading = false;
                })
                
            }

            function get(id, count){
                count = count || 0;
                return $q.when(genericService.get('v2018', 'document-sharing',id))
                        .then(function(response){
                            return response
                        })
                        .catch(function(error){
                            if(error.status == 404 && count < 10)
                                return $timeout(function(){return get(id, count++)}, 2000);
                        })
            }


        }
    };
}]);