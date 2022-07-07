const glob                          = require('glob');
const fs = require('fs').promises
const util = require('util');
const path = require('path')


const asyncGlob = util.promisify(glob);
const update = async () => {
    const files = (await  asyncGlob('**/*.js', { 
        cwd: path.join(process.cwd(), 'app')
    }));
    // 
    for (let i = 0; i < files.length; i++) {
        const filePath = `${process.cwd()}/app/${files[i]}`;
        let fileData = await fs.readFile(filePath, {encoding:"utf8"});

        if(fileData.indexOf("export { default as template } from")<0 &&
            fileData.indexOf('export default [')>=0){
            const name = path.basename(filePath);
            fileData   = fileData.replace("export default [", 
                         `export { default as template } from './${name.replace(/\.js$/, '.html')}.html';\nexport default [`)
            console.log(filePath);

            await fs.writeFile(filePath, fileData)
            // exit;
        }
    }

}

update();