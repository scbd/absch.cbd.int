'use strict';

window.name = 'NG_DEFER_BOOTSTRAP!';

require.config({
    'paths': {
        'angular'                   : '../libs/angular/angular.min',
        'angular-route'             : '../libs/angular-route/angular-route.min',
        'angular-cookies'           : '../libs/angular-cookies/angular-cookies.min',
        'angular-sanitize'          : '../libs/angular-sanitize/angular-sanitize.min',
        'css'                       : '../libs/require-css/css.min',
        'text'                      : '../libs/requirejs-text/text',
        'shim'                      : '../libs/require-shim/src/shim',
        'linqjs'                    : '../libs/linqjs/linq',
        'angular-localizer'         :'../libs/ngLocalizer/localizer',
        'async'                     : '../libs/requirejs-plugins/src/async',
        'domReady'                  : '../libs/requirejs-domready/domReady',
        'bootstrap-datepicker'      : '../libs/bootstrap-datepicker/js/bootstrap-datepicker',
        'angular-loading-bar'       : '../libs/angular-loading-bar/src/loading-bar',
        'bootbox'                   : '../libs/bootbox/bootbox',
        'jquery'                    : '../libs/jquery/dist/jquery.min',
        'bootstrap'                 : '../libs/bootstrap/dist/js/bootstrap.min',
        'underscore'                : '../libs/underscore/underscore-min',
        'lodash'                    : '../libs/lodash/lodash',
        'moment'                    : '../libs/momentjs/min/moment-with-langs.min',
        'angular-animate'           : '../libs/angular-animate/angular-animate.min',
        'view-abs-checkpoint'       :'../views/forms/view/view-abs-checkpoint.directive',
        'introjs'                   : '../libs/intro.js/minified/intro.min',
        'angular-introjs'           : '../js/directives/angular-intro',
        'jqvmap'                    : '../libs/jqvmap/jqvmap/jquery.vmap.min',
        'jqvmapworld'               : '../js/jquery.vmap.world_update',
        'text-angular-sanitize'     : '../libs/textAngular/dist/textAngular-sanitize.min',
        'text-angular'              : '../libs/textAngular/dist/textAngular.min',
        'cbd-forums'                : '../libs/cbd-forums/cbd-forums',
        'angular-flex'              : '../libs/angular-flex/angular-flex',
        'ng-breadcrumbs'            : '../libs/ng-breadcrumbs/dist/ng-breadcrumbs.min',
        'ionsound'                  : '../libs/ionsound/js/ion.sound.min',
        'scbd-angularjs-services'   : '../libs/scbd-angularjs-services/scbd-services',
        'scbd-angularjs-filters'    : '../libs/scbd-angularjs-services/filters/scbd-filters',
        'scbd-angularjs-controls'   : '../libs/scbd-angularjs-controls/scbd-controls',
        'ngAria'                    : '../libs/angular-aria/angular-aria.min',
        'ngMaterial'                : '../libs/angular-material/angular-material.min',
        'ngSmoothScroll'            : '../libs/ngSmoothScroll/angular-smooth-scroll.min',
        'joyRide'                   : '../libs/joyRide/jquery.joyride-2.1',
        'angular-message'           : '../libs/angular-messages/angular-messages.min',
        'toastr'                    : '../libs/angular-toastr/dist/angular-toastr.tpls.min',
        'ngStorage'                 : '../libs/ngstorage/ngStorage.min',
        'angular-block-ui'          :  '../libs/angular-block-ui/dist/angular-block-ui.min',
        'ngDialog'                  :  '../libs/ng-dialog/js/ngDialog.min',
        'socket.io'             : '../libs/socket.io-1.4.5/index'
    },
    'shim': {
        'angular'                       : { 'deps': ['jquery'], 'exports': 'angular' },
        'angular-route'                 : { 'deps': ['angular'] },
        'angular-cookies'               : { 'deps': ['angular'] },
        'angular-sanitize'              : { 'deps': ['angular'] },
        'bootstrap'                     : { 'deps': ['jquery'] },
        'bootstrap-datepicker'          : { 'deps': ['jquery'] },
        'underscore'                    : { 'exports': '_' },
        'angular-animate'               : { 'deps': ['angular']},
        'angular-loading-bar'           : { 'deps': ['angular']},
        'introjs'                       : { 'exports': 'introJs'},
        'angular-introjs'               : { 'deps':['angular', 'introjs']},
        'angular-localizer'             : { 'deps':['angular']},
        'bootbox'                       : { 'deps':['bootstrap', 'jquery']},
        'jqvmap'                        : { 'deps': ['jquery'] },
        'text-angular'                  : { 'deps': ['text-angular-sanitize', 'angular'] },
        'text-angular-sanitize'         : { 'deps': ['angular', 'angular-sanitize']},
        'cbd-forums'                    : { 'deps': ['angular', 'bootstrap']},
        'ngStorage'                     : { 'deps': ['angular'] },
        'angular-flex'                  : { 'deps': ['angular'] },
        'ng-breadcrumbs'                : { 'deps': ['angular'] },
        'scbd-angularjs-services'       : { 'deps': ['angular']},
        'scbd-angularjs-filters'        : { 'deps': ['angular']},
        'scbd-angularjs-controls'       : { 'deps': ['angular', 'angular-sanitize', 'angular-localizer']},
        'ngAria'                        : { 'deps': ['angular'] },
        'ngMaterial'                    : { 'deps': ['angular', 'angular-animate', 'ngAria'] },
        'toastr'                        : { 'deps': ['angular', 'angular-animate', 'ngAria'] },
        'angular-message'               : { 'deps': ['angular'] },
        'angular-block-ui'              : { 'deps': ['angular'] },
        'ngDialog'                      : { deps: ['angular', 'css!../libs/ng-dialog/css/ngDialog.min', 'css!../libs/ng-dialog/css/ngDialog-theme-default.css'] },
    },
    packages: [
        { name: 'scbd-branding'          , location : '../libs/scbd-branding' },
        { name: 'scbd-angularjs-services', location : '../libs/scbd-angularjs-services/services' },
        { name: 'scbd-angularjs-filters',  location : '../libs/scbd-angularjs-services/filters' },
        { name: 'scbd-map',                location : '../libs/scbd-map' },
        { name: 'ammap', main: 'ammap',    location : '../libs/ammap3/ammap' }
    ]
});

require(['angular-flex', 'angular-route', 'angular-cookies',  'bootstrap', 'domReady'
    /*, 'main'*/], function (ng) {
    // NOTE: place operations that need to initialize prior to app start here using the `run` function on the top-level module

    require(['domReady!', 'main'], function (document) {
        ng.bootstrap(document, ['app']);
        try {
        ng.resumeBootstrap();
        } catch(err) {
          console.log('err', err);
        }
    });
});
