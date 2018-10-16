define(['app', 'underscore', 'services/role-service',
		'./left-menu', './about-directives'
	],
	function (app, _) {
		app.controller("guidesController", ["$scope", "$route",'roleService', '$timeout', '$q', '$http', '$element',
			function ($scope, $route, roleService, $timeout, $q, $http, $element) {

				$scope.status   = "loading";
                $scope.error    = null;
                
                $scope.guideId = $route.current.params.id;

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
					ag.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1, "tags":1, "customTags": 1}});
					
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
				

			}
		]);
	});
