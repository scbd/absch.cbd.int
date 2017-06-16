define(['app', 'text!./left-menu.html', './search-content.js'],
    function (app, template) {

        app.directive("leftMenu", ['$timeout', '$location', function ($timeout, $location) {
            return {
                restrict: "EAC",
                template: template,
                link: function (scope, elem, attrs) {
                    $timeout(function () {
                        scope.ready = true;

                        if (attrs.navigateOnClick) {
                            $timeout(function () {
                                $('.search-results').on('click', 'a', function (e) {
                                    var anchor = $(this)
                                    var targetElement = $(anchor.attr('href'))
                                    console.log(anchor);
                                    $('html body').animate({
                                        scrollTop: targetElement.parent().offset().top
                                    }, 500);
                                });
                            }, 500)


                            scope.$on('$locationChangeStart', function (evt, nextUrl, current) {
                                console.log($location.path(), current)
                                var currentUrlParser = document.createElement('a');
                                var nextUrlParser = document.createElement('a');
                                currentUrlParser.href = current;
                                nextUrlParser.href = nextUrl;
                                
                                if (currentUrlParser.pathname == nextUrlParser.pathname
                                     && nextUrl.indexOf($location.path()+'#') > 0)
                                    evt.preventDefault();
                            });

                        }
                    }, 500)
                }
            }
        }]);

    });
