import { isbot } from "isbot";

export default function(req, res, next){
    
    if(isbot(req.get("user-agent")) || req.header['x-prerender']!= undefined){
        let url = `${req.protocol}://${req.get('host')}/${req.params.lang||'en'}/database/${req.params.documentId}`;

        if(req.params.revision)
            url += `-${req.params.revision}`;
        console.log(`redirecting bot (${req.get("user-agent")}) to ${url}`)
        return res.redirect(url);
    }

    next()
}
