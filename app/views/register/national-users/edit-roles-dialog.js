import _ from 'lodash';

    export { default as template } from './edit-roles-dialog.html';
export default ['$scope', 'user', 'manageableRoles', 'governmentPARole', function ($scope, user, manageableRoles, governmentPARole) {

        var _ctrl = this;

        _ctrl.user = user;
        _ctrl.roles = manageableRoles;
        _ctrl.selectedRoles = {};

        (user.roles||[]).forEach(function(roleId) {
            _ctrl.selectedRoles[roleId] = true;
        });

        _ctrl.save = function() {

            var user  = _ctrl.user;
            var roles = [];

            for(var roleId in _ctrl.selectedRoles) {
                if(_ctrl.selectedRoles[roleId])
                    roles.push(parseInt(roleId));
            }

            user.roles = roles;

            $scope.closeThisDialog(user);
        };

        _ctrl.rowClasses = function(role) {

            var status = roleStatus(role);

            return {
                success : status.grant,
                danger  : status.revoke,
                info    : !status.grant && !status.revoke && _ctrl.selectedRoles[role.roleId]  // granted - unchanged
            };
        };

        _ctrl.stats = function() {

            var stats = {
                grant : 0,
                revoke : 0,
                changes : 0
            };

            for(var key in _ctrl.roles) {

                var status = roleStatus(_ctrl.roles[key]);

                if(status.grant)  { stats.grant++;  stats.changes++; }
                if(status.revoke) { stats.revoke++; stats.changes++; }
            }

            return stats;
        };

        _ctrl.roleFilter = function(role) {
            if(_ctrl.selectedRoles[role.roleId] || !governmentPARole || role.roleId!= governmentPARole.roleId)
                    return true;

            return false;
        }
        _ctrl.updateGovernmentPA = function(role) {
            if(_.includes(['AbsPublishingAuthorities', 'AbsPublishingAuthorities-dev', 'AbsPublishingAuthorities-trg'],userRole.code)){
            // if(_.contains(['AbsNationalAuthorizedUser', 'AbsNationalAuthorizedUser-dev', 'AbsNationalAuthorizedUser-trg'],role.code)){
                if(_ctrl.selectedRoles[role.roleId])
                    governmentPARole = role;
                else {
                    governmentPARole = null;
                }
            }
        }


        function roleStatus(role) {
            return {
                grant  :  _ctrl.selectedRoles[role.roleId] &&  !~_ctrl.user.roles.indexOf(role.roleId), // grant
                revoke : !_ctrl.selectedRoles[role.roleId] &&   ~_ctrl.user.roles.indexOf(role.roleId), // remove
            };
        }

	}];

