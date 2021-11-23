import moment from 'moment';
import Vue from 'Vue';
import 'app/components/scbd-angularjs-services/services/locale';

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

export function lstring(ltext, locale) {
    if(Number.isInteger(ltext)) //is number to handle generic implementation of NR
    return ltext;
  
    if (!ltext)
      return "";
    let sText="";
    if (!sText && locale)
      sText = ltext[locale];
    if (!sText)
      sText = ltext.en;
    if (!sText) {
      var normalized = normalizeText(ltext)
      if(normalized[locale])
        return normalized[locale];

      for (var key in ltext) {
        sText = ltext[key];
        if (sText)
          break;
      }
    }
    return sText || "";
}


function normalizeText(text) {
  if(!text) return null;

  var entry = { ar: text.ar, en: text.en, es: text.es, fr: text.fr, ru: text.ru, zh: text.zh };

  if(!entry.en) entry.en = entry.fr;
  if(!entry.en) entry.en = entry.es;
  if(!entry.en) entry.en = entry.ru;
  if(!entry.en) entry.en = entry.ar;
  if(!entry.en) entry.en = entry.zh;

  if(!entry.fr) entry.fr = entry.en;
  if(!entry.es) entry.es = entry.en;
  if(!entry.ru) entry.ru = entry.en;
  if(!entry.ar) entry.ar = entry.en;
  if(!entry.zh) entry.zh = entry.en;
  return entry;
}


Vue.filter('formatDate'         , formatDate);
Vue.filter('capitalize'         , val=>val.toUpperCase());
Vue.filter('encodeURIComponent' , encodeURIComponent);
Vue.filter('encodeURI'          , encodeURI);

