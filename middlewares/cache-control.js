//============================================================
//
//
//============================================================
function setCustomCacheControl(res, path) {

    let oneYear              = 365*24*60*60;
	let versionWrong = false;
	let versionMatch = false;
    let localhostRegex = /^http:\/\/localhost:([0-9]{4})\//;
    if(res.req.headers && !localhostRegex.test(res.req.headers.referer)){
        versionWrong |= res.req.query && res.req.query.v && res.req.query.v!=global.app.version;
        versionWrong |= res.req.cookies && res.req.cookies.VERSION && res.req.cookies.VERSION!=global.app.version;
        versionMatch |= res.req.query && res.req.query.v && res.req.query.v==global.app.version;
        versionMatch |= res.req.cookies && res.req.cookies.VERSION && res.req.cookies.VERSION==global.app.version;
    }

	if(versionWrong || !versionMatch)
		return res.setHeader('Cache-Control', 'public, max-age=0');

	res.setHeader('Cache-Control', `public, max-age=${oneYear}`);
}


module.exports = {
    setCustomCacheControl:setCustomCacheControl
}
