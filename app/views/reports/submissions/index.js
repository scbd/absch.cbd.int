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
export default ['$scope', '$location', '$timeout', 'searchService', 'solr', 'translationService', 'breadcrumbs', 'roleService',
	function ($scope, $location, $timeout, searchService, solr, translationService, breadcrumbs, roleService){

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
		const tags = ['introduction', 'notification', activeNotification];
		$scope.adminTags = tags;
		console.log($scope.adminTags);
		// if($route.current.params.code)
		// 	tags.push(encodeURIComponent($route.current.params.code));
		
		let match = { "adminTags" : { $all: tags}};

		ag.push({"$match"   : match });
		ag.push({"$project" : { title:1, content:1, coverImage:1}});
		ag.push({"$limit"   : 1 });

		$scope.articleQuery = { ag : JSON.stringify(ag) };;
	}
	$scope.onArticleLoad = function(article){
		if(!article && !roleService.isUserInRoles(['oasisArticleEditor', 'Administrator'])){
			$scope.articleQuery = undefined;
			return;
		}
		$scope.isLoading = false;
	}

	$scope.$on('evt:onLeftMenuFilterUpdate', (evt, leftMenuFilters)=>{
		console.log(leftMenuFilters);
		let selectedNotification
		if(leftMenuFilters?.submission.length){
			const notificationFilter = leftMenuFilters.submission.find(f=>f.field=="notifications_ss");
			selectedNotification = notificationFilter?.selectedItems?.identifier
			$location.search({notification:selectedNotification})
			breadcrumbs.options = {'notification_label': selectedNotification };
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
		console.log('hie')
		if($location.search().notification){
			const notificationFilter = leftMenuFilters.submission.find(f=>f.field=="notifications_ss");
			notificationFilter.selectedItems = { identifier: $location.search().notification}
			$scope.$emit( 'evt:updateLeftMenuFilters', leftMenuFilters );
		}
	})
}];




	