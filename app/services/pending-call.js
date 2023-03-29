export default function pending(delegate, activation) {

    return function(...params) {

        const onFinally = ()=>{ activation.call(this, false); }

        let promise = null;

        try
        {
            activation.call(this, true);

            const retVal = delegate.call(this, ...params);

            if(retVal.then) promise = retVal;

            return retVal;
        }
        finally{
            if(promise)
                promise.finally(onFinally);
            else 
                onFinally();
        }
    }
}

