
define(['app', 'authentication'], function (app) {

	app.factory('IWorkflows', ["authHttp", "$q", function($http, $q) {
		return new function()
		{
			var self        = this;

			//===========================
			//
			//===========================
			this.create = function(type, data) {
				return $http.post("/api/v2013/workflows", { type : type, data : data }).then(
					function(resp) {
						return resp.data;
					}
				)
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
			this.activity = function(id, activityName, data) {
				return $http.put("/api/v2013/workflows/"+id+"/activities/"+activityName, data).then(
					function(resp){
						return resp.data;
					});
			};

			//===========================
			//
			//===========================
			this.cancel = function(id) {
				return $http.delete("/api/v2013/workflows/").then(
					function(resp){
						return resp.data;
					});
			};

			//===========================
			//
			//===========================
			this.query  = function(q) {
				return $http.get("/api/v2013/workflows/?q="+encodeURIComponent(JSON.stringify(q))).then(
					function(resp){
						return resp.data;
					});
			};
		}
	}])
});
