import ArticlesApi from '../../components/kb/article-api';
import { useRealm } from '~/services/composables/realm.js';

const articlesApi = new ArticlesApi();

export async function loadKbCategories(locale) {

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
                const articleTitles = await articlesApi.queryArticles({ag : JSON.stringify(query)}, {cache:true})
                
                categories.forEach(category => {
                    if (category.articles) {
                        category.articles.forEach(article => {
                            const matchingArticle = articleTitles.find(at => at._id == article.identifier);
                            if (matchingArticle) {
                                article.title = matchingArticle.title[locale] || matchingArticle.title['en'];
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