define(['app','underscore', './about-directives',  './common-formats-directive',
, './guides-directive'], 
function (app, _) {
// , './search-content',
    var videos = {
            countryProfile  : '6eDBShJMWfI',
            searchMatrix    : 'IwyrMQKDZ3o',
            searchSearch    : 'YaX_llUfBts',
            searchUid       : '78pRh1LbDj4',
            searchReport    : 'wOe4hUt66K4',
            newAccount      : 'nAHFkAJZt1w',
            oldAccount      : 'IqoVH8IVsvI',
            forgotPassword  : 'hv7Kgx0bjdc',
            userManagement  : 'sBYKAuS6TBA',
            dashboard       : 's6xLer37R5M',
            notification    : 'nYHA8yuTx5c',
            emailAlerts     : 'DjRtgYxyeJg',
            helpdesk        : 'yiASMdKJY8A',

    };
    app.directive('ngYoutubeVideoImageEmbed', function(){
      return {
        link : function(scope, elem, attrs){

            if(attrs.video){
              var id = videos[attrs.video.replace('videos.', '')]
              elem.css('background-image', 'url(https://img.youtube.com/vi/' + id + '/sddefault.jpg)');

              // Overlay the Play icon to make it look like a video player
              elem.append($('<div/>', {'class': 'play'}));

              elem.bind('click', function() {
                  // Create an iFrame with autoplay set to true
                  var iframe_url = "https://www.youtube.com/embed/" + id + "?autoplay=1&autohide=1";
                  if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

                  // The height and width of the iFrame should be the same as parent
                  var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })

                  // Replace the YouTube thumbnail with YouTube HTML5 Player
                  elem.replaceWith(iframe);
              });
            }
        }
      }
    })
    app.controller("AboutNewController",
      ["$rootScope", "$scope", "$q", "underscore",'$http','commonjs','smoothScroll', '$element', '$timeout', '$location',
      function ($rootScope, $scope, $q, _, $http, commonjs, smoothScroll, $element, $timeout, $location) {
        
        $timeout(function(){
          $(window).scroll(function() {
              var googleMap = $('#divGoogleMap');
              if (!googleMap.attr('data-src') && googleMap.offset().top < ($(window).scrollTop() + $(window).height()-200) ) {
                  googleMap.attr('data-src', 'yes');
                  googleMap.append('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.405203808206!2d-73.56230188405428!3d45.5019211389461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a5a2bfa0705%3A0xa17357fa5e55d6ad!2sSecretariat+of+the+Convention+on+Biological+Diversity!5e0!3m2!1sen!2sca!4v1480355468112"'+
                        ' width="100%" height="380" frameborder="0" style="border:0" allowfullscreen class="thumbnail"></iframe>')
              }
          })
        }, 1500)

        $element.find('#nav').affix({
            offset: {     
            top: $element.find('#nav').offset().top,
            bottom: ($('footer').outerHeight(true) + $('.application').outerHeight(true)) + 200
            }
        });
        
        $element.find(".sidenav a").on('click', navigate);
        $element.find(".sidenav").on('click', 'a', navigate);
        function navigate(event) {

            if (this.hash !== "") {
              var hash = this.hash;
              $('html, body').animate({
                scrollTop: $(hash).offset().top
              }, 800);
            } 
        }
        $scope.$on('$locationChangeStart', function(evt, nextUrl){     
          if(nextUrl.indexOf('/about-new#')>0)
            evt.preventDefault();
        });

        $timeout(function(){$scope.ready = true;
          var hash = $location.$$absUrl.split('#');
          if(hash.length>1 && $('#'+hash[1])){
              $('html, body').animate({
                scrollTop: $('#'+hash[1]).offset().top
              }, 800);
          }
        }, 500)

        $scope.$on('$destroy', function(){
          $(window).unbind('scroll');
        })
    }]);
});
