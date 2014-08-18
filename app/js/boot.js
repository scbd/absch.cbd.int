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
        'jquery'          : '../libs/jquery/jquery.min',
        'bootstrap'       : '../libs/bootstrap/dist/js/bootstrap.min',
        'underscore'      : '../libs/underscore/underscore',
        'linqjs'          : '../libs/linqjs/linq',
        'moment'          : '../libs/momentjs/min/moment-with-langs.min',
        'bootstrap-datepicker'  : '../libs/bootstrap-datepicker/js/bootstrap-datepicker',
        'angular-loading-bar'   : '../libs/angular-loading-bar/src/loading-bar',
        'angular-animate'       : '../libs/angular-animate/angular-animate.min',
        'view-abs-checkpoint':'../views/forms/view/view-abs-checkpoint.directive',
        'introjs'         : '../libs/intro.js/intro',
        'angular-introjs' : '../js/directives/angular-intro',
        'angular-form-controls': '../libs/angular_form_controls/form-controls',
        'bootbox'              :'../libs/bootbox/bootbox'
    },
    'shim': {
        'angular'        : { 'deps': ['jquery'], 'exports': 'angular' },
        'angular-route'  : { 'deps': ['angular'] },
        'angular-cookies': { 'deps': ['angular'] },
        'angular-sanitize': { 'deps': ['angular'] },
        'bootstrap'      : { 'deps': ['jquery'] },
        'bootstrap-datepicker' : { 'deps': ['jquery'] },
        'underscore'     : { 'exports': '_' },
        'angular-animate' : {'deps': ['angular']},
        'angular-loading-bar' : {'deps': ['angular']},
        'introjs'         : {'exports': 'introJs'},
        'angular-introjs' : {'deps':['angular', 'introjs']},
        'angular-localizer': {'deps':['angular']},
        'angular-form-controls' : {'deps': ['angular', 'angular-sanitize', 'angular-localizer']},
        'bootbox'     : {'deps':['bootstrap', 'jquery']},
    }
});

require(['angular', 'angular-route', 'angular-cookies', 'angular-sanitize', 'bootstrap', 'domReady',
    'bootstrap-datepicker','angular-loading-bar', 'angular-animate',
    'moment', 'introjs', 'angular-form-controls'/*, 'main'*/], function (ng) {
    // NOTE: place operations that need to initialize prior to app start here using the `run` function on the top-level module

    require(['domReady!', 'main', 'angular-introjs'], function (document) {
        ng.bootstrap(document, ['app']);
        try {
        ng.resumeBootstrap();
        } catch(err) {
          console.log('err', err);
        }
    });
});
