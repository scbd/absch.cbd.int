define(['app', 'webui-popover'], function(app) {

    app.directive('infoBar', [function() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl : '/app/views/help/info-bar.html',
            scope: { 
                type    : '@',
                source   : '@'               
            },
            link: function($scope, $element, attrs) {               
           
                var settings = {
                        trigger:'click',
                        title:'ABS-CH Help',		
                        closeable:true,
                        delay:0,
                        padding:true,
                        backdrop:false,
                        style:'popover-style1',
                        width:500,
                        height:300,
                };

                if($scope.type == 'faq'){
                    var asyncSettings = {	
                                            url:'https://api.cbd.int/api/v2015/help-faqs/' + $scope.source,
                                            type:'async',
                                            content:function(data){
                                                var html = '<div class="list-group">';
                                                html += '<h3>' + data.title + '</h3>'
                                                html += '<p>' + data.description.en + '</h3>' 
                                                html+='</div>';
                                                return html;
                                            }
                                        };
                    $element.find('a.show-pop')
                            .webuiPopover('destroy')
                            .webuiPopover($.extend({}, settings, asyncSettings));
                }
                else if($scope.type == 'video'){
                    var iframeSettings = {	
                                            closeable:true,
                                            padding:false,
                                            type:'iframe',
                                            url:'https://www.youtube.com/embed/' + $scope.source};					
                    $element.find('a.show-pop')
                            .webuiPopover('destroy')
                            .webuiPopover($.extend({}, settings, iframeSettings));
                }
                
            }
        }
    }]);

});

