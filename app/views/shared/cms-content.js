import $ from 'jquery';
import _ from 'lodash';
import html404 from 'text!./403.html';
import html403 from 'app'; 

function escapeRegExp(str) {
    return _.escapeRegExp(str);
}

function rebaseUrl(pathOrUrl, base) {

    var newPathOrUrl = pathOrUrl;

    if(newPathOrUrl) {
        const url = new URL(newPathOrUrl, "https://bch.cbd.int")

        if(url.host=='bch.cbd.int') {
            newPathOrUrl = `${url.pathname}${url.search}${url.hash}`;

            if(newPathOrUrl.indexOf(base)!=0 && !/\.(png|gif|pdf|jpg|css|js)$/i.test(url.pathname))
                newPathOrUrl = [base.replace(/\/$/g, ''), newPathOrUrl.replace(/^\//g, '')].join('/');
        }
    }
    console.log(pathOrUrl, '=>', newPathOrUrl);

    return newPathOrUrl;
}
export { default as template } from './cms-content.html';

export default ["$scope", "$rootScope", "$route", '$http', function($scope, $rootScope, $route, $http) {
    debugger
    var url =  $route.current.$$route.target;
    var params = {};
    
    for(var key in $route.current.params) {
        
        var re  = new RegExp(escapeRegExp(':'+key)+'\\b', 'g');
        var val = $route.current.params[key];
        
        if(re.test(url)) url = url.replace(re, val);
        else             params[key] = val;
    }
    
    url = url.replace(/:\w+\b/g, '');
    
    $http.get(url, {cache:false, params: params }).then(function(res) {
        
        const base  = $('base').attr('href') || '/';
        const page  = $('<div></div>').html(res.data)
        const title = page.find('title').text();

        page.find('[href]').each(function() { $(this).attr('href', rebaseUrl($(this).attr('href'), base));  });
        page.find('[src]' ).each(function() { $(this).attr('src',  rebaseUrl($(this).attr('src' ), base));  });

        var CContent     = page    .find('#CPageContent');
        var CTitle       = CContent.find('#CTitleHolder');
        var CBreadcrumbs = page    .find('#CPositionHolder');
        var CMenu        = page    .find('#CPageLeft');

        CTitle      .remove();
        CBreadcrumbs.remove();

        $scope.title = title || CTitle.text();
        
        $('#cms-left-menu').html(CMenu  .html());
        $('#cms-content'  ).html(CContent.html());

        
    }).catch(function(e) {
        
        if(e.status==404) $('#cms-content').html(html404);
        if(e.status==403) $('#cms-content').html(html403);
    });

}];

