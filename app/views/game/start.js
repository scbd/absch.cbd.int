define(['app',   'services/articles-service','services/local-storage-service',
], function (app) {
    app.controller('GameController', ['$scope', '$route', "articlesService", '$localStorage', '$routeParams','$location', '$window',
    function ($scope, $route, articlesService, $localStorage, $routeParams, $location, $window) {

    var tag;
    var type;
    $scope.goback;
    $scope.showABSCH=false;
    
    if($localStorage["game-prev"])
        $scope.goback = $localStorage["game-prev"];

    tag = $route.current.params.tag;
    $scope.type = $routeParams.t;
    $scope.option = $routeParams.o;
    $scope.value = $routeParams.v;
    $scope.showOptions = $routeParams.showOptions;

    if(!tag){
        tag="start";
        $localStorage.$reset();
        $scope.showOptions = false;
        loadArticle(tag);
    }
    else {
        loadArticle(tag);
    }

    if($scope.type){
       $localStorage["game-type"] = $scope.type;
       type =  $scope.type;
    }
    else if($localStorage["game-type"]){
        type =  $localStorage["game-type"];
    }
    else{ 
        type == false;
    }
    $scope.pagetag = tag;

    if($scope.option && type){
        $localStorage["game-" + type +"-"+ $scope.option] =  $scope.value;
    }
    if($scope.option && !type){
        $localStorage["game-" + $scope.option] =  $scope.value;
    }

    $scope.storage = $localStorage;

    $scope.$on('$locationChangeStart', function(event, next, current) {
        if(tag != "back")
            $localStorage["game-prev"] =  tag;
       
    });

    

   //-----------------------------------------------------
   function replaceStuff(data){
    var value = JSON.stringify(data);
    var type = $localStorage["game-type"];
                            
    if(tag == "step1"){
        if($localStorage["game-uc-done"] == "true")
            value = value.replace("{{done-uc}}", " <span class='pull-right'> &#10004; </span> "); 
        else
            value = value.replace("{{done-uc}}", ""); 

       if($localStorage["game-pc-done"] == "true")
            value = value.replace("{{done-pc}}", " <span class='pull-right'> &#10004; </span> "); 
        else
            value = value.replace("{{done-pc}}", ""); 
    }

    if(tag == "countryStart"){
        if(type == "uc"){
            value = $localStorage["game-uc-party"] ?  value.replace("{{done-party}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-party}}", ""); 
            value = $localStorage["game-uc-nfp"] ?  value.replace("{{done-nfp}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-nfp}}", ""); 
            value = $localStorage["game-uc-pa"] ?  value.replace("{{done-pa}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-pa}}", ""); 
            value = $localStorage["game-uc-cna"] ?  value.replace("{{done-cna}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-cna}}", ""); 
            value = $localStorage["game-uc-msr"] ?  value.replace("{{done-msr}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-msr}}", ""); 
            value = $localStorage["game-uc-pro"] ?  value.replace("{{done-pro}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-pro}}", ""); 
            value = ($localStorage["game-uc-cp-patent"] || $localStorage["game-uc-cp-border"] || $localStorage["game-uc-cp-pub"] || $localStorage["game-uc-cp-funding"] || $localStorage["game-uc-cp-market"] ) ?  value.replace("{{done-cp}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-cp}}", "");
            value = $localStorage["game-uc-absch"] ?  value.replace("{{done-absch}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-absch}}", "");
        }

        if(type == "pc"){
            value = $localStorage["game-pc-party"] ?  value.replace("{{done-party}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-party}}", ""); 
            value = $localStorage["game-pc-nfp"] ?  value.replace("{{done-nfp}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-nfp}}", ""); 
            value = $localStorage["game-pc-pa"] ?  value.replace("{{done-pa}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-pa}}", ""); 
            value = $localStorage["game-pc-cna"] ?  value.replace("{{done-cna}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-cna}}", ""); 
            value = $localStorage["game-pc-msr"] ?  value.replace("{{done-msr}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-msr}}", ""); 
            value = $localStorage["game-pc-pro"] ?  value.replace("{{done-pro}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-pro}}", ""); 
            value = ($localStorage["game-pc-cp-border"] ||$localStorage["game-pc-cp-patent"] || $localStorage["game-pc-cp-pub"] || $localStorage["game-pc-cp-funding"] || $localStorage["game-pc-cp-market"])  ?  value.replace("{{done-cp}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-cp}}", "");
            value = $localStorage["game-pc-absch"] ?  value.replace("{{done-absch}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-absch}}", "");
        }
    }

    if(tag == "cp"){
        if(type == "uc"){
            value = $localStorage["game-uc-cp-border"] ?  value.replace("{{done-border}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-border}}", "");
            value = $localStorage["game-uc-cp-pub"] ?  value.replace("{{done-pub}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-pub}}", "");
            value = $localStorage["game-uc-cp-funding"] ?  value.replace("{{done-funding}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-funding}}", "");
            value = $localStorage["game-uc-cp-market"] ?  value.replace("{{done-market}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-market}}", "");
            value = $localStorage["game-uc-cp-patent"] ?  value.replace("{{done-patent}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-patent}}", "");
        }

        if(type == "pc"){
            value = $localStorage["game-pc-cp-border"] ?  value.replace("{{done-border}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-border}}", "");
            value = $localStorage["game-pc-cp-pub"] ?  value.replace("{{done-pub}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-pub}}", "");
            value = $localStorage["game-pc-cp-funding"] ?  value.replace("{{done-funding}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-funding}}", "");
            value = $localStorage["game-pc-cp-market"] ?  value.replace("{{done-market}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-market}}", "");
            value = $localStorage["game-pc-cp-patent"] ?  value.replace("{{done-patent}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-patent}}", "");
        }
    }

    if(tag == "userStart"){
        value = $localStorage["game-u-local"] ?  value.replace("{{done-local}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-local}}", "");
        value = $localStorage["game-u-buy"] ?  value.replace("{{done-buy}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-buy}}", "");
        value = $localStorage["game-u-exp"] ?  value.replace("{{done-exp}}", " <span class='pull-right'> &#10004; </span> ") :  value = value.replace("{{done-exp}}", "");
    }

    if(tag == "checkABSCH"){

        $scope.showABSCH = true;

        if( (!$localStorage["game-pc-nfp"] || $localStorage["game-pc-nfp"] == 'false') &&
            (!$localStorage["game-pc-pro"] || $localStorage["game-pc-pro"] == 'false') &&
            (!$localStorage["game-pc-cna"] || $localStorage["game-pc-cna"] == 'false') &&
            (!$localStorage["game-pc-msr"] || $localStorage["game-pc-msr"] == 'false') ){

            value = value.replace("{{msg}}", " <h1 class='color-red bold'> It is not your lucky day. Unfortuately the country has not published any information on the ABS Clearing-House </h1> ");
            value = value.replace("<p>{{option-nfp}}</p>", "");
            value = value.replace("<p>{{option-pro}}</p>", "");
            value = value.replace("<p>{{option-msr}}</p>", "");
            value = value.replace("<p>{{option-cna}}</p>", "");
        }
        else{
            value = value.replace("{{msg}}", " <h1 class='color-blue bold'> You are in luck! Some information is available on the ABS Clearing-House </h1> ");
            value = $localStorage["game-pc-nfp"] ?  value.replace("{{option-nfp}}", " <a href='/game/viewNFP/'> View the information on the ABS National Focal Point </a>") :  value.replace("<p>{{option-nfp}}</p>", "");
            value = $localStorage["game-pc-cna"] ?  value.replace("{{option-cna}}", " <a href='/game/viewCNA/'> View the information on the Competent National Authorities </a>") :  value.replace("<p>{{option-cna}}</p>", "");
            value = $localStorage["game-pc-pro"] ?  value.replace("{{option-pro}}", " <a href='/game/viewPRO/'> View the information on the ABS Procedure </a>") :  value.replace("<p>{{option-pro}}</p>", "");
            value = $localStorage["game-pc-msr"] ?  value.replace("{{option-msr}}", " <a href='/game/viewMSR/'> View the information on the ABS Measures </a>") :  value.replace("<p>{{option-msr}}</p>", "");
        }

       
    }


    if(tag == "absch"){
        if($localStorage["game-" + type + "-pa"] == "true")
        value = value.replace("{{options}}", "<a href='/game/{{back}}/?o=absch&v=true' class='bold'> Click here </a> to publish all your national information available on the ABS Clearing-House"); 
        else
            value = value.replace("{{options}}", "<span class='bold color-red'> I am sorry. You need to first designate a Publishing Authortity in order to publish information on the ABS Clearing-House.</span>"); 
    }

    if($localStorage["game-type"]=='pc')
        value = value.replace(/{{country}}/g, "Provider Country"); 
    if($localStorage["game-type"]=='uc')
        value = value.replace(/{{country}}/g, "User Country"); 
    if($localStorage["game-prev"])
        value = value.replace(/{{back}}/g, $localStorage["game-prev"]); 
   
    value = value.replace(/{{new_window}}\\\"/g, "\\\" target='new_window' "); 
   
    var imageleft = "<figure class='image image-style-align-left'><img src='app/img/" + type + ".png'></figure>";
    var imageright = "<figure class='image image-style-align-right'><img src='app/img/" + type + ".png'></figure>";
    var image= "<figure class='image'><img src='app/img/" + type + ".png'></figure>";

    value = value.replace("{{img-left}}", imageleft); 
    value = value.replace("{{img-right}}", imageright); 
    value = value.replace("{{img}}", image); 

    return JSON.parse(value);   
    }
    //-----------------------------------------------------
    function loadArticle(tag){

        console.log("loading=" + tag);

        var ag = [];
        ag.push({"$match":{"$and":[{"adminTags.title.en":encodeURIComponent("ABSCH-Game")}]}});
        ag.push({"$match":{"$and":[{"adminTags.title.en":encodeURIComponent(tag)}]}});
        ag.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1, "adminTags":1, "customTags":1, "tags":1}});

        var qs = {
        "ag" : JSON.stringify(ag)
        };

        articlesService.getArticles(qs).then(function(data){
            $scope.article = replaceStuff(data[0]);
        });
    }

    }]);
});
