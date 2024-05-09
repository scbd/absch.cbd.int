import request from 'superagent'
export default function(req, res){
    let sitemapName = process.env.CLEARINGHOUSE.toLowerCase();
    if(req.params.num)
        sitemapName += req.params.num;
     request.get(`https://attachments.cbd.int/sitemap-${sitemapName}.xml`).pipe(res)
}
