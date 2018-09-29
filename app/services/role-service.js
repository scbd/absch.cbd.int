define(['app', 'underscore', './app-config-service'], function (app, _) { 'use strict';

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

			this.is = function(role) {
				return this.isUserInRole(realm.getRole(role));
			}
			
			this.isIAC = function() {
				return this.isUserInRoles(realm.getRole('iac'));
			}

			this.isAdministrator = function() {
				return this.isUserInRoles(realm.getRole('administrator'));
			}
			this.isAbsAdministrator = function() {
				return this.isUserInRoles(realm.getRole('administrator'));
			}

			this.isAbsPublishingAuthority = function() {
				return this.isUserInRoles(realm.getRole('publishingAuthorities'));
			}
			this.isAbsNationalAuthorizedUser = function() {
				return this.isUserInRole(realm.getRole('nationalAuthorizedUser'));
			}

			this.isAbsNationalFocalPoint = function() {
				return this.isUserInRoles(realm.getRole('nationalFocalPoint'));
			}

			this.isUser = function() {
				return this.isUserInRole(['User']);
					//realm.getRole('User'));
			}

			this.isAnyOtherRoleThanIAC = function() {

				return this.isAbsPublishingAuthority() ||
					this.isAbsNationalAuthorizedUser() ||
					this.isAbsNationalFocalPoint() ||
					this.isAbsAdministrator() ||
					this.isAdministrator()

			}
			this.hasAbsRoles = function() {
				return this.isAbsAdministrator() || this.isAnyOtherRoleThanIAC() || this.isIAC();
			}
		}

    }]);
});
