define(['app', 'lodash',
    'components/scbd-angularjs-services/services/locale',
    'components/scbd-angularjs-services/filters/scbd-filters',
    'services/articles-service',
    'css!/app/css/print-friendly.css', 'css!/app/css/pdf-ircc.css'
], function (app, _) {

    app.controller("aboutPDF",
        ["$scope", "$route", "$location", "locale", '$location', 'articlesService', '$q',
            function ($scope, $route, $location, locale, $location, articlesService, $q) {

                loadLinks();

                $scope.articles= [];

                //---------------------------------------------------------------------
                function loadLinks() {
                    articlesService.getArticle("5be4b1828a5b94000193d1e9").then(function (data) {

                        var parser = new DOMParser();
                        var htmlDoc = parser.parseFromString(data.content.en, 'text/html');
                        var links = htmlDoc.getElementsByTagName('a');
                        var tag;

                        var queries = _.compact(_.map(links, function(link){
                            tag = link.href.replace("http://localhost:2010/pdf-templates/about/", "");

                            if(tag && !tag.includes("http:") && !tag.includes("https:")){
                                return loadArticles(tag);
                            }
                        }))
                        $q.all(queries).then(function(data){
                            $scope.articles = data;
                            console.log(data)
                        })
                    })
                }

                //---------------------------------------------------------------------
                function loadArticles(tag, i) {
                    var ag = [];
                    ag.push({ "$match": { "$and": [{ "adminTags.title.en": encodeURIComponent(tag) }] } });
                    ag.push({ "$match": { "$and": [{ "adminTags.title.en": encodeURIComponent('ABSCH-About') }] } });
                    ag.push({ "$project": { "title": 1, "content": 1, "coverImage": 1, "meta": 1, "adminTags": 1, "customTags": 1, "tags": 1 } });
                   
                    var qs = {
                        "ag": JSON.stringify(ag)
                    };

                    return articlesService.getArticles(qs).then(function(data){
                        return (data || [])[0]
                    });
                }
            }
        ]);

});
