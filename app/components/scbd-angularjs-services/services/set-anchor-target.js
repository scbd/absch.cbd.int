import $ from 'jquery';

export default function setAnchorTarget(value) {
    const $htmlObject = $(value);
    $htmlObject.find('a[href^="https://"],a[href^="http://"]').each(function() {
        if (!$(this).attr('target')) {
            $(this).attr('target', '_blank');
        }
    });
    return $htmlObject.prop('outerHTML');
}