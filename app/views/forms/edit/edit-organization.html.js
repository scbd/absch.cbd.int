define(['app', 'underscore', 'angular', '/app/views/forms/edit/edit.js', '/app/js/common.js'],
function(app, _) {


    app.controller("editOrganization", ["$scope", "$http", "$filter", "$q", "Enumerable", "$controller", "$location", 'commonjs',
        function($scope, $http, $filter, $q, Enumerable, $controller, $location, commonjs) {
            $controller('editController', {
                $scope: $scope
            });


            $scope.path = $location.path();

            _.extend($scope.options = {
				addressCountry         : function() { return $http.get("/api/v2013/thesaurus/domains/countries/terms",            { cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
				organizationTypes: function() {
                    return $q.all([$http.get("/api/v2013/thesaurus/domains/Organization%20Types/terms", {
                            cache: true
                        }), $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED", {
                            cache: true
                        })])
                        .then(function(o) {
                            var orgs = o[0].data;
                            orgs.push(o[1].data);
                            return orgs;
                        });
                }
            });


            //==================================
            //
            //==================================
            $scope.getCleanDocument = function(document) {

                document = document || $scope.document;

                if (!document)
                    return undefined;

                document = angular.fromJson(angular.toJson(document));

				document.firstName = undefined;
				document.lastName = undefined;
                if (/^\s*$/g.test(document.notes))
                    document.notes = undefined;

                return document;
            };

			$scope.setDocument({
                libraries: [{
                    identifier: "cbdLibrary:abs-ch"
                }]
            });
            //==================================
            //
            //==================================
            $scope.loadRecords = function(identifier, schema) {

                if (identifier) { //lookup single record
                    var deferred = $q.defer();

                    storage.documents.get(identifier, {
                            info: ""
                        })
                        .then(function(r) {
                            deferred.resolve(r.data);
                        }, function(e) {
                            if (e.status == 404) {
                                storage.drafts.get(identifier, {
                                        info: ""
                                    })
                                    .then(function(r) {
                                            deferred.resolve(r.data);
                                        },
                                        function(e) {
                                            deferred.reject(e);
                                        });
                            } else {
                                deferred.reject(e);
                            }
                        });
                    return deferred.promise;
                }

                //Load all record of specified schema;

                var sQuery = "type eq '" + encodeURI(schema) + "'";

                return $q.all([storage.documents.query(sQuery, null, {
                            cache: true
                        }),
                        storage.drafts.query(sQuery, null, {
                            cache: true
                        })
                    ])
                    .then(function(results) {
                        var qResult = Enumerable.from(results[0].data.Items)
                            .union(results[1].data.Items, "$.identifier");
                        return qResult.toArray();
                    });
            };
        }
    ]);
});
