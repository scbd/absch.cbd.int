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
			$scope.sortSequence='desc'
			// //==================================
			// //
			// //==================================
			$scope.$watch('model', function(newValue, oldValue){
				if(newValue){

					var searchQuery = {
						rowsPerPage:5000,
						query 	: "referenceRecord_ss:" + solr.escape($scope.model),
						fields	: 'updatedOn:updatedDate_dt,title:title_EN_t, referenceRecord_ss, referenceRecord_info_ss,schemaCode:schema_s,schema:schema_EN_s, identifier:identifier_s, uniqueId:uniqueIdentifier_s, government_s,government:government_EN_s,schemaType:schemaType_s,',
						sort	: 'updatedDate_dt desc'
					}
					if(realm.is('BCH')){
						searchQuery.fields += `${iconFields.lmo},${iconFields.decision},${iconFields.organisms}`;
					}
					$q.when(searchService.list(searchQuery))
					.then(function(data) {

						if(data.data.response.docs.length > 0){
							return getFieldTitles().then(fieldTitles=>{
								_.forEach(data.data.response.docs, function(record){
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

												$scope.referenceRecords[record.schemaCode].fields[info.field] = $scope.referenceRecords[record.schemaCode].fields[info.field] || {count : 0, docs : [], schema : record.schema, fieldTitle};
												$scope.referenceRecords[record.schemaCode].fields[info.field].count += 1;
												$scope.referenceRecords[record.schemaCode].fields[info.field].docs.push( record );
											}
										});
									});
								})
								if(typeof $scope.onDataFetch == 'function'){
									$scope.onDataFetch({data:$scope.referenceRecords})
								}
								
							})
						}
					});

				}
			});

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


