import { Readable } from 'node:stream';

// Proxies the pre-generated sitemap from attachments.cbd.int.
// Uses native fetch instead of superagent 5: its redirect handler reads the
// removed OutgoingMessage#_headers (DEP0066) and crashes the whole process on
// Node 26 whenever the upstream answers with a redirect (e.g. a missing sitemap).
export default async function(req, res){
    let sitemapName = process.env.CLEARINGHOUSE.toLowerCase();
    if(req.params.num)
        sitemapName += req.params.num;

    try {
        const upstream = await fetch(`https://attachments.cbd.int/sitemap-${sitemapName}.xml`);

        res.status(upstream.status);
        const contentType = upstream.headers.get('content-type');
        if(contentType)
            res.type(contentType);

        if(!upstream.body)
            return res.end();

        Readable.fromWeb(upstream.body).on('error', () => res.destroy()).pipe(res);
    }
    catch(e){
        if(!res.headersSent)
            res.status(502);
        res.end();
    }
}
