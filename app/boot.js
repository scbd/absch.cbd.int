export const cdnUrl = 'https://cdn.jsdelivr.net/'

export const bundleUrls = {
    angularBundle : [ 
        'npm/jquery@2.2.4/dist/jquery.min.js',
        'npm/angular@1.7.4/angular.min.js',
        'gh/scbd/angular-flex/angular-flex.min.js',
        'npm/angular-route@1.7.4/angular-route.min.js',
        'npm/angular-cookies@1.7.4/angular-cookies.min.js',
        'npm/angular-sanitize@1.7.4/angular-sanitize.min.js',
        'npm/angular-animate@1.7.4/angular-animate.min.js',
        'npm/angular-cache@4.6.0/dist/angular-cache.min.js',
        'npm/jqueryui@1.11.1/jquery-ui.min.js',
        'npm/linq@3.0.5/linq.min.js',
        'npm/lodash@4.17.15/lodash.min.js',
        'npm/moment@2.9.0/min/moment-with-locales.min.js',
        'npm/requirejs@2.2.0/require.js'
    ].join(','),
    angularDependencies: [
        'npm/ngSmoothScroll@2.0.1/dist/angular-smooth-scroll.min.js',
        'npm/angular-breadcrumbs@0.5.3/dist/ng-breadcrumbs.min.js',
        'npm/angular-trix@1.0.2/dist/angular-trix.min.js',
        'npm/trix@0.12.0/dist/trix.js',
        'npm/angular-joyride@1.0.2/dist/joyride.min.js',
    ].join(','),
    initialCss: [
        'npm/bootstrap-datepicker@1.8.0/dist/css/bootstrap-datepicker.min.css',
        'npm/angular-toastr@1.5.0/dist/angular-toastr.min.css',
        'npm/daterangepicker@3.0.5/daterangepicker.min.css',
        'npm/angular-joyride@1.0.2/dist/joyride.min.css',
        'npm/ng-dialog@1.4.0/css/ngDialog.min.css', 
        'npm/ng-dialog@1.4.0/css/ngDialog-theme-default.min.css',
        'npm/webui-popover@1.2.18/dist/jquery.webui-popover.min.css',
        'npm/trix@0.12.0/dist/trix.min.css',
        'npm/angucomplete-alt@3.0.0/angucomplete-alt.min.css',
        'npm/pivottable@2.23.0/dist/pivot.min.css'        
    ].join(','),
}
export default function bootApp(window, require, defineX) {

    const cdnHost = cdnUrl+'npm/';
    const templateName = window.scbdApp.template;
    
    //SB    var nameToUrl = require.s.contexts._.nameToUrl;

    window.getHashFileName = function(url){

        console.trace("ROLLUP UPGRADE: To remove")

        return url;
        
        // ROLLUP UPGRADE: To remove vvv
        
        if(!window.hasHashUrl(url) && window.hashUrlsMapping && !/^http/.test(url)){
            var hashUrl = url.replace(/^\/(ar|en|es|fr|ru|zh)\/app\//, '')
                            .replace('/app/', '')
                            .replace(/\?.*/, '')
                            .replace(/\.json\.js$/, '.json')
                            //  .replace(/\.html\.js$/, '.html');
            var hashFileName = window.hashUrlsMapping[hashUrl];
            // console.log(hashFileName, url);
            if(hashFileName){
                var replaceName = hashFileName.replace(/\.[a-z0-9]+\.(js|html|html\.js|json|json\.js)$/i, '.$1')
                return url.replace(replaceName, hashFileName)
            }
            // console.log('getHashFileName', url)
        }
        return url;
    }

    window.hasHashUrl = (url)=>{

        console.trace("ROLLUP UPGRADE: To remove")

        return false;

        // ROLLUP UPGRADE: To remove vvv

        let hashFileRegex  = /-[a-z0-9]{8}\./i

        return hashFileRegex.test(url);
    }

    window.addAppVersionToUrl = (url, force)=>{

        // ROLLUP UPGRADE: To review vvv

        console.warn("ROLLUP UPGRADE: To review boot.js line 88", url)

        // if(!force && window.hasHashUrl(url))
        //     return url;

        if(/^\//.test(url))            
            return (url.indexOf('?') === -1 ? '?' : '&') + 'v=' + window.scbdApp.version;
            
        return url;
    }

    require.config({
        waitSeconds: 120,
        'paths': {
            'css'                       : cdnHost + 'require-css@0.1.8/css.min',
            'text'                      : cdnHost + 'requirejs-text@2.0.15/text',
            'json'                      : cdnHost + 'requirejs-plugins@1.0.2/src/json',
            'async'                     : cdnHost + 'requirejs-text@1.0.2/lib/async',
            'domReady'                  : cdnHost + 'requirejs-domready@2.0.1/domReady',

            'bootstrap-datepicker'      : cdnHost + 'bootstrap-datepicker@1.8.0/js/bootstrap-datepicker',
            'datepicker-range'          : cdnHost + 'daterangepicker@3.0.5/daterangepicker',
            'toastr'                    : cdnHost + 'angular-toastr@1.5.0/dist/angular-toastr.tpls.min',
            'ngStorage'                 : cdnHost + 'ngstorage@0.3.11/ngStorage.min',
            'ngDialog'                  : cdnHost + 'ng-dialog@1.4.0/js/ngDialog',
            'ngInfiniteScroll'          : cdnHost + 'ng-infinite-scroll@1.3.0/build/ng-infinite-scroll.min',
            'angular-loggly-logger'     : cdnHost + '@scbd/angular-loggly-logger@0.3.3/angular-loggly-logger.min',
            'webui-popover'             : cdnHost + 'webui-popover@1.2.18/dist/jquery.webui-popover.min',

            'tableexport'               : cdnHost + 'tableexport@5.2.0/dist/js/tableexport',
            'blobjs'                    : cdnHost + 'blobjs@1.1.1/Blob.min',
            'file-saverjs'              : cdnHost + 'file-saverjs@1.3.6/FileSaver.min',
            'xlsx'                      : cdnHost + 'xlsx@0.14.0/dist/xlsx',
            'jszip'                     : cdnHost + 'xlsx@0.14.0/dist/jszip',


            'chart-js'                  : cdnHost + 'chart.js@1.1.1/Chart.min',
            'printThis'                 : cdnHost + 'print-this@1.9.0/printThis',
            'diacritics'                : cdnHost + 'diacritic@0.0.2/diacritics',
            'pdfjs-dist/build/pdf'      : cdnHost + 'pdfjs-dist@2.0.489/build/pdf.min',
           'pdfjs-dist/build/pdf.worker': cdnHost + 'pdfjs-dist@2.0.489/build/pdf.worker.min ',       
            'pdf-object'                : cdnHost + 'pdfobject@2.0.201604172/pdfobject.min',
            
            
            'ngMeta'                    : cdnHost + 'ng-meta@1.0.3/dist/ngMeta.min',
            'drag-and-drop'             : cdnHost + 'angular-drag-and-drop-lists@2.1.0/angular-drag-and-drop-lists.min',
            'angucomplete-alt'          : cdnHost + 'angucomplete-alt@3.0.0/angucomplete-alt',

            
            'pivottable'                : cdnHost + 'pivottable@2.23.0/dist/pivot.min',
            'plotly-renderers'          : cdnHost + 'pivottable@2.23.0/dist/plotly_renderers',


            'angular-vue'               : cdnHost + '@scbd/angular-vue@3.1.0/dist/angular-vue.min',
            'angular-vue-plugins'       : cdnHost + '@scbd/angular-vue@3.1.0/dist/angular-vue-plugins.min',
            'ky'                        :           'libs/globals/ky',

            'socket.io'                 :           'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min',
            'cbd-forums'                :           'libs/cbd-forums/cbd-forums',
            'shim'                      :           'libs/require-shim/src/shim',
            
            'vue-i18n'                  : cdnHost +'vue-i18n@8.21.1/dist/vue-i18n.min',
            'axios'                     : `${cdnHost}axios@0.21.1/dist/axios.min`,
            'vue-pagination-2'          : `${cdnHost}vue-pagination-2@3.0.91/dist/vue-pagination-2.min`,


            'luxon'                     : `${cdnHost}luxon@1.25.0/build/amd/luxon`,
            'scbd-common-articles'      : `${cdnHost}@scbd/common@0.1.1/dist/components/articles/index.umd`,
            
        },
        'shim': {
            'bootstrap-datepicker'          : { 'deps': ['jquery'] },
            'datepicker-range'              : { 'deps': ['jquery', 'externalCss'] },  
            'ngStorage'                     : { 'deps': ['angular'] },
            'ngInfiniteScroll'              : { 'deps': ['angular'] },
            'cbd-forums'                    : { 'deps': ['angular', 'bootstrap']},
            'toastr'                        : { 'deps': ['angular', 'angular-animate'] },
            'ngDialog'                      : { 'deps': ['angular', 'externalCss'] },
            'angular-loggly-logger'         : { 'deps': ['angular'] },
            'webui-popover'                 : { 'deps': ['jquery', 'externalCss']},
            'chart-js'                      : { 'deps': ['angular', 'jquery'] },
            'jspdf'                         : { exports : 'jsPDF' },
            'xlsx'                          : { 'deps': ['jszip'],'exports': 'XLSX'},
            'pdfjs-dist/build/pdf'          : { 'deps': ['angular']}, 
            'pdf-object'                    : { 'deps': ['angular']}  ,
            'diacritics'                    : { 'deps': ['angular']},

            'ngMeta'                        : { 'deps': ['angular']},
            'drag-and-drop'                 : { 'deps': ['angular']},
            'angucomplete-alt'              : { 'deps': ['angular', 'externalCss']},

            'pivottable'                    : { 'deps': ['jquery', 'jquery-ui', 'angular', 'externalCss']},
            'plotly-renderers'              : { 'deps': ['jquery', 'jquery-ui', 'plotly.js']},

            'angular-vue'                   : { 'deps': ['angular-flex', 'vue'] },
            'vue-pagination-2'              : { 'deps': ['angular-vue'] }
            
        },
        urlArgs: function(id, url) {

            const hasHash  = (o)=> /-[a-f0-9]{8}$/i.test(o);
            const isAbsUrl = (o)=> /^https?:\/\//i.test(o);
        
            if(isAbsUrl(url)) return '';
            if(isAbsUrl(id))  return '';
            if(hasHash(id))   return '';
        
            const sep = url.indexOf('?') === -1 ? '?' : '&';
            return `${sep}v=${encodeURIComponent(window.scbdApp.version)}`;
        }
    });

    require.onError = function (err) {
        console.log(err.requireType);
        if (err.requireType === 'timeout') {
            alert('Timeout loading modules: ' + err.requireModules);
        }

        throw err;
    };

    defineX('ck-editor-css', [`css!${cdnHost}@scbd/ckeditor5-build-inline-full@35.0.0/build/content-style.css`]);
    defineX('plotly.js', [cdnHost + 'plotly.js-basic-dist-min@1.57.1/plotly-basic.min.js'], function(Plotly){
        return Plotly;
    });

    defineX('vue', ['Vue'], function(Vue){
        Vue.config.devtools = true;
        return Vue; 
    });    
    defineX('Vue', [cdnHost +'vue@2.7.10/dist/vue.min.js', 'vue-i18n'], function(Vue, i18n){
        window.Vue = Vue;
        window.VueI18n = i18n;

        window.Vue.use(window.VueI18n);

        return Vue;
    })

    defineX('realmConf', [`json!/api/v2018/realm-configurations/${(window.scbdApp.host||'')}`], function(realmConf){
        return realmConf;
    })

    const noop = ()=>warnImport
    const warnImport = ()=>{ console.warn('lib loaded in bundle, import not required!'); }

    defineX('angular'              , ['bootstrap'],() =>window.angular);
    defineX('angular-flex'         , ['angular'], (ng)=>{ warnImport(); return ng; });
    defineX('angular-route'        , ['angular'], (ng)=>{ warnImport(); return ng; });
    defineX('angular-cookies'      , ['angular'], (ng)=>{ warnImport(); return ng; });
    defineX('angular-sanitize'     , ['angular'], (ng)=>{ warnImport(); return ng; });
    defineX('angular-animate'      , ['angular'], (ng)=>{ warnImport(); return ng; });
    defineX('angular-cache'        , ['angular'], (ng)=>{ warnImport(); });
    
    defineX('angular-dependencies' , ['angular', `${cdnUrl}combine/${bundleUrls.angularDependencies}`], (ng)=>{ warnImport(); });
    defineX('ng-breadcrumbs'       , ['angular-dependencies'], ()=>{ warnImport(); });
    defineX('ngSmoothScroll'       , ['angular-dependencies'], ()=>{ warnImport(); });
    defineX('jquery-ui'       , ['angular-dependencies'], ()=>{ warnImport(); });
    defineX('angular-trix'    , ['angular-dependencies'], ()=>{ warnImport(); });
    defineX('trix'            , ['angular-dependencies'], ()=>{ warnImport(); });
   
    defineX('angular-joyride'            , ['angular-dependencies', 'externalCss'], ()=>{ warnImport(); });
                
    
    defineX('lodash',   [], ()=>window._);
    defineX('bootstrap',[cdnHost + 'bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js'], (boostrap)=>{ return boostrap;});
    defineX('moment',   [],()=>window.moment);
    defineX('jquery',   [],()=>window.$);
    defineX('linqjs' ,  [],()=>window.Enumerable);
// 
    defineX('externalCss', [], ()=>warnImport)
    defineX('slaask', ['https://cdn.slaask.com/chat.js'], function (chat_js) {
        return window._slaask;
    });

    if(templateName){
        import(`./templates/${templateName}/index.js`);
    }
    else {
        window.alert('Unable to load files from server: ' + `./templates/${templateName}/index.js`);
    }

    function removeParamFromUrl(url, param) {
        var urlParts = url.split('?'),
            preservedQueryParams = '';

        if (urlParts.length === 2) {
            preservedQueryParams = urlParts[1]
            .split('&')
            .filter(function(queryParam) {
                return !(queryParam === param || queryParam.indexOf(param + '=') === 0)
            })
            .join('&');
        }

        return urlParts[0] +  (preservedQueryParams && '?' + preservedQueryParams); 
    }

}
