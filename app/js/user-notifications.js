
define(["app", "authentication"], function (app) {

    app.factory("IUserNotifications", ["authHttp", function($http) {
        return new function()
        {
            //===========================
            //
            //===========================
            this.create = function(type,assignedTo,  data) {

                var body = {
                    type    : type,
                    assignedTo : assignedTo,
                    data    : data
                };

                return $http.post("/api/v2015/user-notifications", body).then(function(resp) {
                    return resp.data;
                });
            };

            //===========================
            //
            //===========================
            this.get = function(id) {
                return $http.get("/api/v2015/user-notifications/"+id,{ignoreLoadingBar: true}).then(
                    function(resp){
                        return resp.data;
                    });
            };

            //===========================
            //
            //===========================
            this.update = function(id, data) {
                return $http.put("/api/v2015/user-notifications/"+id, data).then(
                    function(resp){
                        return resp.data;
                    });
            };

            //===========================
            //
            //===========================
            this.delete = function(id) {
                return $http.delete("/api/v2015/user-notifications/"+id).then(
                    function(resp){
                        return resp.data;
                    });
            };

            //===========================
            //
            //===========================
            this.query  = function(query, pageNumber, pageLength) {
                return $http.get("/api/v2015/user-notifications/", { params : { q : JSON.stringify(query), sk: pageNumber, l: pageLength }, cache:false,ignoreLoadingBar: true }).then(function(resp){
                    return resp.data;
                });
            };
        }();
    }]);
});
