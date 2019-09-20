

function robots (req, res){

    var isValidHost = ['absch.cbd.int'].includes(req.headers['hosts']);

    var text = isValidHost ? 'Allow: /' : 'Disallow: /';

    res.contentType('text/plain');
    res.end('User-agent: *\n' + text);
}

function sitemap(req, res){
    require('superagent')
            .get(`https://attachments.cbd.int/sitemap-${process.env.CLEARINGHOUSE.toLowerCase()}.xml`)
            .pipe(res);
}
    
function errorLogs(req, res){   
    proxy.web(req, res, { target: `${apiUrl}/api/v2016/error-logs?type=client-app-errors&serverAppVersion=${encodeURIComponent(appVersion)}`, 
                            secure:false, ignorePath:true, xfwd:true });
}


module.exports = {
    robots,
    sitemap
}
