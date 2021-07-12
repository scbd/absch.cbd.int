import { DateTime } from 'moment'

//https://moment.github.io/luxon/docs/manual/formatting#table-of-tokens
export function dateTimeFilterUTC(dateTime, format='T') { 
    return dateTime && asDateTime(dateTime).setZone('utc').toFormat(format)
}

export function dateTimeFilter(dateTime, format='T') {
    return dateTime && asDateTime(dateTime).toFormat(format)
}


export function asDateTime(date) {
    if(date instanceof DateTime)  return date
    if(date instanceof Date)      return DateTime.fromJSDate(date)
    if(typeof(date) === 'string') return DateTime.fromISO(date)

    throw Error('Unknown date/time format');
}