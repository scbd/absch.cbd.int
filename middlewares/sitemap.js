
module.exports = function(req, res){
    let sitemapName = process.env.CLEARINGHOUSE.toLowerCase();
    if(req.params.num)
        sitemapName += req.params.num;
     require('superagent').get(`https://attachments.cbd.int/sitemap-${sitemapName}.xml`).pipe(res)
}
