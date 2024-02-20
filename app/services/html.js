export function encode(text) {
  const container = document.createElement('textarea');
  container.innerText = text;
  return container.innerHTML;
}

export function decode(text) {
  const container = document.createElement('textarea');
  container.innerHTML = text;
  return container.innerText;
}


export function setAnchorTarget(element, selector, target) {

  var anchorElements = element[0].querySelectorAll(selector);

  anchorElements.forEach(function (anchorElement) {
      if (anchorElement && !anchorElement.getAttribute('target')) {
          anchorElement.setAttribute('target', target);
      }
  });

  return anchorElements;
}

export function escapeHtmlAttributeId(value) {
  return value.replace(/[^-_:.a-z0-9]/gi, '_');
}