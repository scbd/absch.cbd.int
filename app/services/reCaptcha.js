let  reCaptchaPromise = undefined;
let gAssignedId = undefined;

export function initializeRecaptcha(elementId, sitekey){

    if(gAssignedId){
        console.warn(`Recaptcha already initialized, ${gAssignedId}`)
        return;
    }

    let checkIntervalRunCount = 0;
    const checkInterval = setInterval(() => {

        if(checkIntervalRunCount > 200){
            clearInterval(checkInterval);
            throw new Error('Unable to initialize reCaptcha');
        }

        checkIntervalRunCount++;

        if (window.grecaptcha && window.grecaptcha.hasOwnProperty('render')){
            clearInterval(checkInterval);
            render(elementId, sitekey);
        }

    }, 1000)

    
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
            resetRecaptcha();
        },
        'expired-callback': (message) => {
            if(reCaptchaPromise.reject)
                reCaptchaPromise.reject({expired:true, message});
            resetRecaptcha();
        },
        'error-callback': (error) => {
                if(reCaptchaPromise.reject)
                    reCaptchaPromise.reject({error});
            resetRecaptcha();
        }
    })
}