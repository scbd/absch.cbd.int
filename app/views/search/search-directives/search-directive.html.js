define(['app', '/app/js/common.js', '/app/services/thesaurus-service.js',
'/app/views/search/search-directives/left-menu-directive.html.js'], function (app) {


    app.directive('searchDirective', function () {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/search/search-directives/search-directive.html',
            //replace: true,
            scope: {
            },
            link: function ($scope, element, attrs) {
            },
            controller: ['$scope', '$element', 'thesaurusService', 'realm',
                function ($scope, $element, thesaurusService, realm) {

                    this.actions = {
                        query : query
                    };

                    var lastRunQuery = '';
                    function query(query){

                        if(lastRunQuery!= query){
                            console.log(query);
                        }
                    }



                }]
        }

    });
});
