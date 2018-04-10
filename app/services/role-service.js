define(['app', 'underscore', './app-config-service'], function (app, _) { 'use strict';

	app.factory('roleService',  ["$http","$location", "$rootScope", "appConfigService",
	 function($http,$location, $rootScope, appConfigService) {

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
				return this.isUserInRole(appConfigService.getRoleName(role));
			}
			
			this.isIAC = function() {
				return this.isUserInRoles(appConfigService.getRoleName('iac'));
			}

			this.isAdministrator = function() {
				return this.isUserInRoles(appConfigService.getRoleName('administrator'));
			}
			this.isAbsAdministrator = function() {
				return this.isUserInRoles(appConfigService.getRoleName('administrator'));
			}

			this.isAbsPublishingAuthority = function() {
				return this.isUserInRoles(appConfigService.getRoleName('publishingAuthorities'));
			}
			this.isAbsNationalAuthorizedUser = function() {
				return this.isUserInRole(appConfigService.getRoleName('nationalAuthorizedUser'));
			}

			this.isAbsNationalFocalPoint = function() {
				return this.isUserInRoles(appConfigService.getRoleName('nationalFocalPoint'));
			}

			this.isUser = function() {
				return this.isUserInRole(['User']);
					//appConfigService.getRoleName('User'));
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
