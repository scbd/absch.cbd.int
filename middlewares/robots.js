
module.exports = function(req, res){

    var isValidHost = ['absch.cbd.int', 'beta.bch.cbd.int', 'bch.cbd.int'].includes(req.headers['host']);

    var text = isValidHost ? 'Allow: /' : 'Disallow: /';

    res.contentType('text/plain');
    res.end('User-agent: *\n' + text);
}
