
// var (not const): cbd-events re-runs this script on each article visit, and a
// top-level const would throw "already declared" on the second run.
// Prefer the script element that is executing now, so a page loading both the
// CHM and ABSCH/BCH widgets.js gives each run its own origin.
var defaultOrigin = scriptOrigin(document.currentScript) || findOrigin() || 'https://absch.cbddev.xyz';

function embedIFrame(widget, options){

    if(!options.src)
        return;
        
    var iframe = document.createElement('iframe');
    
    iframe.setAttribute('name', Math.floor((1 + Math.random()) * 0x10000).toString(16));
    iframe.setAttribute('src', `${options.src}&iframe=${iframe.name}`);
    iframe.setAttribute('width', options.width||'100%');
    iframe.setAttribute('height', options.height||500);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('data-scbd-widget', '');

    widget.parentNode.replaceChild(iframe, widget);

    // One listener per window, however many iframes or script runs.
    if(!window.scbdChWidgetMessageListener){
        window.scbdChWidgetMessageListener = onWidgetMessage;
        window.addEventListener('message', onWidgetMessage);
    }
}

function onWidgetMessage(evt){
    if(!isTrustedOrigin(evt.origin) || !evt.data || typeof evt.data != 'string')
        return;

    var data;
    try { data = JSON.parse(evt.data); } catch (e) { return; }
    if(!data || data.type != 'setClientHeight')
        return;

    const iframe = [...document.querySelectorAll('iframe[data-scbd-widget]')]
                    .find(e=>e.name == data.iframe && e.contentWindow == evt.source);
    // the message must come from the iframe's own provider origin
    if(!iframe || scriptOrigin(iframe) != evt.origin)
        return;

    iframe.setAttribute('height', data.height ? (data.height+20) : iframe.height);
}

function isTrustedOrigin(value){
    try {
        const url = new URL(value);
        return /^https?:$/.test(url.protocol) &&
            (/\.cbd\.int$/i.test(url.hostname) || /\.cbddev\.xyz$/i.test(url.hostname) || url.hostname == 'localhost');
    } catch (e) {
        return false;
    }
}

function scriptOrigin(element){
    if(!element || !element.src)
        return;
    try {
        const url = new URL(element.src);
        return isTrustedOrigin(url.origin) ? url.origin : undefined;
    } catch (e) {
        return undefined;
    }
}

// A placeholder with a data-url from a trusted clearing-house belongs to that
// provider, whichever widgets.js happens to process it.
function widgetOrigin(widget, fallback){
    if(widget.dataset.url){
        try {
            const urlOrigin = new URL(widget.dataset.url).origin;
            if(isTrustedOrigin(urlOrigin))
                return urlOrigin;
        } catch (e) {
            // invalid URL: handled by initWidget
        }
    }
    return fallback;
}

function embedRecord(){
    // if(!id)id, options
    //     return; widget.dataset

    var widgetInfo;
    widgetInfo = [...document.getElementsByClassName('scbd-ch-embed')];
    for (var key in widgetInfo) {
        if (Object.hasOwnProperty.call(widgetInfo, key)) {
            const widget = widgetInfo[key];                
            if(widget.dataset.type == 'record' && widget.dataset.recordId){            
                var iframeSrc = `${defaultOrigin}/database/${widget.dataset.recordId}?embed=true`
                var width = getAttributeValue(widget, 'width') || '100%';
                var height = getAttributeValue(widget, 'height') || '500';
                
                var options = {
                    src : iframeSrc,
                    width : width,
                    height: height
                }
                embedIFrame(widget, options)
            }
        }
    }

}

function embedCountryProfile(code, options){

}

function embedSearchResult(searchKey, options){

}

function getAttributeValue(widget, attribute){

    if(widget.attributes[attribute])
        return widget.attributes[attribute].value;
    else if(widget.dataset[attribute])
        return widget.dataset[attribute];
}
function onReady(callbackFunc) {

    if (document.readyState !== 'loading') {//already loaded
        callbackFunc();
    } else if (document.addEventListener) {//modern browser
        document.addEventListener('DOMContentLoaded', callbackFunc);
    } else {//old IE
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'complete') {
                callbackFunc();
            }
        });
    }
}

