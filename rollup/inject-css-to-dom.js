export default function injectCssToDom(options = {}) {

  const injectable = ['a']
  const cssPluginTag = /^css!/; 

  return {
    name: 'injectCss',

    resolveId(importeeId, importer) {

      if(!cssPluginTag.test(importeeId)) return null;

      const updatedId = importeeId.replace(cssPluginTag, '');

      if(isUrl(updatedId)) {// link to URL => let RequireJS handle it for now
        return {id: importeeId, external: true};
      }

      return this.resolve(updatedId, importer, { skipSelf: true }).then((resolved) => {
        if(!resolved)          return { id: updatedId }
        if(resolved.external)  return null;
        if(isUrl(resolved.id)) return { id: `css!${resolved.id}`, external: true}
        
        injectable.push(resolved.id)

        return resolved;
      });      
    },

    transform(css, id) {
      if (!injectable.includes(id)) return null;

      try {
        const parsed = JSON.stringify(css);
        return {
          code: generateCode(css),
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

function isUrl(url) {
  try { 
    return !!(new URL(url)); // valid if we can parse it
  }
  catch {
    return false;
  }
}

function generateCode(css) {
  var code = `
  ((document)=>{
    const head  = document.getElementsByTagName('head')[0];
    const style = document.createElement('style'); 
    style.innerHTML = ${JSON.stringify(css)}
    head.appendChild(style)
  })(document);`.trim();

  return code;
}
