define(['app',"text!./edit-organization.directive.html", 'views/directives/workflow-arrow-buttons', 
"views/forms/view/view-organization.directive", 'services/role-service',
'components/scbd-angularjs-services/services/locale', 'views/forms/edit/editFormUtility'],
function (app, template) {

app.directive("editOrganization", [ "$http", "$filter", "$q", 'guid', 'editFormUtility', 'locale',
                function($http, $filter, $q, guid, editFormUtility, locale) {

	return {
		restrict   : "E",
		template: template ,
		replace    : true,
		transclude : false,
		scope      : {
            identifier  : '=',
			locales     : "=locales",
			form        : "=form",
            onPostPublishFn   : "&onPostPublish",
		},
		link : function($scope, $element, $attr){

            $scope.container    = $attr.container
            $scope.isDialog     = $attr.isDialog;

            $scope.options = {            
                countries         : function() { return $http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
				organizationTypes: function() {
                    return $q.all([$http.get("/api/v2013/thesaurus/domains/Organization%20Types/terms", {cache: true}), 
                                   $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED", { cache: true })])
                        .then(function(o) {
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

                if (/^\s*$/g.test(document.notes))
                    document.notes = undefined;

                return document;
            };

        
            $scope.$watch('document.organizationType', function(newValue){
                if(newValue && newValue.identifier!='5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'){
                    if(document.organizationType && document.organizationType.customValue)
                        document.organizationType.customValue = undefined;
                }
            });

            $scope.onPostPublishOrRequest = function(documentInfo){
                $scope.onPostPublishFn({ data: documentInfo });
            };
            
            function setDocument() {

                $scope.status = "loading";
        
                var qDocument = {};
                $scope.document = {};
                if($scope.identifier)
                    qDocument = editFormUtility.load($scope.identifier, 'organization');
                else {
                    qDocument = {
                        header: {
                                    identifier : guid(),
                                    schema   : "organization",
                                    languages: ["en"]
                                }
                    };        
                }                
        
                return $q.when(qDocument).then(function(doc) {
        
                    $scope.tab    = "edit";
                    $scope.document = doc;            
                    $scope.status = "ready";
        
                });
            };
            
            setDocument();

		}
	};
}]);

});
