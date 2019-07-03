define(['app', 'lodash', './app-config-service'], function (app, _) { 'use strict';

	app.factory('roleService',  ["$http","$location", "$rootScope", "realm",
	 function($http,$location, $rootScope, realm) {

		return new function(){
			this.isUserInRole             = isUserInRole;
			this.isUserInRoles            = isUserInRoles;
			this.is                       = is;
			this.isIAC                    = isIAC;
			this.isAdministrator          = isAdministrator;
			this.isPublishingAuthority    = isPublishingAuthority;
			this.isNationalAuthorizedUser = isNationalAuthorizedUser;
			this.isNationalFocalPoint     = isNationalFocalPoint;
			this.isUser                   = isUser;
			this.isNationalSchemaUser     = isNationalSchemaUser;
			this.isNationalUser           = isNationalUser;
			
			function isUserInRole(role) {				
				return isUserInRoles([role]);
			};
			
			function isUserInRoles(roles) {

				if (!$rootScope.user)
					return false;

				return _.intersection($rootScope.user.roles, roles).length > 0;
			};

			function is(role, schema) {
				return isUserInRoles(realm.getRole(role, schema));
			}
			
			function isIAC() {
				return isUserInRoles(realm.getRole('iac'));
			}

			function isAdministrator() {
				return isUserInRoles(realm.getRole('administrator'));
			}

			function isPublishingAuthority(schema) {
				return isUserInRoles(realm.getRole('publishingAuthorities', schema));
			}
			
			function isNationalAuthorizedUser(schema) {
				return isUserInRoles(realm.getRole('nationalAuthorizedUser', schema));
			}

			function isNationalFocalPoint() {
				return isUserInRoles(realm.getRole('nationalFocalPoint'));
			}

			function isUser() {
				return isUserInRoles(['User']);
			}

			// verifies if the user has roles at schema level, fallback to govt level otherwise
			function isNationalSchemaUser(schema) {				
				return isPublishingAuthority(schema) || isNationalAuthorizedUser(schema) || isNationalFocalPoint();
			}

			// verifies if the user is in any roles object or roles overwritten at schema 
			function isNationalUser(skipSchemaRoles) {
				var hasNationalRole = isPublishingAuthority() || isNationalAuthorizedUser() || isNationalFocalPoint();
				
				if(!skipSchemaRoles && !hasNationalRole){//check if the user has roles at schema level 
					var schemaNationalRoles = realm.nationalSchemaRoles();
					hasNationalRole = isUserInRoles(schemaNationalRoles)
				}
				
				return hasNationalRole;
			}
		}

    }]);
});
