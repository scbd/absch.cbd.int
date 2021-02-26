define(['app',"text!views/forms/edit/directives/edit-contact.directive.html", 'lodash', 'views/directives/workflow-arrow-buttons', 
"views/forms/view/view-contact.directive", 'services/role-service',
'components/scbd-angularjs-services/services/locale', 'views/forms/edit/editFormUtility'],
function (app, template, _) {

app.directive("editContact", [ "$http", "$filter", "$rootScope", "$location", "$q", 'IStorage', 'roleService', 'thesaurusService', 'editFormUtility', 'locale', '$controller',
function($http, $filter, $rootScope, $location, $q, storage, roleService, thesaurusService, editFormUtility, locale, $controller){

	return {
		restrict   : "E",
		template: template ,
		replace    : true,
		transclude : false,
		scope      : {
			form        : "=form",
            onPostSubmitFn   : "&onPostSubmit"
		},
		link : function($scope, $element, $attr){
            $scope.formFields = {};
            $scope.type = $attr.documentType;
            $controller('editController', {$scope: $scope});
            $scope.allowNew         = $attr.allowNew||true
            $scope.container        = $attr.container
            $scope.isDialog         = $attr.isDialog;
            $scope.isNationalUser   = roleService.isNationalUser();
            $scope.canEditGovernment = roleService.isAdministrator();
            $scope.prefilledContactType = $attr.contactType

            _.extend($scope.options, {            
                organizationTypes : function() {
                    return thesaurusService.getDomainTerms('organizationTypes', {other:true, otherType:'lstring'})
                    .then(function(types){ return _.filter(types, function(type){return type.identifier!='B3699A74-EF2E-467A-A82F-EF2149A2EFC5'}); }) 
                }
            });           
            
            //==================================
            //
            //==================================
            $scope.getCleanDocument = function(document) {

                document = document || $scope.document;

                if (!document)
                    return undefined;

                document = angular.fromJson(angular.toJson(document));

                document.source = undefined;
                if (/^\s*$/g.test(document.firstName)) document.firstName = undefined;
                if (/^\s*$/g.test(document.middleName)) document.middleName = undefined;
                if (/^\s*$/g.test(document.lastName)) document.lastName = undefined;
                if (/^\s*$/g.test(document.notes)) document.notes = undefined;

                if(($scope.formFields.websites||[]).length)
                    document.websites = _.map($scope.formFields.websites, function(url){ return { url:url } });

                if(!$scope.isNationalUser)
                    document.government = undefined;

                if(document.organizationType && document.organizationType.identifier=='B3699A74-EF2E-467A-A82F-EF2149A2EFC5')
                    document.organizationType = undefined;
                if(document.type == "organization"){
                    document.firstName = undefined; 
                    document.middleName = undefined;
                    document.lastName = undefined;
                    document.contactOrganization = undefined;
                    document.addressType = undefined;
                }
                else{
                    document.organization = undefined;
                    document.organizationType = undefined;

                    if(!document.addressType){
                        if(document.contactOrganization)
                            document.addressType = 'organization';
                        else
                            document.addressType = 'person';
                    }

                    if(document.contactOrganization && document.addressType == 'organization'){
                        document.address = undefined;
                        document.city	 = undefined;
                        document.state	 = undefined;
                        document.postalCode	 = undefined;
                        document.country	 = undefined;
                    }
                }
                return $scope.sanitizeDocument(document);
            };

        
            $scope.$watch('document.organizationType', function(newValue){
                if(newValue && newValue.identifier!='5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'){
                    if($scope.document.organizationType && $scope.document.organizationType.customValue)
                    $scope.document.organizationType.customValue = undefined;
                }
            });
    
            $scope.contactOrganizationChanged = function(newValue){
                var document = $scope.document;

                if(document.contactOrganization){
                    
                    if(!document.addressType)
                        document.addressType = 'organization'

                    if(document.addressType == 'organization'){
                        document.address	= undefined;
                        document.city		= undefined;
                        document.state		= undefined;
                        document.postalCode	= undefined;
                        document.country	= undefined;
                    }
                    $scope.loadOrganizationAddress();
                }
                else if(document.addressType == 'organization')
                    document.addressType = undefined;

            };

            $scope.setAddressType = function(){
                if(!$scope.document.addressType)
                    $scope.document.addressType = 'person';
            }
                        
            $scope.loadOrganizationAddress = function(){
                var document = $scope.document;
                if(document.contactOrganization && document.addressType == 'organization' && 
                    (!$scope.organization || document.contactOrganization.identifier!= $scope.organization.identifier)){

                    storage.documents.get(document.contactOrganization.identifier, {info:false}).then(function(org){
                        $scope.organization = org.data;
                    })
                }
            }

            $scope.newDialogAttributes = function(){
                return "contact-type='organization'";
            }

            var doc = {
                type : $scope.prefilledContactType? $scope.prefilledContactType: undefined
            }
            $scope.setDocument(doc, !$rootScope.user.government)
            .then(function(document){
                $scope.formFields.websites = []
                if((document.websites||[]).length){
                  $scope.formFields.websites = _.map(document.websites, 'url');
                }
            })
            .then($scope.loadOrganizationAddress);

        }
	};
}]);

});
