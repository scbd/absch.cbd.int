
module.exports = function(req, res){
    require('superagent')
            .get(`https://attachments.cbd.int/sitemap-${process.env.CLEARINGHOUSE.toLowerCase()}.xml`)
            .pipe(res);
}
