
define(["app", "authentication"], function (app) {

    app.factory("INotifications", ["authHttp", function($http) {
        return new function()
        {
            //===========================
            //
            //===========================
            this.create = function(type, version, data) {

                var body = {
                    type    : type,
                    version : version,
                    data    : data
                };

                return $http.post("/api/v2015/usernotifications", body).then(function(resp) {
                    return resp.data;
                });
            };

            //===========================
            //
            //===========================
            this.get = function(id) {
                return $http.get("/api/v2015/usernotifications/"+id).then(
                    function(resp){
                        return resp.data;
                    });
            };

            //===========================
            //
            //===========================
            this.update = function(id, data) {
                return $http.put("/api/v2015/usernotifications/"+id, data).then(
                    function(resp){
                        return resp.data;
                    });
            };

            //===========================
            //
            //===========================
            this.delete = function(id) {
                return $http.delete("/api/v2015/usernotifications/"+id).then(
                    function(resp){
                        return resp.data;
                    });
            };

            //===========================
            //
            //===========================
            this.query  = function(query, pageNumber, pageLength) {
                return $http.get("/api/v2015/usernotifications/", { params : { q : JSON.stringify(query), sk: pageNumber, l: pageLength }, cache:false }).then(function(resp){
                    return resp.data;
                });
            };
        }();
    }]);
});