function initWidget(runOrigin){
    const widgets = findScbdWidgets();
    
    for (var key in widgets) {
        if (Object.hasOwnProperty.call(widgets, key)) {
            const widget = widgets[key];   
            const origin = widgetOrigin(widget, runOrigin);
            const locale = widget.dataset.locale || 'en'        
            if(widget.dataset.accessKey || widget.dataset.legacySchema || widget.dataset.legacyCountries || widget.dataset.url){            

                var width = getAttributeValue(widget, 'width')   || '100%';
                var height = getAttributeValue(widget, 'height') || '500';
                var type = getAttributeValue(widget, 'type')   || 'chm-document';
                
                let iframeSrc = `${origin}/${locale}/share/embed/${type}`
                if(widget.dataset.url){
                    try {
                        const dataUrl = new URL(widget.dataset.url);
                        if(dataUrl.origin == origin){
                            const safeParams = new URLSearchParams();
                            safeParams.set('embed', 'true');
                            
                            // Safely pass through query parameters
                            for (const [key, value] of dataUrl.searchParams) {
                                // Filter out dangerous protocols and HTML injection attempts
                                if (/javascript:|data:|vbscript:/i.test(value) || /[<>]/.test(key) || /[<>]/.test(value)) {
                                    continue; 
                                }
                                // Ensure we don't accidentally overwrite the embed flag
                                if (key.toLowerCase() !== 'embed') {
                                    safeParams.append(key, value);
                                }
                            }

                            // Clean leading slashes from pathname to avoid double-slashes in the final URL
                            const cleanPathname = dataUrl.pathname.replace(/^\/+/, '');
                            iframeSrc = `${origin}/${cleanPathname}?${safeParams.toString()}`;
                        }
                        else {
                            embedIFrame(widget, {src: `${origin}/app/assets/param-missing.html`});
                            continue;
                        }
                    } catch (e) {
                        // URL is invalid
                        embedIFrame(widget, {src: `${origin}/app/assets/param-missing.html`});
                        continue;
                    }
                }
                else if(widget.dataset.accessKey)
                    iframeSrc += `/${widget.dataset.accessKey}?embed=true`;
                else if(widget.dataset.legacySchema || widget.dataset.legacyCountries || widget.dataset.legacyRegions){
                    iframeSrc += `/legacy-widget?embed=true`

                    if(widget.dataset.legacySchema){
                        var schemas = widget.dataset.legacySchema.split(/;|,|\s/)
                        iframeSrc += `&schema=${schemas.join('&schema=')}`;
                    }
                    if(widget.dataset.legacyCountries){
                        var countries = widget.dataset.legacyCountries.split(/;|,|\s/)
                        iframeSrc += `&country=${countries.join('&country=')}`;
                    }
                    if(widget.dataset.legacyRegions){
                        var regions = widget.dataset.legacyRegions.split(/;|,|\s/)
                        iframeSrc += `&region=${regions.join('&region=')}`;
                    }
                }
                var options = {
                    src : iframeSrc,
                    width : width,
                    height: height
                }
                embedIFrame(widget, options)
            }
            else{
                embedIFrame(widget, {src: `${origin}/app/assets/param-missing.html`})
            }
        }
    }
}

function findScbdWidgets(className){
    className = className || ['scbd-chm-embed']
    const widgetElements = className.map(e=>{
                                return [...document.getElementsByClassName(e)];
                            });
    
    return widgetElements.flat();
}


function findOrigin(){
    var scripts = document.getElementsByTagName('script');

    for (let i = 0; i < scripts.length; i++) {
        const element = scripts[i];
        if(element.src){
            const url = new URL(element.src)       
            if(/\/widgets\.js/.test(url.pathname) && (/\.cbd\.int/.test(url.host) || 
                            /\.cbddev\.xyz/.test(url.host) ||  /localhost:2010/.test(url.host))){
                return url.origin;
            }
        }
    }
}

// window.scbdChEmbed = {
//     embedRecord,
//     embedCountryProfile,
//     embedSearchResult
// }
onReady(function(){ initWidget(defaultOrigin); });
    