import { isbot } from "isbot";

export function rejectBotsPdf(req, res, next){
  
    const isPrerender = req.header['x-is-prerender'] == true;
    if((!isPrerender && req.query['skip-check']||false) != 'true'){

        const isReqABot = isbot(req.get("user-agent")) || isbot(req.get("x-origin-user-agent"))
        if(isReqABot || req.header['x-is-crawler'] == true){
            let url = `/${req.params.lang||'en'}/database/${req.params.documentId}`;

            if(req.params.revision)
                url += `-${req.params.revision}`;

            // console.info(`Redirecting bot request to bew url ${url}`);

            // return res.redirect(url);
        }
    }

    next()
}
