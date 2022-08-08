let reCaptchaPromise = undefined;
let gAssignedId = undefined;
let initResult

export function initializeRecaptcha(elementId, sitekey){

    if(!initResult){

        initResult = new Promise((resolve, reject)=>{
                
            let checkIntervalRunCount = 0;
            const checkInterval = setInterval(() => {

                if(checkIntervalRunCount > 2000){

                    clearInterval(checkInterval);
                    reject('Unable to initialize reCaptcha');
                }

                checkIntervalRunCount++;

                if (window.grecaptcha && window.grecaptcha.hasOwnProperty('render')){
                    clearInterval(checkInterval);
                    gAssignedId = render(elementId, sitekey);
                    resolve(gAssignedId);
                }

            }, 100)

        })
    }

    return initResult;
}

export function getRecaptchaToken(){

    if(reCaptchaPromise?.reject)
        reCaptchaPromise.reject();        

    return new Promise((resolve, reject)=>{
        reCaptchaPromise = { resolve, reject };
        window.grecaptcha.execute(gAssignedId)
    });   
}

export function resetRecaptcha(){
    if(reCaptchaPromise?.reject)
        reCaptchaPromise.reject();
    reCaptchaPromise = undefined;
    window.grecaptcha.reset(gAssignedId)
}

function render(elementId, sitekey){
    return window.grecaptcha.render(elementId, {
        sitekey: sitekey,
        size: 'invisible',
        'callback': (recaptchaToken) => {
            if(reCaptchaPromise?.resolve)
                reCaptchaPromise.resolve(recaptchaToken);
            reCaptchaPromise = undefined;
            resetRecaptcha();
        },
        'expired-callback': (message) => {
            if(reCaptchaPromise.reject)
                reCaptchaPromise.reject({expired:true, message});
            reCaptchaPromise = undefined;
            resetRecaptcha();
        },
        'error-callback': (error) => {
            if(reCaptchaPromise.reject)
                reCaptchaPromise.reject({error});
            reCaptchaPromise = undefined;
            resetRecaptcha();
        }
    });

}