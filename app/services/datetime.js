import moment from 'moment';

export function formatDate(date) {
  return moment(date).format("DD MMM YYYY"); //  "19 Jan 2024";
}

export function formatDateISO(date) {
  return moment(date).format("YYYY-MM-DD"); // 2024-11-28
}

export function formatDateTime(datetime) {
    return moment(datetime).format('DD MMM YYYY HH:mm');
}

