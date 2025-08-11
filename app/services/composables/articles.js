import { useRealm } from '~/services/composables/realm.js';
import { ARTICLES_REALM } from '~/services/filters/constant';
import SolrApi from "~/api/solr.js"; 

export async function loadKbCategories(locale) {
            const localeKey = locale.toUpperCase(); 
            let categories

            const realm = useRealm();

            if(realm.is('BCH')) {
                categories = (await import('~/app-data/bch/kb-categories.js')).categories;
            };
            if(realm.is('ABS')) {
                categories = (await import('~/app-data/abs/kb-categories.js')).categories;
            };
            if(realm.is('CHM')) {
                categories = (await import('~/app-data/chm/kb-categories.js')).categories;
            };

            if(categories){

                const articleIds = categories
                        .flatMap(category => category.articles || [])
                        .map(article => article?.identifier)
                        .filter(Boolean);

                const solrAPI = new SolrApi(); 
                const query = `${ARTICLES_REALM} AND id:(${articleIds.map(id => `"${id}"`).join(' ')})`;
                const result = await solrAPI.query({
                        query, 
                        fields: [
                            `title:title_${localeKey}_s`,
                            `summary:summary_${localeKey}_s`,  
                            'id'
                        ].join(','),
                        rowsPerPage: articleIds.length
                    });
                const articleTitles = result?.response?.docs || [];
                
                categories.forEach(category => {
                    if (category.articles) {
                        category.articles.forEach(article => {
                            const matchingArticle = articleTitles.find(at => at.id == article?.identifier);
                            if (matchingArticle) {
                                article.title = matchingArticle.title
                            }
                        });
                    }
                });
                
                return categories;

            }
};

export function getUrl(title, id, tag){
    const urlTitle = title ? title.trim().replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-') : undefined;
    if(title && id){
        return `kb/tags/${encodeURIComponent(tag)}/${encodeURIComponent(urlTitle)}/${encodeURIComponent(id)}`;
    } else if (title && !id) {
        return `kb/tags/${encodeURIComponent(tag)}/${encodeURIComponent(urlTitle)}`;
    } else if (!title && !id) {
        return `kb/tags/${encodeURIComponent( tag )}`;
    }
};

export function shuffleArray (array) {
    return array.map((value) => ({ value, sort: Math.random() * 100 }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};

export function getRealmArticleTag ()  {
    
        const realm = useRealm();

        if(realm.is('BCH')) return 'bch';
        if(realm.is('ABS')) return 'absch';
        if(realm.is('CHM')) return 'chm';
};