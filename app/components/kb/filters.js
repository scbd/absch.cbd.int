import moment from 'moment';
import Vue from 'Vue';

export function formatDate(datetime, format) {
    if (format === undefined)
        format = 'DD MMM YYYY HH:mm';

    return formatMomentDate(datetime, 'format',format);
}

export function formatMomentDate(datetime, method, arg1, arg2, arg3) {
    if(datetime)
        return moment.utc(datetime)[method](arg1, arg2, arg3);    
}

export function formatDateOnly(datetime, format) {
  if (format === undefined)
    format = 'DD MMM YYYY';

  return formatMomentDate(datetime, 'format',format);
}


Vue.filter('formatDate'         , formatDate);
Vue.filter('capitalize'         , val=>val.toUpperCase());
Vue.filter('encodeURIComponent' , encodeURIComponent);
Vue.filter('encodeURI'          , encodeURI);
