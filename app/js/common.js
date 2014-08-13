define(['app'], function(app){
	app.factory('commonjs', ['authHttp','$rootScope', function($http,$rootScope){
		return new function(){

			this.getReferenceRecordIndex = function(schema,documentId){

				var item = [];
				var queryFields = 'fl=id,identifier_s,schema_s,createdDate_dt,createdByEmail_s,createdBy_s,updatedDate_dt,updatedByEmail_s,updatedBy_s,url_ss,';

				if(schema.toUpperCase()=="FOCALPOINT"){
				  queryFields += 'description_EN_t,government_EN_t,organization_EN_t,function_EN_t,department_EN_t,title_EN_t,treaty_CEN_ss,type_CEN_ss,email_s,telephone_s';
				}
				else if (schema.toUpperCase()=="MEETING"){
				queryFields += 'symbol_s,startDate_dt,endDate_dt,eventCountry_CEN_s,title_s,eventCity_s,text_EN_txt,themes_CEN_ss,thematicAreas_CEN_ss,thematicAreas_ss';
				}
				else if (schema.toUpperCase()=="NOTIFICATION"){
				queryFields += 'date_s,deadline_s,symbol_s,reference_s,sender_s,schema_CEN_s,title_EN_t,description_EN_t,recipient_ss,url_ss,text_EN_txt';
				}
				else if (schema.toUpperCase()=="PRESSRELEASE"){
				queryFields += 'date_s,symbol_s,schema_CEN_s,title_EN_t,description_EN_t,themes_CEN_ss,url_ss,thematicAreas_CEN_ss,text_EN_txt';
				}
				else if (schema.toUpperCase()=="STATEMENT"){
				queryFields += 'date_s,symbol_s,schema_CEN_s,title_EN_t,description_EN_t,themes_CEN_ss,url_ss,thematicAreas_CEN_ss,text_EN_txt';
				}

				return $http.get("/api/v2013/index/select?" + queryFields + "&q=id:"+documentId)
				   .then(function (result) {

				      item.data = result.data.response.docs[0];

				      item.data.info = [];
				      item.data.header = {'schema':item.data.schema_s};
				      if(item.data.createdBy_s){
				        item.data.info.createdBy.firstName = item.data.createdBy_s;
				        item.data.info.createdBy.email = item.data.createdByEmail_s;
				      }
				      item.data.info.createdOn = item.data.createdDate_dt;
				      if(item.data.updatedBy_s){
				        item.data.info.updatedBy.firstName = item.data.updatedBy_s;
				        item.data.info.updatedBy.email = item.data.updatedByEmail_s;
				      }
				      item.data.info.updatedOn = item.data.updatedDate_dt;
				      item.data.header.identifier = item.data.identifier_s;

				      return item;
				});
			}

			this.isUserInRole = function(role){

				var userRoles = $rootScope.user.roles;
				if(!role)
					return false;

				for(var i=0; i < userRoles.length; i++) {
					if(userRoles[i] == role)
						return true;
				}

				return false;
			}

			this.getCountries = function(){

				// if($rootScope.countries)
				// 	return $rootScope.countries;

				return $http.get('/api/v2013/countries', {cache: true}).then(function(response) {
						  var countries = response.data;
						  var countriesDetails = []

						  for(var i=0; i!=countries.length; ++i){
									var country = {} ;
									var treaties = countries[i].treaties;
									country.code = countries[i].code;
									country.isParty = treaties.XXVII8.party!=null;
									country.isSignatory = treaties.XXVII8b.signature!=null;
									country.isRatified = treaties.XXVII8b.instrument == "ratification" ||
															treaties.XXVII8b.instrument == "accession" ||
															treaties.XXVII8b.instrument == "acceptance" ||
															treaties.XXVII8b.instrument == "approval"||
															country.code == 'EU';
								  	// console.log($rootScope.countries);
								  	countriesDetails.push(country);
							}
							return countriesDetails;
					  });


			}

			this.isIAC = function(){
				return	this.isUserInRole('abschiac');
			}

			this.isAnyOtherRoleThenIAC = function(){

				return	this.isUserInRole('AbsPublishingAuthorities')||
						this.isUserInRole('AbsNationalAuthorizedUser')||
						this.isUserInRole('AbsNationalFocalPoint')||
						this.isUserInRole('ABS-CH Administrator') ||
						this.isUserInRole('Administrator')

			}
		}
	}]);
});
