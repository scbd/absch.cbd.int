/**
 * dev-error-overlay.js — rollup plugin (watch mode only)
 *
 * Prepends a self-executing client snippet to the main bundle. The snippet
 * polls the dev-watch HTTP server (port 35730) and renders a full-screen
 * overlay whenever TypeScript errors are present.
 *
 * The banner runs outside the AMD wrapper so it executes immediately on
 * script load, before RequireJS processes the module.
 */

const PORT = 35730

const CLIENT_SNIPPET = `(function(){
if(window.__devOverlayInit)return;
window.__devOverlayInit=true;
var PORT=${PORT},overlay=null;
function show(errors){
  if(!overlay){
    overlay=document.createElement('div');
    var s=overlay.style;
    s.cssText='position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.88);'+
      'color:#e8e8e8;font-family:monospace;padding:32px 40px;overflow:auto;box-sizing:border-box;';
    document.body.appendChild(overlay);
  }
  var btn=document.createElement('button');
  btn.textContent='dismiss';
  btn.style.cssText='background:none;border:1px solid #555;color:#aaa;padding:4px 12px;border-radius:4px;cursor:pointer;font-size:12px';
  btn.addEventListener('click',function(){overlay.remove();overlay=null;window.__devOverlayInit=false;});
  var hd=document.createElement('div');
  hd.style.cssText='display:flex;align-items:center;justify-content:space-between;margin-bottom:20px';
  var title=document.createElement('span');
  title.style.cssText='color:#ff6b6b;font-size:16px;font-weight:700;letter-spacing:.03em';
  title.innerHTML='&#9888; TypeScript error'+(errors.length>1?'s':'')+' ('+errors.length+')';
  hd.appendChild(title);hd.appendChild(btn);
  var wrap=document.createElement('div');
  wrap.style.cssText='max-width:960px;margin:0 auto';
  wrap.appendChild(hd);
  errors.forEach(function(e){
    var pre=document.createElement('pre');
    pre.style.cssText='background:#1a1a2e;border:1px solid rgba(255,107,107,.27);border-left:3px solid #ff6b6b;'+
      'border-radius:4px;padding:14px 16px;margin:0 0 10px;font-size:12.5px;line-height:1.6;'+
      'white-space:pre-wrap;word-break:break-all;overflow-x:auto';
    pre.textContent=e;
    wrap.appendChild(pre);
  });
  overlay.innerHTML='';
  overlay.appendChild(wrap);
}
function hide(){if(overlay){overlay.remove();overlay=null;}}
function connect(){
  var ws=new WebSocket('ws://localhost:'+PORT+'/dev-errors');
  ws.onmessage=function(e){
    var d=JSON.parse(e.data);
    if(d&&d.length){show(d);}else{hide();}
  };
  ws.onclose=function(){setTimeout(connect,2000);};
}
connect();
})();`

export default function devErrorOverlay () {
  return {
    name: 'dev-error-overlay',
    banner: () => CLIENT_SNIPPET
  }
}
