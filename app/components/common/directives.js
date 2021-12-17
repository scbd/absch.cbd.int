Vue.directive("translation-url", (el, binding, vnode) => {

    if (!vnode.data && !vnode.data.attrs && !binding.value) return;
    let attrs = vnode.data.attrs;
    const baseUrl = binding.value;
    let lastPath ="";
    const langRegex = new RegExp('^\/(ar|en|es|fr|ru|zh)(\/|$)');
    let startWithRegex = new RegExp('^\/');
    let startWithAPIRegex = new RegExp('^\/api\/v20');

    if (lastPath != attrs.href && !langRegex.test(attrs.href) && !startWithAPIRegex.test(attrs.href)
        && startWithRegex.test(attrs.href)) {
        lastPath = `/${baseUrl}/${attrs.href.replace(/^\//, '')}`;
        el.setAttribute('href',lastPath);
      };
})