const { readFile, writeFile, stat } = require('fs').promises;
const url = require('url');

module.exports = async function(req, res){

    res.sendFile(`${global.app.rootPath}/dist/en/app/assets${req.originalUrl}`);

}