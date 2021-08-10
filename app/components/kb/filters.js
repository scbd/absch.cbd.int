import moment from 'moment';

export function formatDate(datetime, format) {
    if (format === undefined)
        format = 'DD MMM YYYY HH:mm';

    return formatMomentDate(datetime, 'format',format);
}

export function formatMomentDate(datetime, method, arg1, arg2, arg3) {
    if(datetime)
        return moment.utc(datetime)[method](arg1, arg2, arg3);    
}