import { downloadSchemas as absDownloadSchemas } from "../app-data/abs/download-schemas";
import { downloadSchemas as bchDownloadSchema } from "../app-data/bch/download-schemas";
import { downloadSchemas as chmDownloadSchema } from "../app-data/chm/download-schemas";

export function getFieldName(realm, schema, fieldName) {
  let schemaObject = null;

  if(/^ABS\b/i.test(realm)) schemaObject = absDownloadSchemas[schema];
  if(/^BCH\b/i.test(realm)) schemaObject = bchDownloadSchema[schema];
  if(/^CHM\b/i.test(realm)) schemaObject = chmDownloadSchema[schema];

  if(!schemaObject){
     schemaObject = absDownloadSchemas[schema] || bchDownloadSchema[schema] || chmDownloadSchema[schema];
  }

  return (
    schemaObject?.[fieldName] || schemaObject?.[`${fieldName}Link`] || fieldName.toUpperCase()
  );
}
