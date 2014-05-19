define(['app'], function(app){
	app.factory('commonjs', ['authHttp', function($http){
		return new function(){
			this.getReferenceRecordIndex = function(schema,documentId){

				var item = [];
				var queryFields = 'fl=identifier_s,schema_s,createdDate_dt,createdByEmail_s,createdBy_s,updatedDate_dt,updatedByEmail_s,updatedBy_s,url_ss,';

				if(schema=="FOCALPOINT"){
				  queryFields += 'description_EN_t,government_EN_t,organization_EN_t,text_EN_txt,title_EN_t,treaty_CEN_ss,type_CEN_ss';
				}
				else if (schema=="MEETING"){
				queryFields += 'symbol_s,startDate_dt,endDate_dt,eventCountry_CEN_s,title_s,eventCity_s,text_EN_txt,themes_CEN_ss,thematicAreas_CEN_ss,thematicAreas_ss';
				}
				else if (schema=="NOTIFICATION"){
				queryFields += 'date_s,deadline_s,symbol_s,reference_s,sender_s,schema_CEN_s,title_EN_t,description_EN_t,recipient_ss,url_ss,text_EN_txt';
				}
				else if (schema=="PRESSRELEASE"){
				queryFields += 'date_s,symbol_s,schema_CEN_s,title_EN_t,description_EN_t,themes_CEN_ss,url_ss,thematicAreas_CEN_ss,text_EN_txt';
				}
				else if (schema=="STATEMENT"){
				queryFields += 'date_s,symbol_s,schema_CEN_s,title_EN_t,description_EN_t,themes_CEN_ss,url_ss,thematicAreas_CEN_ss,text_EN_txt';
				}

				return $http.get("/api/v2013/index/select?" + queryFields + "&q=id:"+documentId)
				   .then(function (result) { 
console.log(result);
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
		}
	}]);
});

