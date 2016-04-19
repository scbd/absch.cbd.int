define(['app'], function (app) {

app.directive("viewAbsCheckpointCommunique", [function () {

	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/view/view-abs-checkpoint-communique.directive.html",
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

			//====================
			//
			//====================
			$scope.$watch("document.checkpointCommuniques", function () {
				if ($scope.document) {
					$scope.checkpointCommuniques = angular.fromJson(angular.toJson($scope.document.checkpointCommuniques));

					if ($scope.checkpointCommuniques)
						$scope.loadReferences($scope.checkpointCommuniques);
				}
			});

			//====================
			//
			//====================
			$scope.loadReference = function (ref) {

					storage.documents.get(ref.identifier, { cache: true })
						.success(function (data) {
							ref.document = data;
						})
						.error(function (error, code) {
							if (code == 404 && $scope.allowDrafts == "true") {

								storage.drafts.get(ref.identifier, { cache: true })
									.success(function (data) {
										ref.document = data;
									})
									.error(function () {
										ref.document = undefined;
										ref.error = error;
										ref.errorCode = code;
									});
							}

							ref.document = undefined;
							ref.error = error;
							ref.errorCode = code;

						});
			};

			//====================
			//
			//====================
			$scope.loadReferences = function(targets) {

				angular.forEach(targets, function(ref){

					storage.documents.get(ref.identifier, { cache : true})
						.success(function(data){
							ref.document = data;
						})
						.error(function(error, code){
							if (code == 404 && $scope.allowDrafts == "true") {

								storage.drafts.get(ref.identifier, { cache : true})
									.success(function(data){
										ref.document = data;
									})
									.error(function(){
										ref.document  = undefined;
										ref.error     = error;
										ref.errorCode = code;
									});
							}

							ref.document  = undefined;
							ref.error     = error;
							ref.errorCode = code;

						});
				});
			};

			$scope.$watch("document", function (oldVal,newVal) {
				//if (oldVal && oldVal!=oldVal) {
					getContacts(newVal);
				//}
			});

			function getContacts(document){
				if(!document || $scope.emailList)
					return;

				$scope.emailList = [];
				if(document.permit){

						var permits = _.map(document.permit, function(document){
							return $http.get('/api/v2013/documents/' +  document.identifier)
						});
						$q.all(permits)
						.then(function(results){
							_.each(results, function(result){
								$scope.emailList.push({identifier:result.data.authority.identifier})
							});
						});
				}
				else if(document.responsibleAuthorities){
					$scope.emailList.push(document.personeToWhomGranted);
				}
				else if(document.originCountries){

					var country = _.map(document.originCountries, function(country){ return country.identifier });
					var query = "/api/v2013/index/select?fl=id,identifier_s&q=(realm_ss:" + realm.value.toLowerCase() +
					"+AND+NOT+version_s:*+AND+schema_s:authority+AND+(government_s:" + country.join('+OR government_s:') + "))&rows=50"

					$http.get(query).success(function(res) {
						angular.forEach(res.response.docs, function(cna){
							cnaQuery.push({identifier: cna.identifier_s});
						});
					});
				}
				if(document.checkpoint){
					var checkpoints = _.map(document.checkpoint, function(document){
						return $http.get('/api/v2013/documents/' +  document.identifier)
					});
					$q.all(checkpoints)
					.then(function(results){
						 _.each(results, function(result){
							_.each(result.data.contactsToInform, function(contacts){
								   $scope.emailList.push({identifier:contacts.identifier})
							 });
						});
					});
				}
				if(document.government){
					var government =  document.government.identifier;
					var query = "/api/v2013/index/select?fl=id,identifier_s,schema_s,title_t,department_EN_t,description_EN_t,email_ss,"+
					"+organization_EN_t,telephone_s,type_ss,fax_ss,government_CEN_s,addressCountry_s&q=(realm_ss:" + realm.value.toLowerCase() +
					"+AND+NOT+version_s:*+AND+schema_s:focalPoint+AND+(type_ss:NP-FP+OR+type_ss:ABS-FP)+AND+(government_s:" + government + "))&rows=50";

					$http.get(query).success(function(res) {
						angular.forEach(res.response.docs, function(nfp){
								$scope.emailList.push(
										{
											header	: {identifier:nfp.identifier_s},
											type:'person',
											firstName:nfp.title_t,
											addressHTML:{en:nfp.description_EN_t.replace(/\n/g, '<br/>')},
											country: nfp.addressCountry_s,
											phones:[nfp.telephone_s],
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
