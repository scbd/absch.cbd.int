export function schemaShortName(realm, schema) {

    if (!schema)
        return schema;

    var result = realm.schemas[schema]?.shortCode;

    return result || schema;
}