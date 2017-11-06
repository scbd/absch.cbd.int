define(['app', 
"text!views/forms/view/view-abs-checkpoint-communique.directive.html", 'views/directives/record-options'], function (app, template) {

app.directive("viewAbsCheckpointCommunique", [function () {

	return {
		restrict   : "EAC",
		template: template ,
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			allowDrafts : "@",
			hide: "@"
		},
		link : function ($scope, $element, $attr)
		{
			$scope.showPdf = $attr.showPdf === undefined || $attr.showPdf != "false";
		},
		controller: ["$scope", "IStorage", "$http", "$q","underscore","realm", function ($scope, storage, $http, $q, _, realm)
		{
			$scope.contacts = undefined;
			$scope.gisMapLayers = null;
			$scope.gisMapCenter = null;

			
			

			//====================
			//
			//====================
			$scope.display = function(field) {

				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}

			//==================================
			//
			//==================================
			$scope.$watch("document.gisMapCenter", function (gisMapCenter) {
				$scope.gisMapCenter = angular.fromJson(angular.toJson(gisMapCenter));
			});

			//==================================
			//
			//==================================
			$scope.$watch("document.gisFiles", function (gisFiles) {
				var qLinks = gisFiles || [];
				var qGis = _.map(qLinks, function(link) {

					/* global L: true */ // JSHint for leaflet

					return $http.get(link.url).then(function(res) {
						return L.geoJson(res.data);
					});
				});

				$q.all(qGis).then(function (layers) {
					$scope.gisMapLayers = layers;
				});
			});

			$scope.$watch("document", function (oldVal,newVal) {
					getContacts(newVal);
			});

			function getContacts(document){
				if(!document || $scope.emailList)
					return;

				$scope.emailList = [];
				if(document.absIRCCs){
						var absIRCCs =  _.map(document.absIRCCs, function(document){
							return $http.get('/api/v2013/documents/' +  document.identifier)
						});
						$q.all(absIRCCs)
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
					var query = "/api/v2013/index/select?fl=id,identifier_s&q=(realm_ss:" + realm.value.toLowerCase() +
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
					"+organization_EN_t,telephone_ss,type_ss,fax_ss,government_CEN_s,addressCountry_s&q=(realm_ss:" + realm.value.toLowerCase() +
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


		}]
	};
}]);

})
