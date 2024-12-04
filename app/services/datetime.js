import moment from 'moment';

export function formatDate(date) {
  const format = 'DD MMM YYYY';
  return moment.utc(date).format(format);
}

export function formatDateTime(datetime) {
    const format = 'DD MMM YYYY HH:mm';
    return moment(datetime).format(format);
}

