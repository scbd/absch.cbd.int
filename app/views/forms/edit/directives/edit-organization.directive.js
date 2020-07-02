define(['app',"text!./edit-organization.directive.html", 'lodash', 'views/directives/workflow-arrow-buttons', 
"views/forms/view/view-organization.directive", 'services/role-service',
'components/scbd-angularjs-services/services/locale', 'views/forms/edit/editFormUtility'],
function (app, template, _) {

app.directive("editOrganization", [ "$controller",  "$filter", "$q", 'guid', 'editFormUtility', 'locale', 'thesaurusService', 'realm',
                function($controller, $filter, $q, guid, editFormUtility, locale, thesaurusService, realm) {

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
            $scope.areasOfWork  = [{}];
            $scope.container    = $attr.container;
            $scope.isDialog     = $attr.isDialog;  
            $scope.type 		= $attr.documentType;
            $scope.isBch        = realm.is('BCH');
            $scope.isAbs        = realm.is('ABS');
            $controller('editController', { $scope: $scope });

            _.extend($scope.options, {            
                organizationTypes: function() { return thesaurusService.getDomainTerms('organizationTypes', {other:true})
                    .then(function(types){ return _.filter(types, function(type){return type.identifier!='B3699A74-EF2E-467A-A82F-EF2149A2EFC5'}); }) },
                cpbThematicAreas   : function() { return thesaurusService.getDomainTerms('cbdSubjects') },
                geographicRegions  : function() { return thesaurusService.getDomainTerms('regions', {other:true}) }
            });           
            
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

                if(!_.isEmpty($scope.areasOfWork))
                    document.areasOfWork = _($scope.areasOfWork).pluck('value').compact().value();
                if(_.isEmpty(document.areasOfWork))
                    document.areasOfWork = undefined;
                    
                if(document.organizationType && document.organizationType.identifier=='B3699A74-EF2E-467A-A82F-EF2149A2EFC5')
                    document.organizationType = undefined;

                return $scope.sanitizeDocument(document);
            };

        
            $scope.$watch('document.organizationType', function(newValue){
                if(newValue && newValue.identifier!='5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'){
                    if(document.organizationType && document.organizationType.customValue)
                        document.organizationType.customValue = undefined;
                }
            });

            $scope.addItem = function(type){
                type.push({})
            }
            $scope.removeItem = function(type, $index){
                if(type.length>1)
                    type.splice($index, 1)
            }
            
            $q.when($scope.setDocument({}, true))
            .then(function(doc){
                if(doc.areasOfWork)
                    $scope.areasOfWork = _.map(doc.areasOfWork, function(t){return { value: t}});                
            });
            $scope.setDocument({}, true)

		}
	};
}]);

});
