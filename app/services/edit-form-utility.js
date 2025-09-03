import KmDocumentApi from "~/api/km-document";
// import { useRealm } from '~/services/composables/realm.js';


const kmDocumentApi = new KmDocumentApi({});

// const { user } = useAuth();
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

export const documentService = {



    async saveDraft(document) {
        console.log('Document to save as draft:', document);
        const identifier = document.header.identifier;
        const metadata = this.getDocumentMetadata(document);
        console.log('Metadata for draft:', metadata);

        // Use async/await to simplify the promise chain.
        try {
            const hasDraft = await kmDocumentApi.existsDraft(identifier, { info: "" });
            console.log('Draft exists:', hasDraft);
            // Call the correct security check based on draft existence.
            const securityCheck = hasDraft 
                ? await kmDocumentApi.canUpdate(identifier, { metadata })
                : await kmDocumentApi.canCreate(identifier, { metadata });
            console.log('Security check result:', securityCheck);
            if (!securityCheck?.isAllowed) {
                // Throw an error if the user is not authorized.
                throw new Error("Not authorized to save draft");
            }

            // Call the put method on the instantiated API object.
            //return storage.drafts.put(identifier, document);
            return await kmDocumentApi.draftPut(identifier, document, { schema: document.header.schema });

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
        
        if (!metadata.government) {
            metadata.government = user.government //user.value?.government;
        }

        return metadata;
    },
};
