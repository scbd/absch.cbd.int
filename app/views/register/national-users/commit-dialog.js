import _ from 'lodash';

    export { default as template } from './commit-dialog.html';
    export default  ['$scope', '$http', '$q', 'user',       'government',     'grantRoles',   'revokeRoles',
    function ($scope,   $http,   $q,   targetUser,   targetGovernment, rolesToGrant,   rolesToRevoke) {

        var _ctrl = this;

        _ctrl.save  = commit;
        _ctrl.user  = targetUser;

        init().then(function(transactions){
            _ctrl.transactions = transactions;
        }).catch(function(err){
            _ctrl.error = err.data || err;
            _ctrl.error.url = ((err||{}).config||{}).url;
        });

        //========================
        //
        //========================
        function init() {

            var gov_code = (targetUser.government || targetGovernment);

            var qRoles   = $http.get('/api/v2013/roles', { cache:true }).then(res_data);
            var qCountry = $http.get('/api/v2013/countries/'+gov_code.toUpperCase(), { cache:true }).then(res_data);

            return $q.all([qRoles, qCountry]).then(function(res){

                var roles = res[0];
                var country = res[1];
                var transactions = [];

                if(!targetUser.userID) {
                    transactions.push({
                        type : "createUser",
                        user : targetUser,
                        action : action_createUser
                    });
                }

                if(!targetUser.government && targetGovernment) {
                    transactions.push({
                        type : "addGovernment",
                        government : targetGovernment,
                        governmentName : country.name,
                        action : action_setUserGovernment
                    });
                }

                rolesToGrant.forEach(function(roleId) {
                    transactions.push({
                        type : "grantRole",
                        roleId : roleId,
                        role : _.find(roles, {roleId : roleId}),
                        action : action_grantRole,
                    });
                });

                rolesToRevoke.forEach(function(roleId) {
                    transactions.push({
                        type : "revokeRoles",
                        roleId : roleId,
                        role : _.find(roles, {roleId : roleId}),
                        action : action_revokeRole,
                    });
                });

                if(targetUser.government && !targetGovernment) { // must be executed at the end. otherwise we will not be able to revoke roles
                    transactions.push({
                        type : "deleteGovernment",
                        government : null,
                        governmentName : country.name,
                        action : action_setUserGovernment
                    });
                }

                return transactions;
            });
        }

        //========================
        //
        //========================
        function commit() {

            delete _ctrl.error;
            _ctrl.loading = true;

            var promise = _(_ctrl.transactions).reduce(function(promise, tran){

                if(tran.success)
                    return promise;

                delete tran.error;

                return promise.then(function(user){

                    tran.loading = true;

                    return $q.when(tran.action(tran, user)).catch(function(err){

                        delete tran.loading;
                        tran.error = err;

                        throw "$BREAK";
                    });

                }).then(function(user){

                    delete tran.loading;
                    tran.success = true;

                    _ctrl.user = user; //update user

                    return user;
                });

            }, $q.when(_ctrl.user));


            return promise.then(function(){

                return $scope.closeThisDialog();

            }).catch(function(err){

                if(err=="$BREAK")
                    return;

                _ctrl.error = err;

                console.log(err);

            }).finally(function(){

                delete _ctrl.loading;
            });
        }

        //========================
        //
        //========================
        function action_createUser(tran, user) {

            return $http.post('/api/v2013/users/national', user).then(function(res){

                return res.data;

            }).catch(function(err){

                throw err.data || err;

            });
        }

        //========================
        //
        //========================
        function action_setUserGovernment(tran, user) {

            var patchData = {
                userID : user.userID,
                government : tran.government
            };

            return $http.patch('/api/v2013/users/national', patchData).then(function(res){

                return res.data;

            }).catch(function(err){

                throw err.data || err;

            });
        }

        //========================
        //
        //========================
        function action_grantRole(tran, user) {

            return $http.put('/api/v2013/users/'+user.userID+'/roles/'+tran.roleId, {}).then(function(){

                return user;

            }).catch(function(err){

                throw err.data || err;

            });
        }

        //========================
        //
        //========================
        function action_revokeRole(tran, user) {

            return $http.delete('/api/v2013/users/'+user.userID+'/roles/'+tran.roleId).then(function(){

                return user;

            }).catch(function(err){

                throw err.data || err;

            });
        }

        //========================
        //========================
        //========================
        function res_data(res) { return res.data; }

	}];

