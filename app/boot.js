'use strict';

if(/Safari/.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent)) { console.log = function(){}; }
var cdnHost = 'https://cdn.cbd.int/';
var nameToUrl = require.s.contexts._.nameToUrl;

require.config({
    waitSeconds: 120,
    baseUrl : '/app/',
    'paths': {
        'angular'                   : cdnHost + 'angular@1.7.4/angular.min',
        'angular-route'             : cdnHost + 'angular-route@1.7.4/angular-route.min',
        'angular-cookies'           : cdnHost + 'angular-cookies@1.7.4/angular-cookies.min',
        'angular-sanitize'          : cdnHost + 'angular-sanitize@1.7.4/angular-sanitize.min',
        'angular-animate'           : cdnHost + 'angular-animate@1.7.4/angular-animate.min',
        'css'                       : cdnHost + 'require-css@0.1.8/css.min',
        'text'                      : cdnHost + 'requirejs-text@2.0.15/text',
        'json'                      : cdnHost + 'requirejs-plugins@1.0.2/src/json',
        'linqjs'                    : cdnHost + 'linq@3.0.5/linq.min',
        'async'                     : cdnHost + 'requirejs-text@1.0.2/lib/async',
        'domReady'                  : cdnHost + 'requirejs-domready@2.0.1/domReady',
        'bootstrap-datepicker'      : cdnHost + 'bootstrap-datepicker@1.8.0/js/bootstrap-datepicker',
        'datepicker-range'          : cdnHost + 'daterangepicker@3.0.5/daterangepicker',
        'jquery'                    : cdnHost + 'jquery@2.2.4/dist/jquery.min',
        'bootstrap'                 : cdnHost + 'bootstrap@3.3.0/dist/js/bootstrap.min',
        'underscore'                : cdnHost + 'underscore@1.7.0/underscore-min',
        'lodash'                    : cdnHost + 'lodash@3.10.1/index',
        'moment'                    : cdnHost + 'moment@2.9.0/min/moment-with-locales.min',
        'ng-breadcrumbs'            : cdnHost + 'angular-breadcrumbs@0.5.3/dist/ng-breadcrumbs.min',
        'ngSmoothScroll'            : cdnHost + 'ngSmoothScroll@2.0.1/dist/angular-smooth-scroll.min',
        'angular-joyride'           : cdnHost + 'angular-joyride@1.0.2/dist/joyride',
        'toastr'                    : cdnHost + 'angular-toastr@1.5.0/dist/angular-toastr.tpls.min',
        'ngStorage'                 : cdnHost + 'ngstorage@0.3.11/ngStorage.min',
        'ngDialog'                  : cdnHost + 'ng-dialog@1.4.0/js/ngDialog',
        'ngInfiniteScroll'          : cdnHost + 'ng-infinite-scroll@1.3.0/build/ng-infinite-scroll.min',  
        'tableexport'               : cdnHost + 'tableexport@5.2.0/dist/js/tableexport',
        'blobjs'                    : cdnHost + 'blobjs@1.1.1/Blob.min',
        'file-saverjs'              : cdnHost + 'file-saverjs@1.3.6/FileSaver.min',
        'xlsx'                      : cdnHost + 'xlsx@0.14.0/dist/xlsx',
        'jszip'                     : cdnHost + 'xlsx@0.14.0/dist/jszip',
        'webui-popover'             : cdnHost + 'webui-popover@1.2.18/dist/jquery.webui-popover.min',
        'chart-js'                  : cdnHost + 'chart.js@1.1.1/Chart.min',
        'printThis'                 : cdnHost + 'print-this@1.9.0/printThis',
        'diacritics'                : cdnHost + 'diacritic@0.0.2//diacritics',
        'pdfjs-dist/build/pdf'      : cdnHost + 'pdfjs-dist@2.0.489/build/pdf.min',
       'pdfjs-dist/build/pdf.worker': cdnHost + 'pdfjs-dist@2.0.489/build/pdf.worker.min ',       
        'pdf-object'                : cdnHost + 'pdfobject@2.0.201604172/pdfobject.min',
        'angular-trix'              : cdnHost + 'angular-trix@1.0.2/dist/angular-trix.min',
        'trix'                      : cdnHost + 'trix@0.12.0/dist/trix',
        'ngMeta'                    : cdnHost + 'ng-meta@1.0.3/dist/ngMeta.min',
        'angular-loggly-logger'     : cdnHost + '@scbd/angular-loggly-logger@0.3.3/angular-loggly-logger.min',
        'drag-and-drop'             : cdnHost + 'angular-drag-and-drop-lists@2.1.0/angular-drag-and-drop-lists.min',
        'angucomplete-alt'          : cdnHost + 'angucomplete-alt@3.0.0/angucomplete-alt',
        'angular-cache'             : cdnHost + 'angular-cache@4.6.0/dist/angular-cache.min',

        'jquery-ui'                 : cdnHost + 'jqueryui@1.11.1/jquery-ui.min',
        'pivottable'                : cdnHost + 'pivottable@2.23.0/dist/pivot.min',
        'plotly-renderers'          : cdnHost + 'pivottable@2.23.0/dist/plotly_renderers',

        'socket.io'                 :           'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min',
        'cbd-forums'                :           'libs/cbd-forums/cbd-forums',
        'shim'                      :           'libs/require-shim/src/shim',
        'angular-localizer'         :           'libs/angular-localizer/localizer',
        'view-abs-checkpoint'       :           'views/forms/view/abs/view-abs-checkpoint.directive', 
        'angular-flex'              :           'libs/angular-flex/angular-flex'            
    },
    'shim': {
        'angular'                       : { 'deps': ['jquery'], 'exports': 'angular' },
        'angular-route'                 : { 'deps': ['angular'] },
        'angular-cookies'               : { 'deps': ['angular'] },
        'angular-sanitize'              : { 'deps': ['angular'] },
        'bootstrap'                     : { 'deps': ['jquery', 'jquery-ui'] },
        'bootstrap-datepicker'          : { 'deps': ['jquery'] },
        'datepicker-range'              : { 'deps': ['jquery', 'css!'+cdnHost+'daterangepicker@3.0.5/daterangepicker.css'] },   
        'underscore'                    : { 'exports': '_' },
        'angular-animate'               : { 'deps': ['angular']},
        'angular-localizer'             : { 'deps':['angular', 'angular-cookies']},
        'ngStorage'                     : { 'deps': ['angular'] },
        'ngInfiniteScroll'              : { 'deps': ['angular'] },
        'ng-breadcrumbs'                : { 'deps': ['angular'] },
        'ngSmoothScroll'                : { 'deps': ['angular'] },
        'angular-flex'                  : { 'deps': ['angular'] },
        'angular-joyride'               : { 'deps': ['angular', 'angular-animate', 'css!'+cdnHost+'angular-joyride@1.0.2/dist/joyride.css'] },
        'cbd-forums'                    : { 'deps': ['angular', 'bootstrap']},
        'scbd-angularjs-services'       : { 'deps': ['angular']},
        'scbd-angularjs-filters'        : { 'deps': ['angular']},
        'scbd-angularjs-controls'       : { 'deps': ['angular', 'angular-sanitize', 'angular-localizer']},
        'toastr'                        : { 'deps': ['angular', 'angular-animate'] },
        'ngDialog'                      : { 'deps': ['angular', 'css!'+cdnHost+'ng-dialog@1.4.0/css/ngDialog.min', 'css!'+cdnHost+'ng-dialog@1.4.0/css/ngDialog-theme-default.css'] },
        'angular-loggly-logger'         : { 'deps': ['angular'] },
        'webui-popover'                 : { 'deps': ['jquery', 'css!'+cdnHost + 'webui-popover@1.2.18/dist/jquery.webui-popover.min']},
        'chart-js'                      : { 'deps': ['angular', 'jquery'] },
        'jspdf'                         : { exports : 'jsPDF' },
        'xlsx'                          : { 'deps': ['jszip'],'exports': 'XLSX'},
        'pdfjs-dist/build/pdf'          : { 'deps': ['angular']}, 
        'pdf-object'                    : { 'deps': ['angular']}  ,
        'angular-trix'                  : { 'deps': ['angular', 'trix', 'css!'+cdnHost+'trix@0.12.0/dist/trix.css']},
        'trix'                          : { 'deps': ['angular']},
        'diacritics'                    : { 'deps': ['angular']},
        'ngMeta'                        : { 'deps': ['angular']},
        'drag-and-drop'                 : { 'deps': ['angular']},
        'angucomplete-alt'              : { 'deps': ['angular', 'css!'+cdnHost+'angucomplete-alt@3.0.0/angucomplete-alt.css']},
        'angular-cache'                 : { 'deps' : ['angular'] },

        'pivottable'                    : { 'deps': ['jquery', 'jquery-ui', 'angular', 'css!'+cdnHost+'pivottable@2.23.0/dist/pivot.min.css']},
        'plotly-renderers'              : { 'deps': ['jquery', 'jquery-ui', 'plotly.js']},
        
    },
    urlArgs: function(id, url){
        
        if(!window.scbdApp.version || window.scbdApp.version === '-')
            return '';

        if(url.indexOf('worldEUHigh.js')>0)
            return '';
            
        if(/^\//.test(url))            
            return (url.indexOf('?') === -1 ? '?' : '&') + 'v=' + window.scbdApp.version;

        return '';
    }
});

require.s.contexts._.nameToUrl = function (moduleName, ext, skipExt) {

    var url = nameToUrl(moduleName, ext, skipExt);
    if(/^\//.test(url) && (url.indexOf('.html')>0 || url.indexOf('.json')>0)) {
            url = '/'+window.scbdApp.lang + url;
    }

    return url;
}

define('plotly.js', [cdnHost + 'plotly.js-basic-dist-min@1.57.1/plotly-basic.min'], function(Plotly){
    return Plotly;
});

if(window.scbdApp.template)
    require([window.scbdApp.template])
