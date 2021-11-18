export default {
    methods: {
        async loadKbCategories(isBch){
            if(!isBch) {
                const { categories } = await import('~/app-data/abs/kb-categories.js');
                return categories;
            }
            else {
                const { categories } = await import('~/app-data/bch/kb-categories.js');
                return categories;
            }
        },
        getUrl(title, id, tag){
            const urlTitle = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
            if(title && id){
                return `/kb/tags/${encodeURIComponent(tag)}/${encodeURIComponent(urlTitle)}/${encodeURIComponent(id)}`;
            } else if (title && !id) {
                return `/kb/tags/${encodeURIComponent(tag)}/${encodeURIComponent(urlTitle)}`;
            } else if (!title && !id) {
                return `kb/tags/${encodeURIComponent( tag )}`;
            }
        },
    }
}
