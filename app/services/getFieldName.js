import { downloadSchemas as absDownloadSchemas } from "../app-data/abs/download-schemas";
import { downloadSchemas as bchDownloadSchema } from "../app-data/bch/download-schemas";
import { downloadSchemas as chmDownloadSchema } from "../app-data/chm/download-schemas";

export function getFieldName(schema, fieldName, realm) {
  let schemaObject = null;
  switch (realm) {
    case "ABS":
      schemaObject = absDownloadSchemas[schema];
      break;
    case "BCH":
      schemaObject = bchDownloadSchema[schema];
    case "CHM":
      schemaObject = chmDownloadSchema[schema];
  }

  if(!schemaObject){
      return null;
  }

  schemaObject = absDownloadSchemas[schema];

  return (
    schemaObject?.[fieldName] || schemaObject?.[`${fieldName}Link`] || fieldName
  );
}
