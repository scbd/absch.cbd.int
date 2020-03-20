define(['app',"text!./edit-contact.directive.html", 'views/directives/workflow-arrow-buttons', 
"views/forms/view/view-contact.directive", 'services/role-service',
'components/scbd-angularjs-services/services/locale', 'views/forms/edit/editFormUtility'],
function (app, template) {

app.directive("editContact", [ "$http", "$filter", "$rootScope", "$location", "$q", 'IStorage', 'roleService', 'guid', 'editFormUtility', 'locale', '$controller',
function($http, $filter, $rootScope, $location, $q, storage, roleService, guid, editFormUtility, locale, $controller){

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

            $scope.options = {            
                countries		: function() {
                    return $http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }).then(function(o){
                      var countries = $filter("orderBy")(o.data, "name");
                      _.each(countries, function(element) {
                        element.__value = element.name;
                      });
                      return countries;
                    });
                },
                organizationTypes : function() {
                    return $q.all([$http.get("/api/v2013/thesaurus/domains/Organization%20Types/terms", { cache: true })
                            ,$http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })])
                    .then(function(o){
                        var orgs = o[0].data;
                        orgs.push(o[1].data);
                        return orgs;
                    });
                }
            };           
            
            $scope.genericFilter = function($query, items) {
                var matchedOptions = [];
                for(var i=0; i!=items.length; ++i)
                if(items[i].__value.toLowerCase().indexOf($query.toLowerCase()) !== -1)
                    matchedOptions.push(items[i]);
        
                return matchedOptions;
            };
        
            $scope.genericMapping = function(item) {
                return {identifier: item.identifier};
            };
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
                return document;
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
