
module.exports = function(proxy, options){  

    return function(req, res){ 
        proxy.web(req, res, { 
            target: `${options.apiUrl}/api/v2016/error-logs?type=client-app-errors&serverAppVersion=${encodeURIComponent(options.appVersion)}`, 
            secure:false, ignorePath:true, xfwd:true });
    }
}

