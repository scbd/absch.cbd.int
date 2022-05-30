

export default {
    methods: {
        async loadKbCategories(isBch){
            let categories
            if(!isBch) {
                categories = (await import('~/app-data/abs/kb-categories.js')).categories;
            }
            else {
                categories = (await import('~/app-data/bch/kb-categories.js')).categories;
            }
            if(categories){

                const ArticlesApi = new ((await import('~/components/kb/article-api.js')).default)();
                const articleIds = categories.map(e=>e.articles).map(e=>e.map(i=>i.identifier)).flat()
                                    .filter(e=>e).map(e=>{return {$oid:e}})
                
               const query = [
                    {
                        "$match": {
                            _id :{
                                $in: articleIds
                            }
                        }
                    },
                    {
                        "$project": {
                            [`title`]: 1,
                            [`summary`]: 1
                        }
                    },
                    { "$limit": articleIds.length }
                ];
                const articleTitles = await ArticlesApi.queryArticles({ag : JSON.stringify(query)}, {cache:true})
                
                categories.forEach(e=>{

                    if(e.articles){
                        e.articles.forEach(a=>{
                            const articleTitle = articleTitles.find(at=>at._id == a.identifier)
                            if(articleTitle)
                                a.title = articleTitle.title[this.$locale] || articleTitle.title['en'];
                        })
                    }

                })
                
                return categories;

            }
        },
        getUrl(title, id, tag){
            const urlTitle = title ? title.trim().replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-') : undefined;
            if(title && id){
                return `kb/tags/${encodeURIComponent(tag)}/${encodeURIComponent(urlTitle)}/${encodeURIComponent(id)}`;
            } else if (title && !id) {
                return `kb/tags/${encodeURIComponent(tag)}/${encodeURIComponent(urlTitle)}`;
            } else if (!title && !id) {
                return `kb/tags/${encodeURIComponent( tag )}`;
            }
        },
    }
}
