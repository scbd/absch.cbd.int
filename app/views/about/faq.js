define(['app', 'underscore', 'services/role-service',
		'./left-menu', './about-directives', '/components/scbd-angularjs-services/services/locale'
	],
	function (app, _) {
		app.controller("faqController", ["$scope", "$route",'roleService', '$timeout', '$q', '$http', '$element', 'locale',
			function ($scope, $route, roleService, $timeout, $q, $http, $element, locale) {

				$scope.status   = "loading";
				$scope.error    = null;
				$scope.category = "";
				$scope.searchText="";

				var id = $route.current.params.id;
			
				if (id) 
					loadArticle(id);
				else
					loadArticles("ABSCH-FAQs");

				//---------------------------------------------------------------------
				$scope.toggleCategory = function(tag){
					if ($scope.category == tag)
						$scope.category="" 
					else 
						$scope.category=tag;
				}
				//---------------------------------------------------------------------
				function loadArticle(id){
					$q.when($http.get('https://api.cbd.int/api/v2017/articles/' + id))
					.then(function(results){
						$scope.article = results.data;
					})
				}
				//---------------------------------------------------------------------
				function loadArticles(tag){
					var ag = [];
					ag.push({"$match":{"$and":[{"customTags.title.en":encodeURIComponent(tag)}]}});
					ag.push({"$project" : {["title."+ locale]:1, "content":1, "coverImage":1, "meta":1, "tags":1, "customTags": 1}});
					
					var qs = {
					"ag" : JSON.stringify(ag)
					};

					$q.when($http.get('https://api.cbd.int/api/v2017/articles', {params: qs}))
					.then(function(results){
					if((results||{}).data && results.data.length > 0)
						$scope.articles = results.data;
					})
				}
				//---------------------------------------------------------------------
				$scope.getSizedImage = function(url, size){
					// return url;
					return url && url
					.replace(/attachments.cbd.int\//, '$&'+size+'/')
				}
				//---------------------------------------------------------------------
				$scope.loadArticle = function(id){
					$location.path('/articles/' + id );
				}

			}
		]);
	});
