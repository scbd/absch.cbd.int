define(['app'], function(app) {
    ;

    app.factory("IGenericService", ["$http", function($http) {

        //===========================
        //
        //===========================
        function create(version, schema, data) {

            // var body = {
            //     data: data
            // };

            return $http.post("/api/"+version+"/"+schema, data)
                        .then(function(resp) {
                            return resp.data;
                        });
        }

        //===========================
        //
        //===========================
        function get(version, schema, id) {
            return $http.get("/api/"+version+"/"+schema+"/" + id, {
                ignoreLoadingBar: true
            }).then(
                function(resp) {
                    return resp.data;
                });
        }

        //===========================
        //
        //===========================
        function update(version, schema, id, data) {
            return $http.put("/api/"+version+"/"+schema+"/" + id, data).then(
                function(resp) {
                    return resp.data;
                });
        }

        //===========================
        //
        //===========================
        function deleteRecord(version, schema, id) {
            return $http.delete("/api/"+version+"/"+schema+"/" + id).then(
                function(resp) {
                    return resp.data;
                });
        }

        //===========================
        //
        //===========================
        function query(version, schema, query, pageNumber, pageLength, sort, count) {
            var q;
            if(query)
                q = JSON.stringify(query);

            return $http.get("/api/"+version+"/"+schema, {
                params: {
                    q: q,
                    sk: pageNumber,
                    l: pageLength,
                    c: count,
                    s:sort
                },
                cache: false,
                ignoreLoadingBar: true
            }).then(function(resp) {
                return resp.data;
            });
        }
        return {
            create: create,
            get: get,
            update: update,
            delete: deleteRecord,
            query: query,
        };
    }]);

});
