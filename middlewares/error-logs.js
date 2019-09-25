
module.exports = function(proxy){  

    return function(req, res){ 
        proxy.web(req, res, { target: `${apiUrl}/api/v2016/error-logs?type=client-app-errors&serverAppVersion=${encodeURIComponent(appVersion)}`, 
                                secure:false, ignorePath:true, xfwd:true });
    }
}

