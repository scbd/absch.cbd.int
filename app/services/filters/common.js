import _ from 'lodash';

export function sanitizeDocument (document){
    if(!document) return;

    document = sanitize(document);
    return document;

    function sanitize(doc){
      _.forEach(doc, function(fieldValue, key){
        
        if(_.isString(fieldValue) && _.trim(fieldValue||'') == ''){
          fieldValue = undefined;
        }
        else if(_.isArray(fieldValue)){
          fieldValue = sanitize(fieldValue);
          fieldValue = _.compact(fieldValue);
          
          if(_.isEmpty(fieldValue))
            fieldValue = undefined;
        }
        else if(_.isPlainObject(fieldValue)){
          fieldValue = sanitize(fieldValue);
          fieldValue = _.omit(fieldValue, isNullOrUndefinedOrEmpty);
        }

        doc[key] = fieldValue;

      });
      
      if(_.isArray(doc))
        doc = _.compact(doc)
      else if(_.isPlainObject(doc))
        doc = _.omit(doc, isNullOrUndefinedOrEmpty);
      
      return doc;
    }
    function isNullOrUndefinedOrEmpty(v){
      return v === undefined || v === null || (_.isObject(v) && _.isEmpty(v));
    }
}