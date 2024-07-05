import dompurify from 'dompurify';

export function sanitizeHtml(unsafeHtml) {
    if (unsafeHtml) {
        unsafeHtml = dompurify.sanitize(unsafeHtml)
    }
    return unsafeHtml;
}