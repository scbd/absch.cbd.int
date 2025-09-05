import KmDocumentApi from "~/api/km-document";
// import { useRealm } from '~/services/composables/realm.js';

const apiToken = {
    "$$state": {
        "status": 1,
        "value": {
            "token": "FEEE7DD27AFE93666B1651769882DB97CD217A70FCFD576433A8A20F03C9387B2B95DB4D368ACE00787D47080B01C0E9771CC677096EAD5BA378C2C3C4EAF6EA3A12ADF2EA08555D31452E40389F87B3294C488DEA0AF7357E3EB96715E8C40661FDD3F39A2641B0E0CD4642EE9CAA97F1000981D5855BA973686B798A81B176",
            "expiration": "2025-09-04T16:56:06.8133993Z"
        }
    }
}
const kmDocumentApi = new KmDocumentApi({ tokenReader: () => apiToken?.value?.token });


const user = {
    "userID": 87354,
    "name": "Tahmeed Shah",
    "email": "tahmeedshah@gmail.com",
    "government": "va",
    "userGroups": [
        "country:va",
        "user:87354"
    ],
    "isAuthenticated": true,
    "roles": [
        "Everyone",
        "User",
        "AbsNationalAuthorizedUser-trg",
        "AbsPublishingAuthorities-dev",
        "BchNationalFocalPoint-Dev",
        "BchAuthorizedUser-Dev",
        "BCH-DEV-AuthorizedUserForDecisions",
        "BCH-DEV-AuthorizedUserForLaws",
        "BCH-DEV-AuthorizedUserForNationalReports"
    ],
    "isEmailVerified": true
}
// const realm = useRealm();
// renme to edit-for-uti
export const documentService = {



    async saveDraft(document) {
        console.log('Document to save as draft:', document);
        const identifier = document.header.identifier;
        const metadata = this.getDocumentMetadata(document);
        console.log('Metadata for draft:', metadata);

        // Use async/await to simplify the promise chain.
        try {
            // const hasDraft = await kmDocumentApi.existsDraft(identifier);
            // console.log('Draft exists:', hasDraft);
            // // Call the correct security check based on draft existence.
            // //storage.drafts.security.canUpdate(identifier, document.header.schema, metadata)
            // const securityCheck = hasDraft 
            //     ? await kmDocumentApi.canUpdateDraft(identifier, document.header.schema,  metadata)
            //     : await kmDocumentApi.canCreateDraft(identifier, document.header.schema,  metadata);
            // console.log('Security check result:', securityCheck);
            // if (!securityCheck?.isAllowed) {
            //     // Throw an error if the user is not authorized.
            //     throw new Error("Not authorized to save draft");
            // }
            return await kmDocumentApi.putDraft(identifier, document);

        } catch (error) {
            // Re-throw the error to be handled by the calling component.
            throw error;
        }
    },


    getDocumentMetadata(document) {
        // Access realm and user data from the top-level composable calls.
        const metadata = {
            schema: document?.header?.schema,
            realm: 'BCH-DEV', //realm.realm,
            government: undefined
        };

        if (document.government) {
            metadata.government = document?.government?.identifier;
        }
        //metadata.government = user.value?.government;
        if (!metadata.government) {
            metadata.government = 'va'
        }

        return metadata;
    },
    deleteDocument(document, additionalInfo) {

			var draftInfo = {
				identifier 				: document.identifier,
				documentID			 	: document.documentID,
				workingDocumentTitle	: document.title,
				workingDocumentSummary	: document.summary,
				workingDocumentMetadata	: document.metadata
			};
			var workflowType = {
				name : 'deleteRecord', version : "0.4"
			}	
			
			return createWorkflow(draftInfo, additionalInfo, workflowType); // return workflow info
	
	},
	//$q.when(editFormUtility.deleteDocument(record, $scope.additionalInfo))
	createWorkflow(draftInfo, additionalInfo, type){

		var schema = realm.schemas[draftInfo.type]

		if(!type)
		 	type = schemasWorkflowTypes[schema.type];

		if(!type)
			throw "No workflow type defined for this record type: " + draftInfo.type;

		var workflowData = {
			"realm"      		: realm.value,
			"documentID" 		: draftInfo.documentID,
			"identifier" 		: draftInfo.identifier,
			"title"      		: draftInfo.workingDocumentTitle,
			"abstract"   		: draftInfo.workingDocumentSummary,
			"metadata"   		: draftInfo.workingDocumentMetadata,
			"additionalInfo"	: additionalInfo
		};
		// use api/workflows.create
		return workflows.create(type.name, type.version, workflowData); // return workflow info
	}
};
