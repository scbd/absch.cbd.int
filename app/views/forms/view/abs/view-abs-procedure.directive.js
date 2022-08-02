 import app from '~/app';
import template from "text!./view-abs-procedure.directive.html";
import '~/views/directives/record-options';
import '~/views/forms/view/directives/view-record-reference.directive';
import viewAbsProcedureT from '~/app-text/views/forms/view/abs/view-abs-procedure.json';

			app.directive("viewAbsProcedure", ['translationService', function (translationService) {
					
				return {
					restrict   : "EAC",
					template: template ,
					replace    : true,
					transclude : false,
					scope: {
						document: "=ngModel",
						locale  : "=",
						target  : "@linkTarget",
						allowDrafts : "@",
						hide:"@"
					},
					link : function ($scope)
					{
						translationService.set('viewAbsProcedureT', viewAbsProcedureT);
						$scope.contacts = undefined;
					},
					controller : ["$scope", 'realm', "IStorage", function ($scope, realm, storage)
					{
						$scope.schema = realm.schemas.absProcedure
						//====================
						//
						//====================
						$scope.display = function(field) {
							
							if(!$scope.hide) return true; //show all fields

							return( $scope.hide.indexOf(field) >= 0 ? false : true);
						}

					}]
				};
			}]);
			
 	
