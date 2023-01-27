import app from '~/app';
import '~/services/main';
import 'ck-editor-css';
export { default as template } from './index.html';

export default["$scope", "$routeParams", 'articlesService', function($scope, $routeParams, articlesService) {

    //---------------------------------------------------------------------
    $scope.getSizedImage = function(url, size){
        // return url;
          return url && url
          .replace(/attachments.cbd.int\//, '$&'+size+'/')
          .replace(/\.s3-website-us-east-1\.amazonaws\.com\//, '$&'+size+'/')
    }

    //---------------------------------------------------------------------
    async function loadIntroduction(){
        var ag = [];
        const tags = ($routeParams.tags||[]).map(encodeURIComponent)
        tags.push('introduction')

        ag.push({"$match":{"adminTags": { $all : tags}}});
        ag.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1, "summary":1}});
        ag.push({"$limit": 1 });

        var qsLimit = {
            "ag" : JSON.stringify(ag)
        };   
       
        const result        = await articlesService.getArticles(qsLimit)
        
        $scope.article      = result[0];
    }

    loadIntroduction();

}];

