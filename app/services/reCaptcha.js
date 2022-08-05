let reCaptchaPromise = undefined;
let reCaptchaIntiPromise = undefined;
let gAssignedId = undefined;

export function initializeRecaptcha(elementId, sitekey){

    if(gAssignedId){
        console.warn(`Recaptcha already initialized, ${gAssignedId}`)
        return;
    }

    if(reCaptchaIntiPromise?.reject){
        return reCaptchaIntiPromise.reject();
    }

    return new Promise((resolve, reject)=>{
        reCaptchaIntiPromise = { resolve, reject};

        let checkIntervalRunCount = 0;
        const checkInterval = setInterval(() => {

            if(checkIntervalRunCount > 2000){

                clearInterval(checkInterval);
                reCaptchaIntiPromise.reject('Unable to initialize reCaptcha');
                reCaptchaIntiPromise = undefined;
            }

            checkIntervalRunCount++;

            if (window.grecaptcha && window.grecaptcha.hasOwnProperty('render')){
                clearInterval(checkInterval);
                render(elementId, sitekey);
            }

        }, 100)

    })

    
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
    gAssignedId = window.grecaptcha.render(elementId, {
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

    reCaptchaIntiPromise.resolve(gAssignedId);
    reCaptchaIntiPromise = undefined;
}