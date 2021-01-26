define(['app', 'lodash', "text!views/forms/view/abs/view-abs-national-report.directive.html", 
'views/directives/record-options',
], function (app, _, template) {

app.directive("viewAbsNationalReport", [function () {
	return {
		restrict   : "EAC",
		template: template ,
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			hide	: "@"
		},
		controller : ["$scope", "underscore", "commonjs", "$filter", function ($scope, _, commonjs, $filter)
		{
			
			
			
			//====================
			//
			//====================
			$scope.display = function(field) {

				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}


			//==================================
		    //
		    //==================================
		    $scope.booleanToText = function(item) {
		        if (item===undefined)
		        	return "No selection made";
				return item ? "Yes" :  "No";
			}


			//==================================
		    //
		    //==================================
		    $scope.q18BooleanToText = function(item) {
		        if (item===undefined || !item)
		        	return "No selection made";
				else return "Yes" ;
			}


			//==================================
		    //
		    //==================================
		    $scope.q42BooleanToText = function(item) {
		        if (item===undefined || !item)
		        	return "No selection made";
				else return "Yes" ;
			}

			//==================================
		    //
		    //==================================
		    $scope.conditionalBooleanToText = function(condition, item) {
		    	if(condition)
		    		return "Not applicable";
		    	if(!condition)
		    	{
		    		if (item===undefined)
		        		return "No selection made";
		        
					return item ? "Yes" :  "No";
				}
		    }


			//==================================
		    //
		    //==================================
		    $scope.text = function(input) {
		        if (input===undefined)
		        	return "No information provided";
		        
				return input;
			}


			//==================================
		    //
		    //==================================
		    $scope.getLink = function(reference) {

		    	if(!reference)
		    		return;
				var UID;
		        if ((reference.identifier).indexOf("52000000cbd") == 0) {
					reference.id = reference.identifier;
					reference.schema = 'focalPoint';
					reference.government = $scope.document.government;
					UID = $filter("uniqueID")(reference);	        	
		        }
				else
					UID = $filter("uniqueIDWithoutRevision")(reference.identifier);

				var revsionNumber = '';
		        if(reference.identifier.indexOf('@')>=0)
				    revsionNumber = reference.identifier.substr(reference.identifier.indexOf('@')+1, reference.identifier.length - (reference.identifier.indexOf('@')+1));
				
				if(!UID || typeof UID != 'string')
					return;

				var schema = UID.split('-')[1];

				return  "/database/" + schema + '/' + UID + (revsionNumber ? ('/' + revsionNumber) : '');
			}

			//==================================
		    //
		    //==================================
		    $scope.getLinkText = function(reference) {

		    	if(!reference)
		    		return;

		        if ((reference.identifier).indexOf("52000000cbd") == 0) {
					reference.id = reference.identifier;	
					reference.schema = 'focalPoint';
					reference.government = $scope.document.government;
		        }
		        
				return  $filter("uniqueID")(reference.id ? reference : reference.identifier);
			}


			//==================================
		    //
		    //==================================
		    $scope.documentReferenceIDsEmpty = function(reference) {

		    	return _.isEmpty(reference);
			}


		}]
	};
}]);

});
