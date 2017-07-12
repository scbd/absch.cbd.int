
//define(['app'], function(app){
var app = angular.module('ngapp',['ngSanitize','appCommon'])

app.controller('printPermit', ['$scope','$http','$location','$sce','$filter','$q', function($scope,$http,$location, $sce, $filter, $q) {

	var sLocale      = "en";
	$scope.locale = sLocale;

	var params = {};
	// params            = clone(params||{});

	 params.identifier = $location.search().documentID;


	var document = 			$http.get('/api/v2013/documents/' +  params.identifier, { });
	var documentInfo = 		$http.get('/api/v2013/documents/' +  params.identifier + '?info', { });
	var documentVersion=	$http.get('/api/v2013/documents/'+params.identifier+'/versions?body=true&cache=true')

	$q.all([document,documentInfo,documentVersion]).then(function(result){

		 	$scope.document = result[0].data;
			$scope.documentInfo = result[1].data;
			$scope.documentVersion = result[2].data;
			$scope.realm = $scope.documentInfo.Realm;

			if($scope.document.absIRCCs){
				$scope.document.absIRCCs.forEach(function(item){
					$http.get('/api/v2013/documents/' +  item.identifier, { info:""})
					.success(function(result){
						item.document = result;
					}).finally(function(){
						getContacts($scope.document, $scope.documentInfo.realm)
					});
				})
			}
			else
				getContacts($scope.document, $scope.documentInfo.realm);
	});

	$scope.renderHtml = function(html_code)
	{
	    return $sce.trustAsHtml($filter("lstring")(html_code,sLocale));
	};

	function getContacts(document, realm){

	    $scope.emailList = [];
		if(document.absIRCCs){

				var permits = _.map(document.absIRCCs, function(document){
					return $http.get('/api/v2013/documents/' +  document.identifier)
				});
				$q.all(permits)
				.then(function(results){
					_.each(results, function(result){
						if(result.data.absCNA && !_.some($scope.emailList, {identifier:result.data.absCNA.identifier}))
							$scope.emailList.push({identifier:result.data.absCNA.identifier})
					});
				});
		}
		else if(document.entityWhoGrantedPIC){
			if(!_.some($scope.emailList, {identifier:document.entityWhoGrantedPIC}))
					$scope.emailList.push(document.entityWhoGrantedPIC);
		}
		else if(document.sourceCountries){

			var country = _.map(document.sourceCountries, function(country){ return country.identifier });
			var query = "/api/v2013/index/select?fl=id,identifier_s&q=(realm_ss:" + realm.toLowerCase() +
			"+AND+NOT+version_s:*+AND+schema_s:authority+AND+(government_s:" + country.join('+OR government_s:') + "))&rows=50"

			$http.get(query).success(function(res) {
				angular.forEach(res.response.docs, function(cna){
					if(!_.some($scope.emailList, {identifier:cna.identifier_s}))
							$scope.emailList.push({identifier: cna.identifier_s});
				});
			});
		}
		if(document.absCheckpoints){
			var checkpoints = _.map(document.absCheckpoints, function(document){
				return $http.get('/api/v2013/documents/' +  document.identifier)
			});
			$q.all(checkpoints)
			.then(function(results){
				 _.each(results, function(result){
					_.each(result.data.contactsToInform, function(contacts){
						   if(!_.some($scope.emailList, {identifier:contacts.identifier}))
								$scope.emailList.push({identifier:contacts.identifier})
					 });
				});
			});
		}
	    if(document.government){
	        var government =  document.government.identifier;
	        var query = "/api/v2013/index/select?fl=id,identifier_s,schema_s,title_t,department_EN_t,description_EN_t,email_ss,"+
	        "+organization_EN_t,telephone_ss,type_ss,fax_ss,government_CEN_s,addressCountry_s&q=(realm_ss:" + $scope.realm.toLowerCase() +
	        "+AND+NOT+version_s:*+AND+schema_s:focalPoint+AND+(government_s:" + government + "))&rows=50";

	        $http.get(query).success(function(res) {
	            angular.forEach(res.response.docs, function(nfp){
					if(!_.some($scope.emailList, {identifier:nfp.identifier_s}))							
	                    $scope.emailList.push(
	                            {
									identifier:nfp.identifier_s,
									header	: {identifier:nfp.identifier_s},
									type:'person',
	                                firstName:nfp.title_t,
	                                addressHTML:{en:nfp.description_EN_t.replace(/\n/g, '<br/>')},
	                                country: nfp.addressCountry_s,
	                                phones:nfp.telephone_ss,
	                                faxes:nfp.fax_ss,
	                                emails:nfp.email_ss
	                            });
	            });
	        });
	    }
	}

}]);


