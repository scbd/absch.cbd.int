
const origin = 'http://localhost:2010';//'https://absch.cbddev.xyz';

let iframeCommunicationReceived = false;
function embedIFrame(widget, options){

    if(!options.src)
        return;
        
    var iframe = document.createElement('iframe');
    console.log(widget);
    iframe.setAttribute('name', Math.floor((1 + Math.random()) * 0x10000).toString(16));
    iframe.setAttribute('src', options.src);
    iframe.setAttribute('width', options.width||300);
    iframe.setAttribute('height', options.height||500);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');

    widget.parentNode.replaceChild(iframe, widget);
    //TODO: no need to be inside loop
    registerIframeCommunication(iframe, {type:'getClientHeight', iframe:iframe.name});
    window.addEventListener('message', function(evt){
        console.log(evt);
        iframeCommunicationReceived = true;
        if(evt.data){
            var data = JSON.parse(evt.data);
            if(data.type == 'setClientHeight' && data.iframe == iframe.name){
                iframe.setAttribute('height', data.height||iframe.height);
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
                var width = getAttributeValue(widget, 'width') || '300';
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
            if(widget.dataset.accessKey){            
                var iframeSrc = `${origin}/embed/${widget.dataset.accessKey}?embed=true`
                var width = getAttributeValue(widget, 'width') || '300';
                var height = getAttributeValue(widget, 'height') || '500';
                
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
            iframe.contentWindow.postMessage(JSON.stringify(data), '*');//'http://absch-widget.cbddev.xyz:2010');  
            registerIframeCommunication(iframe, data)          
        }, 2000);
    }
}

// window.scbdChEmbed = {
//     embedRecord,
//     embedCountryProfile,
//     embedSearchResult
// }
onReady(initWidget);
    