
export function onBuildDocumentSelectorQuery (options){
    var queries = {
        fieldQueries    : options.fieldQueries||[],
        query           : options.query || '*:*',
        sort            : options.sort,
        fields          : options.fields
    }
    if(options.schemas)
      queries.fieldQueries.push('schema_s:(' + options.schemas.map(escape).join(' ') + ')')
    else if(options.schema)
      queries.fieldQueries.push('schema_ss:'+escape(options.schema))

    if(options.realm)
        queries.fieldQueries.push('realm_ss:'+escape(options.realm))

    if(options.identifier)
      queries.fieldQueries.push("NOT identifier_s:" + escape(options.identifier));

    if(options.government)
      queries.fieldQueries.push('government_s:'+escape(options.government));

    if((options.searchText||'')!=''){
        const queryText = escape(options.searchText); // Unsure if `escape` is suitable for handling translations
        const searchField = options.searchField || 'text_EN_txt';
    
        // Split the queryText into words and construct the Solr query for each word
        const words = queryText.split(' ');
        const wordQueries = words.map(word => `(${searchField}:(${word}*) OR ${searchField}:(${word}))`);
        const formattedQuery = `(${wordQueries.join(' AND ')})&fl=${searchField}`; // adjust to OR if that's more appropriate
    
        if (options.query && options.query !== '') {
            queries.query += ` AND ${formattedQuery}`;
        } else {
            queries.query = formattedQuery;
        }
    }
    return queries;
  } 


export function escape(value) {

    if(value===undefined) return;
    if(value===null)      return;
    if(value==="")        return;

    if(_.isNumber(value)) value = value.toString();
    if(_.isDate  (value)) value = value.toISOString();

    //TODO add more types

    value = value.toString();

    value = value.replace(/\\/g,   '\\\\');
    value = value.replace(/\+/g,   '\\+');
    value = value.replace(/\-/g,   '\\-');
    value = value.replace(/\&\&/g, '\\&&');
    value = value.replace(/\|\|/g, '\\||');
    value = value.replace(/\!/g,   '\\!');
    value = value.replace(/\(/g,   '\\(');
    value = value.replace(/\)/g,   '\\)');
    value = value.replace(/\{/g,   '\\{');
    value = value.replace(/\}/g,   '\\}');
    value = value.replace(/\[/g,   '\\[');
    value = value.replace(/\]/g,   '\\]');
    value = value.replace(/\^/g,   '\\^');
    value = value.replace(/\"/g,   '\\"');
    value = value.replace(/\~/g,   '\\~');
    value = value.replace(/\*/g,   '\\*');
    value = value.replace(/\?/g,   '\\?');
    value = value.replace(/\:/g,   '\\:');

    return value;
}

export function andOr(query, sep) {

    sep = sep || 'AND';

    if(Array.isArray(query)) {

        query = query.map(function(criteria){

            if(Array.isArray(criteria)) {
                return andOr(criteria, sep=="AND" ? "OR" : "AND");
            }

            return criteria;
        });

        query = '(' + query.join(' ' + sep + ' ') + ')';
    }

    return query;
}

export function localizeFields (field, locale){
    return field.replace(/_EN_/ig, `_${locale.toUpperCase()}_`);
}