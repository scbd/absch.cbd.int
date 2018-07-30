define(['jquery', 'text!./404.html', 'text!./403.html', 'app'], function($, html404, html403) { "use strict";

    function escapeRegExp(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    
    return ["$rootScope", "$route", '$http', function($rootScope, $route, $http) {
        
        var url =  $route.current.$$route.target;
        var params = {};
        
        for(var key in $route.current.params) {
            
            var re  = new RegExp(escapeRegExp(':'+key)+'\\b', 'g');
            var val = $route.current.params[key];
            
            if(re.test(url)) url = url.replace(re, val);
            else             params[key] = val;
        }
        
        url = url.replace(/:\w+\b/g, '');
        
        $http.get(url, {cache:true, params: params }).then(function(res) {
            
            var page = $('<div></div>').html(res.data)
            
            $('head>title').text(page.find('head>title').text());
            var content     = page.find('#CPageContent');
            var breadcrumbs = page.find('#CPositionHolder');
            var menu        = page.find('#CPageLeft');
            
            breadcrumbs.remove();
            
            $('#cms-content').html(content.html());
            
        }).catch(function(e) {
            
            if(e.status==404) $('#cms-content').html(html404);
            if(e.status==403) $('#cms-content').html(html403);
        });

    }];
});
