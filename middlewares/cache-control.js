﻿//============================================================
//
//
//============================================================
export default function setCustomCacheControl(res, path) {

    let exceptionFiles = ['assets/widgets.js']
    let oneYear              = 365*24*60*60;
	let versionWrong = false;
	let versionMatch = false;
    let localhostRegex = /^http:\/\/localhost:([0-9]{4})\//;
    let hashFileRegex  = /\.[a-z0-9](?!fakehash){8}\./i
    
    const isHashFile = hashFileRegex.test(res.req.originalUrl);
    
    if(res.req.headers && !localhostRegex.test(res.req.headers.referer)){
        versionWrong |= res.req.query && res.req.query.v && res.req.query.v!=global.app.version;
        versionWrong |= res.req.cookies && res.req.cookies.VERSION && res.req.cookies.VERSION!=global.app.version;
        versionMatch |= res.req.query && res.req.query.v && res.req.query.v==global.app.version;
        versionMatch |= res.req.cookies && res.req.cookies.VERSION && res.req.cookies.VERSION==global.app.version;
    }

	if((!isHashFile && (versionWrong || !versionMatch)) || exceptionFiles.indexOf(res.req.originalUrl))
		return res.setHeader('Cache-Control', 'public, max-age=0');

	res.setHeader('Cache-Control', `public, max-age=${oneYear}`);
}
