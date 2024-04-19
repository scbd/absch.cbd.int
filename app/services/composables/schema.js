

import { useI18n } from 'vue-i18n';
import scbdSchemas from '~/components/scbd-angularjs-services/filters/schema-name.json' assert { type:'json'};
import { useRealm } from "./realm";
import { lstring } from '../filters/lstring';

export function useSchema() {
   
    const realm      = useRealm();
    const { locale } = useI18n(); 

    return {
        schemaByKey,
        schemaByShortCode,
        schemaShortName,
        schemaKeyByShortCode
    }

    function schemaByKey(schema) {


        if(!schema)
            return schema;
    
        var data = ((realm.schemas[schema]||{}).title||{});

        if(!data)
            data = scbdSchemas[schema];

        var result = lstring(data, locale);

        if(!result || result == '')
            result = schema;//legacy

        return result;
    }

    function schemaByShortCode(schema) {

        if(!schema)
            return schema;

        var realmSchema = _.findKey(realm.schemas, {shortCode: schema.toUpperCase()})
        if(realmSchema)
            return realmSchema;

        realmSchema = _.findKey(scbdSchemas, {shortCode: schema.toUpperCase()})
        
        return realmSchema || schema;
    }

    function schemaShortName( schema) {

        if(!schema)
            return schema;
        
        var result = (realm.schemas[schema]||{}).shortCode;
        
        return result || (scbdSchemas[schema]||{}).shortCode || schema;
    }

    function schemaKeyByShortCode(shortCode){

        if(!shortCode)
            return shortCode;

      var realmSchema = _.findKey(realm.schemas, {shortCode: shortCode.toUpperCase()})
      if(realmSchema)
        return realmSchema;

      realmSchema = _.findKey(scbdSchemaDetails, {shortCode: shortCode.toUpperCase()})
      
      return realmSchema || shortCode;
	
    }
}