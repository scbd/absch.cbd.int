
const origin = findOrigin() || 'https://absch.cbddev.xyz';

let iframeCommunicationReceived = false;
function embedIFrame(widget, options){

    if(!options.src)
        return;
        
    var iframe = document.createElement('iframe');
    
    iframe.setAttribute('name', Math.floor((1 + Math.random()) * 0x10000).toString(16));
    iframe.setAttribute('src', options.src);
    iframe.setAttribute('width', options.width||'100%');
    iframe.setAttribute('height', options.height||500);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');

    widget.parentNode.replaceChild(iframe, widget);
    //TODO: no need to be inside loop
    registerIframeCommunication(iframe, {type:'getClientHeight', iframe:iframe.name});
    window.addEventListener('message', function(evt){
        if(evt.origin != this.origin)
            return;
            
        iframeCommunicationReceived = true;
        if(evt.data){
            var data = JSON.parse(evt.data);
            if(data.type == 'setClientHeight' && data.iframe == iframe.name){
                // console.log(data.height);
                iframe.setAttribute('height', data.height ? (data.height+20) : iframe.height);
            }
        }
    })
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
                var iframeSrc = `${origin}/database/${widget.dataset.recordId}?embed=true`
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

function initWidget(){
    const widgets = findScbdWidgets();
    
    for (var key in widgets) {
        if (Object.hasOwnProperty.call(widgets, key)) {
            const widget = widgets[key];   
            const locale = widget.dataset.locale || 'en'        
            if(widget.dataset.accessKey || widget.dataset.legacySchema || widget.dataset.legacyCountries){            

                var width = getAttributeValue(widget, 'width')   || '100%';
                var height = getAttributeValue(widget, 'height') || '500';
                var type = getAttributeValue(widget, 'type')   || 'chm-document';
                
                let iframeSrc = `${origin}/${locale}/share/embed/${type}`
                if(widget.dataset.accessKey)
                    iframeSrc += `/${widget.dataset.accessKey}?embed=true`;
                else if(widget.dataset.legacySchema || widget.dataset.legacyCountries){
                    iframeSrc += `/legacy-widget?embed=true`

                    if(widget.dataset.legacySchema){
                        var schemas = widget.dataset.legacySchema.split(/;|,|\s/)
                        iframeSrc += `&schema=${schemas.join('&schema=')}`;
                    }
                    if(widget.dataset.legacyCountries){
                        var countries = widget.dataset.legacyCountries.split(/;|,|\s/)
                        iframeSrc += `&country=${countries.join('&country=')}`;
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

function registerIframeCommunication(iframe, data){
    if(!iframeCommunicationReceived){
        setTimeout(function(){
            iframe.contentWindow.postMessage(JSON.stringify(data), origin);//'http://absch-widget.cbddev.xyz:2010');  
            registerIframeCommunication(iframe, data)          
        }, 2000);
    }
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
onReady(initWidget);
    