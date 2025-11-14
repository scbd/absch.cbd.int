# Bulk Documents Uploader

The bulk document upload tool allows National Authorized Users and Publishing Authorities to create multiple documents in our system using a standardized Excel or CSV template.

## Creating a New Document Type for Bulk Uploading

If you have decided there is a need for parsing information into a new document type. You will need to make the following changes:

### Creating an Attributes Map 

You must create a "Document Attributes Map" `json` file, mapping each of your document attributes to columns in your Excel or CSV file.
The "Document Attributes Map" must be in the following folder: `app/components/register/bulk-documents-uploader/utilities/xlsx-file-to-document-attributes/maps`
An example of a "Document Attributes Map" can be found in the folder above.

```
// Document Attributes Map Example:
{
  "language": "A", // With A being the excel column name.
  "country": "B", // With B being the excel column name.
  "provider": {
    "consent": "C", // With C being the excel column name.
  },
}
```

### Creating Document API Schema 

Additionally, you must create a "Document API Schema" that matches document attributes to attributes in the JSON that will be sent to the API.
The _Document API Schema_ must extend the `Schema` class and be located in the following folder: `app/components/register/bulk-documents-uploader/utilities/document-attributes-to-api-json/schemas`
An example of a "Document API Schema" can be found in the folder above.

```
// Creating Document a API Example:
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
      providers: [
        {
          identifier: Schema.getProviderIdentifier(sheet.provider as IContactFields)
        }
      ],
    }
  }
}
},
```

### Adding New the Document Type to the Document Types List

You must modify the document types list to include your new document.

The document types list can be found here: `app/components/register/bulk-documents-uploader/data/document-types-list.ts`

First add the new document type string to the list of document types:

```
export type DocumentTypes = 'ircc' | '<Your Document Type Name>'
```
 
Then add the attributes map and the API schema to the `documentsList` variable. 

```
export const documentsList: DocumentsList = {
  ircc: { ApiSchema: IrccSchema, attributesMap: irccAttributesMap }.
  <Your Document Type Name>: { ApiSchema: <YourSchema>, attributesMap: <YourAttributesMap> }
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

<img width="856" height="890" alt="BulkUploaderUML" src="https://github.com/user-attachments/assets/2db384ed-6d99-4c1d-98c6-1467a5e3c320" />
 
### Thanks! 
