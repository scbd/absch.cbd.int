import app from 'app';
    ;

    app.factory("IUserNotifications", ["$http", function($http) {

        //===========================
        //
        //===========================
        function create(type, assignedTo, data) {

            var body = {
                type: type,
                assignedTo: assignedTo,
                data: data
            };

            return $http.post("/api/v2015/user-notifications", body).then(function(resp) {
                return resp.data;
            });
        }

        //===========================
        //
        //===========================
        function get(id) {
            return $http.get("/api/v2015/user-notifications/" + id, {
                ignoreLoadingBar: true
            }).then(
                function(resp) {
                    return resp.data;
                });
        }

        //===========================
        //
        //===========================
        function update(id, data) {
            return $http.put("/api/v2015/user-notifications/" + id, data).then(
                function(resp) {
                    return resp.data;
                });
        }

        //===========================
        //
        //===========================
        function deleteNotification(id) {
            return $http.delete("/api/v2015/user-notifications/" + id).then(
                function(resp) {
                    return resp.data;
                });
        }

        //===========================
        //
        //===========================
        function query(query, pageNumber, pageLength, count) {
            return $http.get("/api/v2015/user-notifications", {
                params: {
                    q: JSON.stringify(query),
                    sk: pageNumber,
                    l: pageLength,
                    c: count
                },
                cache: false,
                ignoreLoadingBar: true
            }).then(function(resp) {
                return resp.data;
            });
        }

        //===========================
        //
        //===========================
        function markAllRead(realm) {
            return $http.put("/api/v2015/user-notifications/markallread", {realm : realm}).then(
                function(resp) {
                    return;
                });
        }

        return {
            create: create,
            get: get,
            update: update,
            delete: deleteNotification,
            query: query,
            markAllRead : markAllRead
        };
    }]);


