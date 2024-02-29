import app from '~/app';
import _ from 'lodash';
import template from "text!./view-authority.directive.html";
import '~/views/directives/record-options';
import '~/services/main';
import '~/views/forms/view/directives/view-reference-records.directive';
import '~/views/forms/directives/view-terms-hierarchy';
import viewAuthorityT from '~/app-text/views/forms/view/view-authority.json';

	app.directive("viewAuthority", ["IStorage", "realm", "translationService", function (storage, realm, translationService) {
		return {
			restrict   : "EAC",
			template: template ,
			replace    : true,
			transclude : false,
			scope: {
				document: "=ngModel",
				target  : "@linkTarget",
				locale      : "=",
				allowDrafts : "@",
				hide : "@"
			},
			link : function ($scope)
			{
				translationService.set('viewAuthorityT', viewAuthorityT);
				if(realm.is('ABS'))		$scope.isABS=true;
				else if(realm.is('BCH'))$scope.isBCH=true;

				$scope.onReferencedRecordsDataFetch = function(data){
					if(data && (data.authorities||{}).docs){
						if(data.authorities.docs.length)
							$scope.policyBasisForCompetencyRef = _.map(data.authorities.docs, 'identifier')
					}
				}

				function removeTerms(terms, root,termId){
					if(root){
						return _.filter(terms, function(t){
							return _.includes(root, t.identifier)
						})
					} else {
						return  _.filter( terms, function ( item ) {
							return item.identifier != termId;
						});
					}
				}

				$scope.onFunctionsTerms = function(terms){
					if(($scope.document||{}).functions){
						_.forEach(terms, function(item){
							var root = _.find( $scope.document.functions, { identifier : 'FE1AA9E9-3320-4112-9F9C-A22AD6563AE1' } );
							if( root ){
								terms = _.filter( terms, function ( t ) {
									return _.includes( root, t.identifier );
								} );
							} else {
								if ( item.narrowerTerms != undefined && item.narrowerTerms.length > 0 ) {
									terms = _.filter( terms, function ( t ) {
										return item.identifier != t.identifier;
									} );
								}
							}
							if(root && item.identifier =="5B6177DD-5E5E-434E-8CB7-D63D67D5EBED") { 
								terms.push(item)
							}
						} );
						return terms;
					}
				}

				$scope.onOrganismTypesTerms = function(terms) {
					if ($scope.document?.cpbOrganismTypes) {
						const selectedIdentifiers = $scope.document.cpbOrganismTypes.map(e=>e.identifier);

						_.forEach( terms, function ( item ) {
							var root = _.find( $scope.document.cpbOrganismTypes, { identifier : '8DAB2400-CF00-44B2-ADCF-49AABF66B9B0' } );
							if ( root ) {
								terms = _.filter( terms, function ( t ) {
									return _.includes( root, t.identifier );
								} );
							} else {
								if ( item.narrowerTerms != undefined && item.narrowerTerms.length > 0 ) {

									const narrowerSelected 	= _(selectedIdentifiers).intersection(item.narrowerTerms).value();
									const selfSelected		= _.includes(selectedIdentifiers, item.identifier)
									if(narrowerSelected.length){
										terms = _.filter( terms, function ( t ) {
											return item.identifier != t.identifier;
										} );
									}
									else if (selfSelected){
										terms = _.filter( terms, function ( t ) {
											return !_.includes(item.narrowerTerms, t.identifier);
										} );
									}									
								}
							}
						} );
						return terms;
					}
				}


				$scope.display = function(field) {

					if(!$scope.hide) return true; //show all fields

					return( $scope.hide.indexOf(field) >= 0 ? false : true);
				}

			}
		};
	}]);

