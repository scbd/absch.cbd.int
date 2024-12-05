import moment from 'moment';

const dateFormat = 'DD MMM YYYY';

export function formatDate(date) {
  return moment.utc(date).format(dateFormat);
}

export function formatDateApi(date) {
  return moment(date, dateFormat).format("YYYY-MM-DD");
}

export function formatDateTime(datetime) {
    return moment(datetime).format('DD MMM YYYY HH:mm');
}

