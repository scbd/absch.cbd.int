define(['app', 'lodash', './app-config-service'], function (app, _) { 'use strict';

	app.factory('roleService',  ["$http","$location", "$rootScope", "realm",
	 function($http,$location, $rootScope, realm) {

		return new function(){

			this.isUserInRole = function(role) {

				if (!$rootScope.user)
					return false;

				return _.intersection($rootScope.user.roles, role).length > 0;
			};
			
			this.isUserInRoles = function(roles) {

				if (!$rootScope.user)
					return false;

				return _.intersection($rootScope.user.roles, roles).length > 0;
			};

			this.is = function(role, schema) {
				return this.isUserInRole(realm.getRole(role, schema));
			}
			
			this.isIAC = function() {
				return this.isUserInRoles(realm.getRole('iac'));
			}

			this.isAdministrator = function() {
				return this.isUserInRoles(realm.getRole('administrator'));
			}

			this.isPublishingAuthority = function(schema) {
				return this.isUserInRoles(realm.getRole('publishingAuthorities', schema));
			}
			this.isNationalAuthorizedUser = function(schema) {
				return this.isUserInRole(realm.getRole('nationalAuthorizedUser', schema));
			}

			this.isNationalFocalPoint = function() {
				return this.isUserInRoles(realm.getRole('nationalFocalPoint'));
			}

			this.isUser = function() {
				return this.isUserInRole(['User']);
			}

			// verifies if the user has roles at schema level, fallback to govt level otherwise
			this.isNationalSchemaUser = function(schema) {				
				return this.isPublishingAuthority(schema) || this.isNationalAuthorizedUser(schema) || this.isNationalFocalPoint();
			}

			// verifies if the user is in any roles object or roles overwritten at schema 
			this.isNationalUser = function(skipSchemaRoles) {
				var hasNationalRole = this.isPublishingAuthority() || this.isNationalAuthorizedUser() || this.isNationalFocalPoint();
				
				if(!skipSchemaRoles && !hasNationalRole){//check if the user has roles at schema level 
					var schemaNationalRoles = realm.nationalSchemaRoles();
					hasNationalRole = this.isUserInRoles(schemaNationalRoles)
				}
				
				return hasNationalRole;
			}
		}

    }]);
});
