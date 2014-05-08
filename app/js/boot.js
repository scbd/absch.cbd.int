'use strict';

window.name = 'NG_DEFER_BOOTSTRAP!';

require.config({
    'paths': {
        'angular'         : '../libs/angular/angular',
        'angular-route'   : '../libs/angular-route/angular-route',
        'angular-cookies' : '../libs/angular-cookies/angular-cookies',
        'async'           : '../libs/requirejs-plugins/src/async',
        'domReady'        : '../libs/requirejs-domready/domReady',
        'jquery'          : '../libs/jquery/jquery',
        'bootstrap'       : '../libs/bootstrap/dist/js/bootstrap',
        'underscore'      : '../libs/underscore/underscore',
        'linqjs'          : '../libs/linqjs/linq',
        'moment'          : '../libs/momentjs/min/moment-with-langs.min',
        'bootstrap-datepicker'  : '../libs/bootstrap-datepicker/js/bootstrap-datepicker',
        'angular-loading-bar'   : '../libs/angular-loading-bar/src/loading-bar',
        'angular-animate'       : '../libs/angular-animate/angular-animate.min',
        'dragAndDrop'     : '../libs/angular-dragndrop/angular-dnd', 
    },
    'shim': {
        'angular'        : { 'deps': ['jquery'], 'exports': 'angular' },
        'angular-route'  : { 'deps': ['angular'] },
        'angular-cookies': { 'deps': ['angular'] },
        'bootstrap'      : { 'deps': ['jquery'] },
        'bootstrap-datepicker' : { 'deps': ['jquery'] },
        'underscore'     : { 'exports': '_' },
        'angular-animate' : {'deps': ['angular']},
        'angular-loading-bar' : {'deps': ['angular']},
        'dragAndDrop'     : {'deps':['angular']},
    }
});

require(['angular', 'angular-route', 'angular-cookies', 'bootstrap', 'domReady', 
    'bootstrap-datepicker','angular-loading-bar', 'angular-animate',
    'dragAndDrop','moment'/*, 'main'*/], function (ng) {

    // NOTE: place operations that need to initialize prior to app start here using the `run` function on the top-level module

    require(['domReady!', 'main'], function (document) {
        ng.bootstrap(document, ['app']);
        ng.resumeBootstrap();
    });
});

