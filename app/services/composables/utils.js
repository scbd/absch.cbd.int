export const oasisUrl = ()=>{
    return window.scbdApp.accountsUrl.replace('accounts', 'oasis')
}

export const sleep = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));