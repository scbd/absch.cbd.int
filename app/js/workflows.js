
define(["app", "authentication"], function (app) {

	app.factory("IWorkflows", ["authHttp", function($http) {
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

				return $http.post("/api/v2013/workflows", body).then(function(resp) {
					return resp.data;
				});
			};

			//===========================
			//
			//===========================
			this.get = function(id) {
				return $http.get("/api/v2013/workflows/"+id).then(
					function(resp){
						return resp.data;
					});
			};

			//===========================
			//
			//===========================
			this.updateActivity = function(id, activityName, data) {
				return $http.put("/api/v2013/workflows/"+id+"/activities/"+activityName, data).then(
					function(resp){
						return resp.data;
					});
			};

			//===========================
			//
			//===========================
			this.cancelActivity = function(id, activityName, data) {
				return $http.delete("/api/v2013/workflows/"+id+"/activities/"+activityName, data).then(
					function(resp){
						return resp.data;
					});
			};

			//===========================
			//
			//===========================
			this.query  = function(query, count, length, skip, sort) {
				return $http.get("/api/v2013/workflows/", { params : { q : JSON.stringify(query), l:length, s:sort, sk:skip, c:count } }).then(function(resp){
					return resp.data;
				});
			};
		}();
	}]);
});
