// const util = require('util');
// const process = require('child_process');
// const execPromise = util.promisify(process.exec)

const simpleGit = require('simple-git');
const git = simpleGit();

// const executeCommand = async (command, options) => {

//         let dst = options.dst || __dirname;

//         const output = await execPromise(command, {cwd: dst})
//         if (output.stdout === '') {
//             return reject(`this does not look like a git repo\n ${command}`)
//         }
//         if(output.stderr)
//             throw output.stderr;

//         return output.stdout.replace(/\n/g, '')
  
// }

// const gitFileLastRevisionCommand= fileName => `git rev-list HEAD "${fileName}" | head -n 1`
// const gitFileLastModifiedCommand= revision => `git show --pretty=format:%at --abbrev-commit ${revision} | head -n 1`

const getModifiedDate = async (filePath, options) => {

    const log = await git.log({ file: filePath });
    if(!log || !log.latest){
        console.log(filePath, log);
        return new Date(1000).getTime();
    }

    const modifiedDate = new Date(log.latest.date);
    return modifiedDate.getTime();

    // const command       = gitFileLastRevisionCommand(filePath)
    // const revision      = await executeCommand(command, options);
  
    // const modifiedDate  = await executeCommand(gitFileLastModifiedCommand(revision), options);
  
    // return modifiedDate;
}

module.exports = {
    getModifiedDate
}