import app from '~/app';
import _ from 'lodash';
import '~/components/scbd-angularjs-services/main';
import '~/services/main';
import '~/services/search-service';

import {documentIdWithoutRevision, documentIdRevision} from '~/components/scbd-angularjs-services/services/utilities.js';

app.directive("validateReferencedRecordVersion", ["$rootScope", 'searchService', 'solr', 'realm',
	function ($rootScope, searchService, solr, realm) {
	return {
		restrict: "E",
		replace: true,
		scope: {
			document: "=",
		},
		link:function($scope, $element, $attr){
			
			async function validateLinkedRecords(document){
				const identifiers = findLinkedIdentifiers(document);		

				const ids = identifiers.map(e=>{
					const revision = documentIdRevision(e);
					return {
						identifier 		: documentIdWithoutRevision(e),
						currentRevision : revision ? Number(revision) : undefined
					}
				});
				
				var queryParameters = {
					'query'    	 : `identifier_s:(${ids.map(e=>solr.escape(e.identifier)).join(' ')})`,
					'rowsPerPage': ids.length+1,
					fields 		 : 'identifier_s, _revision_i, uniqueIdentifier_s'
				};
				
				const result = await searchService.list(queryParameters, null);
				
				if(result.data.response.docs.length){
					const documents = result.data.response.docs;
					ids.forEach(id=>{
						const doc = documents.find(e=>e.identifier_s == id.identifier)
						if(doc){
							id.latestRevision	= doc._revision_i
							id.uniqueIdentifier	= doc.uniqueIdentifier_s
						}
					})
					
					$rootScope.$emit('evt:updateLinkedRecordRevision', ids);
				}
			}

			function findLinkedIdentifiers(document){
				const identifiers = [];
				if(_.isArray(document) || _.isObject(document)){
					if(_.isArray(document)){
						// console.log(document)
						identifiers.push(findIdentifier(document))
					}
					else if(_.isObject(document)){
						// console.log(document)
						identifiers.push(findIdentifier(document))
					}
				}

				return _(identifiers).flatten().uniq().value();

			}

			function findIdentifier(val){
				const identifiers = []
				for(let key in val){
					if(val[key].identifier)
						identifiers.push(val[key].identifier)
					else
						identifiers.push(findLinkedIdentifiers(val[key]));
				}

				return _(identifiers).flatten().uniq().value();
			}
			
			//only show latest revision for BCH only
			if(realm.is('BCH'))
				validateLinkedRecords($scope.document)

		 }
	};
}]);

