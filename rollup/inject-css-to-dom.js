import path from 'path'
import crypto  from 'crypto';

export default function injectCssToDom(options = {}) {

  const injectable = []
  const cssPluginTag = /^css!/; 
  const cssExtension = /\.css$/; 

  return {
    name: 'injectCss',

    resolveId(importeeId, importer) {

      let   updatedId = importeeId;
      let   isCss     = false;

      if(cssPluginTag.test(importeeId)) {
        updatedId = importeeId.replace(cssPluginTag, '');
        isCss     = true;
      }

      if(cssExtension.test(importeeId)) {
        isCss = true;
      }

      if(!isCss) return null;

      if(isOverHttp(updatedId)) {// link to URL => let RequireJS handle it for now
        return {id: importeeId, external: true};
      }

      if(!cssExtension.test(importeeId)) {
        console.warn("css!", "missing file extension (.css)", importeeId, "->", importer);
      }


      return this.resolve(updatedId, importer, { skipSelf: true }).then((resolved) => {

   //     console.log("css", importeeId, resolved);
        if(!resolved)          return { id: updatedId }
        if(resolved.external)  return null;
        if(isOverHttp(resolved.id)) return { id: `css!${resolved.id}`, external: true}
        
        injectable.push(resolved.id)

        return resolved;
      });      
    },

    transform(css, id) {

      if(!cssExtension.test(id))
        return null;

      try {
        const parsed = JSON.stringify(css);
        return {
          code: generateCode(css, id),
          map: { mappings: '' }
        };
      } catch (err) {
        const message = 'Error generating CSS injection code';
        this.warn({ message });
        return null;
      }
    }
  };
}

function isOverHttp(url) {
  try { 
    const parsedUrl = new URL(url)
    return /^https?:$/i.test(parsedUrl?.protocol || ''); // valid if we can parse it
  }
  catch {
    return false;
  }
}

function generateCode(css, importeeId) {

  const filename = path.basename(importeeId);
  const id       = `css-inject-${crypto.createHash('md5').update(css).digest('hex')}`;

  const code = `
  (function(document) {
    var id = ${JSON.stringify(id)};

    if(document.getElementById(id)) return;

    var head  = document.getElementsByTagName('head')[0];
    var style = document.createElement('style'); 
    style.type = "text/css";
    style.id = id;
    style.innerHTML = ${JSON.stringify(css)}
    style.setAttribute("filename", ${JSON.stringify(filename)});
    head.appendChild(style);
  })(document);`.trim();

  return code;
}
