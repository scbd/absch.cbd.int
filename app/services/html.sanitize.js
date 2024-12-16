import dompurify from 'dompurify';

export function sanitizeHtml(unsafeHtml) {
    if (unsafeHtml) {
        unsafeHtml = dompurify.sanitize(unsafeHtml, {
            ADD_TAGS: ['oembed'], // Add 'oembed' to the default tags
            ADD_ATTR: ['url'],
        });
    }
    return unsafeHtml;
}