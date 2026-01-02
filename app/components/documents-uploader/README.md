# Bulk Document Uploader

The bulk document uploader allows National Authorized Users and Publishing Authorities to create multiple documents in our system using information from a standardized Excel template.

## Creating a New Document Type for Bulk Uploading

If you have decided there is a need for parsing information into a new document type. You will need to make the following changes:

### Creating an Attributes Map 

You must create a "Document Attributes Map" `json` file, mapping each of your document attributes to columns in your Excel or CSV file.
The "Document Attributes Map" must be in the following folder: `app/components/documents-uploader/data/maps`
An example of a "Document Attributes Map" can be found in the folder above.

```
// Document Attributes Map Example:
{
  language: { column: '0', required: true, translationKey: 'generalInfo' }, // A
  country: { column: '1', required: true, translationKey: 'country' }, // B
  permitEquivalent: { column: '3', translationKey: 'detailsPermit' }, // D
  dateOfIssuance: { column: '4', required: true, translationKey: 'dateOfIssuance' }, // E
  dateOfExpiry: { column: '5', required: true, translationKey: 'dateOfExpiry' }, // F
}
```

### Creating Document Schema 

Additionally, you must create a "Document Schema" that matches document attributes to attributes in the JSON that will be used to create a document in our system.
The _Document Schema_ must extend the `Schema` class and be located in the following folder: `app/components/documents-uploader/utilities/document-attributes-to-schema-json`
An example of a "Document Schema" can be found in the folder above.

```
// Creating a Document Schema Example:
{
import Schema from '../schema'
import type { <Your Document Schema Name>DocumentAttributes } from './types'

export default class <Your Document Schema Name>Schema extends Schema {
  override async parseXLSXFileToDocumentJson () {
    const sheet: <Your Document Schema Name>DocumentAttributes = this.documentAttributes as <Your Schema Name>DocumentAttributes
    const Schema = <Your Document Schema Name>Schema

    return {
      header: {
        identifier: 'CB51626B-CF45-2AA0-3A24-459669DDCC34',
        schema: "<Your Document Schema Name>",
        languages: [ Schema.getLanguageCode(sheet.language)]
      },
      title: sheet.permitEquivalent,
      dateOfIssuance: sheet.dateOfIssuance,
    }
  }
}
},
```

### Adding the New Document Type to the Document Types List

You must modify the document types list to include your new document.

The document types list can be found here: `app/components/documents-uploader/data/document-types-list.ts`

First add the new document type string to the list of document types:

```
export type DocumentTypes = 'ircc' | '<Your Document Type Name>'
```
 
Then add the attributes map and the Document Schema to the `documentsList` variable. 

```
export const documentsList: DocumentsList = {
  ircc: { DocumentSchema: IrccSchema, attributesMap: irccAttributesMap, keywordDomains: [THESAURUS_DOMAINS.ABS_PERMIT_KEYWORD]  },
  <Your Document Type Name>: { DocumentSchema: <YourSchema>, attributesMap: <YourAttributesMap> keywordDomains: [<Your list of relevant keyword domains>] }
}
```

### Passing Your Document Type to the Vue Component

Finally you must pass the new document name to the Vue Component when it is initialized.

```
<bulk-document-uploader
  @refresh-record="refreshList(schema);"
  @on-close="onBulkUploaderClose();"
  document-type="<Your Document Name>"
/>
```

That's all!

## UML Diagram

<img width="863" height="873" alt="documents-uploader-uml" src="https://github.com/user-attachments/assets/6efbd416-e8f3-485e-97aa-a322e33726ba" />
 
### Thanks! 
