export const oasisUrl = ()=>{
    return window.scbdApp.accountsUrl.replace('accounts', 'oasis')
}

export const sleep = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));

export const chmUrl = (realm)=>{
    return window.scbdApp.accountsUrl.replace('accounts', realm ? realm : 'chm')
}