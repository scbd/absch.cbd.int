export default function escapeHtmlAttributeId(value) {
    return value.replace(/[^-_:.a-z0-9]/gi, '_');
}