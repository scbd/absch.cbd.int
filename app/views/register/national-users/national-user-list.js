import ng from 'angular';
import _ from 'lodash';
import require from 'require';
import app from 'app';
import 'ngDialog';
import 'services/main';
import 'views/register/directives/register-top-menu'; ;

app.controller("nationalUserListController", ['$scope', '$http', '$q', 'ngDialog', '$rootScope', 'realm', 'appConfigService',
    function($scope, $http, $q, ngDialog, $rootScope, realm, appConfigService) {
        var users;
        var roles = {};
        var contextRoles = {};
        var manageableRoles = {};
        var authenticatedUser = $rootScope.user;
        var government = authenticatedUser.government;
        var governmentPARole;

        $scope.edit                = edit;
        $scope.dropUser            = dropUser;
        $scope.canAdd              = function()  { return !_.isEmpty(manageableRoles); };
        $scope.canEdit             = function()  { return !_.isEmpty(manageableRoles); };
        $scope.canDrop             = function(u) { return u.canBeDropped; };
        $scope.search              = search;
        $scope.defaultFilter       = filter;
        $scope.isContextRole       = isContextRole;
        $scope.isNotContextRole    = function(id) { return !isContextRole(id); };
        $scope.sortKey             = sortKey;

        refresh();

        return this;

        //========================
        //
        //========================
        function refresh() {
            $scope.loading = true;

            $q.all([loadUsers(), loadRoles()]).then(function(){

                users.forEach(function(u){
                    u.canBeDropped = canDropUser(u);
                    u.showExtraRoles = true;

                    var userRoles = _.forEach(u.roles, function(rid){
                        var userRole = $scope.roles[rid];
                        if(_.includes(['AbsPublishingAuthorities', 'AbsPublishingAuthorities-dev', 'AbsPublishingAuthorities-trg'],userRole.code)){
                        // if(_.contains(['AbsNationalAuthorizedUser', 'AbsNationalAuthorizedUser-dev', 'AbsNationalAuthorizedUser-trg'],userRole.code)){
                            governmentPARole = userRole;
                        }
                        return
                    });
                });
            }).catch(function(err){
                $scope.error = err.data || err;
                $scope.error.url = ((err||{}).config||{}).url;
            }).finally(function(){
                delete $scope.loading;
            });
        }

        //========================
        //
        //========================
        function loadRoles() {

            // All Roles

            var q1 = $http.get('/api/v2013/roles', { cache:true }).then(function (res) {

                $scope.roles = roles = _.reduce(res.data, function(ret, role){
                    ret[role.roleId] = role;
                    return ret;
                }, {});

                var contextRoleCodes = _.map(realm.nationalRoles(), function(code) { return code.toLowerCase(); });

                contextRoles = _.reduce(res.data, function(ret, role) {

                    if(~contextRoleCodes.indexOf(role.code.toLowerCase()))
                        ret[role.roleId] = role;

                    return ret;
                }, {});

                return roles;
            });

            // Manageable Roles

            var query = {
                isManageable : true,
                roles : realm.nationalRoles()
            };

            var q2 = $http.get('/api/v2013/roles', { params : { q : query } }).then(function (res) {

                $scope.manageableRoles = manageableRoles = _.reduce(res.data, function(ret, role){
                    ret[role.roleId] = role;
                    return ret;
                }, {});

                return manageableRoles;
            });

            return $q.all([q1, q2]);
        }

        //========================
        //
        //========================
        function loadUsers() {

            return $http.get('/api/v2013/users/national').then(function (res) {
                $scope.users = users = res.data;
                return users;
            });
        }

        //===========================
        //
        //===========================
        function search() {

            return openDialog('views/register/national-users/search-user-dialog', {

                className : 'ngdialog-theme-default wide',
                resolve : { government : _literal(authenticatedUser.government) }

            }).then(function(dialog) {

                return dialog.closePromise.then(function (r) { return r.value; });

            }).then(function(user){

                if(!user) throw "$BREAK";

                if(!user.userID) {
                    return openDialog('views/register/national-users/edit-user-dialog', {
                        resolve : { user : _literal(user) }
                    }).then(function(dialog) {
                        return dialog.closePromise.then(function (r) { return r.value; });
                    });
                }

                return user;

            }).then(function(user){

                if(!user) throw "$BREAK";

                return edit(user);

            }).catch(function(err) {

                if(err=="$BREAK")
                    return;

                console.log("err");
            });
        }

        //===========================
        //
        //===========================
        function edit(editedUser) {

            var user = ng.fromJson(ng.toJson(editedUser||{})); // clean & clone object

            return openDialog('views/register/national-users/edit-roles-dialog', {

                className : 'ngdialog-theme-default wide',
                resolve : {
                    user : _literal(user),
                    manageableRoles : _literal(manageableRoles),
                    governmentPARole : _literal(governmentPARole),
                }

            }).then(function(dialog) {

                return dialog.closePromise.then(function (r) { return r.value; });

            }).then(function(user) {

                if(!user) throw "$BREAK";

                var rolesToGrant  = _.difference(user.roles, editedUser.roles);
                var rolesToRevoke = _.difference(editedUser.roles, user.roles);

                return openDialog('views/register/national-users/commit-dialog', {
                    className : 'ngdialog-theme-default wide',
                    resolve : {
                        user : _literal(user),
                        government : _literal(government),
                        grantRoles : _literal(rolesToGrant),
                        revokeRoles : _literal(rolesToRevoke)
                    }
                });

            }).then(function(dialog) {

                return dialog.closePromise;

            }).then(function(){

                return refresh();

            }).catch(function(err) {

                if(err=="$BREAK")
                    return;

                console.log(err.data || err);
            });
        }

        //===========================
        //
        //===========================
        function dropUser(editedUser) {

            var managedRoleIds = _.map(manageableRoles, function(role, roleId) { return parseInt(roleId); });
            var user = ng.fromJson(ng.toJson(editedUser||{})); // clean & clone object

            //Excludes managed roles;

            user.roles = _.difference(user.roles, managedRoleIds);

            var rolesToRevoke = _.difference(editedUser.roles, user.roles);

            // Excludes government, if no more national roles;

            var stillHaveNationalRoles =  _.some(user.roles, function(roleId){
                return roles[roleId] && roles[roleId].isNational;
            });

            var government = stillHaveNationalRoles ? user.government : null;

            // Show transaction

            return openDialog('views/register/national-users/commit-dialog', {
                className : 'ngdialog-theme-default wide',
                resolve : {
                    user : _literal(user),
                    government : _literal(government),
                    grantRoles : _literal([]),
                    revokeRoles : _literal(rolesToRevoke)
                }

            }).then(function(dialog) {

                return dialog.closePromise;

            }).then(function(){

                return refresh();

            }).catch(function(err) {

                if(err=="$BREAK")
                    return;

                console.log(err.data || err);
            });
        }

        //===========================
        //
        //===========================
        function canDropUser(user) {

            if(_.isEmpty(manageableRoles))
                return false;

            if(!user.government || user.government!=government)
                return false;

            if(!user.roles.length)
                return true;

            return _.some(user.roles, function(roleId){

                var role      = roles[roleId.toString()];
                var canManage = isRoleManageable(roleId);

                return canManage || !role || !role.isNational;
            });
        }

        //========================
        //
        //========================
        function sortKey(user) {
            return (hasContextRoles(user) ? "0" : "1") +
                   (user.lastName ||"").toLowerCase()+
                   (user.firstName||"").toLowerCase();
        }

        //========================
        //
        //========================
        function filter(user) {

            if($scope.searchText && $scope.searchText.$)
                return true;

            if($scope.showAll)
                return true;

            return hasContextRoles(user);
        }

        //========================
        //
        //========================
        function isRoleManageable(roleId) {
            return manageableRoles && !!manageableRoles[roleId];
        }

        //========================
        //
        //========================
        function hasContextRoles(user) {
            return _.some(user.roles, isContextRole);
        }

        //========================
        //
        //========================
        function isContextRole(roleId) {
            return contextRoles && !!contextRoles[roleId];
        }

        /////////////////////////////////////////////////////
        /////////////////////////////////////////////////////
        /////////////////////////////////////////////////////

        //===========================
        //
        //===========================
        function _literal(v) {
            return function() { return v; };
        }

        //===========================
        //
        //===========================
        function openDialog(dialog, options) {

            options = options || {};

            return $q(function(resolve, reject) {

                require(['text!'+dialog+'.html', dialog+''], function(template, controller) {

                    options.plain = true;
                    options.closeByDocument = false;
                    options.showClose = false;
                    options.template = template;
                    options.controller = controller;

                    if(!options.controllerAs) {
                        var controllerAs = dialog.lastIndexOf('/')<0 ? dialog : dialog.substr(dialog.lastIndexOf('/')+1);
                        options.controllerAs = _.camelCase(controllerAs)+'Ctrl';
                    }

                    var dialogWindow = ngDialog.open(options);

                    dialogWindow.closePromise.then(function(res){

                        if(res.value=="$escape")      delete res.value;
                        if(res.value=="$document")    delete res.value;
                        if(res.value=="$closeButton") delete res.value;

                        return res;
                    });

                    resolve(dialogWindow);

                }, reject);
            });
        }
    }]);

