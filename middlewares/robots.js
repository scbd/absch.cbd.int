
export default function(req, res){

    const isValidHost = ['absch.cbd.int', 'beta.bch.cbd.int', 'bch.cbd.int'].includes(req.headers['host']);

    let text = `
Disallow: /ar/pdf/
Disallow: /en/pdf/
Disallow: /es/pdf/
Disallow: /fr/pdf/
Disallow: /ru/pdf/                
Disallow: /zh/pdf/`
    
    text    += `\n${isValidHost ? 'Allow: /' : 'Disallow: /'}`;


    res.contentType('text/plain');
    res.end('User-agent: *\n' + text);
}
