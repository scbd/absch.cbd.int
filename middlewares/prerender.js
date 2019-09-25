let redis, client;

function prerender(req, res, next) {

    if(!process.env.PRERENDER_SERVICE_URL) 
        return next();

    let prerenderNode = require('prerender-node');

    prerenderNode.blacklisted(['^/register', '^/forums']);
    prerenderNode.extensionsToIgnore.push('.html');
    prerenderNode.extensionsToIgnore.push('.json');

   if(!prerenderNode.shouldShowPrerenderedPage(req)) 
    return next();


    if(process.env.REDIS_URL){

        if(!redis){
            redis = require("redis")
            client = redis.createClient(process.env.REDIS_URL);
        }
        
        prerenderNode.set('beforeRender', function(req, done) {
                client.get(req.url, done);
        }).set('afterRender', function(err, req, prerender_res) {
                client.set(req.url, prerender_res.body)
        });


    };

    
    return prerenderNode(req, res, next)

}
module.exports = prerender;
