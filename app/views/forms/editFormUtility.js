
require('app').factory('editFormUtility', ["IStorage", "IWorkflows", "$q", function(storage, workflows, $q) {
	
	var _self = {

		//==================================
		//
		//==================================
		load: function(identifier, expectedSchema) {

			return storage.drafts.get(identifier, { info: "" }).then(
				function(success) {
					return success;
				},
				function(error) {
					if (error.status == 404)
						return storage.documents.get(identifier, { info: "" });
					throw error;
				}).then(
				function(success) {
					var info = success.data;

					if (expectedSchema && info.type!=expectedSchema)
						throw { data: { error: "Invalid schema type" }, status:"badSchema"}

					var hasDraft = !!info.workingDocumentCreatedOn;
					var securityPromise = hasDraft
						? storage.drafts.security.canUpdate(info.identifier, info.type)
						: storage.drafts.security.canCreate(info.identifier, info.type);

					return securityPromise.then(
						function(isAllowed) {
							if (!isAllowed)
								throw { data: { error: "Not allowed" }, status: "notAuthorized" };

							var documentPromise = hasDraft
								? storage.drafts.get(identifier)
								: storage.documents.get(identifier);

							return documentPromise.then(
								function(success) {
									return success.data;
								});
						});
				});
		},

		//==================================
		//
		//==================================
		draftExists: function(identifier) {
			return storage.drafts.get(identifier, { info: "" }).then(
				function(success) {
					return true;
				},
				function(error) {
					if (error.status == 404)
						return false
					throw error;
				});
		},

		//==================================
		//
		//==================================
		saveDraft: function(document) {
			return _self.draftExists(document.header.identifier).then(
				function(hasDraft) {

					metadata = {};

					if (document.government)
						metadata.government = document.government.identifier;

					var securityPromise = hasDraft
						? storage.drafts.security.canUpdate(document.header.identifier, document.header.schema, metadata)
						: storage.drafts.security.canCreate(document.header.identifier, document.header.schema, metadata);

					return securityPromise.then(
						function(isAllowed) {
							if (!isAllowed)
								throw { error: "Not authorized to save draft" };

							return storage.drafts.put(document.header.identifier, document);
						});
				});
		},

		//==================================
		//
		//==================================
		documentExists: function(identifier) {
			return storage.documents.get(identifier, { info: "" }).then(
				function(success) {
					return true;
				},
				function(error) {
					if (error.status == 404)
						return false
					throw error;
				});
		},

		//==================================
		//
		//==================================
		publish: function(document) {

			var identifier = document.header.identifier;
			var schema     = document.header.schema;
			var metadata   = {};

			if (document.government)
				metadata.government = document.government.identifier;

			// Check if doc & draft exists

			var pDocExists   = _self.documentExists(document.header.identifier);
			var pDraftExists = _self.draftExists   (document.header.identifier);

			return $q.all([pDocExists, pDraftExists]).then(function(result) {

				return {
					existsDocument : result[0],
					existsDraft : result[1]
				};

			}).then(function(exists) {

				// Check if user security on doc & drafts

				var pDocSecurity = exists.existsDocument
						? storage.documents.security.canUpdate(identifier, schema, metadata)
						: storage.documents.security.canCreate(identifier, schema, metadata);

				var pDraftSecurity = exists.existsDraft
						? storage.drafts.security.canUpdate(identifier, schema, metadata)
						: storage.drafts.security.canCreate(identifier, schema, metadata);

				return $q.all([pDocSecurity, pDraftSecurity]).then(
					function(result) {
						return { 
							canWriteDocument : result[0],
							canWriteDraft : result[1]
						};
					});

			}).then(function(writable) {

				if(!writable.canWriteDocument && !writable.canWriteDraft)
					throw { error : "Not allowed" };

				//Save document

				if (writable.canWriteDocument) {
					return storage.documents.put(identifier, document).then(function(resp) {
						return {
							action: "publish",
							data: resp.data
						};						
					});
				}
				else {
					//Save draft 
					return storage.drafts.put(identifier, document).then(function(result) {

						var workflowData = { identifier: identifier };
						var pCreateWorkflow = workflows.create("publishingRequest", workflowData);

						return pCreateWorkflow.then(function(workflowInfo) {
							return {
								status: "publishRequest",
								data: resp.data
							};
						});
					});
				}
			});
		}
	}

	return _self;
}]);