define(['app'], function(app) {
    'use strict';

    app.factory("IWorkflows", ["$http", function($http) {

        //===========================
        //
        //===========================
        function create(type, version, data) {

            var body = {
                type: type,
                version: version,
                data: data
            };

            return $http.post("/api/v2013/workflows", body).then(function(resp) {
                return resp.data;
            });
        }

        //===========================
        //
        //===========================
        function get(id) {
            return $http.get("/api/v2013/workflows/" + id).then(
                function(resp) {
                    return resp.data;
                });
        };

        //===========================
        //
        //===========================
        function updateActivity(id, activityName, data) {
            return $http.put("/api/v2013/workflows/" + id + "/activities/" + activityName, data).then(
                function(resp) {
                    return resp.data;
                });
        }
        //===========================
        //
        //===========================
        function cancel(id, data) {
            return $http.delete("/api/v2013/workflows/" + id, {
                params: data
            }).then(
                function(resp) {
                    return resp.data;
                });
        }
        //===========================
        //
        //===========================
        function cancelActivity(id, activityName, data) {
            return $http.delete("/api/v2013/workflows/" + id + "/activities/" + activityName, data).then(
                function(resp) {
                    return resp.data;
                });
        };

        //===========================
        //
        //===========================
        function query(query, count, length, skip, sort) {
            return $http.get("/api/v2013/workflows", {
                params: {
                    q: JSON.stringify(query),
                    l: length,
                    s: sort,
                    sk: skip,
                    c: count
                }
            }).then(function(resp) {
                return resp.data;
            });
        }
        return {
            create: create,
            get: get,
            updateActivity: updateActivity,
            cancel: cancel,
            cancelActivity: cancelActivity,
            query: query,
        };
    }]);

});
