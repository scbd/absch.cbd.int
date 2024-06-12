//============================================================
//
//
//============================================================
function setCustomCacheControl(res, path) {

    let exceptionFiles = ['assets/widgets.js']
    let oneYear              = 365*24*60*60;
	let versionWrong = false;
	let versionMatch = false;
    let localhostRegex = /^http:\/\/localhost:([0-9]{4})\//;
    let hashFileRegex  = /-[_a-z0-9]{8}\.([a-z]+|[a-z]+\.map)$/i;
    const assetsPath   = /\/(img|fonts|images|ammap3|require\-shim)\//
    
    let longCache    = false;
    longCache        = hashFileRegex.test(res.req.path);
    longCache        = longCache || assetsPath.test(res.req.path);
    
    if(longCache)        
	    return res.setHeader('Cache-Control', `public, max-age=${oneYear}`);
    
    if(res.req.headers && !localhostRegex.test(res.req.headers.referer)){
        versionWrong |= res.req.query && res.req.query.v && res.req.query.v!=global.app.version;
        versionWrong |= res.req.cookies && res.req.cookies.VERSION && res.req.cookies.VERSION!=global.app.version;
        versionMatch |= res.req.query && res.req.query.v && res.req.query.v==global.app.version;
        versionMatch |= res.req.cookies && res.req.cookies.VERSION && res.req.cookies.VERSION==global.app.version;
    }

	if(((versionWrong || !versionMatch)) || exceptionFiles.find(e=>~e.indexOf(res.req.path)))
		return res.setHeader('Cache-Control', 'public, max-age=0');

    return res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
}


module.exports = {
    setCustomCacheControl:setCustomCacheControl
}
