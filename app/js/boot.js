'use strict';

window.name = 'NG_DEFER_BOOTSTRAP!';

require.config({
    'paths': {
        'angular'         : '../libs/angular/angular.min',
        'angular-route'   : '../libs/angular-route/angular-route.min',
        'angular-cookies' : '../libs/angular-cookies/angular-cookies.min',
        'angular-sanitize': '../libs/angular-sanitize/angular-sanitize.min',
        'angular-localizer':'../libs/ngLocalizer/localizer',
        'async'           : '../libs/requirejs-plugins/src/async',
        'domReady'        : '../libs/requirejs-domready/domReady',
        'jquery'          : '../libs/jquery/dist/jquery.min',
        'bootstrap'       : '../libs/bootstrap/dist/js/bootstrap.min',
        'underscore'      : '../libs/underscore/underscore',
        'linqjs'          : '../libs/linqjs/linq',
        'moment'          : '../libs/momentjs/min/moment-with-langs.min',
        'bootstrap-datepicker'  : '../libs/bootstrap-datepicker/js/bootstrap-datepicker',
        'angular-loading-bar'   : '../libs/angular-loading-bar/src/loading-bar',
        'angular-animate'       : '../libs/angular-animate/angular-animate.min',
        'view-abs-checkpoint'   :'../views/forms/view/view-abs-checkpoint.directive',
        'introjs'               : '../libs/intro.js/intro',
        'angular-introjs'       : '../js/directives/angular-intro',
        'bootbox'               : '../libs/bootbox/bootbox',
        'jqvmap'                : '../libs/jqvmap/jqvmap/jquery.vmap.min',
        'jqvmapworld'           : '../js/jquery.vmap.world_update',
        'text-angular-sanitize' : '../libs/textAngular/dist/textAngular-sanitize.min',
        'text-angular'          : '../libs/textAngular/dist/textAngular.min',
        'cbd-forums'            : '../libs/cbd-forums/cbd-forums',
        'angular-storage'       : '../libs/angular-local-storage/dist/angular-local-storage.min',
        'angular-flex'          : '../libs/angular-flex/angular-flex',
        'ng-breadcrumbs'        : '../libs/ng-breadcrumbs/dist/ng-breadcrumbs',
        'ionsound'              : '../libs/ionsound/js/ion.sound',
        'scbd-angularjs-services'         : '../libs/scbd-angularjs-services/scbd-services',
        'scbd-angularjs-filters'          : '../libs/scbd-angularjs-services/scbd-filters',
        'scbd-angularjs-controls'         : '../libs/scbd-angularjs-controls/scbd-controls'
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
        'jqvmapworld'                   : { 'deps': ['jqvmap'] },
        'text-angular'                  : { 'deps': ['text-angular-sanitize', 'angular'] },
        'text-angular-sanitize'         : { 'deps': ['angular', 'angular-sanitize']},
        'cbd-forums'                    : { 'deps': ['angular', 'bootstrap']},
        'angular-storage'               : { 'deps': ['angular'] },
        'angular-flex'                  : { 'deps': ['angular'] },
        'ng-breadcrumbs'                : { 'deps': ['angular'] },
        'scbd-angularjs-services'       : { 'deps': ['angular']},
        'scbd-angularjs-filters'        : { 'deps': ['angular']},
        'scbd-angularjs-controls'       : { 'deps': ['angular', 'angular-sanitize', 'angular-localizer']},
    }
});

require(['angular-flex', 'angular-route', 'angular-cookies',  'bootstrap', 'domReady',
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
