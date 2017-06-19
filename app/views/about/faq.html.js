define(['app', 'underscore', '/app/services/role-service.js',
		'./left-menu.js', './about-directives.js'
	],
	function (app, _) {
		app.controller("faqController", ["$scope", 'roleService', '$timeout', '$q', '$http',
			function ($scope, roleService, $timeout, $q, $http) {

				$q.when($http.get('/api/v2015/help-faqs'))
					.then(function (response) {
						
						$scope.faqs = _(response.data).reduce(function (memo, o) {
							_(o.tags).each(function (i) {
								memo[i] = memo[i] || [];
								memo[i].push(o);
							});
							return memo;
						}, {});

						$timeout(function(){
							$('.search-results').on('click', 'a', function(e){
								var anchor =$(this)
								var targetElement = $element.find(anchor.attr('href'))

								_.each($scope.faqs, function(faqs){
									_.each(faqs, function(faq){
										var title = faq.title.trim()
													.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '')
													.replace(/\s/g, '-');
										if('#'+title == anchor.attr('href')){
											faq.show = true;
										}
									})
								});
							});
						}, 500)

						// if($scope.isAdmin()){
						// 	require(['./faq-edit.js'], function(){});
						// }
					});

				$scope.isAdmin = function () {
					return roleService.isAbsAdministrator() ||
						roleService.isAdministrator()

				};
				
				$scope.getHref = function(text){
					return (text||'').replace(/\s/g,'-');
				}

			}
		]);
	});
