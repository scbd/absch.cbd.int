

import { copyFiles                } from './pre-build-process';

(async()=>{
    await copyFiles(process.cwd(), 'app', ['en'], 'dist', '**/*.ejs');
})()