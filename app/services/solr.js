import app from '~/app';
import _ from 'lodash'; 
import  {escape, andOr, localizeFields } from './solr/queries.js'

app.factory('solr', [function() {

	return {
		escape       : escape,
		andOr        : andOr,
		localizeFields
	};
}]);

