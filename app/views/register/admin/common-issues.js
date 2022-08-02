import app from '~/app';
import _ from 'lodash';
import '~/components/scbd-angularjs-services/main';
import '~/services/main';

  export { default as template } from './common-issues.html';

  export default ["$scope", "locale", 'articlesService',
    function($scope,locale, articlesService) {
      
      $scope.articles = "loading...";
   
      loadArticles(["ABSCH-template"]);
      
      //---------------------------------------------------------------------
      $scope.getJiraLink = function(tags){
        
        var q = "";
        
        for(var i=0;i < tags.length;++i){
            
            if(tags && tags[i].title.en != "ABSCH-template"){
                if(i != 0)
                    q +=  " AND ";

                q += "labels=" + tags[i].title.en;
            }
        }
        return encodeURIComponent(q + " ORDER BY priority DESC, status DESC, updated DESC");
      }

    
      //---------------------------------------------------------------------
      function loadArticles(tags){
        var ag = [];
        
        for(var i=0;i < tags.length;++i){
            ag.push({"$match":{"$and":[{"adminTags":encodeURIComponent(tags[i])}]}});
        }
        ag.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1, "adminTags":1, "customTags":1, "tags":1}});
        
        var qs = {
          "ag" : JSON.stringify(ag)
        };
      
        articlesService.getArticles(qs).then(function(data){
          $scope.articles = data;
        })
      }
    
     


    }
  ];


