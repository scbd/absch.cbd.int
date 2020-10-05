define(['app', 'lodash'], function(app, _) { 'use strict';

app.factory('solr', [function() {

	return {
		escape       : escape,
		unescapeCaret: unescapeCaret,
		andOr        : andOr
	};

	function escape(value) {

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

	function andOr(query, sep) {

		sep = sep || 'AND';

		if(_.isArray(query)) {

			query = _.map(query, function(criteria){

				if(_.isArray(criteria)) {
					return andOr(criteria, sep=="AND" ? "OR" : "AND");
				}

				return criteria;
			});

			query = '(' + query.join(' ' + sep + ' ') + ')';
		}

		return query;
	}

	function unescapeCaret(value) {

		if(value===undefined) throw "Value is undefined";
		if(value===null)      throw "Value is null";
		if(value==="")        throw "Value is null";

		if(!_.isString(value)) return value;

		value = value.replace(/\\^\d+(\s|$)/g,   '^');
		
		return value;
	}


}]);
});
