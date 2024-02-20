export default function setAnchorTarget(element, selector, target) {

    var anchorElements = element[0].querySelectorAll(selector);

    anchorElements.forEach(function (anchorElement) {
        if (anchorElement && !anchorElement.getAttribute('target')) {
            anchorElement.setAttribute('target', target);
        }
    });

    return anchorElements;
}