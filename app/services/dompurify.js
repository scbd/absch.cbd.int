import dompurify from 'dompurify';

const config = { //domPurify config
    SAFE_FOR_TEMPLATES: true, // Ensure safe sanitization for templates
    FORBID_TAGS: ['script'], // Disallow script tags
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onchange'] // Disallow event handler attributes
};

export function domPurify(document) {
    if (document) {
        return dompurify.sanitize(document, config)
    }
    return '';
}
