export default function setAnchorTarget(value) {

    var anchorElements = value[0].querySelectorAll('a[href^="https://"], a[href^="http://"]');

    anchorElements.forEach(function (anchorElement) {
        if (anchorElement && !anchorElement.getAttribute('target')) {
            anchorElement.setAttribute('target', '_blank');
        }
    });

    return anchorElements;
}