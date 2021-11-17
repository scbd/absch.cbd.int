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
        articleUrl(article, tag){
            const id = article.identifier?article.identifier:article._id;
            const title = article.title[this.$locale]?article.title[this.$locale]:article.title;
            if(article.url){
                window.open(article.url,'_blank');
                } else {
                const urlTitle = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
                return `/kb/tags/${encodeURIComponent(tag)}/${encodeURIComponent(urlTitle)}/${encodeURIComponent(id)}`
            }
        },
        goToArticle(article, tag){
            this.$router.push({
                path:this.articleUrl(article, tag)
            });
        },
        goToTag(category){
           	this.$router.push({path: this.tagUrl(category)});
        }
    }
}