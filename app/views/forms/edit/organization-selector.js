define(['app', 'lodash', "text!./organization-selector.html", 'js/common', 'components/scbd-angularjs-services/services/main', 'components/scbd-angularjs-controls/form-control-directives/all-controls',
'views/forms/view/directives/view-record-reference.directive', 'ngDialog',
'services/search-service','ngInfiniteScroll'
],
function(app, _, template) {
    
    app.directive("organizationSelector", [function() {

        return {
            restrict: "EA",
            template: template ,
            replace: true,
            transclude: false,
            scope: {
                model: "=ngModel",
                locales: "=locales",
                caption: "@caption",
                subFilter : "=?",
				disabled  : '=ngDisabled'
            },
            link: function($scope, $element, $attrs) {

                $scope.multiple = $attrs.multiple !== undefined;

            },
            controller: ["$scope", "$http", "$q", 'ngDialog', 'appConfigService', '$compile',
                function($scope, $http, $q, ngDialog, appConfigService, $compile) {

                    var workingOrganizations = null;
                    var currentPage = -1;
                    var queryCanceler;
                    $scope.recordCount = 0;
                    $scope.loadingDocuments = false;
                    $scope.search = {};
                    
                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.$watch("model", function() {
                        workingOrganizations = null;
                    });

                    $scope.showOrganizations = function(index) {                   
                        $scope.loadExisting();
                        $scope.showExisting=true;
                        $scope.errorMessage = undefined;
                        ngDialog.open({
                            template: 'organizationModal',
                            closeByDocument: false,
                            scope: $scope
                        });
                    }
                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.getOrganizations = function() {

                        if (workingOrganizations === null || workingOrganizations === undefined) {
                            if (_.isArray($scope.model)) workingOrganizations = _.clone($scope.model);
                            else if (_.isObject($scope.model)) workingOrganizations = [$scope.model];
                            else workingOrganizations = [];
                        }

                        return workingOrganizations;
                    };


                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.deleteOrganization = function(index) {

                        var contacts = $scope.getOrganizations();

                        var indexNo = index;
                        if (index < 0 || index >= contacts.length)
                            return;

                        if (confirm("Are you you want to remove this contact from the list?")) {
                            contacts.splice(index, 1);
                            if ($scope.multiple)
                                $scope.model = contacts;
                            else
                                $scope.model = undefined;

                        }
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.closeOrganization = function() {

                        closeDialog();
                        workingOrganizations = undefined;
                        //clear the dropdown list display text which remains after the dialog is closed.
                        $scope.$broadcast('clearSelectSelection');
                    };


                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.loadExisting = function() {

                        if($scope.loadingDocuments || $scope.existingOrganizations && $scope.recordCount == $scope.existingOrganizations.length)
                            return;

                        $scope.loadingDocuments = true;
                        currentPage += 1;
                        $scope.searchOrganizations();
                    };
                    $scope.$watch('search.keyword', function(newVal) {
                        if(newVal !=undefined){
                            $scope.searchOrganizations(true);
                        }
                    })
                    $scope.searchOrganizations = function(clear) {
                        
                        if (queryCanceler) {
                            console.log('trying to abort pending request...');
                            queryCanceler.resolve(true);
                        }
                        var fields = 'identifier_s, _state_s,revision:_revision_i, name:title_s, acronym:acronym_s, organizationType_s,' +
                                         'address_EN_t, city_EN_t, state_EN_t, postalCode_EN_t, country_s, phones:phones_ss, faxes:faxes_ss, emails:emails_ss, websites:websites_ss'
                            
                        var q = 'realm_ss:' + appConfigService.currentRealm.toLowerCase() + ' AND ';
                        if($scope.search.keyword){
                            var qFields = ['text_EN_txt', 'title_s', 'acronym_s', 'organizationType_EN_s', 'address_s', 'state_s', 'postalCode_s', 'country_EN_s', 'emails_ss']
                            q += '(' + qFields.join(':"*' + $scope.search.keyword + '*" OR ') + ':" *' 
                                     + $scope.search.keyword + '*") AND ';
                            if(clear){
                                currentPage = -1;
                                $scope.recordCount = 0;
                                $scope.loadingDocuments = false;
                            }
                        }
                        if(currentPage===-1)
                            currentPage=0;
                            
                        var queryListParameters = {
                            'q'     : q + 'schema_s:organization',
                            'sort'  : 'updatedDate_dt desc',
                            'fl'    : fields,
                            'wt'    : 'json',
                            'start' : currentPage * 25,
                            'rows'  : 25,
                        };

                        queryCanceler = $q.defer();
                        $q.when($http.get('/api/v2013/index/select', {  params: queryListParameters, timeout: queryCanceler}))
                          .then(function (data) {
                            queryCanceler = null;
                            if(!$scope.existingOrganizations || currentPage == 0){
                                var docs = data.data.response.docs;
                                    _.forEach(docs, function(record){
                                    formatOrganization(record);
                                });
                                $scope.existingOrganizations = docs;
                                $scope.recordCount = data.data.response.numFound;
                                
                            }
                            else {
                                _.forEach(data.data.response.docs, function(record){
                                    $scope.existingOrganizations.push(formatOrganization(record));
                                });
                            }
                        }).catch(function(error) {
                            console.log('ERROR: ' + error);
                        })
                        .finally(function(){
                            $scope.loadingDocuments = false;
                        });
                    }

                    $scope.selectOrganization = function(contact) {
                        if ($scope.multiple) {
                            var contacts = _.clone($scope.getOrganizations());
                            contacts.push({
                                identifier: contact.header.identifier + '@' + (contact.revision||'1')
                            });
                            $scope.model = contacts;
                        } else {
                            $scope.model = {identifier:contact.header.identifier + '@' + (contact.revision||'1')};
                        }
                        closeDialog()
                        workingOrganizations = undefined;
                        //clear the dropdown list display text which remains after the dialog is closed.
                        $scope.$broadcast('clearSelectSelection');

                    }

                    $scope.isSelected = function(contact) {

                        if (!workingOrganizations || workingOrganizations.length == 0)
                            return true;

                        return !_.some(workingOrganizations, function(cont) {
                            return contact.header.identifier == removeRevisonNumber(cont.identifier);
                        });
                    }

        			function removeRevisonNumber(identifier){
                        if(identifier)
        				    return identifier.substr(0, identifier.indexOf('@'))
        			}
                    //////////////////////////////
                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.editOrganization = function(index) {

                    	require(['views/forms/edit/directives/edit-organization.directive'], function(){
                    
                            var directiveHtml = "<DIRECTIVE on-post-publish='onNewOrganizationPublish(data)' is-dialog='true' container='.ngdialog' link-target={{linkTarget}} locales='locales'></DIRECTIVE>"
                                    .replace(/DIRECTIVE/g, 'edit-organization');
                            $scope.$apply(function () {
                                $('#divEditOrganization').empty().append($compile(directiveHtml)($scope));
                            });
                        })
                    };

                    $scope.onNewOrganizationPublish = function(res){                               
                        $scope.selectOrganization({header : {identifier:res.data.identifier}});
                    }
                    
                    function closeDialog() {
                        ngDialog.close();
                        $scope.errorMessage = undefined;
                        currentPage = -1;
                        queryCanceler = null;
                        $scope.recordCount = 0;
                        $scope.loadingDocuments = false;
                        $scope.search = {};
                    };

                    function formatOrganization(organization){

                        organization.header = {
                            identifier :  organization.identifier_s
                        }
                        if(organization.organizationType_s)
                            organization.organizationType = {
                                identifier :  organization.organizationType_s
                            }
                        if(organization.country_s) 
                            organization.country = {
                                identifier :  organization.country_s
                            }

                        if(organization.address_EN_t)
                            organization.address = { en : organization.address_EN_t }  
                        if(organization.city_EN_t)
                             organization.city = { en : organization.city_EN_t }   
                        if(organization.state_EN_t)
                             organization.state = { en : organization.state_EN_t }   
                        if(organization.postalCode_EN_t)
                             organization.postalCode = { en : organization.postalCode_EN_t }

                        return organization;  
                    }
                }
            ]
        };
    }]);

});
