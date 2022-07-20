import app from '~/app';
import _ from 'lodash';
import '~/services/main';
import './ircc-directive';
import 'css!/app/css/print-friendly.css';
import 'css!/app/css/abs/pdf-communique.css';

import printHeaderTemplate from 'text!../forms/view/print-header.html';
import printFooterTemplate from 'text!../forms/view/print-footer.html';

	app.run(function($templateCache){
		$templateCache.put('view-print-header.html', printHeaderTemplate)
		$templateCache.put('view-print-footer.html', printFooterTemplate)
	});

	export { default as template } from './checkpoint-communique.html';
export default ['$scope','$http','$sce','$filter','$q', '$routeParams', 'realm',
	 function($scope,$http, $sce, $filter, $q, $routeParams, realm) {

		var sLocale      = "en";
		$scope.locale = sLocale;
		$scope.realm = realm;
		var params = {};
		params.identifier = $routeParams.documentId;
		if (params.identifier && /^absch/.test(params.identifier.toLowerCase())){
			var docNum = params.identifier.split('-');
			if (docNum.length == 5) {
				params.identifier = docNum[3]+'@'+docNum[4]
			}
		}

		var document = 			$http.get('/api/v2013/documents/' +  encodeURIComponent(params.identifier), { });
		var documentInfo = 		$http.get('/api/v2013/documents/' +  encodeURIComponent(params.identifier) + '?info', { });

		$q.all([document,documentInfo]).then(function(result){

				$scope.document = result[0].data;
				$scope.documentInfo = result[1].data;
				$scope.realm = $scope.documentInfo.Realm;

				var documentVersion=	$http.get('/api/v2013/documents/'+encodeURIComponent($scope.document.header.identifier)+'/versions?body=true&cache=true')
				var qs = { q 	: { "identifier": $scope.document.header.identifier+"@"+$scope.documentInfo.revision }, fo 	: 1 }
				var emailRecipients = $http.get('/api/v2018/abs-certificate-receivers', { params: qs});

				$q.all([documentVersion, emailRecipients])
				.then(function(data){
					$scope.documentVersion = data[0].data;
					$scope.emailList = _.map(_.uniq(data[1].data.recipients), function(doc){return {identifier: doc}});
				})
		});

		$scope.renderHtml = function(html_code)
		{
			return $sce.trustAsHtml($filter("lstring")(html_code,sLocale));
		};

		function getContacts(document, realm){

			$scope.emailList = [];
			if(document.absIRCCs){

					var permits = _.map(document.absIRCCs, function(document){
						return $http.get('/api/v2013/documents/' + encodeURIComponent(document.identifier))
					});
					$q.all(permits)
					.then(function(results){
						_.forEach(results, function(result){
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
				var queryUrl = "/api/v2013/index/select"
						
						var qs = {
							fl	: "id,identifier_s",
							q	: "(realm_ss:" + realm.toLowerCase() + " AND NOT version_s:* AND schema_s:authority AND (government_s:(" + country.join(' ') + ")))",
							rows: 50
						}
				$http.get(queryUrl, { params: qs}).then(function(res) {
					angular.forEach(res.data.response.docs, function(cna){
						if(!_.some($scope.emailList, {identifier:cna.identifier_s}))
								$scope.emailList.push({identifier: cna.identifier_s});
					});
				});

				
				var queryUrl = "/api/v2013/index/select";
				var qs = {
					fl	: "id,identifier_s,schema_s,title_t,department_EN_t,description_EN_t,email_ss,organization_EN_t,telephone_ss,type_ss,fax_ss,government_CEN_s,addressCountry_s",
					q	: "(realm_ss:" + realm.toLowerCase() + " AND NOT version_s:* AND schema_s:focalPoint AND (government_s:(" + country.join(' ') + ")))",
					rows: 50
				}
				$http.get(queryUrl, { params: qs}).then(function(res) {
					angular.forEach(res.data.response.docs, function(nfp){
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
			if(document.absCheckpoints){
				var checkpoints = _.map(document.absCheckpoints, function(document){
					return $http.get('/api/v2013/documents/' +  encodeURIComponent(document.identifier))
				});
				$q.all(checkpoints)
				.then(function(results){
					_.forEach(results, function(result){
						_.forEach(result.data.contactsToInform, function(contacts){
							if(!_.some($scope.emailList, {identifier:contacts.identifier}))
									$scope.emailList.push({identifier:contacts.identifier})
						});
					});
				});
			}
			
		}

	}];



