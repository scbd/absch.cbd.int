import app from '~/app';
import _ from 'lodash';
import template from "text!./view-reference-records.directive.html";
import '~/components/scbd-angularjs-services/main';
import '~/services/main';
import '~/views/forms/view/bch/icons';
import { iconFields } from '~/views/forms/view/bch/icons';
import viewReferenceRecordsT from '~/app-text/views/forms/view/directives/view-reference-records.json';

app.directive("viewReferencedRecords", [function () {
	return {
		restrict: "EA",
		template: template ,
		replace: true,
		transclude: false,
		scope: {
			model: "=ngModel",
			locale: "=",
			target: "@linkTarget",
			onDataFetch: "&?"
		},
		controller: ["$scope", "solr", '$q', 'searchService', 'realm', 'commonjs', 'translationService', function ($scope, solr, $q, searchService, realm, commonjs, translationService) {
			translationService.set('viewReferenceRecordsT', viewReferenceRecordsT);
			$scope.sortField='updatedDate_dt';
			$scope.sortSequence='desc';
			$scope.searchResult = {};
			// //==================================
			// //
			// //==================================
			$scope.$watch('model', async function(newValue, oldValue){
				if(newValue && !$scope.referenceRecords && !$scope.loading){
					await loadReferencedRecords();
				}
			});

			async function loadReferencedRecords(){
				$scope.loading = true;
				try{
					const { docs } = await loadSolrRecords(undefined, 1000, 0);
					const fieldTitles = await getFieldTitles()
					_.forEach(docs, function(record){
						_.forEach(record.referenceRecord_info_ss, function(info){
							info = JSON.parse(info);
							const fieldTitle = fieldTitles[record.schemaCode+"."+info.field] || info.field;	
							_.uniq(info.identifiers).forEach((identifier)=>{
								if(removeRevisionNumber(identifier) == $scope.model){
									if(!$scope.referenceRecords)
										$scope.referenceRecords = {};

									if(!$scope.referenceRecords[record.schemaCode]){
										$scope.referenceRecords[record.schemaCode] = {
											schema	  : record.schema,
											fields 	  : {},
											schemaType: record.schemaType,
											fieldTitle: fieldTitle
										};
									}
									
									let fieldInfo = $scope.referenceRecords[record.schemaCode].fields[info.field] || {count : 0, docs : [], schema : record.schema, fieldTitle};
									fieldInfo.docs.push(record);

									fieldInfo = {
										...fieldInfo,
										count : fieldInfo.count+1,
										pageSize : 25,
										currentPage : 1,
										pageCount : Math.ceil(fieldInfo.docs.length / 25),
										pagedDocs : fieldInfo.docs.filter((e,i)=>i<25)
									}

									$scope.referenceRecords[record.schemaCode].fields[info.field] = fieldInfo;
								}
							});
						});
					})
					if(typeof $scope.onDataFetch == 'function'){
						$scope.onDataFetch({data:$scope.referenceRecords})
					}
				}
				catch(e){
					console.error(e);					
				}
				finally{
					$scope.loading = false;
				}
			}
			async function loadSolrRecords(docs, rowsPerPage, pageNumber){
				docs = docs || []
				rowsPerPage = rowsPerPage || 25
				pageNumber  = pageNumber  || 0
				var searchQuery = {
					rowsPerPage:rowsPerPage,
					currentPage: pageNumber,
					query 	: "referenceRecord_ss:" + solr.escape($scope.model),
					fields	: 'updatedOn:updatedDate_dt,title:title_EN_t, referenceRecord_ss, referenceRecord_info_ss,schemaCode:schema_s,schema:schema_EN_s, identifier:identifier_s, uniqueId:uniqueIdentifier_s, government_s,government:government_EN_s,schemaType:schemaType_s,',
					sort	: 'updatedDate_dt desc'
				}
				if(realm.is('BCH')){
					searchQuery.fields += `${iconFields.lmo},${iconFields.decision},${iconFields.organisms}`;
				}
				const result = await searchService.list(searchQuery)
				let    { docs:newDocs, numFound } = result.data.response; 
				docs    = [...docs, ...newDocs];

				if(docs.length < numFound){
					({ docs, numFound } = await loadSolrRecords(docs,rowsPerPage, pageNumber+1));
				}
				
				return  { docs, numFound };

			}

			$scope.onPageChange = (pageNumber, field)=>{
				console.log(field.docs)
				field.currentPage = pageNumber
				field.pagedDocs = field.docs.filter((e,i)=>i >= field.pageSize * (pageNumber-1) && i< field.pageSize * pageNumber);
			}
			$scope.onPageSizeChanged = function(size, field){
				field.currentPage = 1;
				field.pageSize = size;
				field.pageCount = Math.ceil(field.docs.length / size);
				field.pagedDocs = field.docs.filter((e,i)=>i<size);
			}
			// --------------------------------------------------------------
			// -----------------------------------------------------------------
			$scope.encode = function(query){
				return encodeURIComponent(query);
			}

			async function getFieldTitles(){
				if(realm.is('ABS'))
					return (await import('~/app-text/views/forms/view/directives/abs-linked-records-field-titles.json')).default;

					return (await import('~/app-text/views/forms/view/directives/bch-linked-records-field-titles.json')).default;
			}

			function removeRevisionNumber(identifier){
				return identifier.replace(/@[0-9]+$/, '');
			}

			$scope.toggleTitle = function(event){
				event.target.classList.toggle("truncate-record");
			}

		}] //controller
	};
}]);


