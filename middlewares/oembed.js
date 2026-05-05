import _ from 'lodash';


const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

export default async function(req, res){
    
    const clearingHouse = process.env.CLEARINGHOUSE.toLowerCase();
    const url = req.query.url;
    if (!url) return res.status(400).send("'url' param is missing.");

    let parsedUrl;
    try { 
        parsedUrl = new URL(url); 
    }
    catch { 
        return res.status(400).send('Invalid url.'); 
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return res.status(400).send('Invalid protocol.');
    }

    const allowedHosts = [`${clearingHouse}.cbd.int`, `${clearingHouse}.cbddev.xyz`];
    
    if (!allowedHosts.includes(parsedUrl.hostname)) {
        return res.status(400).send(`Only ${clearingHouse} domain is allowed.`);
    }

    let params = _.omitBy({
        type: parsedUrl.searchParams.get('type'),
        url:  parsedUrl.searchParams.get('url'),
    }, (v) => v == null);

    if (!params.type) {
        params.type = 'url';
        params.url  = parsedUrl.toString();
    }

    const attributes = Object.entries(params)
                        .map(([k, v]) => `data-${_.kebabCase(k)}="${escapeHtml(v)}"`)
                        .join(' ');

    const scriptSrc = `${parsedUrl.origin}/widgets.js`; // origin already validated above

    const html = `<div class="scbd-chm-embed" style="width:100%" ${attributes}>` +
                    `${escapeHtml(clearingHouse.toUpperCase())} embed is missing resources` +
                `</div>` +
                `<script async src="${escapeHtml(scriptSrc)}"></script>`;

    return res.status(200).json({
        version: '1.0',
        type: 'rich',
        width: '100%',
        height: 400,
        html,
        resources: [{ src: scriptSrc, type: 'javascript' }],
        embedType: params.type,
        embedUrl: params.url,
    });
}
