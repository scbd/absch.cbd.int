'use strict';

window.name = "NG_DEFER_BOOTSTRAP!";

require.config({
    'paths': {
        'angular'         : '../libs/angular/angular',
        'angular-route'   : '../libs/angular-route/angular-route',
        'async'           : '../libs/requirejs-plugins/src/async',
        'domReady'        : '../libs/requirejs-domready/domReady',
        'jquery'          : '../libs/jquery/jquery',
        'bootstrap'       : '../libs/bootstrap/dist/js/bootstrap',
        'underscore'      : '../libs/underscore/underscore',
        'linqjs'          : '../libs/linqjs/linq'
    },
    'shim': { 
        'angular'       : { 'deps': ['jquery'], 'exports': 'angular' },
        'angular-route' : { 'deps': ['angular'] },
        'bootstrap'     : { 'deps': ['jquery'] },
        'underscore'    : { 'exports' : '_'}
    }
});

require(['angular', 'angular-route', 'bootstrap', 'domReady'/*, 'main'*/], function (ng) {

    // NOTE: place operations that need to initialize prior to app start here using the `run` function on the top-level module

    require(['domReady!', 'main'], function (document) {
        ng.bootstrap(document, ['app']); 
        ng.resumeBootstrap();
    });
});

