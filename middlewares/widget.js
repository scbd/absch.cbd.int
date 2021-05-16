const { readFile, writeFile, stat } = require('fs').promises;
const url = require('url');

module.exports = async function(req, res){
           
    let chWidgetFile = `${global.app.rootPath}/dist/en/app/assets/widgets-${process.env.CLEARINGHOUSE}.js`
    try{        
        await stat(chWidgetFile);
    }catch(e){

        let origin = 'http://localhost:2010';
        if(process.env.API_URL == 'https://api.cbd.int'){
            origin = `https://${process.env.CLEARINGHOUSE}.cbd.int`;
        }
        if(process.env.API_URL == 'https://api.cbddev.xyz'){
            origin = `https://${process.env.CLEARINGHOUSE}.cbddev.xyz`;
        }

        let widgetJs = await readFile(`${global.app.rootPath}/dist/en/app/assets/widgets.js`)
        widgetJs = widgetJs.toString().replace(/http:\/\/localhost\:2010/, origin);

        await writeFile(chWidgetFile, widgetJs);

    }
    
    res.sendFile(chWidgetFile)
}