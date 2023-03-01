import app from '~/app';
import _ from 'lodash';
import '~/services/main'; ;
import submissionsOnNotificationsT from '~/app-text/views/reports/submissions/submissions-to-notifications.json';
import { default as countdown } from 'scbd-common-countdown';
import { cbdArticle } from 'scbd-common-articles'
import Vue from 'Vue';
import '~/views/search/search-directive';
import '~/css/search.css';

export { default as template } from './index.html';
export default ['$scope', '$location', '$timeout', 'searchService', 'solr', 'translationService', 'breadcrumbs', 'roleService', 'realm',
	function ($scope, $location, $timeout, searchService, solr, translationService, breadcrumbs, roleService, realm){

	let activeNotification;
	translationService.set('submissionsOnNotificationsT', submissionsOnNotificationsT);   

	Vue.component('CbdArticle', cbdArticle);
	Vue.component('countdown', countdown);		
	
	function loadNotification(){
		if(activeNotification){
			buildQuery();

			const query = {
				query: `symbol_s:(${solr.escape(activeNotification)})`,
				fields: "id,identifier_s,title_s,acronym_s,reference_s, symbol_s, uniqueIdentifier_s,schema:schema_s"
			};
			searchService.list(query).then(function(data){
				$scope.notification  = data.data.response.docs[0];
			});
		}
	}
	function buildQuery(){
		let ag   = [];
		let match = {}		
		const tags = ['bch', 'introduction', 'notification', activeNotification];
		$scope.adminTags = tags;
		match.adminTags = { $all: tags};

		const search = $location.search();
		if(activeNotification == '2023-007'){
			if(search.para && [7, 8].includes(search.para))
				match.adminTags.$all.push(`para${search.para}`);
			else{
				match.adminTags.$nin = ['para7', 'para8'] 
			}
		}	

		ag.push({"$match"   : match });
		ag.push({"$project" : { title:1, content:1, coverImage:1}});
		ag.push({"$limit"   : 1 });

		$scope.articleQuery = { ag : JSON.stringify(ag) };
	}
	$scope.onArticleLoad = function(article){
		$scope.isLoading = false;
		if(!article && !roleService.isUserInRoles(['oasisArticleEditor', 'Administrator'])){
			$scope.articleQuery = undefined;
			return;
		}
	}

	$scope.$on('evt:onLeftMenuFilterUpdate', (evt, leftMenuFilters)=>{
		let selectedNotification
		if(leftMenuFilters?.submission.length){
			const notificationFilter = leftMenuFilters.submission.find(f=>f.field=="notifications_ss");
			selectedNotification = notificationFilter?.selectedItems?.identifier
			$location.search({notification:selectedNotification})
			breadcrumbs.options = {'notification_label': selectedNotification };

			if(!selectedNotification && $location.search().keyword)
				$location.search({keyword:undefined})
		}
		else 
			selectedNotification = undefined;

		if(selectedNotification!=activeNotification){
			activeNotification	= selectedNotification;
			$scope.articleQuery = undefined;
			$scope.notification = undefined;
			if(activeNotification)
				$timeout(loadNotification, 200);
		}
	});

	$scope.$on('evt:searchFiltersLoaded', (evt, { leftMenuFilters })=>{
		if($location.search().notification){
			const notificationFilter = leftMenuFilters.submission.find(f=>f.field=="notifications_ss");
			notificationFilter.selectedItems = { identifier: $location.search().notification}
			$scope.$emit( 'evt:updateLeftMenuFilters', leftMenuFilters );
		}
	})
}];




	