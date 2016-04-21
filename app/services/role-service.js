define(['app', 'underscore', './app-config-service.js'], function (app, _) { 'use strict';

	app.factory('roleService',  ["$http","$location", "$rootScope", "appConfigService",
	 function($http,$location, $rootScope, appConfigService) {

		return new function(){

			this.isUserInRole = function(role) {

				if (!$rootScope.user)
					return false;

				return _.contains($rootScope.user.roles, role);
			};

			this.isIAC = function() {
				return this.isUserInRole(appConfigService.getRoleName('abschiac'));
			}

			this.isAdministrator = function() {
				return this.isUserInRole(appConfigService.getRoleName('Administrator'));
			}
			this.isAbsAdministrator = function() {
				return this.isUserInRole(appConfigService.getRoleName('AbsAdministrator'));
			}

			this.isAbsPublishingAuthority = function() {
				return this.isUserInRole(appConfigService.getRoleName('AbsPublishingAuthorities'));
			}
			this.isAbsNationalAuthorizedUser = function() {
				return this.isUserInRole(appConfigService.getRoleName('AbsNationalAuthorizedUser'));
			}

			this.isAbsNationalFocalPoint = function() {
				return this.isUserInRole(appConfigService.getRoleName('AbsNationalFocalPoint'));
			}

			this.isUser = function() {
				return this.isUserInRole(appConfigService.getRoleName('User'));
			}

			this.isAnyOtherRoleThenIAC = function() {

				return this.isAbsPublishingAuthority() ||
					this.isAbsNationalAuthorizedUser() ||
					this.isAbsNationalFocalPoint() ||
					this.isAbsAdministrator() ||
					this.isAdministrator()

			}
			this.hasAbsRoles = function() {
				return this.isAbsAdministrator() || this.isAnyOtherRoleThenIAC();
			}
		}

    }]);
});
