'use strict';

if(/Safari/.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent)) { console.log = function(){}; }

require.config({
    waitSeconds: 120,
    baseUrl : (window.lang||'')+'app/',
    'paths': {
        'angular'                   : 'libs/angular/angular.min',
        'angular-route'             : 'libs/angular-route/angular-route.min',
        'angular-cookies'           : 'libs/angular-cookies/angular-cookies.min',
        'angular-sanitize'          : 'libs/angular-sanitize/angular-sanitize.min',
        'css'                       : 'libs/require-css/css.min',
        'text'                      : 'libs/requirejs-text/text',
        'json'                      : 'libs/requirejs-plugins/src/json',
        'shim'                      : 'libs/require-shim/src/shim',
        'linqjs'                    : 'libs/linqjs/linq',
        'angular-localizer'         : 'libs/ngLocalizer/localizer',
        'async'                     : 'libs/requirejs-plugins/src/async',
        'domReady'                  : 'libs/requirejs-domready/domReady',
        'bootstrap-datepicker'      : 'libs/bootstrap-datepicker/js/bootstrap-datepicker',
        'angular-loading-bar'       : 'libs/angular-loading-bar/src/loading-bar',
        'jquery'                    : 'libs/jquery/dist/jquery.min',
        'bootstrap'                 : 'libs/bootstrap/dist/js/bootstrap.min',
        'underscore'                : 'libs/underscore/underscore-min',
        'lodash'                    : 'libs/lodash/lodash.min',
        'moment'                    : 'libs/momentjs/min/moment-with-langs.min',
        'angular-animate'           : 'libs/angular-animate/angular-animate.min',
        'view-abs-checkpoint'       : 'views/forms/view/abs/view-abs-checkpoint.directive',
        'text-angular-sanitize'     : 'libs/textAngular/dist/textAngular-sanitize.min',
        'text-angular'              : 'libs/textAngular/src/textAngular',
        'cbd-forums'                : 'libs/cbd-forums/cbd-forums',
        'angular-flex'              : 'libs/angular-flex/angular-flex',
        'ng-breadcrumbs'            : 'libs/ng-breadcrumbs/dist/ng-breadcrumbs.min',
        'ionsound'                  : 'libs/ionsound/js/ion.sound.min',        
        'ngAria'                    : 'libs/angular-aria/angular-aria.min',
        'ngMaterial'                : 'libs/angular-material/angular-material.min',
        'ngSmoothScroll'            : 'libs/ngSmoothScroll/angular-smooth-scroll.min',
        'angular-joyride'           : 'libs/angular-joyride/dist/joyride',
        'toastr'                    : 'libs/angular-toastr/dist/angular-toastr.tpls.min',
        'ngStorage'                 : 'libs/ngstorage/ngStorage.min',
        'angular-block-ui'          : 'libs/angular-block-ui/dist/angular-block-ui.min',
        'ngDialog'                  : 'libs/ng-dialog/js/ngDialog.min',
        'socket.io'                 : 'libs/socket.io-1.4.5/index',
        'ngInfiniteScroll'          : 'libs/ngInfiniteScroll/build/ng-infinite-scroll',
        'angular-loggly-logger'     : 'libs/angular-loggly-logger/angular-loggly-logger',        
        "tableexport"               : "libs/tableexport.js/dist/js/tableexport",
        "blobjs"                    : "libs/blobjs/Blob",
        "file-saverjs"              : "libs/file-saverjs/FileSaver",
        "xlsx"                      : "libs/js-xlsx/dist/xlsx",
        "jszip"                     : "libs/js-xlsx/dist/jszip",
        'angular-gravatar'          : 'libs/angular-gravatar/build/angular-gravatar',
        'angular-google-analytics'  : 'libs/angulartics-google-analytics/dist/angulartics-ga.min',
        'angular-angulartics'       : 'libs/angulartics/dist/angulartics.min',
        'webui-popover'             : 'libs/webui-popover/dist/jquery.webui-popover.min',
        'chart-js'                  : 'libs/Chart.js/Chart',
        "printThis"                 : 'libs/printThis/printThis',
        'jquery-highlight'          : 'libs/jquery-highlight/jquery.highlight',
        'lunr'                      : 'libs/lunr.js/lunr',
        'diacritics'                : 'libs/diacritic/diacritics',
        'pdfjs-dist/build/pdf'      : 'views/psd-viewer/pdfjs/pdf',
        'pdfjs-dist/build/pdf.worker' : 'views/psd-viewer/pdfjs/build/pdf.worker',        
        'pdf-object'                 : 'libs/pdfobject/pdfobject',
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
        'angular-localizer'             : { 'deps':['angular', 'angular-cookies']},
        'jqvmap'                        : { 'deps': ['jquery'] },
        'text-angular'                  : { 'deps': ['text-angular-sanitize', 'angular'] },
        'text-angular-sanitize'         : { 'deps': ['angular', 'angular-sanitize']},
        'cbd-forums'                    : { 'deps': ['angular', 'bootstrap']},
        'ngStorage'                     : { 'deps': ['angular'] },
        'ngInfiniteScroll'              : { 'deps': ['angular'] },
        'angular-flex'                  : { 'deps': ['angular'] },
        'ng-breadcrumbs'                : { 'deps': ['angular'] },
        'ngSmoothScroll'                : { 'deps': ['angular'] },
        'angular-joyride'               : { 'deps': ['angular', 'angular-animate'] },
        'scbd-angularjs-services'       : { 'deps': ['angular']},
        'scbd-angularjs-filters'        : { 'deps': ['angular']},
        'scbd-angularjs-controls'       : { 'deps': ['angular', 'angular-sanitize', 'angular-localizer']},
        'ngAria'                        : { 'deps': ['angular'] },
        'ngMaterial'                    : { 'deps': ['angular', 'angular-animate', 'ngAria'] },
        'toastr'                        : { 'deps': ['angular', 'angular-animate', 'ngAria'] },
        'angular-block-ui'              : { 'deps': ['angular'] },
        'ngDialog'                      : { 'deps': ['angular', 'css!libs/ng-dialog/css/ngDialog.min', 'css!libs/ng-dialog/css/ngDialog-theme-default.css'] },
        'angular-loggly-logger'         : { 'deps': ['angular'] },
        'angular-gravatar'              : { 'deps': ['angular']}, 
        'angular-angulartics'           : { 'deps': ['angular']} ,
        'angular-google-analytics'      : { 'deps': ['angular', 'angular-angulartics']},
        'webui-popover'                 : { 'deps': ['jquery', 'css!libs/webui-popover/dist/jquery.webui-popover.min']},
        'chart-js'                      : { 'deps': ['angular', 'jquery'] },
        "jspdf"                         : { exports : "jsPDF" },
        'jquery-highlight'              : { 'deps': ['jquery'] },
        'lunr'                          : { 'deps': ['jquery'] },
        "xlsx"                          : { "deps": ['jszip'],"exports": 'XLSX'},
        'pdfjs-dist/build/pdf'          : { 'deps': ['angular']}, 
        'pdf-object'                    : { 'deps': ['angular']}  
    },
    urlArgs: function(id, url){
        
        if(url.indexOf('worldEUHigh.js')>0)
            return '';
        
        return (url.indexOf('?') === -1 ? '?' : '&') + 'v=' + window.appVersion
    }
});

define("_slaask", window._slaask);

//==================================================
// Protect window.console method calls, e.g. console is not defined on IE
// unless dev tools are open, and IE doesn't define console.debug
//==================================================
(function fixIEConsole() { 'use strict';

    if (!window.console) {
        window.console = {};
    }

    var methods = ["log", "info", "warn", "error", "debug", "trace", "dir", "group","groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd", "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"];
    var noop    = function() {};

    for(var i = 0; i < methods.length; i++) {
        if (!window.console[methods[i]])
            window.console[methods[i]] = noop;
    }
})();
