import _ from 'lodash';

export default async function(req, res){
    try {

        const clearingHouse = process.env.CLEARINGHOUSE.toLowerCase();
        const url = req.query.url;
        
        if(!url) {
            return res.status(400).send('\'url\' param is missing.');
        }
        
        const parsedUrl = new URL(url);

        if(!new RegExp(`${clearingHouse}\\.cbd\\.int$`).test(parsedUrl.hostname) && !new RegExp(`${clearingHouse}\\.cbddev\\.xyz$`).test(parsedUrl.hostname)){
            return res.status(400).send(`Only ${clearingHouse} domain is allowed.`);
        }

        let params = {
            type         : parsedUrl.searchParams.get('type'),
            url          : parsedUrl.searchParams.get('url')
        };
        params = _.omitBy(params, (e) => e == null);

        // if param is not provided then the widget script will not render so fallback to general iframe 
        // widget script will set the height of the iframe to the height of the page
        if(!params.type){
            params.type = 'url';
            params.url  = parsedUrl.toString();
        }
        
        const oEmbedResponse = {
            url,
            ...params
        };

        const attributes = Object.keys(params).map(e => {
            return params[e] ? `data-${_.kebabCase(e)}="${params[e]}"` : undefined;
        }).filter(e => e);

        oEmbedResponse.resources = [{src: `${parsedUrl.origin}/widgets.js`, type: 'javascript'}];
        oEmbedResponse.html      = `<div class="scbd-chm-embed" width="100%" ${attributes.join(' ')}>
                                        ${clearingHouse.toUpperCase()} embed is missing resources
                                    </div>`;

        return res.status(200).json(oEmbedResponse);
        
    } catch(e) {
        console.error(e);
        return res.status(500).send('Internal server error');
    }
}
