define(['app','underscore','ngSmoothScroll',// 'ngScroll',
'scbd-angularjs-services','scbd-angularjs-filters','scbd-angularjs-controls'], function (app, _) {


app.directive('scrollSpy', function ($window) {
  return {
    restrict: 'A',
    controller: function ($scope) {
      $scope.spies = [];
      this.addSpy = function (spyObj) {
        console.log("addSpy");
        $scope.spies.push(spyObj);
      };
    },
    link: function (scope, elem, attrs) {
      var spyElems;
      spyElems = [];

      scope.$watchCollection('spies', function (spies) {
        var spy, _i, _len, _results;
        _results = [];

        for (_i = 0, _len = spies.length; _i < _len; _i++) {
          spy = spies[_i];

          if (spyElems[spy.id] == null) {
            _results.push(spyElems[spy.id] = elem.find('#' + spy.id));
          }
        }
        console.log(_results);
        
        
        return _results;
        
      });

      $($window).scroll(function () {
        var highlightSpy, pos, spy, _i, _len, _ref;
        highlightSpy = null;
        _ref = scope.spies;
        
        // cycle through `spy` elements to find which to highlight
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          spy = _ref[_i];
          spy.out();
          
          // catch case where a `spy` has id = ""
          if (spy.id == "") {
            continue;
          }
          
          // catch case where a `spy` does not have an associated `id` anchor
          if (spyElems[spy.id] === undefined) {
            continue;
          }
          
          if ((pos = spyElems[spy.id].offset().top) - $window.scrollY <= 0) {
            // the window has been scrolled past the top of a spy element
            spy.pos = pos;

            if (highlightSpy == null) {
              highlightSpy = spy;
            }
            if (highlightSpy.pos < spy.pos) {
              highlightSpy = spy;
            }
          }
        }

        // select the last `spy` if the scrollbar is at the bottom of the page
        if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
          spy.pos = pos;
          highlightSpy = spy;
        }        

        return highlightSpy != null ? highlightSpy["in"]() : void 0;
      });
    }
  };
});

app.directive('spy', function ($location, $anchorScroll) {
  return {
    restrict: "A",
    require: "^scrollSpy",
    link: function(scope, elem, attrs, affix) {
      elem.click(function () {
        scope.$apply(function() {
          $location.hash(attrs.spy);
          // $anchorScroll();
        });
      });

      if (attrs.spy != "") {
        affix.addSpy({
          id: attrs.spy,
          in: function() {
            elem.addClass('active');
            $('.sidenav li').has('.active').addClass('active');
          },
          out: function() {
            elem.removeClass('active');
            $('.sidenav li').not(':has(.active)').removeClass('active');
          }
        });
      }
    }
  };
});


app.controller("AboutNewController",
	["$rootScope", "$scope", "$q", "underscore",'$http','commonjs','smoothScroll', '$element', function ($rootScope, $scope, $q, _, $http, commonjs, smoothScroll, $element) {
     
     $('#nav').affix({
        offset: {     
        top: $('#nav').offset().top,
        bottom: ($('footer').outerHeight(true) + $('.application').outerHeight(true)) + 40
        }
     });
    
    $(".sidenav a").on('click', function(event) {

        if (this.hash !== "") {
          var hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800);
        } 
    });
   }]);
});
