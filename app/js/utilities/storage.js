angular.module('kmStorage')
.factory('IStorage', ["authHttp", "$q", "URI", "authentication", function($http, $q, URI, authentication) {
	return new function()
	{
		var self        = this;
		var serviceUrls = { // Add Https if not .local
			documentQueryUrl   : function() { return "/api/v2013/documents/"; },
			documentUrl        : function() { return "/api/v2013/documents/:identifier"; },
			validateUrl        : function() { return "/api/v2013/documents/x/validate"; },
			draftUrl           : function() { return "/api/v2013/documents/:identifier/versions/draft"; },
			attachmentUrl      : function() { return "/api/v2013/documents/:identifier/attachments/:filename"; },
			securityUrl        : function() { return "/api/v2013/documents/:identifier/security/:operation"; }
		}

		//==================================================
		//
		// Documents
		//
		//==================================================
		this.documents = {

			//===========================
			//
			//===========================
			"query" : function(query, collection, params)
			{
				params            = clone(params||{});
				params.collection = collection;
				params["$filter"] = query;

				if (query && !collection)
					params.collection = "my";

				var useCache = !!params.cache;

				params.cache = undefined;

				var oTrans = transformPath(serviceUrls.documentQueryUrl(), params);

				return $http.get(oTrans.url, {  params : oTrans.params, cache:useCache });
			},

			//===========================
			//
			//===========================
			"get" : function(identifier, params)
			{
				params            = clone(params||{});
				params.identifier = identifier;

				var useCache = !!params.cache;

				params.cache = undefined;

				var oTrans = transformPath(serviceUrls.documentUrl(), params);

				return $http.get(oTrans.url, { params : oTrans.params, cache:useCache });
			},

			//===========================
			//
			//===========================
			"put" : function(identifier, data, params)
			{
				params            = clone(params||{});
				params.identifier = identifier;

				if (!params.schema && data && data.header && data.header.schema)
					params.schema = data.header.schema;

				var oTrans = transformPath(serviceUrls.documentUrl(), params);

				return $http.put(oTrans.url, data, { "params" : oTrans.params });
			},

			//===========================
			//
			//===========================
			"delete" : function(identifier, params)
			{
				params            = clone(params||{});
				params.identifier = identifier;

				var oTrans = transformPath(serviceUrls.documentUrl(), params);

				return $http.delete(oTrans.url, { "params" : oTrans.params });
			},

			//===========================
			//
			//===========================
			"validate" : function(document, params)
			{
				params = clone(params || {});

				if (!params.schema && document && document.header && document.header.schema)
					params.schema = document.header.schema;

				var oTrans = transformPath(serviceUrls.validateUrl(), params);

				return $http.put(oTrans.url, document, { "params" : oTrans.params });
			},

			//===========================
			//
			//===========================
			"security": {
				canCreate: function(identifier, schema, metadata) {
					return canDo("create", identifier, schema, metadata);
				},

				canUpdate: function(identifier, schema, metadata) {
					return canDo("update", identifier, schema, metadata);
				},

				canDelete: function(identifier, schema, metadata) {
					return canDo("delete", identifier, schema, metadata);
				}
			}
		}

		//==================================================
		//
		// Drafts
		//
		//==================================================
		this.drafts = {

			//===========================
			//
			//===========================
			"query" : function(query, params)
			{
				params            = clone(params||{});
				params.collection = "mydraft";
				params["$filter"] = query;

				var useCache = !!params.cache;

				params.cache = undefined;

				var oTrans = transformPath(serviceUrls.documentQueryUrl(), params);

				return $http.get(oTrans.url, {  params : oTrans.params, cache:useCache });
			},


			//===========================
			//
			//===========================
			"get" : function(identifier, params)
			{
				params            = clone(params||{});
				params.identifier = identifier;

				var oTrans = transformPath(serviceUrls.draftUrl(), params);

				return $http.get(oTrans.url, {  params : oTrans.params });
			},

			//===========================
			//
			//===========================
			"put" : function(identifier, data, params)
			{
				params            = clone(params||{});
				params.identifier = identifier;

				if (!params.schema && data && data.header && data.header.schema)
					params.schema = data.header.schema;

				var oTrans = transformPath(serviceUrls.draftUrl(), params);

				return $http.put(oTrans.url, data, { "params" : oTrans.params });
			},

			//===========================
			//
			//===========================
			"delete" : function(identifier, params)
			{
				params            = clone(params||{});
				params.identifier = identifier;

				var oTrans = transformPath(serviceUrls.draftUrl(), params);

				return $http.delete(oTrans.url, { "params" : oTrans.params });
			},

			//===========================
			//
			//===========================
			"security": {
				canCreate: function(identifier, schema, metadata) {
					return canDo("createDraft", identifier, schema, metadata);
				},

				canUpdate: function(identifier, schema, metadata) {
					return canDo("updateDraft", identifier, schema, metadata);
				},

				canDelete: function(identifier, schema, metadata) {
					return canDo("deleteDraft", identifier, schema, metadata);
				}
			}
		}

		this.attachments = {

			//===========================
			//
			// Not tested
			//
			//===========================
			"put" : function(identifier, file, params)
			{
				params            = params || {};
				params.identifier = identifier;
				params.filename   = file.name;

				var contentType = params.contentType || getMimeTypes(file.name, file.type || "application/octet-stream");

				params.contentType = undefined;

				var oTrans = transformPath(serviceUrls.attachmentUrl(), params);

				return $http.put(oTrans.url, file, { 
					"headers" : { "Content-Type": contentType },
					"params"  : oTrans.params
				}).then(
				function(success) {
					return angular.extend(success.data || {}, { "url": oTrans.url });
				},
				function(error) {
					error.data = angular.extend(error.data || {}, { "url": oTrans.url });
					throw error;
				});
			},

			"getMimeType": function(file)
			{
				return getMimeTypes(file.name, file.type || "application/octet-stream");
			}
		}

		//==================================================
		//
		//
		//==================================================
		var getMimeTypes = function(filename, defaultMimeType) {
			var sMimeType = defaultMimeType || "application/octet-stream";

			if (filename && sMimeType == "application/octet-stream")
			{
				var sExt   = "";
				var iIndex = filename.lastIndexOf(".");

				if (iIndex >= 0)
					sExt = filename.substring(iIndex).toLowerCase();

				if (sExt == ".json")    sMimeType = "application/json";
				if (sExt == ".geojson") sMimeType = "application/json";
				if (sExt == ".xml")     sMimeType = "application/xml";
			}

			return sMimeType;
		}

		//==================================================
		//
		//
		//==================================================
		var clone = function(obj) {

			if (obj === null)
				return null;

			if (obj === undefined)
				return undefined;

			return angular.fromJson(angular.toJson(obj));
		}

		//===========================
		//
		// Replace :xyz in path with value in params
		// query part will be done by $http
		//
		//===========================
		var transformPath = function(url, params)
		{
			var oRegex     = /\:\w+/g;
			var oMatch     = null;
			var qMatches   = []
			var oNewParams = {};

			while ((oMatch = oRegex.exec(url)) != null) {
				oMatch.key   = oMatch[0].substring(1);
				oMatch.value = oMatch[0];
				qMatches.splice(0, 0, oMatch);
			}

			for(key in params||{}) {
				var bExist = false;

				for(i in qMatches) {
					if (qMatches[i].key != key)
						continue;

					bExist = true;
					qMatches[i].value = params[key].toString();
				}

				if(!bExist)
					oNewParams[key] = params[key];
			}

			for (i in qMatches) {
				url = replaceAt(url, qMatches[i].index, qMatches[i][0].length, encodeURIComponent(qMatches[i].value))
			}

			return { "url" : url, "params" : oNewParams }
		}

		//===========================
		//
		// Calls storage security
		//
		//===========================
		var canDo = function(operation, identifier, schema, metadata) {
			metadata = angular.extend(metadata || {}, { 'schema': schema });

			if (!metadata.government && authentication.user().government)
				metadata = angular.extend(metadata, { 'government': authentication.user().government });

			var params = {
				"identifier" : identifier,
				"operation"  : operation,
				"metadata"   : metadata
			};

			var oTrans = transformPath(serviceUrls.securityUrl(), params);

			return $http.get(oTrans.url, { "params": oTrans.params, cache: true }).then(
				function(res) {
					return res.data.isAllowed;
				});
		}

		//===========================
		//
		// Replace :xyz in path with value in params
		// query part will be done by $http
		//
		//===========================
		var replaceAt = function(str, index, len, newText) {
			return str.substring(0, index) + newText + str.substring(index+len);
		}

		return this;
	}();
}])
